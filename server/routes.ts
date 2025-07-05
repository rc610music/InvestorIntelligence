import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPortfolioPositionSchema, insertMarketNewsSchema, insertEconomicEventSchema, insertMarketMoverSchema, insertOptionsPlaySchema } from "@shared/schema";
import { z } from "zod";

// Financial API service
class FinancialAPIService {
  private readonly API_KEY = process.env.ALPHA_VANTAGE_API_KEY || process.env.FINANCIAL_API_KEY || "demo";
  private readonly BASE_URL = "https://www.alphavantage.co/query";

  async getQuote(symbol: string) {
    try {
      const response = await fetch(`${this.BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.API_KEY}`);
      const data = await response.json();
      
      if (data["Global Quote"]) {
        const quote = data["Global Quote"];
        return {
          symbol: quote["01. symbol"],
          price: parseFloat(quote["05. price"]),
          change: parseFloat(quote["09. change"]),
          changePercent: parseFloat(quote["10. change percent"].replace('%', ''))
        };
      }
      return null;
    } catch (error) {
      console.error(`Error fetching quote for ${symbol}:`, error);
      return null;
    }
  }

  async getMarketMovers() {
    // In a real implementation, this would call multiple APIs or a market movers endpoint
    const symbols = ['AAPL', 'TSLA', 'MSFT', 'NVDA', 'AMD', 'META', 'GOOGL', 'AMZN'];
    const movers = [];
    
    for (const symbol of symbols.slice(0, 5)) { // Limit to avoid API rate limits
      const quote = await this.getQuote(symbol);
      if (quote) {
        movers.push({
          symbol: quote.symbol,
          name: this.getCompanyName(quote.symbol),
          currentPrice: quote.price.toFixed(2),
          changePercent: quote.changePercent.toFixed(2),
          changeAmount: quote.change.toFixed(2),
          volume: Math.floor(Math.random() * 10000000) + 1000000, // Mock volume
          marketCap: null
        });
      }
    }
    
    return movers;
  }

  private getCompanyName(symbol: string): string {
    const companies: Record<string, string> = {
      'AAPL': 'Apple Inc.',
      'TSLA': 'Tesla Inc.',
      'MSFT': 'Microsoft Corp.',
      'NVDA': 'NVIDIA Corp.',
      'AMD': 'Advanced Micro Devices',
      'META': 'Meta Platforms Inc.',
      'GOOGL': 'Alphabet Inc.',
      'AMZN': 'Amazon.com Inc.'
    };
    return companies[symbol] || symbol;
  }

  async getNews() {
    try {
      const response = await fetch(`${this.BASE_URL}?function=NEWS_SENTIMENT&apikey=${this.API_KEY}`);
      const data = await response.json();
      
      if (data.feed) {
        return data.feed.slice(0, 10).map((article: any) => ({
          title: article.title,
          summary: article.summary,
          url: article.url,
          source: article.source,
          publishedAt: new Date(article.time_published),
          imageUrl: article.banner_image,
          sentiment: article.overall_sentiment_label?.toLowerCase()
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }
}

const financialAPI = new FinancialAPIService();

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Portfolio routes
  app.get("/api/portfolio/positions/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const positions = await storage.getPortfolioPositions(userId);
      res.json(positions);
    } catch (error) {
      console.error('Error fetching portfolio positions:', error);
      res.status(500).json({ message: "Failed to fetch portfolio positions" });
    }
  });

  app.post("/api/portfolio/positions", async (req, res) => {
    try {
      const validatedData = insertPortfolioPositionSchema.parse(req.body);
      
      // Get current price from API
      const quote = await financialAPI.getQuote(validatedData.symbol);
      if (quote) {
        validatedData.currentPrice = quote.price.toFixed(2);
      }
      
      const position = await storage.createPortfolioPosition(validatedData);
      res.json(position);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid position data", errors: error.errors });
      } else {
        console.error('Error creating portfolio position:', error);
        res.status(500).json({ message: "Failed to create portfolio position" });
      }
    }
  });

  app.put("/api/portfolio/positions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      // Get current price if symbol is being updated
      if (updates.symbol) {
        const quote = await financialAPI.getQuote(updates.symbol);
        if (quote) {
          updates.currentPrice = quote.price.toFixed(2);
        }
      }
      
      const position = await storage.updatePortfolioPosition(id, updates);
      if (!position) {
        res.status(404).json({ message: "Position not found" });
        return;
      }
      res.json(position);
    } catch (error) {
      console.error('Error updating portfolio position:', error);
      res.status(500).json({ message: "Failed to update portfolio position" });
    }
  });

  app.delete("/api/portfolio/positions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePortfolioPosition(id);
      if (!deleted) {
        res.status(404).json({ message: "Position not found" });
        return;
      }
      res.json({ message: "Position deleted successfully" });
    } catch (error) {
      console.error('Error deleting portfolio position:', error);
      res.status(500).json({ message: "Failed to delete portfolio position" });
    }
  });

  // Portfolio summary
  app.get("/api/portfolio/summary/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const positions = await storage.getPortfolioPositions(userId);
      
      const totalValue = positions.reduce((sum, pos) => sum + parseFloat(pos.marketValue), 0);
      const totalGainLoss = positions.reduce((sum, pos) => sum + parseFloat(pos.unrealizedGainLoss), 0);
      const totalGainLossPercent = totalValue > 0 ? (totalGainLoss / (totalValue - totalGainLoss)) * 100 : 0;
      
      // Mock day P&L (would be calculated from historical data)
      const dayPL = totalValue * (Math.random() * 0.04 - 0.02); // Random between -2% and +2%
      const dayPercent = totalValue > 0 ? (dayPL / totalValue) * 100 : 0;
      
      res.json({
        totalValue: totalValue.toFixed(2),
        totalGainLoss: totalGainLoss.toFixed(2),
        totalGainLossPercent: totalGainLossPercent.toFixed(2),
        dayPL: dayPL.toFixed(2),
        dayPercent: dayPercent.toFixed(2),
        positions: positions.length,
        activePositions: positions.length // All positions are considered active for now
      });
    } catch (error) {
      console.error('Error fetching portfolio summary:', error);
      res.status(500).json({ message: "Failed to fetch portfolio summary" });
    }
  });

  // Market data routes
  app.get("/api/market/movers", async (req, res) => {
    try {
      // Try to get fresh data from API
      const freshMovers = await financialAPI.getMarketMovers();
      if (freshMovers.length > 0) {
        await storage.updateMarketMovers(freshMovers);
      }
      
      const movers = await storage.getMarketMovers(10);
      res.json(movers);
    } catch (error) {
      console.error('Error fetching market movers:', error);
      res.status(500).json({ message: "Failed to fetch market movers" });
    }
  });

  app.get("/api/market/quote/:symbol", async (req, res) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      const quote = await financialAPI.getQuote(symbol);
      
      if (!quote) {
        res.status(404).json({ message: "Quote not found" });
        return;
      }
      
      res.json(quote);
    } catch (error) {
      console.error('Error fetching quote:', error);
      res.status(500).json({ message: "Failed to fetch quote" });
    }
  });

  // News routes
  app.get("/api/news", async (req, res) => {
    try {
      // Try to get fresh news from API
      const freshNews = await financialAPI.getNews();
      for (const newsItem of freshNews) {
        await storage.createMarketNews(newsItem);
      }
      
      const news = await storage.getMarketNews(20);
      res.json(news);
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  // Economic calendar routes
  app.get("/api/calendar/events", async (req, res) => {
    try {
      const events = await storage.getEconomicEvents(10);
      res.json(events);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      res.status(500).json({ message: "Failed to fetch calendar events" });
    }
  });

  // Options routes
  app.get("/api/options/plays", async (req, res) => {
    try {
      const plays = await storage.getOptionsPlays(10);
      res.json(plays);
    } catch (error) {
      console.error('Error fetching options plays:', error);
      res.status(500).json({ message: "Failed to fetch options plays" });
    }
  });

  // Stock screener route
  app.post("/api/screener/search", async (req, res) => {
    try {
      const { marketCap, sector, priceMin, priceMax, volumeMin, peRatio } = req.body;
      
      // Sample stock data for screener
      const stocks = [
        { symbol: "AAPL", name: "Apple Inc.", price: 172.50, marketCap: "Large", sector: "Technology", volume: 45000000, pe: 28.5, change: 2.3 },
        { symbol: "MSFT", name: "Microsoft Corp.", price: 415.20, marketCap: "Large", sector: "Technology", volume: 32000000, pe: 31.2, change: 1.8 },
        { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.30, marketCap: "Large", sector: "Technology", volume: 55000000, pe: 65.4, change: 4.2 },
        { symbol: "TSLA", name: "Tesla Inc.", price: 248.50, marketCap: "Large", sector: "Consumer", volume: 78000000, pe: 72.1, change: -1.5 },
        { symbol: "GOOGL", name: "Alphabet Inc.", price: 162.85, marketCap: "Large", sector: "Technology", volume: 28000000, pe: 24.8, change: 0.9 },
        { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.25, marketCap: "Large", sector: "Consumer", volume: 35000000, pe: 48.3, change: 2.1 },
        { symbol: "META", name: "Meta Platforms", price: 520.75, marketCap: "Large", sector: "Technology", volume: 22000000, pe: 25.6, change: 3.4 },
        { symbol: "AMD", name: "Advanced Micro Devices", price: 142.80, marketCap: "Large", sector: "Technology", volume: 42000000, pe: 185.2, change: -0.8 },
        { symbol: "NFLX", name: "Netflix Inc.", price: 485.90, marketCap: "Large", sector: "Consumer", volume: 15000000, pe: 32.4, change: 1.2 },
        { symbol: "CRM", name: "Salesforce Inc.", price: 275.40, marketCap: "Large", sector: "Technology", volume: 8000000, pe: 58.7, change: 0.6 },
        { symbol: "V", name: "Visa Inc.", price: 285.60, marketCap: "Large", sector: "Financials", volume: 12000000, pe: 34.2, change: 1.4 },
        { symbol: "JPM", name: "JPMorgan Chase", price: 185.30, marketCap: "Large", sector: "Financials", volume: 18000000, pe: 12.8, change: 0.7 },
        { symbol: "JNJ", name: "Johnson & Johnson", price: 158.75, marketCap: "Large", sector: "Healthcare", volume: 9000000, pe: 16.4, change: -0.3 },
        { symbol: "PFE", name: "Pfizer Inc.", price: 28.45, marketCap: "Large", sector: "Healthcare", volume: 25000000, pe: 14.2, change: 2.8 },
        { symbol: "XOM", name: "Exxon Mobil Corp.", price: 118.20, marketCap: "Large", sector: "Energy", volume: 16000000, pe: 13.5, change: -1.2 }
      ];

      let filteredStocks = stocks;

      // Apply filters
      if (marketCap) {
        filteredStocks = filteredStocks.filter(stock => stock.marketCap.toLowerCase() === marketCap.toLowerCase());
      }
      if (sector) {
        filteredStocks = filteredStocks.filter(stock => stock.sector.toLowerCase() === sector.toLowerCase());
      }
      if (priceMin) {
        filteredStocks = filteredStocks.filter(stock => stock.price >= parseFloat(priceMin));
      }
      if (priceMax) {
        filteredStocks = filteredStocks.filter(stock => stock.price <= parseFloat(priceMax));
      }
      if (volumeMin) {
        filteredStocks = filteredStocks.filter(stock => stock.volume >= parseInt(volumeMin));
      }
      if (peRatio) {
        if (peRatio === 'low') {
          filteredStocks = filteredStocks.filter(stock => stock.pe < 15);
        } else if (peRatio === 'moderate') {
          filteredStocks = filteredStocks.filter(stock => stock.pe >= 15 && stock.pe <= 25);
        } else if (peRatio === 'high') {
          filteredStocks = filteredStocks.filter(stock => stock.pe > 25);
        }
      }

      res.json(filteredStocks);
    } catch (error) {
      console.error('Error screening stocks:', error);
      res.status(500).json({ message: "Failed to screen stocks" });
    }
  });

  // Educational resources route
  app.get("/api/education/resources", async (req, res) => {
    try {
      const resources = [
        {
          id: 1,
          title: "Portfolio Management Fundamentals",
          type: "guide",
          description: "Learn the basics of building and managing a diversified investment portfolio",
          url: "/resources/portfolio-management.pdf",
          category: "Portfolio",
          downloadable: true
        },
        {
          id: 2,
          title: "Options Trading Strategies",
          type: "ebook",
          description: "Comprehensive guide to options trading strategies for all experience levels",
          url: "/resources/options-strategies.pdf",
          category: "Options",
          downloadable: true
        },
        {
          id: 3,
          title: "Technical Analysis Masterclass",
          type: "video",
          description: "Video series covering chart patterns, indicators, and technical analysis techniques",
          url: "https://example.com/technical-analysis-course",
          category: "Analysis",
          downloadable: false
        },
        {
          id: 4,
          title: "Risk Management Best Practices",
          type: "guide",
          description: "Essential risk management techniques for retail investors",
          url: "/resources/risk-management.pdf",
          category: "Risk Management",
          downloadable: true
        },
        {
          id: 5,
          title: "Market Research Toolkit",
          type: "toolkit",
          description: "Templates and checklists for conducting thorough market research",
          url: "/resources/market-research-toolkit.zip",
          category: "Research",
          downloadable: true
        }
      ];
      
      res.json(resources);
    } catch (error) {
      console.error('Error fetching educational resources:', error);
      res.status(500).json({ message: "Failed to fetch educational resources" });
    }
  });

  // Initialize some sample data if empty
  app.post("/api/init-sample-data", async (req, res) => {
    try {
      // Add comprehensive economic events
      const currentDate = new Date();
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
      
      const economicEvents = [
        {
          title: "Consumer Price Index (CPI)",
          date: tomorrow,
          time: "8:30 AM EST",
          impact: "HIGH",
          previous: "3.1%",
          forecast: "3.2%",
          actual: null,
          currency: "USD"
        },
        {
          title: "Federal Reserve Interest Rate Decision",
          date: new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000),
          time: "2:00 PM EST",
          impact: "HIGH",
          previous: "5.25%",
          forecast: "5.25%",
          actual: null,
          currency: "USD"
        },
        {
          title: "Non-Farm Payrolls",
          date: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000),
          time: "8:30 AM EST",
          impact: "HIGH",
          previous: "199K",
          forecast: "190K",
          actual: null,
          currency: "USD"
        },
        {
          title: "Unemployment Rate",
          date: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000),
          time: "8:30 AM EST",
          impact: "MEDIUM",
          previous: "3.7%",
          forecast: "3.7%",
          actual: null,
          currency: "USD"
        },
        {
          title: "GDP Growth Rate (QoQ)",
          date: new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000),
          time: "8:30 AM EST",
          impact: "HIGH",
          previous: "2.8%",
          forecast: "2.5%",
          actual: null,
          currency: "USD"
        },
        {
          title: "Retail Sales",
          date: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
          time: "8:30 AM EST",
          impact: "MEDIUM",
          previous: "0.4%",
          forecast: "0.3%",
          actual: null,
          currency: "USD"
        },
        {
          title: "Producer Price Index (PPI)",
          date: new Date(currentDate.getTime() + 8 * 24 * 60 * 60 * 1000),
          time: "8:30 AM EST",
          impact: "MEDIUM",
          previous: "2.4%",
          forecast: "2.3%",
          actual: null,
          currency: "USD"
        }
      ];

      for (const event of economicEvents) {
        await storage.createEconomicEvent(event);
      }

      // Add comprehensive options plays
      const optionsPlays = [
        {
          symbol: "AAPL",
          strike: "160.00",
          expiration: new Date("2025-01-17"),
          type: "call",
          premium: "3.45",
          impliedVolatility: "28.50",
          delta: "0.4521",
          recommendation: "BUY",
          potentialReturn: "15.20",
          analysis: "Strong bullish sentiment with iPhone 17 rumors and services growth"
        },
        {
          symbol: "TSLA",
          strike: "240.00",
          expiration: new Date("2025-01-17"),
          type: "put",
          premium: "8.90",
          impliedVolatility: "42.10",
          delta: "-0.3876",
          recommendation: "WATCH",
          potentialReturn: "12.50",
          analysis: "High volatility around Model Y refresh announcements"
        },
        {
          symbol: "NVDA",
          strike: "140.00",
          expiration: new Date("2025-02-21"),
          type: "call",
          premium: "12.50",
          impliedVolatility: "35.80",
          delta: "0.6123",
          recommendation: "BUY",
          potentialReturn: "22.30",
          analysis: "AI demand surge continuing, data center expansion accelerating"
        },
        {
          symbol: "MSFT",
          strike: "420.00",
          expiration: new Date("2025-01-24"),
          type: "call",
          premium: "6.75",
          impliedVolatility: "24.60",
          delta: "0.5234",
          recommendation: "BUY",
          potentialReturn: "18.40",
          analysis: "Azure growth and AI integration driving enterprise adoption"
        },
        {
          symbol: "SPY",
          strike: "590.00",
          expiration: new Date("2025-01-31"),
          type: "put",
          premium: "4.20",
          impliedVolatility: "18.90",
          delta: "-0.3245",
          recommendation: "WATCH",
          potentialReturn: "8.75",
          analysis: "Hedge against potential market correction, oversold conditions"
        },
        {
          symbol: "AMD",
          strike: "150.00",
          expiration: new Date("2025-02-07"),
          type: "call",
          premium: "5.60",
          impliedVolatility: "41.20",
          delta: "0.4789",
          recommendation: "WATCH",
          potentialReturn: "16.80",
          analysis: "Data center GPU competition with NVIDIA, earnings volatility expected"
        },
        {
          symbol: "META",
          strike: "580.00",
          expiration: new Date("2025-01-31"),
          type: "call",
          premium: "15.30",
          impliedVolatility: "31.40",
          delta: "0.5567",
          recommendation: "BUY",
          potentialReturn: "19.60",
          analysis: "Metaverse investments showing ROI, VR/AR adoption accelerating"
        }
      ];

      for (const play of optionsPlays) {
        await storage.createOptionsPlay(play);
      }

      // Add comprehensive market news
      const marketNews = [
        {
          title: "Federal Reserve Signals Potential Rate Cuts in 2025",
          summary: "Fed Chair Powell hints at dovish monetary policy shift as inflation shows signs of cooling. Markets rally on prospect of lower borrowing costs.",
          url: "https://example.com/fed-rate-cuts-2025",
          source: "Financial Times",
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
          sentiment: "positive"
        },
        {
          title: "AI Chip Demand Drives Record Semiconductor Sales",
          summary: "Global semiconductor industry reports strongest quarterly growth in three years, led by AI and data center chip demand from major tech companies.",
          url: "https://example.com/ai-chip-demand-2025",
          source: "Reuters",
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
          sentiment: "positive"
        },
        {
          title: "Energy Sector Volatility as Oil Prices Fluctuate",
          summary: "Crude oil futures experience high volatility amid geopolitical tensions and changing demand patterns. Energy stocks show mixed performance.",
          url: "https://example.com/energy-sector-volatility",
          source: "Bloomberg",
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
          sentiment: "neutral"
        },
        {
          title: "Electric Vehicle Sales Surge Despite Supply Chain Challenges",
          summary: "Global EV sales hit new record in Q4 2024, with Tesla, BYD, and legacy automakers reporting strong delivery numbers despite ongoing supply constraints.",
          url: "https://example.com/ev-sales-surge-2025",
          source: "Wall Street Journal",
          publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400",
          sentiment: "positive"
        },
        {
          title: "Banking Sector Faces Credit Risk Concerns",
          summary: "Regional banks report increasing loan defaults as commercial real estate struggles. Analysts warn of potential stress in smaller financial institutions.",
          url: "https://example.com/banking-credit-risk-2025",
          source: "CNBC",
          publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
          sentiment: "negative"
        },
        {
          title: "Healthcare Innovation Drives Biotech Rally",
          summary: "Breakthrough treatments in cancer therapy and rare diseases fuel investor optimism in biotechnology sector. FDA approvals accelerate for innovative drugs.",
          url: "https://example.com/biotech-rally-2025",
          source: "MarketWatch",
          publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
          sentiment: "positive"
        },
        {
          title: "Retail Earnings Season Shows Consumer Resilience",
          summary: "Major retailers beat earnings expectations as consumers continue spending despite inflation concerns. E-commerce growth remains strong across all segments.",
          url: "https://example.com/retail-earnings-2025",
          source: "Yahoo Finance",
          publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
          sentiment: "positive"
        },
        {
          title: "Cryptocurrency Market Consolidation Continues",
          summary: "Bitcoin and major altcoins trade sideways as institutional adoption stabilizes. Regulatory clarity improves market sentiment among crypto investors.",
          url: "https://example.com/crypto-consolidation-2025",
          source: "CoinDesk",
          publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000),
          imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400",
          sentiment: "neutral"
        }
      ];

      for (const news of marketNews) {
        await storage.createMarketNews(news);
      }

      // Add sample portfolio positions for demo user
      const samplePositions = [
        {
          userId: 1,
          symbol: "AAPL",
          name: "Apple Inc.",
          shares: "50",
          avgPrice: "150.25",
          currentPrice: "172.50"
        },
        {
          userId: 1,
          symbol: "MSFT",
          name: "Microsoft Corporation",
          shares: "25",
          avgPrice: "380.75",
          currentPrice: "415.20"
        },
        {
          userId: 1,
          symbol: "NVDA",
          name: "NVIDIA Corporation",
          shares: "15",
          avgPrice: "420.80",
          currentPrice: "875.30"
        },
        {
          userId: 1,
          symbol: "TSLA",
          name: "Tesla Inc.",
          shares: "10",
          avgPrice: "210.40",
          currentPrice: "248.50"
        },
        {
          userId: 1,
          symbol: "GOOGL",
          name: "Alphabet Inc.",
          shares: "20",
          avgPrice: "135.60",
          currentPrice: "162.85"
        }
      ];

      for (const position of samplePositions) {
        // Check if position already exists
        const existingPositions = await storage.getPortfolioPositions(position.userId);
        const exists = existingPositions.some(p => p.symbol === position.symbol);
        if (!exists) {
          await storage.createPortfolioPosition(position);
        }
      }

      res.json({ message: "Sample data initialized with portfolio positions" });
    } catch (error) {
      console.error('Error initializing sample data:', error);
      res.status(500).json({ message: "Failed to initialize sample data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

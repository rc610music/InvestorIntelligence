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

  // Initialize some sample data if empty
  app.post("/api/init-sample-data", async (req, res) => {
    try {
      // Add sample economic events
      const currentDate = new Date();
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
      
      await storage.createEconomicEvent({
        title: "CPI Release",
        date: tomorrow,
        time: "8:30 AM EST",
        impact: "HIGH",
        previous: "3.1%",
        forecast: "3.2%",
        actual: null,
        currency: "USD"
      });

      await storage.createEconomicEvent({
        title: "FOMC Decision",
        date: new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000),
        time: "2:00 PM EST",
        impact: "HIGH",
        previous: "5.25%",
        forecast: "5.25%",
        actual: null,
        currency: "USD"
      });

      // Add sample options plays
      await storage.createOptionsPlay({
        symbol: "AAPL",
        strike: "160.00",
        expiration: new Date("2024-12-15"),
        type: "call",
        premium: "3.45",
        impliedVolatility: "28.50",
        delta: "0.4521",
        recommendation: "BUY",
        potentialReturn: "15.20",
        analysis: "Strong bullish sentiment with earnings beat expected"
      });

      await storage.createOptionsPlay({
        symbol: "TSLA",
        strike: "240.00",
        expiration: new Date("2024-12-22"),
        type: "put",
        premium: "8.90",
        impliedVolatility: "42.10",
        delta: "-0.3876",
        recommendation: "WATCH",
        potentialReturn: "12.50",
        analysis: "High volatility play, monitor support levels"
      });

      res.json({ message: "Sample data initialized" });
    } catch (error) {
      console.error('Error initializing sample data:', error);
      res.status(500).json({ message: "Failed to initialize sample data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

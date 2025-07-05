import { 
  users, portfolioPositions, marketNews, economicEvents, marketMovers, optionsPlays,
  type User, type InsertUser,
  type PortfolioPosition, type InsertPortfolioPosition,
  type MarketNews, type InsertMarketNews,
  type EconomicEvent, type InsertEconomicEvent,
  type MarketMover, type InsertMarketMover,
  type OptionsPlay, type InsertOptionsPlay
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Portfolio Positions
  getPortfolioPositions(userId: number): Promise<PortfolioPosition[]>;
  getPortfolioPosition(id: number): Promise<PortfolioPosition | undefined>;
  createPortfolioPosition(position: InsertPortfolioPosition): Promise<PortfolioPosition>;
  updatePortfolioPosition(id: number, updates: Partial<PortfolioPosition>): Promise<PortfolioPosition | undefined>;
  deletePortfolioPosition(id: number): Promise<boolean>;

  // Market News
  getMarketNews(limit?: number): Promise<MarketNews[]>;
  createMarketNews(news: InsertMarketNews): Promise<MarketNews>;

  // Economic Events
  getEconomicEvents(limit?: number): Promise<EconomicEvent[]>;
  createEconomicEvent(event: InsertEconomicEvent): Promise<EconomicEvent>;

  // Market Movers
  getMarketMovers(limit?: number): Promise<MarketMover[]>;
  createMarketMover(mover: InsertMarketMover): Promise<MarketMover>;
  updateMarketMovers(movers: InsertMarketMover[]): Promise<MarketMover[]>;

  // Options Plays
  getOptionsPlays(limit?: number): Promise<OptionsPlay[]>;
  createOptionsPlay(play: InsertOptionsPlay): Promise<OptionsPlay>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolioPositions: Map<number, PortfolioPosition>;
  private marketNews: Map<number, MarketNews>;
  private economicEvents: Map<number, EconomicEvent>;
  private marketMovers: Map<number, MarketMover>;
  private optionsPlays: Map<number, OptionsPlay>;
  
  private currentUserIdCounter: number;
  private currentPositionIdCounter: number;
  private currentNewsIdCounter: number;
  private currentEventIdCounter: number;
  private currentMoverIdCounter: number;
  private currentOptionsIdCounter: number;

  constructor() {
    this.users = new Map();
    this.portfolioPositions = new Map();
    this.marketNews = new Map();
    this.economicEvents = new Map();
    this.marketMovers = new Map();
    this.optionsPlays = new Map();
    
    this.currentUserIdCounter = 1;
    this.currentPositionIdCounter = 1;
    this.currentNewsIdCounter = 1;
    this.currentEventIdCounter = 1;
    this.currentMoverIdCounter = 1;
    this.currentOptionsIdCounter = 1;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Portfolio Positions
  async getPortfolioPositions(userId: number): Promise<PortfolioPosition[]> {
    return Array.from(this.portfolioPositions.values()).filter(position => position.userId === userId);
  }

  async getPortfolioPosition(id: number): Promise<PortfolioPosition | undefined> {
    return this.portfolioPositions.get(id);
  }

  async createPortfolioPosition(insertPosition: InsertPortfolioPosition): Promise<PortfolioPosition> {
    const id = this.currentPositionIdCounter++;
    const marketValue = parseFloat(insertPosition.shares) * parseFloat(insertPosition.currentPrice);
    const costBasis = parseFloat(insertPosition.shares) * parseFloat(insertPosition.avgPrice);
    const unrealizedGainLoss = marketValue - costBasis;
    const unrealizedGainLossPercent = ((unrealizedGainLoss / costBasis) * 100);
    
    const position: PortfolioPosition = {
      ...insertPosition,
      id,
      marketValue: marketValue.toFixed(2),
      unrealizedGainLoss: unrealizedGainLoss.toFixed(2),
      unrealizedGainLossPercent: unrealizedGainLossPercent.toFixed(2),
      createdAt: new Date(),
    };
    
    this.portfolioPositions.set(id, position);
    return position;
  }

  async updatePortfolioPosition(id: number, updates: Partial<PortfolioPosition>): Promise<PortfolioPosition | undefined> {
    const position = this.portfolioPositions.get(id);
    if (!position) return undefined;

    const updatedPosition = { ...position, ...updates };
    
    // Recalculate derived fields if relevant fields changed
    if (updates.shares || updates.currentPrice || updates.avgPrice) {
      const marketValue = parseFloat(updatedPosition.shares) * parseFloat(updatedPosition.currentPrice);
      const costBasis = parseFloat(updatedPosition.shares) * parseFloat(updatedPosition.avgPrice);
      const unrealizedGainLoss = marketValue - costBasis;
      const unrealizedGainLossPercent = ((unrealizedGainLoss / costBasis) * 100);
      
      updatedPosition.marketValue = marketValue.toFixed(2);
      updatedPosition.unrealizedGainLoss = unrealizedGainLoss.toFixed(2);
      updatedPosition.unrealizedGainLossPercent = unrealizedGainLossPercent.toFixed(2);
    }

    this.portfolioPositions.set(id, updatedPosition);
    return updatedPosition;
  }

  async deletePortfolioPosition(id: number): Promise<boolean> {
    return this.portfolioPositions.delete(id);
  }

  // Market News
  async getMarketNews(limit = 10): Promise<MarketNews[]> {
    const allNews = Array.from(this.marketNews.values());
    return allNews
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }

  async createMarketNews(insertNews: InsertMarketNews): Promise<MarketNews> {
    const id = this.currentNewsIdCounter++;
    const news: MarketNews = { 
      id,
      title: insertNews.title,
      summary: insertNews.summary,
      url: insertNews.url,
      source: insertNews.source,
      publishedAt: insertNews.publishedAt,
      imageUrl: insertNews.imageUrl ?? null,
      sentiment: insertNews.sentiment ?? null
    };
    this.marketNews.set(id, news);
    return news;
  }

  // Economic Events
  async getEconomicEvents(limit = 10): Promise<EconomicEvent[]> {
    const allEvents = Array.from(this.economicEvents.values());
    return allEvents
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit);
  }

  async createEconomicEvent(insertEvent: InsertEconomicEvent): Promise<EconomicEvent> {
    const id = this.currentEventIdCounter++;
    const event: EconomicEvent = { 
      id,
      title: insertEvent.title,
      date: insertEvent.date,
      time: insertEvent.time,
      impact: insertEvent.impact,
      currency: insertEvent.currency,
      previous: insertEvent.previous ?? null,
      forecast: insertEvent.forecast ?? null,
      actual: insertEvent.actual ?? null
    };
    this.economicEvents.set(id, event);
    return event;
  }

  // Market Movers
  async getMarketMovers(limit = 10): Promise<MarketMover[]> {
    const allMovers = Array.from(this.marketMovers.values());
    return allMovers
      .sort((a, b) => Math.abs(parseFloat(b.changePercent)) - Math.abs(parseFloat(a.changePercent)))
      .slice(0, limit);
  }

  async createMarketMover(insertMover: InsertMarketMover): Promise<MarketMover> {
    const id = this.currentMoverIdCounter++;
    const mover: MarketMover = { 
      id,
      symbol: insertMover.symbol,
      name: insertMover.name,
      currentPrice: insertMover.currentPrice,
      changePercent: insertMover.changePercent,
      changeAmount: insertMover.changeAmount,
      volume: insertMover.volume,
      marketCap: insertMover.marketCap ?? null,
      lastUpdated: new Date()
    };
    this.marketMovers.set(id, mover);
    return mover;
  }

  async updateMarketMovers(movers: InsertMarketMover[]): Promise<MarketMover[]> {
    // Clear existing movers and add new ones
    this.marketMovers.clear();
    this.currentMoverIdCounter = 1;

    const updatedMovers: MarketMover[] = [];
    for (const mover of movers) {
      const created = await this.createMarketMover(mover);
      updatedMovers.push(created);
    }
    return updatedMovers;
  }

  // Options Plays
  async getOptionsPlays(limit = 10): Promise<OptionsPlay[]> {
    const allPlays = Array.from(this.optionsPlays.values());
    return allPlays
      .sort((a, b) => {
        const aReturn = parseFloat(a.potentialReturn || '0');
        const bReturn = parseFloat(b.potentialReturn || '0');
        return bReturn - aReturn;
      })
      .slice(0, limit);
  }

  async createOptionsPlay(insertPlay: InsertOptionsPlay): Promise<OptionsPlay> {
    const id = this.currentOptionsIdCounter++;
    const play: OptionsPlay = { 
      id,
      symbol: insertPlay.symbol,
      strike: insertPlay.strike,
      expiration: insertPlay.expiration,
      type: insertPlay.type,
      premium: insertPlay.premium,
      impliedVolatility: insertPlay.impliedVolatility,
      recommendation: insertPlay.recommendation,
      delta: insertPlay.delta ?? null,
      potentialReturn: insertPlay.potentialReturn ?? null,
      analysis: insertPlay.analysis ?? null
    };
    this.optionsPlays.set(id, play);
    return play;
  }
}

export const storage = new MemStorage();

import { 
  users, portfolioPositions, marketNews, economicEvents, marketMovers, optionsPlays,
  brokerageAccounts, watchlists, watchlistItems,
  type User, type UpsertUser,
  type PortfolioPosition, type InsertPortfolioPosition,
  type MarketNews, type InsertMarketNews,
  type EconomicEvent, type InsertEconomicEvent,
  type MarketMover, type InsertMarketMover,
  type OptionsPlay, type InsertOptionsPlay,
  type BrokerageAccount, type InsertBrokerageAccount,
  type Watchlist, type InsertWatchlist,
  type WatchlistItem, type InsertWatchlistItem
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users (Replit Auth compatible)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Brokerage Accounts
  getBrokerageAccounts(userId: string): Promise<BrokerageAccount[]>;
  createBrokerageAccount(account: InsertBrokerageAccount): Promise<BrokerageAccount>;
  updateBrokerageAccount(id: number, updates: Partial<BrokerageAccount>): Promise<BrokerageAccount | undefined>;
  deleteBrokerageAccount(id: number): Promise<boolean>;

  // Watchlists
  getWatchlists(userId: string): Promise<Watchlist[]>;
  createWatchlist(watchlist: InsertWatchlist): Promise<Watchlist>;
  deleteWatchlist(id: number): Promise<boolean>;
  
  // Watchlist Items
  getWatchlistItems(watchlistId: number): Promise<WatchlistItem[]>;
  addWatchlistItem(item: InsertWatchlistItem): Promise<WatchlistItem>;
  removeWatchlistItem(watchlistId: number, symbol: string): Promise<boolean>;

  // Portfolio Positions
  getPortfolioPositions(userId: string): Promise<PortfolioPosition[]>;
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

export class DatabaseStorage implements IStorage {
  // Users (Replit Auth compatible)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Brokerage Accounts
  async getBrokerageAccounts(userId: string): Promise<BrokerageAccount[]> {
    return await db.select().from(brokerageAccounts).where(eq(brokerageAccounts.userId, userId));
  }

  async createBrokerageAccount(account: InsertBrokerageAccount): Promise<BrokerageAccount> {
    const [brokerageAccount] = await db.insert(brokerageAccounts).values(account).returning();
    return brokerageAccount;
  }

  async updateBrokerageAccount(id: number, updates: Partial<BrokerageAccount>): Promise<BrokerageAccount | undefined> {
    const [brokerageAccount] = await db
      .update(brokerageAccounts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(brokerageAccounts.id, id))
      .returning();
    return brokerageAccount;
  }

  async deleteBrokerageAccount(id: number): Promise<boolean> {
    const result = await db.delete(brokerageAccounts).where(eq(brokerageAccounts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Watchlists
  async getWatchlists(userId: string): Promise<Watchlist[]> {
    return await db.select().from(watchlists).where(eq(watchlists.userId, userId));
  }

  async createWatchlist(watchlist: InsertWatchlist): Promise<Watchlist> {
    const [newWatchlist] = await db.insert(watchlists).values(watchlist).returning();
    return newWatchlist;
  }

  async deleteWatchlist(id: number): Promise<boolean> {
    const result = await db.delete(watchlists).where(eq(watchlists.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Watchlist Items
  async getWatchlistItems(watchlistId: number): Promise<WatchlistItem[]> {
    return await db.select().from(watchlistItems).where(eq(watchlistItems.watchlistId, watchlistId));
  }

  async addWatchlistItem(item: InsertWatchlistItem): Promise<WatchlistItem> {
    const [watchlistItem] = await db.insert(watchlistItems).values(item).returning();
    return watchlistItem;
  }

  async removeWatchlistItem(watchlistId: number, symbol: string): Promise<boolean> {
    const result = await db.delete(watchlistItems)
      .where(eq(watchlistItems.watchlistId, watchlistId));
    return (result.rowCount ?? 0) > 0;
  }

  // Portfolio Positions
  async getPortfolioPositions(userId: string): Promise<PortfolioPosition[]> {
    return await db.select().from(portfolioPositions).where(eq(portfolioPositions.userId, userId));
  }

  async getPortfolioPosition(id: number): Promise<PortfolioPosition | undefined> {
    const [position] = await db.select().from(portfolioPositions).where(eq(portfolioPositions.id, id));
    return position;
  }

  async createPortfolioPosition(position: InsertPortfolioPosition): Promise<PortfolioPosition> {
    // Calculate market value and gains/losses
    const shares = parseFloat(position.shares);
    const avgPrice = parseFloat(position.avgPrice);
    const currentPrice = parseFloat(position.currentPrice);
    const marketValue = shares * currentPrice;
    const unrealizedGainLoss = marketValue - (shares * avgPrice);
    const unrealizedGainLossPercent = ((unrealizedGainLoss / (shares * avgPrice)) * 100);

    const [portfolioPosition] = await db.insert(portfolioPositions).values({
      ...position,
      marketValue: marketValue.toFixed(2),
      unrealizedGainLoss: unrealizedGainLoss.toFixed(2),
      unrealizedGainLossPercent: unrealizedGainLossPercent.toFixed(2),
      isManualEntry: position.isManualEntry ?? true,
      lastSyncedAt: null
    }).returning();
    return portfolioPosition;
  }

  async updatePortfolioPosition(id: number, updates: Partial<PortfolioPosition>): Promise<PortfolioPosition | undefined> {
    const [position] = await db
      .update(portfolioPositions)
      .set(updates)
      .where(eq(portfolioPositions.id, id))
      .returning();
    return position;
  }

  async deletePortfolioPosition(id: number): Promise<boolean> {
    const result = await db.delete(portfolioPositions).where(eq(portfolioPositions.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Market News
  async getMarketNews(limit = 10): Promise<MarketNews[]> {
    return await db.select().from(marketNews).orderBy(desc(marketNews.publishedAt)).limit(limit);
  }

  async createMarketNews(news: InsertMarketNews): Promise<MarketNews> {
    const [marketNewsItem] = await db.insert(marketNews).values(news).returning();
    return marketNewsItem;
  }

  // Economic Events
  async getEconomicEvents(limit = 10): Promise<EconomicEvent[]> {
    return await db.select().from(economicEvents).orderBy(desc(economicEvents.date)).limit(limit);
  }

  async createEconomicEvent(event: InsertEconomicEvent): Promise<EconomicEvent> {
    const [economicEvent] = await db.insert(economicEvents).values(event).returning();
    return economicEvent;
  }

  // Market Movers
  async getMarketMovers(limit = 10): Promise<MarketMover[]> {
    return await db.select().from(marketMovers).orderBy(desc(marketMovers.lastUpdated)).limit(limit);
  }

  async createMarketMover(mover: InsertMarketMover): Promise<MarketMover> {
    const [marketMover] = await db.insert(marketMovers).values(mover).returning();
    return marketMover;
  }

  async updateMarketMovers(movers: InsertMarketMover[]): Promise<MarketMover[]> {
    // Clear existing movers
    await db.delete(marketMovers);
    
    // Insert new movers
    const result = await db.insert(marketMovers).values(movers).returning();
    return result;
  }

  // Options Plays
  async getOptionsPlays(limit = 10): Promise<OptionsPlay[]> {
    return await db.select().from(optionsPlays).orderBy(desc(optionsPlays.expiration)).limit(limit);
  }

  async createOptionsPlay(play: InsertOptionsPlay): Promise<OptionsPlay> {
    const [optionsPlay] = await db.insert(optionsPlays).values(play).returning();
    return optionsPlay;
  }
}

export const storage = new DatabaseStorage();
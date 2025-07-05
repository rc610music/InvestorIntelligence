import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const portfolioPositions = pgTable("portfolio_positions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  shares: decimal("shares", { precision: 10, scale: 4 }).notNull(),
  avgPrice: decimal("avg_price", { precision: 10, scale: 2 }).notNull(),
  currentPrice: decimal("current_price", { precision: 10, scale: 2 }).notNull(),
  marketValue: decimal("market_value", { precision: 12, scale: 2 }).notNull(),
  unrealizedGainLoss: decimal("unrealized_gain_loss", { precision: 12, scale: 2 }).notNull(),
  unrealizedGainLossPercent: decimal("unrealized_gain_loss_percent", { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const marketNews = pgTable("market_news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  url: text("url").notNull(),
  source: text("source").notNull(),
  publishedAt: timestamp("published_at").notNull(),
  imageUrl: text("image_url"),
  sentiment: text("sentiment"), // positive, negative, neutral
});

export const economicEvents = pgTable("economic_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  impact: text("impact").notNull(), // HIGH, MEDIUM, LOW
  previous: text("previous"),
  forecast: text("forecast"),
  actual: text("actual"),
  currency: text("currency").notNull(),
});

export const marketMovers = pgTable("market_movers", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  currentPrice: decimal("current_price", { precision: 10, scale: 2 }).notNull(),
  changePercent: decimal("change_percent", { precision: 5, scale: 2 }).notNull(),
  changeAmount: decimal("change_amount", { precision: 10, scale: 2 }).notNull(),
  volume: integer("volume").notNull(),
  marketCap: decimal("market_cap", { precision: 15, scale: 0 }),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const optionsPlays = pgTable("options_plays", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  strike: decimal("strike", { precision: 10, scale: 2 }).notNull(),
  expiration: timestamp("expiration").notNull(),
  type: text("type").notNull(), // call, put
  premium: decimal("premium", { precision: 8, scale: 2 }).notNull(),
  impliedVolatility: decimal("implied_volatility", { precision: 5, scale: 2 }).notNull(),
  delta: decimal("delta", { precision: 5, scale: 4 }),
  recommendation: text("recommendation").notNull(), // BUY, SELL, HOLD, WATCH
  potentialReturn: decimal("potential_return", { precision: 5, scale: 2 }),
  analysis: text("analysis"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPortfolioPositionSchema = createInsertSchema(portfolioPositions).omit({
  id: true,
  marketValue: true,
  unrealizedGainLoss: true,
  unrealizedGainLossPercent: true,
  createdAt: true,
});

export const insertMarketNewsSchema = createInsertSchema(marketNews).omit({
  id: true,
});

export const insertEconomicEventSchema = createInsertSchema(economicEvents).omit({
  id: true,
});

export const insertMarketMoverSchema = createInsertSchema(marketMovers).omit({
  id: true,
  lastUpdated: true,
});

export const insertOptionsPlaySchema = createInsertSchema(optionsPlays).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPortfolioPosition = z.infer<typeof insertPortfolioPositionSchema>;
export type PortfolioPosition = typeof portfolioPositions.$inferSelect;

export type InsertMarketNews = z.infer<typeof insertMarketNewsSchema>;
export type MarketNews = typeof marketNews.$inferSelect;

export type InsertEconomicEvent = z.infer<typeof insertEconomicEventSchema>;
export type EconomicEvent = typeof economicEvents.$inferSelect;

export type InsertMarketMover = z.infer<typeof insertMarketMoverSchema>;
export type MarketMover = typeof marketMovers.$inferSelect;

export type InsertOptionsPlay = z.infer<typeof insertOptionsPlaySchema>;
export type OptionsPlay = typeof optionsPlays.$inferSelect;

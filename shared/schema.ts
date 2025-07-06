import { pgTable, text, serial, integer, boolean, decimal, timestamp, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Brokerage account integrations
export const brokerageAccounts = pgTable("brokerage_accounts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  brokerage: varchar("brokerage", { length: 50 }).notNull(), // "robinhood", "schwab", "fidelity", etc.
  accountName: varchar("account_name", { length: 100 }).notNull(),
  accountNumber: varchar("account_number", { length: 50 }),
  isActive: boolean("is_active").default(true).notNull(),
  lastSync: timestamp("last_sync"),
  syncEnabled: boolean("sync_enabled").default(true).notNull(),
  accessToken: text("access_token"), // Encrypted token for API access
  refreshToken: text("refresh_token"), // Encrypted refresh token
  tokenExpiry: timestamp("token_expiry"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Watchlists for users
export const watchlists = pgTable("watchlists", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  isDefault: boolean("is_default").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Watchlist items
export const watchlistItems = pgTable("watchlist_items", {
  id: serial("id").primaryKey(),
  watchlistId: integer("watchlist_id").notNull().references(() => watchlists.id),
  symbol: varchar("symbol", { length: 10 }).notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export const portfolioPositions = pgTable("portfolio_positions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  brokerageAccountId: integer("brokerage_account_id").references(() => brokerageAccounts.id),
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  shares: decimal("shares", { precision: 10, scale: 4 }).notNull(),
  avgPrice: decimal("avg_price", { precision: 10, scale: 2 }).notNull(),
  currentPrice: decimal("current_price", { precision: 10, scale: 2 }).notNull(),
  marketValue: decimal("market_value", { precision: 12, scale: 2 }).notNull(),
  unrealizedGainLoss: decimal("unrealized_gain_loss", { precision: 12, scale: 2 }).notNull(),
  unrealizedGainLossPercent: decimal("unrealized_gain_loss_percent", { precision: 5, scale: 2 }).notNull(),
  isManualEntry: boolean("is_manual_entry").default(true).notNull(),
  lastSyncedAt: timestamp("last_synced_at"),
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

// Insert schemas for authentication
export const upsertUserSchema = createInsertSchema(users);
export const insertBrokerageAccountSchema = createInsertSchema(brokerageAccounts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertWatchlistSchema = createInsertSchema(watchlists).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertWatchlistItemSchema = createInsertSchema(watchlistItems).omit({
  id: true,
  addedAt: true,
});

export const insertPortfolioPositionSchema = createInsertSchema(portfolioPositions).omit({
  id: true,
  marketValue: true,
  unrealizedGainLoss: true,
  unrealizedGainLossPercent: true,
  lastSyncedAt: true,
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

// Types for authentication
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBrokerageAccount = z.infer<typeof insertBrokerageAccountSchema>;
export type BrokerageAccount = typeof brokerageAccounts.$inferSelect;

export type InsertWatchlist = z.infer<typeof insertWatchlistSchema>;
export type Watchlist = typeof watchlists.$inferSelect;

export type InsertWatchlistItem = z.infer<typeof insertWatchlistItemSchema>;
export type WatchlistItem = typeof watchlistItems.$inferSelect;

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

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  portfolioPositions: many(portfolioPositions),
  brokerageAccounts: many(brokerageAccounts),
  watchlists: many(watchlists),
}));

export const portfolioPositionsRelations = relations(portfolioPositions, ({ one }) => ({
  user: one(users, {
    fields: [portfolioPositions.userId],
    references: [users.id],
  }),
  brokerageAccount: one(brokerageAccounts, {
    fields: [portfolioPositions.brokerageAccountId],
    references: [brokerageAccounts.id],
  }),
}));

export const brokerageAccountsRelations = relations(brokerageAccounts, ({ one, many }) => ({
  user: one(users, {
    fields: [brokerageAccounts.userId],
    references: [users.id],
  }),
  portfolioPositions: many(portfolioPositions),
}));

export const watchlistsRelations = relations(watchlists, ({ one, many }) => ({
  user: one(users, {
    fields: [watchlists.userId],
    references: [users.id],
  }),
  watchlistItems: many(watchlistItems),
}));

export const watchlistItemsRelations = relations(watchlistItems, ({ one }) => ({
  watchlist: one(watchlists, {
    fields: [watchlistItems.watchlistId],
    references: [watchlists.id],
  }),
}));

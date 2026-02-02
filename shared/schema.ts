import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export const assets = pgTable("assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  categoryId: varchar("category_id").notNull(),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  type: text("type").notNull(),
  quantity: decimal("quantity", { precision: 20, scale: 8 }).notNull(),
  purchasePrice: decimal("purchase_price", { precision: 20, scale: 2 }).notNull(),
  currentPrice: decimal("current_price", { precision: 20, scale: 2 }),
  purchaseDate: timestamp("purchase_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertAssetSchema = createInsertSchema(assets, {
  quantity: z.string().transform((val) => val),
  purchasePrice: z.string().transform((val) => val),
  currentPrice: z.string().optional().transform((val) => val),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertAsset = z.infer<typeof insertAssetSchema>;
export type Asset = typeof assets.$inferSelect;

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  assetId: varchar("asset_id").notNull(),
  type: text("type").notNull(),
  quantity: decimal("quantity", { precision: 20, scale: 8 }).notNull(),
  price: decimal("price", { precision: 20, scale: 2 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 20, scale: 2 }).notNull(),
  transactionDate: timestamp("transaction_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTransactionSchema = createInsertSchema(transactions, {
  quantity: z.string().transform((val) => val),
  price: z.string().transform((val) => val),
  totalAmount: z.string().transform((val) => val),
}).omit({
  id: true,
  createdAt: true,
});

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

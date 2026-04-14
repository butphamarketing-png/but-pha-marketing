import { pgTable, text, serial, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Orders Table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  pkg: text("pkg").notNull(),
  tabLabel: text("tabLabel").notNull(),
  platform: text("platform").notNull(),
  duration: integer("duration").notNull(),
  total: integer("total").notNull(),
  payMethod: text("payMethod").notNull(),
  status: text("status").$type<"pending" | "confirmed" | "completed" | "cancelled">().default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertOrderSchema = (createInsertSchema(orders) as any).omit({ id: true, createdAt: true }) as z.ZodType<Omit<Order, "id" | "createdAt">>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Leads Table
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  type: text("type").$type<"contact" | "audit" | "request">().notNull(),
  name: text("name"),
  phone: text("phone").notNull(),
  service: text("service"),
  note: text("note"),
  platform: text("platform"),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = (createInsertSchema(leads) as any).omit({ id: true, createdAt: true }) as z.ZodType<Omit<Lead, "id" | "createdAt">>;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

// Site Settings Table
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSiteSettingsSchema = (createInsertSchema(siteSettings) as any).omit({ id: true, updatedAt: true }) as z.ZodType<Omit<SiteSettings, "id" | "updatedAt">>;
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettings.$inferSelect;

// Services Table (Packages)
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(),
  name: text("name").notNull(),
  price: text("price").notNull(),
  period: text("period").$type<"month" | "lifetime">().default("month").notNull(),
  popular: boolean("popular").default(false).notNull(),
  features: jsonb("features").$type<string[]>().notNull(),
  allFeatures: jsonb("all_features").$type<string[]>().notNull(),
  audioText: text("audio_text").notNull(),
  process: jsonb("process").$type<{ step: number; title: string; desc: string }[]>().default([]).notNull(),
  feedbacks: jsonb("feedbacks").$type<{ clientName: string; avatar: string; content: string }[]>().default([]).notNull(),
});

export const insertServiceSchema = (createInsertSchema(services) as any).omit({ id: true }) as z.ZodType<Omit<Service, "id">>;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Client Portals Table
export const clientPortals = pgTable("client_portals", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  clientName: text("client_name").notNull(),
  phone: text("phone").notNull(),
  platform: text("platform").notNull(), // Added platform
  daysRemaining: integer("days_remaining").default(0).notNull(),
  postsCount: integer("posts_count").default(0).notNull(),
  progressPercent: integer("progress_percent").default(0).notNull(),
  weeklyReports: jsonb("weekly_reports").$type<{
    id?: string;
    title?: string;
    registeredAt?: string;
    deadlineAt?: string;
    budgetVnd?: number;
    progressDoc?: string;
    resultDoc?: string;
    date?: string;
    content?: string;
    image?: string;
  }[]>().default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertClientPortalSchema = (createInsertSchema(clientPortals) as any).omit({ id: true, createdAt: true }) as z.ZodType<Omit<ClientPortal, "id" | "createdAt">>;
export type InsertClientPortal = z.infer<typeof insertClientPortalSchema>;
export type ClientPortal = typeof clientPortals.$inferSelect;

// Progress Articles Table
export const progressArticles = pgTable("progress_articles", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clientPortals.id).notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProgressArticleSchema = (createInsertSchema(progressArticles) as any).omit({ id: true, createdAt: true });
export type InsertProgressArticle = z.infer<typeof insertProgressArticleSchema>;
export type ProgressArticle = typeof progressArticles.$inferSelect;

// Platform Config Table
export const platformConfigs = pgTable("platform_configs", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(), // e.g., facebook, tiktok
  name: text("name").notNull(),
  color: text("color").notNull(),
  isVisible: boolean("is_visible").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type PlatformConfig = typeof platformConfigs.$inferSelect;

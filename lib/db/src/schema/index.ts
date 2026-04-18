// Drizzle schema has been removed. All database operations use Supabase.
// Plain TypeScript types are kept here for reference only.
import { z } from "zod";

// Orders
export interface Order {
  id: number;
  name: string;
  phone: string;
  pkg: string;
  tabLabel: string;
  platform: string;
  duration: number;
  total: number;
  payMethod: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}
export type InsertOrder = Omit<Order, "id" | "createdAt">;

// Leads
export interface Lead {
  id: number;
  type: "contact" | "audit" | "request";
  name?: string;
  phone: string;
  service?: string;
  note?: string;
  platform?: string;
  url?: string;
  createdAt: string;
}
export type InsertLead = Omit<Lead, "id" | "createdAt">;

// Site Settings
export interface SiteSettings {
  id: number;
  key: string;
  value: unknown;
  updatedAt: string;
}
export type InsertSiteSettings = Omit<SiteSettings, "id" | "updatedAt">;

// Services
export interface Service {
  id: number;
  platform: string;
  name: string;
  price: string;
  period: "month" | "lifetime";
  popular: boolean;
  features: string[];
  allFeatures: string[];
  audioText: string;
  process: { step: number; title: string; desc: string }[];
  feedbacks: { clientName: string; avatar: string; content: string }[];
}
export type InsertService = Omit<Service, "id">;

// Client Portals
export interface ClientPortal {
  id: number;
  username: string;
  password: string;
  clientName: string;
  phone: string;
  platform: string;
  daysRemaining: number;
  postsCount: number;
  progressPercent: number;
  weeklyReports: {
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
  }[];
  createdAt: string;
}
export type InsertClientPortal = Omit<ClientPortal, "id" | "createdAt">;

// Progress Articles
export interface ProgressArticle {
  id: number;
  clientId: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}
export type InsertProgressArticle = Omit<ProgressArticle, "id" | "createdAt">;

// Platform Config
export interface PlatformConfig {
  id: number;
  key: string;
  name: string;
  color: string;
  isVisible: boolean;
  updatedAt: string;
}

// Page Content
export interface PageContent {
  id: number;
  platform: string;
  content: unknown;
  updatedAt: string;
}
export type InsertPageContent = Omit<PageContent, "id" | "updatedAt">;

// Media Items
export interface MediaItem {
  id: number;
  url: string;
  name: string;
  type: "image" | "video";
  timestamp: string;
}
export type InsertMediaItem = Omit<MediaItem, "id" | "timestamp">;

// News
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  published: boolean;
  description?: string;
  imageUrl?: string;
  slug?: string;
  hot: boolean;
  metaDescription?: string;
  keywordsMain?: string;
  keywordsSecondary?: string;
  timestamp: number;
  publishedAt?: string;
  updatedAt: string;
}
export type InsertNews = Omit<NewsItem, "id" | "updatedAt">;

// Zod schemas (plain, no drizzle-zod)
export const insertOrderSchema = z.object({
  name: z.string(),
  phone: z.string(),
  pkg: z.string(),
  tabLabel: z.string(),
  platform: z.string(),
  duration: z.number(),
  total: z.number(),
  payMethod: z.string(),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).default("pending"),
});

export const insertLeadSchema = z.object({
  type: z.enum(["contact", "audit", "request"]),
  name: z.string().optional(),
  phone: z.string(),
  service: z.string().optional(),
  note: z.string().optional(),
  platform: z.string().optional(),
  url: z.string().optional(),
});

export const insertSiteSettingsSchema = z.object({
  key: z.string(),
  value: z.unknown(),
});

export const insertPageContentSchema = z.object({
  platform: z.string(),
  content: z.unknown(),
});

export const insertMediaItemSchema = z.object({
  url: z.string(),
  name: z.string(),
  type: z.enum(["image", "video"]),
});

export const insertNewsSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string(),
  published: z.boolean().default(true),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  slug: z.string().optional(),
  hot: z.boolean().default(false),
  metaDescription: z.string().optional(),
  keywordsMain: z.string().optional(),
  keywordsSecondary: z.string().optional(),
  timestamp: z.number(),
  publishedAt: z.string().optional(),
});

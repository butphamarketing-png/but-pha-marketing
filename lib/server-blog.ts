import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/src";
import { siteSettings } from "@/lib/db/src/schema";

export interface ServerBlogItem {
  id: string;
  title: string;
  content: string;
  description?: string;
  imageUrl?: string;
  slug?: string;
  hot?: boolean;
  metaDescription?: string;
  keywordsMain?: string;
  keywordsSecondary?: string;
  publishedAt?: string;
  category: string;
  published: boolean;
  timestamp: number;
}

const BLOG_KEY = "blogs";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function normalize(item: ServerBlogItem): ServerBlogItem {
  return {
    ...item,
    slug: item.slug || slugify(item.title) || item.id,
    description: item.description || "",
    imageUrl: item.imageUrl || "",
    hot: !!item.hot,
    metaDescription: item.metaDescription || "",
    keywordsMain: item.keywordsMain || "",
    keywordsSecondary: item.keywordsSecondary || "",
    publishedAt: item.publishedAt || "",
  };
}

export async function getPublishedBlogs(): Promise<ServerBlogItem[]> {
  try {
    const [record] = await db.select().from(siteSettings).where(eq(siteSettings.key, BLOG_KEY)).limit(1);
    const raw = ((record?.value as ServerBlogItem[]) || []).map(normalize);
    return raw
      .filter((item) => item.published !== false)
      .sort((a, b) => (b.publishedAt ? Date.parse(b.publishedAt) : b.timestamp) - (a.publishedAt ? Date.parse(a.publishedAt) : a.timestamp));
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  const blogs = await getPublishedBlogs();
  return blogs.find((item) => item.slug === slug) || null;
}


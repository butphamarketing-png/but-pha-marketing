import { createServerClient } from "@/lib/supabase";

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

// Raw row shape returned from Supabase (snake_case columns)
interface RawNewsRow {
  id: string;
  title: string;
  content: string;
  description?: string;
  image_url?: string;
  slug?: string;
  hot?: boolean;
  meta_description?: string;
  keywords_main?: string;
  keywords_secondary?: string;
  published_at?: string;
  category: string;
  published: boolean;
  timestamp: number;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function normalize(row: RawNewsRow): ServerBlogItem {
  const item: ServerBlogItem = {
    id: row.id,
    title: row.title,
    content: row.content,
    description: row.description || "",
    imageUrl: row.image_url || "",
    slug: row.slug || slugify(row.title) || row.id,
    hot: !!row.hot,
    metaDescription: row.meta_description || "",
    keywordsMain: row.keywords_main || "",
    keywordsSecondary: row.keywords_secondary || "",
    publishedAt: row.published_at || "",
    category: row.category,
    published: row.published,
    timestamp: row.timestamp,
  };
  return item;
}

export async function getPublishedBlogs(): Promise<ServerBlogItem[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("published", true)
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("getPublishedBlogs Supabase error", error);
      return [];
    }

    return (data ?? []).map((row) => normalize(row as RawNewsRow));
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  const blogs = await getPublishedBlogs();
  return blogs.find((item) => item.slug === slug) || null;
}

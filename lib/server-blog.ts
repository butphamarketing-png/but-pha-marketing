import { unstable_cache } from "next/cache";
import { createServerClient } from "@/lib/supabase";
import { parseNewsContentMeta } from "@/lib/news-content-meta";
import { getRelatedBlogs } from "@/lib/blog-utils";

export const BLOG_CACHE_TAG = "blog-posts";
export const BLOG_REVALIDATE_SECONDS = 3600;

export interface ServerBlogItem {
  id: string;
  title: string;
  content: string;
  metaTitle?: string;
  description?: string;
  imageUrl?: string;
  slug?: string;
  hot?: boolean;
  metaDescription?: string;
  keywordsMain?: string;
  keywordsSecondary?: string;
  publishedAt?: string;
  updatedAt?: string;
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
  updated_at?: string;
  category: string;
  published: boolean;
  timestamp: number;
}

const BLOG_LIST_SELECT =
  "id,title,content,description,image_url,slug,hot,meta_description,keywords_main,keywords_secondary,published_at,updated_at,category,published,timestamp";

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
  const parsedContent = parseNewsContentMeta(row.content);
  const item: ServerBlogItem = {
    id: row.id,
    title: row.title,
    content: parsedContent.content,
    metaTitle: parsedContent.meta.metaTitle || "",
    description: row.description || "",
    imageUrl: row.image_url || "",
    slug: row.slug || slugify(row.title) || row.id,
    hot: !!row.hot,
    metaDescription: row.meta_description || "",
    keywordsMain: row.keywords_main || "",
    keywordsSecondary: row.keywords_secondary || "",
    publishedAt: row.published_at || "",
    updatedAt: row.updated_at || "",
    category: row.category,
    published: row.published,
    timestamp: row.timestamp,
  };
  return item;
}

async function fetchPublishedBlogs(): Promise<ServerBlogItem[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("news")
      .select(BLOG_LIST_SELECT)
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

export const getPublishedBlogs = unstable_cache(fetchPublishedBlogs, ["published-blogs"], {
  revalidate: BLOG_REVALIDATE_SECONDS,
  tags: [BLOG_CACHE_TAG],
});

async function fetchBlogBySlug(slug: string): Promise<ServerBlogItem | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("news")
      .select(BLOG_LIST_SELECT)
      .eq("published", true)
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("getBlogBySlug Supabase error", error);
      return null;
    }

    if (data) return normalize(data as RawNewsRow);

    const { data: byId, error: byIdError } = await supabase
      .from("news")
      .select(BLOG_LIST_SELECT)
      .eq("published", true)
      .eq("id", slug)
      .maybeSingle();

    if (byIdError) {
      console.error("getBlogBySlug by id error", byIdError);
      return null;
    }

    return byId ? normalize(byId as RawNewsRow) : null;
  } catch {
    return null;
  }
}

export async function getBlogBySlug(slug: string) {
  return unstable_cache(() => fetchBlogBySlug(slug), ["blog-by-slug", slug], {
    revalidate: BLOG_REVALIDATE_SECONDS,
    tags: [BLOG_CACHE_TAG, `blog-${slug}`],
  })();
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  const blogs = await getPublishedBlogs();
  return blogs.map((item) => item.slug || item.id).filter(Boolean);
}

export async function getRelatedBlogsForSlug(slug: string, limit = 4) {
  const blogs = await getPublishedBlogs();
  const current = blogs.find((item) => item.slug === slug || item.id === slug);
  if (!current) return [];
  return getRelatedBlogs(current, blogs, limit);
}

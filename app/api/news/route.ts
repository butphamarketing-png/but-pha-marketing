import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/src";
import { siteSettings } from "@/lib/db/src/schema";

type BlogRecord = {
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
};

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

function normalizeBlog(item: BlogRecord): BlogRecord {
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

async function readBlogs(): Promise<BlogRecord[]> {
  const [record] = await db.select().from(siteSettings).where(eq(siteSettings.key, BLOG_KEY)).limit(1);
  const value = (record?.value || []) as BlogRecord[];
  return value.map((item) => normalizeBlog(item));
}

async function writeBlogs(nextBlogs: BlogRecord[]) {
  const [record] = await db.select().from(siteSettings).where(eq(siteSettings.key, BLOG_KEY)).limit(1);
  if (!record) {
    await db.insert(siteSettings).values({ key: BLOG_KEY, value: nextBlogs }).execute();
    return;
  }
  await db
    .update(siteSettings)
    .set({ value: nextBlogs, updatedAt: new Date() })
    .where(eq(siteSettings.id, record.id))
    .execute();
}

export async function GET() {
  try {
    const blogs = await readBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("GET /api/news failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const blogs = await readBlogs();
    const next: BlogRecord = normalizeBlog({
      ...body,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      category: body.category || "blog",
      published: body.published !== false,
    });
    await writeBlogs([...blogs, next]);
    return NextResponse.json(next);
  } catch (error) {
    console.error("POST /api/news failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const body = await request.json();
    const blogs = await readBlogs();
    const nextBlogs = blogs.map((item) => (item.id === id ? normalizeBlog({ ...item, ...body }) : item));
    await writeBlogs(nextBlogs);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PATCH /api/news failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const blogs = await readBlogs();
    const nextBlogs = blogs.filter((item) => item.id !== id);
    await writeBlogs(nextBlogs);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/news failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}


import { NextResponse } from "next/server";
import { db } from "@/lib/db/src";
import { news } from "@/lib/db/src/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const items = await db.select().from(news).orderBy(news.timestamp);
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/news failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, category, published, description, imageUrl, slug, hot, metaDescription, keywordsMain, keywordsSecondary, publishedAt } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Missing required fields: title, content" }, { status: 400 });
    }

    const id = slug || crypto.randomUUID();
    const [item] = await db.insert(news).values({
      id,
      title,
      content,
      category: category || "blog",
      published: published !== false,
      description: description || "",
      imageUrl: imageUrl || "",
      slug: slug || "",
      hot: !!hot,
      metaDescription: metaDescription || "",
      keywordsMain: keywordsMain || "",
      keywordsSecondary: keywordsSecondary || "",
      timestamp: Date.now(),
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
    }).returning();
    
    return NextResponse.json(item);
  } catch (error) {
    console.error("POST /api/news failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing required field: id" }, { status: 400 });
    }

    // Convert timestamp to number if it exists
    if (updates.timestamp && typeof updates.timestamp === "string") {
      updates.timestamp = parseInt(updates.timestamp);
    }

    // Convert publishedAt to ISO string if it exists
    if (updates.publishedAt && typeof updates.publishedAt === "string") {
      updates.publishedAt = new Date(updates.publishedAt).toISOString();
    }

    await db.update(news).set({ ...updates, updatedAt: new Date() }).where(eq(news.id, id)).execute();
    
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
    
    if (!id) {
      return NextResponse.json({ error: "Missing required parameter: id" }, { status: 400 });
    }

    await db.delete(news).where(eq(news.id, id)).execute();
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/news failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
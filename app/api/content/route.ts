import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/src";
import { pageContent } from "@/lib/db/src/schema";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const platform = url.searchParams.get("platform");
    
    if (!platform) {
      return NextResponse.json({ error: "Missing platform parameter" }, { status: 400 });
    }

    const [record] = await db.select().from(pageContent).where(eq(pageContent.platform, platform)).limit(1);
    
    if (!record) {
      return NextResponse.json({ platform, content: null });
    }

    return NextResponse.json({ platform, content: record.content });
  } catch (error) {
    console.error("GET /api/content failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const platform = body?.platform as string | undefined;
    const content = body?.content;

    if (!platform || !content) {
      return NextResponse.json({ error: "Missing platform or content" }, { status: 400 });
    }

    // Check if record exists
    const [existing] = await db.select().from(pageContent).where(eq(pageContent.platform, platform)).limit(1);
    
    if (existing) {
      // Update existing record
      await db
        .update(pageContent)
        .set({ content, updatedAt: new Date() })
        .where(eq(pageContent.id, existing.id))
        .execute();
    } else {
      // Insert new record
      await db.insert(pageContent).values({ platform, content }).execute();
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/content failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
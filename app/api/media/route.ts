import { NextResponse } from "next/server";
import { db } from "@/lib/db/src";
import { mediaItems } from "@/lib/db/src/schema";

export async function GET() {
  try {
    const items = await db.select().from(mediaItems).orderBy(mediaItems.timestamp);
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/media failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, name, type } = body;

    if (!url || !name || !type) {
      return NextResponse.json({ error: "Missing required fields: url, name, type" }, { status: 400 });
    }

    const [item] = await db.insert(mediaItems).values({ url, name, type }).returning();
    return NextResponse.json(item);
  } catch (error) {
    console.error("POST /api/media failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
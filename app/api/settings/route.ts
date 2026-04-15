import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/src";
import { siteSettings } from "@/lib/db/src/schema";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");
    if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });
    const [record] = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
    return NextResponse.json({ key, value: record?.value ?? null });
  } catch (error) {
    console.error("GET /api/settings failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const key = body?.key as string | undefined;
    const value = body?.value;
    if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });

    const [record] = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
    if (!record) {
      await db.insert(siteSettings).values({ key, value }).execute();
      return NextResponse.json({ ok: true });
    }

    await db
      .update(siteSettings)
      .set({ value, updatedAt: new Date() })
      .where(eq(siteSettings.id, record.id))
      .execute();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PATCH /api/settings failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}


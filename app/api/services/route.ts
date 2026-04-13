import { NextResponse } from "next/server";
import { db } from "@/lib/db/src";
import { services } from "@/lib/db/src/schema";

export async function GET() {
  try {
    const allServices = await db.select().from(services).execute();
    return NextResponse.json(allServices);
  } catch (error) {
    console.error("GET /api/services failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db/src";
import { leads, insertLeadSchema } from "@/lib/db/src/schema";

export async function GET() {
  try {
    const allLeads = await db.select().from(leads).execute();
    return NextResponse.json(allLeads);
  } catch (error) {
    console.error("GET /api/leads failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = insertLeadSchema.parse(body);
    const [newLead] = await db.insert(leads).values(validated).returning().execute();
    return NextResponse.json(newLead);
  } catch (error) {
    console.error("POST /api/leads failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}

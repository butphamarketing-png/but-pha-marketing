import { NextResponse } from "next/server";
import { db } from "@/lib/db/src";
import { orders, insertOrderSchema } from "@/lib/db/src/schema";

export async function GET() {
  try {
    const allOrders = await db.select().from(orders).execute();
    return NextResponse.json(allOrders);
  } catch (error) {
    console.error("GET /api/orders failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = insertOrderSchema.parse(body);
    const [newOrder] = await db.insert(orders).values(validated).returning().execute();
    return NextResponse.json(newOrder);
  } catch (error) {
    console.error("POST /api/orders failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}

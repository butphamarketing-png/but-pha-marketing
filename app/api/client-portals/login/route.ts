import { NextResponse } from "next/server";
import { db } from "@/lib/db/src";
import { clientPortals } from "@/lib/db/src/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const result = await db
      .select()
      .from(clientPortals)
      .where(and(eq(clientPortals.username, username), eq(clientPortals.password, password)));

    if (result.length > 0) {
      return NextResponse.json(result[0]);
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}

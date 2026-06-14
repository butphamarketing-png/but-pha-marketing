import { NextResponse } from "next/server";
import { removePushSubscription } from "@/lib/push-notifications";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const endpoint = typeof body.endpoint === "string" ? body.endpoint : "";
    if (!endpoint) {
      return NextResponse.json({ error: "Missing endpoint" }, { status: 400 });
    }
    await removePushSubscription(endpoint);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/push/unsubscribe failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unsubscribe failed" }, { status: 500 });
  }
}

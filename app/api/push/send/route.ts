import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getPushSubscriptionCount, sendPushBroadcast } from "@/lib/push-notifications";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const count = await getPushSubscriptionCount();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const message = typeof body.body === "string" ? body.body.trim() : "";
    const url = typeof body.url === "string" ? body.url.trim() : "/blog";

    if (!title || !message) {
      return NextResponse.json({ error: "Cần title và body" }, { status: 400 });
    }

    const result = await sendPushBroadcast({ title, body: message, url });
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/push/send failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Send failed" }, { status: 500 });
  }
}

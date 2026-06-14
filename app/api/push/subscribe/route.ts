import { NextResponse } from "next/server";
import { isPushConfigured, savePushSubscription } from "@/lib/push-notifications";

export async function POST(request: Request) {
  if (!isPushConfigured()) {
    return NextResponse.json({ error: "Push notification chưa được cấu hình" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const endpoint = typeof body.endpoint === "string" ? body.endpoint : "";
    const p256dh = typeof body.keys?.p256dh === "string" ? body.keys.p256dh : "";
    const auth = typeof body.keys?.auth === "string" ? body.keys.auth : "";

    if (!endpoint || !p256dh || !auth) {
      return NextResponse.json({ error: "Subscription không hợp lệ" }, { status: 400 });
    }

    await savePushSubscription({
      endpoint,
      keys: { p256dh, auth },
      userAgent: request.headers.get("user-agent") || "",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/push/subscribe failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Subscribe failed" }, { status: 500 });
  }
}

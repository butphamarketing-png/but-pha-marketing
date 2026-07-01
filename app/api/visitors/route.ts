import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { listVisitorSessions, recordVisitorHit } from "@/lib/visitor-store";

export async function POST(request: Request) {
  try {
    await recordVisitorHit(request, (await request.json().catch(() => null))?.path);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/visitors failed", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

export async function GET(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const suspiciousOnly = url.searchParams.get("suspicious") === "1";

    const result = await listVisitorSessions({ suspiciousOnly });

    return NextResponse.json({
      ok: true,
      totalVisitors: result.totalVisitors,
      totalHits: result.totalHits,
      suspiciousCount: result.suspiciousCount,
      storage: result.storage,
      visitors: result.visitors,
    });
  } catch (error) {
    console.error("GET /api/visitors failed", error);
    return NextResponse.json({
      ok: true,
      totalVisitors: 0,
      totalHits: 0,
      suspiciousCount: 0,
      visitors: [],
    });
  }
}

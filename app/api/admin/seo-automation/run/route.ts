export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { runSeoAutomation } from "@/lib/seo-automation";

function jsonError(message: string, status = 500) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return jsonError("Unauthorized", 401);
    }

    const body = await request.json().catch(() => null);
    const manualCount = typeof body?.manualCount === "number" ? body.manualCount : undefined;
    const force = body?.force === true;

    const result = await runSeoAutomation({
      reason: "manual",
      force,
      manualCount,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("[API/admin/seo-automation/run POST] Failed:", error);
    return jsonError(error instanceof Error ? error.message : "Khong the chay SEO Autopilot luc nay.");
  }
}

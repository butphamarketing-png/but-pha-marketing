export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { processTaxDeadlineReminders } from "@/lib/cms-tax-email";

function isAuthorized(request: Request) {
  const expectedSecret = (process.env.CUSTOMER_RENEWAL_CRON_SECRET || process.env.SEO_AUTOMATION_SECRET || "").trim();
  const authHeader = request.headers.get("authorization") || "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";
  if (request.headers.get("x-vercel-cron") === "1") return true;
  if (expectedSecret && bearerToken === expectedSecret) return true;
  return false;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await processTaxDeadlineReminders();
    return NextResponse.json(result);
  } catch (error) {
    console.error("[cron/tax-deadline-reminders] failed", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Cron failed" },
      { status: 500 },
    );
  }
}

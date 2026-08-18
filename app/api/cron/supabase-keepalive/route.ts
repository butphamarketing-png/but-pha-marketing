export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

function isAuthorized(request: Request) {
  const expectedSecret = (process.env.CUSTOMER_RENEWAL_CRON_SECRET || process.env.SEO_AUTOMATION_SECRET || "").trim();
  const authHeader = request.headers.get("authorization") || "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";
  if (request.headers.get("x-vercel-cron") === "1") return true;
  if (expectedSecret && bearerToken === expectedSecret) return true;
  return false;
}

/** Lightweight DB ping so Free-tier Supabase does not pause from inactivity. */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServerClient();
    const { error } = await supabase.from("site_settings").select("key").limit(1);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message, code: error.code },
        { status: error.code === "402" || /payment|quota|paused/i.test(error.message) ? 402 : 500 },
      );
    }

    return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
  } catch (error) {
    console.error("[cron/supabase-keepalive] failed", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Keepalive failed" },
      { status: 500 },
    );
  }
}

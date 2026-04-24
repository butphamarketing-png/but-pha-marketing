export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { runSeoAutomation } from "@/lib/seo-automation";

function isAuthorized(request: Request) {
  const expectedSecret = (process.env.SEO_AUTOMATION_SECRET || "").trim();
  const authHeader = request.headers.get("authorization") || "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";
  const cronHeader = request.headers.get("x-vercel-cron");

  if (expectedSecret && bearerToken === expectedSecret) {
    return true;
  }

  if (cronHeader === "1") {
    return true;
  }

  return false;
}

function jsonError(message: string, status = 500) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

async function handleRun(request: Request) {
  if (!isAuthorized(request)) {
    return jsonError("Unauthorized", 401);
  }

  try {
    const result = await runSeoAutomation({ reason: "cron" });
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("[API/cron/seo-automation] Failed:", error);
    return jsonError(error instanceof Error ? error.message : "Khong the chay SEO Autopilot luc nay.");
  }
}

export async function GET(request: Request) {
  return handleRun(request);
}

export async function POST(request: Request) {
  return handleRun(request);
}

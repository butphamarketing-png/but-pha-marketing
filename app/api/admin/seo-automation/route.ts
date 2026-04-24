export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getSeoAutomationRuns, getSeoAutomationSettings, saveSeoAutomationSettings } from "@/lib/seo-automation";

function jsonError(message: string, status = 500) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function GET(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return jsonError("Unauthorized", 401);
    }

    const [settings, runs] = await Promise.all([getSeoAutomationSettings(), getSeoAutomationRuns()]);
    return NextResponse.json({ ok: true, settings, runs });
  } catch (error) {
    console.error("[API/admin/seo-automation GET] Failed:", error);
    return jsonError(error instanceof Error ? error.message : "Khong the tai SEO Autopilot.");
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return jsonError("Unauthorized", 401);
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return jsonError("Invalid JSON body", 400);
    }

    const next = await saveSeoAutomationSettings(body as Partial<Awaited<ReturnType<typeof getSeoAutomationSettings>>>);
    return NextResponse.json({ ok: true, settings: next });
  } catch (error) {
    console.error("[API/admin/seo-automation PATCH] Failed:", error);
    return jsonError(error instanceof Error ? error.message : "Khong the luu SEO Autopilot.");
  }
}

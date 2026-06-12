export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { shouldSendWebsiteCareExpiryEmail } from "@/lib/website-care-assets";
import { loadWebsiteCareAssets, saveWebsiteCareAssets } from "@/lib/website-care-assets-store";
import { sendWebsiteCareExpiryEmail } from "@/lib/website-care-email";

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
    const { assets, serverOk } = await loadWebsiteCareAssets();
    if (!serverOk) {
      return NextResponse.json({ ok: false, error: "Supabase unavailable" }, { status: 503 });
    }

    const now = new Date().toISOString();
    const results: Array<{ id: string; siteUrl: string; sent: boolean; channel: string }> = [];

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      if (!shouldSendWebsiteCareExpiryEmail(asset)) continue;

      const outcome = await sendWebsiteCareExpiryEmail(asset);
      if (outcome.sent) {
        assets[i] = { ...asset, lastExpiryEmailAt: now, updatedAt: now };
      }
      results.push({
        id: asset.id,
        siteUrl: asset.siteUrl,
        sent: outcome.sent,
        channel: outcome.channel,
      });
    }

    const savedCount = results.filter((item) => item.sent).length;
    if (savedCount > 0) {
      await saveWebsiteCareAssets(assets);
    }

    return NextResponse.json({ ok: true, reminded: results.length, sent: savedCount, results });
  } catch (error) {
    console.error("[cron/website-care-renewals] failed", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Cron failed" },
      { status: 500 },
    );
  }
}

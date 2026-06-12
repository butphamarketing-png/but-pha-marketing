import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { renewWebsiteAdsAsset, sanitizeWebsiteAdsAsset } from "@/lib/website-ads-assets";
import {
  loadWebsiteAdsAssets,
  saveWebsiteAdsAssets,
  syncCustomerDatesFromWebsiteAds,
} from "@/lib/website-ads-assets-store";

export async function POST(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const id = typeof body?.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ ok: false, error: "Thiếu id quảng cáo website." }, { status: 400 });
    }

    const { assets, serverOk } = await loadWebsiteAdsAssets();
    if (!serverOk) {
      return NextResponse.json({ ok: false, error: "Supabase không khả dụng." }, { status: 503 });
    }

    const index = assets.findIndex((row) => row.id === id);
    if (index < 0) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy bản ghi." }, { status: 404 });
    }

    const renewed = sanitizeWebsiteAdsAsset(renewWebsiteAdsAsset(assets[index]), index);
    const next = [...assets];
    next[index] = renewed;
    await saveWebsiteAdsAssets(next);
    await syncCustomerDatesFromWebsiteAds(renewed);

    return NextResponse.json({ ok: true, asset: renewed });
  } catch (error) {
    console.error("POST /api/website-ads-assets/renew failed", error);
    return NextResponse.json({ ok: false, error: "Không thể gia hạn quảng cáo website." }, { status: 500 });
  }
}

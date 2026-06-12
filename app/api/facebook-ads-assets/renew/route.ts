import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { renewFacebookAdsAsset, sanitizeFacebookAdsAsset } from "@/lib/facebook-ads-assets";
import {
  loadFacebookAdsAssets,
  saveFacebookAdsAssets,
  syncCustomerDatesFromFacebookAds,
} from "@/lib/facebook-ads-assets-store";

export async function POST(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const id = typeof body?.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ ok: false, error: "Thiếu id quảng cáo Facebook." }, { status: 400 });
    }

    const { assets, serverOk } = await loadFacebookAdsAssets();
    if (!serverOk) {
      return NextResponse.json({ ok: false, error: "Supabase không khả dụng." }, { status: 503 });
    }

    const index = assets.findIndex((row) => row.id === id);
    if (index < 0) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy bản ghi." }, { status: 404 });
    }

    const renewed = sanitizeFacebookAdsAsset(renewFacebookAdsAsset(assets[index]), index);
    const next = [...assets];
    next[index] = renewed;
    await saveFacebookAdsAssets(next);
    await syncCustomerDatesFromFacebookAds(renewed);

    return NextResponse.json({ ok: true, asset: renewed });
  } catch (error) {
    console.error("POST /api/facebook-ads-assets/renew failed", error);
    return NextResponse.json({ ok: false, error: "Không thể gia hạn quảng cáo Facebook." }, { status: 500 });
  }
}

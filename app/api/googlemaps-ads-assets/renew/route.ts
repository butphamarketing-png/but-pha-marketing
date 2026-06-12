import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { renewGoogleMapsAdsAsset, sanitizeGoogleMapsAdsAsset } from "@/lib/googlemaps-ads-assets";
import {
  loadGoogleMapsAdsAssets,
  saveGoogleMapsAdsAssets,
  syncCustomerDatesFromGoogleMapsAds,
} from "@/lib/googlemaps-ads-assets-store";

export async function POST(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const id = typeof body?.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ ok: false, error: "Thiếu id quảng cáo Google Maps." }, { status: 400 });
    }

    const { assets, serverOk } = await loadGoogleMapsAdsAssets();
    if (!serverOk) {
      return NextResponse.json({ ok: false, error: "Supabase không khả dụng." }, { status: 503 });
    }

    const index = assets.findIndex((row) => row.id === id);
    if (index < 0) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy bản ghi." }, { status: 404 });
    }

    const renewed = sanitizeGoogleMapsAdsAsset(renewGoogleMapsAdsAsset(assets[index]), index);
    const next = [...assets];
    next[index] = renewed;
    await saveGoogleMapsAdsAssets(next);
    await syncCustomerDatesFromGoogleMapsAds(renewed);

    return NextResponse.json({ ok: true, asset: renewed });
  } catch (error) {
    console.error("POST /api/googlemaps-ads-assets/renew failed", error);
    return NextResponse.json({ ok: false, error: "Không thể gia hạn quảng cáo Google Maps." }, { status: 500 });
  }
}

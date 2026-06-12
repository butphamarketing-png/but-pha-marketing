import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { sanitizeGoogleMapsAdsAsset } from "@/lib/googlemaps-ads-assets";
import { loadGoogleMapsAdsAssets, saveGoogleMapsAdsAssets } from "@/lib/googlemaps-ads-assets-store";

export async function GET(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const { assets, serverOk } = await loadGoogleMapsAdsAssets();
    if (!serverOk) {
      return NextResponse.json({ ok: false, error: "Supabase đang không khả dụng.", offline: true }, { status: 503 });
    }
    return NextResponse.json({ ok: true, assets });
  } catch (error) {
    console.error("GET /api/googlemaps-ads-assets failed", error);
    return NextResponse.json({ ok: false, error: "Không thể tải danh sách quảng cáo Google Maps." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json().catch(() => null);
    const rawList = Array.isArray(body?.assets) ? body.assets : [];
    const assets = rawList.map(sanitizeGoogleMapsAdsAsset);
    await saveGoogleMapsAdsAssets(assets);
    return NextResponse.json({ ok: true, assets });
  } catch (error) {
    console.error("PUT /api/googlemaps-ads-assets failed", error);
    return NextResponse.json({ ok: false, error: "Không thể lưu danh sách quảng cáo Google Maps." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { sanitizeWebsiteAdsAsset } from "@/lib/website-ads-assets";
import { loadWebsiteAdsAssets, saveWebsiteAdsAssets } from "@/lib/website-ads-assets-store";

export async function GET(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const { assets, serverOk } = await loadWebsiteAdsAssets();
    if (!serverOk) {
      return NextResponse.json({ ok: false, error: "Supabase đang không khả dụng.", offline: true }, { status: 503 });
    }
    return NextResponse.json({ ok: true, assets });
  } catch (error) {
    console.error("GET /api/website-ads-assets failed", error);
    return NextResponse.json({ ok: false, error: "Không thể tải danh sách quảng cáo website." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json().catch(() => null);
    const rawList = Array.isArray(body?.assets) ? body.assets : [];
    const assets = rawList.map(sanitizeWebsiteAdsAsset);
    await saveWebsiteAdsAssets(assets);
    return NextResponse.json({ ok: true, assets });
  } catch (error) {
    console.error("PUT /api/website-ads-assets failed", error);
    return NextResponse.json({ ok: false, error: "Không thể lưu danh sách quảng cáo website." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { sanitizeGoogleMapsDesignAsset } from "@/lib/googlemaps-design-assets";
import { loadGoogleMapsDesignAssets, saveGoogleMapsDesignAssets } from "@/lib/googlemaps-design-assets-store";

export async function GET(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const { assets, serverOk } = await loadGoogleMapsDesignAssets();
    if (!serverOk) {
      return NextResponse.json({ ok: false, error: "Supabase đang không khả dụng.", offline: true }, { status: 503 });
    }
    return NextResponse.json({ ok: true, assets });
  } catch (error) {
    console.error("GET /api/googlemaps-design-assets failed", error);
    return NextResponse.json({ ok: false, error: "Không thể tải danh sách thiết kế Maps." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json().catch(() => null);
    const rawList = Array.isArray(body?.assets) ? body.assets : [];
    const assets = rawList.map((row: unknown, index: number) => sanitizeGoogleMapsDesignAsset(row, index));
    await saveGoogleMapsDesignAssets(assets);
    return NextResponse.json({ ok: true, assets });
  } catch (error) {
    console.error("PUT /api/googlemaps-design-assets failed", error);
    return NextResponse.json({ ok: false, error: "Không thể lưu danh sách thiết kế Maps." }, { status: 500 });
  }
}

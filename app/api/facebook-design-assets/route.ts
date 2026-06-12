import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { sanitizeFacebookDesignAsset } from "@/lib/facebook-design-assets";
import { loadFacebookDesignAssets, saveFacebookDesignAssets } from "@/lib/facebook-design-assets-store";

export async function GET(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const { assets, serverOk } = await loadFacebookDesignAssets();
    if (!serverOk) {
      return NextResponse.json({ ok: false, error: "Supabase đang không khả dụng.", offline: true }, { status: 503 });
    }
    return NextResponse.json({ ok: true, assets });
  } catch (error) {
    console.error("GET /api/facebook-design-assets failed", error);
    return NextResponse.json({ ok: false, error: "Không thể tải danh sách thiết kế Facebook." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json().catch(() => null);
    const rawList = Array.isArray(body?.assets) ? body.assets : [];
    const assets = rawList.map((row: unknown, index: number) => sanitizeFacebookDesignAsset(row, index));
    await saveFacebookDesignAssets(assets);
    return NextResponse.json({ ok: true, assets });
  } catch (error) {
    console.error("PUT /api/facebook-design-assets failed", error);
    return NextResponse.json({ ok: false, error: "Không thể lưu danh sách thiết kế Facebook." }, { status: 500 });
  }
}

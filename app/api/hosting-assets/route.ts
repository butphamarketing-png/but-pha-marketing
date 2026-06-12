import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { sanitizeHostingAsset } from "@/lib/hosting-assets";
import { loadHostingAssets, saveHostingAssets } from "@/lib/hosting-assets-store";

export async function GET(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const { assets, serverOk } = await loadHostingAssets();
    if (!serverOk) {
      return NextResponse.json(
        { ok: false, error: "Supabase đang không khả dụng.", offline: true },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true, assets });
  } catch (error) {
    console.error("GET /api/hosting-assets failed", error);
    return NextResponse.json({ ok: false, error: "Không thể tải danh sách hosting." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json().catch(() => null);
    const rawList = Array.isArray(body?.assets) ? body.assets : [];
    const assets = rawList.map(sanitizeHostingAsset);
    await saveHostingAssets(assets);
    return NextResponse.json({ ok: true, assets });
  } catch (error) {
    console.error("PUT /api/hosting-assets failed", error);
    return NextResponse.json({ ok: false, error: "Không thể lưu danh sách hosting." }, { status: 500 });
  }
}

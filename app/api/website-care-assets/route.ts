import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { sanitizeWebsiteCareAsset } from "@/lib/website-care-assets";
import { loadWebsiteCareAssets, saveWebsiteCareAssets } from "@/lib/website-care-assets-store";

export async function GET(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const { assets, serverOk } = await loadWebsiteCareAssets();
    if (!serverOk) {
      return NextResponse.json({ ok: false, error: "Supabase đang không khả dụng.", offline: true }, { status: 503 });
    }
    return NextResponse.json({ ok: true, assets });
  } catch (error) {
    console.error("GET /api/website-care-assets failed", error);
    return NextResponse.json({ ok: false, error: "Không thể tải danh sách chăm sóc website." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json().catch(() => null);
    const rawList = Array.isArray(body?.assets) ? body.assets : [];
    const assets = rawList.map(sanitizeWebsiteCareAsset);
    await saveWebsiteCareAssets(assets);
    return NextResponse.json({ ok: true, assets });
  } catch (error) {
    console.error("PUT /api/website-care-assets failed", error);
    return NextResponse.json({ ok: false, error: "Không thể lưu danh sách chăm sóc website." }, { status: 500 });
  }
}

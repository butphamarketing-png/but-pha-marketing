import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { renewWebsiteCareAsset, sanitizeWebsiteCareAsset } from "@/lib/website-care-assets";
import {
  loadWebsiteCareAssets,
  saveWebsiteCareAssets,
  syncCustomerDatesFromWebsiteCare,
} from "@/lib/website-care-assets-store";

export async function POST(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const id = typeof body?.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ ok: false, error: "Thiếu id chăm sóc website." }, { status: 400 });
    }

    const { assets, serverOk } = await loadWebsiteCareAssets();
    if (!serverOk) {
      return NextResponse.json({ ok: false, error: "Supabase không khả dụng." }, { status: 503 });
    }

    const index = assets.findIndex((row) => row.id === id);
    if (index < 0) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy bản ghi." }, { status: 404 });
    }

    const renewed = sanitizeWebsiteCareAsset(renewWebsiteCareAsset(assets[index]), index);
    const next = [...assets];
    next[index] = renewed;
    await saveWebsiteCareAssets(next);
    await syncCustomerDatesFromWebsiteCare(renewed);

    return NextResponse.json({ ok: true, asset: renewed });
  } catch (error) {
    console.error("POST /api/website-care-assets/renew failed", error);
    return NextResponse.json({ ok: false, error: "Không thể gia hạn chăm sóc website." }, { status: 500 });
  }
}

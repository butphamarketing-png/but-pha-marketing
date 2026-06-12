import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { renewFacebookCareAsset, sanitizeFacebookCareAsset } from "@/lib/facebook-care-assets";
import {
  loadFacebookCareAssets,
  saveFacebookCareAssets,
  syncCustomerDatesFromFacebookCare,
} from "@/lib/facebook-care-assets-store";

export async function POST(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const id = typeof body?.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ ok: false, error: "Thiếu id chăm sóc Facebook." }, { status: 400 });
    }

    const { assets, serverOk } = await loadFacebookCareAssets();
    if (!serverOk) {
      return NextResponse.json({ ok: false, error: "Supabase không khả dụng." }, { status: 503 });
    }

    const index = assets.findIndex((row) => row.id === id);
    if (index < 0) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy bản ghi." }, { status: 404 });
    }

    const renewed = sanitizeFacebookCareAsset(renewFacebookCareAsset(assets[index]), index);
    const next = [...assets];
    next[index] = renewed;
    await saveFacebookCareAssets(next);
    await syncCustomerDatesFromFacebookCare(renewed);

    return NextResponse.json({ ok: true, asset: renewed });
  } catch (error) {
    console.error("POST /api/facebook-care-assets/renew failed", error);
    return NextResponse.json({ ok: false, error: "Không thể gia hạn chăm sóc Facebook." }, { status: 500 });
  }
}

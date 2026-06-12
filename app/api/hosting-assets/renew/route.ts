import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { renewHostingAsset, sanitizeHostingAsset } from "@/lib/hosting-assets";
import {
  loadHostingAssets,
  saveHostingAssets,
  syncCustomerDatesFromHosting,
} from "@/lib/hosting-assets-store";

export async function POST(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const id = typeof body?.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ ok: false, error: "Thiếu id hosting." }, { status: 400 });
    }

    const { assets, serverOk } = await loadHostingAssets();
    if (!serverOk) {
      return NextResponse.json({ ok: false, error: "Supabase không khả dụng." }, { status: 503 });
    }

    const index = assets.findIndex((row) => row.id === id);
    if (index < 0) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy hosting." }, { status: 404 });
    }

    const renewed = sanitizeHostingAsset(renewHostingAsset(assets[index]), index);
    const next = [...assets];
    next[index] = renewed;
    await saveHostingAssets(next);
    await syncCustomerDatesFromHosting(renewed);

    return NextResponse.json({ ok: true, asset: renewed });
  } catch (error) {
    console.error("POST /api/hosting-assets/renew failed", error);
    return NextResponse.json({ ok: false, error: "Không thể gia hạn hosting." }, { status: 500 });
  }
}

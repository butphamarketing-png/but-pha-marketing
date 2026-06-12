import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { renewDomainAsset, sanitizeDomainAsset } from "@/lib/domain-assets";
import {
  loadDomainAssets,
  saveDomainAssets,
  syncCustomerDatesFromDomain,
} from "@/lib/domain-assets-store";

export async function POST(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const id = typeof body?.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ ok: false, error: "Thiếu id domain." }, { status: 400 });
    }

    const { assets, serverOk } = await loadDomainAssets();
    if (!serverOk) {
      return NextResponse.json({ ok: false, error: "Supabase không khả dụng." }, { status: 503 });
    }

    const index = assets.findIndex((row) => row.id === id);
    if (index < 0) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy domain." }, { status: 404 });
    }

    const renewed = sanitizeDomainAsset(renewDomainAsset(assets[index]), index);
    const next = [...assets];
    next[index] = renewed;
    await saveDomainAssets(next);
    await syncCustomerDatesFromDomain(renewed);

    return NextResponse.json({ ok: true, asset: renewed });
  } catch (error) {
    console.error("POST /api/domain-assets/renew failed", error);
    return NextResponse.json({ ok: false, error: "Không thể gia hạn domain." }, { status: 500 });
  }
}

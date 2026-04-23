import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { deleteSeoStudioHistoryItem, getSeoStudioHistory } from "@/lib/seo-studio-history";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const history = await getSeoStudioHistory();
    return NextResponse.json({ items: history });
  } catch (error) {
    console.error("GET /api/ai/history failed", error);
    return NextResponse.json({ error: "Khong the tai lich su SEO Studio." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const id = typeof body?.id === "string" ? body.id.trim() : "";

    if (!id) {
      return NextResponse.json({ error: "Missing history id" }, { status: 400 });
    }

    const items = await deleteSeoStudioHistoryItem(id);
    return NextResponse.json({ items });
  } catch (error) {
    console.error("DELETE /api/ai/history failed", error);
    return NextResponse.json({ error: "Khong the xoa lich su SEO Studio." }, { status: 500 });
  }
}

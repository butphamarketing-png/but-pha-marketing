import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getSeoStudioHistory } from "@/lib/seo-studio-history";

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

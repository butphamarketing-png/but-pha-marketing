import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { syncRecognitionForAllPeriods } from "@/lib/cms-revenue-recognition";
import { canUseCmsDatabase } from "@/lib/cms-express-bridge";

export async function POST(request: Request) {
  if (!isAuthorizedAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!canUseCmsDatabase()) {
    return NextResponse.json(
      { error: "CMS database not configured. Set SUPABASE_DATABASE_URL or DATABASE_URL." },
      { status: 503 },
    );
  }

  try {
    const result = await syncRecognitionForAllPeriods();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("POST /api/cms/regenerate-revenue failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Regenerate failed" },
      { status: 500 },
    );
  }
}

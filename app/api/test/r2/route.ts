export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { isR2Configured, uploadToR2 } from "@/lib/r2-storage";

function isAuthorized(request: Request) {
  const expectedSecret = (process.env.CUSTOMER_RENEWAL_CRON_SECRET || process.env.SEO_AUTOMATION_SECRET || "").trim();
  const authHeader = request.headers.get("authorization") || "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";
  if (expectedSecret && bearerToken === expectedSecret) return true;
  return false;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const configured = isR2Configured();
  if (!configured) {
    return NextResponse.json({
      ok: false,
      configured: false,
      error: "Thiếu một hoặc nhiều biến R2 trên server.",
    });
  }

  try {
    const path = `uploads/media/r2-self-test-${Date.now()}.txt`;
    const body = Buffer.from("ButPha R2 self-test OK", "utf8");
    const publicUrl = await uploadToR2(path, body, "text/plain");
    return NextResponse.json({
      ok: true,
      configured: true,
      uploaded: true,
      path,
      publicUrl,
      bucket: process.env.R2_BUCKET_NAME,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      configured: true,
      uploaded: false,
      error: error instanceof Error ? error.message : "Upload thất bại",
    });
  }
}

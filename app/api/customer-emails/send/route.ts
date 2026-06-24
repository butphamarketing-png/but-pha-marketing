import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import {
  isCustomerEmailType,
  sendCustomerEmailManual,
} from "@/lib/customer-email-service";

export async function POST(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const type = typeof body?.type === "string" ? body.type : "";
    const to = typeof body?.to === "string" ? body.to.trim() : "";
    const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
    const text = typeof body?.text === "string" ? body.text : "";

    if (!isCustomerEmailType(type)) {
      return NextResponse.json({ ok: false, error: "Loại email không hợp lệ." }, { status: 400 });
    }
    if (!to || !subject || !text.trim()) {
      return NextResponse.json(
        { ok: false, error: "Thiếu email đích, tiêu đề hoặc nội dung." },
        { status: 400 },
      );
    }

    const result = await sendCustomerEmailManual({
      type,
      to,
      subject,
      text,
      customerId: typeof body?.customerId === "string" ? body.customerId : undefined,
      assetId: typeof body?.assetId === "string" ? body.assetId : undefined,
      markExpiryNotified: body?.markExpiryNotified !== false,
    });

    if (!result.sent) {
      return NextResponse.json({ ok: false, sent: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    console.error("POST /api/customer-emails/send failed", error);
    return NextResponse.json({ ok: false, error: "Không thể gửi email." }, { status: 500 });
  }
}

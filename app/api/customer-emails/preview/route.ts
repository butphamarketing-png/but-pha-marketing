import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import {
  isCustomerEmailType,
  previewCustomerEmail,
} from "@/lib/customer-email-service";

export async function POST(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const type = typeof body?.type === "string" ? body.type : "";
    if (!isCustomerEmailType(type)) {
      return NextResponse.json({ ok: false, error: "Loại email không hợp lệ." }, { status: 400 });
    }

    const result = await previewCustomerEmail({
      type,
      customerId: typeof body?.customerId === "string" ? body.customerId : undefined,
      customer: body?.customer,
      assetId: typeof body?.assetId === "string" ? body.assetId : undefined,
    });

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ ok: true, preview: result.preview });
  } catch (error) {
    console.error("POST /api/customer-emails/preview failed", error);
    return NextResponse.json({ ok: false, error: "Không thể tạo bản xem trước." }, { status: 500 });
  }
}

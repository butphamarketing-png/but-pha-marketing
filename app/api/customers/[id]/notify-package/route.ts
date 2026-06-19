import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { sanitizeCustomerRecord } from "@/lib/customer-record-sanitize";
import { sendCustomerPackageEmail } from "@/lib/customer-package-email";
import { CUSTOMER_RECORDS_KEY, type CustomerRecord } from "@/lib/customer-records";
import { createServerClient } from "@/lib/supabase";

type StoredPayload = { entries: CustomerRecord[] };

async function loadEntries() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", CUSTOMER_RECORDS_KEY)
    .maybeSingle();
  if (error) throw error;
  return Array.isArray((data?.value as StoredPayload | null)?.entries)
    ? (data!.value as StoredPayload).entries
    : [];
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json().catch(() => null);
    const entries = await loadEntries();
    const index = entries.findIndex((item) => item.id === id);
    const stored = index >= 0 ? entries[index] : null;

    const rawCustomer =
      typeof body?.customer === "object" && body.customer
        ? { ...(stored ?? {}), ...body.customer, id }
        : stored;

    if (!rawCustomer) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy khách hàng." }, { status: 404 });
    }

    const customer = sanitizeCustomerRecord(rawCustomer, Math.max(0, index));
    if (!customer.email.trim()) {
      return NextResponse.json({ ok: false, error: "Nhập Gmail khách hàng trước." }, { status: 400 });
    }

    const result = await sendCustomerPackageEmail(customer);
    if (!result.sent) {
      return NextResponse.json({
        ok: false,
        sent: false,
        error: result.error || "Không gửi được email.",
        subject: "subject" in result ? result.subject : undefined,
        text: "text" in result ? result.text : undefined,
      });
    }

    return NextResponse.json({
      ok: true,
      sent: true,
      subject: result.subject,
      text: result.text,
    });
  } catch (error) {
    console.error("POST /api/customers/[id]/notify-package failed", error);
    return NextResponse.json({ ok: false, error: "Không thể gửi email." }, { status: 500 });
  }
}

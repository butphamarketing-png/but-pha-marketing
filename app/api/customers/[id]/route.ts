import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { createServerClient } from "@/lib/supabase";
import { CUSTOMER_RECORDS_KEY, type CustomerRecord } from "@/lib/customer-records";
import { sanitizeCustomerRecord } from "@/lib/customer-record-sanitize";
import { autoSyncCustomersToCms } from "@/lib/cms-customer-auto-sync";
import { removeErpCustomerByMarketingId } from "@/lib/cms-customer-delete";

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

async function saveEntries(entries: CustomerRecord[]) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: CUSTOMER_RECORDS_KEY, value: { entries } }, { onConflict: "key" });
  if (error) throw error;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const patch = await request.json().catch(() => null);
    const entries = await loadEntries();
    const index = entries.findIndex((item) => item.id === id);
    if (index < 0) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy khách hàng." }, { status: 404 });
    }
    const current = entries[index];
    const merged = {
      ...current,
      ...(typeof patch === "object" && patch ? patch : {}),
      id: current.id,
      createdAt: current.createdAt,
    };
    entries[index] = sanitizeCustomerRecord(merged, index);
    await saveEntries(entries);
    const cmsSync = await autoSyncCustomersToCms([entries[index]]);
    return NextResponse.json({ ok: true, customer: entries[index], cmsSync });
  } catch (error) {
    console.error("PATCH /api/customers/[id] failed", error);
    return NextResponse.json({ ok: false, error: "Không thể cập nhật." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const entries = await loadEntries();
    const next = entries.filter((item) => item.id !== id);
    await saveEntries(next);
    const erpRemoval = await removeErpCustomerByMarketingId(id);
    return NextResponse.json({ ok: true, erpRemoval });
  } catch (error) {
    console.error("DELETE /api/customers/[id] failed", error);
    return NextResponse.json({ ok: false, error: "Không thể xóa." }, { status: 500 });
  }
}

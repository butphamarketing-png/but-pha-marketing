import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  CUSTOMER_BACKUP_KEY,
  hasMeaningfulCustomerData,
  isSampleCustomerData,
  type CustomerBackupPayload,
} from "@/lib/customer-backup";
import { CUSTOMER_RECORDS_KEY, type CustomerRecord } from "@/lib/customer-records";

type StoredPayload = { entries: CustomerRecord[] };

async function loadBackup(): Promise<CustomerBackupPayload | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value, updated_at")
    .eq("key", CUSTOMER_BACKUP_KEY)
    .maybeSingle();

  if (error) throw error;
  const value = data?.value as CustomerBackupPayload | null;
  if (!value || !Array.isArray(value.entries) || value.entries.length === 0) return null;

  return {
    entries: value.entries,
    savedAt: typeof value.savedAt === "string" ? value.savedAt : data?.updated_at ?? new Date().toISOString(),
  };
}

export async function GET(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const backup = await loadBackup();
    if (!backup || !hasMeaningfulCustomerData(backup.entries) || isSampleCustomerData(backup.entries)) {
      return NextResponse.json({ ok: true, backup: null });
    }

    return NextResponse.json({
      ok: true,
      backup: {
        count: backup.entries.length,
        savedAt: backup.savedAt,
        preview: backup.entries.slice(0, 3).map((row) => ({
          fullName: row.fullName,
          phone: row.phone,
          service: row.service,
        })),
      },
    });
  } catch (error) {
    console.error("GET /api/customers/restore failed", error);
    return NextResponse.json({ ok: false, error: "Không thể đọc bản sao lưu trên máy chủ." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const backup = await loadBackup();
    if (!backup || !hasMeaningfulCustomerData(backup.entries) || isSampleCustomerData(backup.entries)) {
      return NextResponse.json({ ok: false, error: "Không có bản sao lưu hợp lệ trên máy chủ." }, { status: 404 });
    }

    const supabase = createServerClient();
    const payload: StoredPayload = { entries: backup.entries };
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: CUSTOMER_RECORDS_KEY, value: payload }, { onConflict: "key" });
    if (error) throw error;

    return NextResponse.json({
      ok: true,
      customers: backup.entries,
      restoredAt: backup.savedAt,
    });
  } catch (error) {
    console.error("POST /api/customers/restore failed", error);
    return NextResponse.json({ ok: false, error: "Không thể khôi phục dữ liệu từ máy chủ." }, { status: 500 });
  }
}

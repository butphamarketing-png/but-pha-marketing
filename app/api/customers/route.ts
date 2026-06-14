import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import {
  CUSTOMER_BACKUP_KEY,
  hasMeaningfulCustomerData,
  isSampleCustomerData,
  type CustomerBackupPayload,
} from "@/lib/customer-backup";
import {
  CUSTOMER_RECORDS_KEY,
  type CustomerRecord,
  createEmptyCustomer,
} from "@/lib/customer-records";
import { sanitizeCustomerRecord } from "@/lib/customer-record-sanitize";
import { autoSyncCustomersToCms } from "@/lib/cms-customer-auto-sync";

type StoredPayload = { entries: CustomerRecord[] };

function sanitizeRecord(raw: unknown, index = 0): CustomerRecord {
  return sanitizeCustomerRecord(raw, index);
}

async function loadEntries(): Promise<{ customers: CustomerRecord[]; serverOk: boolean }> {
  const supabase = createServerClient();
  let entries: unknown[] = [];
  let serverOk = true;

  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", CUSTOMER_RECORDS_KEY)
      .maybeSingle();

    if (!error && Array.isArray((data?.value as StoredPayload | null)?.entries)) {
      entries = (data?.value as StoredPayload).entries as unknown[];
    } else if (error) {
      console.error("Supabase load failed:", error);
      serverOk = false;
    }
  } catch (e) {
    console.error("Supabase load error:", e);
    serverOk = false;
  }

  return { customers: entries.map((entry, index) => sanitizeCustomerRecord(entry, index)), serverOk };
}

async function saveServerBackup(entries: CustomerRecord[]) {
  if (!hasMeaningfulCustomerData(entries) || isSampleCustomerData(entries)) return;

  const supabase = createServerClient();
  const payload: CustomerBackupPayload = {
    entries,
    savedAt: new Date().toISOString(),
  };
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: CUSTOMER_BACKUP_KEY, value: payload }, { onConflict: "key" });
  if (error) console.error("Customer backup save failed:", error);
}

async function saveEntries(entries: CustomerRecord[]) {
  const supabase = createServerClient();
  const { customers: current, serverOk } = await loadEntries();
  if (serverOk && hasMeaningfulCustomerData(current) && !isSampleCustomerData(current)) {
    await saveServerBackup(current);
  }

  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: CUSTOMER_RECORDS_KEY, value: { entries } }, { onConflict: "key" });
  if (error) throw error;
}

export async function GET(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const { customers, serverOk } = await loadEntries();
    if (!serverOk) {
      return NextResponse.json(
        { ok: false, error: "Supabase đang không khả dụng.", offline: true },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true, customers });
  } catch (error) {
    console.error("GET /api/customers failed", error);
    return NextResponse.json(
      { ok: false, error: "Không thể tải danh sách khách hàng.", offline: true },
      { status: 503 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json().catch(() => null);
    const rawList = Array.isArray(body?.customers) ? body.customers : [];
    const customers = rawList.map(sanitizeRecord);
    await saveEntries(customers);
    const cmsSync = await autoSyncCustomersToCms(customers);
    return NextResponse.json({ ok: true, customers, cmsSync });
  } catch (error) {
    console.error("PUT /api/customers failed", error);
    return NextResponse.json({ ok: false, error: "Không thể lưu danh sách khách hàng." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json().catch(() => null);
    const { customers: entries } = await loadEntries();
    const customer = sanitizeRecord(body?.customer ?? createEmptyCustomer(), entries.length);
    entries.unshift(customer);
    await saveEntries(entries);
    const cmsSync = await autoSyncCustomersToCms([customer]);
    return NextResponse.json({ ok: true, customer, cmsSync });
  } catch (error) {
    console.error("POST /api/customers failed", error);
    return NextResponse.json({ ok: false, error: "Không thể thêm khách hàng." }, { status: 500 });
  }
}

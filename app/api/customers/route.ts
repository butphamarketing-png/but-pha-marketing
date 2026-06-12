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
  syncCustomerContract,
  type CustomerRecord,
  createEmptyCustomer,
} from "@/lib/customer-records";

type StoredPayload = { entries: CustomerRecord[] };

function sanitizeRecord(raw: unknown, index: number): CustomerRecord {
  const base = createEmptyCustomer();
  const item = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const now = new Date().toISOString();

  const legacyAmount = typeof item.amount === "number" ? item.amount : Number(item.amount) || 0;
  const amountPaid =
    typeof item.amountPaid === "number" ? item.amountPaid : Number(item.amountPaid) || legacyAmount;
  const amountUnpaid =
    typeof item.amountUnpaid === "number" ? item.amountUnpaid : Number(item.amountUnpaid) || 0;
  const platformRaw = typeof item.platform === "string" ? item.platform : base.platform;
  const platform =
    platformRaw === "website" || platformRaw === "googlemaps" || platformRaw === "facebook"
      ? platformRaw
      : "facebook";
  const service = typeof item.service === "string" ? item.service : base.service;
  const contractBaseRaw =
    typeof item.contractBase === "string" ? item.contractBase : typeof item.contractCode === "string" ? item.contractCode : "";
  const contractCodeRaw = typeof item.contractCode === "string" ? item.contractCode : "";
  const { contractBase, contractCode } = syncCustomerContract(
    {
      contractBase: contractBaseRaw,
      contractCode: contractCodeRaw,
      platform,
      service,
    },
    index,
  );

  return {
    id: typeof item.id === "string" && item.id.trim() ? item.id : `${Date.now()}-${index}`,
    contractBase,
    contractCode,
    fullName: typeof item.fullName === "string" ? item.fullName : "",
    industry: typeof item.industry === "string" ? item.industry : "",
    establishmentName: typeof item.establishmentName === "string" ? item.establishmentName : "",
    taxId: typeof item.taxId === "string" ? item.taxId : "",
    phone: typeof item.phone === "string" ? item.phone : "",
    email: typeof item.email === "string" ? item.email : "",
    platform,
    service,
    subscriptionPackage: typeof item.subscriptionPackage === "string" ? item.subscriptionPackage : "",
    registeredAt:
      typeof item.registeredAt === "string" && item.registeredAt.trim() ? item.registeredAt.slice(0, 10) : null,
    expiresAt: typeof item.expiresAt === "string" && item.expiresAt.trim() ? item.expiresAt.slice(0, 10) : null,
    platformLink: typeof item.platformLink === "string" ? item.platformLink : "",
    amountPaid,
    amountUnpaid,
    renewalReminderEnabled: item.renewalReminderEnabled !== false,
    lastRenewalReminderAt:
      typeof item.lastRenewalReminderAt === "string" && item.lastRenewalReminderAt.trim()
        ? item.lastRenewalReminderAt
        : null,
    createdAt: typeof item.createdAt === "string" ? item.createdAt : now,
    updatedAt: now,
  };
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

  return { customers: entries.map(sanitizeRecord), serverOk };
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
    return NextResponse.json({ ok: true, customers });
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
    return NextResponse.json({ ok: true, customer });
  } catch (error) {
    console.error("POST /api/customers failed", error);
    return NextResponse.json({ ok: false, error: "Không thể thêm khách hàng." }, { status: 500 });
  }
}

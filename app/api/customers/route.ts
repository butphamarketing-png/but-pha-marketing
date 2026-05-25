import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  CUSTOMER_RECORDS_KEY,
  type CustomerRecord,
  createEmptyCustomer,
} from "@/lib/customer-records";

type StoredPayload = { entries: CustomerRecord[] };

function sanitizeRecord(raw: unknown, index: number): CustomerRecord {
  const base = createEmptyCustomer();
  const item = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const now = new Date().toISOString();

  return {
    id: typeof item.id === "string" && item.id.trim() ? item.id : `${Date.now()}-${index}`,
    fullName: typeof item.fullName === "string" ? item.fullName : "",
    industry: typeof item.industry === "string" ? item.industry : "",
    establishmentName: typeof item.establishmentName === "string" ? item.establishmentName : "",
    phone: typeof item.phone === "string" ? item.phone : "",
    email: typeof item.email === "string" ? item.email : "",
    platform: typeof item.platform === "string" ? item.platform : base.platform,
    service: typeof item.service === "string" ? item.service : "",
    registeredAt:
      typeof item.registeredAt === "string" && item.registeredAt.trim() ? item.registeredAt.slice(0, 10) : null,
    expiresAt: typeof item.expiresAt === "string" && item.expiresAt.trim() ? item.expiresAt.slice(0, 10) : null,
    platformLink: typeof item.platformLink === "string" ? item.platformLink : "",
    amount: typeof item.amount === "number" ? item.amount : Number(item.amount) || 0,
    renewalReminderEnabled: item.renewalReminderEnabled !== false,
    lastRenewalReminderAt:
      typeof item.lastRenewalReminderAt === "string" && item.lastRenewalReminderAt.trim()
        ? item.lastRenewalReminderAt
        : null,
    createdAt: typeof item.createdAt === "string" ? item.createdAt : now,
    updatedAt: now,
  };
}

async function loadEntries() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", CUSTOMER_RECORDS_KEY)
    .maybeSingle();

  if (error) throw error;
  const entries = Array.isArray((data?.value as StoredPayload | null)?.entries)
    ? ((data?.value as StoredPayload).entries as unknown[])
    : [];
  return entries.map(sanitizeRecord);
}

async function saveEntries(entries: CustomerRecord[]) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: CUSTOMER_RECORDS_KEY, value: { entries } }, { onConflict: "key" });
  if (error) throw error;
}

export async function GET(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const customers = await loadEntries();
    return NextResponse.json({ ok: true, customers });
  } catch (error) {
    console.error("GET /api/customers failed", error);
    return NextResponse.json({ ok: true, customers: [] });
  }
}

export async function PUT(request: Request) {
  try {
    if (!isAdminRequest(request)) {
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
    if (!isAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json().catch(() => null);
    const entries = await loadEntries();
    const customer = sanitizeRecord(body?.customer ?? createEmptyCustomer(), entries.length);
    entries.unshift(customer);
    await saveEntries(entries);
    return NextResponse.json({ ok: true, customer });
  } catch (error) {
    console.error("POST /api/customers failed", error);
    return NextResponse.json({ ok: false, error: "Không thể thêm khách hàng." }, { status: 500 });
  }
}

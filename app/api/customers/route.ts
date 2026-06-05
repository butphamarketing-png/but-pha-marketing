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

function getSampleCustomers(): CustomerRecord[] {
  const now = new Date().toISOString();
  return [
    {
      id: "sample-1",
      fullName: "Nguyễn Văn A",
      industry: "Nha khoa",
      establishmentName: "Nha Khoa Smile",
      phone: "0901234567",
      email: "nhakhoasmile@gmail.com",
      platform: "facebook",
      service: "Viết bài FB 30 ngày + Quảng cáo",
      registeredAt: "2026-05-01",
      expiresAt: "2026-06-30",
      platformLink: "https://facebook.com/nhakhoasmile",
      amount: 3500000,
      renewalReminderEnabled: true,
      lastRenewalReminderAt: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "sample-2",
      fullName: "Trần Thị B",
      industry: "Spa & Beauty",
      establishmentName: "Spa Hoàng Yến",
      phone: "0912345678",
      email: "spahoangyen@gmail.com",
      platform: "instagram",
      service: "Chăm sóc Instagram 15 bài/tháng",
      registeredAt: "2026-04-15",
      expiresAt: "2026-07-15",
      platformLink: "https://instagram.com/spahoangyen",
      amount: 2500000,
      renewalReminderEnabled: true,
      lastRenewalReminderAt: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "sample-3",
      fullName: "Lê Văn C",
      industry: "Nhà hàng",
      establishmentName: "Nhà Hàng Việt Nam",
      phone: "0987654321",
      email: "nhahangvietnam@gmail.com",
      platform: "googlemaps",
      service: "SEO Google Maps 3 tháng",
      registeredAt: "2026-03-20",
      expiresAt: "2026-06-20",
      platformLink: "https://maps.google.com/?q=nhà+hàng+việt+nam",
      amount: 5000000,
      renewalReminderEnabled: true,
      lastRenewalReminderAt: null,
      createdAt: now,
      updatedAt: now,
    },
  ];
}

async function loadEntries() {
  const supabase = createServerClient();
  let entries: unknown[] = [];
  
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
    }
  } catch (e) {
    console.error("Supabase load error:", e);
  }

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

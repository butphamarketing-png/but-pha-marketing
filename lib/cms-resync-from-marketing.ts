import { createServerClient } from "@/lib/supabase";
import { CUSTOMER_RECORDS_KEY, type CustomerRecord } from "@/lib/customer-records";
import { autoSyncCustomersToCms, type CmsAutoSyncOutcome } from "@/lib/cms-customer-auto-sync";
import { db, customersTable } from "@/lib/cms-internal/db";
import { eq } from "drizzle-orm";

type StoredPayload = { entries: CustomerRecord[] };

export type ResyncFromMarketingOutcome = CmsAutoSyncOutcome & {
  externalId?: string | null;
  marketingFound?: boolean;
};

export async function loadMarketingCustomerByExternalId(
  externalId: string,
): Promise<CustomerRecord | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", CUSTOMER_RECORDS_KEY)
    .maybeSingle();

  if (error) throw new Error(error.message);

  const entries = Array.isArray((data?.value as StoredPayload | null)?.entries)
    ? (data!.value as StoredPayload).entries
    : [];

  return entries.find((row) => row.id === externalId) ?? null;
}

export async function resyncErpCustomerFromMarketing(
  erpCustomerId: number,
): Promise<ResyncFromMarketingOutcome> {
  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, erpCustomerId))
    .limit(1);

  if (!customer) {
    return { status: "error", error: "Không tìm thấy khách hàng ERP." };
  }

  if (!customer.externalId) {
    return {
      status: "error",
      error: "Khách ERP chưa liên kết marketing (thiếu externalId). Sửa từ admin Khách Hàng marketing.",
      externalId: null,
      marketingFound: false,
    };
  }

  let record: CustomerRecord | null;
  try {
    record = await loadMarketingCustomerByExternalId(customer.externalId);
  } catch (error) {
    return {
      status: "error",
      error: error instanceof Error ? error.message : "Không đọc được dữ liệu marketing.",
      externalId: customer.externalId,
      marketingFound: false,
    };
  }

  if (!record) {
    return {
      status: "error",
      error: "Không tìm thấy bản ghi marketing tương ứng.",
      externalId: customer.externalId,
      marketingFound: false,
    };
  }

  if (!record.contractCode?.trim()) {
    return {
      status: "error",
      error: "Marketing thiếu MSHĐ (contractCode) — chưa thể sync ERP.",
      externalId: customer.externalId,
      marketingFound: true,
    };
  }

  const outcome = await autoSyncCustomersToCms([record]);
  return { ...outcome, externalId: customer.externalId, marketingFound: true };
}

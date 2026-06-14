import type { Customer } from "@/lib/cms-internal/db/schema/customers";

export const CUSTOMER_READ_ONLY_MESSAGE =
  "Khách hàng chỉ sửa từ Admin Marketing (/adminbp). CMS chỉ xem và đồng bộ.";

export function serializeCustomerForApi(row: Customer) {
  return {
    ...row,
    taxCode: row.taxId ?? null,
    status: row.customerStatus ?? "active",
  };
}

export function mapCustomerInputToDb(body: Record<string, unknown>) {
  const mapped: Record<string, unknown> = { ...body };

  if ("taxCode" in body && body.taxCode !== undefined) {
    mapped.taxId = body.taxCode;
    delete mapped.taxCode;
  }
  if ("status" in body && body.status !== undefined) {
    mapped.customerStatus = body.status;
    delete mapped.status;
  }

  return mapped;
}

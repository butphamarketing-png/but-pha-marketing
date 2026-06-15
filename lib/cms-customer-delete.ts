import { canUseCmsDatabase } from "@/lib/cms-express-bridge";
import { db, customersTable } from "@/lib/cms-internal/db";
import { eq } from "drizzle-orm";

export type ErpCustomerRemovalOutcome =
  | { action: "deleted"; erpCustomerId: number }
  | { action: "soft_deleted"; erpCustomerId: number }
  | { action: "not_found" }
  | { action: "skipped"; reason: "no_database" }
  | { action: "error"; error: string };

export async function removeErpCustomerByMarketingId(
  marketingId: string,
): Promise<ErpCustomerRemovalOutcome> {
  if (!canUseCmsDatabase()) {
    return { action: "skipped", reason: "no_database" };
  }

  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.externalId, marketingId))
    .limit(1);

  if (!customer) {
    return { action: "not_found" };
  }

  try {
    await db.delete(customersTable).where(eq(customersTable.id, customer.id));
    return { action: "deleted", erpCustomerId: customer.id };
  } catch (error) {
    try {
      await db
        .update(customersTable)
        .set({
          customerStatus: "removed",
          name: `[Đã xóa MK] ${customer.name}`.slice(0, 240),
          externalId: null,
          updatedAt: new Date(),
        })
        .where(eq(customersTable.id, customer.id));
      return { action: "soft_deleted", erpCustomerId: customer.id };
    } catch (inner) {
      return {
        action: "error",
        error: inner instanceof Error ? inner.message : "Không thể xóa KH ERP.",
      };
    }
  }
}

export async function removeErpCustomersByMarketingIds(marketingIds: string[]) {
  const outcomes: ErpCustomerRemovalOutcome[] = [];
  for (const id of marketingIds) {
    if (!id?.trim()) continue;
    outcomes.push(await removeErpCustomerByMarketingId(id));
  }
  return outcomes;
}

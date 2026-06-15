import { canUseCmsDatabase } from "@/lib/cms-express-bridge";
import { syncCustomerRecordsToCms, type CmsSyncResult } from "@/lib/cms-customer-sync";
import { removeErpCustomersByMarketingIds } from "@/lib/cms-customer-delete";
import type { CustomerRecord } from "@/lib/customer-records";

const emptyResult = (): CmsSyncResult => ({
  customersCreated: 0,
  customersUpdated: 0,
  contractsCreated: 0,
  contractsUpdated: 0,
  periodsCreated: 0,
  periodsUpdated: 0,
  receiptsCreated: 0,
  receiptsUpdated: 0,
  receiptsRemoved: 0,
  invoicesCreated: 0,
  invoicesUpdated: 0,
  invoicesIssued: 0,
  invoicesCancelled: 0,
  invoicesDraft: 0,
  recognitionEntries: 0,
  customersRemoved: 0,
  skipped: 0,
  errors: [],
});

export type CmsAutoSyncOutcome =
  | { status: "skipped"; reason: "no_database" }
  | { status: "ok"; result: CmsSyncResult }
  | { status: "error"; error: string };

export type CmsAutoSyncOptions = {
  removedMarketingIds?: string[];
};

export async function autoSyncCustomersToCms(
  records: CustomerRecord[],
  options?: CmsAutoSyncOptions,
): Promise<CmsAutoSyncOutcome> {
  if (!canUseCmsDatabase()) {
    return { status: "skipped", reason: "no_database" };
  }

  try {
    const result = emptyResult();

    const removedIds = options?.removedMarketingIds?.filter(Boolean) ?? [];
    if (removedIds.length > 0) {
      const removals = await removeErpCustomersByMarketingIds(removedIds);
      result.customersRemoved = removals.filter(
        (item) => item.action === "deleted" || item.action === "soft_deleted",
      ).length;
      for (const item of removals) {
        if (item.action === "error") {
          result.errors.push(item.error);
        }
      }
    }

    const toSync = records.filter((record) => record.contractCode?.trim());
    result.skipped = records.length - toSync.length;

    if (toSync.length === 0) {
      return { status: "ok", result };
    }

    const syncResult = await syncCustomerRecordsToCms(toSync);
    return {
      status: "ok",
      result: {
        ...syncResult,
        customersRemoved: result.customersRemoved,
        skipped: result.skipped,
        errors: [...result.errors, ...syncResult.errors],
      },
    };
  } catch (error) {
    console.error("CMS auto-sync failed", error);
    return {
      status: "error",
      error: error instanceof Error ? error.message : "CMS sync failed",
    };
  }
}

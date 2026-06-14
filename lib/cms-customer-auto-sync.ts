import { canUseCmsDatabase } from "@/lib/cms-express-bridge";
import { syncCustomerRecordsToCms, type CmsSyncResult } from "@/lib/cms-customer-sync";
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
  skipped: 0,
  errors: [],
});

export type CmsAutoSyncOutcome =
  | { status: "skipped"; reason: "no_database" }
  | { status: "ok"; result: CmsSyncResult }
  | { status: "error"; error: string };

export async function autoSyncCustomersToCms(
  records: CustomerRecord[],
): Promise<CmsAutoSyncOutcome> {
  if (!canUseCmsDatabase()) {
    return { status: "skipped", reason: "no_database" };
  }

  const toSync = records.filter((record) => record.contractCode?.trim());
  if (toSync.length === 0) {
    return { status: "ok", result: emptyResult() };
  }

  try {
    const result = await syncCustomerRecordsToCms(toSync);
    return { status: "ok", result };
  } catch (error) {
    console.error("CMS auto-sync failed", error);
    return {
      status: "error",
      error: error instanceof Error ? error.message : "CMS sync failed",
    };
  }
}

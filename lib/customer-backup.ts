import type { CustomerRecord } from "./customer-records";

export const CUSTOMER_BACKUP_KEY = "customer_records_backup";
export const LOCAL_CUSTOMER_BACKUP_KEY = "bpm-customer-records-backup";

export type CustomerBackupPayload = {
  entries: CustomerRecord[];
  savedAt: string;
};

const SAMPLE_IDS = new Set(["sample-1", "sample-2", "sample-3"]);

export function isSampleCustomerData(customers: CustomerRecord[]) {
  if (customers.length !== 3) return false;
  return customers.every((row) => SAMPLE_IDS.has(row.id));
}

export function hasMeaningfulCustomerData(customers: CustomerRecord[]) {
  return customers.some(
    (row) =>
      row.fullName.trim() ||
      row.phone.trim() ||
      row.service.trim() ||
      row.establishmentName?.trim() ||
      row.email?.trim() ||
      row.contractCode?.trim() ||
      row.taxId?.trim(),
  );
}

export function getUsableLocalBackup(): CustomerBackupPayload | null {
  const backup = loadLocalCustomerBackup();
  if (!backup || !hasMeaningfulCustomerData(backup.entries) || isSampleCustomerData(backup.entries)) {
    return null;
  }
  return backup;
}

export function loadLocalCustomerBackup(): CustomerBackupPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LOCAL_CUSTOMER_BACKUP_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CustomerBackupPayload;
    if (!Array.isArray(parsed?.entries) || typeof parsed.savedAt !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveLocalCustomerBackup(customers: CustomerRecord[]) {
  if (typeof window === "undefined" || !hasMeaningfulCustomerData(customers) || isSampleCustomerData(customers)) {
    return;
  }
  const payload: CustomerBackupPayload = {
    entries: customers,
    savedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(LOCAL_CUSTOMER_BACKUP_KEY, JSON.stringify(payload));
  } catch {
    // Ignore quota errors
  }
}

export function formatBackupTime(savedAt: string) {
  const date = new Date(savedAt);
  if (Number.isNaN(date.getTime())) return savedAt;
  return date.toLocaleString("vi-VN");
}

export function downloadCustomerBackup(customers: CustomerRecord[]) {
  const payload: CustomerBackupPayload = {
    entries: customers,
    savedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `khach-hang-backup-${payload.savedAt.slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function parseCustomerBackupFile(raw: unknown): CustomerBackupPayload | null {
  const body = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : null;
  if (!body) return null;

  const entries = Array.isArray(body.entries)
    ? body.entries
    : Array.isArray(body.customers)
      ? body.customers
      : null;
  if (!entries) return null;

  return {
    entries: entries as CustomerRecord[],
    savedAt: typeof body.savedAt === "string" ? body.savedAt : new Date().toISOString(),
  };
}

import type { CmsSyncResult } from "@/lib/cms-customer-sync";
import type { CmsAutoSyncOutcome } from "@/lib/cms-customer-auto-sync";

export type CmsSyncDisplay = {
  level: "ok" | "warn" | "error" | "skipped";
  title: string;
  detail: string;
};

export function countCustomersWithContractCode(
  customers: Array<{ contractCode?: string | null }>,
): number {
  return customers.filter((row) => row.contractCode?.trim()).length;
}

export function describeCmsSyncOutcome(
  outcome: CmsAutoSyncOutcome | null | undefined,
  totalCustomers: number,
): CmsSyncDisplay | null {
  if (!outcome) return null;

  if (outcome.status === "skipped") {
    return {
      level: "skipped",
      title: "ERP: Chưa kết nối database",
      detail: "Thiếu SUPABASE_DATABASE_URL trên server — dữ liệu chỉ lưu marketing, chưa đồng bộ ERP.",
    };
  }

  if (outcome.status === "error") {
    return {
      level: "error",
      title: "ERP: Lỗi đồng bộ",
      detail: outcome.error,
    };
  }

  return describeCmsSyncResult(outcome.result, totalCustomers);
}

export function describeCmsSyncResult(
  result: CmsSyncResult,
  totalCustomers: number,
): CmsSyncDisplay {
  const parts = [
    `KH: +${result.customersCreated} / ~${result.customersUpdated}`,
    `Kỳ: +${result.periodsCreated} / ~${result.periodsUpdated}`,
    `PT: +${result.receiptsCreated}`,
    `HĐ: +${result.invoicesCreated}`,
  ];

  if (result.skipped > 0) {
    parts.push(`${result.skipped} KH thiếu MSHĐ`);
  }

  if (result.customersRemoved > 0) {
    parts.push(`Xóa ERP: ${result.customersRemoved}`);
  }

  if (result.errors.length > 0) {
    return {
      level: "warn",
      title: "ERP: Đồng bộ một phần",
      detail: `${parts.join(" · ")} · Lỗi: ${result.errors.slice(0, 5).join("; ")}`,
    };
  }

  const noErpActivity =
    result.customersCreated === 0 &&
    result.customersUpdated === 0 &&
    result.periodsCreated === 0 &&
    result.periodsUpdated === 0;

  if (noErpActivity && result.skipped >= totalCustomers && totalCustomers > 0) {
    return {
      level: "warn",
      title: "ERP: Chưa sync — thiếu MSHĐ",
      detail: "Tất cả khách đều chưa có MSHĐ. Nhập MSHĐ rồi lưu lại.",
    };
  }

  if (noErpActivity && totalCustomers === 0) {
    return {
      level: "warn",
      title: "ERP: Không có khách để sync",
      detail: "Danh sách trống.",
    };
  }

  return {
    level: "ok",
    title: "ERP: Đồng bộ OK",
    detail: parts.join(" · "),
  };
}

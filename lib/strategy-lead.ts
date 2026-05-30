import type { StrategyFormSnapshot } from "./marketing-strategy-profiles";

export type StrategyLeadPayload = StrategyFormSnapshot & {
  kind: "strategy_marketing";
  tierLabel?: string;
  monthTotal?: number;
  setupTotal?: number;
  itemCount?: number;
};

export function parseStrategyLeadNote(note?: string | null): StrategyLeadPayload | null {
  if (!note?.trim()) return null;
  try {
    const raw = JSON.parse(note) as Partial<StrategyLeadPayload>;
    if (raw.kind !== "strategy_marketing") return null;
    return raw as StrategyLeadPayload;
  } catch {
    return null;
  }
}

export function isStrategyLead(lead: { note?: string; service?: string; platform?: string }) {
  if (lead.platform === "chienluocmarketing") return true;
  if (lead.service === "Chiến lược Marketing") return true;
  return parseStrategyLeadNote(lead.note) !== null;
}

export function formatStrategyLeadSummary(payload: StrategyLeadPayload) {
  const parts = [
    payload.companyName,
    payload.industry,
    payload.businessGoal,
    payload.budgetRange,
  ].filter(Boolean);
  if (payload.tierLabel) parts.push(payload.tierLabel);
  return parts.join(" · ");
}

export function formatStrategyLeadDetail(payload: StrategyLeadPayload) {
  const lines = [
    `Công ty: ${payload.companyName}`,
    `Ngành: ${payload.industry}`,
    `Mục tiêu: ${payload.businessGoal}`,
    `Quy mô: ${payload.scale}`,
    `Ngân sách: ${payload.budgetRange}`,
    payload.platformFocus ? `Ưu tiên: ${payload.platformFocus}` : null,
    `Địa chỉ: ${payload.address}`,
    payload.tierLabel ? `Gói đề xuất: ${payload.tierLabel}` : null,
    payload.itemCount != null ? `Số dịch vụ: ${payload.itemCount}` : null,
    payload.existingAssets?.length ? `Đã có: ${payload.existingAssets.join(", ")}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

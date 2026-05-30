/**
 * Ngành nghề theo Hệ thống ngành kinh tế VN (VSIC) — nguồn tra cứu masothue.com (~1.340 mã)
 * Dữ liệu level 4–5 + alias phổ biến (VD: lắp đặt thang máy → 43290)
 */

import rawData from "./masothue-industries.data.json";

export type MasothueIndustry = {
  code: string;
  name: string;
  profileId: string;
  group: string;
  keywords?: string[];
};

export const MASOTHUE_INDUSTRIES = rawData as MasothueIndustry[];

export function masothueToKeywords(item: MasothueIndustry): string[] {
  const base = [
    item.code,
    item.name,
    ...(item.keywords ?? []),
    item.group,
  ];
  return [...new Set(base.map((k) => k.trim()).filter(Boolean))];
}

/**
 * Gợi ý ngành — client dùng danh sách curated; autocomplete đầy đủ qua /api/industry-suggestions
 */

export type { IndustrySuggestion, IndustrySuggestionResult } from "@/lib/industry-suggestions-types";
export { CURATED_INDUSTRY_SUGGESTIONS } from "@/lib/industry-suggestions-curated";
import {
  CURATED_INDUSTRY_SUGGESTIONS,
  findCuratedIndustrySuggestion,
  searchCuratedIndustrySuggestions,
} from "@/lib/industry-suggestions-curated";
import type { IndustrySuggestion, IndustrySuggestionResult } from "@/lib/industry-suggestions-types";

export const INDUSTRY_SUGGESTIONS = CURATED_INDUSTRY_SUGGESTIONS;

export function searchIndustrySuggestions(query: string, limit = 12): IndustrySuggestionResult[] {
  return searchCuratedIndustrySuggestions(query, limit);
}

export function findIndustrySuggestion(text: string): IndustrySuggestion | null {
  return findCuratedIndustrySuggestion(text);
}

export function getIndustrySuggestionCount() {
  return CURATED_INDUSTRY_SUGGESTIONS.length;
}

export function getIndustrySuggestionGroups() {
  const groups = new Map<string, number>();
  for (const item of CURATED_INDUSTRY_SUGGESTIONS) {
    groups.set(item.group, (groups.get(item.group) ?? 0) + 1);
  }
  return [...groups.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

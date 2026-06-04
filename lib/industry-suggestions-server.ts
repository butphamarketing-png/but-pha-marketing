import { readFileSync } from "fs";
import path from "path";
import {
  CURATED_INDUSTRY_SUGGESTIONS,
  searchCuratedIndustrySuggestions,
} from "@/lib/industry-suggestions-curated";
import {
  normalizeIndustryQuery,
  type IndustrySuggestion,
  type IndustrySuggestionResult,
} from "@/lib/industry-suggestions-types";

type MasothueIndustry = {
  code: string;
  name: string;
  profileId: string;
  group: string;
  keywords?: string[];
};

let masothueSuggestionsCache: IndustrySuggestion[] | null = null;
let fullCountCache: number | null = null;

function masothueToKeywords(item: MasothueIndustry): string[] {
  const base = [item.code, item.name, ...(item.keywords ?? []), item.group];
  return [...new Set(base.map((k) => k.trim()).filter(Boolean))];
}

function loadMasothueSuggestions(): IndustrySuggestion[] {
  if (masothueSuggestionsCache) return masothueSuggestionsCache;

  const filePath = path.join(process.cwd(), "lib", "masothue-industries.data.json");
  const rawData = JSON.parse(readFileSync(filePath, "utf8")) as MasothueIndustry[];
  const curatedLabels = new Set(CURATED_INDUSTRY_SUGGESTIONS.map((s) => normalizeIndustryQuery(s.label)));

  masothueSuggestionsCache = rawData
    .filter((item) => !curatedLabels.has(normalizeIndustryQuery(item.name)))
    .map((item) => ({
      label: item.name,
      keywords: masothueToKeywords(item),
      profileId: item.profileId,
      group: item.group,
      vsicCode: item.code,
    }));

  return masothueSuggestionsCache;
}

function scoreSuggestion(suggestion: IndustrySuggestion, query: string): number {
  const q = normalizeIndustryQuery(query);
  if (!q) return 0;

  const label = normalizeIndustryQuery(suggestion.label);
  const keywords = suggestion.keywords.map(normalizeIndustryQuery);
  const code = suggestion.vsicCode ?? "";

  if (/^\d+$/.test(q) && code.startsWith(q)) return 98 + (suggestion.curated ? 2 : 0);
  if (code === q) return 100;
  if (label === q) return 100 + (suggestion.curated ? 5 : 0);
  if (keywords.includes(q)) return 95 + (suggestion.curated ? 3 : 0);
  if (label.startsWith(q)) return 85 + (suggestion.curated ? 3 : 0);
  if (keywords.some((k) => k.startsWith(q))) return 80;
  if (label.includes(q)) return 70 + (suggestion.curated ? 2 : 0);
  if (keywords.some((k) => k.includes(q))) return 65;
  if (keywords.some((k) => q.includes(k) && k.length >= 3)) return 55;

  const tokens = q.split(" ").filter((t) => t.length >= 2);
  if (tokens.length === 0) return 0;

  let tokenScore = 0;
  for (const token of tokens) {
    if (label.includes(token)) tokenScore += 25;
    if (keywords.some((k) => k.includes(token))) tokenScore += 20;
    if (code.includes(token)) tokenScore += 15;
  }
  return tokenScore + (suggestion.curated ? 5 : 0);
}

function searchPool(pool: IndustrySuggestion[], query: string, limit: number): IndustrySuggestionResult[] {
  const scored = pool
    .map((suggestion) => ({ ...suggestion, score: scoreSuggestion(suggestion, query) }))
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        (a.curated ? -1 : 1) - (b.curated ? -1 : 1) ||
        a.label.localeCompare(b.label, "vi"),
    );

  const seen = new Set<string>();
  const unique: IndustrySuggestionResult[] = [];
  for (const item of scored) {
    const key = item.vsicCode ? `${item.vsicCode}|${item.label}` : item.label;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
    if (unique.length >= limit) break;
  }
  return unique;
}

export function searchIndustrySuggestionsFull(query: string, limit = 12): IndustrySuggestionResult[] {
  const q = query.trim();
  if (q.length < 1) return [];

  const curated = searchCuratedIndustrySuggestions(q, limit);
  if (curated.length >= limit) return curated;

  const masothueHits = searchPool(loadMasothueSuggestions(), q, limit);
  const merged = [...curated];
  const seen = new Set(merged.map((item) => `${item.vsicCode ?? ""}|${item.label}`));
  for (const item of masothueHits) {
    const key = `${item.vsicCode ?? ""}|${item.label}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
    if (merged.length >= limit) break;
  }
  return merged;
}

export function getIndustrySuggestionsFullCount() {
  if (fullCountCache !== null) return fullCountCache;
  fullCountCache = CURATED_INDUSTRY_SUGGESTIONS.length + loadMasothueSuggestions().length;
  return fullCountCache;
}

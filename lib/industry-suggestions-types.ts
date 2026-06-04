export type IndustrySuggestion = {
  label: string;
  keywords: string[];
  profileId: string;
  group: string;
  vsicCode?: string;
  curated?: boolean;
};

export type IndustrySuggestionResult = IndustrySuggestion & { score: number };

export function normalizeIndustryQuery(text: string) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/\s+/g, " ");
}

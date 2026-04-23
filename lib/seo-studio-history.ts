import { createServerClient } from "@/lib/supabase";
import type { SeoStudioSnapshot } from "@/lib/seo-studio-draft";

const TABLE_NAME = "site_settings";
const SETTINGS_KEY = "seo_studio_history";
const MAX_HISTORY_ITEMS = 30;

export type SeoStudioHistoryEntry = {
  id: string;
  createdAt: string;
  type: "outline" | "article";
  status: "success" | "error";
  title: string;
  provider: "openai" | "serpapi" | "fallback" | "system";
  model?: string;
  keywords?: string[];
  intent?: string;
  source?: string;
  detail?: string;
  hint?: string;
  snapshot?: SeoStudioSnapshot | null;
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeKeywords(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => normalizeString(item)).filter(Boolean).slice(0, 10)
    : [];
}

function sanitizeSnapshot(value: unknown): SeoStudioSnapshot | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const title = normalizeString(row.title);

  if (!title) return null;

  return {
    title,
    slug: normalizeString(row.slug),
    featuredImageUrl: normalizeString(row.featuredImageUrl),
    metaTitle: normalizeString(row.metaTitle),
    metaDescription: normalizeString(row.metaDescription),
    description: normalizeString(row.description),
    content: normalizeString(row.content),
    keywords: normalizeKeywords(row.keywords),
    outline: Array.isArray(row.outline)
      ? row.outline
          .map((item) => {
            if (!item || typeof item !== "object") return null;
            const outlineRow = item as Record<string, unknown>;
            return {
              level: typeof outlineRow.level === "number" ? outlineRow.level : undefined,
              text: normalizeString(outlineRow.text),
              summary: normalizeString(outlineRow.summary),
              keyPoints: normalizeKeywords(outlineRow.keyPoints),
            };
          })
          .filter(Boolean) as SeoStudioSnapshot["outline"]
      : [],
    searchIntent: normalizeString(row.searchIntent),
    serpInsight:
      row.serpInsight && typeof row.serpInsight === "object"
        ? {
            source: normalizeString((row.serpInsight as Record<string, unknown>).source),
            intent: normalizeString((row.serpInsight as Record<string, unknown>).intent),
            relatedKeywords: normalizeKeywords((row.serpInsight as Record<string, unknown>).relatedKeywords),
            headlines: normalizeKeywords((row.serpInsight as Record<string, unknown>).headlines),
            location: normalizeString((row.serpInsight as Record<string, unknown>).location),
          }
        : null,
    images: Array.isArray(row.images)
      ? row.images
          .map((item) => {
            if (!item || typeof item !== "object") return null;
            const imageRow = item as Record<string, unknown>;
            const url = normalizeString(imageRow.url);
            if (!url) return null;
            return {
              url,
              name: normalizeString(imageRow.name),
              altText: normalizeString(imageRow.altText),
              sectionLabel: normalizeString(imageRow.sectionLabel),
            };
          })
          .filter(Boolean) as SeoStudioSnapshot["images"]
      : [],
    published: typeof row.published === "boolean" ? row.published : undefined,
    hot: typeof row.hot === "boolean" ? row.hot : undefined,
    publishedAt: normalizeString(row.publishedAt),
    savedNewsId: normalizeString(row.savedNewsId),
  };
}

function sanitizeEntry(value: unknown): SeoStudioHistoryEntry | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const id = normalizeString(row.id);
  const createdAt = normalizeString(row.createdAt);
  const title = normalizeString(row.title);
  const type = row.type === "article" ? "article" : row.type === "outline" ? "outline" : "";
  const status = row.status === "error" ? "error" : row.status === "success" ? "success" : "";
  const provider =
    row.provider === "openai" || row.provider === "serpapi" || row.provider === "fallback" || row.provider === "system"
      ? row.provider
      : "system";

  if (!id || !createdAt || !title || !type || !status) {
    return null;
  }

  return {
    id,
    createdAt,
    title,
    type,
    status,
    provider,
    model: normalizeString(row.model),
    keywords: normalizeKeywords(row.keywords),
    intent: normalizeString(row.intent),
    source: normalizeString(row.source),
    detail: normalizeString(row.detail),
    hint: normalizeString(row.hint),
    snapshot: sanitizeSnapshot(row.snapshot),
  };
}

export function sanitizeHistory(value: unknown): SeoStudioHistoryEntry[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => sanitizeEntry(item))
    .filter((item): item is SeoStudioHistoryEntry => Boolean(item))
    .slice(0, MAX_HISTORY_ITEMS);
}

export async function getSeoStudioHistory(): Promise<SeoStudioHistoryEntry[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase.from(TABLE_NAME).select("value").eq("key", SETTINGS_KEY).maybeSingle();
  if (error) {
    throw new Error(error.message || "Khong the tai lich su SEO Studio.");
  }
  return sanitizeHistory(data?.value);
}

export async function appendSeoStudioHistory(entry: Omit<SeoStudioHistoryEntry, "id" | "createdAt">) {
  const supabase = createServerClient();
  const current = await getSeoStudioHistory().catch(() => []);
  const nextEntry: SeoStudioHistoryEntry = {
    id: Math.random().toString(36).slice(2) + Date.now().toString(36),
    createdAt: new Date().toISOString(),
    ...entry,
  };

  const nextValue = [nextEntry, ...current].slice(0, MAX_HISTORY_ITEMS);
  const { error } = await supabase.from(TABLE_NAME).upsert({ key: SETTINGS_KEY, value: nextValue }, { onConflict: "key" });

  if (error) {
    throw new Error(error.message || "Khong the luu lich su SEO Studio.");
  }

  return nextEntry;
}

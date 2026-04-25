import { mkdir, writeFile } from "fs/promises";
import path from "path";
import OpenAI from "openai";
import npmSlugify from "slugify";
import { createServerClient } from "@/lib/supabase";
import { autoFixSeoDraft } from "@/lib/seo-autofix";
import { buildExcerpt, buildMetaDescription, buildMetaTitle, buildReliableSlug, buildSeoFriendlyTitle, deriveKeywordCandidates, slugify } from "@/lib/seo-studio-draft";
import { ensureUniqueNewsSlug } from "@/lib/news-slug";
import { getOpenAiRuntimeConfig, getSerpApiRuntimeConfig } from "@/lib/studio-settings";
import { appendSeoStudioHistory } from "@/lib/seo-studio-history";
import { mergeNewsContentMeta, parseNewsContentMeta } from "@/lib/news-content-meta";
import { evaluateSeoArticle } from "@/lib/seo-quality";

const SETTINGS_TABLE = "site_settings";
const AUTOMATION_SETTINGS_KEY = "seo_automation_settings";
const AUTOMATION_RUNS_KEY = "seo_automation_runs";
const AUTOMATION_LOCK_KEY = "seo_automation_lock";
const MAX_RUN_LOGS = 30;
const AUTOMATION_LOCK_TTL_MS = 1000 * 60 * 45;
const AUTO_PUBLISH_MIN_SCORE = 81;
const DEFAULT_TOPIC_SEEDS = [
  "thiết kế website",
  "dịch vụ SEO tổng thể",
  "quảng cáo Google Ads",
  "chăm sóc fanpage Facebook",
  "xây kênh TikTok doanh nghiệp",
  "Google Maps và Local SEO",
  "content marketing cho doanh nghiệp nhỏ",
  "landing page chuyển đổi",
];

type AutomationStoredValue = Record<string, unknown>;

export type SeoAutomationSettings = {
  enabled: boolean;
  dailyPostCount: number;
  autoPublish: boolean;
  publishTimeLabel: string;
  topicSeeds: string[];
  defaultCategory: string;
  targetWordCount: number;
  generateImages: boolean;
  imagesPerArticle: number;
  autoInsertInternalLinks: boolean;
  autoOptimizeSeo: boolean;
  autoRefreshOldPosts: boolean;
  autoBackfillMissingSeo: boolean;
  gscSiteUrl: string;
  ga4MeasurementId: string;
  ga4PropertyId: string;
  notes: string;
  timezone: string;
};

export type SeoAutomationArticleResult = {
  title: string;
  slug: string;
  keyword: string;
  newsId?: string;
  status: "created" | "updated" | "skipped" | "failed";
  detail: string;
};

export type SeoAutomationRunLog = {
  id: string;
  startedAt: string;
  finishedAt?: string;
  reason: "manual" | "cron" | "repair";
  status: "running" | "success" | "partial" | "failed";
  createdCount: number;
  updatedCount: number;
  skippedCount: number;
  failedCount: number;
  items: SeoAutomationArticleResult[];
};

type TitlePlan = {
  title: string;
  keyword: string;
  angle: string;
};

type OutlineItem = {
  level: 2 | 3;
  text: string;
  summary: string;
  keyPoints: string[];
};

type SerpInsight = {
  source: "serpapi" | "heuristic";
  intent: string;
  relatedKeywords: string[];
  headlines: string[];
  location: string;
};

type GeneratedImageAsset = {
  url: string;
  altText: string;
  name: string;
  sectionLabel: string;
  sectionId: string;
};

type RunOptions = {
  reason: SeoAutomationRunLog["reason"];
  force?: boolean;
  manualCount?: number;
};

type ServiceSeed = {
  keyword: string;
  source: string;
};

type AutomationLock = {
  runId: string;
  reason: SeoAutomationRunLog["reason"];
  startedAt: string;
  expiresAt: string;
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeNumber(value: unknown, fallback: number, min?: number, max?: number) {
  const raw = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(raw)) return fallback;
  const normalized = Math.round(raw);
  if (typeof min === "number" && normalized < min) return min;
  if (typeof max === "number" && normalized > max) return max;
  return normalized;
}

function normalizeTopicSeeds(value: unknown) {
  if (!Array.isArray(value)) return DEFAULT_TOPIC_SEEDS;
  const seeds = value.map((item) => normalizeString(item)).filter(Boolean);
  return seeds.length > 0 ? seeds.slice(0, 24) : DEFAULT_TOPIC_SEEDS;
}

function localDayKey(date = new Date(), timezone = "Asia/Bangkok") {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: timezone }).format(date);
}

function localHour(date = new Date(), timezone = "Asia/Bangkok") {
  return Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      hour: "2-digit",
      hour12: false,
    }).format(date),
  );
}

function parseConfiguredHour(value: string) {
  const match = normalizeString(value).match(/^(\d{1,2})/);
  if (!match) return 8;
  const hour = Number(match[1]);
  if (!Number.isFinite(hour) || hour < 0 || hour > 23) return 8;
  return hour;
}

function dedupeByCase(items: string[]) {
  return items.filter((item, index, list) => list.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index);
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function countWords(text: string) {
  return stripHtml(text).split(/\s+/).filter(Boolean).length;
}

function sectionIdFromHeading(text: string) {
  return slugify(text || "");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sanitizeSettings(value: unknown): SeoAutomationSettings {
  const row = value && typeof value === "object" ? (value as AutomationStoredValue) : {};
  return {
    enabled: normalizeBoolean(row.enabled, false),
    dailyPostCount: normalizeNumber(row.dailyPostCount, 5, 1, 10),
    autoPublish: normalizeBoolean(row.autoPublish, true),
    publishTimeLabel: normalizeString(row.publishTimeLabel) || "08:00",
    topicSeeds: normalizeTopicSeeds(row.topicSeeds),
    defaultCategory: normalizeString(row.defaultCategory) || "blog",
    targetWordCount: normalizeNumber(row.targetWordCount, 1500, 900, 3200),
    generateImages: normalizeBoolean(row.generateImages, true),
    imagesPerArticle: normalizeNumber(row.imagesPerArticle, 2, 1, 4),
    autoInsertInternalLinks: normalizeBoolean(row.autoInsertInternalLinks, true),
    autoOptimizeSeo: normalizeBoolean(row.autoOptimizeSeo, true),
    autoRefreshOldPosts: normalizeBoolean(row.autoRefreshOldPosts, false),
    autoBackfillMissingSeo: normalizeBoolean(row.autoBackfillMissingSeo, true),
    gscSiteUrl: normalizeString(row.gscSiteUrl),
    ga4MeasurementId: normalizeString(row.ga4MeasurementId),
    ga4PropertyId: normalizeString(row.ga4PropertyId),
    notes: normalizeString(row.notes),
    timezone: normalizeString(row.timezone) || "Asia/Bangkok",
  };
}

function sanitizeRunItem(value: unknown): SeoAutomationArticleResult | null {
  if (!value || typeof value !== "object") return null;
  const row = value as AutomationStoredValue;
  const title = normalizeString(row.title);
  const slug = normalizeString(row.slug);
  const keyword = normalizeString(row.keyword);
  const detail = normalizeString(row.detail);
  const status =
    row.status === "created" || row.status === "updated" || row.status === "skipped" || row.status === "failed"
      ? row.status
      : null;
  if (!title || !slug || !keyword || !detail || !status) return null;
  return {
    title,
    slug,
    keyword,
    detail,
    status,
    newsId: normalizeString(row.newsId) || undefined,
  };
}

function sanitizeRunLog(value: unknown): SeoAutomationRunLog | null {
  if (!value || typeof value !== "object") return null;
  const row = value as AutomationStoredValue;
  const status =
    row.status === "running" || row.status === "success" || row.status === "partial" || row.status === "failed"
      ? row.status
      : null;
  const reason = row.reason === "cron" || row.reason === "repair" || row.reason === "manual" ? row.reason : null;
  if (!status || !reason) return null;
  const id = normalizeString(row.id);
  const startedAt = normalizeString(row.startedAt);
  if (!id || !startedAt) return null;

  return {
    id,
    startedAt,
    finishedAt: normalizeString(row.finishedAt) || undefined,
    reason,
    status,
    createdCount: normalizeNumber(row.createdCount, 0, 0),
    updatedCount: normalizeNumber(row.updatedCount, 0, 0),
    skippedCount: normalizeNumber(row.skippedCount, 0, 0),
    failedCount: normalizeNumber(row.failedCount, 0, 0),
    items: Array.isArray(row.items) ? row.items.map(sanitizeRunItem).filter(Boolean) as SeoAutomationArticleResult[] : [],
  };
}

function sanitizeRunLogs(value: unknown) {
  if (!Array.isArray(value)) return [] as SeoAutomationRunLog[];
  return value.map(sanitizeRunLog).filter(Boolean) as SeoAutomationRunLog[];
}

async function readSiteSetting(key: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from(SETTINGS_TABLE).select("value").eq("key", key).maybeSingle();
  if (error) throw new Error(error.message || `Khong the doc setting ${key}.`);
  return data?.value ?? null;
}

async function writeSiteSetting(key: string, value: unknown) {
  const supabase = createServerClient();
  const { error } = await supabase.from(SETTINGS_TABLE).upsert({ key, value }, { onConflict: "key" });
  if (error) throw new Error(error.message || `Khong the luu setting ${key}.`);
}

async function deleteSiteSetting(key: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from(SETTINGS_TABLE).delete().eq("key", key);
  if (error) throw new Error(error.message || `Khong the xoa setting ${key}.`);
}

export async function getSeoAutomationSettings() {
  const raw = await readSiteSetting(AUTOMATION_SETTINGS_KEY).catch(() => null);
  return sanitizeSettings(raw);
}

export async function saveSeoAutomationSettings(patch: Partial<SeoAutomationSettings>) {
  const current = await getSeoAutomationSettings();
  const next = sanitizeSettings({ ...current, ...patch });
  await writeSiteSetting(AUTOMATION_SETTINGS_KEY, next);
  return next;
}

export async function getSeoAutomationRuns() {
  const raw = await readSiteSetting(AUTOMATION_RUNS_KEY).catch(() => []);
  return sanitizeRunLogs(raw).slice(0, MAX_RUN_LOGS);
}

async function saveSeoAutomationRuns(runs: SeoAutomationRunLog[]) {
  await writeSiteSetting(AUTOMATION_RUNS_KEY, runs.slice(0, MAX_RUN_LOGS));
}

function sanitizeAutomationLock(value: unknown): AutomationLock | null {
  if (!value || typeof value !== "object") return null;
  const row = value as AutomationStoredValue;
  const reason = row.reason === "cron" || row.reason === "repair" || row.reason === "manual" ? row.reason : null;
  const runId = normalizeString(row.runId);
  const startedAt = normalizeString(row.startedAt);
  const expiresAt = normalizeString(row.expiresAt);
  if (!reason || !runId || !startedAt || !expiresAt) return null;
  return { runId, reason, startedAt, expiresAt };
}

async function getAutomationLock() {
  const raw = await readSiteSetting(AUTOMATION_LOCK_KEY).catch(() => null);
  return sanitizeAutomationLock(raw);
}

async function releaseAutomationLock(runId?: string) {
  const current = await getAutomationLock();
  if (!current) return;
  if (runId && current.runId !== runId) return;
  await deleteSiteSetting(AUTOMATION_LOCK_KEY).catch(() => undefined);
}

async function acquireAutomationLock(runId: string, reason: SeoAutomationRunLog["reason"]) {
  const current = await getAutomationLock();
  if (current) {
    const expiresAt = new Date(current.expiresAt).getTime();
    if (Number.isFinite(expiresAt) && expiresAt > Date.now()) {
      throw new Error("SEO Autopilot dang co mot luot chay khac. Vui long doi luot hien tai hoan tat.");
    }
    await releaseAutomationLock(current.runId);
  }

  const nextLock: AutomationLock = {
    runId,
    reason,
    startedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + AUTOMATION_LOCK_TTL_MS).toISOString(),
  };
  await writeSiteSetting(AUTOMATION_LOCK_KEY, nextLock);
}

async function createRunLog(reason: SeoAutomationRunLog["reason"]) {
  const runs = await getSeoAutomationRuns();
  const current: SeoAutomationRunLog = {
    id: `run-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    startedAt: new Date().toISOString(),
    reason,
    status: "running",
    createdCount: 0,
    updatedCount: 0,
    skippedCount: 0,
    failedCount: 0,
    items: [],
  };
  await saveSeoAutomationRuns([current, ...runs]);
  return current;
}

async function finalizeRunLog(runId: string, patch: Partial<SeoAutomationRunLog>) {
  const runs = await getSeoAutomationRuns();
  const nextRuns = runs.map((item) => (item.id === runId ? { ...item, ...patch } : item));
  await saveSeoAutomationRuns(nextRuns);
  return nextRuns.find((item) => item.id === runId) || null;
}

type RawNewsRow = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  category?: string;
  description?: string;
  image_url?: string;
  slug?: string;
  meta_description?: string;
  keywords_main?: string;
  keywords_secondary?: string;
  timestamp?: number;
  published_at?: string;
};

async function getAllNewsRows() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("news").select("*").order("timestamp", { ascending: false });
  if (error) throw new Error(error.message || "Khong the tai danh sach bai viet.");
  return (data || []) as RawNewsRow[];
}

async function getMarketingServiceSeeds(fallbackSeeds: string[]) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("services").select("*");
  if (error || !Array.isArray(data)) {
    return fallbackSeeds.map((item) => ({ keyword: item, source: "fallback" })) as ServiceSeed[];
  }

  const derived = data
    .flatMap((item) => {
      const row = item as AutomationStoredValue;
      return [normalizeString(row.name), normalizeString(row.platform)].filter(Boolean);
    })
    .filter((item) => /seo|facebook|website|google|maps|instagram|tiktok|marketing|content|fanpage|ads/i.test(item));

  const normalized = dedupeByCase([...derived, ...fallbackSeeds]).slice(0, 24);
  return normalized.map((keyword) => ({ keyword, source: derived.includes(keyword) ? "services" : "fallback" }));
}

function getTodaysAutomationCount(rows: RawNewsRow[], timezone: string) {
  const today = localDayKey(new Date(), timezone);
  return rows.filter((row) => {
    const parsed = parseNewsContentMeta(row.content);
    const generatedAt = parsed.meta.automation?.generatedAt;
    if (!generatedAt) return false;
    return localDayKey(new Date(generatedAt), timezone) === today;
  }).length;
}

function buildFallbackTitlePlans(existingTitles: string[], topicSeeds: string[], count: number): TitlePlan[] {
  const today = localDayKey(new Date()).split("-").reverse().join("/");
  const plans: TitlePlan[] = [];

  for (const seed of topicSeeds) {
    const variants = [
      `${seed} cho doanh nghiệp nhỏ: hướng dẫn thực chiến ${today}`,
      `Bảng giá ${seed} mới nhất và cách chọn dịch vụ hiệu quả`,
      `${seed}: quy trình triển khai giúp tăng chuyển đổi thật`,
      `Kinh nghiệm ${seed} dành cho doanh nghiệp muốn tăng khách hàng`,
    ];

    for (const title of variants) {
      if (plans.length >= count) break;
      if (existingTitles.some((item) => item.toLowerCase() === title.toLowerCase())) continue;
      plans.push({
        title,
        keyword: seed,
        angle: `Tập trung vào hiệu quả thực chiến của ${seed}`,
      });
    }

    if (plans.length >= count) break;
  }

  return plans.slice(0, count);
}

async function generateTitlePlans(
  client: OpenAI | null,
  model: string,
  settings: SeoAutomationSettings,
  existingTitles: string[],
  count: number,
  serviceSeeds: ServiceSeed[],
) {
  const seedKeywords = serviceSeeds.map((item) => item.keyword);
  if (!client) {
    return buildFallbackTitlePlans(existingTitles, seedKeywords, count);
  }

  try {
    const response = await client.responses.create({
      model,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: "Bạn là tổng biên tập SEO cho agency marketing. Trả về JSON hợp lệ duy nhất." }],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: [
                `Hãy tạo ${count} ý tưởng bài SEO tiếng Việt thật chỉn chu cho website agency marketing.`,
                `Chủ đề dịch vụ bắt buộc phải bám theo: ${seedKeywords.join(", ")}`,
                `Những tiêu đề đã có: ${existingTitles.slice(0, 50).join(" | ") || "chưa có"}`,
                "Yêu cầu:",
                "- Không trùng ý giữa các bài",
                "- Chỉ viết quanh các dịch vụ marketing của website",
                "- Tiêu đề phải có khả năng tìm kiếm thật, bám intent dịch vụ hoặc nhu cầu chuyển đổi",
                "- Có thể đăng ngay trên site agency",
                '- Trả về JSON: {"items":[{"title":"...","keyword":"...","angle":"..."}]}',
              ].join("\n"),
            },
          ],
        },
      ],
    });

    const raw = response.output_text || "";
    const parsed = JSON.parse(raw.replace(/^```json\s*/i, "").replace(/\s*```$/, "")) as { items?: Array<Record<string, unknown>> };
    const items = Array.isArray(parsed.items) ? parsed.items : [];
    const plans = items
      .map((item) => ({
        title: normalizeString(item.title),
        keyword: normalizeString(item.keyword),
        angle: normalizeString(item.angle),
      }))
      .filter((item) => item.title && item.keyword)
      .filter((item, index, list) => list.findIndex((candidate) => candidate.title.toLowerCase() === item.title.toLowerCase()) === index)
      .filter((item) => !existingTitles.some((existing) => existing.toLowerCase() === item.title.toLowerCase()))
      .filter((item) => seedKeywords.some((seed) => item.title.toLowerCase().includes(seed.toLowerCase()) || item.keyword.toLowerCase().includes(seed.toLowerCase())))
      .slice(0, count);

    return plans.length > 0 ? plans : buildFallbackTitlePlans(existingTitles, seedKeywords, count);
  } catch {
    return buildFallbackTitlePlans(existingTitles, seedKeywords, count);
  }
}

function guessIntent(title: string) {
  const normalized = title.toLowerCase();
  if (/(giá|bao giá|chi phí|bảng giá)/i.test(normalized)) return "commercial";
  if (/(hướng dẫn|cách|kinh nghiệm|bí quyết|là gì)/i.test(normalized)) return "informational";
  return "commercial";
}

function dedupeKeywords(items: string[]) {
  return dedupeByCase(items.map((item) => item.trim()).filter(Boolean)).slice(0, 10);
}

async function fetchSerpInsight(title: string): Promise<SerpInsight> {
  const { apiKey, location } = await getSerpApiRuntimeConfig();
  if (!apiKey) {
    return {
      source: "heuristic",
      intent: guessIntent(title),
      relatedKeywords: dedupeKeywords([title, `${title} là gì`, `${title} bảng giá`, `${title} uy tín`]),
      headlines: [],
      location,
    };
  }

  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google");
  url.searchParams.set("q", title);
  url.searchParams.set("hl", "vi");
  url.searchParams.set("gl", "vn");
  url.searchParams.set("location", location);
  url.searchParams.set("api_key", apiKey);

  const response = await fetch(url.toString(), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`SerpAPI ${response.status}`);
  }

  const payload = (await response.json()) as Record<string, unknown>;
  const relatedSearches = Array.isArray(payload.related_searches)
    ? payload.related_searches
        .map((item) => (item && typeof item === "object" ? normalizeString((item as AutomationStoredValue).query) : ""))
        .filter(Boolean)
    : [];
  const headlines = Array.isArray(payload.organic_results)
    ? payload.organic_results
        .slice(0, 5)
        .map((item) => (item && typeof item === "object" ? normalizeString((item as AutomationStoredValue).title) : ""))
        .filter(Boolean)
    : [];

  return {
    source: "serpapi",
    intent: guessIntent(title),
    relatedKeywords: dedupeKeywords([title, ...relatedSearches]),
    headlines,
    location,
  };
}

function fallbackOutline(title: string, keyword: string): OutlineItem[] {
  return [
    { level: 2, text: `Tổng quan về ${keyword}`, summary: `Giải thích bối cảnh của ${title}.`, keyPoints: [] },
    { level: 2, text: "Vì sao doanh nghiệp cần đầu tư đúng cách", summary: "Làm rõ nhu cầu thực tế và bài toán chuyển đổi.", keyPoints: [] },
    { level: 2, text: "Giải pháp triển khai hiệu quả", summary: "Đưa ra hướng làm rõ ràng, thực chiến.", keyPoints: [] },
    { level: 2, text: "Quy trình triển khai từng bước", summary: "Mô tả cách làm bài bản.", keyPoints: [] },
    { level: 2, text: "Chi phí và lưu ý quan trọng", summary: "Giúp người đọc ra quyết định.", keyPoints: [] },
    { level: 2, text: "Câu hỏi thường gặp", summary: "Bổ sung FAQ tăng tính chuyển đổi.", keyPoints: [] },
  ];
}

async function generateOutline(client: OpenAI | null, model: string, title: string, keyword: string, serpInsight: SerpInsight) {
  if (!client) {
    return {
      keywords: dedupeKeywords([keyword, title, ...serpInsight.relatedKeywords]),
      intent: serpInsight.intent,
      structure: fallbackOutline(title, keyword),
      serpInsight,
      source: "fallback" as const,
    };
  }

  try {
    const response = await client.responses.create({
      model,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: "Bạn là chiến lược gia SEO tiếng Việt. Trả về JSON hợp lệ duy nhất." }],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: [
                `Tiêu đề: ${title}`,
                `Keyword chính: ${keyword}`,
                `Search intent: ${serpInsight.intent}`,
                `Related keywords: ${serpInsight.relatedKeywords.join(", ")}`,
                `Top headlines SERP: ${serpInsight.headlines.join(" | ") || "không có"}`,
                "Tạo dàn ý SEO 6-8 mục thật chỉnh chu cho bài agency marketing.",
                '- Trả về JSON: {"keywords":["..."],"structure":[{"level":2,"text":"...","summary":"...","keyPoints":["..."]}]}',
              ].join("\n"),
            },
          ],
        },
      ],
    });

    const parsed = JSON.parse(
      (response.output_text || "").replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, ""),
    ) as { keywords?: unknown; structure?: unknown };
    const keywords = dedupeKeywords([
      keyword,
      ...(Array.isArray(parsed.keywords) ? parsed.keywords.map((item) => normalizeString(item)) : []),
      ...serpInsight.relatedKeywords,
    ]);
    const structure = Array.isArray(parsed.structure)
      ? parsed.structure
          .map((item) => {
            if (!item || typeof item !== "object") return null;
            const row = item as AutomationStoredValue;
            const text = normalizeString(row.text || row.heading || row.title);
            if (!text) return null;
            return {
              level: normalizeNumber(row.level, 2, 2, 3) as 2 | 3,
              text,
              summary: normalizeString(row.summary),
              keyPoints: Array.isArray(row.keyPoints) ? row.keyPoints.map((point) => normalizeString(point)).filter(Boolean) : [],
            } satisfies OutlineItem;
          })
          .filter(Boolean) as OutlineItem[]
      : [];

    return {
      keywords: keywords.length > 0 ? keywords : dedupeKeywords([keyword, title]),
      intent: serpInsight.intent,
      structure: structure.length > 0 ? structure : fallbackOutline(title, keyword),
      serpInsight,
      source: "openai" as const,
    };
  } catch {
    return {
      keywords: dedupeKeywords([keyword, title, ...serpInsight.relatedKeywords]),
      intent: serpInsight.intent,
      structure: fallbackOutline(title, keyword),
      serpInsight,
      source: "fallback" as const,
    };
  }
}

function fallbackContent(title: string, outline: OutlineItem[]) {
  return outline
    .map((section, index) => {
      const tag = section.level === 3 ? "h3" : "h2";
      const id = sectionIdFromHeading(section.text);
      const intro =
        index === 0
          ? `<p>${title} là chủ đề quan trọng với doanh nghiệp muốn tăng hiện diện số, nâng chuyển đổi và tối ưu chi phí marketing. Bài viết này đi theo hướng thực chiến để người đọc có thể áp dụng ngay.</p>`
          : "";
      return `<${tag} id="${id}">${section.text}</${tag}>${intro}<p>${section.summary || `Ở phần ${section.text}, doanh nghiệp cần nhìn rõ nhu cầu, mục tiêu, cách triển khai và các lưu ý để đạt hiệu quả bền vững.`}</p>`;
    })
    .join("");
}

async function generateArticleContent(client: OpenAI | null, model: string, title: string, keyword: string, outline: OutlineItem[], settings: SeoAutomationSettings) {
  if (!client) {
    const content = fallbackContent(title, outline);
    return { content, source: "fallback" as const, estimatedTime: `${Math.max(4, Math.round(countWords(content) / 220))} phút đọc` };
  }

  try {
    const outlineText = outline
      .map((item) => `- H${item.level}: ${item.text}${item.summary ? ` | tóm tắt: ${item.summary}` : ""}`)
      .join("\n");

    const response = await client.responses.create({
      model,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: "Bạn là senior SEO copywriter tiếng Việt. Chỉ trả về HTML fragment hợp lệ, không markdown." }],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: [
                `Viết bài thật chỉnh chu cho tiêu đề: ${title}`,
                `Keyword chính: ${keyword}`,
                `Mục tiêu độ dài: khoảng ${settings.targetWordCount} từ`,
                "Yêu cầu:",
                "- Có mở bài rõ ràng",
                "- Bám đúng dàn ý",
                "- Mỗi H2/H3 cần có nội dung thật",
                "- Văn phong chuyên nghiệp, chuyển đổi tốt nhưng không phô",
                "- Mỗi heading cần có id slug-friendly theo heading",
                "- Cuối bài có kết luận và CTA nhẹ",
                "Dàn ý:",
                outlineText,
              ].join("\n"),
            },
          ],
        },
      ],
    });

    const content = (response.output_text || "").replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
    if (!content) {
      throw new Error("No content");
    }
    return { content, source: "openai" as const, estimatedTime: `${Math.max(4, Math.round(countWords(content) / 220))} phút đọc` };
  } catch {
    const content = fallbackContent(title, outline);
    return { content, source: "fallback" as const, estimatedTime: `${Math.max(4, Math.round(countWords(content) / 220))} phút đọc` };
  }
}

function ensureSectionAnchors(content: string, sections: OutlineItem[]) {
  return sections.reduce((acc, item) => {
    const sectionId = sectionIdFromHeading(item.text);
    if (!sectionId) return acc;
    if (new RegExp(`id=["']${sectionId}["']`, "i").test(acc)) return acc;

    const escapedHeading = item.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return acc.replace(new RegExp(`<(h[23])([^>]*)>\\s*${escapedHeading}\\s*</\\1>`, "i"), `<$1$2 id="${sectionId}">${item.text}</$1>`);
  }, content);
}

function insertImageBySection(content: string, image: GeneratedImageAsset, outline: OutlineItem[]) {
  const normalized = ensureSectionAnchors(content, outline);
  const figure = `<figure class="article-image"><img src="${image.url}" alt="${image.altText}" loading="lazy" /><figcaption>${image.sectionLabel}</figcaption></figure>`;
  if (!image.sectionId) {
    return `${normalized}${figure}`;
  }
  const headingPattern = new RegExp(`(<h[23][^>]*id=["']${image.sectionId}["'][^>]*>.*?</h[23]>)`, "i");
  if (headingPattern.test(normalized)) {
    return normalized.replace(headingPattern, `$1${figure}`);
  }

  const firstHeadingPattern = /(<h[23][^>]*>.*?<\/h[23]>)/i;
  if (firstHeadingPattern.test(normalized)) {
    return normalized.replace(firstHeadingPattern, `$1${figure}`);
  }

  const firstParagraphPattern = /(<p[^>]*>.*?<\/p>)/i;
  if (firstParagraphPattern.test(normalized)) {
    return normalized.replace(firstParagraphPattern, `$1${figure}`);
  }

  return `${normalized}${figure}`;
}

function tokenize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 3);
}

function scoreInternalCandidate(candidateText: string, keywords: string[]) {
  const haystack = new Set(tokenize(candidateText));
  return keywords.reduce((sum, keyword) => (haystack.has(keyword) ? sum + 1 : sum), 0);
}

async function buildInternalLinkSuggestions(currentSlug: string, title: string, content: string, keywords: string[]) {
  const rows = await getAllNewsRows();
  const normalizedKeywords = dedupeKeywords(tokenize(`${title} ${keywords.join(" ")} ${content}`)).slice(0, 12);

  return rows
    .filter((row) => row.published && row.slug && row.slug !== currentSlug)
    .map((row) => {
      const score = scoreInternalCandidate(
        `${row.title} ${row.description || ""} ${row.keywords_main || ""} ${row.keywords_secondary || ""}`,
        normalizedKeywords,
      );
      return {
        slug: row.slug || row.id,
        title: row.title,
        anchorText: normalizeString(row.keywords_main) || row.title.split(/\s+/).slice(0, 5).join(" "),
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
}

function injectInternalLinks(content: string, suggestions: Array<{ slug: string; title: string; anchorText: string }>) {
  if (suggestions.length === 0) return content;
  const block = `<section class="article-related-links"><h2 id="bai-viet-lien-quan">Bài viết liên quan</h2><ul>${suggestions
    .map((item) => `<li><a href="/blog/${item.slug}">${item.anchorText}</a> - ${item.title}</li>`)
    .join("")}</ul></section>`;

  if (content.includes('id="ket-luan"') || content.includes('id="kết-luận"')) {
    return content.replace(/(<h[23][^>]*id=["'](?:ket-luan|kết-luận)["'][^>]*>.*?<\/h[23]>)/i, `${block}$1`);
  }
  return `${content}${block}`;
}

function getAuthoritySource(keyword: string) {
  const normalized = normalizeString(keyword).toLowerCase();
  if (/google ads|quảng cáo google|google maps|local seo|seo/i.test(normalized)) {
    return { label: "Google Search Central", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" };
  }
  if (/facebook|fanpage|instagram|meta/i.test(normalized)) {
    return { label: "Meta Business Help Center", url: "https://www.facebook.com/business/help" };
  }
  if (/tiktok/i.test(normalized)) {
    return { label: "TikTok for Business", url: "https://ads.tiktok.com/business/learning-center" };
  }
  return { label: "Google Search Central", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" };
}

function ensureOutboundLink(content: string, keyword: string) {
  if (/<a\s+[^>]*href=["']https?:\/\//i.test(content)) return content;
  const source = getAuthoritySource(keyword);
  return `${content}<section class="article-reference"><h2 id="nguon-tham-khao">Nguồn tham khảo</h2><p>Xem thêm tài liệu chính thức tại <a href="${source.url}" target="_blank" rel="nofollow noopener">${source.label}</a> để cập nhật quy chuẩn và nền tảng liên quan.</p></section>`;
}

function ensureFaqBlock(content: string, keyword: string) {
  if (/<h2[^>]*>[^<]*câu hỏi thường gặp/i.test(content)) return content;
  const normalizedKeyword = normalizeString(keyword) || "dịch vụ marketing";
  return `${content}<section class="article-faq"><h2 id="cau-hoi-thuong-gap">Câu hỏi thường gặp</h2><h3>${normalizedKeyword} phù hợp với doanh nghiệp nào?</h3><p>${normalizedKeyword} phù hợp với doanh nghiệp muốn tăng hiện diện số, tìm khách hàng đều hơn và tối ưu hiệu quả chuyển đổi theo mục tiêu kinh doanh.</p><h3>Triển khai mất bao lâu để có tín hiệu tốt?</h3><p>Tùy dịch vụ và độ cạnh tranh, doanh nghiệp nên đi theo lộ trình ít nhất 2-3 tháng để có nền tảng dữ liệu, tối ưu vận hành và đo hiệu quả rõ ràng hơn.</p></section>`;
}

function ensureKeywordPresence(content: string, keyword: string) {
  if (!keyword) return content;
  if (normalizeString(content).toLowerCase().includes(keyword.toLowerCase())) return content;
  return `<p>${keyword} là trọng tâm của kế hoạch triển khai trong bài viết này, vì đây là nhóm dịch vụ khách hàng thường tìm khi muốn tăng chuyển đổi và tối ưu tăng trưởng bền vững.</p>${content}`;
}

function ensureMinimumDepth(content: string, keyword: string, targetWordCount: number) {
  const currentWords = countWords(content);
  if (currentWords >= Math.min(targetWordCount, 1200)) return content;
  const extraSection = `<section class="article-implementation"><h2 id="luu-y-trien-khai-thuc-te">Lưu ý triển khai thực tế</h2><p>Khi triển khai ${keyword}, doanh nghiệp không nên chỉ nhìn vào một chỉ số đơn lẻ. Điều quan trọng là bám mục tiêu kinh doanh, chuẩn hóa hành trình khách hàng, theo dõi chi phí chuyển đổi và tối ưu liên tục dựa trên dữ liệu thực tế. Ở giai đoạn đầu, nên ưu tiên các hạng mục tạo nền như nội dung, landing page, thông điệp, tracking và năng lực xử lý lead. Khi nền tảng đã rõ, việc mở rộng quy mô sẽ hiệu quả hơn và tránh lãng phí ngân sách.</p><p>Để đạt kết quả tốt, doanh nghiệp nên có kế hoạch phối hợp giữa nội dung, quảng cáo, SEO, social và tối ưu chuyển đổi. Một bài viết mạnh không chỉ để có traffic mà còn giúp chốt niềm tin, định hướng nhu cầu và đưa người đọc sang bước hành động tiếp theo. Vì vậy, nội dung cần đủ sâu, có ví dụ thực tế, có FAQ, có liên kết nội bộ và có CTA rõ ràng nhưng tự nhiên. Đó cũng là lý do các bài viết về ${keyword} nên được tối ưu theo cụm chủ đề thay vì đăng rời rạc.</p></section>`;
  return `${content}${extraSection}`;
}

async function optimizeArticleQuality(input: {
  client: OpenAI | null;
  model: string;
  title: string;
  keyword: string;
  keywords: string[];
  content: string;
  metaDescription: string;
  slug: string;
  serviceKeywords: string[];
  targetWordCount: number;
}) {
  let nextContent = ensureKeywordPresence(input.content, input.keyword);
  nextContent = ensureFaqBlock(nextContent, input.keyword);
  nextContent = ensureOutboundLink(nextContent, input.keyword);
  nextContent = ensureMinimumDepth(nextContent, input.keyword, input.targetWordCount);
  let evaluation = evaluateSeoArticle({
    title: input.title,
    metaDescription: input.metaDescription,
    slug: input.slug,
    keywords: input.keywords,
    content: nextContent,
    serviceKeywords: input.serviceKeywords,
  });

  if (evaluation.score >= 80 || !input.client) {
    return { content: nextContent, evaluation };
  }

  try {
    const response = await input.client.responses.create({
      model: input.model,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: "Bạn là chuyên gia tối ưu bài SEO. Chỉ trả về HTML fragment hợp lệ, không markdown." }],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: [
                `Tối ưu bài viết sau để điểm SEO nội bộ đạt trên 80/100.`,
                `Tiêu đề: ${input.title}`,
                `Keyword chính: ${input.keyword}`,
                `Các lỗi cần sửa: ${evaluation.issues.map((item) => item.label).join(" | ")}`,
                `Nhóm dịch vụ phải bám: ${input.serviceKeywords.join(", ") || input.keyword}`,
                "Yêu cầu:",
                "- Giữ đúng chủ đề dịch vụ marketing",
                "- Không lan man ngoài intent người tìm dịch vụ",
                "- Cần có internal links, outbound link, FAQ, chiều sâu nội dung, H2/H3 rõ ràng",
                "- Không bỏ mất nội dung tốt sẵn có",
                "HTML hiện tại:",
                nextContent,
              ].join("\n"),
            },
          ],
        },
      ],
    });

    const improved = (response.output_text || "").replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
    if (improved) {
      nextContent = ensureMinimumDepth(ensureOutboundLink(ensureFaqBlock(improved, input.keyword), input.keyword), input.keyword, input.targetWordCount);
      evaluation = evaluateSeoArticle({
        title: input.title,
        metaDescription: input.metaDescription,
        slug: input.slug,
        keywords: input.keywords,
        content: nextContent,
        serviceKeywords: input.serviceKeywords,
      });
    }
  } catch {
    // Ignore AI optimization failure.
  }

  return { content: nextContent, evaluation };
}

function canAutoPublish(input: {
  evaluation: ReturnType<typeof evaluateSeoArticle>;
  autoPublishEnabled: boolean;
  featuredImageUrl: string;
  imageGenerationEnabled: boolean;
}) {
  if (!input.autoPublishEnabled) {
    return {
      allowed: false,
      reason: "Che do tu dang dang tat.",
    };
  }

  if (input.evaluation.score < AUTO_PUBLISH_MIN_SCORE) {
    return {
      allowed: false,
      reason: `Diem SEO ${input.evaluation.score}/100 chua vuot nguong tu dang.`,
    };
  }

  if (input.evaluation.issues.some((issue) => issue.status === "critical")) {
    return {
      allowed: false,
      reason: "Van con loi SEO muc critical.",
    };
  }

  if (input.evaluation.metrics.titleLength < 30 || input.evaluation.metrics.metaLength < 120) {
    return {
      allowed: false,
      reason: "Metadata chua dat chuan title/meta de tu dang.",
    };
  }

  if (input.evaluation.metrics.wordCount < 900 || input.evaluation.metrics.h2Count < 2 || input.evaluation.metrics.h3Count < 1) {
    return {
      allowed: false,
      reason: "Noi dung chua du do sau heading/depth de tu dang.",
    };
  }

  if (input.imageGenerationEnabled && !normalizeString(input.featuredImageUrl)) {
    return {
      allowed: false,
      reason: "Chua tao duoc anh dai dien cho bai viet.",
    };
  }

  return {
    allowed: true,
    reason: "Bai da qua quality gate va san sang tu dang.",
  };
}

function getExtensionFromMime(mimeType: string) {
  if (mimeType.includes("jpeg")) return "jpg";
  if (mimeType.includes("webp")) return "webp";
  if (mimeType.includes("gif")) return "gif";
  return "png";
}

async function saveGeneratedImageToMedia(input: {
  b64Json: string;
  title: string;
  sectionLabel: string;
  suggestedName: string;
}) {
  const buffer = Buffer.from(input.b64Json, "base64");
  const extension = getExtensionFromMime("image/png");
  const baseName =
    npmSlugify(input.suggestedName || `${input.title}-${input.sectionLabel}`, {
      lower: true,
      strict: true,
      trim: true,
    }) || `seo-automation-${Date.now()}`;
  const fileName = `${baseName}-${Date.now()}.${extension}`;
  const relativeDir = path.join("uploads", "media");
  const absoluteDir = path.join(process.cwd(), "public", relativeDir);
  const absolutePath = path.join(absoluteDir, fileName);
  const publicUrl = `/${relativeDir.replace(/\\/g, "/")}/${fileName}`;

  await mkdir(absoluteDir, { recursive: true });
  await writeFile(absolutePath, buffer);

  const supabase = createServerClient();
  const { error } = await supabase.from("media").insert({
    url: publicUrl,
    name: input.suggestedName,
    type: "image",
    timestamp: Date.now(),
  });
  if (error) {
    throw new Error(error.message || "Khong the luu anh vao media.");
  }

  return publicUrl;
}

async function generateImagesForArticle(client: OpenAI | null, title: string, outline: OutlineItem[], settings: SeoAutomationSettings) {
  if (!client || !settings.generateImages) return [] as GeneratedImageAsset[];

  const sections = [
    { sectionLabel: "Ảnh đại diện bài viết", sectionId: "hero", promptSuffix: "hero image tổng quan cho bài viết" },
    ...outline.slice(0, Math.max(0, settings.imagesPerArticle - 1)).map((item) => ({
      sectionLabel: item.text,
      sectionId: sectionIdFromHeading(item.text),
      promptSuffix: item.summary || item.text,
    })),
  ].slice(0, settings.imagesPerArticle);

  const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
  const images: GeneratedImageAsset[] = [];

  for (const section of sections) {
    try {
      const prompt = [
        `Tạo ảnh editorial photorealistic cao cấp cho bài viết tiếng Việt "${title}".`,
        `Ngữ cảnh chính: ${section.promptSuffix}.`,
        "Ảnh phù hợp website agency marketing chuyên nghiệp, tươi sáng, hiện đại, tỷ lệ ngang 3:2.",
        "Không chữ, không watermark, không bố cục rối, ưu tiên cảm giác đáng tin cậy và chuyển đổi.",
      ].join("\n");

      const response = await client.images.generate({
        model,
        prompt,
        n: 1,
        size: "1536x1024",
        quality: "medium",
        output_format: "png",
        background: "auto",
      });
      const first = response.data?.[0];
      if (!first?.b64_json) continue;

      const url = await saveGeneratedImageToMedia({
        b64Json: first.b64_json,
        title,
        sectionLabel: section.sectionLabel,
        suggestedName: `${title} ${section.sectionLabel}`,
      });

      images.push({
        url,
        altText: `${section.sectionLabel} cho bài viết ${title}`,
        name: `${title} - ${section.sectionLabel}`,
        sectionLabel: section.sectionLabel,
        sectionId: section.sectionId,
      });
    } catch {
      // Continue with remaining images
    }
  }

  return images;
}

async function createOrUpdateNewsArticle(input: {
  title: string;
  keyword: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  slug: string;
  imageUrl: string;
  category: string;
  runId: string;
  batchId: string;
  autoPublish: boolean;
  publishedAt: string;
  secondaryKeywords: string[];
}) {
  const supabase = createServerClient();
  const { data: existingRows, error: preloadError } = await supabase.from("news").select("id,slug,title");
  if (preloadError) throw new Error(preloadError.message || "Khong the tai slug bai viet.");

  const uniqueSlug = ensureUniqueNewsSlug(existingRows || [], { slug: input.slug, title: input.title });
  const id = uniqueSlug || crypto.randomUUID();
  const payload = {
    id,
    title: input.title,
    content: mergeNewsContentMeta(input.content, {
      metaTitle: input.metaTitle,
      automation: {
        source: "seo-automation",
        runId: input.runId,
        batchId: input.batchId,
        keyword: input.keyword,
        generatedAt: new Date().toISOString(),
        autoPublished: input.autoPublish,
      },
    }),
    category: input.category,
    published: input.autoPublish,
    description: input.description,
    image_url: input.imageUrl,
    slug: uniqueSlug,
    hot: false,
    meta_description: input.metaDescription,
    keywords_main: input.keyword,
    keywords_secondary: input.secondaryKeywords.join(", "),
    timestamp: Date.now(),
    published_at: new Date(input.publishedAt).toISOString(),
  };

  const { data, error } = await supabase.from("news").insert(payload).select("id,slug").single();
  if (error) throw new Error(error.message || "Khong the luu bai viet tu dong.");
  return { id: data.id as string, slug: (data.slug as string) || uniqueSlug };
}

async function repairExistingSeoFields(rows: RawNewsRow[], limit: number) {
  const supabase = createServerClient();
  const candidates = rows.filter((row) => {
    const parsed = parseNewsContentMeta(row.content);
    return (
      !normalizeString(row.slug) ||
      !normalizeString(row.meta_description) ||
      !normalizeString(row.keywords_main) ||
      !normalizeString(row.description) ||
      !normalizeString(parsed.meta.metaTitle)
    );
  });

  const results: SeoAutomationArticleResult[] = [];
  for (const row of candidates.slice(0, limit)) {
    const primaryKeyword = deriveKeywordCandidates(row.title)[0] || row.title;
    const autoFixed = autoFixSeoDraft({
      title: row.title,
      metaTitle: parseNewsContentMeta(row.content).meta.metaTitle,
      metaDescription: normalizeString(row.meta_description),
      description: normalizeString(row.description),
      slug: normalizeString(row.slug),
      content: row.content,
      keywords: [normalizeString(row.keywords_main) || primaryKeyword, ...deriveKeywordCandidates(row.title).slice(1)],
    });
    const mergedContent = mergeNewsContentMeta(autoFixed.content, { metaTitle: autoFixed.metaTitle });
    const repairedSlug = ensureUniqueNewsSlug(rows, {
      slug: autoFixed.slug,
      title: row.title,
      excludeId: row.id,
    });

    const { error } = await supabase
      .from("news")
      .update({
        slug: repairedSlug,
        description: autoFixed.description,
        meta_description: autoFixed.metaDescription,
        keywords_main: autoFixed.keywords[0] || primaryKeyword,
        keywords_secondary: autoFixed.keywords.slice(1).join(", "),
        content: mergedContent,
        updated_at: new Date().toISOString(),
      })
      .eq("id", row.id);

    if (error) {
      results.push({
        title: row.title,
        slug: repairedSlug || row.id,
        keyword: primaryKeyword,
        newsId: row.id,
        status: "failed",
        detail: error.message || "Không thể vá SEO field cho bài cũ.",
      });
      continue;
    }

    results.push({
      title: row.title,
      slug: repairedSlug || row.id,
      keyword: primaryKeyword,
      newsId: row.id,
      status: "updated",
      detail: "Đã tự điền slug, SEO title, meta description và keyword còn thiếu.",
    });
  }

  return results;
}

export async function runSeoAutomation(options: RunOptions) {
  const settings = await getSeoAutomationSettings();
  if (!settings.enabled && !options.force) {
    throw new Error("SEO Autopilot dang tat.");
  }

  if (options.reason === "cron" && !options.force) {
    const expectedHour = parseConfiguredHour(settings.publishTimeLabel);
    const currentHour = localHour(new Date(), settings.timezone);
    if (expectedHour !== currentHour) {
      return {
        settings,
        run: null,
        skippedBySchedule: true,
      };
    }
  }

  const run = await createRunLog(options.reason);
  try {
    await acquireAutomationLock(run.id, options.reason);
  } catch (error) {
    await finalizeRunLog(run.id, {
      finishedAt: new Date().toISOString(),
      status: "failed",
      failedCount: 1,
      items: [
        {
          title: "Khong the bat dau luot chay",
          slug: "automation-lock",
          keyword: "automation",
          status: "failed",
          detail: error instanceof Error ? error.message : "Khong the khoa SEO Autopilot.",
        },
      ],
    }).catch(() => undefined);
    throw error;
  }
  try {
    const rows = await getAllNewsRows();
    const alreadyCreatedToday = getTodaysAutomationCount(rows, settings.timezone);
    const requestedCount = Math.max(0, Math.min(options.manualCount ?? settings.dailyPostCount, 10));
    const remaining = options.force ? requestedCount : Math.max(0, requestedCount - alreadyCreatedToday);

  if (remaining <= 0) {
    await finalizeRunLog(run.id, {
      finishedAt: new Date().toISOString(),
      status: "success",
      skippedCount: requestedCount,
      items: [
        {
          title: "Không tạo thêm bài",
          slug: "already-filled",
          keyword: "automation",
          status: "skipped",
          detail: `Hôm nay đã đủ ${alreadyCreatedToday}/${requestedCount} bài tự động.`,
        },
      ],
    });
      return {
        settings,
        run: await getSeoAutomationRuns().then((items) => items.find((item) => item.id === run.id) || null),
      };
  }

  const { apiKey, model } = await getOpenAiRuntimeConfig();
  const client = apiKey ? new OpenAI({ apiKey }) : null;
  const existingTitles = rows.map((row) => row.title).filter(Boolean);
  const serviceSeeds = await getMarketingServiceSeeds(settings.topicSeeds);
  const titlePlans = await generateTitlePlans(client, model, settings, existingTitles, remaining, serviceSeeds);
  const items: SeoAutomationArticleResult[] = settings.autoBackfillMissingSeo ? await repairExistingSeoFields(rows, 3) : [];
  const batchId = run.id;

  for (const plan of titlePlans) {
    try {
      const serpInsight = await fetchSerpInsight(plan.title).catch(() => ({
        source: "heuristic" as const,
        intent: guessIntent(plan.title),
        relatedKeywords: dedupeKeywords([plan.keyword, plan.title]),
        headlines: [],
        location: "Vietnam",
      }));
      const outlineResult = await generateOutline(client, model, plan.title, plan.keyword, serpInsight);
      let articleResult = await generateArticleContent(client, model, plan.title, outlineResult.keywords[0] || plan.keyword, outlineResult.structure, settings);
      let content = ensureSectionAnchors(articleResult.content, outlineResult.structure);

      if (settings.autoInsertInternalLinks) {
        const draftSlug = buildReliableSlug({ title: plan.title, keyword: plan.keyword });
        const suggestions = await buildInternalLinkSuggestions(draftSlug, plan.title, content, outlineResult.keywords);
        content = injectInternalLinks(content, suggestions);
      }

      const images = await generateImagesForArticle(client, plan.title, outlineResult.structure, settings);
      let featuredImageUrl = images[0]?.url || "";
      if (images.length > 0) {
        for (const image of images.slice(1)) {
          content = insertImageBySection(content, image, outlineResult.structure);
        }
      }

      const serviceKeywords = serviceSeeds.map((item) => item.keyword);
      const seoTitle = buildSeoFriendlyTitle({ title: plan.title, keyword: outlineResult.keywords[0] || plan.keyword });
      const initialMetaDescription = buildMetaDescription({
        title: seoTitle,
        keyword: outlineResult.keywords[0] || plan.keyword,
        content,
      });
      const qualityResult = await optimizeArticleQuality({
        client,
        model,
        title: seoTitle,
        keyword: outlineResult.keywords[0] || plan.keyword,
        keywords: outlineResult.keywords,
        content,
        metaDescription: initialMetaDescription,
        slug: buildReliableSlug({ title: seoTitle, keyword: outlineResult.keywords[0] || plan.keyword }),
        serviceKeywords,
        targetWordCount: settings.targetWordCount,
      });
      const autoFixed = autoFixSeoDraft({
        title: seoTitle,
        metaDescription: initialMetaDescription,
        content: qualityResult.content,
        keywords: outlineResult.keywords,
        imageUrls: images.map((image) => image.url),
        serviceKeywords,
      });
      content = autoFixed.content;
      const metaTitle = autoFixed.metaTitle;
      const metaDescription = autoFixed.metaDescription;
      const description = autoFixed.description;
      const desiredSlug = autoFixed.slug;
      const publishDecision = canAutoPublish({
        evaluation: autoFixed.evaluation,
        autoPublishEnabled: settings.autoPublish,
        featuredImageUrl,
        imageGenerationEnabled: settings.generateImages,
      });
      const shouldPublish = publishDecision.allowed;
      const saved = await createOrUpdateNewsArticle({
        title: autoFixed.title,
        keyword: autoFixed.keywords[0] || plan.keyword,
        content,
        metaTitle,
        metaDescription,
        description,
        slug: desiredSlug,
        imageUrl: featuredImageUrl,
        category: settings.defaultCategory,
        runId: run.id,
        batchId,
        autoPublish: shouldPublish,
        publishedAt: new Date().toISOString(),
        secondaryKeywords: autoFixed.keywords.slice(1),
      });

      await appendSeoStudioHistory({
        type: "article",
        status: "success",
        title: autoFixed.title,
        provider: client ? "openai" : "fallback",
        model,
        keywords: autoFixed.keywords,
        intent: outlineResult.intent,
        source: "seo-automation",
        detail: `SEO Autopilot da tao bai ${autoFixed.title} voi diem SEO ${autoFixed.evaluation.score}/100.`,
        hint: shouldPublish ? "Bai da duoc dang tu dong sau khi qua kiem dinh SEO." : publishDecision.reason,
        snapshot: {
          title: autoFixed.title,
          slug: saved.slug,
          featuredImageUrl,
          metaTitle,
          metaDescription,
          description,
          content,
          keywords: autoFixed.keywords,
          outline: outlineResult.structure,
          searchIntent: outlineResult.intent,
          serpInsight: outlineResult.serpInsight,
          images,
          published: shouldPublish,
          hot: false,
          publishedAt: new Date().toISOString().slice(0, 10),
          savedNewsId: saved.id,
        },
      }).catch(() => undefined);

      items.push({
        title: autoFixed.title,
        slug: saved.slug,
        keyword: autoFixed.keywords[0] || plan.keyword,
        newsId: saved.id,
        status: "created",
        detail: `${shouldPublish ? "Đã đăng" : "Đã lưu nháp"} với ${countWords(content)} từ${featuredImageUrl ? ", có ảnh AI" : ""}, score ${autoFixed.evaluation.score}/100.`,
      });
      if (!shouldPublish && items[items.length - 1]) {
        items[items.length - 1]!.detail = `${items[items.length - 1]!.detail} ${publishDecision.reason}`.trim();
      }
    } catch (error) {
      items.push({
        title: plan.title,
        slug: slugify(plan.title) || "failed",
        keyword: plan.keyword,
        status: "failed",
        detail: error instanceof Error ? error.message : "Không thể tạo bài tự động.",
      });
    }
  }

  const createdCount = items.filter((item) => item.status === "created").length;
  const updatedCount = items.filter((item) => item.status === "updated").length;
  const skippedCount = items.filter((item) => item.status === "skipped").length;
  const failedCount = items.filter((item) => item.status === "failed").length;
  const status: SeoAutomationRunLog["status"] = failedCount === 0 ? "success" : createdCount + updatedCount > 0 ? "partial" : "failed";

  const finalized = await finalizeRunLog(run.id, {
    finishedAt: new Date().toISOString(),
    status,
    createdCount,
    updatedCount,
    skippedCount,
    failedCount,
    items,
  });

  return {
    settings,
    run: finalized,
  };
  } catch (error) {
    await finalizeRunLog(run.id, {
      finishedAt: new Date().toISOString(),
      status: "failed",
      failedCount: 1,
      items: [
        {
          title: "SEO Autopilot gap loi he thong",
          slug: "automation-runtime",
          keyword: "automation",
          status: "failed",
          detail: error instanceof Error ? error.message : "Khong the hoan tat luot SEO Autopilot.",
        },
      ],
    }).catch(() => undefined);
    throw error;
  } finally {
    await releaseAutomationLock(run.id);
  }
}

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import OpenAI from "openai";
import npmSlugify from "slugify";
import { createServerClient } from "@/lib/supabase";
import { buildExcerpt, buildMetaDescription, buildMetaTitle, deriveKeywordCandidates, slugify } from "@/lib/seo-studio-draft";
import { ensureUniqueNewsSlug } from "@/lib/news-slug";
import { getOpenAiRuntimeConfig, getSerpApiRuntimeConfig } from "@/lib/studio-settings";
import { appendSeoStudioHistory } from "@/lib/seo-studio-history";
import { mergeNewsContentMeta, parseNewsContentMeta } from "@/lib/news-content-meta";

const SETTINGS_TABLE = "site_settings";
const AUTOMATION_SETTINGS_KEY = "seo_automation_settings";
const AUTOMATION_RUNS_KEY = "seo_automation_runs";
const MAX_RUN_LOGS = 30;
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

async function generateTitlePlans(client: OpenAI | null, model: string, settings: SeoAutomationSettings, existingTitles: string[], count: number) {
  if (!client) {
    return buildFallbackTitlePlans(existingTitles, settings.topicSeeds, count);
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
                `Chủ đề ưu tiên: ${settings.topicSeeds.join(", ")}`,
                `Những tiêu đề đã có: ${existingTitles.slice(0, 50).join(" | ") || "chưa có"}`,
                "Yêu cầu:",
                "- Không trùng ý giữa các bài",
                "- Nghiêng về dịch vụ, chuyển đổi, local SEO, content marketing và website",
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
      .slice(0, count);

    return plans.length > 0 ? plans : buildFallbackTitlePlans(existingTitles, settings.topicSeeds, count);
  } catch {
    return buildFallbackTitlePlans(existingTitles, settings.topicSeeds, count);
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
    const metaTitle = buildMetaTitle({ title: row.title, keyword: primaryKeyword });
    const description = buildExcerpt({ description: row.description, content: row.content, maxLength: 170 });
    const metaDescription = normalizeString(row.meta_description) || buildMetaDescription({ title: row.title, keyword: primaryKeyword, content: row.content, description });
    const mergedContent = mergeNewsContentMeta(row.content, { metaTitle });
    const repairedSlug = ensureUniqueNewsSlug(rows, {
      slug: normalizeString(row.slug) || slugify(row.title),
      title: row.title,
      excludeId: row.id,
    });

    const { error } = await supabase
      .from("news")
      .update({
        slug: repairedSlug,
        description,
        meta_description: metaDescription,
        keywords_main: normalizeString(row.keywords_main) || primaryKeyword,
        keywords_secondary: normalizeString(row.keywords_secondary) || deriveKeywordCandidates(row.title).slice(1).join(", "),
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
  const titlePlans = await generateTitlePlans(client, model, settings, existingTitles, remaining);
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
        const draftSlug = slugify(plan.title);
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

      const metaTitle = buildMetaTitle({ title: plan.title, keyword: outlineResult.keywords[0] || plan.keyword });
      const metaDescription = buildMetaDescription({
        title: plan.title,
        keyword: outlineResult.keywords[0] || plan.keyword,
        content,
      });
      const description = buildExcerpt({ content, maxLength: 170 });
      const desiredSlug = slugify(plan.title);
      const saved = await createOrUpdateNewsArticle({
        title: plan.title,
        keyword: outlineResult.keywords[0] || plan.keyword,
        content,
        metaTitle,
        metaDescription,
        description,
        slug: desiredSlug,
        imageUrl: featuredImageUrl,
        category: settings.defaultCategory,
        runId: run.id,
        batchId,
        autoPublish: settings.autoPublish,
        publishedAt: new Date().toISOString(),
        secondaryKeywords: outlineResult.keywords.slice(1),
      });

      await appendSeoStudioHistory({
        type: "article",
        status: "success",
        title: plan.title,
        provider: client ? "openai" : "fallback",
        model,
        keywords: outlineResult.keywords,
        intent: outlineResult.intent,
        source: "seo-automation",
        detail: `SEO Autopilot da tao bai ${plan.title}.`,
        hint: settings.autoPublish ? "Bai da duoc dang tu dong." : "Bai dang o trang thai nhap.",
        snapshot: {
          title: plan.title,
          slug: saved.slug,
          featuredImageUrl,
          metaTitle,
          metaDescription,
          description,
          content,
          keywords: outlineResult.keywords,
          outline: outlineResult.structure,
          searchIntent: outlineResult.intent,
          serpInsight: outlineResult.serpInsight,
          images,
          published: settings.autoPublish,
          hot: false,
          publishedAt: new Date().toISOString().slice(0, 10),
          savedNewsId: saved.id,
        },
      }).catch(() => undefined);

      items.push({
        title: plan.title,
        slug: saved.slug,
        keyword: outlineResult.keywords[0] || plan.keyword,
        newsId: saved.id,
        status: "created",
        detail: `${settings.autoPublish ? "Đã đăng" : "Đã lưu nháp"} với ${countWords(content)} từ${featuredImageUrl ? ", có ảnh AI" : ""}.`,
      });
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
}

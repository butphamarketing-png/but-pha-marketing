import { NextResponse } from "next/server";
import OpenAI from "openai";
import { appendSeoStudioHistory } from "@/lib/seo-studio-history";
import { buildMetaDescription, buildMetaTitle, deriveKeywordCandidates, slugify } from "@/lib/seo-studio-draft";
import { getOpenAiRuntimeConfig, getSerpApiRuntimeConfig } from "@/lib/studio-settings";

export const runtime = "nodejs";

type OutlineItem = {
  level: number;
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

function normalizeTitle(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function stripCodeFences(raw: string) {
  return raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
}

function dedupeKeywords(items: string[]) {
  return items
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item, index, list) => list.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index)
    .slice(0, 10);
}

function tokenizeVietnamese(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((item) => item.length >= 3);
}

function isKeywordRelevant(title: string, keyword: string) {
  const titleTokens = new Set(tokenizeVietnamese(title));
  const keywordTokens = tokenizeVietnamese(keyword);
  if (keywordTokens.length === 0) return false;
  if (keywordTokens.some((token) => titleTokens.has(token))) return true;
  return /marketing|seo|website|web|thiet|ke|xay|dung|dich|vu|bao|gia|chi|phi/i.test(keywordTokens.join(" "));
}

function repairVietnameseOutlineText(value: string) {
  const normalized = value.trim();
  const lower = normalized.toLowerCase();
  const replacements: Array<[RegExp, string]> = [
    [/^gioi thieu ve /i, "Giới thiệu về "],
    [/^nhu cau thuc te cua khach hang$/i, "Nhu cầu thực tế của khách hàng"],
    [/^giai phap /i, "Giải pháp "],
    [/^quy trinh trien khai$/i, "Quy trình triển khai"],
    [/^quy trinh trien khai tung buoc$/i, "Quy trình triển khai từng bước"],
    [/^kinh nghiem thuc chien$/i, "Kinh nghiệm thực chiến"],
    [/^bang gia va luu y$/i, "Bảng giá và lưu ý"],
    [/^chi phi va luu y quan trong$/i, "Chi phí và lưu ý quan trọng"],
    [/^cau hoi thuong gap$/i, "Câu hỏi thường gặp"],
    [/^ket luan$/i, "Kết luận"],
    [/^tong quan ve /i, "Tổng quan về "],
  ];
  const found = replacements.find(([pattern]) => pattern.test(lower));
  return found ? normalized.replace(found[0], found[1]) : normalized;
}

function guessIntent(title: string) {
  const normalized = title.toLowerCase();
  if (/(gia|bao gia|chi phi|bang gia|gia re)/i.test(normalized)) return "commercial";
  if (/(la gi|huong dan|cach|bi kip|kinh nghiem|tai sao)/i.test(normalized)) return "informational";
  if (/(top|review|so sanh|tot nhat|nen chon)/i.test(normalized)) return "comparison";
  return "commercial";
}

function fallbackOutline(title: string) {
  const structure: OutlineItem[] = [
    { level: 2, text: `Giới thiệu về ${title}`, summary: "", keyPoints: [] },
    { level: 2, text: "Nhu cầu thực tế của khách hàng", summary: "", keyPoints: [] },
    { level: 2, text: `Giải pháp ${title}`, summary: "", keyPoints: [] },
    { level: 2, text: "Quy trình triển khai", summary: "", keyPoints: [] },
    { level: 2, text: "Kinh nghiệm thực chiến", summary: "", keyPoints: [] },
    { level: 2, text: "Bảng giá và lưu ý", summary: "", keyPoints: [] },
    { level: 2, text: "Câu hỏi thường gặp", summary: "", keyPoints: [] },
    { level: 2, text: "Kết luận", summary: "", keyPoints: [] },
  ];

  return {
    h1: title,
    structure,
    keywords: [title, "dịch vụ marketing", "SEO", "chuyển đổi"],
  };
}

function buildFallbackPayload(title: string, serpInsight: SerpInsight, source = "fallback") {
  const fallback = fallbackOutline(title);
  return {
    ...fallback,
    keywords: normalizeKeywords(title, fallback.keywords, serpInsight.relatedKeywords),
    intent: serpInsight.intent,
    serpInsight,
    source,
  };
}

function parseJson<T>(raw: string): T | null {
  try {
    return JSON.parse(stripCodeFences(raw)) as T;
  } catch {
    return null;
  }
}

function normalizeKeywords(title: string, keywords: unknown, serpKeywords: string[] = []) {
  const aiKeywords = Array.isArray(keywords)
    ? keywords.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean)
    : [];
  const derivedKeywords = deriveKeywordCandidates(title);
  const relevant = dedupeKeywords([...derivedKeywords, ...serpKeywords, ...aiKeywords, title, "dịch vụ marketing", "SEO"]).filter((item) =>
    isKeywordRelevant(title, item),
  );
  const merged = dedupeKeywords([...(relevant.length > 0 ? relevant : derivedKeywords), title, "dịch vụ marketing", "SEO"]);
  return merged.length > 0 ? merged.slice(0, 6) : [title, "dịch vụ marketing", "SEO"];
}

function normalizeStructure(items: unknown, title: string): OutlineItem[] {
  const rows = Array.isArray(items) ? items : [];
  const normalized = rows
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const candidate = item as Record<string, unknown>;
      const text = repairVietnameseOutlineText(normalizeTitle(candidate.text ?? candidate.heading ?? candidate.title));
      if (!text) return null;
      const level = Number(candidate.level ?? 2);
      return {
        level: Number.isFinite(level) && level >= 2 && level <= 3 ? level : 2,
        text,
        summary: typeof candidate.summary === "string" ? candidate.summary.trim() : "",
        keyPoints: Array.isArray(candidate.keyPoints)
          ? candidate.keyPoints.map((point) => (typeof point === "string" ? point.trim() : "")).filter(Boolean)
          : [],
      } satisfies OutlineItem;
    })
    .filter((item): item is OutlineItem => Boolean(item));

  return normalized.length > 0 ? normalized : fallbackOutline(title).structure;
}

function buildErrorResponse(message: string, detail: string, hint: string, status: number, provider = "openai", code = "") {
  return NextResponse.json(
    {
      error: message,
      detail,
      hint,
      provider,
      code,
    },
    { status },
  );
}

async function fetchSerpInsight(title: string): Promise<SerpInsight> {
  const { apiKey, location } = await getSerpApiRuntimeConfig();
  if (!apiKey) {
    return {
      source: "heuristic",
      intent: guessIntent(title),
      relatedKeywords: [title, `${title} la gi`, `${title} bao gia`],
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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const response = await fetch(url.toString(), { cache: "no-store", signal: controller.signal }).finally(() => clearTimeout(timeout));
  if (!response.ok) {
    throw new Error(`SerpAPI ${response.status}: ${response.statusText}`);
  }

  const payload = (await response.json()) as Record<string, unknown>;
  const relatedSearches = Array.isArray(payload.related_searches)
    ? payload.related_searches
        .map((item) => (item && typeof item === "object" ? normalizeTitle((item as Record<string, unknown>).query) : ""))
        .filter(Boolean)
    : [];
  const headlines = Array.isArray(payload.organic_results)
    ? payload.organic_results
        .slice(0, 5)
        .map((item) => (item && typeof item === "object" ? normalizeTitle((item as Record<string, unknown>).title) : ""))
        .filter(Boolean)
    : [];

  const snippets = Array.isArray(payload.organic_results)
    ? payload.organic_results
        .slice(0, 5)
        .map((item) => (item && typeof item === "object" ? normalizeTitle((item as Record<string, unknown>).snippet) : ""))
        .join(" ")
        .toLowerCase()
    : "";

  const intent =
    /gia|bao gia|chi phi|dich vu|thue|dat lich/.test(snippets) ? "commercial" : guessIntent(title);

  return {
    source: "serpapi",
    intent,
    relatedKeywords: dedupeKeywords([title, ...relatedSearches]),
    headlines,
    location,
  };
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const title = normalizeTitle(body?.title);

  if (!title) {
    return buildErrorResponse(
      "Thiếu tiêu đề để tạo dàn ý AI.",
      "Bạn chưa nhập tiêu đề bài viết.",
      "Nhập tiêu đề rõ ràng, có chứa từ khoá chính rồi thử lại.",
      400,
      "system",
      "missing_title",
    );
  }

  const serpInsight = await fetchSerpInsight(title).catch(() => ({
    source: "heuristic" as const,
    intent: guessIntent(title),
    relatedKeywords: [title, `${title} là gì`, `${title} báo giá`],
    headlines: [],
    location: "Vietnam",
  }));

  try {
    const { apiKey, model } = await getOpenAiRuntimeConfig();

    if (!apiKey) {
      const payload = buildFallbackPayload(title, serpInsight);

      await appendSeoStudioHistory({
        type: "outline",
        status: "success",
        title,
        provider: "fallback",
        model,
        keywords: payload.keywords,
        intent: payload.intent,
        source: payload.source,
        detail: "Không có OpenAI key, đã dùng dàn ý fallback.",
        hint: "Lưu OpenAI key trong admin để có dàn ý AI chất lượng cao hơn.",
        snapshot: {
          title,
          slug: slugify(title),
          metaTitle: buildMetaTitle({ title, keyword: payload.keywords[0] }),
          metaDescription: buildMetaDescription({ title, keyword: payload.keywords[0] }),
          keywords: payload.keywords,
          outline: payload.structure,
          searchIntent: payload.intent,
          serpInsight: payload.serpInsight,
        },
      }).catch(() => undefined);

      return NextResponse.json(payload);
    }

    const client = new OpenAI({ apiKey });
    const response = await Promise.race([
      client.responses.create({
        model,
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: "Bạn là chuyên gia SEO content tiếng Việt. Hãy trả về JSON hợp lệ, không markdown, không giải thích thêm.",
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: [
                  `Tiêu đề bài viết: ${title}`,
                  `Search intent ưu tiên: ${serpInsight.intent}`,
                  `Keyword gợi ý từ dữ liệu SERP: ${serpInsight.relatedKeywords.join(", ") || title}`,
                  `Top headline tham khảo: ${serpInsight.headlines.join(" | ") || "không có"}`,
                  "Hãy phân tích search intent và đề xuất dàn ý bài viết chuẩn SEO cho landing article dịch vụ marketing.",
                  "Yêu cầu:",
                  "- Tạo 6-8 mục chính",
                  "- level chỉ dùng 2 hoặc 3",
                  "- text là tiêu đề hiển thị rõ ràng bằng tiếng Việt có dấu",
                  "- keywords là danh sách từ khoá mục tiêu liên quan trực tiếp tới tiêu đề, không lấy keyword lạc chủ đề từ SERP",
                  "Schema JSON:",
                  '{"keywords":["..."],"structure":[{"level":2,"text":"...","summary":"...","keyPoints":["..."]}]}',
                ].join("\n"),
              },
            ],
          },
        ],
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("OpenAI tạo dàn ý quá lâu.")), 25000)),
    ]);

    const raw = response.output_text ?? "";
    const parsed = parseJson<{ keywords?: unknown; structure?: unknown }>(raw);
    if (!parsed) {
      throw new Error("OpenAI tra ve du lieu khong dung dinh dang JSON mong doi.");
    }

    const keywords = normalizeKeywords(title, parsed.keywords, serpInsight.relatedKeywords);
    const payload = {
      h1: title,
      structure: normalizeStructure(parsed.structure, title),
      keywords,
      intent: serpInsight.intent,
      serpInsight,
      source: "openai",
    };

    await appendSeoStudioHistory({
      type: "outline",
      status: "success",
      title,
      provider: serpInsight.source === "serpapi" ? "serpapi" : "openai",
      model,
      keywords,
      intent: payload.intent,
      source: payload.source,
      detail:
        serpInsight.source === "serpapi"
          ? "Đã kết hợp OpenAI với dữ liệu từ SerpAPI để đề xuất keyword và intent."
          : "Đã tạo dàn ý bằng OpenAI với intent heuristic.",
      hint: "",
      snapshot: {
        title,
        slug: slugify(title),
        metaTitle: buildMetaTitle({ title, keyword: keywords[0] }),
        metaDescription: buildMetaDescription({ title, keyword: keywords[0] }),
        keywords,
        outline: payload.structure,
        searchIntent: payload.intent,
        serpInsight: payload.serpInsight,
      },
    }).catch(() => undefined);

    return NextResponse.json(payload);
  } catch (error) {
    const message = error instanceof Error && error.message ? error.message : "Không thể tạo dàn ý AI lúc này.";
    const detail = message;
    const hint =
      /api key|401|403/i.test(message)
        ? "Kiểm tra lại OpenAI key trong admin và bấm Kiểm tra kết nối."
        : /rate|quota|429/i.test(message)
          ? "OpenAI đang hết quota hoặc bị giới hạn tốc độ. Thử lại sau ít phút."
          : "Thử lưu lại cấu hình AI/SerpAPI rồi tạo dàn ý lại.";

    const fallbackPayload = buildFallbackPayload(title, serpInsight, "fallback");

    await appendSeoStudioHistory({
      type: "outline",
      status: "success",
      title,
      provider: "fallback",
      keywords: fallbackPayload.keywords,
      intent: fallbackPayload.intent,
      source: fallbackPayload.source,
      detail: `OpenAI chưa tạo được dàn ý (${detail}), hệ thống đã dùng dàn ý fallback.`,
      hint: "Bạn có thể tiếp tục viết bài bằng dàn ý fallback hoặc kiểm tra OpenAI key sau.",
      snapshot: {
        title,
        slug: slugify(title),
        metaTitle: buildMetaTitle({ title, keyword: fallbackPayload.keywords[0] }),
        metaDescription: buildMetaDescription({ title, keyword: fallbackPayload.keywords[0] }),
        keywords: fallbackPayload.keywords,
        outline: fallbackPayload.structure,
        searchIntent: fallbackPayload.intent,
        serpInsight,
      },
    }).catch(() => undefined);

    return NextResponse.json({
      ...fallbackPayload,
      warning: "OpenAI chưa tạo được dàn ý, hệ thống đã dùng dàn ý fallback.",
      detail,
      hint,
    });
  }
}

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { appendSeoStudioHistory } from "@/lib/seo-studio-history";
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

function guessIntent(title: string) {
  const normalized = title.toLowerCase();
  if (/(gia|bao gia|chi phi|bang gia|gia re)/i.test(normalized)) return "commercial";
  if (/(la gi|huong dan|cach|bi kip|kinh nghiem|tai sao)/i.test(normalized)) return "informational";
  if (/(top|review|so sanh|tot nhat|nen chon)/i.test(normalized)) return "comparison";
  return "commercial";
}

function fallbackOutline(title: string) {
  const structure: OutlineItem[] = [
    { level: 2, text: `Gioi thieu ve ${title}`, summary: "", keyPoints: [] },
    { level: 2, text: "Nhu cau thuc te cua khach hang", summary: "", keyPoints: [] },
    { level: 2, text: `Giai phap ${title}`, summary: "", keyPoints: [] },
    { level: 2, text: "Quy trinh trien khai", summary: "", keyPoints: [] },
    { level: 2, text: "Kinh nghiem thuc chien", summary: "", keyPoints: [] },
    { level: 2, text: "Bang gia va luu y", summary: "", keyPoints: [] },
    { level: 2, text: "Cau hoi thuong gap", summary: "", keyPoints: [] },
    { level: 2, text: "Ket luan", summary: "", keyPoints: [] },
  ];

  return {
    h1: title,
    structure,
    keywords: [title, "dich vu marketing", "SEO", "chuyen doi"],
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
  const merged = dedupeKeywords([...serpKeywords, ...aiKeywords, title, "dich vu marketing", "SEO"]);
  return merged.length > 0 ? merged : [title, "dich vu marketing", "SEO"];
}

function normalizeStructure(items: unknown, title: string): OutlineItem[] {
  const rows = Array.isArray(items) ? items : [];
  const normalized = rows
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const candidate = item as Record<string, unknown>;
      const text = normalizeTitle(candidate.text ?? candidate.heading ?? candidate.title);
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

  const response = await fetch(url.toString(), { cache: "no-store" });
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
      "Thieu tieu de de tao dan y AI.",
      "Ban chua nhap tieu de bai viet.",
      "Nhap tieu de ro rang, co chua tu khoa chinh roi thu lai.",
      400,
      "system",
      "missing_title",
    );
  }

  const serpInsight = await fetchSerpInsight(title).catch(() => ({
    source: "heuristic" as const,
    intent: guessIntent(title),
    relatedKeywords: [title, `${title} la gi`, `${title} bao gia`],
    headlines: [],
    location: "Vietnam",
  }));

  try {
    const { apiKey, model } = await getOpenAiRuntimeConfig();

    if (!apiKey) {
      const fallback = fallbackOutline(title);
      const payload = {
        ...fallback,
        keywords: normalizeKeywords(title, fallback.keywords, serpInsight.relatedKeywords),
        intent: serpInsight.intent,
        serpInsight,
        source: "fallback",
      };

      await appendSeoStudioHistory({
        type: "outline",
        status: "success",
        title,
        provider: "fallback",
        model,
        keywords: payload.keywords,
        intent: payload.intent,
        source: payload.source,
        detail: "Khong co OpenAI key, da dung dan y fallback.",
        hint: "Luu OpenAI key trong admin de co dan y AI chat luong cao hon.",
      }).catch(() => undefined);

      return NextResponse.json(payload);
    }

    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "Ban la chuyen gia SEO content tieng Viet. Hay tra ve JSON hop le, khong markdown, khong giai thich them.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: [
                `Tieu de bai viet: ${title}`,
                `Search intent uu tien: ${serpInsight.intent}`,
                `Keyword goi y tu du lieu SERP: ${serpInsight.relatedKeywords.join(", ") || title}`,
                `Top headline tham khao: ${serpInsight.headlines.join(" | ") || "khong co"}`,
                "Hay phan tich search intent va de xuat dan y bai viet chuan SEO cho landing article dich vu marketing.",
                "Yeu cau:",
                "- Tao 6-8 muc chinh",
                "- level chi dung 2 hoac 3",
                "- text la tieu de hien thi ro rang bang tieng Viet co dau",
                "- keywords la danh sach tu khoa muc tieu lien quan",
                "Schema JSON:",
                '{"keywords":["..."],"structure":[{"level":2,"text":"...","summary":"...","keyPoints":["..."]}]}',
              ].join("\n"),
            },
          ],
        },
      ],
    });

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
          ? "Da ket hop OpenAI voi du lieu tu SerpAPI de de xuat keyword va intent."
          : "Da tao dan y bang OpenAI voi intent heuristic.",
      hint: "",
    }).catch(() => undefined);

    return NextResponse.json(payload);
  } catch (error) {
    const message = error instanceof Error && error.message ? error.message : "Khong the tao dan y AI luc nay.";
    const detail = message;
    const hint =
      /api key|401|403/i.test(message)
        ? "Kiem tra lai OpenAI key trong admin va bam Kiem tra ket noi."
        : /rate|quota|429/i.test(message)
          ? "OpenAI dang het quota hoac bi gioi han toc do. Thu lai sau it phut."
          : "Thu luu lai cau hinh AI/SerpAPI roi tao dan y lai.";

    await appendSeoStudioHistory({
      type: "outline",
      status: "error",
      title,
      provider: "openai",
      keywords: serpInsight.relatedKeywords,
      intent: serpInsight.intent,
      source: "openai",
      detail,
      hint,
    }).catch(() => undefined);

    return buildErrorResponse("Khong the tao dan y AI luc nay.", detail, hint, 500, "openai", "outline_failed");
  }
}

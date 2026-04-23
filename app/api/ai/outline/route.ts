import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

type OutlineItem = {
  level: number;
  text: string;
  summary?: string;
  keyPoints?: string[];
};

function normalizeTitle(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function stripCodeFences(raw: string) {
  return raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
}

function fallbackOutline(title: string) {
  return {
    h1: title,
    structure: [
      { level: 2, text: `Giới thiệu về ${title}` },
      { level: 2, text: "Nhu cầu thực tế của khách hàng" },
      { level: 2, text: `Giải pháp ${title}` },
      { level: 2, text: "Quy trình triển khai" },
      { level: 2, text: "Kinh nghiệm thực chiến" },
      { level: 2, text: "Bảng giá và lưu ý" },
      { level: 2, text: "Câu hỏi thường gặp" },
      { level: 2, text: "Kết luận" },
    ],
    keywords: [title, "dịch vụ marketing", "SEO", "chuyển đổi"],
  };
}

function parseJson<T>(raw: string): T | null {
  try {
    return JSON.parse(stripCodeFences(raw)) as T;
  } catch {
    return null;
  }
}

function normalizeKeywords(title: string, keywords: unknown) {
  const list = Array.isArray(keywords)
    ? keywords.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean)
    : [];
  return list.length > 0 ? list.slice(0, 8) : [title, "dịch vụ marketing", "SEO"];
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

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const title = normalizeTitle(body?.title);

    if (!title) {
      return NextResponse.json({ error: "Thiếu tiêu đề để tạo dàn ý AI." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(fallbackOutline(title));
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-5.4",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Bạn là chuyên gia SEO content tiếng Việt. Hãy trả về JSON hợp lệ, không markdown, không giải thích thêm.",
        },
        {
          role: "user",
          content: [
            `Tiêu đề bài viết: ${title}`,
            "Hãy phân tích search intent và đề xuất dàn ý bài viết chuẩn SEO cho landing article dịch vụ marketing.",
            "Yêu cầu:",
            "- Tạo 6-8 mục chính",
            "- level chỉ dùng 2 hoặc 3",
            "- text là tiêu đề hiển thị rõ ràng bằng tiếng Việt có dấu",
            "- keywords là danh sách từ khóa mục tiêu liên quan",
            "Schema JSON:",
            '{"keywords":["..."],"structure":[{"level":2,"text":"...","summary":"...","keyPoints":["..."]}]}',
          ].join("\n"),
        },
      ],
    });

    const raw = response.choices[0]?.message?.content ?? "";
    const parsed = parseJson<{ keywords?: unknown; structure?: unknown }>(raw);
    if (!parsed) {
      return NextResponse.json(fallbackOutline(title));
    }

    return NextResponse.json({
      h1: title,
      structure: normalizeStructure(parsed.structure, title),
      keywords: normalizeKeywords(title, parsed.keywords),
    });
  } catch (error) {
    console.error("POST /api/ai/outline failed", error);
    return NextResponse.json({ error: "Không thể tạo dàn ý AI lúc này." }, { status: 500 });
  }
}

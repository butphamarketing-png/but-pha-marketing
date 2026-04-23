import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getOpenAiRuntimeConfig } from "@/lib/studio-settings";

export const runtime = "nodejs";

type OutlineItem = {
  level?: number;
  text?: string;
  summary?: string;
  keyPoints?: string[];
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function stripCodeFences(raw: string) {
  return raw.replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
}

function normalizeOutline(items: unknown) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => (typeof item === "object" && item ? (item as OutlineItem) : {}))
    .map((item) => ({
      level: Number(item.level ?? 2),
      text: cleanText(item.text),
      summary: cleanText(item.summary),
      keyPoints: Array.isArray(item.keyPoints)
        ? item.keyPoints.map((point) => cleanText(point)).filter(Boolean)
        : [],
    }))
    .filter((item) => item.text)
    .map((item) => ({
      ...item,
      level: item.level >= 2 && item.level <= 3 ? item.level : 2,
    }));
}

function fallbackParagraph(title: string, section: { text: string }) {
  return `<p>${title} là chủ đề quan trọng với doanh nghiệp đang muốn tăng hiện diện số và cải thiện chuyển đổi. Phần "${section.text}" giúp người đọc hiểu rõ giá trị thực tế, cách triển khai và các lưu ý cần có để áp dụng hiệu quả hơn.</p>`;
}

function fallbackContent(title: string, outline: Array<{ level: number; text: string }>) {
  return outline
    .map((item, index) => {
      const tag = item.level === 3 ? "h3" : "h2";
      const intro =
        index === 0
          ? `<p>${title} cần được triển khai theo hướng rõ search intent, giàu giá trị thực tiễn và có lời kêu gọi hành động phù hợp.</p>`
          : "";
      return `<${tag}>${item.text}</${tag}>${intro}${fallbackParagraph(title, item)}`;
    })
    .join("");
}

function buildPrompt(input: {
  title: string;
  keywords: string[];
  outline: Array<{ level: number; text: string; summary?: string; keyPoints?: string[] }>;
}) {
  const outlineText = input.outline
    .map((item) => {
      const keyPoints = item.keyPoints?.length ? ` | key points: ${item.keyPoints.join(", ")}` : "";
      const summary = item.summary ? ` | tóm tắt: ${item.summary}` : "";
      return `- H${item.level}: ${item.text}${summary}${keyPoints}`;
    })
    .join("\n");

  return [
    "Bạn là senior SEO copywriter tiếng Việt.",
    `Viết nội dung HTML sạch cho bài: ${input.title}`,
    `Từ khóa mục tiêu: ${input.keywords.filter(Boolean).join(", ") || input.title}`,
    "Yêu cầu:",
    "- Chỉ trả về HTML fragment, không markdown, không code fence",
    "- Giữ nguyên dàn ý đã cho",
    "- Mỗi heading phải có ít nhất 1 đoạn văn thực chất, không viết placeholder",
    "- Văn phong tự nhiên, thuyết phục, cụ thể, tránh lặp câu mẫu",
    "- Có thể thêm bullet list ngắn khi phù hợp",
    "- Nội dung bằng tiếng Việt có dấu, giọng văn rõ ràng và đáng tin cậy",
    "Dàn ý cần bám theo:",
    outlineText,
  ].join("\n");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const title = cleanText(body?.title);
    const keywords = Array.isArray(body?.keywords)
      ? body.keywords.map((item: unknown) => cleanText(item)).filter(Boolean)
      : [];
    const outline = normalizeOutline(body?.outline);

    if (!title) {
      return NextResponse.json({ error: "Thiếu tiêu đề bài viết." }, { status: 400 });
    }

    if (outline.length === 0) {
      return NextResponse.json({ error: "Thiếu dàn ý để viết bài." }, { status: 400 });
    }

    const { apiKey, model } = await getOpenAiRuntimeConfig();

    if (!apiKey) {
      const content = fallbackContent(title, outline);
      return NextResponse.json({
        content,
        wordCount: content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length,
        estimatedTime: "5 phút đọc",
        source: "fallback",
      });
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
              text: "Bạn viết landing article SEO bằng tiếng Việt. Chỉ trả về HTML fragment hợp lệ, không giải thích, không dùng placeholder.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: buildPrompt({ title, keywords, outline }),
            },
          ],
        },
      ],
    });

    const content = stripCodeFences(response.output_text ?? "");
    if (!content) {
      return NextResponse.json({ error: "OpenAI không trả về nội dung hợp lệ." }, { status: 502 });
    }

    const wordCount = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    return NextResponse.json({
      content,
      wordCount,
      estimatedTime: `${Math.max(3, Math.round(wordCount / 220))} phút đọc`,
      source: "openai",
    });
  } catch (error) {
    console.error("POST /api/ai/generate-article failed", error);
    return NextResponse.json({ error: "Không thể tạo bài viết AI lúc này." }, { status: 500 });
  }
}

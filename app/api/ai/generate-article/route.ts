import { NextResponse } from "next/server";
import OpenAI from "openai";

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
  return `<p>${title} la chu de quan trong voi doanh nghiep dang muon tang hien dien so va cai thien chuyen doi. Phan "${section.text}" giup nguoi doc hieu ro gia tri thuc te, cach trien khai va cac luu y can co de ap dung hieu qua hon.</p>`;
}

function fallbackContent(title: string, outline: Array<{ level: number; text: string }>) {
  return outline
    .map((item, index) => {
      const tag = item.level === 3 ? "h3" : "h2";
      const intro =
        index === 0
          ? `<p>${title} can duoc trien khai theo huong ro search intent, giau gia tri thuc tien va co loi keu goi hanh dong phu hop.</p>`
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
      const summary = item.summary ? ` | summary: ${item.summary}` : "";
      return `- H${item.level}: ${item.text}${summary}${keyPoints}`;
    })
    .join("\n");

  return [
    "Ban la senior SEO copywriter tieng Viet.",
    `Viet noi dung HTML sach cho bai: ${input.title}`,
    `Tu khoa muc tieu: ${input.keywords.filter(Boolean).join(", ") || input.title}`,
    "Yeu cau:",
    "- Chi tra ve HTML fragment, khong markdown, khong code fence",
    "- Giu nguyen dan y da cho",
    "- Moi heading phai co it nhat 1 doan van thuc chat, khong viet placeholder",
    "- Van phong tu nhien, thuyet phuc, cu the, tranh lap cau mau",
    "- Co the them bullet list ngan khi phu hop",
    "- Noi dung bang tieng Viet",
    "Dan y can bam theo:",
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
      return NextResponse.json({ error: "Thieu tieu de bai viet." }, { status: 400 });
    }

    if (outline.length === 0) {
      return NextResponse.json({ error: "Thieu dan y de viet bai." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      const content = fallbackContent(title, outline);
      return NextResponse.json({
        content,
        wordCount: content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length,
        estimatedTime: "5 phut doc",
        source: "fallback",
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.4",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "Ban viet landing article SEO bang tieng Viet. Chi tra ve HTML fragment hop le, khong giai thich, khong dung placeholder.",
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
      return NextResponse.json({ error: "OpenAI khong tra ve noi dung hop le." }, { status: 502 });
    }

    const wordCount = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    return NextResponse.json({
      content,
      wordCount,
      estimatedTime: `${Math.max(3, Math.round(wordCount / 220))} phut doc`,
      source: "openai",
    });
  } catch (error) {
    console.error("POST /api/ai/generate-article failed", error);
    return NextResponse.json({ error: "Khong the tao bai viet AI luc nay." }, { status: 500 });
  }
}

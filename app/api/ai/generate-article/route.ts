import { NextResponse } from "next/server";
import OpenAI from "openai";
import { appendSeoStudioHistory } from "@/lib/seo-studio-history";
import { buildExcerpt, buildMetaDescription, buildMetaTitle, slugify } from "@/lib/seo-studio-draft";
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

function buildFallbackArticlePayload(title: string, outline: Array<{ level: number; text: string }>, source = "fallback") {
  const content = fallbackContent(title, outline);
  const wordCount = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return {
    content,
    wordCount,
    estimatedTime: `${Math.max(3, Math.round(wordCount / 220))} phút đọc`,
    source,
  };
}

function buildPrompt(input: {
  title: string;
  keywords: string[];
  outline: Array<{ level: number; text: string; summary?: string; keyPoints?: string[] }>;
}) {
  const outlineText = input.outline
    .map((item) => {
      const keyPoints = item.keyPoints?.length ? ` | key points: ${item.keyPoints.join(", ")}` : "";
      const summary = item.summary ? ` | tom tat: ${item.summary}` : "";
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
    "- Noi dung bang tieng Viet co dau, giong van ro rang va dang tin cay",
    "Dan y can bam theo:",
    outlineText,
  ].join("\n");
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

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const title = cleanText(body?.title);
  const keywords = Array.isArray(body?.keywords)
    ? body.keywords.map((item: unknown) => cleanText(item)).filter(Boolean)
    : [];
  const outline = normalizeOutline(body?.outline);

  if (!title) {
    return buildErrorResponse(
      "Thieu tieu de bai viet.",
      "Khong tim thay tieu de de viet bai.",
      "Quay lai buoc dau va nhap tieu de ro rang.",
      400,
      "system",
      "missing_title",
    );
  }

  if (outline.length === 0) {
    return buildErrorResponse(
      "Thieu dan y de viet bai.",
      "Ban chua co danh sach heading de AI viet noi dung.",
      "Tao dan y truoc khi viet bai chi tiet.",
      400,
      "system",
      "missing_outline",
    );
  }

  try {
    const { apiKey, model } = await getOpenAiRuntimeConfig();

    if (!apiKey) {
      const payload = buildFallbackArticlePayload(title, outline);

      await appendSeoStudioHistory({
        type: "article",
        status: "success",
        title,
        provider: "fallback",
        model,
        keywords,
        source: "fallback",
        detail: "Khong co OpenAI key, da dung bai viet fallback.",
        hint: "Luu OpenAI key trong admin de viet bai chi tiet bang AI.",
        snapshot: {
          title,
          slug: slugify(title),
          metaTitle: buildMetaTitle({ title, keyword: keywords[0] }),
          metaDescription: buildMetaDescription({ title, keyword: keywords[0], content: payload.content }),
          description: buildExcerpt({ content: payload.content, maxLength: 170 }),
          content: payload.content,
          keywords,
          outline,
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
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("OpenAI viet bai qua lau.")), 45000)),
    ]);

    const content = stripCodeFences(response.output_text ?? "");
    if (!content) {
      throw new Error("OpenAI khong tra ve noi dung hop le.");
    }

    const wordCount = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;

    await appendSeoStudioHistory({
      type: "article",
      status: "success",
      title,
      provider: "openai",
      model,
      keywords,
      source: "openai",
      detail: `Da tao bai viet AI voi khoang ${wordCount} tu.`,
      hint: "",
      snapshot: {
        title,
        slug: slugify(title),
        metaTitle: buildMetaTitle({ title, keyword: keywords[0] }),
        metaDescription: buildMetaDescription({ title, keyword: keywords[0], content }),
        description: buildExcerpt({ content, maxLength: 170 }),
        content,
        keywords,
        outline,
      },
    }).catch(() => undefined);

    return NextResponse.json({
      content,
      wordCount,
      estimatedTime: `${Math.max(3, Math.round(wordCount / 220))} phut doc`,
      source: "openai",
    });
  } catch (error) {
    const detail = error instanceof Error && error.message ? error.message : "Khong the tao bai viet AI luc nay.";
    const hint =
      /api key|401|403/i.test(detail)
        ? "Kiem tra lai OpenAI key trong admin va bam Kiem tra ket noi."
        : /rate|quota|429/i.test(detail)
          ? "OpenAI dang het quota hoac bi gioi han toc do. Thu lai sau it phut."
          : "Thu giam do dai dan y hoac tao lai sau khi luu cau hinh AI.";

    const fallbackPayload = buildFallbackArticlePayload(title, outline);

    await appendSeoStudioHistory({
      type: "article",
      status: "success",
      title,
      provider: "fallback",
      keywords,
      source: fallbackPayload.source,
      detail: `OpenAI chua viet duoc bai (${detail}), he thong da dung bai viet fallback.`,
      hint: "Ban co the tiep tuc chinh sua ban fallback hoac kiem tra OpenAI key/quota sau.",
      snapshot: {
        title,
        slug: slugify(title),
        metaTitle: buildMetaTitle({ title, keyword: keywords[0] }),
        metaDescription: buildMetaDescription({ title, keyword: keywords[0], content: fallbackPayload.content }),
        description: buildExcerpt({ content: fallbackPayload.content, maxLength: 170 }),
        content: fallbackPayload.content,
        keywords,
        outline,
      },
    }).catch(() => undefined);

    return NextResponse.json({
      ...fallbackPayload,
      warning: "OpenAI chua viet duoc bai, he thong da dung bai viet fallback.",
      detail,
      hint,
    });
  }
}

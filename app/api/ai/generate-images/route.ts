import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

type OutlineItem = {
  level?: number;
  text?: string;
  heading?: string;
  summary?: string;
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOutline(items: unknown): OutlineItem[] {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => (typeof item === "object" && item ? (item as OutlineItem) : {}))
    .filter((item) => cleanText(item.text || item.heading || item.summary));
}

function buildPrompt(input: {
  title: string;
  keywords: string[];
  sectionLabel: string;
  sectionSummary: string;
  brief: string;
}) {
  const keywords = input.keywords.filter(Boolean).slice(0, 6).join(", ");

  return [
    "Use case: photorealistic-natural",
    "Asset type: blog article illustration",
    `Primary request: Create a premium editorial hero image for a Vietnamese marketing article titled "${input.title}". Focus on the section "${input.sectionLabel}".`,
    `Scene/backdrop: modern business environment related to ${input.sectionLabel.toLowerCase()}, realistic context, clean composition for a professional marketing website.`,
    `Subject: ${input.sectionSummary || input.sectionLabel}`,
    "Style/medium: photorealistic editorial illustration, polished, trustworthy, business-focused, suitable for a premium agency article.",
    "Composition/framing: wide landscape 3:2 composition, clear focal subject, enough clean negative space for responsive article layouts.",
    "Lighting/mood: bright, professional, confident, modern, natural contrast, not overly dramatic.",
    "Color palette: clean neutral tones with tasteful purple accents that feel premium and modern.",
    "Materials/textures: realistic office, devices, dashboards, meeting visuals, subtle depth and detail.",
    'Text (verbatim): ""',
    `Constraints: align with article topic "${input.title}"; visually support "${input.sectionLabel}"; feel relevant to Vietnamese business readers; no unrelated fantasy elements.`,
    `Avoid: no text, no watermark, no logo, no UI mockup text, no distorted hands, no extra fingers, no low-detail faces, no cluttered background, no cartoon style unless brief explicitly asks for it.`,
    keywords ? `Additional SEO context: ${keywords}` : "Additional SEO context: none",
    input.brief ? `User brief: ${input.brief}` : "User brief: create the most relevant professional illustration based on the article context",
  ].join("\n");
}

function buildAltText(input: { title: string; sectionLabel: string }) {
  return `Ảnh minh họa cho bài viết "${input.title}" ở phần ${input.sectionLabel}`;
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Thiếu OPENAI_API_KEY trên server nên chưa thể tạo ảnh AI." },
        { status: 500 },
      );
    }

    const body = await request.json().catch(() => null);
    const title = cleanText(body?.title);
    const brief = cleanText(body?.brief);
    const keywords = Array.isArray(body?.keywords) ? body.keywords.map((item: unknown) => cleanText(item)).filter(Boolean) : [];
    const outline = normalizeOutline(body?.outline);
    const requestedSection = cleanText(body?.sectionLabel);
    const variantCount = Math.max(1, Math.min(Number(body?.variantCount) || 4, 4));

    if (!title) {
      return NextResponse.json({ error: "Thiếu tiêu đề bài viết để tạo ảnh." }, { status: 400 });
    }

    const selectedSection =
      outline.find((item) => cleanText(item.text || item.heading) === requestedSection) ||
      outline[0] ||
      null;

    const sectionLabel = cleanText(selectedSection?.text || selectedSection?.heading) || "Tổng quan bài viết";
    const sectionSummary = cleanText(selectedSection?.summary);
    const prompt = buildPrompt({
      title,
      keywords,
      sectionLabel,
      sectionSummary,
      brief,
    });

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.images.generate({
      model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1.5",
      prompt,
      n: variantCount,
      size: "1536x1024",
      quality: "medium",
      output_format: "png",
      background: "auto",
    });

    const images = (response.data || [])
      .map((item, index) => {
        const b64 = typeof item.b64_json === "string" ? item.b64_json : "";
        if (!b64) return null;
        return {
          id: `variant-${index + 1}`,
          b64Json: b64,
          dataUrl: `data:image/png;base64,${b64}`,
          altText: buildAltText({ title, sectionLabel }),
          suggestedName: `${title} ${sectionLabel} phương án ${index + 1}`,
        };
      })
      .filter(Boolean);

    if (images.length === 0) {
      return NextResponse.json({ error: "OpenAI không trả về ảnh hợp lệ." }, { status: 502 });
    }

    return NextResponse.json({
      prompt,
      sectionLabel,
      sectionSummary,
      model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1.5",
      images,
    });
  } catch (error) {
    console.error("POST /api/ai/generate-images failed", error);
    return NextResponse.json({ error: "Không thể tạo ảnh AI lúc này." }, { status: 500 });
  }
}

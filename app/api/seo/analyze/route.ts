import { NextResponse } from "next/server";

export const runtime = "nodejs";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function countWords(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

function countMatches(html: string, regex: RegExp) {
  return (html.match(regex) || []).length;
}

function normalizeKeyword(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim();
}

function keywordDensity(text: string, keyword: string) {
  if (!keyword) return 0;
  const normalizedText = normalizeKeyword(text);
  const normalizedKeyword = normalizeKeyword(keyword);
  if (!normalizedText || !normalizedKeyword) return 0;
  const matches = normalizedText.split(normalizedKeyword).length - 1;
  const words = countWords(normalizedText);
  if (!words) return 0;
  return Number(((matches / words) * 100).toFixed(2));
}

function extractKeywordCandidates(title: string, content: string) {
  const source = `${title} ${content}`.toLowerCase();
  return source
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 4)
    .slice(0, 8);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const metaDescription = typeof body?.metaDescription === "string" ? body.metaDescription.trim() : "";
    const slug = typeof body?.slug === "string" ? body.slug.trim() : "";
    const keywords = Array.isArray(body?.keywords) ? body.keywords.filter((item: unknown) => typeof item === "string") as string[] : [];
    const html = typeof body?.content === "string" ? body.content : "";
    const text = stripHtml(html);
    const wordCount = countWords(text);
    const h1Count = countMatches(html, /<h1[^>]*>/gi);
    const h2Count = countMatches(html, /<h2[^>]*>/gi);
    const h3Count = countMatches(html, /<h3[^>]*>/gi);
    const imageCount = countMatches(html, /<img\b/gi);
    const imagesWithAlt = countMatches(html, /<img\b(?=[^>]*\balt=["'][^"']+["'])/gi);
    const internalLinks = countMatches(html, /<a\s+[^>]*href=["']\/(?!\/)/gi);
    const blogInternalLinks = countMatches(html, /<a\s+[^>]*href=["']\/blog\//gi);
    const outboundLinks = countMatches(html, /<a\s+[^>]*href=["']https?:\/\//gi);
    const primaryKeyword = keywords[0]?.trim() || title;
    const density = keywordDensity(text, primaryKeyword);
    const titleLength = title.length;
    const metaLength = metaDescription.length;

    let score = 0;
    if (titleLength >= 30 && titleLength <= 65) score += 12;
    if (metaLength >= 120 && metaLength <= 160) score += 14;
    if (slug.length >= 6) score += 8;
    if (h1Count === 1) score += 8;
    if (h2Count >= 2) score += 10;
    if (h3Count >= 1) score += 6;
    if (wordCount >= 900) score += 14;
    if (density >= 0.5 && density <= 2.5) score += 10;
    if (imageCount > 0) score += 4;
    if (imageCount === 0 || imagesWithAlt === imageCount) score += 6;
    if (blogInternalLinks >= 2) score += 4;
    if (outboundLinks >= 1) score += 4;
    score = Math.min(100, Math.max(0, score));

    const issues: Array<{ id: number; label: string; status: "critical" | "warning"; fixable: boolean }> = [];

    if (titleLength < 30 || titleLength > 65) {
      issues.push({ id: 1, label: "Title chua nam trong vung goi y 30-65 ky tu.", status: "warning", fixable: true });
    }
    if (metaLength < 120 || metaLength > 160) {
      issues.push({ id: 2, label: "Meta description chua nam trong vung goi y 120-160 ky tu.", status: "warning", fixable: true });
    }
    if (h1Count !== 1) {
      issues.push({ id: 3, label: "Bai viet nen co dung 1 heading H1.", status: "critical", fixable: true });
    }
    if (h2Count < 2) {
      issues.push({ id: 4, label: "Can them heading H2 de chia ro cac phan noi dung.", status: "critical", fixable: true });
    }
    if (wordCount < 900) {
      issues.push({ id: 5, label: "Noi dung con ngan, nen mo rong de dat it nhat 900 tu.", status: "critical", fixable: false });
    }
    if (density < 0.5 || density > 2.5) {
      issues.push({ id: 6, label: `Mat do tu khoa chinh chua toi uu (${density}%).`, status: "warning", fixable: true });
    }
    if (imageCount > imagesWithAlt) {
      issues.push({ id: 7, label: "Mot so anh chua co alt text.", status: "warning", fixable: true });
    }
    if (blogInternalLinks < 2) {
      issues.push({ id: 8, label: "Thieu internal link den cac bai viet lien quan.", status: "critical", fixable: true });
    }
    if (outboundLinks < 1) {
      issues.push({ id: 9, label: "Nen co it nhat 1 outbound link den nguon tham khao uy tin.", status: "warning", fixable: true });
    }

    const suggestions = extractKeywordCandidates(title, text)
      .filter((item, index, list) => list.indexOf(item) === index)
      .slice(0, 6);

    return NextResponse.json({
      score,
      issues,
      suggestions,
      metrics: {
        titleLength,
        metaLength,
        wordCount,
        h1Count,
        h2Count,
        h3Count,
        imageCount,
        imagesWithAlt,
        internalLinks,
        blogInternalLinks,
        outboundLinks,
        density,
      },
    });
  } catch (error) {
    console.error("POST /api/seo/analyze failed", error);
    return NextResponse.json({ error: "Khong the phan tich SEO luc nay." }, { status: 500 });
  }
}

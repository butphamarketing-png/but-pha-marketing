import { NextResponse } from "next/server";
import { getPublishedBlogs } from "@/lib/server-blog";

export const runtime = "nodejs";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
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

function scoreBlog(candidateText: string, keywords: string[]) {
  const haystack = tokenize(candidateText);
  const haystackSet = new Set(haystack);
  return keywords.reduce((sum, keyword) => (haystackSet.has(keyword) ? sum + 1 : sum), 0);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const title = cleanText(body?.title);
    const content = cleanText(body?.content);
    const slug = cleanText(body?.slug);
    const keywords = Array.isArray(body?.keywords)
      ? body.keywords.map((item: unknown) => cleanText(item)).filter(Boolean)
      : [];

    const normalizedKeywords = [...new Set(tokenize(`${title} ${keywords.join(" ")}`))].slice(0, 10);
    const blogs = await getPublishedBlogs();
    const suggestions = blogs
      .filter((item) => item.slug && item.slug !== slug)
      .map((item) => {
        const score = scoreBlog(`${item.title} ${item.description || ""} ${item.keywordsMain || ""} ${item.keywordsSecondary || ""}`, normalizedKeywords);
        const anchorText =
          item.keywordsMain?.trim() ||
          item.title.split(/\s+/).slice(0, 5).join(" ");

        return {
          slug: item.slug || item.id,
          title: item.title,
          anchorText,
          reason: score > 0 ? "Lien quan theo keyword chinh/phu." : "Lien quan theo chu de bai viet.",
          score,
          existsInContent: content.includes(`/blog/${item.slug}`) || content.includes(item.slug || ""),
        };
      })
      .filter((item) => !item.existsInContent)
      .sort((left, right) => right.score - left.score)
      .slice(0, 6);

    return NextResponse.json({
      items: suggestions,
      missingInternalLinks: (content.match(/<a\s+[^>]*href=["']\/blog\//gi) || []).length < 2,
    });
  } catch (error) {
    console.error("POST /api/seo/internal-link-suggestions failed", error);
    return NextResponse.json({ error: "Khong the goi y internal links luc nay." }, { status: 500 });
  }
}

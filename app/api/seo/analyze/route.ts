import { NextResponse } from "next/server";

export const runtime = "nodejs";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function countWords(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

function countHeadings(html: string) {
  return (html.match(/<h[2-3][^>]*>/gi) || []).length;
}

function countInternalLinks(html: string) {
  return (html.match(/<a\s+[^>]*href=["']\/(?!\/)/gi) || []).length;
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
    const html = typeof body?.content === "string" ? body.content : "";
    const text = stripHtml(html);
    const wordCount = countWords(text);
    const headingCount = countHeadings(html);
    const internalLinks = countInternalLinks(html);

    let score = 0;
    score += Math.min(35, Math.round((wordCount / 1600) * 35));
    score += Math.min(25, headingCount * 4);
    score += Math.min(15, internalLinks * 7);
    score += title ? 10 : 0;
    score += html.includes("<strong>") || html.includes("<ul") ? 10 : 0;
    score = Math.max(0, Math.min(100, score));

    const issues: Array<{ id: number; label: string; status: "critical" | "warning"; fixable: boolean }> = [];

    if (wordCount < 900) {
      issues.push({
        id: 1,
        label: "Nội dung còn ngắn, nên mở rộng thêm các phần giải thích và ví dụ thực tế.",
        status: "critical",
        fixable: false,
      });
    }

    if (headingCount < 4) {
      issues.push({
        id: 2,
        label: "Dàn heading còn mỏng, nên thêm H2/H3 để tăng chiều sâu nội dung.",
        status: "warning",
        fixable: true,
      });
    }

    if (internalLinks < 2) {
      issues.push({
        id: 3,
        label: "Thiếu liên kết nội bộ, nên thêm ít nhất 2 internal link liên quan.",
        status: "critical",
        fixable: true,
      });
    }

    if (!/<h2[^>]*>.*<\/h2>/i.test(html)) {
      issues.push({
        id: 4,
        label: "Bài viết chưa có heading H2 rõ ràng cho phần thân bài.",
        status: "critical",
        fixable: true,
      });
    }

    const suggestions = extractKeywordCandidates(title, text)
      .filter((item, index, list) => list.indexOf(item) === index)
      .slice(0, 5);

    return NextResponse.json({
      score,
      issues,
      suggestions,
      wordCount,
      headingCount,
      internalLinks,
    });
  } catch (error) {
    console.error("POST /api/seo/analyze failed", error);
    return NextResponse.json({ error: "Không thể phân tích SEO lúc này." }, { status: 500 });
  }
}

export type SeoIssue = {
  id: number;
  label: string;
  status: "critical" | "warning";
  fixable: boolean;
};

export type SeoEvaluation = {
  score: number;
  issues: SeoIssue[];
  suggestions: string[];
  metrics: {
    titleLength: number;
    metaLength: number;
    wordCount: number;
    h1Count: number;
    h1Equivalent: number;
    h2Count: number;
    h3Count: number;
    imageCount: number;
    imagesWithAlt: number;
    internalLinks: number;
    blogInternalLinks: number;
    outboundLinks: number;
    density: number;
    serviceAlignment: boolean;
  };
};

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
    .filter((item, index, list) => list.indexOf(item) === index)
    .slice(0, 8);
}

export function evaluateSeoArticle(input: {
  title: string;
  metaDescription: string;
  slug: string;
  keywords: string[];
  content: string;
  serviceKeywords?: string[];
}) : SeoEvaluation {
  const html = input.content || "";
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
  const primaryKeyword = input.keywords[0]?.trim() || input.title;
  const density = keywordDensity(text, primaryKeyword);
  const titleLength = input.title.length;
  const metaLength = input.metaDescription.length;
  const h1Equivalent = h1Count > 0 || titleLength > 0 ? 1 : 0;
  const normalizedText = normalizeKeyword(`${input.title} ${text}`);
  const serviceAlignment =
    !input.serviceKeywords || input.serviceKeywords.length === 0
      ? true
      : input.serviceKeywords.some((item) => {
          const normalized = normalizeKeyword(item);
          return normalized && normalizedText.includes(normalized);
        });

  let score = 0;
  if (titleLength >= 30 && titleLength <= 65) score += 12;
  if (metaLength >= 120 && metaLength <= 160) score += 14;
  if (input.slug.length >= 6) score += 8;
  if (h1Equivalent === 1) score += 8;
  if (h2Count >= 2) score += 10;
  if (h3Count >= 1) score += 6;
  if (wordCount >= 900) score += 14;
  if (density >= 0.5 && density <= 2.5) score += 10;
  if (imageCount > 0) score += 4;
  if (imageCount === 0 || imagesWithAlt === imageCount) score += 6;
  if (blogInternalLinks >= 2) score += 4;
  if (outboundLinks >= 1) score += 4;
  score = Math.min(100, Math.max(0, score));

  const issues: SeoIssue[] = [];
  if (titleLength < 30 || titleLength > 65) {
    issues.push({ id: 1, label: "Title chưa nằm trong vùng gợi ý 30-65 ký tự.", status: "warning", fixable: true });
  }
  if (metaLength < 120 || metaLength > 160) {
    issues.push({ id: 2, label: "Meta description chưa nằm trong vùng gợi ý 120-160 ký tự.", status: "warning", fixable: true });
  }
  if (h1Equivalent !== 1) {
    issues.push({ id: 3, label: "Bài viết cần có tiêu đề H1 ở trang hoặc trong nội dung.", status: "critical", fixable: true });
  }
  if (h2Count < 2) {
    issues.push({ id: 4, label: "Cần thêm heading H2 để chia rõ các phần nội dung.", status: "critical", fixable: true });
  }
  if (wordCount < 900) {
    issues.push({ id: 5, label: "Nội dung còn ngắn, nên mở rộng để đạt ít nhất 900 từ.", status: "critical", fixable: false });
  }
  if (density < 0.5 || density > 2.5) {
    issues.push({ id: 6, label: `Mật độ từ khóa chính chưa tối ưu (${density}%).`, status: "warning", fixable: true });
  }
  if (imageCount > imagesWithAlt) {
    issues.push({ id: 7, label: "Một số ảnh chưa có alt text.", status: "warning", fixable: true });
  }
  if (blogInternalLinks < 2) {
    issues.push({ id: 8, label: "Thiếu internal link đến các bài viết liên quan.", status: "critical", fixable: true });
  }
  if (outboundLinks < 1) {
    issues.push({ id: 9, label: "Nên có ít nhất 1 outbound link đến nguồn tham khảo uy tín.", status: "warning", fixable: true });
  }
  if (!serviceAlignment) {
    issues.push({ id: 10, label: "Nội dung chưa bám đủ nhóm dịch vụ marketing cốt lõi của website.", status: "warning", fixable: true });
  }

  const suggestions = extractKeywordCandidates(input.title, text);

  return {
    score,
    issues,
    suggestions,
    metrics: {
      titleLength,
      metaLength,
      wordCount,
      h1Count,
      h1Equivalent,
      h2Count,
      h3Count,
      imageCount,
      imagesWithAlt,
      internalLinks,
      blogInternalLinks,
      outboundLinks,
      density,
      serviceAlignment,
    },
  };
}

export type SeoStudioSnapshot = {
  title: string;
  slug?: string;
  featuredImageUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  description?: string;
  content?: string;
  keywords?: string[];
  outline?: Array<{ level?: number; text?: string; summary?: string; keyPoints?: string[] }>;
  searchIntent?: string;
  serpInsight?: {
    source?: string;
    intent?: string;
    relatedKeywords?: string[];
    headlines?: string[];
    location?: string;
  } | null;
  images?: Array<{ url?: string; name?: string; altText?: string; sectionLabel?: string }>;
  published?: boolean;
  hot?: boolean;
  publishedAt?: string;
  savedNewsId?: string;
};

export function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function normalizePlainText(value: string) {
  return (value || "")
    .replace(/\s+/g, " ")
    .replace(/[|]+/g, " ")
    .trim();
}

function toAsciiWords(value: string) {
  return normalizePlainText(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((item) => item.length >= 2);
}

export function titleLooksWeak(value: string) {
  const normalized = normalizePlainText(value);
  const words = toAsciiWords(normalized);
  if (!normalized) return true;
  if (normalized.length < 18) return true;
  if (words.length < 3) return true;
  if (/^[a-z0-9]$/i.test(normalized)) return true;
  if (/^(test|demo|draft|seo|blog|post|new)$/i.test(normalized)) return true;
  return false;
}

function toSentenceCase(value: string) {
  const normalized = normalizePlainText(value);
  if (!normalized) return "";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export function buildSeoFriendlyTitle(input: { title?: string; keyword?: string; serviceKeyword?: string }) {
  const rawTitle = normalizePlainText(input.title || "");
  const keyword = normalizePlainText(input.keyword || "");
  const serviceKeyword = normalizePlainText(input.serviceKeyword || "");
  const baseKeyword = keyword || serviceKeyword || rawTitle;

  if (!baseKeyword) return "";

  if (!titleLooksWeak(rawTitle)) {
    return rawTitle.length <= 65 ? rawTitle : `${rawTitle.slice(0, 62).trim()}...`;
  }

  const title = toSentenceCase(`${baseKeyword} chuyen nghiep cho doanh nghiep`);
  return title.length <= 65 ? title : `${title.slice(0, 62).trim()}...`;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function deriveKeywordCandidates(title: string) {
  const cleaned = toAsciiWords(title).join(" ");

  if (!cleaned) return [];

  const words = cleaned
    .split(" ")
    .map((item) => item.trim())
    .filter((item) => item.length >= 2);

  const uniqueWords = words.filter((word, index) => words.indexOf(word) === index);
  const mainKeyword = uniqueWords.slice(0, Math.min(4, uniqueWords.length)).join(" ").trim();
  const related = [
    mainKeyword,
    uniqueWords.slice(0, 2).join(" ").trim(),
    `${mainKeyword} chuyen nghiep`.trim(),
    `${mainKeyword} hieu qua`.trim(),
  ]
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter((item, index, arr) => arr.indexOf(item) === index);

  return related;
}

export function buildExcerpt(input: { description?: string; content?: string; maxLength?: number }) {
  const maxLength = input.maxLength ?? 170;
  const source = (input.description || "").trim() || stripHtml(input.content || "");
  if (!source) return "";
  if (source.length <= maxLength) return source;
  return `${source.slice(0, maxLength).trim()}...`;
}

export function buildMetaTitle(input: { title: string; keyword?: string }) {
  const title = buildSeoFriendlyTitle({ title: input.title, keyword: input.keyword });
  const keyword = normalizePlainText(input.keyword || "");
  if (!title && !keyword) return "";

  let candidate = title;
  if (keyword && !candidate.toLowerCase().includes(keyword.toLowerCase())) {
    candidate = `${candidate} | ${keyword}`;
  }

  candidate = candidate.replace(/\s+/g, " ").trim();

  if (candidate.length < 30 && keyword) {
    candidate = `${toSentenceCase(keyword)} | But Pha Marketing`;
  }

  return candidate.length <= 60 ? candidate : `${candidate.slice(0, 57).trim()}...`;
}

export function buildMetaDescription(input: {
  title: string;
  keyword?: string;
  description?: string;
  content?: string;
}) {
  const description = buildExcerpt({ description: input.description, content: input.content, maxLength: 150 });
  if (description && description.length >= 110) return description;

  const title = buildSeoFriendlyTitle({ title: input.title, keyword: input.keyword });
  const keyword = normalizePlainText(input.keyword || "");
  const subject = keyword || title || "giai phap marketing";
  const fallback = `${subject} thuc chien, toi uu SEO, de xuat ro rang va huong toi chuyen doi cho doanh nghiep.`;
  const normalized = fallback.replace(/\s+/g, " ").trim();

  if (normalized.length >= 120 && normalized.length <= 160) return normalized;
  if (normalized.length < 120) {
    return `${normalized} Phu hop de trien khai ben vung va tang truong hieu qua.`.slice(0, 160).trim();
  }
  return `${normalized.slice(0, 157).trim()}...`;
}

export function buildReliableSlug(input: { title?: string; keyword?: string }) {
  const seoTitle = buildSeoFriendlyTitle({ title: input.title, keyword: input.keyword });
  const candidate = slugify(seoTitle || input.keyword || input.title || "");
  if (candidate.length >= 8) return candidate;
  const keywordSlug = slugify(input.keyword || "");
  if (keywordSlug.length >= 8) return keywordSlug;
  return "giai-phap-marketing-chuyen-nghiep";
}

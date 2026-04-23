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
  const cleaned = (title || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

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
  const title = (input.title || "").trim();
  const keyword = (input.keyword || "").trim();
  if (!title) return "";

  const candidate = keyword && !title.toLowerCase().includes(keyword.toLowerCase()) ? `${title} | ${keyword}` : title;
  return candidate.length <= 60 ? candidate : `${candidate.slice(0, 57).trim()}...`;
}

export function buildMetaDescription(input: {
  title: string;
  keyword?: string;
  description?: string;
  content?: string;
}) {
  const description = buildExcerpt({ description: input.description, content: input.content, maxLength: 150 });
  if (description) return description;

  const title = (input.title || "").trim();
  const keyword = (input.keyword || "").trim();
  const fallback = keyword
    ? `${title} voi giai phap ${keyword} thuc chien, de xuat ro rang va huong toi chuyen doi that.`
    : `${title} voi giai phap thuc chien, de xuat ro rang va huong toi chuyen doi that.`;

  return fallback.length <= 160 ? fallback : `${fallback.slice(0, 157).trim()}...`;
}

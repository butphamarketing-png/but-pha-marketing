import type { ServerBlogItem } from "@/lib/server-blog";

export function resolveBlogTag(title: string, slug: string) {
  const value = `${title} ${slug}`.toLowerCase();
  if (value.includes("facebook")) return "Facebook Ads";
  if (value.includes("google maps") || value.includes("maps")) return "Google Maps";
  if (value.includes("website") || value.includes("web") || slug.startsWith("thiet-ke-website")) return "Website";
  if (value.includes("seo")) return "SEO";
  return "Xu hướng";
}

function slugTopicKey(slug: string) {
  const parts = slug.split("-").filter(Boolean);
  if (parts[0] === "thiet" && parts[1] === "ke" && parts[2] === "website") {
    return parts.slice(0, 3).join("-");
  }
  return parts.slice(0, Math.min(4, parts.length)).join("-");
}

function keywordTokens(item: ServerBlogItem) {
  const raw = `${item.keywordsMain || ""} ${item.keywordsSecondary || ""} ${item.title} ${item.slug || ""}`;
  return raw
    .toLowerCase()
    .split(/[\s,|/]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2);
}

function scoreRelated(current: ServerBlogItem, candidate: ServerBlogItem) {
  if (current.id === candidate.id) return -1;

  let score = 0;
  const currentSlug = current.slug || current.id;
  const candidateSlug = candidate.slug || candidate.id;

  if (current.category && current.category === candidate.category) score += 3;

  const currentTopic = slugTopicKey(currentSlug);
  const candidateTopic = slugTopicKey(candidateSlug);
  if (currentTopic.length > 5 && currentTopic === candidateTopic) score += 8;
  else if (currentTopic.length > 5 && candidateSlug.startsWith(currentTopic)) score += 5;

  if (resolveBlogTag(current.title, currentSlug) === resolveBlogTag(candidate.title, candidateSlug)) {
    score += 3;
  }

  const tokens = keywordTokens(current);
  const candidateHaystack = `${candidate.title} ${candidate.description || ""} ${candidate.keywordsMain || ""} ${candidate.keywordsSecondary || ""} ${candidateSlug}`.toLowerCase();
  for (const token of tokens) {
    if (candidateHaystack.includes(token)) score += 2;
  }

  return score;
}

export function getRelatedBlogs(current: ServerBlogItem, all: ServerBlogItem[], limit = 4) {
  const scored = all
    .filter((item) => item.id !== current.id)
    .map((item) => ({ item, score: scoreRelated(current, item) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.item.timestamp - a.item.timestamp);

  if (scored.length >= limit) {
    return scored.slice(0, limit).map(({ item }) => item);
  }

  const currentTag = resolveBlogTag(current.title, current.slug || current.id);
  const picked = new Map<string, ServerBlogItem>();
  for (const { item } of scored) picked.set(item.id, item);

  for (const item of all) {
    if (item.id === current.id || picked.has(item.id)) continue;
    if (resolveBlogTag(item.title, item.slug || item.id) === currentTag) {
      picked.set(item.id, item);
    }
    if (picked.size >= limit) break;
  }

  for (const item of all) {
    if (item.id === current.id || picked.has(item.id)) continue;
    picked.set(item.id, item);
    if (picked.size >= limit) break;
  }

  return Array.from(picked.values()).slice(0, limit);
}

export function matchesBlogSearch(item: BlogListItem, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    item.title,
    item.description,
    item.metaDescription,
    item.keywordsMain,
    item.keywordsSecondary,
    item.slug,
    resolveBlogTag(item.title, item.slug || ""),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return q.split(/\s+/).every((word) => haystack.includes(word));
}

export type BlogListItem = Pick<
  ServerBlogItem,
  | "id"
  | "title"
  | "description"
  | "metaDescription"
  | "keywordsMain"
  | "keywordsSecondary"
  | "imageUrl"
  | "slug"
  | "hot"
  | "publishedAt"
  | "timestamp"
>;

export type BlogCardItem = Pick<
  BlogListItem,
  "id" | "title" | "description" | "imageUrl" | "slug" | "hot" | "publishedAt" | "timestamp"
>;

export function toBlogCardItem(item: ServerBlogItem | BlogListItem): BlogCardItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl,
    slug: item.slug,
    hot: item.hot,
    publishedAt: item.publishedAt,
    timestamp: item.timestamp,
  };
}

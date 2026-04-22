import {
  ContentBrief,
  GenerateArticleResponse,
  InternalLinkSuggestion,
  InterlinkOpportunity,
  DecayCheck,
  KeywordRanking,
  PostDetail,
  PostListItem,
  PostPayload,
  RankTrackingResponse,
  RelatedPost,
  RefreshSuggestion,
  SourceStatusResponse,
  SerpAnalysis,
  TopicalCluster,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getPosts() {
  return request<PostListItem[]>("/posts");
}

export function getPost(id: string) {
  return request<PostDetail>(`/posts/${id}`);
}

export function generateArticle(title: string, postId?: string) {
  return request<GenerateArticleResponse>("/ai/generate", {
    method: "POST",
    body: JSON.stringify({ title, postId }),
  });
}

export function createPost(payload: PostPayload) {
  return request<PostDetail>("/posts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updatePost(id: string, payload: Partial<PostPayload>) {
  return request<PostDetail>(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function createContentBrief(title: string, postId?: string) {
  return request<ContentBrief>("/seo/content-brief", {
    method: "POST",
    body: JSON.stringify({ title, postId }),
  });
}

export function getRelatedPosts(postId: string, limit = 5) {
  return request<RelatedPost[]>(`/seo/related-posts?postId=${encodeURIComponent(postId)}&limit=${limit}`);
}

export function getInternalLinks(postId: string, limit = 5) {
  return request<InternalLinkSuggestion[]>(
    `/seo/internal-links?postId=${encodeURIComponent(postId)}&limit=${limit}`,
  );
}

export function getInterlinkOpportunities(postId: string, limit = 5) {
  return request<InterlinkOpportunity[]>(
    `/seo/interlink-opportunities?postId=${encodeURIComponent(postId)}&limit=${limit}`,
  );
}

export function createCluster(topic: string) {
  return request<TopicalCluster>("/seo/cluster", {
    method: "POST",
    body: JSON.stringify({ topic }),
  });
}

export function analyzeSerp(title: string, location?: string) {
  return request<SerpAnalysis>("/seo/serp-analyze", {
    method: "POST",
    body: JSON.stringify({ title, location }),
  });
}

export function analyzeSerpForPost(title: string, postId?: string, location?: string) {
  return request<SerpAnalysis>("/seo/serp-analyze", {
    method: "POST",
    body: JSON.stringify({ title, postId, location }),
  });
}

export function getRankTracking(postId: string) {
  return request<RankTrackingResponse>(`/seo/rank-tracking?postId=${encodeURIComponent(postId)}`);
}

export function trackKeyword(postId: string, keyword: string, location?: string) {
  return request<KeywordRanking & { source: string; decay: DecayCheck | null }>("/seo/rank-track", {
    method: "POST",
    body: JSON.stringify({ postId, keyword, location }),
  });
}

export function getDecayCheck(postId: string) {
  return request<DecayCheck>(`/seo/decay-check?postId=${encodeURIComponent(postId)}`);
}

export function refreshPost(postId: string) {
  return request<RefreshSuggestion>("/seo/refresh", {
    method: "POST",
    body: JSON.stringify({ postId }),
  });
}

export function getLatestSerpAnalysis(postId: string) {
  return request<SerpAnalysis | null>(`/seo/serp-analysis?postId=${encodeURIComponent(postId)}`);
}

export function getSourceStatus() {
  return request<SourceStatusResponse>("/seo/source-status");
}

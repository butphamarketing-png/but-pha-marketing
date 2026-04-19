export type PostStatus = "draft" | "published";

export type GenerationType = "initial" | "regenerate" | "refresh";

export type PostListItem = {
  id: string;
  title: string;
  slug: string;
  status: PostStatus;
  needsUpdate: boolean;
  currentVersion: number;
  createdAt: string;
  updatedAt: string;
};

export type GenerationRecord = {
  id: string;
  type: GenerationType;
  version: number;
  inputTitle: string;
  optimizedTitle: string;
  slug: string;
  metaDescription: string;
  keywords: string[];
  createdAt: string;
};

export type PostDetail = {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  keywords: string[];
  status: PostStatus;
  needsUpdate: boolean;
  currentVersion: number;
  createdAt: string;
  updatedAt: string;
  generations: GenerationRecord[];
};

export type GenerateArticleResponse = {
  generationId: string;
  version: number;
  type: GenerationType;
  title: string;
  slug: string;
  metaDescription: string;
  keywords: string[];
  content: string;
  outline: Array<{ heading: string; summary: string }>;
};

export type PostPayload = {
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  keywords: string[];
  status: PostStatus;
  generationId?: string;
};

export type ContentBrief = {
  id: string;
  inputTitle: string;
  keyword: string;
  searchIntent: string;
  targetAudience: string;
  outlineSuggestion: string[];
  contentGaps: string[];
  createdAt: string;
};

export type RelatedPost = {
  postId: string;
  title: string;
  slug: string;
  score: number;
};

export type InternalLinkSuggestion = RelatedPost & {
  anchorTextSuggestion: string;
  reason: string;
};

export type InterlinkOpportunity = {
  sourcePostId: string;
  sourceTitle: string;
  slug: string;
  anchor: string;
  placementSuggestion: string;
  reason: string;
};

export type TopicalCluster = {
  id: string;
  inputTopic: string;
  pillarTopic: string;
  clusterTopics: string[];
  createdAt: string;
};

export type SerpAnalysis = {
  id?: string;
  query: string;
  location: string;
  topResults: Array<{
    position: number;
    title: string;
    link: string;
    snippet: string;
  }>;
  headings: string[];
  avgLength: number;
  contentGap: string[];
};

export type KeywordRanking = {
  id: string;
  keyword: string;
  position: number;
  location: string | null;
  checkedAt: string;
};

export type RankTrackingResponse = {
  postId: string;
  slug: string;
  needsUpdate: boolean;
  latest: KeywordRanking[];
  history: KeywordRanking[];
};

export type DecayCheck = {
  postId: string;
  keyword?: string;
  needsUpdate: boolean;
  currentPosition: number | null;
  previousPosition: number | null;
  dropAmount: number;
  recommendation: string;
};

export type RefreshSuggestion = {
  generationId: string;
  version: number;
  newContent: string;
  improvements: string[];
};

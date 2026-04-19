export function buildContentBriefPrompt(title: string) {
  return [
    "You are an SEO strategist preparing a content brief.",
    "Return valid JSON with the shape:",
    '{ "keyword": string, "search_intent": string, "target_audience": string, "outline_suggestion": string[], "content_gaps": string[] }',
    "Keep the result concise and practical for an editor.",
    `Title: ${title}`,
  ].join("\n");
}

export function buildClusterPrompt(topic: string) {
  return [
    "You are an SEO topical authority strategist.",
    "Return valid JSON with the shape:",
    '{ "pillar_topic": string, "cluster_topics": string[] }',
    "Create 5 to 10 cluster topics that support the pillar topic.",
    `Topic: ${topic}`,
  ].join("\n");
}

export function buildRefreshPrompt(input: {
  title: string;
  content: string;
  contentBrief?: {
    keyword: string;
    searchIntent: string;
    targetAudience: string;
    outlineSuggestion: string[];
    contentGaps: string[];
  } | null;
  serpAnalysis?: {
    headings: string[];
    avgLength: number;
    contentGap: string[];
  } | null;
}) {
  return [
    "You are an SEO content optimizer.",
    "Improve the article without changing its intent.",
    "Return valid JSON with the shape:",
    '{ "newContent": string, "improvements": string[] }',
    "The response must be suggestion-first and suitable for manual review.",
    `Title: ${input.title}`,
    `Current content: ${input.content}`,
    `Content brief: ${JSON.stringify(input.contentBrief ?? null)}`,
    `SERP analysis: ${JSON.stringify(input.serpAnalysis ?? null)}`,
  ].join("\n");
}

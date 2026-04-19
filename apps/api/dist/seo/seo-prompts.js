"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildContentBriefPrompt = buildContentBriefPrompt;
exports.buildClusterPrompt = buildClusterPrompt;
exports.buildRefreshPrompt = buildRefreshPrompt;
function buildContentBriefPrompt(title) {
    return [
        "You are an SEO strategist preparing a content brief.",
        "Return valid JSON with the shape:",
        '{ "keyword": string, "search_intent": string, "target_audience": string, "outline_suggestion": string[], "content_gaps": string[] }',
        "Keep the result concise and practical for an editor.",
        `Title: ${title}`,
    ].join("\n");
}
function buildClusterPrompt(topic) {
    return [
        "You are an SEO topical authority strategist.",
        "Return valid JSON with the shape:",
        '{ "pillar_topic": string, "cluster_topics": string[] }',
        "Create 5 to 10 cluster topics that support the pillar topic.",
        `Topic: ${topic}`,
    ].join("\n");
}
function buildRefreshPrompt(input) {
    var _a, _b;
    return [
        "You are an SEO content optimizer.",
        "Improve the article without changing its intent.",
        "Return valid JSON with the shape:",
        '{ "newContent": string, "improvements": string[] }',
        "The response must be suggestion-first and suitable for manual review.",
        `Title: ${input.title}`,
        `Current content: ${input.content}`,
        `Content brief: ${JSON.stringify((_a = input.contentBrief) !== null && _a !== void 0 ? _a : null)}`,
        `SERP analysis: ${JSON.stringify((_b = input.serpAnalysis) !== null && _b !== void 0 ? _b : null)}`,
    ].join("\n");
}

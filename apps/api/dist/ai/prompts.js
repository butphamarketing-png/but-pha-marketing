"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOutlinePrompt = buildOutlinePrompt;
exports.buildContentPrompt = buildContentPrompt;
exports.buildSeoPrompt = buildSeoPrompt;
function buildOutlinePrompt(title) {
    return [
        "You are an SEO strategist.",
        "Create an article outline for the given title.",
        "Return valid JSON with the shape:",
        '{ "optimizedTitle": string, "sections": [{ "heading": string, "summary": string }] }',
        `Title: ${title}`,
    ].join("\n");
}
function buildContentPrompt(title, outline) {
    return [
        "You are an SEO content writer.",
        "Write a complete markdown article between 1000 and 1500 words.",
        "Use the supplied outline and keep the article practical, readable, and production-ready.",
        `Title: ${title}`,
        `Outline: ${JSON.stringify(outline)}`,
    ].join("\n");
}
function buildSeoPrompt(title, content) {
    return [
        "You are an SEO editor.",
        "Analyze the article and return valid JSON with the shape:",
        '{ "title": string, "slug": string, "metaDescription": string, "keywords": string[] }',
        "Keep the meta description under 160 characters.",
        `Title: ${title}`,
        `Content: ${content}`,
    ].join("\n");
}

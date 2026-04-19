"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoOpenAIService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = __importDefault(require("openai"));
const seo_prompts_1 = require("./seo-prompts");
let SeoOpenAIService = class SeoOpenAIService {
    constructor() {
        this.client = process.env.OPENAI_API_KEY
            ? new openai_1.default({ apiKey: process.env.OPENAI_API_KEY })
            : null;
    }
    async createContentBrief(title) {
        var _a, _b;
        if (this.useMockMode()) {
            return {
                keyword: title.toLowerCase(),
                search_intent: "Informational with commercial investigation",
                target_audience: "Marketing teams and business owners evaluating practical SEO execution",
                outline_suggestion: [
                    "Define the problem and the target search intent",
                    "Explain the core strategy and required inputs",
                    "Show implementation steps and examples",
                    "Compare common alternatives or mistakes",
                    "Close with an execution checklist",
                ],
                content_gaps: [
                    "Concrete examples from real workflows",
                    "Decision criteria for selecting the right approach",
                    "Internal linking opportunities across related topics",
                ],
            };
        }
        const response = await this.client.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: (0, seo_prompts_1.buildContentBriefPrompt)(title) }],
        });
        return JSON.parse(((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "{}");
    }
    async createCluster(topic) {
        var _a, _b;
        if (this.useMockMode()) {
            return {
                pillar_topic: topic,
                cluster_topics: [
                    `${topic} strategy`,
                    `${topic} tools`,
                    `${topic} checklist`,
                    `${topic} mistakes`,
                    `${topic} examples`,
                    `${topic} KPIs`,
                ],
            };
        }
        const response = await this.client.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: (0, seo_prompts_1.buildClusterPrompt)(topic) }],
        });
        return JSON.parse(((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "{}");
    }
    async createEmbedding(input) {
        var _a, _b;
        if (this.useMockMode()) {
            return this.createMockEmbedding(input);
        }
        const response = await this.client.embeddings.create({
            model: process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small",
            input,
        });
        return (_b = (_a = response.data[0]) === null || _a === void 0 ? void 0 : _a.embedding) !== null && _b !== void 0 ? _b : [];
    }
    async createRefreshSuggestion(input) {
        var _a, _b;
        if (this.useMockMode()) {
            return {
                newContent: [
                    input.content,
                    "",
                    "## Newly Added Insights",
                    "This refresh draft adds missing context pulled from the content brief and SERP analysis. It is still a suggestion draft and must be reviewed before saving.",
                    "",
                    "## Expanded FAQ",
                    "This additional section gives the article stronger long-tail coverage and addresses questions that were previously under-explained.",
                ].join("\n"),
                improvements: [
                    "added missing H2 section for uncovered search intent",
                    "expanded underdeveloped section with more execution detail",
                    "improved keyword coverage and structural completeness",
                ],
            };
        }
        const response = await this.client.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: (0, seo_prompts_1.buildRefreshPrompt)(input) }],
        });
        return JSON.parse(((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "{}");
    }
    useMockMode() {
        return process.env.AI_MOCK_MODE === "true" || !this.client;
    }
    createMockEmbedding(input) {
        const size = 128;
        const vector = new Array(size).fill(0);
        const normalized = input.toLowerCase();
        for (let index = 0; index < normalized.length; index += 1) {
            const code = normalized.charCodeAt(index);
            vector[index % size] += ((code % 31) + 1) / 32;
        }
        const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
        return vector.map((value) => Number((value / magnitude).toFixed(6)));
    }
};
exports.SeoOpenAIService = SeoOpenAIService;
exports.SeoOpenAIService = SeoOpenAIService = __decorate([
    (0, common_1.Injectable)()
], SeoOpenAIService);

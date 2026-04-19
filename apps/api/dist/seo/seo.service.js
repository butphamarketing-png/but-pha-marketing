"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SeoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
const workspace_service_1 = require("../common/workspace/workspace.service");
const seo_openai_service_1 = require("./seo-openai.service");
let SeoService = SeoService_1 = class SeoService {
    constructor(prisma, workspaceService, seoOpenAIService) {
        this.prisma = prisma;
        this.workspaceService = workspaceService;
        this.seoOpenAIService = seoOpenAIService;
        this.logger = new common_1.Logger(SeoService_1.name);
    }
    async createContentBrief(dto) {
        const { userId, projectId } = await this.workspaceService.getContext();
        const brief = await this.seoOpenAIService.createContentBrief(dto.title);
        return this.prisma.contentBrief.create({
            data: {
                userId,
                projectId,
                postId: dto.postId,
                inputTitle: dto.title,
                keyword: brief.keyword,
                searchIntent: brief.search_intent,
                targetAudience: brief.target_audience,
                outlineSuggestion: brief.outline_suggestion,
                contentGaps: brief.content_gaps,
            },
        });
    }
    async upsertPostEmbedding(post) {
        const sourceText = [post.title, post.metaDescription, post.keywords.join(" "), post.content].join("\n\n");
        const vector = await this.seoOpenAIService.createEmbedding(sourceText);
        return this.prisma.postEmbedding.upsert({
            where: { postId: post.id },
            update: {
                sourceText,
                vector,
                dimensions: vector.length,
            },
            create: {
                userId: post.userId,
                projectId: post.projectId,
                postId: post.id,
                sourceText,
                vector,
                dimensions: vector.length,
            },
        });
    }
    async getRelatedPosts(postId, limit = 5) {
        const target = await this.getEmbeddingTarget(postId);
        const related = await this.loadProjectEmbeddings(target.projectId, target.postId);
        return related
            .map((candidate) => ({
            postId: candidate.postId,
            title: candidate.title,
            slug: candidate.slug,
            score: this.cosineSimilarity(target.vector, candidate.vector),
        }))
            .sort((left, right) => right.score - left.score)
            .slice(0, limit);
    }
    async getInternalLinks(postId, limit = 5) {
        const targetPost = await this.requirePost(postId);
        const related = await this.getRelatedPosts(postId, limit);
        return related.map((item) => {
            const anchor = this.buildAnchorSuggestion(targetPost, item.title);
            return {
                postId: item.postId,
                title: item.title,
                slug: item.slug,
                anchorTextSuggestion: anchor,
                reason: `This post is semantically close to "${targetPost.title}" and can support an internal link around ${anchor.toLowerCase()}.`,
                score: item.score,
            };
        });
    }
    async getInterlinkOpportunities(postId, limit = 5) {
        const newPost = await this.requirePost(postId);
        const related = await this.getInternalLinks(postId, limit);
        return related.map((item, index) => {
            var _a;
            return ({
                sourcePostId: item.postId,
                sourceTitle: item.title,
                slug: item.slug,
                anchor: this.buildAnchorSuggestion(newPost, newPost.title),
                placementSuggestion: index % 2 === 0
                    ? `Add the link in a section where ${(_a = newPost.keywords[0]) !== null && _a !== void 0 ? _a : "the topic"} is introduced or compared.`
                    : `Place the link near the conclusion as a next-step resource about ${newPost.title.toLowerCase()}.`,
                reason: `The older post covers adjacent intent and should point readers toward the newer article on "${newPost.title}".`,
            });
        });
    }
    async createCluster(dto) {
        const { userId, projectId } = await this.workspaceService.getContext();
        const cluster = await this.seoOpenAIService.createCluster(dto.topic);
        return this.prisma.topicalCluster.create({
            data: {
                userId,
                projectId,
                inputTopic: dto.topic,
                pillarTopic: cluster.pillar_topic,
                clusterTopics: cluster.cluster_topics,
            },
        });
    }
    async analyzeSerp(dto) {
        const { userId, projectId } = await this.workspaceService.getContext();
        const serpApiKey = process.env.SERP_API_KEY;
        const location = dto.location || process.env.SERPAPI_LOCATION || "United States";
        const analysis = !serpApiKey || process.env.AI_MOCK_MODE === "true"
            ? this.createMockSerpAnalysis(dto.title, location)
            : await this.fetchSerpAnalysis(dto.title, location);
        await this.prisma.serpAnalysis.create({
            data: {
                userId,
                projectId,
                postId: dto.postId,
                query: analysis.query,
                location: analysis.location,
                topResults: analysis.topResults,
                headings: analysis.headings,
                avgLength: analysis.avgLength,
                contentGap: analysis.contentGap,
            },
        });
        return analysis;
    }
    async refreshContent(dto) {
        const { userId, projectId } = await this.workspaceService.getContext();
        const post = await this.requirePost(dto.postId);
        const latestBrief = await this.prisma.contentBrief.findFirst({
            where: { postId: post.id },
            orderBy: { createdAt: "desc" },
        });
        const latestSerp = await this.prisma.serpAnalysis.findFirst({
            where: { postId: post.id },
            orderBy: { createdAt: "desc" },
        });
        const refresh = await this.seoOpenAIService.createRefreshSuggestion({
            title: post.title,
            content: post.content,
            contentBrief: latestBrief
                ? {
                    keyword: latestBrief.keyword,
                    searchIntent: latestBrief.searchIntent,
                    targetAudience: latestBrief.targetAudience,
                    outlineSuggestion: this.asStringArray(latestBrief.outlineSuggestion),
                    contentGaps: this.asStringArray(latestBrief.contentGaps),
                }
                : null,
            serpAnalysis: latestSerp
                ? {
                    headings: this.asStringArray(latestSerp.headings),
                    avgLength: latestSerp.avgLength,
                    contentGap: this.asStringArray(latestSerp.contentGap),
                }
                : null,
        });
        this.logger.log(`Created refresh draft suggestion for post ${post.id}`);
        const generation = await this.prisma.aIGeneration.create({
            data: {
                userId,
                projectId,
                postId: post.id,
                type: "refresh",
                version: post.currentVersion + 1,
                inputTitle: post.title,
                optimizedTitle: post.title,
                slug: post.slug,
                metaDescription: post.metaDescription,
                keywords: post.keywords,
                outline: {
                    improvements: refresh.improvements,
                },
                content: refresh.newContent,
                model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
                promptVersion: "phase3-refresh-v1",
            },
        });
        return {
            generationId: generation.id,
            version: generation.version,
            newContent: refresh.newContent,
            improvements: refresh.improvements,
        };
    }
    async getLatestSerpAnalysis(postId) {
        await this.requirePost(postId);
        return this.prisma.serpAnalysis.findFirst({
            where: { postId },
            orderBy: { createdAt: "desc" },
        });
    }
    async fetchSerpAnalysis(title, location) {
        var _a;
        const searchParams = new URLSearchParams({
            engine: "google",
            q: title,
            api_key: process.env.SERP_API_KEY,
            location,
            num: "10",
        });
        const response = await fetch(`https://serpapi.com/search.json?${searchParams.toString()}`);
        if (!response.ok) {
            throw new Error(`SerpAPI request failed with status ${response.status}`);
        }
        const data = (await response.json());
        const results = ((_a = data.organic_results) !== null && _a !== void 0 ? _a : []).slice(0, 10);
        const pageInsights = await Promise.all(results.map((result) => this.fetchPageInsight(result.link)));
        const validInsights = pageInsights.filter((item) => item !== null);
        const headings = validInsights.flatMap((item) => item.headings).slice(0, 30);
        const avgLength = validInsights.length
            ? Math.round(validInsights.reduce((sum, item) => sum + item.wordCount, 0) / validInsights.length)
            : 0;
        return {
            query: title,
            location,
            topResults: results.map((result, index) => {
                var _a, _b, _c, _d;
                return ({
                    position: (_a = result.position) !== null && _a !== void 0 ? _a : index + 1,
                    title: (_b = result.title) !== null && _b !== void 0 ? _b : "Untitled",
                    link: (_c = result.link) !== null && _c !== void 0 ? _c : "",
                    snippet: (_d = result.snippet) !== null && _d !== void 0 ? _d : "",
                });
            }),
            headings,
            avgLength,
            contentGap: this.buildContentGap(title, headings),
        };
    }
    async requirePost(postId) {
        const { projectId } = await this.workspaceService.getContext();
        const post = await this.prisma.post.findFirst({
            where: { id: postId, projectId },
        });
        if (!post) {
            throw new common_1.NotFoundException("Post not found");
        }
        return post;
    }
    async getEmbeddingTarget(postId) {
        const post = await this.requirePost(postId);
        const embedding = await this.prisma.postEmbedding.findUnique({
            where: { postId: post.id },
        });
        if (!embedding) {
            await this.upsertPostEmbedding(post);
        }
        const currentEmbedding = await this.prisma.postEmbedding.findUniqueOrThrow({
            where: { postId: post.id },
        });
        return {
            postId: post.id,
            projectId: post.projectId,
            vector: this.asVector(currentEmbedding.vector),
        };
    }
    async loadProjectEmbeddings(projectId, excludePostId) {
        const rows = await this.prisma.postEmbedding.findMany({
            where: {
                projectId,
                postId: { not: excludePostId },
            },
            include: {
                post: true,
            },
        });
        return rows.map((row) => ({
            postId: row.postId,
            title: row.post.title,
            slug: row.post.slug,
            content: row.post.content,
            keywords: row.post.keywords,
            vector: this.asVector(row.vector),
            createdAt: row.post.createdAt,
        }));
    }
    asVector(value) {
        if (!Array.isArray(value)) {
            return [];
        }
        return value.map((item) => Number(item)).filter((item) => Number.isFinite(item));
    }
    asStringArray(value) {
        if (!Array.isArray(value)) {
            return [];
        }
        return value.map((item) => String(item)).filter(Boolean);
    }
    cosineSimilarity(left, right) {
        const size = Math.min(left.length, right.length);
        if (size === 0) {
            return 0;
        }
        let dot = 0;
        let leftMagnitude = 0;
        let rightMagnitude = 0;
        for (let index = 0; index < size; index += 1) {
            dot += left[index] * right[index];
            leftMagnitude += left[index] * left[index];
            rightMagnitude += right[index] * right[index];
        }
        if (leftMagnitude === 0 || rightMagnitude === 0) {
            return 0;
        }
        return Number((dot / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude))).toFixed(4));
    }
    buildAnchorSuggestion(post, fallbackTitle) {
        const keyword = post.keywords[0];
        if (keyword) {
            return keyword
                .split(" ")
                .slice(0, 5)
                .join(" ");
        }
        return fallbackTitle
            .split(" ")
            .slice(0, 6)
            .join(" ");
    }
    async fetchPageInsight(url) {
        if (!url) {
            return null;
        }
        try {
            const response = await fetch(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 SEOStudioBot/1.0",
                },
            });
            if (!response.ok) {
                return null;
            }
            const html = await response.text();
            const headings = Array.from(html.matchAll(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/gi))
                .map((match) => { var _a; return this.stripHtml((_a = match[1]) !== null && _a !== void 0 ? _a : "").trim(); })
                .filter(Boolean)
                .slice(0, 8);
            const text = this.stripHtml(html).replace(/\s+/g, " ").trim();
            return {
                headings,
                wordCount: text ? text.split(" ").length : 0,
            };
        }
        catch (_a) {
            return null;
        }
    }
    buildContentGap(title, headings) {
        if (headings.length === 0) {
            return [
                `SERP data is available, but competitor headings could not be extracted for "${title}".`,
                "Add deeper examples, process detail, and an FAQ section to differentiate the article.",
            ];
        }
        return [
            `Cover missing subtopics around "${title}" that are not consistently addressed in current competitor headings.`,
            "Add clearer step-by-step implementation detail and comparison criteria.",
            "Include stronger internal linking paths to adjacent supporting articles.",
        ];
    }
    createMockSerpAnalysis(title, location) {
        return {
            query: title,
            location,
            topResults: Array.from({ length: 10 }, (_, index) => ({
                position: index + 1,
                title: `${title} result ${index + 1}`,
                link: `https://example.com/${index + 1}`,
                snippet: `Mock SERP result ${index + 1} for ${title}.`,
            })),
            headings: [
                "What is the topic and why it matters",
                "Key strategies and implementation steps",
                "Common mistakes and optimization tips",
            ],
            avgLength: 1420,
            contentGap: [
                "Most competitor pages under-explain execution details.",
                "There is room for clearer examples and stronger internal linking suggestions.",
            ],
        };
    }
    stripHtml(value) {
        return value
            .replace(/<script[\s\S]*?<\/script>/gi, " ")
            .replace(/<style[\s\S]*?<\/style>/gi, " ")
            .replace(/<[^>]+>/g, " ")
            .replace(/&nbsp;/gi, " ")
            .replace(/&amp;/gi, "&");
    }
};
exports.SeoService = SeoService;
exports.SeoService = SeoService = SeoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        workspace_service_1.CurrentWorkspaceService,
        seo_openai_service_1.SeoOpenAIService])
], SeoService);

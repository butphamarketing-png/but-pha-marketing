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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const client_1 = require("@prisma/client");
const common_1 = require("@nestjs/common");
const openai_1 = __importDefault(require("openai"));
const slugify_1 = __importDefault(require("slugify"));
const prisma_service_1 = require("../common/prisma/prisma.service");
const workspace_service_1 = require("../common/workspace/workspace.service");
const prompts_1 = require("./prompts");
let AIService = class AIService {
    async generate(dto) {
        const { userId, projectId } = await this.workspaceService.getContext();
        const existingPost = dto.postId
            ? await this.prisma.post.findFirst({
                where: { id: dto.postId, userId, projectId },
            })
            : null;
        if (dto.postId && !existingPost) {
            throw new common_1.NotFoundException("Post not found for regeneration");
        }
        const outline = await this.generateOutline(dto.title);
        const content = await this.generateContent(outline.optimizedTitle, outline.sections);
        const seo = await this.generateSeo(outline.optimizedTitle, content);
        const nextVersion = existingPost ? existingPost.currentVersion + 1 : 1;
        const generationType = existingPost ? client_1.GenerationType.regenerate : client_1.GenerationType.initial;
        const generation = await this.prisma.aIGeneration.create({
            data: {
                userId,
                projectId,
                postId: existingPost === null || existingPost === void 0 ? void 0 : existingPost.id,
                type: generationType,
                version: nextVersion,
                inputTitle: dto.title,
                optimizedTitle: seo.title,
                slug: this.ensureSlug(seo.slug || seo.title),
                metaDescription: seo.metaDescription,
                keywords: seo.keywords,
                outline: outline.sections,
                content,
                model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
            },
        });
        return {
            generationId: generation.id,
            version: generation.version,
            type: generation.type,
            title: seo.title,
            slug: generation.slug,
            metaDescription: seo.metaDescription,
            keywords: seo.keywords,
            content,
            outline: outline.sections,
        };
    }
    constructor(prisma, workspaceService) {
        this.prisma = prisma;
        this.workspaceService = workspaceService;
        this.client = process.env.OPENAI_API_KEY
            ? new openai_1.default({ apiKey: process.env.OPENAI_API_KEY })
            : null;
    }
    async generateOutline(title) {
        var _a, _b;
        if (this.useMockMode()) {
            return {
                optimizedTitle: `${title} for Sustainable Organic Growth`,
                sections: [
                    { heading: "Why this topic matters", summary: "Explain the business context and search intent." },
                    { heading: "Core strategy", summary: "Break down the main approach with actionable steps." },
                    { heading: "Execution checklist", summary: "Turn the strategy into a practical workflow." },
                    { heading: "Common mistakes", summary: "Highlight pitfalls and how to avoid them." },
                    { heading: "Conclusion", summary: "Summarize the main points with a direct next step." },
                ],
            };
        }
        const response = await this.client.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "user",
                    content: (0, prompts_1.buildOutlinePrompt)(title),
                },
            ],
        });
        return JSON.parse(((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "{}");
    }
    async generateContent(title, sections) {
        var _a, _b, _c;
        if (this.useMockMode()) {
            return [
                `# ${title}`,
                "",
                "This mock article is intentionally long enough to validate the full Phase 1 workflow without a live API key. It mirrors the structure that the real OpenAI pipeline will produce: an optimized headline, an organized outline, detailed section copy, and SEO metadata ready for review in the editor.",
                "",
                ...sections.flatMap((section, index) => [
                    `## ${section.heading}`,
                    `${section.summary} In production, this section would be written from the outline stage so the content keeps a consistent argument from introduction to conclusion. For the MVP, the generated draft needs to feel publishable enough that a user can immediately edit, save, and regenerate it without changing tools.`,
                    "",
                    `Section ${index + 1} should also expand the search intent behind the title. That means explaining what the reader is trying to solve, which questions they are likely asking, and what practical decisions they need to make after reading. The article should avoid filler, but it still needs sufficient depth to cross the 1000-word threshold that makes the editor, database, and versioning flow meaningful during testing.`,
                    "",
                    "A strong SEO article also balances readability with structure. Each paragraph should move the reader forward, maintain a clear topic sentence, and add examples or criteria that make the advice more concrete. This is where the modular prompt design matters: the outline creates direction, the content stage expands it into a complete draft, and the SEO stage sharpens the metadata around what was actually written rather than guessing from the title alone.",
                    "",
                    "From a product perspective, this MVP article text is useful because it exercises the exact paths the live system needs. The frontend must autofill fields, the backend must persist long-form content reliably, and regeneration must create a new version that can be attached to an existing post. That means even mock content should behave like a realistic payload: multi-section, well-formed, and large enough to surface any formatting or persistence issues early.",
                    "",
                ]),
                "## Conclusion",
                "The Phase 1 MVP focuses on a disciplined slice of the final platform: title in, SEO article out, editor in the middle, persistence behind it, and version history for regeneration. Once this baseline is stable, later phases can add richer prompting, SERP enrichment, queues, collaboration, and publishing integrations without rewriting the foundations delivered here.",
            ].join("\n");
        }
        const response = await this.client.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
            messages: [
                {
                    role: "user",
                    content: (0, prompts_1.buildContentPrompt)(title, sections),
                },
            ],
        });
        return ((_c = (_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.trim()) || "";
    }
    async generateSeo(title, content) {
        var _a, _b;
        if (this.useMockMode()) {
            return {
                title,
                slug: this.ensureSlug(title),
                metaDescription: `Learn ${title.toLowerCase()} with a practical SEO-ready guide you can publish and iterate on.`,
                keywords: title
                    .toLowerCase()
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 6),
            };
        }
        const response = await this.client.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "user",
                    content: (0, prompts_1.buildSeoPrompt)(title, content),
                },
            ],
        });
        return JSON.parse(((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "{}");
    }
    useMockMode() {
        return process.env.AI_MOCK_MODE === "true" || !this.client;
    }
    ensureSlug(value) {
        return (0, slugify_1.default)(value, { lower: true, strict: true, trim: true });
    }
};
exports.AIService = AIService;
exports.AIService = AIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        workspace_service_1.CurrentWorkspaceService])
], AIService);

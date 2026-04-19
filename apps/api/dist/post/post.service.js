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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
const workspace_service_1 = require("../common/workspace/workspace.service");
const seo_service_1 = require("../seo/seo.service");
let PostService = class PostService {
    constructor(prisma, workspaceService, seoService) {
        this.prisma = prisma;
        this.workspaceService = workspaceService;
        this.seoService = seoService;
    }
    async list() {
        const { projectId } = await this.workspaceService.getContext();
        return this.prisma.post.findMany({
            where: { projectId },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                title: true,
                slug: true,
                status: true,
                needsUpdate: true,
                currentVersion: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async detail(id) {
        const { projectId } = await this.workspaceService.getContext();
        const post = await this.prisma.post.findFirst({
            where: { id, projectId },
            include: {
                generations: {
                    orderBy: { version: "desc" },
                    select: {
                        id: true,
                        type: true,
                        version: true,
                        inputTitle: true,
                        optimizedTitle: true,
                        slug: true,
                        metaDescription: true,
                        keywords: true,
                        createdAt: true,
                    },
                },
            },
        });
        if (!post) {
            throw new common_1.NotFoundException("Post not found");
        }
        return post;
    }
    async create(dto) {
        const { userId, projectId } = await this.workspaceService.getContext();
        const generation = dto.generationId
            ? await this.prisma.aIGeneration.findFirst({
                where: {
                    id: dto.generationId,
                    userId,
                    projectId,
                },
            })
            : null;
        const post = await this.prisma.$transaction(async (tx) => {
            var _a, _b;
            const post = await tx.post.create({
                data: {
                    userId,
                    projectId,
                    title: dto.title,
                    slug: dto.slug,
                    content: dto.content,
                    metaDescription: dto.metaDescription,
                    keywords: dto.keywords,
                    status: (_a = dto.status) !== null && _a !== void 0 ? _a : "draft",
                    currentVersion: (_b = generation === null || generation === void 0 ? void 0 : generation.version) !== null && _b !== void 0 ? _b : 1,
                },
            });
            if (generation) {
                await tx.aIGeneration.update({
                    where: { id: generation.id },
                    data: { postId: post.id },
                });
            }
            return post;
        });
        await this.safeUpsertEmbedding(post);
        return post;
    }
    async update(id, dto) {
        const { userId, projectId } = await this.workspaceService.getContext();
        const existing = await this.prisma.post.findFirst({
            where: { id, projectId, userId },
        });
        if (!existing) {
            throw new common_1.NotFoundException("Post not found");
        }
        const generation = dto.generationId
            ? await this.prisma.aIGeneration.findFirst({
                where: {
                    id: dto.generationId,
                    userId,
                    projectId,
                },
            })
            : null;
        const post = await this.prisma.$transaction(async (tx) => {
            var _a, _b, _c, _d, _e, _f, _g;
            const post = await tx.post.update({
                where: { id },
                data: {
                    title: (_a = dto.title) !== null && _a !== void 0 ? _a : existing.title,
                    slug: (_b = dto.slug) !== null && _b !== void 0 ? _b : existing.slug,
                    content: (_c = dto.content) !== null && _c !== void 0 ? _c : existing.content,
                    metaDescription: (_d = dto.metaDescription) !== null && _d !== void 0 ? _d : existing.metaDescription,
                    keywords: (_e = dto.keywords) !== null && _e !== void 0 ? _e : existing.keywords,
                    status: (_f = dto.status) !== null && _f !== void 0 ? _f : existing.status,
                    currentVersion: (_g = generation === null || generation === void 0 ? void 0 : generation.version) !== null && _g !== void 0 ? _g : existing.currentVersion,
                },
            });
            if (generation) {
                await tx.aIGeneration.update({
                    where: { id: generation.id },
                    data: { postId: post.id },
                });
            }
            return post;
        });
        await this.safeUpsertEmbedding(post);
        return post;
    }
    async safeUpsertEmbedding(post) {
        try {
            await this.seoService.upsertPostEmbedding(post);
        }
        catch (error) {
            console.warn("Post embedding generation failed:", error);
        }
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        workspace_service_1.CurrentWorkspaceService,
        seo_service_1.SeoService])
], PostService);

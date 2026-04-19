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
var RankService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
const workspace_service_1 = require("../common/workspace/workspace.service");
const rank_source_service_1 = require("./rank-source.service");
let RankService = RankService_1 = class RankService {
    constructor(prisma, workspaceService, rankSourceService) {
        this.prisma = prisma;
        this.workspaceService = workspaceService;
        this.rankSourceService = rankSourceService;
        this.logger = new common_1.Logger(RankService_1.name);
    }
    async getRankingHistory(postId) {
        const post = await this.requirePost(postId);
        const rankings = await this.prisma.keywordRanking.findMany({
            where: { postId: post.id },
            orderBy: { checkedAt: "desc" },
        });
        const latestByKeyword = rankings.reduce((accumulator, ranking) => {
            if (!accumulator[ranking.keyword]) {
                accumulator[ranking.keyword] = ranking;
            }
            return accumulator;
        }, {});
        return {
            postId: post.id,
            slug: post.slug,
            needsUpdate: post.needsUpdate,
            latest: Object.values(latestByKeyword),
            history: rankings,
        };
    }
    async trackKeyword(dto) {
        const { userId, projectId } = await this.workspaceService.getContext();
        const post = await this.requirePost(dto.postId);
        const lookup = await this.rankSourceService.getCurrentRanking({
            keyword: dto.keyword,
            location: dto.location,
            slug: post.slug,
        });
        this.logger.log(`Tracking keyword "${dto.keyword}" for post ${post.id} using ${lookup.source}`);
        const record = await this.prisma.keywordRanking.create({
            data: {
                userId,
                projectId,
                postId: post.id,
                keyword: dto.keyword,
                position: lookup.position,
                location: dto.location,
            },
        });
        const decay = await this.evaluateDecay(post.id, dto.keyword);
        return Object.assign(Object.assign({}, record), { source: lookup.source, decay });
    }
    async checkDecay(postId) {
        const post = await this.requirePost(postId);
        const keywords = await this.prisma.keywordRanking.findMany({
            where: { postId: post.id },
            orderBy: [{ keyword: "asc" }, { checkedAt: "desc" }],
        });
        if (keywords.length === 0) {
            return {
                postId: post.id,
                needsUpdate: post.needsUpdate,
                currentPosition: null,
                previousPosition: null,
                dropAmount: 0,
                recommendation: "No ranking history yet. Track a keyword first.",
            };
        }
        const keywordGroups = keywords.reduce((accumulator, ranking) => {
            if (!accumulator[ranking.keyword]) {
                accumulator[ranking.keyword] = [];
            }
            accumulator[ranking.keyword].push(ranking);
            return accumulator;
        }, {});
        const evaluations = Object.entries(keywordGroups)
            .map(([keyword, rankings]) => {
            var _a, _b;
            const [current, previous] = rankings;
            const currentPosition = (_a = current === null || current === void 0 ? void 0 : current.position) !== null && _a !== void 0 ? _a : null;
            const previousPosition = (_b = previous === null || previous === void 0 ? void 0 : previous.position) !== null && _b !== void 0 ? _b : null;
            const dropAmount = currentPosition !== null && previousPosition !== null ? currentPosition - previousPosition : 0;
            const isDecay = currentPosition !== null && (dropAmount > 5 || currentPosition > 10);
            return {
                keyword,
                currentPosition,
                previousPosition,
                dropAmount,
                isDecay,
            };
        })
            .sort((left, right) => right.dropAmount - left.dropAmount);
        const worst = evaluations[0];
        const needsUpdate = evaluations.some((item) => item.isDecay);
        await this.prisma.post.update({
            where: { id: post.id },
            data: { needsUpdate },
        });
        return {
            postId: post.id,
            keyword: worst.keyword,
            needsUpdate,
            currentPosition: worst.currentPosition,
            previousPosition: worst.previousPosition,
            dropAmount: worst.dropAmount,
            recommendation: this.buildDecayRecommendation(worst.currentPosition, worst.previousPosition, worst.dropAmount),
        };
    }
    async runScheduledChecks() {
        var _a;
        const posts = await this.prisma.post.findMany({
            where: { status: "published" },
            include: {
                rankings: {
                    orderBy: { checkedAt: "desc" },
                },
            },
        });
        for (const post of posts) {
            const seenKeywords = new Set();
            for (const ranking of post.rankings) {
                if (seenKeywords.has(ranking.keyword)) {
                    continue;
                }
                seenKeywords.add(ranking.keyword);
                try {
                    await this.trackKeyword({
                        postId: post.id,
                        keyword: ranking.keyword,
                        location: (_a = ranking.location) !== null && _a !== void 0 ? _a : undefined,
                    });
                }
                catch (error) {
                    this.logger.warn(`Scheduled ranking check failed for post ${post.id}: ${String(error)}`);
                }
            }
        }
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
    async evaluateDecay(postId, keyword) {
        var _a;
        const recent = await this.prisma.keywordRanking.findMany({
            where: { postId, keyword },
            orderBy: { checkedAt: "desc" },
            take: 2,
        });
        const [current, previous] = recent;
        if (!current) {
            return null;
        }
        const dropAmount = previous ? current.position - previous.position : 0;
        const needsUpdate = dropAmount > 5 || current.position > 10;
        await this.prisma.post.update({
            where: { id: postId },
            data: { needsUpdate },
        });
        return {
            currentPosition: current.position,
            previousPosition: (_a = previous === null || previous === void 0 ? void 0 : previous.position) !== null && _a !== void 0 ? _a : null,
            dropAmount,
            needsUpdate,
        };
    }
    buildDecayRecommendation(current, previous, dropAmount) {
        if (current === null) {
            return "No ranking data available.";
        }
        if (previous === null) {
            return "Collect another checkpoint before evaluating decay.";
        }
        if (dropAmount > 5 || current > 10) {
            return "This article is losing ranking. Review SERP gaps and prepare an AI-assisted refresh draft.";
        }
        return "Ranking is stable. Keep monitoring before making refresh changes.";
    }
};
exports.RankService = RankService;
exports.RankService = RankService = RankService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        workspace_service_1.CurrentWorkspaceService,
        rank_source_service_1.RankSourceService])
], RankService);

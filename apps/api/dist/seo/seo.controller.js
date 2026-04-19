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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoController = void 0;
const common_1 = require("@nestjs/common");
const cluster_dto_1 = require("./dto/cluster.dto");
const content_brief_dto_1 = require("./dto/content-brief.dto");
const post_query_dto_1 = require("./dto/post-query.dto");
const refresh_dto_1 = require("./dto/refresh.dto");
const serp_analyze_dto_1 = require("./dto/serp-analyze.dto");
const seo_service_1 = require("./seo.service");
let SeoController = class SeoController {
    constructor(seoService) {
        this.seoService = seoService;
    }
    createContentBrief(dto) {
        return this.seoService.createContentBrief(dto);
    }
    getRelatedPosts(query) {
        return this.seoService.getRelatedPosts(query.postId, query.limit);
    }
    getInternalLinks(query) {
        return this.seoService.getInternalLinks(query.postId, query.limit);
    }
    getInterlinkOpportunities(query) {
        return this.seoService.getInterlinkOpportunities(query.postId, query.limit);
    }
    createCluster(dto) {
        return this.seoService.createCluster(dto);
    }
    analyzeSerp(dto) {
        return this.seoService.analyzeSerp(dto);
    }
    refreshContent(dto) {
        return this.seoService.refreshContent(dto);
    }
    getLatestSerpAnalysis(query) {
        return this.seoService.getLatestSerpAnalysis(query.postId);
    }
};
exports.SeoController = SeoController;
__decorate([
    (0, common_1.Post)("content-brief"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [content_brief_dto_1.ContentBriefDto]),
    __metadata("design:returntype", void 0)
], SeoController.prototype, "createContentBrief", null);
__decorate([
    (0, common_1.Get)("related-posts"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_query_dto_1.PostQueryDto]),
    __metadata("design:returntype", void 0)
], SeoController.prototype, "getRelatedPosts", null);
__decorate([
    (0, common_1.Get)("internal-links"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_query_dto_1.PostQueryDto]),
    __metadata("design:returntype", void 0)
], SeoController.prototype, "getInternalLinks", null);
__decorate([
    (0, common_1.Get)("interlink-opportunities"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_query_dto_1.PostQueryDto]),
    __metadata("design:returntype", void 0)
], SeoController.prototype, "getInterlinkOpportunities", null);
__decorate([
    (0, common_1.Post)("cluster"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cluster_dto_1.ClusterDto]),
    __metadata("design:returntype", void 0)
], SeoController.prototype, "createCluster", null);
__decorate([
    (0, common_1.Post)("serp-analyze"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [serp_analyze_dto_1.SerpAnalyzeDto]),
    __metadata("design:returntype", void 0)
], SeoController.prototype, "analyzeSerp", null);
__decorate([
    (0, common_1.Post)("refresh"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_dto_1.RefreshDto]),
    __metadata("design:returntype", void 0)
], SeoController.prototype, "refreshContent", null);
__decorate([
    (0, common_1.Get)("serp-analysis"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_query_dto_1.PostQueryDto]),
    __metadata("design:returntype", void 0)
], SeoController.prototype, "getLatestSerpAnalysis", null);
exports.SeoController = SeoController = __decorate([
    (0, common_1.Controller)("seo"),
    __metadata("design:paramtypes", [seo_service_1.SeoService])
], SeoController);

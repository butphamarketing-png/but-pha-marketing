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
exports.RankController = void 0;
const common_1 = require("@nestjs/common");
const post_rank_query_dto_1 = require("./dto/post-rank-query.dto");
const rank_track_dto_1 = require("./dto/rank-track.dto");
const rank_service_1 = require("./rank.service");
let RankController = class RankController {
    constructor(rankService) {
        this.rankService = rankService;
    }
    getRankingHistory(query) {
        return this.rankService.getRankingHistory(query.postId);
    }
    trackKeyword(dto) {
        return this.rankService.trackKeyword(dto);
    }
    checkDecay(query) {
        return this.rankService.checkDecay(query.postId);
    }
};
exports.RankController = RankController;
__decorate([
    (0, common_1.Get)("rank-tracking"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_rank_query_dto_1.PostRankQueryDto]),
    __metadata("design:returntype", void 0)
], RankController.prototype, "getRankingHistory", null);
__decorate([
    (0, common_1.Post)("rank-track"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rank_track_dto_1.RankTrackDto]),
    __metadata("design:returntype", void 0)
], RankController.prototype, "trackKeyword", null);
__decorate([
    (0, common_1.Get)("decay-check"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_rank_query_dto_1.PostRankQueryDto]),
    __metadata("design:returntype", void 0)
], RankController.prototype, "checkDecay", null);
exports.RankController = RankController = __decorate([
    (0, common_1.Controller)("seo"),
    __metadata("design:paramtypes", [rank_service_1.RankService])
], RankController);

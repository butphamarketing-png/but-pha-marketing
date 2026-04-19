"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RankSourceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankSourceService = void 0;
const common_1 = require("@nestjs/common");
let RankSourceService = RankSourceService_1 = class RankSourceService {
    constructor() {
        this.logger = new common_1.Logger(RankSourceService_1.name);
    }
    async getCurrentRanking(input) {
        if (process.env.GSC_SITE_URL && process.env.GSC_ACCESS_TOKEN && process.env.AI_MOCK_MODE !== "true") {
            try {
                const result = await this.lookupWithSearchConsole(input);
                if (result) {
                    return result;
                }
            }
            catch (error) {
                this.logger.warn(`Search Console lookup failed: ${String(error)}`);
            }
        }
        if (process.env.SERP_API_KEY && process.env.AI_MOCK_MODE !== "true") {
            try {
                const result = await this.lookupWithSerpApi(input);
                if (result) {
                    return result;
                }
            }
            catch (error) {
                this.logger.warn(`SerpAPI lookup failed: ${String(error)}`);
            }
        }
        return {
            position: this.createMockPosition(input.keyword, input.slug),
            source: "mock",
        };
    }
    async lookupWithSearchConsole(input) {
        var _a;
        const siteUrl = process.env.GSC_SITE_URL;
        const contentBasePath = process.env.SEO_CONTENT_BASE_PATH || "/blog";
        const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const targetPage = `${publicSiteUrl}${contentBasePath}/${input.slug}`;
        const endDate = new Date();
        const startDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
        const body = {
            startDate: startDate.toISOString().slice(0, 10),
            endDate: endDate.toISOString().slice(0, 10),
            dimensions: ["page", "query"],
            rowLimit: 25,
            dimensionFilterGroups: [
                {
                    filters: [
                        {
                            dimension: "query",
                            operator: "equals",
                            expression: input.keyword,
                        },
                        {
                            dimension: "page",
                            operator: "equals",
                            expression: targetPage,
                        },
                    ],
                },
            ],
        };
        const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GSC_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`GSC request failed with status ${response.status}`);
        }
        const payload = (await response.json());
        const row = (_a = payload.rows) === null || _a === void 0 ? void 0 : _a[0];
        if (!(row === null || row === void 0 ? void 0 : row.position)) {
            return null;
        }
        return {
            position: Math.max(1, Math.round(row.position)),
            source: "gsc",
        };
    }
    async lookupWithSerpApi(input) {
        var _a;
        const searchParams = new URLSearchParams({
            engine: "google",
            q: input.keyword,
            api_key: process.env.SERP_API_KEY,
            num: "20",
        });
        if (input.location) {
            searchParams.set("location", input.location);
        }
        const response = await fetch(`https://serpapi.com/search.json?${searchParams.toString()}`);
        if (!response.ok) {
            throw new Error(`SerpAPI ranking request failed with status ${response.status}`);
        }
        const payload = (await response.json());
        const result = ((_a = payload.organic_results) !== null && _a !== void 0 ? _a : []).find((item) => { var _a; return ((_a = item.link) !== null && _a !== void 0 ? _a : "").includes(input.slug); });
        if (!(result === null || result === void 0 ? void 0 : result.position)) {
            return null;
        }
        return {
            position: result.position,
            source: "serpapi",
        };
    }
    createMockPosition(keyword, slug) {
        const seed = `${keyword}:${slug}`
            .split("")
            .reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return (seed % 18) + 1;
    }
};
exports.RankSourceService = RankSourceService;
exports.RankSourceService = RankSourceService = RankSourceService_1 = __decorate([
    (0, common_1.Injectable)()
], RankSourceService);

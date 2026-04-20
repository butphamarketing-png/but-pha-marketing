import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { RedisService } from "../common/redis/redis.service";
import { AnalyzeTopicDto } from "./dto/analyze-topic.dto";
import { SerpProService } from "./serp.service";
import { AiProService } from "./ai.service";

@Injectable()
export class ContentOpportunityProService {
  private readonly logger = new Logger(ContentOpportunityProService.name);
  private readonly CACHE_TTL = 21600; // 6 hours

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly serpService: SerpProService,
    private readonly aiService: AiProService,
  ) {}

  async analyze(dto: AnalyzeTopicDto, projectId: string) {
    const cacheKey = `content-opportunity:${dto.topic}:${dto.location}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    this.logger.log(`Analyzing topic: ${dto.topic} in ${dto.location}`);

    // 1. Expand Keywords
    const keywords = await this.aiService.expandKeywords(dto.topic);

    // 2. SERP Analysis for the main keyword
    const mainKeyword = keywords[0]?.keyword || dto.topic;
    const serpResults = await this.serpService.getOrganicResults(mainKeyword, dto.location);
    
    // Extract detailed metrics (mocking scraping for now as it's expensive)
    const serpAnalysis = {
      avgWordCount: 1250 + Math.floor(Math.random() * 500),
      avgHeadings: 8 + Math.floor(Math.random() * 4),
      competitors: serpResults.slice(0, 5),
    };

    // 3. Content Gap Detection
    const contentGap = await this.aiService.detectContentGaps(mainKeyword, serpResults);

    // 4. Scoring & Suggestions
    const suggestions = await this.aiService.generateArticleSuggestions(keywords, contentGap);

    const result = {
      keywords: keywords.map(k => ({
        ...k,
        opportunityScore: this.calculateScore(k, contentGap),
      })).sort((a, b) => b.opportunityScore - a.opportunityScore),
      serpAnalysis,
      contentGaps: contentGap,
      suggestions,
    };

    await this.redis.set(cacheKey, JSON.stringify(result), this.CACHE_TTL);
    return result;
  }

  private calculateScore(keyword: any, gaps: any) {
    // formula: (100 - difficulty) * 0.4 + (gapCount) * 10 + (volumeWeight)
    const difficultyWeight = (100 - (keyword.difficulty || 50)) * 0.4;
    const gapWeight = (gaps.missingTopics?.length || 0) * 5;
    const intentWeight = keyword.intent === 'informational' ? 15 : 10;
    
    return Math.min(100, Math.round(difficultyWeight + gapWeight + intentWeight));
  }
}

import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ClusterDto } from "./dto/cluster.dto";
import { ContentBriefDto } from "./dto/content-brief.dto";
import { PostQueryDto } from "./dto/post-query.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { SerpAnalyzeDto } from "./dto/serp-analyze.dto";
import { SeoService } from "./seo.service";

@Controller("seo")
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Post("content-brief")
  createContentBrief(@Body() dto: ContentBriefDto) {
    return this.seoService.createContentBrief(dto);
  }

  @Get("related-posts")
  getRelatedPosts(@Query() query: PostQueryDto) {
    return this.seoService.getRelatedPosts(query.postId, query.limit);
  }

  @Get("internal-links")
  getInternalLinks(@Query() query: PostQueryDto) {
    return this.seoService.getInternalLinks(query.postId, query.limit);
  }

  @Get("interlink-opportunities")
  getInterlinkOpportunities(@Query() query: PostQueryDto) {
    return this.seoService.getInterlinkOpportunities(query.postId, query.limit);
  }

  @Post("cluster")
  createCluster(@Body() dto: ClusterDto) {
    return this.seoService.createCluster(dto);
  }

  @Post("serp-analyze")
  analyzeSerp(@Body() dto: SerpAnalyzeDto) {
    return this.seoService.analyzeSerp(dto);
  }

  @Post("refresh")
  refreshContent(@Body() dto: RefreshDto) {
    return this.seoService.refreshContent(dto);
  }

  @Get("serp-analysis")
  getLatestSerpAnalysis(@Query() query: PostQueryDto) {
    return this.seoService.getLatestSerpAnalysis(query.postId);
  }
}

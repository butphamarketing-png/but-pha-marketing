import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Prisma, Post } from "@prisma/client";
import { Ga4Service } from "../common/analytics/ga4.service";
import { PrismaService } from "../common/prisma/prisma.service";
import { CurrentWorkspaceService } from "../common/workspace/workspace.service";
import { ClusterDto } from "./dto/cluster.dto";
import { ContentBriefDto } from "./dto/content-brief.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { SerpAnalyzeDto } from "./dto/serp-analyze.dto";
import { SeoOpenAIService } from "./seo-openai.service";

type EmbeddingRecord = {
  postId: string;
  title: string;
  slug: string;
  content: string;
  keywords: string[];
  vector: number[];
  createdAt: Date;
};

@Injectable()
export class SeoService {
  private readonly logger = new Logger(SeoService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceService: CurrentWorkspaceService,
    private readonly seoOpenAIService: SeoOpenAIService,
    private readonly ga4Service: Ga4Service,
  ) {}

  async createContentBrief(dto: ContentBriefDto) {
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

  async upsertPostEmbedding(post: Pick<Post, "id" | "userId" | "projectId" | "title" | "content" | "metaDescription" | "keywords">) {
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

  async getRelatedPosts(postId: string, limit = 5) {
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

  async getInternalLinks(postId: string, limit = 5) {
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

  async getInterlinkOpportunities(postId: string, limit = 5) {
    const newPost = await this.requirePost(postId);
    const related = await this.getInternalLinks(postId, limit);

    return related.map((item, index) => ({
      sourcePostId: item.postId,
      sourceTitle: item.title,
      slug: item.slug,
      anchor: this.buildAnchorSuggestion(newPost, newPost.title),
      placementSuggestion:
        index % 2 === 0
          ? `Add the link in a section where ${newPost.keywords[0] ?? "the topic"} is introduced or compared.`
          : `Place the link near the conclusion as a next-step resource about ${newPost.title.toLowerCase()}.`,
      reason: `The older post covers adjacent intent and should point readers toward the newer article on "${newPost.title}".`,
    }));
  }

  async createCluster(dto: ClusterDto) {
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

  async analyzeSerp(dto: SerpAnalyzeDto) {
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

    return {
      ...analysis,
      source: this.resolveSerpSource().mode,
    };
  }

  async refreshContent(dto: RefreshDto) {
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

  async getLatestSerpAnalysis(postId: string) {
    await this.requirePost(postId);
    const latest = await this.prisma.serpAnalysis.findFirst({
      where: { postId },
      orderBy: { createdAt: "desc" },
    });

    if (!latest) {
      return null;
    }

    return {
      ...latest,
      source: this.resolveSerpSource().mode,
    };
  }

  async getAnalyticsOverview() {
    return this.ga4Service.getOverview();
  }

  getSourceStatus() {
    return {
      serp: this.resolveSerpSource(),
      rank: this.resolveRankSource(),
      ga4: this.resolveGa4Source(),
    };
  }

  private async fetchSerpAnalysis(title: string, location: string) {
    const searchParams = new URLSearchParams({
      engine: "google",
      q: title,
      api_key: process.env.SERP_API_KEY!,
      location,
      num: "10",
    });

    const response = await fetch(`https://serpapi.com/search.json?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error(`SerpAPI request failed with status ${response.status}`);
    }

    const data = (await response.json()) as {
      organic_results?: Array<{ position?: number; title?: string; link?: string; snippet?: string }>;
    };

    const results = (data.organic_results ?? []).slice(0, 10);
    const pageInsights = await Promise.all(results.map((result) => this.fetchPageInsight(result.link)));
    const validInsights = pageInsights.filter((item) => item !== null);
    const headings = validInsights.flatMap((item) => item.headings).slice(0, 30);
    const avgLength = validInsights.length
      ? Math.round(validInsights.reduce((sum, item) => sum + item.wordCount, 0) / validInsights.length)
      : 0;

    return {
      query: title,
      location,
      topResults: results.map((result, index) => ({
        position: result.position ?? index + 1,
        title: result.title ?? "Untitled",
        link: result.link ?? "",
        snippet: result.snippet ?? "",
      })),
      headings,
      avgLength,
      contentGap: this.buildContentGap(title, headings),
    };
  }

  private async requirePost(postId: string) {
    const { projectId } = await this.workspaceService.getContext();
    const post = await this.prisma.post.findFirst({
      where: { id: postId, projectId },
    });

    if (!post) {
      throw new NotFoundException("Post not found");
    }

    return post;
  }

  private async getEmbeddingTarget(postId: string) {
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

  private async loadProjectEmbeddings(projectId: string, excludePostId: string): Promise<EmbeddingRecord[]> {
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

  private asVector(value: Prisma.JsonValue) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value.map((item) => Number(item)).filter((item) => Number.isFinite(item));
  }

  private asStringArray(value: Prisma.JsonValue) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value.map((item) => String(item)).filter(Boolean);
  }

  private cosineSimilarity(left: number[], right: number[]) {
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

  private buildAnchorSuggestion(post: Pick<Post, "title" | "keywords">, fallbackTitle: string) {
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

  private async fetchPageInsight(url?: string) {
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
        .map((match) => this.stripHtml(match[1] ?? "").trim())
        .filter(Boolean)
        .slice(0, 8);
      const text = this.stripHtml(html).replace(/\s+/g, " ").trim();

      return {
        headings,
        wordCount: text ? text.split(" ").length : 0,
      };
    } catch {
      return null;
    }
  }

  private buildContentGap(title: string, headings: string[]) {
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

  private createMockSerpAnalysis(title: string, location: string) {
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
      source: "mock" as const,
    };
  }

  private resolveSerpSource() {
    if (process.env.SERP_API_KEY && process.env.AI_MOCK_MODE !== "true") {
      return {
        mode: "live" as const,
        source: "serpapi" as const,
        label: "Live SERP via SerpAPI",
      };
    }

    return {
      mode: "mock" as const,
      source: "mock" as const,
      label: "Mock SERP",
    };
  }

  private resolveRankSource() {
    if (process.env.GSC_SITE_URL && process.env.GSC_ACCESS_TOKEN && process.env.AI_MOCK_MODE !== "true") {
      return {
        mode: "verified" as const,
        source: "gsc" as const,
        label: "Verified via Google Search Console",
      };
    }

    if (process.env.SERP_API_KEY && process.env.AI_MOCK_MODE !== "true") {
      return {
        mode: "live" as const,
        source: "serpapi" as const,
        label: "Live rank via SerpAPI",
      };
    }

    return {
      mode: "mock" as const,
      source: "mock" as const,
      label: "Mock rank",
    };
  }

  private resolveGa4Source() {
    if (process.env.GA4_PROPERTY_ID && process.env.GA4_ACCESS_TOKEN && process.env.AI_MOCK_MODE !== "true") {
      return {
        mode: "live" as const,
        source: "ga4" as const,
        label: "Live GA4",
      };
    }

    return {
      mode: "mock" as const,
      source: "mock" as const,
      label: "Mock GA4",
    };
  }

  private stripHtml(value: string) {
    return value
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&");
  }
}

import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { CurrentWorkspaceService } from "../common/workspace/workspace.service";
import { RankTrackDto } from "./dto/rank-track.dto";
import { RankSourceService } from "./rank-source.service";

@Injectable()
export class RankService {
  private readonly logger = new Logger(RankService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceService: CurrentWorkspaceService,
    private readonly rankSourceService: RankSourceService,
  ) {}

  async getRankingHistory(postId: string) {
    const post = await this.requirePost(postId);

    const rankings = await this.prisma.keywordRanking.findMany({
      where: { postId: post.id },
      orderBy: { checkedAt: "desc" },
    });

    const latestByKeyword = rankings.reduce<Record<string, (typeof rankings)[number]>>((accumulator, ranking) => {
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

  async trackKeyword(dto: RankTrackDto) {
    const { userId, projectId } = await this.workspaceService.getContext();
    const post = await this.requirePost(dto.postId);
    const lookup = await this.rankSourceService.getCurrentRanking({
      keyword: dto.keyword,
      location: dto.location,
      slug: post.slug,
    });

    this.logger.log(`Tracking keyword "${dto.keyword}" for post ${post.id} using ${lookup.source}`);

    const recent = await this.prisma.keywordRanking.findFirst({
      where: { postId: post.id, keyword: dto.keyword },
      orderBy: { checkedAt: "desc" },
    });

    const previous = recent?.position ?? null;
    const change = previous !== null ? previous - lookup.position : null;

    const record = await this.prisma.keywordRanking.create({
      data: {
        userId,
        projectId,
        postId: post.id,
        keyword: dto.keyword,
        position: lookup.position,
        previous,
        change,
        location: dto.location,
      },
    });

    const decay = await this.evaluateDecay(post.id, dto.keyword);

    return {
      ...record,
      source: lookup.source,
      decay,
    };
  }

  async checkDecay(postId: string) {
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

    const keywordGroups = keywords.reduce<Record<string, typeof keywords>>((accumulator, ranking) => {
      if (!accumulator[ranking.keyword]) {
        accumulator[ranking.keyword] = [];
      }
      accumulator[ranking.keyword].push(ranking);
      return accumulator;
    }, {});

    const evaluations = Object.entries(keywordGroups)
      .map(([keyword, rankings]) => {
        const [current, previous] = rankings;
        const currentPosition = current?.position ?? null;
        const previousPosition = previous?.position ?? null;
        const dropAmount =
          currentPosition !== null && previousPosition !== null ? currentPosition - previousPosition : 0;
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
    const posts = await this.prisma.post.findMany({
      where: { status: "published" },
      include: {
        rankings: {
          orderBy: { checkedAt: "desc" },
        },
      },
    });

    for (const post of posts) {
      const seenKeywords = new Set<string>();
      for (const ranking of post.rankings) {
        if (seenKeywords.has(ranking.keyword)) {
          continue;
        }

        seenKeywords.add(ranking.keyword);

        try {
          await this.trackKeyword({
            postId: post.id,
            keyword: ranking.keyword,
            location: ranking.location ?? undefined,
          });
        } catch (error) {
          this.logger.warn(`Scheduled ranking check failed for post ${post.id}: ${String(error)}`);
        }
      }
    }
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

  private async evaluateDecay(postId: string, keyword: string) {
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
      previousPosition: previous?.position ?? null,
      dropAmount,
      needsUpdate,
    };
  }

  private buildDecayRecommendation(current: number | null, previous: number | null, dropAmount: number) {
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
}

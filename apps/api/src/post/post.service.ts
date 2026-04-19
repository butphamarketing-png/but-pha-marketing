import { Injectable, NotFoundException } from "@nestjs/common";
import { Post } from "@prisma/client";
import { PrismaService } from "../common/prisma/prisma.service";
import { CurrentWorkspaceService } from "../common/workspace/workspace.service";
import { SeoService } from "../seo/seo.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceService: CurrentWorkspaceService,
    private readonly seoService: SeoService,
  ) {}

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

  async detail(id: string) {
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
      throw new NotFoundException("Post not found");
    }

    return post;
  }

  async create(dto: CreatePostDto) {
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
      const post = await tx.post.create({
        data: {
          userId,
          projectId,
          title: dto.title,
          slug: dto.slug,
          content: dto.content,
          metaDescription: dto.metaDescription,
          keywords: dto.keywords,
          status: dto.status ?? "draft",
          currentVersion: generation?.version ?? 1,
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

  async update(id: string, dto: UpdatePostDto) {
    const { userId, projectId } = await this.workspaceService.getContext();

    const existing = await this.prisma.post.findFirst({
      where: { id, projectId, userId },
    });

    if (!existing) {
      throw new NotFoundException("Post not found");
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
      const post = await tx.post.update({
        where: { id },
        data: {
          title: dto.title ?? existing.title,
          slug: dto.slug ?? existing.slug,
          content: dto.content ?? existing.content,
          metaDescription: dto.metaDescription ?? existing.metaDescription,
          keywords: dto.keywords ?? existing.keywords,
          status: dto.status ?? existing.status,
          currentVersion: generation?.version ?? existing.currentVersion,
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

  private async safeUpsertEmbedding(post: Pick<Post, "id" | "userId" | "projectId" | "title" | "content" | "metaDescription" | "keywords">) {
    try {
      await this.seoService.upsertPostEmbedding(post);
    } catch (error) {
      console.warn("Post embedding generation failed:", error);
    }
  }
}

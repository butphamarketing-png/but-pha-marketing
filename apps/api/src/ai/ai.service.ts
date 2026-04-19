import { GenerationType } from "@prisma/client";
import { Injectable, NotFoundException } from "@nestjs/common";
import OpenAI from "openai";
import slugify from "slugify";
import { PrismaService } from "../common/prisma/prisma.service";
import { CurrentWorkspaceService } from "../common/workspace/workspace.service";
import { GenerateArticleDto } from "./dto/generate-article.dto";
import { buildContentPrompt, buildOutlinePrompt, buildSeoPrompt } from "./prompts";

type OutlineSection = {
  heading: string;
  summary: string;
};

type OutlineResult = {
  optimizedTitle: string;
  sections: OutlineSection[];
};

type SeoResult = {
  title: string;
  slug: string;
  metaDescription: string;
  keywords: string[];
};

@Injectable()
export class AIService {
  private readonly client = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

  async generate(dto: GenerateArticleDto) {
    const { userId, projectId } = await this.workspaceService.getContext();
    const existingPost = dto.postId
      ? await this.prisma.post.findFirst({
          where: { id: dto.postId, userId, projectId },
        })
      : null;

    if (dto.postId && !existingPost) {
      throw new NotFoundException("Post not found for regeneration");
    }

    const outline = await this.generateOutline(dto.title);
    const content = await this.generateContent(outline.optimizedTitle, outline.sections);
    const seo = await this.generateSeo(outline.optimizedTitle, content);

    const nextVersion = existingPost ? existingPost.currentVersion + 1 : 1;
    const generationType = existingPost ? GenerationType.regenerate : GenerationType.initial;

    const generation = await this.prisma.aIGeneration.create({
      data: {
        userId,
        projectId,
        postId: existingPost?.id,
        type: generationType,
        version: nextVersion,
        inputTitle: dto.title,
        optimizedTitle: seo.title,
        slug: this.ensureSlug(seo.slug || seo.title),
        metaDescription: seo.metaDescription,
        keywords: seo.keywords,
        outline: outline.sections,
        content,
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      },
    });

    return {
      generationId: generation.id,
      version: generation.version,
      type: generation.type,
      title: seo.title,
      slug: generation.slug,
      metaDescription: seo.metaDescription,
      keywords: seo.keywords,
      content,
      outline: outline.sections,
    };
  }

  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceService: CurrentWorkspaceService,
  ) {}

  private async generateOutline(title: string): Promise<OutlineResult> {
    if (this.useMockMode()) {
      return {
        optimizedTitle: `${title} for Sustainable Organic Growth`,
        sections: [
          { heading: "Why this topic matters", summary: "Explain the business context and search intent." },
          { heading: "Core strategy", summary: "Break down the main approach with actionable steps." },
          { heading: "Execution checklist", summary: "Turn the strategy into a practical workflow." },
          { heading: "Common mistakes", summary: "Highlight pitfalls and how to avoid them." },
          { heading: "Conclusion", summary: "Summarize the main points with a direct next step." },
        ],
      };
    }

    const response = await this.client!.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: buildOutlinePrompt(title),
        },
      ],
    });

    return JSON.parse(response.choices[0]?.message?.content || "{}") as OutlineResult;
  }

  private async generateContent(title: string, sections: OutlineSection[]) {
    if (this.useMockMode()) {
      return [
        `# ${title}`,
        "",
        "This mock article is intentionally long enough to validate the full Phase 1 workflow without a live API key. It mirrors the structure that the real OpenAI pipeline will produce: an optimized headline, an organized outline, detailed section copy, and SEO metadata ready for review in the editor.",
        "",
        ...sections.flatMap((section, index) => [
          `## ${section.heading}`,
          `${section.summary} In production, this section would be written from the outline stage so the content keeps a consistent argument from introduction to conclusion. For the MVP, the generated draft needs to feel publishable enough that a user can immediately edit, save, and regenerate it without changing tools.`,
          "",
          `Section ${index + 1} should also expand the search intent behind the title. That means explaining what the reader is trying to solve, which questions they are likely asking, and what practical decisions they need to make after reading. The article should avoid filler, but it still needs sufficient depth to cross the 1000-word threshold that makes the editor, database, and versioning flow meaningful during testing.`,
          "",
          "A strong SEO article also balances readability with structure. Each paragraph should move the reader forward, maintain a clear topic sentence, and add examples or criteria that make the advice more concrete. This is where the modular prompt design matters: the outline creates direction, the content stage expands it into a complete draft, and the SEO stage sharpens the metadata around what was actually written rather than guessing from the title alone.",
          "",
          "From a product perspective, this MVP article text is useful because it exercises the exact paths the live system needs. The frontend must autofill fields, the backend must persist long-form content reliably, and regeneration must create a new version that can be attached to an existing post. That means even mock content should behave like a realistic payload: multi-section, well-formed, and large enough to surface any formatting or persistence issues early.",
          "",
        ]),
        "## Conclusion",
        "The Phase 1 MVP focuses on a disciplined slice of the final platform: title in, SEO article out, editor in the middle, persistence behind it, and version history for regeneration. Once this baseline is stable, later phases can add richer prompting, SERP enrichment, queues, collaboration, and publishing integrations without rewriting the foundations delivered here.",
      ].join("\n");
    }

    const response = await this.client!.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: buildContentPrompt(title, sections),
        },
      ],
    });

    return response.choices[0]?.message?.content?.trim() || "";
  }

  private async generateSeo(title: string, content: string): Promise<SeoResult> {
    if (this.useMockMode()) {
      return {
        title,
        slug: this.ensureSlug(title),
        metaDescription: `Learn ${title.toLowerCase()} with a practical SEO-ready guide you can publish and iterate on.`,
        keywords: title
          .toLowerCase()
          .split(" ")
          .filter(Boolean)
          .slice(0, 6),
      };
    }

    const response = await this.client!.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: buildSeoPrompt(title, content),
        },
      ],
    });

    return JSON.parse(response.choices[0]?.message?.content || "{}") as SeoResult;
  }

  private useMockMode() {
    return process.env.AI_MOCK_MODE === "true" || !this.client;
  }

  private ensureSlug(value: string) {
    return slugify(value, { lower: true, strict: true, trim: true });
  }
}

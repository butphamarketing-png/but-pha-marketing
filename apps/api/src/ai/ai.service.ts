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
  keyPoints: string[];
};

type OutlineResult = {
  optimizedTitle: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  targetAudience: string;
  sections: OutlineSection[];
};

type FaqItem = {
  question: string;
  answer: string;
};

type CtaBlock = {
  heading: string;
  body: string;
  buttonText: string;
};

type ContentResult = {
  content: string;
  faq: FaqItem[];
  cta: CtaBlock;
};

type SeoResult = {
  title: string;
  slug: string;
  metaDescription: string;
  keywords: string[];
};

const DEFAULT_MODEL = process.env.OPENAI_WRITING_MODEL || process.env.OPENAI_MODEL || "gpt-4.1";
const OUTLINE_TEMPERATURE = 0.4;
const CONTENT_TEMPERATURE = 0.7;
const SEO_TEMPERATURE = 0.3;
const DEFAULT_BRAND_NAME = "Bứt Phá Marketing";

@Injectable()
export class AIService {
  private readonly client = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceService: CurrentWorkspaceService,
  ) {}

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
    const draft = await this.generateContent(outline);
    const finalContent = this.composeArticleMarkdown({
      title: outline.optimizedTitle,
      body: draft.content,
      faq: draft.faq,
      cta: draft.cta,
    });
    const seo = await this.generateSeo(dto.title, outline, finalContent);

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
        content: finalContent,
        model: DEFAULT_MODEL,
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
      content: finalContent,
      outline: outline.sections,
      faq: draft.faq,
      cta: draft.cta,
      searchIntent: outline.searchIntent,
      targetAudience: outline.targetAudience,
      primaryKeyword: outline.primaryKeyword,
      secondaryKeywords: outline.secondaryKeywords,
    };
  }

  private async generateOutline(title: string): Promise<OutlineResult> {
    if (this.useMockMode()) {
      return this.buildMockOutline(title);
    }

    const response = await this.client!.chat.completions.create({
      model: DEFAULT_MODEL,
      temperature: OUTLINE_TEMPERATURE,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: buildOutlinePrompt({
            title,
            brandName: DEFAULT_BRAND_NAME,
          }),
        },
      ],
    });

    const parsed = this.parseJson<Partial<OutlineResult>>(response.choices[0]?.message?.content);
    return this.normalizeOutlineResult(parsed, title);
  }

  private async generateContent(outline: OutlineResult): Promise<ContentResult> {
    if (this.useMockMode()) {
      return this.buildMockContent(outline);
    }

    const response = await this.client!.chat.completions.create({
      model: DEFAULT_MODEL,
      temperature: CONTENT_TEMPERATURE,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: buildContentPrompt({
            title: outline.optimizedTitle,
            brandName: DEFAULT_BRAND_NAME,
            primaryKeyword: outline.primaryKeyword,
            secondaryKeywords: outline.secondaryKeywords,
            searchIntent: outline.searchIntent,
            targetAudience: outline.targetAudience,
            sections: outline.sections,
          }),
        },
      ],
    });

    const parsed = this.parseJson<Partial<ContentResult>>(response.choices[0]?.message?.content);
    return this.normalizeContentResult(parsed, outline);
  }

  private async generateSeo(originalTitle: string, outline: OutlineResult, content: string): Promise<SeoResult> {
    if (this.useMockMode()) {
      return this.buildMockSeo(outline, content);
    }

    const response = await this.client!.chat.completions.create({
      model: DEFAULT_MODEL,
      temperature: SEO_TEMPERATURE,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: buildSeoPrompt({
            originalTitle,
            articleTitle: outline.optimizedTitle,
            brandName: DEFAULT_BRAND_NAME,
            primaryKeyword: outline.primaryKeyword,
            secondaryKeywords: outline.secondaryKeywords,
            content,
          }),
        },
      ],
    });

    const parsed = this.parseJson<Partial<SeoResult>>(response.choices[0]?.message?.content);
    return this.normalizeSeoResult(parsed, outline);
  }

  private normalizeOutlineResult(parsed: Partial<OutlineResult>, fallbackTitle: string): OutlineResult {
    const sections = Array.isArray(parsed.sections)
      ? parsed.sections
          .map((section) => ({
            heading: typeof section?.heading === "string" ? section.heading.trim() : "",
            summary: typeof section?.summary === "string" ? section.summary.trim() : "",
            keyPoints: Array.isArray(section?.keyPoints)
              ? section.keyPoints.map((point) => String(point).trim()).filter(Boolean).slice(0, 5)
              : [],
          }))
          .filter((section) => section.heading && section.summary)
      : [];

    const fallback = this.buildMockOutline(fallbackTitle);

    return {
      optimizedTitle: parsed.optimizedTitle?.trim() || fallback.optimizedTitle,
      primaryKeyword: parsed.primaryKeyword?.trim() || fallback.primaryKeyword,
      secondaryKeywords: Array.isArray(parsed.secondaryKeywords)
        ? parsed.secondaryKeywords.map((item) => String(item).trim()).filter(Boolean).slice(0, 8)
        : fallback.secondaryKeywords,
      searchIntent: parsed.searchIntent?.trim() || fallback.searchIntent,
      targetAudience: parsed.targetAudience?.trim() || fallback.targetAudience,
      sections: sections.length > 0 ? sections : fallback.sections,
    };
  }

  private normalizeContentResult(parsed: Partial<ContentResult>, outline: OutlineResult): ContentResult {
    const faq = Array.isArray(parsed.faq)
      ? parsed.faq
          .map((item) => ({
            question: typeof item?.question === "string" ? item.question.trim() : "",
            answer: typeof item?.answer === "string" ? item.answer.trim() : "",
          }))
          .filter((item) => item.question && item.answer)
          .slice(0, 6)
      : [];

    const fallback = this.buildMockContent(outline);

    return {
      content: typeof parsed.content === "string" && parsed.content.trim() ? parsed.content.trim() : fallback.content,
      faq: faq.length > 0 ? faq : fallback.faq,
      cta:
        parsed.cta &&
        typeof parsed.cta.heading === "string" &&
        typeof parsed.cta.body === "string" &&
        typeof parsed.cta.buttonText === "string"
          ? {
              heading: parsed.cta.heading.trim() || fallback.cta.heading,
              body: parsed.cta.body.trim() || fallback.cta.body,
              buttonText: parsed.cta.buttonText.trim() || fallback.cta.buttonText,
            }
          : fallback.cta,
    };
  }

  private normalizeSeoResult(parsed: Partial<SeoResult>, outline: OutlineResult): SeoResult {
    const fallback = this.buildMockSeo(outline, "");
    const title = parsed.title?.trim() || fallback.title;
    const slug = parsed.slug?.trim() || this.ensureSlug(title);
    const metaDescription = parsed.metaDescription?.trim() || fallback.metaDescription;

    return {
      title,
      slug: this.ensureSlug(slug),
      metaDescription: metaDescription.slice(0, 155),
      keywords: Array.isArray(parsed.keywords)
        ? parsed.keywords.map((item) => String(item).trim()).filter(Boolean).slice(0, 8)
        : fallback.keywords,
    };
  }

  private composeArticleMarkdown(input: {
    title: string;
    body: string;
    faq: FaqItem[];
    cta: CtaBlock;
  }) {
    const cleanedBody = input.body
      .trim()
      .replace(/^#\s+.+$/m, "")
      .trim();

    const faqBlock = input.faq.length
      ? [
          "## Câu hỏi thường gặp",
          "",
          ...input.faq.flatMap((item) => [`### ${item.question}`, item.answer, ""]),
        ].join("\n")
      : "";

    const ctaBlock = input.cta.heading
      ? [
          "## Kết luận và gợi ý tiếp theo",
          "",
          `**${input.cta.heading}**`,
          "",
          input.cta.body,
          "",
          `Gợi ý hành động: ${input.cta.buttonText}.`,
        ].join("\n")
      : "";

    return [`# ${input.title}`, "", cleanedBody, faqBlock, ctaBlock]
      .filter(Boolean)
      .join("\n\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  private buildMockOutline(title: string): OutlineResult {
    return {
      optimizedTitle: this.buildNaturalVietnameseTitle(title),
      primaryKeyword: title.trim(),
      secondaryKeywords: [
        `${title.trim()} uy tín`,
        `chi phí ${title.trim()}`,
        `${title.trim()} hiệu quả`,
        `kinh nghiệm chọn ${title.trim()}`,
      ],
      searchIntent: "Người đọc đang tìm hiểu dịch vụ phù hợp, mức chi phí, cách triển khai và đơn vị đáng tin để ra quyết định.",
      targetAudience: "Chủ doanh nghiệp, quản lý marketing hoặc người phụ trách tăng trưởng đang cân nhắc thuê dịch vụ.",
      sections: [
        {
          heading: `Khi nào doanh nghiệp nên đầu tư ${title.trim()}?`,
          summary: "Làm rõ bối cảnh sử dụng dịch vụ, dấu hiệu cần làm ngay và mục tiêu kinh doanh thường gặp.",
          keyPoints: ["Dấu hiệu kênh hiện tại tăng trưởng chậm", "Chi phí quảng cáo tăng nhưng chuyển đổi thấp", "Đội ngũ nội bộ thiếu thời gian hoặc chuyên môn"],
        },
        {
          heading: `Lợi ích thực tế của ${title.trim()} nếu triển khai đúng cách`,
          summary: "Tập trung vào tác động tới lead, doanh thu, hiệu suất ngân sách và tốc độ triển khai.",
          keyPoints: ["Tăng chất lượng đầu vào", "Cải thiện tỷ lệ chuyển đổi", "Tối ưu ngân sách theo dữ liệu"],
        },
        {
          heading: "Quy trình triển khai thường gồm những bước nào?",
          summary: "Mô tả quy trình thực chiến từ phân tích hiện trạng tới đo lường và tối ưu.",
          keyPoints: ["Audit hiện trạng", "Lập chiến lược và KPI", "Triển khai và tối ưu hàng tuần"],
        },
        {
          heading: "Chi phí bị ảnh hưởng bởi những yếu tố nào?",
          summary: "Giải thích rõ vì sao báo giá có thể chênh lệch giữa các doanh nghiệp và gói dịch vụ.",
          keyPoints: ["Mục tiêu kinh doanh", "Mức độ cạnh tranh ngành", "Khối lượng đầu việc và chất lượng tài nguyên đầu vào"],
        },
        {
          heading: "Những sai lầm phổ biến khi chọn đơn vị dịch vụ marketing",
          summary: "Nêu các lỗi dễ gặp khiến doanh nghiệp mất tiền nhưng không ra kết quả.",
          keyPoints: ["Chọn theo giá rẻ", "Không chốt KPI và phạm vi rõ ràng", "Không xem cách báo cáo và tối ưu"],
        },
        {
          heading: "Tiêu chí chọn đơn vị phù hợp để đồng hành lâu dài",
          summary: "Đưa ra checklist đánh giá đơn vị cung cấp dịch vụ trên góc độ hiệu quả thật.",
          keyPoints: ["Có quy trình minh bạch", "Có năng lực phân tích dữ liệu", "Giao tiếp rõ và báo cáo dễ hiểu"],
        },
      ],
    };
  }

  private buildMockContent(outline: OutlineResult): ContentResult {
    const body = [
      `Nhu cầu tìm kiếm ${outline.primaryKeyword} thường xuất hiện khi doanh nghiệp đã thử nhiều cách nhưng kết quả chưa ổn định. Có đơn vị đổ ngân sách khá lớn mà lead vẫn không đều, cũng có nơi có khách quan tâm nhưng đội ngũ bán hàng không theo kịp nên hiệu quả cuối cùng không như kỳ vọng.`,
      "",
      `Vì vậy, một bài toán quan trọng không nằm ở việc “có nên làm marketing hay không”, mà là nên triển khai theo hướng nào để chi phí đi đúng chỗ và tạo ra tăng trưởng bền hơn. Nếu bạn đang cân nhắc thuê dịch vụ, điều cần nhìn không chỉ là báo giá mà còn là cách đơn vị đó phân tích, triển khai và tối ưu theo mục tiêu kinh doanh.`,
      "",
      ...outline.sections.flatMap((section) => [
        `## ${section.heading}`,
        `${section.summary} Ở giai đoạn này, điều doanh nghiệp cần nhất là hiểu rõ việc nào tạo ra tác động trực tiếp tới kết quả, việc nào chỉ khiến chi phí tăng nhưng giá trị mang lại không tương xứng.`,
        "",
        `Thay vì làm mọi thứ cùng lúc, cách hiệu quả hơn là ưu tiên các đầu việc gần với mục tiêu doanh thu hoặc chuyển đổi. Khi kế hoạch rõ ngay từ đầu, đội ngũ triển khai sẽ dễ đo lường hơn và doanh nghiệp cũng biết mình đang trả tiền cho phần việc cụ thể nào.`,
        "",
        "Bạn có thể dùng checklist nhanh sau để tự rà soát:",
        ...section.keyPoints.map((point) => `- ${point}`),
        "",
        "Nếu một đơn vị dịch vụ không giải thích được lý do cho từng hạng mục, hoặc chỉ hứa hẹn kết quả mà thiếu cơ chế đo lường, đó thường là tín hiệu nên cân nhắc lại trước khi ký hợp tác.",
        "",
      ]),
    ].join("\n");

    return {
      content: body.trim(),
      faq: [
        {
          question: `Chi phí ${outline.primaryKeyword} thường được tính như thế nào?`,
          answer: "Mức chi phí thường phụ thuộc vào mục tiêu, độ cạnh tranh ngành, phạm vi công việc, ngân sách quảng cáo và tần suất tối ưu cần thiết.",
        },
        {
          question: "Bao lâu thì có thể thấy kết quả?",
          answer: "Điều này phụ thuộc vào kênh triển khai và chất lượng đầu vào hiện tại, nhưng thông thường cần một giai đoạn thử nghiệm, tối ưu và đo dữ liệu trước khi đánh giá chính xác.",
        },
        {
          question: "Doanh nghiệp nhỏ có nên thuê dịch vụ ngoài không?",
          answer: "Có, nếu nội bộ chưa đủ nhân sự hoặc chuyên môn. Quan trọng là chọn phạm vi phù hợp và KPI rõ để kiểm soát hiệu quả đầu tư.",
        },
        {
          question: "Nên chọn đơn vị giá rẻ hay đơn vị có quy trình rõ?",
          answer: "Thông thường quy trình rõ, báo cáo minh bạch và khả năng tối ưu thực chiến quan trọng hơn mức giá thấp ban đầu.",
        },
      ],
      cta: {
        heading: "Nếu bạn cần một kế hoạch phù hợp hơn với tình hình thực tế",
        body: "Cách tốt nhất là bắt đầu từ việc rà soát mục tiêu, ngân sách và điểm nghẽn hiện tại, sau đó mới chọn gói triển khai phù hợp thay vì làm theo cảm tính.",
        buttonText: "Nhận tư vấn chiến lược",
      },
    };
  }

  private buildMockSeo(outline: OutlineResult, content: string): SeoResult {
    const title = this.limitTitleLength(this.buildNaturalVietnameseTitle(outline.primaryKeyword));
    const metaDescriptionBase = `Tìm hiểu ${outline.primaryKeyword.toLowerCase()} theo cách thực tế: lợi ích, chi phí, quy trình và tiêu chí chọn đơn vị phù hợp.`;

    return {
      title,
      slug: this.ensureSlug(title),
      metaDescription: metaDescriptionBase.slice(0, 155),
      keywords: [
        outline.primaryKeyword,
        ...outline.secondaryKeywords,
        "dịch vụ marketing",
        "giải pháp marketing cho doanh nghiệp",
      ]
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 8),
    };
  }

  private parseJson<T>(content?: string | null): T {
    if (!content) return {} as T;
    const normalized = content.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "");
    return JSON.parse(normalized) as T;
  }

  private buildNaturalVietnameseTitle(input: string) {
    const clean = input.trim();
    if (!clean) {
      return "Dịch vụ marketing: cách chọn hướng triển khai hiệu quả cho doanh nghiệp";
    }

    return this.limitTitleLength(`${clean}: giải pháp phù hợp, quy trình rõ và chi phí cần biết`);
  }

  private limitTitleLength(value: string) {
    return value.length <= 65 ? value : `${value.slice(0, 62).trim()}...`;
  }

  private useMockMode() {
    return process.env.AI_MOCK_MODE === "true" || !this.client;
  }

  private ensureSlug(value: string) {
    return slugify(value, { lower: true, strict: true, trim: true });
  }
}

import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { buildClusterPrompt, buildContentBriefPrompt, buildRefreshPrompt } from "./seo-prompts";

type ContentBriefResult = {
  keyword: string;
  search_intent: string;
  target_audience: string;
  outline_suggestion: string[];
  content_gaps: string[];
};

type ClusterResult = {
  pillar_topic: string;
  cluster_topics: string[];
};

type RefreshResult = {
  newContent: string;
  improvements: string[];
};

@Injectable()
export class SeoOpenAIService {
  private readonly client = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

  async createContentBrief(title: string): Promise<ContentBriefResult> {
    if (this.useMockMode()) {
      return {
        keyword: title.toLowerCase(),
        search_intent: "Informational with commercial investigation",
        target_audience: "Marketing teams and business owners evaluating practical SEO execution",
        outline_suggestion: [
          "Define the problem and the target search intent",
          "Explain the core strategy and required inputs",
          "Show implementation steps and examples",
          "Compare common alternatives or mistakes",
          "Close with an execution checklist",
        ],
        content_gaps: [
          "Concrete examples from real workflows",
          "Decision criteria for selecting the right approach",
          "Internal linking opportunities across related topics",
        ],
      };
    }

    const response = await this.client!.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: buildContentBriefPrompt(title) }],
    });

    return JSON.parse(response.choices[0]?.message?.content || "{}") as ContentBriefResult;
  }

  async createCluster(topic: string): Promise<ClusterResult> {
    if (this.useMockMode()) {
      return {
        pillar_topic: topic,
        cluster_topics: [
          `${topic} strategy`,
          `${topic} tools`,
          `${topic} checklist`,
          `${topic} mistakes`,
          `${topic} examples`,
          `${topic} KPIs`,
        ],
      };
    }

    const response = await this.client!.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: buildClusterPrompt(topic) }],
    });

    return JSON.parse(response.choices[0]?.message?.content || "{}") as ClusterResult;
  }

  async createEmbedding(input: string) {
    if (this.useMockMode()) {
      return this.createMockEmbedding(input);
    }

    const response = await this.client!.embeddings.create({
      model: process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small",
      input,
    });

    return response.data[0]?.embedding ?? [];
  }

  async createRefreshSuggestion(input: {
    title: string;
    content: string;
    contentBrief?: {
      keyword: string;
      searchIntent: string;
      targetAudience: string;
      outlineSuggestion: string[];
      contentGaps: string[];
    } | null;
    serpAnalysis?: {
      headings: string[];
      avgLength: number;
      contentGap: string[];
    } | null;
  }): Promise<RefreshResult> {
    if (this.useMockMode()) {
      return {
        newContent: [
          input.content,
          "",
          "## Newly Added Insights",
          "This refresh draft adds missing context pulled from the content brief and SERP analysis. It is still a suggestion draft and must be reviewed before saving.",
          "",
          "## Expanded FAQ",
          "This additional section gives the article stronger long-tail coverage and addresses questions that were previously under-explained.",
        ].join("\n"),
        improvements: [
          "added missing H2 section for uncovered search intent",
          "expanded underdeveloped section with more execution detail",
          "improved keyword coverage and structural completeness",
        ],
      };
    }

    const response = await this.client!.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: buildRefreshPrompt(input) }],
    });

    return JSON.parse(response.choices[0]?.message?.content || "{}") as RefreshResult;
  }

  private useMockMode() {
    return process.env.AI_MOCK_MODE === "true" || !this.client;
  }

  private createMockEmbedding(input: string) {
    const size = 128;
    const vector = new Array<number>(size).fill(0);
    const normalized = input.toLowerCase();

    for (let index = 0; index < normalized.length; index += 1) {
      const code = normalized.charCodeAt(index);
      vector[index % size] += ((code % 31) + 1) / 32;
    }

    const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
    return vector.map((value) => Number((value / magnitude).toFixed(6)));
  }
}

import { Injectable, Logger } from "@nestjs/common";

type RankLookupInput = {
  keyword: string;
  location?: string;
  slug: string;
};

type RankLookupResult = {
  position: number;
  source: "gsc" | "serpapi" | "mock";
};

@Injectable()
export class RankSourceService {
  private readonly logger = new Logger(RankSourceService.name);

  async getCurrentRanking(input: RankLookupInput): Promise<RankLookupResult> {
    if (process.env.GSC_SITE_URL && process.env.GSC_ACCESS_TOKEN && process.env.AI_MOCK_MODE !== "true") {
      try {
        const result = await this.lookupWithSearchConsole(input);
        if (result) {
          return result;
        }
      } catch (error) {
        this.logger.warn(`Search Console lookup failed: ${String(error)}`);
      }
    }

    if (process.env.SERP_API_KEY && process.env.AI_MOCK_MODE !== "true") {
      try {
        const result = await this.lookupWithSerpApi(input);
        if (result) {
          return result;
        }
      } catch (error) {
        this.logger.warn(`SerpAPI lookup failed: ${String(error)}`);
      }
    }

    return {
      position: this.createMockPosition(input.keyword, input.slug),
      source: "mock",
    };
  }

  private async lookupWithSearchConsole(input: RankLookupInput): Promise<RankLookupResult | null> {
    const siteUrl = process.env.GSC_SITE_URL!;
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

    const response = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GSC_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      throw new Error(`GSC request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as {
      rows?: Array<{ position?: number }>;
    };

    const row = payload.rows?.[0];
    if (!row?.position) {
      return null;
    }

    return {
      position: Math.max(1, Math.round(row.position)),
      source: "gsc",
    };
  }

  private async lookupWithSerpApi(input: RankLookupInput): Promise<RankLookupResult | null> {
    const searchParams = new URLSearchParams({
      engine: "google",
      q: input.keyword,
      api_key: process.env.SERP_API_KEY!,
      num: "20",
    });

    if (input.location) {
      searchParams.set("location", input.location);
    }

    const response = await fetch(`https://serpapi.com/search.json?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error(`SerpAPI ranking request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as {
      organic_results?: Array<{ position?: number; link?: string; title?: string }>;
    };

    const result = (payload.organic_results ?? []).find((item) => (item.link ?? "").includes(input.slug));
    if (!result?.position) {
      return null;
    }

    return {
      position: result.position,
      source: "serpapi",
    };
  }

  private createMockPosition(keyword: string, slug: string) {
    const seed = `${keyword}:${slug}`
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);

    return (seed % 18) + 1;
  }
}

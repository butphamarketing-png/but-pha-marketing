import { Injectable } from "@nestjs/common";

export type AnalyticsOverview = {
  traffic: string;
  trafficChangePercent: number;
  conversions: number;
  source: "live" | "mock";
  sourceLabel: string;
};

@Injectable()
export class Ga4Service {
  async getOverview(): Promise<AnalyticsOverview> {
    const propertyId = process.env.GA4_PROPERTY_ID?.trim();
    const accessToken = process.env.GA4_ACCESS_TOKEN?.trim();

    if (!propertyId || !accessToken || process.env.AI_MOCK_MODE === "true") {
      return {
        traffic: "0",
        trafficChangePercent: 0,
        conversions: 0,
        source: "mock",
        sourceLabel: "GA4 mock",
      };
    }

    const [current, previous] = await Promise.all([
      this.runReport(propertyId, accessToken, "7daysAgo", "today"),
      this.runReport(propertyId, accessToken, "14daysAgo", "7daysAgo"),
    ]);

    const trafficChangePercent =
      previous.sessions > 0 ? Number((((current.sessions - previous.sessions) / previous.sessions) * 100).toFixed(1)) : 0;

    return {
      traffic: this.formatCompactNumber(current.sessions),
      trafficChangePercent,
      conversions: current.conversions,
      source: "live",
      sourceLabel: "GA4 live",
    };
  }

  private async runReport(
    propertyId: string,
    accessToken: string,
    startDate: string,
    endDate: string,
  ): Promise<{ sessions: number; conversions: number }> {
    const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propertyId)}:runReport`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: "sessions" },
          { name: "conversions" },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`GA4 request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as {
      rows?: Array<{ metricValues?: Array<{ value?: string }> }>;
    };

    const firstRow = payload.rows?.[0];
    const sessions = Number(firstRow?.metricValues?.[0]?.value ?? 0);
    const conversions = Number(firstRow?.metricValues?.[1]?.value ?? 0);

    return {
      sessions: Number.isFinite(sessions) ? sessions : 0,
      conversions: Number.isFinite(conversions) ? conversions : 0,
    };
  }

  private formatCompactNumber(value: number) {
    if (!Number.isFinite(value)) {
      return "0";
    }

    return new Intl.NumberFormat("vi-VN", {
      notation: value >= 1000 ? "compact" : "standard",
      maximumFractionDigits: value >= 1000 ? 1 : 0,
    }).format(value);
  }
}

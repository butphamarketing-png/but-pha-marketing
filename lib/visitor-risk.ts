import type { VisitorRiskLevel, VisitorRiskResult } from "@/lib/visitor-types";

const PRICING_PREFIXES = ["/website", "/facebook", "/google-maps", "/banggia"];

export const VISITOR_RISK_THRESHOLDS = {
  hitsWatch: 15,
  hitsAlert: 35,
  hits1hAlert: 20,
  pricingPathsWatch: 3,
  pricingPathsAlert: 5,
  banggiaVisitsWatch: 2,
} as const;

const BOT_UA =
  /bot|crawler|spider|headless|curl|wget|python-requests|scrapy|phantom|selenium|puppeteer/i;

function isPricingPath(path: string) {
  return PRICING_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

function countPricingPaths(paths: string[]) {
  return new Set(paths.filter(isPricingPath)).size;
}

function countBanggiaVisits(paths: string[]) {
  return paths.filter((p) => p === "/banggia" || p.startsWith("/banggia/")).length;
}

function isBotUserAgent(userAgent: string) {
  return BOT_UA.test(userAgent);
}

function levelFromScore(score: number, hits: number): VisitorRiskLevel {
  if (score >= 50 || hits >= VISITOR_RISK_THRESHOLDS.hitsAlert) return "alert";
  if (score >= 25 || hits >= VISITOR_RISK_THRESHOLDS.hitsWatch) return "watch";
  return "normal";
}

export function assessVisitorRisk(input: {
  hits: number;
  paths: string[];
  userAgent: string;
  countryCode: string | null;
  hitsLast1h?: number;
}): VisitorRiskResult {
  const flags: string[] = [];
  let score = 0;

  const pricingCount = countPricingPaths(input.paths);
  const banggiaCount = countBanggiaVisits(input.paths);

  if (input.hits >= VISITOR_RISK_THRESHOLDS.hitsAlert) {
    score += 35;
    flags.push(`Truy cập ${input.hits} lượt (cao)`);
  } else if (input.hits >= VISITOR_RISK_THRESHOLDS.hitsWatch) {
    score += 15;
    flags.push(`Truy cập ${input.hits} lượt`);
  }

  if (typeof input.hitsLast1h === "number" && input.hitsLast1h >= VISITOR_RISK_THRESHOLDS.hits1hAlert) {
    score += 25;
    flags.push(`${input.hitsLast1h} lượt trong 1 giờ qua`);
  }

  if (pricingCount >= VISITOR_RISK_THRESHOLDS.pricingPathsAlert) {
    score += 30;
    flags.push(`Xem ${pricingCount} nhóm trang giá/dịch vụ`);
  } else if (pricingCount >= VISITOR_RISK_THRESHOLDS.pricingPathsWatch) {
    score += 15;
    flags.push(`Xem ${pricingCount} trang giá/dịch vụ`);
  }

  if (banggiaCount >= VISITOR_RISK_THRESHOLDS.banggiaVisitsWatch) {
    score += 20;
    flags.push(`Vào /banggia ${banggiaCount} lần`);
  }

  if (isBotUserAgent(input.userAgent)) {
    score += 25;
    flags.push("User-agent giống bot/crawler");
  }

  if (input.countryCode && input.countryCode !== "VN") {
    score += 10;
    flags.push(`Truy cập từ nước ngoài (${input.countryCode})`);
  }

  return {
    score,
    level: levelFromScore(score, input.hits),
    flags,
  };
}

export function riskLevelLabel(level: VisitorRiskLevel) {
  if (level === "alert") return "Cảnh báo";
  if (level === "watch") return "Theo dõi";
  return "Bình thường";
}

export function riskLevelColor(level: VisitorRiskLevel) {
  if (level === "alert") return "#EF4444";
  if (level === "watch") return "#F59E0B";
  return "#10B981";
}

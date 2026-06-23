import { detectNewsTopic } from "./seo-article-helpers.mjs";
import { CUSTOMER_KEYWORDS_100 } from "./seo-customer-keywords-100.mjs";
import { MARKETING_SEEDS } from "./seo-marketing-seeds.mjs";
import { WEBSITE_SEEDS } from "./seo-website-seeds.mjs";
import { LA_GI_ENTRIES } from "./seo-la-gi-data.mjs";
import { LOCAL_SEO_ENTRIES } from "./seo-local-data.mjs";
import { INDUSTRY_ENTRIES } from "./seo-industry-data.mjs";
import { KEYWORD_ENTRIES } from "./seo-keyword-data.mjs";
import { LONGTAIL_GAP_ENTRIES } from "./seo-longtail-gaps.mjs";
import { buildRewriteArticle } from "./seo-rewrite-builder.mjs";
import { buildMarketingLongFormFromEntry } from "./seo-marketing-builder.mjs";
import { applyPillarClusterLinks } from "./pillar-cluster-links.mjs";

const localEntryBySlug = Object.fromEntries(LOCAL_SEO_ENTRIES.map((e) => [e.slug, e]));

const MARKETING_ONLY_SLUGS = new Set([
  "website-hay-fanpage",
  "google-ads-hay-facebook-ads",
  "seo-hay-google-ads",
]);

const REWRITE_SLUG_PREFIXES = ["thiet-ke-website", "bao-gia-thiet-ke", "bao-gia-website", "website-"];
const REWRITE_EXACT = new Set([
  "chuyen-nghiep-gia-tot",
  "gia-re-uy-tin",
  "quy-trinh-chuan-a-z",
  "chi-phi-duy-tri",
  "bao-mat-doanh-nghiep",
  "nang-cap-website-cu",
  "bao-nhieu-trang",
  "wordpress-vs-shopify",
  "tu-code-hay-template",
  "landing-hay-website-tong",
  "responsive-la-gi",
  "wordpress-la-gi",
  "website-la-gi",
  "ui-ux-la-gi",
]);

function expandWebsiteSeed(seed) {
  if (seed.niche === "guide" || seed.niche === "compare") {
    return { slug: seed.slug, keywordsMain: seed.keywordsMain, h1: seed.h1, angle: seed.angle, niche: seed.niche };
  }
  return {
    slug: `thiet-ke-website-${seed.slug}`,
    keywordsMain: seed.keywordsMain,
    h1: seed.h1,
    angle: seed.angle,
    niche: seed.niche,
  };
}

function buildEntryIndex() {
  const entries = [
    ...CUSTOMER_KEYWORDS_100,
    ...MARKETING_SEEDS,
    ...WEBSITE_SEEDS.map(expandWebsiteSeed),
    ...LA_GI_ENTRIES.map((e) => ({
      slug: e.slug,
      keywordsMain: e.keywordsMain,
      h1: e.h1,
      angle: e.definition?.slice(0, 100) || e.role?.slice(0, 100) || "khái niệm marketing số",
      niche: "seo",
    })),
    ...LOCAL_SEO_ENTRIES.map((e) => ({
      slug: e.slug,
      keywordsMain: e.keywordsMain,
      h1: e.h1,
      angle: e.definition?.slice(0, 100) || "tối ưu Google Maps và Local Pack",
      niche: "seo",
    })),
    ...INDUSTRY_ENTRIES.map((e) => ({
      slug: e.slug,
      keywordsMain: e.keywordsMain,
      h1: e.h1,
      angle: e.angle,
      niche: "strategy",
    })),
    ...KEYWORD_ENTRIES.map((e) => ({
      slug: e.slug,
      keywordsMain: e.keywordsMain,
      h1: e.h1,
      angle: e.angle,
      niche: "seo",
    })),
    ...LONGTAIL_GAP_ENTRIES,
  ];
  return new Map(entries.map((e) => [e.slug, e]));
}

const entryBySlug = buildEntryIndex();

export function shouldUseRewriteBuilder(slug) {
  if (MARKETING_ONLY_SLUGS.has(slug)) return false;
  if (slug.endsWith("-la-gi")) return true;
  if (REWRITE_EXACT.has(slug)) return true;
  return REWRITE_SLUG_PREFIXES.some((p) => slug.startsWith(p));
}

function inferNiche(slug, keywordsMain) {
  const topic = detectNewsTopic({ slug, keywordsMain, title: keywordsMain });
  if (topic === "facebook") return "facebook-ads";
  if (topic === "google-maps") return "seo";
  if (slug.includes("content") || slug.includes("copywriting")) return "content";
  if (slug.includes("brand")) return "branding";
  if (slug.includes("analytics") || slug.includes("kpi")) return "analytics";
  if (slug.includes("ads") || slug.includes("quang-cao")) return "google-ads";
  if (slug.includes("seo")) return "seo";
  return "strategy";
}

function syntheticEntry(row) {
  const keywordsMain = row.keywords_main || row.title;
  const description = row.description || "";
  const angle =
    description.replace(/^[^:]+:\s*/, "").trim().slice(0, 120) ||
    "triển khai hiệu quả, đo KPI và tối ưu liên tục cho doanh nghiệp Việt";
  return {
    slug: row.slug,
    keywordsMain,
    h1: row.title,
    angle,
    niche: inferNiche(row.slug, keywordsMain),
  };
}

function withPillarCluster(article) {
  const result = applyPillarClusterLinks({
    slug: article.slug,
    content: article.content,
    keywords_main: article.keywordsMain,
    title: article.title,
  });
  if (result.updated) {
    return { ...article, content: result.content };
  }
  return article;
}

/** @param {{ slug: string, title: string, keywords_main?: string, description?: string }} row */
export function upgradeArticle(row, index = 0) {
  const base = {
    slug: row.slug,
    title: row.title,
    keywordsMain: row.keywords_main || row.title,
    keywordsSecondary: `${row.keywords_main || row.title}, bứt phá marketing`,
    description: row.description || "",
  };

  let article;
  if (shouldUseRewriteBuilder(row.slug)) {
    article = buildRewriteArticle(base);
  } else {
    const localEntry = localEntryBySlug[row.slug];
    const entry =
      entryBySlug.get(row.slug) ||
      (localEntry
        ? {
            slug: localEntry.slug,
            keywordsMain: localEntry.keywordsMain,
            h1: localEntry.h1,
            angle: localEntry.definition?.slice(0, 100) || "tối ưu Google Maps và Local Pack",
            niche: "seo",
            faq: localEntry.faq,
          }
        : null) ||
      syntheticEntry({ ...row, title: row.title, keywords_main: row.keywordsMain });
    article = buildMarketingLongFormFromEntry(entry, index);
  }

  return withPillarCluster(article);
}

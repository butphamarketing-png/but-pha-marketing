/**
 * Resolve keywordsMain cụ thể từ slug — tránh cannibalization head term "thiết kế website".
 */
import { KEYWORDS_200 } from "./seo-keywords-200.mjs";
import { CUSTOMER_KEYWORDS_100 } from "./seo-customer-keywords-100.mjs";
import { INDUSTRY_ENTRIES } from "./seo-industry-data.mjs";
import { KEYWORD_ENTRIES } from "./seo-keyword-data.mjs";
import { WEBSITE_SEEDS } from "./seo-website-seeds.mjs";
import { LONGTAIL_GAP_ENTRIES } from "./seo-longtail-gaps.mjs";
import { SEO_PILLARS, PILLAR_SLUG_SET } from "./seo-pillar-hub.mjs";
import { normalizeKeyword, keywordInText } from "./seo-article-helpers.mjs";

/** Slug giữ nguyên keywords_main — không sửa pillar. */
export const KEYWORD_FIX_SKIP_SLUGS = new Set([...PILLAR_SLUG_SET]);

const HEAD_TERMS = new Set([
  "thiet ke website",
  "lam website",
  "thiet ke web",
  "lam web",
  "website",
  "bao gia website",
  "bao gia thiet ke website",
]);

const CITY_TOKENS = {
  tphcm: "TPHCM",
  "ha-noi": "Hà Nội",
  "da-nang": "Đà Nẵng",
  "can-tho": "Cần Thơ",
  "binh-duong": "Bình Dương",
  "hai-phong": "Hải Phòng",
  "dong-nai": "Đồng Nai",
  "vung-tau": "Vũng Tàu",
  hue: "Huế",
  "long-an": "Long An",
  "bac-ninh": "Bắc Ninh",
};

const SLUG_PREFIX_RULES = [
  { prefix: "thiet-ke-website-", kwPrefix: "thiết kế website " },
  { prefix: "bao-gia-thiet-ke-website-", kwPrefix: "báo giá thiết kế website " },
  { prefix: "bao-gia-website-", kwPrefix: "báo giá website " },
  { prefix: "chi-phi-thiet-ke-website-", kwPrefix: "chi phí thiết kế website " },
  { prefix: "chi-phi-lam-website-", kwPrefix: "chi phí làm website " },
  { prefix: "lam-website-", kwPrefix: "làm website " },
  { prefix: "quy-trinh-thiet-ke-website-", kwPrefix: "quy trình thiết kế website " },
];

/** @type {Map<string, { keywordsMain: string, h1?: string }>} */
const SLUG_KEYWORD_MAP = new Map();

function register(slug, keywordsMain, h1) {
  if (!slug || !keywordsMain) return;
  const existing = SLUG_KEYWORD_MAP.get(slug);
  if (!existing || keywordsMain.length >= existing.keywordsMain.length) {
    SLUG_KEYWORD_MAP.set(slug, { keywordsMain: keywordsMain.trim(), h1: h1?.trim() });
  }
}

export function isGenericWebsiteKeyword(keywordsMain) {
  const n = normalizeKeyword(keywordsMain);
  if (!n) return true;
  if (HEAD_TERMS.has(n)) return true;
  return false;
}

for (const entry of KEYWORDS_200) {
  register(entry.slug, entry.keywordsMain, entry.h1);
}
for (const entry of CUSTOMER_KEYWORDS_100) {
  register(entry.slug, entry.keywordsMain, entry.h1);
}
for (const entry of KEYWORD_ENTRIES) {
  register(entry.slug, entry.keywordsMain, entry.h1);
}
for (const entry of LONGTAIL_GAP_ENTRIES) {
  register(entry.slug, entry.keywordsMain, entry.h1);
}
for (const entry of WEBSITE_SEEDS) {
  register(`thiet-ke-website-${entry.slug}`, entry.keywordsMain, entry.h1);
}
for (const entry of INDUSTRY_ENTRIES) {
  const fromSecondary = (entry.keywordsSecondary || "").split(",")[0].trim();
  let kw;
  if (fromSecondary && keywordInText(fromSecondary, "thiết kế website")) {
    kw = fromSecondary;
  } else if (entry.industry) {
    kw = `thiết kế website ${entry.industry}`;
  } else if (fromSecondary?.toLowerCase().startsWith("website ")) {
    kw = `thiết kế ${fromSecondary}`;
  } else {
    kw = inferFromSlug(entry.slug);
  }
  register(entry.slug, kw, entry.h1);
}
for (const pillar of SEO_PILLARS) {
  register(pillar.slug, pillar.keyword);
}

function tokenToPhrase(token) {
  if (CITY_TOKENS[token]) return CITY_TOKENS[token];
  if (token === "la-gi") return "là gì";
  if (token === "uy-tin") return "uy tín";
  if (token === "chuan-seo") return "chuẩn SEO";
  if (token === "tron-goi") return "trọn gói";
  if (token === "ban-hang") return "bán hàng";
  if (token === "theo-yeu-cau") return "theo yêu cầu";
  return token.replace(/-/g, " ");
}

export function inferFromSlug(slug) {
  for (const rule of SLUG_PREFIX_RULES) {
    if (!slug.startsWith(rule.prefix)) continue;
    const suffix = slug.slice(rule.prefix.length);
    if (!suffix) return null;
    if (suffix === "la-gi") return `${rule.kwPrefix.trim()} là gì`.replace(/\s+/g, " ").trim();
    const phrase = suffix
      .split("-")
      .map(tokenToPhrase)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    return `${rule.kwPrefix}${phrase}`.replace(/\s+/g, " ").trim();
  }

  if (slug === "thiet-ke-website-la-gi") return "thiết kế website là gì";
  if (slug === "website-la-gi") return "website là gì";

  return null;
}

function secondaryToKeywordsMain(secondary, slug) {
  const s = (secondary || "").split(",")[0].trim();
  if (!s || isGenericWebsiteKeyword(s)) return null;
  if (keywordInText(s, "thiết kế website") || keywordInText(s, "báo giá")) return s;
  if (s.toLowerCase().startsWith("website ") && slug.startsWith("thiet-ke-website-")) {
    return `thiết kế ${s}`;
  }
  return null;
}

export function resolveKeywordsMain(slug, row = {}) {
  if (KEYWORD_FIX_SKIP_SLUGS.has(slug)) {
    return (row.keywords_main || SLUG_KEYWORD_MAP.get(slug)?.keywordsMain || "").trim();
  }

  const mapped = SLUG_KEYWORD_MAP.get(slug);
  if (mapped?.keywordsMain && !isGenericWebsiteKeyword(mapped.keywordsMain)) {
    return mapped.keywordsMain;
  }

  const inferred = inferFromSlug(slug);
  if (inferred && !isGenericWebsiteKeyword(inferred)) {
    return inferred;
  }

  const fromSecondary = secondaryToKeywordsMain(row.keywords_secondary, slug);
  if (fromSecondary) return fromSecondary;

  return (row.keywords_main || mapped?.keywordsMain || "").trim();
}

export function resolveTitleH1(slug, keywordsMain, currentTitle = "") {
  if (keywordInText(currentTitle, keywordsMain)) return currentTitle;
  const mapped = SLUG_KEYWORD_MAP.get(slug);
  if (mapped?.h1 && keywordInText(mapped.h1, keywordsMain)) return mapped.h1;
  return currentTitle;
}

export function needsCannibalizationFix(row) {
  const slug = row.slug || "";
  if (KEYWORD_FIX_SKIP_SLUGS.has(slug)) return false;

  const current = (row.keywords_main || "").trim();
  const target = resolveKeywordsMain(slug, row);

  if (!target) return false;
  if (normalizeKeyword(current) === normalizeKeyword(target)) return false;

  if (isGenericWebsiteKeyword(current)) return true;

  return false;
}

export function buildKeywordsMainFix(row) {
  const slug = row.slug || "";
  const keywordsMain = resolveKeywordsMain(slug, row);
  const title = resolveTitleH1(slug, keywordsMain, row.title || "");
  const nextTitle =
    title && keywordInText(title, keywordsMain)
      ? title
      : `${keywordsMain.charAt(0).toUpperCase() + keywordsMain.slice(1)}`;

  let keywordsSecondary = (row.keywords_secondary || "").trim();
  if (keywordsSecondary && !keywordInText(keywordsSecondary, keywordsMain)) {
    keywordsSecondary = `${keywordsMain}, ${keywordsSecondary}`;
  } else if (!keywordsSecondary) {
    keywordsSecondary = keywordsMain;
  }

  return {
    slug,
    keywordsMain,
    title: nextTitle,
    keywordsSecondary,
    mapped: SLUG_KEYWORD_MAP.get(slug),
  };
}

export { SLUG_KEYWORD_MAP };

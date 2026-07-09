/**
 * Resolve INDUSTRY_ENTRIES từ slug bài blog (kể cả batch city suffix).
 */
import { INDUSTRY_ENTRIES } from "./seo-industry-data.mjs";

const industryBySlug = Object.fromEntries(INDUSTRY_ENTRIES.map((e) => [e.slug, e]));

/** Hub / landing slug → blog money slug trong INDUSTRY_ENTRIES */
const HUB_TO_BLOG_SLUG = {
  "nha-khoa": "thiet-ke-website-nha-khoa",
  spa: "thiet-ke-website-spa",
  "tham-my": "thiet-ke-website-tham-my-vien",
  "phong-kham": "thiet-ke-website-phong-kham-da-khoa",
  "xay-dung": "thiet-ke-website-cong-ty-xay-dung",
  "my-pham": "thiet-ke-website-my-pham",
  pccc: "thiet-ke-website-pccc",
  logistics: "thiet-ke-website-van-tai",
  "co-khi": "thiet-ke-website-co-khi",
  "bao-bi": "thiet-ke-website-bao-bi",
  luat: "thiet-ke-website-cong-ty-luat",
  "thang-may": "thiet-ke-website-thang-may",
  "tu-dong-hoa": "thiet-ke-website-tu-dong-hoa",
  "nha-hang": "thiet-ke-website-nha-hang",
  "bat-dong-san": "thiet-ke-website-bat-dong-san",
  "anh-ngu": "thiet-ke-website-trung-tam-anh-ngu",
  "khach-san": "thiet-ke-website-khach-san",
  "noi-that": "thiet-ke-website-noi-that",
  "o-to": "thiet-ke-website-gara-o-to",
  "thiet-bi-ve-sinh": "thiet-ke-website-thiet-bi-ve-sinh",
  "in-an": "thiet-ke-website-in-an-quang-cao",
};

const CITY_SUFFIX_RE =
  /-(quy-nhon|buon-ma-thuot|quang-ngai|ha-giang|lao-cai|yen-bai|lang-son|thai-nguyen|viet-tri|sam-son|pleiku|da-lat|dak-nong|nha-trang|hue|da-nang|binh-thuan|binh-phuoc|quang-nam|hoi-an|cao-bang|bac-kan|tuyen-quang|dien-bien|son-la|hoa-binh|bac-giang|bac-ninh|hai-phong|ha-long|phu-quoc|long-xuyen|soc-trang|ben-tre|tra-vinh|vinh-long|tien-giang|dong-xoai|tan-an|bac-lieu|bien-hoa|ca-mau|hai-duong|hung-yen|ninh-binh|nam-dinh|thanh-hoa|vinh|quang-binh|quang-tri|kon-tum|gia-lai|ho-chi-minh|ha-noi|tp-hcm|tphcm|can-tho|da-nang|hcm)$/i;

const BATCH_SUFFIX_RE = /-b\d+$/i;

/** Các token ngành trong slug batch (ưu tiên dài trước) */
const SLUG_INDUSTRY_KEYS = [
  ...Object.keys(HUB_TO_BLOG_SLUG),
  "phong-kham-da-khoa",
  "phong-kham",
  "tham-my-vien",
  "tham-my",
  "nha-khoa",
  "cong-ty-xay-dung",
  "xay-dung",
  "gia-cong-cnc",
  "co-khi",
  "van-tai",
  "logistics",
  "cong-ty-luat",
  "trung-tam-anh-ngu",
  "anh-ngu",
  "bat-dong-san",
  "nha-hang",
  "khach-san",
  "gara-o-to",
  "thiet-bi-ve-sinh",
  "in-an-quang-cao",
  "in-an",
  "my-pham",
  "noi-that",
  "bao-bi",
  "thang-may",
  "tu-dong-hoa",
  "pccc",
  "spa",
].sort((a, b) => b.length - a.length);

function stripSlugSuffixes(slug) {
  let s = slug;
  s = s.replace(/^bao-gia-thiet-ke-website-/, "").replace(/^thiet-ke-website-/, "");
  s = s.replace(CITY_SUFFIX_RE, "");
  s = s.replace(BATCH_SUFFIX_RE, "");
  return s;
}

function blogSlugFromIndustryKey(key) {
  if (HUB_TO_BLOG_SLUG[key]) return HUB_TO_BLOG_SLUG[key];
  if (industryBySlug[`thiet-ke-website-${key}`]) return `thiet-ke-website-${key}`;
  return null;
}

/**
 * @param {string} slug
 * @returns {typeof INDUSTRY_ENTRIES[0] | undefined}
 */
export function resolveIndustryEntryFromSlug(slug) {
  if (!slug) return undefined;
  if (industryBySlug[slug]) return industryBySlug[slug];

  const stripped = stripSlugSuffixes(slug);
  for (const key of SLUG_INDUSTRY_KEYS) {
    if (stripped === key || stripped.startsWith(`${key}-`) || stripped.endsWith(`-${key}`) || stripped.includes(`-${key}-`)) {
      const blogSlug = blogSlugFromIndustryKey(key);
      if (blogSlug && industryBySlug[blogSlug]) return industryBySlug[blogSlug];
    }
  }

  const direct = `thiet-ke-website-${stripped}`;
  if (industryBySlug[direct]) return industryBySlug[direct];

  return undefined;
}

export { HUB_TO_BLOG_SLUG, industryBySlug };

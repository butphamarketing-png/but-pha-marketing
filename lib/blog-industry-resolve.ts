/**
 * TS mirror of scripts/seo-industry-resolve.mjs — dùng cho metadata/sitemap (không import .mjs).
 */

/** Toàn bộ money slug từ scripts/seo-industry-data.mjs */
const INDUSTRY_MONEY_SLUGS = new Set([
  "thiet-ke-website-spa",
  "thiet-ke-website-nha-khoa",
  "thiet-ke-website-tham-my-vien",
  "thiet-ke-website-phong-kham-da-khoa",
  "thiet-ke-website-nha-hang",
  "thiet-ke-website-khach-san",
  "thiet-ke-website-resort",
  "thiet-ke-website-cong-ty-xay-dung",
  "thiet-ke-website-kien-truc-noi-that",
  "thiet-ke-website-co-khi",
  "thiet-ke-website-gia-cong-cnc",
  "thiet-ke-website-bat-dong-san",
  "thiet-ke-website-cong-ty-luat",
  "thiet-ke-website-trung-tam-anh-ngu",
  "thiet-ke-website-truong-mam-non",
  "thiet-ke-website-dien-nuoc",
  "thiet-ke-website-thiet-bi-ve-sinh",
  "thiet-ke-website-gach-op-lat",
  "thiet-ke-website-du-lich",
  "thiet-ke-website-xuat-nhap-khau",
  "thiet-ke-website-gara-o-to",
  "thiet-ke-website-salon-toc",
  "thiet-ke-website-my-pham",
  "thiet-ke-website-van-tai",
  "thiet-ke-website-bao-ve",
  "thiet-ke-website-ve-sinh-cong-nghiep",
  "thiet-ke-website-noi-that",
  "thiet-ke-website-nhom-kinh",
  "thiet-ke-website-cua-cuon",
  "thiet-ke-website-pccc",
  "thiet-ke-website-ho-ca-koi",
  "thiet-ke-website-dien-nang-luong-mat-troi",
  "thiet-ke-website-camera-an-ninh",
  "thiet-ke-website-may-loc-nuoc",
  "thiet-ke-website-dien-thoai",
  "thiet-ke-website-laptop-may-tinh",
  "thiet-ke-website-du-hoc",
  "thiet-ke-website-ke-toan",
  "thiet-ke-website-thanh-lap-cong-ty",
  "thiet-ke-website-bao-hiem",
  "thiet-ke-website-phong-gym",
  "thiet-ke-website-yoga-fitness",
  "thiet-ke-website-ngoai-ngu",
  "thiet-ke-website-may-lanh",
  "thiet-ke-website-chuyen-nha",
  "thiet-ke-website-moi-truong",
  "thiet-ke-website-diet-con-trung",
  "thiet-ke-website-qua-tang-doanh-nghiep",
  "thiet-ke-website-in-an-quang-cao",
  "thiet-ke-website-su-kien",
  "thiet-ke-website-ao-cuoi",
  "thiet-ke-website-chup-anh-cuoi",
  "thiet-ke-website-me-va-be",
  "thiet-ke-website-nha-thuoc",
  "thiet-ke-website-duoc-pham",
  "thiet-ke-website-nong-san-sach",
  "thiet-ke-website-thuy-hai-san",
  "thiet-ke-website-bao-bi",
  "thiet-ke-website-may-mac",
  "thiet-ke-website-go-noi-that",
  "thiet-ke-website-thang-may",
  "thiet-ke-website-son-nuoc",
  "thiet-ke-website-vat-lieu-xay-dung",
  "thiet-ke-website-coc-khoan-nhoi",
  "thiet-ke-website-chong-tham",
  "thiet-ke-website-mai-hien-mai-xep",
  "thiet-ke-website-cua-kinh-cuong-luc",
  "thiet-ke-website-cua-nhua-composite",
  "thiet-ke-website-noi-that-van-phong",
  "thiet-ke-website-den-trang-tri",
  "thiet-ke-website-dien-cong-nghiep",
  "thiet-ke-website-tu-dong-hoa",
  "thiet-ke-website-may-phat-dien",
  "thiet-ke-website-may-nen-khi",
  "thiet-ke-website-can-dien-tu",
  "thiet-ke-website-thiet-bi-cong-nghiep",
  "thiet-ke-website-hoa-chat-cong-nghiep",
  "thiet-ke-website-dong-phuc",
  "thiet-ke-website-in-dong-phuc",
  "thiet-ke-website-quang-cao-ngoai-troi",
  "thiet-ke-website-bien-hieu-quang-cao",
  "thiet-ke-website-digital-marketing",
  "thiet-ke-website-dich-vu-seo",
  "thiet-ke-website-phan-mem",
  "thiet-ke-website-camera-ai",
  "thiet-ke-website-thiet-bi-pccc",
  "thiet-ke-website-bao-tri-toa-nha",
  "thiet-ke-website-quan-ly-chung-cu",
  "thiet-ke-website-cay-xanh-canh-quan",
  "thiet-ke-website-da-hoa-cuong",
]);

const industryBySlug = Object.fromEntries([...INDUSTRY_MONEY_SLUGS].map((slug) => [slug, slug]));

const HUB_TO_BLOG_SLUG: Record<string, string> = {
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
  /-(quy-nhon|buon-ma-thuot|quang-ngai|ha-giang|lao-cai|yen-bai|lang-son|thai-nguyen|viet-tri|sam-son|pleiku|da-lat|dak-nong|nha-trang|hue|da-nang|binh-thuan|binh-phuoc|quang-nam|hoi-an|cao-bang|bac-kan|tuyen-quang|dien-bien|son-la|hoa-binh|bac-giang|bac-ninh|hai-phong|ha-long|phu-quoc|long-xuyen|soc-trang|ben-tre|tra-vinh|vinh-long|tien-giang|dong-xoai|tan-an|bac-lieu|bien-hoa|ca-mau|hai-duong|hung-yen|ninh-binh|nam-dinh|thanh-hoa|vinh|quang-binh|quang-tri|kon-tum|gia-lai|ho-chi-minh|ha-noi|tp-hcm|tphcm|can-tho|hcm|binh-duong|dong-nai|vung-tau|ba-ria|long-an|an-giang|kien-giang|tay-ninh|binh-dinh|phu-yen|khanh-hoa|bac-lieu)$/i;

const BATCH_SUFFIX_RE = /-b\d+$/i;

const SLUG_INDUSTRY_KEYS = [
  ...Object.keys(HUB_TO_BLOG_SLUG),
  ...[...INDUSTRY_MONEY_SLUGS].map((slug) => slug.replace(/^thiet-ke-website-/, "")),
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
]
  .filter((v, i, arr) => arr.indexOf(v) === i)
  .sort((a, b) => b.length - a.length);

function stripSlugSuffixes(slug: string): string {
  let s = slug.replace(/^bao-gia-thiet-ke-website-/, "").replace(/^thiet-ke-website-/, "");
  s = s.replace(CITY_SUFFIX_RE, "");
  s = s.replace(BATCH_SUFFIX_RE, "");
  return s;
}

function blogSlugFromIndustryKey(key: string): string | null {
  if (HUB_TO_BLOG_SLUG[key]) return HUB_TO_BLOG_SLUG[key];
  const direct = `thiet-ke-website-${key}`;
  if (industryBySlug[direct]) return direct;
  return null;
}

/** @returns blog money slug nếu map được ngành từ slug long-tail */
export function resolveIndustryBlogSlug(slug: string): string | null {
  if (!slug) return null;
  if (industryBySlug[slug]) return slug;

  const stripped = stripSlugSuffixes(slug);
  for (const key of SLUG_INDUSTRY_KEYS) {
    if (
      stripped === key ||
      stripped.startsWith(`${key}-`) ||
      stripped.endsWith(`-${key}`) ||
      stripped.includes(`-${key}-`)
    ) {
      const blogSlug = blogSlugFromIndustryKey(key);
      if (blogSlug) return blogSlug;
    }
  }

  const direct = `thiet-ke-website-${stripped}`;
  if (industryBySlug[direct]) return direct;

  return null;
}

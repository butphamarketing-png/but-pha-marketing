const SITE = "https://www.butphamarketing.com";
const FB = "https://www.facebook.com/butphamarketing";
const ZALO = "https://zalo.me/0937417982";
const NEWS_DIR = "/tin-tuc";

function newsImageUrl(filename) {
  return `${SITE}${NEWS_DIR}/${filename}`;
}

function newsImagePath(filename) {
  return `${NEWS_DIR}/${filename}`;
}

const THUMBNAIL_FILES = {
  website: "thiet-ke-website.png",
  facebook: "facebook-marketing.png",
  "google-maps": "google-maps-marketing.png",
  marketing: "tin-tuc-marketing.png",
};

const CONTENT_IMAGE_FILES = {
  website: [
    "thiet-ke-website.png",
    ...Array.from({ length: 10 }, (_, i) => `thiet-ke-website-${i + 1}.png`),
  ],
  facebook: [
    "facebook-marketing.png",
    ...Array.from({ length: 8 }, (_, i) => `facebook-marketing-${i + 1}.png`),
  ],
  "google-maps": [
    "google-maps-marketing.png",
    ...Array.from({ length: 5 }, (_, i) => `google-maps-marketing-${i + 1}.png`),
  ],
  marketing: ["tin-tuc-marketing.png"],
};

/** Thumbnail danh sách tin tức / blog card / OG — marketing tổng quát */
export const NEWS_THUMBNAIL = newsImageUrl(THUMBNAIL_FILES.marketing);

/** Đường dẫn tương đối thumbnail (dùng khi cần path ngắn) */
export const NEWS_THUMBNAIL_PATH = newsImagePath(THUMBNAIL_FILES.marketing);

/** Ảnh minh họa website trong nội dung bài viết (public/tin-tuc) */
export const NEWS_CONTENT_IMAGES = CONTENT_IMAGE_FILES.website.map(newsImagePath);

export const NEWS_CONTENT_IMAGE_COUNT = NEWS_CONTENT_IMAGES.length;

export function detectNewsTopic(input = {}) {
  const slug = normalizeKeyword(input.slug || "");
  const keywords = normalizeKeyword(
    [input.keywordsMain, input.keywordsSecondary, input.title, input.niche].filter(Boolean).join(" "),
  );

  if (
    slug.startsWith("thiet-ke-website") ||
    slug.startsWith("website-") ||
    slug.startsWith("bao-gia-thiet-ke") ||
    slug.startsWith("quy-trinh-thiet-ke")
  ) {
    return "website";
  }

  const googleMapsSlug =
    slug.startsWith("marketing-seo-local") ||
    slug.startsWith("seo-local") ||
    slug.includes("google-maps") ||
    slug.startsWith("seo-maps") ||
    slug.startsWith("seo-dia-phuong") ||
    slug.startsWith("local-pack") ||
    slug.startsWith("nap-seo") ||
    slug.startsWith("local-citation") ||
    slug.startsWith("danh-gia-google-maps") ||
    slug.startsWith("dang-ky-google-maps") ||
    slug.startsWith("cach-dua-doanh-nghiep-len-google-maps") ||
    slug.startsWith("tang-hang-google-maps") ||
    slug.startsWith("google-maps-marketing") ||
    slug.startsWith("embed-google-maps") ||
    slug.startsWith("quang-cao-google-maps") ||
    slug.startsWith("gan-toi-google-maps") ||
    slug.startsWith("checklist-seo-local") ||
    slug.startsWith("local-seo");

  if (googleMapsSlug) return "google-maps";

  const facebookSlug =
    slug.includes("facebook") ||
    slug.includes("fanpage") ||
    slug.includes("meta-ads") ||
    slug.includes("pixel-facebook") ||
    (slug.includes("instagram") && !slug.includes("website"));

  if (facebookSlug) return "facebook";

  if (
    keywords.includes("google maps") ||
    keywords.includes("google-maps") ||
    keywords.includes("seo maps") ||
    keywords.includes("seo local") ||
    keywords.includes("local pack") ||
    keywords.includes("google business") ||
    keywords.includes("maps marketing") ||
    keywords.includes("danh gia google maps") ||
    keywords.includes("seo dia phuong")
  ) {
    const websiteMapsArticle =
      keywords.includes("thiet ke website") &&
      !keywords.includes("google maps marketing") &&
      !keywords.includes("seo local");
    if (!websiteMapsArticle) return "google-maps";
  }

  if (
    keywords.includes("facebook") ||
    keywords.includes("fanpage") ||
    keywords.includes("meta ads") ||
    keywords.includes("pixel facebook") ||
    keywords.includes("quang cao facebook") ||
    keywords.includes("marketing facebook") ||
    keywords.includes("instagram ads")
  ) {
    return "facebook";
  }

  if (
    keywords.includes("thiet ke website") ||
    keywords.includes("wordpress") ||
    keywords.includes("landing page") ||
    keywords.includes("responsive") ||
    keywords.includes("web design") ||
    keywords.includes("bao gia website")
  ) {
    return "website";
  }

  if (input.niche === "facebook-ads") return "facebook";
  if (input.niche === "social" && keywords.includes("facebook")) return "facebook";

  return "marketing";
}

export function newsThumbnailPath(topic = "marketing") {
  return newsImagePath(THUMBNAIL_FILES[topic] || THUMBNAIL_FILES.marketing);
}

export function newsThumbnailUrl(topic = "marketing") {
  return newsImageUrl(THUMBNAIL_FILES[topic] || THUMBNAIL_FILES.marketing);
}

export function newsContentImagesForTopic(topic = "website") {
  const files = CONTENT_IMAGE_FILES[topic] || CONTENT_IMAGE_FILES.marketing;
  return files.map(newsImagePath);
}

export function newsThumbnailForArticle(article = {}) {
  return newsThumbnailUrl(detectNewsTopic(article));
}

export function newsContentImageCountForTopic(topic = "website") {
  return newsContentImagesForTopic(topic).length;
}

export function normalizeKeyword(keyword) {
  return String(keyword || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

/** Từ khóa chính phải có trong title, meta, description, alt (so khớp không dấu, không phân biệt hoa thường). */
export function keywordInText(text, keyword) {
  const hay = normalizeKeyword(text);
  const needle = normalizeKeyword(keyword);
  return Boolean(needle && hay.includes(needle));
}

export function altFromKeyword(keywordsMain) {
  const kw = String(keywordsMain || "").trim();
  if (!kw) return "Thiết kế website Bứt Phá Marketing";
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

/** Alt ảnh có từ khóa chính — dùng cho wpImg / validate SEO. */
export function seoImageAlt(keywordsMain, detail) {
  const base = altFromKeyword(keywordsMain);
  const text = String(detail || "").trim();
  if (!text) return base;
  if (keywordInText(text, keywordsMain)) return text;
  return `${base} — ${text}`;
}

/** Meta title gọn cho SERP (~55 ký tự trước brand). */
export function buildSeoMetaTitle(primary, brand = "Bứt Phá") {
  const suffix = ` | ${brand}`;
  const maxPrimary = 60 - suffix.length;
  let head = String(primary || "").trim();
  if (head.length > maxPrimary) {
    head = head.slice(0, maxPrimary).replace(/\s+\S*$/, "").trim();
  }
  return `${head}${suffix}`;
}

export function validateSeoKeywordPlacement({
  keywordsMain,
  title,
  metaTitle,
  metaDescription,
  description,
  imageAlts = [],
  html = "",
}) {
  const missing = [];
  if (!keywordInText(title, keywordsMain)) missing.push("title/H1");
  if (!keywordInText(metaTitle || title, keywordsMain)) missing.push("metaTitle");
  const desc = metaDescription || description || "";
  if (!keywordInText(desc, keywordsMain)) missing.push("description");
  const alts =
    imageAlts.length > 0
      ? imageAlts
      : [...String(html).matchAll(/alt="([^"]+)"/g)].map((m) => m[1]);
  if (alts.length === 0 || !alts.every((alt) => keywordInText(alt, keywordsMain))) {
    missing.push("alt ảnh");
  }
  if (metaTitle && metaTitle.length > 65) missing.push("metaTitle dài (>65)");
  if (metaDescription && metaDescription.length > 160) missing.push("metaDescription dài (>160)");
  return { ok: missing.length === 0, missing };
}

export function wrapArticle({ metaTitle, html }) {
  return `<!-- BUTPHA_META ${JSON.stringify({ metaTitle })} -->\n${html}`;
}

export function img(index, alt, topic = "website") {
  const pool = newsContentImagesForTopic(topic);
  const src = pool[index % pool.length];
  const safeAlt = alt || "Thiết kế website Bứt Phá Marketing";
  return `<figure class="my-6"><img src="${src}" alt="${safeAlt}" loading="lazy" width="1200" height="675" class="w-full rounded-2xl border border-indigo-100" /><figcaption class="mt-2 text-center text-sm text-slate-500">${safeAlt}</figcaption></figure>`;
}

export function toc(items) {
  const lis = items
    .map((item) => `<li><a href="#${item.id}">${item.label}</a></li>`)
    .join("\n");
  return `<nav aria-label="Mục lục" class="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5"><h2 id="muc-luc" class="text-lg font-bold text-indigo-950">Mục lục</h2><ol class="mt-3 list-decimal space-y-1 pl-5 text-indigo-900">${lis}</ol></nav>`;
}

export function internalLinks() {
  return `<p>Bạn có thể tìm hiểu thêm dịch vụ tại <a href="${SITE}/">trang chủ Bứt Phá Marketing</a>, đọc <a href="${SITE}/gioi-thieu">giới thiệu về đội ngũ</a> hoặc xem chi tiết <a href="${SITE}/website">gói thiết kế website</a> phù hợp mô hình kinh doanh.</p>`;
}

export function externalLinks() {
  return `<p>Liên hệ nhanh qua <a href="${ZALO}" rel="noopener">Zalo tư vấn 0937417982</a> hoặc theo dõi cập nhật tại <a href="${FB}" rel="noopener">Fanpage Bứt Phá Marketing</a> để nhận case study và ưu đãi mới.</p>`;
}

export { SITE, FB, ZALO };

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

/** Thumbnail danh sách tin tức / blog card / OG */
export const NEWS_THUMBNAIL = newsImageUrl("tin-tuc-marketing.png");

/** Đường dẫn tương đối thumbnail (dùng khi cần path ngắn) */
export const NEWS_THUMBNAIL_PATH = newsImagePath("tin-tuc-marketing.png");

/** Ảnh minh họa trong nội dung bài viết (public/tin-tuc) */
export const NEWS_CONTENT_IMAGES = [
  newsImagePath("thiet-ke-website.png"),
  ...Array.from({ length: 10 }, (_, i) => newsImagePath(`thiet-ke-website-${i + 1}.png`)),
];

export const NEWS_CONTENT_IMAGE_COUNT = NEWS_CONTENT_IMAGES.length;

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

export function validateSeoKeywordPlacement({
  keywordsMain,
  title,
  metaTitle,
  metaDescription,
  description,
  imageAlts = [],
}) {
  const missing = [];
  if (!keywordInText(title, keywordsMain)) missing.push("title/H1");
  if (!keywordInText(metaTitle || title, keywordsMain)) missing.push("metaTitle");
  const desc = metaDescription || description || "";
  if (!keywordInText(desc, keywordsMain)) missing.push("description");
  if (imageAlts.length === 0 || !imageAlts.every((alt) => keywordInText(alt, keywordsMain))) {
    missing.push("alt ảnh");
  }
  return { ok: missing.length === 0, missing };
}

export function wrapArticle({ metaTitle, html }) {
  return `<!-- BUTPHA_META ${JSON.stringify({ metaTitle })} -->\n${html}`;
}

export function img(index, alt) {
  const src = NEWS_CONTENT_IMAGES[index % NEWS_CONTENT_IMAGE_COUNT];
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

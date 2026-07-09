/**
 * Generator for seo-keywords-500-batch13.mjs and batch14.mjs
 * Batch 13: Technical SEO, Content marketing, YouTube — Bắc Trung Bộ / Tây Nguyên
 * Batch 14: Ecommerce, Shopee/Lazada, Sales funnel — Đông Nam Bộ / Tây Nam Bộ
 * Run: node scripts/_gen-batch1314.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { B13_EXTRA, B13_MAPS, B13_COMPARE, B13_PAIN, B13_LAGI, B14_ALL } from "./_gen-batch1314-data.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));

function cap(kw) {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

function validate(name, entries) {
  if (entries.length !== 500) throw new Error(`${name}: expected 500, got ${entries.length}`);
  const slugs = entries.map((e) => e.slug);
  const dups = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (dups.length) throw new Error(`${name} duplicate slugs: ${[...new Set(dups)].join(", ")}`);
  const kws = entries.map((e) => e.keywordsMain.toLowerCase());
  const kdup = kws.filter((s, i) => kws.indexOf(s) !== i);
  if (kdup.length) throw new Error(`${name} duplicate keywords: ${[...new Set(kdup)].join(", ")}`);
}

function emitBatch(batchNum, header, helpers, sections, exportName) {
  const parts = sections.flatMap((s) => s.entries);
  validate(exportName, parts);
  const body = `/**
 * ${header}
 * Export: ${exportName}
 */

${helpers}

${sections.map((s) => `/** ${s.label} */\nconst ${s.name} = ${JSON.stringify(s.entries, null, 2)};`).join("\n\n")}

export const ${exportName} = [
${sections.map((s) => `  ...${s.name},`).join("\n")}
];

export const ${exportName}_MARKETING_ONLY = new Set([
${sections.filter((s) => s.marketing).map((s) => `  ...${s.name}.map((e) => e.slug),`).join("\n")}
]);

const EXPECTED = 500;
if (${exportName}.length !== EXPECTED) {
  throw new Error(\`${exportName} expected \${EXPECTED} entries, got \${${exportName}.length}\`);
}

const slugSet = new Set(${exportName}.map((e) => e.slug));
if (slugSet.size !== ${exportName}.length) {
  const dupes = ${exportName}.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(\`${exportName} duplicate slugs: \${[...new Set(dupes)].join(", ")}\`);
}

const kwSet = new Set(${exportName}.map((e) => e.keywordsMain.toLowerCase()));
if (kwSet.size !== ${exportName}.length) {
  const dupes = ${exportName}.map((e) => e.keywordsMain.toLowerCase()).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(\`${exportName} duplicate keywords: \${[...new Set(dupes)].join(", ")}\`);
}
`;
  fs.writeFileSync(path.join(root, `seo-keywords-500-batch${batchNum}.mjs`), body, "utf8");
  console.log(`Wrote seo-keywords-500-batch${batchNum}.mjs (${parts.length} entries)`);
}

const HELPERS = `function cap(kw) {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}`;

function webCityBlock(industries, cities) {
  const out = [];
  for (const [indSlug, industry, baseAngle] of industries) {
    for (const [citySlug, city] of cities) {
      out.push({
        slug: `thiet-ke-website-${indSlug}-${citySlug}`,
        keywordsMain: `thiết kế website ${industry} ${city}`,
        h1: `Thiết Kế Website ${cap(industry)} ${city} Chuẩn SEO`,
        angle: `${baseAngle} tại ${city}`,
        niche: "strategy",
      });
    }
  }
  return out;
}

function themedBlock(prefix, rows, h1Fn) {
  return rows.map(([s, k, a]) => ({
    slug: `${prefix}-${s}`,
    keywordsMain: `${prefix.replace(/-/g, " ")} ${k}`,
    h1: h1Fn(k),
    angle: a,
    niche: prefix.startsWith("seo") ? "seo" : "strategy",
  }));
}

function techSeoBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `seo-technical-${s}`,
    keywordsMain: `seo technical ${k}`,
    h1: `SEO Technical ${cap(k)} — Tối Ưu Kỹ Thuật`,
    angle: a,
    niche: "seo",
  }));
}

function contentBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `content-marketing-${s}`,
    keywordsMain: `content marketing ${k}`,
    h1: `Content Marketing ${cap(k)} — Chiến Lược Nội Dung`,
    angle: a,
    niche: "content",
  }));
}

function youtubeBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `youtube-marketing-${s}`,
    keywordsMain: `youtube marketing ${k}`,
    h1: `YouTube Marketing ${cap(k)} — Video SEO`,
    angle: a,
    niche: "strategy",
  }));
}

function ecommerceBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `ecommerce-${s}`,
    keywordsMain: `ecommerce ${k}`,
    h1: `Ecommerce ${cap(k)} — Bán Hàng Online`,
    angle: a,
    niche: "strategy",
  }));
}

function marketplaceBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `ban-hang-${s}`,
    keywordsMain: `bán hàng ${k}`,
    h1: `Bán Hàng ${cap(k)} — Marketplace`,
    angle: a,
    niche: "strategy",
  }));
}

function funnelBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `sales-funnel-${s}`,
    keywordsMain: `sales funnel ${k}`,
    h1: `Sales Funnel ${cap(k)} — Chuyển Đổi`,
    angle: a,
    niche: "strategy",
  }));
}

function mapBlock(rows) {
  return rows.map(([is, cs, i, c, a]) => ({
    slug: `seo-google-maps-${is}-${cs}`,
    keywordsMain: `seo google maps ${i} ${c}`,
    h1: `SEO Google Maps ${cap(i)} ${c}`,
    angle: a,
    niche: "seo",
  }));
}

function webIndBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `thiet-ke-website-${s}`,
    keywordsMain: `thiết kế website ${k}`,
    h1: `Thiết Kế Website ${cap(k)} Chuyên Nghiệp Chuẩn SEO`,
    angle: a,
    niche: "strategy",
  }));
}

function priceBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `bao-gia-thiet-ke-website-${s}`,
    keywordsMain: `báo giá thiết kế website ${k}`,
    h1: `Báo Giá Thiết Kế Website ${cap(k)} 2026`,
    angle: a,
    niche: "strategy",
  }));
}

function mktBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `marketing-${s}`,
    keywordsMain: `marketing ${k}`,
    h1: `Marketing ${cap(k)} — Chiến Lược Tăng Trưởng`,
    angle: a,
    niche: "strategy",
  }));
}

const IND_B13 = [
  ["xuong-thep-ton", "xưởng thép tôn", "website xưởng thép tôn mạ kẽm"],
  ["cho-thue-container", "cho thuê container", "website cho thuê container vận chuyển"],
  ["day-lam-pho-mat-ong", "dạy làm phố mật ong", "website học phố mật ong thủ công"],
  ["tri-viem-lo-tuyen", "trị viêm lỗ tuyến", "website phòng khám da liễu lỗ tuyến"],
  ["thiet-bi-nha-may-bia", "thiết bị nhà máy bia", "website thiết bị sản xuất bia B2B"],
  ["thiet-ke-nha-tro", "thiết kế nhà trọ", "website thiết kế nhà trọ cho thuê"],
  ["phan-phoi-muoi-himalaya", "phân phối muối himalaya", "website phân phối muối hồng"],
  ["xuong-in-offset-catalog", "xưởng in offset catalogue", "website in catalogue offset"],
  ["day-lam-macrame", "dạy làm macrame", "website học macrame treo tường"],
  ["tri-gan-nhiem-mo", "trị gan nhiễm mỡ", "website phòng khám gan mật"],
  ["lap-he-thong-mang-lan", "lắp hệ thống mạng LAN", "website lắp mạng LAN doanh nghiệp"],
  ["thiet-bi-bowling", "thiết bị bowling", "website thiết bị sân bowling"],
  ["tu-van-ma", "tư vấn M&A", "website tư vấn sáp nhập M&A"],
  ["day-lam-tu-quan-ao", "dạy làm tủ quần áo", "website học tủ quần áo âm tường"],
  ["tri-viem-xoang", "trị viêm xoang", "website phòng khám tai mũi họng"],
  ["cho-thue-san-khau", "cho thuê sân khấu", "website cho thuê sân khấu sự kiện"],
  ["thiet-ke-logo-thuong-hieu", "thiết kế logo thương hiệu", "website thiết kế logo nhận diện"],
  ["phan-phoi-dau-an-cao-cap", "phân phối dầu ăn cao cấp", "website phân phối dầu olive"],
  ["xuong-bao-bi-giay", "xưởng bao bì giấy", "website xưởng bao bì giấy carton"],
  ["day-lam-hoa-tuoi", "dạy làm hoa tươi", "website học cắm hoa tươi"],
];
const CITIES_B13 = [
  ["hai-duong", "Hải Dương"], ["hung-yen", "Hưng Yên"], ["ninh-binh", "Ninh Bình"],
  ["nam-dinh", "Nam Định"], ["thanh-hoa", "Thanh Hóa"], ["vinh", "Vinh"],
  ["quang-binh", "Quảng Bình"], ["quang-tri", "Quảng Trị"], ["kon-tum", "Kon Tum"],
  ["gia-lai", "Gia Lai"],
];

const B13_TECH = [
  ["robots-txt", "robots.txt", "cấu hình robots.txt chuẩn"],
  ["sitemap-xml", "sitemap XML", "tạo sitemap XML Google"],
  ["crawl-budget", "crawl budget", "tối ưu crawl budget"],
  ["core-web-vitals", "Core Web Vitals", "cải thiện LCP CLS INP"],
  ["lcp-optimization", "LCP optimization", "tối ưu Largest Contentful Paint"],
  ["cls-fix", "CLS fix", "sửa Cumulative Layout Shift"],
  ["inp-optimization", "INP optimization", "tối ưu Interaction to Next Paint"],
  ["page-speed-insights", "PageSpeed Insights", "audit PageSpeed Google"],
  ["lazy-load-image", "lazy load image", "lazy load ảnh web"],
  ["webp-conversion", "WebP conversion", "chuyển ảnh sang WebP"],
  ["cdn-setup", "CDN setup", "cấu hình CDN tăng tốc"],
  ["gzip-brotli", "Gzip Brotli", "nén Gzip Brotli server"],
  ["https-ssl", "HTTPS SSL", "cài SSL HTTPS chuẩn"],
  ["redirect-chain", "redirect chain", "sửa chuỗi redirect 301"],
  ["broken-link", "broken link", "quét link hỏng 404"],
  ["structured-data", "structured data", "schema markup JSON-LD"],
  ["hreflang-tag", "hreflang tag", "hreflang đa ngôn ngữ"],
  ["pagination-seo", "pagination SEO", "SEO phân trang rel next prev"],
  ["javascript-seo", "JavaScript SEO", "render JS SEO friendly"],
  ["log-file-analysis", "log file analysis", "phân tích log server SEO"],
  ["orphan-page", "orphan page", "phát hiện trang mồ côi"],
  ["faceted-navigation", "faceted navigation", "SEO bộ lọc ecommerce"],
  ["duplicate-url", "duplicate URL", "xử lý URL trùng canonical"],
  ["xml-sitemap-index", "XML sitemap index", "sitemap index nhiều file"],
  ["mobile-usability", "mobile usability", "mobile-friendly audit"],
  ["security-headers", "security headers", "HTTP security headers SEO"],
  ["server-response-time", "server response time", "giảm TTFB server"],
  ["image-compression", "image compression", "nén ảnh không mất chất"],
  ["minify-css-js", "minify CSS JS", "minify CSS JavaScript"],
  ["critical-css", "critical CSS", "inline critical CSS above fold"],
  ["preconnect-prefetch", "preconnect prefetch", "preconnect CDN font"],
  ["index-coverage", "index coverage", "sửa lỗi index coverage GSC"],
  ["crawl-error", "crawl error", "khắc phục crawl error Search Console"],
  ["site-migration", "site migration", "di chuyển domain SEO an toàn"],
  ["staging-noindex", "staging noindex", "chặn index môi trường staging"],
];

const B13_CONTENT = [
  ["blog-strategy", "blog strategy", "chiến lược blog B2B"],
  ["editorial-calendar", "editorial calendar", "lịch nội dung editorial"],
  ["content-pillar", "content pillar", "pillar content marketing"],
  ["topic-cluster", "topic cluster", "cluster chủ đề SEO"],
  ["lead-magnet", "lead magnet", "lead magnet thu email"],
  ["ebook-marketing", "ebook marketing", "ebook B2B inbound"],
  ["whitepaper-b2b", "whitepaper B2B", "whitepaper ngành B2B"],
  ["case-study-content", "case study content", "viết case study proof"],
  ["infographic-seo", "infographic SEO", "infographic linkable asset"],
  ["video-script", "video script", "kịch bản video marketing"],
  ["podcast-marketing", "podcast marketing", "podcast thương hiệu"],
  ["newsletter-content", "newsletter content", "newsletter email nurture"],
  ["social-content-repurpose", "social content repurpose", "tái sử dụng nội dung MXH"],
  ["ugc-content", "UGC content", "user generated content"],
  ["brand-storytelling", "brand storytelling", "kể chuyện thương hiệu"],
  ["thought-leadership", "thought leadership", "thought leadership B2B"],
  ["content-audit", "content audit", "audit nội dung website"],
  ["content-refresh", "content refresh", "cập nhật bài cũ refresh"],
  ["content-gap-analysis", "content gap analysis", "phân tích khoảng trống nội dung"],
  ["buyer-persona-content", "buyer persona content", "nội dung theo persona"],
  ["content-distribution", "content distribution", "phân phối đa kênh content"],
  ["guest-post-strategy", "guest post strategy", "guest post xây dựng authority"],
  ["content-roi", "content ROI", "đo ROI content marketing"],
  ["long-form-content", "long form content", "bài dài 3000+ từ SEO"],
  ["micro-content", "micro content", "micro content social"],
  ["interactive-content", "interactive content", "quiz calculator interactive"],
  ["content-localization", "content localization", "bản địa hóa nội dung"],
  ["seasonal-content", "seasonal content", "nội dung theo mùa"],
  ["evergreen-content", "evergreen content", "nội dung evergreen SEO"],
  ["content-pruning", "content pruning", "gộp xóa nội dung yếu"],
];

const B13_YOUTUBE = [
  ["kênh-doanh-nghiep", "kênh doanh nghiệp", "xây kênh YouTube brand"],
  ["youtube-seo", "YouTube SEO", "tối ưu title tag YouTube"],
  ["youtube-thumbnail", "YouTube thumbnail", "thumbnail CTR cao"],
  ["youtube-shorts", "YouTube Shorts", "chiến lược YouTube Shorts"],
  ["youtube-ads", "YouTube Ads", "quảng cáo TrueView YouTube"],
  ["youtube-livestream", "YouTube livestream", "livestream bán hàng YouTube"],
  ["youtube-affiliate", "YouTube affiliate", "affiliate marketing YouTube"],
  ["youtube-playlist", "YouTube playlist", "playlist SEO chủ đề"],
  ["youtube-end-screen", "YouTube end screen", "end screen card chuyển đổi"],
  ["youtube-community", "YouTube community", "tab cộng đồng YouTube"],
  ["youtube-analytics", "YouTube analytics", "phân tích retention YouTube"],
  ["youtube-monetization", "YouTube monetization", "kiếm tiền AdSense YouTube"],
  ["youtube-collab", "YouTube collab", "collab KOL YouTube"],
  ["youtube-product-review", "YouTube product review", "review sản phẩm affiliate"],
  ["youtube-tutorial", "YouTube tutorial", "video hướng dẫn how-to"],
  ["youtube-vlog-brand", "YouTube vlog brand", "vlog thương hiệu behind scene"],
  ["youtube-unboxing", "YouTube unboxing", "unboxing sản phẩm viral"],
  ["youtube-podcast-video", "YouTube podcast video", "podcast video YouTube"],
  ["youtube-webinar-replay", "YouTube webinar replay", "replay webinar thu lead"],
  ["youtube-channel-art", "YouTube channel art", "banner kênh chuyên nghiệp"],
  ["youtube-description-seo", "YouTube description SEO", "mô tả video chuẩn SEO"],
  ["youtube-tag-keyword", "YouTube tag keyword", "tag từ khóa video"],
  ["youtube-chapter", "YouTube chapter", "chapter timestamp video dài"],
  ["youtube-subscriber-growth", "YouTube subscriber growth", "tăng subscriber organic"],
  ["youtube-brand-deal", "YouTube brand deal", "hợp tác sponsor YouTube"],
];

emitBatch(13, "500 từ khóa long-tail batch 13 — Technical SEO, Content, YouTube, Bắc Trung Bộ/Tây Nguyên.", HELPERS, [
  { name: "A_WEB_CITY", label: "A — 200", entries: webCityBlock(IND_B13, CITIES_B13) },
  { name: "B_EXTRA_WEB", label: "B — 50", entries: B13_EXTRA.web },
  { name: "C_PRICING", label: "C — 40", entries: B13_EXTRA.pricing },
  { name: "D_TECH_SEO", label: "D — 35", entries: techSeoBlock(B13_TECH) },
  { name: "E_CONTENT", label: "E — 30", entries: contentBlock(B13_CONTENT) },
  { name: "F_YOUTUBE", label: "F — 25", entries: youtubeBlock(B13_YOUTUBE) },
  { name: "G_MAPS", label: "G — 30", entries: mapBlock(B13_MAPS) },
  { name: "H_MKT", label: "H — 20", entries: B13_EXTRA.mkt },
  { name: "I_COMPARE", label: "I — 25", marketing: true, entries: B13_COMPARE },
  { name: "J_PAIN", label: "J — 25", marketing: true, entries: B13_PAIN },
  { name: "K_LAGI", label: "K — 20", marketing: true, entries: B13_LAGI },
], "KEYWORDS_500_BATCH13");

emitBatch(14, "500 từ khóa long-tail batch 14 — Ecommerce, Shopee/Lazada, Sales funnel, Đông Nam Bộ/Tây Nam Bộ.", HELPERS, [
  { name: "A_WEB_CITY", label: "A — 200", entries: webCityBlock(B14_ALL.industries, B14_ALL.cities) },
  { name: "B_EXTRA_WEB", label: "B — 40", entries: webIndBlock(B14_ALL.extraWeb) },
  { name: "C_PRICING", label: "C — 40", entries: priceBlock(B14_ALL.pricing) },
  { name: "D_ECOMMERCE", label: "D — 35", entries: ecommerceBlock(B14_ALL.ecommerce) },
  { name: "E_MARKETPLACE", label: "E — 30", entries: marketplaceBlock(B14_ALL.marketplace) },
  { name: "F_FUNNEL", label: "F — 25", entries: funnelBlock(B14_ALL.funnel) },
  { name: "G_MAPS", label: "G — 30", entries: mapBlock(B14_ALL.maps) },
  { name: "H_MKT", label: "H — 30", entries: mktBlock(B14_ALL.mkt) },
  { name: "I_COMPARE", label: "I — 25", marketing: true, entries: B14_ALL.compare },
  { name: "J_PAIN", label: "J — 25", marketing: true, entries: B14_ALL.pain },
  { name: "K_LAGI", label: "K — 20", marketing: true, entries: B14_ALL.lagi },
], "KEYWORDS_500_BATCH14");

console.log("Done.");

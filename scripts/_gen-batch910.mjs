/**
 * One-off generator for seo-keywords-500-batch9.mjs and batch10.mjs
 * Run: node scripts/_gen-batch910.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
  const out = path.join(root, `seo-keywords-500-batch${batchNum}.mjs`);
  fs.writeFileSync(out, body, "utf8");
  console.log(`Wrote ${out} (${parts.length} entries)`);
}

const HELPERS = `function cap(kw) {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

function webIndustryCity(indSlug, citySlug, industry, city, angle) {
  return {
    slug: \`thiet-ke-website-\${indSlug}-\${citySlug}\`,
    keywordsMain: \`thiết kế website \${industry} \${city}\`,
    h1: \`Thiết Kế Website \${cap(industry)} \${city} Chuẩn SEO\`,
    angle,
    niche: "strategy",
  };
}

function webIndustry(slug, kw, angle) {
  return {
    slug: \`thiet-ke-website-\${slug}\`,
    keywordsMain: \`thiết kế website \${kw}\`,
    h1: \`Thiết Kế Website \${cap(kw)} Chuyên Nghiệp Chuẩn SEO\`,
    angle,
    niche: "strategy",
  };
}

function webPricing(indSlug, industry, angle) {
  return {
    slug: \`bao-gia-thiet-ke-website-\${indSlug}\`,
    keywordsMain: \`báo giá thiết kế website \${industry}\`,
    h1: \`Báo Giá Thiết Kế Website \${cap(industry)} 2026\`,
    angle,
    niche: "strategy",
  };
}

function mapsIndCity(indSlug, citySlug, industry, city, angle) {
  return {
    slug: \`seo-google-maps-\${indSlug}-\${citySlug}\`,
    keywordsMain: \`seo google maps \${industry} \${city}\`,
    h1: \`SEO Google Maps \${cap(industry)} \${city}\`,
    angle,
    niche: "seo",
  };
}

function marketingInd(slug, kw, angle) {
  return {
    slug: \`marketing-\${slug}\`,
    keywordsMain: \`marketing \${kw}\`,
    h1: \`Marketing \${cap(kw)} — Chiến Lược Tăng Trưởng\`,
    angle,
    niche: "strategy",
  };
}

function compare(slug, kw, h1, angle, niche = "strategy") {
  return { slug, keywordsMain: kw, h1, angle, niche };
}

function pain(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "strategy" };
}

function laGi(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "seo" };
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

function onPageBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `seo-on-page-${s}`,
    keywordsMain: `seo on page ${k}`,
    h1: `SEO On-Page ${cap(k)} — Tối Ưu Trang`,
    angle: a,
    niche: "seo",
  }));
}

function tiktokShopBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `tiktok-shop-${s}`,
    keywordsMain: `tiktok shop ${k}`,
    h1: `TikTok Shop ${cap(k)} — Bán Hàng Social`,
    angle: a,
    niche: "strategy",
  }));
}

function ormBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `quan-tri-danh-tieng-${s}`,
    keywordsMain: `quản trị danh tiếng ${k}`,
    h1: `Quản Trị Danh Tiếng ${cap(k)} Online`,
    angle: a,
    niche: "strategy",
  }));
}

function localSeoBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `local-seo-${s}`,
    keywordsMain: `local seo ${k}`,
    h1: `Local SEO ${cap(k)} — Tăng Hiển Thị Địa Phương`,
    angle: a,
    niche: "seo",
  }));
}

function zaloOaBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `zalo-oa-${s}`,
    keywordsMain: `zalo official account ${k}`,
    h1: `Zalo OA ${cap(k)} — Vận Hành Chuẩn`,
    angle: a,
    niche: "strategy",
  }));
}

function uxBlock(rows) {
  return rows.map(([s, k, a]) => ({
    slug: `thiet-ke-ux-ui-${s}`,
    keywordsMain: `thiết kế UX UI ${k}`,
    h1: `Thiết Kế UX UI ${cap(k)} — Trải Nghiệm Người Dùng`,
    angle: a,
    niche: "strategy",
  }));
}

// --- BATCH 9 DATA ---
const IND_B9 = [
  ["xuong-go-ep", "xưởng gỗ ép", "website xưởng gỗ công nghiệp MDF"],
  ["cho-thue-xe-7-cho", "cho thuê xe 7 chỗ", "website dịch vụ thuê xe du lịch"],
  ["day-lam-banh", "dạy làm bánh", "website học làm bánh pastry"],
  ["tri-hoi-mieng", "trị hôi miệng", "website phòng khám nha khoa hôi miệng"],
  ["thiet-bi-thuy-san", "thiết bị thủy sản", "website thiết bị nuôi trồng thủy sản"],
  ["thiet-ke-noi-that-chung-cu", "thiết kế nội thất chung cư", "website thiết kế căn hộ chung cư"],
  ["phan-phoi-bia", "phân phối bia", "website phân phối bia nước giải khát"],
  ["xuong-in-decal", "xưởng in decal", "website xưởng in decal sticker"],
  ["day-lam-nail", "dạy làm nail", "website học nail art chuyên nghiệp"],
  ["tri-toc-rung", "trị tóc rụng", "website phòng khám trị rụng tóc"],
  ["lap-camera-ai", "lắp camera AI", "website lắp camera AI nhận diện"],
  ["thiet-bi-pickleball", "thiết bị pickleball", "website bán vợt pickleball"],
  ["tu-van-hop-dong", "tư vấn hợp đồng", "website luật sư tư vấn hợp đồng"],
  ["day-lam-sofa", "dạy làm sofa", "website học nghề bọc ghế sofa"],
  ["tri-viem-da", "trị viêm da", "website phòng khám da liễu viêm da"],
  ["cho-thue-phong-hoc", "cho thuê phòng học", "website cho thuê phòng học theo giờ"],
  ["thiet-ke-profile-cong-ty", "thiết kế profile công ty", "website thiết kế company profile PDF"],
  ["phan-phoi-sua-bot", "phân phối sữa bột", "website phân phối sữa bột trẻ em"],
  ["xuong-san-xuat-gach", "xưởng sản xuất gạch", "website nhà máy gạch xây dựng"],
  ["day-lam-bonsai", "dạy làm bonsai", "website học nghệ thuật bonsai"],
];
const CITIES_B9 = [
  ["hue", "Huế"], ["dong-ha", "Đông Hà"], ["tam-ky", "Tam Kỳ"], ["pleiku", "Pleiku"],
  ["bac-giang", "Bắc Giang"], ["bac-ninh", "Bắc Ninh"], ["thai-binh", "Thái Bình"],
  ["ha-tinh", "Hà Tĩnh"], ["ha-dong", "Hà Đông"], ["thu-duc", "Thủ Đức"],
];

const B9_ONPAGE = [
  ["title-tag-website", "title tag website", "viết title tag chuẩn SEO"],
  ["meta-description-trang", "meta description trang", "meta description tăng CTR"],
  ["heading-h1-h2", "heading H1 H2", "cấu trúc heading on-page"],
  ["noi-dung-pillar", "nội dung pillar", "bài pillar cluster SEO"],
  ["internal-link-onpage", "internal link on-page", "liên kết nội bộ trong bài"],
  ["anchor-text-seo", "anchor text SEO", "anchor text tự nhiên"],
  ["url-slug-chuan", "URL slug chuẩn", "slug URL thân thiện SEO"],
  ["canonical-tag", "canonical tag", "thẻ canonical tránh trùng"],
  ["meta-robots-noindex", "meta robots noindex", "noindex trang mỏng"],
  ["open-graph-tag", "open graph tag", "OG tag chia sẻ social"],
  ["twitter-card", "twitter card", "Twitter card preview"],
  ["alt-text-hinh-anh", "alt text hình ảnh", "alt image SEO accessibility"],
  ["noi-dung-e-e-a-t", "nội dung E-E-A-T", "nội dung thể hiện chuyên gia"],
  ["keyword-density", "keyword density", "mật độ từ khóa tự nhiên"],
  ["lsi-keyword", "LSI keyword", "từ khóa ngữ nghĩa liên quan"],
  ["featured-snippet", "featured snippet", "tối ưu snippet vị trí 0"],
  ["faq-on-page", "FAQ on-page", "FAQ schema trong trang"],
  ["table-of-contents", "table of contents", "mục lục bài viết dài"],
  ["content-length-seo", "content length SEO", "độ dài nội dung tối ưu"],
  ["thin-content-fix", "thin content fix", "sửa nội dung mỏng"],
  ["duplicate-content-onpage", "duplicate content on-page", "nội dung trùng lặp on-page"],
  ["keyword-cannibalization", "keyword cannibalization", "cạnh tranh từ khóa nội bộ"],
  ["pillar-page-structure", "pillar page structure", "cấu trúc trang trụ cột"],
  ["cluster-content-link", "cluster content link", "liên kết cluster về pillar"],
  ["on-page-audit-checklist", "on-page audit checklist", "checklist audit on-page"],
  ["serp-title-ctr", "SERP title CTR", "title tăng CTR SERP"],
  ["meta-description-ctr", "meta description CTR", "mô tả tăng click SERP"],
  ["content-update-seo", "content update SEO", "cập nhật nội dung refresh SEO"],
  ["author-bio-page", "author bio page", "trang tác giả E-E-A-T"],
  ["about-page-seo", "about page SEO", "trang giới thiệu chuẩn SEO"],
  ["contact-page-seo", "contact page SEO", "trang liên hệ local SEO"],
  ["service-page-seo", "service page SEO", "trang dịch vụ on-page"],
  ["landing-page-onpage", "landing page on-page", "landing page SEO ads"],
  ["blog-post-onpage", "blog post on-page", "bài blog on-page chuẩn"],
  ["category-page-seo", "category page SEO", "trang danh mục ecommerce"],
];

const B9_TIKTOK_SHOP = [
  ["my-pham", "mỹ phẩm", "TikTok Shop skincare livestream"],
  ["thoi-trang-nu", "thời trang nữ", "TikTok Shop fashion nữ"],
  ["thoi-trang-nam", "thời trang nam", "TikTok Shop fashion nam"],
  ["do-gia-dung", "đồ gia dụng", "TikTok Shop gia dụng viral"],
  ["thuc-pham", "thực phẩm", "TikTok Shop thực phẩm sạch"],
  ["do-choi-tre-em", "đồ chơi trẻ em", "TikTok Shop đồ chơi trẻ"],
  ["giay-dep", "giày dép", "TikTok Shop giày dép trend"],
  ["phu-kien-thoi-trang", "phụ kiện thời trang", "TikTok Shop phụ kiện"],
  ["my-pham-han-quoc", "mỹ phẩm Hàn Quốc", "TikTok Shop mỹ phẩm Hàn"],
  ["do-cong-nghe", "đồ công nghệ", "TikTok Shop gadget tech"],
  ["noi-that-mini", "nội thất mini", "TikTok Shop decor nhà cửa"],
  ["do-handmade", "đồ handmade", "TikTok Shop thủ công handmade"],
  ["sach-va-khoa-hoc", "sách và khóa học", "TikTok Shop sách ebook"],
  ["do-the-thao", "đồ thể thao", "TikTok Shop thể thao fitness"],
  ["me-va-be", "mẹ và bé", "TikTok Shop mẹ bé"],
  ["do-an-vat", "đồ ăn vặt", "TikTok Shop snack FMCG"],
  ["tra-sua-nguyen-lieu", "trà sữa nguyên liệu", "TikTok Shop nguyên liệu F&B"],
  ["my-pham-organic", "mỹ phẩm organic", "TikTok Shop mỹ phẩm thiên nhiên"],
  ["thiet-bi-nha-bep", "thiết bị nhà bếp", "TikTok Shop đồ bếp"],
  ["phu-kien-dien-thoai", "phụ kiện điện thoại", "TikTok Shop phụ kiện phone"],
  ["do-camping", "đồ camping", "TikTok Shop outdoor camping"],
  ["my-pham-nam", "mỹ phẩm nam", "TikTok Shop grooming nam"],
  ["thuc-pham-chuc-nang", "thực phẩm chức năng", "TikTok Shop TPCN"],
  ["noi-that-van-phong", "nội thất văn phòng", "TikTok Shop nội thất VP"],
  ["do-decor", "đồ decor", "TikTok Shop decor aesthetic"],
  ["thoi-trang-big-size", "thời trang big size", "TikTok Shop plus size"],
  ["giay-sneaker", "giày sneaker", "TikTok Shop sneaker authentic"],
  ["my-pham-local", "mỹ phẩm local brand", "TikTok Shop brand Việt"],
  ["do-nha-cua", "đồ nhà cửa", "TikTok Shop tiện ích nhà"],
  ["phu-kien-laptop", "phụ kiện laptop", "TikTok Shop phụ kiện laptop"],
];

const B9_ORM = [
  ["google-review", "Google review", "thu thập review Google Maps"],
  ["phan-hoi-review-xau", "phản hồi review xấu", "xử lý review 1 sao"],
  ["danh-gia-facebook", "đánh giá Facebook", "quản lý rating fanpage"],
  ["crisis-communication", "crisis communication", "xử lý khủng hoảng truyền thông"],
  ["brand-monitoring", "brand monitoring", "theo dõi nhắc tên thương hiệu"],
  ["social-listening", "social listening", "lắng nghe mạng xã hội"],
  ["online-reputation-score", "online reputation score", "điểm uy tín online"],
  ["fake-review-report", "fake review report", "báo cáo review giả"],
  ["testimonial-website", "testimonial website", "đưa testimonial lên web"],
  ["case-study-proof", "case study proof", "case study làm social proof"],
  ["pr-bao-chi", "PR báo chí", "đặt tin báo chí uy tín"],
  ["influencer-reputation", "influencer reputation", "KOL bảo vệ thương hiệu"],
  ["employee-review", "employee review", "quản lý đánh giá nhân viên"],
  ["glassdoor-reputation", "Glassdoor reputation", "uy tín tuyển dụng employer"],
  ["maps-rating-tang", "Maps rating tăng", "tăng sao Google Maps"],
  ["review-automation", "review automation", "tự động xin review sau dịch vụ"],
  ["sentiment-analysis", "sentiment analysis", "phân tích cảm xúc review"],
  ["competitor-reputation", "competitor reputation", "so sánh uy tín đối thủ"],
  ["brand-mention-alert", "brand mention alert", "cảnh báo nhắc brand online"],
  ["reputation-audit", "reputation audit", "audit danh tiếng online"],
  ["review-widget-website", "review widget website", "widget review trên web"],
  ["trustpilot-viet-nam", "Trustpilot Việt Nam", "quản lý Trustpilot VN"],
  ["shopee-rating-shop", "Shopee rating shop", "tăng đánh giá Shopee"],
  ["tiktok-comment-manage", "TikTok comment manage", "quản lý bình luận TikTok"],
  ["zalo-review-manage", "Zalo review manage", "quản lý phản hồi Zalo OA"],
];

// Load rest from continuation file
import { B9_EXTRA, B9_MAPS, B9_COMPARE, B9_PAIN, B9_LAGI, B10_ALL } from "./_gen-batch910-data.mjs";

emitBatch(9, "500 từ khóa long-tail batch 9 — SEO on-page, TikTok Shop, ORM, Miền Trung/Bắc.", HELPERS, [
  { name: "A_WEB_CITY", label: "A — 200", entries: webCityBlock(IND_B9, CITIES_B9) },
  { name: "B_EXTRA_WEB", label: "B — 50", entries: B9_EXTRA.web },
  { name: "C_PRICING", label: "C — 40", entries: B9_EXTRA.pricing },
  { name: "D_ONPAGE", label: "D — 35", entries: onPageBlock(B9_ONPAGE) },
  { name: "E_TIKTOK_SHOP", label: "E — 30", entries: tiktokShopBlock(B9_TIKTOK_SHOP) },
  { name: "F_ORM", label: "F — 25", entries: ormBlock(B9_ORM) },
  { name: "G_MAPS", label: "G — 30", entries: mapBlock(B9_MAPS) },
  { name: "H_MKT", label: "H — 30", entries: B9_EXTRA.mkt },
  { name: "I_COMPARE", label: "I — 25", marketing: true, entries: B9_COMPARE },
  { name: "J_PAIN", label: "J — 25", marketing: true, entries: B9_PAIN },
  { name: "K_LAGI", label: "K — 20", marketing: true, entries: B9_LAGI },
], "KEYWORDS_500_BATCH9");

emitBatch(10, "500 từ khóa long-tail batch 10 — Local SEO, Zalo OA, UX/UI, duyên hải/Đông Bắc.", HELPERS + `

function localSeo(slug, kw, angle) {
  return {
    slug: \`local-seo-\${slug}\`,
    keywordsMain: \`local seo \${kw}\`,
    h1: \`Local SEO \${cap(kw)} — Tăng Hiển Thị Địa Phương\`,
    angle,
    niche: "seo",
  };
}

function zaloOa(slug, kw, angle) {
  return {
    slug: \`zalo-oa-\${slug}\`,
    keywordsMain: \`zalo official account \${kw}\`,
    h1: \`Zalo OA \${cap(kw)} — Vận Hành Chuẩn\`,
    angle,
    niche: "strategy",
  };
}

function uxUi(slug, kw, angle) {
  return {
    slug: \`thiet-ke-ux-ui-\${slug}\`,
    keywordsMain: \`thiết kế UX UI \${kw}\`,
    h1: \`Thiết Kế UX UI \${cap(kw)} — Trải Nghiệm Người Dùng\`,
    angle,
    niche: "strategy",
  };
}`, [
  { name: "A_WEB_CITY", label: "A — 200", entries: webCityBlock(B10_ALL.industries, B10_ALL.cities) },
  { name: "B_EXTRA_WEB", label: "B — 50", entries: webIndBlock(B10_ALL.extraWeb) },
  { name: "C_PRICING", label: "C — 40", entries: priceBlock(B10_ALL.pricing) },
  { name: "D_LOCAL_SEO", label: "D — 35", entries: localSeoBlock(B10_ALL.localSeo) },
  { name: "E_ZALO_OA", label: "E — 30", entries: zaloOaBlock(B10_ALL.zaloOa) },
  { name: "F_UX_UI", label: "F — 25", entries: uxBlock(B10_ALL.uxUi) },
  { name: "G_MAPS", label: "G — 30", entries: mapBlock(B10_ALL.maps) },
  { name: "H_MKT", label: "H — 30", entries: mktBlock(B10_ALL.mkt) },
  { name: "I_COMPARE", label: "I — 25", marketing: true, entries: B10_ALL.compare },
  { name: "J_PAIN", label: "J — 25", marketing: true, entries: B10_ALL.pain },
  { name: "K_LAGI", label: "K — 20", marketing: true, entries: B10_ALL.lagi },
], "KEYWORDS_500_BATCH10");

console.log("Done.");

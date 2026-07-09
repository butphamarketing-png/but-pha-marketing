/**
 * Generator for seo-keywords-500-batch21.mjs and batch22.mjs
 * Batch 21: Meta Ads (Facebook/Instagram), Retargeting, Conversion API — Tây Nam Bộ & ĐBSCL
 * Batch 22: Landing Page, CRO, A/B Testing — Red River Delta & vùng ven đô
 * Run: node scripts/_gen-batch2122.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { B21_EXTRA, B21_MAPS, B21_COMPARE, B21_PAIN, B21_LAGI, B22_ALL } from "./_gen-batch2122-data.mjs";

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

function themedBlock(prefix, rows, h1Fn, niche = "strategy") {
  return rows.map(([s, k, a]) => ({
    slug: `${prefix}-${s}`,
    keywordsMain: `${prefix.replace(/-/g, " ")} ${k}`,
    h1: h1Fn(k),
    angle: a,
    niche,
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

const IND_B21 = [
  ["xuong-che-bien-tom-kho-b21", "xưởng chế biến tôm khô", "website chế biến tôm khô xuất khẩu"],
  ["cho-thue-sa-lan-b21", "cho thuê sà lan", "website cho thuê sà lan vận tải sông"],
  ["day-lam-banh-bo-b21", "dạy làm bánh bò", "website học bánh bò dừa"],
  ["tri-viem-da-co-dia-b21", "trị viêm da cơ địa", "website da liễu viêm da cơ địa"],
  ["may-dong-goi-gao-b21", "máy đóng gói gạo", "website máy đóng bao gạo tự động"],
  ["thiet-ke-quan-lau-ca-b21", "thiết kế quán lẩu cá", "website thiết kế quán lẩu cá kèo"],
  ["phan-phoi-mam-ruoc-b21", "phân phối mắm ruốc", "website phân phối mắm ruốc Huế"],
  ["xuong-dot-tre-b21", "xưởng đốt tre", "website than tre củi trấu"],
  ["day-lam-keo-dua-b21", "dạy làm kẹo dừa", "website học kẹo dừa Bến Tre"],
  ["tri-benh-gut-b21", "trị bệnh gút", "website phòng khám khớp gout"],
  ["lap-he-thong-phun-suong-b21", "lắp hệ thống phun sương", "website phun sương làm mát"],
  ["thiet-bi-may-cat-co-b21", "thiết bị máy cắt cỏ", "website máy cắt cỏ công nghiệp"],
  ["tu-van-xuat-khau-thuy-san-b21", "tư vấn xuất khẩu thủy sản", "website tư vấn xuất khẩu tôm cá"],
  ["day-lam-tranh-thai-b21", "dạy làm tranh thêu", "website học tranh thêu chữ thập"],
  ["tri-viem-phoi-b21", "trị viêm phổi", "website hô hấp viêm phổi mạn"],
  ["cho-thue-xe-tai-b21", "cho thuê xe tải", "website thuê xe tải vận chuyển"],
  ["thiet-ke-quan-hu-tieu-b21", "thiết kế quán hủ tiếu", "website thiết kế quán hủ tiếu Nam Vang"],
  ["phan-phoi-duong-thot-not-b21", "phân phối đường thốt nốt", "website phân phối đường thốt nốt An Giang"],
  ["xuong-in-bao-bi-giay-b21", "xưởng in bao bì giấy", "website in hộp giấy carton"],
  ["day-lam-mut-deo-b21", "dạy làm mứt dẻo", "website học mứt trái cây dẻo"],
];

const CITIES_B21 = [
  ["ca-mau", "Cà Mau"], ["bac-lieu", "Bạc Liêu"], ["soc-trang", "Sóc Trăng"],
  ["hau-giang", "Hậu Giang"], ["vinh-long", "Vĩnh Long"], ["dong-thap", "Đồng Tháp"],
  ["tra-vinh", "Trà Vinh"], ["chau-doc", "Châu Đốc"], ["cao-lanh", "Cao Lãnh"], ["my-tho", "Mỹ Tho"],
];

const B21_META = [
  ["facebook-ads", "Facebook Ads", "quảng cáo Facebook Ads chuyển đổi"],
  ["instagram-ads", "Instagram Ads", "quảng cáo Instagram Reels Stories"],
  ["meta-business-suite", "Meta Business Suite", "quản lý Meta Business Suite"],
  ["advantage-plus", "Advantage Plus", "chiến dịch Advantage+ shopping"],
  ["catalog-ads", "catalog ads", "quảng cáo catalog sản phẩm Meta"],
  ["dynamic-ads", "dynamic ads", "dynamic product ads Facebook"],
  ["lead-ads", "lead ads", "Facebook lead form ads thu lead"],
  ["messenger-ads", "Messenger ads", "quảng cáo click-to-Messenger"],
  ["video-ads", "video ads", "quảng cáo video Meta Ads"],
  ["carousel-ads", "carousel ads", "quảng cáo carousel nhiều ảnh"],
  ["collection-ads", "collection ads", "collection ads ecommerce Meta"],
  ["instant-experience", "instant experience", "Instant Experience fullscreen ad"],
  ["spark-ads-meta", "Spark Ads Meta", "boost organic post Meta Ads"],
  ["reels-ads", "Reels ads", "quảng cáo Instagram Reels"],
  ["stories-ads", "Stories ads", "quảng cáo Instagram Stories"],
  ["asc-campaign", "ASC campaign", "Advantage+ Shopping Campaign"],
  ["cpm-optimization", "CPM optimization", "tối ưu CPM Meta Ads"],
  ["cpa-optimization", "CPA optimization", "tối ưu CPA conversion Meta"],
  ["roas-targeting", "ROAS targeting", "mục tiêu ROAS Meta ecommerce"],
  ["broad-targeting", "broad targeting", "broad targeting Meta 2026"],
  ["interest-targeting", "interest targeting", "nhắm interest audience Meta"],
  ["custom-audience", "custom audience", "tạo custom audience Meta"],
  ["lookalike-audience", "lookalike audience", "lookalike 1% 3% 5% Meta"],
  ["saved-audience", "saved audience", "saved audience targeting Meta"],
  ["placement-optimization", "placement optimization", "tối ưu placement Feed Reels"],
  ["ad-creative-testing", "ad creative testing", "A/B test creative Meta Ads"],
  ["copy-testing", "copy testing", "test primary text headline Meta"],
  ["budget-optimization", "budget optimization", "tối ưu ngân sách campaign budget"],
  ["campaign-structure", "campaign structure", "cấu trúc campaign Meta Ads"],
  ["ad-account-setup", "ad account setup", "setup tài khoản quảng cáo Meta"],
  ["business-manager", "Business Manager", "quản lý Business Manager Meta"],
  ["ad-policy", "ad policy", "tuân thủ chính sách quảng cáo Meta"],
  ["ad-review", "ad review", "xử lý ad review bị từ chối"],
  ["attribution-setting", "attribution setting", "cài attribution window Meta"],
  ["utm-parameter", "UTM parameter", "UTM tracking Meta Ads"],
];

const B21_RETARGETING = [
  ["website-visitors", "website visitors", "retargeting khách đã vào website"],
  ["cart-abandoners", "cart abandoners", "remarketing bỏ giỏ hàng"],
  ["product-viewers", "product viewers", "retargeting xem sản phẩm"],
  ["video-viewers", "video viewers", "retargeting xem video 50% 75%"],
  ["lead-form-openers", "lead form openers", "retargeting mở form chưa submit"],
  ["customer-list", "customer list", "upload customer list retargeting"],
  ["engagement-custom", "engagement custom", "retargeting tương tác Page IG"],
  ["instagram-engagers", "Instagram engagers", "retargeting engagement Instagram"],
  ["facebook-engagers", "Facebook engagers", "retargeting engagement Facebook"],
  ["messenger-subscribers", "Messenger subscribers", "retargeting subscriber Messenger"],
  ["pixel-event", "Pixel event", "retargeting theo Pixel event"],
  ["view-content", "ViewContent", "retargeting ViewContent event"],
  ["add-to-cart", "AddToCart", "retargeting AddToCart event"],
  ["initiate-checkout", "InitiateCheckout", "retargeting InitiateCheckout"],
  ["purchase-event", "Purchase event", "retargeting khách đã mua upsell"],
  ["exclusion-audience", "exclusion audience", "loại tệp đã mua retargeting"],
  ["frequency-cap", "frequency cap", "giới hạn frequency retargeting"],
  ["retargeting-window", "retargeting window", "cửa sổ 7 14 30 ngày retargeting"],
  ["dynamic-retargeting", "dynamic retargeting", "dynamic ads retargeting sản phẩm"],
  ["cross-sell", "cross sell", "retargeting cross-sell sản phẩm liên quan"],
  ["win-back", "win back", "chiến dịch win-back khách cũ"],
  ["sequential-retargeting", "sequential retargeting", "retargeting theo funnel stage"],
  ["offer-retargeting", "offer retargeting", "retargeting kèm ưu đãi discount"],
  ["urgency-retargeting", "urgency retargeting", "retargeting urgency countdown"],
  ["lookalike-retargeting", "lookalike retargeting", "lookalike từ retargeting pool"],
  ["prospecting-retargeting", "prospecting retargeting", "kết hợp prospecting retargeting"],
  ["catalog-retargeting", "catalog retargeting", "retargeting catalog feed"],
  ["offline-retargeting", "offline retargeting", "retargeting offline conversion"],
  ["app-retargeting", "app retargeting", "retargeting app install event"],
  ["retargeting-roi", "retargeting ROI", "đo ROI chiến dịch retargeting"],
];

const B21_CAPI = [
  ["setup-capi", "setup CAPI", "cài đặt Conversion API Meta"],
  ["server-side-event", "server side event", "gửi event server-side CAPI"],
  ["event-deduplication", "event deduplication", "dedup Pixel và CAPI event"],
  ["event-match-quality", "event match quality", "tăng event match quality CAPI"],
  ["fbc-fbp-parameter", "fbc fbp parameter", "truyền fbc fbp parameter CAPI"],
  ["email-hash", "email hash", "hash email phone CAPI matching"],
  ["purchase-event-capi", "Purchase event CAPI", "gửi Purchase event qua CAPI"],
  ["lead-event-capi", "Lead event CAPI", "gửi Lead event server-side"],
  ["add-to-cart-capi", "AddToCart CAPI", "AddToCart event CAPI tracking"],
  ["view-content-capi", "ViewContent CAPI", "ViewContent server-side event"],
  ["gtm-server-side", "GTM server side", "GTM server container CAPI"],
  ["woocommerce-capi", "WooCommerce CAPI", "tích hợp CAPI WooCommerce"],
  ["shopify-capi", "Shopify CAPI", "tích hợp CAPI Shopify"],
  ["wordpress-capi", "WordPress CAPI", "plugin CAPI WordPress"],
  ["offline-event-capi", "offline event CAPI", "offline conversion CAPI upload"],
  ["crm-integration-capi", "CRM integration CAPI", "đồng bộ CRM event CAPI"],
  ["test-event-capi", "test event CAPI", "test event tool Meta CAPI"],
  ["diagnostic-capi", "diagnostic CAPI", "diagnostic Events Manager CAPI"],
  ["aggregated-event", "aggregated event", "Aggregated Event Measurement iOS"],
  ["domain-verification", "domain verification", "xác minh domain Meta Pixel"],
  ["priority-event", "priority event", "cấu hình 8 priority events"],
  ["capi-pixel-hybrid", "CAPI Pixel hybrid", "hybrid Pixel + CAPI tracking"],
  ["conversion-lift", "conversion lift", "đo conversion lift CAPI"],
  ["attribution-capi", "attribution CAPI", "attribution modeling CAPI"],
  ["data-processing", "data processing", "Limited Data Use CAPI"],
];

emitBatch(21, "500 từ khóa long-tail batch 21 — Meta Ads, Retargeting, Conversion API, Tây Nam Bộ & ĐBSCL.", HELPERS, [
  { name: "A_WEB_CITY", label: "A — 200", entries: webCityBlock(IND_B21, CITIES_B21) },
  { name: "B_EXTRA_WEB", label: "B — 50", entries: B21_EXTRA.web },
  { name: "C_PRICING", label: "C — 40", entries: B21_EXTRA.pricing },
  { name: "D_META", label: "D — 35", entries: themedBlock("meta-ads", B21_META, (k) => `Meta Ads ${cap(k)}`) },
  { name: "E_RETARGETING", label: "E — 30", entries: themedBlock("retargeting", B21_RETARGETING, (k) => `Retargeting ${cap(k)}`) },
  { name: "F_CAPI", label: "F — 25", entries: themedBlock("conversion-api", B21_CAPI, (k) => `Conversion API ${cap(k)}`) },
  { name: "G_MAPS", label: "G — 30", entries: B21_MAPS },
  { name: "H_MKT", label: "H — 20", entries: B21_EXTRA.mkt },
  { name: "I_COMPARE", label: "I — 25", marketing: true, entries: B21_COMPARE },
  { name: "J_PAIN", label: "J — 25", marketing: true, entries: B21_PAIN },
  { name: "K_LAGI", label: "K — 20", marketing: true, entries: B21_LAGI },
], "KEYWORDS_500_BATCH21");

emitBatch(22, "500 từ khóa long-tail batch 22 — Landing Page, CRO, A/B Testing, Red River Delta & vùng ven đô.", HELPERS, [
  { name: "A_WEB_CITY", label: "A — 200", entries: webCityBlock(B22_ALL.industries, B22_ALL.cities) },
  { name: "B_EXTRA_WEB", label: "B — 40", entries: webIndBlock(B22_ALL.extraWeb) },
  { name: "C_PRICING", label: "C — 40", entries: priceBlock(B22_ALL.pricing) },
  { name: "D_LANDING", label: "D — 35", entries: themedBlock("landing-page", B22_ALL.landing, (k) => `Landing Page ${cap(k)}`) },
  { name: "E_CRO", label: "E — 30", entries: themedBlock("cro", B22_ALL.cro, (k) => `CRO ${cap(k)}`) },
  { name: "F_AB", label: "F — 25", entries: themedBlock("ab-testing", B22_ALL.ab, (k) => `A/B Testing ${cap(k)}`) },
  { name: "G_MAPS", label: "G — 30", entries: mapBlock(B22_ALL.maps) },
  { name: "H_MKT", label: "H — 30", entries: mktBlock(B22_ALL.mkt) },
  { name: "I_COMPARE", label: "I — 25", marketing: true, entries: B22_ALL.compare },
  { name: "J_PAIN", label: "J — 25", marketing: true, entries: B22_ALL.pain },
  { name: "K_LAGI", label: "K — 20", marketing: true, entries: B22_ALL.lagi },
], "KEYWORDS_500_BATCH22");

console.log("Done.");

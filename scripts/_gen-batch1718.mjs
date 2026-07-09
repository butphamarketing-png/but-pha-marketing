/**
 * Generator for seo-keywords-500-batch17.mjs and batch18.mjs
 * Batch 17: TikTok Marketing, Zalo OA, Chatbot/AI — Tây Nguyên & Duyên hải Nam Trung Bộ
 * Batch 18: Local SEO, Google Business Profile, Review/Reputation — Miền Bắc mở rộng
 * Run: node scripts/_gen-batch1718.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { B17_EXTRA, B17_MAPS, B17_COMPARE, B17_PAIN, B17_LAGI, B18_ALL } from "./_gen-batch1718-data.mjs";

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
    niche: prefix.startsWith("seo") || prefix.startsWith("google-business") || prefix.startsWith("quan-ly") ? "seo" : niche,
  }));
}

function tiktokBlock(rows) {
  return themedBlock("tiktok-marketing", rows, (k) => `TikTok Marketing ${cap(k)}`, "strategy");
}

function zaloBlock(rows) {
  return themedBlock("zalo-oa", rows, (k) => `Zalo OA ${cap(k)} — Quản Lý Official Account`, "strategy");
}

function chatbotBlock(rows) {
  return themedBlock("chatbot", rows, (k) => `Chatbot ${cap(k)} — AI Tự Động`, "strategy");
}

function localSeoBlock(rows) {
  return themedBlock("seo-dia-phuong", rows, (k) => `SEO Địa Phương ${cap(k)}`, "seo");
}

function gbpBlock(rows) {
  return themedBlock("google-business-profile", rows, (k) => `Google Business Profile ${cap(k)}`, "seo");
}

function reviewBlock(rows) {
  return themedBlock("quan-ly-danh-gia", rows, (k) => `Quản Lý Đánh Giá ${cap(k)}`, "seo");
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

const IND_B17 = [
  ["xuong-rang-ca-phe-specialty-b17", "xưởng rang cà phê specialty", "website rang cà phê Arabica cao cấp"],
  ["cho-thue-xe-jeep-dulich-b17", "cho thuê xe jeep du lịch", "website thuê jeep tour cao nguyên"],
  ["day-lam-banh-chuoi-nuong-b17", "dạy làm bánh chuối nướng", "website học bánh chuối nướng nếp"],
  ["tri-viem-xoang-man-tinh-b17", "trị viêm xoang mạn tính", "website tai mũi họng viêm xoang"],
  ["thiet-bi-nha-may-dam-go-b17", "thiết bị nhà máy dăm gỗ", "website máy băm dăm gỗ B2B"],
  ["thiet-ke-homestay-go-b17", "thiết kế homestay gỗ", "website thiết kế homestay gỗ mộc"],
  ["phan-phoi-mat-ong-rung-b17", "phân phối mật ong rừng", "website phân phối mật ong nguyên chất"],
  ["xuong-may-ao-dai-cuoi-b17", "xưởng may áo dài cưới", "website may áo dài cưới hỏi"],
  ["day-lam-tranh-len-b17", "dạy làm tranh len", "website học tranh len handmade"],
  ["tri-hen-suyen-tre-em-b17", "trị hen suyễn trẻ em", "website phòng khám hen suyễn trẻ"],
  ["lap-he-thong-dien-mat-troi-b17", "lắp hệ thống điện mặt trời", "website điện mặt trời hộ gia đình"],
  ["thiet-bi-golf-b17", "thiết bị golf", "website dụng cụ golf chuyên nghiệp"],
  ["tu-van-visa-han-quoc-b17", "tư vấn visa Hàn Quốc", "website tư vấn visa du lịch Hàn"],
  ["day-lam-moc-co-ban-b17", "dạy làm mộc cơ bản", "website học nghề mộc gỗ"],
  ["tri-nam-da-b17", "trị nám da", "website thẩm mỹ trị nám tàn nhang"],
  ["cho-thue-trang-phuc-cosplay-b17", "cho thuê trang phục cosplay", "website thuê đồ cosplay sự kiện"],
  ["thiet-ke-quan-pho-b17", "thiết kế quán phở", "website thiết kế quán phở chuẩn thương hiệu"],
  ["phan-phoi-hat-macadamia-b17", "phân phối hạt macadamia", "website phân phối macadamia rang"],
  ["xuong-ep-dau-thuc-vat-b17", "xưởng ép dầu thực vật", "website ép dầu lạnh nguyên chất"],
  ["day-lam-kem-artisan-b17", "dạy làm kem artisan", "website học kem gelato thủ công"],
];

const CITIES_B17 = [
  ["pleiku", "Pleiku"], ["da-lat", "Đà Lạt"], ["dak-nong", "Đắk Nông"],
  ["nha-trang", "Nha Trang"], ["hue", "Huế"], ["da-nang", "Đà Nẵng"],
  ["binh-thuan", "Bình Thuận"], ["binh-phuoc", "Bình Phước"], ["quang-nam", "Quang Nam"], ["hoi-an", "Hội An"],
];

const B17_TIKTOK = [
  ["shop-vn", "Shop VN", "bán hàng TikTok Shop Việt Nam"],
  ["livestream-ban-hang", "livestream bán hàng", "livestream commerce TikTok"],
  ["ads-in-feed", "Ads in-feed", "quảng cáo in-feed TikTok Ads"],
  ["spark-ads", "Spark Ads", "boost content creator Spark Ads"],
  ["organic-content", "organic content", "chiến lược nội dung organic TikTok"],
  ["hashtag-challenge", "hashtag challenge", "chiến dịch hashtag challenge viral"],
  ["creator-marketplace", "Creator Marketplace", "booking creator TikTok Marketplace"],
  ["affiliate-program", "affiliate program", "chương trình affiliate TikTok"],
  ["pixel-tracking", "Pixel tracking", "cài TikTok Pixel conversion tracking"],
  ["video-seo", "video SEO", "tối ưu TikTok SEO tìm kiếm"],
  ["short-form-video", "short form video", "sản xuất video ngắn TikTok"],
  ["hook-script", "hook script", "viết hook 3 giây đầu TikTok"],
  ["trending-sound", "trending sound", "tận dụng nhạc trending TikTok"],
  ["duet-stitch", "duet stitch", "chiến lược duet stitch viral"],
  ["ugc-campaign", "UGC campaign", "chiến dịch UGC creator TikTok"],
  ["brand-takeover", "brand takeover", "quảng cáo brand takeover TikTok"],
  ["topview-ads", "TopView ads", "quảng cáo TopView full màn hình"],
  ["collection-ads", "collection ads", "quảng cáo collection ecommerce"],
  ["dynamic-showcase", "dynamic showcase", "dynamic product ads TikTok"],
  ["retargeting-ads", "retargeting ads", "remarketing TikTok Pixel audience"],
  ["lookalike-audience", "lookalike audience", "tệp lookalike TikTok Ads"],
  ["cpm-optimization", "CPM optimization", "tối ưu CPM chiến dịch TikTok"],
  ["roas-ecommerce", "ROAS ecommerce", "mục tiêu ROAS TikTok Shop"],
  ["creator-fund", "Creator Fund", "monetize Creator Fund TikTok"],
  ["tiktok-seo-keyword", "TikTok SEO keyword", "nghiên cứu keyword TikTok search"],
  ["cross-post-reels", "cross post Reels", "đăng chéo TikTok Instagram Reels"],
  ["influencer-collab", "influencer collab", "hợp tác KOL TikTok ngách"],
  ["product-seeding", "product seeding", "seeding sản phẩm creator TikTok"],
  ["live-shopping", "live shopping", "live shopping event TikTok"],
  ["analytics-dashboard", "analytics dashboard", "dashboard phân tích TikTok Analytics"],
  ["content-calendar", "content calendar", "lịch đăng content TikTok"],
  ["community-management", "community management", "quản lý comment TikTok"],
  ["brand-safety", "brand safety", "brand safety quảng cáo TikTok"],
  ["ad-creative-testing", "ad creative testing", "A/B test creative TikTok Ads"],
  ["funnel-tiktok-website", "funnel TikTok website", "funnel TikTok sang website"],
];

const B17_ZALO = [
  ["setup-official", "setup official", "tạo Zalo Official Account doanh nghiệp"],
  ["xac-minh-oa", "xác minh OA", "xác minh tick xanh Zalo OA"],
  ["broadcast-marketing", "broadcast marketing", "gửi broadcast Zalo OA marketing"],
  ["zns-template", "ZNS template", "tạo template ZNS thông báo"],
  ["mini-app-store", "mini app store", "xây mini app trên Zalo OA"],
  ["rich-menu", "rich menu", "thiết kế rich menu Zalo OA"],
  ["chatbot-tich-hop", "chatbot tích hợp", "tích hợp chatbot Zalo OA"],
  ["follower-growth", "follower growth", "tăng follower Zalo OA organic"],
  ["qr-dan-follower", "QR dẫn follower", "QR code quét follow Zalo OA"],
  ["oa-analytics", "OA analytics", "phân tích insights Zalo OA"],
  ["zalo-pay-tich-hop", "ZaloPay tích hợp", "tích hợp thanh toán ZaloPay OA"],
  ["oa-crm-sync", "OA CRM sync", "đồng bộ lead Zalo OA CRM"],
  ["personalized-message", "personalized message", "tin nhắn cá nhân hóa Zalo"],
  ["tag-segment", "tag segment", "phân khúc tag follower Zalo OA"],
  ["automation-workflow", "automation workflow", "workflow tự động Zalo OA"],
  ["oa-content-plan", "OA content plan", "kế hoạch nội dung Zalo OA"],
  ["zalo-ads", "Zalo Ads", "quảng cáo Zalo Ads OA"],
  ["group-marketing", "group marketing", "marketing qua Zalo group"],
  ["oa-event", "OA event", "sự kiện tương tác Zalo OA"],
  ["customer-service-oa", "customer service OA", "CSKH qua Zalo OA 24/7"],
  ["oa-menu-digital", "OA menu digital", "menu số nhà hàng Zalo OA"],
  ["loyalty-program-oa", "loyalty program OA", "chương trình loyalty Zalo OA"],
  ["zalo-shop", "Zalo Shop", "bán hàng Zalo Shop mini app"],
  ["oa-api-webhook", "OA API webhook", "webhook API Zalo OA"],
  ["multi-admin-oa", "multi admin OA", "quản lý đa admin Zalo OA"],
  ["oa-template-message", "OA template message", "template tin nhắn Zalo OA"],
  ["follow-up-zalo", "follow up Zalo", "follow-up lead qua Zalo OA"],
  ["zalo-nurture", "Zalo nurture", "nuôi dưỡng khách Zalo OA"],
  ["oa-reporting", "OA reporting", "báo cáo hiệu suất Zalo OA"],
  ["oa-compliance", "OA compliance", "tuân thủ quy định Zalo OA"],
];

const B17_CHATBOT = [
  ["ai-gpt", "AI GPT", "chatbot AI GPT doanh nghiệp"],
  ["zalo-chatbot", "Zalo chatbot", "chatbot tích hợp Zalo OA"],
  ["website-widget", "website widget", "chatbot widget website"],
  ["facebook-messenger", "Facebook Messenger", "chatbot Messenger Facebook"],
  ["lead-qualification", "lead qualification", "chatbot qualify lead tự động"],
  ["faq-automation", "FAQ automation", "chatbot trả lời FAQ tự động"],
  ["appointment-booking", "appointment booking", "chatbot đặt lịch hẹn"],
  ["order-tracking", "order tracking", "chatbot tra cứu đơn hàng"],
  ["human-handoff", "human handoff", "chuyển chatbot sang nhân viên"],
  ["nlp-tieng-viet", "NLP tiếng Việt", "chatbot NLP tiếng Việt"],
  ["no-code-builder", "no-code builder", "chatbot no-code builder"],
  ["knowledge-base", "knowledge base", "chatbot knowledge base FAQ"],
  ["multichannel", "multichannel", "chatbot đa kênh omnichannel"],
  ["sentiment-analysis", "sentiment analysis", "phân tích cảm xúc chatbot"],
  ["analytics-chatbot", "analytics chatbot", "phân tích hiệu suất chatbot"],
  ["crm-integration", "CRM integration", "tích hợp chatbot CRM"],
  ["voice-chatbot", "voice chatbot", "chatbot giọng nói voice AI"],
  ["ecommerce-chatbot", "ecommerce chatbot", "chatbot bán hàng ecommerce"],
  ["support-24-7", "support 24/7", "chatbot CSKH 24/7"],
  ["training-data", "training data", "train dữ liệu chatbot AI"],
  ["fallback-message", "fallback message", "xử lý fallback chatbot"],
  ["conversation-flow", "conversation flow", "thiết kế flow hội thoại chatbot"],
  ["ab-testing-chatbot", "A/B testing chatbot", "test A/B kịch bản chatbot"],
  ["gdpr-privacy", "GDPR privacy", "chatbot tuân thủ bảo mật dữ liệu"],
  ["cost-optimization", "cost optimization", "tối ưu chi phí chatbot AI"],
];

emitBatch(17, "500 từ khóa long-tail batch 17 — TikTok Marketing, Zalo OA, Chatbot/AI, Tây Nguyên & Duyên hải Nam Trung Bộ.", HELPERS, [
  { name: "A_WEB_CITY", label: "A — 200", entries: webCityBlock(IND_B17, CITIES_B17) },
  { name: "B_EXTRA_WEB", label: "B — 50", entries: B17_EXTRA.web },
  { name: "C_PRICING", label: "C — 40", entries: B17_EXTRA.pricing },
  { name: "D_TIKTOK", label: "D — 35", entries: tiktokBlock(B17_TIKTOK) },
  { name: "E_ZALO", label: "E — 30", entries: zaloBlock(B17_ZALO) },
  { name: "F_CHATBOT", label: "F — 25", entries: chatbotBlock(B17_CHATBOT) },
  { name: "G_MAPS", label: "G — 30", entries: mapBlock(B17_MAPS) },
  { name: "H_MKT", label: "H — 20", entries: B17_EXTRA.mkt },
  { name: "I_COMPARE", label: "I — 25", marketing: true, entries: B17_COMPARE },
  { name: "J_PAIN", label: "J — 25", marketing: true, entries: B17_PAIN },
  { name: "K_LAGI", label: "K — 20", marketing: true, entries: B17_LAGI },
], "KEYWORDS_500_BATCH17");

emitBatch(18, "500 từ khóa long-tail batch 18 — Local SEO, Google Business Profile, Review/Reputation, Miền Bắc mở rộng.", HELPERS, [
  { name: "A_WEB_CITY", label: "A — 200", entries: webCityBlock(B18_ALL.industries, B18_ALL.cities) },
  { name: "B_EXTRA_WEB", label: "B — 40", entries: webIndBlock(B18_ALL.extraWeb) },
  { name: "C_PRICING", label: "C — 40", entries: priceBlock(B18_ALL.pricing) },
  { name: "D_LOCAL_SEO", label: "D — 35", entries: localSeoBlock(B18_ALL.localSeo) },
  { name: "E_GBP", label: "E — 30", entries: gbpBlock(B18_ALL.gbp) },
  { name: "F_REVIEW", label: "F — 25", entries: reviewBlock(B18_ALL.review) },
  { name: "G_MAPS", label: "G — 30", entries: mapBlock(B18_ALL.maps) },
  { name: "H_MKT", label: "H — 30", entries: mktBlock(B18_ALL.mkt) },
  { name: "I_COMPARE", label: "I — 25", marketing: true, entries: B18_ALL.compare },
  { name: "J_PAIN", label: "J — 25", marketing: true, entries: B18_ALL.pain },
  { name: "K_LAGI", label: "K — 20", marketing: true, entries: B18_ALL.lagi },
], "KEYWORDS_500_BATCH18");

console.log("Done.");

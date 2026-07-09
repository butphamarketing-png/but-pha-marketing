/**
 * Generator for seo-keywords-500-batch15.mjs and batch16.mjs
 * Batch 15: Google Ads, Email marketing, CRM — Miền Trung/Bắc mở rộng
 * Batch 16: Branding, Influencer/KOL, Analytics — ĐBSCL mở rộng
 * Run: node scripts/_gen-batch1516.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { B15_EXTRA, B15_MAPS, B15_COMPARE, B15_PAIN, B15_LAGI, B16_ALL } from "./_gen-batch1516-data.mjs";

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
    niche: prefix.startsWith("seo") || prefix.startsWith("phan-tich") ? "seo" : niche,
  }));
}

function googleAdsBlock(rows) {
  return themedBlock("quang-cao-google", rows, (k) => `Quảng Cáo Google ${cap(k)}`, "google-ads");
}

function emailBlock(rows) {
  return themedBlock("email-marketing", rows, (k) => `Email Marketing ${cap(k)}`, "strategy");
}

function crmBlock(rows) {
  return themedBlock("crm", rows, (k) => `CRM ${cap(k)} — Quản Lý Khách Hàng`, "strategy");
}

function brandingBlock(rows) {
  return themedBlock("branding", rows, (k) => `Branding ${cap(k)} — Nhận Diện Thương Hiệu`, "branding");
}

function influencerBlock(rows) {
  return themedBlock("influencer-marketing", rows, (k) => `Influencer Marketing ${cap(k)}`, "strategy");
}

function analyticsBlock(rows) {
  return themedBlock("phan-tich", rows, (k) => `Phân Tích ${cap(k)} — Dashboard KPI`, "analytics");
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

const IND_B15 = [
  ["xuong-san-xuat-gach-b15", "xưởng sản xuất gạch", "website nhà máy gạch ốp lát"],
  ["cho-thue-xe-du-lich-b15", "cho thuê xe du lịch", "website dịch vụ xe du lịch đoàn"],
  ["day-lam-banh-ngot-b15", "dạy làm bánh ngọt", "website học pastry bánh ngọt"],
  ["tri-rang-khong-deu-mau-b15", "trị răng không đều màu", "website nha khoa thẩm mỹ răng"],
  ["thiet-bi-nha-may-sua-b15", "thiết bị nhà máy sữa", "website máy đóng gói sữa B2B"],
  ["thiet-ke-shop-house-b15", "thiết kế shophouse", "website thiết kế shophouse kinh doanh"],
  ["phan-phoi-tra-xanh-b15", "phân phối trà xanh", "website phân phối trà xanh matcha"],
  ["xuong-in-tui-vai-b15", "xưởng in túi vải", "website in túi vải quảng cáo"],
  ["day-lam-trang-suc-b15", "dạy làm trang sức", "website học làm trang sức handmade"],
  ["tri-dau-dau-migraine-b15", "trị đau đầu migraine", "website phòng khám đau đầu"],
  ["lap-he-thong-bms-b15", "lắp hệ thống BMS", "website BMS tòa nhà thông minh"],
  ["thiet-bi-cau-long-b15", "thiết bị cầu lông", "website bán vợt cầu lông chuyên dụng"],
  ["tu-van-thue-tncn-b15", "tư vấn thuế TNCN", "website tư vấn thuế cá nhân"],
  ["day-lam-tu-bep-b15", "dạy làm tủ bếp", "website học tủ bếp gỗ công nghiệp"],
  ["tri-viem-da-co-dia-b15", "trị viêm da cơ địa", "website da liễu viêm da cơ địa"],
  ["cho-thue-dung-cu-am-nhac-b15", "cho thuê dụng cụ âm nhạc", "website thuê nhạc cụ sự kiện"],
  ["thiet-ke-menu-nha-hang-b15", "thiết kế menu nhà hàng", "website thiết kế menu F&B"],
  ["phan-phoi-bot-sua-b15", "phân phối bột sữa", "website phân phối nguyên liệu sữa"],
  ["xuong-go-tu-nhien-b15", "xưởng gỗ tự nhiên", "website xưởng gỗ tự nhiên nội thất"],
  ["day-lam-keratin-b15", "dạy làm keratin", "website học tóc keratin chuyên nghiệp"],
];
const CITIES_B15 = [
  ["quy-nhon", "Quy Nhơn"], ["buon-ma-thuot", "Buôn Ma Thuột"], ["quang-ngai", "Quảng Ngãi"],
  ["ha-giang", "Hà Giang"], ["lao-cai", "Lào Cai"], ["yen-bai", "Yên Bái"],
  ["lang-son", "Lạng Sơn"], ["thai-nguyen", "Thái Nguyên"], ["viet-tri", "Việt Trì"],
  ["sam-son", "Sầm Sơn"],
];

const B15_GOOGLE_ADS = [
  ["search-campaign", "search campaign", "chiến dịch tìm kiếm Google Ads"],
  ["display-network", "display network", "mạng hiển thị Google Ads"],
  ["remarketing-ads", "remarketing ads", "quảng cáo remarketing RLSA"],
  ["performance-max", "Performance Max", "chiến dịch PMax Google"],
  ["shopping-ads", "Shopping ads", "quảng cáo Google Shopping"],
  ["youtube-trueview", "YouTube TrueView", "quảng cáo video TrueView"],
  ["keyword-planner", "keyword planner", "lập kế hoạch từ khóa Google"],
  ["quality-score", "quality score", "điểm chất lượng Google Ads"],
  ["ad-rank", "ad rank", "thứ hạng quảng cáo Google"],
  ["cpc-bidding", "CPC bidding", "đấu giá CPC tối ưu"],
  ["cpa-target", "CPA target", "mục tiêu CPA chiến dịch"],
  ["roas-target", "ROAS target", "mục tiêu ROAS ecommerce"],
  ["conversion-tracking", "conversion tracking", "theo dõi chuyển đổi Google Ads"],
  ["gtag-setup", "gtag setup", "cài đặt gtag Google Ads"],
  ["landing-page-ads", "landing page ads", "landing page cho Google Ads"],
  ["ad-copywriting", "ad copywriting", "viết mô tả quảng cáo Google"],
  ["negative-keyword", "negative keyword", "từ khóa phủ định Google Ads"],
  ["ad-extension", "ad extension", "tiện ích mở rộng quảng cáo"],
  ["call-only-ads", "call-only ads", "quảng cáo chỉ gọi điện"],
  ["local-services-ads", "local services ads", "Google Local Services Ads"],
  ["smart-campaign", "smart campaign", "chiến dịch thông minh Google"],
  ["demand-gen", "demand gen", "chiến dịch Demand Gen Google"],
  ["audience-targeting", "audience targeting", "nhắm đối tượng Google Ads"],
  ["in-market-audience", "in-market audience", "tệp in-market Google"],
  ["custom-intent", "custom intent", "tệp custom intent audience"],
  ["lookalike-google", "lookalike Google", "tệp tương tự khách hàng"],
  ["budget-optimization", "budget optimization", "tối ưu ngân sách Google Ads"],
  ["ad-schedule", "ad schedule", "lịch chạy quảng cáo theo giờ"],
  ["geo-targeting", "geo targeting", "nhắm địa lý Google Ads"],
  ["device-bid-adjust", "device bid adjust", "điều chỉnh giá thầu thiết bị"],
  ["search-partners", "search partners", "đối tác tìm kiếm Google"],
  ["dsa-campaign", "DSA campaign", "chiến dịch DSA dynamic search"],
  ["lead-form-ads", "lead form ads", "form thu lead Google Ads"],
  ["merchant-center", "Merchant Center", "Google Merchant Center feed"],
  ["ads-audit", "ads audit", "audit tài khoản Google Ads"],
];

const B15_EMAIL = [
  ["newsletter-b2b", "newsletter B2B", "newsletter email B2B nurture"],
  ["welcome-series", "welcome series", "chuỗi email chào mừng subscriber"],
  ["drip-campaign", "drip campaign", "chiến dịch drip email tự động"],
  ["abandoned-cart-email", "abandoned cart email", "email giỏ hàng bỏ"],
  ["re-engagement", "re-engagement", "email kích hoạt lại khách cũ"],
  ["promotional-blast", "promotional blast", "email khuyến mãi hàng loạt"],
  ["transactional-email", "transactional email", "email giao dịch xác nhận"],
  ["lead-nurture", "lead nurture", "nuôi dưỡng lead qua email"],
  ["cold-email-b2b", "cold email B2B", "cold email outreach B2B"],
  ["email-segmentation", "email segmentation", "phân khúc danh sách email"],
  ["subject-line-ctr", "subject line CTR", "tiêu đề email tăng mở"],
  ["email-deliverability", "email deliverability", "tỷ lệ vào inbox email"],
  ["spam-score-email", "spam score email", "tránh spam filter email"],
  ["mailchimp-vn", "Mailchimp VN", "email marketing Mailchimp"],
  ["getresponse-vn", "GetResponse VN", "automation GetResponse"],
  ["activecampaign-vn", "ActiveCampaign VN", "CRM email ActiveCampaign"],
  ["klaviyo-ecommerce", "Klaviyo ecommerce", "email Klaviyo shop"],
  ["email-template", "email template", "thiết kế template email"],
  ["personalization-email", "personalization email", "cá nhân hóa email marketing"],
  ["a-b-test-email", "A/B test email", "test A/B email marketing"],
  ["email-analytics", "email analytics", "phân tích open rate click rate"],
  ["list-building", "list building", "xây dựng danh sách email"],
  ["lead-magnet-email", "lead magnet email", "email thu lead magnet"],
  ["webinar-invite-email", "webinar invite email", "email mời webinar"],
  ["post-purchase-email", "post-purchase email", "email sau mua hàng"],
  ["birthday-email", "birthday email", "email chúc mừng sinh nhật KH"],
  ["win-back-email", "win-back email", "email win-back khách rời bỏ"],
  ["referral-email", "referral email", "email giới thiệu bạn bè"],
  ["survey-email", "survey email", "email khảo sát khách hàng"],
  ["onboarding-email", "onboarding email", "email onboarding khách mới"],
];

const B15_CRM = [
  ["hubspot-sme", "HubSpot SME", "CRM HubSpot doanh nghiệp nhỏ"],
  ["zoho-crm-vn", "Zoho CRM VN", "triển khai Zoho CRM Việt Nam"],
  ["pipedrive-sales", "Pipedrive sales", "pipeline bán hàng Pipedrive"],
  ["salesforce-sme", "Salesforce SME", "Salesforce cho SME"],
  ["lead-scoring", "lead scoring", "chấm điểm lead tự động"],
  ["pipeline-management", "pipeline management", "quản lý pipeline sales"],
  ["deal-stage", "deal stage", "giai đoạn deal CRM"],
  ["contact-management", "contact management", "quản lý contact CRM"],
  ["sales-automation", "sales automation", "tự động hóa sales CRM"],
  ["crm-integration", "CRM integration", "tích hợp CRM website"],
  ["crm-reporting", "CRM reporting", "báo cáo CRM dashboard"],
  ["customer-segment-crm", "customer segment CRM", "phân khúc khách CRM"],
  ["follow-up-reminder", "follow-up reminder", "nhắc follow-up CRM"],
  ["crm-mobile-app", "CRM mobile app", "CRM trên điện thoại"],
  ["crm-data-migration", "CRM data migration", "chuyển dữ liệu CRM"],
  ["crm-training", "CRM training", "đào tạo CRM cho team"],
  ["crm-custom-field", "CRM custom field", "trường tùy chỉnh CRM"],
  ["crm-workflow", "CRM workflow", "workflow tự động CRM"],
  ["crm-zalo-integration", "CRM Zalo integration", "tích hợp Zalo OA CRM"],
  ["crm-facebook-lead", "CRM Facebook lead", "đồng bộ lead Facebook CRM"],
  ["crm-google-lead", "CRM Google lead", "đồng bộ lead Google Ads CRM"],
  ["crm-customer-journey", "CRM customer journey", "hành trình khách CRM"],
  ["crm-retention", "CRM retention", "giữ chân khách bằng CRM"],
  ["crm-upsell", "CRM upsell", "upsell cross-sell CRM"],
  ["crm-sla", "CRM SLA", "SLA phản hồi lead CRM"],
];

emitBatch(15, "500 từ khóa long-tail batch 15 — Google Ads, Email marketing, CRM, Miền Trung/Bắc mở rộng.", HELPERS, [
  { name: "A_WEB_CITY", label: "A — 200", entries: webCityBlock(IND_B15, CITIES_B15) },
  { name: "B_EXTRA_WEB", label: "B — 50", entries: B15_EXTRA.web },
  { name: "C_PRICING", label: "C — 40", entries: B15_EXTRA.pricing },
  { name: "D_GOOGLE_ADS", label: "D — 35", entries: googleAdsBlock(B15_GOOGLE_ADS) },
  { name: "E_EMAIL", label: "E — 30", entries: emailBlock(B15_EMAIL) },
  { name: "F_CRM", label: "F — 25", entries: crmBlock(B15_CRM) },
  { name: "G_MAPS", label: "G — 30", entries: mapBlock(B15_MAPS) },
  { name: "H_MKT", label: "H — 20", entries: B15_EXTRA.mkt },
  { name: "I_COMPARE", label: "I — 25", marketing: true, entries: B15_COMPARE },
  { name: "J_PAIN", label: "J — 25", marketing: true, entries: B15_PAIN },
  { name: "K_LAGI", label: "K — 20", marketing: true, entries: B15_LAGI },
], "KEYWORDS_500_BATCH15");

emitBatch(16, "500 từ khóa long-tail batch 16 — Branding, Influencer/KOL, Analytics, ĐBSCL mở rộng.", HELPERS, [
  { name: "A_WEB_CITY", label: "A — 200", entries: webCityBlock(B16_ALL.industries, B16_ALL.cities) },
  { name: "B_EXTRA_WEB", label: "B — 40", entries: webIndBlock(B16_ALL.extraWeb) },
  { name: "C_PRICING", label: "C — 40", entries: priceBlock(B16_ALL.pricing) },
  { name: "D_BRANDING", label: "D — 35", entries: brandingBlock(B16_ALL.branding) },
  { name: "E_INFLUENCER", label: "E — 30", entries: influencerBlock(B16_ALL.influencer) },
  { name: "F_ANALYTICS", label: "F — 25", entries: analyticsBlock(B16_ALL.analytics) },
  { name: "G_MAPS", label: "G — 30", entries: mapBlock(B16_ALL.maps) },
  { name: "H_MKT", label: "H — 30", entries: mktBlock(B16_ALL.mkt) },
  { name: "I_COMPARE", label: "I — 25", marketing: true, entries: B16_ALL.compare },
  { name: "J_PAIN", label: "J — 25", marketing: true, entries: B16_ALL.pain },
  { name: "K_LAGI", label: "K — 20", marketing: true, entries: B16_ALL.lagi },
], "KEYWORDS_500_BATCH16");

console.log("Done.");

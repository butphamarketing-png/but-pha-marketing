/**
 * Generator for seo-keywords-500-batch19.mjs and batch20.mjs
 * Batch 19: LinkedIn Marketing, B2B Lead Gen, Webinar/Events — Đông Nam Bộ mở rộng
 * Batch 20: AI Search Optimization (GEO), Schema SEO, Core Web Vitals — Miền Trung & Hà Nội mở rộng
 * Run: node scripts/_gen-batch1920.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { B19_EXTRA, B19_MAPS, B19_COMPARE, B19_PAIN, B19_LAGI, B20_ALL } from "./_gen-batch1920-data.mjs";

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

const IND_B19 = [
  ["xuong-dong-goi-thuc-pham-b19", "xưởng đóng gói thực phẩm", "website máy đóng gói thực phẩm công nghiệp"],
  ["cho-thue-kho-lanh-b19", "cho thuê kho lạnh", "website cho thuê kho lạnh B2B"],
  ["day-lam-banh-bong-lan-b19", "dạy làm bánh bông lan", "website học bánh bông lan kem"],
  ["tri-suy-giam-tri-nho-b19", "trị suy giảm trí nhớ", "website thần kinh suy giảm trí nhớ"],
  ["may-cat-laser-kim-loai-b19", "máy cắt laser kim loại", "website máy cắt laser CNC B2B"],
  ["thiet-ke-kcn-b19", "thiết kế khu công nghiệp", "website thiết kế KCN logistics"],
  ["phan-phoi-nuoc-giai-khat-b19", "phân phối nước giải khát", "website phân phối nước giải khát"],
  ["xuong-in-bao-bi-nhua-b19", "xưởng in bao bì nhựa", "website in bao bì nhựa flexo"],
  ["day-lam-soap-handmade-b19", "dạy làm soap handmade", "website học xà phòng handmade"],
  ["tri-loang-xuong-tieu-b19", "trị loãng xương tiểu", "website nội tiết loãng xương"],
  ["lap-solar-doanh-nghiep-b19", "lắp solar doanh nghiệp", "website điện mặt trời công nghiệp"],
  ["thiet-bi-kiem-tra-chat-luong-b19", "thiết bị kiểm tra chất lượng", "website máy test QC B2B"],
  ["tu-van-esg-b19", "tư vấn ESG", "website tư vấn báo cáo ESG"],
  ["day-lam-gom-ceramic-b19", "dạy làm gốm ceramic", "website học gốm ceramic thủ công"],
  ["tri-dau-da-day-b19", "trị đau dạ dày", "website tiêu hóa đau dạ dày"],
  ["cho-thue-booth-trien-lam-b19", "cho thuê booth triển lãm", "website thuê gian hàng triển lãm"],
  ["thiet-ke-showroom-b19", "thiết kế showroom", "website thiết kế showroom ô tô"],
  ["phan-phoi-bot-protein-b19", "phân phối bột protein", "website phân phối whey protein"],
  ["xuong-may-uniform-b19", "xưởng may uniform", "website may đồng phục công ty"],
  ["day-lam-rau-thuy-canh-b19", "dạy làm rau thủy canh", "website học trồng rau thủy canh"],
];

const CITIES_B19 = [
  ["binh-duong", "Bình Dương"], ["dong-nai", "Đồng Nai"], ["vung-tau", "Vũng Tàu"],
  ["long-an", "Long An"], ["tay-ninh", "Tây Ninh"], ["tien-giang", "Tiền Giang"],
  ["ben-tre", "Bến Tre"], ["an-giang", "An Giang"], ["kien-giang", "Kiên Giang"], ["can-tho", "Cần Thơ"],
];

const B19_LINKEDIN = [
  ["company-page", "company page", "tối ưu trang công ty LinkedIn"],
  ["personal-branding", "personal branding", "xây personal brand LinkedIn B2B"],
  ["content-strategy", "content strategy", "chiến lược nội dung LinkedIn"],
  ["thought-leadership", "thought leadership", "thought leadership LinkedIn B2B"],
  ["linkedin-ads", "LinkedIn Ads", "quảng cáo LinkedIn Ads B2B"],
  ["sponsored-content", "sponsored content", "quảng cáo sponsored content LinkedIn"],
  ["inmail-campaign", "InMail campaign", "chiến dịch InMail LinkedIn"],
  ["lead-gen-form", "lead gen form", "form thu lead LinkedIn"],
  ["sales-navigator", "Sales Navigator", "sử dụng Sales Navigator B2B"],
  ["employee-advocacy", "employee advocacy", "chương trình employee advocacy"],
  ["linkedin-live", "LinkedIn Live", "phát trực tiếp LinkedIn Live"],
  ["carousel-post", "carousel post", "bài đăng carousel LinkedIn"],
  ["article-publishing", "article publishing", "xuất bản bài LinkedIn article"],
  ["hashtag-strategy", "hashtag strategy", "chiến lược hashtag LinkedIn"],
  ["networking-strategy", "networking strategy", "mở rộng network LinkedIn B2B"],
  ["company-showcase", "company showcase", "showcase page LinkedIn"],
  ["linkedin-groups", "LinkedIn groups", "marketing qua LinkedIn groups"],
  ["insight-tag", "Insight Tag", "cài LinkedIn Insight Tag conversion"],
  ["retargeting-ads", "retargeting ads", "remarketing LinkedIn Ads"],
  ["lookalike-audience", "lookalike audience", "tệp lookalike LinkedIn Ads"],
  ["abm-linkedin", "ABM LinkedIn", "account based marketing LinkedIn"],
  ["video-ads", "video ads", "quảng cáo video LinkedIn Ads"],
  ["document-ads", "document ads", "quảng cáo document LinkedIn"],
  ["conversation-ads", "conversation ads", "quảng cáo hội thoại LinkedIn"],
  ["cpm-optimization", "CPM optimization", "tối ưu CPM LinkedIn Ads"],
  ["organic-reach", "organic reach", "tăng organic reach LinkedIn"],
  ["engagement-rate", "engagement rate", "cải thiện engagement rate LinkedIn"],
  ["follower-growth", "follower growth", "tăng follower trang LinkedIn"],
  ["profile-optimization", "profile optimization", "tối ưu hồ sơ LinkedIn cá nhân"],
  ["headline-keywords", "headline keywords", "keyword headline LinkedIn SEO"],
  ["featured-section", "featured section", "tối ưu featured section LinkedIn"],
  ["recommendation", "recommendation", "xin recommendation LinkedIn"],
  ["skill-endorsement", "skill endorsement", "skill endorsement LinkedIn"],
  ["company-culture", "company culture", "content văn hóa công ty LinkedIn"],
  ["hiring-brand", "hiring brand", "employer branding LinkedIn"],
];

const B19_B2B = [
  ["lead-generation", "lead generation", "chiến lược thu lead B2B"],
  ["mql-qualification", "MQL qualification", "qualify MQL marketing qualified lead"],
  ["sql-conversion", "SQL conversion", "chuyển MQL sang SQL sales"],
  ["account-based", "account based", "marketing account based ABM"],
  ["inbound-marketing", "inbound marketing", "inbound marketing B2B"],
  ["outbound-sales", "outbound sales", "outbound sales B2B"],
  ["cold-outreach", "cold outreach", "cold outreach email LinkedIn B2B"],
  ["warm-intro", "warm intro", "warm introduction B2B networking"],
  ["demo-booking", "demo booking", "đặt lịch demo sản phẩm B2B"],
  ["free-trial", "free trial", "chiến dịch free trial B2B SaaS"],
  ["lead-scoring", "lead scoring", "chấm điểm lead scoring CRM"],
  ["lead-nurturing", "lead nurturing", "nuôi dưỡng lead B2B email"],
  ["sales-enablement", "sales enablement", "sales enablement content B2B"],
  ["case-study", "case study", "case study thu lead B2B"],
  ["whitepaper", "whitepaper", "whitepaper download thu lead"],
  ["ebook-download", "ebook download", "ebook B2B lead magnet"],
  ["roi-calculator", "ROI calculator", "công cụ tính ROI thu lead"],
  ["comparison-page", "comparison page", "trang so sánh đối thủ B2B"],
  ["pricing-page", "pricing page", "trang bảng giá B2B conversion"],
  ["landing-page-b2b", "landing page B2B", "landing page thu lead B2B"],
  ["referral-program", "referral program", "chương trình giới thiệu B2B"],
  ["partner-marketing", "partner marketing", "marketing kênh đối tác B2B"],
  ["trade-show-lead", "trade show lead", "thu lead triển lãm B2B"],
  ["intent-data", "intent data", "dữ liệu intent signal B2B"],
  ["buyer-persona", "buyer persona", "xây buyer persona B2B"],
  ["icp-targeting", "ICP targeting", "nhắm ideal customer profile"],
  ["sales-pipeline", "sales pipeline", "tối ưu sales pipeline CRM"],
  ["deal-velocity", "deal velocity", "tăng tốc deal velocity B2B"],
  ["churn-reduction", "churn reduction", "giảm churn khách B2B"],
  ["expansion-revenue", "expansion revenue", "tăng expansion revenue upsell"],
];

const B19_WEBINAR = [
  ["webinar-marketing", "webinar marketing", "marketing webinar thu lead B2B"],
  ["webinar-funnel", "webinar funnel", "funnel chuyển đổi webinar"],
  ["live-webinar", "live webinar", "tổ chức webinar live thu lead"],
  ["on-demand-webinar", "on demand webinar", "webinar on-demand evergreen"],
  ["webinar-promotion", "webinar promotion", "quảng cáo webinar đa kênh"],
  ["webinar-registration", "webinar registration", "tối ưu trang đăng ký webinar"],
  ["webinar-reminder", "webinar reminder", "email nhắc webinar attendance"],
  ["webinar-replay", "webinar replay", "phát lại webinar recording"],
  ["panel-discussion", "panel discussion", "webinar panel discussion B2B"],
  ["product-demo-webinar", "product demo webinar", "webinar demo sản phẩm"],
  ["virtual-summit", "virtual summit", "hội nghị ảo virtual summit"],
  ["virtual-event", "virtual event", "sự kiện ảo thu lead B2B"],
  ["hybrid-event", "hybrid event", "sự kiện hybrid online offline"],
  ["booth-design", "booth design", "thiết kế gian hàng triển lãm"],
  ["exhibition-marketing", "exhibition marketing", "marketing triển lãm B2B"],
  ["conference-lead", "conference lead", "thu lead hội nghị ngành"],
  ["event-sponsorship", "event sponsorship", "tài trợ sự kiện B2B branding"],
  ["networking-event", "networking event", "sự kiện networking B2B"],
  ["workshop-online", "workshop online", "workshop online thu lead"],
  ["masterclass-b2b", "masterclass B2B", "masterclass chuyên gia B2B"],
  ["webinar-zalo", "webinar Zalo", "webinar trên Zalo Live B2B"],
  ["webinar-zoom", "webinar Zoom", "webinar Zoom marketing B2B"],
  ["attendee-engagement", "attendee engagement", "tăng tương tác người tham dự"],
  ["post-event-nurture", "post event nurture", "nuôi lead sau sự kiện"],
  ["event-roi", "event ROI", "đo ROI sự kiện marketing B2B"],
];

emitBatch(19, "500 từ khóa long-tail batch 19 — LinkedIn Marketing, B2B Lead Gen, Webinar/Events, Đông Nam Bộ mở rộng.", HELPERS, [
  { name: "A_WEB_CITY", label: "A — 200", entries: webCityBlock(IND_B19, CITIES_B19) },
  { name: "B_EXTRA_WEB", label: "B — 50", entries: B19_EXTRA.web },
  { name: "C_PRICING", label: "C — 40", entries: B19_EXTRA.pricing },
  { name: "D_LINKEDIN", label: "D — 35", entries: themedBlock("linkedin-marketing", B19_LINKEDIN, (k) => `LinkedIn Marketing ${cap(k)}`) },
  { name: "E_B2B", label: "E — 30", entries: themedBlock("lead-gen-b2b", B19_B2B, (k) => `Lead Gen B2B ${cap(k)}`) },
  { name: "F_WEBINAR", label: "F — 25", entries: themedBlock("marketing-webinar", B19_WEBINAR, (k) => `Marketing Webinar ${cap(k)}`) },
  { name: "G_MAPS", label: "G — 30", entries: B19_MAPS },
  { name: "H_MKT", label: "H — 20", entries: B19_EXTRA.mkt },
  { name: "I_COMPARE", label: "I — 25", marketing: true, entries: B19_COMPARE },
  { name: "J_PAIN", label: "J — 25", marketing: true, entries: B19_PAIN },
  { name: "K_LAGI", label: "K — 20", marketing: true, entries: B19_LAGI },
], "KEYWORDS_500_BATCH19");

emitBatch(20, "500 từ khóa long-tail batch 20 — AI Search Optimization (GEO), Schema SEO, Core Web Vitals, Miền Trung & Hà Nội mở rộng.", HELPERS, [
  { name: "A_WEB_CITY", label: "A — 200", entries: webCityBlock(B20_ALL.industries, B20_ALL.cities) },
  { name: "B_EXTRA_WEB", label: "B — 40", entries: webIndBlock(B20_ALL.extraWeb) },
  { name: "C_PRICING", label: "C — 40", entries: priceBlock(B20_ALL.pricing) },
  { name: "D_AI_SEARCH", label: "D — 35", entries: themedBlock("toi-uu-ai-search", B20_ALL.aiSearch, (k) => `Tối Ưu AI Search ${cap(k)}`, "seo") },
  { name: "E_SCHEMA", label: "E — 30", entries: themedBlock("schema-seo", B20_ALL.schema, (k) => `Schema SEO ${cap(k)}`, "seo") },
  { name: "F_CWV", label: "F — 25", entries: themedBlock("core-web-vitals", B20_ALL.cwv, (k) => `Core Web Vitals ${cap(k)}`, "seo") },
  { name: "G_MAPS", label: "G — 30", entries: mapBlock(B20_ALL.maps) },
  { name: "H_MKT", label: "H — 30", entries: mktBlock(B20_ALL.mkt) },
  { name: "I_COMPARE", label: "I — 25", marketing: true, entries: B20_ALL.compare },
  { name: "J_PAIN", label: "J — 25", marketing: true, entries: B20_ALL.pain },
  { name: "K_LAGI", label: "K — 20", marketing: true, entries: B20_ALL.lagi },
], "KEYWORDS_500_BATCH20");

console.log("Done.");

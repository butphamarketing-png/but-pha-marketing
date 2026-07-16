import {
  wrapArticle,
  img,
  toc,
  internalLinks,
  externalLinks,
  altFromKeyword,
  validateSeoKeywordPlacement,
  detectNewsTopic,
  newsThumbnailForArticle,
  newsContentImageCountForTopic,
  buildSeoMetaTitle,
  buildSeoMetaDescription,
  ensureTitleHasKeyword,
} from "./seo-article-helpers.mjs";
import {
  buildWpSeoArticle,
  wpToc,
  wpIntro,
  wpKeyTakeaways,
  wpFaq,
  wpRelatedLinks,
  wpConclusion,
  wpExternalCta,
  wpImg,
  SITE,
} from "./seo-wp-structure.mjs";
import { getPillarHubForArticle } from "./seo-pillar-hub.mjs";

const CHECKLISTS = {
  seo: [
    "Nghiên cứu từ khóa và search intent trước khi viết nội dung",
    "Audit kỹ thuật: tốc độ, mobile, sitemap, schema",
    "Tối ưu on-page: title, meta, heading H1–H3, internal link",
    "Xây content pillar và cluster theo chủ đề dịch vụ",
    "Theo dõi Search Console: impression, CTR, thứ hạng",
    "Cập nhật bài cũ và xử lý lỗi index định kỳ",
  ],
  "google-ads": [
    "Cài conversion tracking và GA4 linked đúng",
    "Nhóm từ khóa theo intent, negative keyword loại traffic rác",
    "Landing page message match với quảng cáo",
    "Test nhiều headline/description và extension",
    "Theo dõi Quality Score, CPC, CPA hàng tuần",
    "Scale ngân sách khi ROAS/CPA ổn định 2–4 tuần",
  ],
  "facebook-ads": [
    "Cài Meta Pixel và sự kiện conversion chuẩn",
    "Chia funnel: cold, warm, remarketing riêng audience",
    "Creative đa dạng: video, carousel, UGC",
    "Test audience: interest, lookalike, custom audience",
    "Giới hạn frequency tránh ad fatigue",
    "Đo CPA, ROAS và so sánh với LTV khách hàng",
  ],
  content: [
    "Lập editorial calendar theo từ khóa và funnel",
    "Mỗi bài trả lời đúng 1 search intent rõ ràng",
    "Kết hợp blog, video, infographic đa định dạng",
    "CTA rõ ràng: form, Zalo, ebook, webinar",
    "Repurpose nội dung sang social và email",
    "Đo traffic, time on page và conversion từ content",
  ],
  social: [
    "Định vị kênh phù hợp đối tượng (FB, IG, LinkedIn, TikTok)",
    "Lịch đăng đều 3–5 bài/tuần + story/reel",
    "Kết hợp giá trị, giải trí và bán hàng 80/20",
    "Phản hồi comment/inbox trong SLA 1–4 giờ",
    "Chạy ads boost bài organic hiệu quả",
    "Báo cáo reach, engagement, lead từ social",
  ],
  branding: [
    "Xác định positioning và USP khác biệt đối thủ",
    "Brand guideline: logo, màu, font, tone of voice",
    "Đồng bộ visual trên website, social, ads, offline",
    "Kể chuyện thương hiệu xuyên suốt touchpoint",
    "Đo brand recall qua survey và search brand",
    "Bảo vệ thương hiệu: trademark, phản hồi review xấu",
  ],
  analytics: [
    "Thiết lập GA4, GTM và sự kiện conversion chuẩn",
    "Dashboard KPI: traffic, lead, CPA, ROAS, LTV",
    "Attribution đa kênh — không chỉ last-click",
    "Heatmap và session recording cho landing page",
    "Review funnel drop-off hàng tuần",
    "Họp marketing/sales đồng bộ định nghĩa lead",
  ],
  strategy: [
    "Phân tích thị trường, đối thủ và SWOT",
    "Xác định ICP và customer persona chi tiết",
    "Chọn kênh ưu tiên theo ngân sách và mục tiêu",
    "Lập ngân sách marketing theo quý, có buffer test",
    "OKR/KPI rõ ràng cho từng chiến dịch",
    "Retrospective hàng tháng — scale kênh hiệu quả, cắt kênh lỗ",
  ],
};

function faq(items) {
  return `<section id="faq"><h2>Câu hỏi thường gặp</h2>${items
    .map(
      (f) =>
        `<div class="mb-4"><h3 class="text-base font-semibold text-indigo-950">${f.q}</h3><p>${f.a}</p></div>`,
    )
    .join("\n")}</section>`;
}

function checklist(items) {
  return `<ul class="list-disc space-y-2 pl-5">${items.map((item) => `<li>${item}</li>`).join("\n")}</ul>`;
}

function buildMarketingContent(entry, imgOffset, topic) {
  const kw = entry.keywordsMain;
  const alt = altFromKeyword(kw);
  const checklistItems = entry.checklist || CHECKLISTS[entry.niche] || CHECKLISTS.strategy;
  const faqItems = entry.faq || [
    {
      q: `${entry.h1.replace(/\?.*$/, "").slice(0, 55)} có hiệu quả không?`,
      a: "Có — khi triển khai đúng quy trình, đo KPI và tối ưu liên tục theo dữ liệu thực tế.",
    },
    {
      q: `Chi phí ${kw} khoảng bao nhiêu?`,
      a: "Tùy quy mô và kênh: từ vài triệu/tháng (SME) đến hàng chục triệu cho chiến dịch đa kênh; báo giá sau khảo sát mục tiêu.",
    },
    {
      q: "Bao lâu thấy kết quả marketing?",
      a: "Ads có thể có lead trong vài ngày; SEO và content thường 3–6 tháng; branding cần 6–12 tháng kiên trì.",
    },
  ];

  return `
${toc([
  { id: "tong-quan", label: "Tổng quan" },
  { id: "tai-sao", label: "Vì sao cần đầu tư" },
  { id: "chien-luoc", label: "Chiến lược triển khai" },
  { id: "do-luong", label: "Đo lường KPI" },
  { id: "faq", label: "Câu hỏi thường gặp" },
])}
<p><strong>${kw}</strong> là chủ đề nhiều doanh nghiệp Việt quan tâm khi muốn tăng trưởng bền vững trên môi trường số. Bài viết tập trung vào ${entry.angle} — giúp bạn hiểu bức tranh tổng thể trước khi triển khai hoặc thuê agency.</p>
<p>Trong bối cảnh cạnh tranh digital ngày càng gay gắt, <strong>${kw}</strong> không còn là “tùy chọn” mà là yếu tố then chốt để thu hút đúng khách, tối ưu chi phí và đo lường ROI rõ ràng.</p>
${img(imgOffset, alt, topic)}
<h2 id="tong-quan">${entry.h1.replace(/\?.*$/, "").trim()} — Tổng quan</h2>
<p><strong>${kw}</strong> xoay quanh ${entry.angle}. Khác với làm marketing theo cảm tính, cách tiếp cận có hệ thống giúp bạn biết đầu tư vào đâu, kỳ vọng gì và khi nào cần điều chỉnh.</p>
<p>Website chuẩn SEO thường là điểm đến trung tâm — mọi chiến dịch ads, social và email đều dẫn về đây để chuyển đổi và lưu dữ liệu khách hàng.</p>
<h2 id="tai-sao">Vì sao doanh nghiệp cần ${kw}?</h2>
<p>Khách hàng tìm kiếm thông tin trên Google, social và video trước khi quyết định mua. Thiếu chiến lược <strong>${kw}</strong> khiến bạn mất cơ hội so với đối thủ, chi phí acquisition tăng và khó scale.</p>
<p>Ngược lại, triển khai đúng hướng giúp tăng nhận diện thương hiệu, thu lead chất lượng và tạo nguồn doanh thu lặp lại từ khách cũ.</p>
${img(imgOffset + 1, alt, topic)}
<h2 id="chien-luc">Chiến lược triển khai ${kw}</h2>
<p>Checklist thực hành khi bắt đầu với <strong>${kw}</strong>:</p>
${checklist(checklistItems)}
<p>Nên bắt đầu với mục tiêu SMART (cụ thể, đo được, có thời hạn) — ví dụ: 50 lead/tháng, CPA dưới X triệu, ROAS trên 3 — thay vì chỉ “tăng doanh số”.</p>
<h2 id="do-luong">Đo lường và tối ưu liên tục</h2>
<p>Theo dõi KPI phù hợp loại hình: traffic, lead, conversion rate, CPA, ROAS, LTV, retention. Dùng GA4, pixel ads và CRM để có một nguồn sự thật. Review hàng tuần, scale kênh hiệu quả và dừng kênh lỗ.</p>
<p>Đội Bứt Phá Marketing hỗ trợ tư vấn <strong>${kw}</strong> kết hợp website, SEO và quảng cáo — triển khai trọn gói hoặc theo module tùy ngân sách.</p>
${img(imgOffset + 2, alt, topic)}
${internalLinks()}
${externalLinks()}
${faq(faqItems)}
`;
}

function hasVietnamese(text) {
  return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(
    String(text || ""),
  );
}

/** Làm sạch angle/description cũ: bỏ "kw:", "Hướng dẫn triển khai…", dấu ".." */
function sanitizeAngleHint(angle, kw) {
  let a = String(angle || "").trim();
  if (!a) return "";
  const kwEsc = String(kw || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (kwEsc) {
    a = a.replace(new RegExp(`^${kwEsc}\\s*[—:\\-]\\s*`, "i"), "");
  }
  a = a.replace(/\s*Hướng dẫn triển khai và đo lường hiệu quả\.?/gi, "");
  a = a.replace(/\s*Tư vấn Bứt Phá Marketing\.?/gi, "");
  a = a.replace(/\.{2,}/g, ".");
  a = a.replace(/\s+/g, " ").trim();
  a = a.replace(/[.\s]+$/g, "").trim();
  // Bỏ hint bị “nhiễm” lặp (meta cũ seed lại nhiều lần)
  if ((a.match(/—/g) || []).length >= 2) return "";
  // Bỏ nếu còn là chuỗi tiếng Anh thuần / quá ngắn vô nghĩa
  if (!a || a.length < 4) return "";
  if (!hasVietnamese(a) && /^[A-Za-z0-9 +/,&\-().]+$/.test(a) && a.split(/\s+/).length <= 6) {
    return "";
  }
  // Cắt gọn hint cho meta
  if (a.length > 90) a = a.slice(0, 87).replace(/\s+\S*$/, "").trim();
  return a;
}

/** Không dump angle tiếng Anh thô vào câu tiếng Việt. */
function humanizeAngle(angle, kw, intent = "guide") {
  const cleaned = sanitizeAngleHint(angle, kw);
  const term = extractTerm(kw);
  if (cleaned && hasVietnamese(cleaned)) return cleaned;
  if (intent === "lagi") return `định nghĩa ${term} và cách áp dụng thực tế`;
  if (intent === "compare") return `tiêu chí chọn đúng theo mục tiêu và KPI`;
  if (intent === "problem") return `nguyên nhân thường gặp và cách khắc phục`;
  return `hướng dẫn triển khai ${kw} đúng trọng tâm tiêu đề`;
}

function detectMarketingIntent(kw, h1 = "") {
  const text = `${kw} ${h1}`.toLowerCase();
  if (/là gì/.test(text)) return "lagi";
  if (/\bhay\b/.test(text) || /\bvs\b/.test(text) || /khác gì|so sánh/.test(text)) return "compare";
  if (
    /(cao|thấp|sai|không|lỗi|bị|quá|loãng|hết nhanh|ít lead|từ chối|hạn chế|không track|không đồng bộ|duplicate|fatigue)/.test(
      text,
    )
  ) {
    return "problem";
  }
  return "guide";
}

function extractTerm(kw) {
  return String(kw || "")
    .replace(/\s*là gì\s*/gi, " ")
    .replace(/\?+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCompareSides(kw) {
  const m = String(kw || "").match(/^(.+?)\s+hay\s+(.+)$/i);
  if (!m) return { a: extractTerm(kw), b: "lựa chọn thay thế" };
  return { a: m[1].trim(), b: m[2].trim() };
}

function nicheChecklist(entry) {
  return entry.checklist || CHECKLISTS[entry.niche] || CHECKLISTS.strategy;
}

function defaultLongFaq(keyword, h1, intent = "guide") {
  const short = h1.replace(/\?.*$/, "").trim().slice(0, 55);
  const term = extractTerm(keyword);
  if (intent === "lagi") {
    return [
      { q: `${keyword} — giải thích ngắn?`, a: `${term} là khái niệm/công cụ cần hiểu đúng trước khi triển khai ngân sách marketing liên quan.` },
      { q: `Khi nào doanh nghiệp cần quan tâm ${keyword}?`, a: `Khi bạn đang dùng hoặc sắp dùng ${term} trong chiến dịch và cần định nghĩa vận hành được, không chỉ thuật ngữ.` },
      { q: `${term} khác các khái niệm gần nghĩa thế nào?`, a: `Đọc kỹ phần định nghĩa và thành phần trong bài — tránh nhầm sang công cụ cùng hệ sinh thái nhưng mục đích khác.` },
      { q: `Tự tìm hiểu ${keyword} rồi tự làm được không?`, a: "Được ở mức nền tảng; phần tracking/tối ưu nâng cao nên có người có kinh nghiệm để tránh đốt ngân sách." },
      { q: "Bứt Phá Marketing hỗ trợ gì?", a: "Tư vấn miễn phí, triển khai website/SEO/ads và báo cáo KPI minh bạch theo mục tiêu thực tế." },
    ];
  }
  if (intent === "compare") {
    const { a, b } = parseCompareSides(keyword);
    return [
      { q: `${keyword}?`, a: `Không có đáp án tuyệt đối — chọn ${a} hoặc ${b} theo mục tiêu KPI, ngân sách và nơi khách đang quyết định.` },
      { q: "Có dùng kết hợp được không?", a: "Thường được nếu tách ngân sách và mục tiêu rõ; tránh để hai lựa chọn tranh cùng một tệp." },
      { q: "Nên test bao lâu?", a: "Ít nhất hết giai đoạn học + đủ chuyển đổi để so; thường 5–14 ngày tùy budget." },
      { q: "KPI nào để quyết?", a: "CPA/CPL/ROAS hoặc inbox chất lượng — không chỉ CTR hay reach." },
      { q: "Bứt Phá Marketing hỗ trợ gì?", a: "Tư vấn chọn hướng và triển khai đo lường đúng trước khi scale." },
    ];
  }
  if (intent === "problem") {
    return [
      { q: `${keyword} do đâu?`, a: "Thường đến từ tracking sai, audience/creative/landing lệch, hoặc cấu hình mục tiêu không khớp KPI." },
      { q: "Sửa mất bao lâu?", a: "Lỗi tracking có thể 1–2 ngày; audience/creative thường cần 3–7 ngày data sau khi chỉnh." },
      { q: "Có nên dừng hết ads?", a: "Ưu tiên giảm budget hoặc pause ad set lỗi — không nhất thiết tắt cả tài khoản nếu vẫn đo được." },
      { q: `Làm sao biết đã hết ${short}?`, a: "KPI chính (CPA/ROAS/CTR/EMQ…) ổn định lại trong vài ngày và triệu chứng ban đầu giảm." },
      { q: "Bứt Phá Marketing hỗ trợ gì?", a: "Audit tài khoản, sửa tracking/landing/creative và đưa checklist tối ưu theo tuần." },
    ];
  }
  return [
    {
      q: `${short} có hiệu quả không?`,
      a: "Có — khi bám đúng mục tiêu của tiêu đề, đo KPI và tối ưu theo dữ liệu thực tế.",
    },
    {
      q: `Chi phí liên quan ${keyword} khoảng bao nhiêu?`,
      a: "Tùy quy mô: SME thường test từ vài triệu/tháng rồi scale khi CPA/ROAS ổn.",
    },
    {
      q: `Nên tự làm ${keyword} hay thuê agency?`,
      a: "SME nên thuê giai đoạn đầu + đào tạo nội bộ; đội có kinh nghiệm có thể hybrid.",
    },
    {
      q: "Đo bằng KPI nào?",
      a: "Gắn KPI với mục tiêu bài viết: lead, CPA, ROAS, inbox hoặc traffic chất lượng — không chỉ vanity metrics.",
    },
    {
      q: "Bứt Phá Marketing hỗ trợ gì?",
      a: "Tư vấn miễn phí, triển khai website, SEO, quảng cáo và báo cáo KPI minh bạch.",
    },
  ];
}

function buildLaGiLongForm(entry, imgIdx, angleVi, checklistItems, faqItems) {
  const kw = entry.keywordsMain;
  const term = extractTerm(kw);
  const h1 = entry.h1.replace(/\?.*$/, "").trim();
  return `
${wpToc([
  { id: "dinh-nghia", label: `${term} là gì?` },
  { id: "thanh-phan", label: "Thành phần / cách hoạt động" },
  { id: "vi-sao", label: "Vì sao cần hiểu rõ" },
  { id: "cach-lam", label: "Cách bắt đầu" },
  { id: "sai-lam", label: "Sai lầm thường gặp" },
  { id: "faq", label: "FAQ" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: kw,
  paragraphs: [
    `<strong>${kw}</strong> — bài viết trả lời đúng tiêu đề <em>${h1}</em>: định nghĩa <strong>${term}</strong>, cách hoạt động và checklist áp dụng. Trọng tâm: ${angleVi}.`,
    `Nếu bạn đang tìm <strong>${kw}</strong>, cần định nghĩa vận hành được cho đúng cụm từ khóa này — không phải checklist marketing chung cho mọi kênh.`,
  ],
})}

${wpKeyTakeaways([
  `${kw}: hiểu đúng ${term} trước khi bỏ ngân sách.`,
  `Bám ${angleVi} — đúng phạm vi tiêu đề từ khóa.`,
  "Đo bằng KPI gắn với mục tiêu chuyển đổi liên quan.",
  "Tránh nhầm với khái niệm gần nghĩa trong cùng hệ sinh thái.",
  "Bứt Phá Marketing hỗ trợ triển khai và đo lường.",
])}

${wpImg(imgIdx, `${kw} — định nghĩa ${term}`)}

<h2 id="dinh-nghia">${/là gì/i.test(kw) ? kw.replace(/\?+$/, "") + "?" : `${term} là gì?`}</h2>
<p><strong>${kw}</strong> xoay quanh khái niệm <strong>${term}</strong>. Nói ngắn: đây là thành phần bạn cần hiểu để cấu hình, đo lường hoặc tối ưu đúng — với góc nhìn ${angleVi}.</p>
<p>Phần còn lại của bài đi sâu thành phần, lý do dùng và bước bắt đầu thực tế cho SME Việt Nam, luôn bám <strong>${kw}</strong>.</p>

<h2 id="thanh-phan">Thành phần và cách ${term} hoạt động</h2>
<p>Khi triển khai liên quan <strong>${kw}</strong>, thường gặp các lớp sau (điều chỉnh theo niche ${entry.niche || "marketing"}):</p>
${checklist(checklistItems)}

${wpImg(imgIdx + 1, `${kw} — thành phần ${term}`)}

<h2 id="vi-sao">Vì sao cần hiểu ${kw}?</h2>
<ul>
  <li>Tránh setup sai vì hiểu nhầm thuật ngữ.</li>
  <li>Chọn đúng công cụ/mục tiêu thay vì copy chiến lược lệch ngữ cảnh.</li>
  <li>Đo được kết quả gắn với ${term}, không chỉ vanity metrics.</li>
  <li>Brief agency/freelancer rõ ràng hơn.</li>
</ul>

<h2 id="cach-lam">Cách bắt đầu với ${term}</h2>
<ol class="list-decimal space-y-2 pl-5">
  <li>Chốt mục tiêu kinh doanh gắn với ${term} (lead, traffic, đơn…).</li>
  <li>Audit hiện trạng: đang dùng ${term} thế nào, thiếu gì.</li>
  <li>Cấu hình đúng checklist phía trên — ưu tiên đo lường sạch.</li>
  <li>Chạy thử nhỏ 3–7 ngày, đọc KPI liên quan.</li>
  <li>Tối ưu theo dữ liệu rồi mới scale ngân sách.</li>
</ol>

${wpImg(imgIdx + 2, `${kw} — checklist triển khai`)}

<h2 id="sai-lam">Sai lầm thường gặp về ${term}</h2>
<ul>
  <li>Nhồi nội dung marketing chung, không trả lời đúng ${kw}.</li>
  <li>Setup xong nhưng không đo / không test sự kiện.</li>
  <li>Copy cấu hình ngành khác không khớp funnel của bạn.</li>
  <li>Tối ưu quá sớm khi chưa đủ dữ liệu học.</li>
</ul>
`;
}

function buildCompareLongForm(entry, imgIdx, angleVi, checklistItems, faqItems) {
  const kw = entry.keywordsMain;
  const { a, b } = parseCompareSides(kw);
  const h1 = entry.h1.replace(/\?.*$/, "").trim();
  return `
${wpToc([
  { id: "tra-loi", label: "Trả lời ngắn" },
  { id: "so-sanh", label: "So sánh chi tiết" },
  { id: "chon-a", label: `Khi chọn ${a}` },
  { id: "chon-b", label: `Khi chọn ${b}` },
  { id: "cach-lam", label: "Cách quyết định" },
  { id: "sai-lam", label: "Sai lầm thường gặp" },
  { id: "faq", label: "FAQ" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: kw,
  paragraphs: [
    `Câu hỏi <strong>${kw}</strong> không có đáp án một chiều: <strong>${a}</strong> và <strong>${b}</strong> phục vụ ngữ cảnh khác nhau. Bài viết bám tiêu đề <em>${h1}</em> — so sánh rõ và gợi ý khi nào chọn bên nào. Trọng tâm: ${angleVi}.`,
    `Đọc để quyết theo KPI, không theo thói quen hay “mọi người đang làm gì”.`,
  ],
})}

${wpKeyTakeaways([
  `${kw}: chọn theo mục tiêu, không theo trend.`,
  `${a} phù hợp một nhóm tình huống; ${b} phù hợp nhóm khác.`,
  `Trọng tâm so sánh: ${angleVi}.`,
  "Test nhỏ rồi scale bên thắng theo CPA/ROAS.",
  "Có thể kết hợp nếu tách ngân sách rõ.",
])}

${wpImg(imgIdx, `${kw} — so sánh nhanh`)}

<h2 id="tra-loi">${kw} — trả lời ngắn</h2>
<p><strong>${a}</strong> và <strong>${b}</strong> đều có chỗ đứng. Hướng xử lý thực tế xoay quanh ${angleVi}: chọn cái khớp hành trình khách và KPI bạn đang tối ưu.</p>

<h2 id="so-sanh">Bảng so sánh ${a} và ${b}</h2>
<table class="w-full border-collapse text-sm my-6">
  <thead><tr class="bg-indigo-50">
    <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
    <th class="border border-indigo-100 px-3 py-2 text-left">${a}</th>
    <th class="border border-indigo-100 px-3 py-2 text-left">${b}</th>
  </tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2"><strong>Điểm mạnh</strong></td><td class="border border-indigo-100 px-3 py-2">Phù hợp khi ưu tiên kiểm soát / đặc thù của ${a}</td><td class="border border-indigo-100 px-3 py-2">Phù hợp khi ưu tiên linh hoạt / đặc thù của ${b}</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2"><strong>Rủi ro</strong></td><td class="border border-indigo-100 px-3 py-2">Dùng sai ngữ cảnh sẽ đốt ngân sách học</td><td class="border border-indigo-100 px-3 py-2">Dùng sai ngữ cảnh sẽ lệch KPI</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2"><strong>Góc nhìn</strong></td><td class="border border-indigo-100 px-3 py-2" colspan="2">${angleVi}</td></tr>
  </tbody>
</table>

${wpImg(imgIdx + 1, `${kw} — bảng so sánh`)}

<h2 id="chon-a">Khi nào nên chọn ${a}?</h2>
<p>Chọn <strong>${a}</strong> khi mục tiêu và ràng buộc của bạn khớp hơn với đặc thù bên này — đặc biệt trong ngữ cảnh ${angleVi}.</p>

<h2 id="chon-b">Khi nào nên chọn ${b}?</h2>
<p>Chọn <strong>${b}</strong> khi bạn cần ưu điểm đối lập hoặc bổ sung cho ${a}, vẫn bám KPI đã chốt.</p>

<h2 id="cach-lam">Cách quyết định ${kw}</h2>
${checklist(checklistItems)}
<ol class="list-decimal space-y-2 pl-5">
  <li>Chốt 1 KPI chính (CPA, ROAS, CPL, inbox…).</li>
  <li>Test ${a} và ${b} với creative/landing tương đương nếu budget cho phép.</li>
  <li>Đọc kết quả sau learning + đủ chuyển đổi.</li>
  <li>Scale bên thắng; giữ test nhỏ bên còn lại khi cần.</li>
</ol>

${wpImg(imgIdx + 2, `${kw} — quy trình chọn`)}

<h2 id="sai-lam">Sai lầm khi trả lời ${kw}</h2>
<ul>
  <li>Chọn theo thói quen, bỏ qua KPI.</li>
  <li>Đổi quá nhiều biến cùng lúc — không biết yếu tố nào thắng.</li>
  <li>Kết luận sau 1 ngày chạy.</li>
  <li>Để hai lựa chọn tranh cùng tệp không exclusion.</li>
</ul>
`;
}

function buildProblemLongForm(entry, imgIdx, angleVi, checklistItems, faqItems) {
  const kw = entry.keywordsMain;
  const h1 = entry.h1.replace(/\?.*$/, "").trim();
  return `
${wpToc([
  { id: "van-de", label: "Vấn đề là gì?" },
  { id: "trieu-chung", label: "Triệu chứng" },
  { id: "nguyen-nhan", label: "Nguyên nhân" },
  { id: "cach-sua", label: "Cách xử lý" },
  { id: "sai-lam", label: "Sai lầm khi xử lý" },
  { id: "faq", label: "FAQ" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: kw,
  paragraphs: [
    `<strong>${kw}</strong> là tình huống cần xử lý đúng trọng tâm tiêu đề <em>${h1}</em> — không lan man sang chiến lược marketing chung. Hướng xử lý xoay quanh ${angleVi}.`,
    `Bài viết đi theo triệu chứng → nguyên nhân → checklist sửa để bạn hành động ngay trên tài khoản/chiến dịch đang chạy.`,
  ],
})}

${wpKeyTakeaways([
  `Nhận đúng ${kw} trước khi tăng budget.`,
  `Ưu tiên sửa theo ${angleVi}.`,
  "Sửa tracking/message trước khi đổ lỗi thuật toán.",
  "Đổi từng lớp, ghi log thay đổi.",
  "Scale lại khi KPI ổn vài ngày.",
])}

${wpImg(imgIdx, `${kw} — nhận diện vấn đề`)}

<h2 id="van-de">${kw} — vấn đề là gì?</h2>
<p><strong>${kw}</strong> nghĩa là kết quả chiến dịch đang lệch kỳ vọng gắn với tiêu đề bài. Nếu bỏ qua, bạn sẽ tiếp tục đốt ngân sách trên giả định sai.</p>

<h2 id="trieu-chung">Triệu chứng nhận biết</h2>
<ul>
  <li>KPI chính xấu đi đúng lúc xuất hiện ${kw}.</li>
  <li>Số liệu Ads / analytics / CRM không khớp.</li>
  <li>Creative hoặc audience bão hòa (CTR giảm, frequency tăng).</li>
  <li>Landing/form không chuyển dù traffic vẫn vào.</li>
</ul>

${wpImg(imgIdx + 1, `${kw} — triệu chứng`)}

<h2 id="nguyen-nhan">Nguyên nhân thường gặp</h2>
<p>Trong ngữ cảnh ${angleVi}, các nguyên nhân phổ biến gồm:</p>
${checklist(checklistItems)}

<h2 id="cach-sua">Cách xử lý ${kw} từng bước</h2>
<ol class="list-decimal space-y-2 pl-5">
  <li>Xác nhận số liệu nguồn nào đúng (Ads Manager, GA4, CRM, Events).</li>
  <li>Kiểm tra tracking và message-match quảng cáo → điểm đến.</li>
  <li>Rà audience overlap, frequency, exclusion.</li>
  <li>Đổi creative/offer theo một giả thuyết rõ.</li>
  <li>Chạy lại test nhỏ 3–7 ngày rồi mới tăng ngân sách.</li>
</ol>

${wpImg(imgIdx + 2, `${kw} — checklist sửa`)}

<h2 id="sai-lam">Sai lầm khi xử lý ${kw}</h2>
<ul>
  <li>Tăng budget ngay khi chưa rõ nguyên nhân.</li>
  <li>Sửa quá nhiều biến cùng lúc.</li>
  <li>Bỏ qua tracking — tối ưu trên số ảo.</li>
  <li>Tắt hết chiến dịch chỉ vì một ngày xấu.</li>
</ul>
`;
}

function buildGuideLongForm(entry, imgIdx, angleVi, checklistItems, faqItems) {
  const kw = entry.keywordsMain;
  const h1 = entry.h1.replace(/\?.*$/, "").trim();
  return `
${wpToc([
  { id: "tra-loi", label: "Trọng tâm tiêu đề" },
  { id: "tai-sao", label: "Vì sao quan trọng" },
  { id: "cach-lam", label: "Cách triển khai" },
  { id: "do-luong", label: "Đo lường" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "FAQ" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: kw,
  paragraphs: [
    `Bài viết bám đúng tiêu đề <em>${h1}</em> và từ khóa <strong>${kw}</strong>: giải thích phạm vi, cách làm và KPI — trọng tâm ${angleVi}.`,
    `Không dùng khuôn mẫu “marketing tổng quát” lan sang kênh không liên quan tiêu đề.`,
  ],
})}

${wpKeyTakeaways([
  `${kw} phải gắn mục tiêu kinh doanh cụ thể.`,
  `Ưu tiên ${angleVi}.`,
  "Đo KPI hàng tuần; scale cái hiệu quả.",
  "Landing/message-match quyết định chuyển đổi.",
  "Bứt Phá Marketing hỗ trợ triển khai theo module.",
])}

${wpImg(imgIdx, `${kw} — tổng quan`)}

<h2 id="tra-loi">${kw} — trọng tâm cần nắm</h2>
<p>Tiêu đề <em>${h1}</em> và từ khóa <strong>${kw}</strong> tập trung vào ${angleVi}. Mọi checklist bên dưới phục vụ đúng phạm vi này — không thay bằng chiến lược đa kênh chung chung.</p>

<h2 id="tai-sao">Vì sao ${kw} quan trọng?</h2>
<ul>
  <li>Giúp phân bổ ngân sách đúng chỗ thay vì cảm tính.</li>
  <li>Giảm CPA dài hạn khi cấu hình và đo lường sạch.</li>
  <li>Tạo quy trình có thể lặp lại khi scale.</li>
</ul>

${wpImg(imgIdx + 1, `${kw} — triển khai`)}

<h2 id="cach-lam">Cách triển khai ${kw}</h2>
${checklist(checklistItems)}
<ol class="list-decimal space-y-2 pl-5">
  <li>Audit hiện trạng liên quan trực tiếp ${kw}.</li>
  <li>Đặt mục tiêu SMART (lead/CPA/ROAS) trong 30/60/90 ngày.</li>
  <li>Triển khai test nhỏ trước khi scale.</li>
  <li>Review KPI hàng tuần và cắt phần lỗ.</li>
</ol>

<h2 id="do-luong">Đo lường KPI cho ${kw}</h2>
<table class="w-full border-collapse text-sm my-6">
  <thead><tr class="bg-indigo-50">
    <th class="border border-indigo-100 px-3 py-2 text-left">Nhóm</th>
    <th class="border border-indigo-100 px-3 py-2 text-left">KPI gợi ý</th>
  </tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2">Nhận diện</td><td class="border border-indigo-100 px-3 py-2">Reach, impression, CTR</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Chuyển đổi</td><td class="border border-indigo-100 px-3 py-2">Lead, CPA, conversion rate, ROAS</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Chất lượng</td><td class="border border-indigo-100 px-3 py-2">Lead nghe máy, LTV, tỷ lệ chốt</td></tr>
  </tbody>
</table>

${wpImg(imgIdx + 2, `${kw} — đo lường`)}

<h2 id="sai-lam">Sai lầm thường gặp với ${kw}</h2>
<ul>
  <li>Làm lệch tiêu đề — viết bài chung chung không trả lời ${kw}.</li>
  <li>Không đo conversion, chỉ nhìn like/traffic.</li>
  <li>Landing không khớp thông điệp.</li>
  <li>Scale khi chưa có data ổn định.</li>
</ul>
`;
}

function pillarRelatedLinks(entry) {
  const hub = getPillarHubForArticle({
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    title: entry.h1,
  });
  const links = hub.links.slice(0, 3).map((p) => ({
    href: `${SITE}/blog/${p.slug}`,
    label: p.label,
    desc: `Pillar ${p.keyword} — đọc trước khi đi sâu.`,
  }));
  links.push({
    href: `${SITE}${hub.service.serviceHref}`,
    label: hub.service.serviceLabel,
    desc: "Dịch vụ Bứt Phá Marketing.",
  });
  return links;
}

function buildMarketingLongFormContent(entry, imgOffset, topic) {
  const kw = entry.keywordsMain;
  const intent = detectMarketingIntent(kw, entry.h1);
  const angleVi = humanizeAngle(entry.angle, kw, intent);
  const checklistItems = nicheChecklist(entry);
  const faqItems = entry.faq || defaultLongFaq(kw, entry.h1, intent);
  const imgIdx = imgOffset % 8;

  let body;
  if (intent === "lagi") body = buildLaGiLongForm(entry, imgIdx, angleVi, checklistItems, faqItems);
  else if (intent === "compare") body = buildCompareLongForm(entry, imgIdx, angleVi, checklistItems, faqItems);
  else if (intent === "problem") body = buildProblemLongForm(entry, imgIdx, angleVi, checklistItems, faqItems);
  else body = buildGuideLongForm(entry, imgIdx, angleVi, checklistItems, faqItems);

  const conclusionLead =
    intent === "lagi"
      ? `Tóm lại, <strong>${kw}</strong> cần được hiểu đúng định nghĩa trước khi tối ưu ngân sách — trọng tâm ${angleVi}.`
      : intent === "compare"
        ? `Với câu hỏi <strong>${kw}</strong>: chọn theo KPI và ngữ cảnh (${angleVi}), không theo cảm tính.`
        : intent === "problem"
          ? `Khi gặp <strong>${kw}</strong>: sửa đúng nguyên nhân (${angleVi}) rồi mới scale.`
          : `Triển khai <strong>${kw}</strong> đúng phạm vi tiêu đề — trọng tâm ${angleVi} — giúp đo được kết quả thay vì chạy cảm tính.`;

  return `
${body}

${wpRelatedLinks(pillarRelatedLinks(entry))}

${wpFaq({ keyword: kw, items: faqItems })}

${wpConclusion({
  keyword: kw,
  paragraphs: [
    conclusionLead,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn ${kw} — roadmap và báo giá theo mục tiêu thực tế.`,
  ],
  ctaLabel: "→ Đặt lịch tư vấn miễn phí",
  ctaHref: `${SITE}/lien-he`,
})}

${wpExternalCta()}
`;
}

/** Bản dài chuẩn WP SEO — intent-aware (là gì / so sánh / lỗi / hướng dẫn). */
export function buildMarketingLongFormFromEntry(entry, index = 0) {
  const title = ensureTitleHasKeyword(entry.h1, entry.keywordsMain);
  const entryWithTitle = { ...entry, h1: title };
  const topic = detectNewsTopic({
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    title,
    niche: entry.niche,
  });
  const imgOffset = (index + 3) % newsContentImageCountForTopic(topic);
  const metaTitle = buildSeoMetaTitle(entry.keywordsMain);
  const intent = detectMarketingIntent(entry.keywordsMain, entry.h1);
  const angleVi = humanizeAngle(entry.angle, entry.keywordsMain, intent);
  const metaDescription = buildSeoMetaDescription(entry.keywordsMain, angleVi, intent);
  const description = metaDescription;

  const html = buildMarketingLongFormContent(entryWithTitle, imgOffset, topic);

  return {
    title,
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: `${entry.keywordsMain}, ${entry.niche || "marketing"}, marketing online, bứt phá marketing`,
    metaTitle,
    metaDescription,
    description,
    imageUrl: newsThumbnailForArticle({
      slug: entry.slug,
      keywordsMain: entry.keywordsMain,
      title,
      niche: entry.niche,
    }),
    content: buildWpSeoArticle({ metaTitle, keyword: entry.keywordsMain, html }),
  };
}

/** @param {{ slug: string, keywordsMain: string, h1: string, angle: string, niche?: string, checklist?: string[], faq?: { q: string, a: string }[] }} entry */
export function buildMarketingArticleFromEntry(entry, index = 0) {
  const topic = detectNewsTopic({
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    title: entry.h1,
    niche: entry.niche,
  });
  const imgOffset = (index + 3) % newsContentImageCountForTopic(topic);
  const intent = detectMarketingIntent(entry.keywordsMain, entry.h1);
  const angleVi = humanizeAngle(entry.angle, entry.keywordsMain, intent);
  const metaDescription = buildSeoMetaDescription(entry.keywordsMain, angleVi, intent);
  const description = metaDescription;
  const metaTitle = buildSeoMetaTitle(entry.keywordsMain);

  return {
    title: entry.h1,
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: `${entry.keywordsMain}, ${entry.niche || "marketing"}, marketing online, bứt phá marketing`,
    metaTitle,
    metaDescription,
    description,
    imageUrl: newsThumbnailForArticle({
      slug: entry.slug,
      keywordsMain: entry.keywordsMain,
      title: entry.h1,
      niche: entry.niche,
    }),
    content: wrapArticle({
      metaTitle,
      html: buildMarketingContent(entry, imgOffset, topic),
    }),
  };
}

export function validateMarketingArticle(article) {
  return validateSeoKeywordPlacement({
    keywordsMain: article.keywordsMain,
    title: article.title,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    description: article.description,
    imageAlts: [altFromKeyword(article.keywordsMain)],
  });
}

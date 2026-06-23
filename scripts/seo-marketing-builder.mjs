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

function defaultLongFaq(keyword, h1) {
  const short = h1.replace(/\?.*$/, "").trim().slice(0, 55);
  return [
    {
      q: `${short} có hiệu quả không?`,
      a: "Có — khi triển khai đúng quy trình, đo KPI và tối ưu liên tục theo dữ liệu thực tế.",
    },
    {
      q: `Chi phí ${keyword} khoảng bao nhiêu?`,
      a: "Tùy quy mô và kênh: từ vài triệu/tháng (SME) đến hàng chục triệu cho chiến dịch đa kênh; báo giá sau khảo sát mục tiêu.",
    },
    {
      q: "Bao lâu thấy kết quả marketing?",
      a: "Ads có thể có lead trong vài ngày; SEO và content thường 3–6 tháng; branding cần 6–12 tháng kiên trì.",
    },
    {
      q: `Nên tự làm ${keyword} hay thuê agency?`,
      a: "SME nên thuê triển khai ban đầu + đào tạo nội bộ; doanh nghiệp lớn có thể hybrid team in-house và agency chuyên sâu.",
    },
    {
      q: "Kênh nào nên ưu tiên trước?",
      a: "Website + Google (SEO/Maps) làm nền; thêm Facebook Ads hoặc Google Ads tùy ngành và hành vi khách mục tiêu.",
    },
    {
      q: "Bứt Phá Marketing hỗ trợ gì?",
      a: "Tư vấn miễn phí, triển khai website, SEO, quảng cáo Facebook/Google và báo cáo KPI minh bạch.",
    },
  ];
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
  const h1 = entry.h1.replace(/\?.*$/, "").trim();
  const checklistItems = entry.checklist || CHECKLISTS[entry.niche] || CHECKLISTS.strategy;
  const faqItems = entry.faq || defaultLongFaq(kw, entry.h1);
  const imgIdx = imgOffset % 8;

  return `
${wpToc([
  { id: "tong-quan", label: "Tổng quan" },
  { id: "tai-sao", label: "Vì sao cần đầu tư" },
  { id: "chien-luoc", label: "Chiến lược triển khai" },
  { id: "quy-trinh", label: "Quy trình 5 bước" },
  { id: "do-luong", label: "Đo lường KPI" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "FAQ" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: kw,
  paragraphs: [
    `${kw} là chủ đề nhiều doanh nghiệp Việt quan tâm — đặc biệt khi ${entry.angle}. Khác với làm marketing theo cảm tính, cách tiếp cận có hệ thống giúp bạn biết đầu tư vào đâu, kỳ vọng gì và khi nào scale.`,
    `Bài viết dành cho chủ SME, marketer và quản lý đang tìm hiểu ${kw}: checklist thực chiến, quy trình triển khai, KPI cần theo dõi và FAQ — áp dụng ngay tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  `${kw} cần gắn với mục tiêu kinh doanh cụ thể — lead, doanh số hoặc nhận diện.`,
  `Ưu tiên ${entry.angle} — không copy chiến lược ngành khác.`,
  "Website + đo lường (GA4, pixel) là nền mọi kênh marketing.",
  "Review KPI hàng tuần; scale kênh hiệu quả, cắt kênh lỗ.",
  "Bứt Phá Marketing: tư vấn miễn phí và triển khai trọn gói.",
])}

${wpImg(imgIdx, `${kw} — ${entry.angle}`)}

<h2 id="tong-quan">${h1} — Tổng quan</h2>
<p><strong>${kw}</strong> xoay quanh ${entry.angle}. Trong hệ sinh thái digital, mọi touchpoint — Google, Facebook, email, Maps — cần thống nhất thông điệp và dẫn về điểm chuyển đổi (website, form, Zalo).</p>
<p>Doanh nghiệp thành công với <strong>${kw}</strong> thường có: persona khách rõ, nội dung trả lời đúng câu hỏi search intent, landing page message-match và quy trình chăm sóc lead sau khi thu về.</p>

<h2 id="tai-sao">Vì sao doanh nghiệp cần ${kw}?</h2>
<ul>
  <li><strong>Cạnh tranh:</strong> Đối thủ đã đầu tư digital — bạn chậm = mất thị phần.</li>
  <li><strong>Chi phí:</strong> Làm đúng giảm CPA dài hạn so với chạy ads mù quáng.</li>
  <li><strong>Dữ liệu:</strong> Biết kênh nào hiệu quả — không phụ thuộc cảm giác.</li>
  <li><strong>Scale:</strong> Quy trình chuẩn giúp nhân rộng khi tăng ngân sách.</li>
  <li><strong>Thương hiệu:</strong> Nhất quán trên mọi kênh tăng trust và tỷ lệ chốt.</li>
</ul>

${wpImg(imgIdx + 1, `Chiến lược ${kw}`)}

<h2 id="chien-luc">Chiến lược triển khai ${kw}</h2>
<p>Checklist thực hành khi bắt đầu với <strong>${kw}</strong>:</p>
${checklist(checklistItems)}
<p>Kết hợp organic (SEO, content) và paid (Facebook Ads, Google Ads) theo ngân sách: SME thường 60% nền tảng + 40% test ads; khi có data ổn định thì đảo ngược tỷ lệ scale paid.</p>

<h2 id="quy-trinh">Quy trình 5 bước triển khai ${kw}</h2>
<ol class="list-decimal space-y-2 pl-5">
  <li><strong>Audit hiện trạng:</strong> Website, fanpage, ads, đối thủ và từ khóa khách đang tìm.</li>
  <li><strong>Đặt mục tiêu SMART:</strong> Số lead, CPA, ROAS hoặc doanh thu — có deadline 30/60/90 ngày.</li>
  <li><strong>Lập kế hoạch kênh:</strong> Chọn 2–3 kênh ưu tiên; không dàn trải mọi nơi cùng lúc.</li>
  <li><strong>Triển khai &amp; test:</strong> Creative, landing, audience — A/B test nhỏ trước khi scale.</li>
  <li><strong>Đo lường &amp; tối ưu:</strong> Dashboard KPI, họp review hàng tuần, cập nhật chiến lược.</li>
</ol>

<h2 id="do-luong">Đo lường KPI và tối ưu liên tục</h2>
<p>Theo dõi bộ KPI phù hợp <strong>${kw}</strong>:</p>
<table class="w-full border-collapse text-sm my-6">
  <thead><tr class="bg-indigo-50">
    <th class="border border-indigo-100 px-3 py-2 text-left">Giai đoạn</th>
    <th class="border border-indigo-100 px-3 py-2 text-left">KPI gợi ý</th>
  </tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2">Awareness</td><td class="border border-indigo-100 px-3 py-2">Reach, impression, branded search</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Consideration</td><td class="border border-indigo-100 px-3 py-2">CTR, time on site, form start</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Conversion</td><td class="border border-indigo-100 px-3 py-2">Lead, CPA, conversion rate, ROAS</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Retention</td><td class="border border-indigo-100 px-3 py-2">LTV, repeat rate, NPS</td></tr>
  </tbody>
</table>
<p>Dùng GA4, Meta Pixel, Google Ads conversion và CRM để có một nguồn sự thật. Đồng bộ marketing — sales về định nghĩa “lead chất lượng”.</p>

${wpImg(imgIdx + 2, `Đo lường ${kw}`)}

<h2 id="sai-lam">Sai lầm thường gặp khi làm ${kw}</h2>
<ul>
  <li>Không đo conversion — chỉ nhìn like/share hoặc traffic ảo.</li>
  <li>Landing page không message-match với quảng cáo — tỷ lệ thoát cao.</li>
  <li>Dàn trải quá nhiều kênh với ngân sách mỏng.</li>
  <li>Bỏ qua website — dẫn ads về fanpage lộn xộn không chuyển đổi.</li>
  <li>Không có quy trình chăm sóc lead — đốt ngân sách thu lead rồi bỏ quên.</li>
</ul>

${wpRelatedLinks(pillarRelatedLinks(entry))}

${wpFaq({ keyword: kw, items: faqItems })}

${wpConclusion({
  keyword: kw,
  paragraphs: [
    `Đầu tư đúng hướng vào ${kw} giúp doanh nghiệp ${entry.angle} — bền vững hơn chạy theo trend ngắn hạn.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn ${kw} miễn phí — roadmap và báo giá minh bạch theo mục tiêu thực tế.`,
  ],
  ctaLabel: "→ Đặt lịch tư vấn miễn phí",
  ctaHref: `${SITE}/lien-he`,
})}

${wpExternalCta()}
`;
}

/** Bản dài chuẩn WP SEO (~12k+ ký tự) — dùng khi upgrade bài template mỏng. */
export function buildMarketingLongFormFromEntry(entry, index = 0) {
  const topic = detectNewsTopic({
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    title: entry.h1,
    niche: entry.niche,
  });
  const imgOffset = (index + 3) % newsContentImageCountForTopic(topic);
  const metaTitle = buildSeoMetaTitle(entry.keywordsMain);
  const metaDescription = buildSeoMetaDescription(entry.keywordsMain, entry.angle);
  const description = `${entry.keywordsMain}: ${entry.angle}. Hướng dẫn triển khai và đo lường hiệu quả.`;

  const html = buildMarketingLongFormContent(entry, imgOffset, topic);

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
  const metaDescription = buildSeoMetaDescription(entry.keywordsMain, entry.angle);
  const description = `${entry.keywordsMain}: ${entry.angle}. Hướng dẫn triển khai và đo lường hiệu quả.`;
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

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
} from "./seo-article-helpers.mjs";

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

/** @param {{ slug: string, keywordsMain: string, h1: string, angle: string, niche?: string, checklist?: string[], faq?: { q: string, a: string }[] }} entry */
export function buildMarketingArticleFromEntry(entry, index = 0) {
  const topic = detectNewsTopic({
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    title: entry.h1,
    niche: entry.niche,
  });
  const imgOffset = (index + 3) % newsContentImageCountForTopic(topic);
  const metaDescription = `${entry.keywordsMain.charAt(0).toUpperCase() + entry.keywordsMain.slice(1)} — ${entry.angle}. Chiến lược, checklist KPI và FAQ. Tư vấn tại Bứt Phá Marketing.`;
  const description = `${entry.keywordsMain}: ${entry.angle}. Hướng dẫn triển khai và đo lường hiệu quả.`;
  const metaTitle = `${entry.h1.replace(/\?.*$/, "").trim()} | Bứt Phá Marketing`;

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

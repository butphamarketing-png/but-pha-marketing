import { LA_GI_ENTRIES } from "./seo-la-gi-data.mjs";
import { LOCAL_SEO_ENTRIES } from "./seo-local-data.mjs";
import { CUSTOMER_KEYWORDS_100 } from "./seo-customer-keywords-100.mjs";
import { buildRewriteArticle } from "./seo-rewrite-builder.mjs";
import { buildMarketingLongFormFromEntry } from "./seo-marketing-builder.mjs";
import { SEO_PILLARS } from "./seo-pillar-hub.mjs";
import { PILLAR_THIET_KE_WEBSITE } from "./seo-pillar-thiet-ke-website.mjs";
import { REWRITE_BAO_GIA_THIET_KE_WEBSITE } from "./seo-rewrite-bao-gia-thiet-ke-website.mjs";
import { wpImg, SITE } from "./seo-wp-structure.mjs";
import { buildClusterIndexHtml, injectBeforeSection } from "./pillar-cluster-index.mjs";
import { buildSeoMetaTitle, patchNewsContentMetaTitle } from "./seo-article-helpers.mjs";

export const THIN_PILLAR_SLUGS = [
  "seo-la-gi",
  "quang-cao-facebook",
  "thiet-ke-fanpage-facebook",
  "cham-soc-fanpage",
  "seo-google-maps-la-gi",
  "marketing-online-la-gi",
  "google-ads-la-gi",
  "tu-van-marketing-mien-phi",
];

export const WEBSITE_MAIN_PILLARS = ["thiet-ke-website", "bao-gia-thiet-ke-website"];

const WEBSITE_PILLAR_ARTICLES = {
  "thiet-ke-website": PILLAR_THIET_KE_WEBSITE,
  "bao-gia-thiet-ke-website": REWRITE_BAO_GIA_THIET_KE_WEBSITE,
};

const laGiBySlug = Object.fromEntries(LA_GI_ENTRIES.map((e) => [e.slug, e]));
const localBySlug = Object.fromEntries(LOCAL_SEO_ENTRIES.map((e) => [e.slug, e]));
const customerBySlug = Object.fromEntries(CUSTOMER_KEYWORDS_100.map((e) => [e.slug, e]));

const PILLAR_META = Object.fromEntries(SEO_PILLARS.map((p) => [p.slug, p]));

function pricingTable(keyword, rows) {
  const body = rows
    .map(
      ([name, price, note]) =>
        `<tr><td class="border border-indigo-100 px-3 py-2"><strong>${name}</strong></td><td class="border border-indigo-100 px-3 py-2">${price}</td><td class="border border-indigo-100 px-3 py-2">${note}</td></tr>`,
    )
    .join("\n");
  return `<table class="w-full border-collapse text-sm my-6"><thead><tr class="bg-indigo-50"><th class="border border-indigo-100 px-3 py-2 text-left">Gói</th><th class="border border-indigo-100 px-3 py-2 text-left">Giá tham khảo</th><th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp</th></tr></thead><tbody>${body}</tbody></table>`;
}

function buildPillarExpansion({ keyword, slug, serviceHref, serviceLabel, pricingRows, processSteps, mistakes, imgIdx }) {
  const steps = processSteps
    .map((s, i) => `<li><strong>Bước ${i + 1}:</strong> ${s}</li>`)
    .join("\n");
  const mistakeLis = mistakes.map((m) => `<li>${m}</li>`).join("\n");

  return `
<h2 id="quy-trinh-pillar">Quy trình triển khai ${keyword} — 7 bước</h2>
<ol class="list-decimal space-y-2 pl-5">${steps}</ol>
<p>Mỗi bước nên có deliverable rõ: brief, timeline, người phụ trách và KPI đo được. Bứt Phá Marketing cung cấp checklist và mẫu báo cáo khi triển khai <strong>${keyword}</strong> cho doanh nghiệp SME tại Việt Nam.</p>

${wpImg(imgIdx, `Quy trình ${keyword} — Bứt Phá Marketing`)}

<h2 id="bang-gia-pillar">Bảng giá &amp; chi phí ${keyword} 2026</h2>
<p>Chi phí phụ thuộc ngành, khu vực, scope và mức độ cạnh tranh. Bảng dưới là tham khảo — báo giá chính xác sau khảo sát nhu cầu:</p>
${pricingTable(keyword, pricingRows)}
<p>Xem thêm các bài <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá dịch vụ digital</a> và liên hệ <a href="${SITE}${serviceHref}">${serviceLabel}</a> để nhận proposal chi tiết.</p>

<h2 id="chon-doi-tac-pillar">Tiêu chí chọn đối tác ${keyword}</h2>
<ul>
  <li>Portfolio có dự án cùng ngành — không chỉ screenshot template.</li>
  <li>Minh bạch scope, timeline, số vòng sửa và chính sách bảo hành.</li>
  <li>Báo cáo định kỳ bằng số liệu (GSC, GA4, Ads Manager) — không chỉ “đang chạy tốt”.</li>
  <li>Hiểu luồng chuyển đổi: từ impression → click → lead → chốt đơn.</li>
  <li>Hỗ trợ sau triển khai: tối ưu, A/B test, đào tạo nội bộ.</li>
</ul>

<h2 id="sai-lam-pillar">Sai lầm thường gặp với ${keyword}</h2>
<ul>${mistakeLis}</ul>

<h2 id="ket-noi-he-sinh-tai">Kết nối với hệ sinh thái digital</h2>
<p><strong>${keyword}</strong> hiệu quả nhất khi kết hợp <a href="${SITE}/blog/thiet-ke-website">thiết kế website</a> làm điểm đến chuyển đổi, <a href="${SITE}/blog/seo-la-gi">SEO</a> thu traffic organic và quảng cáo có đo lường. Tránh làm rời rạc từng kênh — một chiến lược thống nhất giúp giảm CPA và tăng trust thương hiệu.</p>
`;
}

const EXPANSION_CONFIG = {
  "seo-la-gi": {
    pricingRows: [
      ["Audit SEO", "2–5 triệu", "Báo cáo lỗi kỹ thuật + on-page"],
      ["SEO on-page 10 trang", "5–12 triệu", "Tối ưu title, content, schema"],
      ["Gói SEO 6 tháng", "15–40 triệu", "On-page + content + theo dõi GSC"],
      ["SEO local Maps", "3–8 triệu/tháng", "GBP + review + citation"],
    ],
    processSteps: [
      "Audit website: crawl lỗi, tốc độ, index, nội dung mỏng.",
      "Nghiên cứu từ khóa theo intent: informational, commercial, local.",
      "Lập content plan: pillar + cluster, lịch xuất bản 8–12 tuần.",
      "Tối ưu on-page từng URL: 1 focus keyword, internal link có chủ đích.",
      "Xử lý technical SEO: HTTPS, sitemap, canonical, Core Web Vitals.",
      "Xây authority: backlink chất lượng, PR, mention thương hiệu.",
      "Theo dõi GSC/GA4 hàng tuần — điều chỉnh theo impression và CTR.",
    ],
    mistakes: [
      "Nhồi từ khóa — Google phạt, UX kém.",
      "Chỉ làm meta title mà không có nội dung đủ sâu.",
      "Mua backlink spam — rủi ro penalty.",
      "Không kiên nhẫn — SEO cần 3–6 tháng với từ khóa cạnh tranh.",
      "Bỏ qua mobile và tốc độ trang.",
    ],
  },
  "marketing-online-la-gi": {
    pricingRows: [
      ["Tư vấn chiến lược", "Miễn phí – 3 triệu", "Buổi đầu + roadmap"],
      ["Marketing trọn gói SME", "15–35 triệu/tháng", "Website + content + ads"],
      ["Chạy ads (phí agency)", "3–8 triệu/tháng", "Chưa gồm ngân sách ads"],
      ["Content & social", "5–15 triệu/tháng", "Fanpage + blog + email"],
    ],
    processSteps: [
      "Xác định mục tiêu kinh doanh và persona khách hàng.",
      "Audit kênh hiện tại: website, fanpage, ads, email.",
      "Chọn 2–3 kênh ưu tiên theo ngân sách và sales cycle.",
      "Thiết lập đo lường: GA4, pixel, CRM, định nghĩa lead.",
      "Triển khai content + landing message-match.",
      "Chạy test ads nhỏ — scale khi có CPA/ROAS ổn.",
      "Review KPI hàng tuần, tối ưu funnel liên tục.",
    ],
    mistakes: [
      "Dàn trải mọi kênh với ngân sách mỏng.",
      "Không có website/landing chuẩn đo lường.",
      "Chỉ đu trend — không gắn với doanh thu.",
      "Không đồng bộ marketing và sales.",
      "Bỏ qua nuôi lead sau khi thu về.",
    ],
  },
  "google-ads-la-gi": {
    pricingRows: [
      ["Setup tài khoản + tracking", "2–5 triệu", "Tag, conversion, structure"],
      ["Quản lý ads/tháng", "3–8 triệu", "Chưa gồm ngân sách click"],
      ["Landing page chạy ads", "5–12 triệu", "Message-match campaign"],
      ["Audit tài khoản cũ", "2–4 triệu", "Tối ưu waste spend"],
    ],
    processSteps: [
      "Gắn conversion tracking: form, gọi, Zalo.",
      "Nghiên cứu từ khóa: phân loại intent mua vs tìm hiểu.",
      "Cấu trúc campaign: brand, generic, competitor tách riêng.",
      "Viết ad copy 3–5 biến thể — test headline và CTA.",
      "Landing page khớp message quảng cáo.",
      "Negative keyword và bid strategy theo dữ liệu.",
      "Báo cáo tuần: CPA, ROAS, search terms — tối ưu liên tục.",
    ],
    mistakes: [
      "Chạy broad match không kiểm soát — tốn tiền từ khóa rác.",
      "Không có landing — dẫn về trang chủ chung chung.",
      "Không theo dõi conversion — không biết ads có ra đơn.",
      "Tắt campaign quá sớm trước khi algorithm học.",
      "Quên remarketing người đã vào site.",
    ],
  },
  "seo-google-maps-la-gi": {
    pricingRows: [
      ["Setup GBP chuẩn", "2–4 triệu", "Category, ảnh, mô tả, dịch vụ"],
      ["SEO local/tháng", "3–8 triệu", "Post, review, citation, on-page"],
      ["Quảng cáo Local Ads", "Ngân sách + 15% fee", "Maps ads theo bán kính"],
      ["Reputation management", "2–5 triệu/tháng", "Review, phản hồi, Q&A"],
    ],
    processSteps: [
      "Claim và xác minh Google Business Profile.",
      "Chọn primary category chính xác nhất.",
      "Tối ưu mô tả, dịch vụ, giờ mở cửa, ảnh thật.",
      "Đồng bộ NAP trên website và citation.",
      "Chiến lược review hợp lệ từ khách thật.",
      "Đăng Google Post và Q&A định kỳ.",
      "Theo dõi Local Pack và insight GBP hàng tuần.",
    ],
    mistakes: [
      "Sai category — Google xếp sai intent.",
      "Mua review fake — rủi ro khóa profile.",
      "NAP không khớp giữa web và Maps.",
      "Không trả lời review — mất trust.",
      "Ảnh stock — khách không nhận ra địa điểm.",
    ],
  },
  "quang-cao-facebook": {
    pricingRows: [
      ["Setup ads + pixel", "2–5 triệu", "Cấu trúc campaign, audience"],
      ["Quản lý ads/tháng", "3–8 triệu", "Chưa gồm ngân sách Meta"],
      ["Creative bundle", "3–6 triệu", "5–10 ảnh/video ads"],
      ["Funnel full (ads + landing)", "12–25 triệu", "Test đến chốt đơn"],
    ],
    processSteps: [
      "Gắn Meta Pixel và Events API trên website.",
      "Xác định objective: lead, message, purchase.",
      "Xây audience: lookalike, interest, retargeting.",
      "Sản xuất creative: hook 3 giây, social proof, CTA.",
      "Landing/Zalo message-match với ads.",
      "A/B test audience và creative — scale winner.",
      "Báo cáo ROAS/CPA, tối ưu budget allocation.",
    ],
    mistakes: [
      "Boost post thay vì campaign conversion.",
      "Audience quá rộng — CPA cao.",
      "Creative một kiểu — fatigue nhanh.",
      "Không retarget người đã tương tác.",
      "Vi phạm policy — ads bị từ chối hoặc khóa.",
    ],
  },
  "thiet-ke-fanpage-facebook": {
    pricingRows: [
      ["Setup fanpage cơ bản", "1–2 triệu", "Avatar, cover, CTA, about"],
      ["Thiết kế brand kit", "3–5 triệu", "Cover, template post, highlight"],
      ["Fanpage + 10 post đầu", "5–8 triệu", "Visual + copy intro"],
      ["Rebrand fanpage", "4–10 triệu", "Đồng bộ thương hiệu mới"],
    ],
    processSteps: [
      "Brief thương hiệu: màu, font, tone of voice.",
      "Thiết kế avatar và cover đúng kích thước Meta.",
      "Viết phần Giới thiệu và CTA (Zalo, website, đặt lịch).",
      "Setup tab, nút action và template post.",
      "Lên lịch 5–10 bài seed content.",
      "Gắn pixel nếu chạy ads sau này.",
      "Đào tạo admin đăng bài và trả inbox.",
    ],
    mistakes: [
      "Cover cắt chữ trên mobile.",
      "Không có CTA rõ — khách không biết bước tiếp.",
      "Copy giống đối thủ — không khác biệt.",
      "Bỏ trống fanpage lâu ngày sau setup.",
      "Không đồng bộ visual với website.",
    ],
  },
  "cham-soc-fanpage": {
    pricingRows: [
      ["Gói 8 post/tháng", "3–5 triệu", "Viết + đăng + report cơ bản"],
      ["Gói 12 post + inbox", "5–9 triệu", "Content + trả lời tin nhắn"],
      ["Full social + ads nhẹ", "10–18 triệu", "Organic + boost có kiểm soát"],
      ["Audit fanpage", "1–2 triệu", "Đánh giá content và engagement"],
    ],
    processSteps: [
      "Audit fanpage: engagement, inbox, content cũ.",
      "Lập content calendar theo pillar content.",
      "Sản xuất visual và copy theo brand guide.",
      "Đăng bài đúng khung giờ vàng ngành.",
      "Trả inbox/Zalo trong SLA (vd: 2h làm việc).",
      "Báo cáo reach, engagement, lead hàng tháng.",
      "Họp review và điều chỉnh chiến lược content.",
    ],
    mistakes: [
      "Đăng bán hàng liên tục — unfollow cao.",
      "Không trả inbox — mất lead nóng.",
      "Copy không kiểm tra chính tả và policy.",
      "Không có KPI — không biết hiệu quả.",
      "Dùng ảnh stock lặp — mất authenticity.",
    ],
  },
  "tu-van-marketing-mien-phi": {
    pricingRows: [
      ["Buổi tư vấn đầu", "Miễn phí", "30–45 phút, roadmap sơ bộ"],
      ["Audit marketing", "2–5 triệu", "Toàn diện web + social + ads"],
      ["Chiến lược 90 ngày", "5–12 triệu", "Kế hoạch + KPI + timeline"],
      ["Triển khai trọn gói", "Theo scope", "Website + marketing + ads"],
    ],
    processSteps: [
      "Thu thập thông tin: ngành, mục tiêu, ngân sách, đối thủ.",
      "Phân tích hiện trạng digital hiện có.",
      "Đề xuất 2–3 hướng ưu tiên với timeline.",
      "Ước tính ngân sách và KPI kỳ vọng.",
      "Thống nhất scope triển khai hoặc gói tự làm.",
      "Lập milestone 30/60/90 ngày.",
      "Follow-up sau 2 tuần để hỗ trợ triển khai.",
    ],
    mistakes: [
      "Tư vấn chung chung — không actionable.",
      "Đề xuất quá nhiều kênh cùng lúc.",
      "Không hỏi ngân sách thực tế.",
      "Bỏ qua website làm nền chuyển đổi.",
      "Không cam kết KPI đo được.",
    ],
  },
};

function entryForSlug(slug) {
  if (laGiBySlug[slug]) return laGiBySlug[slug];
  if (localBySlug[slug]) return localBySlug[slug];
  const c = customerBySlug[slug];
  if (!c) return null;
  return {
    slug: c.slug,
    keywordsMain: c.keywordsMain,
    h1: c.h1,
    angle: c.angle,
    niche: c.niche,
    definition: `${c.keywordsMain}: ${c.angle}.`,
    role: `Giúp doanh nghiệp triển khai ${c.keywordsMain} hiệu quả và đo lường ROI.`,
    faq: [
      { q: `${c.keywordsMain} mất bao lâu có kết quả?`, a: "Tùy ngành và ngân sách — thường 2–8 tuần thấy tín hiệu đầu tiên với ads; SEO/organic cần 2–4 tháng." },
      { q: "Có thể tự làm không?", a: "Có với kiến thức cơ bản; thuê chuyên gia giúp tránh lãng phí ngân sách và rút ngắn learning curve." },
      { q: "Bứt Phá Marketing hỗ trợ gì?", a: "Tư vấn miễn phí, triển khai trọn gói và báo cáo minh bạch theo KPI." },
    ],
  };
}

function isLaGiPillar(slug) {
  return slug.endsWith("-la-gi") || Boolean(laGiBySlug[slug]) || Boolean(localBySlug[slug]);
}

/**
 * @param {string} slug
 * @param {Array<{ label: string, items: Array<{ slug: string, title: string }> }>} clusterGroups
 */
export function buildPillarFortifiedArticle(slug, clusterGroups = []) {
  const meta = PILLAR_META[slug];
  const entry = entryForSlug(slug);
  if (!meta || !entry) throw new Error(`Không có config pillar: ${slug}`);

  const expansion = EXPANSION_CONFIG[slug];
  if (!expansion) throw new Error(`Thiếu expansion config: ${slug}`);

  let article;
  if (isLaGiPillar(slug)) {
    article = buildRewriteArticle({
      slug,
      title: entry.h1,
      keywordsMain: entry.keywordsMain,
      keywordsSecondary: entry.keywordsSecondary || `${entry.keywordsMain}, bứt phá marketing`,
      description: entry.definition,
    });
  } else {
    article = buildMarketingLongFormFromEntry(
      {
        slug,
        keywordsMain: entry.keywordsMain,
        h1: entry.h1,
        angle: entry.angle,
        niche: entry.niche || "strategy",
        faq: entry.faq,
      },
      Math.abs(slug.length % 7),
    );
  }

  const imgIdx = Math.abs(slug.length % 9);
  const expansionHtml = buildPillarExpansion({
    keyword: meta.keyword,
    slug,
    serviceHref: meta.serviceHref,
    serviceLabel: meta.serviceLabel,
    pricingRows: expansion.pricingRows,
    processSteps: expansion.processSteps,
    mistakes: expansion.mistakes,
    imgIdx,
  });

  const clusterHtml = buildClusterIndexHtml(meta.keyword, clusterGroups);
  const injection = `${clusterHtml}\n${expansionHtml}`;

  const beforePatterns = [
    /<section[^>]*class="[^"]*article-faq/i,
    /<section[^>]*id="faq"/i,
    /<section[^>]*id="ket-luan"/i,
  ];

  article.content = injectBeforeSection(article.content, injection, beforePatterns);
  article.hot = true;
  article.title = entry.h1;

  return article;
}

/** Chỉ thêm cluster index vào 2 pillar website chính (giữ nguyên nội dung gốc). */
export function buildWebsitePillarWithCluster(slug, clusterGroups = []) {
  const meta = PILLAR_META[slug];
  const base = WEBSITE_PILLAR_ARTICLES[slug];
  if (!meta || !base) throw new Error(`Unknown website pillar: ${slug}`);

  const article = { ...base, hot: true };
  if (article.content.includes("article-cluster-index")) {
    return article;
  }

  const clusterHtml = buildClusterIndexHtml(meta.keyword, clusterGroups);
  if (!clusterHtml) return article;

  const metaTitle = buildSeoMetaTitle(meta.keyword);
  article.metaTitle = metaTitle;
  article.content = patchNewsContentMetaTitle(article.content, metaTitle);

  article.content = injectBeforeSection(article.content, clusterHtml, [
    /<section[^>]*id="faq"/i,
    /<section[^>]*class="[^"]*article-faq/i,
    /<h2[^>]*id="faq"/i,
  ]);
  return article;
}

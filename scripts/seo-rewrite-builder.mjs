import { NEWS_THUMBNAIL, buildSeoMetaTitle, newsThumbnailForArticle } from "./seo-article-helpers.mjs";
import { INDUSTRY_ENTRIES } from "./seo-industry-data.mjs";
import { LA_GI_ENTRIES } from "./seo-la-gi-data.mjs";
import { WEBSITE_SEEDS } from "./seo-website-seeds.mjs";
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

const industryBySlug = Object.fromEntries(INDUSTRY_ENTRIES.map((e) => [e.slug, e]));
const laGiBySlug = Object.fromEntries(LA_GI_ENTRIES.map((e) => [e.slug, e]));

const websiteSeedBySlug = Object.fromEntries(
  WEBSITE_SEEDS.map((s) => {
    if (s.niche === "guide" || s.niche === "compare") return [s.slug, s];
    if (s.niche === "local") return [`thiet-ke-website-${s.slug}`, s];
    return [`thiet-ke-website-${s.slug}`, s];
  }),
);

const GUIDE_SLUGS = new Set([
  "quy-trinh-chuan-a-z",
  "chi-phi-duy-tri",
  "bao-mat-doanh-nghiep",
  "nang-cap-website-cu",
  "bao-nhieu-trang",
  "wordpress-vs-shopify",
  "tu-code-hay-template",
  "landing-hay-website-tong",
  "gia-re-uy-tin",
  "chuyen-nghiep-gia-tot",
]);

const DEFAULT_FEATURES = [
  "Giao diện mobile-first, tốc độ tải dưới 3 giây",
  "Trang dịch vụ/sản phẩm rõ ràng với CTA liên hệ",
  "Form thu lead + nút Zalo / gọi sticky trên mobile",
  "SEO on-page: title, meta, heading, schema cơ bản",
  "Google Analytics / Search Console sẵn sàng đo lường",
  "CMS dễ cập nhật nội dung sau bàn giao",
];

function defaultFaq(keyword, titleShort) {
  return [
    {
      q: `${titleShort} giá bao nhiêu?`,
      a: "Tại Bứt Phá Marketing từ 3.000.000đ (landing/giới thiệu) đến 12.000.000đ+ (website đa trang, tích hợp). Báo giá chính xác sau khảo sát scope.",
    },
    {
      q: "Mất bao lâu để hoàn thành?",
      a: "Thường 2–6 tuần tùy số trang, tính năng và vòng duyệt thiết kế.",
    },
    {
      q: "Có hỗ trợ SEO sau bàn giao không?",
      a: "Có — bàn giao chuẩn SEO on-page; có thể ký thêm gói chăm sóc SEO hàng tháng.",
    },
    {
      q: "Tôi có thể tự sửa nội dung không?",
      a: "Có. Bứt Phá đào tạo quản trị CMS (WordPress hoặc custom) sau go-live.",
    },
    {
      q: "Website có hiển thị tốt trên điện thoại không?",
      a: "Có — mọi gói đều responsive/mobile-first, test trên iOS và Android trước bàn giao.",
    },
    {
      q: "Bứt Phá Marketing ở đâu?",
      a: "Hỗ trợ khách toàn quốc; tư vấn online và triển khai remote. Liên hệ Zalo 0937417982.",
    },
  ];
}

function pricingTable(keyword) {
  return `
<h2 id="bang-gia">Bảng giá tham khảo ${keyword} (2026)</h2>
<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá từ</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Starter</strong></td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Landing / 3–5 trang, form liên hệ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Business</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">7–12 trang, blog, SEO on-page</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Tích hợp booking, đa ngôn ngữ, custom</td>
    </tr>
  </tbody>
</table>
<p>Chi tiết: <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a>.</p>`;
}

function processSection(keyword) {
  return `
<h2 id="quy-trinh">Quy trình triển khai ${keyword} — 7 bước</h2>
<ol class="list-decimal space-y-2 pl-5">
  <li><strong>Khảo sát &amp; brief:</strong> Mục tiêu, khách hàng mục tiêu, đối thủ, từ khóa SEO.</li>
  <li><strong>Sitemap &amp; wireframe:</strong> Cấu trúc trang, luồng chuyển đổi, CTA.</li>
  <li><strong>UI design:</strong> Giao diện theo nhận diện thương hiệu, mobile-first.</li>
  <li><strong>Lập trình:</strong> Responsive, form, Zalo, analytics, tốc độ.</li>
  <li><strong>Nội dung &amp; SEO on-page:</strong> Meta, heading, alt ảnh, internal link.</li>
  <li><strong>Test &amp; go-live:</strong> Cross-browser, PageSpeed, form test.</li>
  <li><strong>Bàn giao &amp; đào tạo:</strong> Hướng dẫn CMS, backup, bảo hành.</li>
</ol>
<p>Xem pillar <a href="${SITE}/blog/thiet-ke-website">quy trình thiết kế website</a> để biết chi tiết từng bước.</p>`;
}

function buildWebsiteRewrite(base) {
  const keyword = base.keywordsMain?.trim() || "thiết kế website";
  const title = base.title?.trim() || keyword;
  const industry = industryBySlug[base.slug];
  const seed = websiteSeedBySlug[base.slug];
  const angle = seed?.angle || base.description?.split(":")[1]?.trim() || "doanh nghiệp Việt Nam";
  const features = industry?.features || DEFAULT_FEATURES;
  const faqItems = industry?.faq || defaultFaq(keyword, title.split("—")[0].trim());
  const imgIdx = Math.abs(hashSlug(base.slug)) % 11;

  const html = `
${wpToc([
  { id: "tong-quan", label: `${keyword} là gì?` },
  { id: "vi-sao-can", label: "Vì sao cần đầu tư?" },
  { id: "tinh-nang", label: "Tính năng cần có" },
  { id: "cau-truc", label: "Cấu trúc trang chuẩn" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "seo", label: "SEO & chuyển đổi" },
  { id: "chon-doi-tac", label: "Chọn đối tác" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "FAQ" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword,
  paragraphs: [
    `${keyword} là quy trình xây dựng website chuyên biệt — tập trung ${angle}. Khác template rẻ tái sử dụng, ${keyword} custom giúp bạn kiểm soát thương hiệu, tích hợp form/Zalo và tối ưu SEO ngay từ đầu.`,
    `Bài viết dành cho chủ doanh nghiệp, marketer và freelancer đang tìm hiểu ${keyword}: checklist tính năng, cấu trúc trang, quy trình triển khai, mức giá tham khảo 2026 và FAQ thực chiến tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  `${keyword} cần mobile-first — phần lớn khách truy cập từ điện thoại.`,
  `Tập trung ${angle} — không copy layout ngành khác.`,
  "CTA rõ: form, Zalo, gọi — trên mọi trang dịch vụ.",
  "SEO on-page + tốc độ: nền tảng traffic organic lâu dài.",
  "Bứt Phá Marketing: gói 3–12 triệu, tư vấn miễn phí.",
])}

${wpImg(imgIdx, `${keyword} chuyên nghiệp chuẩn SEO`)}

<h2 id="tong-quan">${keyword} là gì?</h2>
<p><strong>${keyword}</strong> không chỉ là “làm web cho đẹp”. Đó là thiết kế giao diện (UI/UX), lập trình chức năng, tối ưu SEO và bàn giao hệ thống giúp website trở thành kênh ${angle} — hoạt động 24/7, đo được lead và scale cùng doanh nghiệp.</p>
<p>Website chuẩn gồm: trang chủ thuyết phục, trang dịch vụ/sản phẩm chi tiết, giới thiệu, liên hệ, blog (nếu làm SEO), tích hợp analytics và công cụ marketing (Zalo, pixel ads).</p>

<h2 id="vi-sao-can">Vì sao nên đầu tư ${keyword}?</h2>
<ul>
  <li><strong>Uy tín:</strong> Khách so sánh 3–5 đối thủ trên Google trước khi liên hệ — website kém = mất cơ hội.</li>
  <li><strong>SEO:</strong> Xuất hiện khi khách search đúng nhu cầu — chi phí acquisition giảm dài hạn.</li>
  <li><strong>Chuyển đổi:</strong> Form, Zalo, gọi đặt đúng vị trí — không phụ thuộc inbox Facebook.</li>
  <li><strong>Sở hữu dữ liệu:</strong> Danh sách lead, hành vi truy cập thuộc về bạn.</li>
  <li><strong>Quảng cáo:</strong> Landing message-match tăng ROAS so với điểm đến lộn xộn.</li>
</ul>

<h2 id="tinh-nang">Tính năng website cần có</h2>
<p>Khi triển khai <strong>${keyword}</strong>, ưu tiên các module sau:</p>
<ul class="list-disc space-y-2 pl-5">${features.map((f) => `<li>${f}</li>`).join("")}</ul>

${wpImg(imgIdx + 1, `Giao diện ${keyword} tối ưu mobile`)}

<h2 id="cau-truc">Cấu trúc trang gợi ý</h2>
<ul>
  <li><strong>Trang chủ:</strong> Value proposition, dịch vụ nổi bật, social proof, CTA.</li>
  <li><strong>Dịch vụ / sản phẩm:</strong> Mỗi mục một trang — long-tail SEO.</li>
  <li><strong>Về chúng tôi:</strong> Câu chuyện thương hiệu, đội ngũ, chứng chỉ.</li>
  <li><strong>Case study / dự án:</strong> Minh chứng năng lực — đặc biệt quan trng cho ${angle}.</li>
  <li><strong>Blog:</strong> Bài SEO hỗ trợ traffic organic (tùy gói).</li>
  <li><strong>Liên hệ:</strong> Form, bản đồ, hotline, Zalo OA.</li>
</ul>

${processSection(keyword)}
${pricingTable(keyword)}

<h2 id="seo">SEO &amp; tối ưu chuyển đổi</h2>
<ul>
  <li>Meta title/description chứa <strong>${keyword}</strong> và lợi ích rõ ràng.</li>
  <li>Cấu trúc H1 → H2 → H3 logic; internal link về trang dịch vụ chính.</li>
  <li>Ảnh WebP, lazy load — Core Web Vitals xanh.</li>
  <li>Schema Organization / LocalBusiness nếu có địa chỉ cố định.</li>
  <li>CTA trên mobile: nút Zalo + gọi sticky.</li>
</ul>
<p>Tham khảo thêm <a href="${SITE}/blog/thiet-ke-website-chuan-seo">thiết kế website chuẩn SEO</a>.</p>

<h2 id="chon-doi-tac">Chọn đối tác ${keyword}</h2>
<ul>
  <li>Portfolio có dự án tương đồng ngành — không chỉ demo template.</li>
  <li>Báo giá scope rõ: số trang, tính năng, vòng sửa, bảo hành.</li>
  <li>Cam kết timeline và milestone thanh toán minh bạch.</li>
  <li>Hỗ trợ sau bàn giao: đào tạo CMS, sửa lỗi, backup.</li>
</ul>

<h2 id="sai-lam">Sai lầm thường gặp</h2>
<ul>
  <li>Chọn template trùng hàng nghìn site — mất khác biệt thương hiệu.</li>
  <li>Web đẹp nhưng chậm — Google và khách đều bỏ đi.</li>
  <li>Không có CTA — khách đọc xong không biết bước tiếp theo.</li>
  <li>Copy nội dung đối thủ — SEO trùng lặp, không E-E-A-T.</li>
  <li>Bỏ quên mobile — mất 70%+ traffic tiềm năng.</li>
</ul>

${wpRelatedLinks([
  { href: `${SITE}/blog/thiet-ke-website`, label: "Thiết kế website (pillar)", desc: "Hướng dẫn tổng quan A-Z." },
  { href: `${SITE}/blog/bao-gia-thiet-ke-website`, label: "Báo giá thiết kế website", desc: "Yếu tố ảnh hưởng giá." },
  { href: `${SITE}/blog/thiet-ke-website-doanh-nghiep`, label: "Website doanh nghiệp", desc: "Gói corporate phổ biến." },
  { href: `${SITE}/website`, label: "Đăng ký tư vấn", desc: "Bứt Phá Marketing." },
])}

${wpFaq({ keyword, items: faqItems })}

${wpConclusion({
  keyword,
  paragraphs: [
    `Đầu tư ${keyword} đúng hướng giúp bạn ${angle} — song song với Google Maps, ads và mạng xã hội. Ưu tiên mobile nhanh, nội dung trả lời đúng câu hỏi khách và CTA rõ trên mọi trang quan trọng.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn ${keyword} miễn phí — timeline và báo giá minh bạch theo scope thực tế.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`;

  return finalizeArticle({ base, keyword, title, html });
}

function buildLaGiRewrite(base) {
  const entry = laGiBySlug[base.slug];
  const keyword = entry?.keywordsMain || base.keywordsMain || base.title;
  const title = entry?.h1 || base.title;
  const imgIdx = Math.abs(hashSlug(base.slug)) % 11;
  const components = entry?.components || [];
  const applySteps = entry?.applySteps || [];

  const html = `
${wpToc([
  { id: "dinh-nghia", label: "Định nghĩa" },
  { id: "vi-sao-quan-trong", label: "Vì sao quan trọng?" },
  { id: "thanh-phan", label: "Thành phần chính" },
  { id: "ung-dung", label: "Ứng dụng thực tế" },
  { id: "cach-lam", label: "Cách triển khai" },
  { id: "faq", label: "FAQ" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword,
  paragraphs: [
    entry?.definition ||
      `Hiểu rõ <strong>${keyword}</strong> giúp doanh nghiệp và marketer ra quyết định digital đúng — tránh đầu tư mù quáng hoặc bỏ lỡ cơ hội tăng trưởng online.`,
    entry?.role ||
      `Bài viết giải thích ${keyword} một cách thực chiến: khái niệm, lợi ích, thành phần và checklist bắt đầu — phù hợp người mới và chủ SME tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  `${keyword} là nền tảng kiến thức trước khi thuê dịch vụ hoặc tự triển khai.`,
  "Áp dụng song song website, SEO và quảng cáo — không làm rời rạc.",
  "Đo lường KPI rõ: traffic, lead, conversion, ROAS.",
  "Tránh hiểu sai thuật ngữ — gây chọn sai giải pháp, lãng phí ngân sách.",
  "Bứt Phá Marketing hỗ trợ triển khai end-to-end.",
])}

${wpImg(imgIdx, keyword)}

<h2 id="dinh-nghia">${keyword} là gì?</h2>
<p>${entry?.definition || `<strong>${keyword}</strong> là khái niệm quan trọng trong marketing số và vận hành website. Nắm vững định nghĩa giúp bạn giao tiếp hiệu quả với agency, freelancer và đội nội bộ.`}</p>

<h2 id="vi-sao-quan-trong">Vì sao ${keyword} quan trọng với doanh nghiệp?</h2>
<p>${entry?.role || `Trong bối cảnh khách hàng tra cứu online trước khi mua, hiểu ${keyword} giúp bạn đặt mục tiêu đúng, chọn công cụ phù hợp và tối ưu ngân sách marketing.`}</p>
<ul>
  <li>Ra quyết định dựa trên dữ liệu, không cảm tính.</li>
  <li>Phối hợp website — SEO — ads — social nhất quán.</li>
  <li>Giảm rủi ro scam dịch vụ khi biết thuật ngữ chuẩn.</li>
</ul>

${components.length ? `<h2 id="thanh-phan">Thành phần / yếu tố của ${keyword}</h2>
<ul class="list-disc space-y-2 pl-5">${components.map((c) => `<li>${c}</li>`).join("")}</ul>` : ""}

<h2 id="ung-dung">Ứng dụng thực tế</h2>
<p>Áp dụng ${keyword} trong: lập kế hoạch marketing, brief agency, đánh giá hiệu quả chiến dịch và cải thiện website chuyển đổi. Kết hợp với <a href="${SITE}/blog/thiet-ke-website">thiết kế website</a> và <a href="${SITE}/blog/seo-la-gi">SEO</a> để tạo hệ sinh thái digital bền vững.</p>

<h2 id="cach-lam">Cách bắt đầu với ${keyword}</h2>
${applySteps.length ? `<ol class="list-decimal space-y-2 pl-5">${applySteps.map((s) => `<li>${s}</li>`).join("")}</ol>` : `<ol class="list-decimal space-y-2 pl-5">
  <li>Đọc tài liệu nền (bài này + nguồn Google chính thống).</li>
  <li>Audit hiện trạng: website, fanpage, ads đang làm gì.</li>
  <li>Đặt KPI 30–90 ngày — một mục tiêu rõ.</li>
  <li>Triển khai thử nghiệm nhỏ, đo lường, tối ưu.</li>
  <li>Scale khi có số liệu ổn định.</li>
</ol>`}

${wpRelatedLinks([
  { href: `${SITE}/blog/thiet-ke-website`, label: "Thiết kế website", desc: "Nền tảng digital." },
  { href: `${SITE}/blog/seo-la-gi`, label: "SEO là gì", desc: "Tăng traffic organic." },
  { href: `${SITE}/blog/marketing-online-la-gi`, label: "Marketing online", desc: "Tổng quan kênh số." },
  { href: `${SITE}/lien-he`, label: "Liên hệ tư vấn", desc: "Bứt Phá Marketing." },
])}

${wpFaq({ keyword, items: entry?.faq || defaultFaq(keyword, keyword) })}

${wpConclusion({
  keyword,
  paragraphs: [
    `${keyword} không còn là “nice to have” — mà là nền tảng để doanh nghiệp Việt cạnh tranh online hiệu quả.`,
    `Cần hỗ trợ triển khai liên quan ${keyword}, liên hệ Bứt Phá Marketing qua Zalo hoặc form /lien-he.`,
  ],
  ctaLabel: "→ Nhận tư vấn miễn phí",
  ctaHref: `${SITE}/lien-he`,
})}

${wpExternalCta()}
`;

  return finalizeArticle({ base, keyword, title, html });
}

function buildGuideRewrite(base) {
  const seed = websiteSeedBySlug[base.slug];
  const keyword = seed?.keywordsMain || base.keywordsMain || base.title;
  const title = seed?.h1 || base.title;
  return buildWebsiteRewrite({ ...base, keywordsMain: keyword, title, description: seed?.angle || base.description });
}

function finalizeArticle({ base, keyword, title, html }) {
  const metaTitle = buildSeoMetaTitle(title.replace(/\?.*$/, "").trim().slice(0, 52));
  const metaDescription = `${keyword} — hướng dẫn chi tiết, quy trình, bảng giá và FAQ. Tư vấn miễn phí Bứt Phá Marketing.`.slice(
    0,
    158,
  );

  return {
    title,
    slug: base.slug,
    keywordsMain: keyword,
    keywordsSecondary: base.keywordsSecondary || `${keyword}, website chuẩn seo, bứt phá marketing`,
    metaTitle,
    metaDescription,
    description: base.description || `${keyword}: hướng dẫn triển khai và FAQ.`,
    imageUrl: newsThumbnailForArticle({
      slug: base.slug,
      keywordsMain: keyword,
      keywordsSecondary: base.keywordsSecondary || `${keyword}, website chuẩn seo, bứt phá marketing`,
      title,
    }),
    content: buildWpSeoArticle({ metaTitle, keyword, html }),
  };
}

function hashSlug(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return h;
}

/** @param {{ slug: string, title: string, keywordsMain?: string, keywordsSecondary?: string, description?: string }} base */
export function buildRewriteArticle(base) {
  if (base.slug.endsWith("-la-gi") || laGiBySlug[base.slug]) {
    return buildLaGiRewrite(base);
  }
  if (GUIDE_SLUGS.has(base.slug) || websiteSeedBySlug[base.slug]?.niche === "compare") {
    return buildGuideRewrite(base);
  }
  return buildWebsiteRewrite(base);
}

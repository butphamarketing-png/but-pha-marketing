/**
 * Template silo — cấu trúc website luật 2026 (expanded ≥12k)
 * Chạy: node scripts/seed-template-website-luat-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website công ty luật";

const article = {
  title: "Template Website Công Ty Luật 2026 — Cấu Trúc 12 Trang Văn Phòng Luật",
  slug: "template-website-luat-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website luật sư, cấu trúc văn phòng luật, sitemap công ty luật, layout tư vấn pháp lý, wireframe website luật",
  metaTitle: "Template Website Công Ty Luật 2026 | 12 Trang",
  metaDescription:
    "Template website công ty luật 2026: 12 trang — luật sư, lĩnh vực hành nghề, form tư vấn bảo mật, SEO local. Wireframe chi tiết.",
  description:
    "Mẫu cấu trúc website công ty luật 12 trang — uy tín luật sư, silo lĩnh vực và SEO local.",
  imageUrl: "/tin-tuc/luat/luat-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Công Ty Luật 2026 | 12 Trang",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "la-gi", label: "Template luật là gì?" },
  { id: "menu", label: "Menu & sitemap 12 trang" },
  { id: "trang-chu", label: "Wireframe trang chủ" },
  { id: "luat-su", label: "Trang luật sư / đội ngũ" },
  { id: "linh-vuc", label: "Silo lĩnh vực hành nghề" },
  { id: "tu-van", label: "Form tư vấn bảo mật" },
  { id: "blog-seo", label: "Blog pháp lý & SEO" },
  { id: "trust", label: "Trust & compliance" },
  { id: "ky-thuat", label: "Technical SEO" },
  { id: "timeline", label: "Timeline triển khai" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> — bộ khung <strong>12 trang</strong> văn phòng luật: profile luật sư, silo lĩnh vực (dân sự, doanh nghiệp, lao động…), form tư vấn bảo mật và SEO local “luật sư [quận]”. Kết hợp <a href="${SITE}/blog/checklist-website-luat-2026">checklist</a> và <a href="${SITE}/blog/thiet-ke-website-cong-ty-luat">money page</a>.</p>
</div>

<h2 id="tom-tat">Ai nên dùng template này?</h2>
<p>Phù hợp công ty luật, văn phòng luật sư, luật sư tập sự mở văn phòng — cần website chứng minh uy tín hành nghề, tách rõ lĩnh vực tư vấn và thu lead tư vấn ban đầu (không thay thế hợp đồng dịch vụ pháp lý).</p>

<h2 id="la-gi">Template website công ty luật là gì?</h2>
<p><strong>Template website công ty luật</strong> là sơ đồ URL, menu, section và luồng chuyển đổi để triển khai web văn phòng luật đúng SEO commercial + local. Khác checklist (nghiệm thu sau), template dùng <em>trước</em> wireframe.</p>
<p>Website luật cần: trust cao (chứng chỉ, số thẻ luật sư), nội dung chính xác (tránh tư vấn sai trên web), form bảo mật và silo lĩnh vực rõ — Google ưu tiên trang có E-E-A-T mạnh.</p>

<h2 id="menu">Menu &amp; sitemap 12 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu văn phòng</strong> — /gioi-thieu</li>
  <li><strong>Luật sư / Đội ngũ</strong> — /luat-su (hub)</li>
  <li><strong>Profile luật sư</strong> — /luat-su/[slug] (3–8 trang)</li>
  <li><strong>Lĩnh vực (hub)</strong> — /linh-vuc</li>
  <li><strong>Dân sự</strong> — /linh-vuc/dan-su</li>
  <li><strong>Doanh nghiệp</strong> — /linh-vuc/doanh-nghiep</li>
  <li><strong>Lao động</strong> — /linh-vuc/lao-dong</li>
  <li><strong>Đất đai / Xây dựng</strong> — /linh-vuc/dat-dai (tùy hành nghề)</li>
  <li><strong>Tư vấn pháp lý</strong> — /tu-van (form bảo mật)</li>
  <li><strong>Blog pháp lý</strong> — /blog</li>
  <li><strong>Liên hệ</strong> — /lien-he (Maps, giờ làm việc)</li>
</ul>
<p>Menu sticky: <strong>Hotline</strong> + <strong>Tư vấn miễn phí</strong> + link Zalo (nếu văn phòng dùng).</p>

<h2 id="trang-chu">Wireframe — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero:</strong> H1 “Công ty luật [Tên] — Tư vấn [Lĩnh vực] tại [TP/Quận]”, tone uy tín, không stock ảnh cười quá casual.</li>
  <li><strong>CTA:</strong> “Đặt lịch tư vấn” + “Gọi hotline”.</li>
  <li><strong>Grid 6–8 lĩnh vực</strong> icon — link silo /linh-vuc/*.</li>
  <li><strong>Luật sư nổi bật:</strong> 2–3 card — ảnh, chứng chỉ, lĩnh vực chính.</li>
  <li><strong>Quy trình tiếp nhận 4 bước:</strong> Tiếp nhận → phân công → tư vấn → báo phí (nếu có).</li>
  <li><strong>Số liệu trust:</strong> Năm thành lập, số vụ việc (mô tả tổng quát, không vi phạm bảo mật).</li>
  <li><strong>FAQ schema 3–5 câu</strong> pháp lý phổ biến.</li>
  <li><strong>Maps + giờ làm việc</strong> + nút chỉ đường.</li>
  <li><strong>Footer:</strong> MST, địa chỉ văn phòng, link <a href="${SITE}/blog/nganh/luat">hub luật</a>.</li>
</ol>

<h2 id="luat-su">Wireframe — Trang luật sư &amp; đội ngũ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hub /luat-su:</strong> Grid tất cả luật sư — filter theo lĩnh vực.</li>
  <li><strong>Trang cá nhân /luat-su/[ten]:</strong> H1 “Luật sư [Họ tên] — [Chuyên môn]”.</li>
  <li><strong>Ảnh chân dung chuyên nghiệp</strong> — không selfie.</li>
  <li><strong>Thẻ luật sư, chứng chỉ hành nghề</strong> — số thẻ (theo quy định hiển thị).</li>
  <li><strong>Kinh nghiệm &amp; lĩnh vực</strong> — 200–400 từ, keyword tự nhiên.</li>
  <li><strong>Bài viết / vụ việc tiêu biểu</strong> — mô tả tổng quát, không tiết lộ bí mật khách hàng.</li>
  <li><strong>CTA:</strong> Form tư vấn pre-select luật sư.</li>
  <li><strong>Schema Person</strong> (JSON-LD) nếu phù hợp.</li>
</ol>

<h2 id="linh-vuc">Wireframe — Silo lĩnh vực hành nghề</h2>
<p>Mỗi trang /linh-vuc/* dùng layout thống nhất:</p>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>H1:</strong> “Luật sư [Lĩnh vực] tại [Quận/TP]” — ví dụ “Tư vấn luật doanh nghiệp tại Quận 1”.</li>
  <li><strong>Mô tả dịch vụ:</strong> Tư vấn, soạn thảo, tranh tụng — phạm vi rõ, disclaimer không cam kết kết quả.</li>
  <li><strong>Danh sách dịch vụ con</strong> — bullet H3 (thành lập công ty, hợp đồng, tranh chấp…).</li>
  <li><strong>Luật sư phụ trách</strong> lĩnh vực — internal link profile.</li>
  <li><strong>FAQ schema ≥5 câu</strong> riêng lĩnh vực.</li>
  <li><strong>CTA form tư vấn</strong> cuối trang.</li>
  <li><strong>Internal link:</strong> ↔ Hub /linh-vuc ↔ Blog bài liên quan ↔ <a href="${SITE}/blog/thiet-ke-website-cong-ty-luat">money page</a>.</li>
</ol>

${img(0, "Template website công ty luật — wireframe trang chủ văn phòng luật", "luat")}

<h2 id="tu-van">Wireframe — Form tư vấn bảo mật</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Trang /tu-van:</strong> Form ngắn — họ tên, SĐT, email, lĩnh vực, mô tả vụ việc (textarea).</li>
  <li><strong>Checkbox đồng ý</strong> chính sách bảo mật &amp; điều khoản tư vấn sơ bộ.</li>
  <li><strong>Disclaimer:</strong> Nội dung form không tạo quan hệ luật sư-khách hàng cho đến khi ký hợp đồng.</li>
  <li><strong>Thank-you:</strong> SLA phản hồi (24–48h) + hotline khẩn.</li>
  <li><strong>Email notification</strong> tới hộp thư văn phòng — không lưu plaintext nhạy cảm trên server không mã hóa.</li>
  <li><strong>reCAPTCHA</strong> chống spam form.</li>
</ol>

<h2 id="blog-seo">Blog pháp lý &amp; SEO cluster</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Informational:</strong> “Thủ tục ly hôn”, “Thành lập công ty TNHH” — thu traffic, link silo.</li>
  <li><strong>Local commercial:</strong> “Luật sư [quận]”, “Công ty luật [TP]”.</li>
  <li><strong>Long-tail:</strong> “Tư vấn hợp đồng lao động [ngành]”.</li>
  <li>Mỗi bài blog → 1 trang lĩnh vực + form /tu-van + hub <a href="${SITE}/blog/nganh/luat">/blog/nganh/luat</a>.</li>
</ul>

<div class="overflow-x-auto my-6">
<table class="w-full border-collapse text-sm">
  <thead><tr><th class="border border-indigo-100 px-3 py-2 text-left">Trang</th><th class="border border-indigo-100 px-3 py-2 text-left">Từ khóa gợi ý</th></tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2">Trang chủ</td><td class="border border-indigo-100 px-3 py-2">công ty luật [TP]</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/linh-vuc/doanh-nghiep</td><td class="border border-indigo-100 px-3 py-2">luật sư doanh nghiệp [quận]</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/luat-su/[ten]</td><td class="border border-indigo-100 px-3 py-2">luật sư [tên] [chuyên môn]</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/tu-van</td><td class="border border-indigo-100 px-3 py-2">tư vấn pháp lý miễn phí</td></tr>
  </tbody>
</table>
</div>

<h2 id="trust">Trust, compliance &amp; nội dung pháp lý</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hiển thị số thẻ luật sư</strong> theo quy định — không giả mạo credential.</li>
  <li><strong>Trang Chính sách bảo mật</strong> + Điều khoản sử dụng website.</li>
  <li><strong>Disclaimer tư vấn:</strong> Nội dung web mang tính tham khảo.</li>
  <li><strong>Không hứa hẹn thắng kiện</strong> hoặc kết quả cụ thể trên landing.</li>
  <li><strong>Ảnh văn phòng thật</strong> — trust hơn stock generic.</li>
  <li><strong>Review Google</strong> embed (nếu có) — LocalBusiness schema.</li>
</ol>

${img(1, "Template website công ty luật — silo lĩnh vực hành nghề và profile luật sư", "luat")}

<h2 id="ky-thuat">Technical SEO template luật</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Schema LegalService / Attorney</strong> (phù hợp ngữ cảnh VN — Organization + LocalBusiness).</li>
  <li><strong>FAQPage schema</strong> trên trang lĩnh vực.</li>
  <li><strong>Local SEO:</strong> NAP nhất quán, Google Business Profile trùng địa chỉ web.</li>
  <li><strong>Core Web Vitals:</strong> Form nhẹ, font serif/sans readable.</li>
  <li><strong>Sitemap</strong> gồm profile luật sư + silo lĩnh vực.</li>
  <li><strong>HTTPS, canonical, breadcrumb</strong> trên mọi trang silo.</li>
</ol>

<h2 id="timeline">Timeline triển khai</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Tuần 1:</strong> Chốt sitemap, thu profile luật sư, ảnh, chứng chỉ.</li>
  <li><strong>Tuần 2:</strong> Wireframe trang chủ + 2 lĩnh vực ưu tiên.</li>
  <li><strong>Tuần 3:</strong> Dev form /tu-van + trang luật sư.</li>
  <li><strong>Tuần 4:</strong> Silo lĩnh vực còn lại + SEO on-page.</li>
  <li><strong>Tuần 5:</strong> Blog 2–4 bài seed + GSC + go-live.</li>
</ol>

<div class="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 my-6">
<p><strong>Proof tham chiếu:</strong> Mô hình trust + SEO local tương tự vertical y tế/dịch vụ chuyên môn — xem <a href="${SITE}/du-an/nha-khoa-dang-khoa">case study Nha Khoa Đăng Khoa</a> (<strong>471 clicks</strong> GSC) về cấu trúc silo và form lead.</p>
</div>

${img(2, "Template website công ty luật — form tư vấn và SEO local", "luat")}

<h2 id="silo">Liên kết silo</h2>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li>Money page: <a href="${SITE}/blog/thiet-ke-website-cong-ty-luat">thiết kế website công ty luật</a></li>
  <li>Checklist: <a href="${SITE}/blog/checklist-website-luat-2026">checklist</a></li>
  <li>Hub: <a href="${SITE}/blog/nganh/luat">/blog/nganh/luat</a></li>
  <li>Landing: <a href="${SITE}/website/nganh/luat">/website/nganh/luat</a></li>
</ul>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Template khác checklist thế nào?</h3>
<p>Template = cấu trúc trước; checklist = nghiệm thu sau khi web live.</p>
<h3>Cần trang riêng từng luật sư?</h3>
<p>Nên có — tăng trust và SEO “luật sư [tên] [chuyên môn]”. Tối thiểu 3 profile nếu văn phòng ≥3 luật sư.</p>
<h3>Form tư vấn có cần luật bảo mật?</h3>
<p>Cần trang chính sách bảo mật và disclaimer — đặc biệt với dữ liệu vụ việc nhạy cảm.</p>
<h3>Giá website công ty luật?</h3>
<p>6–12 triệu tùy số profile luật sư và silo lĩnh vực. <a href="${SITE}/banggia">Bảng giá</a> · <a href="${SITE}/blog/thiet-ke-website-cong-ty-luat">Chi tiết</a>.</p>
<h3>Bứt Phá có triển khai theo template?</h3>
<p>Có — <a href="${SITE}/lien-he">tư vấn</a> kèm số luật sư, lĩnh vực hành nghề và yêu cầu form bảo mật.</p>

<p><strong>Liên kết:</strong> <a href="${SITE}/blog/nganh/luat">Hub</a> · <a href="${SITE}/blog/checklist-website-luat-2026">Checklist</a> · <a href="${SITE}/website">Dịch vụ website</a> · <a href="${SITE}/du-an">Case study</a></p>
${internalLinks({ cluster: "luat" })}
`,
  }),
};

console.log("=== Seed template website luật 2026 (expanded) ===\n");
console.log(`Content length: ${article.content.length} chars`);
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-luat-2026");

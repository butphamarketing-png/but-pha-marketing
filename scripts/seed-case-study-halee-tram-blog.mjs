/**
 * Seed bài case study blog — silo nail/nối mi, link về /du-an/halee-tram
 * Chạy: node scripts/seed-case-study-halee-tram-blog.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "case study thiết kế website nail nối mi";

const article = {
  title: "Case Study Thiết Kế Website Halee Trâm Nail Nối Mi Academy",
  slug: "case-study-thiet-ke-website-halee-tram",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "thiết kế website nail, website nối mi, website academy làm đẹp, marketing salon nail",
  metaTitle: "Case Study Website Halee Trâm | Nail Nối Mi Academy",
  metaDescription:
    "Case study website Halee Trâm: haleetram.com — eyelash, nail, academy đào tạo nghề làm đẹy. Bứt Phá Marketing.",
  description:
    "Phân tích case study thiết kế website cho Halee Trâm — nails, nối mi, uốn mi và academy đào tạo nghề.",
  imageUrl: "/case-studies/halee-tram/hero.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Case Study Thiết Kế Website Halee Trâm",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt nhanh" },
  { id: "boi-canh", label: "Bối cảnh dự án" },
  { id: "giai-phap", label: "Giải pháp triển khai" },
  { id: "ket-qua", label: "Trạng thái dự án" },
  { id: "tu-khoa", label: "Bản đồ từ khóa" },
  { id: "bai-hoc", label: "Bài học cho salon" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt nhanh:</strong> Bứt Phá Marketing triển khai website <a href="https://www.haleetram.com/" rel="noopener noreferrer" target="_blank">haleetram.com</a> cho <strong>Halee Trâm — Eyelash / Nail / Academy</strong>: dịch vụ nails, nối mi, uốn mi và đào tạo nghề làm đẹy. Xem <a href="${SITE}/du-an/halee-tram">case study đầy đủ</a>.</p>
</div>

<h2 id="tom-tat">Case study thiết kế website nail nối mi là gì?</h2>
<p><strong>${KEYWORD}</strong> là bài phân tích thực tế cách agency triển khai website cho salon nail, nối mi và academy — gồm portfolio, booking, khóa học và SEO ngành làm đẹy.</p>

<h2 id="boi-canh">Bối cảnh: Halee Trâm</h2>
<p>Halee Trâm hoạt động mô hình <strong>3-in-1</strong>: salon <em>Eyelash / Nail</em> + <em>Academy</em> đào tạo nghề.</p>
<ul>
  <li>Dịch vụ: <strong>Nails</strong>, <strong>Nối mi</strong>, <strong>Uốn mi</strong></li>
  <li>Academy: khóa học nail &amp; lash cho học viên</li>
  <li>Khách so sánh portfolio trước khi đặt lịch — website phải showcase đẹp trên mobile</li>
  <li>Positioning: Halee Trâm — Eyelash / Nail / Academy</li>
</ul>

${img(0, "Thiết kế website Halee Trâm — Eyelash Nail Academy", "my-pham")}

<h2 id="giai-phap">Giải pháp Bứt Phá triển khai</h2>
<ol>
  <li><strong>Website haleetram.com:</strong> Hero positioning Eyelash / Nail / Academy rõ ràng</li>
  <li><strong>Silo dịch vụ:</strong> Trang nails, nối mi, uốn mi — SEO long-tail</li>
  <li><strong>Academy:</strong> Trang khóa học riêng — lead học viên tách khách dịch vụ</li>
  <li><strong>Booking:</strong> CTA đặt lịch mobile-first</li>
  <li><strong>SEO:</strong> On-page nail nối mi, schema LocalBusiness</li>
</ol>
<p>Chi tiết: <a href="${SITE}/blog/thiet-ke-website-my-pham-lam-dep">thiết kế website mỹ phẩm làm đẹp</a>, <a href="${SITE}/blog/thiet-ke-website-spa">thiết kế website spa</a>.</p>

<h2 id="ket-qua">Trạng thái dự án</h2>
<table class="w-full border-collapse text-sm my-6">
  <thead><tr class="bg-indigo-50"><th class="border border-indigo-100 px-3 py-2 text-left">Hạng mục</th><th class="border border-indigo-100 px-3 py-2 text-left">Trạng thái</th></tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2">Website haleetram.com</td><td class="border border-indigo-100 px-3 py-2"><strong>Live</strong></td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Positioning</td><td class="border border-indigo-100 px-3 py-2">Eyelash · Nail · Academy</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Dịch vụ</td><td class="border border-indigo-100 px-3 py-2">Nails · Nối mi · Uốn mi</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">SEO</td><td class="border border-indigo-100 px-3 py-2">Đang triển khai</td></tr>
  </tbody>
</table>
<p><a href="${SITE}/du-an/halee-tram">→ Xem case study đầy đủ</a></p>

${img(1, "Website salon nail nối mi chuyên nghiệp", "my-pham")}

<h2 id="tu-khoa">Bản đồ từ khóa đang tối ưu</h2>
<p>Cluster: thiết kế website nail, website nối mi, nối mi salon, nail salon, học nối mi, khóa học nail, academy nail, uốn mi, marketing salon nail…</p>

<h2 id="bai-hoc">Bài học — website nail &amp; lash cần gì?</h2>
<ul>
  <li><strong>Portfolio trước giá:</strong> Khách nail/lash quyết định bằng ảnh tay/mi</li>
  <li><strong>2 luồng lead:</strong> Khách đặt lịch vs học viên đăng ký khóa — tách CTA rõ</li>
  <li><strong>Mobile-first:</strong> 90%+ traffic Instagram/Zalo chuyển sang web trên điện thoại</li>
  <li><strong>Silo academy:</strong> “Học nối mi”, “khóa nail” = long-tail ít cạnh tranh</li>
</ul>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Thiết kế website nail giá bao nhiêu tương tự Halee Trâm?</h3>
<p>Gói website salon làm đẹy Bứt Phá từ 3–10 triệu tùy booking, gallery và academy. <a href="${SITE}/banggia">Xem bảng giá</a>.</p>
<h3>Website nail khác website spa thế nào?</h3>
<p>Nail/lash nhấn portfolio artisan và bảng dịch vụ chi tiết; spa wellness tập trung liệu trình massage/chăm sóc toàn thân.</p>

<p><strong>Liên kết nội bộ:</strong> <a href="${SITE}/du-an/halee-tram">Case study đầy đủ</a> · <a href="${SITE}/blog/thiet-ke-website-my-pham-lam-dep">Website mỹ phẩm làm đẹp</a> · <a href="${SITE}/blog/thiet-ke-website-spa">Website spa</a> · <a href="${SITE}/website">Dịch vụ website</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed case study blog Halee Trâm ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/case-study-thiet-ke-website-halee-tram");

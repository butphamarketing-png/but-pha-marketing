/**
 * Seed bài case study blog — silo SEO nha khoa, link về /du-an/nha-khoa-dang-khoa
 * Chạy: node scripts/seed-case-study-nha-khoa-dang-khoa-blog.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "case study thiết kế website nha khoa";

const article = {
  title: "Case Study Thiết Kế Website Nha Khoa Đăng Khoa Tây Ninh",
  slug: "case-study-thiet-ke-website-nha-khoa-dang-khoa",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "thiết kế website nha khoa, seo website nha khoa, nha khoa tây ninh, website implant nha khoa",
  metaTitle: "Case Study Website Nha Khoa Đăng Khoa | 471 Click GSC",
  metaDescription:
    "Case study website nha khoa Đăng Khoa Tây Ninh: 15,4K impression GSC, 471 click, vị trí TB 5,3. Implant & niềng răng. Bứt Phá Marketing.",
  description:
    "Phân tích case study thiết kế website và SEO cho Hệ Thống Nha Khoa Đăng Khoa — số liệu GSC, fanpage và chiến lược local Tây Ninh.",
  imageUrl: "/case-studies/nha-khoa-dang-khoa/gsc-performance.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Case Study Thiết Kế Website Nha Khoa Đăng Khoa",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt nhanh" },
  { id: "boi-canh", label: "Bối cảnh dự án" },
  { id: "giai-phap", label: "Giải pháp triển khai" },
  { id: "ket-qua", label: "Kết quả GSC" },
  { id: "tu-khoa", label: "Bản đồ từ khóa" },
  { id: "bai-hoc", label: "Bài học cho nha khoa" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt nhanh:</strong> Bứt Phá Marketing triển khai website <a href="https://hethongnhakhoadangkhoa.vn/" rel="noopener noreferrer" target="_blank">hethongnhakhoadangkhoa.vn</a> và <a href="https://www.facebook.com/profile.php?id=61590506472413" rel="noopener noreferrer" target="_blank">fanpage Nha Khoa Đăng Khoa Tây Ninh</a> — implant, niềng răng, BS Nguyễn Đăng Khoa. Sau 3 tháng GSC: <strong>15.400 lượt hiển thị</strong>, <strong>471 lượt nhấp</strong>, CTR <strong>3,1%</strong>, vị trí TB <strong>5,3</strong>. Xem <a href="${SITE}/du-an/nha-khoa-dang-khoa">case study đầy đủ có screenshot GSC</a>.</p>
</div>

<h2 id="tom-tat">Case study thiết kế website nha khoa là gì?</h2>
<p><strong>${KEYWORD}</strong> là bài phân tích thực tế cách agency triển khai website, SEO và fanpage cho phòng khám nha khoa — gồm hồ sơ bác sĩ, silo Implant/niềng răng, đặt lịch và số liệu Google Search Console. Khác bài lý thuyết, case study chứng minh bằng <em>proof</em> số liệu thật.</p>

<h2 id="boi-canh">Bối cảnh: Hệ Thống Nha Khoa Đăng Khoa</h2>
<p>Nha Khoa Đăng Khoa hoạt động tại <strong>Tây Ninh</strong> — địa chỉ 345-347 Điện Biên Phủ, Ninh Thạnh, positioning <em>“Địa chỉ nha khoa uy tín hàng đầu Tây Ninh”</em>.</p>
<ul>
  <li>BS CHUYÊN KHOA RĂNG HÀM MẶT <strong>Nguyễn Đăng Khoa</strong> — uy tín y khoa trên website</li>
  <li>Dịch vụ cao giá trị: <strong>Cấy ghép Implant</strong>, <strong>Niềng răng</strong>, <strong>Xe đưa đón tận nhà</strong></li>
  <li>Hotline <strong>08.86.86.87.86</strong> — floating đặt lịch, Zalo, Messenger</li>
  <li>Slogan: Uy tín · Chất lượng · Tận tâm</li>
</ul>

<figure class="my-6"><img src="/case-studies/nha-khoa-dang-khoa/website-homepage.png" alt="Website Nha Khoa Đăng Khoa — Implant niềng răng Tây Ninh" loading="lazy" width="1200" height="675" class="w-full rounded-2xl border border-indigo-100" /><figcaption class="mt-2 text-center text-sm text-slate-500">hethongnhakhoadangkhoa.vn — hero BS Nguyễn Đăng Khoa, Implant, Niềng răng, xe đưa đón.</figcaption></figure>

<h2 id="giai-phap">Giải pháp Bứt Phá triển khai</h2>
<ol>
  <li><strong>Website:</strong> UI vàng–navy chuyên nghiệp, menu Dịch vụ · Bảng giá · Kiến thức · Khách hàng</li>
  <li><strong>Silo dịch vụ:</strong> Trang riêng Implant, niềng răng — SEO long-tail</li>
  <li><strong>USP:</strong> Xe đưa đón tận nhà nổi bật trên hero — khác biệt địa phương</li>
  <li><strong>Fanpage:</strong> Cover &amp; bio đồng bộ — Trung tâm Nha Khoa Công Nghệ Cao</li>
  <li><strong>SEO:</strong> On-page Tây Ninh, schema, theo dõi GSC hàng tuần</li>
</ol>
<p>Chi tiết: <a href="${SITE}/blog/thiet-ke-website-nha-khoa">thiết kế website nha khoa</a>, <a href="${SITE}/blog/thiet-ke-website-nha-khoa-nieng-rang">website niềng răng</a>.</p>

<h2 id="ket-qua">Kết quả Google Search Console (3 tháng)</h2>
<table class="w-full border-collapse text-sm my-6">
  <thead><tr class="bg-indigo-50"><th class="border border-indigo-100 px-3 py-2 text-left">Chỉ số</th><th class="border border-indigo-100 px-3 py-2 text-left">Giá trị</th></tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2">Lượt hiển thị Google</td><td class="border border-indigo-100 px-3 py-2"><strong>15.400</strong></td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Lượt nhấp organic</td><td class="border border-indigo-100 px-3 py-2"><strong>471</strong></td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">CTR trung bình</td><td class="border border-indigo-100 px-3 py-2">3,1%</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Vị trí trung bình</td><td class="border border-indigo-100 px-3 py-2"><strong>5,3</strong></td></tr>
  </tbody>
</table>

<figure class="my-6"><img src="/case-studies/nha-khoa-dang-khoa/gsc-performance.png" alt="Google Search Console Nha Khoa Đăng Khoa — 471 click 15,4K impression" loading="lazy" width="1200" height="675" class="w-full rounded-2xl border border-indigo-100" /><figcaption class="mt-2 text-center text-sm text-slate-500">Screenshot GSC: 471 click, 15,4K impression, CTR 3,1%, vị trí TB 5,3 trong 3 tháng.</figcaption></figure>

<figure class="my-6"><img src="/case-studies/nha-khoa-dang-khoa/facebook-page.png" alt="Fanpage Facebook Nha Khoa Đăng Khoa Tây Ninh" loading="lazy" width="1200" height="675" class="w-full rounded-2xl border border-indigo-100" /><figcaption class="mt-2 text-center text-sm text-slate-500">Fanpage Nha Khoa Đăng Khoa Tây Ninh — đồng bộ cover với website.</figcaption></figure>

<p><a href="${SITE}/du-an/nha-khoa-dang-khoa">→ Xem case study đầy đủ</a></p>

${img(0, "Thiết kế website nha khoa chuyên nghiệp chuẩn SEO", "nha-khoa")}

<h2 id="tu-khoa">Bản đồ từ khóa đang tối ưu</h2>
<p>Cluster: nha khoa tây ninh, cấy ghép implant tây ninh, niềng răng tây ninh, nha khoa điện biên phủ, bác sĩ implant, đặt lịch nha khoa, marketing nha khoa…</p>

<h2 id="bai-hoc">Bài học — website nha khoa lên top Google local</h2>
<ul>
  <li><strong>BS chuyên khoa trên hero:</strong> E-E-A-T y tế — khách tin BS trước khi book Implant</li>
  <li><strong>Silo Implant + niềng răng:</strong> Mỗi dịch vụ cao giá trị = landing riêng</li>
  <li><strong>USP địa phương:</strong> Xe đưa đón tận nhà — differentiation tại tỉnh</li>
  <li><strong>Proof GSC:</strong> Screenshot số liệu tăng trust hơn lời marketing</li>
</ul>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Thiết kế website nha khoa giá bao nhiêu tương tự Đăng Khoa?</h3>
<p>Gói website nha khoa Bứt Phá từ 4–14 triệu tùy booking, silo dịch vụ và SEO local. <a href="${SITE}/banggia">Xem bảng giá</a>.</p>
<h3>Bao lâu để nha khoa có traffic organic như Đăng Khoa?</h3>
<p>Case Đăng Khoa đạt 471 click sau 3 tháng với vị trí TB 5,3 — cần silo dịch vụ + local intent + tốc độ mobile. Thời gian phụ thuộc cạnh tranh tỉnh.</p>

<p><strong>Liên kết nội bộ:</strong> <a href="${SITE}/du-an/nha-khoa-dang-khoa">Case study đầy đủ</a> · <a href="${SITE}/blog/thiet-ke-website-nha-khoa">Thiết kế website nha khoa</a> · <a href="${SITE}/blog/thiet-ke-website">Pillar thiết kế website</a> · <a href="${SITE}/website">Dịch vụ website</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed case study blog Nha Khoa Đăng Khoa ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/case-study-thiet-ke-website-nha-khoa-dang-khoa");

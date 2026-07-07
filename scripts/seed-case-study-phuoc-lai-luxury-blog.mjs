/**
 * Seed bài case study blog — silo SEO spa, link về /du-an/phuoc-lai-luxury
 * Chạy: node scripts/seed-case-study-phuoc-lai-luxury-blog.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "case study thiết kế website spa";

const article = {
  title: "Case Study Thiết Kế Website Spa Phước Lai Luxury",
  slug: "case-study-thiet-ke-website-spa-phuoc-lai-luxury",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "thiết kế website spa, website phun xăm, seo phun xăm vũng tàu, website academy làm đẹp",
  metaTitle: "Case Study Website Spa Phước Lai Luxury | Phun Xăm Vũng Tàu",
  metaDescription:
    "Case study website spa Phước Lai Luxury: phunxamvungtau.com + fanpage, Permanent Makeup & Spa & Academy Vũng Tàu. Bứt Phá Marketing.",
  description:
    "Phân tích case study thiết kế website luxury cho Phước Lai — phun xăm, spa và academy tại Vũng Tàu.",
  imageUrl: "/case-studies/phuoc-lai-luxury/website-homepage.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Case Study Thiết Kế Website Spa Phước Lai Luxury",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt nhanh" },
  { id: "boi-canh", label: "Bối cảnh dự án" },
  { id: "giai-phap", label: "Giải pháp triển khai" },
  { id: "ket-qua", label: "Kết quả & trạng thái" },
  { id: "tu-khoa", label: "Bản đồ từ khóa" },
  { id: "bai-hoc", label: "Bài học cho spa" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt nhanh:</strong> Bứt Phá Marketing triển khai website <a href="https://www.phunxamvungtau.com/" rel="noopener noreferrer" target="_blank">phunxamvungtau.com</a> (<strong>Phước Lai Luxury — Permanent Makeup &amp; Spa &amp; Academy</strong>) và <a href="https://www.facebook.com/phuoclaicelinevungtau" rel="noopener noreferrer" target="_blank">fanpage Facebook</a> tại Vũng Tàu. Hero luxury 3 panel Master (Nhung Lai, Phuoc Lai, Cam Lai), CTA <strong>Booking</strong>. Xem <a href="${SITE}/du-an/phuoc-lai-luxury">case study đầy đủ có screenshot</a>.</p>
</div>

<h2 id="tom-tat">Case study thiết kế website spa là gì?</h2>
<p><strong>${KEYWORD}</strong> là bài phân tích thực tế cách agency triển khai website, SEO và fanpage cho spa / phun xăm / academy — gồm UI luxury, showcase Master team, booking và tối ưu Google local. Khác bài lý thuyết, case study chứng minh bằng dự án thật.</p>

<h2 id="boi-canh">Bối cảnh: Phước Lai Luxury</h2>
<p>Phước Lai Luxury hoạt động tại <strong>Vũng Tàu</strong> với mô hình 3-in-1: <em>Permanent Makeup</em> (phun xăm thẩm mỹ), <em>Spa</em> chăm sóc và <em>Academy</em> đào tạo nghề làm đẹp.</p>
<ul>
  <li>Khách so sánh portfolio Master trước khi đặt lịch phun xăm hoặc đăng ký khóa học</li>
  <li>Cần website luxury — khác spa bình dân, typography serif, palette đen–vàng</li>
  <li>Song song Google (website) và Facebook (fanpage portfolio &amp; content)</li>
  <li>Từ khóa local: phun xăm vũng tàu, spa vũng tàu, học phun xăm…</li>
</ul>

<figure class="my-6"><img src="/case-studies/phuoc-lai-luxury/website-homepage.png" alt="Website Phước Lai Luxury — Permanent Makeup Spa Academy Vũng Tàu" loading="lazy" width="1200" height="675" class="w-full rounded-2xl border border-indigo-100" /><figcaption class="mt-2 text-center text-sm text-slate-500">Screenshot phunxamvungtau.com — hero 3 Master, CTA Booking, positioning Permanent Makeup &amp; Spa &amp; Academy.</figcaption></figure>

<h2 id="giai-phap">Giải pháp Bứt Phá triển khai</h2>
<ol>
  <li><strong>Website luxury:</strong> Hero fullscreen 3 panel — Master Nhung Lai, Phuoc Lai, Cam Lai</li>
  <li><strong>Positioning:</strong> “Phuoc Lai Luxury — Permanent Makeup &amp; Spa &amp; Academy” trên banner</li>
  <li><strong>CTA Booking:</strong> Nút booking nổi bật + floating chat/Zalo/AI assistant</li>
  <li><strong>Fanpage:</strong> <a href="https://www.facebook.com/phuoclaicelinevungtau" rel="noopener noreferrer" target="_blank">Phước Lai Luxury Vũng Tàu</a> — portfolio &amp; lead inbox</li>
  <li><strong>SEO:</strong> On-page phun xăm Vũng Tàu, schema LocalBusiness, Google Maps</li>
</ol>
<p>Chi tiết: <a href="${SITE}/blog/thiet-ke-website-spa">thiết kế website spa</a>, <a href="${SITE}/blog/thiet-ke-website-tham-my-vien">website thẩm mỹ viện</a>.</p>

<h2 id="ket-qua">Kết quả &amp; trạng thái dự án</h2>
<table class="w-full border-collapse text-sm my-6">
  <thead><tr class="bg-indigo-50"><th class="border border-indigo-100 px-3 py-2 text-left">Hạng mục</th><th class="border border-indigo-100 px-3 py-2 text-left">Trạng thái</th></tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2">Website phunxamvungtau.com</td><td class="border border-indigo-100 px-3 py-2"><strong>Live</strong></td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Fanpage phuoclaicelinevungtau</td><td class="border border-indigo-100 px-3 py-2"><strong>Active</strong></td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Master team</td><td class="border border-indigo-100 px-3 py-2">3 Masters — Nhung · Phuoc · Cam Lai</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">SEO local Vũng Tàu</td><td class="border border-indigo-100 px-3 py-2">Đang triển khai &amp; đo lường GSC</td></tr>
  </tbody>
</table>
<p><a href="${SITE}/du-an/phuoc-lai-luxury">→ Xem case study đầy đủ</a></p>

${img(0, "Thiết kế website spa chuyên nghiệp chuẩn SEO", "tham-my")}

<h2 id="tu-khoa">Bản đồ từ khóa đang tối ưu</h2>
<p>Cluster: thiết kế website spa, phun xăm vũng tàu, spa vũng tàu, học phun xăm, đào tạo phun xăm, điêu khắc chân mày vũng tàu, phun môi vũng tàu, marketing spa vũng tàu…</p>

<h2 id="bai-hoc">Bài học — website spa luxury cần gì?</h2>
<ul>
  <li><strong>Showcase Master:</strong> Ngành phun xăm bán uy tín nghệ nhân — hero 3 panel hiệu quả hơn slider generic</li>
  <li><strong>3-in-1 rõ ràng:</strong> Phun xăm · Spa · Academy — mỗi mảng cần silo trang riêng</li>
  <li><strong>Booking 1-click:</strong> Khách spa quyết định nhanh trên mobile</li>
  <li><strong>Local SEO:</strong> “Phun xăm + Vũng Tàu” ít cạnh tranh hơn head keyword toàn quốc</li>
</ul>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Thiết kế website spa giá bao nhiêu tương tự Phước Lai?</h3>
<p>Gói website spa Bứt Phá từ 3–12 triệu tùy booking, gallery và SEO local. <a href="${SITE}/banggia">Xem bảng giá</a>.</p>
<h3>Website phun xăm khác website spa thường thế nào?</h3>
<p>Phun xăm nhấn portfolio Master, before/after có consent và khóa học academy — spa wellness thuần túy tập trung liệu trình massage/chăm sóc.</p>

<p><strong>Liên kết nội bộ:</strong> <a href="${SITE}/du-an/phuoc-lai-luxury">Case study đầy đủ</a> · <a href="${SITE}/blog/thiet-ke-website-spa">Thiết kế website spa</a> · <a href="${SITE}/blog/thiet-ke-website">Pillar thiết kế website</a> · <a href="${SITE}/website">Dịch vụ website</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed case study blog Phước Lai Luxury ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/case-study-thiet-ke-website-spa-phuoc-lai-luxury");

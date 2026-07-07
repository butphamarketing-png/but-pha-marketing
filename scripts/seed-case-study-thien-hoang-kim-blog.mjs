/**
 * Seed bài case study blog — silo SEO thẩm mỹ, link về /du-an/tham-my-thien-hoang-kim
 * Chạy: node scripts/seed-case-study-thien-hoang-kim-blog.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "case study thiết kế website thẩm mỹ viện";

const article = {
  title: "Case Study Thiết Kế Website Thẩm Mỹ Thiên Hoàng Kim",
  slug: "case-study-thiet-ke-website-tham-my-thien-hoang-kim",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "thiết kế website thẩm mỹ viện, website phòng khám thẩm mỹ, seo thẩm mỹ viện, marketing thẩm mỹ",
  metaTitle: "Case Study Thiết Kế Website Thẩm Mỹ Thiên Hoàng Kim | Bứt Phá",
  metaDescription:
    "Case study website thẩm mỹ viện Thiên Hoàng Kim Aesthetic Clinic: thammythienhoangkim.com + fanpage chuyên khoa. Triển khai bởi Bứt Phá Marketing.",
  description:
    "Phân tích case study thiết kế website và marketing cho Thẩm Mỹ Thiên Hoàng Kim — aesthetic clinic, fanpage chuyên khoa và SEO local TP.HCM.",
  imageUrl: "/case-studies/thien-hoang-kim/website-homepage.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Case Study Thiết Kế Website Thẩm Mỹ Thiên Hoàng Kim",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt nhanh" },
  { id: "boi-canh", label: "Bối cảnh dự án" },
  { id: "giai-phap", label: "Giải pháp triển khai" },
  { id: "ket-qua", label: "Kết quả & trạng thái" },
  { id: "tu-khoa", label: "Bản đồ từ khóa" },
  { id: "bai-hoc", label: "Bài học cho clinic" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt nhanh:</strong> Bứt Phá Marketing triển khai website <a href="https://www.thammythienhoangkim.com/" rel="noopener noreferrer" target="_blank">thammythienhoangkim.com</a> (Thiên Hoàng Kim Aesthetic Clinic — <em>Nâng Tầm Nhan Sắc</em>) tại <strong>323-325 Hùng Vương, Phường An Đông, TP.HCM</strong> và <a href="https://www.facebook.com/chuyenkhoathammy.thienhoangkim" rel="noopener noreferrer" target="_blank">fanpage chuyên khoa thẩm mỹ</a>. Website có CTA <strong>Đặt lịch ngay</strong>, hotline <strong>0938 673 996</strong>, Zalo và menu Dịch vụ · Bảng giá · Tin tức. Xem <a href="${SITE}/du-an/tham-my-thien-hoang-kim">case study đầy đủ có screenshot thật</a>.</p>
</div>

<h2 id="tom-tat">Case study thiết kế website thẩm mỹ viện là gì?</h2>
<p><strong>${KEYWORD}</strong> là bài phân tích thực tế cách agency triển khai website, SEO và fanpage cho phòng khám thẩm mỹ — gồm positioning aesthetic clinic, cấu trúc dịch vụ làm đẹy y khoa, đặt lịch tư vấn và tối ưu Google. Khác bài lý thuyết, case study chứng minh năng lực bằng <em>proof</em> dự án thật — website live và fanpage chuyên khoa.</p>

<h2 id="boi-canh">Bối cảnh: Thẩm Mỹ Thiên Hoàng Kim</h2>
<p>Thiên Hoàng Kim Aesthetic Clinic hoạt động trong phân khúc <strong>thẩm mỹ y khoa cao cấp</strong> tại TP.HCM — filler, botox, căng da, phẫu thuật thẩm mỹ và các dịch vụ làm đẹy chuyên sâu.</p>
<ul>
  <li>Khách so sánh nhiều clinic trước khi đặt lịch — website là điểm đánh giá uy tín đầu tiên</li>
  <li>Cần phân biệt rõ với spa wellness hoặc shop mỹ phẩm</li>
  <li>Song song Google (website) và Facebook (fanpage chuyên khoa thẩm mỹ)</li>
  <li>Từ khóa commercial: thẩm mỹ viện tphcm, tiêm filler botox, nâng mũi uy tín…</li>
</ul>

${img(0, "Case study thiết kế website thẩm mỹ viện Thiên Hoàng Kim Aesthetic Clinic", "tham-my")}

<figure class="my-6"><img src="/case-studies/thien-hoang-kim/website-homepage.png" alt="Website Thiên Hoàng Kim Aesthetic Clinic — banner Nâng Tầm Nhan Sắc" loading="lazy" width="1200" height="675" class="w-full rounded-2xl border border-indigo-100" /><figcaption class="mt-2 text-center text-sm text-slate-500">Screenshot thammythienhoangkim.com — hero Phòng Khám Chuyên Khoa Thẩm Mỹ, 4 giá trị: Bác sĩ chuyên môn cao · Đẹp tự nhiên · An toàn · Chuẩn Y Khoa.</figcaption></figure>

<h2 id="giai-phap">Giải pháp Bứt Phá triển khai</h2>
<ol>
  <li><strong>Website:</strong> thammythienhoangkim.com — UI aesthetic clinic sang trọng, mobile-first, CTA đặt lịch/Zalo</li>
  <li><strong>Cấu trúc dịch vụ:</strong> Trang riêng filler, botox, căng da, phẫu thuật — hỗ trợ SEO long-tail</li>
  <li><strong>Fanpage:</strong> <a href="https://www.facebook.com/chuyenkhoathammy.thienhoangkim" rel="noopener noreferrer" target="_blank">Chuyên khoa thẩm mỹ Thiên Hoàng Kim</a> — đồng bộ thương hiệu với website</li>
  <li><strong>SEO:</strong> On-page, schema Organization/FAQ, từ khóa local theo quận TP.HCM</li>
  <li><strong>Đa kênh:</strong> Website + Facebook + hotline/Zalo chốt lead</li>
</ol>
<p>Chi tiết kỹ thuật: <a href="${SITE}/blog/thiet-ke-website-tham-my-vien">thiết kế website thẩm mỹ viện</a>, <a href="${SITE}/blog/thiet-ke-website-spa">website spa vs clinic</a>.</p>

<h2 id="ket-qua">Kết quả &amp; trạng thái dự án</h2>
<table class="w-full border-collapse text-sm my-6">
  <thead><tr class="bg-indigo-50"><th class="border border-indigo-100 px-3 py-2 text-left">Hạng mục</th><th class="border border-indigo-100 px-3 py-2 text-left">Trạng thái</th></tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2">Website thammythienhoangkim.com</td><td class="border border-indigo-100 px-3 py-2"><strong>Live</strong></td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Fanpage chuyên khoa thẩm mỹ</td><td class="border border-indigo-100 px-3 py-2"><strong>Active</strong></td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Positioning Aesthetic Clinic</td><td class="border border-indigo-100 px-3 py-2">Nâng tầm nhan sắc</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">SEO local &amp; dịch vụ làm đẹy</td><td class="border border-indigo-100 px-3 py-2">Đang triển khai &amp; đo lường GSC</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Đa kênh Web + Facebook</td><td class="border border-indigo-100 px-3 py-2">Đã kết nối</td></tr>
  </tbody>
</table>
<p><a href="${SITE}/du-an/tham-my-thien-hoang-kim">→ Xem case study đầy đủ với screenshot website &amp; fanpage</a></p>

<figure class="my-6"><img src="/case-studies/thien-hoang-kim/facebook-page.png" alt="Fanpage Facebook chuyên khoa thẩm mỹ Thiên Hoàng Kim" loading="lazy" width="1200" height="675" class="w-full rounded-2xl border border-indigo-100" /><figcaption class="mt-2 text-center text-sm text-slate-500">Fanpage Facebook — cover &amp; bio đồng bộ: Đẹp tự nhiên · An toàn y khoa · Chuẩn quốc tế.</figcaption></figure>

${img(1, "Giao diện website phòng khám thẩm mỹ chuyên nghiệp — Thiên Hoàng Kim", "tham-my")}

<h2 id="tu-khoa">Bản đồ từ khóa đang tối ưu</h2>
<p>Cluster chính: thiết kế website thẩm mỹ viện, thẩm mỹ viện tphcm, phòng khám thẩm mỹ hùng vương, thẩm mỹ viện quận 5, tiêm filler botox, nâng mũi uy tín, phẫu thuật thẩm mỹ, marketing thẩm mỹ viện…</p>

<h2 id="bai-hoc">Bài học — website thẩm mỹ viện cần gì để cạnh tranh SEO?</h2>
<ul>
  <li><strong>Uy tín y khoa trước visual:</strong> Hồ sơ bác sĩ, quy trình, FAQ — không chỉ gallery đẹp</li>
  <li><strong>Silo ngành:</strong> Money page + case study + cluster blog (spa, nha khoa, mỹ phẩm)</li>
  <li><strong>Local intent:</strong> “Thẩm mỹ viện + quận” ít cạnh tranh hơn head keyword</li>
  <li><strong>Đa kênh:</strong> Google SEO + fanpage inbox — khách VN thường chat trước khi đặt lịch</li>
  <li><strong>Before/after có consent:</strong> Tuân thủ quảng cáo dịch vụ y tế</li>
</ul>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Thiết kế website thẩm mỹ viện giá bao nhiêu tương tự Thiên Hoàng Kim?</h3>
<p>Gói website thẩm mỹ Bứt Phá từ 3–12 triệu tùy số dịch vụ, booking và SEO local. <a href="${SITE}/banggia">Xem bảng giá</a>.</p>
<h3>Website thẩm mỹ khác website spa thế nào?</h3>
<p>Thẩm mỹ viện nhấn bác sĩ chuyên khoa, dịch vụ y khoa (filler, botox, phẫu thuật) và tuân thủ quảng cáo y tế. Spa wellness tập trung massage, chăm sóc da nhẹ hơn.</p>
<h3>Làm sao để clinic lên top Google?</h3>
<p>Cần silo: money page + case study + blog cluster + schema FAQ + Google Maps + tốc độ mobile. Thời gian thường 3–6 tháng cho long-tail local.</p>

<p><strong>Liên kết nội bộ:</strong> <a href="${SITE}/du-an/tham-my-thien-hoang-kim">Case study đầy đủ</a> · <a href="${SITE}/blog/thiet-ke-website-tham-my-vien">Thiết kế website thẩm mỹ viện</a> · <a href="${SITE}/blog/thiet-ke-website">Pillar thiết kế website</a> · <a href="${SITE}/website">Dịch vụ website</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed case study blog Thiên Hoàng Kim ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/case-study-thiet-ke-website-tham-my-thien-hoang-kim");

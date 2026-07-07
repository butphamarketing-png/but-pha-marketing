/**
 * Seed bài case study blog — silo SEO xây dựng, link về /du-an/kien-truc-sao-khue
 * Chạy: node scripts/seed-case-study-sao-khue-blog.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks, NEWS_THUMBNAIL } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "case study thiết kế website xây dựng";

const article = {
  title: "Case Study Thiết Kế Website Xây Dựng Kiến Trúc Sao Khuê",
  slug: "case-study-thiet-ke-website-xay-dung-sao-khue",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "thiết kế website công ty xây dựng, seo website xây dựng, website nhà thầu, marketing xây dựng",
  metaTitle: "Case Study Thiết Kế Website Xây Dựng Sao Khuê | Bứt Phá",
  metaDescription:
    "Case study thiết kế website xây dựng Kiến Trúc Sao Khuê: 3.460 impression GSC, 83K view Facebook, SEO đa quận HCM & tỉnh. Triển khai bởi Bứt Phá Marketing.",
  description:
    "Phân tích case study thiết kế website và SEO cho công ty xây dựng Kiến Trúc Sao Khuê — số liệu GSC, fanpage và chiến lược từ khóa đa tỉnh.",
  imageUrl: NEWS_THUMBNAIL,
  hot: true,
  content: wrapArticle({
    metaTitle: "Case Study Thiết Kế Website Xây Dựng Sao Khuê",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt nhanh" },
  { id: "boi-canh", label: "Bối cảnh dự án" },
  { id: "giai-phap", label: "Giải pháp triển khai" },
  { id: "ket-qua", label: "Kết quả đo lường" },
  { id: "tu-khoa", label: "Bản đồ từ khóa" },
  { id: "bai-hoc", label: "Bài học cho nhà thầu" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt nhanh:</strong> Bứt Phá Marketing triển khai website <a href="https://www.kientrucsaokhue.com/" rel="noopener noreferrer" target="_blank">kientrucsaokhue.com</a> và fanpage Facebook cho Kiến Trúc Sao Khuê — công ty xây dựng, sửa chữa cải tạo nhà. Sau 3 tháng: <strong>3.460 lượt hiển thị Google</strong>, <strong>82 lượt nhấp organic</strong>, fanpage <strong>83.374 lượt xem</strong> trong 90 ngày. Xem <a href="${SITE}/du-an/kien-truc-sao-khue">case study đầy đủ có screenshot GSC</a>.</p>
</div>

<h2 id="tom-tat">Case study thiết kế website xây dựng là gì?</h2>
<p><strong>${KEYWORD}</strong> là bài phân tích thực tế cách một agency triển khai website, SEO và marketing cho công ty xây dựng — gồm cấu trúc trang, từ khóa theo khu vực, fanpage và số liệu đo lường (Google Search Console, Facebook Insights). Khác bài lý thuyết, case study chứng minh năng lực triển khai bằng <em>proof</em> — điều MONA Media làm qua 456 portfolio, nhưng Bứt Phá tập trung <strong>đi sâu từng ngành</strong> với số liệu minh bạch.</p>

<h2 id="boi-canh">Bối cảnh: Kiến Trúc Sao Khuê</h2>
<p>Kiến Trúc Sao Khuê hoạt động trong lĩnh vực <strong>thiết kế &amp; thi công xây dựng</strong> — nhà phố, biệt thự, sửa chữa cải tạo nhà tại TP.HCM và mở rộng Phú Yên, Đồng Nai, Long An, Bình Định, Gia Lai, Đắk Lắk.</p>
<ul>
  <li>Khách tìm theo intent địa phương: <em>cải tạo nhà quận 1</em>, <em>xây nhà trọn gói phú yên</em>, <em>sửa nhà trọn gói hcm</em></li>
  <li>Cần song song Google (website) và Facebook (fanpage video/Reels)</li>
  <li>Cạnh tranh với các đơn vị lớn đã có SEO nhiều năm</li>
</ul>

${img(0, "Case study thiết kế website xây dựng Kiến Trúc Sao Khuê — Google Search Console", "kien-truc")}

<h2 id="giai-phap">Giải pháp Bứt Phá triển khai</h2>
<ol>
  <li><strong>Website:</strong> Trang dịch vụ rõ (xây nhà trọn gói, sửa chữa, thiết kế), FAQ schema, CTA hotline, tốc độ Next.js/WordPress tùy stack</li>
  <li><strong>SEO:</strong> Bản đồ từ khóa theo quận HCM + tỉnh; title/meta chứa intent địa phương; internal link silo</li>
  <li><strong>Fanpage:</strong> <a href="https://www.facebook.com/dichvusuachuanha.caitaonhatrongoi" rel="noopener noreferrer" target="_blank">Fanpage sửa chữa cải tạo nhà</a> — content spike, Reels</li>
  <li><strong>Đo lường:</strong> GSC hàng tuần, Facebook Insights — tối ưu title/meta theo query có impression</li>
</ol>
<p>Chi tiết kỹ thuật: <a href="${SITE}/blog/thiet-ke-website-xay-dung-nha-thau">thiết kế website xây dựng nhà thầu</a>, <a href="${SITE}/blog/thiet-ke-website-cong-ty-xay-dung">website công ty xây dựng</a>.</p>

<h2 id="ket-qua">Kết quả (giai đoạn đang triển khai)</h2>
<table class="w-full border-collapse text-sm my-6">
  <thead><tr class="bg-indigo-50"><th class="border border-indigo-100 px-3 py-2 text-left">Chỉ số</th><th class="border border-indigo-100 px-3 py-2 text-left">Giá trị</th></tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2">Lượt hiển thị Google (3 tháng)</td><td class="border border-indigo-100 px-3 py-2"><strong>3.460</strong></td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Lượt nhấp organic</td><td class="border border-indigo-100 px-3 py-2"><strong>82</strong></td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">CTR trung bình</td><td class="border border-indigo-100 px-3 py-2">2,4%</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Vị trí trung bình</td><td class="border border-indigo-100 px-3 py-2">15,8</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Lượt xem Facebook (90 ngày)</td><td class="border border-indigo-100 px-3 py-2"><strong>83.374</strong></td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">Lượt xem video ≥3 giây</td><td class="border border-indigo-100 px-3 py-2"><strong>4.329</strong></td></tr>
  </tbody>
</table>
<p><a href="${SITE}/du-an/kien-truc-sao-khue">→ Xem case study đầy đủ với screenshot GSC &amp; Facebook</a></p>

<h2 id="tu-khoa">Bản đồ từ khóa đang tối ưu</h2>
<p>Một phần từ khóa cluster: cải tạo nhà quận 1/5/7, sửa nhà trọn gói hcm, xây nhà trọn gói phú yên, xây nhà đồng nai, xây nhà long an, cải tạo nhà bình định, xây nhà gia lai, xây nhà daklak, thiết kế biệt thự thủ đức, cẩm nang xây nhà 2026…</p>

<h2 id="bai-hoc">Bài học — đuổi kịp đối thủ SEO ngành xây dựng</h2>
<ul>
  <li><strong>Đừng đua volume như MONA</strong> — đi sâu 1 ngành với case study + silo 5–7 URL</li>
  <li><strong>Proof &gt; lời nói:</strong> Screenshot GSC/Facebook tăng E-E-A-T</li>
  <li><strong>Đa kênh:</strong> Website SEO + fanpage content spike</li>
  <li><strong>Local intent:</strong> Mỗi quận/tỉnh = cơ hội long-tail ít cạnh tranh hơn head keyword</li>
</ul>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Thiết kế website xây dựng giá bao nhiêu tương tự Sao Khuê?</h3>
<p>Gói website xây dựng Bứt Phá từ 6–14 triệu tùy gallery, form báo giá và SEO local. <a href="${SITE}/banggia">Xem bảng giá</a>.</p>
<h3>Làm sao để website xây dựng lên top Google?</h3>
<p>Cần silo: money page + case study + cluster blog theo khu vực + schema FAQ + tốc độ trang. Thời gian thường 3–6 tháng cho long-tail local.</p>

<p><strong>Liên kết nội bộ:</strong> <a href="${SITE}/du-an/kien-truc-sao-khue">Case study đầy đủ</a> · <a href="${SITE}/blog/thiet-ke-website-xay-dung-nha-thau">Thiết kế website xây dựng</a> · <a href="${SITE}/blog/thiet-ke-website">Pillar thiết kế website</a> · <a href="${SITE}/website">Dịch vụ website</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed case study blog Sao Khuê ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/case-study-thiet-ke-website-xay-dung-sao-khue");

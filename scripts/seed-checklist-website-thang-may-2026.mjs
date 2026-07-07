/**
 * Checklist silo — website thang máy 2026
 * Chạy: node scripts/seed-checklist-website-thang-may-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "checklist website công ty thang máy";

const article = {
  title: "Checklist Website Công Ty Thang Máy 2026 — 20 Mục Chuẩn SEO & B2B",
  slug: "checklist-website-thang-may-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website thang máy cần gì, thiết kế website thang máy, checklist seo thang máy, catalog thang máy",
  metaTitle: "Checklist Website Thang Máy 2026 | 20 Mục Chuẩn B2B",
  metaDescription:
    "Checklist website công ty thang máy 2026: 20 mục — catalog dòng thang, dự án lắp đặt, bảo trì, SEO B2B. Bứt Phá Marketing.",
  description:
    "Checklist 20 mục khi thiết kế website công ty thang máy — catalog, dự án và SEO commercial B2B.",
  imageUrl: "/tin-tuc/thang-may/thang-may-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Checklist Website Công Ty Thang Máy 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt nhanh" },
  { id: "checklist", label: "20 mục checklist" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt nhanh:</strong> <strong>${KEYWORD}</strong> gồm 20 mục: catalog dòng thang, gallery dự án chung cư/nhà máy, form khảo sát, bảo trì và SEO “lắp thang máy + tỉnh”. Xem <a href="${SITE}/blog/nganh/thang-may">hub silo thang máy</a>.</p>
</div>

<h2 id="tom-tat">Checklist website thang máy là gì?</h2>
<p>Danh sách kiểm tra khi <strong>thiết kế website công ty thang máy</strong> — website phải chứng minh năng lực lắp đặt, catalog sản phẩm và dịch vụ bảo trì.</p>

<h2 id="checklist">20 mục checklist website thang máy 2026</h2>
<ol class="space-y-2 my-6 list-decimal pl-6">
  <li><strong>Trang Giới thiệu &amp; pháp nhân:</strong> Giấy phép lắp đặt, năm thành lập.</li>
  <li><strong>Catalog dòng thang:</strong> Passenger, freight, home lift — thông số tải/trọng.</li>
  <li><strong>Dịch vụ tách silo:</strong> Tư vấn, lắp đặt, nâng cấp, bảo trì, sửa chữa.</li>
  <li><strong>Gallery dự án:</strong> Chung cư, văn phòng, nhà máy — có mô tả quy mô.</li>
  <li><strong>Form khảo sát / báo giá:</strong> Số tầng, tải trọng, loại công trình.</li>
  <li><strong>Quy trình lắp đặt 5–7 bước:</strong> Khảo sát → thiết kế → thi công → nghiệm thu.</li>
  <li><strong>Chứng nhận &amp; hãng đại diện:</strong> Logo OTIS, Mitsubishi, thang nội địa…</li>
  <li><strong>FAQ schema:</strong> Chi phí thang máy, thời gian lắp, bảo hành…</li>
  <li><strong>Hotline kỹ thuật 24/7:</strong> CTA sự cố thang máy.</li>
  <li><strong>Zalo / email B2B:</strong> Gửi hồ sơ năng lực, báo giá.</li>
  <li><strong>Blog kỹ thuật:</strong> “Cách chọn thang máy”, “bảo trì thang máy” — informational SEO.</li>
  <li><strong>SEO head:</strong> “Thiết kế website công ty thang máy”, “lắp thang máy”.</li>
  <li><strong>SEO local:</strong> “Công ty thang máy [tỉnh/TP]”, “lắp thang [quận]”.</li>
  <li><strong>Schema Organization:</strong> JSON-LD tên công ty, dịch vụ.</li>
  <li><strong>Liên kết ngành liên quan:</strong> <a href="${SITE}/blog/thiet-ke-website-xay-dung-nha-thau">xây dựng</a>, <a href="${SITE}/blog/thiet-ke-website-pccc">PCCC</a>.</li>
  <li><strong>Tốc độ trang:</strong> Nén ảnh gallery công trình.</li>
  <li><strong>Silo nội bộ:</strong> <a href="${SITE}/blog/nganh/thang-may">Hub thang máy</a> ↔ <a href="${SITE}/blog/thiet-ke-website-thang-may">money page</a>.</li>
  <li><strong>Video dự án (nếu có):</strong> YouTube embed tăng trust.</li>
  <li><strong>Đối tác chủ đầu tư:</strong> Logo CĐT, nhà thầu.</li>
  <li><strong>GSC:</strong> Theo dõi query commercial B2B hàng tuần.</li>
</ol>

${img(0, "Checklist thiết kế website công ty thang máy chuẩn SEO", "thang-may")}

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Website thang máy cần catalog chi tiết?</h3>
<p>Chủ đầu tư so sánh dòng thang, tải trọng trước khi gọi khảo sát — catalog rõ ràng tăng lead chất lượng.</p>
<h3>Giá website công ty thang máy?</h3>
<p>6–14 triệu tùy gallery dự án. <a href="${SITE}/blog/thiet-ke-website-thang-may">Chi tiết</a> · <a href="${SITE}/banggia">Bảng giá</a>.</p>

<p><strong>Liên kết silo:</strong> <a href="${SITE}/blog/nganh/thang-may">Hub thang máy</a> · <a href="${SITE}/blog/thiet-ke-website-thang-may">Money page</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed checklist website thang máy 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/checklist-website-thang-may-2026");

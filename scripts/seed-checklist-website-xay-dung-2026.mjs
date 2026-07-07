/**
 * Checklist silo — website xây dựng 2026
 * Chạy: node scripts/seed-checklist-website-xay-dung-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "checklist website xây dựng";

const article = {
  title: "Checklist Website Xây Dựng 2026 — 20 Mục SEO & Báo Giá",
  slug: "checklist-website-xay-dung-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website công ty xây dựng cần gì, thiết kế website nhà thầu, checklist seo xây dựng",
  metaTitle: "Checklist Website Xây Dựng 2026 | 20 Mục Chuẩn SEO",
  metaDescription:
    "Checklist website xây dựng 2026: 20 mục — gallery công trình, báo giá, SEO local quận/tỉnh. Case study Kiến Trúc Sao Khuê.",
  description:
    "Checklist 20 mục khi thiết kế website công ty xây dựng, nhà thầu: gallery, form báo giá, SEO đa tỉnh.",
  imageUrl: "/case-studies/sao-khue/gsc-performance.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Checklist Website Xây Dựng 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt nhanh" },
  { id: "checklist", label: "20 mục checklist" },
  { id: "case-study", label: "Case study tham chiếu" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt nhanh:</strong> <strong>${KEYWORD}</strong> gồm 20 mục: gallery công trình, form báo giá, FAQ schema, landing theo quận/tỉnh và fanpage song song Google. Tham chiếu <a href="${SITE}/du-an/kien-truc-sao-khue">case study Kiến Trúc Sao Khuê</a> — SEO đa tỉnh TP.HCM, Phú Yên, Đồng Nai…</p>
</div>

<h2 id="tom-tat">Checklist website xây dựng là gì?</h2>
<p>Danh sách kiểm tra khi <strong>thiết kế website công ty xây dựng</strong> hoặc nhà thầu — đảm bảo khách tìm “xây nhà trọn gói + khu vực” trên Google và gọi hotline/Zalo. Website xây dựng cần gallery thật và CTA báo giá rõ hơn website corporate thông thường.</p>

<h2 id="checklist">20 mục checklist website xây dựng 2026</h2>
<ol class="space-y-2 my-6 list-decimal pl-6">
  <li><strong>Gallery công trình:</strong> Nhà phố, biệt thự, sửa chữa — ảnh before/after có mô tả.</li>
  <li><strong>Trang dịch vụ tách silo:</strong> Xây nhà trọn gói, sửa chữa, thiết kế — mỗi dịch vụ 1 URL.</li>
  <li><strong>Form báo giá / khảo sát:</strong> Diện tích, quận, loại nhà — thu lead có chất lượng.</li>
  <li><strong>Hotline sticky mobile:</strong> Khách xây dựng gọi ngay khi thấy công trình đẹp.</li>
  <li><strong>Zalo OA:</strong> Gửi mẫu nhà, bản vẽ qua chat.</li>
  <li><strong>FAQ schema:</strong> Giá xây nhà phố, thời gian thi công, bảo hành.</li>
  <li><strong>SEO local theo quận:</strong> “Sửa nhà quận 7”, “xây nhà Hóc Môn” — landing hoặc blog cluster.</li>
  <li><strong>SEO đa tỉnh:</strong> Phú Yên, Đồng Nai, Long An… nếu nhà thầu mở rộng.</li>
  <li><strong>Hồ sơ năng lực PDF:</strong> Tải về cho B2B / đấu thầu.</li>
  <li><strong>Giấy phép &amp; đối tác:</strong> Uy tín — số năm kinh nghiệm, chứng chỉ.</li>
  <li><strong>Quy trình thi công:</strong> 5–7 bước minh bạch — giảm lo lắng khách hàng.</li>
  <li><strong>Bảng giá tham khảo:</strong> “Từ … triệu/m²” — không cần chính xác từng hạng mục.</li>
  <li><strong>Video công trình / Reels:</strong> Embed hoặc link fanpage.</li>
  <li><strong>Fanpage Facebook:</strong> Content spike — bổ sung kênh lead song song Google.</li>
  <li><strong>Tốc độ trang:</strong> Nén ảnh gallery WebP — tránh load chậm.</li>
  <li><strong>Title/meta chứa intent:</strong> “Cải tạo nhà”, “xây nhà trọn gói” + địa danh.</li>
  <li><strong>LocalBusiness schema:</strong> Địa chỉ văn phòng, vùng phục vụ.</li>
  <li><strong>Internal link silo:</strong> <a href="${SITE}/blog/nganh/xay-dung">Hub xây dựng</a> ↔ money page ↔ <a href="${SITE}/blog/case-study-thiet-ke-website-xay-dung-sao-khue">case study</a>.</li>
  <li><strong>Cẩm nang / blog:</strong> “Chi phí xây nhà 2026” — traffic informational nuôi commercial.</li>
  <li><strong>GSC hàng tuần:</strong> Tối ưu meta theo query có impression cao.</li>
</ol>

${img(0, "Checklist thiết kế website công ty xây dựng chuẩn SEO", "kien-truc")}

<h2 id="case-study">Case study tham chiếu — Kiến Trúc Sao Khuê</h2>
<p>Website <a href="https://www.kientrucsaokhue.com/" rel="noopener noreferrer" target="_blank">kientrucsaokhue.com</a> + fanpage sửa chữa cải tạo nhà. GSC: <strong>3.460 impression</strong>, <strong>82 click</strong> (giai đoạn đầu); fanpage <strong>83K view</strong>/90 ngày. <a href="${SITE}/du-an/kien-truc-sao-khue">Xem case study</a>.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Website nhà thầu cần bao nhiêu trang?</h3>
<p>8–12 trang: Trang chủ, Giới thiệu, Dịch vụ (3+), Dự án, Báo giá, FAQ, Liên hệ, Blog.</p>
<h3>Checklist website xây dựng ưu tiên gì trước?</h3>
<p>Gallery + hotline + 1 landing local (quận/tỉnh chính) — sau đó mở rộng cluster blog.</p>
<h3>Giá thiết kế website xây dựng?</h3>
<p>6–14 triệu tùy gallery và SEO local. <a href="${SITE}/blog/thiet-ke-website-xay-dung-nha-thau">Chi tiết</a> · <a href="${SITE}/banggia">Bảng giá</a>.</p>

<p><strong>Liên kết silo:</strong> <a href="${SITE}/blog/nganh/xay-dung">Hub xây dựng</a> · <a href="${SITE}/blog/thiet-ke-website-xay-dung-nha-thau">Money page</a> · <a href="${SITE}/du-an/kien-truc-sao-khue">Case study</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed checklist website xây dựng 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/checklist-website-xay-dung-2026");

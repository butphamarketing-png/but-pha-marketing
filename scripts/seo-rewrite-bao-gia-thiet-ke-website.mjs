import { NEWS_THUMBNAIL } from "./seo-article-helpers.mjs";
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

const KEYWORD = "báo giá thiết kế website";
const TITLE = "Báo Giá Thiết Kế Website Và Những Yếu Tố Ảnh Hưởng";

export const REWRITE_BAO_GIA_THIET_KE_WEBSITE = {
  title: TITLE,
  slug: "bao-gia-thiet-ke-website",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "chi phí làm website, giá web doanh nghiệp, giá thiết kế website 2026, báo giá làm web",
  metaTitle: "Báo Giá Thiết Kế Website 2026 | Bảng Giá Minh Bạch | Bứt Phá",
  metaDescription:
    "Báo giá thiết kế website 2026: gói 3–12 triệu, hosting, tên miền, phí ẩn cần hỏi. Yếu tố ảnh hưởng giá và cách tối ưu ngân sách. Tư vấn miễn phí.",
  description:
    "Cập nhật báo giá thiết kế website minh bạch: bảng giá gói, chi phí duy trì, yếu tố làm tăng giá và checklist so sánh báo giá từ đối tác.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Báo Giá Thiết Kế Website 2026 | Bảng Giá Minh Bạch | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "vi-sao-can-biet", label: "Vì sao cần hiểu báo giá?" },
  { id: "bang-gia-2026", label: "Bảng giá thiết kế website 2026" },
  { id: "chi-phi-duy-tri", label: "Chi phí duy trì hàng năm" },
  { id: "yeu-to-anh-huong", label: "7 yếu tố ảnh hưởng giá" },
  { id: "phi-an", label: "Phí ẩn cần hỏi trước khi ký" },
  { id: "so-sanh-bao-gia", label: "Cách so sánh 3 báo giá" },
  { id: "tiet-kiem", label: "Tối ưu ngân sách thông minh" },
  { id: "thanh-toan", label: "Lịch thanh toán & hợp đồng" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} là điều đầu tiên chủ doanh nghiệp hỏi khi muốn có mặt trên internet — nhưng con số chỉ có ý nghĩa khi đi kèm <em>phạm vi công việc</em>: bao nhiêu trang, tính năng gì, SEO đến mức nào, ai sở hữu source code và chi phí duy trì hàng năm ra sao. Báo giá 2 triệu và 12 triệu có thể cùng ghi chữ “thiết kế website” nhưng deliverable khác nhau hoàn toàn.`,
    `Bài viết bám tiêu đề <em>${TITLE}</em>: công bố bảng giá tham chiếu thị trường Việt Nam năm 2026 (minh bạch từ Bứt Phá Marketing), liệt kê hạng mục làm giá tăng–giảm, phí ẩn hay gặp và checklist so sánh báo giá từ 2–3 đơn vị — giúp bạn chọn theo <strong>giá trị</strong>, không chỉ số tiền thấp nhất.`,
  ],
})}

${wpKeyTakeaways([
  "Gói thiết kế Bứt Phá: 3 / 6 / 9 / 12 triệu — tương ứng Giới thiệu → Hệ thống.",
  "Chưa gồm trong giá thiết kế: tên miền ~350k/năm, hosting từ ~3,3 triệu/năm.",
  "Giá tăng khi: nhiều trang, đa ngôn ngữ, TMĐT, API, deadline gấp, copywriting kèm theo.",
  "Hỏi rõ: số vòng sửa, bảo hành, SEO on-page, quyền sở hữu code.",
  "MVP 3–6 triệu + mở rộng phase 2 thường hiệu quả hơn làm hết một lần vượt ngân sách.",
])}

${wpImg(0, "Báo giá thiết kế website và các yếu tố ảnh hưởng chi phí")}

<h2 id="vi-sao-can-biet">Vì sao cần hiểu rõ báo giá thiết kế website?</h2>

<p>Nhiều doanh nghiệp chọn đơn vị <strong>rẻ nhất</strong> rồi phát sinh: hosting không có, không responsive, không SEO, sửa tính năng tính thêm từng triệu. Ngược lại, gói đắt không đồng nghĩa phù hợp — startup chỉ cần 5 trang giới thiệu không cần trả 15 triệu cho portal B2B.</p>

<p>Hiểu <strong>${KEYWORD}</strong> giúp bạn:</p>
<ul>
  <li>Lập ngân sách marketing số realistic cho 12–24 tháng</li>
  <li>So sánh apple-to-apple giữa các agency</li>
  <li>Tránh scam “3 triệu full web + top Google” phi thực tế</li>
  <li>Đàm phán scope thay vì chỉ mặc cả %</li>
</ul>

<h2 id="bang-gia-2026">Bảng báo giá thiết kế website 2026 (Bứt Phá Marketing)</h2>

<p>Dưới đây là <strong>báo giá thiết kế</strong> công khai tại Bứt Phá — đồng bộ với trang <a href="${SITE}/website">dịch vụ website</a>. Giá <strong>chưa gồm</strong> tên miền và hosting hàng năm.</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá (VNĐ)</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phạm vi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Giới thiệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Website cơ bản, mobile, SEO on-page cơ bản, hỗ trợ kỹ thuật</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tối ưu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">UI chuyên nghiệp, SEO nâng cao, tốc độ, tích hợp marketing</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Kinh doanh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Thiết kế độc quyền, CRO, CRM/Chatbot, báo cáo dữ liệu</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hệ thống</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Đa tính năng, API, automation, hỗ trợ ưu tiên 24/7</td>
    </tr>
  </tbody>
</table>

<h3>Chọn gói nào?</h3>
<ul>
  <li><strong>3 triệu:</strong> Cá nhân, hộ kinh doanh, web 5–8 trang giới thiệu</li>
  <li><strong>6 triệu:</strong> SME cần web đẹp + SEO tốt, chạy ads về web</li>
  <li><strong>9 triệu:</strong> Shop / dịch vụ cần chuyển đổi, CRM, thiết kế riêng</li>
  <li><strong>12 triệu:</strong> Custom nhiều tính năng, tích hợp phần mềm — xem bài <a href="${SITE}/blog/thiet-ke-website-theo-yeu-cau">thiết kế website theo yêu cầu</a></li>
</ul>

<p>Tham khảo thêm bài pillar <a href="${SITE}/blog/thiet-ke-website">thiết kế website</a> để hiểu quy trình và loại web phù hợp.</p>

${wpImg(1, "Bảng báo giá thiết kế website minh bạch 2026")}

<h2 id="chi-phi-duy-tri">Chi phí duy trì website hàng năm (ngoài báo giá thiết kế)</h2>

<p>Website không phải chi phí một lần. <strong>${KEYWORD}</strong> trọn gói nên tách rõ <em>thiết kế</em> và <em>vận hành</em>:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Hạng mục</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá tham khảo/năm</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Tên miền .com</td>
      <td class="border border-indigo-100 px-3 py-2">~350.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Gia hạn hàng năm</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Hosting 3GB</td>
      <td class="border border-indigo-100 px-3 py-2">~3.348.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Web nhỏ, ít traffic</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Hosting 10GB</td>
      <td class="border border-indigo-100 px-3 py-2">~7.200.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Doanh nghiệp vừa, nhiều ảnh</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">SSL</td>
      <td class="border border-indigo-100 px-3 py-2">Thường miễn phí</td>
      <td class="border border-indigo-100 px-3 py-2">Đi kèm hosting</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Chăm sóc web (10 bài SEO/tháng)</td>
      <td class="border border-indigo-100 px-3 py-2">1.000.000đ/tháng</td>
      <td class="border border-indigo-100 px-3 py-2">Tùy chọn — Bứt Phá</td>
    </tr>
  </tbody>
</table>

<p><strong>Tổng tối thiểu năm đầu</strong> (thiết kế 3 triệu + tên miền + hosting 3GB): khoảng <strong>6,7 triệu</strong>. Năm 2 chủ yếu gia hạn hosting + tên miền (~3,7 triệu/năm) nếu tự cập nhật nội dung.</p>

<h2 id="yeu-to-anh-huong">7 yếu tố ảnh hưởng báo giá thiết kế website</h2>

<ol>
  <li><strong>Số trang &amp; loại trang:</strong> 5 trang giới thiệu rẻ hơn 30 trang TMĐT + blog + landing.</li>
  <li><strong>Mức tùy biến UI:</strong> Template chỉnh màu &lt; thiết kế Figma độc quyền từ đầu.</li>
  <li><strong>Tính năng:</strong> Form liên hệ &lt; booking &lt; giỏ hàng &lt; API ERP/CRM.</li>
  <li><strong>Nội dung:</strong> Khách tự cung cấp text/ảnh vs agency viết + chụp sản phẩm.</li>
  <li><strong>SEO:</strong> Cơ bản (meta, heading) vs chiến lược content + technical audit.</li>
  <li><strong>Đa ngôn ngữ:</strong> Mỗi ngôn ngữ thêm ~20–40% effort dịch + cấu trúc hreflang.</li>
  <li><strong>Timeline:</strong> Rush 2 tuần thường +20–50% phí so với lịch 4 tuần chuẩn.</li>
</ol>

<p>Deadline và scope là hai lever lớn nhất làm <strong>${KEYWORD}</strong> chênh lệch giữa các dự án “cùng làm web”.</p>

${wpImg(2, "Yếu tố ảnh hưởng báo giá thiết kế website")}

<h2 id="phi-an">Phí ẩn trong báo giá thiết kế website — cần hỏi trước khi ký</h2>

<p>Báo giá thấp đôi khi <em>thiếu</em> các hạng mục sau. Hỏi rõ có trong giá hay tính riêng:</p>

<ul>
  <li>Tên miền + hosting năm đầu (hay “chưa gồm”)?</li>
  <li>SSL, backup tự động, email doanh nghiệp @tenmien.com</li>
  <li>Số vòng chỉnh sửa thiết kế (2 vòng vs unlimited)</li>
  <li>SEO on-page: bao nhiêu trang được tối ưu?</li>
  <li>Viết nội dung / chụp ảnh sản phẩm</li>
  <li>Đào tạo quản trị CMS, tài liệu bàn giao</li>
  <li>Bảo hành lỗi kỹ thuật bao lâu (3 / 6 / 12 tháng)?</li>
  <li>Quyền sở hữu source code sau thanh toán</li>
  <li>Phí bảo trì năm 2 (thường 15–25% giá dự án hoặc gói tháng)</li>
</ul>

<blockquote><p><strong>Cảnh báo:</strong> “Thiết kế website 1 triệu / 2 triệu trọn gói” trên mạng thường không gồm hosting chất lượng, SEO thật hoặc hỗ trợ sau bán — đọc kỹ hợp đồng trước khi chuyển khoản.</p></blockquote>

<h2 id="so-sanh-bao-gia">Cách so sánh 3 báo giá thiết kế website</h2>

<p>Dùng bảng scope chung khi nhận <strong>${KEYWORD}</strong> từ 2–3 đơn vị:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Hạng mục</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Đơn vị A</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Đơn vị B</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Đơn vị C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Tổng giá</td>
      <td class="border border-indigo-100 px-3 py-2" colspan="3">Ghi số + VAT?</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Số trang</td>
      <td class="border border-indigo-100 px-3 py-2" colspan="3">Liệt kê cụ thể</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Hosting/domain năm 1</td>
      <td class="border border-indigo-100 px-3 py-2" colspan="3">Có / không / loại hosting</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">SEO on-page</td>
      <td class="border border-indigo-100 px-3 py-2" colspan="3">Cơ bản / nâng cao / không</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Timeline</td>
      <td class="border border-indigo-100 px-3 py-2" colspan="3">Tuần bàn giao</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Portfolio ngành bạn</td>
      <td class="border border-indigo-100 px-3 py-2" colspan="3">Link case thật</td>
    </tr>
  </tbody>
</table>

<p>Chọn theo <strong>fit</strong> ngành + minh bạch scope, không chỉ cột “tổng giá” thấp nhất.</p>

<h2 id="tiet-kiem">Tối ưu ngân sách mà vẫn có web hiệu quả</h2>

<ul>
  <li><strong>MVP phase 1:</strong> Trang chủ, dịch vụ, giới thiệu, liên hệ — gói 3–6 triệu</li>
  <li><strong>Phase 2:</strong> Blog SEO, TMĐT, đa ngôn ngữ khi có doanh thu</li>
  <li><strong>Tự cung cấp nội dung:</strong> Text + ảnh sẵn giảm 20–30% chi phí</li>
  <li><strong>Đầu tư SEO on-page ngay:</strong> Tiết kiệm ads dài hạn — xem <a href="${SITE}/blog/thiet-ke-website-chuan-seo">website chuẩn SEO</a></li>
  <li><strong>Tránh tính năng thừa giai đoạn đầu:</strong> Chatbot AI, app mobile khi chưa có traffic</li>
</ul>

<h2 id="thanh-toan">Lịch thanh toán và hợp đồng</h2>

<p>Chuẩn ngành chia milestone — ví dụ:</p>
<ul>
  <li><strong>30%</strong> ký hợp đồng / nhận brief</li>
  <li><strong>40%</strong> duyệt thiết kế (UI)</li>
  <li><strong>30%</strong> nghiệm thu bàn giao (go-live)</li>
</ul>

<p>Hợp đồng <strong>${KEYWORD}</strong> nên có: danh mục trang, tính năng, số vòng sửa, ngày bàn giao, điều khoản bảo hành, quyền sở hữu code. Tránh chuyển 100% trước khi thấy demo.</p>

${wpImg(3, "Lịch thanh toán và hợp đồng thiết kế website")}

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Quy trình, loại website và hướng dẫn tổng quan.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-doanh-nghiep`,
    label: "Website doanh nghiệp",
    desc: "Cấu trúc web corporate và gói phù hợp.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-tron-goi`,
    label: "Thiết kế website trọn gói",
    desc: "Gói all-in gồm những hạng mục nào.",
  },
  {
    href: `${SITE}/website`,
    label: "Xem bảng giá & đăng ký",
    desc: "Bảng giá live trên trang dịch vụ Bứt Phá.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Báo giá thiết kế website 3 triệu có đủ không?",
      a: "Đủ cho website giới thiệu cơ bản 5–8 trang tại Bứt Phá (gói Giới thiệu). Cần xác nhận chưa gồm tên miền, hosting và mức SEO on-page.",
    },
    {
      q: "Giá thiết kế website trung bình 2026 tại Việt Nam?",
      a: "SME phổ biến 3–12 triệu thiết kế; TMĐT/custom 12–50 triệu+. Duy trì 3–10 triệu/năm tùy hosting và bảo trì.",
    },
    {
      q: "Có trả góp thiết kế website được không?",
      a: "Nhiều agency chia 3 đợt theo milestone. Bứt Phá thường 30% – 40% – 30% theo tiến độ dự án.",
    },
    {
      q: "Phí duy trì website hàng năm bao nhiêu?",
      a: "Tối thiểu ~3,7 triệu/năm (tên miền + hosting nhỏ) nếu tự vận hành. Thêm 1–2,5 triệu/tháng nếu thuê viết bài SEO.",
    },
    {
      q: "Vì sao báo giá hai agency chênh gấp đôi?",
      a: "Khác scope: số trang, custom UI, tính năng, SEO, bảo hành, kinh nghiệm ngành. So sánh cùng bảng hạng mục.",
    },
    {
      q: "Làm web rồi có phí ẩn không?",
      a: "Có thể: gia hạn hosting, SSL, plugin trả phí, sửa ngoài scope, nâng cấp tính năng. Hỏi trước trong hợp đồng.",
    },
    {
      q: "Báo giá có gồm viết bài SEO không?",
      a: "Gói thiết kế thường không gồm content hàng tháng. Bứt Phá có gói chăm sóc web từ 1.000.000đ/tháng (10 bài).",
    },
    {
      q: "Nhận báo giá miễn phí ở đâu?",
      a: "Liên hệ Bứt Phá qua trang /website hoặc Zalo 0937417982 — khảo sát nhu cầu rồi báo giá đúng scope.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} minh bạch giúp bạn đầu tư đúng chỗ: chọn gói khớp giai đoạn kinh doanh, dự trù duy trì 3–5 năm và so sánh báo giá theo scope — không theo slogan rẻ nhất.`,
    `Gợi ý: bắt đầu gói 3–6 triệu + hosting, tối ưu SEO on-page, mở rộng tính năng khi có lead/doanh thu thật từ web. Liên hệ tư vấn để nhận báo giá chi tiết theo ngành và số trang của bạn.`,
  ],
  ctaLabel: "→ Nhận báo giá thiết kế website miễn phí",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};

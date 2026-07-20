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

const KEYWORD = "website giá bao nhiêu 2026";
const TITLE = "Website Giá Bao Nhiêu 2026? — Bảng Giá Tham Chiếu & Cách Chọn Gói";

export const REWRITE_WEBSITE_GIA_BAO_NHIEU_2026 = {
  title: TITLE,
  slug: "website-gia-bao-nhieu-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website giá bao nhiêu 2026, chi phí làm website, giá web doanh nghiệp, báo giá thiết kế website, website bao nhiêu tiền",
  metaTitle: "Website Giá Bao Nhiêu 2026? | Bảng Giá 3–12tr | Bứt Phá",
  metaDescription:
    "Website giá bao nhiêu 2026: gói 3–12 triệu tại Bứt Phá, chưa gồm tên miền/hosting. Bảng giá, chi phí duy trì, cách chọn gói phù hợp SME.",
  description:
    "Trả lời website giá bao nhiêu 2026 với bảng giá minh bạch 3–12 triệu, chi phí duy trì hàng năm và hướng dẫn chọn gói theo quy mô doanh nghiệp.",
  imageUrl: NEWS_THUMBNAIL,
  hot: true,
  content: buildWpSeoArticle({
    metaTitle: "Website Giá Bao Nhiêu 2026? | Bảng Giá Tham Chiếu | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "tong-quan", label: "Website giá bao nhiêu — câu trả lời ngắn" },
  { id: "bang-gia", label: "Bảng giá website 2026" },
  { id: "chon-goi", label: "Chọn gói nào cho bạn?" },
  { id: "chi-phi-duy-tri", label: "Chi phí duy trì hàng năm" },
  { id: "tong-nam-dau", label: "Tổng chi phí năm đầu" },
  { id: "yeu-to-gia", label: "Yếu tố làm giá tăng/giảm" },
  { id: "phi-an", label: "Phí ẩn cần hỏi" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `Câu hỏi <strong>${KEYWORD}</strong> xuất hiện rất nhiều vì doanh nghiệp muốn một con số nhanh trước khi họp nội bộ — nhưng “website 3 triệu” và “website 12 triệu” đều là web, chỉ khác <em>phạm vi</em>: số trang, tính năng, mức SEO, tích hợp CRM/Chatbot và timeline bàn giao.`,
    `Bài viết trả lời trực tiếp tiêu đề <em>${TITLE}</em> với bảng giá công khai Bứt Phá Marketing (3.000.000đ → 12.000.000đ), chi phí duy trì tên miền/hosting, ví dụ tổng năm đầu và gợi ý chọn gói theo quy mô — đồng bộ <a href="${SITE}/website#pricing">/website</a> và <a href="${SITE}/banggia">/banggia</a>.`,
  ],
})}

${wpKeyTakeaways([
  "Gói thiết kế Bứt Phá 2026: Giới thiệu 3tr · Tối ưu 6tr · Kinh doanh 9tr · Hệ thống 12tr.",
  "Giá thiết kế <em>chưa gồm</em> tên miền (~350k/năm) và hosting (~3,3–7,2tr/năm).",
  "SME mới thường bắt đầu gói 3–6 triệu; shop/dịch vụ cần CRO chọn 9 triệu.",
  "Hỏi rõ: số vòng sửa, SEO on-page, quyền sở hữu code, bảo hành.",
  "MVP gói nhỏ + mở rộng phase 2 thường hiệu quả hơn làm hết một lần vượt ngân sách.",
])}

<div class="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5 my-6">
<p><strong>Cluster Website — đọc theo thứ tự:</strong></p>
<ul class="list-disc pl-6 mt-2 space-y-1">
  <li><a href="${SITE}/website#pricing">Bảng giá thiết kế website (money page)</a></li>
  <li><a href="${SITE}/banggia">Bảng giá tổng hợp Marketing</a></li>
  <li><a href="${SITE}/blog/bao-gia-thiet-ke-website">Báo giá thiết kế website — chi tiết yếu tố giá</a></li>
  <li><a href="${SITE}/blog/thiet-ke-website">Thiết kế website — pillar A-Z</a></li>
  <li><a href="${SITE}/blog/chu-de/website">Hub chủ đề Website</a></li>
</ul>
</div>

${wpImg(0, "Website giá bao nhiêu 2026 — bảng giá tham chiếu thị trường Việt Nam")}

<h2 id="tong-quan">Website giá bao nhiêu 2026 — câu trả lời ngắn</h2>

<p>Nếu chỉ cần một khoảng tham chiếu cho SME Việt Nam năm 2026:</p>

<ul>
  <li><strong>Website giới thiệu cơ bản:</strong> khoảng <strong>3.000.000đ</strong> (one-time thiết kế)</li>
  <li><strong>Website chuyên nghiệp + SEO tốt:</strong> khoảng <strong>6.000.000đ</strong></li>
  <li><strong>Website kinh doanh (CRO, CRM):</strong> khoảng <strong>9.000.000đ</strong></li>
  <li><strong>Hệ thống đa tính năng / API:</strong> từ <strong>12.000.000đ</strong> trở lên</li>
</ul>

<p>Cộng thêm <strong>tên miền + hosting</strong> hàng năm (xem bên dưới). Con số trên là giá niêm yết Bứt Phá — minh bạch trên web, không “báo giá ẩn”.</p>

<h2 id="bang-gia">Bảng giá website 2026 (Bứt Phá Marketing)</h2>

<p>Đồng bộ trang dịch vụ. Giá <strong>chưa gồm</strong> tên miền và hosting.</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá (VNĐ)</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phạm vi chính</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Giới thiệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Web cơ bản, mobile, SEO on-page cơ bản, hỗ trợ kỹ thuật</td>
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
      <td class="border border-indigo-100 px-3 py-2">Đa tính năng, API, automation, hỗ trợ ưu tiên</td>
    </tr>
  </tbody>
</table>

<p><a href="${SITE}/website#pricing">Xem gói trên /website →</a> · <a href="${SITE}/banggia">Xem bảng giá tổng hợp →</a></p>

${wpImg(1, "Bảng giá website 2026 theo gói Giới thiệu Tối ưu Kinh doanh Hệ thống")}

<h2 id="chon-goi">Chọn gói nào khi hỏi website giá bao nhiêu?</h2>

<ul>
  <li><strong>3 triệu — Giới thiệu:</strong> Cá nhân, hộ kinh doanh, web 5–8 trang (trang chủ, dịch vụ, giới thiệu, liên hệ).</li>
  <li><strong>6 triệu — Tối ưu:</strong> SME cần web đẹp, SEO tốt, sẵn sàng chạy ads về landing.</li>
  <li><strong>9 triệu — Kinh doanh:</strong> Shop/dịch vụ cần chuyển đổi, CRM, thiết kế theo thương hiệu.</li>
  <li><strong>12 triệu — Hệ thống:</strong> Nhiều tính năng, tích hợp phần mềm — xem thêm <a href="${SITE}/blog/thiet-ke-website-theo-yeu-cau">thiết kế website theo yêu cầu</a>.</li>
</ul>

<p>Không chắc? Bắt đầu gói nhỏ, mở rộng phase 2 khi có doanh thu — tránh “làm hết một lần” vượt ngân sách.</p>

<h2 id="chi-phi-duy-tri">Chi phí duy trì website hàng năm (ngoài giá thiết kế)</h2>

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
      <td class="border border-indigo-100 px-3 py-2">DN vừa, nhiều ảnh</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Chăm sóc web (10 bài SEO/tháng)</td>
      <td class="border border-indigo-100 px-3 py-2">1.000.000đ/tháng</td>
      <td class="border border-indigo-100 px-3 py-2">Tùy chọn — Bứt Phá</td>
    </tr>
  </tbody>
</table>

<h2 id="tong-nam-dau">Ví dụ tổng chi phí năm đầu</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Kịch bản</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Thiết kế</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Tên miền + hosting 3GB</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Tổng năm đầu</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Startup / hộ KD — gói Giới thiệu</td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">~3.698.000đ</td>
      <td class="border border-indigo-100 px-3 py-2"><strong>~6.698.000đ</strong></td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">SME — gói Tối ưu</td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">~3.698.000đ</td>
      <td class="border border-indigo-100 px-3 py-2"><strong>~9.698.000đ</strong></td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Shop/dịch vụ — gói Kinh doanh</td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">~7.550.000đ (hosting 10GB)</td>
      <td class="border border-indigo-100 px-3 py-2"><strong>~16.550.000đ</strong></td>
    </tr>
  </tbody>
</table>

<p>Năm 2 chủ yếu gia hạn hosting + tên miền (~3,7–7,5 triệu/năm) nếu tự cập nhật nội dung.</p>

${wpImg(2, "Tổng chi phí website năm đầu gồm thiết kế tên miền và hosting")}

<h2 id="yeu-to-gia">Yếu tố làm website giá cao hoặc thấp hơn</h2>

<ol>
  <li><strong>Số trang &amp; tính năng:</strong> 5 trang giới thiệu ≠ TMĐT + blog + booking.</li>
  <li><strong>Mức tùy biến UI:</strong> Template chỉnh màu &lt; thiết kế độc quyền Figma.</li>
  <li><strong>Nội dung:</strong> Khách tự cung cấp vs agency viết + chụp ảnh.</li>
  <li><strong>SEO:</strong> On-page cơ bản vs chiến lược content kèm theo.</li>
  <li><strong>Timeline:</strong> Rush 2 tuần thường +20–50% phí.</li>
</ol>

<p>Chi tiết hơn: <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a>.</p>

<h2 id="phi-an">Phí ẩn cần hỏi trước khi ký (dù báo giá bao nhiêu)</h2>

<ul>
  <li>Tên miền + hosting năm đầu có trong giá không?</li>
  <li>Số vòng chỉnh sửa thiết kế</li>
  <li>SEO on-page: bao nhiêu trang?</li>
  <li>Quyền sở hữu source code</li>
  <li>Bảo hành lỗi kỹ thuật bao lâu</li>
  <li>Phí bảo trì năm 2</li>
</ul>

<blockquote><p><strong>Lưu ý:</strong> “Website 1–2 triệu trọn gói” trên mạng thường thiếu hosting chất lượng, SEO thật hoặc hỗ trợ sau bán — đọc kỹ scope trước khi chuyển khoản.</p></blockquote>

${wpRelatedLinks([
  {
    href: `${SITE}/website#pricing`,
    label: "Dịch vụ thiết kế website",
    desc: "Bảng giá gói 3–12 triệu công khai.",
  },
  {
    href: `${SITE}/banggia`,
    label: "Bảng giá tổng hợp",
    desc: "Website · Facebook · Maps · Hosting.",
  },
  {
    href: `${SITE}/blog/bao-gia-thiet-ke-website`,
    label: "Báo giá thiết kế website",
    desc: "Phân tích sâu yếu tố ảnh hưởng giá.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-chuan-seo`,
    label: "Website chuẩn SEO",
    desc: "Yếu tố SEO ảnh hưởng giá trị dài hạn.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Website giá bao nhiêu 2026 cho doanh nghiệp nhỏ?",
      a: "Gói Giới thiệu Bứt Phá: 3.000.000đ (thiết kế) + ~3,7 triệu tên miền/hosting năm đầu ≈ tổng ~6,7 triệu năm đầu. Phù hợp web 5–8 trang giới thiệu.",
    },
    {
      q: "Website 5 triệu và 10 triệu khác nhau thế nào?",
      a: "5 triệu thường là web cơ bản hoặc gói 6 triệu chưa gồm hosting. 10 triệu có thể là gói Kinh doanh (9tr) + domain/hosting — nhiều tính năng CRO, CRM hơn gói 3–6 triệu.",
    },
    {
      q: "Giá trên có gồm hosting không?",
      a: "Không. Giá thiết kế Bứt Phá chưa gồm tên miền và hosting — liệt kê riêng trong bài và trên /banggia.",
    },
    {
      q: "Làm website xong có tốn thêm tiền hàng tháng không?",
      a: "Hosting + tên miền gia hạn hàng năm. Tùy chọn: chăm sóc web/content từ 1.000.000đ/tháng, ads, SEO ongoing.",
    },
    {
      q: "Website giá rẻ 1–2 triệu có nên làm không?",
      a: "Cẩn trọng — thường thiếu SEO, hosting yếu, không hỗ trợ. So scope apple-to-apple với gói 3 triệu trước khi quyết định.",
    },
    {
      q: "Bứt Phá báo giá chính xác thế nào?",
      a: "Tư vấn miễn phí sau khảo sát scope (số trang, tính năng). Bảng giá công khai trên /website và /banggia làm mốc tham chiếu.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `Tóm lại, ${KEYWORD} tại Bứt Phá nằm trong khoảng <strong>3–12 triệu</strong> (thiết kế) + chi phí vận hành hàng năm. Con số cuối phụ thuộc gói bạn chọn và có cần tính năng nâng cao hay không.`,
    `Xem bảng giá công khai, chọn gói phù hợp quy mô, rồi liên hệ tư vấn để chốt scope chính xác.`,
  ],
  ctaLabel: "Xem bảng giá website →",
  ctaHref: `${SITE}/website#pricing`,
})}

${wpExternalCta()}
`,
  }),
};

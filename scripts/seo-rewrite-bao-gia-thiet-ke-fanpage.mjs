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

const KEYWORD = "báo giá thiết kế fanpage";
const TITLE = "Báo Giá Thiết Kế Fanpage Facebook 2026 — Cover, Avatar & Setup";

export const REWRITE_BAO_GIA_THIET_KE_FANPAGE = {
  title: TITLE,
  slug: "bao-gia-thiet-ke-fanpage",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "báo giá thiết kế fanpage, giá thiết kế fanpage facebook, chi phí làm fanpage, setup fanpage bao nhiêu, giá cover avatar fanpage",
  metaTitle: "Báo Giá Thiết Kế Fanpage 2026 | Từ 500k–1,5tr | Bứt Phá",
  metaDescription:
    "Báo giá thiết kế fanpage Facebook 2026: cải tạo 500.000đ, fanpage cơ bản 1.000.000đ, nâng cao 1.500.000đ. Bảng giá, scope, FAQ.",
  description:
    "Bảng báo giá thiết kế fanpage minh bạch: 500k–1,5 triệu one-time, tách rõ setup vs chăm sóc vs ads, checklist trước khi ký.",
  imageUrl: NEWS_THUMBNAIL,
  hot: true,
  content: buildWpSeoArticle({
    metaTitle: "Báo Giá Thiết Kế Fanpage Facebook 2026 | Bảng Giá Setup | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "tong-quan", label: "Báo giá gồm những gì?" },
  { id: "bang-gia", label: "Bảng giá thiết kế fanpage 2026" },
  { id: "chon-goi", label: "Chọn gói nào?" },
  { id: "khac-cham-soc", label: "Setup vs chăm sóc vs ads" },
  { id: "checklist", label: "Checklist trước khi ký" },
  { id: "sai-lam", label: "Sai lầm thường gặp" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} thường bị gộp chung với “chạy ads” hoặc “chăm sóc fanpage hàng tháng” — trong khi thiết kế/setup Fanpage là chi phí <strong>một lần</strong>: logo, ảnh bìa, thông tin Page, CTA inbox/Zalo, SEO Fanpage cơ bản. Nhầm phạm vi dẫn đến so sánh báo giá sai giữa các agency.`,
    `Bài viết bám tiêu đề <em>${TITLE}</em>: công bố bảng giá setup Fanpage của Bứt Phá Marketing (500.000đ–1.500.000đ), hướng dẫn chọn gói và tách rõ setup / chăm sóc / quảng cáo — đồng bộ <a href="${SITE}/facebook#build">/facebook · Gói Fanpage</a>.`,
  ],
})}

${wpKeyTakeaways([
  "Bảng giá setup Bứt Phá: Cải tạo 500.000đ · Fanpage cơ bản 1.000.000đ · Nâng cao 1.500.000đ (one-time).",
  "Thiết kế fanpage ≠ phí chạy ads (1–2tr/tháng) ≠ chăm sóc content hàng tháng.",
  "Đã có Page cũ → thường chọn Cải tạo 500k; chưa có Page → Fanpage cơ bản 1 triệu.",
  "Gói nâng cao thêm chat tự động cơ bản + chiến lược nội dung ban đầu.",
  "Hỏi rõ: số vòng sửa cover/avatar, bàn giao file gốc, SEO Fanpage.",
])}

<div class="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5 my-6">
<p><strong>Cluster Facebook — đọc theo thứ tự:</strong></p>
<ul class="list-disc pl-6 mt-2 space-y-1">
  <li><a href="${SITE}/facebook#build">Bảng giá thiết kế Fanpage (money page)</a></li>
  <li><a href="${SITE}/facebook">Dịch vụ Facebook Marketing</a></li>
  <li><a href="${SITE}/blog/thiet-ke-fanpage-facebook">Thiết kế fanpage — pillar</a></li>
  <li><a href="${SITE}/blog/bao-gia-quang-cao-facebook-thang">Báo giá quảng cáo Facebook tháng</a></li>
  <li><a href="${SITE}/banggia">Bảng giá tổng hợp</a></li>
</ul>
</div>

${wpImg(0, "Báo giá thiết kế fanpage Facebook — cover avatar và setup Page")}

<h2 id="tong-quan">Báo giá thiết kế fanpage gồm những gì?</h2>

<p>Khi hỏi <strong>${KEYWORD}</strong>, bạn đang hỏi chi phí <em>setup / cải tạo</em> Page — không phải ngân sách ads Meta. Phạm vi điển hình:</p>

<ul>
  <li>Logo / avatar và ảnh bìa (cover) đúng kích thước Facebook</li>
  <li>Tối ưu thông tin: danh mục, giờ mở cửa, địa chỉ, nút CTA</li>
  <li>SEO Fanpage cơ bản (tên Page, username, mô tả)</li>
  <li>Gói cao hơn: chat tự động cơ bản, định hướng content ban đầu</li>
</ul>

<p><strong>Không gồm mặc định:</strong> ngân sách ads, đăng bài hàng tháng, sản xuất video ads.</p>

${wpImg(1, "Phạm vi báo giá thiết kế fanpage so với chăm sóc và quảng cáo")}

<h2 id="bang-gia">Bảng báo giá thiết kế fanpage 2026</h2>

<p>Đồng bộ trang dịch vụ. Giá <strong>one-time</strong> (một lần).</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Khi nào chọn</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Công việc chính</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Cải tạo Fanpage</strong></td>
      <td class="border border-indigo-100 px-3 py-2">500.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Đã có Page, cần làm mới nhận diện</td>
      <td class="border border-indigo-100 px-3 py-2">Thiết kế lại logo &amp; ảnh bìa, tối ưu thông tin, SEO Fanpage cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Fanpage cơ bản</strong></td>
      <td class="border border-indigo-100 px-3 py-2">1.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Chưa có Page hoặc setup mới từ đầu</td>
      <td class="border border-indigo-100 px-3 py-2">Khởi tạo Page, logo, cover, CTA, SEO cơ bản, hướng dẫn vận hành</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Fanpage nâng cao</strong></td>
      <td class="border border-indigo-100 px-3 py-2">1.500.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Cần chat tự động + định hướng content</td>
      <td class="border border-indigo-100 px-3 py-2">Setup chuyên nghiệp, SEO Fanpage chuẩn, chat tự động cơ bản, chiến lược nội dung ban đầu</td>
    </tr>
  </tbody>
</table>

<p><a href="${SITE}/facebook#build">Xem gói trên /facebook →</a></p>

<h2 id="chon-goi">Chọn gói nào?</h2>

<ul>
  <li><strong>500.000đ:</strong> Page đã chạy lâu, chỉ cần cover/avatar + thông tin sạch trước khi ads.</li>
  <li><strong>1.000.000đ:</strong> Shop mới / chưa có Page chuyên nghiệp — lựa chọn phổ biến SME.</li>
  <li><strong>1.500.000đ:</strong> Muốn sẵn sàng inbox tự động và khung content tuần đầu.</li>
</ul>

<p>Sau setup, nếu cần lead nhanh → xem <a href="${SITE}/blog/bao-gia-quang-cao-facebook-thang">báo giá quảng cáo Facebook tháng</a> (phí QL 1–2 triệu + ngân sách ads).</p>

<h2 id="khac-cham-soc">Thiết kế fanpage khác chăm sóc và ads thế nào?</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Hạng mục</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Tần suất</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá tham chiếu Bứt Phá</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Thiết kế / setup Fanpage</td>
      <td class="border border-indigo-100 px-3 py-2">Một lần</td>
      <td class="border border-indigo-100 px-3 py-2">500.000đ – 1.500.000đ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Chăm sóc fanpage (content)</td>
      <td class="border border-indigo-100 px-3 py-2">Hàng tháng</td>
      <td class="border border-indigo-100 px-3 py-2">Theo số bài — xem <a href="${SITE}/facebook#care">/facebook#care</a></td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Phí quản lý Meta Ads</td>
      <td class="border border-indigo-100 px-3 py-2">Hàng tháng</td>
      <td class="border border-indigo-100 px-3 py-2">1.000.000đ – 2.000.000đ (chưa gồm ngân sách ads)</td>
    </tr>
  </tbody>
</table>

${wpImg(2, "So sánh chi phí setup fanpage chăm sóc content và Meta Ads")}

<h2 id="checklist">Checklist trước khi ký báo giá thiết kế fanpage</h2>

<ol>
  <li>Đã có Page / chưa có Page? → chọn Cải tạo hoặc Cơ bản.</li>
  <li>File gốc logo/cover bàn giao được không?</li>
  <li>Số vòng chỉnh sửa thiết kế?</li>
  <li>CTA mặc định: gọi, inbox, Zalo, hay form?</li>
  <li>Có cần chat tự động / welcome message không?</li>
  <li>Sau setup: tự đăng bài hay thuê chăm sóc?</li>
</ol>

<h2 id="sai-lam">Sai lầm thường gặp</h2>

<ul>
  <li>So “thiết kế fanpage 500k” với “gói ads 5 triệu” như cùng một dịch vụ.</li>
  <li>Setup xong không gắn pixel / không có CTA rõ → ads tốn tiền.</li>
  <li>Cover đẹp nhưng Page thiếu danh mục, giờ mở cửa, địa chỉ.</li>
  <li>Kỳ vọng setup one-time thay thế content hàng tháng.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/facebook#build`,
    label: "Gói thiết kế Fanpage",
    desc: "Bảng giá 500k–1,5 triệu one-time.",
  },
  {
    href: `${SITE}/facebook#ads`,
    label: "Gói quảng cáo Fanpage",
    desc: "Phí quản lý Meta Ads 1–2 triệu/tháng.",
  },
  {
    href: `${SITE}/blog/thiet-ke-fanpage-facebook`,
    label: "Thiết kế fanpage (pillar)",
    desc: "Quy trình cover, avatar, SEO Page.",
  },
  {
    href: `${SITE}/banggia`,
    label: "Bảng giá tổng hợp",
    desc: "Website · Facebook · Maps.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Báo giá thiết kế fanpage khoảng bao nhiêu?",
      a: "Tại Bứt Phá: Cải tạo 500.000đ, Fanpage cơ bản 1.000.000đ, Fanpage nâng cao 1.500.000đ — thanh toán một lần, chưa gồm chăm sóc tháng hay ngân sách ads.",
    },
    {
      q: "Đã có Fanpage rồi còn cần thuê thiết kế không?",
      a: "Có thể chọn gói Cải tạo 500.000đ nếu chỉ cần làm mới logo/cover và tối ưu thông tin trước khi chạy ads.",
    },
    {
      q: "Thiết kế fanpage có gồm chạy quảng cáo không?",
      a: "Không. Quảng cáo là hạng mục riêng: phí quản lý 1–2 triệu/tháng + ngân sách Meta — xem /facebook#ads.",
    },
    {
      q: "Mất bao lâu để hoàn thành?",
      a: "Thường vài ngày đến 1–2 tuần tùy vòng duyệt cover/avatar và thông tin Page.",
    },
    {
      q: "Có bàn giao file gốc không?",
      a: "Hỏi rõ trong hợp đồng: file cover/avatar (PNG/PSD hoặc tương đương) và quyền sử dụng thương hiệu.",
    },
    {
      q: "Bứt Phá hỗ trợ gì sau setup?",
      a: "Hướng dẫn vận hành (gói cơ bản trở lên); có thể ký thêm chăm sóc fanpage hoặc Meta Ads khi sẵn sàng.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `Tóm lại, ${KEYWORD} minh bạch tại Bứt Phá nằm trong khoảng <strong>500.000đ–1.500.000đ</strong> (one-time). Đừng so số này với gói ads hoặc chăm sóc tháng nếu scope khác nhau.`,
    `Chọn gói trên /facebook theo tình trạng Page hiện tại, rồi bổ sung ads/content khi cần lead.`,
  ],
  ctaLabel: "Xem bảng giá thiết kế Fanpage →",
  ctaHref: `${SITE}/facebook#build`,
})}

${wpExternalCta()}
`,
  }),
};

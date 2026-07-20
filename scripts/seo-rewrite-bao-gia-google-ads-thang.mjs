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

const KEYWORD = "báo giá google ads tháng";
const TITLE = "Báo Giá Google Ads Tháng 2026 — Phí Quản Lý & Ngân Sách Quảng Cáo";

export const REWRITE_BAO_GIA_GOOGLE_ADS_THANG = {
  title: TITLE,
  slug: "bao-gia-google-ads-thang",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "báo giá google ads tháng, chi phí chạy google ads, phí quản lý google ads, giá agency google ads, báo giá quảng cáo google hàng tháng",
  metaTitle: "Báo Giá Google Ads Tháng 2026 | Phí QL 1–2tr | Bứt Phá",
  metaDescription:
    "Báo giá Google Ads tháng 2026: phí quản lý 1.000.000đ–2.000.000đ/tháng (chưa gồm ngân sách ads). Bảng giá, cách tính CPA/ROAS, FAQ.",
  description:
    "Bảng báo giá Google Ads tháng minh bạch: phí quản lý 1–2 triệu/tháng, ngân sách ads tách riêng, landing + tracking và cách chọn gói theo quy mô SME.",
  imageUrl: NEWS_THUMBNAIL,
  hot: true,
  content: buildWpSeoArticle({
    metaTitle: "Báo Giá Google Ads Tháng 2026 | Phí Quản Lý & Ngân Sách | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "tong-quan", label: "Báo giá gồm những gì?" },
  { id: "bang-gia", label: "Bảng giá phí quản lý 2026" },
  { id: "ngan-sach-ads", label: "Ngân sách ads nên để bao nhiêu?" },
  { id: "tinh-tong", label: "Cách tính tổng chi phí tháng" },
  { id: "so-sanh", label: "Google Ads vs SEO website" },
  { id: "trien-khai", label: "Checklist triển khai" },
  { id: "kpi", label: "KPI đo hiệu quả" },
  { id: "sai-lam", label: "Sai lầm làm tăng CPA" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} là câu hỏi phổ biến của doanh nghiệp muốn có lead nhanh từ Google Search — nhưng con số chỉ có ý nghĩa khi tách rõ <strong>phí quản lý chiến dịch</strong> và <strong>ngân sách quảng cáo trả Google</strong>. Nhiều báo giá “8 triệu/tháng” không nói rõ 2 triệu là phí agency hay 8 triệu là tiền click — dẫn đến so sánh sai giữa các đơn vị.`,
    `Bài viết bám tiêu đề <em>${TITLE}</em>: công bố bảng giá phí quản lý Google Ads / Meta Ads (website funnel) của Bứt Phá Marketing (1.000.000đ–2.000.000đ/tháng), hướng dẫn ước ngân sách, tính tổng chi phí và KPI trước khi scale — đồng bộ với <a href="${SITE}/website#quang-cao">/website · Quảng cáo Website</a>.`,
  ],
})}

${wpKeyTakeaways([
  "Phí quản lý Bứt Phá: 1.000.000đ/tháng (ngân sách ads &lt; 10 triệu) hoặc 2.000.000đ/tháng (ads ≥ 10 triệu).",
  "Phí quản lý <em>chưa gồm</em> tiền quảng cáo trả Google/Meta — ngân sách ads tách riêng.",
  "Gói bao gồm: setup chiến dịch, landing + pixel tracking, nghiên cứu từ khóa, báo cáo.",
  "SME thường test 5–10 triệu media + phí QL 1 triệu trong 14–30 ngày đầu.",
  "Website/landing chưa chuẩn conversion → CPA cao dù ads setup đúng.",
])}

<div class="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5 my-6">
<p><strong>Cluster Website + Ads — đọc theo thứ tự:</strong></p>
<ul class="list-disc pl-6 mt-2 space-y-1">
  <li><a href="${SITE}/website#quang-cao">Bảng giá quảng cáo Website (money page)</a></li>
  <li><a href="${SITE}/website">Dịch vụ thiết kế website</a></li>
  <li><a href="${SITE}/blog/google-ads-la-gi">Google Ads là gì — pillar</a></li>
  <li><a href="${SITE}/seo-website">Dịch vụ SEO Website</a></li>
  <li><a href="${SITE}/banggia">Bảng giá tổng hợp</a></li>
</ul>
</div>

${wpImg(0, "Báo giá Google Ads tháng — phí quản lý và ngân sách quảng cáo")}

<h2 id="tong-quan">Báo giá Google Ads tháng gồm những gì?</h2>

<p>Khi hỏi <strong>${KEYWORD}</strong>, bạn cần tách 3 lớp:</p>

<ol>
  <li><strong>Phí quản lý (agency)</strong> — setup Search/Display/PMax, nghiên cứu từ khóa, landing + conversion tracking, tối ưu và báo cáo. Số Bứt Phá niêm yết bên dưới.</li>
  <li><strong>Ngân sách ads (media spend)</strong> — tiền Google (và Meta nếu chạy song song) trừ theo click/impression/conversion. Không nằm trong phí quản lý.</li>
  <li><strong>Nền tảng website/landing</strong> — trang chậm, form lỗi, không có UTM/GA4 → CPA cao. Có thể cần web/landing trước khi scale ads.</li>
</ol>

<p>Tham chiếu gói website Bứt Phá (một lần): Giới thiệu 3.000.000đ · Tối ưu 6.000.000đ · Kinh doanh 9.000.000đ — xem <a href="${SITE}/website">/website</a>.</p>

${wpImg(1, "Phân tách phí quản lý Google Ads và ngân sách media spend")}

<h2 id="bang-gia">Bảng báo giá Google Ads tháng 2026</h2>

<p>Đồng bộ trang dịch vụ. Giá là <strong>phí quản lý / tháng</strong>, <strong>chưa gồm ngân sách quảng cáo</strong>.</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phí quản lý</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Khi nào chọn</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Công việc chính</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Ngân sách ads &lt; 10 triệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">1.000.000đ / tháng</td>
      <td class="border border-indigo-100 px-3 py-2">SME test lead, 1 funnel</td>
      <td class="border border-indigo-100 px-3 py-2">Setup Google/Meta, landing &amp; pixel, nghiên cứu KW, báo cáo tuần</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Ngân sách ads ≥ 10 triệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">2.000.000đ / tháng</td>
      <td class="border border-indigo-100 px-3 py-2">Scale, remarketing, A/B test</td>
      <td class="border border-indigo-100 px-3 py-2">Tối ưu chuyên sâu, A/B landing/creative, remarketing, CPA/ROAS</td>
    </tr>
  </tbody>
</table>

<p><a href="${SITE}/website#quang-cao">Xem gói quảng cáo trên /website →</a></p>

<h2 id="ngan-sach-ads">Ngân sách Google Ads nên để bao nhiêu?</h2>

<p>Phụ thuộc ngành, CPC và mục tiêu (lead, gọi, mua hàng). Tham chiếu SME:</p>

<ul>
  <li><strong>Test 14–30 ngày:</strong> 5–10 triệu media + phí QL 1 triệu. Mục tiêu: data conversion sạch, không “top ngay tuần 1”.</li>
  <li><strong>Ổn định:</strong> 10–25 triệu/tháng — chuyển gói phí QL 2 triệu khi media ≥ 10 triệu.</li>
  <li><strong>Ngành CPC cao</strong> (luật, B2B, y tế): cần landing + negative keyword chặt; test lâu hơn trước khi scale.</li>
</ul>

<p>Công thức thô: <em>Ngân sách ≈ mục tiêu lead × CPA mục tiêu</em>.</p>

${wpImg(2, "Ước ngân sách Google Ads theo mục tiêu lead và CPA")}

<h2 id="tinh-tong">Cách tính tổng chi phí tháng</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Hạng mục</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Tháng test</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Tháng scale</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Phí quản lý</td>
      <td class="border border-indigo-100 px-3 py-2">1.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">2.000.000đ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Ngân sách ads (Google/Meta)</td>
      <td class="border border-indigo-100 px-3 py-2">7.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">18.000.000đ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tổng chi phí quảng cáo</strong></td>
      <td class="border border-indigo-100 px-3 py-2"><strong>8.000.000đ</strong></td>
      <td class="border border-indigo-100 px-3 py-2"><strong>20.000.000đ</strong></td>
    </tr>
  </tbody>
</table>

<p>Chưa gồm chi phí làm website/landing nếu chưa có trang conversion — thường one-time 3–6 triệu trở lên.</p>

<h2 id="so-sanh">Google Ads vs SEO website</h2>

<ul>
  <li><strong>Google Ads:</strong> lead nhanh, chi phí biến thiên theo auction; tắt ads → traffic giảm.</li>
  <li><strong>SEO website:</strong> chậm hơn, chi phí dài hạn thường thấp hơn khi đã lên top intent.</li>
</ul>

<p>Nhiều SME kết hợp: SEO làm nền + ads đẩy lead giai đoạn đầu. Đọc <a href="${SITE}/blog/google-ads-la-gi">Google Ads là gì</a> và <a href="${SITE}/seo-website">SEO Website</a> trước khi chọn tỷ trọng ngân sách.</p>

<h2 id="trien-khai">Checklist triển khai báo giá google ads tháng</h2>

<ol>
  <li>Audit website/landing: tốc độ, form, GA4 + conversion tag.</li>
  <li>Chốt mục tiêu SMART 30 ngày: lead, CPA, ROAS (nếu ecommerce).</li>
  <li>Chọn gói phí QL 1 triệu hoặc 2 triệu theo ngân sách ads.</li>
  <li>Test 14 ngày → review keyword, ad copy, landing.</li>
  <li>Scale khi CPA/ROAS đạt ngưỡng chấp nhận.</li>
</ol>

<h2 id="kpi">KPI đo hiệu quả Google Ads</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Nhóm</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">KPI gợi ý</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Traffic</td>
      <td class="border border-indigo-100 px-3 py-2">Impression, CTR, CPC</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Chuyển đổi</td>
      <td class="border border-indigo-100 px-3 py-2">Lead, form submit, call, purchase</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Hiệu quả</td>
      <td class="border border-indigo-100 px-3 py-2">CPA, ROAS, conversion rate landing</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm thường gặp</h2>

<ul>
  <li>Chạy ads khi landing chưa có conversion tracking.</li>
  <li>Keyword quá rộng, thiếu negative keyword.</li>
  <li>Scale trước khi có đủ sample (ít nhất 2 tuần).</li>
  <li>Nhầm phí QL với ngân sách ads khi so báo giá.</li>
  <li>Traffic ads đổ về homepage thay vì landing message-match.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/website#quang-cao`,
    label: "Gói quảng cáo Website",
    desc: "Google Ads & Meta — phí QL 1–2 triệu/tháng.",
  },
  {
    href: `${SITE}/website`,
    label: "Dịch vụ thiết kế website",
    desc: "Landing chuẩn conversion trước khi scale ads.",
  },
  {
    href: `${SITE}/blog/google-ads-la-gi`,
    label: "Google Ads là gì (pillar)",
    desc: "Nền tảng trước khi chạy chiến dịch.",
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
      q: "Báo giá Google Ads tháng khoảng bao nhiêu?",
      a: "Phí quản lý Bứt Phá: 1.000.000đ/tháng (ads < 10 triệu) hoặc 2.000.000đ/tháng (ads ≥ 10 triệu) — chưa gồm tiền ads trả Google. Tổng tháng test SME thường 6–11 triệu (phí QL + media).",
    },
    {
      q: "Phí quản lý có gồm tiền click không?",
      a: "Không. Phí quản lý trả agency; ngân sách ads trả Google/Meta theo lượt hiển thị/click/chuyển đổi.",
    },
    {
      q: "Google Ads có hiệu quả không?",
      a: "Có khi landing + tracking chuẩn, keyword đúng intent và đo CPA/ROAS. Không hiệu quả nếu chỉ tăng ngân sách mà không sửa funnel.",
    },
    {
      q: "Có chạy Meta Ads cùng Google không?",
      a: "Gói Bứt Phá hỗ trợ setup Google/Meta trong cùng phí quản lý — tùy chiến lược và ngân sách bạn phân bổ.",
    },
    {
      q: "Nên tự chạy hay thuê agency?",
      a: "SME mới nên thuê giai đoạn đầu (gói 1 triệu) để setup tracking + học báo cáo; team có kinh nghiệm có thể hybrid.",
    },
    {
      q: "Bứt Phá Marketing hỗ trợ gì?",
      a: "Tư vấn miễn phí, setup Google Ads, landing + pixel, tối ưu CPA/ROAS, báo cáo KPI; kèm dịch vụ website nếu chưa có trang conversion.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `Tóm lại, ${KEYWORD} minh bạch = phí quản lý cố định (1–2 triệu/tháng) + ngân sách ads linh hoạt + website/landing đủ chuẩn đo conversion.`,
    `Chọn gói trên /website, test 14–30 ngày, rồi scale khi CPA/ROAS đạt mục tiêu.`,
  ],
  ctaLabel: "Xem bảng giá quảng cáo Website →",
  ctaHref: `${SITE}/website#quang-cao`,
})}

${wpExternalCta()}
`,
  }),
};

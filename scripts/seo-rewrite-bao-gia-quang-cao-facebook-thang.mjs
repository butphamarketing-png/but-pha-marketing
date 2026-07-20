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

const KEYWORD = "báo giá quảng cáo facebook tháng";
const TITLE = "Báo Giá Quảng Cáo Facebook Tháng 2026 — Phí Quản Lý & Ngân Sách Ads";

export const REWRITE_BAO_GIA_QUANG_CAO_FACEBOOK_THANG = {
  title: TITLE,
  slug: "bao-gia-quang-cao-facebook-thang",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "báo giá quảng cáo facebook tháng, chi phí chạy ads facebook, phí quản lý facebook ads, giá agency facebook ads, báo giá meta ads tháng",
  metaTitle: "Báo Giá Quảng Cáo Facebook Tháng 2026 | Phí QL 1–2tr | Bứt Phá",
  metaDescription:
    "Báo giá quảng cáo Facebook tháng 2026: phí quản lý 1.000.000đ–2.000.000đ/tháng (chưa gồm ngân sách ads Meta). Bảng giá, cách tính CPA, FAQ.",
  description:
    "Bảng báo giá quảng cáo Facebook tháng minh bạch: phí quản lý Meta Ads 1–2 triệu/tháng, ngân sách ads tách riêng, KPI và cách chọn gói theo quy mô shop/SME.",
  imageUrl: NEWS_THUMBNAIL,
  hot: true,
  content: buildWpSeoArticle({
    metaTitle: "Báo Giá Quảng Cáo Facebook Tháng 2026 | Phí Quản Lý & Ngân Sách | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "tong-quan", label: "Báo giá gồm những gì?" },
  { id: "bang-gia", label: "Bảng giá phí quản lý 2026" },
  { id: "ngan-sach-ads", label: "Ngân sách ads nên để bao nhiêu?" },
  { id: "tinh-tong", label: "Cách tính tổng chi phí tháng" },
  { id: "so-sanh", label: "Ads vs chăm sóc fanpage" },
  { id: "trien-khai", label: "Checklist triển khai" },
  { id: "kpi", label: "KPI đo hiệu quả" },
  { id: "sai-lam", label: "Sai lầm làm tăng CPA" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} thường bị hiểu nhầm thành một con số duy nhất — trong khi thực tế luôn có <strong>hai phần</strong>: phí agency quản lý chiến dịch Meta Ads và ngân sách quảng cáo trả trực tiếp cho Facebook. Agency báo “5 triệu/tháng” có thể là gói trọn (phí QL + media), hoặc chỉ phí quản lý — nếu không hỏi rõ, bạn dễ so sánh sai và chọn nhầm.`,
    `Bài viết bám tiêu đề <em>${TITLE}</em>: công bố bảng giá phí quản lý quảng cáo Fanpage của Bứt Phá Marketing (1.000.000đ–2.000.000đ/tháng), hướng dẫn ước ngân sách ads, cách tính tổng chi phí tháng và KPI trước khi scale — đồng bộ với trang dịch vụ <a href="${SITE}/facebook#ads">Facebook · Quảng cáo Fanpage</a>.`,
  ],
})}

${wpKeyTakeaways([
  "Phí quản lý Bứt Phá: 1.000.000đ/tháng (ngân sách ads &lt; 10 triệu) hoặc 2.000.000đ/tháng (ads ≥ 10 triệu).",
  "Phí quản lý <em>chưa gồm</em> tiền quảng cáo trả Meta — ngân sách ads do bạn quyết định.",
  "Shop/SME thường test ads 3–10 triệu media + phí QL 1 triệu trong 14–30 ngày đầu.",
  "CPA sạch cần Pixel/CAPI + landing/Zalo khớp creative — không chỉ nhìn reach.",
  "Fanpage chưa chuẩn (ảnh bìa, CTA, policy) làm ads tốn tiền hơn — cân nhắc setup trước.",
])}

<div class="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5 my-6">
<p><strong>Cluster Facebook — đọc theo thứ tự:</strong></p>
<ul class="list-disc pl-6 mt-2 space-y-1">
  <li><a href="${SITE}/facebook#ads">Bảng giá quảng cáo Facebook (money page)</a></li>
  <li><a href="${SITE}/facebook">Dịch vụ Facebook Marketing</a></li>
  <li><a href="${SITE}/blog/quang-cao-facebook">Quảng cáo Facebook — pillar</a></li>
  <li><a href="${SITE}/blog/chu-de/facebook">Hub chủ đề Facebook</a></li>
  <li><a href="${SITE}/banggia">Bảng giá tổng hợp</a></li>
</ul>
</div>

${wpImg(0, "Báo giá quảng cáo Facebook tháng — phí quản lý và ngân sách Meta Ads")}

<h2 id="tong-quan">Báo giá quảng cáo Facebook tháng gồm những gì?</h2>

<p>Khi hỏi <strong>${KEYWORD}</strong>, bạn cần tách 3 lớp chi phí:</p>

<ol>
  <li><strong>Phí quản lý (agency)</strong> — setup chiến dịch Meta Ads, target audience, creative test, theo dõi và báo cáo. Đây là số Bứt Phá niêm yết công khai bên dưới.</li>
  <li><strong>Ngân sách ads (media spend)</strong> — tiền Meta trừ theo impression/click/conversion. Không nằm trong phí quản lý.</li>
  <li><strong>Nền tảng Fanpage</strong> — nếu Page thiếu ảnh bìa, CTA inbox, pixel chưa gắn hoặc vi phạm policy, CPA sẽ cao. Có thể cần gói setup Fanpage trước khi chạy ads.</li>
</ol>

<p>Gói setup Fanpage tại Bứt Phá (một lần, tham chiếu): Cải tạo 500.000đ · Fanpage cơ bản 1.000.000đ · Fanpage nâng cao 1.500.000đ — xem chi tiết tại <a href="${SITE}/facebook#build">/facebook</a>.</p>

${wpImg(1, "Phân tách phí quản lý Meta Ads và ngân sách quảng cáo Facebook")}

<h2 id="bang-gia">Bảng báo giá quảng cáo Facebook tháng 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2">Shop/SME test thị trường, 1 Page</td>
      <td class="border border-indigo-100 px-3 py-2">Thiết lập chiến dịch, target KH, theo dõi &amp; tối ưu, báo cáo</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Ngân sách ads ≥ 10 triệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">2.000.000đ / tháng</td>
      <td class="border border-indigo-100 px-3 py-2">Scale, nhiều ad set / creative</td>
      <td class="border border-indigo-100 px-3 py-2">Tối ưu nâng cao, A/B test, tối ưu chuyển đổi, báo cáo chuyên sâu</td>
    </tr>
  </tbody>
</table>

<p><a href="${SITE}/facebook#ads">Xem gói quảng cáo trên /facebook →</a></p>

<h2 id="ngan-sach-ads">Ngân sách ads Facebook nên để bao nhiêu?</h2>

<p>Ngân sách ads phụ thuộc ngành, creative và mục tiêu (inbox, lead form, purchase). Tham chiếu SME Việt Nam:</p>

<ul>
  <li><strong>Test 14–30 ngày:</strong> 3–10 triệu media spend + phí QL 1 triệu. Mục tiêu: có data CPA/inbox, không phải “viral ngay tuần 1”.</li>
  <li><strong>Ổn định sau khi CPA chấp nhận được:</strong> 10–20 triệu/tháng — thường chuyển gói phí QL 2 triệu khi media ≥ 10 triệu.</li>
  <li><strong>Ngành cạnh tranh cao</strong> (spa, nha khoa, thời trang): CPL cao hơn; cần landing/Zalo và creative test nhiều hơn.</li>
</ul>

<p>Công thức thô: <em>Ngân sách tháng ≈ mục tiêu lead × CPA mục tiêu</em>. Chưa biết CPA thì bắt đầu mức test nhỏ, chốt số sau 2–4 tuần data sạch.</p>

${wpImg(2, "Ước ngân sách quảng cáo Facebook theo mục tiêu inbox và lead")}

<h2 id="tinh-tong">Cách tính tổng chi phí tháng</h2>

<p>Ví dụ minh họa (không cam kết kết quả):</p>

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
      <td class="border border-indigo-100 px-3 py-2">Ngân sách ads (Meta)</td>
      <td class="border border-indigo-100 px-3 py-2">5.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">15.000.000đ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tổng chi phí quảng cáo Facebook</strong></td>
      <td class="border border-indigo-100 px-3 py-2"><strong>6.000.000đ</strong></td>
      <td class="border border-indigo-100 px-3 py-2"><strong>17.000.000đ</strong></td>
    </tr>
  </tbody>
</table>

<p>Nếu Fanpage chưa chuẩn, cộng thêm một lần setup (0,5–1,5 triệu) ở tháng đầu — khoản này không lặp mỗi tháng.</p>

<h2 id="so-sanh">Quảng cáo Facebook vs chăm sóc fanpage</h2>

<ul>
  <li><strong>Meta Ads:</strong> trả tiền để reach/lead nhanh; chi phí biến thiên theo auction và creative.</li>
  <li><strong>Chăm sóc fanpage (organic):</strong> đăng bài, nuôi tương tác; chậm hơn nhưng giảm phụ thuộc ads dài hạn.</li>
</ul>

<p>Nhiều shop kết hợp: content organic làm nền + ads đẩy inbox/sale tuần đầu hoặc mùa cao điểm. Đọc pillar <a href="${SITE}/blog/quang-cao-facebook">Quảng cáo Facebook</a> trước khi chỉ đổ tiền ads.</p>

<h2 id="trien-khai">Checklist triển khai báo giá quảng cáo facebook tháng</h2>

<ol>
  <li>Audit Fanpage: ảnh bìa, CTA inbox/Zalo, policy, pixel/CAPI.</li>
  <li>Chốt mục tiêu SMART 30 ngày: inbox, lead form, CPA tối đa.</li>
  <li>Chọn gói phí QL 1 triệu hoặc 2 triệu theo ngân sách ads dự kiến.</li>
  <li>Test 14 ngày → review creative, audience, placement.</li>
  <li>Scale chỉ khi inbox/lead đạt tỷ lệ chốt chấp nhận được.</li>
</ol>

<h2 id="kpi">Đo lường KPI cho quảng cáo Facebook</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Nhóm</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">KPI gợi ý</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Phân phối</td>
      <td class="border border-indigo-100 px-3 py-2">Reach, frequency, CPM, CTR</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Chuyển đổi</td>
      <td class="border border-indigo-100 px-3 py-2">Inbox, lead form, purchase, CPA</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Chất lượng</td>
      <td class="border border-indigo-100 px-3 py-2">Tỷ lệ inbox → chốt, ROAS (nếu ecommerce)</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Chi phí</td>
      <td class="border border-indigo-100 px-3 py-2">CPA full cost (gồm phí QL nếu tính tổng)</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm thường gặp làm đội chi phí</h2>

<ul>
  <li>Chỉ nhìn reach/like, không đo inbox/lead.</li>
  <li>Chạy ads khi Page vi phạm policy hoặc thiếu pixel.</li>
  <li>Scale ngày thứ 3 khi chưa đủ sample.</li>
  <li>Nhầm phí quản lý với ngân sách ads khi so báo giá agency.</li>
  <li>Creative đẹp nhưng landing/Zalo không khớp → CTR cao, không chốt.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/facebook#ads`,
    label: "Gói quảng cáo Facebook",
    desc: "Bảng giá phí quản lý 1–2 triệu/tháng.",
  },
  {
    href: `${SITE}/facebook`,
    label: "Dịch vụ Facebook Marketing",
    desc: "Setup Fanpage, chăm sóc, quảng cáo.",
  },
  {
    href: `${SITE}/blog/quang-cao-facebook`,
    label: "Quảng cáo Facebook (pillar)",
    desc: "Chiến lược Meta Ads trước khi scale.",
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
      q: "Báo giá quảng cáo Facebook tháng khoảng bao nhiêu?",
      a: "Phí quản lý tại Bứt Phá: 1.000.000đ/tháng nếu ngân sách ads dưới 10 triệu, hoặc 2.000.000đ/tháng nếu từ 10 triệu trở lên — chưa gồm tiền ads trả Meta. Tổng tháng test SME thường khoảng 4–11 triệu (phí QL + media).",
    },
    {
      q: "Phí quản lý và ngân sách ads khác nhau thế nào?",
      a: "Phí quản lý trả agency để setup/tối ưu chiến dịch. Ngân sách ads trả Meta theo lượt hiển thị/click/chuyển đổi. Báo giá Bứt Phá luôn tách hai khoản này.",
    },
    {
      q: "Quảng cáo Facebook có hiệu quả không?",
      a: "Có khi Fanpage chuẩn, pixel/CAPI đo đúng, creative test và landing khớp. Không hiệu quả nếu chỉ tăng ngân sách mà không sửa funnel.",
    },
    {
      q: "Nên tự chạy hay thuê agency?",
      a: "SME mới nên thuê giai đoạn đầu (gói 1 triệu) để setup đúng + học báo cáo; đội có kinh nghiệm Meta Ads có thể hybrid.",
    },
    {
      q: "Đo bằng KPI nào?",
      a: "Inbox, lead, CPA, ROAS (shop) — không chỉ vanity metrics. Gắn mục tiêu 30/60/90 ngày trước khi scale.",
    },
    {
      q: "Bứt Phá Marketing hỗ trợ gì?",
      a: "Tư vấn miễn phí, setup Meta Ads, tối ưu CPA, báo cáo KPI; đồng thời có gói thiết kế/chăm sóc Fanpage nếu Page chưa sẵn sàng.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `Tóm lại, ${KEYWORD} minh bạch = phí quản lý cố định (1–2 triệu/tháng) + ngân sách ads linh hoạt + Fanpage đủ chuẩn. Đừng so “5 triệu/tháng” giữa các agency nếu chưa biết số đó gồm media spend hay không.`,
    `Muốn số liệu khớp mục tiêu inbox/lead — chọn gói trên trang dịch vụ rồi chốt ngân sách test 14–30 ngày.`,
  ],
  ctaLabel: "Xem bảng giá quảng cáo Facebook →",
  ctaHref: `${SITE}/facebook#ads`,
})}

${wpExternalCta()}
`,
  }),
};

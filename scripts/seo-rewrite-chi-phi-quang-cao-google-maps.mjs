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

const KEYWORD = "chi phí quảng cáo google maps";
const TITLE = "Chi Phí Quảng Cáo Google Maps 2026 — Phí Quản Lý & Ngân Sách Ads";

export const REWRITE_CHI_PHI_QUANG_CAO_GOOGLE_MAPS = {
  title: TITLE,
  slug: "chi-phi-quang-cao-google-maps",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "chi phí quảng cáo google maps, giá quảng cáo gmap, phí dịch vụ quảng cáo gmap, báo giá local ads, phí quản lý google maps ads",
  metaTitle: "Chi Phí Quảng Cáo Google Maps 2026 | Phí QL 1–2tr | Bứt Phá",
  metaDescription:
    "Chi phí quảng cáo Google Maps 2026: phí quản lý 1.000.000đ–2.000.000đ/tháng (chưa gồm ngân sách ads). Bảng giá, cách tính CPA, FAQ.",
  description:
    "Bảng chi phí quảng cáo Google Maps minh bạch: phí quản lý Local Ads 1–2 triệu/tháng, ngân sách ads tách riêng, KPI và cách chọn gói theo quy mô.",
  imageUrl: NEWS_THUMBNAIL,
  hot: true,
  content: buildWpSeoArticle({
    metaTitle: "Chi Phí Quảng Cáo Google Maps 2026 | Phí Quản Lý & Ngân Sách | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "tong-quan", label: "Chi phí gồm những gì?" },
  { id: "bang-gia", label: "Bảng giá phí quản lý 2026" },
  { id: "ngan-sach-ads", label: "Ngân sách ads nên để bao nhiêu?" },
  { id: "tinh-tong", label: "Cách tính tổng chi phí tháng" },
  { id: "so-sanh", label: "Maps Ads vs SEO Maps" },
  { id: "trien-khai", label: "Checklist triển khai" },
  { id: "kpi", label: "KPI đo hiệu quả" },
  { id: "sai-lam", label: "Sai lầm làm tăng CPA" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} không chỉ là “Google trừ bao nhiêu tiền mỗi ngày”. Với SME Việt Nam, con số thực tế luôn gồm hai phần tách bạch: <strong>phí quản lý chiến dịch (agency)</strong> và <strong>ngân sách quảng cáo trả cho Google</strong>. Nhầm hai khoản này là lý do nhiều chủ shop cảm thấy “chạy Maps đắt” dù phí quản lý chỉ vài triệu.`,
    `Bài viết bám tiêu đề <em>${TITLE}</em>: công bố bảng giá phí quản lý Local Ads của Bứt Phá Marketing (1.000.000đ–2.000.000đ/tháng), hướng dẫn ước ngân sách ads, cách tính tổng chi phí tháng và KPI để biết khi nào nên scale — đồng bộ với trang dịch vụ <a href="${SITE}/google-maps#ads-pricing">Google Maps · Gói Quảng cáo</a>.`,
  ],
})}

${wpKeyTakeaways([
  "Phí quản lý Bứt Phá: 1.000.000đ/tháng (ngân sách ads &lt; 10 triệu) hoặc 2.000.000đ/tháng (ads ≥ 10 triệu).",
  "Phí quản lý <em>chưa gồm</em> tiền quảng cáo trả Google — ngân sách ads tách riêng.",
  "SME thường test ads 3–8 triệu/tháng + phí QL 1 triệu trước khi scale.",
  "CPA sạch cần tracking cuộc gọi / chỉ đường / form — không chỉ nhìn impression.",
  "GBP + review tốt giúp giảm CPA; Maps Ads không thay SEO Local dài hạn.",
])}

<div class="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5 my-6">
<p><strong>Cluster Google Maps — đọc theo thứ tự:</strong></p>
<ul class="list-disc pl-6 mt-2 space-y-1">
  <li><a href="${SITE}/google-maps#ads-pricing">Bảng giá quảng cáo Google Maps (money page)</a></li>
  <li><a href="${SITE}/google-maps">Dịch vụ Google Maps / Local SEO</a></li>
  <li><a href="${SITE}/blog/seo-google-maps-la-gi">SEO Google Maps — tối ưu Local Pack (pillar)</a></li>
  <li><a href="${SITE}/blog/chu-de/google-maps">Hub chủ đề Google Maps</a></li>
  <li><a href="${SITE}/banggia">Bảng giá tổng hợp</a></li>
</ul>
</div>

${wpImg(0, "Chi phí quảng cáo Google Maps — phí quản lý và ngân sách ads")}

<h2 id="tong-quan">Chi phí quảng cáo Google Maps gồm những gì?</h2>

<p>Khi hỏi <strong>${KEYWORD}</strong>, bạn đang hỏi về tổng tiền bỏ ra để xuất hiện khi khách tìm “gần tôi”, chỉ đường hoặc gọi cửa hàng. Thực tế có 3 lớp:</p>

<ol>
  <li><strong>Phí quản lý (agency)</strong> — setup chiến dịch Local / Performance Max for store goals, target bán kính, theo dõi và báo cáo. Đây là số Bứt Phá niêm yết công khai bên dưới.</li>
  <li><strong>Ngân sách ads (media spend)</strong> — tiền Google trừ theo click / impression. Không nằm trong phí quản lý.</li>
  <li><strong>Nền tảng Maps (GBP)</strong> — nếu profile chưa chuẩn (sai danh mục, thiếu ảnh, review yếu), CPA ads sẽ cao. Có thể cần gói cải tạo / tối ưu Maps trước khi đổ tiền ads.</li>
</ol>

<p>Gói setup Maps tại Bứt Phá (một lần, tham chiếu): Cải tạo 300.000đ · Xây dựng 600.000đ · Tối ưu 900.000đ — xem chi tiết tại <a href="${SITE}/google-maps#gm-pricing">/google-maps</a>.</p>

${wpImg(1, "Phân tách phí quản lý Local Ads và ngân sách Google Ads")}

<h2 id="bang-gia">Bảng giá phí quản lý quảng cáo Google Maps 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2">SME test thị trường, 1–2 địa điểm</td>
      <td class="border border-indigo-100 px-3 py-2">Setup Local Ads, target khu vực, theo dõi, báo cáo</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Ngân sách ads ≥ 10 triệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">2.000.000đ / tháng</td>
      <td class="border border-indigo-100 px-3 py-2">Scale, nhiều khung giờ / creative</td>
      <td class="border border-indigo-100 px-3 py-2">Tối ưu chiến dịch lớn, A/B test, tối ưu CPA, báo cáo nâng cao</td>
    </tr>
  </tbody>
</table>

<p><a href="${SITE}/google-maps#ads-pricing">Xem gói quảng cáo trên /google-maps →</a></p>

<h2 id="ngan-sach-ads">Ngân sách ads nên để bao nhiêu?</h2>

<p>Ngân sách ads phụ thuộc ngành, mật độ cạnh tranh và bán kính phục vụ — không có một con số “chuẩn quốc gia”. Tham chiếu thực tế SME:</p>

<ul>
  <li><strong>Test 14–30 ngày:</strong> 3–8 triệu media spend + phí QL 1 triệu. Mục tiêu: có data cuộc gọi / chỉ đường, không phải “đốt hết để lên top”.</li>
  <li><strong>Ổn định sau khi CPA chấp nhận được:</strong> 8–15 triệu/tháng — lúc này thường chuyển sang gói phí QL 2 triệu nếu media ≥ 10 triệu.</li>
  <li><strong>Ngành cạnh tranh cao</strong> (nha khoa, spa, F&amp;B trung tâm): CPC / CPL cao hơn; cần GBP + landing / Zalo rõ trước khi tăng ngân sách.</li>
</ul>

<p>Công thức thô: <em>Ngân sách tháng ≈ mục tiêu lead × CPA mục tiêu</em>. Nếu chưa biết CPA, bắt đầu mức test nhỏ và chốt CPA sau 2–4 tuần data sạch.</p>

${wpImg(2, "Ước ngân sách quảng cáo Google Maps theo mục tiêu lead")}

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
      <td class="border border-indigo-100 px-3 py-2">Ngân sách ads (Google)</td>
      <td class="border border-indigo-100 px-3 py-2">5.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tổng chi phí quảng cáo Google Maps</strong></td>
      <td class="border border-indigo-100 px-3 py-2"><strong>6.000.000đ</strong></td>
      <td class="border border-indigo-100 px-3 py-2"><strong>14.000.000đ</strong></td>
    </tr>
  </tbody>
</table>

<p>Nếu còn thiếu GBP chuẩn, cộng thêm một lần setup Maps (0,3–0,9 triệu) ở tháng đầu — khoản này không lặp mỗi tháng trừ khi có nhiều chi nhánh mới.</p>

<h2 id="so-sanh">Maps Ads và SEO Google Maps khác nhau thế nào?</h2>

<ul>
  <li><strong>Maps Ads / Local Ads:</strong> trả tiền để hiện khi có intent gần bạn; kiểm soát tốc độ; chi phí biến thiên theo cạnh tranh.</li>
  <li><strong>SEO Maps (organic Local Pack):</strong> tối ưu GBP, citation, review, website; chậm hơn nhưng CPA dài hạn thường thấp hơn khi đã ổn định.</li>
</ul>

<p>Nhiều SME kết hợp: SEO Maps làm nền + ads để đẩy lead tuần đầu / mùa cao điểm. Đọc pillar <a href="${SITE}/blog/seo-google-maps-la-gi">SEO Google Maps</a> trước khi chỉ đổ tiền ads.</p>

<h2 id="trien-khai">Checklist triển khai chi phí quảng cáo google maps</h2>

<ol>
  <li>Audit GBP: danh mục, giờ mở cửa, ảnh, UTM / tracking cuộc gọi.</li>
  <li>Chốt mục tiêu SMART 30 ngày: số cuộc gọi, chỉ đường, CPA tối đa.</li>
  <li>Chọn gói phí QL 1 triệu hoặc 2 triệu theo ngân sách ads dự kiến.</li>
  <li>Test 14 ngày → review creative, bán kính, giờ chạy.</li>
  <li>Scale chỉ khi lead nghe máy / đến cửa đạt tỷ lệ chấp nhận được.</li>
</ol>

<h2 id="kpi">Đo lường KPI cho chi phí quảng cáo google maps</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Nhóm</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">KPI gợi ý</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Nhận diện</td>
      <td class="border border-indigo-100 px-3 py-2">Impression, CTR, coverage bán kính</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Hành động Maps</td>
      <td class="border border-indigo-100 px-3 py-2">Cuộc gọi, chỉ đường, click website</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Chuyển đổi kinh doanh</td>
      <td class="border border-indigo-100 px-3 py-2">Lead nghe máy, lịch hẹn, doanh thu / ROAS</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Chi phí</td>
      <td class="border border-indigo-100 px-3 py-2">CPA (gồm cả phí QL nếu bạn tính full cost)</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm thường gặp làm đội chi phí</h2>

<ul>
  <li>Chỉ nhìn like / impression, không gắn call tracking.</li>
  <li>Đổ ads khi GBP sai địa chỉ / giờ đóng cửa — đốt ngân sách.</li>
  <li>Scale ngày thứ 3 khi chưa đủ sample.</li>
  <li>Nhầm phí quản lý với ngân sách ads khi so báo giá agency.</li>
  <li>Landing / Zalo không khớp thông điệp quảng cáo → CTR cao nhưng không chốt.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/google-maps#ads-pricing`,
    label: "Gói quảng cáo Google Maps",
    desc: "Bảng giá phí quản lý 1–2 triệu/tháng.",
  },
  {
    href: `${SITE}/google-maps`,
    label: "Dịch vụ Google Maps",
    desc: "Setup GBP, review, Local SEO.",
  },
  {
    href: `${SITE}/blog/seo-google-maps-la-gi`,
    label: "SEO Google Maps (pillar)",
    desc: "Tối ưu Local Pack trước khi scale ads.",
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
      q: "Chi phí quảng cáo Google Maps khoảng bao nhiêu?",
      a: "Phí quản lý tại Bứt Phá: 1.000.000đ/tháng nếu ngân sách ads dưới 10 triệu, hoặc 2.000.000đ/tháng nếu từ 10 triệu trở lên — chưa gồm tiền ads trả Google. Tổng tháng test SME thường khoảng 4–9 triệu (phí QL + media).",
    },
    {
      q: "Giá quảng cáo GMap / phí dịch vụ quảng cáo GMap là gì?",
      a: "Thường chỉ phí agency quản lý chiến dịch. Hãy hỏi rõ báo giá có gồm media spend hay không. Báo giá Bứt Phá luôn tách: phí QL niêm yết + ngân sách ads do bạn quyết định.",
    },
    {
      q: "Chi phí quảng cáo Google Maps có hiệu quả không?",
      a: "Có khi GBP chuẩn, bán kính đúng, và đo cuộc gọi/chỉ đường. Không hiệu quả nếu chỉ tăng ngân sách mà không sửa listing và CTA.",
    },
    {
      q: "Nên tự chạy hay thuê agency?",
      a: "SME mới nên thuê giai đoạn đầu (gói 1 triệu) để setup đúng + học báo cáo; đội nội bộ có kinh nghiệm Google Ads có thể hybrid.",
    },
    {
      q: "Đo bằng KPI nào?",
      a: "Cuộc gọi, chỉ đường, CPA, tỷ lệ nghe máy / đến cửa — không chỉ vanity metrics. Gắn mục tiêu 30/60/90 ngày trước khi scale.",
    },
    {
      q: "Bứt Phá Marketing hỗ trợ gì?",
      a: "Tư vấn miễn phí, setup Local Ads, tối ưu CPA, báo cáo KPI; đồng thời có gói xây dựng/tối ưu Google Maps nếu listing chưa sẵn sàng.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `Tóm lại, ${KEYWORD} minh bạch = phí quản lý cố định (1–2 triệu/tháng) + ngân sách ads linh hoạt + nền GBP đủ chuẩn. Đừng so “vài triệu” chung chung giữa các agency nếu chưa biết số đó gồm media spend hay không.`,
    `Muốn số liệu khớp mục tiêu lead của bạn — chọn gói trên trang dịch vụ rồi chốt ngân sách test 14–30 ngày.`,
  ],
  ctaLabel: "Xem bảng giá quảng cáo Google Maps →",
  ctaHref: `${SITE}/google-maps#ads-pricing`,
})}

${wpExternalCta()}
`,
  }),
};

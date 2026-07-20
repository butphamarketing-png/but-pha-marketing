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

const KEYWORD = "chi phí làm website chuẩn SEO";
const TITLE = "Chi Phí Làm Website Chuẩn SEO 2026 — Bảng Giá & Yếu Tố Ảnh Hưởng";

export const REWRITE_CHI_PHI_LAM_WEBSITE_CHUAN_SEO = {
  title: TITLE,
  slug: "chi-phi-lam-website-chuan-seo",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "chi phí làm website chuẩn SEO, giá website chuẩn seo, chi phí thiết kế website SEO, website SEO giá bao nhiêu, làm web chuẩn SEO hết bao nhiêu",
  metaTitle: "Chi Phí Làm Website Chuẩn SEO 2026 | Giá 3–12tr | Bứt Phá",
  metaDescription:
    "Chi phí làm website chuẩn SEO 2026: gói 3–12 triệu (SEO on-page kèm theo), hosting, chăm sóc content. Bảng giá, yếu tố tăng giá, FAQ.",
  description:
    "Bảng chi phí làm website chuẩn SEO minh bạch: gói thiết kế 3–12 triệu có SEO on-page, chi phí duy trì, khác biệt web rẻ không SEO và checklist trước khi ký.",
  imageUrl: NEWS_THUMBNAIL,
  hot: true,
  content: buildWpSeoArticle({
    metaTitle: "Chi Phí Làm Website Chuẩn SEO 2026 | Bảng Giá & Yếu Tố | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "tong-quan", label: "Chi phí gồm những gì?" },
  { id: "bang-gia", label: "Bảng giá website chuẩn SEO 2026" },
  { id: "seo-trong-goi", label: "SEO nào nằm trong giá thiết kế?" },
  { id: "chi-phi-them", label: "Chi phí ngoài thiết kế" },
  { id: "tinh-tong", label: "Ví dụ tổng năm đầu" },
  { id: "yeu-to", label: "Yếu tố làm giá tăng" },
  { id: "sai-lam", label: "Sai lầm khi chọn web rẻ" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} không chỉ là “làm web bao nhiêu tiền” — mà là tổng ngân sách để có site <strong>index được, đo được, và sẵn sàng xếp hạng</strong>: technical SEO cơ bản, on-page, tốc độ, schema, cấu trúc URL. Web 2 triệu không SEO và web 6 triệu có SEO on-page khác nhau hoàn toàn về giá trị dài hạn.`,
    `Bài viết bám tiêu đề <em>${TITLE}</em>: công bố bảng giá gói thiết kế Bứt Phá (3–12 triệu) với mức SEO kèm theo từng gói, chi phí hosting/content ngoài thiết kế, và cách tránh báo giá “chuẩn SEO” nhưng thực tế chỉ gắn meta title — đồng bộ <a href="${SITE}/website#pricing">/website</a> và hướng dẫn kỹ thuật tại <a href="${SITE}/blog/thiet-ke-website-chuan-seo">thiết kế website chuẩn SEO</a>.`,
  ],
})}

${wpKeyTakeaways([
  "Gói thiết kế Bứt Phá có SEO on-page: từ 3 triệu (cơ bản) → 6 triệu (SEO nâng cao) → 9–12 triệu (CRO + data).",
  "Chi phí làm website chuẩn SEO = giá thiết kế + tên miền/hosting + (tuỳ chọn) content SEO hàng tháng.",
  "“Chuẩn SEO” trong giá thiết kế ≠ gói SEO lên top 6 tháng — hai hạng mục tách riêng.",
  "Web rẻ thiếu technical/on-page thường đốt ads nhiều hơn về sau.",
  "SME thường chọn gói Tối ưu 6 triệu nếu mục tiêu chạy ads + SEO organic.",
])}

<div class="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5 my-6">
<p><strong>Cluster Website SEO — đọc theo thứ tự:</strong></p>
<ul class="list-disc pl-6 mt-2 space-y-1">
  <li><a href="${SITE}/website#pricing">Bảng giá thiết kế website (money page)</a></li>
  <li><a href="${SITE}/blog/thiet-ke-website-chuan-seo">Thiết kế website chuẩn SEO (hướng dẫn kỹ thuật)</a></li>
  <li><a href="${SITE}/seo-website">Dịch vụ SEO Website</a></li>
  <li><a href="${SITE}/blog/website-gia-bao-nhieu-2026">Website giá bao nhiêu 2026?</a></li>
  <li><a href="${SITE}/banggia">Bảng giá tổng hợp</a></li>
</ul>
</div>

${wpImg(0, "Chi phí làm website chuẩn SEO — bảng giá và yếu tố ảnh hưởng")}

<h2 id="tong-quan">Chi phí làm website chuẩn SEO gồm những gì?</h2>

<p>Khi hỏi <strong>${KEYWORD}</strong>, bạn đang hỏi về 3 lớp ngân sách:</p>

<ol>
  <li><strong>Thiết kế + SEO on-page/technical cơ bản</strong> — one-time: cấu trúc site, meta, heading, tốc độ, mobile, schema cơ bản. Đây là số Bứt Phá niêm yết trong bảng giá dưới.</li>
  <li><strong>Vận hành kỹ thuật</strong> — tên miền + hosting hàng năm (không nằm trong giá thiết kế).</li>
  <li><strong>SEO nội dung / tăng trưởng</strong> — bài viết, backlink, SEO local hàng tháng — <em>không</em> gộp mặc định vào giá làm web.</li>
</ol>

<p>Nhầm (1) với (3) là lý do nhiều chủ shop kỳ vọng “web 5 triệu = lên top Google” — không đúng phạm vi.</p>

${wpImg(1, "Phân tách chi phí thiết kế SEO on-page và SEO tăng trưởng hàng tháng")}

<h2 id="bang-gia">Bảng giá website chuẩn SEO 2026 (Bứt Phá Marketing)</h2>

<p>Đồng bộ <a href="${SITE}/website#pricing">/website</a>. Giá <strong>chưa gồm</strong> tên miền và hosting.</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá thiết kế</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Mức SEO trong gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Giới thiệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">SEO on-page cơ bản (title, meta, heading, mobile)</td>
      <td class="border border-indigo-100 px-3 py-2">Web giới thiệu 5–8 trang</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tối ưu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">SEO nâng cao + tốc độ + tích hợp marketing/GA</td>
      <td class="border border-indigo-100 px-3 py-2">SME chạy ads + SEO</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Kinh doanh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">CRO + CRM/Chatbot + theo dõi dữ liệu chuyển đổi</td>
      <td class="border border-indigo-100 px-3 py-2">Shop/dịch vụ cần lead</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hệ thống</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Đa tính năng, API, automation — nền tảng scale SEO/content</td>
      <td class="border border-indigo-100 px-3 py-2">Hệ thống lớn / tích hợp</td>
    </tr>
  </tbody>
</table>

<p><a href="${SITE}/website#pricing">Xem gói trên /website →</a></p>

<h2 id="seo-trong-goi">SEO nào nằm trong giá thiết kế — SEO nào không?</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Trong giá làm web chuẩn SEO</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Tính riêng / gói SEO tháng</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Cấu trúc URL, sitemap, robots, HTTPS</td>
      <td class="border border-indigo-100 px-3 py-2">Viết content pillar/cluster hàng tháng</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Title, meta, H1–H2, alt ảnh cơ bản</td>
      <td class="border border-indigo-100 px-3 py-2">Link building / PR</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Mobile, tốc độ Core Web Vitals cơ bản</td>
      <td class="border border-indigo-100 px-3 py-2">SEO Local / Maps ongoing</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">GA4 / Search Console sẵn sàng đo</td>
      <td class="border border-indigo-100 px-3 py-2">Audit SEO định kỳ 6–12 tháng</td>
    </tr>
  </tbody>
</table>

<p>Chi tiết kỹ thuật: <a href="${SITE}/blog/thiet-ke-website-chuan-seo">thiết kế website chuẩn SEO</a>. Gói tăng trưởng: <a href="${SITE}/seo-website">dịch vụ SEO Website</a>.</p>

<h2 id="chi-phi-them">Chi phí ngoài thiết kế khi làm website chuẩn SEO</h2>

<ul>
  <li><strong>Tên miền .com:</strong> ~350.000đ/năm</li>
  <li><strong>Hosting 3GB:</strong> ~3.348.000đ/năm · <strong>10GB:</strong> ~7.200.000đ/năm</li>
  <li><strong>Chăm sóc content SEO:</strong> từ 1.000.000đ/tháng (10 bài) — tùy chọn</li>
  <li><strong>Quảng cáo Google/Meta:</strong> phí QL 1–2 triệu/tháng + ngân sách ads — nếu cần lead nhanh</li>
</ul>

${wpImg(2, "Chi phí duy trì website chuẩn SEO hàng năm ngoài giá thiết kế")}

<h2 id="tinh-tong">Ví dụ tổng chi phí năm đầu (website chuẩn SEO)</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Kịch bản</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Thiết kế</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Domain + hosting</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Content SEO (tuỳ chọn)</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Tổng tham chiếu</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">MVP chuẩn SEO cơ bản</td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">~3.698.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">—</td>
      <td class="border border-indigo-100 px-3 py-2"><strong>~6.7 triệu</strong></td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">SME SEO + ads sẵn sàng</td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">~3.698.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">12tr (1tr×12)</td>
      <td class="border border-indigo-100 px-3 py-2"><strong>~21.7 triệu</strong></td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Shop cần CRO + content</td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">~7.550.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">12tr</td>
      <td class="border border-indigo-100 px-3 py-2"><strong>~28.6 triệu</strong></td>
    </tr>
  </tbody>
</table>

<p>Content SEO là tùy chọn — nhiều SME làm web gói 6 triệu trước, thêm content khi có ngân sách.</p>

<h2 id="yeu-to">Yếu tố làm chi phí website chuẩn SEO tăng</h2>

<ol>
  <li><strong>Nhiều trang landing theo từ khóa</strong> — mỗi landing cần on-page riêng.</li>
  <li><strong>Đa ngôn ngữ / đa địa điểm</strong> — hreflang, nội dung local.</li>
  <li><strong>TMĐT / catalog lớn</strong> — schema sản phẩm, filter SEO-friendly.</li>
  <li><strong>Tốc độ cao (CWV tốt trên mobile)</strong> — tối ưu ảnh, hosting mạnh hơn.</li>
  <li><strong>Viết content kèm bàn giao</strong> — không chỉ “khung web trống”.</li>
</ol>

<h2 id="sai-lam">Sai lầm khi chọn web rẻ thay vì chuẩn SEO</h2>

<ul>
  <li>Chọn báo giá thấp nhất, không hỏi checklist SEO bàn giao.</li>
  <li>Kỳ vọng lên top chỉ nhờ “thiết kế chuẩn SEO” — thiếu content và thời gian.</li>
  <li>Chạy ads về homepage chậm / không đo conversion.</li>
  <li>Làm lại web sau 6 tháng vì không index / không đo được — tốn hơn làm đúng lần đầu.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/website#pricing`,
    label: "Dịch vụ thiết kế website",
    desc: "Gói 3–12 triệu có SEO on-page theo cấp.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-chuan-seo`,
    label: "Thiết kế website chuẩn SEO",
    desc: "Checklist kỹ thuật — đọc kèm bài chi phí này.",
  },
  {
    href: `${SITE}/seo-website`,
    label: "Dịch vụ SEO Website",
    desc: "Gói tăng trưởng content sau khi web xong.",
  },
  {
    href: `${SITE}/banggia`,
    label: "Bảng giá tổng hợp",
    desc: "Website · hosting · ads.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Chi phí làm website chuẩn SEO khoảng bao nhiêu?",
      a: "Tại Bứt Phá: 3.000.000đ–12.000.000đ tùy gói (SEO on-page/technical theo cấp). Cộng ~3,7–7,5 triệu domain/hosting năm đầu. Content SEO tháng tính riêng từ ~1 triệu/tháng.",
    },
    {
      q: "Website chuẩn SEO khác website thường thế nào về giá?",
      a: "Gói có SEO nâng cao (thường từ 6 triệu) đầu tư kỹ thuật + on-page + tốc độ hơn gói chỉ “có web”. Web rẻ thiếu SEO thường tốn ads/làm lại sau.",
    },
    {
      q: "Làm web chuẩn SEO có lên top ngay không?",
      a: "Không cam kết top. Website chuẩn SEO là nền (index, đo, on-page). Thứ hạng cần content, thời gian và cạnh tranh ngành — xem dịch vụ SEO Website.",
    },
    {
      q: "SEO trong giá thiết kế gồm viết bài không?",
      a: "Không mặc định. Giá thiết kế gồm nền tảng SEO; viết bài/cluster là gói chăm sóc hoặc SEO tháng.",
    },
    {
      q: "Nên chọn gói nào nếu muốn chuẩn SEO + chạy ads?",
      a: "Gói Tối ưu 6.000.000đ thường phù hợp SME: SEO nâng cao + tốc độ + tích hợp marketing.",
    },
    {
      q: "Bứt Phá hỗ trợ gì?",
      a: "Thiết kế website có SEO on-page theo gói, tư vấn miễn phí scope, hosting, và gói SEO/content sau bàn giao.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `Tóm lại, ${KEYWORD} minh bạch = giá thiết kế có SEO nền (3–12 triệu) + domain/hosting + tùy chọn content SEO. Đừng nhầm “chuẩn SEO” trong hợp đồng thiết kế với cam kết lên top.`,
    `Chọn gói trên /website theo mục tiêu (giới thiệu vs ads+SEO), rồi bổ sung content khi sẵn sàng scale organic.`,
  ],
  ctaLabel: "Xem bảng giá website chuẩn SEO →",
  ctaHref: `${SITE}/website#pricing`,
})}

${wpExternalCta()}
`,
  }),
};

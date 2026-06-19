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

const KEYWORD = "thiết kế website in ấn";
const TITLE = "Thiết Kế Website In Ấn Và Bao Bì Đặt Hàng Online";

export const REWRITE_THIET_KE_WEBSITE_IN_AN_BAO_BI = {
  title: TITLE,
  slug: "thiet-ke-website-in-an-bao-bi",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website xưởng in, đặt in online, báo giá in ấn, website bao bì, portfolio in offset",
  metaTitle: "Thiết Kế Website In Ấn | Bao Bì & Báo Giá 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website in ấn: catalog dịch vụ in, form báo giá, upload file thiết kế và portfolio bao bì. Quy trình 7 bước, giá 6–13 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website in ấn và bao bì đặt hàng online: báo giá, portfolio và vận hành xưởng in tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website In Ấn | Bao Bì & Báo Giá 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "in-an-web-la-gi", label: "Website in ấn là gì?" },
  { id: "dich-vu", label: "Catalog dịch vụ in & bao bì" },
  { id: "cau-truc", label: "Cấu trúc website chuẩn" },
  { id: "bao-gia", label: "Form báo giá & đặt in" },
  { id: "portfolio", label: "Portfolio mẫu in" },
  { id: "upload", label: "Upload file & quy cách" },
  { id: "seo", label: "SEO xưởng in local" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website in ấn</strong> là xây dựng nền tảng web cho xưởng in offset/digital, công ty in ấn quảng cáo và nhà sản xuất <em>bao bì</em> — trưng bày catalog dịch vụ (namecard, brochure, catalogue, hộp giấy, túi, tem nhãn…), <em>form báo giá / đặt in online</em>, upload file thiết kế và portfolio mẫu in thực tế — giảm ping Zalo “in namecard giá bao nhiêu” lặp lại hàng trăm lần.`,
    `Bài viết dành cho chủ xưởng in, sales in ấn và startup packaging đang cần <strong>${KEYWORD}</strong>: cấu trúc catalog dịch vụ, calculator báo giá sơ bộ (tùy chọn), quy trình nhận file, SEO “in namecard [quận]” và mức giá triển khai 2026.`,
  ],
})}

${wpKeyTakeaways([
  "Web in ấn = catalog dịch vụ rõ + form báo giá có spec (số lượng, cán, giấy).",
  "Portfolio mẫu in thật — khách hình dung chất lượng trước khi đặt.",
  "Upload file PDF/AI + checklist quy cách — giảm file lỗi bounce.",
  "Bảng giá tham khảo / calculator — lọc lead, tăng trust.",
  "Bứt Phá: website in ấn 6–13 triệu tùy catalog và form đặt hàng.",
])}

${wpImg(1, "Thiết kế website in ấn bao bì form báo giá và portfolio mẫu in")}

<h2 id="in-an-web-la-gi">Website in ấn &amp; bao bì là gì?</h2>

<p><strong>Website in ấn</strong> phục vụ ngành printing/packaging:</p>
<ul>
  <li><strong>Catalog dịch vụ:</strong> In offset, digital, khổ lớn, bao bì, tem</li>
  <li><strong>Báo giá online:</strong> Form spec → sales báo giá trong 24h</li>
  <li><strong>Đặt hàng:</strong> Upload file, chọn vật liệu, số lượng, giao hàng</li>
  <li><strong>Portfolio:</strong> Ảnh sản phẩm in thực tế — namecard, catalogue, hộp</li>
  <li><strong>Quy cách kỹ thuật:</strong> Bleed, CMYK, file chuẩn — giảm sai sót</li>
  <li><strong>Tracking (nâng cao):</strong> Mã đơn — trạng thái in → giao</li>
</ul>

<p><strong>Thiết kế website in ấn</strong> khác shop TMĐT — sản phẩm <em>custom theo spec</em>, giá phụ thuộc số lượng, giấy, công đoạn cán/màng.</p>

<h2 id="dich-vu">Catalog dịch vụ in ấn &amp; bao bì</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Nhóm</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Sản phẩm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Văn phòng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Namecard, letterhead, envelope, folder</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Marketing</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Brochure, catalogue, flyer, poster, standee</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bao bì</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Hộp giấy, túi giấy, hộp pizza, tem nhãn</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Quảng cáo</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Banner, PP, decal, backdrop, POSM</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đặc biệt</strong></td>
      <td class="border border-indigo-100 px-3 py-2">UV, foil, emboss, số nhảy, tem bảo hành</td>
    </tr>
  </tbody>
</table>

<h2 id="cau-truc">Cấu trúc website in ấn chuẩn</h2>

<ol>
  <li><strong>Trang chủ:</strong> Dịch vụ nổi bật, USP (giao 24h namecard), CTA báo giá</li>
  <li><strong>Dịch vụ in:</strong> Landing từng loại — in namecard, in catalogue…</li>
  <li><strong>Bao bì:</strong> Hộp, túi — quy cách, MOQ, ảnh mẫu</li>
  <li><strong>Bảng giá tham khảo:</strong> Namecard 500 tờ từ X — disclaimer “tùy spec”</li>
  <li><strong>Portfolio:</strong> Filter ngành — F&amp;B, mỹ phẩm, công ty</li>
  <li><strong>Quy cách file:</strong> Template download, hướng dẫn bleed</li>
  <li><strong>Báo giá / Đặt in:</strong> Form + upload file</li>
  <li><strong>Liên hệ:</strong> Xưởng, map, giờ làm việc, Zalo OA</li>
</ol>

<h2 id="bao-gia">Form báo giá &amp; đặt in online</h2>

<h3>Trường form chuẩn</h3>
<ul>
  <li>Loại sản phẩm (dropdown từ catalog)</li>
  <li>Kích thước thành phẩm (mm)</li>
  <li>Loại giấy / vật liệu — Couché 300gsm, Ivory…</li>
  <li>Số lượng — tier 500 / 1000 / 2000</li>
  <li>Công đoạn: Cán màng mặt/sau, UV, cắt bo góc…</li>
  <li>Số màu in, mặt 1 / mặt 2</li>
  <li>Thời gian cần hàng — gấp + phụ thu</li>
  <li>Upload file thiết kế (PDF/AI/CDR)</li>
  <li>SĐT, email — gửi báo giá</li>
</ul>

<h3>Calculator sơ bộ (tùy chọn)</h3>
<p>JavaScript tính giá namecard theo qty + giấy — <em>ước tính</em>, sales confirm sau. Tăng engagement, giảm inquiry rác không có qty.</p>

<h2 id="portfolio">Portfolio mẫu in &amp; case study</h2>

<ul>
  <li><strong>Ảnh macro:</strong> Chi tiết cán màng, foil — chất lượng in</li>
  <li><strong>Mockup thực tế:</strong> Catalogue, hộp trên bàn — không chỉ flat PDF</li>
  <li><strong>Case study:</strong> “Hộp mỹ phẩm brand X — 10k MOQ — 15 ngày”</li>
  <li><strong>Filter:</strong> Ngành khách — F&amp;B, retail, corporate</li>
  <li><strong>Before/after:</strong> File khách → thành phẩm in</li>
</ul>

${wpImg(2, "Portfolio mẫu in namecard catalogue và bao bì trên website xưởng in")}

<h2 id="upload">Upload file, quy cách &amp; giảm lỗi in</h2>

<ul>
  <li><strong>Trang hướng dẫn:</strong> Bleed 3mm, CMYK, font embed, độ phân giải 300dpi</li>
  <li><strong>Template download:</strong> AI/PDF namecard, hộp die-cut</li>
  <li><strong>Checklist trước gửi:</strong> Checkbox xác nhận đã bleed</li>
  <li><strong>Proof duyệt:</strong> Email gửi bản in thử PDF — khách OK mới chạy máy</li>
  <li><strong>Giới hạn file:</strong> Max 50MB — WeTransfer link fallback</li>
</ul>

<h2 id="seo">SEO local cho xưởng in</h2>

<ul>
  <li><strong>Title:</strong> “In namecard [Quận] | In catalogue giá tốt | [Xưởng]”</li>
  <li><strong>Landing từng dịch vụ:</strong> “In hộp giấy đựng mỹ phẩm” — long-tail B2B</li>
  <li><strong>Schema LocalBusiness:</strong> Địa chỉ xưởng, giờ mở</li>
  <li><strong>Blog:</strong> “Chọn giấy in catalogue”, “Quy cách file in offset”</li>
  <li><strong>GBP:</strong> Ảnh xưởng, máy in — trust local</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website in ấn — 7 bước</h2>

<ol>
  <li><strong>Brief xưởng:</strong> Dịch vụ chủ lực, MOQ, khu vực giao.</li>
  <li><strong>Catalog structure:</strong> Nhóm SP, spec form fields từng loại.</li>
  <li><strong>Wireframe:</strong> Báo giá wizard, portfolio filter.</li>
  <li><strong>UI design:</strong> Clean, print-industry — showcase màu sắc in.</li>
  <li><strong>Dev + form/upload:</strong> Email notify sales, file storage.</li>
  <li><strong>Seed portfolio:</strong> 20+ ảnh mẫu in — không launch trống.</li>
  <li><strong>Launch + SEO:</strong> Landing “in namecard”, ads local Google.</li>
</ol>

<p><strong>Thời gian:</strong> 3–6 tuần (catalog + form); +2 tuần calculator/tracking custom.</p>

<h2 id="bang-gia">Bảng giá thiết kế website in ấn 2026</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói Bứt Phá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Bao gồm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Print Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">10 dịch vụ, form báo giá, portfolio, quy cách file</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Print Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">10.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Upload file, bảng giá tham khảo, blog SEO, bao bì landing</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Print Enterprise</strong></td>
      <td class="border border-indigo-100 px-3 py-2">13.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Calculator, CRM, đa chi nhánh, template download CMS</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Landing dịch vụ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">+2.500.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">“In catalogue”, “In hộp giấy” — ads</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website in ấn</h2>

<ul>
  <li>Cam kết giá cố định web — thực tế spec khác nhau, tranh cãi.</li>
  <li>Không có quy cách file — 80% file khách lỗi, tốn thời gian prepress.</li>
  <li>Portfolio ảnh mờ — không thấy chất lượng cán màng, màu.</li>
  <li>Form quá đơn giản — thiếu qty, giấy — sales hỏi lại nhiều vòng.</li>
  <li>Upload không bảo mật — file thiết kế khách lo lộ.</li>
  <li>Web không mobile — khách gửi báo giá từ điện thoại tại quán.</li>
  <li>Ẩn địa chỉ xưởng — khách local không tin.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-catalog-san-pham`,
    label: "Catalog sản phẩm",
    desc: "Showcase B2B.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-form-lien-he`,
    label: "Form liên hệ thông minh",
    desc: "Lead & CRM.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-in-an-quang-cao`,
    label: "Website in ấn quảng cáo",
    desc: "POSM & banner.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn web in ấn",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website in ấn giá bao nhiêu?",
      a: "Tại Bứt Phá từ 6.000.000đ (catalog + form) đến 13.000.000đ (calculator + CRM). Báo giá theo số dịch vụ và upload file.",
    },
    {
      q: "Có tính giá in tự động trên web không?",
      a: "Có thể làm calculator ước tính cho SP đơn giản (namecard). SP phức tạp (hộp bế) vẫn cần sales báo giá thủ công.",
    },
    {
      q: "Khách upload file thiết kế có an toàn không?",
      a: "Form HTTPS + lưu server riêng hoặc cloud — không public. Có thể thêm NDA policy trên web.",
    },
    {
      q: "Web in ấn có cần shop giỏ hàng không?",
      a: "Ít dùng — in custom báo giá trước. Có thể bán template có sẵn hoặc namecard design pack online.",
    },
    {
      q: "SEO “in namecard [quận]” mất bao lâu?",
      a: "2–3 tháng local SEO + landing dịch vụ. Google Ads hiệu quả cho intent “in gấp”.",
    },
    {
      q: "Bao bì hộp giấy có landing riêng không?",
      a: "Có — nên có landing MOQ, quy trình, ảnh hộp mẫu — B2B packaging search riêng.",
    },
    {
      q: "Bao lâu go-live website in ấn?",
      a: "3–6 tuần. Chuẩn bị ảnh portfolio và bảng spec dịch vụ trước.",
    },
    {
      q: "Bứt Phá có thiết kế website in ấn không?",
      a: "Có — xưởng in offset/digital, bao bì, quảng cáo. Form báo giá + portfolio. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website in ấn</strong> hiệu quả = catalog dịch vụ rõ + form báo giá đủ spec + portfolio chất lượng + quy cách file — giảm tải sales Zalo và tăng đơn B2B có qualify.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — loại dịch vụ in, bao bì và báo giá theo quy mô xưởng của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website in ấn",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};

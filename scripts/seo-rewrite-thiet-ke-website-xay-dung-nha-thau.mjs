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

const KEYWORD = "thiết kế website xây dựng";
const TITLE = "Thiết Kế Website Xây Dựng Và Nhà Thầu Chuyên Nghiệp";

export const REWRITE_THIET_KE_WEBSITE_XAY_DUNG_NHA_THAU = {
  title: TITLE,
  slug: "thiet-ke-website-xay-dung-nha-thau",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website nhà thầu, portfolio công trình xây dựng, form báo giá xây dựng, thiết kế web nhà thầu",
  metaTitle: "Thiết Kế Website Xây Dựng | Nhà Thầu & Gallery 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website xây dựng: gallery công trình, form báo giá, hồ sơ năng lực nhà thầu và SEO local. Quy trình 7 bước, giá 6–14 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website xây dựng và nhà thầu: project gallery, báo giá online, trust và SEO tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Xây Dựng | Nhà Thầu & Gallery 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "xay-dung-web-la-gi", label: "Website xây dựng là gì?" },
  { id: "vi-sao-can", label: "Vì sao nhà thầu cần web?" },
  { id: "cau-truc", label: "Cấu trúc website nhà thầu" },
  { id: "gallery", label: "Project gallery công trình" },
  { id: "bao-gia", label: "Form báo giá & khảo sát" },
  { id: "nang-luc", label: "Hồ sơ năng lực online" },
  { id: "seo", label: "SEO local xây dựng" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website xây dựng</strong> là quy trình xây dựng nền tảng web cho nhà thầu, công ty xây dựng và đơn vị thi công — trưng bày <em>project gallery</em> (nhà phố, biệt thự, công trình dân dụng/công nghiệp), dịch vụ thi công trọn gói, form <em>báo giá sơ bộ</em> và hồ sơ năng lực online — giúp chủ đầu tư cá nhân và doanh nghiệp tin tưởng trước khi ký hợp đồng thi công.`,
    `Bài viết dành cho giám đốc nhà thầu, kinh doanh xây dựng và marketer B2B đang cần <strong>${KEYWORD}</strong>: cấu trúc gallery conversion, form qualify lead, SEO “nhà thầu [quận/tỉnh]” và mức giá triển khai 2026 tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Nhà thầu web = gallery công trình thật + form báo giá — trust trước giá rẻ.",
  "Filter dự án: nhà phố / biệt thự / công nghiệp — khách tìm đúng kinh nghiệm.",
  "Form báo giá: diện tích, loại công trình, ngân sách — sales qualify nhanh.",
  "HSNL online thay PDF nặng — xem mobile tại công trình.",
  "Bứt Phá: website xây dựng 6–14 triệu tùy gallery và form CRM.",
])}

${wpImg(1, "Thiết kế website xây dựng nhà thầu project gallery và form báo giá")}

<h2 id="xay-dung-web-la-gi">Website xây dựng / nhà thầu là gì?</h2>

<p><strong>Website xây dựng</strong> phục vụ ngành contractor với:</p>
<ul>
  <li><strong>Giới thiệu công ty:</strong> Năm thành lập, quy mô, giấy phép XD</li>
  <li><strong>Dịch vụ:</strong> Thi công trọn gói, phần thô, hoàn thiện, cải tạo</li>
  <li><strong>Project gallery:</strong> Ảnh công trình đã bàn giao — before/after</li>
  <li><strong>Quy trình:</strong> Khảo sát → báo giá → ký HĐ → thi công → nghiệm thu</li>
  <li><strong>Form lead:</strong> Báo giá, tư vấn, xem mẫu nhà</li>
  <li><strong>Tuyển dụng / đối tác (tùy chọn):</strong> Subcontractor, nhà cung cấp</li>
</ul>

<p><strong>Thiết kế website xây dựng</strong> khác landing page generic — khách đầu tư lớn cần <em>bằng chứng năng lực</em> qua ảnh công trình và thông tin pháp lý rõ ràng.</p>

<h2 id="vi-sao-can">Vì sao nhà thầu cần website chuyên nghiệp?</h2>

<ul>
  <li><strong>Trust:</strong> Xây nhà hàng tỷ — khách Google tên công ty trước khi gặp</li>
  <li><strong>Portfolio 24/7:</strong> Sales gửi link gallery thay album Zalo 200 ảnh</li>
  <li><strong>SEO local:</strong> “Nhà thầu xây dựng Quận 9”, “thi công nhà phố Bình Dương”</li>
  <li><strong>Lead có qualify:</strong> Form thu diện tích, ngân sách — lọc lead rác</li>
  <li><strong>B2B:</strong> Chủ đầu tư, môi giới BĐS xem HSNL online</li>
  <li><strong>Cạnh tranh:</strong> Nhà thầu có web chuyên nghiệp thắng pitch</li>
</ul>

<p>Chi tiết thêm: <a href="${SITE}/blog/thiet-ke-website-cong-ty-xay-dung">website công ty xây dựng</a> và <a href="${SITE}/blog/thiet-ke-website-ho-so-nang-luc">hồ sơ năng lực</a>.</p>

<h2 id="cau-truc">Cấu trúc website nhà thầu chuẩn</h2>

<ol>
  <li><strong>Trang chủ:</strong> Hero công trình tiêu biểu, USP (bảo hành, tiến độ), CTA báo giá</li>
  <li><strong>Dự án:</strong> Gallery filter loại công trình, diện tích, năm</li>
  <li><strong>Chi tiết dự án:</strong> Story, ảnh tiến độ, vật liệu, thời gian thi công</li>
  <li><strong>Dịch vụ:</strong> Trọn gói, phần thô, thiết kế + thi công</li>
  <li><strong>Quy trình làm việc:</strong> Minh bạch 5–7 bước — giảm lo ngại</li>
  <li><strong>Báo giá / Tư vấn:</strong> Form + hotline + Zalo</li>
  <li><strong>Năng lực:</strong> Giấy phép, máy móc, đội ngũ kỹ sư</li>
  <li><strong>Tin tức:</strong> Xu hướng vật liệu, quy định xây dựng — SEO</li>
</ol>

<h2 id="gallery">Project gallery — showcase công trình</h2>

<p>Gallery là yếu tố số 1 trong <strong>${KEYWORD}</strong>:</p>

<ul>
  <li><strong>Ảnh chất lượng:</strong> Hoàn thiện — góc rộng phòng khách, mặt tiền, view aerial (drone nếu có)</li>
  <li><strong>Before/After:</strong> Cải tạo, nâng tầng — slider thuyết phục</li>
  <li><strong>Metadata:</strong> 120m², nhà phố 3 tầng, Quận 7, 2025 — filter được</li>
  <li><strong>Video timelapse:</strong> Embed quá trình thi công — transparency</li>
  <li><strong>Phân loại:</strong> Nhà phố / Biệt thự / Nhà xưởng / Văn phòng</li>
  <li><strong>Lightbox:</strong> Xem chi tiết vật liệu, mỹ thuật</li>
</ul>

${wpImg(2, "Project gallery công trình xây dựng — filter nhà phố biệt thự trên website nhà thầu")}

<h2 id="bao-gia">Form báo giá &amp; khảo sát công trình</h2>

<h3>Trường form qualify lead</h3>
<ul>
  <li>Loại công trình: Nhà phố / Biệt thự / Sửa chữa / Khác</li>
  <li>Diện tích sàn (m²) hoặc kích thước lô đất</li>
  <li>Địa chỉ / quận công trình</li>
  <li>Ngân sách dự kiến — bracket (2–3 tỷ / 3–5 tỷ…)</li>
  <li>Thời gian muốn khởi công</li>
  <li>SĐT, Zalo — sales gọi khảo sát thực địa</li>
  <li>Upload ảnh đất / bản vẽ (tùy chọn)</li>
</ul>

<h3>UX form</h3>
<ul>
  <li>Wizard 3 bước mobile — không 20 trường một trang</li>
  <li>Auto-reply: “Đã nhận — kỹ sư liên hệ trong 24h”</li>
  <li>CRM routing — email sales + Telegram notify</li>
</ul>

<h2 id="nang-luc">Hồ sơ năng lực nhà thầu online</h2>

<ul>
  <li><strong>Giấy phép:</strong> Số GP XD, scan PDF</li>
  <li><strong>ISO / chứng chỉ (nếu có):</strong> An toàn lao động, chất lượng</li>
  <li><strong>Đội ngũ:</strong> Kỹ sư, kiến trúc sư, giám sát — ảnh + kinh nghiệm</li>
  <li><strong>Thiết bị:</strong> Máy móc thi công — capacity</li>
  <li><strong>Đối tác:</strong> Logo chủ đầu tư đã phục vụ (có phép)</li>
  <li><strong>Download PDF HSNL:</strong> Thu email B2B — lead magnet</li>
</ul>

<h2 id="seo">SEO local cho nhà thầu xây dựng</h2>

<ul>
  <li><strong>Title:</strong> “Nhà thầu xây dựng [Quận/Tỉnh] | [Tên công ty]”</li>
  <li><strong>Landing dịch vụ:</strong> “Thi công nhà phố trọn gói TPHCM”</li>
  <li><strong>Schema LocalBusiness / GeneralContractor:</strong> JSON-LD địa chỉ</li>
  <li><strong>Google Business:</strong> Ảnh công trình + link form báo giá</li>
  <li><strong>Blog:</strong> “Chi phí xây nhà phố 2026”, “Quy trình nghiệm thu” — internal link dự án</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website xây dựng — 7 bước</h2>

<ol>
  <li><strong>Brief nhà thầu:</strong> Loại công trình chủ lực, khu vực phục vụ, USP.</li>
  <li><strong>Audit ảnh công trình:</strong> Chọn 15–30 dự án chất lượng — chụp bổ sung nếu thiếu.</li>
  <li><strong>Wireframe:</strong> Gallery filter, form báo giá, trang năng lực.</li>
  <li><strong>UI design:</strong> Solid, professional — xám/xanh/cam CTA, không flashy.</li>
  <li><strong>Dev + CMS:</strong> Upload dự án, form CRM, PDF HSNL.</li>
  <li><strong>Seed content:</strong> 10+ dự án đầy đủ — không launch gallery trống.</li>
  <li><strong>Launch + SEO:</strong> GBP, sitemap, ads local radius (tùy chọn).</li>
</ol>

<p><strong>Thời gian:</strong> 4–7 tuần (gallery + form); 8–10 tuần nếu HSNL phức tạp multi-branch.</p>

<h2 id="bang-gia">Bảng giá thiết kế website xây dựng 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Contractor Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">10 dự án gallery, form báo giá, giới thiệu công ty</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Contractor Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">10.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Filter dự án, HSNL online, blog SEO, before/after</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Contractor Enterprise</strong></td>
      <td class="border border-indigo-100 px-3 py-2">14.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Multi-branch, CRM form, video embed, EN/VN</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Landing dịch vụ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">+3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">“Thi công nhà phố” — ads Google</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website nhà thầu</h2>

<ul>
  <li>Ảnh công trình mờ, chụp điện thoại kém — mất trust dù tay nghề tốt.</li>
  <li>Gallery trống hoặc 2 dự án — khách nghi công ty mới.</li>
  <li>Không có giấy phép XD trên web — red flag pháp lý.</li>
  <li>Form quá dài — chủ đầu tư bỏ giữa chừng trên mobile.</li>
  <li>Copy “giá rẻ nhất” — khách VIP sợ chất lượng kém.</li>
  <li>Ảnh stock công nhân — không phải team thật.</li>
  <li>Không phản hồi inquiry 48h — lead chuyển nhà thầu khác.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-cong-ty-xay-dung`,
    label: "Website công ty xây dựng",
    desc: "Góc nhìn corporate.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-ho-so-nang-luc`,
    label: "Hồ sơ năng lực",
    desc: "HSNL B2B online.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-bat-dong-san-du-an`,
    label: "Website BĐS dự án",
    desc: "Chủ đầu tư liên quan.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn web xây dựng",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website xây dựng giá bao nhiêu?",
      a: "Tại Bứt Phá từ 6.000.000đ (gallery + form) đến 14.000.000đ (HSNL + CRM). Báo giá theo số dự án và tính năng filter.",
    },
    {
      q: "Khác gì website công ty xây dựng?",
      a: "Cùng ngành — bài này dùng từ khóa “thiết kế website xây dựng” rộng, focus nhà thầu + gallery + báo giá. Bài công ty xây dựng đi sâu corporate.",
    },
    {
      q: "Có upload được nhiều ảnh công trình không?",
      a: "Có — CMS gallery không giới hạn hợp lý. Gói Pro tối ưu WebP lazy load cho 50+ dự án.",
    },
    {
      q: "Form báo giá có tích hợp CRM không?",
      a: "Có — email + sheet hoặc HubSpot/Zoho. Gói Enterprise routing sales theo khu vực.",
    },
    {
      q: "SEO “nhà thầu [quận]” mất bao lâu?",
      a: "2–4 tháng local SEO với GBP + blog + landing dịch vụ. Google Ads bù lead giai đoạn đầu.",
    },
    {
      q: "Cần chụp ảnh công trình chuyên nghiệp không?",
      a: "Rất nên — ảnh đẹp = conversion cao. Bứt Phá tư vấn góc chụp; có thể kết nối photographer đối tác.",
    },
    {
      q: "Bao lâu go-live website xây dựng?",
      a: "4–7 tuần nếu có sẵn ảnh dự án. Content gallery là bottleneck chính.",
    },
    {
      q: "Bứt Phá có thiết kế website xây dựng không?",
      a: "Có — nhà thầu nhà phố, biệt thự, công trình dân dụng. Gallery + báo giá + SEO local. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website xây dựng</strong> hiệu quả = project gallery thật + form báo giá qualify + HSNL minh bạch + SEO local — biến “nhà thầu quen miệng” thành thương hiệu có thể scale lead online.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — loại công trình, số dự án gallery và báo giá theo quy mô nhà thầu của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website xây dựng",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};

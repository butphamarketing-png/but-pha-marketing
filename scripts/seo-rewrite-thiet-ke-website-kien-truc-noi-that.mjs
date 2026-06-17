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

const KEYWORD = "thiết kế website kiến trúc nội thất";
const TITLE = "Thiết Kế Website Kiến Trúc Nội Thất Đẹp";

export const REWRITE_THIET_KE_WEBSITE_KIEN_TRUC_NOI_THAT = {
  title: TITLE,
  slug: "thiet-ke-website-kien-truc-noi-that",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website kiến trúc, website nội thất, portfolio kiến trúc, thiết kế web nội thất, studio kiến trúc",
  metaTitle: "Thiết Kế Website Kiến Trúc Nội Thất | SEO | Bứt Phá",
  metaDescription:
    "Thiết kế website kiến trúc nội thất: portfolio phong cách, before/after, form tư vấn, blog xu hướng. Layout tối giản, ảnh lớn. Giá 5–15 triệu. Bứt Phá.",
  description:
    "Hướng dẫn thiết kế website kiến trúc nội thất: portfolio visual, quy trình tư vấn, 3D viewer và SEO cho studio thiết kế.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Kiến Trúc Nội Thất | SEO | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "kien-truc-la-gi", label: "Website kiến trúc nội thất là gì?" },
  { id: "vi-sao-can", label: "Vì sao studio cần web?" },
  { id: "layout-visual", label: "Layout & visual storytelling" },
  { id: "tinh-nang", label: "Tính năng bắt buộc" },
  { id: "portfolio", label: "Portfolio & filter phong cách" },
  { id: "quy-trinh-tu-van", label: "Quy trình tư vấn trên web" },
  { id: "3d-viewer", label: "3D viewer & tour 360°" },
  { id: "cau-truc", label: "Cấu trúc trang chuẩn" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá website" },
  { id: "seo-blog", label: "SEO & blog xu hướng" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website kiến trúc nội thất</strong> là quy trình xây dựng website chuyên biệt cho studio kiến trúc, công ty nội thất và KTS tự do — tập trung <em>portfolio visual</em>: ảnh lớn, layout tối giản, filter phong cách (modern, Indochine, Japandi…) và form tư vấn thiết kế. Khác website xây dựng hay TMĐT, <strong>${KEYWORD}</strong> cần tác phẩm là nhân vật chính — whitespace, typography sang và tốc độ tải ảnh tối ưu.`,
    `Bài viết dành cho chủ studio, KTS và marketer design đang cần <strong>${KEYWORD}</strong>: layout chuẩn ngành, checklist tính năng, quy trình triển khai, giá 2026 và chiến lược SEO + blog xu hướng vật liệu.`,
  ],
})}

${wpKeyTakeaways([
  "Layout tối giản + ảnh lớn — tác phẩm là hero, không nhồi chữ.",
  "Portfolio filter theo phong cách, loại hình (căn hộ, biệt thự, văn phòng).",
  "Before/after và video walkthrough — tăng niềm tin conversion.",
  "Blog xu hướng: Japandi, vật liệu, màu sắc — SEO dài hạn.",
  "Bứt Phá: 5–15 triệu; nhúng tour 360° nếu có file sẵn.",
])}

${wpImg(1, "Thiết kế website kiến trúc nội thất với portfolio phong cách và layout tối giản")}

<h2 id="kien-truc-la-gi">Thiết kế website kiến trúc nội thất là gì?</h2>

<p><strong>Website kiến trúc nội thất</strong> là trang web showcase dự án thiết kế — kiến trúc, nội thất, không gian thương mại. <strong>Thiết kế website kiến trúc nội thất</strong> thường gồm:</p>

<ul>
  <li>Portfolio dự án filter theo phong cách và loại hình</li>
  <li>Gallery before/after, video walkthrough</li>
  <li>Quy trình: khảo sát → concept → bản vẽ → thi công</li>
  <li>Form tư vấn thiết kế miễn phí</li>
  <li>Giới thiệu đội ngũ KTS, stylist</li>
  <li>Blog xu hướng vật liệu, màu sắc, phong cách</li>
  <li>Nhúng tour 3D/360° (tuỳ chọn)</li>
</ul>

<h2 id="vi-sao-can">Vì sao studio kiến trúc cần website riêng?</h2>

<ul>
  <li><strong>Portfolio 24/7:</strong> Khách xem dự án bất kỳ lúc nào — trước khi book tư vấn.</li>
  <li><strong>Positioning:</strong> Phong cách riêng (luxury, minimal, tropical) — phân biệt đối thủ.</li>
  <li><strong>Lead chất lượng:</strong> Form có diện tích, ngân sách, phong cách mong muốn.</li>
  <li><strong>SEO:</strong> “Thiết kế nội thất chung cư [quận]”, “kiến trúc sư [thành phố]”.</li>
  <li><strong>Instagram bổ trợ:</strong> Web là hub chính thức — IG là traffic funnel.</li>
</ul>

<h2 id="layout-visual">Layout &amp; visual storytelling</h2>

<p>Ngành kiến trúc/nội thất có quy tắc UX riêng khi triển khai <strong>${KEYWORD}</strong>:</p>

<ul>
  <li><strong>Whitespace nhiều:</strong> Không chen chúc text — ảnh thở</li>
  <li><strong>Typography sang:</strong> Font serif hoặc geometric tinh tế</li>
  <li><strong>Ảnh full-width:</strong> Hero mỗi dự án — chất lượng cao bắt buộc</li>
  <li><strong>Màu nền trung tính:</strong> Trắng, be, xám — không lấn át tác phẩm</li>
  <li><strong>Lazy-load &amp; WebP:</strong> Gallery nặng — giữ Core Web Vitals</li>
</ul>

<h2 id="tinh-nang">Tính năng website kiến trúc nội thất bắt buộc</h2>

<ul>
  <li><strong>Portfolio filter:</strong> Modern, Indochine, Japandi, Scandinavian…</li>
  <li><strong>Trang dự án chi tiết:</strong> Brief, diện tích, vật liệu, ảnh từng góc</li>
  <li><strong>Before/after slider:</strong> Cải tạo, renovation</li>
  <li><strong>Form tư vấn:</strong> Loại hình, m², ngân sách, phong cách</li>
  <li><strong>Quy trình làm việc:</strong> Minh bạch 4–6 bước</li>
  <li><strong>Đội ngũ:</strong> KTS, học vấn, giải thưởng (nếu có)</li>
  <li><strong>Responsive:</strong> Khách xem portfolio trên iPad/phone tại showroom</li>
</ul>

<h2 id="portfolio">Portfolio &amp; filter phong cách</h2>

<p>Mỗi dự án nên có URL riêng — SEO “thiết kế nội thất căn hộ 80m2”, “nội thất biệt thự phong cách Japandi”.</p>

<ul>
  <li>Tag phong cách + loại hình (căn hộ, penthouse, văn phòng, F&amp;B)</li>
  <li>Ảnh đồng nhất tone màu — professional shoot</li>
  <li>Mô tả ngắn: concept, vật liệu chủ đạo, thời gian hoàn thiện</li>
  <li>CTA: “Dự án tương tự? Tư vấn miễn phí”</li>
</ul>

${wpImg(9, "Gallery portfolio kiến trúc nội thất — filter phong cách trên website")}

<h2 id="quy-trinh-tu-van">Quy trình tư vấn hiển thị trên website</h2>

<ol>
  <li><strong>Tiếp nhận &amp; khảo sát:</strong> Form hoặc gọi — thu brief ban đầu</li>
  <li><strong>Concept &amp; moodboard:</strong> Phong cách, màu, vật liệu</li>
  <li><strong>Bản vẽ 2D/3D:</strong> Layout, nội thất chi tiết</li>
  <li><strong>Duyệt &amp; chỉnh sửa:</strong> Vòng feedback rõ ràng</li>
  <li><strong>Thi công / giám sát:</strong> (nếu studio có hạng mục này)</li>
  <li><strong>Bàn giao &amp; chụp ảnh:</strong> Portfolio mới cho web</li>
</ol>

<p>Studio có hạng mục thi công xem thêm <a href="${SITE}/blog/thiet-ke-website-cong-ty-xay-dung">thiết kế website công ty xây dựng</a>.</p>

<h2 id="3d-viewer">Tích hợp 3D viewer &amp; tour 360°</h2>

<ul>
  <li>Nhúng iframe tour 360° (Matterport, Kuula…) trên trang dự án</li>
  <li>Link file SketchUp / Enscape render cho khách B2B</li>
  <li>Video walkthrough YouTube/Vimeo — không host file nặng trên server</li>
  <li>Lưu ý mobile: tour 360° cần fallback ảnh tĩnh</li>
</ul>

<h2 id="cau-truc">Cấu trúc website kiến trúc nội thất (10–15 trang)</h2>

<ol>
  <li><strong>Trang chủ:</strong> Hero dự án nổi bật, phong cách chủ đạo.</li>
  <li><strong>Dự án / Portfolio:</strong> Hub filter + trang chi tiết.</li>
  <li><strong>Dịch vụ:</strong> Kiến trúc, nội thất, styling, giám sát.</li>
  <li><strong>Quy trình:</strong> Cách làm việc với studio.</li>
  <li><strong>Về chúng tôi:</strong> Triết lý thiết kế, đội ngũ.</li>
  <li><strong>Blog / Xu hướng:</strong> SEO content.</li>
  <li><strong>Tư vấn miễn phí:</strong> Form lead.</li>
  <li><strong>Liên hệ:</strong> Showroom, Maps.</li>
</ol>

<h2 id="quy-trinh">Quy trình thiết kế website — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Phong cách studio, đối tượng khách, dự án mẫu.</li>
  <li><strong>Moodboard web:</strong> Layout tham chiếu (Pinterest, site quốc tế).</li>
  <li><strong>UI design:</strong> Typography, grid ảnh, animation nhẹ.</li>
  <li><strong>Lập trình:</strong> Gallery, filter, form, lazy-load ảnh.</li>
  <li><strong>Nội dung &amp; ảnh:</strong> Chụp lại dự án hoặc retouch ảnh có sẵn.</li>
  <li><strong>SEO:</strong> Meta từng dự án, blog pillar xu hướng.</li>
  <li><strong>Go-live:</strong> Link bio Instagram, namecard, QR showroom.</li>
</ol>

<p><strong>Thời gian:</strong> 5–10 tuần tùy số dự án portfolio và mức animation.</p>

<h2 id="bang-gia">Bảng giá thiết kế website kiến trúc nội thất 2026</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Studio nhỏ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">5.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">KTS tự do, 8–10 trang, gallery đơn giản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Chuyên nghiệp</strong></td>
      <td class="border border-indigo-100 px-3 py-2">8.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Filter phong cách, form tư vấn, SEO</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Premium</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Animation, 3D embed, blog, CRO</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Agency</strong></td>
      <td class="border border-indigo-100 px-3 py-2">15.000.000đ+</td>
      <td class="border border-indigo-100 px-3 py-2">Đa thương hiệu, đa ngôn ngữ (báo giá thêm)</td>
    </tr>
  </tbody>
</table>

<h2 id="seo-blog">SEO &amp; blog xu hướng nội thất</h2>

<ul>
  <li><strong>Từ khóa:</strong> “thiết kế nội thất chung cư”, “phong cách Japandi”, “kiến trúc sư [tỉnh]”</li>
  <li><strong>Blog pillar:</strong> Xu hướng màu, vật liệu, tips thi công</li>
  <li><strong>Mỗi dự án = landing SEO:</strong> Long-tail theo loại hình + khu vực</li>
  <li><strong>Schema:</strong> Organization, ProfessionalService</li>
</ul>

<p>Tham khảo <a href="${SITE}/blog/thiet-ke-website-theo-yeu-cau">thiết kế website theo yêu cầu</a> cho studio cần custom cao.</p>

<h2 id="sai-lam">Sai lầm khi làm website kiến trúc nội thất</h2>

<ul>
  <li>Layout rối — quá nhiều màu/font, lấn át tác phẩm</li>
  <li>Ảnh điện thoại kém — portfolio cần ảnh chuyên nghiệp</li>
  <li>Không có form tư vấn — chỉ Instagram DM, mất lead có brief</li>
  <li>Web chậm vì ảnh raw — bounce cao</li>
  <li>Không cập nhật dự án mới — khách nghĩ studio ngừng hoạt động</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-cong-ty-xay-dung`,
    label: "Website xây dựng",
    desc: "Studio có hạng mục thi công.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-cong-ty`,
    label: "Website công ty",
    desc: "Corporate studio lớn.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-theo-yeu-cau`,
    label: "Website theo yêu cầu",
    desc: "Custom layout cao cấp.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Quy trình tổng quan.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn website kiến trúc",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website kiến trúc nội thất giá bao nhiêu?",
      a: "Tại Bứt Phá từ 5.000.000đ (studio nhỏ) đến 15.000.000đ+ (agency). 3D/tour embed báo giá thêm.",
    },
    {
      q: "Website kiến trúc nên dùng layout gì?",
      a: "Layout tối giản, nhiều whitespace, ảnh lớn chất lượng cao — để tác phẩm là nhân vật chính.",
    },
    {
      q: "Có cần blog không?",
      a: "Nên có — blog thu hút traffic từ khóa 'thiết kế nội thất + phong cách' và xây authority.",
    },
    {
      q: "Tích hợp 3D viewer được không?",
      a: "Có — nhúng tour 360° hoặc link SketchUp/Enscape nếu có file sẵn.",
    },
    {
      q: "KTS tự do 1 người có cần web không?",
      a: "Có — portfolio chuyên nghiệp tăng giá trị perception và giá dịch vụ.",
    },
    {
      q: "Làm web kiến trúc mất bao lâu?",
      a: "5–10 tuần tùy số dự án portfolio và mức animation.",
    },
    {
      q: "Instagram đủ thay web chưa?",
      a: "Chưa — IG là funnel; web là hub chính thức, SEO và form brief đầy đủ.",
    },
    {
      q: "Bứt Phá có làm website kiến trúc nội thất không?",
      a: "Có — tư vấn Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website kiến trúc nội thất</strong> là đầu tư showcase tác phẩm và thu lead tư vấn — với layout tối giản, portfolio filter phong cách và blog xu hướng SEO dài hạn.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — từ KTS tự do đến studio đa chi nhánh.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website kiến trúc nội thất",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};

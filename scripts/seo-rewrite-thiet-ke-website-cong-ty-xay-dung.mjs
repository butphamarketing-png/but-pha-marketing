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

const KEYWORD = "thiết kế website công ty xây dựng";
const TITLE = "Thiết Kế Website Công Ty Xây Dựng Chuyên Nghiệp";

export const REWRITE_THIET_KE_WEBSITE_CONG_TY_XAY_DUNG = {
  title: TITLE,
  slug: "thiet-ke-website-cong-ty-xay-dung",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website xây dựng, website nhà thầu, thiết kế web công ty xây dựng, portfolio công trình, báo giá xây dựng online",
  metaTitle: "Thiết Kế Website Công Ty Xây Dựng | SEO | Bứt Phá",
  metaDescription:
    "Thiết kế website công ty xây dựng: portfolio công trình, form báo giá, hồ sơ năng lực, SEO local nhà thầu. Giá 4–12 triệu. Tư vấn Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website công ty xây dựng: showcase công trình, báo giá minh bạch, SEO địa phương và quy trình triển khai cho nhà thầu.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Công Ty Xây Dựng | SEO | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "xay-dung-la-gi", label: "Website xây dựng là gì?" },
  { id: "vi-sao-can", label: "Vì sao nhà thầu cần web?" },
  { id: "tinh-nang", label: "Tính năng bắt buộc" },
  { id: "portfolio", label: "Portfolio công trình" },
  { id: "bao-gia-form", label: "Form báo giá & khảo sát" },
  { id: "nang-luc", label: "Trang năng lực nhà thầu" },
  { id: "cau-truc", label: "Cấu trúc trang chuẩn" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá website xây dựng" },
  { id: "seo-local", label: "SEO local nhà thầu" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website công ty xây dựng</strong> là quy trình xây dựng website chuyên biệt cho nhà thầu, công ty xây dựng và đơn vị thi công — tập trung <em>portfolio công trình thực tế</em>, form báo giá/khảo sát, hồ sơ năng lực (giấy phép, máy móc, đội ngũ) và SEO local “xây dựng + tỉnh/thành”. Khác website TMĐT hay spa, <strong>${KEYWORD}</strong> cần truyền tải uy tín, minh bạch tiến độ và bảo hành.`,
    `Bài viết dành cho giám đốc công ty xây dựng, kỹ sư trưởng và marketer B2B đang cần <strong>${KEYWORD}</strong>: checklist tính năng, cấu trúc trang, quy trình triển khai, giá 2026 và chiến lược SEO địa phương cho nhà thầu.`,
  ],
})}

${wpKeyTakeaways([
  "Portfolio công trình thật — quyết định niềm tin trước khi gọi báo giá.",
  "Form báo giá + khảo sát hiện trường — thu lead có thông tin dự án.",
  "Trang năng lực: giấy phép, máy móc, đội ngũ kỹ sư — B2B cần minh bạch.",
  "SEO local: “xây dựng nhà phố [tỉnh]”, “nhà thầu uy tín [thành phố]”.",
  "Bứt Phá: 4–12 triệu; landing theo hạng mục (trọn gói, phần thô, cải tạo).",
])}

${wpImg(2, "Thiết kế website công ty xây dựng với portfolio công trình và form báo giá")}

<h2 id="xay-dung-la-gi">Thiết kế website công ty xây dựng là gì?</h2>

<p><strong>Website công ty xây dựng</strong> là trang web thiết kế riêng cho nhà thầu — showcase năng lực thi công, công trình đã hoàn thiện và kênh nhận yêu cầu báo giá. <strong>Thiết kế website công ty xây dựng</strong> thường gồm:</p>

<ul>
  <li>Portfolio: nhà phố, biệt thự, nhà xưởng, cải tạo</li>
  <li>Form báo giá / khảo sát hiện trường</li>
  <li>Hồ sơ năng lực: giấy phép, ISO, máy móc, nhân sự</li>
  <li>Quy trình thi công minh bạch từng giai đoạn</li>
  <li>Blog kỹ thuật — SEO “chi phí xây nhà”, “quy trình thi công”</li>
  <li>Landing theo dịch vụ: trọn gói, phần thô, hoàn thiện</li>
</ul>

<h2 id="vi-sao-can">Vì sao công ty xây dựng cần website riêng?</h2>

<ul>
  <li><strong>Uy tín:</strong> Khách hàng tra Google trước khi ký hợp đồng — web nghèo nàn = mất niềm tin.</li>
  <li><strong>Lead chất lượng:</strong> Form có diện tích, địa điểm, ngân sách — sales tiết kiệm thời gian.</li>
  <li><strong>SEO local:</strong> “Nhà thầu xây dựng [quận/huyện]” — traffic organic B2C &amp; B2B.</li>
  <li><strong>Thương hiệu:</strong> Phân biệt với đội thợ nhỏ không có web — positioning cao cấp.</li>
  <li><strong>Tài liệu B2B:</strong> PDF catalog, hồ sơ năng lực tải về cho chủ đầu tư.</li>
</ul>

<h2 id="tinh-nang">Tính năng website xây dựng bắt buộc</h2>

<ul>
  <li><strong>Gallery công trình:</strong> Ảnh before/after, diện tích, thời gian thi công</li>
  <li><strong>Form báo giá:</strong> Loại công trình, m², địa chỉ, ngân sách dự kiến</li>
  <li><strong>Trang dịch vụ:</strong> Xây mới, cải tạo, phần thô, nội thất</li>
  <li><strong>Năng lực:</strong> Giấy phép XD, chứng chỉ, đội ngũ kỹ sư</li>
  <li><strong>Cam kết:</strong> Bảo hành, tiến độ, vật liệu minh bạch</li>
  <li><strong>Zalo/Hotline:</strong> CTA nổi bật — khách xây dựng thích gọi nhanh</li>
  <li><strong>Schema Organization + LocalBusiness:</strong> Google Maps</li>
</ul>

<h2 id="portfolio">Portfolio công trình — showcase đúng cách</h2>

<p>Khi triển khai <strong>${KEYWORD}</strong>, portfolio là phần quan trọng nhất:</p>

<ul>
  <li>Mỗi công trình một trang riêng — SEO “xây biệt thự [khu vực]”</li>
  <li>Ảnh chất lượng cao: tiến độ, chi tiết thi công, hoàn thiện</li>
  <li>Thông tin: diện tích, thời gian, hạng mục, vật liệu (nếu được phép)</li>
  <li>Phân loại filter: nhà phố / biệt thự / công nghiệp / cải tạo</li>
  <li>Video timelapse (nếu có) — tăng engagement</li>
</ul>

${wpImg(6, "Portfolio công trình xây dựng trên website nhà thầu chuyên nghiệp")}

<h2 id="bao-gia-form">Form báo giá &amp; khảo sát hiện trường</h2>

<p>Form nên thu đủ thông tin để sales báo giá sơ bộ:</p>

<ul>
  <li>Loại công trình: nhà phố, biệt thự, nhà xưởng…</li>
  <li>Diện tích sàn / số tầng</li>
  <li>Địa chỉ thi công (quận, tỉnh)</li>
  <li>Hạng mục: trọn gói, phần thô, hoàn thiện</li>
  <li>Ngân sách dự kiến (khoảng)</li>
  <li>Upload ảnh hiện trạng / bản vẽ (tuỳ chọn)</li>
</ul>

<p>Tham khảo <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a> để hiểu cách minh bạch giá dịch vụ web.</p>

<h2 id="nang-luc">Trang năng lực &amp; hồ sơ nhà thầu</h2>

<ul>
  <li>Giấy phép kinh doanh, chứng chỉ hành nghề xây dựng</li>
  <li>ISO, an toàn lao động (nếu có)</li>
  <li>Danh sách máy móc, thiết bị thi công</li>
  <li>Đội ngũ: kỹ sư, kiến trúc sư, giám sát</li>
  <li>Đối tác vật liệu, nhà cung cấp</li>
  <li>PDF hồ sơ năng lực tải về — cho tender B2B</li>
</ul>

<h2 id="cau-truc">Cấu trúc website công ty xây dựng (10–14 trang)</h2>

<ol>
  <li><strong>Trang chủ:</strong> USP, công trình nổi bật, CTA báo giá.</li>
  <li><strong>Giới thiệu:</strong> Lịch sử, tầm nhìn, đội ngũ.</li>
  <li><strong>Dịch vụ:</strong> Hub + landing từng loại hình thi công.</li>
  <li><strong>Công trình:</strong> Portfolio filter + trang chi tiết.</li>
  <li><strong>Quy trình thi công:</strong> Minh bạch từng bước.</li>
  <li><strong>Báo giá / Khảo sát:</strong> Form lead.</li>
  <li><strong>Năng lực:</strong> Giấy phép, máy móc, chứng chỉ.</li>
  <li><strong>Blog kỹ thuật:</strong> SEO dài hạn.</li>
  <li><strong>Tuyển dụng:</strong> (tuỳ chọn) thu hút kỹ sư.</li>
  <li><strong>Liên hệ:</strong> Maps, hotline, văn phòng.</li>
</ol>

<h2 id="quy-trinh">Quy trình thiết kế website xây dựng — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Loại công trình chủ lực, khu vực phục vụ, đối thủ local.</li>
  <li><strong>Sitemap:</strong> Ưu tiên portfolio + form báo giá.</li>
  <li><strong>UI design:</strong> Tone mạnh mẽ, chuyên nghiệp — ảnh công trình lớn.</li>
  <li><strong>Lập trình:</strong> Gallery, form, Maps, GA4 lead tracking.</li>
  <li><strong>Nội dung:</strong> Mô tả công trình, quy trình — có thể hỗ trợ copywriting.</li>
  <li><strong>SEO:</strong> Từ khóa địa phương, schema, Google Business Profile.</li>
  <li><strong>Go-live:</strong> Gắn web lên namecard, xe, biển công trình QR.</li>
</ol>

<p><strong>Thời gian:</strong> 4–8 tuần tùy số trang và số công trình portfolio.</p>

<h2 id="bang-gia">Bảng giá thiết kế website công ty xây dựng 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Cơ bản</strong></td>
      <td class="border border-indigo-100 px-3 py-2">4.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Đội thợ nhỏ, 5–8 trang, form liên hệ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Chuyên nghiệp</strong></td>
      <td class="border border-indigo-100 px-3 py-2">7.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Portfolio 15+ công trình, báo giá, SEO local</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Doanh nghiệp</strong></td>
      <td class="border border-indigo-100 px-3 py-2">10.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">HSNL PDF, landing đa dịch vụ, blog kỹ thuật</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Premium</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ+</td>
      <td class="border border-indigo-100 px-3 py-2">Đa chi nhánh, đa tỉnh, CRO form (báo giá thêm)</td>
    </tr>
  </tbody>
</table>

<h2 id="seo-local">SEO local cho nhà thầu xây dựng</h2>

<ul>
  <li><strong>Từ khóa:</strong> “xây dựng nhà phố [tỉnh]”, “nhà thầu uy tín [quận]”, “thi công biệt thự [khu vực]”</li>
  <li><strong>Trang địa phương:</strong> Landing “Xây dựng tại Bình Dương”, “TP.HCM”…</li>
  <li><strong>Google Business Profile:</strong> Ảnh công trình, review khách</li>
  <li><strong>Schema:</strong> Organization, LocalBusiness, có địa chỉ thật</li>
  <li><strong>Case study:</strong> Mỗi công trình = 1 URL indexable</li>
</ul>

<p>Xem <a href="${SITE}/blog/thiet-ke-website-tphcm">thiết kế website TPHCM</a> hoặc <a href="${SITE}/blog/thiet-ke-website-ha-noi">thiết kế website Hà Nội</a> cho SEO địa phương.</p>

<h2 id="sai-lam">Sai lầm khi làm website xây dựng</h2>

<ul>
  <li>Ảnh stock — khách phát hiện không phải công trình thật</li>
  <li>Không có form báo giá — chỉ SĐT, lead kém chất lượng</li>
  <li>Portfolio lẫn lộn — không phân loại loại hình thi công</li>
  <li>Web chậm mobile — chủ nhà tìm kiếm trên điện thoại</li>
  <li>Không cập nhật công trình mới — web trông “chết”</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-cong-ty`,
    label: "Website công ty",
    desc: "Corporate tổng quan.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-doanh-nghiep`,
    label: "Website doanh nghiệp",
    desc: "B2B & thương hiệu.",
  },
  {
    href: `${SITE}/blog/bao-gia-thiet-ke-website`,
    label: "Báo giá thiết kế website",
    desc: "Minh bạch chi phí web.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Quy trình tổng quan.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn website xây dựng",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website công ty xây dựng giá bao nhiêu?",
      a: "Tại Bứt Phá từ 4.000.000đ (cơ bản) đến 12.000.000đ+ (premium đa chi nhánh).",
    },
    {
      q: "Website xây dựng cần highlight gì?",
      a: "Công trình thực tế, tiến độ cam kết, bảo hành và minh bạch báo giá từng hạng mục.",
    },
    {
      q: "SEO cho nhà thầu local thế nào?",
      a: "Tối ưu “xây dựng + tỉnh/thành”, schema Organization và case study có địa chỉ cụ thể.",
    },
    {
      q: "Có upload catalog PDF không?",
      a: "Có — kết hợp trang web và PDF hồ sơ năng lực tải về cho khách B2B/tender.",
    },
    {
      q: "Đội thợ 10 người có cần web không?",
      a: "Nên có — web cơ bản + portfolio + Zalo vẫn tốt hơn không có gì trên Google.",
    },
    {
      q: "Làm web xây dựng mất bao lâu?",
      a: "4–8 tuần tùy số công trình portfolio và tính năng form.",
    },
    {
      q: "Có cần blog kỹ thuật không?",
      a: "Nên có — SEO “chi phí xây nhà”, “quy trình thi công” kéo traffic dài hạn.",
    },
    {
      q: "Bứt Phá có làm website công ty xây dựng không?",
      a: "Có — tư vấn Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website công ty xây dựng</strong> là đầu tư uy tín và kênh lead cho nhà thầu — với portfolio thật, form báo giá thông minh và SEO local mạnh theo từng khu vực phục vụ.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — từ đội thợ vừa đến công ty đa chi nhánh.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website công ty xây dựng",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};

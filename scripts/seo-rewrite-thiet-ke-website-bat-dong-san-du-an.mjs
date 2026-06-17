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

const KEYWORD = "thiết kế website bất động sản dự án";
const TITLE = "Thiết Kế Website Bất Động Sản Dự Án Chuẩn SEO";

export const REWRITE_THIET_KE_WEBSITE_BAT_DONG_SAN_DU_AN = {
  title: TITLE,
  slug: "thiet-ke-website-bat-dong-san-du-an",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website dự án bất động sản, landing dự án BĐS, website chủ đầu tư, showcase căn hộ, form tham quan dự án",
  metaTitle: "Thiết Kế Website Bất Động Sản Dự Án | SEO | Bứt Phá",
  metaDescription:
    "Thiết kế website bất động sản dự án: landing chủ đầu tư, gallery căn mẫu, form tham quan, pixel ads. SEO dự án BĐS. Giá 6–15 triệu. Tư vấn Bứt Phá.",
  description:
    "Hướng dẫn thiết kế website bất động sản dự án: landing conversion, mặt bằng căn, tiện ích, pháp lý và quy trình triển khai cho CDT.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Bất Động Sản Dự Án | SEO | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "du-an-la-gi", label: "Website dự án BĐS là gì?" },
  { id: "vs-tong-quan", label: "Khác website BĐS tổng quát" },
  { id: "vi-sao-can", label: "Vì sao CDT cần landing riêng?" },
  { id: "tinh-nang", label: "Tính năng bắt buộc" },
  { id: "landing-conversion", label: "Landing & conversion" },
  { id: "gallery-can-mau", label: "Gallery & căn mẫu" },
  { id: "tien-ich-phap-ly", label: "Tiện ích & pháp lý" },
  { id: "ads-pixel", label: "Ads, pixel & retargeting" },
  { id: "cau-truc", label: "Cấu trúc trang dự án" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá website dự án" },
  { id: "seo-du-an", label: "SEO cho từng dự án" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website bất động sản dự án</strong> là quy trình xây dựng landing và microsite chuyên cho <em>từng dự án</em> hoặc chủ đầu tư — showcase căn hộ mẫu, tiện ích nội khu, tiến độ thi công, pháp lý và form đăng ký tham quan tối ưu conversion. Khác website sàn/listing tổng quát, <strong>${KEYWORD}</strong> tập trung kể câu chuyện một dự án, chạy ads Facebook/Google và thu lead chất lượng cho đội sales.`,
    `Bài viết dành cho marketing chủ đầu tư, agency BĐS và đơn vị phân phối đang cần <strong>${KEYWORD}</strong>: checklist landing, gallery căn mẫu, tích hợp pixel, quy trình triển khai, giá 2026 và SEO theo tên dự án + khu vực.`,
  ],
})}

${wpKeyTakeaways([
  "Mỗi dự án = landing/microsite riêng — URL cho ads campaign.",
  "Hero video flycam + 3 USP — conversion trong 5 giây đầu.",
  "Form ngắn: tên, SĐT, căn quan tâm — mobile sticky CTA.",
  "Gallery căn mẫu, mặt bằng tầng, tiện ích — đủ để khách gọi.",
  "Bứt Phá: 6–15 triệu/dự án; multi-dự án báo giá gói.",
])}

${wpImg(3, "Thiết kế website bất động sản dự án với landing và form tham quan nhà mẫu")}

<h2 id="du-an-la-gi">Thiết kế website bất động sản dự án là gì?</h2>

<p><strong>Website dự án bất động sản</strong> là landing hoặc microsite dành riêng cho một dự án (căn hộ, đất nền, shophouse…) — không phải sàn liệt kê hàng trăm tin. <strong>Thiết kế website bất động sản dự án</strong> thường gồm:</p>

<ul>
  <li>Trang chủ dự án: hero, USP, CTA tham quan</li>
  <li>Tiện ích nội khu: hồ bơi, gym, công viên, trường học gần</li>
  <li>Mặt bằng &amp; typology căn hộ</li>
  <li>Gallery căn mẫu / nội thất</li>
  <li>Chính sách bán hàng, bảng giá đợt mở bán</li>
  <li>Pháp lý: chủ đầu tư, giấy phép, tiến độ</li>
  <li>Form đăng ký + pixel tracking ads</li>
</ul>

<p>Xem tổng quan tại <a href="${SITE}/blog/thiet-ke-website-bat-dong-san">thiết kế website bất động sản</a>.</p>

<h2 id="vs-tong-quan">Website dự án vs website BĐS tổng quát</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Website dự án</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Website sàn/listing</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Mục tiêu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Bán 1 dự án, thu lead ads</td>
      <td class="border border-indigo-100 px-3 py-2">Nhiều dự án, SEO tổng</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Nội dung</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Sâu: tiện ích, pháp lý, căn mẫu</td>
      <td class="border border-indigo-100 px-3 py-2">Rộng: filter, nhiều tin</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Ads</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Landing tối ưu conversion</td>
      <td class="border border-indigo-100 px-3 py-2">Traffic organic chính</td>
    </tr>
  </tbody>
</table>

<h2 id="vi-sao-can">Vì sao chủ đầu tư cần website dự án riêng?</h2>

<ul>
  <li><strong>Kiểm soát thông điệp:</strong> Không phụ thuộc mô tả sàn — kể đúng USP dự án.</li>
  <li><strong>Ads hiệu quả:</strong> Landing một mục tiêu — tỷ lệ form cao hơn trang chủ chung.</li>
  <li><strong>Lead riêng:</strong> Data khách thuộc CDT — phân bổ đại lý/sales nội bộ.</li>
  <li><strong>SEO tên dự án:</strong> “[Tên dự án] + giá + quận” — chiếm SERP khi mở bán.</li>
  <li><strong>Uy tín:</strong> Microsite chuyên nghiệp — so với chỉ post Facebook.</li>
</ul>

<h2 id="tinh-nang">Tính năng website dự án BĐS bắt buộc</h2>

<ul>
  <li><strong>Hero mạnh:</strong> Video flycam hoặc ảnh panorama</li>
  <li><strong>USP 3–5 điểm:</strong> Vị trí, chủ đầu tư, tiện ích, giá</li>
  <li><strong>Mặt bằng tương tác:</strong> Click tầng → xem typology (nếu có)</li>
  <li><strong>Bảng giá / chính sách:</strong> Cập nhật theo đợt bán</li>
  <li><strong>Form tham quan:</strong> 3–4 trường — tên, SĐT, căn, thời gian</li>
  <li><strong>Hotline + Zalo sticky</strong> trên mobile</li>
  <li><strong>Maps:</strong> Vị trí + tiện ích lân cận</li>
</ul>

<h2 id="landing-conversion">Landing page &amp; tối ưu conversion</h2>

<p>Khi triển khai <strong>${KEYWORD}</strong>, conversion là KPI số 1:</p>

<ul>
  <li>Above the fold: CTA “Đăng ký tham quan” + hotline</li>
  <li>Social proof: chủ đầu tư, dự án đã giao của CĐT</li>
  <li>Countdown / số suất ưu đãi (nếu có — trung thực)</li>
  <li>Form popup sau 30s hoặc scroll 50% (không spam)</li>
  <li>Thank-you page + pixel conversion event</li>
</ul>

<h2 id="gallery-can-mau">Gallery căn mẫu &amp; mặt bằng</h2>

<ul>
  <li>Ảnh căn mẫu: phòng khách, bếp, phòng ngủ — có thước đo cảm nhận</li>
  <li>Typology: 1PN, 2PN, 3PN — diện tích, hướng ban công</li>
  <li>So sánh căn: bảng nhanh giúp khách chọn</li>
  <li>Video walkthrough căn mẫu (YouTube embed)</li>
</ul>

${wpImg(5, "Gallery căn hộ mẫu trên website dự án bất động sản")}

<h2 id="tien-ich-phap-ly">Tiện ích nội khu &amp; thông tin pháp lý</h2>

<ul>
  <li><strong>Tiện ích:</strong> Infographic hoặc icon grid — dễ scan mobile</li>
  <li><strong>Pháp lý:</strong> Tên CĐT, sở hữu lâu dài/50 năm, giấy phép XD</li>
  <li><strong>Tiến độ:</strong> Ảnh thi công cập nhật hàng quý</li>
  <li><strong>Ngân hàng liên kết:</strong> Logo bank hỗ trợ vay (nếu có)</li>
</ul>

<h2 id="ads-pixel">Facebook/Google Ads &amp; pixel tracking</h2>

<ul>
  <li>Meta Pixel + Conversion API — tối ưu lead ads</li>
  <li>Google Ads tag — remarketing khách đã vào web</li>
  <li>UTM chuẩn — biết lead từ kênh nào</li>
  <li>Landing riêng URL cho từng campaign A/B test</li>
</ul>

<h2 id="cau-truc">Cấu trúc microsite dự án (8–12 section)</h2>

<ol>
  <li>Hero + CTA</li>
  <li>Tổng quan dự án &amp; vị trí</li>
  <li>Tiện ích nội / ngoại khu</li>
  <li>Mặt bằng &amp; typology</li>
  <li>Gallery căn mẫu</li>
  <li>Chính sách &amp; bảng giá</li>
  <li>Chủ đầu tư &amp; pháp lý</li>
  <li>Tiến độ thi công</li>
  <li>Đăng ký tham quan (form)</li>
  <li>FAQ dự án</li>
</ol>

<h2 id="quy-trinh">Quy trình thiết kế website dự án — 7 bước</h2>

<ol>
  <li><strong>Brief marketing:</strong> USP, đối tượng, kênh ads chính.</li>
  <li><strong>Wireframe landing:</strong> Luồng scroll → form.</li>
  <li><strong>UI design:</strong> Premium — đồng bộ brochure dự án.</li>
  <li><strong>Lập trình:</strong> Responsive, form, pixel, Maps.</li>
  <li><strong>Nội dung:</strong> Copy từ marketing CDT, ảnh flycam/căn mẫu.</li>
  <li><strong>QA + PageSpeed:</strong> Test form, mobile, LCP ảnh hero.</li>
  <li><strong>Go-live:</strong> Gắn ads, đào tạo sales nhận lead CRM.</li>
</ol>

<p><strong>Thời gian:</strong> 4–6 tuần/dự án (landing đơn); 6–10 tuần nếu microsite đầy đủ.</p>

<h2 id="bang-gia">Bảng giá thiết kế website BĐS dự án 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Landing</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">1 trang scroll, form, pixel cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Microsite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">10.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">8–12 section, gallery căn, mặt bằng</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Premium</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Video hero, CRO, A/B landing</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Multi-dự án</strong></td>
      <td class="border border-indigo-100 px-3 py-2">15.000.000đ+</td>
      <td class="border border-indigo-100 px-3 py-2">Template lặp nhiều dự án (báo giá gói)</td>
    </tr>
  </tbody>
</table>

<h2 id="seo-du-an">SEO theo tên dự án &amp; khu vực</h2>

<ul>
  <li><strong>Từ khóa:</strong> “[Tên dự án] giá”, “căn hộ [tên] [quận]”</li>
  <li><strong>Meta unique:</strong> Mỗi dự án title/description riêng</li>
  <li><strong>Schema:</strong> ApartmentComplex / RealEstateListing (phù hợp loại hình)</li>
  <li><strong>Blog CDT:</strong> Tin tức dự án — index nhanh khi mở bán</li>
</ul>

<p>Tham khảo <a href="${SITE}/blog/thiet-ke-website-kien-truc-noi-that">thiết kế website kiến trúc nội thất</a> cho showcase căn mẫu.</p>

<h2 id="sai-lam">Sai lầm khi làm website dự án BĐS</h2>

<ul>
  <li>Trỏ ads về trang chủ CĐT — conversion thấp</li>
  <li>Form 10+ trường — mobile khách bỏ cuộc</li>
  <li>Giá/chính sách cũ — khiếu nại, mất uy tín</li>
  <li>Không gắn pixel — không tối ưu ads được</li>
  <li>Ảnh render quá đẹp so với thực tế — kỳ vọng sai</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-bat-dong-san`,
    label: "Website bất động sản",
    desc: "Listing & sàn tổng quát.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-kien-truc-noi-that`,
    label: "Website kiến trúc nội thất",
    desc: "Căn mẫu & visual.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-ban-hang`,
    label: "Website bán hàng",
    desc: "CRO & landing.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Quy trình tổng quan.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn website dự án BĐS",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website bất động sản dự án giá bao nhiêu?",
      a: "Tại Bứt Phá từ 6.000.000đ (landing) đến 15.000.000đ+ (multi-dự án). CRM/pixel nâng cao báo giá thêm.",
    },
    {
      q: "Landing hay microsite — chọn gì?",
      a: "Mở bán nhanh: landing scroll. Dự án lớn, nhiều đợt: microsite đầy đủ section.",
    },
    {
      q: "Có tích hợp Facebook Lead Ads không?",
      a: "Có — pixel + form web hoặc sync lead từ Facebook về CRM/Sheet.",
    },
    {
      q: "Bao lâu làm xong một dự án?",
      a: "4–6 tuần landing; 6–10 tuần microsite đầy đủ (tùy duyệt nội dung CDT).",
    },
    {
      q: "Có làm nhiều dự án cùng template không?",
      a: "Có — template lặp giảm chi phí dự án thứ 2 trở đi.",
    },
    {
      q: "Mobile có quan trọng không?",
      a: "Rất quan trọng — phần lớn lead ads đến từ điện thoại.",
    },
    {
      q: "Có hỗ trợ chạy ads không?",
      a: "Bứt Phá tư vấn landing + pixel; chạy ads có thể kết hợp gói marketing riêng.",
    },
    {
      q: "Bứt Phá có làm website dự án BĐS không?",
      a: "Có — tư vấn Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website bất động sản dự án</strong> là đầu tư conversion cho từng đợt mở bán — landing chuyên sâu, form tham quan và pixel ads giúp chủ đầu tư sở hữu lead chất lượng.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — landing mở bán nhanh hoặc microsite đa đợt.`,
  ],
  ctaLabel: "→ Tư vấn website bất động sản dự án",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};

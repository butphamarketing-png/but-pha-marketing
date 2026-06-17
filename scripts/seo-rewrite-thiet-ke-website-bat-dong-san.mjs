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

const KEYWORD = "thiết kế website bất động sản";
const TITLE = "Thiết Kế Website Bất Động Sản Thu Hút Khách Hàng";

export const REWRITE_THIET_KE_WEBSITE_BAT_DONG_SAN = {
  title: TITLE,
  slug: "thiet-ke-website-bat-dong-san",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website bất động sản, website nhà đất, listing BĐS, website dự án bất động sản, landing dự án",
  metaTitle: "Thiết Kế Website Bất Động Sản | SEO & Lead | Bứt Phá",
  metaDescription:
    "Thiết kế website bất động sản: listing filter, trang dự án, form tham quan, Maps, CRM lead. SEO nhà đất theo khu vực. Giá 5–15 triệu. Bứt Phá.",
  description:
    "Hướng dẫn thiết kế website bất động sản: listing dự án, landing chủ đầu tư, form lead, tích hợp bản đồ và SEO local BĐS.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Bất Động Sản | SEO & Lead | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "bds-la-gi", label: "Website BĐS là gì?" },
  { id: "vi-sao-can", label: "Vì sao cần web riêng?" },
  { id: "vs-san", label: "Website vs sàn BĐS" },
  { id: "tinh-nang", label: "Tính năng bắt buộc" },
  { id: "listing", label: "Listing & filter dự án" },
  { id: "trang-chi-tiet", label: "Trang chi tiết BĐS" },
  { id: "landing-du-an", label: "Landing từng dự án" },
  { id: "crm-lead", label: "CRM & quản lý lead" },
  { id: "cau-truc", label: "Cấu trúc trang chuẩn" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá website BĐS" },
  { id: "seo-local", label: "SEO & mobile BĐS" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website bất động sản</strong> là quy trình xây dựng website chuyên biệt cho sàn, chủ đầu tư, môi giới và dự án BĐS — tập trung <em>listing dự án</em> với filter giá/diện tích/khu vực, trang chi tiết gallery + pháp lý, form đăng ký tham quan và landing riêng từng dự án. Khác website doanh nghiệp thông thường, <strong>${KEYWORD}</strong> cần mobile-first, Maps tích hợp và CRM gắn lead theo dự án/sales.`,
    `Bài viết dành cho giám đốc kinh doanh BĐS, marketing dự án và môi giới đang cần <strong>${KEYWORD}</strong>: so sánh web vs sàn, checklist tính năng, quy trình triển khai, giá 2026 và chiến lược SEO “nhà đất + khu vực”.`,
  ],
})}

${wpKeyTakeaways([
  "Listing filter: giá, diện tích, quận, loại hình — UX quyết định conversion.",
  "Trang dự án: gallery, mặt bằng, tiện ích, pháp lý — đủ để khách quyết định gọi.",
  "Form tham quan nhà mẫu + hotline sticky mobile.",
  "CRM lead: theo dự án, nguồn, nhân viên sales — không bỏ sót khách.",
  "Bứt Phá: 5–15 triệu; landing riêng cho từng chủ đầu tư.",
])}

${wpImg(2, "Thiết kế website bất động sản với listing dự án và form đăng ký tham quan")}

<h2 id="bds-la-gi">Thiết kế website bất động sản là gì?</h2>

<p><strong>Website bất động sản</strong> là trang web showcase dự án, căn hộ, đất nền — cho phép khách tìm kiếm, xem chi tiết và để lại thông tin liên hệ. <strong>Thiết kế website bất động sản</strong> thường gồm:</p>

<ul>
  <li>Listing: filter giá, diện tích, khu vực, loại hình</li>
  <li>Trang chi tiết: gallery, mặt bằng, tiện ích, pháp lý</li>
  <li>Form đăng ký tham quan nhà mẫu / nhận báo giá</li>
  <li>Landing page riêng cho từng dự án/chủ đầu tư</li>
  <li>Bản đồ vị trí: Google Maps, quy hoạch (nếu có)</li>
  <li>Blog phân tích thị trường, quy hoạch khu vực</li>
  <li>CRM hoặc tích hợp quản lý lead</li>
</ul>

<h2 id="vi-sao-can">Vì sao doanh nghiệp BĐS cần website riêng?</h2>

<ul>
  <li><strong>Sở hữu lead:</strong> Sàn thu phí, cạnh tranh — web chủ đầu tư giữ data khách.</li>
  <li><strong>Thương hiệu dự án:</strong> Landing riêng kể câu chuyện, tiện ích, chủ đầu tư uy tín.</li>
  <li><strong>SEO dài hạn:</strong> “Căn hộ [quận]”, “đất nền [tỉnh]” — traffic organic miễn phí.</li>
  <li><strong>Chạy ads hiệu quả:</strong> Landing tối ưu conversion cho Facebook/Google Ads.</li>
  <li><strong>Minh bạch pháp lý:</strong> Giấy phép, tiến độ — tăng niềm tin trước khi đặt cọc.</li>
</ul>

<h2 id="vs-san">Website BĐS vs sàn (Batdongsan, Chợ Tốt…)</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Website riêng</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Sàn BĐS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Lead</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Thuộc về bạn, CRM riêng</td>
      <td class="border border-indigo-100 px-3 py-2">Chia sẻ, phí đăng tin</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Brand</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Kiểm soát hoàn toàn</td>
      <td class="border border-indigo-100 px-3 py-2">Tin giống đối thủ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Khuyến nghị</strong></td>
      <td class="border border-indigo-100 px-3 py-2" colspan="2">Sàn lấy volume + web riêng cho dự án &amp; ads landing</td>
    </tr>
  </tbody>
</table>

<h2 id="tinh-nang">Tính năng website bất động sản bắt buộc</h2>

<ul>
  <li><strong>Listing + filter:</strong> Giá, m², phòng ngủ, quận, trạng thái</li>
  <li><strong>Trang chi tiết:</strong> Ảnh, video flycam, mặt bằng tầng</li>
  <li><strong>Form lead:</strong> Tham quan, báo giá, tư vấn vay</li>
  <li><strong>Maps:</strong> Vị trí dự án, tiện ích xung quanh</li>
  <li><strong>Mobile-first:</strong> Hotline click-to-call, Zalo</li>
  <li><strong>Landing dự án:</strong> URL riêng cho ads campaign</li>
  <li><strong>Schema RealEstateListing / Apartment:</strong> Rich snippet (tuỳ loại)</li>
</ul>

<h2 id="listing">Listing dự án &amp; bộ lọc thông minh</h2>

<p>Khi triển khai <strong>${KEYWORD}</strong>, listing là trang quan trọng nhất:</p>

<ul>
  <li>Filter đa tiêu chí — kết quả realtime (hoặc reload nhanh)</li>
  <li>Card dự án: ảnh, giá “từ …”, vị trí, tiện ích nổi bật</li>
  <li>Sắp xếp: mới nhất, giá thấp→cao, diện tích</li>
  <li>SEO: URL /du-an/[slug], /can-ho/[quan]</li>
</ul>

<p>Xem thêm <a href="${SITE}/blog/thiet-ke-website-bat-dong-san-du-an">thiết kế website bất động sản dự án</a> cho landing chủ đầu tư.</p>

<h2 id="trang-chi-tiet">Trang chi tiết BĐS — gallery &amp; pháp lý</h2>

<ul>
  <li>Gallery: ngoại cảnh, nội thất mẫu, tiện ích</li>
  <li>Mặt bằng: tầng typology, diện tích từng căn</li>
  <li>Bảng giá / chính sách bán hàng (cập nhật theo đợt)</li>
  <li>Pháp lý: sổ hồng, giấy phép xây dựng, chủ đầu tư</li>
  <li>Tiến độ thi công (dự án đang bán)</li>
  <li>CTA sticky: “Đăng ký tham quan”</li>
</ul>

${wpImg(6, "Trang chi tiết dự án bất động sản — gallery và mặt bằng căn hộ")}

<h2 id="landing-du-an">Landing page từng dự án / chủ đầu tư</h2>

<p>Mỗi dự án lớn nên có landing riêng cho chiến dịch marketing:</p>

<ul>
  <li>Hero video flycam + USP 3 điểm</li>
  <li>Tiện ích nội khu: hồ bơi, gym, công viên…</li>
  <li>Chính sách ưu đãi đợt mở bán</li>
  <li>Form ngắn — tên, SĐT, căn quan tâm</li>
  <li>Pixel Facebook/Google — retargeting</li>
</ul>

<h2 id="crm-lead">CRM &amp; quản lý lead BĐS</h2>

<ul>
  <li>Lead từ form → phân bổ theo dự án / sales phụ trách</li>
  <li>Ghi nguồn: organic, ads, Zalo, walk-in</li>
  <li>Nhắc follow-up — không để lead nguội &gt; 24h</li>
  <li>Tích hợp: Google Sheet, HubSpot, CRM BĐS chuyên dụng</li>
</ul>

<h2 id="cau-truc">Cấu trúc website bất động sản (12–20 trang)</h2>

<ol>
  <li><strong>Trang chủ:</strong> Dự án nổi bật, tìm kiếm nhanh, CTA.</li>
  <li><strong>Dự án / Listing:</strong> Hub + filter.</li>
  <li><strong>Chi tiết dự án:</strong> Template lặp cho từng dự án.</li>
  <li><strong>Chủ đầu tư:</strong> Uy tín, dự án đã bàn giao.</li>
  <li><strong>Dịch vụ:</strong> Ký gửi, cho thuê, tư vấn đầu tư (tuỳ mô hình).</li>
  <li><strong>Tin tức / Phân tích:</strong> SEO thị trường.</li>
  <li><strong>Tuyển dụng / Môi giới:</strong> (tuỳ chọn)</li>
  <li><strong>Liên hệ:</strong> Sàn giao dịch, hotline.</li>
</ol>

<h2 id="quy-trinh">Quy trình thiết kế website BĐS — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Mô hình (CDT, sàn, môi giới), số dự án, khu vực.</li>
  <li><strong>Sitemap:</strong> Listing vs landing dự án.</li>
  <li><strong>UI design:</strong> Premium feel — ảnh lớn, font sang.</li>
  <li><strong>Lập trình:</strong> Filter, form, Maps, mobile CTA.</li>
  <li><strong>Nội dung:</strong> Copy dự án, pháp lý — từ marketing CDT.</li>
  <li><strong>SEO + ads:</strong> Landing tối ưu conversion, pixel.</li>
  <li><strong>Go-live:</strong> CRM, đào tạo sales nhận lead.</li>
</ol>

<p><strong>Thời gian:</strong> 6–10 tuần tùy số dự án và tích hợp CRM.</p>

<h2 id="bang-gia">Bảng giá thiết kế website bất động sản 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Môi giới</strong></td>
      <td class="border border-indigo-100 px-3 py-2">5.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Cá nhân/nhóm nhỏ, listing đơn giản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Sàn / Agency</strong></td>
      <td class="border border-indigo-100 px-3 py-2">8.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Filter, nhiều dự án, form CRM cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Chủ đầu tư</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Landing từng dự án, flycam, ads landing</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Enterprise</strong></td>
      <td class="border border-indigo-100 px-3 py-2">15.000.000đ+</td>
      <td class="border border-indigo-100 px-3 py-2">Đa dự án, CRM nâng cao, đa miền (báo giá thêm)</td>
    </tr>
  </tbody>
</table>

<h2 id="seo-local">SEO local &amp; mobile cho BĐS</h2>

<ul>
  <li><strong>Từ khóa:</strong> “Căn hộ [quận]”, “đất nền [huyện]”, “dự án [tên]”</li>
  <li><strong>Mobile:</strong> 70%+ traffic — hotline sticky, form ngắn</li>
  <li><strong>Maps:</strong> Google Business + nhúng bản đồ dự án</li>
  <li><strong>Blog:</strong> Quy hoạch, phân tích giá khu vực — authority</li>
</ul>

<p>Xem <a href="${SITE}/blog/thiet-ke-website-tphcm">thiết kế website TPHCM</a> cho BĐS khu vực TP.HCM.</p>

<h2 id="sai-lam">Sai lầm khi làm website bất động sản</h2>

<ul>
  <li>Ảnh render cũ — khách nghi ngờ tiến độ thực tế</li>
  <li>Giá không cập nhật — mất niềm tin</li>
  <li>Form dài — mobile khách bỏ cuộc</li>
  <li>Không có hotline — BĐS cần gọi ngay</li>
  <li>Lead không phân bổ sales — khách chờ lâu, mất đơn</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-bat-dong-san-du-an`,
    label: "Website BĐS dự án",
    desc: "Landing chủ đầu tư.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-cong-ty`,
    label: "Website công ty",
    desc: "Corporate sàn BĐS.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-kien-truc-noi-that`,
    label: "Website kiến trúc",
    desc: "Showroom & mẫu căn.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Quy trình tổng quan.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn website BĐS",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website bất động sản giá bao nhiêu?",
      a: "Tại Bứt Phá từ 5.000.000đ (môi giới) đến 15.000.000đ+ (enterprise). CRM tích hợp báo giá thêm.",
    },
    {
      q: "Website BĐS có cần CRM riêng không?",
      a: "Nên có — quản lý lead theo dự án, nguồn và sales để không bỏ sót khách.",
    },
    {
      q: "Có tích hợp bản đồ được không?",
      a: "Có — Google Maps, OpenStreetMap hoặc bản đồ quy hoạch tương tác.",
    },
    {
      q: "Mobile có quan trọng không?",
      a: "Rất quan trọng — khách thường xem nhà và gọi ngay từ điện thoại.",
    },
    {
      q: "Môi giới cá nhân có cần web không?",
      a: "Nên có — listing + profile uy tín tốt hơn chỉ profile sàn.",
    },
    {
      q: "Làm web BĐS mất bao lâu?",
      a: "6–10 tuần tùy số dự án và tích hợp CRM.",
    },
    {
      q: "Có làm landing riêng cho ads không?",
      a: "Có — mỗi dự án một landing tối ưu conversion + pixel tracking.",
    },
    {
      q: "Bứt Phá có làm website bất động sản không?",
      a: "Có — tư vấn Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website bất động sản</strong> là đầu tư sở hữu lead, thương hiệu dự án và kênh SEO dài hạn — với listing thông minh, landing ads và CRM không bỏ sót khách hàng.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — từ môi giới đến chủ đầu tư đa dự án.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website bất động sản",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};

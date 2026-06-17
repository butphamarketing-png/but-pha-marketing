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

const KEYWORD = "thiết kế website nhà hàng";
const TITLE = "Thiết Kế Website Nhà Hàng Chuyên Nghiệp";

export const REWRITE_THIET_KE_WEBSITE_NHA_HANG = {
  title: TITLE,
  slug: "thiet-ke-website-nha-hang",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website nhà hàng, website đặt bàn, menu online nhà hàng, thiết kế web nhà hàng, website ẩm thực",
  metaTitle: "Thiết Kế Website Nhà Hàng | Menu & Đặt Bàn | Bứt Phá",
  metaDescription:
    "Thiết kế website nhà hàng: menu online, đặt bàn, gallery, SEO local & Google Maps. Quy trình 7 bước, giá 3–12 triệu. Tư vấn Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website nhà hàng chuyên nghiệp: thực đơn online, đặt bàn, voucher, SEO Maps và quy trình triển khai.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Nhà Hàng | Menu & Đặt Bàn | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "nha-hang-la-gi", label: "Website nhà hàng là gì?" },
  { id: "vi-sao-can", label: "Vì sao nhà hàng cần web?" },
  { id: "tinh-nang", label: "Tính năng bắt buộc" },
  { id: "menu-online", label: "Menu online & QR" },
  { id: "cau-truc", label: "Cấu trúc trang chuẩn" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá website nhà hàng" },
  { id: "seo-local", label: "SEO local & Maps" },
  { id: "chon-doi-tac", label: "Chọn đối tác thiết kế" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website nhà hàng</strong> là quy trình xây dựng website chuyên biệt cho nhà hàng, quán ăn, cafe và F&amp;B — tập trung <em>thực đơn online</em>, đặt bàn theo giờ, gallery không gian, combo ưu đãi và SEO local để khách tìm “nhà hàng [món/khu vực]” trên Google trước khi đến ăn. Khác Fanpage chỉ đăng ảnh món, <strong>${KEYWORD}</strong> chuẩn giúp bạn sở hữu kênh đặt bàn 24/7, giảm tải tổng đài và tích lũy review uy tín.`,
    `Bài viết dành cho chủ nhà hàng, quản lý F&amp;B và marketer ẩm thực đang cần <strong>${KEYWORD}</strong>: checklist tính năng menu/đặt bàn, cấu trúc trang, quy trình triển khai, mức giá 2026 và cách kết hợp website với Google Maps — thực chiến tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Nhà hàng cần web: menu có giá, đặt bàn, Maps — khách check trước khi đến.",
  "Menu online + QR: cập nhật giá/món nhanh, không in lại menu giấy.",
  "Mobile-first: khách tìm nhà hàng và gọi điện/đặt bàn trên điện thoại.",
  "Bứt Phá: gói 3–12 triệu; form đặt bàn + Zalo xác nhận.",
  "SEO: “nhà hàng + món + quận”, schema Restaurant.",
])}

${wpImg(5, "Thiết kế website nhà hàng chuyên nghiệp với menu online và đặt bàn")}

<h2 id="nha-hang-la-gi">Thiết kế website nhà hàng là gì?</h2>

<p><strong>Website nhà hàng</strong> là trang web thiết kế riêng cho ngành F&amp;B — không dùng template shop hay corporate chung. <strong>Thiết kế website nhà hàng</strong> ưu tiên:</p>

<ul>
  <li><strong>Thực đơn online:</strong> Ảnh món, giá, filter (chay, cay, đặc sản, combo)</li>
  <li><strong>Đặt bàn:</strong> Chọn ngày, giờ, số khách, ghi chú (sinh nhật, ghế trẻ em…)</li>
  <li><strong>Gallery:</strong> Không gian, bàn VIP, sự kiện, tiệc cưới</li>
  <li><strong>Giờ mở cửa &amp; Maps:</strong> Embed Google Maps, hướng dẫn đỗ xe</li>
  <li><strong>Ưu đãi / voucher:</strong> Landing combo nhóm, doanh nghiệp, lễ Tết</li>
  <li><strong>Đặt ship (tùy chọn):</strong> Link GrabFood/ShopeeFood hoặc form giao hàng</li>
</ul>

<h2 id="vi-sao-can">Vì sao nhà hàng &amp; quán ăn cần website?</h2>

<ul>
  <li><strong>Google trước Grab/Facebook:</strong> “lẩu cua đồng quận 7”, “nhà hàng view sông đà nẵng” — web + Maps quyết định lựa chọn.</li>
  <li><strong>Giảm gọi điện đặt bàn:</strong> Form online 24/7, xác nhận Zalo — đặc biệt cuối tuần.</li>
  <li><strong>Menu luôn cập nhật:</strong> Đổi giá, thêm món mùa — không cần in menu mới.</li>
  <li><strong>Tiệc cưới / sự kiện:</strong> Trang riêng set menu, sức chứa, form báo giá tiệc.</li>
  <li><strong>Chạy ads:</strong> Landing “combo 2 người 299k” — message match quảng cáo Meta/TikTok.</li>
</ul>

<h2 id="tinh-nang">Tính năng website nhà hàng bắt buộc</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tính năng</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Mục đích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Menu online</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Ảnh + giá, danh mục khai vị/món chính/tráng miệng</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đặt bàn</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Giờ, số khách — giảm overbooking nếu có xác nhận</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>QR menu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Khách quét tại bàn — cùng URL menu web</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Nút Zalo / gọi</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Sticky mobile — hỏi bàn trống nhanh</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Review Google</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Nhúng đánh giá — social proof ẩm thực</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Trang tiệc / sự kiện</strong></td>
      <td class="border border-indigo-100 px-3 py-2">B2B, wedding — lead giá trị cao</td>
    </tr>
  </tbody>
</table>

<h2 id="menu-online">Menu online &amp; menu QR — xu hướng 2026</h2>

<p>Sau giai đoạn QR menu bùng nổ, <strong>${KEYWORD}</strong> hiện nay cần:</p>

<ul>
  <li>Menu web <strong>tải nhanh</strong> — ảnh món nén WebP, lazy-load</li>
  <li>Cập nhật giá trong admin — không cần developer mỗi lần đổi</li>
  <li>Đa ngôn ngữ (tùy chọn) — khu du lịch, khách quốc tế</li>
  <li>Icon chay, cay, best-seller — giúp khách chọn nhanh</li>
  <li>Link QR in sẵn trên bàn — trỏ về URL menu trên website</li>
</ul>

<p>Bài chuyên sâu menu: <a href="${SITE}/blog/thiet-ke-website-nha-hang-menu">thiết kế website nhà hàng menu</a>.</p>

${wpImg(0, "Menu online nhà hàng — thực đơn có ảnh và giá trên website")}

<h2 id="cau-truc">Cấu trúc trang website nhà hàng (7–9 trang)</h2>

<ol>
  <li><strong>Trang chủ:</strong> Hero món signature, CTA đặt bàn, giờ mở cửa.</li>
  <li><strong>Thực đơn:</strong> Danh mục món — có thể filter.</li>
  <li><strong>Giới thiệu:</strong> Câu chuyện thương hiệu, đầu bếp.</li>
  <li><strong>Không gian:</strong> Gallery phòng lạnh/nóng, sân vườn, phòng VIP.</li>
  <li><strong>Đặt bàn:</strong> Form tập trung.</li>
  <li><strong>Ưu đãi / Sự kiện:</strong> Combo, tiệc cưới, đặt phòng riêng.</li>
  <li><strong>Liên hệ:</strong> Maps, đỗ xe, nhiều chi nhánh (chuỗi).</li>
  <li><strong>Blog (tùy chọn):</strong> “Món mới”, “Bí quyết nấu…” — SEO.</li>
</ol>

<h2 id="quy-trinh">Quy trình thiết kế website nhà hàng — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Loại hình (fine dining, quán nhậu, cafe), khách mục tiêu, chi nhánh.</li>
  <li><strong>Wireframe:</strong> Luồng menu → đặt bàn; duyệt mobile trước.</li>
  <li><strong>UI design:</strong> Food photography layout — appetite appeal.</li>
  <li><strong>Lập trình:</strong> CMS menu, form booking, Zalo, GA4.</li>
  <li><strong>Nội dung:</strong> Ảnh món chụp chuyên nghiệp — quan trọng nhất F&amp;B.</li>
  <li><strong>SEO on-page:</strong> “nhà hàng [món] [quận]”, schema Restaurant.</li>
  <li><strong>Go-live:</strong> In QR menu, đồng bộ Google Business Profile.</li>
</ol>

<p><strong>Thời gian:</strong> 3–5 tuần cho website nhà hàng 7–9 trang.</p>

<h2 id="bang-gia">Bảng giá thiết kế website nhà hàng 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Giới thiệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Quán nhỏ, menu đơn giản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tối ưu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Menu đầy đủ, đặt bàn, SEO local</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Kinh doanh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Landing combo, tiệc, pixel ads</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hệ thống</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Chuỗi nhà hàng, đa chi nhánh</td>
    </tr>
  </tbody>
</table>

<h2 id="seo-local">SEO local &amp; Google Maps cho nhà hàng</h2>

<ul>
  <li><strong>Từ khóa:</strong> “nhà hàng [món] [quận]”, “quán [đặc sản] [đường]”.</li>
  <li><strong>Schema Restaurant:</strong> Giờ mở cửa, priceRange, servesCuisine.</li>
  <li><strong>Google Business Profile:</strong> Ảnh món, menu, link đặt bàn từ web.</li>
  <li><strong>Review:</strong> Nhắc khách review sau bữa ăn — ảnh hưởng Maps ranking.</li>
  <li><strong>Ảnh món alt text:</strong> Mô tả có từ khóa tự nhiên.</li>
</ul>

<h2 id="chon-doi-tac">Chọn đối tác thiết kế website nhà hàng</h2>

<ul>
  <li>Portfolio F&amp;B — menu đẹp trên mobile</li>
  <li>Hiểu food photography layout — không chỉ template generic</li>
  <li>Demo đặt bàn + cập nhật menu trong admin</li>
  <li>Bảo hành đổi giá món, thêm combo mùa lễ</li>
</ul>

<h2 id="sai-lam">Sai lầm khi làm website nhà hàng</h2>

<ul>
  <li>Chỉ dùng Facebook — mất SEO “nhà hàng gần tôi”.</li>
  <li>Menu PDF trên mobile — khó đọc, bounce cao.</li>
  <li>Ảnh món kém — food không hấp dẫn = không đặt bàn.</li>
  <li>Không ghi giờ mở cửa / nghỉ trưa — khách đến nhầm giờ.</li>
  <li>Form đặt bàn không xác nhận — overbooking cuối tuần.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-nha-hang-menu`,
    label: "Website nhà hàng menu",
    desc: "Chuyên sâu menu online & QR.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-da-nang`,
    label: "Website Đà Nẵng",
    desc: "F&B & du lịch miền Trung.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Quy trình và giá tổng quan.",
  },
  {
    href: `${SITE}/website`,
    label: "Đăng ký làm website nhà hàng",
    desc: "Tư vấn Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website nhà hàng giá bao nhiêu?",
      a: "Tại Bứt Phá từ 3.000.000đ đến 12.000.000đ. Chuỗi nhiều chi nhánh hoặc đa ngôn ngữ báo giá sau khảo sát.",
    },
    {
      q: "Website nhà hàng có cần đặt bàn online?",
      a: "Rất nên có — giảm tải tổng đài, quản lý bàn tốt hơn, đặc biệt cuối tuần và lễ.",
    },
    {
      q: "Có thể bán voucher trên website không?",
      a: "Có — form đặt voucher + thanh toán MoMo/VNPay hoặc xác nhận Zalo tùy gói.",
    },
    {
      q: "SEO local cho nhà hàng ra sao?",
      a: "Tối ưu “nhà hàng + món + khu vực”, schema Restaurant, đồng bộ Google Maps và review.",
    },
    {
      q: "Menu QR có cần website riêng không?",
      a: "Nên có — một URL menu web vừa QR tại bàn vừa SEO Google; dễ cập nhật giá.",
    },
    {
      q: "Làm web nhà hàng mất bao lâu?",
      a: "Thường 3–5 tuần. Phụ thuộc số món, ảnh chụp và tính năng đặt bàn.",
    },
    {
      q: "Chuỗi 3 chi nhánh làm một web được không?",
      a: "Được — chọn chi nhánh, Maps từng cơ sở; menu có thể chung hoặc khác nhau.",
    },
    {
      q: "Bứt Phá có làm website nhà hàng không?",
      a: "Có — tư vấn theo loại hình F&B. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website nhà hàng</strong> chuyên nghiệp giúp khách xem menu, đặt bàn và tìm thấy bạn trên Google — song song với GrabFood và mạng xã hội. Đầu tư đúng: ảnh món đẹp, mobile nhanh, đặt bàn dễ và SEO Maps mạnh.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — timeline và báo giá theo quy mô nhà hàng của bạn.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website nhà hàng",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};

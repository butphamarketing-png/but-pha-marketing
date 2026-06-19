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

const KEYWORD = "thiết kế website bán hàng đa kênh";
const TITLE = "Thiết Kế Website Bán Hàng Đa Kênh Tích Hợp Sàn";

export const REWRITE_THIET_KE_WEBSITE_BAN_HANG_OMNI = {
  title: TITLE,
  slug: "thiet-ke-website-ban-hang-omni",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "bán hàng đa kênh, omnichannel ecommerce, tích hợp shopee website, đồng bộ tồn kho sàn",
  metaTitle: "Thiết Kế Website Bán Hàng Đa Kênh | Tích Hợp Sàn 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website bán hàng đa kênh: đồng bộ Shopee, Lazada, TikTok Shop và web riêng. OMS, tồn kho realtime, quy trình 7 bước. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website bán hàng đa kênh tích hợp sàn TMĐT: đồng bộ tồn kho, OMS, social commerce và chiến lược omnichannel.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Bán Hàng Đa Kênh | Tích Hợp Sàn 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "omni-la-gi", label: "Bán hàng đa kênh là gì?" },
  { id: "vi-sao-can", label: "Vì sao cần web + sàn?" },
  { id: "mo-hinh", label: "Mô hình omnichannel VN" },
  { id: "vai-tro-web", label: "Vai trò website trung tâm" },
  { id: "tich-hop-san", label: "Tích hợp Shopee, Lazada, TikTok" },
  { id: "dong-bo-ton", label: "Đồng bộ tồn kho & SKU" },
  { id: "oms", label: "OMS — quản lý đơn tập trung" },
  { id: "social-commerce", label: "Social commerce & livestream" },
  { id: "gia-khuyen-mai", label: "Giá & khuyến mãi đa kênh" },
  { id: "cong-nghe", label: "Nền tảng & công cụ tích hợp" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "checklist", label: "Checklist go-live" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website bán hàng đa kênh</strong> (omnichannel ecommerce) là xây dựng cửa hàng web riêng làm <em>trung tâm thương hiệu và dữ liệu</em>, đồng thời kết nối Shopee, Lazada, TikTok Shop, Facebook Shop, Zalo OA và cửa hàng offline — quản lý sản phẩm, tồn kho, đơn hàng và khách hàng từ một hệ thống thay vì nhập liệu thủ công từng kênh.`,
    `Bài viết dành cho chủ brand D2C, shop đang bán sàn muốn mở web riêng, và team vận hành cần <strong>${KEYWORD}</strong>: chiến lược kênh, kiến trúc tích hợp, công cụ OMS phổ biến tại Việt Nam, quy trình triển khai và mức giá 2026 — thực chiến, không lý thuyết suông.`,
  ],
})}

${wpKeyTakeaways([
  "Web riêng = thương hiệu + CRM + SEO; sàn = traffic sẵn — kết hợp cả hai.",
  "Đồng bộ tồn kho realtime tránh oversell — yêu cầu số 1 omnichannel.",
  "OMS tập trung: 1 dashboard xử lý đơn web + Shopee + TikTok + offline.",
  "Giá/khuyến mãi khác kênh cần quy tắc rõ — tránh khách so giá phàn nàn.",
  "Bứt Phá: web TMĐT + tích hợp sàn từ 12–25 triệu tùy số kênh và SKU.",
])}

${wpImg(1, "Thiết kế website bán hàng đa kênh tích hợp Shopee Lazada và TikTok Shop")}

<h2 id="omni-la-gi">Bán hàng đa kênh (omnichannel) là gì?</h2>

<p><strong>Bán hàng đa kênh</strong> (multichannel / omnichannel) là chiến lược bán sản phẩm trên <em>nhiều touchpoint</em> — website riêng, sàn TMĐT, mạng xã hội, livestream, cửa hàng vật lý — với trải nghiệm thống nhất về thương hiệu, giá (theo chính sách) và dịch vụ khách hàng.</p>

<p><strong>Thiết kế website bán hàng đa kênh</strong> không chỉ là “làm thêm một trang web”. Nó bao gồm:</p>

<ul>
  <li><strong>Website TMĐT</strong> trên tên miền riêng — catalog, checkout, blog SEO</li>
  <li><strong>Marketplace:</strong> Shopee, Lazada, Tiki, Sendo, TikTok Shop</li>
  <li><strong>Social commerce:</strong> Facebook Shop, Instagram, Zalo Mini App</li>
  <li><strong>Offline:</strong> POS cửa hàng — đồng bộ tồn kho</li>
  <li><strong>Hậu mãi:</strong> CRM, email, ZNS — một profile khách xuyên kênh</li>
</ul>

<p>Phân biệt nhanh:</p>
<ul>
  <li><strong>Multichannel:</strong> Bán nhiều kênh — dữ liệu có thể tách rời</li>
  <li><strong>Omnichannel:</strong> Bán nhiều kênh — dữ liệu và vận hành <em>liên thông</em></li>
</ul>

<h2 id="vi-sao-can">Vì sao không chỉ bán trên một sàn?</h2>

<ul>
  <li><strong>Phụ thuộc thuật toán:</strong> Sàn đổi phí, ưu tiên shop trả ads — doanh thu dao động.</li>
  <li><strong>Mất dữ liệu khách:</strong> Không có email/SĐT để remarketing — khách thuộc sàn.</li>
  <li><strong>Biên lợi nhuận:</strong> Hoa hồng 5–15% + phí vận chuyển/ads ăn margin.</li>
  <li><strong>Thương hiệu:</strong> Layout sàn giống đối thủ — khó xây brand premium.</li>
  <li><strong>Rủi ro tài khoản:</strong> Vi phạm chính sách sàn — mất shop overnight.</li>
</ul>

<p>Ngược lại, <em>chỉ có web riêng</em> mà không có sàn cũng khó — traffic cold, cần ads/SEO lâu dài. <strong>${KEYWORD}</strong> giải quyết bằng cách: sàn kéo volume, web giữ margin và loyalty.</p>

<h2 id="mo-hinh">Mô hình omnichannel phổ biến tại Việt Nam</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Mô hình</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Kênh chính</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Sàn → Web</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Shopee/TikTok mạnh → mở web giữ khách</td>
      <td class="border border-indigo-100 px-3 py-2">Shop SME đã có doanh thu sàn</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Web → Sàn</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Brand web trước → listing sàn mở rộng</td>
      <td class="border border-indigo-100 px-3 py-2">D2C brand, mỹ phẩm, thời trang</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Livestream hub</strong></td>
      <td class="border border-indigo-100 px-3 py-2">TikTok/Facebook live + web catalog</td>
      <td class="border border-indigo-100 px-3 py-2">FMCG, thực phẩm, giá tốt</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Offline + Online</strong></td>
      <td class="border border-indigo-100 px-3 py-2">POS cửa hàng + web + sàn</td>
      <td class="border border-indigo-100 px-3 py-2">Chuỗi retail, phân phối</td>
    </tr>
  </tbody>
</table>

<h2 id="vai-tro-web">Vai trò website trong chiến lược đa kênh</h2>

<p>Website riêng trong <strong>${KEYWORD}</strong> đóng vai trò:</p>

<ol>
  <li><strong>Thương hiệu:</strong> Story, lookbook, video — không bị giới hạn template sàn.</li>
  <li><strong>SEO organic:</strong> Blog, danh mục, long-tail — traffic miễn phí dài hạn.</li>
  <li><strong>CRM &amp; membership:</strong> Thu email, điểm thưởng, voucher — tái mua.</li>
  <li><strong>Margin cao hơn:</strong> Không hoa hồng sàn — khuyến mãi linh hoạt.</li>
  <li><strong>Hub tích hợp:</strong> API nối OMS, kế toán, kho — single source of truth.</li>
  <li><strong>Exclusive offer:</strong> Sản phẩm/giá chỉ có trên web — kéo khách từ sàn sang.</li>
</ol>

<p>Xem thêm <a href="${SITE}/blog/thiet-ke-website-thuong-mai-dien-tu">website thương mại điện tử</a> và <a href="${SITE}/blog/thiet-ke-website-ban-hang">website bán hàng</a>.</p>

${wpImg(2, "Website trung tâm kết nối Shopee Lazada TikTok Shop và cửa hàng offline")}

<h2 id="tich-hop-san">Tích hợp Shopee, Lazada, TikTok Shop với website</h2>

<p>Các hướng tích hợp khi <strong>thiết kế website bán hàng đa kênh</strong>:</p>

<h3>1. Đồng bộ sản phẩm (PIM)</h3>
<ul>
  <li>Tạo SKU master trên web/OMS → push lên sàn</li>
  <li>Ảnh, mô tả, thuộc tính (size, màu) đồng bộ — sửa một nơi</li>
  <li>Mapping category sàn ↔ category web</li>
</ul>

<h3>2. Đồng bộ tồn kho</h3>
<ul>
  <li>Realtime hoặc near-realtime (5–15 phút)</li>
  <li>Đơn trên Shopee trừ tồn web — tránh bán trùng</li>
  <li>Reserve stock khi khách thêm giỏ (tùy cấu hình)</li>
</ul>

<h3>3. Đồng bộ đơn hàng</h3>
<ul>
  <li>Order từ sàn về OMS → in phiếu, xử lý một luồng</li>
  <li>Trạng thái: chờ xác nhận → đóng gói → giao → hoàn tất</li>
  <li>Webhook từ sàn khi có đơn mới</li>
</ul>

<h3>4. Đồng bộ giá (tùy chọn)</h3>
<ul>
  <li>Giá sàn thường cao hơn web (bù phí) — hoặc ngược lại flash sale sàn</li>
  <li>Rule engine: “Web −5% so với Shopee” — tránh war giá vô tình</li>
</ul>

<h2 id="dong-bo-ton">Đồng bộ tồn kho — tránh oversell</h2>

<p>Oversell (bán vượt tồn) là lỗi số 1 khi mở đa kênh. Checklist kỹ thuật:</p>

<ul>
  <li><strong>Single inventory pool</strong> hoặc phân bổ % tồn theo kênh</li>
  <li><strong>Buffer an toàn:</strong> Trừ 2–5 SKU “ảo” cho hàng lỗi/hoàn</li>
  <li><strong>Latency sync:</strong> Biết độ trễ API sàn — flash sale cần sync nhanh</li>
  <li><strong>Multi-warehouse:</strong> Kho HN + kho HCM — map đúng kho giao sàn</li>
  <li><strong>Alert:</strong> Telegram/Zalo khi tồn &lt; ngưỡng</li>
</ul>

<h2 id="oms">OMS — hệ thống quản lý đơn tập trung</h2>

<p><strong>Order Management System (OMS)</strong> là “bộ não” của <strong>${KEYWORD}</strong>. Chức năng cốt lõi:</p>

<ul>
  <li>Gom đơn web + Shopee + Lazada + TikTok + offline</li>
  <li>In vận đơn GHN/GHTK/Viettel Post hàng loạt</li>
  <li>Đối soát COD, hoàn tiền, khiếu nại</li>
  <li>Báo cáo doanh thu theo kênh, SKU, thời gian</li>
  <li>Webhook ERP/kế toán (MISA, Bravo…)</li>
</ul>

<p>Công cụ phổ biến tại Việt Nam (tham khảo, không quảng cáo độc quyền):</p>
<ul>
  <li><strong>Haravan, Sapo, KiotViet</strong> — web + sàn + POS</li>
  <li><strong>Pancake, Nhanh.vn</strong> — chat + đơn social + sàn</li>
  <li><strong>WooCommerce + plugin</strong> — linh hoạt, cần dev</li>
  <li><strong>Custom API</strong> — brand lớn, quy trình riêng</li>
</ul>

<h2 id="social-commerce">Social commerce, livestream &amp; Zalo</h2>

<ul>
  <li><strong>Facebook/Instagram Shop:</strong> Catalog sync từ web — ads dynamic</li>
  <li><strong>TikTok Live:</strong> Pin sản phẩm → đơn TikTok Shop — tồn sync OMS</li>
  <li><strong>Zalo OA + Mini App:</strong> Chat bán hàng, ZNS xác nhận đơn — phổ biến VN</li>
  <li><strong>Inbox Pancake/Chatwoot:</strong> Một hộp thư cho Messenger + Zalo + web chat</li>
</ul>

<p>Website cung cấp <em>catalog chuẩn</em> (ảnh, giá, link) cho mọi kênh social — tránh post tay lệch giá.</p>

<h2 id="gia-khuyen-mai">Chiến lược giá &amp; khuyến mãi đa kênh</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Kênh</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Gợi ý giá/khuyến mãi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Website riêng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Giá tốt nhất, voucher first-order, freeship</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Shopee/Lazada</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Flash sale, combo sàn, coin — giá có thể +3–8%</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>TikTok Shop</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Live-only deal, video viral SKU</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Offline</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Trải nghiệm, tư vấn — có thể match web</td>
    </tr>
  </tbody>
</table>

<p>Thông điệp minh bạch: “Mua trên web freeship” — không để khách sàn thấy rẻ hơn web (hoặc ngược lại không giải thích).</p>

<h2 id="cong-nghe">Nền tảng website &amp; kiến trúc tích hợp</h2>

<h3>Lựa chọn 1: SaaS all-in-one (Haravan/Sapo)</h3>
<ul>
  <li>Ưu: Go-live nhanh, sàn có sẵn connector</li>
  <li>Nhược: Template giới hạn, phí hàng tháng, lock-in</li>
</ul>

<h3>Lựa chọn 2: WooCommerce / WordPress + plugin</h3>
<ul>
  <li>Ưu: Linh hoạt SEO, theme custom, chi phí hosting thấp</li>
  <li>Nhược: Cần dev bảo trì plugin sync sàn</li>
</ul>

<h3>Lựa chọn 3: Headless (Next.js + API)</h3>
<ul>
  <li>Ưu: Tốc độ, UX cao, scale tốt</li>
  <li>Nhược: Chi phí dev cao, OMS tích hợp riêng</li>
</ul>

<p><strong>${KEYWORD}</strong> nên chọn theo: số SKU, số kênh, ngân sách, team có dev hay không. Shop &lt;500 SKU, 2–3 sàn — SaaS hoặc WooCommerce thường đủ.</p>

<h2 id="quy-trinh">Quy trình thiết kế website bán hàng đa kênh — 7 bước</h2>

<ol>
  <li><strong>Audit kênh hiện tại:</strong> Doanh thu, margin, pain point từng sàn.</li>
  <li><strong>Chọn kiến trúc:</strong> Web + OMS + connector sàn — hoặc SaaS gói.</li>
  <li><strong>Thiết kế UX web:</strong> Mobile-first, checkout COD + ví, trust badge.</li>
  <li><strong>Chuẩn hóa SKU master:</strong> Mã, ảnh, biến thể — nguồn dữ liệu một.</li>
  <li><strong>Tích hợp &amp; test sync:</strong> Tồn, đơn, giá — test oversell scenario.</li>
  <li><strong>Đào tạo vận hành:</strong> 1 dashboard xử lý đơn — SOP in đơn, đối soát.</li>
  <li><strong>Go-live + đo lường:</strong> Doanh thu/kênh, CAC, tỷ lệ web vs sàn — tối ưu dần.</li>
</ol>

<p><strong>Thời gian:</strong> 4–8 tuần (web + 2 sàn); 8–12 tuần nếu nhiều kho, ERP, custom API.</p>

<h2 id="bang-gia">Bảng giá website bán hàng đa kênh 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Omni Starter</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Web WooCommerce + 1 sàn (Shopee) sync tồn cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Omni Growth</strong></td>
      <td class="border border-indigo-100 px-3 py-2">18.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Web + 2 sàn + OMS dashboard + Zalo chat</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Omni Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">25.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">3+ kênh, multi-warehouse, báo cáo kênh, API custom</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bảo trì sync</strong></td>
      <td class="border border-indigo-100 px-3 py-2">2.000.000đ/tháng</td>
      <td class="border border-indigo-100 px-3 py-2">Monitor API sàn, fix lỗi sync, backup</td>
    </tr>
  </tbody>
</table>

<p>Phí SaaS OMS (Haravan/Sapo…) và hoa hồng sàn tính riêng — báo giá minh bạch trước ký hợp đồng.</p>

<h2 id="checklist">Checklist trước go-live đa kênh</h2>

<ul>
  <li>☐ SKU master đủ ảnh, mô tả, barcode</li>
  <li>☐ Test đơn Shopee → trừ tồn web (và ngược lại)</li>
  <li>☐ COD, MoMo, VNPay trên web hoạt động</li>
  <li>☐ In vận đơn GHN/GHTK từ OMS</li>
  <li>☐ Chính sách đổi trả thống nhất mọi kênh</li>
  <li>☐ Hotline/Zalo CSKH ghi trên web và sàn</li>
  <li>☐ Pixel Meta + GA4 ecommerce events</li>
  <li>☐ SOP xử lý oversell / hủy đơn / hoàn tiền</li>
</ul>

<h2 id="sai-lam">Sai lầm khi triển khai bán hàng đa kênh</h2>

<ul>
  <li>Mở web + 5 sàn cùng lúc — vận hành quá tải, sync lỗi.</li>
  <li>Không có SKU master — sửa giá 5 nơi, lệch tồn.</li>
  <li>Giá web cao hơn Shopee không giải thích — mất niềm tin.</li>
  <li>Bỏ qua đào tạo nhân viên OMS — đơn trễ, review xấu sàn.</li>
  <li>Web chậm, UX kém — không kéo được khách từ sàn sang.</li>
  <li>Không đo doanh thu theo kênh — không biết kênh nào lãi.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-thuong-mai-dien-tu`,
    label: "Website thương mại điện tử",
    desc: "Nền tảng shop online.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-landing-page-ban-hang`,
    label: "Landing page bán hàng",
    desc: "Ads &amp; conversion.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-wordpress-vs-shopify`,
    label: "WordPress hay Shopify",
    desc: "Chọn nền tảng TMĐT.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn omnichannel",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website bán hàng đa kênh giá bao nhiêu?",
      a: "Tại Bứt Phá từ 12.000.000đ (web + 1 sàn) đến 25.000.000đ (đa kênh + OMS). Báo giá theo số SKU và connector cần tích hợp.",
    },
    {
      q: "Có thể đồng bộ Shopee với website WordPress không?",
      a: "Có — qua plugin hoặc OMS trung gian (Haravan, Sapo, API Shopee Open Platform). Cần dev cấu hình mapping SKU.",
    },
    {
      q: "Web riêng có thay được Shopee không?",
      a: "Không ngay — sàn mang traffic sẵn. Chiến lược đúng: sàn + web song song; web tăng dần tỷ trọng qua CRM và SEO.",
    },
    {
      q: "Oversell xử lý thế nào?",
      a: "Ưu tiên khách đặt trước; liên hệ khách sau xin lỗi + voucher. Phòng ngừa: sync tồn realtime + buffer + alert tồn thấp.",
    },
    {
      q: "TikTok Shop có tích hợp web được không?",
      a: "Có — qua OMS hoặc API đối tác. Livestream TikTok thường bán trên TikTok Shop; catalog web làm nguồn ảnh/mô tả.",
    },
    {
      q: "Nên dùng Haravan hay tự build web?",
      a: "Haravan/Sapo nhanh cho SME 2–3 kênh. Tự build (WooCommerce/Next.js) linh hoạt SEO và UX — cần team dev hoặc agency.",
    },
    {
      q: "Bao lâu go-live website đa kênh?",
      a: "Thường 4–8 tuần với 1–2 sàn. Nhiều kho và ERP custom có thể 2–3 tháng.",
    },
    {
      q: "Bứt Phá có làm website bán hàng đa kênh không?",
      a: "Có — thiết kế web TMĐT + tích hợp Shopee, Lazada, TikTok, Zalo. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website bán hàng đa kênh</strong> hiệu quả = website riêng làm trung tâm thương hiệu + OMS đồng bộ tồn/đơn với sàn và social — không phải “làm thêm web” rồi nhập đơn tay. Bắt đầu 1–2 kênh, chuẩn hóa SKU, đo margin từng kênh rồi mở rộng.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — kiến trúc tích hợp, timeline và báo giá theo số sàn, SKU và quy trình kho của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website bán hàng đa kênh",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};

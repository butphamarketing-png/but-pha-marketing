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

const KEYWORD = "thiết kế website gym yoga";
const TITLE = "Thiết Kế Website Gym Yoga Và Đăng Ký Lớp Học";

export const REWRITE_THIET_KE_WEBSITE_GYM_YOGA_PILATES = {
  title: TITLE,
  slug: "thiet-ke-website-gym-yoga-pilates",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website gym, website yoga studio, lịch lớp pilates, membership gym, đăng ký lớp học online",
  metaTitle: "Thiết Kế Website Gym Yoga | Lớp Học & Membership 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website gym yoga: lịch lớp học, gói membership, đăng ký trial và SEO local. Quy trình 7 bước, giá 7–14 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website gym yoga pilates: lịch lớp, membership, đăng ký học thử và booking tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Gym Yoga | Lớp Học & Membership 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "gym-yoga-web-la-gi", label: "Website gym/yoga là gì?" },
  { id: "vi-sao-can", label: "Vì sao studio cần web riêng?" },
  { id: "cau-truc", label: "Cấu trúc website fitness" },
  { id: "lich-lop", label: "Lịch lớp học online" },
  { id: "membership", label: "Gói membership & pricing" },
  { id: "dang-ky-trial", label: "Đăng ký trial & booking" },
  { id: "pt-hlv", label: "HLV, PT & chương trình" },
  { id: "seo", label: "SEO gym yoga local" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website gym yoga</strong> là xây dựng nền tảng web cho phòng gym, studio yoga, pilates hoặc fitness boutique — trưng bày lịch lớp học theo tuần, gói membership/thẻ tập, profile huấn luyện viên, gallery không gian, form đăng ký học thử (trial) và đặt chỗ lớp online — chuyển traffic Google “yoga [quận]”, Instagram Reels và ads Facebook thành thành viên trả phí.`,
    `Bài viết dành cho chủ studio, quản lý gym và marketer fitness đang cần <strong>${KEYWORD}</strong> (kèm pilates): cấu trúc class schedule, membership tier, booking mobile-first, tích hợp thanh toán và mức giá triển khai 2026 tại Việt Nam — thực chiến cho mô hình hybrid online/offline.`,
  ],
})}

${wpKeyTakeaways([
  "Gym/yoga web = lịch lớp realtime + đăng ký trial — mobile là ưu tiên số 1.",
  "Membership tier rõ (1 tháng / 3 tháng / unlimited) — giảm inbox hỏi giá.",
  "Landing riêng Yoga vs Pilates vs Gym — message match ads.",
  "SEO local + Google Maps — khách tìm “yoga gần đây” trên điện thoại.",
  "Bứt Phá: website gym yoga 7–14 triệu tùy booking và membership portal.",
])}

${wpImg(1, "Thiết kế website gym yoga lịch lớp học và đăng ký membership online")}

<h2 id="gym-yoga-web-la-gi">Website gym, yoga &amp; pilates là gì?</h2>

<p><strong>Website gym yoga</strong> (fitness studio website) phục vụ mô hình <em>lớp học theo lịch</em> và/hoặc <em>phòng tập mở cửa</em> — khác website thương mại điện tử hay landing page một dịch vụ. <strong>Thiết kế website gym yoga</strong> thường gồm:</p>

<ul>
  <li><strong>Lịch lớp (class schedule):</strong> Yoga flow, pilates reformer, HIIT, spin — filter theo ngày/giờ/HLV</li>
  <li><strong>Gói membership:</strong> Thẻ tháng, gói 10 buổi, unlimited, corporate</li>
  <li><strong>Đăng ký học thử:</strong> Trial class miễn phí hoặc 99k — thu lead</li>
  <li><strong>Booking đặt chỗ:</strong> Giới hạn slot/lớp — tránh quá tải phòng</li>
  <li><strong>HLV &amp; chương trình:</strong> Profile coach, level beginner → advanced</li>
  <li><strong>Gallery &amp; tiện ích:</strong> Phòng tập, locker, parking, shower</li>
</ul>

<p>Studio pilates reformer và gym functional training dùng chung khung — khác nội dung landing và keyword SEO. Xem thêm <a href="${SITE}/blog/thiet-ke-website-membership">website membership</a> nếu cần portal thành viên nâng cao.</p>

<h2 id="vi-sao-can">Vì sao studio fitness cần website chuyên?</h2>

<ul>
  <li><strong>Lịch thay đổi hàng tuần:</strong> Web cập nhật nhanh hơn đăng story Instagram từng buổi</li>
  <li><strong>Giảm inbox Zalo:</strong> “Lớp yoga 7h sáng còn chỗ không?” — trả lời bằng booking online</li>
  <li><strong>Membership conversion:</strong> Trial → upsell gói 3 tháng ngay trên web</li>
  <li><strong>SEO intent:</strong> “Pilates Quận 2”, “gym nữ Thủ Đức”, “yoga cho người mới bắt đầu”</li>
  <li><strong>Trust trước khi đến:</strong> Ảnh phòng, review, HLV — quyết định 60% khách mới</li>
  <li><strong>Ads landing:</strong> Campaign “ học thử yoga” cần URL message match</li>
  <li><strong>Corporate B2B:</strong> Trang gói doanh nghiệp — HR đăng ký nhóm nhân viên</li>
</ul>

<h2 id="cau-truc">Cấu trúc website gym yoga chuẩn</h2>

<ol>
  <li><strong>Trang chủ:</strong> Hero video phòng tập, CTA “Đăng ký học thử”, lịch hôm nay embed</li>
  <li><strong>Lịch lớp:</strong> Calendar tuần — mobile swipe, filter loại lớp</li>
  <li><strong>Chương trình:</strong> Landing Yoga / Pilates / Personal Training / Kids</li>
  <li><strong>Bảng giá:</strong> Membership tier + drop-in + combo — FAQ hủy/gia hạn</li>
  <li><strong>HLV:</strong> Profile, chứng chỉ RYT, kinh nghiệm</li>
  <li><strong>Về studio:</strong> Sứ mệnh, quy tắc ứng xử, dress code</li>
  <li><strong>Gallery:</strong> Không gian, sự kiện workshop, community</li>
  <li><strong>Blog:</strong> SEO “tư thế yoga cho người mới”, “pilates vs gym”</li>
  <li><strong>Liên hệ &amp; địa chỉ:</strong> Map, parking, giờ mở cửa</li>
  <li><strong>Member login (tùy chọn):</strong> Xem lịch sử, gia hạn, đặt lớp</li>
</ol>

${wpImg(2, "Giao diện lịch lớp yoga pilates trên mobile website studio fitness")}

<h2 id="lich-lop">Lịch lớp học online — tính năng cốt lõi</h2>

<p>Trái tim của <strong>${KEYWORD}</strong> cho studio group class:</p>

<ul>
  <li><strong>Weekly schedule view:</strong> Thứ 2–CN, slot sáng/chiều/tối — màu theo loại lớp</li>
  <li><strong>Capacity &amp; waitlist:</strong> Hiển thị còn X chỗ — full thì join waitlist</li>
  <li><strong>Đăng ký 1 click:</strong> Member đã login — guest điền form ngắn</li>
  <li><strong>Cancel policy:</strong> Hủy trước 4h — hiển thị rõ tránh tranh cãi</li>
  <li><strong>Sync admin:</strong> Google Calendar hoặc phần mềm quản lý phòng (Mindbody-style)</li>
  <li><strong>Push/ZNS nhắc lớp:</strong> Nhắc 2h trước buổi — giảm no-show</li>
  <li><strong>Holiday override:</strong> Tết, lễ — đóng lớp cập nhật hàng loạt</li>
</ul>

<p>Phòng gym mở cửa 24/7 ít cần lịch lớp — thay bằng giờ peak, tour ảo và form đăng ký thẻ tập.</p>

<h2 id="membership">Gói membership &amp; bảng giá trên web</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Loại gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Hiển thị web</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Ghi chú UX</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Drop-in</strong></td>
      <td class="border border-indigo-100 px-3 py-2">1 buổi — giá cao nhất</td>
      <td class="border border-indigo-100 px-3 py-2">Anchor price — khuyến khích mua gói</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Gói 10/20 buổi</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Hạn 3–6 tháng</td>
      <td class="border border-indigo-100 px-3 py-2">Phổ biến pilates reformer</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Monthly unlimited</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Yoga all-access</td>
      <td class="border border-indigo-100 px-3 py-2">Highlight “tiết kiệm nhất”</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Annual / 6 tháng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Giảm % — cam kết dài hạn</td>
      <td class="border border-indigo-100 px-3 py-2">Cash flow studio</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Corporate</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Form báo giá riêng</td>
      <td class="border border-indigo-100 px-3 py-2">B2B — không public full price</td>
    </tr>
  </tbody>
</table>

<p>Thanh toán online: MoMo, VNPay, chuyển khoản + xác nhận thủ công — auto-renew chưa phổ biến tại VN như Stripe. Portal thành viên chi tiết: xem <a href="${SITE}/blog/thiet-ke-website-membership">thiết kế website membership</a>.</p>

<h2 id="dang-ky-trial">Đăng ký học thử &amp; booking lớp</h2>

<ul>
  <li><strong>Landing trial:</strong> “Học thử yoga miễn phí” — form 4 field: tên, SĐT, lớp quan tâm, khung giờ</li>
  <li><strong>Instant confirm:</strong> Email/ZNS “Bạn đã đăng ký lớp X ngày Y”</li>
  <li><strong>Pixel conversion:</strong> Lead event Facebook — tối ưu ads trial</li>
  <li><strong>Upsell post-trial:</strong> Trang thank-you gói ưu đãi 7 ngày sau buổi đầu</li>
  <li><strong>QR tại quầy:</strong> In QR đăng ký thành viên — sync CRM</li>
  <li><strong>Waiver form:</strong> Cam kết sức khỏe digital signature — giảm giấy tại quầy</li>
</ul>

<p>Tham khảo flow booking y tế trong <a href="${SITE}/blog/thiet-ke-website-dat-lich-hen-online">đặt lịch hẹn online</a> — logic tương tự slot và confirm.</p>

<h2 id="pt-hlv">HLV, PT &amp; chương trình đặc biệt</h2>

<ul>
  <li><strong>Profile HLV:</strong> Ảnh, bio, style (Vinyasa, Yin, Reformer…), Instagram embed</li>
  <li><strong>PT 1-1:</strong> Form đặt lịch PT — giá theo buổi/gói</li>
  <li><strong>Workshop &amp; retreat:</strong> Landing sự kiện — countdown, early bird</li>
  <li><strong>Kids / prenatal:</strong> Trang riêng phụ huynh — trust &amp; an toàn</li>
  <li><strong>Online class:</strong> Link Zoom members-only — hybrid post-COVID vẫn còn nhu cầu</li>
</ul>

<h2 id="seo">SEO &amp; marketing gym yoga local</h2>

<ul>
  <li><strong>Title local:</strong> “Yoga [Quận] | Pilates | [Tên Studio]”</li>
  <li><strong>Blog long-tail:</strong> “Yoga cho dân văn phòng”, “Pilates giảm đau lưng”</li>
  <li><strong>Schema LocalBusiness / SportsActivityLocation:</strong> JSON-LD giờ mở cửa</li>
  <li><strong>Google Business Profile:</strong> Ảnh lớp học, review — link đặt trial web</li>
  <li><strong>Instagram Reels → web:</strong> Bio link lịch lớp — không chỉ Linktree generic</li>
  <li><strong>Referral program:</strong> Trang “Giới thiệu bạn — tặng 1 buổi” trackable</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website gym yoga — 7 bước</h2>

<ol>
  <li><strong>Brief studio:</strong> Loại hình (yoga/pilates/gym), số lớp/tuần, gói giá, HLV.</li>
  <li><strong>Content &amp; media:</strong> Chụp phòng, lớp thật, thu profile HLV — stock gym generic kém trust.</li>
  <li><strong>Wireframe:</strong> Mobile schedule first — 70% traffic fitness từ điện thoại.</li>
  <li><strong>UI design:</strong> Năng động, sạch — màu brand studio, typography dễ đọc lịch.</li>
  <li><strong>Dev + booking:</strong> Lịch lớp, form trial, payment link, ZNS confirm.</li>
  <li><strong>Seed lịch + 5 blog:</strong> Launch có lịch tuần đầy — không để trống.</li>
  <li><strong>Launch + ads:</strong> GBP, Facebook trial campaign, theo dõi lead/trial → member.</li>
</ol>

<p><strong>Thời gian:</strong> 3–6 tuần (website + lịch); +1–2 tuần nếu member portal + payment tích hợp sâu.</p>

<h2 id="bang-gia">Bảng giá thiết kế website gym yoga 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Studio Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">7.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Lịch lớp static/tuần, bảng giá, form trial, profile HLV, SEO cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Studio Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">10.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Booking online, landing yoga/pilates riêng, blog, schema local</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Studio Premium</strong></td>
      <td class="border border-indigo-100 px-3 py-2">14.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Member login, gói online, ZNS, ads landing trial, multi-branch</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Landing ads</strong></td>
      <td class="border border-indigo-100 px-3 py-2">+2.500.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">1 landing CRO cho campaign học thử Facebook/Instagram</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website gym yoga</h2>

<ul>
  <li>Lịch lớp PDF hoặc ảnh — không booking, khách bỏ cuộc trên mobile.</li>
  <li>Giá ẩn hoàn toàn — trial nhiều nhưng conversion membership thấp vì sốc giá sau.</li>
  <li>Stock photo gym Mỹ — khách đến thấy phòng khác, mất trust.</li>
  <li>Web desktop-only — lịch nhỏ, khó đọc trên iPhone.</li>
  <li>Không cập nhật lịch Tết/lễ — khách đến trễ, review xấu.</li>
  <li>Mix tất cả dịch vụ 1 trang — ads yoga landing sai URL pilates.</li>
  <li>Không track trial → member — không biết ROI ads.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-membership`,
    label: "Website membership",
    desc: "Portal thành viên nâng cao.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-dat-lich-hen-online`,
    label: "Đặt lịch hẹn online",
    desc: "Booking slot & confirm.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-elearning`,
    label: "Website elearning",
    desc: "Yoga online / khóa video.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn web gym yoga",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website gym yoga giá bao nhiêu?",
      a: "Tại Bứt Phá từ 7.000.000đ (lịch + trial form) đến 14.000.000đ (booking + member portal). Báo giá theo số lớp và tích hợp thanh toán.",
    },
    {
      q: "Có cần phần mềm quản lý phòng riêng không?",
      a: "Studio nhỏ có thể dùng lịch web + Google Sheet admin. Scale 5+ lớp/ngày nên tích hợp hoặc embed phần mềm chuyên fitness.",
    },
    {
      q: "Website pilates khác yoga thế nào?",
      a: "Cùng khung lịch + membership — khác landing, keyword SEO và messaging (reformer, core strength vs mindfulness). Nên trang riêng từng môn.",
    },
    {
      q: "Khách có đặt lớp trên điện thoại không?",
      a: "Bắt buộc mobile-first — 70%+ khách fitness check lịch trên phone. Booking 1–2 tap sau khi login.",
    },
    {
      q: "SEO “yoga [quận]” mất bao lâu?",
      a: "2–4 tháng local SEO + blog + Google Business. Ads trial bù lead giai đoạn mở studio mới.",
    },
    {
      q: "Có bán gói online trên web không?",
      a: "Có — video on-demand hoặc live Zoom members-only. Kết hợp elearning nếu mở rộng online.",
    },
    {
      q: "Bao lâu go-live website gym yoga?",
      a: "3–6 tuần. Chuẩn bị lịch lớp 4 tuần và ảnh phòng thật là critical path.",
    },
    {
      q: "Bứt Phá có thiết kế website gym yoga không?",
      a: "Có — studio yoga, pilates, gym boutique. Lịch lớp, trial, membership. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website gym yoga</strong> hiệu quả = lịch lớp mobile dễ đọc + gói membership rõ + form trial nhanh + ảnh phòng/HLV thật — chuyển traffic local và social thành thành viên trả phí, giảm tải inbox hỏi lịch.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — loại studio, số lớp/tuần và báo giá theo booking portal bạn cần.`,
  ],
  ctaLabel: "→ Tư vấn website gym yoga",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};

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

const KEYWORD = "Meta Ads là gì";
const TITLE = "Meta Ads Là Gì? Định Nghĩa Hệ Thống Quảng Cáo Meta";

export const REWRITE_META_ADS_LA_GI_B21 = {
  title: TITLE,
  slug: "meta-ads-la-gi-b21",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "quảng cáo Meta, Facebook Ads, Instagram Ads, Meta Ads Manager, Meta Pixel, chạy ads Facebook",
  metaTitle: "Meta Ads Là Gì? Định Nghĩa Quảng Cáo Meta 2026",
  metaDescription:
    "Meta Ads là gì? Giải thích hệ thống quảng cáo Meta trên Facebook, Instagram, Messenger: cấu trúc campaign, audience, Pixel và KPI đo hiệu quả.",
  description:
    "Meta Ads là gì? Định nghĩa rõ ràng, nền tảng chạy ads, cấu trúc Campaign–Ad Set–Ad, đối tượng, tracking Pixel/CAPI và KPI cần theo dõi khi chạy Meta Ads.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Meta Ads Là Gì? Định Nghĩa Quảng Cáo Meta 2026",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "dinh-nghia", label: "Meta Ads là gì?" },
  { id: "nen-tang", label: "Meta Ads chạy trên kênh nào?" },
  { id: "khac-facebook-ads", label: "Meta Ads khác Facebook Ads?" },
  { id: "cau-truc", label: "Cấu trúc Campaign – Ad Set – Ad" },
  { id: "doi-tuong", label: "Đối tượng quảng cáo Meta" },
  { id: "muc-tieu", label: "Mục tiêu chiến dịch phổ biến" },
  { id: "pixel-capi", label: "Meta Pixel và Conversion API" },
  { id: "kpi", label: "KPI đo Meta Ads" },
  { id: "bat-dau", label: "Cách bắt đầu chạy Meta Ads" },
  { id: "sai-lam", label: "Sai lầm thường gặp" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Meta Ads</strong> là hệ thống quảng cáo trả phí của Meta — cho phép doanh nghiệp hiển thị quảng cáo trên Facebook, Instagram, Messenger và Audience Network, nhắm đúng nhóm khách theo sở thích, hành vi và dữ liệu riêng. Khi hỏi <strong>${KEYWORD}</strong>, câu trả lời ngắn gọn là: đây là công cụ mua traffic và chuyển đổi trên hệ sinh thái Meta, quản lý trong Meta Ads Manager.`,
    `Bài viết bám đúng tiêu đề <em>${TITLE}</em>: định nghĩa chuẩn, phân biệt với Facebook Ads cũ, giải thích cấu trúc chiến dịch, audience, Pixel/CAPI và các chỉ số CPA, ROAS, frequency — giúp SME Việt Nam hiểu trước khi bỏ ngân sách chạy ads.`,
  ],
})}

${wpKeyTakeaways([
  "Meta Ads = quảng cáo trả phí trên Facebook, Instagram, Messenger và Audience Network.",
  "Quản lý tại Meta Ads Manager; cấu trúc 3 tầng: Campaign → Ad Set → Ad.",
  "Facebook Ads là tên cũ phổ biến; Meta Ads là tên gọi bao trùm sau khi Meta đổi thương hiệu.",
  "Theo dõi chuyển đổi bằng Meta Pixel + Conversion API (CAPI).",
  "Đo hiệu quả bằng CPA, ROAS, CTR, CPM, frequency — không chỉ nhìn like/reach.",
])}

${wpImg(0, "Meta Ads là gì — hệ thống quảng cáo Meta Ads Manager")}

<h2 id="dinh-nghia">Meta Ads là gì?</h2>

<p><strong>Meta Ads</strong> (trước đây nhiều người gọi là Facebook Ads) là nền tảng quảng cáo của tập đoàn Meta Platforms. Doanh nghiệp trả phí để hiển thị nội dung quảng cáo tới đúng đối tượng mục tiêu thay vì chỉ đăng bài organic trên Fanpage.</p>

<p>Hiểu <strong>${KEYWORD}</strong> nghĩa là nắm được ba ý cốt lõi:</p>

<ul>
  <li><strong>Nơi chạy:</strong> Feed Facebook/Instagram, Stories, Reels, Messenger, Audience Network (app/web đối tác).</li>
  <li><strong>Cách nhắm:</strong> Interest, hành vi, vị trí địa lý, lookalike, custom audience (web visitor, khách mua…).</li>
  <li><strong>Mục tiêu:</strong> Nhận diện thương hiệu, traffic website, tin nhắn, lead form, bán hàng, app install…</li>
</ul>

<p>Tóm lại: <strong>Meta Ads</strong> không phải “đăng bài Fanpage”, mà là <em>mua phân phối có kiểm soát</em> — bạn chọn mục tiêu, ngân sách, đối tượng và creative; thuật toán Meta tối ưu phân phối theo sự kiện bạn đo được.</p>

<h2 id="nen-tang">Meta Ads chạy trên những kênh nào?</h2>

<p>Khi tìm hiểu <strong>${KEYWORD}</strong>, cần biết “mặt trận” quảng cáo nằm trong một tài khoản Meta Ads Manager:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Kênh</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Ví dụ vị trí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Facebook</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Feed, Stories, Reels, Marketplace</td>
      <td class="border border-indigo-100 px-3 py-2">Reach rộng, lead, message, bán hàng</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Instagram</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Feed, Stories, Reels, Explore</td>
      <td class="border border-indigo-100 px-3 py-2">Thương hiệu visual, Gen Z, fashion, F&amp;B</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Messenger</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Inbox ads, sponsored message</td>
      <td class="border border-indigo-100 px-3 py-2">Chăm sóc, remarketing hội thoại</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Audience Network</strong></td>
      <td class="border border-indigo-100 px-3 py-2">App/web đối tác Meta</td>
      <td class="border border-indigo-100 px-3 py-2">Mở rộng reach; cần kiểm soát chất lượng</td>
    </tr>
  </tbody>
</table>

<p>Bạn có thể để Meta tự phân bổ vị trí (Advantage+ placements) hoặc tự chọn — tùy mức độ kiểm soát cần có khi chạy <strong>Meta Ads</strong>.</p>

${wpImg(1, "Meta Ads là gì — các kênh Facebook Instagram Messenger")}

<h2 id="khac-facebook-ads">Meta Ads khác Facebook Ads như thế nào?</h2>

<p>Nhiều người vẫn search “Facebook Ads là gì” và “<strong>${KEYWORD}</strong>” như cùng một thứ. Thực tế:</p>

<ul>
  <li><strong>Facebook Ads</strong> là tên gọi cũ / tên phổ biến khi quảng cáo chủ yếu trên Facebook.</li>
  <li><strong>Meta Ads</strong> là tên bao trùm sau khi Facebook đổi tên tập đoàn thành Meta — cùng một Ads Manager, thêm Instagram và các bề mặt khác trong hệ sinh thái.</li>
</ul>

<p>Trong thực tế agency Việt Nam: nói “chạy Facebook Ads” thường vẫn chỉ <strong>Meta Ads</strong>. Quan trọng không phải tên gọi, mà bạn đang tối ưu đúng sự kiện chuyển đổi và creative trên đúng kênh.</p>

<h2 id="cau-truc">Cấu trúc Campaign – Ad Set – Ad trong Meta Ads</h2>

<p>Mọi chiến dịch <strong>Meta Ads</strong> đều theo 3 tầng:</p>

<ol>
  <li><strong>Campaign (chiến dịch):</strong> Chọn <em>mục tiêu</em> — Awareness, Traffic, Engagement, Leads, Sales, App…</li>
  <li><strong>Ad Set (nhóm quảng cáo):</strong> Ngân sách/ngày hoặc lifetime, lịch chạy, đối tượng, vị trí, tối ưu sự kiện (vd: Purchase, Lead).</li>
  <li><strong>Ad (quảng cáo):</strong> Creative — ảnh, video, carousel, copy, CTA, điểm đến (website, form, Messenger…).</li>
</ol>

<p>Hiểu cấu trúc này là bước tiếp theo sau khi đã rõ <strong>${KEYWORD}</strong>: sai mục tiêu ở tầng Campaign sẽ làm thuật toán tối ưu sai hướng dù creative đẹp.</p>

<h2 id="doi-tuong">Đối tượng quảng cáo Meta Ads</h2>

<p>Sức mạnh của <strong>Meta Ads</strong> nằm ở nhắm đối tượng:</p>

<ul>
  <li><strong>Core / Interest:</strong> Độ tuổi, khu vực, sở thích, hành vi — phù hợp test cold traffic.</li>
  <li><strong>Custom Audience:</strong> Người đã vào website, xem video, tương tác Fanpage, danh sách khách hàng (CRM).</li>
  <li><strong>Lookalike Audience:</strong> Tìm người “giống” khách đã mua / lead chất lượng.</li>
  <li><strong>Advantage+ Audience:</strong> Meta mở rộng tìm kiếm đối tượng dựa trên tín hiệu chuyển đổi.</li>
</ul>

<p>Thực chiến SME: tách funnel <em>cold → warm → remarketing</em> thay vì nhét mọi người vào một Ad Set — tránh đốt ngân sách và ad fatigue.</p>

${wpImg(2, "Meta Ads là gì — đối tượng interest lookalike remarketing")}

<h2 id="muc-tieu">Mục tiêu chiến dịch Meta Ads phổ biến</h2>

<p>Sau khi hiểu <strong>${KEYWORD}</strong>, chọn đúng objective theo kết quả kinh doanh:</p>

<ul>
  <li><strong>Traffic:</strong> Kéo người vào website/landing — đo CTR, CPC, chất lượng session.</li>
  <li><strong>Leads:</strong> Form trên Meta hoặc form website — đo CPL/CPA lead.</li>
  <li><strong>Messages:</strong> Inbox Messenger/IG — phù hợp bán tư vấn, dịch vụ địa phương.</li>
  <li><strong>Sales / Conversions:</strong> Mua hàng, đăng ký — cần Pixel/CAPI và catalog (nếu TMĐT).</li>
  <li><strong>Awareness / Reach:</strong> Nhận diện thương hiệu — đo CPM, reach, brand lift (nếu có).</li>
</ul>

<p>SME hay sai: chọn Engagement (like/comment) khi thật ra cần lead hoặc đơn — vì vậy phải khớp mục tiêu Ads với KPI doanh nghiệp.</p>

<h2 id="pixel-capi">Meta Pixel và Conversion API — đo chuyển đổi</h2>

<p><strong>Meta Ads</strong> chỉ tối ưu tốt khi có tín hiệu chuyển đổi sạch:</p>

<ul>
  <li><strong>Meta Pixel:</strong> Đoạn mã trên website gửi sự kiện (ViewContent, Lead, Purchase…) về Ads Manager.</li>
  <li><strong>Conversion API (CAPI):</strong> Gửi sự kiện từ server — bền vững hơn khi cookie bị hạn chế, tăng Event Match Quality.</li>
</ul>

<p>Không cài Pixel/CAPI mà hỏi “tại sao Meta Ads không ra đơn” là thiếu nền tảng đo lường. Đây là phần kỹ thuật bắt buộc sau khi đã hiểu <strong>${KEYWORD}</strong>.</p>

<h2 id="kpi">KPI cần theo dõi khi chạy Meta Ads</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">KPI</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Ý nghĩa</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>CPM</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Chi phí trên 1.000 lần hiển thị</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>CTR</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Tỷ lệ click — phản ánh creative/message</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>CPC</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Chi phí mỗi click</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>CPA / CPL</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Chi phí mỗi chuyển đổi / lead</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>ROAS</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Doanh thu trên mỗi đồng chi ads</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Frequency</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Số lần 1 người thấy ads — cao dễ mệt quảng cáo</td>
    </tr>
  </tbody>
</table>

<p>So sánh CPA với LTV khách hàng để biết <strong>Meta Ads</strong> có đáng scale hay chưa — không chỉ nhìn “hết bao nhiêu tiền hôm nay”.</p>

${wpImg(3, "Meta Ads là gì — KPI CPM CPA ROAS frequency")}

<h2 id="bat-dau">Cách bắt đầu chạy Meta Ads (checklist thực tế)</h2>

<p>Quy trình gợi ý sau khi đã hiểu <strong>${KEYWORD}</strong>:</p>

<ol>
  <li><strong>Chuẩn bị tài khoản:</strong> Business Manager, Fanpage, tài khoản ads, thanh toán rõ ràng.</li>
  <li><strong>Cài Pixel + sự kiện chuẩn</strong> trên website/landing; bật CAPI nếu có thể.</li>
  <li><strong>Chọn 1 mục tiêu kinh doanh rõ:</strong> lead, inbox hay đơn — không chạy “thử mọi thứ” cùng lúc.</li>
  <li><strong>Làm 2–3 creative khác nhau</strong> (ảnh/video/UGC) để A/B test.</li>
  <li><strong>Test audience hẹp trước</strong>, thêm lookalike/remarketing khi có data.</li>
  <li><strong>Giới hạn frequency</strong>, refresh creative khi CTR giảm / CPA tăng.</li>
  <li><strong>Landing message-match</strong> với ad — tránh dẫn về Fanpage lộn xộn không CTA.</li>
</ol>

<p>Ngân sách test SME thường bắt đầu nhỏ để lấy data learning, rồi mới scale Ad Set thắng — đây là cách vận hành <strong>Meta Ads</strong>, không phải dàn trải Google + SEO + mọi kênh trong cùng một checklist chung chung.</p>

<h2 id="sai-lam">Sai lầm thường gặp với Meta Ads</h2>

<ul>
  <li>Chạy ads nhưng <strong>không gắn Pixel / không đo conversion</strong> — chỉ nhìn like.</li>
  <li><strong>Landing không khớp</strong> nội dung quảng cáo → thoát trang cao, CPA đắt.</li>
  <li>Một creative chạy quá lâu → <strong>ad fatigue</strong> (frequency cao, CTR giảm).</li>
  <li>Nhầm mục tiêu Engagement khi cần lead/sales.</li>
  <li>Budget mỏng nhưng mở quá nhiều Ad Set → không đủ data để học.</li>
  <li>Bỏ qua remarketing — chỉ săn cold traffic liên tục.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/facebook-ads-la-gi-b21`,
    label: "Facebook Ads là gì?",
    desc: "Định nghĩa Facebook Ads — cùng hệ sinh thái Meta.",
  },
  {
    href: `${SITE}/blog/meta-pixel-la-gi-b21`,
    label: "Meta Pixel là gì?",
    desc: "Theo dõi chuyển đổi website cho Meta Ads.",
  },
  {
    href: `${SITE}/blog/lookalike-audience-la-gi-b21`,
    label: "Lookalike Audience là gì?",
    desc: "Mở rộng đối tượng giống khách đã chuyển đổi.",
  },
  {
    href: `${SITE}/facebook/quang-cao-fanpage`,
    label: "Dịch vụ quảng cáo Facebook",
    desc: "Triển khai Meta Ads theo KPI — tư vấn miễn phí.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Meta Ads là gì — giải thích ngắn?",
      a: "Là hệ thống quảng cáo trả phí của Meta trên Facebook, Instagram, Messenger và Audience Network, quản lý trong Ads Manager để nhắm đối tượng và tối ưu chuyển đổi.",
    },
    {
      q: "Meta Ads và Facebook Ads có khác nhau không?",
      a: "Cùng một nền tảng Ads Manager. Facebook Ads là tên gọi quen thuộc; Meta Ads là tên bao trùm sau khi đổi thương hiệu Meta, gồm cả Instagram và bề mặt khác.",
    },
    {
      q: "Chạy Meta Ads cần gì?",
      a: "Business Manager, Fanpage, tài khoản quảng cáo, creative, và nên có website/landing kèm Meta Pixel (và CAPI) nếu tối ưu lead hoặc bán hàng.",
    },
    {
      q: "Chi phí Meta Ads khoảng bao nhiêu?",
      a: "Không có mức cố định — phụ thuộc ngành, mục tiêu và chất lượng creative/landing. SME thường test từ vài triệu/tháng rồi scale khi CPA/ROAS ổn.",
    },
    {
      q: "Meta Ads hay Google Ads?",
      a: "Google bắt nhu cầu khi người dùng đang tìm kiếm; Meta kích thích nhu cầu và remarketing mạnh. Nhiều doanh nghiệp dùng song song theo giai trình khách hàng.",
    },
    {
      q: "Bao lâu thấy kết quả Meta Ads?",
      a: "Có thể có click/lead trong vài ngày, nhưng cần giai đoạn học (learning) và đủ chuyển đổi để tối ưu ổn định — thường theo dõi theo tuần, không kết luận sau 24 giờ.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `Tóm lại, <strong>${KEYWORD}</strong>: hệ thống quảng cáo trả phí của Meta để tiếp cận và chuyển đổi khách trên Facebook, Instagram và các bề mặt liên quan — có cấu trúc Campaign–Ad Set–Ad, đo bằng Pixel/CAPI và KPI CPA/ROAS.`,
    `Khi đã hiểu đúng khái niệm, bước tiếp theo là triển khai có tracking, creative test và funnel rõ — thay vì chạy ads cảm tính. Liên hệ Bứt Phá Marketing để được tư vấn chiến dịch Meta Ads theo mục tiêu thực tế.`,
  ],
  ctaLabel: "→ Xem dịch vụ quảng cáo Facebook / Meta Ads",
  ctaHref: `${SITE}/facebook/quang-cao-fanpage`,
})}

${wpExternalCta()}
`,
  }),
};

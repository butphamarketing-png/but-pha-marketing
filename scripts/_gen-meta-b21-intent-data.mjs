/**
 * Generates seo-meta-b21-intent-data.mjs with intent-specific Vietnamese content
 * for all 70 Meta marketing stubs in batch21.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { KEYWORDS_500_BATCH21, KEYWORDS_500_BATCH21_MARKETING_ONLY } from "./seo-keywords-500-batch21.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {Record<string, object>} */
const CURATED = {
  // ——— LAGI (20) ———
  "meta-ads-la-gi-b21": {
    intent: "lagi",
    term: "Meta Ads",
    definition:
      "<strong>Meta Ads</strong> là hệ thống quảng cáo trả phí của Meta — hiển thị ads trên Facebook, Instagram, Messenger và Audience Network, quản lý trong Meta Ads Manager để nhắm đối tượng và tối ưu chuyển đổi.",
    metaDescription:
      "Meta Ads là gì? Định nghĩa hệ thống quảng cáo Meta trên Facebook, Instagram, Messenger: Ads Manager, audience, Pixel và KPI.",
    keywordsSecondary: "quảng cáo Meta, Facebook Ads, Instagram Ads, Meta Ads Manager",
    takeaways: [
      "Meta Ads = mua phân phối có kiểm soát trên hệ sinh thái Meta — không phải đăng bài Fanpage.",
      "Quản lý tại Ads Manager với cấu trúc Campaign → Ad Set → Ad.",
      "Đo chuyển đổi bằng Meta Pixel + Conversion API.",
      "KPI chính: CPA, ROAS, CTR, CPM, frequency.",
      "Facebook Ads là tên gọi quen thuộc; Meta Ads là tên bao trùm.",
    ],
    components: [
      "Business Manager và tài khoản quảng cáo",
      "Campaign theo mục tiêu (Traffic, Leads, Sales…)",
      "Ad Set: ngân sách, audience, vị trí, tối ưu sự kiện",
      "Ad: creative ảnh/video/carousel + CTA",
      "Pixel / CAPI để gửi tín hiệu chuyển đổi",
    ],
    whyMatters: [
      "Tiếp cận đúng tệp theo sở thích, hành vi và dữ liệu riêng",
      "Scale lead/inbox/đơn khi đã có tracking sạch",
      "Remarketing người đã tương tác web/Fanpage",
      "Đo được CPA/ROAS thay vì chạy cảm tính",
    ],
    steps: [
      "Tạo Business Manager, Fanpage và tài khoản ads",
      "Cài Meta Pixel + sự kiện chuẩn trên website/landing",
      "Chọn 1 mục tiêu kinh doanh rõ (lead, message hoặc sales)",
      "Làm 2–3 creative để A/B test",
      "Test audience hẹp → mở lookalike/remarketing khi có data",
      "Theo dõi CPA/ROAS hàng tuần và refresh creative khi fatigue",
    ],
    mistakes: [
      "Chạy ads không gắn Pixel — không biết chuyển đổi thật",
      "Chọn mục tiêu Engagement khi cần lead/sales",
      "Một creative chạy quá lâu → ad fatigue",
      "Dẫn về Fanpage lộn xộn thay vì landing message-match",
    ],
    faq: [
      { q: "Meta Ads là gì — nói ngắn?", a: "Hệ thống quảng cáo trả phí của Meta trên Facebook, Instagram, Messenger và Audience Network, quản lý trong Ads Manager." },
      { q: "Meta Ads khác Facebook Ads?", a: "Cùng nền tảng; Facebook Ads là tên quen thuộc, Meta Ads là tên bao trùm sau đổi thương hiệu Meta." },
      { q: "Chạy Meta Ads cần gì?", a: "Business Manager, Fanpage, tài khoản ads, creative và nên có Pixel/CAPI nếu tối ưu lead hoặc đơn." },
      { q: "Chi phí Meta Ads bao nhiêu?", a: "Không cố định — SME thường test vài triệu/tháng rồi scale khi CPA/ROAS ổn." },
      { q: "Meta Ads hay Google Ads?", a: "Google bắt intent tìm kiếm; Meta kích thích nhu cầu và remarketing. Nhiều DN dùng song song." },
    ],
  },
  "facebook-ads-la-gi-b21": {
    intent: "lagi",
    term: "Facebook Ads",
    definition:
      "<strong>Facebook Ads</strong> là quảng cáo trả phí trên Facebook (và thường gồm Instagram qua Meta Ads Manager) — giúp doanh nghiệp hiển thị nội dung tới đúng đối tượng thay vì chỉ dựa vào reach organic Fanpage.",
    metaDescription:
      "Facebook Ads là gì? Định nghĩa quảng cáo Facebook trong Meta Ads Manager: mục tiêu, audience, creative và cách đo CPA.",
    keywordsSecondary: "quảng cáo Facebook, chạy ads FB, Meta Ads, Fanpage ads",
    takeaways: [
      "Facebook Ads nằm trong Meta Ads Manager — cùng hệ với Instagram Ads.",
      "Cấu trúc 3 tầng: Campaign – Ad Set – Ad.",
      "Mạnh ở B2C, dịch vụ địa phương, lead và message.",
      "Cần Pixel nếu tối ưu form/website.",
      "Không đồng nghĩa với boost bài — boost ít kiểm soát hơn Ads Manager.",
    ],
    components: [
      "Mục tiêu chiến dịch (Traffic, Leads, Engagement, Sales…)",
      "Audience: interest, custom, lookalike",
      "Placement: Feed, Stories, Reels, Marketplace…",
      "Creative và copy theo brief bán hàng",
      "Billing và learning phase trong Ads Manager",
    ],
    whyMatters: [
      "Reach organic Fanpage ngày càng thấp — ads bổ sung phân phối",
      "Nhắm đúng khu vực và độ tuổi khách hàng",
      "Thu lead/inbox nhanh hơn chờ SEO",
      "Remarketing người đã xem nội dung",
    ],
    steps: [
      "Xác định KPI: CPL, inbox hay đơn",
      "Cài Pixel nếu dẫn về website",
      "Tạo campaign đúng objective",
      "Test 2–3 ad set audience khác nhau",
      "Đổi creative khi CTR giảm / CPA tăng",
      "Báo cáo theo chuyển đổi, không chỉ like",
    ],
    mistakes: [
      "Boost bài thay vì cấu hình Ads Manager đầy đủ",
      "Không loại exclusion (khách đã mua / lead cũ)",
      "Copy và landing không khớp nhau",
      "Ngân sách mỏng nhưng mở quá nhiều ad set",
    ],
    faq: [
      { q: "Facebook Ads là gì?", a: "Quảng cáo trả phí trên Facebook (thường quản lý chung Meta Ads Manager) để nhắm đối tượng và tối ưu chuyển đổi." },
      { q: "Facebook Ads có gồm Instagram không?", a: "Có thể — trong cùng Ads Manager bạn chọn placement Instagram hoặc Advantage+ placements." },
      { q: "Bao lâu có lead từ Facebook Ads?", a: "Có thể vài ngày nếu Pixel/form ổn; cần đủ budget để thoát learning." },
      { q: "Tự chạy Facebook Ads được không?", a: "Được nếu nắm tracking và creative; SME thường thuê giai đoạn đầu để tránh đốt tiền." },
      { q: "Facebook Ads bị từ chối thì sao?", a: "Đọc lý do policy, sửa claim/landing/ảnh, kháng cáo nếu cần — xem bài Facebook Ads bị từ chối." },
    ],
  },
  "instagram-ads-la-gi-b21": {
    intent: "lagi",
    term: "Instagram Ads",
    definition:
      "<strong>Instagram Ads</strong> là quảng cáo trả phí trên Instagram (Feed, Stories, Reels, Explore) — tạo và tối ưu trong Meta Ads Manager, phù hợp thương hiệu visual và tệp dùng IG nhiều.",
    metaDescription:
      "Instagram Ads là gì? Quảng cáo Instagram trong Meta Ads: Feed, Stories, Reels, đối tượng và KPI cần đo.",
    keywordsSecondary: "quảng cáo Instagram, Reels ads, Stories ads, Meta Ads Instagram",
    takeaways: [
      "Instagram Ads không tách app riêng — chạy qua Meta Ads Manager.",
      "Placement mạnh: Reels, Stories, Feed, Explore.",
      "Creative phải mobile-first, hook 1–3 giây đầu.",
      "Phù hợp fashion, F&B, beauty, lifestyle, Gen Z.",
      "Vẫn đo bằng Pixel/CAPI nếu dẫn về web.",
    ],
    components: [
      "Tài khoản Instagram gắn Business/Fanpage",
      "Placement Instagram trong Ad Set",
      "Định dạng: image, video, carousel, collection",
      "CTA: Shop now, Learn more, Message…",
      "Báo cáo theo placement để biết Reels/Feed nào ăn",
    ],
    whyMatters: [
      "Tệp khách sống trên IG nhiều hơn Facebook ở một số ngành",
      "Reels kéo awareness với CPM cạnh tranh",
      "Stories phù hợp offer ngắn hạn",
      "Đồng bộ visual brand tốt hơn text dài trên FB",
    ],
    steps: [
      "Kết nối IG professional với Fanpage/BM",
      "Chọn mục tiêu khớp KPI (traffic, sales, message)",
      "Làm creative dọc 9:16 cho Stories/Reels",
      "Test Reels vs Feed riêng hoặc xem breakdown",
      "Theo dõi hold rate / thruPlay và CPA",
      "Refresh hook khi view 3s hoặc CTR giảm",
    ],
    mistakes: [
      "Dùng ảnh ngang desktop cho Stories/Reels",
      "Text quá nhiều trên creative — khó đọc mobile",
      "Bỏ qua Instagram khi chỉ chạy Facebook placement",
      "Không gắn tracking khi bán hàng qua web",
    ],
    faq: [
      { q: "Instagram Ads là gì?", a: "Quảng cáo trả phí trên Instagram, quản lý trong Meta Ads Manager với các vị trí Feed, Stories, Reels, Explore." },
      { q: "Cần tài khoản Instagram business?", a: "Nên dùng professional/creator gắn Fanpage để chạy ads và inbox chuyên nghiệp." },
      { q: "Instagram Ads hay Facebook Ads?", a: "Cùng hệ Meta — chọn theo nơi khách đang scroll; nhiều chiến dịch chạy cả hai placement." },
      { q: "Chi phí Instagram Ads?", a: "Phụ thuộc cạnh tranh ngành và creative; đo bằng CPA/ROAS chứ không chỉ CPM." },
      { q: "Reels ads có đắt không?", a: "Đôi khi CPM thấp hơn Feed nhưng cần hook mạnh; đo conversion cuối cùng." },
    ],
  },
  "meta-pixel-la-gi-b21": {
    intent: "lagi",
    term: "Meta Pixel",
    definition:
      "<strong>Meta Pixel</strong> là đoạn mã JavaScript gắn trên website để gửi sự kiện (PageView, Lead, Purchase…) về Meta Ads Manager — giúp đo chuyển đổi và tối ưu chiến dịch.",
    metaDescription:
      "Meta Pixel là gì? Mã theo dõi website gửi sự kiện về Meta Ads: cài đặt, sự kiện chuẩn và tối ưu conversion.",
    keywordsSecondary: "Facebook Pixel, cài Meta Pixel, sự kiện conversion, tracking Meta",
    takeaways: [
      "Pixel = mắt của Meta Ads trên website.",
      "Sự kiện chuẩn: ViewContent, AddToCart, Lead, Purchase…",
      "Thiếu Pixel → khó tối ưu CPA/ROAS đúng.",
      "Nên kết hợp Conversion API (CAPI) để bền hơn.",
      "Kiểm tra bằng Events Manager / Pixel Helper.",
    ],
    components: [
      "Base code Pixel trên mọi trang",
      "Sự kiện chuẩn và custom event",
      "Parameters: value, currency, content_ids…",
      "Domain verification trong Business Manager",
      "Test events trước khi scale ads",
    ],
    whyMatters: [
      "Thuật toán Meta học từ sự kiện chuyển đổi",
      "Tạo custom audience từ web visitor",
      "Đo ROAS theo doanh thu Purchase",
      "Giảm đoán mò khi tối ưu ads",
    ],
    steps: [
      "Tạo Pixel trong Events Manager",
      "Gắn base code qua GTM hoặc theme website",
      "Map sự kiện Lead/Purchase đúng nút/form",
      "Verify domain và cấu hình Aggregated Event Measurement nếu cần",
      "Test bằng Pixel Helper / Test Events",
      "Bật CAPI song song khi có thể",
    ],
    mistakes: [
      "Chỉ cài base code, không fire Lead/Purchase",
      "Duplicate Pixel nhiều lần → số liệu ảo",
      "Sai value/currency khiến ROAS lệch",
      "Chạy conversion campaign khi Pixel chưa có data",
    ],
    faq: [
      { q: "Meta Pixel là gì?", a: "Mã theo dõi trên website gửi hành vi và chuyển đổi về Meta để đo và tối ưu ads." },
      { q: "Meta Pixel khác Facebook Pixel?", a: "Cùng công cụ — tên mới là Meta Pixel." },
      { q: "Có cần Pixel nếu chỉ chạy message ads?", a: "Không bắt buộc, nhưng nếu có website nên gắn để remarketing và đo." },
      { q: "Pixel không track thì sao?", a: "Kiểm tra code, consent, adblock, event trigger — xem bài Pixel không track." },
      { q: "Pixel hay CAPI?", a: "Nên dùng cả hai: Pixel browser + CAPI server để tăng độ tin cậy." },
    ],
  },
  "conversion-api-la-gi-b21": {
    intent: "lagi",
    term: "Conversion API",
    definition:
      "<strong>Conversion API (CAPI)</strong> là cách gửi sự kiện chuyển đổi từ server của bạn trực tiếp tới Meta — bổ sung cho Pixel trình duyệt, tăng độ chính xác khi cookie bị hạn chế.",
    metaDescription:
      "Conversion API là gì? CAPI Meta gửi sự kiện từ server: khác Pixel, Event Match Quality và khi nào cần bật.",
    keywordsSecondary: "Meta CAPI, server-side tracking, Event Match Quality, Pixel và CAPI",
    takeaways: [
      "CAPI = tracking phía server, không chỉ dựa cookie trình duyệt.",
      "Dùng cùng event_id với Pixel để deduplicate.",
      "Giúp Event Match Quality cao hơn khi gửi đủ user data.",
      "Quan trọng với iOS, adblock, consent mode.",
      "Có thể triển khai qua GTM server hoặc trực tiếp API.",
    ],
    components: [
      "Access token và Pixel ID",
      "Sự kiện server: Lead, Purchase…",
      "Tham số user: email/phone hash, fbp, fbc, IP, UA",
      "event_id để dedup với Pixel",
      "Monitoring EMQ trong Events Manager",
    ],
    whyMatters: [
      "Browser Pixel dễ mất tín hiệu",
      "Tối ưu ads ổn định hơn khi data đầy đủ",
      "Giảm lệch attribution giữa ads và CRM",
      "Hỗ trợ offline conversion nếu đồng bộ đơn cửa hàng",
    ],
    steps: [
      "Tạo token CAPI trong Events Manager",
      "Chọn kênh: GTM server-side hoặc tích hợp sẵn (Shopify…)",
      "Gửi cùng event_name + event_id với Pixel",
      "Hash PII đúng chuẩn Meta",
      "Kiểm tra EMQ và số event trùng/lệch",
      "Sửa parameter thiếu trước khi scale",
    ],
    mistakes: [
      "Chỉ bật CAPI, tắt Pixel mà không test",
      "Không dedup → đếm đôi chuyển đổi",
      "Gửi thiếu email/phone → EMQ thấp",
      "Sự kiện server fire muộn / sai thời điểm",
    ],
    faq: [
      { q: "Conversion API là gì?", a: "API gửi sự kiện chuyển đổi từ server tới Meta để đo và tối ưu ads chính xác hơn." },
      { q: "CAPI thay thế Pixel được không?", a: "Nên dùng song song; Meta khuyến nghị cả hai." },
      { q: "Event Match Quality là gì?", a: "Điểm Meta đánh giá chất lượng khớp user data trong sự kiện CAPI/Pixel." },
      { q: "SME có cần CAPI không?", a: "Nên có nếu chạy conversion/sales đáng kể hoặc Pixel hay mất event." },
      { q: "CAPI hay GTM server?", a: "GTM server là một cách triển khai CAPI; CAPI là đích gửi dữ liệu." },
    ],
  },
};

// Continue building remaining curated entries in compact form via helpers below
function lagi(term, definition, meta, secondary, extra = {}) {
  return {
    intent: "lagi",
    term,
    definition,
    metaDescription: meta.slice(0, 155),
    keywordsSecondary: secondary,
    takeaways: extra.takeaways || [
      `${term} là khái niệm cốt lõi khi chạy Meta Ads — cần hiểu đúng trước khi tối ưu ngân sách.`,
      `Nằm trong hệ Meta Ads Manager / Events Manager, không phải công cụ SEO riêng.`,
      "Đo bằng sự kiện và KPI liên quan trực tiếp tới chuyển đổi.",
      "Áp dụng có checklist, tránh hiểu sai thuật ngữ.",
      "Bứt Phá hỗ trợ triển khai Meta Ads end-to-end.",
    ],
    components: extra.components || [
      `Định nghĩa vận hành của ${term}`,
      "Vị trí cấu hình trong Ads Manager / Events Manager",
      "Tham số / tùy chọn quan trọng",
      "Cách đo hiệu quả liên quan",
      "Liên kết với Pixel, audience hoặc creative",
    ],
    whyMatters: extra.whyMatters || [
      `Hiểu ${term} giúp chọn đúng setup chiến dịch`,
      "Tránh đốt ngân sách vì cấu hình sai",
      "Giao tiếp rõ với agency / freelancer",
      "Tối ưu theo đúng tín hiệu Meta cần",
    ],
    steps: extra.steps || [
      `Đọc định nghĩa ${term} và xác định mục tiêu kinh doanh`,
      "Kiểm tra tài khoản Ads / Pixel đang có gì",
      "Cấu hình đúng theo checklist bên dưới bài",
      "Chạy test nhỏ 3–7 ngày",
      "Đọc báo cáo KPI liên quan và chỉnh",
      "Scale khi chỉ số ổn định",
    ],
    mistakes: extra.mistakes || [
      `Nhầm ${term} với khái niệm gần nghĩa khác`,
      "Setup xong không đo / không test",
      "Copy cấu hình ngành khác không khớp funnel",
      "Tối ưu quá sớm khi chưa đủ data",
    ],
    faq: extra.faq || [
      { q: `${term} là gì?`, a: definition.replace(/<[^>]+>/g, "") },
      { q: `Khi nào cần dùng ${term}?`, a: `Khi chiến dịch Meta Ads của bạn phụ thuộc vào ${term} để đo hoặc tối ưu chuyển đổi.` },
      { q: `${term} có mất phí không?`, a: "Thường là tính năng nền tảng; bạn trả phí quảng cáo theo kết quả phân phối, không trả phí riêng cho khái niệm." },
      { q: `Tự setup ${term} được không?`, a: "Được nếu có kỹ năng Ads Manager; phần tracking nên nhờ người có kinh nghiệm để tránh sai số liệu." },
      { q: `Liên quan Meta Pixel thế nào?`, a: `Nhiều khái niệm Meta (audience, ROAS, CAPI…) dựa trên tín hiệu Pixel/CAPI — cần tracking sạch.` },
    ],
  };
}

function compare(aName, bName, definition, meta, secondary, a, b, verdict, extra = {}) {
  return {
    intent: "compare",
    term: `${aName} vs ${bName}`,
    definition,
    metaDescription: meta.slice(0, 155),
    keywordsSecondary: secondary,
    takeaways: extra.takeaways || [
      `Không có đáp án tuyệt đối — phụ thuộc mục tiêu và data.`,
      `${aName}: ${a.when}`,
      `${bName}: ${b.when}`,
      verdict,
      "Test nhỏ rồi scale bên thắng theo CPA/ROAS.",
    ],
    components: [`So sánh ${aName}`, `So sánh ${bName}`, "Tiêu chí quyết định", "Cách test A/B", "KPI theo dõi"],
    whyMatters: extra.whyMatters || [
      "Chọn sai làm đốt ngân sách học không cần thiết",
      "Mỗi lựa chọn tối ưu tín hiệu khác nhau",
      "SME nên ưu tiên cái đo được và kiểm soát được",
    ],
    steps: extra.steps || [
      "Chốt KPI chính (CPA, ROAS, CPL, inbox…)",
      `Chạy test song song ${aName} và ${bName} nếu ngân sách cho phép`,
      "Giữ creative/landing tương đương để so công bằng",
      "Đọc kết quả sau learning + đủ chuyển đổi",
      "Scale bên thắng, giữ 1 test nhỏ bên còn lại",
    ],
    mistakes: extra.mistakes || [
      "Đổi cả audience lẫn format cùng lúc — không biết yếu tố nào thắng",
      "Kết luận sau 1 ngày chạy",
      "Chọn theo thói quen thay vì theo KPI",
      "Không exclusion khiến hai bên tranh cùng khách",
    ],
    optionA: a,
    optionB: b,
    verdict,
    faq: extra.faq || [
      { q: `${aName} hay ${bName}?`, a: verdict },
      { q: "Có dùng kết hợp được không?", a: "Thường được — miễn là tách ngân sách và mục tiêu rõ." },
      { q: "Nên test bao lâu?", a: "Ít nhất hết learning và đủ chuyển đổi thống kê; thường 5–14 ngày tùy budget." },
      { q: "SME nên bắt đầu bên nào?", a: a.when },
      { q: "KPI nào để quyết?", a: "CPA/CPL/ROAS theo mục tiêu — không chỉ CTR." },
    ],
  };
}

function problem(term, definition, meta, secondary, symptoms, causes, extra = {}) {
  return {
    intent: "problem",
    term,
    definition,
    metaDescription: meta.slice(0, 155),
    keywordsSecondary: secondary,
    takeaways: extra.takeaways || [
      `Nhận đúng triệu chứng trước khi đổ lỗi thuật toán.`,
      "Ưu tiên sửa tracking và message-match trước khi tăng budget.",
      "Sửa từng lớp: Pixel → audience → creative → landing.",
      "Ghi log thay đổi để biết fix nào có hiệu lực.",
      "Scale lại chỉ khi CPA/ROAS ổn 5–7 ngày.",
    ],
    components: symptoms,
    whyMatters: extra.whyMatters || [
      "Phát hiện sớm giảm đốt ngân sách",
      "Tránh scale khi funnel đang hỏng",
      "Giữ learning ổn định hơn",
      "Báo cáo minh bạch với chủ DN",
    ],
    steps: extra.steps || [
      "Xác nhận số liệu trong Ads Manager và Events Manager khớp nhau",
      "Kiểm tra Pixel/CAPI và landing message-match",
      "Rà audience overlap / frequency / exclusion",
      "Đổi creative hoặc offer theo giả thuyết rõ",
      "Chạy lại test nhỏ 3–7 ngày",
      "Mới tăng ngân sách khi KPI ổn",
    ],
    mistakes: extra.mistakes || [
      "Tăng budget ngay khi chưa rõ nguyên nhân",
      "Sửa quá nhiều biến cùng lúc",
      "Bỏ qua tracking — tối ưu dựa số ảo",
      "Tắt campaign đang học chỉ vì 1 ngày xấu",
    ],
    symptoms,
    causes,
    faq: extra.faq || [
      { q: `${term} do đâu?`, a: causes[0] || definition.replace(/<[^>]+>/g, "") },
      { q: "Sửa mất bao lâu?", a: "Tracking có thể 1–2 ngày; audience/creative thường cần 3–7 ngày data." },
      { q: "Có nên dừng ads?", a: "Giảm budget hoặc pause ad set lỗi — không nhất thiết tắt cả tài khoản." },
      { q: "Tự xử lý được không?", a: "Lỗi cơ bản được; lỗi CAPI/policy phức tạp nên nhờ người có kinh nghiệm." },
      { q: "Sau khi sửa cần theo dõi gì?", a: "CPA/ROAS, EMQ (nếu CAPI), CTR, frequency và tỷ lệ chuyển đổi landing." },
    ],
  };
}

Object.assign(CURATED, {
  "retargeting-la-gi-b21": lagi(
    "Retargeting",
    "<strong>Retargeting</strong> (remarketing trên Meta) là chạy quảng cáo lại tới người đã tương tác — vào website, xem video, nhắn tin hoặc bỏ giỏ hàng — để thúc đẩy chuyển đổi.",
    "Retargeting là gì? Remarketing Meta Ads: tệp warm, cửa sổ 7/30 ngày, exclusion và khi nào hiệu quả.",
    "remarketing Meta, retargeting Facebook, custom audience website",
    {
      components: ["Custom audience web/video/engagement", "Cửa sổ thời gian 7–30–90 ngày", "Exclusion người đã mua/lead", "Creative nhắc lợi ích / offer", "Tách funnel warm vs hot"],
      faq: [
        { q: "Retargeting là gì?", a: "Chạy ads lại tới người đã biết bạn (web, video, Fanpage) để tăng tỷ lệ chuyển đổi." },
        { q: "Retargeting khác prospecting?", a: "Prospecting tìm khách mới; retargeting chăm khách đã tương tác." },
        { q: "Nên 7 ngày hay 30 ngày?", a: "7 ngày cho quyết định nhanh; 30 ngày cho chu kỳ dài — xem bài so sánh." },
        { q: "Retargeting có làm phiền khách?", a: "Có nếu frequency cao — cần cap và đổi creative." },
        { q: "Cần Pixel không?", a: "Cần nếu retarget web visitor; engagement Fanpage có thể không cần Pixel." },
      ],
    },
  ),
  "lookalike-audience-la-gi-b21": lagi(
    "Lookalike Audience",
    "<strong>Lookalike Audience</strong> là tệp Meta tạo ra gồm người có đặc điểm giống nguồn seed (khách mua, lead chất lượng, danh sách CRM) — dùng để mở rộng tìm khách mới tương tự.",
    "Lookalike audience là gì? Tệp giống khách hàng nguồn trên Meta Ads: seed, tỷ lệ %, cách dùng.",
    "lookalike Meta, tệp giống khách hàng, LAL Facebook",
  ),
  "custom-audience-la-gi-b21": lagi(
    "Custom Audience",
    "<strong>Custom Audience</strong> là tệp khách bạn đã có tương tác — upload CRM, web visitor, người xem video, tương tác Fanpage — để retargeting hoặc loại trừ.",
    "Custom audience là gì? Tệp khách riêng trên Meta: CRM, website, video, Fanpage và cách dùng.",
    "custom audience Meta, tệp khách hàng Facebook, website custom audience",
  ),
  "catalog-ads-la-gi-b21": lagi(
    "Catalog Ads",
    "<strong>Catalog Ads</strong> là quảng cáo lấy sản phẩm từ catalog Meta (feed) — hiển thị đúng item theo hành vi xem/giỏ hàng, phổ biến với TMĐT.",
    "Catalog ads là gì? Quảng cáo catalog Meta từ product feed: đồng bộ giá, dynamic và khi nào dùng.",
    "Facebook catalog, product catalog ads, feed sản phẩm Meta",
  ),
  "dynamic-ads-la-gi-b21": lagi(
    "Dynamic Ads",
    "<strong>Dynamic Ads</strong> (thường gắn Advantage+ catalog) tự chọn sản phẩm từ catalog để show cho từng người — dựa trên hành vi xem hoặc mua tương tự.",
    "Dynamic ads là gì? Quảng cáo sản phẩm động Meta: catalog, retarget item đã xem và tối ưu sales.",
    "dynamic product ads, DPA Meta, Advantage+ catalog",
  ),
  "lead-ads-la-gi-b21": lagi(
    "Lead Ads",
    "<strong>Lead Ads</strong> là dạng quảng cáo thu form ngay trên Facebook/Instagram — khách để lại thông tin không cần vào website, phù hợp thu lead nhanh.",
    "Lead ads là gì? Form thu lead trên Facebook/Instagram: ưu nhược điểm so với form website.",
    "Facebook lead form, thu lead Meta, instant form",
  ),
  "advantage-plus-la-gi-b21": lagi(
    "Advantage+",
    "<strong>Advantage+</strong> là nhóm chiến dịch/tối ưu tự động của Meta (audience, placement, creative) — thuật toán mở rộng tìm chuyển đổi với ít ràng buộc thủ công hơn.",
    "Advantage Plus là gì? Advantage+ Meta Ads: tự động audience/placement và khi nào nên dùng.",
    "Advantage+ campaign, ASC, Meta automation",
  ),
  "event-match-quality-la-gi-b21": lagi(
    "Event Match Quality",
    "<strong>Event Match Quality (EMQ)</strong> là điểm Meta chấm mức độ khớp danh tính người dùng trong sự kiện Pixel/CAPI — càng đủ email, phone, fbp/fbc… điểm càng cao.",
    "Event Match Quality là gì? Điểm khớp sự kiện CAPI/Pixel Meta và cách tăng EMQ.",
    "EMQ Meta, CAPI match quality, tăng event match",
  ),
  "roas-meta-la-gi-b21": lagi(
    "ROAS Meta",
    "<strong>ROAS Meta</strong> (Return on Ad Spend) là doanh thu chia cho chi phí quảng cáo — ví dụ ROAS 3 nghĩa là 1 đồng ads mang lại khoảng 3 đồng doanh thu (theo attribution Meta).",
    "ROAS Meta là gì? Cách tính return on ad spend trên Meta Ads và dùng để scale thế nào.",
    "return on ad spend, ROAS Facebook, tối ưu ROAS",
  ),
  "cpm-meta-la-gi-b21": lagi(
    "CPM Meta",
    "<strong>CPM Meta</strong> là chi phí trên 1.000 lần hiển thị quảng cáo — dùng để đọc độ đắt của reach/impression, không thay cho CPA.",
    "CPM Meta là gì? Cost per mille trên Meta Ads: ý nghĩa, khi nào CPM cao và liên quan CPA.",
    "CPM Facebook, chi phí 1000 impression, Meta CPM",
  ),
  "frequency-meta-ads-la-gi-b21": lagi(
    "Frequency Meta Ads",
    "<strong>Frequency</strong> trên Meta Ads là số lần trung bình một người trong audience thấy quảng cáo của bạn trong khoảng thời gian báo cáo.",
    "Frequency Meta Ads là gì? Số lần thấy ads, ngưỡng mệt quảng cáo và cách kiểm soát.",
    "ad frequency, tần suất quảng cáo, ad fatigue",
  ),
  "creative-fatigue-la-gi-b21": lagi(
    "Creative Fatigue",
    "<strong>Creative fatigue</strong> là hiện tượng creative bị “mệt” — cùng một ads hiện quá nhiều khiến CTR giảm, CPA tăng vì audience đã quen / chán nội dung.",
    "Creative fatigue là gì? Ads mệt trên Meta: dấu hiệu CTR giảm, CPA tăng và cách đổi creative.",
    "ad fatigue, creative mệt, đổi creative Meta",
  ),
  "messenger-ads-la-gi-b21": lagi(
    "Messenger Ads",
    "<strong>Messenger Ads</strong> là quảng cáo khuyến khích mở cuộc trò chuyện Messenger (hoặc hiển thị trong hệ Messenger) — phù hợp bán tư vấn, dịch vụ cần trao đổi trước khi chốt.",
    "Messenger ads là gì? Quảng cáo mở chat Messenger trên Meta: mục tiêu, kịch bản và khi nào dùng.",
    "quảng cáo Messenger, click to Messenger, chat ads",
  ),
  "asc-campaign-la-gi-b21": lagi(
    "ASC Campaign",
    "<strong>ASC (Advantage+ Shopping Campaign)</strong> là loại chiến dịch ecommerce tự động của Meta — tối ưu mua hàng từ catalog/signal với ít kiểm soát thủ công hơn campaign thường.",
    "ASC campaign là gì? Advantage+ Shopping Campaign Meta cho TMĐT: cách chạy và lưu ý.",
    "Advantage+ Shopping, ASC Meta, catalog shopping",
  ),
  "server-side-tracking-la-gi-b21": lagi(
    "Server-Side Tracking",
    "<strong>Server-side tracking</strong> là đo lường gửi sự kiện từ máy chủ (ví dụ CAPI / GTM server) thay vì chỉ dựa mã trên trình duyệt — giúp Meta nhận data ổn định hơn.",
    "Server side tracking là gì? Đo lường phía server cho Meta Ads (CAPI, GTM server) và lợi ích.",
    "GTM server-side, CAPI, đo lường server Meta",
  ),
});

Object.assign(CURATED, {
  "meta-ads-hay-google-ads-b21": compare(
    "Meta Ads",
    "Google Ads",
    "<strong>Meta Ads hay Google Ads</strong> phụ thuộc hành vi khách: Meta kích thích nhu cầu khi đang lướt mạng xã hội; Google bắt nhu cầu khi đang tìm kiếm.",
    "Meta Ads hay Google Ads? So sánh paid social và search: khi nào chọn Meta, khi nào chọn Google.",
    "Facebook Ads hay Google Ads, paid social vs search",
    { name: "Meta Ads", pros: ["Nhắm interest/lookalike", "Creative visual mạnh", "Remarketing social tốt"], cons: ["Intent mua có thể thấp hơn search", "Phụ thuộc creative"], when: "Cần awareness, lead nuôi dưỡng, ngành visual/B2C" },
    { name: "Google Ads", pros: ["Bắt intent tìm kiếm", "Đúng lúc khách đang cần", "Phù hợp dịch vụ có từ khóa rõ"], cons: ["CPC một số ngành rất cao", "Phụ thuộc volume từ khóa"], when: "Khách đang search dịch vụ/sản phẩm cụ thể" },
    "SME thường dùng Google cho nhu cầu nóng + Meta cho phủ và remarketing — không bắt buộc chọn một.",
  ),
  "facebook-ads-hay-instagram-ads-b21": compare(
    "Facebook Ads",
    "Instagram Ads",
    "<strong>Facebook Ads hay Instagram Ads</strong>: cùng Meta Ads Manager — chọn theo nơi tệp khách scroll nhiều hơn và định dạng creative phù hợp.",
    "Facebook Ads hay Instagram Ads? Chọn placement Meta theo tệp khách và creative.",
    "placement Facebook Instagram, Meta platform",
    { name: "Facebook Ads", pros: ["Tệp lớn hơn ở nhiều nhóm tuổi", "Dạng dài/copy chi tiết dễ hơn", "Marketplace/feed quen thuộc"], cons: ["Feed cạnh tranh thông tin", "Visual trẻ có thể kém IG"], when: "Khách 30+ hoặc cần giải thích dịch vụ nhiều" },
    { name: "Instagram Ads", pros: ["Mạnh visual/Reels", "Gen Z và lifestyle", "Stories offer nhanh"], cons: ["Cần creative dọc chất lượng", "Một số ngành B2B yếu hơn"], when: "Thương hiệu đẹp mắt, F&B, beauty, fashion" },
    "Nên test cả hai placement hoặc Advantage+ rồi đọc breakdown — đừng đoán.",
  ),
  "advantage-plus-hay-manual-campaign-b21": compare(
    "Advantage+",
    "Manual campaign",
    "<strong>Advantage+ hay manual campaign</strong>: Advantage+ để Meta tự tìm chuyển đổi nhiều hơn; manual giữ kiểm soát audience/placement chặt.",
    "Advantage Plus hay manual campaign? Khi nào để Meta tự động, khi nào chạy tay.",
    "Advantage+ vs manual, ASC vs thủ công",
    { name: "Advantage+", pros: ["Setup nhanh", "Thuật toán mở rộng", "Phù hợp đủ tín hiệu conversion"], cons: ["Ít kiểm soát", "Khó giải thích chi tiết audience"], when: "Đã có Pixel/CAPI ổn và muốn scale" },
    { name: "Manual", pros: ["Kiểm soát tệp/placement", "Dễ test giả thuyết", "Phù hợp compliance chặt"], cons: ["Tốn công setup", "Dễ hẹp quá thiếu learning"], when: "Cần kiểm soát vùng/đối tượng hoặc đang học thị trường" },
    "Có data conversion ổn → thử Advantage+; đang test giả thuyết hoặc ngành nhạy cảm → manual.",
  ),
  "lead-ads-hay-website-form-b21": compare(
    "Lead Ads",
    "Website form",
    "<strong>Lead ads hay website form</strong>: Lead Ads thu form ngay trên FB/IG; form website kiểm soát trải nghiệm và SEO/landing tốt hơn nhưng thêm bước thoát.",
    "Lead ads hay website form? So sánh thu lead trên Meta và form website.",
    "Facebook lead form, form website, CPL",
    { name: "Lead Ads", pros: ["Ma sát thấp", "Thu lead nhanh", "Không cần web phức tạp"], cons: ["Lead dễ ảo/ít nhiệt", "Khó nurture trên site"], when: "Cần volume lead nhanh, dịch vụ gọi lại ngay" },
    { name: "Website form", pros: ["Message-match landing", "Đo hành vi trên site", "Thương hiệu chuyên nghiệp hơn"], cons: ["Dễ rớt nếu web chậm", "Cần Pixel tốt"], when: "Ticket cao, cần giáo dục trước khi để lại SĐT" },
    "Ticket thấp/volume → Lead Ads; ticket cao/cần tin tưởng → website form + ads traffic/conversion.",
  ),
  "catalog-ads-hay-dynamic-ads-b21": compare(
    "Catalog Ads",
    "Dynamic Ads",
    "<strong>Catalog ads hay dynamic ads</strong>: catalog là nguồn sản phẩm; dynamic ads là cách phân phối sản phẩm từ catalog theo hành vi từng người.",
    "Catalog ads hay dynamic ads? Khác nhau thế nào trên Meta ecommerce.",
    "product catalog, DPA, Advantage+ catalog",
    { name: "Catalog Ads", pros: ["Quản lý tập trung feed", "Đồng bộ giá/tồn", "Nền cho nhiều dạng ads"], cons: ["Cần feed sạch", "Setup kỹ thuật hơn"], when: "Có nhiều SKU cần đồng bộ" },
    { name: "Dynamic Ads", pros: ["Cá nhân hóa item đã xem", "Retarget mạnh", "Giảm làm creative từng SP"], cons: ["Phụ thuộc pixel hành vi", "Giá sai nếu feed lỗi"], when: "TMĐT có traffic xem sản phẩm" },
    "Làm sạch catalog trước; dynamic/Advantage+ catalog là lớp chạy ads trên catalog đó.",
  ),
  "video-ads-hay-image-ads-b21": compare(
    "Video ads",
    "Image ads",
    "<strong>Video ads hay image ads</strong>: video mạnh dừng thumb và kể chuyện; ảnh tĩnh nhanh sản xuất, dễ test nhiều biến thể giá/offer.",
    "Video ads hay image ads Meta? Chọn format creative theo mục tiêu và ngân sách sản xuất.",
    "creative Meta, video vs ảnh quảng cáo",
    { name: "Video ads", pros: ["Hook mạnh", "Giải thích sản phẩm tốt", "Hợp Reels/Stories"], cons: ["Cost sản xuất cao hơn", "Cần edit mobile-first"], when: "Cần demo, storytelling, awareness" },
    { name: "Image ads", pros: ["Làm nhanh nhiều variant", "Rõ offer/giá", "Dễ A/B copy"], cons: ["Dễ bị trôi feed", "Kém kể chuyện phức tạp"], when: "Test offer nhanh hoặc ngân sách creative mỏng" },
    "Test cả hai: dùng ảnh để tìm offer thắng, video để scale awareness/conversion.",
  ),
  "messenger-ads-hay-click-ads-b21": compare(
    "Messenger ads",
    "Click-to-web ads",
    "<strong>Messenger ads hay click ads</strong> (về web): Messenger tối ưu hội thoại; click-to-web tối ưu form/đơn trên landing.",
    "Messenger ads hay click ads? Chọn đường chuyển đổi chat hoặc website.",
    "click to Messenger, traffic ads, conversion path",
    { name: "Messenger ads", pros: ["Tư vấn nhanh", "Phù hợp dịch vụ", "Giảm phụ thuộc web"], cons: ["Cần đội chat/bot", "Khó scale nếu reply chậm"], when: "Bán tư vấn, lịch hẹn, báo giá" },
    { name: "Click-to-web", pros: ["Đo conversion rõ", "Landing chuyên nghiệp", "Dễ CRM form"], cons: ["Ma sát cao hơn", "Web chậm = mất lead"], when: "Có landing chuẩn và quy trình form" },
    "Có team inbox tốt → Messenger; có landing/CRM mạnh → click-to-web.",
  ),
  "retargeting-hay-prospecting-b21": compare(
    "Retargeting",
    "Prospecting",
    "<strong>Retargeting hay prospecting</strong>: prospecting tìm khách mới; retargeting chốt khách đã biết bạn. Cần cả hai theo tỷ lệ ngân sách.",
    "Retargeting hay prospecting? Phân bổ ngân sách Meta Ads cold và warm.",
    "cold traffic, remarketing, funnel Meta",
    { name: "Retargeting", pros: ["CPA thường thấp hơn", "Tỷ lệ chốt cao", "Creative nhắc lợi ích"], cons: ["Tệp hữu hạn", "Dễ bão hòa frequency"], when: "Đã có traffic/engagement" },
    { name: "Prospecting", pros: ["Mở rộng tệp", "Nuôi retarget pool", "Scale dài hạn"], cons: ["CPA cao hơn", "Cần creative mạnh"], when: "Cần tăng lead mới liên tục" },
    "Đừng chỉ retarget — hết tệp sẽ chết. Tỷ lệ phổ biến: nghiêng prospecting khi scale, giữ retarget ổn định.",
  ),
  "lookalike-hay-interest-targeting-b21": compare(
    "Lookalike",
    "Interest targeting",
    "<strong>Lookalike hay interest targeting</strong>: interest dựa sở thích khai báo; lookalike dựa giống khách đã chuyển đổi — thường mạnh hơn khi seed chất lượng.",
    "Lookalike hay interest targeting? Chọn cách nhắm đối tượng Meta Ads.",
    "LAL vs interest, audience Meta",
    { name: "Lookalike", pros: ["Gần khách đã mua/lead", "Scale tốt khi seed sạch"], cons: ["Cần đủ data nguồn", "Seed xấu → loãng"], when: "Có từ 100–300+ conversion chất lượng" },
    { name: "Interest", pros: ["Chạy ngay khi ít data", "Dễ giả thuyết ngành"], cons: ["Overlap và cạnh tranh", "Dễ lệch intent"], when: "Mới bắt đầu hoặc ngành mới" },
    "Mới → interest/broad; có data → lookalike từ purchaser/lead chất.",
  ),
  "custom-audience-hay-saved-audience-b21": compare(
    "Custom Audience",
    "Saved Audience",
    "<strong>Custom audience hay saved audience</strong>: custom là tệp đã tương tác/CRM; saved là bộ lọc nhân khẩu+interest bạn lưu lại để tái dùng.",
    "Custom audience hay saved audience? Khác nhau trên Meta Ads Manager.",
    "saved audience Meta, custom audience",
    { name: "Custom Audience", pros: ["Warm/hot", "Retarget & exclusion"], cons: ["Phụ thuộc pixel/CRM", "Có thể quá nhỏ"], when: "Remarketing hoặc loại trừ khách cũ" },
    { name: "Saved Audience", pros: ["Tái dùng bộ lọc cold", "Setup nhanh"], cons: ["Không phải tệp đã biết bạn", "Dễ lỗi thời interest"], when: "Prospecting theo giả thuyết cố định" },
    "Retarget/exclusion → custom; lưu bộ lọc cold → saved. Không thay thế nhau.",
  ),
  "pixel-hay-capi-b21": compare(
    "Meta Pixel",
    "CAPI",
    "<strong>Pixel hay CAPI</strong>: không chọn một — Pixel bắt browser, CAPI bắt server; Meta khuyến nghị dùng cả hai và deduplicate.",
    "Pixel hay CAPI? Nên dùng Meta Pixel và Conversion API thế nào.",
    "Meta Pixel, Conversion API, dedup event",
    { name: "Meta Pixel", pros: ["Setup nhanh", "Debug dễ bằng extension", "Đủ cho nhiều SME"], cons: ["Mất signal cookie/adblock"], when: "Website có thể gắn JS" },
    { name: "CAPI", pros: ["Bền hơn phía server", "Tăng EMQ", "Hỗ trợ offline"], cons: ["Cần kỹ thuật hơn"], when: "Chạy conversion lớn hoặc Pixel thiếu event" },
    "Chuẩn hiện tại: Pixel + CAPI. Chỉ Pixel khi chưa kịp kỹ thuật; ưu tiên bổ sung CAPI sớm.",
  ),
  "capi-hay-gtm-server-b21": compare(
    "CAPI trực tiếp",
    "GTM server-side",
    "<strong>CAPI hay GTM server</strong>: CAPI là đích gửi sự kiện Meta; GTM server là một cách trung gian triển khai và quản lý tag phía server.",
    "CAPI hay GTM server-side? Cách triển khai server tracking cho Meta.",
    "GTM server, Conversion API setup",
    { name: "CAPI trực tiếp", pros: ["Ít lớp trung gian", "Tích hợp sẵn một số nền tảng"], cons: ["Khó quản lý nhiều pixel/tag"], when: "Stack đơn giản (Shopify app, plugin)" },
    { name: "GTM server", pros: ["Quản lý tập trung", "Gửi đa nền tảng", "Linh hoạt"], cons: ["Chi phí hosting container", "Cần expert"], when: "Nhiều tag/marketing stack phức tạp" },
    "Cùng mục tiêu gửi CAPI — chọn đường triển khai theo đội kỹ thuật.",
  ),
  "event-match-quality-b21": problem(
    "Event Match Quality",
    "<strong>Event Match Quality cao hay thấp</strong> phản ánh Meta khớp được bao nhiêu danh tính từ sự kiện — EMQ thấp làm tối ưu ads kém và attribution lệch.",
    "Event Match Quality cao hay thấp? Cách đọc EMQ Meta và tăng điểm khớp CAPI/Pixel.",
    "EMQ thấp, tăng event match quality",
    ["EMQ màu vàng/đỏ trong Events Manager", "Thiếu email/phone/fbp/fbc", "Purchase/Lead không khớp CRM", "Ads học chậm dù có spend"],
    ["Gửi CAPI thiếu tham số user", "Form không collect đủ field để hash", "Không truyền fbc/fbp", "Event browser và server lệch nhau"],
  ),
  "broad-targeting-hay-narrow-b21": compare(
    "Broad targeting",
    "Narrow targeting",
    "<strong>Broad targeting hay narrow</strong>: broad để thuật toán tự tìm; narrow siết interest/vùng. Xu hướng 2024–2026 nghiêng broad khi có tín hiệu conversion mạnh.",
    "Broad targeting hay narrow? Chiến lược nhắm đối tượng Meta Ads 2026.",
    "Advantage+ audience, narrow interest",
    { name: "Broad", pros: ["Học nhanh hơn khi đủ event", "Giảm overlap interest", "Phù hợp Advantage+"], cons: ["Khó kiểm soát", "Cần creative/signal tốt"], when: "Pixel ổn, đủ conversion" },
    { name: "Narrow", pros: ["Kiểm soát vùng/ngành", "Dễ giả thuyết ban đầu"], cons: ["Dễ hẹp hết audience", "CPM có thể cao"], when: "Địa phương hẹp hoặc compliance" },
    "Có conversion ổn → broad/Advantage+; mới test hoặc khu vực nhỏ → narrow vừa phải.",
  ),
  "daily-budget-hay-lifetime-b21": compare(
    "Daily budget",
    "Lifetime budget",
    "<strong>Daily budget hay lifetime</strong>: daily chi trung bình mỗi ngày; lifetime phân bổ trong cả lịch chạy — hữu ích khi có ngày cao điểm.",
    "Daily budget hay lifetime Meta Ads? Chọn kiểu ngân sách chiến dịch.",
    "ngân sách ngày Meta, lifetime budget",
    { name: "Daily budget", pros: ["Dễ kiểm soát chi tiêu ngày", "Phổ biến khi luôn-on"], cons: ["Ít linh hoạt theo ngày trong tuần"], when: "Chạy liên tục, ngân sách ổn định" },
    { name: "Lifetime budget", pros: ["Meta phân bổ theo cơ hội chuyển đổi", "Hợp campaign có end date"], cons: ["Có ngày burn nhanh nếu không cap"], when: "Flash sale, lịch cố định" },
    "Always-on → daily; chiến dịch có hạn và đỉnh rõ → lifetime + schedule.",
  ),
  "cpm-hay-cpa-optimization-b21": compare(
    "Tối ưu CPM/reach",
    "Tối ưu CPA/conversion",
    "<strong>CPM hay CPA optimization</strong>: tối ưu hiển thị rẻ (awareness) khác tối ưu chi phí mỗi chuyển đổi. Chọn sai objective = KPI lệch.",
    "CPM hay CPA optimization? Chọn mục tiêu tối ưu đúng KPI Meta Ads.",
    "tối ưu conversion, awareness CPM",
    { name: "CPM/Reach", pros: ["Phủ nhanh", "Chi phí hiển thị thấp hơn"], cons: ["Không đảm bảo lead/đơn"], when: "Branding, phủ vùng" },
    { name: "CPA/Conversion", pros: ["Bám kết quả kinh doanh", "Thuật toán tối ưu event"], cons: ["Cần đủ event", "CPM có thể cao hơn"], when: "Cần lead/đơn đo được" },
    "Muốn khách hàng → conversion/CPA. Đừng tối ưu CPM rồi kỳ vọng ra đơn.",
  ),
  "roas-hay-conversion-volume-b21": compare(
    "Tối ưu ROAS",
    "Tối ưu conversion volume",
    "<strong>ROAS hay conversion volume</strong>: ROAS ưu tiên đơn lời; volume ưu tiên số lượng chuyển đổi — có thể chấp nhận ROAS thấp hơn để lấy data/scale.",
    "ROAS hay conversion volume? Bidding ecommerce Meta Ads.",
    "value optimization, số lượng conversion",
    { name: "ROAS", pros: ["Bảo vệ biên lợi nhuận", "Loại traffic kém giá trị"], cons: ["Volume có thể thấp", "Cần value tracking đúng"], when: "Catalog ổn, cần hiệu quả vốn" },
    { name: "Volume", pros: ["Nhiều đơn/lead hơn", "Học nhanh"], cons: ["Có thể giảm biên"], when: "Push doanh số, clearing tồn" },
    "Lợi nhuận gắt → ROAS; cần tốc độ và learning → volume rồi siết ROAS.",
  ),
  "carousel-ads-hay-single-image-b21": compare(
    "Carousel ads",
    "Single image",
    "<strong>Carousel ads hay single image</strong>: carousel kể nhiều lợi ích/sản phẩm; single image tập trung một thông điệp/offer rõ.",
    "Carousel ads hay single image? Format ảnh Meta Ads.",
    "carousel Facebook, single image ads",
    { name: "Carousel", pros: ["Nhiều SP/USP", "Vuốt tương tác", "Kể story theo card"], cons: ["Thiết kế nhiều frame", "Thông điệp dễ loãng"], when: "Catalog nhiều item hoặc nhiều lợi ích" },
    { name: "Single image", pros: ["Rõ một CTA", "Sản xuất nhanh", "Dễ đọc mobile"], cons: ["Ít chỗ kể chuyện"], when: "Offer đơn, test nhanh" },
    "Offer đơn → single; nhiều SP/USP → carousel. Luôn test CTR và CPA.",
  ),
  "reels-ads-hay-feed-ads-b21": compare(
    "Reels ads",
    "Feed ads",
    "<strong>Reels ads hay feed ads</strong>: Reels thiên storytelling ngắn và discovery; Feed ổn định hơn cho offer rõ và retarget.",
    "Reels ads hay feed ads Instagram/Facebook? Chọn placement.",
    "Reels placement, feed ads Meta",
    { name: "Reels ads", pros: ["Hook mạnh", "Reach discovery", "Hợp UGC"], cons: ["Cần video dọc chất", "ThruPlay thấp nếu hook yếu"], when: "Awareness và creative video tốt" },
    { name: "Feed ads", pros: ["Dễ đọc offer", "Retarget quen thuộc"], cons: ["Cạnh tranh feed cao"], when: "Conversion offer rõ, remarketing" },
    "Awareness/UGC → Reels; chốt đơn/lead → Feed (hoặc chạy cả hai và đọc breakdown).",
  ),
  "stories-ads-hay-explore-ads-b21": compare(
    "Stories ads",
    "Explore ads",
    "<strong>Stories ads hay Explore ads</strong>: Stories full-screen tạm thời, CTA nhanh; Explore mang tính khám phá với người chưa follow bạn.",
    "Stories ads hay Explore ads Instagram? Khác biệt placement.",
    "Instagram Stories ads, Explore ads",
    { name: "Stories", pros: ["Full màn hình", "Cảm giác原生", "Hợp countdown/offer"], cons: ["Người dùng vuốt rất nhanh"], when: "Offer ngắn, remarketing nóng" },
    { name: "Explore", pros: ["Tiếp cận người mới", "Discovery"], cons: ["Kiểm soát kém hơn", "Phụ thuộc creative hút"], when: "Mở rộng awareness trên IG" },
    "Remarketing/offer → Stories; mở tệp mới trên IG → Explore + creative mạnh.",
  ),
  "utm-tracking-hay-meta-parameter-b21": compare(
    "UTM tracking",
    "Meta parameter",
    "<strong>UTM hay Meta parameter</strong>: UTM giúp GA4/CRM đọc nguồn; dynamic parameter Meta (placement, ad.id…) giúp phân tích trong báo cáo ads. Nên dùng kết hợp.",
    "UTM tracking hay Meta parameter? Đo nguồn traffic ads đúng cách.",
    "UTM Facebook, URL parameter Meta",
    { name: "UTM", pros: ["Chuẩn cho GA4", "Đồng bộ đa kênh"], cons: ["Dễ sai naming", "Không thay Pixel"], when: "Cần báo cáo marketing tổng" },
    { name: "Meta parameter", pros: ["Chi tiết ad/placement", "Tự động trong Ads"], cons: ["Ít hữu ích ngoài hệ Meta"], when: "Tối ưu trong Ads Manager" },
    "Gắn UTM thống nhất + dùng breakdown Meta. Đừng chỉ dựa một phía.",
  ),
  "asc-campaign-hay-catalog-campaign-b21": compare(
    "ASC",
    "Catalog campaign thủ công",
    "<strong>ASC hay catalog campaign</strong>: ASC (Advantage+ Shopping) tự động mạnh cho sales; catalog thủ công kiểm soát audience/creative hơn.",
    "ASC hay catalog campaign? Ecommerce Meta Ads chọn kiểu nào.",
    "Advantage+ Shopping, catalog sales",
    { name: "ASC", pros: ["Tự động tối ưu sales", "Ít setup"], cons: ["Ít kiểm soát", "Cần tín hiệu mua tốt"], when: "TMĐT có pixel purchase ổn" },
    { name: "Catalog thủ công", pros: ["Kiểm soát tệp", "Test rõ giả thuyết"], cons: ["Tốn công hơn"], when: "Cần siết vùng/đối tượng hoặc compliance" },
    "Purchase ổn → ASC; cần kiểm soát chặt → catalog/manual.",
  ),
  "retargeting-7-ngay-hay-30-ngay-b21": compare(
    "Retargeting 7 ngày",
    "Retargeting 30 ngày",
    "<strong>Retargeting 7 ngày hay 30 ngày</strong>: 7 ngày nóng, quyết định nhanh; 30 ngày rộng hơn cho chu kỳ cân nhắc dài.",
    "Retargeting 7 ngày hay 30 ngày? Chọn cửa sổ remarketing Meta.",
    "retention window, remarketing window",
    { name: "7 ngày", pros: ["Intent còn nóng", "Frequency dễ kiểm soát"], cons: ["Tệp nhỏ"], when: "Flash sale, dịch vụ quyết định nhanh" },
    { name: "30 ngày", pros: ["Tệp lớn hơn", "Phù hợp cân nhắc dài"], cons: ["Dễ fatigue nếu một creative"], when: "B2B, ticket cao, ít mua impulse" },
    "Tách tầng: 1–7 ngày offer mạnh; 8–30 ngày education/trust — đừng gộp một ad set.",
  ),
  "exclusion-audience-hay-khong-b21": compare(
    "Có exclusion",
    "Không exclusion",
    "<strong>Exclusion audience hay không</strong>: nên loại khách đã mua/lead/out-of-stock để khỏi trả tiền tiếp cận người không còn phù hợp.",
    "Exclusion audience hay không? Vì sao nên loại tệp khi chạy Meta Ads.",
    "exclude purchaser, loại trừ audience",
    { name: "Có exclusion", pros: ["Giảm lãng phí", "CPA sạch hơn", "Trải nghiệm khách tốt hơn"], cons: ["Setup thêm bước", "Sai exclusion có thể loại nhầm"], when: "Luôn khuyến nghị với sales/lead" },
    { name: "Không exclusion", pros: ["Setup nhanh"], cons: ["Đốt tiền vào khách cũ", "Làm phiền người đã mua"], when: "Chỉ khi cố ý upsell cùng tệp (khi đó dùng creative upsell)" },
    "Mặc định nên exclusion purchaser/lead gần đây; upsell thì tách campaign riêng.",
  ),
  "offline-conversion-hay-online-only-b21": compare(
    "Offline conversion",
    "Online only",
    "<strong>Offline conversion hay online only</strong>: online only đo trên web; offline gửi đơn cửa hàng/CRM về Meta để tối ưu đúng doanh số thực.",
    "Offline conversion hay online only? Khi nào cần CAPI offline events.",
    "offline events Meta, CRM upload",
    { name: "Offline conversion", pros: ["Tối ưu đúng đơn thật", "Phù hợp showroom/clinic"], cons: ["Cần đồng bộ CRM", "Trễ dữ liệu nếu upload chậm"], when: "Chốt đơn offline nhiều" },
    { name: "Online only", pros: ["Đơn giản", "Realtime hơn"], cons: ["Bỏ sót doanh số offline"], when: "Bán chủ yếu qua web/TMĐT" },
    "Có tỷ lệ chốt offline đáng kể → bật offline conversion; thuần online thì online only đủ.",
  ),
});

Object.assign(CURATED, {
  "meta-ads-cpc-cao-b21": problem(
    "Meta Ads CPC cao",
    "<strong>Meta Ads CPC cao</strong> nghĩa là mỗi click đắt — thường do cạnh tranh, creative yếu, audience hẹp/overlap hoặc landing khiến thuật toán đẩy click kém chất.",
    "Meta Ads CPC cao — nguyên nhân và cách tối ưu audience, creative để giảm chi phí click.",
    "giảm CPC Meta, CPC Facebook cao",
    ["CPC tăng đột biến", "CTR thấp", "CPM cũng cao", "Nhiều click nhưng ít lead"],
    ["Audience quá hẹp / cạnh tranh", "Creative không dừng thumb", "Placement đắt", "Relevance kém do message lệch"],
    {
      steps: [
        "Đọc breakdown: placement, age, device nào CPC cao",
        "Tăng CTR bằng hook creative mới",
        "Mở broad/lookalike nếu đang hẹp quá",
        "Loại placement kém bằng báo cáo",
        "Kiểm tra landing tốc độ — chất lượng sau click",
        "Test bid/optimization event phù hợp",
      ],
    },
  ),
  "meta-ads-khong-co-chuyen-doi-b21": problem(
    "Meta Ads không có chuyển đổi",
    "<strong>Meta Ads không có chuyển đổi</strong> dù có spend — thường do Pixel sai, objective lệch, landing không khớp hoặc offer yếu.",
    "Meta Ads không có chuyển đổi — checklist Pixel, landing message-match và objective.",
    "không ra lead Meta, ads không conversion",
    ["0 Lead/Purchase trong Ads Manager", "Traffic vào web nhưng bounce cao", "Events Manager không thấy event", "Learning không thoát"],
    ["Pixel/event không fire", "Chọn engagement thay vì conversion", "Landing lệch ad", "Audience không đúng ICP"],
  ),
  "facebook-ads-bi-tu-choi-b21": problem(
    "Facebook Ads bị từ chối",
    "<strong>Facebook Ads bị từ chối</strong> khi vi phạm chính sách Meta (claim, trước/sau, landing, hình ảnh nhạy cảm…) — cần sửa đúng lý do rồi submit lại hoặc kháng cáo.",
    "Facebook Ads bị từ chối — đọc policy, sửa landing/creative và kháng cáo đúng cách.",
    "ads rejected Meta, policy Facebook Ads",
    ["Trạng thái Disapproved", "Lý do trong Ads Manager", "Landing bị flagged", "Tài khoản hạn chế kèm theo"],
    ["Claim tuyệt đối / trước-sau cấm", "Landing thiếu thông tin", "Ảnh/text vi phạm", "Ngành đặc thù thiếu disclaimer"],
  ),
  "instagram-ads-reach-thap-b21": problem(
    "Instagram Ads reach thấp",
    "<strong>Instagram Ads reach thấp</strong> thường do ngân sách thấp, audience nhỏ, creative yếu hoặc bị cạnh tranh/placement hạn chế.",
    "Instagram Ads reach thấp — đổi creative, mở audience và kiểm tra ngân sách placement.",
    "IG ads reach thấp, tăng reach Instagram",
    ["Reach gần như đứng", "Frequency tăng nhanh trên tệp nhỏ", "ThruPlay/CTR thấp", "Delivery limited"],
    ["Audience quá hẹp", "Budget/day thấp", "Creative không đạt", "Account/placement hạn chế"],
  ),
  "pixel-khong-track-b21": problem(
    "Pixel không track",
    "<strong>Pixel không track</strong> khi base code hoặc sự kiện không fire — làm Meta không học được chuyển đổi và custom audience web sai.",
    "Pixel không track — sửa event Meta Pixel: GTM, consent, duplicate và test events.",
    "Meta Pixel lỗi, không ghi nhận sự kiện",
    ["Events Manager không có PageView/Lead", "Pixel Helper đỏ", "Ads không tối ưu được conversion", "Audience website = 0"],
    ["Sai Pixel ID", "GTM trigger sai", "Consent chặn trước khi grant", "Conflict nhiều Pixel", "Trang SPA không virtual pageview"],
  ),
  "capi-event-match-thap-b21": problem(
    "CAPI event match thấp",
    "<strong>CAPI event match thấp</strong> (EMQ thấp) nghĩa là Meta khó khớp user — cần gửi thêm email/phone hash, fbp/fbc, IP, UA và đồng bộ dedup.",
    "CAPI event match thấp — bổ sung parameter để tăng Event Match Quality.",
    "EMQ thấp, tăng match CAPI",
    ["EMQ thấp trong Events Manager", "Ít parameter xanh", "Số Purchase lệch CRM", "Tối ưu chậm"],
    ["Thiếu PII hash", "Không có fbc từ click ads", "Server không lấy IP/UA", "Form ẩn field email/phone"],
  ),
  "retargeting-khong-hieu-qua-b21": problem(
    "Retargeting không hiệu quả",
    "<strong>Retargeting không hiệu quả</strong> khi gộp cả tệp lạnh-nóng, frequency cao, creative cũ hoặc không exclusion người đã chuyển đổi.",
    "Retargeting không hiệu quả — tách tệp 7/30 ngày, đổi creative và exclusion.",
    "remarketing kém, retarget CPA cao",
    ["CPA retarget cao hơn prospecting", "CTR giảm mạnh", "Frequency > 4–5", "Cùng người thấy mãi một ads"],
    ["Gộp 180 ngày một ad set", "Không exclusion purchaser", "Creative fatigue", "Offer không đổi"],
  ),
  "lookalike-audience-loang-b21": problem(
    "Lookalike audience loãng",
    "<strong>Lookalike audience loãng</strong> khi seed nguồn kém (lead ảo, ít purchaser) hoặc % quá rộng — tệp giống khách thật ngày càng lệch.",
    "Lookalike audience loãng — seed lại từ purchaser/lead chất và thu hẹp %.",
    "LAL yếu, lookalike không ra đơn",
    ["Lookalike CPA cao", "Overlap với interest kém", "Ít conversion từ LAL", "Seed < 100 sự kiện chất"],
    ["Seed từ engagers thay vì buyers", "% 5–10 quá rộng", "Lead form ảo làm bẩn seed", "Không refresh source"],
  ),
  "catalog-ads-loi-san-pham-b21": problem(
    "Catalog ads lỗi sản phẩm",
    "<strong>Catalog ads lỗi sản phẩm</strong> khi feed thiếu field, URL/ảnh chết, hoặc item bị reject — ads không phân phối đúng SP.",
    "Catalog ads lỗi sản phẩm — sửa product feed Meta: title, image, link, availability.",
    "catalog feed error, sản phẩm bị reject",
    ["Item rejected trong Commerce Manager", "Ads không hiện đúng SP", "Cảnh báo feed", "Dynamic không chạy"],
    ["Thiếu id/title/image_link/link", "Giá/availability sai format", "Landing 404", "Policy title/ảnh"],
  ),
  "lead-ads-it-lead-b21": problem(
    "Lead ads ít lead",
    "<strong>Lead ads ít lead</strong> thường do form dài, offer yếu, audience lệch hoặc creative không nói rõ lợi ích để lại SĐT.",
    "Lead ads ít lead — rút ngắn form, rõ offer và tối ưu audience Meta.",
    "CPL cao, lead form ít đăng ký",
    ["CPL tăng", "Tỷ lệ mở form thấp", "Nhiều lead ảo", "Learning kéo dài"],
    ["Quá nhiều câu hỏi", "CTA mơ hồ", "Audience không ICP", "Thiếu social proof"],
  ),
  "messenger-ads-khong-phai-hoi-b21": problem(
    "Messenger ads không phản hồi",
    "<strong>Messenger ads không phản hồi</strong> (khách vào chat nhưng team/bot im) làm phí click và giảm chất lượng tối ưu mục tiêu message.",
    "Messenger ads không phản hồi — setup bot chào + SLA inbox để giữ lead.",
    "Messenger không reply, chatbot Meta",
    ["Nhiều cuộc chat chưa đọc", "Khách hỏi 1 câu rồi out", "Chi phí/tin nhắn cao", "Ice breakers không chạy"],
    ["Không có tin nhắn tự động", "Ngoài giờ không bot", "Thiếu kịch bản tư vấn", "Nhân sự inbox mỏng"],
  ),
  "advantage-plus-ngan-sach-het-nhanh-b21": problem(
    "Advantage+ ngân sách hết nhanh",
    "<strong>Advantage+ ngân sách hết nhanh</strong> khi thuật toán đẩy spend vào phân đoạn đắt hoặc thiếu cap — cần siết bid, schedule và tín hiệu value.",
    "Advantage Plus ngân sách hết nhanh — chỉnh bid, cap và tín hiệu conversion.",
    "ASC burn budget, Advantage+ hết tiền",
    ["Budget ngày cháy sớm", "CPM/CPA tăng", "Spend dồn 1 placement", "Ít kiểm soát audience"],
    ["Bid quá thoải mái", "Signal conversion yếu", "Creative hút click kém chất", "Không cost cap/ROAS floor"],
  ),
  "roas-meta-ads-thap-b21": problem(
    "ROAS Meta Ads thấp",
    "<strong>ROAS Meta Ads thấp</strong> nghĩa là doanh thu ads thấp so với chi phí — cần audit funnel: traffic → landing → offer → product → tracking value.",
    "ROAS Meta Ads thấp — audit funnel, value tracking và creative/offer.",
    "tăng ROAS Facebook, ROAS thấp",
    ["ROAS < mục tiêu", "Nhiều add-to-cart ít purchase", "AOV thấp", "Purchase value sai"],
    ["Giá/cước ship kém cạnh tranh", "Landing yếu", "Value không gửi đúng", "Prospecting quá rộng không retarget"],
  ),
  "creative-fatigue-b21": problem(
    "Creative fatigue",
    "<strong>Creative fatigue</strong> xảy ra khi cùng creative chạy quá lâu — frequency tăng, CTR giảm, CPA tăng; cần đổi hook/format.",
    "Creative fatigue — dấu hiệu ads mệt và lịch đổi creative Meta Ads.",
    "ads mệt, CTR giảm CPA tăng",
    ["CTR giảm dần", "Frequency tăng", "CPA tăng dù audience giữ nguyên", "Comment “thấy mãi”"],
    ["Một ad chạy nhiều tuần", "Tệp nhỏ", "Không có biến thể mới", "Retarget không xoay nội dung"],
  ),
  "frequency-qua-cao-b21": problem(
    "Frequency quá cao",
    "<strong>Frequency quá cao</strong> nghĩa là cùng người thấy ads quá nhiều lần — gây mệt và tăng CPA; cần mở audience hoặc giảm budget trên tệp đó.",
    "Frequency quá cao — mở rộng audience, cap tần suất và đổi creative.",
    "tần suất ads cao, giảm frequency",
    ["Frequency > 3–4 trong 7 ngày", "CTR giảm", "Comment tiêu cực", "Reach đứng trong khi spend tăng"],
    ["Audience quá hẹp", "Retarget cửa sổ dài", "Budget cao trên tệp nhỏ", "Không exclusion"],
  ),
  "attribution-sai-b21": problem(
    "Attribution sai",
    "<strong>Attribution sai</strong> khi Ads Manager, GA4 và CRM không cùng một sự thật — thường thiếu CAPI/Pixel đồng bộ hoặc cửa sổ attribution khác nhau.",
    "Attribution sai — đồng bộ Pixel + CAPI và thống nhất cách đọc báo cáo Meta.",
    "lệch số liệu Meta GA4, attribution",
    ["Ads báo nhiều đơn hơn CRM", "GA4 khác Ads Manager", "View-through vs click lệch lớn"],
    ["Chỉ dựa last-click GA4", "Thiếu CAPI dedup", "Offline không upload", "Timezone/report khác"],
  ),
  "custom-audience-qua-nho-b21": problem(
    "Custom audience quá nhỏ",
    "<strong>Custom audience quá nhỏ</strong> khiến ad set khó học và CPM cao — cần nới cửa sổ, gộp nguồn hoặc chuyển sang lookalike/prospecting.",
    "Custom audience quá nhỏ — mở rộng nguồn tệp và cửa sổ thời gian Meta.",
    "audience dưới 1000, tệ quá nhỏ",
    ["Cảnh báo audience nhỏ", "Delivery limited", "CPM cao", "Không thoát learning"],
    ["Cửa sổ 7 ngày quá hẹp", "Ít traffic web", "Chỉ 1 nguồn engagers", "Filter quá chặt"],
  ),
  "retargeting-cart-abandon-b21": problem(
    "Retargeting cart abandon",
    "<strong>Retargeting cart abandon không chuyển</strong> khi nhắc giỏ thiếu ưu đãi/niềm tin, giá/ship lệch hoặc creative chỉ “quay lại mua” chung chung.",
    "Retargeting cart abandon không chuyển — đổi offer, social proof và exclusion đã mua.",
    "bỏ giỏ hàng, recover cart Meta",
    ["Nhiều ATC ít Purchase", "CTR retarget ổn nhưng không mua", "Khách than ship/giá"],
    ["Offer không đủ lực", "Checkout ma sát", "Không exclusion purchaser", "Giá dynamic sai"],
  ),
  "capi-duplicate-event-b21": problem(
    "CAPI duplicate event",
    "<strong>CAPI duplicate event</strong> khi Pixel và server gửi cùng chuyển đổi nhưng không cùng event_id — Meta đếm đôi, tối ưu sai.",
    "CAPI duplicate event — cấu hình event_id deduplicate Pixel và server.",
    "trùng sự kiện CAPI, đếm đôi conversion",
    ["Purchase gấp đôi thực tế", "ROAS ảo cao", "Events Manager cảnh báo duplicate"],
    ["Thiếu event_id chung", "Fire 2 lần server", "Plugin vừa Pixel vừa CAPI lệch cấu hình"],
  ),
  "meta-ads-account-bi-han-che-b21": problem(
    "Meta Ads account bị hạn chế",
    "<strong>Meta Ads account bị hạn chế</strong> làm giảm khả năng chạy ads — cần tuân thủ policy, xác minh danh tính/doanh nghiệp và kháng cáo đúng quy trình.",
    "Meta Ads account bị hạn chế — nguyên nhân, xác minh và kháng cáo.",
    "ad account restricted, hạn chế quảng cáo Meta",
    ["Không tạo ads được", "Spend limit tụt", "Cảnh báo trong BM", "Payment bị hold"],
    ["Vi phạm lặp", "Thanh toán rủi ro", "Thiếu xác minh business", "Domain/Fanpage liên quan từng lỗi"],
  ),
  "landing-page-khong-khop-quang-cao-b21": problem(
    "Landing page không khớp quảng cáo",
    "<strong>Landing page không khớp quảng cáo</strong> (message mismatch) khiến khách click rồi thoát — CTR ảo, CPA cao dù ads đẹp.",
    "Landing page không khớp quảng cáo — chỉnh headline, offer và CTA message-match.",
    "message match, ads lệch landing",
    ["Bounce cao", "Thời gian trên trang thấp", "Form start thấp", "CPA tăng dù CTR tốt"],
    ["Ad hứa A landing nói B", "Khác giá/khuyến mãi", "CTA khác nhau", "Thiếu trust trên landing"],
  ),
  "video-ads-view-3s-thap-b21": problem(
    "Video ads view 3s thấp",
    "<strong>Video ads view 3s thấp</strong> nghĩa là hầu hết người xem không dừng 3 giây đầu — hook yếu, thumbnail/cảnh mở nhàm hoặc sai placement.",
    "Video ads view 3s thấp — làm lại hook 1–3 giây đầu cho Reels/Feed.",
    "thruPlay thấp, video hook yếu",
    ["3-second video plays thấp", "ThruPlay kém", "CPM cao kèm CTR thấp"],
    ["Mở đầu logo dài", "Không có text hook", "Âm thanh phụ thuộc", "Sai tỉ lệ khung hình"],
  ),
  "interest-targeting-sai-b21": problem(
    "Interest targeting sai",
    "<strong>Interest targeting sai</strong> khi chọn sở thích lệch ICP — traffic rẻ nhưng không ra lead/đơn chất lượng.",
    "Interest targeting sai — research lại ICP và test interest/lookalike Meta.",
    "nhắm interest lệch, audience sai",
    ["CTR ổn nhưng CPL cao", "Lead không nghe máy", "Overlap interest rộng", "Báo cáo age/gender lệch khách thật"],
    ["Chọn interest theo cảm tính", "Quá nhiều interest loãng", "Không đối chiếu khách đã mua", "Bỏ qua exclusion"],
  ),
  "offline-event-khong-dong-bo-b21": problem(
    "Offline event không đồng bộ",
    "<strong>Offline event không đồng bộ</strong> khi đơn cửa hàng/CRM không về Meta đúng hạn — thuật toán thiếu tín hiệu chốt thật.",
    "Offline event không đồng bộ — sửa upload CAPI/CRM offline conversions.",
    "offline conversion lỗi, CRM không lên Meta",
    ["Đơn offline không thấy trong Events", "ROAS thiếu", "Dataset offline trống"],
    ["Sai format upload", "Thiếu khớp SĐT/email", "Upload trễ quá cửa sổ", "Token/dataset sai"],
  ),
  "dynamic-ads-gia-sai-b21": problem(
    "Dynamic ads giá sai",
    "<strong>Dynamic ads giá sai</strong> khi catalog/feed chưa sync giá mới — khách thấy giá ảo, trust và conversion giảm.",
    "Dynamic ads giá sai — đồng bộ lại catalog feed giá và availability.",
    "giá catalog sai, DPA sai giá",
    ["Ads hiện giá cũ", "Landing khác giá ads", "Item bị khiếu nại"],
    ["Feed cache chưa update", "Sai field price/sale_price", "Đa biến thể SKU lệch", "Timezone/currency sai"],
  ),
});

const stubs = KEYWORDS_500_BATCH21.filter((e) => KEYWORDS_500_BATCH21_MARKETING_ONLY.has(e.slug));
const missing = stubs.filter((e) => !CURATED[e.slug]).map((e) => e.slug);
if (missing.length) {
  console.error("Missing curated:", missing.join(", "));
  process.exit(1);
}

const entries = stubs.map((s) => {
  const c = CURATED[s.slug];
  return {
    slug: s.slug,
    keywordsMain: s.keywordsMain,
    h1: s.h1,
    ...c,
  };
});

if (entries.length !== 70) {
  console.error("Expected 70, got", entries.length);
  process.exit(1);
}

const out = `/** Auto-generated by _gen-meta-b21-intent-data.mjs — intent content for Meta batch21 marketing stubs */
export const META_B21_INTENT_ENTRIES = ${JSON.stringify(entries, null, 2)};

export const META_B21_INTENT_BY_SLUG = Object.fromEntries(
  META_B21_INTENT_ENTRIES.map((e) => [e.slug, e]),
);

if (META_B21_INTENT_ENTRIES.length !== 70) {
  throw new Error(\`META_B21_INTENT_ENTRIES expected 70, got \${META_B21_INTENT_ENTRIES.length}\`);
}
`;

const dest = path.join(root, "seo-meta-b21-intent-data.mjs");
fs.writeFileSync(dest, out, "utf8");
console.log("Wrote", dest, "entries=", entries.length);
console.log("lagi", entries.filter((e) => e.intent === "lagi").length);
console.log("compare", entries.filter((e) => e.intent === "compare").length);
console.log("problem", entries.filter((e) => e.intent === "problem").length);

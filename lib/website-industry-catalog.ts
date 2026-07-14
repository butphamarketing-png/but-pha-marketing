import type { IndustryHubSlug } from "@/lib/industry-hub";
import { getWebsiteIndustryCardThumbnail } from "@/lib/website-industry-images";

export type WebsiteIndustryCatalogItem = {
  slug: string;
  label: string;
  title: string;
  description: string;
  primaryKeyword: string;
  /** Slug bài INDUSTRY_ENTRIES / blog money page */
  blogMoneySlug: string;
  hubSlug?: IndustryHubSlug;
  caseStudySlug?: string;
  features: string[];
  faqs: { q: string; a: string }[];
  processSteps: { title: string; desc: string }[];
  wordCount: number;
  faqCount: number;
  internalLinkCount: number;
  proofCount: number;
  hasCaseStudy: boolean;
  hasLocalEntity: boolean;
  duplicateRisk: "low" | "medium" | "high";
  indexOverride?: "index" | "noindex";
};

const BASE_PROCESS = [
  { title: "Khảo sát ngành", desc: "Phân tích đối thủ, từ khóa và hành trình khách hàng trong ngành." },
  { title: "Wireframe & UI", desc: "Thiết kế layout theo chuẩn ngành — mobile-first, CTA rõ." },
  { title: "Lập trình & tích hợp", desc: "Form, Zalo, booking, schema — tùy ngành." },
  { title: "SEO on-page", desc: "Title, meta, heading, internal link silo ngành." },
  { title: "Bàn giao & đào tạo", desc: "Hướng dẫn CMS, checklist vận hành sau go-live." },
];

function item(
  partial: Omit<
    WebsiteIndustryCatalogItem,
    "wordCount" | "faqCount" | "internalLinkCount" | "proofCount" | "processSteps"
  > & { processSteps?: WebsiteIndustryCatalogItem["processSteps"] },
): WebsiteIndustryCatalogItem {
  const faqCount = partial.faqs.length;
  const proofCount = (partial.hasCaseStudy ? 2 : 0) + (partial.hubSlug ? 1 : 0) + 1;
  return {
    ...partial,
    processSteps: partial.processSteps ?? BASE_PROCESS,
    wordCount: 1650 + faqCount * 80 + partial.features.length * 40,
    faqCount,
    internalLinkCount: 10 + (partial.hubSlug ? 4 : 0) + (partial.hasCaseStudy ? 2 : 0),
    proofCount,
    indexOverride: partial.indexOverride ?? "index",
  };
}

/** 22 landing ngành — silo money page kiểu VNS. */
export const WEBSITE_INDUSTRY_CATALOG: WebsiteIndustryCatalogItem[] = [
  item({
    slug: "nha-khoa",
    label: "Nha khoa",
    title: "Thiết kế website nha khoa chuẩn SEO",
    description:
      "Website nha khoa chuyên sâu: implant, niềng răng, đặt lịch online, SEO local và case study Nha Khoa Đăng Khoa có số liệu GSC.",
    primaryKeyword: "thiết kế website nha khoa",
    blogMoneySlug: "thiet-ke-website-nha-khoa",
    hubSlug: "nha-khoa",
    caseStudySlug: "nha-khoa-dang-khoa",
    hasCaseStudy: true,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Trang dịch vụ: implant, niềng răng, tẩy trắng, nha khoa trẻ em",
      "Form đặt lịch khám + nhắc lịch Zalo/SMS",
      "Giới thiệu bác sĩ, chứng chỉ và thiết bị",
      "Bảng giá tham khảo minh bạch",
      "Blog giáo dục sức khỏe răng miệng chuẩn SEO Y tế",
      "Schema MedicalBusiness / LocalBusiness",
    ],
    faqs: [
      {
        q: "Website nha khoa cần bao nhiêu trang?",
        a: "Tối thiểu 5–8 trang: trang chủ, dịch vụ, bảng giá, đội ngũ, gallery, đặt lịch, blog và liên hệ.",
      },
      {
        q: "Có tích hợp đặt lịch trực tuyến không?",
        a: "Có. Form đặt lịch kết hợp Zalo hoặc plugin booking giúp giảm nhỡ cuộc hẹn.",
      },
      {
        q: "Làm sao website nha khoa lên top Google Maps?",
        a: "Kết hợp SEO on-page, schema LocalBusiness và liên kết Google Business Profile.",
      },
      {
        q: "Giá thiết kế website nha khoa?",
        a: "Gói Bứt Phá từ 6–12 triệu tùy số trang dịch vụ và tích hợp booking.",
      },
    ],
  }),
  item({
    slug: "spa",
    label: "Spa & làm đẹp",
    title: "Thiết kế website spa chuyên nghiệp",
    description: "Website spa: đặt lịch liệu trình, gallery dịch vụ, SEO local — case study Phước Lai Luxury & Halee Trâm.",
    primaryKeyword: "thiết kế website spa",
    blogMoneySlug: "thiet-ke-website-spa",
    hubSlug: "spa",
    caseStudySlug: "phuoc-lai-luxury",
    hasCaseStudy: true,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Đặt lịch hẹn online và nhắc lịch Zalo",
      "Gallery dịch vụ, bảng giá gói liệu trình",
      "Landing page từng liệu trình facial/body",
      "Review khách hàng before/after có kiểm duyệt",
      "Blog tips chăm sóc da hỗ trợ SEO local",
      "Tích hợp Zalo/Messenger tư vấn nhanh",
    ],
    faqs: [
      { q: "Website spa cần nhấn mạnh gì?", a: "Hình ảnh dịch vụ, bảng giá rõ, đặt lịch dễ trên mobile." },
      { q: "Có chạy ads Facebook từ website không?", a: "Có — pixel Meta + landing riêng từng dịch vụ đo chuyển đổi." },
      { q: "Thời gian triển khai?", a: "Thường 3–4 tuần tùy số dịch vụ và gallery." },
      { q: "Giá website spa?", a: "Từ 6 triệu (Business) đến 12 triệu+ (Pro có booking)." },
    ],
  }),
  item({
    slug: "tham-my",
    label: "Thẩm mỹ viện",
    title: "Thiết kế website thẩm mỹ viện",
    description: "Website thẩm mỹ viện: showcase dịch vụ filler/botox, đặt lịch, SEO local TP.HCM — case study Thiên Hoàng Kim.",
    primaryKeyword: "thiết kế website thẩm mỹ viện",
    blogMoneySlug: "thiet-ke-website-tham-my-vien",
    hubSlug: "tham-my",
    caseStudySlug: "tham-my-thien-hoang-kim",
    hasCaseStudy: true,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Showcase filler, botox, căng da, giảm mỡ",
      "Album kết quả thực tế và video testimonial",
      "Landing khuyến mãi theo mùa",
      "Chat Zalo/Messenger trên mobile",
      "Blog chuyên gia làm đẹp an toàn",
      "Tuân thủ quảng cáo y tế — nội dung trung thực",
    ],
    faqs: [
      { q: "Website thẩm mỹ cần yếu tố gì?", a: "Uy tín bác sĩ, giấy phép, quy trình an toàn, giá minh bạch." },
      { q: "Có landing page cho từng dịch vụ?", a: "Có — tối ưu ads và SEO long-tail theo dịch vụ." },
      { q: "Giao diện nên tông màu thế nào?", a: "Tông sáng, sang trọng — trắng, hồng pastel phù hợp ngành làm đẹp." },
      { q: "Giá website thẩm mỹ viện?", a: "Từ 6–12 triệu tùy số trang dịch vụ và tích hợp." },
    ],
  }),
  item({
    slug: "phong-kham",
    label: "Phòng khám",
    title: "Thiết kế website phòng khám đa khoa",
    description: "Website phòng khám: chuyên khoa, đặt lịch, tra cứu kết quả — SEO y tế và case study Nha Khoa Đăng Khoa.",
    primaryKeyword: "thiết kế website phòng khám",
    blogMoneySlug: "thiet-ke-website-phong-kham-da-khoa",
    hubSlug: "phong-kham",
    caseStudySlug: "nha-khoa-dang-khoa",
    hasCaseStudy: true,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Danh mục chuyên khoa và lịch bác sĩ trực",
      "Đặt lịch khám theo chuyên khoa",
      "Thông tin BHYT và quy trình khám",
      "Blog sức khỏe chuẩn SEO",
      "Schema MedicalOrganization",
      "Portal tra cứu kết quả (tùy chọn)",
    ],
    faqs: [
      { q: "Website phòng khám khác nha khoa thế nào?", a: "Nhiều chuyên khoa hơn, cần cấu trúc điều hướng rõ theo triệu chứng/dịch vụ." },
      { q: "Có cần tuân thủ quy định y tế?", a: "Có — nội dung trung thực, không cam kết tuyệt đối, ghi rõ giấy phép." },
      { q: "Tích hợp đặt lịch online?", a: "Có — form + Zalo, giảm tải lễ tân." },
      { q: "Giá bao nhiêu?", a: "Từ 6–12 triệu tùy số chuyên khoa và tính năng portal." },
    ],
  }),
  item({
    slug: "xay-dung",
    label: "Xây dựng",
    title: "Thiết kế website công ty xây dựng",
    description: "Website nhà thầu: hồ sơ năng lực, dự án tiêu biểu, SEO B2B — case study Kiến Trúc Sao Khuê.",
    primaryKeyword: "thiết kế website xây dựng",
    blogMoneySlug: "thiet-ke-website-xay-dung-nha-thau",
    hubSlug: "xay-dung",
    caseStudySlug: "kien-truc-sao-khue",
    hasCaseStudy: true,
    hasLocalEntity: false,
    duplicateRisk: "low",
    features: [
      "Hồ sơ năng lực (HSNL) tải PDF",
      "Gallery dự án đã thi công",
      "Trang dịch vụ: thi công, thiết kế, giám sát",
      "Form báo giá / khảo sát công trình",
      "Blog kỹ thuật xây dựng SEO",
      "Schema Organization + Service",
    ],
    faqs: [
      { q: "Website xây dựng cần trang gì?", a: "HSNL, dự án, dịch vụ, đội ngũ, chứng chỉ, liên hệ — tối thiểu 8–12 trang." },
      { q: "Có hỗ trợ SEO từ khóa nhà thầu?", a: "Có — cluster theo loại công trình và khu vực." },
      { q: "Thời gian triển khai?", a: "3–5 tuần tùy số dự án trong portfolio." },
      { q: "Giá website công ty xây dựng?", a: "Từ 8–15 triệu cho website đa trang B2B." },
    ],
  }),
  item({
    slug: "my-pham",
    label: "Mỹ phẩm",
    title: "Thiết kế website mỹ phẩm",
    description: "Website shop mỹ phẩm / thương hiệu làm đẹp: catalog, review, SEO ecommerce — case study Glow Dew Beauty (skincare D2C).",
    primaryKeyword: "thiết kế website mỹ phẩm",
    blogMoneySlug: "thiet-ke-website-my-pham-lam-dep",
    hubSlug: "my-pham",
    caseStudySlug: "glow-dew-cosmetics",
    hasCaseStudy: true,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Catalog sản phẩm theo dòng / skin type",
      "Review và hướng dẫn sử dụng",
      "Tích hợp giỏ hàng hoặc lead Zalo",
      "Blog content SEO ingredient",
      "Landing chiến dịch theo mùa",
      "Schema Product (tùy chọn)",
    ],
    faqs: [
      { q: "Website mỹ phẩm có cần ecommerce?", a: "Tùy mô hình — có thể catalog + Zalo hoặc WooCommerce đầy đủ." },
      { q: "SEO mỹ phẩm cạnh tranh cao?", a: "Cần cluster long-tail theo thành phần và nhu cầu da." },
      { q: "Giá website mỹ phẩm?", a: "Từ 6–12 triệu tùy catalog và thanh toán." },
      { q: "Thời gian?", a: "2–4 tuần." },
    ],
  }),
  item({
    slug: "pccc",
    label: "PCCC",
    title: "Thiết kế website công ty PCCC",
    description: "Website PCCC: thiết bị chữa cháy, tư vấn, chứng chỉ — B2B và SEO ngành an toàn.",
    primaryKeyword: "thiết kế website pccc",
    blogMoneySlug: "thiet-ke-website-pccc",
    hubSlug: "pccc",
    caseStudySlug: "pccc-bao-an-fire",
    hasCaseStudy: true,
    hasLocalEntity: false,
    duplicateRisk: "low",
    features: [
      "Catalog thiết bị PCCC theo danh mục",
      "Trang dịch vụ: tư vấn, lắp đặt, bảo trì",
      "Hồ sơ chứng chỉ, giấy phép",
      "Form báo giá dự án",
      "Blog tiêu chuẩn PCCC",
      "Schema Service B2B",
    ],
    faqs: [
      { q: "Website PCCC cần gì đặc biệt?", a: "Catalog kỹ thuật, chứng chỉ, case dự án — khách B2B cần tin cậy." },
      { q: "Có SEO từ khóa thiết bị chữa cháy?", a: "Có — cluster theo loại thiết bị và tiêu chuẩn." },
      { q: "Giá?", a: "Từ 6–12 triệu." },
      { q: "Thời gian?", a: "3–4 tuần." },
    ],
  }),
  item({
    slug: "logistics",
    label: "Logistics",
    title: "Thiết kế website logistics & vận tải",
    description:
      "Website công ty vận tải, kho bãi, freight — lead B2B, SEO ngành logistics và case study Vận Tốc Express (form báo giá + tra cứu vận đơn).",
    primaryKeyword: "thiết kế website logistics",
    blogMoneySlug: "thiet-ke-website-logistics-van-tai",
    hubSlug: "logistics",
    caseStudySlug: "van-toc-express-logistics",
    hasCaseStudy: true,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Trang dịch vụ: đường bộ, biển, kho",
      "Form báo giá vận chuyển",
      "Theo dõi đơn hàng (tùy chọn)",
      "Mạng lưới chi nhánh / coverage map",
      "Blog ngành logistics",
      "Đa ngôn ngữ (tùy chọn)",
    ],
    faqs: [
      { q: "Website logistics khác gì shop?", a: "Tập trung lead B2B, báo giá, uy tín — không bán lẻ." },
      { q: "Có tích hợp tracking?", a: "Có thể embed hoặc API tùy hệ thống hiện có." },
      { q: "Giá?", a: "Từ 6–12 triệu." },
      { q: "SEO logistics?", a: "Cluster theo tuyến, loại hàng, dịch vụ kho." },
    ],
  }),
  item({
    slug: "co-khi",
    label: "Cơ khí",
    title: "Thiết kế website cơ khí & gia công",
    description: "Website xưởng cơ khí, CNC, gia công chính xác — catalog B2B và SEO ngành.",
    primaryKeyword: "thiết kế website cơ khí",
    blogMoneySlug: "thiet-ke-website-co-khi",
    hubSlug: "co-khi",
    hasCaseStudy: false,
    hasLocalEntity: false,
    duplicateRisk: "low",
    features: [
      "Catalog máy móc / năng lực gia công",
      "Hồ sơ năng lực tải PDF",
      "Form gửi bản vẽ / RFQ",
      "Gallery sản phẩm gia công",
      "Blog kỹ thuật CNC",
      "Schema Organization",
    ],
    faqs: [
      { q: "Website cơ khí cần trang gì?", a: "Năng lực, máy móc, sản phẩm, quy trình QC, liên hệ." },
      { q: "Khách B2B tìm gì?", a: "Uy tín, chứng chỉ ISO, case gia công tương tự." },
      { q: "Giá?", a: "Từ 6–12 triệu." },
      { q: "Thời gian?", a: "3–5 tuần." },
    ],
  }),
  item({
    slug: "bao-bi",
    label: "Bao bì",
    title: "Thiết kế website công ty bao bì",
    description: "Website in ấn bao bì, nhãn mác — catalog sản phẩm và lead B2B.",
    primaryKeyword: "thiết kế website bao bì",
    blogMoneySlug: "thiet-ke-website-bao-bi",
    hubSlug: "bao-bi",
    hasCaseStudy: false,
    hasLocalEntity: false,
    duplicateRisk: "low",
    features: [
      "Catalog loại bao bì: carton, nhựa, túi",
      "Gallery mẫu in thực tế",
      "Form báo giá in ấn",
      "MOQ và quy trình đặt hàng",
      "Blog packaging trends",
      "Schema Service",
    ],
    faqs: [
      { q: "Website bao bì cần showcase gì?", a: "Mẫu in, công nghệ in, MOQ, thời gian giao." },
      { q: "Có upload file thiết kế?", a: "Có thể tích hợp form upload RFQ." },
      { q: "Giá?", a: "Từ 6–10 triệu." },
      { q: "SEO?", a: "Cluster theo loại bao bì và ngành hàng." },
    ],
  }),
  item({
    slug: "luat",
    label: "Luật sư",
    title: "Thiết kế website công ty luật",
    description: "Website văn phòng luật: lĩnh vực tư vấn, đội ngũ luật sư, SEO legal.",
    primaryKeyword: "thiết kế website công ty luật",
    blogMoneySlug: "thiet-ke-website-cong-ty-luat",
    hubSlug: "luat",
    hasCaseStudy: false,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Trang lĩnh vực: doanh nghiệp, đất đai, lao động",
      "Hồ sơ luật sư và kinh nghiệm",
      "Blog pháp lý SEO",
      "Form tư vấn bảo mật",
      "Schema LegalService",
      "Đa ngôn ngữ (tùy chọn)",
    ],
    faqs: [
      { q: "Website luật cần tuân thủ gì?", a: "Không cam kết kết quả vụ án, ghi rõ thông tin luật sư." },
      { q: "SEO từ khóa luật?", a: "Cluster theo lĩnh vực và địa phương." },
      { q: "Giá?", a: "Từ 6–12 triệu." },
      { q: "Thời gian?", a: "3–4 tuần." },
    ],
  }),
  item({
    slug: "thang-may",
    label: "Thang máy",
    title: "Thiết kế website công ty thang máy",
    description: "Website thang máy: sản phẩm, bảo trì, chứng chỉ — B2B và SEO ngành.",
    primaryKeyword: "thiết kế website thang máy",
    blogMoneySlug: "thiet-ke-website-thang-may",
    hubSlug: "thang-may",
    hasCaseStudy: false,
    hasLocalEntity: false,
    duplicateRisk: "low",
    features: [
      "Catalog loại thang: khách, hàng, thực phẩm",
      "Dịch vụ lắp đặt và bảo trì",
      "Chứng chỉ, tiêu chuẩn an toàn",
      "Form khảo sát công trình",
      "Case dự án đã lắp",
      "Blog kỹ thuật thang máy",
    ],
    faqs: [
      { q: "Khách B2B cần gì trên web?", a: "Chứng chỉ, case công trình, hotline bảo trì." },
      { q: "Giá website?", a: "Từ 6–12 triệu." },
      { q: "SEO?", a: "Cluster thang máy + địa phương." },
      { q: "Thời gian?", a: "3–4 tuần." },
    ],
  }),
  item({
    slug: "tu-dong-hoa",
    label: "Tự động hóa",
    title: "Thiết kế website công ty tự động hóa",
    description: "Website PLC, SCADA, giải pháp nhà máy — B2B và SEO ngành tự động hóa.",
    primaryKeyword: "thiết kế website tự động hóa",
    blogMoneySlug: "thiet-ke-website-tu-dong-hoa",
    hubSlug: "tu-dong-hoa",
    hasCaseStudy: false,
    hasLocalEntity: false,
    duplicateRisk: "low",
    features: [
      "Giải pháp theo ngành: F&B, dược, logistics",
      "Case triển khai SCADA/PLC",
      "Catalog thiết bị đối tác",
      "Form tư vấn dự án",
      "Blog Industry 4.0",
      "Schema Service B2B",
    ],
    faqs: [
      { q: "Website tự động hóa khác web bán hàng?", a: "Tập trung giải pháp, case B2B, không giỏ hàng." },
      { q: "Giá?", a: "Từ 8–15 triệu." },
      { q: "SEO?", a: "Cluster PLC, SCADA, ngành áp dụng." },
      { q: "Thời gian?", a: "4–6 tuần." },
    ],
  }),
  item({
    slug: "nha-hang",
    label: "Nhà hàng",
    title: "Thiết kế website nhà hàng",
    description: "Website nhà hàng: menu online, đặt bàn, gallery món — SEO local F&B và hub silo nhà hàng.",
    primaryKeyword: "thiết kế website nhà hàng",
    blogMoneySlug: "thiet-ke-website-nha-hang",
    hubSlug: "nha-hang",
    hasCaseStudy: false,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Menu online có hình ảnh món",
      "Đặt bàn / đặt tiệc online",
      "Gallery không gian nhà hàng",
      "Khuyến mãi và sự kiện",
      "Tích hợp Google Maps",
      "Blog ẩm thực SEO local",
    ],
    faqs: [
      { q: "Website nhà hàng cần đặt bàn online?", a: "Nên có — giảm nhỡ khách gọi điện, tăng conversion." },
      { q: "Menu có cập nhật dễ không?", a: "CMS WordPress — tự đổi giá/món." },
      { q: "Giá?", a: "Từ 5–10 triệu." },
      { q: "SEO?", a: "Google Maps + từ khóa nhà hàng + quận." },
    ],
  }),
  item({
    slug: "bat-dong-san",
    label: "Bất động sản",
    title: "Thiết kế website bất động sản",
    description:
      "Website BĐS: dự án, filter căn hộ, lead form — SEO real estate và case study Kiến Trúc Sao Khuê (3,4K impression GSC).",
    primaryKeyword: "thiết kế website bất động sản",
    blogMoneySlug: "thiet-ke-website-bat-dong-san",
    hubSlug: "bat-dong-san",
    caseStudySlug: "kien-truc-sao-khue",
    hasCaseStudy: true,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Danh sách dự án / căn hộ có filter",
      "Gallery tiện ích dự án",
      "Form đăng ký xem nhà",
      "Tích hợp CRM lead",
      "Blog thị trường BĐS",
      "Schema RealEstateListing",
    ],
    faqs: [
      { q: "Website BĐS cần filter?", a: "Có — giá, diện tích, quận giúp khách tự lọc." },
      { q: "Có đồng bộ CRM?", a: "Có thể webhook form sang CRM/Zalo." },
      { q: "Giá?", a: "Từ 8–15 triệu tùy số dự án." },
      { q: "SEO?", a: "Cluster theo dự án và khu vực." },
    ],
  }),
  item({
    slug: "anh-ngu",
    label: "Anh ngữ",
    title: "Thiết kế website trung tâm anh ngữ",
    description: "Website trung tâm ngoại ngữ: khóa học, lịch khai giảng, đăng ký học — hub silo anh ngữ và SEO tuyển sinh.",
    primaryKeyword: "thiết kế website trung tâm anh ngữ",
    blogMoneySlug: "thiet-ke-website-trung-tam-anh-ngu",
    hubSlug: "anh-ngu",
    hasCaseStudy: false,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Catalog khóa học theo trình độ",
      "Lịch khai giảng và học thử",
      "Form đăng ký / placement test",
      "Giới thiệu giáo viên bản ngữ",
      "Blog học tiếng Anh SEO",
      "Schema Course / Organization",
    ],
    faqs: [
      { q: "Website anh ngữ cần gì?", a: "Khóa học rõ, học thử dễ đăng ký, review học viên." },
      { q: "Có portal học viên?", a: "Tùy chọn — link LMS hoặc embed." },
      { q: "Giá?", a: "Từ 6–10 triệu." },
      { q: "SEO?", a: "Cluster khóa học + địa phương." },
    ],
  }),
  item({
    slug: "mam-non",
    label: "Trường mầm non",
    title: "Thiết kế website trường mầm non",
    description: "Website trường mầm non: chương trình giáo dục, gallery an toàn, form tham quan nhập học — hub silo mầm non và SEO tuyển sinh.",
    primaryKeyword: "thiết kế website trường mầm non",
    blogMoneySlug: "thiet-ke-website-truong-mam-non",
    hubSlug: "mam-non",
    hasCaseStudy: false,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Giới thiệu chương trình theo độ tuổi",
      "Gallery cơ sở vật chất an toàn",
      "Form đăng ký tham quan & nhập học",
      "Đội ngũ giáo viên và thực đơn",
      "Blog nuôi dạy con cho phụ huynh",
      "Schema EducationalOrganization",
    ],
    faqs: [
      { q: "Website mầm non cần tone màu gì?", a: "Tông tươi sáng, thân thiện — xanh, vàng, hồng nhạt tạo cảm giác an toàn." },
      { q: "Có portal phụ huynh?", a: "Tùy chọn — thông báo, album ảnh lớp học riêng." },
      { q: "Giá?", a: "Từ 7–14 triệu." },
      { q: "SEO?", a: "Từ khóa trường mầm non + quận, nội dung chương trình & cơ sở." },
    ],
  }),
  item({
    slug: "khach-san",
    label: "Khách sạn",
    title: "Thiết kế website khách sạn",
    description:
      "Website khách sạn: phòng, đặt phòng, gallery — SEO hospitality, hub silo đặt phòng và đa ngôn ngữ EN/VI.",
    primaryKeyword: "thiết kế website khách sạn",
    blogMoneySlug: "thiet-ke-website-khach-san",
    hubSlug: "khach-san",
    hasCaseStudy: false,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Catalog phòng và giá theo mùa",
      "Engine đặt phòng hoặc link OTA",
      "Gallery tiện ích khách sạn",
      "Đa ngôn ngữ EN/VI",
      "Blog du lịch địa phương",
      "Schema Hotel",
    ],
    faqs: [
      { q: "Có tích hợp booking engine?", a: "Có — plugin hoặc API channel manager." },
      { q: "Đa ngôn ngữ?", a: "Khuyến nghị EN cho khách quốc tế." },
      { q: "Giá?", a: "Từ 8–15 triệu." },
      { q: "SEO?", a: "Local + từ khóa khách sạn + địa danh." },
    ],
  }),
  item({
    slug: "noi-that",
    label: "Nội thất",
    title: "Thiết kế website nội thất",
    description: "Website studio nội thất: portfolio, dịch vụ thiết kế thi công — hub silo nội thất và SEO phong cách.",
    primaryKeyword: "thiết kế website nội thất",
    blogMoneySlug: "thiet-ke-website-noi-that",
    hubSlug: "noi-that",
    hasCaseStudy: false,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Portfolio dự án theo phong cách",
      "Trang dịch vụ: thiết kế, thi công trọn gói",
      "Form khảo sát nhu cầu",
      "Blog xu hướng nội thất",
      "Gallery before/after",
      "Schema InteriorDesigner",
    ],
    faqs: [
      { q: "Website nội thất cần portfolio?", a: "Bắt buộc — khách quyết định qua hình ảnh dự án." },
      { q: "Giá?", a: "Từ 6–12 triệu." },
      { q: "SEO?", a: "Cluster phong cách + địa phương." },
      { q: "Thời gian?", a: "3–4 tuần." },
    ],
  }),
  item({
    slug: "o-to",
    label: "Ô tô",
    title: "Thiết kế website đại lý ô tô",
    description:
      "Website showroom xe: catalog, trả góp, đăng ký lái thử — hub silo đại lý ô tô và SEO local.",
    primaryKeyword: "thiết kế website đại lý ô tô",
    blogMoneySlug: "thiet-ke-website-gara-o-to",
    hubSlug: "o-to",
    hasCaseStudy: false,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Catalog xe mới / đã qua sử dụng",
      "Filter hãng, giá, dòng xe",
      "Form lái thử và báo giá",
      "Tính trả góp (tùy chọn)",
      "Blog review xe",
      "Schema AutoDealer",
    ],
    faqs: [
      { q: "Website đại lý xe cần filter?", a: "Có — hãng, giá, kiểu dáng." },
      { q: "Có đồng bộ kho xe?", a: "Có thể import CSV hoặc API." },
      { q: "Giá?", a: "Từ 8–15 triệu." },
      { q: "SEO?", a: "Cluster theo dòng xe và địa phương." },
    ],
  }),
  item({
    slug: "thiet-bi-ve-sinh",
    label: "Thiết bị vệ sinh",
    title: "Thiết kế website thiết bị vệ sinh",
    description: "Website showroom thiết bị vệ sinh: catalog, báo giá, SEO ngành — hub silo thiết bị vệ sinh B2B.",
    primaryKeyword: "thiết kế website thiết bị vệ sinh",
    blogMoneySlug: "thiet-ke-website-thiet-bi-ve-sinh",
    hubSlug: "thiet-bi-ve-sinh",
    hasCaseStudy: false,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Catalog theo thương hiệu / loại",
      "Gallery lắp đặt thực tế",
      "Form báo giá công trình",
      "Chương trình đại lý",
      "Blog chọn thiết bị",
      "Schema Store",
    ],
    faqs: [
      { q: "Khách tìm gì trên web?", a: "Catalog, giá tham khảo, showroom địa chỉ." },
      { q: "Giá website?", a: "Từ 6–10 triệu." },
      { q: "SEO?", a: "Cluster thương hiệu + loại sản phẩm." },
      { q: "Thời gian?", a: "2–4 tuần." },
    ],
  }),
  item({
    slug: "in-an",
    label: "In ấn",
    title: "Thiết kế website công ty in ấn",
    description:
      "Website in ấn quảng cáo: dịch vụ in, báo giá nhanh, portfolio — hub silo in ấn B2B và upload file online.",
    primaryKeyword: "thiết kế website in ấn",
    blogMoneySlug: "thiet-ke-website-in-an-quang-cao",
    hubSlug: "in-an",
    hasCaseStudy: false,
    hasLocalEntity: true,
    duplicateRisk: "low",
    features: [
      "Catalog dịch vụ in: offset, digital, bạt",
      "Bảng giá tham khảo / calculator",
      "Upload file in online",
      "Gallery sản phẩm in",
      "Blog in ấn marketing",
      "Form báo giá nhanh",
    ],
    faqs: [
      { q: "Website in ấn cần upload file?", a: "Nên có — giảm email qua lại." },
      { q: "Giá?", a: "Từ 6–10 triệu." },
      { q: "SEO?", a: "Cluster loại in + địa phương." },
      { q: "Thời gian?", a: "2–4 tuần." },
    ],
  }),
  item({
    slug: "landing-page",
    label: "Landing page",
    title: "Thiết kế landing page chuyển đổi cao",
    description:
      "Landing page cho chiến dịch ads, ra mắt sản phẩm — tối ưu CRO và case study Sao Khuê (83K view Fanpage chuyển hướng về web).",
    primaryKeyword: "thiết kế landing page",
    blogMoneySlug: "thiet-ke-website-landing-page-ban-hang",
    caseStudySlug: "kien-truc-sao-khue",
    hasCaseStudy: true,
    hasLocalEntity: false,
    duplicateRisk: "low",
    features: [
      "Single-page message-match ads",
      "A/B test ready layout",
      "Form + pixel tracking",
      "Tốc độ tải < 2s",
      "Mobile-first CTA",
      "Schema WebPage",
    ],
    faqs: [
      { q: "Landing khác website tổng?", a: "Landing 1 mục tiêu chuyển đổi — không menu phức tạp." },
      { q: "Giá landing page?", a: "Từ 3–6 triệu / trang." },
      { q: "Thời gian?", a: "3–7 ngày." },
      { q: "Có tích hợp ads?", a: "Có — GTM, pixel, conversion tracking." },
    ],
  }),
];

export function getWebsiteIndustryCatalogItem(slug: string) {
  return WEBSITE_INDUSTRY_CATALOG.find((item) => item.slug === slug);
}

export type WebsiteIndustryNavLink = {
  label: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export function getWebsiteIndustryNavLinks(): WebsiteIndustryNavLink[] {
  return WEBSITE_INDUSTRY_CATALOG.map((item) => {
    const thumb = getWebsiteIndustryCardThumbnail(item.slug, item.primaryKeyword);
    return {
      label: item.label,
      href: `/website/nganh/${item.slug}`,
      imageSrc: thumb.src,
      imageAlt: thumb.alt,
    };
  });
}

/** Chuyển catalog → config cho seed-programmatic-landings.mjs */
export function toProgrammaticConfigRows() {
  return WEBSITE_INDUSTRY_CATALOG.map((item) => ({
    slug: item.slug,
    title: item.title,
    description: item.description,
    primaryKeyword: item.primaryKeyword,
    wordCount: item.wordCount,
    faqCount: item.faqCount,
    internalLinkCount: item.internalLinkCount,
    proofCount: item.proofCount,
    hasCaseStudy: item.hasCaseStudy,
    hasLocalEntity: item.hasLocalEntity,
    duplicateRisk: item.duplicateRisk,
    indexOverride: item.indexOverride,
  }));
}

/**
 * Nội dung địa phương unique cho landing /seo-website/dia-phuong/{slug}
 * — giảm soft-duplicate giữa các quận/thành.
 */

export type LocalSeoFaq = { q: string; a: string };

export type LocalSeoContent = {
  displayName: string;
  parentSlug: string | null;
  parentLabel: string | null;
  /** Nét riêng khu vực — dùng làm “điểm khác” so với trang tỉnh */
  highlights: string[];
  napTips: string[];
  processSteps: { title: string; desc: string }[];
  faqs: LocalSeoFaq[];
  industryHints: string[];
};

const HCM_DISTRICTS = ["quan-1", "quan-3", "quan-7", "binh-thanh", "thu-duc", "go-vap"] as const;
const HN_DISTRICTS = ["cau-giay", "dong-da", "hai-ba-trung", "nam-tu-liem"] as const;
const DN_DISTRICTS = ["hai-chau", "thanh-khe"] as const;

export const LOCAL_SEO_CHILDREN: Record<string, string[]> = {
  "ho-chi-minh": [...HCM_DISTRICTS],
  "ha-noi": [...HN_DISTRICTS],
  "da-nang": [...DN_DISTRICTS],
};

function cityShell(
  displayName: string,
  extras: Partial<LocalSeoContent> & Pick<LocalSeoContent, "highlights" | "industryHints">,
): LocalSeoContent {
  return {
    displayName,
    parentSlug: null,
    parentLabel: null,
    napTips: [
      "Đồng bộ Name – Address – Phone trên website, GBP và directory (VietnamWorks Business, Zalo OA).",
      "Địa chỉ trên footer website khớp chính xác với Google Business Profile.",
      "Mỗi chi nhánh tách listing GBP riêng — không nhồi nhiều địa chỉ vào một profile.",
    ],
    processSteps: [
      { title: "Audit local pack", desc: `Kiểm tra ranking Maps + NAP cho «${displayName}».` },
      { title: "Landing + schema", desc: "Service + LocalBusiness, message-match từ khóa địa phương." },
      { title: "Citation & review", desc: "Đồng bộ thư mục + quy trình xin/đáp review." },
      { title: "Đo GSC / Maps", desc: "Theo dõi query geo + form lead theo tuần." },
    ],
    faqs: [
      {
        q: `SEO Website tại ${displayName} khác SEO toàn quốc thế nào?`,
        a: "Local SEO ưu tiên Google Maps, NAP, citation và từ khóa có modifier địa phương — không chỉ ranking organic toàn quốc.",
      },
      {
        q: "Có cần trang riêng từng quận không?",
        a: "Có nếu bạn phục vụ rõ theo quận (phòng khám, spa, F&B). Trang quận phải có evidence địa phương thật — không copy template tỉnh.",
      },
      {
        q: "Bao lâu để vào local pack?",
        a: "Thường 4–12 tuần tùy cạnh tranh ngành và độ sạch NAP; ngành y tế/thẩm mỹ trung tâm thường dài hơn.",
      },
    ],
    ...extras,
  };
}

function districtShell(opts: {
  displayName: string;
  parentSlug: string;
  parentLabel: string;
  highlights: string[];
  industryHints: string[];
  napExtra?: string;
  faqLocal?: LocalSeoFaq;
}): LocalSeoContent {
  return {
    displayName: opts.displayName,
    parentSlug: opts.parentSlug,
    parentLabel: opts.parentLabel,
    highlights: opts.highlights,
    industryHints: opts.industryHints,
    napTips: [
      `Gắn địa chỉ / khu vực phục vụ rõ «${opts.displayName}» trên GBP (service area + primary category).`,
      opts.napExtra ??
        "Hotline và tên thương hiệu trên landing trùng 100% với card Google Maps.",
      "Ảnh GBP: mặt tiền + không gian thật tại quận — tránh stock generic.",
      "Internal link về trang tỉnh/thành mẹ và /google-maps, /banggia.",
    ],
    processSteps: [
      {
        title: "Keyword quận",
        desc: `Map «dịch vụ + ${opts.displayName}» và «gần tôi» → landing + FAQ.`,
      },
      {
        title: "GBP quận",
        desc: "Category, giờ mở cửa, Q&A, post tuần — khớp CTA đặt lịch trên web.",
      },
      {
        title: "On-page geo",
        desc: "H1/title có modifier quận; schema LocalBusiness; NAP footer.",
      },
      {
        title: "Silo money",
        desc: "Link /banggia · /website · /seo-website · case study có số liệu.",
      },
    ],
    faqs: [
      opts.faqLocal ?? {
        q: `Làm SEO Website ${opts.displayName} có cần văn phòng tại quận?`,
        a: "Không bắt buộc có showroom, nhưng GBP cần địa chỉ phục vụ hợp lệ và NAP nhất quán. Service-area business vẫn rank nếu citation sạch.",
      },
      {
        q: `Nên làm trang ${opts.displayName} hay chỉ trang ${opts.parentLabel}?`,
        a: `Trang tỉnh/thành (${opts.parentLabel}) là hub; trang quận bắt query thương mại cao («… ${opts.displayName}»). Hai trang phải khác proof và ngành trọng tâm.`,
      },
      {
        q: "Chi phí SEO địa phương quận khoảng bao nhiêu?",
        a: "Tham khảo bảng giá tại /banggia — scope local thường gồm GBP + landing + content cluster 3–6 tháng.",
      },
      {
        q: "Có gắn Google Maps trên website không?",
        a: "Có — embed Maps + CTA gọi/Zalo. Xem thêm dịch vụ /google-maps.",
      },
    ],
  };
}

export const LOCAL_SEO_CONTENT: Record<string, LocalSeoContent> = {
  "ho-chi-minh": cityShell("TP.HCM", {
    highlights: [
      "Thị trường cạnh tranh cao nhất VN — ưu tiên NAP sạch trước khi scale content.",
      "Hub quận: Q.1, Q.3, Q.7, Bình Thạnh, Thủ Đức, Gò Vấp.",
      "Kết hợp /website theo ngành (nha khoa, spa, F&B) + local modifier.",
    ],
    industryHints: ["nha khoa", "spa", "thẩm mỹ", "F&B", "BĐS"],
  }),
  "ha-noi": cityShell("Hà Nội", {
    highlights: [
      "Local pack Hà Nội nhạy citation + review theo quận trung tâm.",
      "Hub quận: Cầu Giấy, Đống Đa, Hai Bà Trưng, Nam Từ Liêm.",
      "Keywords giáo dục / y tế / IT thường convert qua form đặt lịch.",
    ],
    industryHints: ["phòng khám", "đào tạo", "spa", "nha khoa", "IT service"],
  }),
  "da-nang": cityShell("Đà Nẵng", {
    highlights: [
      "Mùa cao điểm du lịch — tối ưu category Maps F&B / resort / spa.",
      "Hub quận: Hải Châu, Thanh Khê.",
      "Schema + ảnh địa điểm thật quan trọng hơn spam blog tỉnh.",
    ],
    industryHints: ["khách sạn", "spa", "F&B", "thẩm mỹ", "tour"],
  }),
  "can-tho": cityShell("Cần Thơ", {
    highlights: ["ĐBSCL — SME dịch vụ + phòng khám đa khoa.", "Maps + Zalo OA là kênh lead chính."],
    industryHints: ["phòng khám", "xây dựng", "F&B", "giáo dục"],
  }),
  "binh-duong": cityShell("Bình Dương", {
    highlights: ["KCN + SME peri-HCM — intent B2B và local service lẫn.", "Citation khu Thuận An / Dĩ An."],
    industryHints: ["xây dựng", "công nghiệp", "phòng khám", "nhà hàng"],
  }),
  "dong-nai": cityShell("Đồng Nai", {
    highlights: ["Biên Hòa hub — logistics và dịch vụ gia đình.", "Đồng bộ NAP chi nhánh Biên Hòa vs HCM."],
    industryHints: ["xây dựng", "logistics", "nha khoa", "F&B"],
  }),
  "hai-phong": cityShell("Hải Phòng", {
    highlights: ["Cảng / logistics + dịch vụ đô thị.", "Local pack cạnh tranh vừa — cơ hội mid-tail geo."],
    industryHints: ["logistics", "F&B", "phòng khám", "xây dựng"],
  }),
  "nha-trang": cityShell("Nha Trang", {
    highlights: ["Du lịch biển — seasonality content + Maps photos.", "Spa / khách sạn / tour."],
    industryHints: ["resort", "spa", "F&B", "tour"],
  }),
  hue: cityShell("Huế", {
    highlights: ["Du lịch di sản + F&B địa phương.", "Citation + review tiếng Việt quan trọng."],
    industryHints: ["homestay", "F&B", "spa", "tour"],
  }),
  vinh: cityShell("Vinh", {
    highlights: ["Hub Nghệ An — SME tỉnh lớn miền Trung.", "Local + brand search song song."],
    industryHints: ["phòng khám", "xây dựng", "giáo dục", "F&B"],
  }),
  "thanh-hoa": cityShell("Thanh Hóa", {
    highlights: ["Tỉnh lớn — phủ huyện dần sau hub thành phố.", "GBP consistency trên chuỗi chi nhánh."],
    industryHints: ["xây dựng", "phòng khám", "F&B", "giáo dục"],
  }),
  "binh-thuan": cityShell("Bình Thuận", {
    highlights: ["Phan Thiết / resort biển — ảnh thật & seasonality.", "Maps category resort/F&B."],
    industryHints: ["resort", "spa", "F&B", "bất động sản nghỉ dưỡng"],
  }),

  "quan-1": districtShell({
    displayName: "Quận 1",
    parentSlug: "ho-chi-minh",
    parentLabel: "TP.HCM",
    highlights: [
      "Cạnh tranh Maps cao nhất Sài Gòn — cần review velocity và NAP tuyệt đối sạch.",
      "Trọng tâm: văn phòng dịch vụ, F&B trung tâm, thẩm mỹ premium.",
      "Landing nhấn CTA «đặt lịch / tư vấn» khớp giờ mở cửa GBP.",
    ],
    industryHints: ["thẩm mỹ", "F&B", "luật / tư vấn", "spa"],
    napExtra: "Địa chỉ Quận 1 trên Maps phải khớp số nhà + đường; tránh chỉ ghi «Q.1» chung chung.",
    faqLocal: {
      q: "SEO Quận 1 có khó hơn các quận khác?",
      a: "Có — mật độ listing cao. Ưu tiên category đúng, ảnh mặt tiền, và landing không trùng nội dung tỉnh.",
    },
  }),
  "quan-3": districtShell({
    displayName: "Quận 3",
    parentSlug: "ho-chi-minh",
    parentLabel: "TP.HCM",
    highlights: [
      "Cụm y tế – spa – studio dày; query «gần tôi» convert tốt trên mobile.",
      "Nội dung nhấn tuyến đường/nổi tiếng khu (không spam keyword).",
      "FAQ đặt lịch 24h / tư vấn Zalo giảm bounce từ Maps.",
    ],
    industryHints: ["phòng khám", "spa", "nha khoa", "studio ảnh"],
    faqLocal: {
      q: "Nên tối ưu Maps hay website trước ở Quận 3?",
      a: "Sạch NAP + GBP trước 2–4 tuần, song song landing message-match — local pack cần cả hai.",
    },
  }),
  "quan-7": districtShell({
    displayName: "Quận 7",
    parentSlug: "ho-chi-minh",
    parentLabel: "TP.HCM",
    highlights: [
      "Phú Mỹ Hưng / Nam Sài Gòn — chuỗi F&B, giáo dục, cửa hàng.",
      "Service area: ghi rõ Quận 7 + huyện Nhà Bè nếu giao hàng.",
      "Ảnh khu vực và map embed giúp trust khách ngoại tỉnh.",
    ],
    industryHints: ["F&B", "giáo dục", "retail", "phòng gym"],
    faqLocal: {
      q: "SEO Quận 7 có khác Phú Mỹ Hưng?",
      a: "Có thể tách landing phụ nếu brand phục vụ riêng Phú Mỹ Hưng; tránh duplicate gần như copy Quận 7.",
    },
  }),
  "binh-thanh": districtShell({
    displayName: "Bình Thạnh",
    parentSlug: "ho-chi-minh",
    parentLabel: "TP.HCM",
    highlights: [
      "Nha khoa / thẩm mỹ / coworking — intent đặt lịch cao.",
      "Citation quanh Xô Viết Nghệ Tĩnh / Điện Biên Phủ giúp relevance geo.",
      "Case proof ngành y tế gắn GSC impressions tăng niềm tin.",
    ],
    industryHints: ["nha khoa", "thẩm mỹ", "coworking", "spa"],
  }),
  "thu-duc": districtShell({
    displayName: "TP. Thủ Đức",
    parentSlug: "ho-chi-minh",
    parentLabel: "TP.HCM",
    highlights: [
      "Gộp Q.2 / Q.9 / Thủ Đức cũ — ghi rõ khu (Thảo Điền, Landmark, High-tech) trong content.",
      "Ngành tech, giáo dục, y tế khu Đông.",
      "Tránh chỉ dùng từ khóa «Thủ Đức» generic không có proof địa điểm.",
    ],
    industryHints: ["giáo dục", "tech service", "phòng khám", "BĐS"],
    faqLocal: {
      q: "GBP ghi Quận 2 cũ hay Thủ Đức?",
      a: "Theo địa chỉ hành chính hiện hành trên giấy phép; website dùng «TP. Thủ Đức» + khu phố cụ thể.",
    },
  }),
  "go-vap": districtShell({
    displayName: "Gò Vấp",
    parentSlug: "ho-chi-minh",
    parentLabel: "TP.HCM",
    highlights: [
      "Đông dân — spa, phòng khám, bán lẻ convert qua «gần tôi».",
      "Tối ưu giờ mở cửa tối (peak traffic khu).",
      "Landing nhấn đường lớn (Quang Trung, Phan Văn Trị) thay vì spam quận.",
    ],
    industryHints: ["spa", "phòng khám", "retail", "F&B"],
  }),
  "cau-giay": districtShell({
    displayName: "Cầu Giấy",
    parentSlug: "ha-noi",
    parentLabel: "Hà Nội",
    highlights: [
      "IT / đào tạo / phòng khám — form lead B2C mạnh.",
      "Đồng bộ NAP với chi nhánh Đống Đa nếu có chuỗi.",
      "Keyword «Cầu Giấy» + ngành > keyword thành phố chung.",
    ],
    industryHints: ["đào tạo", "IT", "phòng khám", "spa"],
  }),
  "dong-da": districtShell({
    displayName: "Đống Đa",
    parentSlug: "ha-noi",
    parentLabel: "Hà Nội",
    highlights: [
      "Y tế + giáo dục + F&B phố trung tâm mở rộng.",
      "Schema LocalBusiness + geo trong FAQ (đường gần).",
      "Review response tiếng Việt kịp thời ảnh hưởng local pack.",
    ],
    industryHints: ["y tế", "giáo dục", "F&B", "nha khoa"],
  }),
  "hai-ba-trung": districtShell({
    displayName: "Hai Bà Trưng",
    parentSlug: "ha-noi",
    parentLabel: "Hà Nội",
    highlights: [
      "Văn phòng + nha khoa + spa khu Đông trung tâm.",
      "Maps category chính xác quan trọng hơn từ khóa nhồi title.",
      "Link nội bộ về hub Hà Nội và /banggia.",
    ],
    industryHints: ["nha khoa", "spa", "văn phòng dịch vụ", "F&B"],
  }),
  "nam-tu-liem": districtShell({
    displayName: "Nam Từ Liêm",
    parentSlug: "ha-noi",
    parentLabel: "Hà Nội",
    highlights: [
      "Mỹ Đình / đô thị mới — BĐS, gym, giáo dục.",
      "Service area rộng: ghi rõ phường phục vụ.",
      "Ảnh công trình / showroom thật giảm bounce từ Ads + Maps.",
    ],
    industryHints: ["BĐS", "gym", "giáo dục", "F&B"],
  }),
  "hai-chau": districtShell({
    displayName: "Hải Châu",
    parentSlug: "da-nang",
    parentLabel: "Đà Nẵng",
    highlights: [
      "Trung tâm Đà Nẵng — F&B / thẩm mỹ / tour cạnh tranh theo mùa.",
      "Ảnh cao điểm + post GBP theo sự kiện địa phương.",
      "Landing CTA đa ngôn ngữ chỉ khi thật sự phục vụ khách quốc tế.",
    ],
    industryHints: ["F&B", "thẩm mỹ", "tour", "spa"],
  }),
  "thanh-khe": districtShell({
    displayName: "Thanh Khê",
    parentSlug: "da-nang",
    parentLabel: "Đà Nẵng",
    highlights: [
      "Phòng khám / spa / dịch vụ hộ gia đình — intent local thuần.",
      "Ít cạnh tranh hơn Hải Châu → cơ hội mid-tail nhanh hơn.",
      "Đồng bộ citation với hub Đà Nẵng, không clone content Hải Châu.",
    ],
    industryHints: ["phòng khám", "spa", "dịch vụ gia đình", "F&B"],
  }),
};

export function getLocalSeoContent(slug: string): LocalSeoContent | null {
  return LOCAL_SEO_CONTENT[slug] ?? null;
}

export function getSiblingDistrictSlugs(slug: string): string[] {
  const content = LOCAL_SEO_CONTENT[slug];
  if (!content?.parentSlug) {
    return LOCAL_SEO_CHILDREN[slug] ?? [];
  }
  return (LOCAL_SEO_CHILDREN[content.parentSlug] ?? []).filter((s) => s !== slug);
}

export function getLocalSeoLabel(slug: string): string {
  return LOCAL_SEO_CONTENT[slug]?.displayName ?? slug;
}

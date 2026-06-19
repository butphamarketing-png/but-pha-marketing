import { PLATFORM_COLORS } from "@/lib/brand-colors";

export type LandingPlatformKey = "website" | "facebook" | "googlemaps";

export type LandingIconName =
  | "Server"
  | "Shield"
  | "Zap"
  | "Globe"
  | "FileText"
  | "LayoutTemplate"
  | "Target"
  | "Megaphone"
  | "Users"
  | "MapPin";

export type LandingHeroVisual =
  | { type: "image"; src: string; alt: string }
  | { type: "platform"; src: string; alt: string }
  | { type: "icons"; icons: LandingIconName[] }
  | { type: "none" };

export type LandingCheckSection = {
  kind: "check-grid";
  id: string;
  label: string;
  title: string;
  items: string[];
  variant: "check" | "cross" | "rocket";
};

export type LandingStepsSection = {
  kind: "steps";
  id: string;
  label: string;
  title: string;
  steps: string[];
  columns?: 3 | 5 | 6;
};

export type LandingEmojiSection = {
  kind: "emoji-grid";
  id: string;
  label: string;
  title: string;
  items: { icon: string; text: string }[];
};

export type LandingPricingKind =
  | "website-build"
  | "website-operation"
  | "website-compare"
  | "website-care"
  | "website-ads"
  | "domain"
  | "fanpage-build"
  | "fanpage-care"
  | "fanpage-ads"
  | "gm-build"
  | "gm-ads";

export type LandingPricingSection = {
  kind: "pricing";
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  pricingKind: LandingPricingKind;
  hidePrices?: boolean;
  chooseLabel?: string;
};

export type LandingInfoSection = {
  kind: "info-cards";
  id: string;
  label: string;
  title: string;
  cards: { title: string; desc: string }[];
};

export type LandingFaqSection = {
  kind: "faq";
  id: string;
  label: string;
  title: string;
  items: { q: string; a: string }[];
};

export type LandingSection =
  | LandingCheckSection
  | LandingStepsSection
  | LandingEmojiSection
  | LandingPricingSection
  | LandingInfoSection
  | LandingFaqSection;

export type ServiceLandingConfig = {
  slug: string;
  platformName: string;
  platformKey: LandingPlatformKey;
  color: string;
  seo: { title: string; description: string; keywords: string[] };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bullets: string[];
    cta: string;
    visual: LandingHeroVisual;
  };
  sections: LandingSection[];
  cta: {
    title: string;
    subtitle: string;
    relatedHref?: string;
    relatedLabel?: string;
  };
};

function navFromSections(sections: LandingSection[]) {
  return [{ id: "hero", label: "Tổng quan" }, ...sections.map((s) => ({ id: s.id, label: s.label })), { id: "cta", label: "Liên hệ" }];
}

export const SERVICE_LANDING_PAGES: Record<string, ServiceLandingConfig> = {
  "website/thietkewebsite": {
    slug: "website/thietkewebsite",
    platformName: "Thiết kế Website",
    platformKey: "website",
    color: PLATFORM_COLORS.website,
    seo: {
      title: "Thiết kế website chuyên nghiệp cho doanh nghiệp | Bứt Phá Marketing",
      description: "Thiết kế website chuẩn SEO, giao diện chuyên nghiệp, tốc độ nhanh. Tư vấn miễn phí — Bứt Phá Marketing.",
      keywords: ["thiết kế website", "làm website doanh nghiệp", "website chuẩn seo"],
    },
    hero: {
      eyebrow: "Website Design",
      title: "Thiết kế website chuyên nghiệp cho doanh nghiệp",
      subtitle: "Website là công cụ tìm kiếm khách hàng 24/7 — không chỉ để giới thiệu.",
      bullets: ["Chuẩn SEO Google", "Giao diện chuyên nghiệp", "Tốc độ tải nhanh", "Responsive mọi thiết bị", "Dễ quản trị nội dung"],
      cta: "Nhận tư vấn miễn phí",
      visual: { type: "image", src: "/tin-tuc/thiet-ke-website.png", alt: "Thiết kế website chuyên nghiệp" },
    },
    sections: [
      {
        kind: "check-grid",
        id: "problems",
        label: "Vấn đề",
        title: "Website đang khiến bạn mất khách?",
        variant: "cross",
        items: [
          "Không có khách từ Google",
          "Giao diện cũ, thiếu chuyên nghiệp",
          "Tải chậm, trải nghiệm kém",
          "Không có đơn vị hỗ trợ kỹ thuật",
          "Đối thủ xuất hiện trước bạn trên tìm kiếm",
        ],
      },
      {
        kind: "check-grid",
        id: "deliverables",
        label: "Bàn giao",
        title: "Bạn nhận được gì sau khi go-live?",
        variant: "check",
        items: [
          "Giao diện theo thương hiệu, chuẩn mobile",
          "Cấu trúc SEO on-page & sitemap",
          "Form liên hệ, Zalo, Messenger, Google Maps",
          "Google Analytics & Search Console",
          "Tài khoản quản trị + hướng dẫn sử dụng",
        ],
      },
      {
        kind: "steps",
        id: "process",
        label: "Quy trình",
        title: "Quy trình triển khai",
        columns: 6,
        steps: ["Tiếp nhận yêu cầu", "Phân tích ngành", "Thiết kế giao diện", "Lập trình", "Kiểm thử & SEO", "Bàn giao"],
      },
      {
        kind: "pricing",
        id: "packages",
        label: "Gói thiết kế",
        title: "Các gói thiết kế website",
        subtitle: "Chọn mức phù hợp — báo giá chi tiết khi tư vấn",
        pricingKind: "website-build",
        hidePrices: true,
        chooseLabel: "Tư vấn gói này",
      },
      {
        kind: "faq",
        id: "faq",
        label: "FAQ",
        title: "Câu hỏi thường gặp",
        items: [
          { q: "Website bao lâu hoàn thành?", a: "Landing page: 3–5 ngày. Website doanh nghiệp: 1–2 tuần. TMĐT: 3–4 tuần tùy phạm vi." },
          { q: "Tôi có thể tự sửa nội dung không?", a: "Có. Bàn giao tài khoản admin và hướng dẫn cập nhật tin tức, sản phẩm." },
          { q: "Website có chuẩn SEO không?", a: "Có — meta, heading, schema, tốc độ và sitemap được tối ưu từ đầu." },
        ],
      },
    ],
    cta: {
      title: "Sở hữu website chuyên nghiệp ngay hôm nay",
      subtitle: "Đừng để khách hàng tìm thấy đối thủ trước khi tìm thấy bạn.",
      relatedHref: "/website/van-hanh-website",
      relatedLabel: "Xem gói vận hành website",
    },
  },

  "website/van-hanh-website": {
    slug: "website/van-hanh-website",
    platformName: "Vận hành Website",
    platformKey: "website",
    color: PLATFORM_COLORS.website,
    seo: {
      title: "Vận hành website chuyên nghiệp — Hosting & bảo trì | Bứt Phá Marketing",
      description: "Gói vận hành website từ 2.500.000đ/năm: hosting, backup, bảo mật, hỗ trợ kỹ thuật.",
      keywords: ["vận hành website", "hosting website", "bảo trì website"],
    },
    hero: {
      eyebrow: "Managed Operations",
      title: "Vận hành website chuyên nghiệp",
      subtitle: "Tập trung kinh doanh — mọi vấn đề kỹ thuật có Bứt Phá Marketing đồng hành.",
      bullets: ["Theo dõi website liên tục", "Backup & bảo mật", "Hỗ trợ xử lý sự cố", "Tối ưu hiệu suất", "Quản lý SSL & tên miền"],
      cta: "Nhận tư vấn",
      visual: { type: "icons", icons: ["Server", "Shield", "Zap", "Globe"] },
    },
    sections: [
      {
        kind: "pricing",
        id: "pricing",
        label: "Bảng giá",
        title: "Các gói vận hành website",
        pricingKind: "website-operation",
        chooseLabel: "Chọn gói",
      },
      {
        kind: "pricing",
        id: "compare",
        label: "So sánh",
        title: "So sánh chi tiết các gói",
        pricingKind: "website-compare",
      },
      {
        kind: "emoji-grid",
        id: "scope",
        label: "Phạm vi",
        title: "Bứt Phá Marketing sẽ làm gì?",
        items: [
          { icon: "🛠️", text: "Theo dõi hoạt động website" },
          { icon: "🔒", text: "Kiểm tra & tăng cường bảo mật" },
          { icon: "💾", text: "Sao lưu dữ liệu định kỳ" },
          { icon: "⚡", text: "Tối ưu tốc độ tải trang" },
          { icon: "📞", text: "Hỗ trợ khi phát sinh sự cố" },
          { icon: "🌐", text: "Quản lý tên miền & SSL" },
        ],
      },
      {
        kind: "steps",
        id: "process",
        label: "Quy trình",
        title: "Quy trình triển khai",
        columns: 5,
        steps: ["Tiếp nhận website", "Kiểm tra hệ thống", "Tư vấn gói", "Thiết lập vận hành", "Theo dõi liên tục"],
      },
    ],
    cta: {
      title: "Website cần được vận hành — không chỉ xây dựng",
      subtitle: "Đừng đợi sự cố mới quan tâm bảo trì.",
      relatedHref: "/website/thietkewebsite",
      relatedLabel: "Thiết kế website mới",
    },
  },

  "website/ten-mien-website": {
    slug: "website/ten-mien-website",
    platformName: "Tên miền Website",
    platformKey: "website",
    color: PLATFORM_COLORS.website,
    seo: {
      title: "Đăng ký tên miền website .com & .vn | Bứt Phá Marketing",
      description: "Đăng ký tên miền quốc tế và Việt Nam, hỗ trợ DNS, trỏ website. Tư vấn miễn phí.",
      keywords: ["đăng ký tên miền", "tên miền website", "domain .com"],
    },
    hero: {
      eyebrow: "Domain Registration",
      title: "Đăng ký tên miền cho thương hiệu",
      subtitle: "Chọn tên miền dễ nhớ, dễ SEO — nền tảng cho mọi hoạt động online.",
      bullets: [".com / .vn / .com.vn", "Hỗ trợ trỏ DNS", "Gia hạn nhắc hạn", "Bảo mật thông tin WHOIS", "Tư vấn chọn tên"],
      cta: "Tra cứu tên miền",
      visual: { type: "icons", icons: ["Globe", "Shield", "MapPin"] },
    },
    sections: [
      {
        kind: "info-cards",
        id: "types",
        label: "Loại tên miền",
        title: "Chọn loại tên miền phù hợp",
        cards: [
          { title: ".com / .net", desc: "Phổ biến quốc tế, phù hợp thương hiệu toàn cầu và SEO quốc tế." },
          { title: ".vn / .com.vn", desc: "Tăng uy tín tại Việt Nam, khách hàng nội địa dễ tin tưởng." },
          { title: "Tên miền riêng", desc: "Tư vấn tên ngắn, dễ nhớ, tránh trùng thương hiệu." },
        ],
      },
      {
        kind: "pricing",
        id: "pricing",
        label: "Danh mục",
        title: "Tra cứu các loại tên miền",
        subtitle: "13 đuôi phổ biến — vuốt ngang hoặc bấm mũi tên để xem thêm",
        pricingKind: "domain",
      },
      {
        kind: "steps",
        id: "process",
        label: "Quy trình",
        title: "Quy trình đăng ký",
        columns: 5,
        steps: ["Tra cứu tên", "Xác nhận & thanh toán", "Kích hoạt tên miền", "Trỏ DNS / hosting", "Gia hạn & nhắc hạn"],
      },
      {
        kind: "faq",
        id: "faq",
        label: "FAQ",
        title: "Câu hỏi về tên miền",
        items: [
          { q: "Tên miền có thuộc quyền sở hữu của tôi không?", a: "Có. Tên miền đứng tên khách hàng, Bứt Phá hỗ trợ quản lý kỹ thuật." },
          { q: "Mất bao lâu để kích hoạt?", a: "Thông thường vài phút đến 24 giờ tùy loại tên miền." },
        ],
      },
    ],
    cta: {
      title: "Giữ tên miền trước khi đối thủ đăng ký",
      subtitle: "Liên hệ để kiểm tra tên miền còn trống.",
      relatedHref: "/website",
      relatedLabel: "Về trang dịch vụ Website",
    },
  },

  "website/cham-soc-website": {
    slug: "website/cham-soc-website",
    platformName: "Chăm sóc Website",
    platformKey: "website",
    color: PLATFORM_COLORS.website,
    seo: {
      title: "Chăm sóc website — Viết bài SEO hàng tháng | Bứt Phá Marketing",
      description: "Gói chăm sóc website theo số bài/tháng: viết SEO, tối ưu on-page, báo cáo tiến độ.",
      keywords: ["chăm sóc website", "viết bài seo website", "content website"],
    },
    hero: {
      eyebrow: "Content & SEO Care",
      title: "Chăm sóc website bài bản hàng tháng",
      subtitle: "Duy trì nội dung mới, tối ưu SEO on-page — website không bị “chết” sau khi lên sóng.",
      bullets: ["Viết & đăng bài SEO", "Tối ưu meta & internal link", "Cập nhật hình ảnh", "Báo cáo hàng tháng", "Chiến lược content"],
      cta: "Nhận tư vấn gói care",
      visual: { type: "icons", icons: ["FileText", "LayoutTemplate", "Target"] },
    },
    sections: [
      {
        kind: "check-grid",
        id: "why",
        label: "Vì sao",
        title: "Vì sao cần chăm sóc website?",
        variant: "check",
        items: [
          "Google ưu tiên website cập nhật thường xuyên",
          "Từ khóa mới cần nội dung mới",
          "Khách thấy doanh nghiệp vẫn hoạt động",
          "Giảm phụ thuộc quảng cáo trả phí",
        ],
      },
      {
        kind: "pricing",
        id: "pricing",
        label: "Bảng giá",
        title: "Gói chăm sóc website",
        subtitle: "Theo số bài viết mỗi tháng",
        pricingKind: "website-care",
        chooseLabel: "Đăng ký ngay",
      },
      {
        kind: "faq",
        id: "faq",
        label: "FAQ",
        title: "Câu hỏi thường gặp",
        items: [
          { q: "Ai cung cấp nội dung?", a: "Bứt Phá viết và đăng bài; thông tin sản phẩm/dịch vụ do bạn cung cấp." },
          { q: "Có cam kết thứ hạng Google không?", a: "Không cam kết vị trí cụ thể — cam kết quy trình, số bài và tối ưu on-page." },
        ],
      },
    ],
    cta: {
      title: "Giữ website sống động mỗi tháng",
      subtitle: "Content đều đặn giúp SEO bền vững.",
      relatedHref: "/website/thietkewebsite",
      relatedLabel: "Thiết kế website mới",
    },
  },

  "website/quang-cao-website": {
    slug: "website/quang-cao-website",
    platformName: "Quảng cáo Website",
    platformKey: "website",
    color: PLATFORM_COLORS.website,
    seo: {
      title: "Quảng cáo website — Google Ads & Meta Ads | Bứt Phá Marketing",
      description: "Chạy quảng cáo trỏ về website, đo chuyển đổi chính xác. Phí quản lý từ 1.000.000đ/tháng.",
      keywords: ["quảng cáo website", "google ads", "meta ads landing page"],
    },
    hero: {
      eyebrow: "Performance Ads",
      title: "Quảng cáo website — đo đúng chuyển đổi",
      subtitle: "Google Ads & Meta Ads trỏ về landing page, pixel tracking và tối ưu CPA/ROAS.",
      bullets: ["Google Ads & Meta Ads", "Landing page & pixel", "Remarketing", "A/B test creative", "Báo cáo minh bạch"],
      cta: "Tư vấn chiến dịch",
      visual: { type: "icons", icons: ["Target", "Megaphone", "Zap"] },
    },
    sections: [
      {
        kind: "check-grid",
        id: "benefits",
        label: "Lợi ích",
        title: "Quảng cáo về website khác gì fanpage?",
        variant: "check",
        items: [
          "Sở hữu dữ liệu khách trên website của bạn",
          "Đo form, gọi điện, chat chính xác hơn",
          "Remarketing đa kênh",
          "SEO + Ads song song tăng hiệu quả",
        ],
      },
      {
        kind: "pricing",
        id: "pricing",
        label: "Phí quản lý",
        title: "Gói quảng cáo website",
        subtitle: "Chưa gồm ngân sách ads",
        pricingKind: "website-ads",
        chooseLabel: "Đăng ký quảng cáo",
      },
    ],
    cta: {
      title: "Biến traffic thành khách hàng thật",
      subtitle: "Landing page + ads + đo lường — một hệ thống.",
      relatedHref: "/website/thietkewebsite",
      relatedLabel: "Thiết kế landing page",
    },
  },

  "facebook/thiet-ke-fanpage": {
    slug: "facebook/thiet-ke-fanpage",
    platformName: "Thiết kế Fanpage",
    platformKey: "facebook",
    color: PLATFORM_COLORS.facebook,
    seo: {
      title: "Thiết kế Fanpage Facebook chuyên nghiệp | Bứt Phá Marketing",
      description: "Xây dựng & cải tạo Fanpage: logo, ảnh bìa, SEO fanpage, chat tự động cơ bản.",
      keywords: ["thiết kế fanpage", "xây dựng fanpage", "cải tạo fanpage"],
    },
    hero: {
      eyebrow: "Fanpage Design",
      title: "Thiết kế Fanpage chuẩn thương hiệu",
      subtitle: "Fanpage không chỉ để đăng bài — là điểm chạm đầu tiên tạo niềm tin.",
      bullets: ["Logo & ảnh bìa chuẩn brand", "Tối ưu thông tin & CTA", "SEO Fanpage", "Hướng dẫn vận hành", "Setup chuyên nghiệp"],
      cta: "Tư vấn thiết kế Fanpage",
      visual: { type: "platform", src: "/Facebook.png", alt: "Thiết kế Fanpage Facebook" },
    },
    sections: [
      {
        kind: "steps",
        id: "process",
        label: "Quy trình",
        title: "Quy trình xây dựng Fanpage",
        columns: 5,
        steps: ["Khảo sát thương hiệu", "Thiết kế visual", "Setup thông tin", "SEO & CTA", "Bàn giao & hướng dẫn"],
      },
      {
        kind: "pricing",
        id: "pricing",
        label: "Bảng giá",
        title: "Gói thiết kế Fanpage",
        pricingKind: "fanpage-build",
        chooseLabel: "Chọn gói",
      },
    ],
    cta: {
      title: "Fanpage chuyên nghiệp — khách tin ngay lần đầu",
      subtitle: "Đầu tư visual một lần, dùng lâu dài.",
      relatedHref: "/facebook/cham-soc-fanpage",
      relatedLabel: "Chăm sóc Fanpage hàng tháng",
    },
  },

  "facebook/cham-soc-fanpage": {
    slug: "facebook/cham-soc-fanpage",
    platformName: "Chăm sóc Fanpage",
    platformKey: "facebook",
    color: PLATFORM_COLORS.facebook,
    seo: {
      title: "Chăm sóc Fanpage — Đăng bài & tương tác | Bứt Phá Marketing",
      description: "Gói chăm sóc Fanpage theo số bài/tháng, tăng tương tác và chuyển đổi tin nhắn.",
      keywords: ["chăm sóc fanpage", "quản trị fanpage", "đăng bài facebook"],
    },
    hero: {
      eyebrow: "Fanpage Care",
      title: "Chăm sóc Fanpage đều đặn",
      subtitle: "Nội dung mới, phản hồi inbox, duy trì tương tác — Fanpage không bị bỏ hoang.",
      bullets: ["Đăng bài theo lịch", "Thiết kế ảnh minh họa", "Trả lời inbox cơ bản", "Báo cáo tương tác", "Chiến lược content"],
      cta: "Nhận tư vấn care",
      visual: { type: "icons", icons: ["Users", "FileText", "Megaphone"] },
    },
    sections: [
      {
        kind: "pricing",
        id: "pricing",
        label: "Bảng giá",
        title: "Gói chăm sóc Fanpage",
        subtitle: "10 / 20 / 30 bài viết mỗi tháng",
        pricingKind: "fanpage-care",
        chooseLabel: "Đăng ký ngay",
      },
      {
        kind: "faq",
        id: "faq",
        label: "FAQ",
        title: "Câu hỏi thường gặp",
        items: [
          { q: "Có cần cung cấp hình ảnh không?", a: "Nên có ảnh sản phẩm/thực tế; team hỗ trợ thiết kế minh họa theo gói." },
          { q: "Có chạy ads kèm không?", a: "Chăm sóc Fanpage là organic content. Quảng cáo xem gói riêng." },
        ],
      },
    ],
    cta: {
      title: "Fanpage sống động — khách nhắn tin nhiều hơn",
      subtitle: "Content đều đặn xây niềm tin trước khi bán.",
      relatedHref: "/facebook/quang-cao-fanpage",
      relatedLabel: "Quảng cáo Fanpage",
    },
  },

  "facebook/quang-cao-fanpage": {
    slug: "facebook/quang-cao-fanpage",
    platformName: "Quảng cáo Fanpage",
    platformKey: "facebook",
    color: PLATFORM_COLORS.facebook,
    seo: {
      title: "Quảng cáo Facebook Fanpage — Meta Ads | Bứt Phá Marketing",
      description: "Quản lý chiến dịch Meta Ads, tối ưu chuyển đổi tin nhắn và lead. Phí quản lý từ 1.000.000đ/tháng.",
      keywords: ["quảng cáo facebook", "meta ads", "quảng cáo fanpage"],
    },
    hero: {
      eyebrow: "Meta Ads",
      title: "Quảng cáo Fanpage — tối ưu chuyển đổi",
      subtitle: "Target đúng khách, A/B test creative, remarketing — minh bạch từng đồng ngân sách.",
      bullets: ["Setup pixel & event", "Target & lookalike", "A/B test creative", "Tối ưu CPA", "Báo cáo hàng tuần"],
      cta: "Tư vấn Meta Ads",
      visual: { type: "icons", icons: ["Target", "Zap", "Megaphone"] },
    },
    sections: [
      {
        kind: "pricing",
        id: "pricing",
        label: "Phí quản lý",
        title: "Gói quảng cáo Fanpage",
        subtitle: "Chưa gồm ngân sách ads",
        pricingKind: "fanpage-ads",
        chooseLabel: "Đăng ký quảng cáo",
      },
      {
        kind: "check-grid",
        id: "commit",
        label: "Cam kết",
        title: "Cam kết của Bứt Phá",
        variant: "rocket",
        items: ["Báo cáo minh bạch hàng tuần", "Không cam kết like ảo", "Tối ưu liên tục", "Tư vấn ngân sách hợp lý"],
      },
    ],
    cta: {
      title: "Đầu tư ads đúng cách — không đốt ngân sách",
      subtitle: "Chiến dịch có đo lường, có tối ưu.",
      relatedHref: "/facebook/thiet-ke-fanpage",
      relatedLabel: "Thiết kế Fanpage trước",
    },
  },

  "google-maps/thiet-ke-google-maps": {
    slug: "google-maps/thiet-ke-google-maps",
    platformName: "Thiết kế Google Maps",
    platformKey: "googlemaps",
    color: PLATFORM_COLORS.googleMaps,
    seo: {
      title: "Thiết kế & tối ưu Google Maps Business | Bứt Phá Marketing",
      description: "Xây dựng, cải tạo và tối ưu Google Business Profile — tăng hiển thị Local Search.",
      keywords: ["thiết kế google maps", "google business profile", "local seo"],
    },
    hero: {
      eyebrow: "Google Business Profile",
      title: "Thiết kế Google Maps cho doanh nghiệp",
      subtitle: "Khách tìm dịch vụ gần đây — bạn cần xuất hiện đầu tiên trên Maps.",
      bullets: ["Tạo / xác minh hồ sơ", "Tối ưu thông tin & danh mục", "Ảnh & bài viết Maps", "SEO Local cơ bản", "Hướng dẫn thu review"],
      cta: "Kiểm tra hồ sơ Maps",
      visual: { type: "platform", src: "/GoogleMaps.png", alt: "Thiết kế Google Maps" },
    },
    sections: [
      {
        kind: "check-grid",
        id: "pain",
        label: "Vấn đề",
        title: "Không lên Maps — mất khách mỗi ngày",
        variant: "cross",
        items: [
          "Khách tìm “gần tôi” không thấy bạn",
          "Thông tin sai, thiếu trên Google",
          "Ít review, thua đối thủ",
          "Không biết cách xác minh doanh nghiệp",
        ],
      },
      {
        kind: "pricing",
        id: "pricing",
        label: "Bảng giá",
        title: "Gói Google Maps",
        pricingKind: "gm-build",
        chooseLabel: "Chọn gói",
      },
      {
        kind: "steps",
        id: "process",
        label: "Quy trình",
        title: "Quy trình triển khai",
        columns: 5,
        steps: ["Audit hồ sơ hiện tại", "Tối ưu thông tin", "Ảnh & bài viết", "Chiến lược review", "Theo dõi thứ hạng"],
      },
    ],
    cta: {
      title: "Xuất hiện trên Maps khi khách đang cần bạn",
      subtitle: "Local Search có ý định mua cao nhất.",
      relatedHref: "/google-maps/quang-cao-google-maps",
      relatedLabel: "Quảng cáo Google Maps",
    },
  },

  "google-maps/quang-cao-google-maps": {
    slug: "google-maps/quang-cao-google-maps",
    platformName: "Quảng cáo Google Maps",
    platformKey: "googlemaps",
    color: PLATFORM_COLORS.googleMaps,
    seo: {
      title: "Quảng cáo Google Maps — Local Ads | Bứt Phá Marketing",
      description: "Chạy quảng cáo Local trên Google Maps, target khu vực, đo gọi điện & chỉ đường.",
      keywords: ["quảng cáo google maps", "local ads", "google maps ads"],
    },
    hero: {
      eyebrow: "Local Ads",
      title: "Quảng cáo Google Maps — khách gần bạn",
      subtitle: "Local Ads target theo bán kính, đo lượt gọi, chỉ đường và form.",
      bullets: ["Local Ads setup", "Target theo khu vực", "Theo dõi gọi & chỉ đường", "Tối ưu chi phí/lead", "Báo cáo rõ ràng"],
      cta: "Tư vấn Local Ads",
      visual: { type: "icons", icons: ["MapPin", "Target", "Megaphone"] },
    },
    sections: [
      {
        kind: "pricing",
        id: "pricing",
        label: "Phí quản lý",
        title: "Gói quảng cáo Google Maps",
        subtitle: "Chưa gồm ngân sách ads",
        pricingKind: "gm-ads",
        chooseLabel: "Đăng ký quảng cáo",
      },
      {
        kind: "info-cards",
        id: "when",
        label: "Khi nào",
        title: "Khi nào nên chạy Local Ads?",
        cards: [
          { title: "Có cửa hàng / văn phòng", desc: "Khách cần đến trực tiếp hoặc gọi điện nhanh." },
          { title: "Cạnh tranh Local cao", desc: "Cần vượt đối thủ trên Maps ngay lập tức." },
          { title: "Đã tối ưu hồ sơ", desc: "Ads hiệu quả nhất khi GBP đã chuẩn — kết hợp gói thiết kế Maps." },
        ],
      },
    ],
    cta: {
      title: "Khách quanh bạn đang tìm — hãy xuất hiện trước",
      subtitle: "Local Ads + hồ sơ chuẩn = lượt gọi tăng.",
      relatedHref: "/google-maps/thiet-ke-google-maps",
      relatedLabel: "Tối ưu Google Maps trước",
    },
  },
};

export function getServiceLandingConfig(path: string): ServiceLandingConfig | null {
  const key = path.replace(/^\//, "");
  return SERVICE_LANDING_PAGES[key] ?? null;
}

export function getServiceLandingNav(config: ServiceLandingConfig) {
  return navFromSections(config.sections);
}

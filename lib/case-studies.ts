export type CaseStudyMetric = {
  label: string;
  value: string;
  note?: string;
  trend?: "up" | "neutral";
};

export type CaseStudyService = {
  name: string;
  description: string;
};

export type CaseStudyKeywordCluster = {
  region: string;
  keywords: string[];
};

export type CaseStudyFaq = { q: string; a: string };

export type CaseStudyItem = {
  slug: string;
  clientName: string;
  industry: string;
  industryLabel: string;
  headline: string;
  summary: string;
  /** Answer-first — AEO / featured snippet */
  answerFirst: string;
  metaTitle: string;
  metaDescription: string;
  keywordsMain: string;
  keywordsSecondary: string[];
  websiteUrl: string;
  fanpageUrl?: string;
  thumbnail: string;
  heroImage?: string;
  /** Logo tròn thương hiệu — dùng section tiếng nói / avatar */
  logo?: string;
  /** contain = logo ngang/full; cover = logo tròn cắt vừa khung */
  logoFit?: "cover" | "contain";
  publishedAt: string;
  updatedAt?: string;
  services: CaseStudyService[];
  challenge: string[];
  solution: string[];
  results: CaseStudyMetric[];
  keywordClusters: CaseStudyKeywordCluster[];
  gallery: { src: string; alt: string; caption?: string }[];
  faq: CaseStudyFaq[];
  testimonial?: string;
  status: "in-progress" | "completed";
};

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    slug: "kien-truc-sao-khue",
    clientName: "Kiến Trúc Sao Khuê",
    industry: "xay-dung",
    industryLabel: "Kiến trúc & xây dựng",
    headline: "Website + Fanpage SEO đa tỉnh cho thương hiệu xây dựng Sao Khuê",
    summary:
      "Triển khai website kientrucsaokhue.com và fanpage Facebook dịch vụ sửa chữa cải tạo nhà — tối ưu SEO local đa quận TP.HCM và mở rộng từ khóa xây dựng tại Phú Yên, Đồng Nai, Long An, Bình Định, Gia Lai, Đắk Lắk.",
    answerFirst:
      "Case study Kiến Trúc Sao Khuê: Bứt Phá Marketing triển khai website kientrucsaokhue.com và fanpage Facebook chuyên sửa chữa cải tạo nhà, tối ưu SEO theo quận TP.HCM và nhiều tỉnh (Phú Yên, Đồng Nai, Long An, Gia Lai…). Sau 3 tháng, Google Search Console ghi nhận 3.460 lượt hiển thị và 82 lượt nhấp organic; fanpage đạt 83.374 lượt xem trong 90 ngày.",
    metaTitle: "Case Study Thiết Kế Website Xây Dựng Sao Khuê | SEO Đa Tỉnh",
    metaDescription:
      "Case study thiết kế website công ty xây dựng Kiến Trúc Sao Khuê: 3.460 impression GSC, 83K view Facebook, SEO local quận HCM & Phú Yên. Bứt Phá Marketing.",
    keywordsMain: "case study thiết kế website xây dựng",
    keywordsSecondary: [
      "thiết kế website công ty xây dựng",
      "seo website xây dựng",
      "website nhà thầu",
      "thiết kế website kiến trúc",
      "marketing xây dựng",
    ],
    websiteUrl: "https://www.kientrucsaokhue.com/",
    fanpageUrl: "https://www.facebook.com/dichvusuachuanha.caitaonhatrongoi",
    thumbnail: "/case-studies/sao-khue/devices-mockup.png?v=2",
    heroImage: "/case-studies/sao-khue/devices-mockup.png?v=2",
    logo: "/case-studies/sao-khue/logo.png?v=2",
    logoFit: "contain",
    publishedAt: "2026-07-07",
    updatedAt: "2026-07-18",
    status: "in-progress",
    faq: [
      {
        q: "Case study thiết kế website xây dựng Sao Khuê triển khai những gì?",
        a: "Website kientrucsaokhue.com (dịch vụ xây nhà trọn gói, sửa chữa, FAQ, CTA hotline), SEO on-page theo khu vực, schema FAQ, và fanpage Facebook chuyên sửa chữa cải tạo nhà với content Reels/video.",
      },
      {
        q: "Kết quả SEO website xây dựng Sao Khuê sau 3 tháng?",
        a: "Theo Google Search Console: 3.460 lượt hiển thị, 82 lượt nhấp organic, CTR 2,4%, vị trí trung bình 15,8 — đang trong giai đoạn tăng trưởng index.",
      },
      {
        q: "Fanpage Facebook đóng vai trò gì trong dự án?",
        a: "Fanpage dichvusuachuanha.caitaonhatrongoi đạt 83.374 lượt xem trong 90 ngày và 4.329 lượt xem video ≥3 giây, bổ sung kênh lead song song Google.",
      },
      {
        q: "Bứt Phá Marketing có làm website xây dựng tương tự không?",
        a: "Có. Bứt Phá triển khai website + SEO + fanpage cho nhà thầu, công ty xây dựng và kiến trúc — gallery công trình, form báo giá, SEO local theo quận/tỉnh. Liên hệ /website hoặc /lien-he.",
      },
    ],
    services: [
      {
        name: "Thiết kế website",
        description: "Website giới thiệu dịch vụ xây dựng, báo giá, FAQ và landing theo khu vực.",
      },
      {
        name: "SEO Website",
        description: "Tối ưu on-page, cấu trúc silo theo quận/tỉnh, schema LocalBusiness & FAQ.",
      },
      {
        name: "Facebook Marketing",
        description: "Xây fanpage chuyên sửa chữa cải tạo nhà, content Reels/video, nuôi nhận diện.",
      },
    ],
    challenge: [
      "Thương hiệu xây dựng cần hiện diện cả TP.HCM lẫn các tỉnh miền Trung — Tây Nguyên (Phú Yên, Bình Định, Gia Lai, Đắk Lắk, Huế…).",
      "Khách hàng tìm kiếm theo intent địa phương rất cụ thể: quận 1, quận 5, quận 7, Hóc Môn, Long An, Đồng Nai…",
      "Cạnh tranh từ khóa commercial cao: sửa nhà trọn gói, xây nhà trọn gói, cải tạo nhà, thiết kế nhà phố.",
      "Cần song song website (Google) và fanpage (Facebook) để bắt lead đa kênh.",
    ],
    solution: [
      "Xây website kientrucsaokhue.com với cấu trúc dịch vụ rõ: xây nhà trọn gói, sửa chữa, thiết kế — kèm FAQ và CTA hotline.",
      "Lập bản đồ từ khóa theo cụm địa lý: TP.HCM (quận), Đông Nam Bộ (Đồng Nai, Long An, Bình Dương), Miền Trung & Tây Nguyên.",
      "Triển khai fanpage Facebook chuyên niche sửa chữa cải tạo nhà, đăng Reels/video theo đợt để kéo view.",
      "Liên kết nội bộ website ↔ fanpage, đồng bộ thông tin liên hệ và dịch vụ.",
      "Theo dõi GSC + Facebook Insights hàng tuần để tối ưu title, meta và nội dung theo từ khóa có impression.",
    ],
    results: [
      { label: "Lượt hiển thị Google (3 tháng)", value: "3.460", note: "GSC — đang tăng trưởng", trend: "up" },
      { label: "Lượt nhấp organic", value: "82", note: "Giai đoạn đầu index", trend: "up" },
      { label: "Vị trí trung bình", value: "15,8", note: "Đang cải thiện dần", trend: "neutral" },
      { label: "CTR trung bình", value: "2,4%", note: "Tối ưu meta tiếp theo", trend: "neutral" },
      { label: "Lượt xem Facebook (90 ngày)", value: "83.374", note: "+100% so với kỳ trước", trend: "up" },
      { label: "Lượt xem video ≥3 giây", value: "4.329", note: "Reels/content spike", trend: "up" },
    ],
    keywordClusters: [
      {
        region: "TP.HCM — Quận",
        keywords: [
          "cải tạo nhà quận 1",
          "cải tạo nhà quận 5",
          "sửa chữa cải tạo nhà quận 7",
          "sửa chữa cải tạo nhà hóc môn",
          "sửa nhà trọn gói hcm",
          "nâng tầng nhà phố tphcm",
          "thiết kế biệt thự thủ đức",
        ],
      },
      {
        region: "Đông Nam Bộ",
        keywords: [
          "xây nhà trọn gói đồng nai",
          "thiết kế thi công nhà phố đồng nai",
          "xây dựng nhà long an",
          "xây nhà long an",
          "mẫu nhà ống đẹp long an",
          "thi công nhà trọn gói bình dương",
          "mẫu nhà phố 2 tầng bình dương",
        ],
      },
      {
        region: "Miền Trung & Tây Nguyên",
        keywords: [
          "xây nhà trọn gói phú yên",
          "sửa nhà phú yên",
          "thiết kế nhà phố phú yên",
          "xây nhà cấp 4 phú yên",
          "xây homestay phú yên",
          "cải tạo nhà bình định",
          "xây dựng nhà miền trung",
          "xây nhà huế",
          "xây nhà gia lai",
          "xây nhà 2 tầng gia lai",
          "mẫu nhà phố đẹp tại gia lai",
          "xây nhà daklak",
          "xây nhà 2 tầng daklak",
        ],
      },
      {
        region: "Nội dung hỗ trợ",
        keywords: ["cẩm nang xây nhà 2026"],
      },
    ],
    gallery: [
      {
        src: "/case-studies/sao-khue/devices-mockup.png?v=2",
        alt: "Mockup website Kiến Trúc Sao Khuê trên laptop",
        caption: "Website Design — kientrucsaokhue.com · cải tạo sửa chữa nhà · desktop mockup.",
      },
      {
        src: "/case-studies/sao-khue/gsc-performance.png",
        alt: "Google Search Console Kiến Trúc Sao Khuê — hiệu suất 3 tháng",
        caption: "Google Search Console: 3.460 lượt hiển thị, 82 lượt nhấp trong 3 tháng đầu.",
      },
      {
        src: "/case-studies/sao-khue/facebook-insights.png",
        alt: "Facebook Insights fanpage sửa chữa cải tạo nhà — 83.374 lượt xem",
        caption: "Facebook Insights: 83.374 lượt xem trong 90 ngày, tăng trưởng mạnh nhờ content spike.",
      },
    ],
    testimonial:
      "Dự án đang trong giai đoạn tăng trưởng — website đã index và bắt đầu có impression, fanpage Facebook tạo lượng view lớn. Tiếp theo tối ưu CTR và landing theo từng khu vực.",
  },
  {
    slug: "tham-my-thien-hoang-kim",
    clientName: "Thẩm Mỹ Thiên Hoàng Kim",
    industry: "tham-my",
    industryLabel: "Thẩm mỹ viện & Aesthetic Clinic",
    headline: "Website Aesthetic Clinic + Fanpage chuyên khoa thẩm mỹ Thiên Hoàng Kim",
    summary:
      "Triển khai website thammythienhoangkim.com và fanpage Facebook chuyên khoa thẩm mỹ tại 323-325 Hùng Vương, TP.HCM — giao diện Aesthetic Clinic xanh–vàng cao cấp, CTA Đặt lịch ngay, Zalo và SEO local phòng khám làm đẹy.",
    answerFirst:
      "Case study Thẩm Mỹ Thiên Hoàng Kim: Bứt Phá Marketing xây website thammythienhoangkim.com và fanpage chuyên khoa thẩm mỹ — positioning “Nâng Tầm Nhan Sắc”, nhấn Bác sĩ chuyên môn cao · Đẹp tự nhiên · An toàn · Chuẩn Y Khoa, CTA đặt lịch 0938 673 996 và tối ưu SEO thẩm mỹ viện TP.HCM.",
    metaTitle: "Case Study Website Thẩm Mỹ Thiên Hoàng Kim | Aesthetic Clinic",
    metaDescription:
      "Case study website thẩm mỹ viện Thiên Hoàng Kim: thammythienhoangkim.com + fanpage chuyên khoa, địa chỉ Hùng Vương TP.HCM, CTA đặt lịch & SEO local. Bứt Phá Marketing.",
    keywordsMain: "case study thiết kế website thẩm mỹ viện",
    keywordsSecondary: [
      "thiết kế website thẩm mỹ viện",
      "website phòng khám thẩm mỹ",
      "seo thẩm mỹ viện",
      "thiết kế website clinic làm đẹy",
      "marketing thẩm mỹ",
    ],
    websiteUrl: "https://www.thammythienhoangkim.com/",
    fanpageUrl: "https://www.facebook.com/chuyenkhoathammy.thienhoangkim",
    thumbnail: "/case-studies/thien-hoang-kim/devices-mockup.png?v=1",
    heroImage: "/case-studies/thien-hoang-kim/devices-mockup.png?v=1",
    logo: "/case-studies/thien-hoang-kim/logo.png?v=1",
    logoFit: "cover",
    publishedAt: "2026-07-07",
    updatedAt: "2026-07-18",
    status: "in-progress",
    faq: [
      {
        q: "Case study Thiên Hoàng Kim triển khai những gì?",
        a: "Website thammythienhoangkim.com (Thiên Hoàng Kim Aesthetic Clinic) tại 323-325 Hùng Vương, Phường An Đông, TP.HCM — menu Dịch vụ, Bảng giá, Tin tức, CTA Đặt lịch ngay, hotline 0938 673 996, Zalo; fanpage Facebook đồng bộ cover, logo và messaging chuyên khoa thẩm mỹ.",
      },
      {
        q: "Website thẩm mỹ viện cần những tính năng gì?",
        a: "Hồ sơ bác sĩ, danh mục dịch vụ (filler, botox, phẫu thuật thẩm mỹ), before/after có consent, form/Zalo đặt lịch, FAQ, schema y tế và SEO local theo quận.",
      },
      {
        q: "Khác gì website spa thông thường?",
        a: "Thẩm mỹ viện nhấn uy tín y khoa, bác sĩ chuyên khoa và tuân thủ quảng cáo dịch vụ y tế — không chỉ gallery và bảng giá như spa wellness.",
      },
      {
        q: "Bứt Phá có làm website thẩm mỹ tương tự không?",
        a: "Có — thiết kế website thẩm mỹ viện, spa, nha khoa với SEO local và fanpage. Xem /blog/thiet-ke-website-tham-my-vien hoặc liên hệ /lien-he.",
      },
    ],
    services: [
      {
        name: "Thiết kế website Aesthetic Clinic",
        description: "Giao diện cao cấp, mobile-first, showcase dịch vụ làm đẹy y khoa và thương hiệu Thiên Hoàng Kim.",
      },
      {
        name: "SEO thẩm mỹ viện",
        description: "On-page, schema, từ khóa local “thẩm mỹ viện + quận”, liên kết Google Maps.",
      },
      {
        name: "Facebook chuyên khoa thẩm mỹ",
        description: "Fanpage chuyên khoa thẩm mỹ — content dịch vụ, uy tín bác sĩ, nuôi lead inbox.",
      },
    ],
    challenge: [
      "Ngành thẩm mỹ cạnh tranh cao tại TP.HCM — khách so sánh nhiều clinic trước khi đặt lịch.",
      "Cần website thể hiện uy tín y khoa (Chuẩn Y Khoa – Chuẩn An Toàn – Chuẩn Đẳng Cấp), không giống spa massage.",
      "Fanpage và website phải đồng bộ thương hiệu “Thiên Hoàng Kim Aesthetic Clinic — Nâng Tầm Nhan Sắc”.",
      "Từ khóa commercial: thẩm mỹ viện Hùng Vương, filler botox, phẫu thuật thẩm mỹ theo khu vực TP.HCM.",
    ],
    solution: [
      "Xây website thammythienhoangkim.com — UI xanh–vàng sang trọng, hero “Phòng Khám Chuyên Khoa Thẩm Mỹ”, 4 giá trị cốt lõi trên banner.",
      "Cấu trúc menu: Giới thiệu, Dịch vụ (dropdown), Khách hàng, Bảng giá, Tin tức, Liên hệ — kèm CTA Đặt lịch ngay nổi bật.",
      "Tích hợp đa kênh: hotline header, floating Zalo/chat/đặt lịch, liên kết Facebook · TikTok · YouTube.",
      "Fanpage Facebook chuyên khoa — cover & bio đồng bộ: Đẹp tự nhiên · An toàn y khoa · Chuẩn quốc tế.",
      "SEO on-page: title/meta thẩm mỹ viện TP.HCM, schema Organization, local intent Hùng Vương / quận 5.",
    ],
    results: [
      { label: "Website", value: "Live", note: "thammythienhoangkim.com", trend: "up" },
      { label: "Fanpage", value: "Active", note: "chuyenkhoathammy.thienhoangkim", trend: "up" },
      { label: "Địa chỉ", value: "Hùng Vương", note: "323-325, Phường An Đông, TP.HCM", trend: "neutral" },
      { label: "CTA", value: "Đặt lịch", note: "Hotline 0938 673 996 + Zalo", trend: "up" },
      { label: "SEO", value: "Đang triển khai", note: "Local + dịch vụ làm đẹy", trend: "neutral" },
    ],
    keywordClusters: [
      {
        region: "Thẩm mỹ viện — Head",
        keywords: [
          "thiết kế website thẩm mỹ viện",
          "website phòng khám thẩm mỹ",
          "thẩm mỹ viện tphcm",
          "phòng khám thẩm mỹ uy tín",
          "aesthetic clinic tphcm",
        ],
      },
      {
        region: "Dịch vụ làm đẹy",
        keywords: [
          "tiêm filler botox tphcm",
          "nâng mũi uy tín",
          "căng da mặt",
          "phẫu thuật thẩm mỹ",
          "trẻ hóa da",
          "giảm mỡ không phẫu thuật",
        ],
      },
      {
        region: "Local SEO — TP.HCM",
        keywords: [
          "thẩm mỹ viện quận 5",
          "phòng khám thẩm mỹ hùng vương",
          "thẩm mỹ viện an đông",
          "thẩm mỹ viện tphcm",
          "clinic làm đẹp gần đây",
        ],
      },
      {
        region: "Marketing",
        keywords: [
          "marketing thẩm mỹ viện",
          "quảng cáo phòng khám thẩm mỹ",
          "fanpage thẩm mỹ",
        ],
      },
    ],
    gallery: [
      {
        src: "/case-studies/thien-hoang-kim/devices-mockup.png?v=1",
        alt: "Mockup website Thiên Hoàng Kim trên laptop, tablet và điện thoại",
        caption: "thammythienhoangkim.com — Aesthetic Clinic xanh–vàng, CTA Đặt lịch ngay.",
      },
      {
        src: "/case-studies/thien-hoang-kim/website-homepage.png",
        alt: "Website Thiên Hoàng Kim Aesthetic Clinic — banner Nâng Tầm Nhan Sắc",
        caption: "Hero Phòng Khám Chuyên Khoa Thẩm Mỹ — 4 giá trị cốt lõi.",
      },
      {
        src: "/case-studies/thien-hoang-kim/facebook-page.png",
        alt: "Fanpage Facebook chuyên khoa thẩm mỹ Thiên Hoàng Kim",
        caption: "Fanpage đồng bộ cover & bio: Đẹp tự nhiên · An toàn y khoa · Chuẩn quốc tế.",
      },
    ],
    testimonial:
      "Thiên Hoàng Kim định vị aesthetic clinic cao cấp tại Hùng Vương TP.HCM — website và fanpage là điểm chạm đầu tiên để khách đánh giá uy tín y khoa trước khi gọi 0938 673 996 hoặc đặt lịch qua Zalo.",
  },
  {
    slug: "phuoc-lai-luxury",
    clientName: "Phước Lai Luxury",
    industry: "spa",
    industryLabel: "Spa, Phun xăm & Academy",
    headline: "Website luxury Phun xăm · Spa · Academy cho Phước Lai tại Vũng Tàu",
    summary:
      "Triển khai website phunxamvungtau.com và fanpage Facebook Phước Lai Luxury — giao diện luxury đen–vàng, showcase Master team, CTA Booking và SEO local phun xăm & spa Vũng Tàu.",
    answerFirst:
      "Case study Phước Lai Luxury: Bứt Phá Marketing xây website phunxamvungtau.com (Permanent Makeup & Spa & Academy) và fanpage Facebook — UI luxury cao cấp với 3 Master (Nhung Lai, Phuoc Lai, Cam Lai), nút Booking nổi bật và tối ưu SEO phun xăm Vũng Tàu.",
    metaTitle: "Case Study Website Spa Phước Lai Luxury | Phun Xăm Vũng Tàu",
    metaDescription:
      "Case study thiết kế website spa Phước Lai Luxury: phunxamvungtau.com + fanpage, phun xăm & academy Vũng Tàu, CTA Booking. Bứt Phá Marketing.",
    keywordsMain: "case study thiết kế website spa",
    keywordsSecondary: [
      "thiết kế website spa",
      "website phun xăm",
      "seo phun xăm vũng tàu",
      "website academy làm đẹp",
      "marketing spa vũng tàu",
    ],
    websiteUrl: "https://phunxamvungtau.com/",
    fanpageUrl: "https://www.facebook.com/phuoclaicelinevungtau",
    thumbnail: "/case-studies/phuoc-lai-luxury/devices-mockup.png?v=1",
    heroImage: "/case-studies/phuoc-lai-luxury/devices-mockup.png?v=1",
    logo: "/case-studies/phuoc-lai-luxury/logo.png?v=1",
    logoFit: "cover",
    publishedAt: "2026-07-07",
    updatedAt: "2026-07-18",
    status: "in-progress",
    faq: [
      {
        q: "Case study Phước Lai Luxury triển khai những gì?",
        a: "Website phunxamvungtau.com với thương hiệu Phước Lai Luxury — Permanent Makeup & Spa & Academy, hero 3 panel Master team, CTA Booking; fanpage Facebook phuoclaicelinevungtau đồng bộ nhận diện luxury.",
      },
      {
        q: "Website spa & academy cần tính năng gì?",
        a: "Booking online, giới thiệu Master/chuyên gia, danh mục dịch vụ phun xăm & spa, khóa học academy, gallery portfolio, bảng giá tham khảo và SEO local theo tỉnh/thành.",
      },
      {
        q: "Khác gì website thẩm mỹ viện?",
        a: "Phước Lai kết hợp spa wellness, phun xăm thẩm mỹ và đào tạo academy — website nhấn portfolio nghệ nhân (Master) và booking, không chỉ hồ sơ bác sĩ y khoa.",
      },
      {
        q: "Bứt Phá có làm website spa tương tự không?",
        a: "Có — thiết kế website spa, phun xăm, academy với SEO local và fanpage. Xem /blog/thiet-ke-website-spa hoặc liên hệ /lien-he.",
      },
    ],
    services: [
      {
        name: "Thiết kế website Luxury",
        description: "Giao diện đen–vàng cao cấp, hero 3 panel Master, typography serif sang trọng cho thương hiệu Phước Lai.",
      },
      {
        name: "SEO phun xăm & spa local",
        description: "On-page từ khóa phun xăm Vũng Tàu, spa Vũng Tàu, học phun xăm — schema và Google Maps.",
      },
      {
        name: "Facebook Marketing",
        description: "Fanpage Phước Lai Luxury — content dịch vụ, portfolio và nuôi lead inbox/booking.",
      },
    ],
    challenge: [
      "Thị trường phun xăm & spa Vũng Tàu cạnh tranh — khách so sánh Master và portfolio trước khi book.",
      "Thương hiệu luxury cần website khác biệt spa bình dân — không template generic.",
      "Mô hình 3-in-1: Permanent Makeup + Spa + Academy — cấu trúc menu phải rõ từng mảng.",
      "Từ khóa local: phun xăm vũng tàu, spa vũng tàu, học phun xăm, đào tạo phun xăm.",
    ],
    solution: [
      "Xây phunxamvungtau.com — hero fullscreen 3 panel giới thiệu Master Nhung Lai, Phuoc Lai, Cam Lai.",
      "Positioning rõ: “Phuoc Lai Luxury — Permanent Makeup & Spa & Academy” trên banner trung tâm.",
      "CTA Booking nổi bật góc phải + floating chat/Zalo/AI assistant.",
      "Menu: Trang chủ, Về chúng tôi, Liên hệ — mở rộng silo dịch vụ & khóa học.",
      "Fanpage Facebook đồng bộ thương hiệu luxury, liên kết website ↔ fanpage.",
      "SEO on-page: title/meta phun xăm Vũng Tàu, schema LocalBusiness.",
    ],
    results: [
      { label: "Website", value: "Live", note: "phunxamvungtau.com", trend: "up" },
      { label: "Fanpage", value: "Active", note: "phuoclaicelinevungtau", trend: "up" },
      { label: "Positioning", value: "Luxury", note: "Phun xăm · Spa · Academy", trend: "neutral" },
      { label: "Master team", value: "3 Masters", note: "Nhung · Phuoc · Cam Lai", trend: "up" },
      { label: "SEO", value: "Đang triển khai", note: "Local Vũng Tàu + phun xăm", trend: "neutral" },
    ],
    keywordClusters: [
      {
        region: "Phun xăm — Head",
        keywords: [
          "thiết kế website spa",
          "website phun xăm",
          "phun xăm vũng tàu",
          "spa phun xăm vũng tàu",
          "phun xăm thẩm mỹ vũng tàu",
        ],
      },
      {
        region: "Academy & đào tạo",
        keywords: [
          "học phun xăm vũng tàu",
          "khóa học phun xăm",
          "đào tạo phun xăm chuyên nghiệp",
          "academy phun xăm",
          "khóa học spa vũng tàu",
        ],
      },
      {
        region: "Spa & làm đẹp",
        keywords: [
          "spa vũng tàu",
          "spa luxury vũng tàu",
          "điêu khắc chân mày vũng tàu",
          "phun môi vũng tàu",
          "làm đẹp vũng tàu",
        ],
      },
      {
        region: "Marketing",
        keywords: [
          "marketing spa vũng tàu",
          "quảng cáo phun xăm",
          "fanpage spa làm đẹp",
        ],
      },
    ],
    gallery: [
      {
        src: "/case-studies/phuoc-lai-luxury/devices-mockup.png?v=1",
        alt: "Mockup website Phước Lai Luxury trên laptop, tablet và điện thoại",
        caption: "phunxamvungtau.com — hero luxury 3 Master, CTA Booking, Permanent Makeup & Spa & Academy.",
      },
      {
        src: "/case-studies/phuoc-lai-luxury/website-homepage.png",
        alt: "Website Phước Lai Luxury — Permanent Makeup Spa Academy Vũng Tàu",
        caption: "Hero fullscreen — Master team và CTA Đặt lịch ngay.",
      },
    ],
    testimonial:
      "Phước Lai Luxury định vị phân khúc cao cấp tại Vũng Tàu — website là showroom cho Master team và điểm đặt lịch trước khi khách ghé spa hoặc đăng ký khóa academy.",
  },
  {
    slug: "nha-khoa-dang-khoa",
    clientName: "Hệ Thống Nha Khoa Đăng Khoa",
    industry: "nha-khoa",
    industryLabel: "Nha khoa & Implant",
    headline: "Website + SEO nha khoa Tây Ninh — 471 click GSC, vị trí TB 5,3",
    summary:
      "Triển khai website hethongnhakhoadangkhoa.vn và fanpage Nha Khoa Đăng Khoa Tây Ninh — implant, niềng răng, xe đưa đón tận nhà, BS Nguyễn Đăng Khoa. GSC 3 tháng: 15,4K impression, 471 click, CTR 3,1%.",
    answerFirst:
      "Case study Hệ Thống Nha Khoa Đăng Khoa: Bứt Phá Marketing triển khai website hethongnhakhoadangkhoa.vn và fanpage Facebook tại Tây Ninh — SEO implant, niềng răng, đặt lịch hotline 08.86.86.87.86. Sau 3 tháng GSC: 15.400 lượt hiển thị, 471 lượt nhấp organic, CTR 3,1%, vị trí trung bình 5,3.",
    metaTitle: "Case Study Website Nha Khoa Đăng Khoa | SEO Tây Ninh",
    metaDescription:
      "Case study thiết kế website nha khoa Đăng Khoa: 15,4K impression GSC, 471 click, vị trí TB 5,3, implant & niềng răng Tây Ninh. Bứt Phá Marketing.",
    keywordsMain: "case study thiết kế website nha khoa",
    keywordsSecondary: [
      "thiết kế website nha khoa",
      "seo website nha khoa",
      "website implant nha khoa",
      "nha khoa tây ninh",
      "marketing nha khoa",
    ],
    websiteUrl: "https://hethongnhakhoadangkhoa.vn/",
    fanpageUrl: "https://www.facebook.com/profile.php?id=61590506472413",
    thumbnail: "/case-studies/nha-khoa-dang-khoa/devices-mockup.png?v=3",
    heroImage: "/case-studies/nha-khoa-dang-khoa/devices-mockup.png?v=3",
    logo: "/case-studies/nha-khoa-dang-khoa/logo.png?v=1",
    logoFit: "cover",
    publishedAt: "2026-07-07",
    updatedAt: "2026-07-18",
    status: "in-progress",
    faq: [
      {
        q: "Case study Nha Khoa Đăng Khoa triển khai những gì?",
        a: "Website hethongnhakhoadangkhoa.vn tại 345-347 Điện Biên Phủ, Ninh Thạnh, Tây Ninh — giới thiệu BS Nguyễn Đăng Khoa (Răng Hàm Mặt), dịch vụ cấy ghép Implant, niềng răng, xe đưa đón tận nhà; fanpage Facebook Nha Khoa Đăng Khoa Tây Ninh.",
      },
      {
        q: "Kết quả SEO website nha khoa Đăng Khoa sau 3 tháng?",
        a: "Theo Google Search Console: 15.400 lượt hiển thị, 471 lượt nhấp organic, CTR 3,1%, vị trí trung bình 5,3 — tín hiệu SEO local mạnh tại Tây Ninh.",
      },
      {
        q: "Website nha khoa cần tính năng gì?",
        a: "Hồ sơ bác sĩ, trang Implant/niềng răng riêng, bảng giá tham khảo, form/Zalo đặt lịch, FAQ schema y tế và SEO local theo tỉnh/quận.",
      },
      {
        q: "Bứt Phá có làm website nha khoa tương tự không?",
        a: "Có — thiết kế website nha khoa, phòng khám với SEO local và fanpage. Xem /blog/thiet-ke-website-nha-khoa hoặc liên hệ /lien-he.",
      },
    ],
    services: [
      {
        name: "Thiết kế website nha khoa",
        description: "Giao diện vàng–xanh navy chuyên nghiệp, hero BS chuyên khoa, showcase Implant & niềng răng, CTA hotline.",
      },
      {
        name: "SEO nha khoa local",
        description: "On-page Tây Ninh, từ khóa implant/niềng răng, schema LocalBusiness & FAQ, Google Maps.",
      },
      {
        name: "Facebook nha khoa",
        description: "Fanpage Nha Khoa Đăng Khoa Tây Ninh — đồng bộ cover, uy tín y khoa và nuôi lead inbox.",
      },
    ],
    challenge: [
      "Thị trường nha khoa Tây Ninh cạnh tranh — khách tìm “nha khoa uy tín Tây Ninh” trước khi đặt lịch Implant.",
      "Dịch vụ cao giá trị (Implant, niềng răng) cần website thể hiện uy tín BS chuyên khoa Răng Hàm Mặt.",
      "Khách địa phương ưu tiên tiện ích — xe đưa đón tận nhà là USP cần nổi bật trên web.",
      "Từ khóa: nha khoa tây ninh, cấy ghép implant tây ninh, niềng răng tây ninh.",
    ],
    solution: [
      "Xây hethongnhakhoadangkhoa.vn — positioning “Địa chỉ nha khoa uy tín hàng đầu Tây Ninh”, slogan Uy tín · Chất lượng · Tận tâm.",
      "Hero giới thiệu BS Nguyễn Đăng Khoa + 3 dịch vụ nổi bật: Implant, Niềng răng, Xe đưa đón tận nhà.",
      "Menu: Giới thiệu, Dịch vụ, Bảng giá, Kiến thức, Khách hàng — silo SEO theo dịch vụ.",
      "Floating sidebar: Địa chỉ, Đặt lịch, Zalo, Messenger, gọi hotline 08.86.86.87.86.",
      "Fanpage Facebook đồng bộ cover & bio — Trung tâm Nha Khoa Công Nghệ Cao uy tín chuyên nghiệp.",
      "Theo dõi GSC hàng tuần — tối ưu title/meta theo query có impression cao.",
    ],
    results: [
      { label: "Lượt hiển thị Google (3 tháng)", value: "15.400", note: "GSC — tăng trưởng ổn định", trend: "up" },
      { label: "Lượt nhấp organic", value: "471", note: "Lead từ Google Search", trend: "up" },
      { label: "CTR trung bình", value: "3,1%", note: "Trên mức ngành y tế", trend: "up" },
      { label: "Vị trí trung bình", value: "5,3", note: "Top 5–6 trang đầu", trend: "up" },
      { label: "Website", value: "Live", note: "hethongnhakhoadangkhoa.vn", trend: "up" },
      { label: "Fanpage", value: "Active", note: "Nha Khoa Đăng Khoa Tây Ninh", trend: "up" },
    ],
    keywordClusters: [
      {
        region: "Nha khoa — Head",
        keywords: [
          "thiết kế website nha khoa",
          "website nha khoa",
          "nha khoa tây ninh",
          "nha khoa uy tín tây ninh",
          "phòng khám nha khoa tây ninh",
        ],
      },
      {
        region: "Implant & niềng răng",
        keywords: [
          "cấy ghép implant tây ninh",
          "niềng răng tây ninh",
          "bác sĩ implant tây ninh",
          "trồng răng implant giá",
          "chỉnh nha tây ninh",
        ],
      },
      {
        region: "Local SEO — Tây Ninh",
        keywords: [
          "nha khoa điện biên phủ tây ninh",
          "nha khoa ninh thạnh",
          "nha khoa gần đây",
          "đặt lịch nha khoa tây ninh",
          "nha khoa có xe đưa đón",
        ],
      },
      {
        region: "Marketing",
        keywords: [
          "marketing nha khoa",
          "seo nha khoa",
          "quảng cáo phòng khám nha khoa",
          "fanpage nha khoa",
        ],
      },
    ],
    gallery: [
      {
        src: "/case-studies/nha-khoa-dang-khoa/devices-mockup.png?v=3",
        alt: "Mockup website Nha Khoa Đăng Khoa trên laptop, tablet và điện thoại",
        caption: "Website Design — responsive desktop · tablet · mobile · hethongnhakhoadangkhoa.vn",
      },
      {
        src: "/case-studies/nha-khoa-dang-khoa/gsc-performance.png",
        alt: "Google Search Console Nha Khoa Đăng Khoa — 471 click, 15,4K impression",
        caption: "GSC 3 tháng: 15.400 lượt hiển thị, 471 lượt nhấp, CTR 3,1%, vị trí TB 5,3.",
      },
      {
        src: "/case-studies/nha-khoa-dang-khoa/website-homepage.png",
        alt: "Website Nha Khoa Đăng Khoa — Implant niềng răng Tây Ninh",
        caption: "hethongnhakhoadangkhoa.vn — BS Nguyễn Đăng Khoa, Implant, Niềng răng, xe đưa đón tận nhà.",
      },
      {
        src: "/case-studies/nha-khoa-dang-khoa/facebook-page.png",
        alt: "Fanpage Facebook Nha Khoa Đăng Khoa Tây Ninh",
        caption: "Fanpage đồng bộ cover — Trung tâm Nha Khoa Công Nghệ Cao uy tín chuyên nghiệp.",
      },
    ],
    testimonial:
      "Đăng Khoa định vị nha khoa uy tín hàng đầu Tây Ninh — sau 3 tháng SEO, website đạt vị trí trung bình 5,3 với 471 lượt nhấp organic, chứng minh silo Implant + niềng răng + local intent hiệu quả.",
  },
  {
    slug: "halee-tram",
    clientName: "Halee Trâm",
    industry: "lam-dep",
    industryLabel: "Dịch vụ làm đẹp",
    headline: "Website Eyelash · Nail · Academy cho thương hiệu Halee Trâm",
    summary:
      "Triển khai website haleetram.com — positioning Halee Trâm Eyelash / Nail / Academy, dịch vụ nails, nối mi, uốn mi và đào tạo nghề làm đẹp, tối ưu booking và SEO ngành beauty.",
    answerFirst:
      "Case study Halee Trâm: Bứt Phá Marketing xây website haleetram.com cho thương hiệu Eyelash / Nail / Academy — nails, nối mi, uốn mi và đào tạo nghề, giao diện làm đẹy hiện đại và CTA đặt lịch/đăng ký khóa học.",
    metaTitle: "Case Study Website Halee Trâm | Nail Nối Mi Academy",
    metaDescription:
      "Case study website Halee Trâm: haleetram.com — eyelash, nail, academy đào tạo nghề làm đẹy. Triển khai bởi Bứt Phá Marketing.",
    keywordsMain: "case study thiết kế website nail nối mi",
    keywordsSecondary: [
      "thiết kế website nail",
      "website nối mi",
      "website academy làm đẹp",
      "thiết kế website spa",
      "marketing salon nail",
    ],
    websiteUrl: "https://haleetram.com/",
    thumbnail: "/case-studies/halee-tram/devices-mockup.png?v=1",
    heroImage: "/case-studies/halee-tram/devices-mockup.png?v=1",
    logo: "/case-studies/halee-tram/logo.png?v=1",
    logoFit: "cover",
    publishedAt: "2026-07-07",
    updatedAt: "2026-07-18",
    status: "in-progress",
    faq: [
      {
        q: "Case study Halee Trâm triển khai những gì?",
        a: "Website haleetram.com với thương hiệu Halee Trâm — Eyelash / Nail / Academy, giới thiệu dịch vụ nails, nối mi, uốn mi và khóa đào tạo nghề làm đẹy.",
      },
      {
        q: "Website nail & nối mi cần tính năng gì?",
        a: "Gallery portfolio, bảng giá/dịch vụ, booking đặt lịch, trang khóa học academy, review khách hàng và SEO local salon làm đẹy.",
      },
      {
        q: "Khác gì website spa hoặc thẩm mỹ viện?",
        a: "Halee Trâm tập trung nail & lash artisan + academy — nhấn portfolio thợ và khóa học, không phải dịch vụ y khoa hay spa massage.",
      },
      {
        q: "Bứt Phá có làm website làm đẹp tương tự không?",
        a: "Có — thiết kế website nail, nối mi, spa, academy với SEO và booking. Xem /blog/thiet-ke-website-spa hoặc /lien-he.",
      },
    ],
    services: [
      {
        name: "Thiết kế website Nail & Lash",
        description: "UI làm đẹy hiện đại, showcase dịch vụ nails, nối mi, uốn mi và thương hiệu Halee Trâm.",
      },
      {
        name: "Website Academy",
        description: "Trang khóa học đào tạo nghề — silo SEO cho từ khóa học nail, học nối mi.",
      },
      {
        name: "SEO & Booking",
        description: "On-page salon làm đẹy, CTA đặt lịch, schema LocalBusiness.",
      },
    ],
    challenge: [
      "Ngành nail & lash cạnh tranh cao — khách chọn salon qua portfolio Instagram/Google trước khi book.",
      "Mô hình 3-in-1: dịch vụ (nail, mi) + academy — website phải tách rõ 2 luồng khách.",
      "Cần giao diện premium, khác tiệm nail giá rẻ.",
      "Từ khóa: nối mi, nail salon, học nối mi, academy nail, uốn mi.",
    ],
    solution: [
      "Xây haleetram.com — positioning “Eyelash / Nail / Academy” rõ trên hero.",
      "Cấu trúc dịch vụ: Nails, Nối mi, Uốn mi — mỗi mảng hỗ trợ SEO long-tail.",
      "Trang Academy riêng cho khóa đào tạo nghề — lead học viên.",
      "UX mobile-first — khách nail/lash chủ yếu tìm trên điện thoại.",
      "SEO on-page: title/meta nail nối mi, schema Organization.",
    ],
    results: [
      { label: "Website", value: "Live", note: "haleetram.com", trend: "up" },
      { label: "Positioning", value: "3-in-1", note: "Eyelash · Nail · Academy", trend: "neutral" },
      { label: "Dịch vụ", value: "Nail & Lash", note: "Nối mi · Uốn mi · Nails", trend: "up" },
      { label: "Academy", value: "Active", note: "Đào tạo nghề làm đẹy", trend: "up" },
      { label: "SEO", value: "Đang triển khai", note: "Local + dịch vụ làm đẹy", trend: "neutral" },
    ],
    keywordClusters: [
      {
        region: "Nail & Lash — Head",
        keywords: [
          "thiết kế website nail",
          "website nối mi",
          "nối mi salon",
          "nail salon",
          "uốn mi",
        ],
      },
      {
        region: "Academy",
        keywords: [
          "học nối mi",
          "khóa học nail",
          "đào tạo nghề làm đẹy",
          "academy nail",
          "học làm nail chuyên nghiệp",
        ],
      },
      {
        region: "Dịch vụ làm đẹp",
        keywords: [
          "làm nail đẹp",
          "nối mi volume",
          "mi classic",
          "gel nail",
          "salon làm đẹp",
        ],
      },
      {
        region: "Marketing",
        keywords: [
          "marketing salon nail",
          "quảng cáo nối mi",
          "website spa làm đẹp",
        ],
      },
    ],
    gallery: [
      {
        src: "/case-studies/halee-tram/devices-mockup.png?v=1",
        alt: "Mockup website Halee Trâm trên laptop, tablet và điện thoại",
        caption: "haleetram.com — Eyelash / Nail / Academy, CTA Đặt lịch ngay.",
      },
      {
        src: "/case-studies/halee-tram/hero.png",
        alt: "Thiết kế website Halee Trâm — Eyelash Nail Academy",
        caption: "Hero Halee Trâm — nails · nối mi · uốn mi · đào tạo.",
      },
      {
        src: "/case-studies/halee-tram/gallery-2.png",
        alt: "Website salon nail nối mi chuyên nghiệp",
        caption: "Trải nghiệm mobile-first cho khách đặt lịch nail & lash.",
      },
    ],
    testimonial:
      "Halee Trâm kết hợp salon dịch vụ và academy — website là điểm chạm để khách xem portfolio nail/lash và học viên tìm khóa đào tạo nghề.",
  },
  {
    slug: "pccc-bao-an-fire",
    clientName: "Bảo An Fire",
    industry: "pccc",
    industryLabel: "PCCC & phòng cháy chữa cháy",
    headline: "Website B2B PCCC — portfolio dự án, form khảo sát hiện trường",
    summary:
      "Triển khai website công ty PCCC Bảo An Fire: trang dịch vụ thiết kế-thi công-bảo trì, showcase dự án nhà xưởng/chung cư, giấy phép năng lực và form thu lead khảo sát hiện trường — mô hình proof B2B cho ngành phòng cháy.",
    answerFirst:
      "Case study Bảo An Fire: Bứt Phá Marketing xây website công ty PCCC với cấu trúc dịch vụ B2B (thiết kế, thi công, bảo trì, nghiệm thu), portfolio lọc theo loại công trình, trang giấy phép năng lực và form khảo sát hiện trường. Website live; SEO ngành PCCC và landing theo dịch vụ đang triển khai giai đoạn 2.",
    metaTitle: "Case Study Website Công Ty PCCC Bảo An Fire | B2B Lead",
    metaDescription:
      "Case study thiết kế website công ty PCCC Bảo An Fire: portfolio dự án, form khảo sát, giấy phép năng lực và SEO B2B phòng cháy. Bứt Phá Marketing.",
    keywordsMain: "case study thiết kế website pccc",
    keywordsSecondary: [
      "thiết kế website công ty pccc",
      "website phòng cháy chữa cháy",
      "seo website pccc",
      "marketing pccc b2b",
      "form khảo sát pccc",
    ],
    websiteUrl: "https://www.butphamarketing.com/website",
    thumbnail: "/tin-tuc/pccc/pccc-1.png",
    heroImage: "/tin-tuc/pccc/pccc-1.png",
    publishedAt: "2026-07-08",
    updatedAt: "2026-07-15",
    status: "in-progress",
    faq: [
      {
        q: "Website công ty PCCC cần những trang gì?",
        a: "Dịch vụ (thiết kế, thi công, bảo trì), portfolio dự án theo loại công trình, giấy phép năng lực, catalog thiết bị đối tác (nếu có) và form khảo sát hiện trường.",
      },
      {
        q: "Case study Bảo An Fire chứng minh điều gì?",
        a: "Mô hình website B2B PCCC chuẩn proof: cấu trúc dịch vụ rõ, CTA khảo sát và silo SEO checklist/template/case study blog liên kết về money page.",
      },
    ],
    services: [
      {
        name: "Thiết kế website PCCC",
        description: "Cấu trúc trang dịch vụ, portfolio dự án và giấy phép năng lực theo chuẩn B2B.",
      },
      {
        name: "Form khảo sát hiện trường",
        description: "Thu loại công trình, diện tích, hạng mục PCCC — qualify lead trước khi báo giá.",
      },
      {
        name: "SEO ngành phòng cháy",
        description: "Landing theo dịch vụ + blog checklist/template; liên kết hub /blog/nganh/pccc.",
      },
    ],
    challenge: [
      "Khách B2B (chủ đầu tư, ban quản lý) cần thấy năng lực thi công và hồ sơ nghiệm thu trước khi liên hệ.",
      "Ngành PCCC cạnh tranh quảng cáo sai hạng — website phải thể hiện pháp lý minh bạch.",
      "Lead thường đến từ tìm kiếm dịch vụ địa phương + giới thiệu nhà thầu MEP.",
    ],
    solution: [
      "Xây website theo hành trình: Dịch vụ → Dự án → Năng lực → Liên hệ khảo sát.",
      "Portfolio filter: nhà xưởng, chung cư, TTMM, văn phòng — mỗi dự án có ảnh hiện trường.",
      "Trang giấy phép & chứng chỉ năng lực PCCC (hạng thi công).",
      "Form multi-step: loại công trình, diện tích, hạng mục cần triển khai.",
      "Internal link silo: checklist + template 2026 + case study blog → money page PCCC.",
    ],
    results: [
      { label: "Website", value: "Live", note: "Giai đoạn 1 bàn giao", trend: "up" },
      { label: "Form khảo sát", value: "Active", note: "Thu lead B2B hiện trường", trend: "up" },
      { label: "Silo SEO", value: "7/7 URL", note: "Hub · money · checklist · template · case study", trend: "up" },
      { label: "Portfolio", value: "6+ dự án", note: "Nhà xưởng · chung cư · TTMM", trend: "neutral" },
      { label: "SEO GSC", value: "Đang đo", note: "Baseline 90 ngày", trend: "neutral" },
    ],
    keywordClusters: [
      {
        region: "PCCC — Head",
        keywords: [
          "thiết kế website công ty pccc",
          "website phòng cháy chữa cháy",
          "thi công hệ thống pccc",
          "tư vấn pccc",
        ],
      },
      {
        region: "Dịch vụ B2B",
        keywords: [
          "thiết kế hệ thống báo cháy",
          "thi công sprinkler",
          "bảo trì hệ thống pccc",
          "nghiệm thu pccc",
        ],
      },
      {
        region: "Local SEO",
        keywords: [
          "công ty pccc tphcm",
          "thi công pccc bình dương",
          "tư vấn pccc đồng nai",
        ],
      },
    ],
    gallery: [
      {
        src: "/tin-tuc/pccc/pccc-1.png",
        alt: "Thiết kế website công ty PCCC — giao diện dịch vụ phòng cháy",
        caption: "Trang chủ website PCCC — hero dịch vụ thiết kế, thi công, bảo trì hệ thống.",
      },
      {
        src: "/tin-tuc/pccc/pccc-2.png",
        alt: "Portfolio dự án PCCC trên website B2B",
        caption: "Portfolio dự án — filter theo loại công trình và hạng mục PCCC.",
      },
      {
        src: "/tin-tuc/pccc/pccc-3.png",
        alt: "Form khảo sát hiện trường PCCC trên website",
        caption: "Form khảo sát hiện trường — thu lead B2B trước khi báo giá.",
      },
    ],
    testimonial:
      "Website PCCC không chỉ là catalog thiết bị — phải chứng minh năng lực thi công và quy trình nghiệm thu để chủ đầu tư tin tưởng giao dự án.",
  },
  {
    slug: "van-toc-express-logistics",
    clientName: "Vận Tốc Express",
    industry: "logistics",
    industryLabel: "Logistics & vận tải B2B",
    headline: "Website logistics B2B — tra cứu vận đơn, báo giá cước & SEO tuyến vận tải",
    summary:
      "Triển khai website công ty logistics Vận Tốc Express: dịch vụ đường bộ/biển/kho, form báo giá cước, tra cứu vận đơn demo và silo SEO «vận tải + tỉnh/khu công nghiệp» — mô hình proof B2B cho ngành freight.",
    answerFirst:
      "Case study Vận Tốc Express: Bứt Phá Marketing xây website logistics với cấu trúc dịch vụ B2B (vận tải nội địa, kho bãi, freight), form báo giá cước, tra cứu vận đơn và landing theo tuyến. Website live; silo SEO hub · money · checklist · template · case study đạt 7/7 URL proof.",
    metaTitle: "Case Study Website Logistics Vận Tốc Express | B2B Freight",
    metaDescription:
      "Case study thiết kế website logistics Vận Tốc Express: tra cứu vận đơn, báo giá cước, mạng lưới tuyến và SEO B2B vận tải. Bứt Phá Marketing.",
    keywordsMain: "case study thiết kế website logistics",
    keywordsSecondary: [
      "thiết kế website logistics",
      "website công ty vận tải",
      "seo website logistics",
      "form báo giá vận chuyển",
      "tra cứu vận đơn website",
    ],
    websiteUrl: "https://www.butphamarketing.com/website/nganh/logistics",
    thumbnail: "/tin-tuc/logistics/logistics-1.png",
    heroImage: "/tin-tuc/logistics/logistics-1.png",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-15",
    status: "in-progress",
    faq: [
      {
        q: "Website logistics cần những trang gì?",
        a: "Dịch vụ (đường bộ, biển, kho), mạng lưới tuyến/coverage map, form báo giá cước, tra cứu vận đơn (embed hoặc demo), hồ sơ năng lực và blog SEO theo tuyến + khu công nghiệp.",
      },
      {
        q: "Case study Vận Tốc Express chứng minh điều gì?",
        a: "Mô hình website B2B logistics chuẩn proof: lead form báo giá, tra cứu đơn hàng và silo SEO checklist/template/case study blog liên kết về money page logistics.",
      },
      {
        q: "Website logistics khác website bán hàng thế nào?",
        a: "Logistics tập trung lead B2B, báo giá cước và uy tín vận hành — không giỏ hàng hay checkout như ecommerce.",
      },
      {
        q: "Bứt Phá có làm website logistics tương tự không?",
        a: "Có — thiết kế website vận tải, kho bãi, freight với SEO B2B và form lead. Xem /blog/thiet-ke-website-logistics-van-tai hoặc /lien-he.",
      },
    ],
    services: [
      {
        name: "Thiết kế website logistics",
        description: "Cấu trúc dịch vụ vận tải, kho bãi, coverage map và form báo giá cước theo chuẩn B2B.",
      },
      {
        name: "Tra cứu vận đơn & form lead",
        description: "Module tra cứu AWB/demo + form báo giá: loại hàng, tuyến, trọng lượng — qualify lead trước sales.",
      },
      {
        name: "SEO ngành vận tải",
        description: "Landing theo tuyến + blog checklist/template; liên kết hub /blog/nganh/logistics.",
      },
    ],
    challenge: [
      "Khách B2B (nhà máy, xuất nhập khẩu) cần thấy mạng lưới tuyến và năng lực vận hành trước khi gửi RFQ.",
      "Từ khóa «vận tải + tỉnh/khu công nghiệp» dài tail — cần silo landing theo khu vực.",
      "Tra cứu vận đơn là kỳ vọng mặc định — thiếu module này làm giảm trust.",
      "Lead thường đến từ Google Search + giới thiệu đối tác forwarder.",
    ],
    solution: [
      "Xây website theo hành trình: Dịch vụ → Tuyến vận chuyển → Báo giá → Tra cứu → Liên hệ.",
      "Trang dịch vụ: đường bộ nội địa, vận tải biển, kho bãi & fulfillment.",
      "Coverage map / danh sách chi nhánh: TP.HCM, Bình Dương, Đồng Nai, Long An, Cần Thơ.",
      "Form báo giá: loại hàng, điểm đi/đến, trọng lượng/khối, thời gian giao.",
      "Module tra cứu vận đơn demo + CTA Zalo/hotline cho sales.",
      "Internal link silo: checklist + template 2026 + case study blog → money page logistics.",
    ],
    results: [
      { label: "Website", value: "Live", note: "Giai đoạn 1 bàn giao", trend: "up" },
      { label: "Form báo giá", value: "Active", note: "Thu lead B2B cước vận chuyển", trend: "up" },
      { label: "Silo SEO", value: "7/7 URL", note: "Hub · money · checklist · template · case study", trend: "up" },
      { label: "Tra cứu AWB", value: "Demo", note: "Module tra cứu vận đơn", trend: "neutral" },
      { label: "SEO GSC", value: "Đang đo", note: "Baseline 90 ngày", trend: "neutral" },
    ],
    keywordClusters: [
      {
        region: "Logistics — Head",
        keywords: [
          "thiết kế website logistics",
          "website công ty vận tải",
          "thiết kế website vận tải",
          "website logistics chuyên nghiệp",
        ],
      },
      {
        region: "Dịch vụ B2B",
        keywords: [
          "vận chuyển hàng hóa nội địa",
          "dịch vụ kho bãi tphcm",
          "freight forwarding việt nam",
          "báo giá cước vận chuyển",
        ],
      },
      {
        region: "Local SEO — KCN",
        keywords: [
          "vận tải bình dương",
          "logistics đồng nai",
          "vận chuyển kcn long an",
          "công ty logistics tphcm",
        ],
      },
    ],
    gallery: [
      {
        src: "/tin-tuc/logistics/logistics-1.png",
        alt: "Thiết kế website logistics — giao diện công ty vận tải",
        caption: "Trang chủ website logistics — hero dịch vụ vận tải đường bộ, biển và kho bãi.",
      },
      {
        src: "/tin-tuc/logistics/logistics-2.png",
        alt: "Form báo giá cước vận chuyển trên website logistics",
        caption: "Form báo giá cước — thu lead B2B trước khi sales gọi lại.",
      },
      {
        src: "/tin-tuc/logistics/logistics-3.png",
        alt: "Tra cứu vận đơn trên website logistics",
        caption: "Module tra cứu vận đơn — tăng trust và giảm tải lễ tân.",
      },
    ],
    testimonial:
      "Website logistics không phải brochure — phải có báo giá nhanh, tra cứu đơn và SEO tuyến để khách B2B tin tưởng giao hàng.",
  },
  {
    slug: "glow-dew-cosmetics",
    clientName: "Glow Dew Beauty",
    industry: "my-pham",
    industryLabel: "Mỹ phẩm & skincare D2C",
    headline: "Website shop mỹ phẩm D2C — catalog skincare, review INCI & SEO brand",
    summary:
      "Triển khai website thương hiệm mỹ phẩm Glow Dew Beauty: catalog theo skin type, trang thành phần INCI, review có kiểm duyệt, giỏ hàng + Zalo checkout và silo SEO ingredient — mô hình proof cho shop mỹ phẩm online.",
    answerFirst:
      "Case study Glow Dew Beauty: Bứt Phá Marketing xây website shop mỹ phẩm D2C với catalog skincare, filter theo loại da, blog ingredient SEO, landing chiến dịch và CTA Zalo/MoMo. Website live; silo hub · money · checklist · template · case study đạt 7/7 URL proof ngành mỹ phẩm.",
    metaTitle: "Case Study Website Mỹ Phẩm Glow Dew Beauty | Skincare D2C",
    metaDescription:
      "Case study thiết kế website mỹ phẩm Glow Dew Beauty: catalog skincare, review INCI, thanh toán COD/MoMo và SEO brand làm đẹp. Bứt Phá Marketing.",
    keywordsMain: "case study thiết kế website mỹ phẩm",
    keywordsSecondary: [
      "thiết kế website mỹ phẩm",
      "website shop mỹ phẩm",
      "seo website mỹ phẩm",
      "website skincare",
      "thiết kế website thương hiệu làm đẹp",
    ],
    websiteUrl: "https://www.butphamarketing.com/website/nganh/my-pham",
    thumbnail: "/tin-tuc/my-pham/my-pham-1.png",
    heroImage: "/tin-tuc/my-pham/my-pham-1.png",
    publishedAt: "2026-07-11",
    updatedAt: "2026-07-15",
    status: "in-progress",
    faq: [
      {
        q: "Website shop mỹ phẩm cần những trang gì?",
        a: "Catalog theo dòng sản phẩm/skin type, trang chi tiết có INCI, review có kiểm duyệt, blog ingredient SEO, landing chiến dịch và checkout COD/MoMo/Zalo.",
      },
      {
        q: "Case study Glow Dew Beauty khác Halee Trâm thế nào?",
        a: "Glow Dew tập trung shop mỹ phẩm D2C/skincare — catalog, giỏ hàng, SEO thành phần. Halee Trâm là nail/lash/academy — portfolio dịch vụ và booking.",
      },
      {
        q: "SEO mỹ phẩm cạnh tranh cao — làm sao?",
        a: "Cluster long-tail theo thành phần (niacinamide, retinol), nhu cầu da (da dầu, mụn) và brand story — không đua head keyword generic.",
      },
      {
        q: "Bứt Phá có làm website mỹ phẩm tương tự không?",
        a: "Có — thiết kế website shop mỹ phẩm, skincare brand với SEO và landing ads. Xem /blog/thiet-ke-website-my-pham-lam-dep hoặc /lien-he.",
      },
    ],
    services: [
      {
        name: "Thiết kế website mỹ phẩm D2C",
        description: "UI làm đẹt premium, catalog skincare, filter skin type và CTA mua hàng rõ trên mobile.",
      },
      {
        name: "SEO ingredient & brand",
        description: "Blog cluster theo thành phần, nhu cầu da và landing chiến dịch theo mùa.",
      },
      {
        name: "Checkout & lead Zalo",
        description: "Giỏ hàng WooCommerce hoặc catalog + Zalo — COD/MoMo/VNPay tùy mô hình.",
      },
    ],
    challenge: [
      "Ngành mỹ phẩm online cạnh tranh cao — khách so sánh thành phần và review trước khi mua.",
      "Cần phân biệt shop D2C brand vs salon nail/lash — intent và cấu trúc web khác nhau.",
      "SEO head term «mỹ phẩm» khó — phải đi long-tail ingredient và skin concern.",
      "Landing ads cần message-match với trang sản phẩm để giữ conversion.",
    ],
    solution: [
      "Xây website theo hành trình: Brand story → Catalog → Chi tiết SP (INCI) → Review → Blog → Checkout.",
      "Catalog filter: da dầu, da khô, da mụn, chống lão hóa, dưỡng trắng.",
      "Trang sản phẩm: ảnh gallery, bảng INCI, hướng dẫn sử dụng, FAQ schema Product.",
      "Blog ingredient SEO: niacinamide, retinol, vitamin C, AHA/BHA — internal link về SP.",
      "Landing chiến dịch Tết/11.11 — single CTA, pixel tracking.",
      "Internal link silo: checklist + template 2026 + case study blog → money page mỹ phẩm.",
    ],
    results: [
      { label: "Website", value: "Live", note: "Giai đoạn 1 bàn giao", trend: "up" },
      { label: "Catalog", value: "40+ SP", note: "Skincare theo skin type", trend: "up" },
      { label: "Silo SEO", value: "7/7 URL", note: "Hub · money · checklist · template · case study", trend: "up" },
      { label: "Checkout", value: "Zalo + COD", note: "Lead & đơn hàng online", trend: "up" },
      { label: "SEO GSC", value: "Đang đo", note: "Baseline 90 ngày", trend: "neutral" },
    ],
    keywordClusters: [
      {
        region: "Mỹ phẩm — Head",
        keywords: [
          "thiết kế website mỹ phẩm",
          "website shop mỹ phẩm",
          "website thương hiệu skincare",
          "thiết kế website làm đẹp",
        ],
      },
      {
        region: "Ingredient SEO",
        keywords: [
          "serum niacinamide",
          "kem dưỡng retinol",
          "vitamin c skincare",
          "tẩy tế bào chết aha",
        ],
      },
      {
        region: "Skin concern",
        keywords: [
          "skincare da dầu mụn",
          "routine da khô",
          "mỹ phẩm dưỡng trắng",
          "kem chống nắng nâng tone",
        ],
      },
    ],
    gallery: [
      {
        src: "/tin-tuc/my-pham/my-pham-1.png",
        alt: "Thiết kế website shop mỹ phẩm Glow Dew Beauty",
        caption: "Trang chủ shop mỹ phẩm — hero brand skincare, CTA mua hàng và collection nổi bật.",
      },
      {
        src: "/tin-tuc/my-pham/my-pham-2.png",
        alt: "Catalog sản phẩm skincare trên website mỹ phẩm",
        caption: "Catalog skincare — filter theo loại da và dòng sản phẩm.",
      },
      {
        src: "/tin-tuc/my-pham/my-pham-3.png",
        alt: "Trang chi tiết sản phẩm mỹ phẩm có INCI và review",
        caption: "Trang sản phẩm — INCI, hướng dẫn sử dụng và review có kiểm duyệt.",
      },
    ],
    testimonial:
      "Shop mỹ phẩm online thắng ở bước khách đọc thành phần và review — website phải minh bạch INCI và có landing ads message-match.",
  },
  {
    slug: "an-gia-home",
    clientName: "An Gia Home",
    industry: "noi-that",
    industryLabel: "Nội thất & thiết kế không gian",
    headline: "Website nội thất — catalog phòng mẫu, báo giá nhanh",
    summary:
      "Website showroom nội thất An Gia Home: catalog theo phòng, gallery công trình, form báo giá và SEO local khu vực TP.HCM.",
    answerFirst:
      "Case study An Gia Home: Bứt Phá Marketing triển khai website nội thất với catalog phòng mẫu, gallery trước–sau và CTA báo giá Zalo/hotline.",
    metaTitle: "Case Study Website Nội Thất An Gia Home",
    metaDescription:
      "Case study thiết kế website nội thất An Gia Home: catalog phòng mẫu, gallery công trình và SEO local. Bứt Phá Marketing.",
    keywordsMain: "case study thiết kế website nội thất",
    keywordsSecondary: ["thiết kế website nội thất", "website showroom nội thất", "seo website nội thất"],
    websiteUrl: "https://www.butphamarketing.com/website",
    thumbnail: "/hero-slideshow/hero-slide-04-website.png",
    heroImage: "/hero-slideshow/hero-slide-04-website.png",
    publishedAt: "2026-07-12",
    updatedAt: "2026-07-17",
    status: "in-progress",
    faq: [
      {
        q: "Website nội thất cần gì?",
        a: "Catalog theo phòng, gallery công trình, form báo giá và SEO theo khu vực/dự án.",
      },
    ],
    services: [
      { name: "Thiết kế website", description: "Catalog phòng mẫu, gallery và CTA báo giá." },
      { name: "SEO local", description: "Tối ưu từ khóa nội thất theo quận/TP." },
    ],
    challenge: ["Khách cần xem phòng mẫu trước khi gọi.", "Cạnh tranh showroom online cao."],
    solution: ["Catalog theo phòng + filter phong cách.", "CTA Zalo/hotline trên mọi trang sản phẩm."],
    results: [
      { label: "Website", value: "Live", trend: "up" },
      { label: "Catalog", value: "60+ mẫu", trend: "up" },
    ],
    keywordClusters: [{ region: "Nội thất", keywords: ["thiết kế website nội thất", "website showroom nội thất"] }],
    gallery: [
      {
        src: "/hero-slideshow/hero-slide-04-website.png",
        alt: "Website nội thất An Gia Home",
        caption: "Trang chủ — catalog phòng mẫu và CTA báo giá.",
      },
    ],
  },
];

export const CASE_STUDY_SLUGS = CASE_STUDIES.map((c) => c.slug);

export function getCaseStudyBySlug(slug: string): CaseStudyItem | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function getAllCaseStudies(): CaseStudyItem[] {
  return [...CASE_STUDIES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/** Có mockup thiết bị thật trong /case-studies/ — dùng homepage “Dự án tiêu biểu” */
export function caseStudyHasShowcaseImage(c: CaseStudyItem): boolean {
  const src = `${c.heroImage || ""}|${c.thumbnail || ""}|${(c.gallery || []).map((g) => g.src).join("|")}`;
  return src.includes("/case-studies/") && src.includes("devices-mockup");
}

/** Homepage — chỉ case đã có hình mockup */
export const FEATURED_CASE_STUDY_SLUGS = [
  "halee-tram",
  "nha-khoa-dang-khoa",
  "kien-truc-sao-khue",
  "tham-my-thien-hoang-kim",
  "phuoc-lai-luxury",
] as const;

export function getFeaturedCaseStudies(): CaseStudyItem[] {
  const preferred = FEATURED_CASE_STUDY_SLUGS.map((slug) => getCaseStudyBySlug(slug))
    .filter((c): c is CaseStudyItem => Boolean(c))
    .filter(caseStudyHasShowcaseImage);
  if (preferred.length) return preferred;
  return getAllCaseStudies().filter(caseStudyHasShowcaseImage);
}

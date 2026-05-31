/**
 * Nội dung tư vấn marketing theo ngành — chuẩn hóa copy tư vấn Bứt Phá.
 * Dùng bởi market-research, industry-intelligence, buildWhyBullets.
 */

export type ConsultancyProfile = {
  sectorLabel: string;
  marketContext: string;
  decisionFactors: string[];
  channelReasons: {
    maps: string;
    fanpage: string;
    website: string;
  };
  goalInsights: {
    customers: string;
    revenue: string;
    brand: string;
    retention: string;
  };
  competitiveNote: string;
  typicalCompetitor: string[];
  messagingTone: string;
  solutions: {
    maps: { title: string; outcome: string };
    fanpage: { title: string; outcome: string };
    website: { title: string; outcome: string };
    ads: { title: string; outcome: string };
    optimize: { title: string; outcome: string };
  };
};

const DEFAULT: ConsultancyProfile = {
  sectorLabel: "Doanh nghiệp dịch vụ",
  marketContext: "Khách Việt tra cứu Google & Facebook trước khi liên hệ — thiếu hiện diện số = mất cơ hội cho đối thủ.",
  decisionFactors: [
    "Review & đánh giá trên Google/Facebook",
    "Phản hồi inbox/Zalo trong 30 phút",
    "Thông tin dịch vụ, giá & quy trình rõ ràng",
    "Ảnh thực tế cơ sở/đội ngũ — không stock",
  ],
  channelReasons: {
    maps: "Khách local tìm 'gần tôi' trên Google trước khi gọi — Maps là điểm chạm đầu tiên.",
    fanpage: "Fanpage là nơi khách kiểm tra uy tín, xem bài viết & nhắn tin trực tiếp.",
    website: "Website là kênh sở hữu — SEO lâu dài, đo lead chính xác, không phụ thuộc thuật toán.",
  },
  goalInsights: {
    customers: "Ưu tiên Maps + ads geo + inbox nhanh — bắt khách có nhu cầu ngay lúc tìm kiếm.",
    revenue: "Kết hợp landing page/CTA rõ + remarketing — chuyển lead thành đơn, không chỉ reach.",
    brand: "Content đều trên Fanpage & website trước — xây niềm tin rồi mới scale quảng cáo.",
    retention: "Nuôi cộng đồng bằng content có giá trị, CSKH chủ động & chương trình khách quen.",
  },
  competitiveNote: "Đa số đối thủ cùng quy mô đã có ít nhất Fanpage hoặc Maps — ai làm chuẩn trước sẽ chiếm slot tìm kiếm.",
  typicalCompetitor: [
    "Fanpage đăng bài ≥ 2 lần/tuần + trả lời inbox",
    "Google Maps có ảnh, giờ mở cửa & review",
    "Website hoặc landing có form/Zalo liên hệ",
  ],
  messagingTone: "Thân thiện, rõ ràng, nhấn mạnh uy tín & phản hồi nhanh",
  solutions: {
    maps: { title: "Chuẩn hóa Google Maps & thu review", outcome: "Tăng cuộc gọi/chỉ đường từ tìm kiếm local" },
    fanpage: { title: "Xây Fanpage & lịch content đều", outcome: "Inbox ổn định, khách tin tưởng trước khi mua" },
    website: { title: "Website chuyên nghiệp + SEO nền", outcome: "Lead organic & landing chuyển đổi đo được" },
    ads: { title: "Quảng cáo đo CPL sau khi nền tảng sẵn sàng", outcome: "Lead có chi phí rõ, scale theo ngân sách" },
    optimize: { title: "Tối ưu hạ tầng số hiện có", outcome: "Nâng chất lượng lead từ kênh đang có" },
  },
};

const PROFILES: Record<string, ConsultancyProfile> = {
  "health-beauty": {
    sectorLabel: "Y tế & Làm đẹp",
    marketContext: "Khách chọn spa/nha khoa/thẩm mỹ dựa trên review Maps & ảnh before/after — quyết định thường trong 24–48h.",
    decisionFactors: [
      "Review Google ≥ 4.5★ & phản hồi review chuyên nghiệp",
      "Ảnh before/after, cơ sở vật chất thật",
      "Giá minh bạch, đặt lịch/Zalo dễ dàng",
      "Bác sĩ/kỹ thuật viên có credential hiển thị rõ",
    ],
    channelReasons: {
      maps: "80%+ khách tìm 'spa/nha khoa gần tôi' trên Maps — review & ảnh quyết định 70% click.",
      fanpage: "Fanpage showcase dịch vụ, khuyến mãi & inbox đặt lịch — khách so sánh 2–3 cơ sở trước khi chọn.",
      website: "Website giải thích quy trình, bảng giá & case study — tăng tỷ lệ chốt từ lead lạnh.",
    },
    goalInsights: {
      customers: "Maps + review + ads local bán kính 5km — bắt khách có intent cao nhất trong ngành làm đẹp.",
      revenue: "Combo đặt lịch online + remarketing khách cũ + upsell gói liệu trình trên Fanpage.",
      brand: "Content chuyên môn (tips làm đẹp, Q&A bác sĩ) xây authority trước khi chạy ads rộng.",
      retention: "Chương trình khách cũ, nhắc lịch tái khám & content nuôi trên Fanpage/Zalo.",
    },
    competitiveNote: "Spa/nha khoa cạnh tranh review Maps rất gay gắt — top 3 Maps trong bán kính 3km chiếm phần lớn lead.",
    typicalCompetitor: [
      "Maps ≥ 50 review, ảnh before/after cập nhật hàng tháng",
      "Fanpage đăng tips + khuyến mãi, inbox ≤ 30 phút",
      "Form đặt lịch/Zalo hoặc website giới thiệu dịch vụ",
    ],
    messagingTone: "Chuyên nghiệp, tin cậy, nhấn kết quả thật & đội ngũ có chứng chỉ",
    solutions: {
      maps: { title: "Tối ưu Maps + quy trình thu review sau phục vụ", outcome: "Top 3 'gần tôi' & tăng cuộc gọi đặt lịch 30–50%" },
      fanpage: { title: "Fanpage before/after + inbox đặt lịch", outcome: "Inbox ổn định, tỷ lệ chốt từ social tăng" },
      website: { title: "Website giới thiệu dịch vụ + bảng giá + CTA đặt lịch", outcome: "Lead chất lượng từ organic & form web" },
      ads: { title: "Google Local Ads + FB lead sau Maps chuẩn", outcome: "CPL ổn định, lấp lịch trống ngoài giờ cao điểm" },
      optimize: { title: "Audit review + content hiện có", outcome: "Cải thiện rating & tỷ lệ chuyển đổi inbox" },
    },
  },
  fnb: {
    sectorLabel: "F&B & Ăn uống",
    marketContext: "Quyết định ăn uống nhanh — khách xem ảnh món, review & vị trí trên Maps trong vài phút.",
    decisionFactors: [
      "Ảnh món & không gian trên Maps/Fanpage",
      "Review ≥ 4.0★, phản hồi khiếu nại nhanh",
      "Menu/giá/khuyến mãi cập nhật đúng",
      "Giờ mở cửa & địa chỉ chính xác trên Maps",
    ],
    channelReasons: {
      maps: "Khách tìm 'quán/cafe gần đây' trên Maps — ảnh món & review quyết định 60% lượt chỉ đường.",
      fanpage: "Fanpage show menu, combo, flash sale — kích hoạt check-in & inbox đặt bàn/giao hàng.",
      website: "Website phù hợp chuỗi/nhà hàng cao cấp — đặt bàn online & SEO thương hiệu.",
    },
    goalInsights: {
      customers: "Maps ảnh món chuẩn + ads bán kính 3–5km — fill bàn giờ thấp điểm.",
      revenue: "Combo khuyến mãi trên Fanpage + retarget khách đã check-in + upsell set menu.",
      brand: "Storytelling món & không gian trên Reels/Story trước khi scale ads.",
      retention: "Chương trình khách quen, voucher sinh nhật & content món mới hàng tuần.",
    },
    competitiveNote: "F&B nội thành cạnh tranh Maps cực cao — ảnh món chuyên nghiệp & review 4.5★ là chuẩn vào cuộc.",
    typicalCompetitor: [
      "Maps ảnh món cập nhật, menu đầy đủ trên Fanpage",
      "Đăng khuyến mãi 3–5 bài/tuần, trả lời inbox giao hàng",
      "Ads bán kính giờ trưa/tối hoặc delivery",
    ],
    messagingTone: "Visual-first, appetizing, khuyến mãi rõ & giọng điệu gần gũi",
    solutions: {
      maps: { title: "Maps chuẩn ảnh món + review + giờ mở cửa", outcome: "Tăng chỉ đường & cuộc gọi đặt bàn 40%+" },
      fanpage: { title: "Fanpage menu + khuyến mãi + inbox delivery", outcome: "Inbox đặt bàn/giao hàng ổn định" },
      website: { title: "Landing đặt bàn/ thực đơn online (nếu cần)", outcome: "Kênh đặt chỗ ngoài Maps & social" },
      ads: { title: "FB/Maps ads bán kính giờ thấp điểm", outcome: "Fill bàn off-peak, CPL đo được" },
      optimize: { title: "Refresh ảnh món & menu mùa", outcome: "Tăng CTR Maps & tương tác Fanpage" },
    },
  },
  ecommerce: {
    sectorLabel: "TMĐT & Bán lẻ online",
    marketContext: "Khách so sánh giá, ship & review trên nhiều kênh — quyết định mua trong 1–3 ngày remarketing.",
    decisionFactors: [
      "Giá cạnh tranh & ưu đãi rõ ràng",
      "Video/ảnh sản phẩm thật, social proof",
      "Chính sách ship nhanh & đổi trả minh bạch",
      "Inbox phản hồi nhanh, xác nhận đơn rõ",
    ],
    channelReasons: {
      maps: "Maps hỗ trợ nếu có showroom/kho — khách local muốn xem hàng trực tiếp.",
      fanpage: "Fanpage là kênh bán chính của nhiều shop VN — catalog, livestream & inbox chốt đơn.",
      website: "Website sở hữu data, pixel tracking & SEO sản phẩm — nền tảng scale ads bền vững.",
    },
    goalInsights: {
      customers: "Ads catalog + retarget + Fanpage content sản phẩm — funnel đo từ view → inbox → đơn.",
      revenue: "Website chuyển đổi + remarketing cart abandon + upsell combo trên Fanpage.",
      brand: "UGC, review khách & video unboxing xây trust trước khi tăng ngân sách ads.",
      retention: "Zalo OA remarketing, chương trình khách thân thiết & email/SMS khuyến mãi.",
    },
    competitiveNote: "TMĐT cạnh tranh giá & creative ads — shop có website + pixel tracking scale ổn định hơn chỉ bán Fanpage.",
    typicalCompetitor: [
      "Fanpage catalog + livestream 2–4 lần/tháng",
      "Ads conversion/ catalog với creative mới hàng tuần",
      "Website hoặc landing có chính sách rõ + form đặt hàng",
    ],
    messagingTone: "Deal-driven, video sản phẩm, urgency (flash sale) & social proof",
    solutions: {
      maps: { title: "Maps showroom/kho (nếu có mặt bằng)", outcome: "Khách local tin tưởng & đến xem hàng" },
      fanpage: { title: "Fanpage catalog + content sản phẩm + inbox chốt đơn", outcome: "Đơn inbox ổn định, audience remarketing" },
      website: { title: "Website chuyển đổi + pixel + SEO sản phẩm", outcome: "Funnel ads đo ROAS, giảm phụ thuộc Fanpage" },
      ads: { title: "FB catalog/conversion + retarget", outcome: "Scale đơn với ROAS theo dõi được" },
      optimize: { title: "Audit landing + creative ads", outcome: "Giảm CPA, tăng tỷ lệ chốt inbox" },
    },
  },
  "fashion-retail": {
    sectorLabel: "Thời trang & Mỹ phẩm",
    marketContext: "Visual-first — khách mua theo hình ảnh, trend & influencer micro trên TikTok/Facebook.",
    decisionFactors: ["Ảnh lookbook/video mặc thật", "Size chart & chính sách đổi trả", "Review khách mang ảnh thật", "Flash sale & FOMO rõ ràng"],
    channelReasons: {
      maps: "Maps cho cửa hàng offline — khách tìm 'shop quần áo gần đây'.",
      fanpage: "Fanpage showcase outfit, combo & inbox tư vấn size — kênh bán chính của fashion VN.",
      website: "Website lookbook + SEO thương hiệu + collection landing cho ads.",
    },
    goalInsights: {
      customers: "Content visual mạnh + ads interest/lookalike + retarget xem video.",
      revenue: "Combo/set giá trên Fanpage + retarget + livestream bán hàng.",
      brand: "Storytelling thương hiệu, collab KOL micro & UGC trước scale ads.",
      retention: "Notify collection mới, voucher khách cũ & group Zalo VIP.",
    },
    competitiveNote: "Fashion online cạnh tranh creative — shop có video/reels chất lượng thường có CPC thấp hơn 20–30%.",
    typicalCompetitor: ["Reels/Story hàng ngày", "Livestream 2–4 lần/tháng", "Ads catalog + retarget"],
    messagingTone: "Trendy, visual, FOMO nhẹ & tư vấn size thân thiện",
    solutions: {
      maps: { title: "Maps cửa hàng + ảnh sản phẩm", outcome: "Walk-in từ tìm kiếm local" },
      fanpage: { title: "Fanpage lookbook + inbox tư vấn size", outcome: "Inbox & đơn từ social ổn định" },
      website: { title: "Website collection + SEO thương hiệu", outcome: "Organic brand search & landing ads" },
      ads: { title: "FB/TikTok ads video sản phẩm + retarget", outcome: "Scale đơn theo collection" },
      optimize: { title: "Upgrade creative & size chart", outcome: "Giảm tỷ lệ trả hàng, tăng CTR ads" },
    },
  },
  realestate: {
    sectorLabel: "Bất động sản",
    marketContext: "Chu kỳ mua dài — khách cần uy tín, pháp lý rõ & nurture nhiều touchpoint trước khi chốt.",
    decisionFactors: ["Uy tín sàn/môi giới & case study dự án", "Thông tin pháp lý, giá & tiến độ minh bạch", "Fanpage/website có tour ảo/video", "Phản hồi inbox tư vấn chuyên nghiệp"],
    channelReasons: {
      maps: "Maps doanh nghiệp + văn phòng nhận — khách local tin tưởng có mặt bằng thật.",
      fanpage: "Fanpage showcase dự án, livestream & inbox tư vấn — nuôi lead 2–8 tuần.",
      website: "Website dự án + form lead + SEO khu vực — kênh thu data chính.",
    },
    goalInsights: {
      customers: "Lead ads form/inbox + Maps uy tín + content dự án theo khu vực.",
      revenue: "Nurture lead pipeline + remarketing khách đã xem dự án + event offline.",
      brand: "Case study, testimonial chủ đầu tư & content hạ tầng khu vực.",
      retention: "CRM follow-up, newsletter dự án mới & referral khách đã mua.",
    },
    competitiveNote: "BĐS cạnh tranh lead cost — ai có nurture system (Fanpage + CRM) chốt cao hơn 2× so với chỉ chạy ads.",
    typicalCompetitor: ["Website/landing dự án + form lead", "Fanpage livestream/tour ảo", "Ads lead theo quận/khu vực"],
    messagingTone: "Uy tín, minh bạch pháp lý, số liệu dự án & case study cụ thể",
    solutions: {
      maps: { title: "Maps doanh nghiệp + văn phòng", outcome: "Trust local & cuộc gọi tư vấn" },
      fanpage: { title: "Fanpage dự án + livestream + inbox sales", outcome: "Pipeline lead nuôi 4–8 tuần" },
      website: { title: "Website dự án + form lead + SEO khu vực", outcome: "Lead organic & chất lượng từ ads landing" },
      ads: { title: "FB lead ads + retarget khách xem dự án", outcome: "CPL theo khu vực, phân loại lead sales" },
      optimize: { title: "Audit funnel lead → chốt", outcome: "Tăng tỷ lệ chốt từ lead hiện có" },
    },
  },
  education: {
    sectorLabel: "Giáo dục & Đào tạo",
    marketContext: "Phụ huynh/học viên chọn trung tâm dựa trên feedback, cơ sở gần & chương trình học cụ thể.",
    decisionFactors: ["Feedback phụ huynh/học viên trên Fanpage", "Cơ sở gần, tiện đưa đón", "Chương trình, lịch khai giảng rõ", "Học thử/ưu đãi early bird minh bạch"],
    channelReasons: {
      maps: "Phụ huynh tìm 'trung tâm [môn] gần tôi' — Maps + review quyết định shortlist.",
      fanpage: "Fanpage tuyển sinh, showcase lớp học & inbox tư vấn lộ trình.",
      website: "Website khóa học + SEO + form đăng ký — kênh uy tín dài hạn.",
    },
    goalInsights: {
      customers: "Ads tuyển sinh theo bán kính + Maps + open day content.",
      revenue: "Upsell khóa nâng cao + combo anh em + early bird Fanpage.",
      brand: "Content giá trị (tips học, success story học viên) xây authority.",
      retention: "Nuôi cộng đồng phụ huynh, referral & chương trình học tiếp.",
    },
    competitiveNote: "Giáo dục seasonal — ai chuẩn bị content tuyển sinh trước mùa 4–6 tuần chiếm lead rẻ hơn.",
    typicalCompetitor: ["Fanpage tuyển sinh + video lớp học", "Ads lead bán kính trường/hộ dân", "Website khóa học + form"],
    messagingTone: "Chuyên nghiệp, kết quả học viên, phụ huynh-friendly",
    solutions: {
      maps: { title: "Maps trung tâm + review phụ huynh", outcome: "Shortlist từ tìm kiếm 'gần tôi'" },
      fanpage: { title: "Fanpage tuyển sinh + inbox tư vấn lộ trình", outcome: "Lead inbox & đăng ký học thử" },
      website: { title: "Website khóa học + SEO + form đăng ký", outcome: "Lead organic & landing ads tuyển sinh" },
      ads: { title: "FB lead ads bán kính + retarget open day", outcome: "CPL tuyển sinh theo mùa" },
      optimize: { title: "Refresh content mùa tuyển sinh", outcome: "Giảm CPL, tăng đăng ký học thử" },
    },
  },
  construction: {
    sectorLabel: "Xây dựng & Lắp đặt",
    marketContext: "Khách cần uy tín, hình ảnh công trình thật & báo giá rõ — chu kỳ quyết định 1–4 tuần.",
    decisionFactors: ["Portfolio công trình thật (ảnh/video)", "Review Maps & giới thiệu khách cũ", "Báo giá/quy trình minh bạch", "Phản hồi khảo sát/báo giá nhanh"],
    channelReasons: {
      maps: "Khách tìm 'thợ/thi công/lắp đặt gần tôi' — Maps + review là bằng chứng uy tín.",
      fanpage: "Fanpage công trình before/after, quy trình thi công & inbox báo giá.",
      website: "Website portfolio + form khảo sát + SEO dịch vụ theo khu vực.",
    },
    goalInsights: {
      customers: "Maps portfolio + ads lead form khảo sát + inbox báo giá 24h.",
      revenue: "Upsell bảo trì/gói mở rộng + remarketing khách đã khảo sát.",
      brand: "Case study công trình lớn & content kỹ thuật xây dựng uy tín.",
      retention: "Chăm sóc khách cũ, referral & bảo trì định kỳ.",
    },
    competitiveNote: "Xây dựng nhiều DN chưa có website — ai có portfolio online sẽ được chọn vào shortlist trước.",
    typicalCompetitor: ["Fanpage ảnh công trình", "Maps review + ảnh thi công", "Inbox/Zalo báo giá nhanh"],
    messagingTone: "Uy tín, kỹ thuật rõ, ảnh công trình thật & cam kết tiến độ",
    solutions: {
      maps: { title: "Maps + ảnh công trình + review", outcome: "Lead khảo sát từ tìm kiếm local" },
      fanpage: { title: "Fanpage portfolio + inbox báo giá", outcome: "Inbox lead chất lượng, nurture 1–4 tuần" },
      website: { title: "Website portfolio + form khảo sát", outcome: "Lead SEO khu vực & landing ads" },
      ads: { title: "FB lead form khảo sát + retarget", outcome: "CPL khảo sát đo được" },
      optimize: { title: "Cập nhật portfolio & case study mới", outcome: "Tăng tỷ lệ chốt báo giá" },
    },
  },
  automotive: {
    sectorLabel: "Ô tô & Garage",
    marketContext: "Khách garage/sửa xe chọn theo review, giá công & khoảng cách — quyết định nhanh khi cần gấp.",
    decisionFactors: ["Review Maps ≥ 4.3★", "Giá công/dịch vụ niêm yết rõ", "Ảnh xưởng & thiết bị thật", "Inbox/Zalo báo giá phụ tùng nhanh"],
    channelReasons: {
      maps: "Khách tìm 'garage/sửa xe gần tôi' khẩn cấp — Maps top 3 chiếm phần lớn cuộc gọi.",
      fanpage: "Fanpage tips bảo dưỡng, khuyến mãi dịch vụ & inbox tư vấn.",
      website: "Website dịch vụ + bảng giá công (optional) — SEO dài hạn.",
    },
    goalInsights: {
      customers: "Maps + review + ads local — bắt khách cần sửa gấp trong bán kính.",
      revenue: "Upsell bảo dưỡng định kỳ + combo dịch vụ trên Fanpage.",
      brand: "Content chuyên môn (tips xe) xây authority garage uy tín.",
      retention: "Nhắc lịch bảo dưỡng, voucher khách quen & Zalo follow-up.",
    },
    competitiveNote: "Garage cạnh tranh review Maps — 4.5★ vs 3.8★ có thể chênh 2× lượt gọi.",
    typicalCompetitor: ["Maps review + ảnh xưởng", "Fanpage khuyến mãi dịch vụ", "Inbox báo giá nhanh"],
    messagingTone: "Tin cậy, minh bạch giá, nhanh & chuyên môn kỹ thuật",
    solutions: {
      maps: { title: "Maps garage + review + ảnh xưởng", outcome: "Tăng cuộc gọi sửa xe/bảo dưỡng" },
      fanpage: { title: "Fanpage tips xe + khuyến mãi dịch vụ", outcome: "Khách quen quay lại & referral" },
      website: { title: "Website dịch vụ + bảng giá công", outcome: "SEO 'sửa xe [khu vực]'" },
      ads: { title: "Maps/FB ads local dịch vụ", outcome: "Lead bảo dưỡng & dịch vụ off-peak" },
      optimize: { title: "Thu review + cập nhật giá dịch vụ", outcome: "Tăng rating & cuộc gọi" },
    },
  },
  pharmacy: {
    sectorLabel: "Nhà thuốc",
    marketContext: "Khách chọn nhà thuốc gần, tin tưởng dược sĩ & giá minh bạch — Maps là kênh chính.",
    decisionFactors: ["Vị trí gần & giờ mở cửa trên Maps", "Review & phản hồi chuyên môn", "Fanpage tư vấn sức khỏe (compliance)", "Giao hàng/ Zalo đặt thuốc"],
    channelReasons: {
      maps: "Khách tìm 'nhà thuốc gần tôi' — Maps quyết định 80% lượt đến.",
      fanpage: "Fanpage tips sức khỏe, khuyến mãi & inbox tư vấn (tuân thủ quảng cáo dược).",
      website: "Website giới thiệu + form liên hệ — phù hợp chuỗi nhà thuốc.",
    },
    goalInsights: {
      customers: "Maps chuẩn + review + ads local nhắc nhà thuốc gần.",
      revenue: "Combo vitamin/chăm sóc + giao hàng Zalo trên Fanpage.",
      brand: "Content sức khỏe cộng đồng, uy tín dược sĩ.",
      retention: "Nhắc mua lại, chương trình khách thân thiết.",
    },
    competitiveNote: "Nhà thuốc cạnh tranh theo bán kính — top Maps trong 1km thường chiếm 50%+ walk-in.",
    typicalCompetitor: ["Maps giờ mở cửa chuẩn + review", "Fanpage tips sức khỏe", "Zalo đặt thuốc"],
    messagingTone: "Chuyên nghiệp y tế, tin cậy, tuân thủ quy định quảng cáo",
    solutions: {
      maps: { title: "Maps nhà thuốc + review + giờ mở cửa", outcome: "Tăng walk-in & cuộc gọi hỏi thuốc" },
      fanpage: { title: "Fanpage tips sức khỏe + inbox tư vấn", outcome: "Engagement & đặt thuốc qua Zalo" },
      website: { title: "Website chuỗi + form liên hệ", outcome: "Uy tín chuỗi & SEO thương hiệu" },
      ads: { title: "Local ads nhắc nhà thuốc gần", outcome: "Tăng nhận diện khu vực mới mở" },
      optimize: { title: "Audit Maps & content compliance", outcome: "Rating cao hơn, trust tăng" },
    },
  },
  tech: {
    sectorLabel: "Công nghệ & IT",
    marketContext: "B2B/B2C tech cần case study, demo & content chuyên môn — chu kỳ sales dài hơn F&B.",
    decisionFactors: ["Case study & portfolio dự án", "Website chuyên nghiệp + blog kỹ thuật", "LinkedIn/Fanpage thought leadership", "Demo/trial rõ ràng"],
    channelReasons: {
      maps: "Maps văn phòng — trust cho khách B2B local muốn gặp trực tiếp.",
      fanpage: "Fanpage product update, tips & community — nuôi user B2C.",
      website: "Website là kênh chính — SEO, landing sản phẩm & form demo B2B.",
    },
    goalInsights: {
      customers: "Content chuyên môn + LinkedIn/Fanpage + ads lead demo.",
      revenue: "Funnel demo → trial → paid + upsell support/gói nâng cao.",
      brand: "Blog kỹ thuật, webinar & case study xây authority.",
      retention: "Customer success content, update sản phẩm & community.",
    },
    competitiveNote: "IT B2B cạnh tranh bằng case study & SEO — ai có blog chuyên môn có CPL thấp hơn ads thuần.",
    typicalCompetitor: ["Website case study + blog", "Fanpage product update", "Ads lead demo/webinar"],
    messagingTone: "Chuyên môn, data-driven, case study & ROI rõ",
    solutions: {
      maps: { title: "Maps văn phòng công ty", outcome: "Trust B2B local" },
      fanpage: { title: "Fanpage product + community", outcome: "Engagement & lead B2C" },
      website: { title: "Website sản phẩm + blog SEO + form demo", outcome: "Lead organic B2B & landing ads" },
      ads: { title: "LinkedIn/FB lead demo + retarget", outcome: "Pipeline demo đo CPL" },
      optimize: { title: "Publish case study & refresh landing", outcome: "Tăng tỷ lệ demo → chốt" },
    },
  },
};

export function getConsultancyProfile(profileId: string): ConsultancyProfile {
  return PROFILES[profileId] ?? DEFAULT;
}

export function getDecisionFactors(profileId: string): string[] {
  return getConsultancyProfile(profileId).decisionFactors;
}

export function getChannelReason(profileId: string, channel: "maps" | "fanpage" | "website"): string {
  return getConsultancyProfile(profileId).channelReasons[channel];
}

export function resolveGoalKey(businessGoal: string): keyof ConsultancyProfile["goalInsights"] {
  if (businessGoal.includes("Tăng khách")) return "customers";
  if (businessGoal.includes("doanh thu")) return "revenue";
  if (businessGoal.includes("thương hiệu")) return "brand";
  if (businessGoal.includes("Giữ chân")) return "retention";
  return "customers";
}

export function getGoalInsight(profileId: string, businessGoal: string): string {
  const profile = getConsultancyProfile(profileId);
  return profile.goalInsights[resolveGoalKey(businessGoal)];
}

export function getIndustryInsight(
  profileId: string,
  businessGoal: string,
  matchType: "exact" | "fuzzy" | "profile" | "unknown",
  locationHint?: string,
): string {
  if (matchType === "unknown") {
    return "Chọn ngành từ gợi ý masothue hoặc mô tả cụ thể hơn — tư vấn sẽ sát playbook ngành & báo giá chuẩn hơn.";
  }
  const profile = getConsultancyProfile(profileId);
  const goalLine = getGoalInsight(profileId, businessGoal);
  const base = `${profile.sectorLabel}: ${goalLine}`;
  return locationHint ? `${base}${locationHint}` : base;
}

export function getPositioningLine(
  profileId: string,
  companyName: string,
  city: string,
  businessGoal: string,
): string {
  const profile = getConsultancyProfile(profileId);
  const goalKey = resolveGoalKey(businessGoal);
  const templates: Record<keyof ConsultancyProfile["goalInsights"], string> = {
    customers: `${companyName} — ${profile.sectorLabel} tại ${city}, tiếp cận khách có nhu cầu ngay qua Maps & inbox phản hồi nhanh.`,
    revenue: `${companyName} — ${profile.sectorLabel} chuyển đổi cao tại ${city}, funnel đo được từ content đến chốt đơn.`,
    brand: `${companyName} — thương hiệu ${profile.sectorLabel} được tin tưởng tại ${city}, xây bằng content chuyên môn & trải nghiệm khách hàng.`,
    retention: `${companyName} — ${profile.sectorLabel} giữ chân khách tại ${city} bằng dịch vụ tận tâm & cộng đồng online.`,
  };
  return templates[goalKey];
}

export function getConsultancyTip(profileId: string, businessGoal: string): string | null {
  const profile = getConsultancyProfile(profileId);
  const tips: Record<string, string> = {
    customers: profile.goalInsights.customers,
    revenue: profile.goalInsights.revenue,
    brand: profile.goalInsights.brand,
    retention: profile.goalInsights.retention,
  };
  const key = resolveGoalKey(businessGoal);
  return tips[key] ?? null;
}

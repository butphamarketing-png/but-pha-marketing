/** @typedef {{ slug: string, keywordsMain: string, h1: string, angle: string, niche: string }} MarketingSeed */

function toSlug(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const AUDIENCES = [
  { suffix: "cho doanh nghiệp", slug: "cho-doanh-nghiep" },
  { suffix: "cho SME", slug: "cho-sme" },
  { suffix: "cho startup", slug: "cho-startup" },
  { suffix: "cho shop online", slug: "cho-shop-online" },
  { suffix: "cho B2B", slug: "cho-b2b" },
  { suffix: "cho B2C", slug: "cho-b2c" },
  { suffix: "cho ngành dịch vụ", slug: "cho-nganh-dich-vu" },
  { suffix: "cho thương mại điện tử", slug: "cho-thuong-mai-dien-tu" },
  { suffix: "cho doanh nghiệp nhỏ", slug: "cho-doanh-nghiep-nho" },
  { suffix: "cho chuỗi cửa hàng", slug: "cho-chuoi-cua-hang" },
];

const CITIES = [
  { name: "TPHCM", slug: "tphcm", kw: "tại TPHCM" },
  { name: "Hà Nội", slug: "ha-noi", kw: "tại Hà Nội" },
  { name: "Đà Nẵng", slug: "da-nang", kw: "tại Đà Nẵng" },
  { name: "Cần Thơ", slug: "can-tho", kw: "tại Cần Thơ" },
  { name: "Bình Dương", slug: "binh-duong", kw: "tại Bình Dương" },
  { name: "Hải Phòng", slug: "hai-phong", kw: "tại Hải Phòng" },
  { name: "Nha Trang", slug: "nha-trang", kw: "tại Nha Trang" },
  { name: "Huế", slug: "hue", kw: "tại Huế" },
  { name: "Vũng Tàu", slug: "vung-tau", kw: "tại Vũng Tàu" },
  { name: "Đồng Nai", slug: "dong-nai", kw: "tại Đồng Nai" },
  { name: "Long An", slug: "long-an", kw: "tại Long An" },
  { name: "Bắc Ninh", slug: "bac-ninh", kw: "tại Bắc Ninh" },
  { name: "Quảng Ninh", slug: "quang-ninh", kw: "tại Quảng Ninh" },
  { name: "Thanh Hóa", slug: "thanh-hoa", kw: "tại Thanh Hóa" },
  { name: "Vinh", slug: "vinh", kw: "tại Vinh" },
];

const GOALS = [
  { text: "tăng doanh số", slug: "tang-doanh-so" },
  { text: "thu lead", slug: "thu-lead" },
  { text: "giảm chi phí quảng cáo", slug: "giam-chi-phi" },
  { text: "tăng nhận diện thương hiệu", slug: "tang-nhan-dien" },
  { text: "giữ chân khách hàng", slug: "giu-chan-khach" },
  { text: "tăng chuyển đổi", slug: "tang-chuyen-doi" },
  { text: "mở rộng thị trường", slug: "mo-rong-thi-truong" },
  { text: "tối ưu ROI", slug: "toi-uu-roi" },
  { text: "scale chiến dịch", slug: "scale-chien-dich" },
  { text: "ra mắt sản phẩm mới", slug: "ra-mat-san-pham" },
];

const HOW_TO = [
  { prefix: "cách chạy", slug: "cach-chay", h1Prefix: "Cách Chạy" },
  { prefix: "hướng dẫn", slug: "huong-dan", h1Prefix: "Hướng Dẫn" },
  { prefix: "quy trình", slug: "quy-trinh", h1Prefix: "Quy Trình" },
  { prefix: "bí quyết", slug: "bi-quyet", h1Prefix: "Bí Quyết" },
  { prefix: "mẹo", slug: "meo", h1Prefix: "Mẹo" },
];

/** Tổng số bài marketing (500 ban đầu + 1000 mở rộng) */
export const TARGET_MARKETING_COUNT = 1500;

const INDUSTRIES = [
  { name: "nhà hàng", slug: "nha-hang" },
  { name: "spa", slug: "spa" },
  { name: "nha khoa", slug: "nha-khoa" },
  { name: "bất động sản", slug: "bat-dong-san" },
  { name: "giáo dục", slug: "giao-duc" },
  { name: "thời trang", slug: "thoi-trang" },
  { name: "mỹ phẩm", slug: "my-pham" },
  { name: "xây dựng", slug: "xay-dung" },
  { name: "y tế", slug: "y-te" },
  { name: "du lịch", slug: "du-lich" },
  { name: "nội thất", slug: "noi-that" },
  { name: "ô tô", slug: "o-to" },
  { name: "pháp lý", slug: "phap-ly" },
  { name: "logistics", slug: "logistics" },
  { name: "nông sản", slug: "nong-san" },
];

/** @type {{ niche: string, items: { kw: string, h1: string, angle: string, slug?: string }[] }[]} */
const PILLARS = [
  {
    niche: "seo",
    items: [
      { kw: "dịch vụ seo", h1: "Dịch Vụ SEO", angle: "tối ưu website lên top Google bền vững" },
      { kw: "seo website", h1: "SEO Website", angle: "tối ưu on-page, kỹ thuật và nội dung website" },
      { kw: "seo on page", h1: "SEO On Page", angle: "tối ưu title, meta, heading và nội dung từng trang" },
      { kw: "seo off page", h1: "SEO Off Page", angle: "xây backlink, mention thương hiệu và uy tín miền" },
      { kw: "seo local", h1: "SEO Local", slug: "marketing-seo-local", angle: "tối ưu Google Maps và tìm kiếm địa phương" },
      { kw: "audit seo", h1: "Audit SEO", angle: "đánh giá toàn diện lỗi kỹ thuật và cơ hội xếp hạng" },
      { kw: "tư vấn seo", h1: "Tư Vấn SEO", angle: "lập chiến lược từ khóa và lộ trình triển khai" },
      { kw: "seo từ khóa", h1: "SEO Từ Khóa", angle: "nghiên cứu keyword và map intent sang nội dung" },
      { kw: "seo content", h1: "SEO Content", angle: "viết bài chuẩn SEO phục vụ chuyển đổi" },
      { kw: "seo ecommerce", h1: "SEO Ecommerce", angle: "tối ưu danh mục, sản phẩm và filter shop online" },
    ],
  },
  {
    niche: "google-ads",
    items: [
      { kw: "quảng cáo google", h1: "Quảng Cáo Google", angle: "tiếp cận khách có nhu cầu tìm kiếm cao" },
      { kw: "google ads", h1: "Google Ads", angle: "chạy Search, Display và Performance Max hiệu quả" },
      { kw: "quảng cáo google search", h1: "Quảng Cáo Google Search", angle: "bắt intent tìm kiếm dịch vụ và sản phẩm" },
      { kw: "google display ads", h1: "Google Display Ads", angle: "remarketing và nhận diện thương hiệu trên mạng hiển thị" },
      { kw: "quảng cáo youtube", h1: "Quảng Cáo YouTube", angle: "video ads tiếp cận khách ở giai đoạn nhận biết" },
      { kw: "quản lý google ads", h1: "Quản Lý Google Ads", angle: "tối ưu ngân sách, từ khóa và chất lượng quảng cáo" },
      { kw: "tối ưu google ads", h1: "Tối Ưu Google Ads", angle: "giảm CPC, tăng conversion rate và ROAS" },
      { kw: "dịch vụ google ads", h1: "Dịch Vụ Google Ads", angle: "setup, tracking và vận hành chiến dịch trọn gói" },
      { kw: "google shopping ads", h1: "Google Shopping Ads", angle: "quảng cáo sản phẩm trên SERP và Merchant Center" },
      { kw: "remarketing google", h1: "Remarketing Google", angle: "tái tiếp cận visitor đã vào website" },
    ],
  },
  {
    niche: "facebook-ads",
    items: [
      { kw: "quảng cáo facebook", h1: "Quảng Cáo Facebook", angle: "tiếp cận đúng audience trên Meta" },
      { kw: "facebook ads", h1: "Facebook Ads", angle: "setup campaign, ad set và creative hiệu quả" },
      { kw: "quảng cáo instagram", h1: "Quảng Cáo Instagram", angle: "story, reel và feed ads cho thương hiệu visual" },
      { kw: "meta ads", h1: "Meta Ads", angle: "quảng cáo đa nền tảng Facebook và Instagram" },
      { kw: "quản lý facebook ads", h1: "Quản Lý Facebook Ads", angle: "theo dõi CPA, ROAS và scale ngân sách" },
      { kw: "tối ưu facebook ads", h1: "Tối Ưu Facebook Ads", angle: "A/B test creative, audience và landing page" },
      { kw: "dịch vụ facebook ads", h1: "Dịch Vụ Facebook Ads", angle: "triển khai và vận hành ads cho doanh nghiệp" },
      { kw: "lead ads facebook", h1: "Lead Ads Facebook", angle: "thu lead trực tiếp trên Facebook không cần rời app" },
      { kw: "pixel facebook", h1: "Pixel Facebook", angle: "cài đặt tracking conversion và tối ưu chiến dịch" },
      { kw: "remarketing facebook", h1: "Remarketing Facebook", angle: "custom audience và lookalike từ dữ liệu website" },
    ],
  },
  {
    niche: "tiktok-ads",
    items: [
      { kw: "quảng cáo tiktok", h1: "Quảng Cáo TikTok", angle: "video ngắn viral và chuyển đổi Gen Z" },
      { kw: "tiktok ads", h1: "TikTok Ads", angle: "In-Feed, Spark Ads và conversion campaign" },
      { kw: "marketing tiktok", h1: "Marketing TikTok", angle: "xây kênh organic và kết hợp ads" },
      { kw: "quảng cáo video", h1: "Quảng Cáo Video", angle: "short-form video trên TikTok, Reels, Shorts" },
      { kw: "kol marketing", h1: "KOL Marketing", angle: "hợp tác KOL/KOC tăng uy tín và chuyển đổi" },
      { kw: "influencer marketing", h1: "Influencer Marketing", angle: "chiến dịch seeding và review sản phẩm" },
      { kw: "livestream bán hàng", h1: "Livestream Bán Hàng", angle: "live commerce kết hợp social và TMĐT" },
      { kw: "quảng cáo zalo", h1: "Quảng Cáo Zalo", angle: "Zalo Ads tiếp cận người dùng Việt Nam" },
      { kw: "zalo marketing", h1: "Zalo Marketing", angle: "OA, ZNS và chatbot chăm sóc khách" },
      { kw: "marketing shopee", h1: "Marketing Shopee", angle: "quảng cáo nội sàn và tối ưu listing" },
    ],
  },
  {
    niche: "content",
    items: [
      { kw: "content marketing", h1: "Content Marketing", angle: "chiến lược nội dung thu hút và giữ chân khách" },
      { kw: "marketing nội dung", h1: "Marketing Nội Dung", angle: "blog, video, infographic phục vụ SEO và brand" },
      { kw: "viết content seo", h1: "Viết Content SEO", angle: "bài viết chuẩn intent và từ khóa mục tiêu" },
      { kw: "chiến lược content", h1: "Chiến Lược Content", angle: "editorial calendar và pillar-cluster" },
      { kw: "copywriting", h1: "Copywriting", angle: "viết quảng cáo, landing page và CTA chuyển đổi" },
      { kw: "storytelling thương hiệu", h1: "Storytelling Thương Hiệu", angle: "kể chuyện brand xây cảm xúc và loyalty" },
      { kw: "video marketing", h1: "Video Marketing", angle: "sản xuất video phục vụ ads và organic" },
      { kw: "podcast marketing", h1: "Podcast Marketing", angle: "audio content xây authority ngành" },
      { kw: "blog marketing", h1: "Blog Marketing", angle: "blog làm hub SEO và nurture lead" },
      { kw: "user generated content", h1: "User Generated Content", angle: "khuyến khích khách tạo nội dung review" },
    ],
  },
  {
    niche: "email",
    items: [
      { kw: "email marketing", h1: "Email Marketing", angle: "newsletter, nurture và chăm sóc khách cũ" },
      { kw: "marketing automation", h1: "Marketing Automation", angle: "workflow tự động theo hành vi khách" },
      { kw: "crm marketing", h1: "CRM Marketing", angle: "quản lý lead và pipeline bán hàng" },
      { kw: "lead nurturing", h1: "Lead Nurturing", angle: "nuôi lead đến khi sẵn sàng mua" },
      { kw: "sms marketing", h1: "SMS Marketing", angle: "tin nhắn thông báo ưu đãi và nhắc lịch" },
      { kw: "zns marketing", h1: "ZNS Marketing", angle: "Zalo Notification Service cho doanh nghiệp" },
      { kw: "chăm sóc khách hàng", h1: "Chăm Sóc Khách Hàng", angle: "CSKH đa kênh sau chuyển đổi" },
      { kw: "retention marketing", h1: "Retention Marketing", angle: "giữ chân khách và tăng LTV" },
      { kw: "loyalty program", h1: "Loyalty Program", angle: "chương trình khách hàng thân thiết" },
      { kw: "funnel marketing", h1: "Funnel Marketing", angle: "phễu TOFU-MOFU-BOFU và tối ưu từng bước" },
    ],
  },
  {
    niche: "social",
    items: [
      { kw: "social media marketing", h1: "Social Media Marketing", angle: "vận hành Fanpage và kênh social đồng bộ" },
      { kw: "marketing facebook", h1: "Marketing Facebook", angle: "organic + ads trên nền tảng Meta" },
      { kw: "marketing instagram", h1: "Marketing Instagram", angle: "reels, story và visual branding" },
      { kw: "marketing linkedin", h1: "Marketing LinkedIn", angle: "B2B thought leadership và lead gen" },
      { kw: "community management", h1: "Community Management", angle: "quản trị cộng đồng và tương tác" },
      { kw: "social listening", h1: "Social Listening", angle: "theo dõi mention và sentiment thương hiệu" },
      { kw: "viral marketing", h1: "Viral Marketing", angle: "chiến dịch lan truyền có chủ đích" },
      { kw: "guerrilla marketing", h1: "Guerrilla Marketing", angle: "sáng tạo ngân sách thấp gây chú ý" },
      { kw: "event marketing", h1: "Event Marketing", angle: "quảng bá qua sự kiện online và offline" },
      { kw: "pr marketing", h1: "PR Marketing", angle: "quan hệ công chúng và truyền thông báo chí" },
    ],
  },
  {
    niche: "branding",
    items: [
      { kw: "branding", h1: "Branding", angle: "xây dựng nhận diện và định vị thương hiệu" },
      { kw: "thiết kế thương hiệu", h1: "Thiết Kế Thương Hiệu", angle: "logo, guideline và visual identity" },
      { kw: "personal branding", h1: "Personal Branding", angle: "xây thương hiệu cá nhân cho founder, KOL" },
      { kw: "brand strategy", h1: "Brand Strategy", angle: "chiến lược định vị và thông điệp cốt lõi" },
      { kw: "rebranding", h1: "Rebranding", angle: "tái định vị thương hiệu khi mở rộng hoặc pivot" },
      { kw: "brand awareness", h1: "Brand Awareness", angle: "tăng nhận biết thương hiệu trên thị trường" },
      { kw: "positioning marketing", h1: "Positioning Marketing", angle: "định vị khác biệt so với đối thủ" },
      { kw: "thương hiệu số", h1: "Thương Hiệu Số", angle: "digital presence đồng nhất mọi touchpoint" },
      { kw: "employer branding", h1: "Employer Branding", angle: "thương hiệu tuyển dụng thu hút nhân tài" },
      { kw: "brand voice", h1: "Brand Voice", angle: "giọng điệu thống nhất trên mọi kênh nội dung" },
    ],
  },
  {
    niche: "analytics",
    items: [
      { kw: "digital marketing", h1: "Digital Marketing", angle: "tổng thể chiến lược marketing số" },
      { kw: "marketing online", h1: "Marketing Online", angle: "quảng bá trên website, social và ads" },
      { kw: "performance marketing", h1: "Performance Marketing", angle: "đo lường theo CPA, ROAS và conversion" },
      { kw: "growth marketing", h1: "Growth Marketing", angle: "thử nghiệm nhanh để tăng trưởng người dùng" },
      { kw: "conversion rate optimization", h1: "Conversion Rate Optimization", angle: "CRO tối ưu landing và checkout" },
      { kw: "marketing analytics", h1: "Marketing Analytics", angle: "GA4, dashboard và báo cáo KPI" },
      { kw: "attribution marketing", h1: "Attribution Marketing", angle: "phân bổ credit đa kênh chính xác" },
      { kw: "a/b testing marketing", h1: "A/B Testing Marketing", angle: "thử nghiệm headline, CTA và layout" },
      { kw: "kpi marketing", h1: "KPI Marketing", angle: "chỉ số đo lường hiệu quả chiến dịch" },
      { kw: "roi marketing", h1: "ROI Marketing", angle: "tính hoàn vốn đầu tư marketing" },
    ],
  },
  {
    niche: "strategy",
    items: [
      { kw: "chiến lược marketing", h1: "Chiến Lược Marketing", angle: "lập kế hoạch marketing 6–12 tháng" },
      { kw: "kế hoạch marketing", h1: "Kế Hoạch Marketing", angle: "roadmap kênh, ngân sách và timeline" },
      { kw: "marketing mix", h1: "Marketing Mix", angle: "4P/7P phù hợp mô hình kinh doanh" },
      { kw: "go to market", h1: "Go To Market", angle: "ra mắt sản phẩm/dịch vụ mới thị trường" },
      { kw: "market research", h1: "Market Research", angle: "nghiên cứu thị trường và đối thủ" },
      { kw: "customer persona", h1: "Customer Persona", angle: "chân dung khách hàng mục tiêu chi tiết" },
      { kw: "customer journey", h1: "Customer Journey", angle: "bản đồ hành trình khách từ awareness đến mua" },
      { kw: "omnichannel marketing", h1: "Omnichannel Marketing", angle: "trải nghiệm đồng nhất online-offline" },
      { kw: "affiliate marketing", h1: "Affiliate Marketing", angle: "cộng tác viên bán hàng hoa hồng" },
      { kw: "partnership marketing", h1: "Partnership Marketing", angle: "hợp tác thương hiệu cross-promotion" },
    ],
  },
];

function makeSeed({ slug, keywordsMain, h1, angle, niche }) {
  return { slug, keywordsMain, h1, angle, niche };
}

function addSeed(seeds, seen, seed) {
  if (seen.has(seed.slug)) return false;
  seen.add(seed.slug);
  seeds.push(seed);
  return true;
}

function allItems() {
  /** @type {{ pillar: typeof PILLARS[0], item: typeof PILLARS[0]["items"][0] }[]} */
  const rows = [];
  for (const pillar of PILLARS) {
    for (const item of pillar.items) {
      rows.push({ pillar, item });
    }
  }
  return rows;
}

/** Lô 1: topic × audience — 50 bài / pillar = 500 */
function batchAudience(seeds, seen) {
  for (const pillar of PILLARS) {
    let pillarCount = 0;
    for (const item of pillar.items) {
      for (const aud of AUDIENCES) {
        if (pillarCount >= 50) break;
        const keywordsMain = `${item.kw} ${aud.suffix}`;
        const slug = toSlug(`${item.slug || item.kw}-${aud.slug}`);
        if (addSeed(seeds, seen, makeSeed({
          slug,
          keywordsMain,
          h1: `${item.h1} ${aud.suffix.charAt(0).toUpperCase() + aud.suffix.slice(1)}`,
          angle: `${item.angle} — phù hợp ${aud.suffix.replace("cho ", "")}`,
          niche: pillar.niche,
        }))) {
          pillarCount += 1;
        }
      }
      if (pillarCount >= 50) break;
    }
  }
}

/** Lô 2: topic × thành phố — ~500 bài (5 thành phố đầu × 100 topic) */
function batchCity(seeds, seen, limit) {
  const cities = CITIES.slice(0, 5);
  for (const { pillar, item } of allItems()) {
    for (const city of cities) {
      if (seeds.length >= limit) return;
      const keywordsMain = `${item.kw} ${city.kw}`;
      const slug = toSlug(`${item.slug || item.kw}-${city.slug}`);
      addSeed(seeds, seen, makeSeed({
        slug,
        keywordsMain,
        h1: `${item.h1} ${city.kw.charAt(0).toUpperCase() + city.kw.slice(1)}`,
        angle: `${item.angle} — tập trung thị trường ${city.name}`,
        niche: pillar.niche,
      }));
    }
  }
}

/** Lô 3: topic × ngành — ~500 bài (5 ngành × 100 topic) */
function batchIndustry(seeds, seen, limit) {
  const industries = INDUSTRIES.slice(0, 5);
  for (const { pillar, item } of allItems()) {
    for (const ind of industries) {
      if (seeds.length >= limit) return;
      const keywordsMain = `${item.kw} cho ${ind.name}`;
      const slug = toSlug(`${item.slug || item.kw}-cho-${ind.slug}`);
      addSeed(seeds, seen, makeSeed({
        slug,
        keywordsMain,
        h1: `${item.h1} Cho ${ind.name.charAt(0).toUpperCase() + ind.name.slice(1)}`,
        angle: `${item.angle} — chuyên biệt ngành ${ind.name}`,
        niche: pillar.niche,
      }));
    }
  }
}

/** Lô 4: topic × mục tiêu marketing */
function batchGoals(seeds, seen, limit) {
  for (const { pillar, item } of allItems()) {
    for (const goal of GOALS) {
      if (seeds.length >= limit) return;
      const keywordsMain = `${item.kw} ${goal.text}`;
      const slug = toSlug(`${item.slug || item.kw}-${goal.slug}`);
      addSeed(seeds, seen, makeSeed({
        slug,
        keywordsMain,
        h1: `${item.h1} ${goal.text.charAt(0).toUpperCase() + goal.text.slice(1)}`,
        angle: `${item.angle} — tập trung ${goal.text}`,
        niche: pillar.niche,
      }));
    }
  }
}

/** Lô 5: hướng dẫn / cách chạy */
function batchHowTo(seeds, seen, limit) {
  for (const { pillar, item } of allItems()) {
    for (const how of HOW_TO) {
      if (seeds.length >= limit) return;
      const keywordsMain = `${how.prefix} ${item.kw}`;
      const slug = toSlug(`${how.slug}-${item.slug || item.kw}`);
      addSeed(seeds, seen, makeSeed({
        slug,
        keywordsMain,
        h1: `${how.h1Prefix} ${item.h1}`,
        angle: `${how.prefix} ${item.angle}`,
        niche: pillar.niche,
      }));
    }
  }
}

/** Lô 6: thành phố mở rộng (10 tỉnh/thành bổ sung) */
function batchCityExtended(seeds, seen, limit) {
  const cities = CITIES.slice(5);
  for (const { pillar, item } of allItems()) {
    for (const city of cities) {
      if (seeds.length >= limit) return;
      const keywordsMain = `${item.kw} ${city.kw}`;
      const slug = toSlug(`${item.slug || item.kw}-${city.slug}`);
      addSeed(seeds, seen, makeSeed({
        slug,
        keywordsMain,
        h1: `${item.h1} ${city.kw.charAt(0).toUpperCase() + city.kw.slice(1)}`,
        angle: `${item.angle} — thị trường ${city.name}`,
        niche: pillar.niche,
      }));
    }
  }
}

/** Lô 7: ngành mở rộng */
function batchIndustryExtended(seeds, seen, limit) {
  const industries = INDUSTRIES.slice(5);
  for (const { pillar, item } of allItems()) {
    for (const ind of industries) {
      if (seeds.length >= limit) return;
      const keywordsMain = `${item.kw} ngành ${ind.name}`;
      const slug = toSlug(`${item.slug || item.kw}-nganh-${ind.slug}`);
      addSeed(seeds, seen, makeSeed({
        slug,
        keywordsMain,
        h1: `${item.h1} Ngành ${ind.name.charAt(0).toUpperCase() + ind.name.slice(1)}`,
        angle: `${item.angle} — tối ưu cho ngành ${ind.name}`,
        niche: pillar.niche,
      }));
    }
  }
}

const EXTRAS = [
  { kw: "agency marketing", h1: "Agency Marketing", angle: "đối tác triển khai marketing trọn gói", niche: "strategy" },
  { kw: "outsourcing marketing", h1: "Outsourcing Marketing", angle: "thuê ngoài team marketing chuyên nghiệp", niche: "strategy" },
  { kw: "marketing 4.0", h1: "Marketing 4.0", angle: "marketing số tích hợp AI và automation", niche: "analytics" },
  { kw: "marketing ai", h1: "Marketing AI", angle: "ứng dụng AI tạo nội dung và tối ưu ads", niche: "analytics" },
  { kw: "chatbot marketing", h1: "Chatbot Marketing", angle: "tự động hóa tư vấn và thu lead 24/7", niche: "email" },
  { kw: "web push marketing", h1: "Web Push Marketing", angle: "thông báo đẩy giữ chân visitor website", niche: "email" },
  { kw: "referral marketing", h1: "Referral Marketing", angle: "giới thiệu bạn bè nhận ưu đãi", niche: "strategy" },
  { kw: "seasonal marketing", h1: "Seasonal Marketing", angle: "chiến dịch theo mùa và dịp lễ", niche: "strategy" },
  { kw: "localization marketing", h1: "Localization Marketing", angle: "marketing địa phương hóa nội dung", niche: "branding" },
  { kw: "export marketing", h1: "Export Marketing", angle: "quảng bá sản phẩm ra thị trường quốc tế", niche: "strategy" },
];

function batchExtras(seeds, seen, limit) {
  for (const ex of EXTRAS) {
    for (const aud of AUDIENCES) {
      if (seeds.length >= limit) return;
      const keywordsMain = `${ex.kw} ${aud.suffix}`;
      const slug = toSlug(`${ex.kw}-${aud.slug}`);
      addSeed(seeds, seen, makeSeed({
        slug,
        keywordsMain,
        h1: `${ex.h1} ${aud.suffix.charAt(0).toUpperCase() + aud.suffix.slice(1)}`,
        angle: `${ex.angle} — ${aud.suffix}`,
        niche: ex.niche,
      }));
    }
  }
}

function batchFillVariants(seeds, seen, limit) {
  let i = 0;
  const variants = ["hiệu quả", "chuyên nghiệp", "uy tín", "giá tốt", "trọn gói", "nhanh", "bền vững"];
  while (seeds.length < limit && i < 5000) {
    const pillar = PILLARS[i % PILLARS.length];
    const item = pillar.items[i % pillar.items.length];
    const variant = variants[Math.floor(i / PILLARS.length) % variants.length];
    const keywordsMain = `${item.kw} ${variant}`;
    const slug = toSlug(`${item.slug || item.kw}-${variant}-${i}`);
    addSeed(seeds, seen, makeSeed({
      slug,
      keywordsMain,
      h1: `${item.h1} ${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
      angle: `${item.angle} — giải pháp ${variant}`,
      niche: pillar.niche,
    }));
    i += 1;
  }
}

/** @returns {MarketingSeed[]} */
function generateMarketingSeeds() {
  const seeds = [];
  const seen = new Set();
  const limit = TARGET_MARKETING_COUNT;

  batchAudience(seeds, seen);
  batchCity(seeds, seen, limit);
  batchIndustry(seeds, seen, limit);
  batchGoals(seeds, seen, limit);
  batchHowTo(seeds, seen, limit);
  batchCityExtended(seeds, seen, limit);
  batchIndustryExtended(seeds, seen, limit);
  batchExtras(seeds, seen, limit);
  batchFillVariants(seeds, seen, limit);

  return seeds.slice(0, limit);
}

export const MARKETING_SEEDS = generateMarketingSeeds();

if (MARKETING_SEEDS.length !== TARGET_MARKETING_COUNT) {
  console.warn(`[SEO marketing] Mong đợi ${TARGET_MARKETING_COUNT} seed, thực tế: ${MARKETING_SEEDS.length}`);
}

const slugSet = new Set(MARKETING_SEEDS.map((s) => s.slug));
if (slugSet.size !== MARKETING_SEEDS.length) {
  console.warn(`[SEO marketing] Phát hiện slug trùng: ${MARKETING_SEEDS.length - slugSet.size}`);
}

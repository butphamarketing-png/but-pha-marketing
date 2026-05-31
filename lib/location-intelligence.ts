import { getIndustryChannelPlan, type IndustryProfile } from "./marketing-strategy-profiles";

export type MarketBreadth = "hep" | "vua" | "rong" | "rat-rong";

export type LocationMarketType =
  | "hyperlocal"
  | "local"
  | "district"
  | "city"
  | "regional"
  | "national";

export type TargetAudienceSegment = {
  segment: string;
  reason: string;
};

export type LocationAnalysis = {
  address: string;
  city: string | null;
  district: string | null;
  areaType: string;
  marketType: LocationMarketType;
  marketBreadth: MarketBreadth;
  breadthLabel: string;
  breadthScore: number;
  catchmentRange: string;
  populationContext: string;
  targetAudiences: TargetAudienceSegment[];
  mapsAdvice: string;
  adsGeoAdvice: string;
  contentAdvice: string;
  insights: string[];
  confidence: number;
};

const MAJOR_CITIES: { pattern: RegExp; label: string; tier: 1 | 2 }[] = [
  { pattern: /hồ\s*chí\s*minh|tp\.?\s*hcm|sài\s*gòn|saigon|ho chi minh/i, label: "TP. Hồ Chí Minh", tier: 1 },
  { pattern: /hà\s*nội|ha\s*noi|hn\b/i, label: "Hà Nội", tier: 1 },
  { pattern: /đà\s*nẵng|da\s*nang/i, label: "Đà Nẵng", tier: 1 },
  { pattern: /hải\s*phòng|hai\s*phong/i, label: "Hải Phòng", tier: 1 },
  { pattern: /cần\s*thơ|can\s*tho/i, label: "Cần Thơ", tier: 1 },
  { pattern: /bình\s*dương|binh\s*duong/i, label: "Bình Dương", tier: 2 },
  { pattern: /đồng\s*nai|dong\s*nai|biên\s*hòa|bien\s*hoa/i, label: "Đồng Nai", tier: 2 },
  { pattern: /khánh\s*hòa|khanh\s*hoa|nha\s*trang/i, label: "Khánh Hòa", tier: 2 },
  { pattern: /bà\s*rịa|vũng\s*tàu|vung\s*tau/i, label: "Bà Rịa - Vũng Tàu", tier: 2 },
  { pattern: /huế|hue|thừa\s*thiên/i, label: "Huế", tier: 2 },
  { pattern: /quảng\s*ninh|quang\s*ninh|hạ\s*long/i, label: "Quảng Ninh", tier: 2 },
  { pattern: /lâm\s*đồng|lam\s*dong|đà\s*lạt|da\s*lat/i, label: "Lâm Đồng", tier: 2 },
];

const INNER_DISTRICTS = [
  /quận\s*1\b|q\.?\s*1\b|quận\s*3\b|q\.?\s*3\b|quận\s*5\b|phố\s*cổ|hoàn\s*kiếm|ba\s*đình/i,
  /trung\s*tâm|khu\s*tài\s*chính|quận\s*4\b|bến\s*nghé/i,
];

const SUBURBAN_INDICATORS = [
  /thủ\s*đức|bình\s*chánh|hóc\s*môn|củ\s*chi|nhà\s*bè|quận\s*9\b|quận\s*12\b|quận\s*7\b|quận\s*8\b/i,
  /huyện|xã|thị\s*trấn|khu\s*công\s*nghiệp|kcn|kcx|đường\s*vành\s*đai|ngoại\s*thành/i,
];

const COMMERCIAL_HUBS = [
  /aeon|lotte|vincom|landmark|tòa\s*nhà|trung\s*tâm\s*thương\s*mại|tttm|plaza|tower|office/i,
];

function parseDistrict(address: string): string | null {
  const patterns = [
    /(?:quận|q\.?)\s*(\d{1,2}|[a-zà-ỹ\s]{2,20})/i,
    /(?:phường|p\.?)\s*(\d{1,3}|[a-zà-ỹ\s]{2,25})/i,
    /(?:huyện|thị\s*xã|thành\s*phố)\s*([a-zà-ỹ\s]{2,30})/i,
  ];
  for (const re of patterns) {
    const m = address.match(re);
    if (m) return m[0].trim();
  }
  return null;
}

function parseCity(address: string): { city: string | null; tier: 1 | 2 | 3 } {
  for (const c of MAJOR_CITIES) {
    if (c.pattern.test(address)) return { city: c.label, tier: c.tier };
  }
  const provinceMatch = address.match(/(?:tỉnh|tp\.?)\s*([a-zà-ỹ\s-]{3,30})/i);
  if (provinceMatch) return { city: provinceMatch[1].trim(), tier: 3 };
  return { city: null, tier: 3 };
}

function detectAreaType(address: string, cityTier: 1 | 2 | 3): string {
  if (COMMERCIAL_HUBS.some((r) => r.test(address))) return "Khu thương mại / văn phòng";
  if (INNER_DISTRICTS.some((r) => r.test(address))) return "Trung tâm / nội thành";
  if (SUBURBAN_INDICATORS.some((r) => r.test(address))) return "Ngoại thành / khu dân cư mở rộng";
  if (cityTier === 1) return "Đô thị lớn — khu vực hỗn hợp";
  if (cityTier === 2) return "Tỉnh / vùng ven đô thị";
  return "Địa phương / thị trường tỉnh";
}

function breadthFromInputs(
  address: string,
  scale: string,
  profileId: string,
  cityTier: 1 | 2 | 3,
  localBusiness: boolean,
): { marketType: LocationMarketType; breadth: MarketBreadth; score: number; catchment: string } {
  const isEcom = profileId === "ecommerce" || profileId === "fashion-retail" || profileId === "tech";
  const multiBranch = scale.includes("2–5") || scale.includes("2-5") || scale.includes("Trên 5");
  const isInner = INNER_DISTRICTS.some((r) => r.test(address));
  const isSuburban = SUBURBAN_INDICATORS.some((r) => r.test(address));

  if (isEcom && !localBusiness) {
    return { marketType: "national", breadth: "rat-rong", score: 92, catchment: "Toàn quốc (online)" };
  }

  if (multiBranch && scale.includes("Trên 5")) {
    return { marketType: "regional", breadth: "rat-rong", score: 85, catchment: "Đa tỉnh / toàn vùng" };
  }

  if (multiBranch) {
    return { marketType: "city", breadth: "rong", score: 78, catchment: cityTier === 1 ? "Cả thành phố" : "Toàn tỉnh + lân cận" };
  }

  if (!localBusiness) {
    return {
      marketType: cityTier === 1 ? "city" : "regional",
      breadth: cityTier === 1 ? "rong" : "vua",
      score: cityTier === 1 ? 72 : 58,
      catchment: cityTier === 1 ? "TP + online" : "Tỉnh + online",
    };
  }

  if (isInner && cityTier === 1) {
    return { marketType: "district", breadth: "vua", score: 55, catchment: "3–8 km (quận lân cận)" };
  }

  if (isSuburban || cityTier >= 2) {
    return { marketType: "local", breadth: "hep", score: 38, catchment: "2–5 km (khu vực gần)" };
  }

  if (cityTier === 1) {
    return { marketType: "local", breadth: "vua", score: 48, catchment: "3–7 km" };
  }

  return { marketType: "hyperlocal", breadth: "hep", score: 32, catchment: "1–4 km (thị trường hẹp)" };
}

const BREADTH_LABELS: Record<MarketBreadth, string> = {
  hep: "Thị trường hẹp — hyperlocal",
  vua: "Vừa phải — khu vực + quận",
  rong: "Rộng — cả thành phố / online",
  "rat-rong": "Rất rộng — đa tỉnh / toàn quốc",
};

function buildTargetAudiences(
  profile: IndustryProfile,
  areaType: string,
  city: string | null,
  businessGoal: string,
): TargetAudienceSegment[] {
  const segments: TargetAudienceSegment[] = [];
  const cityLabel = city ?? "khu vực bạn";
  const plan = getIndustryChannelPlan(profile.id);

  if (plan.localBusiness) {
    segments.push({
      segment: "Khách 'gần tôi' — bán kính 2–7 km",
      reason: `Người ở ${cityLabel}, tìm dịch vụ gần nhà/cơ quan trên Maps.`,
    });
    if (areaType.includes("Trung tâm") || areaType.includes("thương mại")) {
      segments.push({
        segment: "Dân văn phòng & khách lưu thông",
        reason: "Khu trung tâm — khách trong ngày, giờ cao điểm trưa/tối.",
      });
    } else if (areaType.includes("Ngoại thành") || areaType.includes("dân cư")) {
      segments.push({
        segment: "Hộ gia đình / cư dân khu vực",
        reason: "Ngoại thành — khách trung thành khu phố, qua giới thiệu & Maps.",
      });
    }
  }

  if (profile.id === "fnb") {
    segments.push({ segment: "Gen Z & nhóm bạn 18–35", reason: "Check-in, delivery trong bán kính 3–5 km." });
  }

  if (profile.id === "health-beauty" || profile.id === "pharmacy") {
    segments.push({ segment: "Phụ nữ 25–50, gia đình có con nhỏ", reason: "Tìm dịch vụ uy tín gần nhà — ưu tiên review Maps." });
  }

  if (profile.id === "construction" || profile.id === "automotive") {
    segments.push({ segment: "Chủ nhà / hộ kinh doanh trong vùng", reason: "Dịch vụ lắp đặt/sửa chữa — khách trong bán kính 5–15 km." });
  }

  if (profile.id === "ecommerce" || profile.id === "fashion-retail") {
    segments.push({ segment: "Người mua online toàn quốc", reason: "Địa chỉ kho/shop ít quan trọng — target theo interest & remarketing." });
  }

  if (profile.id === "realestate") {
    segments.push({ segment: `Nhà đầu tư & người mua tại ${cityLabel}`, reason: "BĐS gắn chặt phân khúc khu vực & hạ tầng quanh dự án." });
  }

  if (profile.id === "education") {
    segments.push({ segment: "Phụ huynh & học sinh trong bán kính 3–10 km", reason: "Trung tâm — phụ huynh chọn cơ sở gần, tiện đưa đón." });
  }

  if (businessGoal.includes("thương hiệu")) {
    segments.push({ segment: "Người theo dõi online (reach rộng hơn)", reason: "Xây thương hiệu — mở rộng ngoài bán kính walk-in." });
  }

  return segments.slice(0, 4);
}

function buildInsights(
  areaType: string,
  breadth: MarketBreadth,
  marketType: LocationMarketType,
  localBusiness: boolean,
  scale: string,
): string[] {
  const tips: string[] = [];

  if (breadth === "hep" || marketType === "hyperlocal") {
    tips.push("Thị trường hẹp → Maps + review là then chốt; ads geo 3–5 km, tránh target rộng gây lãng phí ngân sách.");
  } else if (breadth === "vua") {
    tips.push("Phạm vi vừa → Maps local + content theo quận; test ads 5–10 km, đo lead 2 tuần rồi mở rộn.");
  } else if (breadth === "rong") {
    tips.push("Thị trường rộng → chia campaign theo quận/vùng; đo CPL riêng từng khu trước khi scale.");
  } else {
    tips.push("Phạm vi rất rộng → website/TMĐT + ads interest; Maps chỉ cho từng chi nhánh vật lý.");
  }

  if (areaType.includes("Trung tâm")) {
    tips.push("Khu trung tâm — CPC cao hơn 20–40%, cần nổi bật USP & giờ mở cửa rõ trên Maps.");
  }
  if (areaType.includes("Ngoại thành")) {
    tips.push("Khu ngoại thành — cạnh tranh Maps thường thấp hơn nội thành 30–50%, dễ lên top 'gần tôi'.");
  }
  if (scale.includes("2")) {
    tips.push("Đa cơ sở — mỗi địa chỉ cần Maps riêng, tránh trùng tên/SĐT gây mất trust Google.");
  }

  if (localBusiness) {
    tips.push("Ngành local — 70%+ khách có thể đến từ 'gần tôi' + review ≥ 4.5★ trên Maps.");
  }

  return tips.slice(0, 3);
}

export function getCityTierFromAddress(address: string): 1 | 2 | 3 {
  return parseCity(address.trim()).tier;
}

export function analyzeBusinessLocation(
  address: string,
  scale: string,
  profile: IndustryProfile,
  businessGoal: string,
): LocationAnalysis | null {
  const trimmed = address.trim();
  if (trimmed.length < 5) return null;

  const { city, tier: cityTier } = parseCity(trimmed);
  const district = parseDistrict(trimmed);
  const plan = getIndustryChannelPlan(profile.id);
  const areaType = detectAreaType(trimmed, cityTier);
  const { marketType, breadth, score, catchment } = breadthFromInputs(
    trimmed,
    scale,
    profile.id,
    cityTier,
    plan.localBusiness,
  );

  let confidence = 45;
  if (city) confidence += 25;
  if (district) confidence += 15;
  if (trimmed.length > 20) confidence += 10;
  confidence = Math.min(95, confidence);

  const populationContext =
    cityTier === 1
      ? `${city ?? "Đô thị lớn"} — mật độ dân cao, cạnh tranh digital mạnh`
      : cityTier === 2
        ? `${city ?? "Tỉnh"} — thị trường đang tăng trưởng, CPC thường thấp hơn TP lớn`
        : "Thị trường tỉnh/huyện — local rất quan trọng, word-of-mouth mạnh";

  const mapsAdvice =
    marketType === "national" || marketType === "regional"
      ? "Maps cho từng cơ sở vật lý (nếu có); không target Maps toàn quốc một điểm."
      : breadth === "hep"
        ? "Google Maps bán kính 3–5 km — tối ưu từ khóa 'gần [quận/khu vực]' + ảnh cơ sở thật."
        : "Maps + Local Ads theo quận/huyện — mở rộng bán kính 5–15 km khi có data lead tốt.";

  const adsGeoAdvice =
    marketType === "national"
      ? "Facebook/Google: target interest + remarketing toàn quốc, không giới hạn geo."
      : marketType === "city"
        ? `Geo: ${city ?? "cả thành phố"} — chia ad set theo quận nếu ngân sách > 5tr/th.`
        : `Geo: bán kính quanh cơ sở (${catchment}) — test 2 tuần rồi scale.`;

  const contentAdvice =
    breadth === "hep" || breadth === "vua"
      ? "Content gắn địa danh cụ thể (quận, đường, landmark gần) — tăng trust local."
      : "Content đa khu vực / UGC — case study từng chi nhánh nếu chuỗi.";

  return {
    address: trimmed,
    city,
    district,
    areaType,
    marketType,
    marketBreadth: breadth,
    breadthLabel: BREADTH_LABELS[breadth],
    breadthScore: score,
    catchmentRange: catchment,
    populationContext,
    targetAudiences: buildTargetAudiences(profile, areaType, city, businessGoal),
    mapsAdvice,
    adsGeoAdvice,
    contentAdvice,
    insights: buildInsights(areaType, breadth, marketType, plan.localBusiness, scale),
    confidence,
  };
}

export function getMarketBreadthColor(breadth: MarketBreadth) {
  switch (breadth) {
    case "hep":
      return "text-sky-700 bg-sky-100";
    case "vua":
      return "text-violet-700 bg-violet-100";
    case "rong":
      return "text-amber-700 bg-amber-100";
    case "rat-rong":
      return "text-emerald-700 bg-emerald-100";
  }
}

import {
  normalizeIndustryQuery,
  type IndustrySuggestion,
  type IndustrySuggestionResult,
} from "@/lib/industry-suggestions-types";

/** Tên ngành thân thiện — dùng trên client, không cần file masothue */
export const CURATED_INDUSTRY_SUGGESTIONS: IndustrySuggestion[] = [
  { label: "Nha khoa", keywords: ["nha khoa", "dental", "implant", "nieng rang"], profileId: "health-beauty", group: "Y tế & Sức khỏe", curated: true },
  { label: "Phòng khám đa khoa", keywords: ["phong kham", "clinic", "kham benh"], profileId: "health-beauty", group: "Y tế & Sức khỏe", curated: true },
  { label: "Spa / Thẩm mỹ", keywords: ["spa", "tham my", "lam dep"], profileId: "health-beauty", group: "Y tế & Sức khỏe", curated: true },
  { label: "Thẩm mỹ viện", keywords: ["tham my vien", "phau thuat tham my"], profileId: "health-beauty", group: "Y tế & Sức khỏe", curated: true },
  { label: "Phòng khám da liễu", keywords: ["da lieu", "dermatology"], profileId: "health-beauty", group: "Y tế & Sức khỏe", curated: true },
  { label: "Nhà thuốc", keywords: ["nha thuoc", "pharmacy"], profileId: "pharmacy", group: "Y tế & Sức khỏe", curated: true },
  { label: "Nối mi / Nail", keywords: ["noi mi", "nail"], profileId: "health-beauty", group: "Y tế & Sức khỏe", curated: true },
  { label: "Barber / Cắt tóc nam", keywords: ["barber", "cat toc nam"], profileId: "health-beauty", group: "Y tế & Sức khỏe", curated: true },
  { label: "Salon tóc nữ", keywords: ["salon toc", "nhuom toc"], profileId: "health-beauty", group: "Y tế & Sức khỏe", curated: true },
  { label: "Nhà hàng", keywords: ["nha hang", "restaurant"], profileId: "fnb", group: "Ăn uống & Lưu trú", curated: true },
  { label: "Quán cafe", keywords: ["cafe", "ca phe", "coffee"], profileId: "fnb", group: "Ăn uống & Lưu trú", curated: true },
  { label: "Tiệm trà sữa", keywords: ["tra sua", "bubble tea"], profileId: "fnb", group: "Ăn uống & Lưu trú", curated: true },
  { label: "Khách sạn", keywords: ["khach san", "hotel"], profileId: "hotel", group: "Ăn uống & Lưu trú", curated: true },
  { label: "Homestay", keywords: ["homestay", "airbnb"], profileId: "hotel", group: "Ăn uống & Lưu trú", curated: true },
  { label: "Shop online / TMĐT", keywords: ["tmđt", "ecommerce", "shopee", "lazada"], profileId: "ecommerce", group: "Bán hàng & TMĐT", curated: true },
  { label: "Thời trang / Quần áo", keywords: ["thoi trang", "quan ao"], profileId: "fashion-retail", group: "Bán hàng & TMĐT", curated: true },
  { label: "Mỹ phẩm", keywords: ["my pham", "skincare", "cosmetic"], profileId: "fashion-retail", group: "Bán hàng & TMĐT", curated: true },
  { label: "Bất động sản", keywords: ["bat dong san", "bds", "nha dat"], profileId: "realestate", group: "BĐS & Xây dựng", curated: true },
  { label: "Công ty xây dựng", keywords: ["xay dung", "nha thau"], profileId: "construction", group: "BĐS & Xây dựng", curated: true },
  { label: "Thiết kế nội thất", keywords: ["noi that", "interior"], profileId: "construction", group: "BĐS & Xây dựng", curated: true },
  { label: "Lắp đặt thang máy", keywords: ["thang may", "elevator", "thang cuon", "43290"], profileId: "construction", group: "Xây dựng & lắp đặt", vsicCode: "43290", curated: true },
  { label: "Bảo trì thang máy", keywords: ["bao tri thang may", "sua thang may"], profileId: "construction", group: "Xây dựng & lắp đặt", vsicCode: "43290", curated: true },
  { label: "Lắp đặt điều hòa", keywords: ["dieu hoa", "may lanh", "43222"], profileId: "construction", group: "Xây dựng & lắp đặt", vsicCode: "43222", curated: true },
  { label: "Lắp đặt điện", keywords: ["lap dat dien", "43210"], profileId: "construction", group: "Xây dựng & lắp đặt", vsicCode: "43210", curated: true },
  { label: "Luật sư / Công ty luật", keywords: ["luat su", "law firm"], profileId: "professional-services", group: "Dịch vụ & B2B", curated: true },
  { label: "Kế toán / Kiểm toán", keywords: ["ke toan", "kiem toan"], profileId: "professional-services", group: "Dịch vụ & B2B", curated: true },
  { label: "Agency Marketing", keywords: ["agency", "marketing"], profileId: "tech", group: "Dịch vụ & B2B", curated: true },
  { label: "Trung tâm Anh ngữ", keywords: ["anh ngu", "ielts"], profileId: "education", group: "Giáo dục", curated: true },
  { label: "Mầm non", keywords: ["mam non", "nha tre"], profileId: "education", group: "Giáo dục", curated: true },
  { label: "Công ty du lịch", keywords: ["du lich", "tour"], profileId: "travel", group: "Du lịch & Giải trí", curated: true },
  { label: "Wedding planner", keywords: ["wedding", "tiec cuoi"], profileId: "events", group: "Du lịch & Giải trí", curated: true },
  { label: "Garage / Sửa xe", keywords: ["garage", "sua xe"], profileId: "automotive", group: "Ô tô & Vận tải", curated: true },
  { label: "Logistics / Giao hàng", keywords: ["logistics", "giao hang"], profileId: "logistics", group: "Ô tô & Vận tải", curated: true },
  { label: "Công ty phần mềm", keywords: ["phan mem", "software", "saas"], profileId: "tech", group: "Công nghệ", curated: true },
  { label: "Nông sản sạch", keywords: ["nong san", "rau sach"], profileId: "agriculture", group: "Nông nghiệp", curated: true },
  { label: "Gym / Yoga", keywords: ["gym", "yoga", "fitness"], profileId: "fitness", group: "Lifestyle", curated: true },
  { label: "Pet shop", keywords: ["pet shop", "thu cung"], profileId: "fashion-retail", group: "Lifestyle", curated: true },
];

function scoreSuggestion(suggestion: IndustrySuggestion, query: string): number {
  const q = normalizeIndustryQuery(query);
  if (!q) return 0;

  const label = normalizeIndustryQuery(suggestion.label);
  const keywords = suggestion.keywords.map(normalizeIndustryQuery);
  const code = suggestion.vsicCode ?? "";

  if (/^\d+$/.test(q) && code.startsWith(q)) return 98 + (suggestion.curated ? 2 : 0);
  if (code === q) return 100;
  if (label === q) return 100 + (suggestion.curated ? 5 : 0);
  if (keywords.includes(q)) return 95 + (suggestion.curated ? 3 : 0);
  if (label.startsWith(q)) return 85 + (suggestion.curated ? 3 : 0);
  if (keywords.some((k) => k.startsWith(q))) return 80;
  if (label.includes(q)) return 70 + (suggestion.curated ? 2 : 0);
  if (keywords.some((k) => k.includes(q))) return 65;
  if (keywords.some((k) => q.includes(k) && k.length >= 3)) return 55;

  const tokens = q.split(" ").filter((t) => t.length >= 2);
  if (tokens.length === 0) return 0;

  let tokenScore = 0;
  for (const token of tokens) {
    if (label.includes(token)) tokenScore += 25;
    if (keywords.some((k) => k.includes(token))) tokenScore += 20;
    if (code.includes(token)) tokenScore += 15;
  }
  return tokenScore + (suggestion.curated ? 5 : 0);
}

export function searchCuratedIndustrySuggestions(query: string, limit = 12): IndustrySuggestionResult[] {
  const q = query.trim();
  if (q.length < 1) return [];

  const scored = CURATED_INDUSTRY_SUGGESTIONS.map((suggestion) => ({
    ...suggestion,
    score: scoreSuggestion(suggestion, q),
  }))
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        (a.curated ? -1 : 1) - (b.curated ? -1 : 1) ||
        a.label.localeCompare(b.label, "vi"),
    );

  const seen = new Set<string>();
  const unique: IndustrySuggestionResult[] = [];
  for (const item of scored) {
    const key = item.vsicCode ? `${item.vsicCode}|${item.label}` : item.label;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
    if (unique.length >= limit) break;
  }
  return unique;
}

export function findCuratedIndustrySuggestion(text: string): IndustrySuggestion | null {
  const q = normalizeIndustryQuery(text);
  if (!q) return null;

  const exact = CURATED_INDUSTRY_SUGGESTIONS.find(
    (s) =>
      normalizeIndustryQuery(s.label) === q ||
      s.keywords.some((k) => normalizeIndustryQuery(k) === q) ||
      (s.vsicCode && s.vsicCode === text.trim()),
  );
  if (exact) return exact;

  return searchCuratedIndustrySuggestions(text, 1)[0] ?? null;
}

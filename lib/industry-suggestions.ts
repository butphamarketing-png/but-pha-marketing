/**
 * Gợi ý ngành nghề — autocomplete form chiến lược marketing
 * Mỗi mục map về profileId trong marketing-strategy-profiles.ts
 */

export type IndustrySuggestion = {
  label: string;
  keywords: string[];
  profileId: string;
  group: string;
};

function normalize(text: string) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/\s+/g, " ");
}

export const INDUSTRY_SUGGESTIONS: IndustrySuggestion[] = [
  // Y tế & Sức khỏe
  { label: "Nha khoa", keywords: ["nha khoa", "dental", "implant", "nieng rang", "rang su"], profileId: "health-beauty", group: "Y tế & Sức khỏe" },
  { label: "Phòng khám đa khoa", keywords: ["phong kham", "clinic", "bac si", "kham benh"], profileId: "health-beauty", group: "Y tế & Sức khỏe" },
  { label: "Spa / Thẩm mỹ", keywords: ["spa", "tham my", "lam dep", "tri mun", "facial"], profileId: "health-beauty", group: "Y tế & Sức khỏe" },
  { label: "Thẩm mỹ viện", keywords: ["tham my vien", "phau thuat tham my", "cat mat", "nang nguc"], profileId: "health-beauty", group: "Y tế & Sức khỏe" },
  { label: "Phòng khám da liễu", keywords: ["da lieu", "dermatology", "tri nam", "laser"], profileId: "health-beauty", group: "Y tế & Sức khỏe" },
  { label: "Phòng khám mắt", keywords: ["mat", "eye clinic", "can thi", "kinh ap trong"], profileId: "health-beauty", group: "Y tế & Sức khỏe" },
  { label: "Vật lý trị liệu", keywords: ["vat ly tri lieu", "physio", "tri lieu", "phuc hoi chuc nang"], profileId: "health-beauty", group: "Y tế & Sức khỏe" },
  { label: "Nhà thuốc", keywords: ["nha thuoc", "pharmacy", "duoc pham", "thuoc"], profileId: "pharmacy", group: "Y tế & Sức khỏe" },
  { label: "Hiệu thuốc Đông y", keywords: ["dong y", "thuoc bac", "y hoc co truyen"], profileId: "pharmacy", group: "Y tế & Sức khỏe" },
  { label: "Phòng khám thú y", keywords: ["thu y", "pet clinic", "bac si thu y"], profileId: "health-beauty", group: "Y tế & Sức khỏe" },
  { label: "Nối mi / Nail", keywords: ["noi mi", "nail", "lam nail", "mi"], profileId: "health-beauty", group: "Y tế & Sức khỏe" },
  { label: "Barber / Cắt tóc nam", keywords: ["barber", "cat toc nam", "salon nam"], profileId: "health-beauty", group: "Y tế & Sức khỏe" },
  { label: "Salon tóc nữ", keywords: ["salon toc", "nhuom toc", "uon toc", "toc"], profileId: "health-beauty", group: "Y tế & Sức khỏe" },
  { label: "Massage / Trị liệu", keywords: ["massage", "body massage", "foot massage"], profileId: "health-beauty", group: "Y tế & Sức khỏe" },

  // Ăn uống & Lưu trú
  { label: "Nhà hàng", keywords: ["nha hang", "restaurant", "com", "mon viet"], profileId: "fnb", group: "Ăn uống & Lưu trú" },
  { label: "Quán cafe", keywords: ["cafe", "ca phe", "coffee", "quan ca phe"], profileId: "fnb", group: "Ăn uống & Lưu trú" },
  { label: "Quán ăn / Cơm", keywords: ["quan an", "com binh dan", "bun pho"], profileId: "fnb", group: "Ăn uống & Lưu trú" },
  { label: "Tiệm trà sữa", keywords: ["tra sua", "bubble tea", "milk tea"], profileId: "fnb", group: "Ăn uống & Lưu trú" },
  { label: "Bánh ngọt / Bakery", keywords: ["banh ngot", "bakery", "banh kem", "tiramisu"], profileId: "fnb", group: "Ăn uống & Lưu trú" },
  { label: "Quán nhậu / Bar", keywords: ["quan nhau", "bar", "pub", "bia"], profileId: "fnb", group: "Ăn uống & Lưu trú" },
  { label: "Buffet / Lẩu", keywords: ["buffet", "lau", "nuong", "bbq"], profileId: "fnb", group: "Ăn uống & Lưu trú" },
  { label: "Catering / Tiệc", keywords: ["catering", "tiec cong ty", "tiep khach"], profileId: "fnb", group: "Ăn uống & Lưu trú" },
  { label: "Food truck / Ăn vặt", keywords: ["food truck", "an vat", "banh mi", "xien nuong"], profileId: "fnb", group: "Ăn uống & Lưu trú" },
  { label: "Khách sạn", keywords: ["khach san", "hotel"], profileId: "hotel", group: "Ăn uống & Lưu trú" },
  { label: "Homestay / Airbnb", keywords: ["homestay", "airbnb", "phong tro du lich"], profileId: "hotel", group: "Ăn uống & Lưu trú" },
  { label: "Resort / Villa", keywords: ["resort", "villa", "nghi duong"], profileId: "hotel", group: "Ăn uống & Lưu trú" },
  { label: "Karaoke", keywords: ["karaoke", "phong hat"], profileId: "fnb", group: "Ăn uống & Lưu trú" },

  // Bán hàng & TMĐT
  { label: "Shop online / TMĐT", keywords: ["tmđt", "ecommerce", "shop online", "ban hang online", "shopee", "lazada", "tiktok shop"], profileId: "ecommerce", group: "Bán hàng & TMĐT" },
  { label: "Thời trang / Quần áo", keywords: ["thoi trang", "quan ao", "boutique", "thoi trang nu"], profileId: "fashion-retail", group: "Bán hàng & TMĐT" },
  { label: "Mỹ phẩm / Skincare", keywords: ["my pham", "skincare", "cosmetic", "makeup"], profileId: "fashion-retail", group: "Bán hàng & TMĐT" },
  { label: "Giày dép / Túi xách", keywords: ["giay dep", "tui xach", "handbag"], profileId: "fashion-retail", group: "Bán hàng & TMĐT" },
  { label: "Trang sức / Vàng bạc", keywords: ["trang suc", "vang bac", "jewelry", "titan"], profileId: "fashion-retail", group: "Bán hàng & TMĐT" },
  { label: "Điện thoại / Phụ kiện", keywords: ["dien thoai", "phu kien", "phone shop", "mobile"], profileId: "ecommerce", group: "Bán hàng & TMĐT" },
  { label: "Đồ gia dụng", keywords: ["do gia dung", "noi that gia dung", "may giat"], profileId: "ecommerce", group: "Bán hàng & TMĐT" },
  { label: "Siêu thị mini / Tạp hóa", keywords: ["sieu thi mini", "tap hoa", "cua hang tien loi"], profileId: "ecommerce", group: "Bán hàng & TMĐT" },
  { label: "Livestream bán hàng", keywords: ["livestream", "ban hang live", "stream ban hang"], profileId: "ecommerce", group: "Bán hàng & TMĐT" },
  { label: "Nội thất bán lẻ", keywords: ["noi that ban le", "cua hang noi that", "decor shop"], profileId: "construction", group: "Bán hàng & TMĐT" },

  // Bất động sản & Xây dựng
  { label: "Bất động sản / Môi giới", keywords: ["bat dong san", "bds", "nha dat", "mo gioi"], profileId: "realestate", group: "BĐS & Xây dựng" },
  { label: "Sàn giao dịch BĐS", keywords: ["san bds", "real estate agency"], profileId: "realestate", group: "BĐS & Xây dựng" },
  { label: "Công ty xây dựng", keywords: ["xay dung", "nha thau", "thi cong"], profileId: "construction", group: "BĐS & Xây dựng" },
  { label: "Thiết kế nội thất", keywords: ["thiet ke noi that", "noi that", "interior"], profileId: "construction", group: "BĐS & Xây dựng" },
  { label: "Kiến trúc / Xưởng mộc", keywords: ["kien truc", "xuong moc", "architect"], profileId: "construction", group: "BĐS & Xây dựng" },
  { label: "Sơn sửa / Renovation", keywords: ["son sua", "renovation", "cai tao nha"], profileId: "construction", group: "BĐS & Xây dựng" },
  { label: "Điện nước / HVAC", keywords: ["dien nuoc", "hvac", "dieu hoa", "lap dat dien"], profileId: "construction", group: "BĐS & Xây dựng" },
  { label: "Vệ sinh công nghiệp", keywords: ["ve sinh cong nghiep", "don dep cong trinh"], profileId: "professional-services", group: "BĐS & Xây dựng" },

  // Dịch vụ chuyên môn & B2B
  { label: "Luật sư / Công ty luật", keywords: ["luat su", "cong ty luat", "law firm"], profileId: "professional-services", group: "Dịch vụ & B2B" },
  { label: "Kế toán / Kiểm toán", keywords: ["ke toan", "kiem toan", "accounting"], profileId: "professional-services", group: "Dịch vụ & B2B" },
  { label: "Đại lý thuế", keywords: ["dai ly thue", "thue", "tax"], profileId: "professional-services", group: "Dịch vụ & B2B" },
  { label: "Tư vấn doanh nghiệp", keywords: ["tu van doanh nghiep", "consulting", "business consultant"], profileId: "professional-services", group: "Dịch vụ & B2B" },
  { label: "Tuyển dụng / HR", keywords: ["tuyen dung", "hr", "headhunt", "nhan su"], profileId: "professional-services", group: "Dịch vụ & B2B" },
  { label: "Bảo hiểm / Tài chính", keywords: ["bao hiem", "tai chinh", "finance", "cho vay"], profileId: "professional-services", group: "Dịch vụ & B2B" },
  { label: "Agency Marketing", keywords: ["agency", "marketing agency", "quang cao"], profileId: "tech", group: "Dịch vụ & B2B" },
  { label: "In ấn / Thiết kế", keywords: ["in an", "thiet ke do hoa", "print", "branding"], profileId: "professional-services", group: "Dịch vụ & B2B" },
  { label: "An ninh / Camera", keywords: ["an ninh", "camera", "bao ve", "security"], profileId: "professional-services", group: "Dịch vụ & B2B" },
  { label: "Dịch vụ vệ sinh nhà", keywords: ["ve sinh nha", "don dep nha", "cleaning"], profileId: "professional-services", group: "Dịch vụ & B2B" },
  { label: "Giặt là / Ủi đồ", keywords: ["giat la", "ui do", "laundry"], profileId: "professional-services", group: "Dịch vụ & B2B" },

  // Giáo dục & Đào tạo
  { label: "Trung tâm Anh ngữ", keywords: ["anh ngu", "english center", "ielts", "toeic"], profileId: "education", group: "Giáo dục & Đào tạo" },
  { label: "Trung tâm tin học", keywords: ["tin hoc", "it training", "lap trinh"], profileId: "education", group: "Giáo dục & Đào tạo" },
  { label: "Mầm non / Kindergarten", keywords: ["mam non", "kindergarten", "nha tre", "mau giao"], profileId: "education", group: "Giáo dục & Đào tạo" },
  { label: "Trung tâm nghề / Dạy nghề", keywords: ["day nghe", "trung tam nghe", "vocational"], profileId: "education", group: "Giáo dục & Đào tạo" },
  { label: "Luyện thi / Gia sư", keywords: ["luyen thi", "gia su", "day kem", "on thi"], profileId: "education", group: "Giáo dục & Đào tạo" },
  { label: "Dạy nhạc / Piano", keywords: ["day nhac", "piano", "guitar", "am nhac"], profileId: "education", group: "Giáo dục & Đào tạo" },
  { label: "Trung tâm lái xe", keywords: ["day lai", "hoc lai xe", "trung tam lai xe"], profileId: "education", group: "Giáo dục & Đào tạo" },
  { label: "Đào tạo doanh nghiệp", keywords: ["dao tao doanh nghiep", "corporate training", "soft skill"], profileId: "education", group: "Giáo dục & Đào tạo" },

  // Du lịch & Giải trí
  { label: "Công ty du lịch", keywords: ["du lich", "tour", "travel agency"], profileId: "travel", group: "Du lịch & Giải trí" },
  { label: "Tour trong nước", keywords: ["tour trong nuoc", "tour vietnam"], profileId: "travel", group: "Du lịch & Giải trí" },
  { label: "Visa / Vé máy bay", keywords: ["visa", "ve may bay", "ticket", "booking"], profileId: "travel", group: "Du lịch & Giải trí" },
  { label: "Wedding planner", keywords: ["wedding planner", "tiec cuoi", "dam cuoi"], profileId: "events", group: "Du lịch & Giải trí" },
  { label: "Studio ảnh cưới", keywords: ["studio anh cuoi", "chup anh cuoi", "wedding photo"], profileId: "events", group: "Du lịch & Giải trí" },
  { label: "Quay phóng sự / Video", keywords: ["quay phong su", "videographer", "quay film"], profileId: "events", group: "Du lịch & Giải trí" },
  { label: "Trang trí sự kiện", keywords: ["trang tri su kien", "event decor", "trang tri tiệc"], profileId: "events", group: "Du lịch & Giải trí" },
  { label: "Tổ chức sự kiện", keywords: ["to chuc su kien", "event", "hoi nghi"], profileId: "events", group: "Du lịch & Giải trí" },
  { label: "Phòng game / Esports", keywords: ["phong game", "esports", "cyber game"], profileId: "events", group: "Du lịch & Giải trí" },

  // Ô tô & Vận tải
  { label: "Garage / Sửa xe", keywords: ["garage", "sua xe", "workshop xe", "bao duong xe"], profileId: "automotive", group: "Ô tô & Vận tải" },
  { label: "Rửa xe / Detailing", keywords: ["rua xe", "detailing", "car wash", "phu ceramic"], profileId: "automotive", group: "Ô tô & Vận tải" },
  { label: "Đại lý ô tô", keywords: ["dai ly o to", "showroom xe", "ban xe"], profileId: "automotive", group: "Ô tô & Vận tải" },
  { label: "Cho thuê xe", keywords: ["cho thue xe", "car rental", "thue xe tu lai"], profileId: "automotive", group: "Ô tô & Vận tải" },
  { label: "Giao hàng / Shipper", keywords: ["giao hang", "shipper", "ship nhanh"], profileId: "logistics", group: "Ô tô & Vận tải" },
  { label: "Logistics / Kho vận", keywords: ["logistics", "kho van", "freight", "fulfillment"], profileId: "logistics", group: "Ô tô & Vận tải" },
  { label: "Chuyển phát nhanh", keywords: ["chuyen phat nhanh", "courier", "express"], profileId: "logistics", group: "Ô tô & Vận tải" },

  // Công nghệ
  { label: "Công ty phần mềm", keywords: ["phan mem", "software", "saas", "app"], profileId: "tech", group: "Công nghệ" },
  { label: "Thiết kế website / App", keywords: ["thiet ke website", "thiet ke app", "web design"], profileId: "tech", group: "Công nghệ" },
  { label: "Sửa điện thoại / Laptop", keywords: ["sua dien thoai", "sua laptop", "repair phone"], profileId: "tech", group: "Công nghệ" },
  { label: "IT outsource / Helpdesk", keywords: ["it outsource", "helpdesk", "trien khai he thong"], profileId: "tech", group: "Công nghệ" },
  { label: "Startup / SaaS", keywords: ["startup", "saas", "cong nghe"], profileId: "tech", group: "Công nghệ" },
  { label: "Digital / Social media", keywords: ["digital", "social media", "content creator"], profileId: "tech", group: "Công nghệ" },

  // Nông nghiệp & Thực phẩm
  { label: "Nông sản sạch", keywords: ["nong san sach", "rau sach", "organic"], profileId: "agriculture", group: "Nông nghiệp & Thực phẩm" },
  { label: "Trang trại / Farm", keywords: ["trang trai", "farm", "chan nuoi"], profileId: "agriculture", group: "Nông nghiệp & Thực phẩm" },
  { label: "Thủy sản / Hải sản", keywords: ["thuy san", "hai san", "ca tom"], profileId: "agriculture", group: "Nông nghiệp & Thực phẩm" },
  { label: "Đặc sản vùng miền", keywords: ["dac san", "vung mien", "dac san que huong"], profileId: "agriculture", group: "Nông nghiệp & Thực phẩm" },
  { label: "Chế biến thực phẩm", keywords: ["che bien thuc pham", "do an dong goi", "food processing"], profileId: "agriculture", group: "Nông nghiệp & Thực phẩm" },

  // Lifestyle & Fitness
  { label: "Gym / Phòng tập", keywords: ["gym", "phong tap", "fitness center"], profileId: "fitness", group: "Lifestyle & Fitness" },
  { label: "Yoga / Pilates", keywords: ["yoga", "pilates", "stretching"], profileId: "fitness", group: "Lifestyle & Fitness" },
  { label: "Võ thuật / MMA", keywords: ["vo thuat", "mma", "boxing", "karate"], profileId: "fitness", group: "Lifestyle & Fitness" },
  { label: "PT cá nhân / Coach", keywords: ["pt ca nhan", "personal trainer", "coach"], profileId: "fitness", group: "Lifestyle & Fitness" },
  { label: "Pet shop / Thú cưng", keywords: ["pet shop", "thu cung", "cho meo", "pet food"], profileId: "fashion-retail", group: "Lifestyle & Fitness" },
  { label: "Huấn luyện thú cưng", keywords: ["huan luyen cho", "pet training", "dog training"], profileId: "fitness", group: "Lifestyle & Fitness" },
  { label: "Coworking / Văn phòng", keywords: ["coworking", "van phong chia se", "shared office"], profileId: "professional-services", group: "Lifestyle & Fitness" },
  { label: "Năng lượng mặt trời", keywords: ["nang luong mat troi", "solar", "dien mat troi"], profileId: "construction", group: "Lifestyle & Fitness" },
];

export type IndustrySuggestionResult = IndustrySuggestion & { score: number };

function scoreSuggestion(suggestion: IndustrySuggestion, query: string): number {
  const q = normalize(query);
  if (!q) return 0;

  const label = normalize(suggestion.label);
  const keywords = suggestion.keywords.map(normalize);

  if (label === q) return 100;
  if (keywords.includes(q)) return 95;
  if (label.startsWith(q)) return 85;
  if (keywords.some((k) => k.startsWith(q))) return 80;
  if (label.includes(q)) return 70;
  if (keywords.some((k) => k.includes(q))) return 65;
  if (keywords.some((k) => q.includes(k) && k.length >= 3)) return 55;

  const tokens = q.split(" ").filter((t) => t.length >= 2);
  if (tokens.length === 0) return 0;

  let tokenScore = 0;
  for (const token of tokens) {
    if (label.includes(token)) tokenScore += 25;
    if (keywords.some((k) => k.includes(token))) tokenScore += 20;
  }
  return tokenScore;
}

export function searchIndustrySuggestions(query: string, limit = 10): IndustrySuggestionResult[] {
  const q = query.trim();
  if (q.length < 1) return [];

  const scored = INDUSTRY_SUGGESTIONS.map((suggestion) => ({
    ...suggestion,
    score: scoreSuggestion(suggestion, q),
  }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label, "vi"));

  const seen = new Set<string>();
  const unique: IndustrySuggestionResult[] = [];
  for (const item of scored) {
    if (seen.has(item.label)) continue;
    seen.add(item.label);
    unique.push(item);
    if (unique.length >= limit) break;
  }
  return unique;
}

export function findIndustrySuggestion(text: string): IndustrySuggestion | null {
  const q = normalize(text);
  if (!q) return null;

  const exact = INDUSTRY_SUGGESTIONS.find(
    (s) => normalize(s.label) === q || s.keywords.some((k) => normalize(k) === q),
  );
  if (exact) return exact;

  const results = searchIndustrySuggestions(text, 1);
  return results[0] ?? null;
}

export function getIndustrySuggestionCount() {
  return INDUSTRY_SUGGESTIONS.length;
}

export function getIndustrySuggestionGroups() {
  const groups = new Map<string, number>();
  for (const item of INDUSTRY_SUGGESTIONS) {
    groups.set(item.group, (groups.get(item.group) ?? 0) + 1);
  }
  return [...groups.entries()].map(([label, count]) => ({ label, count }));
}

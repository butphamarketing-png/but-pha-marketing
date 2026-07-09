/**
 * Alt từ khóa mockup theo ngành — mỗi ảnh 1 alt.
 * Index 0 = thumbnail bài money; index 1..n = ảnh nội dung tin tức (không trùng thumbnail).
 */
export const INDUSTRY_MOCKUP_ALTS = {
  "nha-khoa": [
    "Thiết kế website nha khoa",
    "Thiết kế website nha khoa hiện đại",
    "Website phòng khám nha khoa chuyên nghiệp",
    "Giao diện đặt lịch khám nha khoa online",
    "Mẫu thiết kế website nha khoa chuẩn SEO",
  ],
  "tham-my": [
    "Thiết kế website thẩm mỹ viện",
    "Thiết kế website spa làm đẹp",
    "Website thẩm mỹ viện cao cấp",
    "Giao diện website spa chuyên nghiệp",
    "Mẫu thiết kế website thẩm mỹ đẹp",
  ],
  "phong-kham": [
    "Thiết kế website phòng khám",
    "Thiết kế website phòng khám đa khoa",
    "Website phòng khám chuyên nghiệp",
    "Giao diện đặt lịch khám bệnh online",
    "Mẫu thiết kế website phòng khám chuẩn SEO",
  ],
  pccc: [
    "Thiết kế website công ty PCCC",
    "Thiết kế website phòng cháy chữa cháy",
    "Website công ty PCCC chuyên nghiệp",
    "Giao diện website thiết bị PCCC",
    "Mẫu thiết kế website PCCC chuẩn SEO",
  ],
  "my-pham": [
    "Thiết kế website mỹ phẩm",
    "Thiết kế website cửa hàng mỹ phẩm",
    "Website mỹ phẩm làm đẹp chuyên nghiệp",
    "Giao diện website bán mỹ phẩm online",
    "Mẫu thiết kế website mỹ phẩm đẹp",
  ],
  luat: [
    "Thiết kế website công ty luật",
    "Thiết kế website văn phòng luật sư",
    "Website công ty luật chuyên nghiệp",
    "Giao diện website tư vấn pháp lý",
    "Mẫu thiết kế website luật chuẩn SEO",
  ],
  "thang-may": [
    "Thiết kế website công ty thang máy",
    "Thiết kế website thang máy cao cấp",
    "Website lắp đặt thang máy chuyên nghiệp",
    "Giao diện website bảo trì thang máy",
    "Mẫu thiết kế website thang máy chuẩn SEO",
  ],
  logistics: [
    "Thiết kế website vận tải logistics",
    "Thiết kế website công ty vận chuyển",
    "Website logistics chuyên nghiệp",
    "Giao diện website giao nhận hàng hóa",
    "Mẫu thiết kế website vận tải chuẩn SEO",
  ],
  "co-khi": [
    "Thiết kế website cơ khí",
    "Thiết kế website gia công cơ khí",
    "Website công ty cơ khí chuyên nghiệp",
    "Giao diện website gia công CNC",
    "Mẫu thiết kế website cơ khí chuẩn SEO",
  ],
  "bao-bi": [
    "Thiết kế website in ấn bao bì",
    "Thiết kế website công ty in ấn",
    "Website bao bì chuyên nghiệp",
    "Giao diện website in offset digital",
    "Mẫu thiết kế website in ấn chuẩn SEO",
  ],
  "tu-dong-hoa": [
    "Thiết kế website tự động hóa",
    "Thiết kế website PLC SCADA",
    "Website công ty tự động hóa chuyên nghiệp",
    "Giao diện website giải pháp nhà máy",
    "Mẫu thiết kế website tự động hóa chuẩn SEO",
  ],
} as const satisfies Record<string, readonly string[]>;

export type IndustryMockupPoolKey = keyof typeof INDUSTRY_MOCKUP_ALTS;

/** Alt cho ảnh nội dung bài (bỏ alt thumbnail ở index 0). */
export function getIndustryMockupContentAlt(pool: IndustryMockupPoolKey, index: number): string {
  const alts = INDUSTRY_MOCKUP_ALTS[pool];
  const contentAlts = alts.slice(1);
  return contentAlts[index % contentAlts.length] ?? alts[0] ?? "Thiết kế website";
}

/** Alt thumbnail — luôn là từ khóa chính (index 0). */
export function getIndustryMockupThumbnailAlt(pool: IndustryMockupPoolKey): string {
  return INDUSTRY_MOCKUP_ALTS[pool][0] ?? "Thiết kế website";
}

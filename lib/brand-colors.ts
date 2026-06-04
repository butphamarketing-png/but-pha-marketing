/** Deep Indigo + Royal Purple + White */
export const BRAND = {
  main: "#312E81",
  accent: "#7C3AED",
  background: "#F4F6FC",
  mainRgb: "49, 46, 129",
  accentRgb: "124, 58, 237",
} as const;

export const BRAND_GRADIENT = `linear-gradient(135deg, ${BRAND.main} 0%, ${BRAND.accent} 100%)`;

/** Màu nhấn theo từng nền tảng — đồng bộ với thương hiệu Indigo/Violet */
export const PLATFORM_COLORS = {
  website: "#4F46E5",
  facebook: "#1877F2",
  googleMaps: "#EA580C",
} as const;

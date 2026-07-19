/** So deep = ink sâu + tím — không amber/gold loè */
export const DEEP = {
  ink: "#08090c",
  inkSoft: "#0e1018",
  inkViolet: "#0a0912",
  /** Legacy alias — dùng violet, không gold */
  amber: "#8B7CF6",
  amberSoft: "#c4b5fd",
  violet: "#8B7CF6",
  violetDeep: "#6D5CE6",
  violetMuted: "rgba(139, 124, 246, 0.7)",
} as const;

/** Nền có chiều sâu: navy-ink — không solid black */
export const DEEP_BASE =
  "linear-gradient(165deg, #12141c 0%, #0e1018 28%, #08090c 58%, #0a0914 100%)";

/** Glow nhẹ tím — không amber pulse */
export const DEEP_ATMOSPHERE =
  "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(109,90,230,0.10), transparent 58%), radial-gradient(ellipse 40% 35% at 90% 15%, rgba(139,124,246,0.07), transparent 55%), radial-gradient(ellipse 35% 30% at 10% 50%, rgba(109,90,230,0.05), transparent 50%)";

export const DEEP_NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")";

/** Sans — không Cormorant trên trang con deep */
export const deepSerif = { fontFamily: '"Be Vietnam Pro", "Plus Jakarta Sans", system-ui, sans-serif' } as const;

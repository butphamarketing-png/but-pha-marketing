/** So deep = ink sâu + amber + tím — KHÔNG full đen phẳng */
export const DEEP = {
  ink: "#08090c",
  inkSoft: "#0e1018",
  inkViolet: "#0a0912",
  amber: "#C4955A",
  amberSoft: "#e8c99a",
  violet: "#8B7CF6",
  violetDeep: "#6D5AE6",
  violetMuted: "rgba(139, 124, 246, 0.7)",
} as const;

/** Nền có chiều sâu: navy-ink trên, violet-ink dưới — không solid black */
export const DEEP_BASE =
  "linear-gradient(165deg, #12141c 0%, #0e1018 28%, #08090c 58%, #0a0914 100%)";

/** Glow: amber giữa + tím hai góc */
export const DEEP_ATMOSPHERE =
  "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(196,149,90,0.22), transparent 58%), radial-gradient(ellipse 50% 45% at 92% 12%, rgba(139,124,246,0.18), transparent 55%), radial-gradient(ellipse 45% 40% at 8% 55%, rgba(109,90,230,0.12), transparent 50%), radial-gradient(ellipse 70% 40% at 50% 100%, rgba(139,124,246,0.06), transparent 60%)";

export const DEEP_NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")";

export const deepSerif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

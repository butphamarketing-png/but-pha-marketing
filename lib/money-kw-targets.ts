/** 5 money KW Phase 3 — 1 URL đích chính / intent (tránh cannibalization). */

export type MoneyKwTarget = {
  id: string;
  keyword: string;
  primaryPath: string;
  primaryLabel: string;
  secondaryPath: string;
  secondaryLabel: string;
  benchmark: string;
};

export const MONEY_KW_TARGETS: MoneyKwTarget[] = [
  {
    id: "thiet-ke-website",
    keyword: "thiết kế website",
    primaryPath: "/website",
    primaryLabel: "Dịch vụ thiết kế website",
    secondaryPath: "/blog/thiet-ke-website",
    secondaryLabel: "Pillar hướng dẫn",
    benchmark: "Mona / Cánh Cam",
  },
  {
    id: "bao-gia",
    keyword: "báo giá thiết kế website",
    primaryPath: "/banggia",
    primaryLabel: "Báo giá thiết kế website",
    secondaryPath: "/blog/bao-gia-thiet-ke-website",
    secondaryLabel: "Blog báo giá chi tiết",
    benchmark: "Mona / Cánh Cam",
  },
  {
    id: "tphcm",
    keyword: "thiết kế website tphcm",
    primaryPath: "/website",
    primaryLabel: "Thiết kế website (Money Page)",
    secondaryPath: "/blog/chu-de/website",
    secondaryLabel: "Hub chủ đề Website",
    benchmark: "Mona HCM / Cánh Cam",
  },
  {
    id: "spa",
    keyword: "thiết kế website spa",
    primaryPath: "/website",
    primaryLabel: "Thiết kế website (Money Page)",
    secondaryPath: "/website/nganh/spa",
    secondaryLabel: "Landing ngành spa",
    benchmark: "Vertical agencies",
  },
  {
    id: "nha-khoa",
    keyword: "thiết kế website nha khoa",
    primaryPath: "/website",
    primaryLabel: "Thiết kế website (Money Page)",
    secondaryPath: "/website/nganh/nha-khoa",
    secondaryLabel: "Landing ngành nha khoa",
    benchmark: "Vertical + local",
  },
];

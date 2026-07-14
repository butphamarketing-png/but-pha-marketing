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
    benchmark: "Mona / WebsiteViet",
  },
  {
    id: "bao-gia",
    keyword: "báo giá thiết kế website",
    primaryPath: "/banggia",
    primaryLabel: "Bảng giá & báo giá",
    secondaryPath: "/blog/bao-gia-thiet-ke-website",
    secondaryLabel: "Blog báo giá chi tiết",
    benchmark: "Expro / K-Tech",
  },
  {
    id: "tphcm",
    keyword: "thiết kế website tphcm",
    primaryPath: "/seo-website/dia-phuong/ho-chi-minh",
    primaryLabel: "SEO / website TP.HCM",
    secondaryPath: "/seo-website/dia-phuong/quan-1",
    secondaryLabel: "Quận 1 (local)",
    benchmark: "Mona HCM / Cánh Cam",
  },
  {
    id: "spa",
    keyword: "thiết kế website spa",
    primaryPath: "/website/nganh/spa",
    primaryLabel: "Landing website spa",
    secondaryPath: "/blog/thiet-ke-website-spa",
    secondaryLabel: "Hướng dẫn spa",
    benchmark: "Vertical agencies",
  },
  {
    id: "nha-khoa",
    keyword: "thiết kế website nha khoa",
    primaryPath: "/website/nganh/nha-khoa",
    primaryLabel: "Landing website nha khoa",
    secondaryPath: "/blog/thiet-ke-website-nha-khoa",
    secondaryLabel: "Hướng dẫn nha khoa",
    benchmark: "Vertical + local",
  },
];

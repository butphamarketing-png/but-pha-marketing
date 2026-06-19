export type SiteNavLink = {
  label: string;
  href: string;
};

export type SiteNavGroup = {
  label: string;
  href: string;
  children: SiteNavLink[];
};

/** Menu dịch vụ xổ cấp — trang landing riêng từng dịch vụ */
export const SERVICE_NAV_GROUPS: SiteNavGroup[] = [
  {
    label: "Website",
    href: "/website",
    children: [
      { label: "Tên miền website", href: "/website/ten-mien-website" },
      { label: "Thiết kế Website", href: "/website/thietkewebsite" },
      { label: "Vận hành website", href: "/website/van-hanh-website" },
      { label: "Chăm sóc Website", href: "/website/cham-soc-website" },
      { label: "Quảng cáo Website", href: "/website/quang-cao-website" },
    ],
  },
  {
    label: "Facebook",
    href: "/facebook",
    children: [
      { label: "Thiết kế Fanpage", href: "/facebook/thiet-ke-fanpage" },
      { label: "Chăm sóc Fanpage", href: "/facebook/cham-soc-fanpage" },
      { label: "Quảng cáo Fanpage", href: "/facebook/quang-cao-fanpage" },
    ],
  },
  {
    label: "Google Maps",
    href: "/google-maps",
    children: [
      { label: "Thiết kế Google Maps", href: "/google-maps/thiet-ke-google-maps" },
      { label: "Quảng cáo Google Maps", href: "/google-maps/quang-cao-google-maps" },
    ],
  },
];

export const SIMPLE_NAV_LINKS: SiteNavLink[] = [
  { label: "Trang Chủ", href: "/" },
  { label: "Giới Thiệu", href: "/gioi-thieu" },
  { label: "Tin Tức", href: "/blog" },
  { label: "Liên Hệ", href: "/lien-he" },
];

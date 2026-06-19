export type SiteNavLink = {
  label: string;
  href: string;
};

export type SiteNavGroup = {
  label: string;
  href: string;
  children: SiteNavLink[];
};

/** Menu dịch vụ xổ cấp — đồng bộ anchor trên /website, /facebook, /google-maps */
export const SERVICE_NAV_GROUPS: SiteNavGroup[] = [
  {
    label: "Website",
    href: "/website",
    children: [
      { label: "Tên miền website", href: "/website#domain" },
      { label: "Thiết kế Website", href: "/website/thietkewebsite" },
      { label: "Vận hành website", href: "/website/van-hanh-website" },
      { label: "Chăm sóc Website", href: "/website#care" },
      { label: "Quảng cáo Website", href: "/website#quang-cao" },
    ],
  },
  {
    label: "Facebook",
    href: "/facebook",
    children: [
      { label: "Thiết kế Fanpage", href: "/facebook#build" },
      { label: "Chăm sóc Fanpage", href: "/facebook#care" },
      { label: "Quảng cáo Fanpage", href: "/facebook#ads" },
    ],
  },
  {
    label: "Google Maps",
    href: "/google-maps",
    children: [
      { label: "Thiết kế Google Maps", href: "/google-maps#gm-pricing" },
      { label: "Quảng cáo Google Maps", href: "/google-maps#ads-pricing" },
    ],
  },
];

export const SIMPLE_NAV_LINKS: SiteNavLink[] = [
  { label: "Trang Chủ", href: "/" },
  { label: "Giới Thiệu", href: "/gioi-thieu" },
  { label: "Tin Tức", href: "/blog" },
  { label: "Liên Hệ", href: "/lien-he" },
];

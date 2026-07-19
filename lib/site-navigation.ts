import { getWebsiteIndustryNavLinks } from "@/lib/website-industry-catalog";

export type SiteNavLink = {
  label: string;
  href: string;
};

export type SiteNavChild =
  | SiteNavLink
  | {
      type: "heading";
      label: string;
    };

export type SiteNavGroup = {
  label: string;
  href: string;
  children: SiteNavChild[];
  /** Mega menu 3 cột — danh sách ngành website */
  industryMegaMenu?: boolean;
};

export function isNavLink(child: SiteNavChild): child is SiteNavLink {
  return !("type" in child);
}

/** Menu dịch vụ xổ cấp — trang landing riêng từng dịch vụ */
export const SERVICE_NAV_GROUPS: SiteNavGroup[] = [
  {
    label: "Website",
    href: "/website",
    industryMegaMenu: true,
    children: [
      { label: "Tên miền website", href: "/website/ten-mien-website" },
      { label: "Thiết kế website", href: "/website" },
      { label: "Hosting", href: "/website/van-hanh-website" },
      { label: "Chăm sóc Website", href: "/website/cham-soc-website" },
      { label: "Quảng cáo Website", href: "/website/quang-cao-website" },
      { label: "Xem tất cả ngành →", href: "/website#theo-nganh" },
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
  {
    label: "Dịch vụ",
    href: "/seo-website",
    children: [
      { type: "heading", label: "SEO Website" },
      { label: "Dịch vụ SEO Website", href: "/seo-website" },
      { label: "Technical SEO", href: "/seo-website/technical-seo" },
      { label: "SEO Content", href: "/seo-website/seo-content" },
      { label: "SEO theo địa phương", href: "/seo-website/dia-phuong/ho-chi-minh" },
      { label: "Kiến thức SEO", href: "/kien-thuc/seo-website" },
      { type: "heading", label: "Automation" },
      { label: "Marketing Automation", href: "/marketing-automation" },
      { label: "Lead Nurturing", href: "/marketing-automation/lead-nurturing" },
      { label: "CRM Automation", href: "/marketing-automation/crm-automation" },
      { label: "Kiến thức Automation", href: "/kien-thuc/marketing-automation" },
      { type: "heading", label: "AI Marketing" },
      { label: "AI Marketing", href: "/ai-marketing" },
      { label: "AI Content Ops", href: "/ai-marketing/ai-content" },
      { label: "AI Search Optimization", href: "/ai-marketing/ai-search-optimization" },
      { label: "Kiến thức AI", href: "/kien-thuc/ai-marketing" },
    ],
  },
];

export const WEBSITE_INDUSTRY_NAV_LINKS = getWebsiteIndustryNavLinks();

export const SIMPLE_NAV_LINKS: SiteNavLink[] = [
  { label: "Trang Chủ", href: "/" },
  { label: "Bảng Giá", href: "/banggia" },
  { label: "Giới Thiệu", href: "/gioi-thieu" },
  { label: "Công Cụ", href: "/cong-cu" },
  { label: "Dự Án", href: "/du-an" },
  { label: "Kiến Thức", href: "/kien-thuc" },
  { label: "Tin Tức", href: "/blog" },
  { label: "Liên Hệ", href: "/lien-he" },
];

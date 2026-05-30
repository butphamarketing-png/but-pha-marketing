import {
  DOMAIN_COM_PRICE,
  FANPAGE_ADS_PACKAGES,
  FANPAGE_BUILD_PACKAGES,
  FANPAGE_CARE_PACKAGES,
  formatPriceVnd,
  getHostingPriceByGb,
  GOOGLE_MAPS_ADS_PACKAGES,
  GOOGLE_MAPS_PACKAGES,
  WEBSITE_BUILD_PACKAGES,
  WEBSITE_CARE_PACKAGES,
  WEBSITE_HOSTING_STRATEGY_GB,
} from "./service-pricing";

export type StrategyPricingItem = {
  id: string;
  label: string;
  price: string;
  quantity?: string;
  works: string[];
};

export type StrategyPricingGroup = {
  title: string;
  items: StrategyPricingItem[];
};

export type StrategyPricingColumn = {
  id: "website" | "fanpage" | "googlemaps";
  title: string;
  groups: StrategyPricingGroup[];
};

export const STRATEGY_FOOTER = [
  { title: "UY TÍN", subtitle: "Cam kết chất lượng" },
  { title: "NHANH CHÓNG", subtitle: "Triển khai đúng tiến độ" },
  { title: "HIỆU QUẢ", subtitle: "Tối ưu chi phí – Tối đa hiệu quả" },
  { title: "HỖ TRỢ 24/7", subtitle: "Đồng hành cùng khách hàng" },
] as const;

export const STRATEGY_PRICING: StrategyPricingColumn[] = [
  {
    id: "website",
    title: "WEBSITE",
    groups: [
      {
        title: "Xây dựng Website (vĩnh viễn)",
        items: WEBSITE_BUILD_PACKAGES.map((pkg) => ({
          id: pkg.id,
          label: pkg.name,
          price: formatPriceVnd(pkg.price),
          quantity: pkg.quantity,
          works: [...pkg.works],
        })),
      },
      {
        title: "Data / năm",
        items: WEBSITE_HOSTING_STRATEGY_GB.map((gb) => ({
          id: `web-data-${gb}`,
          label: `${gb}GB`,
          price: formatPriceVnd(getHostingPriceByGb(gb)),
          quantity: `${gb}GB dung lượng / năm`,
          works: [
            "Hosting SSD tốc độ cao",
            "Backup định kỳ",
            "SSL miễn phí",
            "Giám sát uptime",
          ],
        })),
      },
      {
        title: "Tên miền / năm",
        items: [
          {
            id: "web-domain-com",
            label: ".com",
            price: formatPriceVnd(DOMAIN_COM_PRICE),
            quantity: "1 tên miền .com / năm",
            works: ["Đăng ký & quản lý DNS", "Bảo mật thông tin chủ thể", "Gia hạn nhắc trước 30 ngày"],
          },
        ],
      },
      {
        title: "Chăm sóc Website / tháng",
        items: WEBSITE_CARE_PACKAGES.map((pkg) => ({
          id: pkg.id,
          label: `${pkg.posts} bài viết`,
          price: formatPriceVnd(pkg.price),
          quantity: `${pkg.posts} bài viết / tháng`,
          works: [...pkg.works],
        })),
      },
    ],
  },
  {
    id: "fanpage",
    title: "FANPAGE",
    groups: [
      {
        title: "Xây dựng Fanpage",
        items: FANPAGE_BUILD_PACKAGES.map((pkg) => ({
          id: pkg.id,
          label: pkg.name,
          price: formatPriceVnd(pkg.price),
          quantity: "1 Fanpage",
          works: [...pkg.works],
        })),
      },
      {
        title: "Chăm sóc Fanpage / tháng",
        items: FANPAGE_CARE_PACKAGES.map((pkg) => ({
          id: pkg.id,
          label: `${pkg.posts} bài / tháng`,
          price: formatPriceVnd(pkg.price),
          quantity: `${pkg.posts} bài · ${formatPriceVnd(150_000)}/bài`,
          works: [...pkg.works],
        })),
      },
      {
        title: "Quảng cáo Facebook",
        items: FANPAGE_ADS_PACKAGES.map((pkg) => ({
          id: pkg.id,
          label: pkg.name,
          price: formatPriceVnd(pkg.price),
          quantity: "Phí quản lý / tháng",
          works: [...pkg.works],
        })),
      },
    ],
  },
  {
    id: "googlemaps",
    title: "GOOGLE MAPS",
    groups: [
      {
        title: "Dịch vụ Google Maps",
        items: GOOGLE_MAPS_PACKAGES.map((pkg) => ({
          id: pkg.id,
          label: pkg.name,
          price: formatPriceVnd(pkg.price),
          quantity: "1 doanh nghiệp",
          works: [...pkg.works],
        })),
      },
      {
        title: "Quảng cáo Google Maps",
        items: GOOGLE_MAPS_ADS_PACKAGES.map((pkg) => ({
          id: pkg.id,
          label: pkg.name,
          price: formatPriceVnd(pkg.price),
          quantity: "Phí quản lý / tháng",
          works: [...pkg.works],
        })),
      },
    ],
  },
];

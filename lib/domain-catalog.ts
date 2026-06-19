/** Danh mục tên miền — đồng bộ carousel landing & modal đăng ký */

export type DomainCatalogItem = {
  id: string;
  name: string;
  price: number;
  category: "intl" | "vn" | "extended";
  categoryLabel: string;
  tagline: string;
  works: readonly string[];
};

const INTL_WORKS = [
  "Đăng ký / chuyển tên miền",
  "Hỗ trợ trỏ DNS & hosting",
  "Nhắc gia hạn hàng năm",
  "Bảo mật thông tin đăng ký",
] as const;

const VN_WORKS = [
  "Đăng ký .vn / .com.vn chuẩn quy định",
  "Hỗ trợ hồ sơ & xác minh",
  "Trỏ website & email doanh nghiệp",
  "Theo dõi gia hạn tên miền",
] as const;

const EXT_WORKS = [
  "Đuôi mở rộng theo ngành (.shop, .tech…)",
  "Tư vấn chọn đuôi phù hợp thương hiệu",
  "Kích hoạt & trỏ DNS nhanh",
  "Hỗ trợ kỹ thuật sau đăng ký",
] as const;

export const DOMAIN_CATALOG: DomainCatalogItem[] = [
  { id: "com", name: ".com", price: 350_000, category: "intl", categoryLabel: "Quốc tế", tagline: "Phổ biến nhất — phù hợp mọi doanh nghiệp", works: INTL_WORKS },
  { id: "net", name: ".net", price: 400_000, category: "intl", categoryLabel: "Quốc tế", tagline: "Lựa chọn thay thế cho thương hiệu công nghệ", works: INTL_WORKS },
  { id: "org", name: ".org", price: 400_000, category: "intl", categoryLabel: "Quốc tế", tagline: "Phù hợp tổ chức, hiệp hội, dự án cộng đồng", works: INTL_WORKS },
  { id: "info", name: ".info", price: 600_000, category: "intl", categoryLabel: "Quốc tế", tagline: "Website thông tin, blog, landing giới thiệu", works: INTL_WORKS },
  { id: "xyz", name: ".xyz", price: 300_000, category: "intl", categoryLabel: "Quốc tế", tagline: "Đuôi hiện đại, dễ sáng tạo tên thương hiệu", works: INTL_WORKS },
  { id: "vn", name: ".vn", price: 750_000, category: "vn", categoryLabel: "Việt Nam", tagline: "Tăng uy tín với khách hàng trong nước", works: VN_WORKS },
  { id: "com_vn", name: ".com.vn", price: 650_000, category: "vn", categoryLabel: "Việt Nam", tagline: "Doanh nghiệp Việt — quen thuộc với khách nội địa", works: VN_WORKS },
  { id: "net_vn", name: ".net.vn", price: 650_000, category: "vn", categoryLabel: "Việt Nam", tagline: "Lựa chọn thay thế .com.vn cho tech & IT", works: VN_WORKS },
  { id: "org_vn", name: ".org.vn", price: 650_000, category: "vn", categoryLabel: "Việt Nam", tagline: "Tổ chức, hiệp hội tại Việt Nam", works: VN_WORKS },
  { id: "shop", name: ".shop", price: 1_000_000, category: "extended", categoryLabel: "Mở rộng", tagline: "Cửa hàng online, thương mại điện tử", works: EXT_WORKS },
  { id: "store", name: ".store", price: 1_000_000, category: "extended", categoryLabel: "Mở rộng", tagline: "Thương hiệu bán lẻ & chuỗi cửa hàng", works: EXT_WORKS },
  { id: "online", name: ".online", price: 800_000, category: "extended", categoryLabel: "Mở rộng", tagline: "Dịch vụ trực tuyến, SaaS, học online", works: EXT_WORKS },
  { id: "tech", name: ".tech", price: 1_200_000, category: "extended", categoryLabel: "Mở rộng", tagline: "Startup công nghệ, phần mềm, IT", works: EXT_WORKS },
];

/** Nhóm cho modal chọn nhiều đuôi */
export const DOMAIN_CATEGORIES = [
  {
    title: "Tên miền quốc tế",
    category: "intl" as const,
    domains: DOMAIN_CATALOG.filter((d) => d.category === "intl").map(({ id, name, price }) => ({ id, name, price })),
  },
  {
    title: "Tên miền Việt Nam",
    category: "vn" as const,
    domains: DOMAIN_CATALOG.filter((d) => d.category === "vn").map(({ id, name, price }) => ({ id, name, price })),
  },
  {
    title: "Tên miền mở rộng",
    category: "extended" as const,
    domains: DOMAIN_CATALOG.filter((d) => d.category === "extended").map(({ id, name, price }) => ({ id, name, price })),
  },
] as const;

export function formatDomainPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ/năm";
}

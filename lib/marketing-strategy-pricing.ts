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
        items: [
          {
            id: "web-build-3",
            label: "Gói 3 triệu",
            price: "3.600.000đ",
            quantity: "1 website giới thiệu",
            works: [
              "Thiết kế giao diện chuẩn mobile",
              "5–7 trang nội dung cơ bản",
              "Chuẩn SEO Onpage cơ bản",
              "Tích hợp form liên hệ & Zalo",
            ],
          },
          {
            id: "web-build-6",
            label: "Gói 6 triệu",
            price: "6.000.000đ",
            quantity: "1 website chuyên nghiệp",
            works: [
              "UI/UX chuyên sâu theo ngành",
              "10+ trang, landing page chuyển đổi",
              "Tối ưu tốc độ & SEO nâng cao",
              "Tích hợp công cụ marketing cơ bản",
            ],
          },
          {
            id: "web-build-9",
            label: "Gói 9 triệu",
            price: "9.000.000đ",
            quantity: "1 website kinh doanh",
            works: [
              "Thiết kế độc quyền theo thương hiệu",
              "Tối ưu chuyển đổi (CRO)",
              "Tích hợp CRM, chatbot cơ bản",
              "Báo cáo & theo dõi dữ liệu",
            ],
          },
          {
            id: "web-build-12",
            label: "Gói 12 triệu",
            price: "12.000.000đ",
            quantity: "1 hệ thống website",
            works: [
              "Hệ thống chuyên sâu, đa tính năng",
              "Tự động hóa marketing cơ bản",
              "Tích hợp API, CRM nâng cao",
              "Hỗ trợ ưu tiên 24/7",
            ],
          },
        ],
      },
      {
        title: "Data / năm",
        items: [
          {
            id: "web-data-3",
            label: "3GB",
            price: "3.348.000đ",
            quantity: "3GB dung lượng / năm",
            works: ["Hosting SSD tốc độ cao", "Backup định kỳ", "SSL miễn phí", "Giám sát uptime"],
          },
          {
            id: "web-data-10",
            label: "10GB",
            price: "7.200.000đ",
            quantity: "10GB dung lượng / năm",
            works: ["Phù hợp website vừa & nhỏ", "CDN cơ bản", "Backup hàng tuần", "Hỗ trợ kỹ thuật"],
          },
          {
            id: "web-data-20",
            label: "20GB",
            price: "12.000.000đ",
            quantity: "20GB dung lượng / năm",
            works: ["Website nhiều media & blog", "Backup hàng ngày", "Tối ưu băng thông", "Hỗ trợ ưu tiên"],
          },
        ],
      },
      {
        title: "Tên miền / năm",
        items: [
          {
            id: "web-domain-com",
            label: ".com",
            price: "346.500đ",
            quantity: "1 tên miền .com / năm",
            works: ["Đăng ký & quản lý DNS", "Bảo mật thông tin chủ thể", "Gia hạn nhắc trước 30 ngày"],
          },
        ],
      },
      {
        title: "Chăm sóc Website / tháng",
        items: [
          {
            id: "web-care-10",
            label: "10 bài viết",
            price: "1.000.000đ",
            quantity: "10 bài viết / tháng",
            works: ["Viết & đăng bài SEO", "Tối ưu Onpage cơ bản", "Hình ảnh minh họa", "Báo cáo hàng tháng"],
          },
          {
            id: "web-care-20",
            label: "20 bài viết",
            price: "2.000.000đ",
            quantity: "20 bài viết / tháng",
            works: ["Content SEO chuyên sâu", "Tối ưu từ khóa & meta", "Internal link", "Đề xuất cải thiện"],
          },
          {
            id: "web-care-30",
            label: "30 bài viết",
            price: "2.500.000đ",
            quantity: "30 bài viết / tháng",
            works: ["Chiến lược content theo tháng", "Bài chuẩn SEO + CTA", "Tối ưu hiển thị", "Hỗ trợ ưu tiên"],
          },
        ],
      },
    ],
  },
  {
    id: "fanpage",
    title: "FANPAGE",
    groups: [
      {
        title: "Xây dựng Fanpage",
        items: [
          {
            id: "fb-build-basic",
            label: "Gói cơ bản",
            price: "500.000đ",
            quantity: "1 Fanpage",
            works: ["Thiết kế lại logo & ảnh bìa", "Tối ưu thông tin Fanpage", "SEO Fanpage cơ bản"],
          },
          {
            id: "fb-build-advanced",
            label: "Gói nâng cao",
            price: "1.000.000đ",
            quantity: "1 Fanpage chuyên nghiệp",
            works: [
              "Khởi tạo Fanpage chuẩn thương hiệu",
              "Logo, ảnh bìa, CTA",
              "SEO Fanpage cơ bản",
              "Hướng dẫn vận hành",
            ],
          },
          {
            id: "fb-build-pro",
            label: "Gói chuyên nghiệp",
            price: "1.500.000đ",
            quantity: "1 Fanpage nâng cao",
            works: [
              "Setup Fanpage chuyên nghiệp",
              "SEO Fanpage chuẩn",
              "Chat tự động cơ bản",
              "Chiến lược nội dung ban đầu",
            ],
          },
        ],
      },
      {
        title: "Chăm sóc Fanpage / tháng",
        items: [
          {
            id: "fb-care-basic",
            label: "Gói cơ bản",
            price: "1.500.000đ",
            quantity: "~15 bài / tháng",
            works: ["Đăng bài đều đặn", "Thiết kế ảnh bài viết", "Phản hồi tin nhắn cơ bản", "Báo cáo tuần"],
          },
          {
            id: "fb-care-advanced",
            label: "Gói nâng cao",
            price: "2.500.000đ",
            quantity: "~25 bài / tháng",
            works: ["Content tương tác", "Thiết kế chuyên nghiệp", "Tối ưu giờ đăng", "Báo cáo chi tiết"],
          },
          {
            id: "fb-care-pro",
            label: "Gói chuyên nghiệp",
            price: "3.500.000đ",
            quantity: "~35 bài / tháng",
            works: ["Chiến lược content tháng", "Video/Reels hỗ trợ", "Tương tác cộng đồng", "Tối ưu chuyển đổi inbox"],
          },
        ],
      },
      {
        title: "Quảng cáo Facebook",
        items: [
          {
            id: "fb-ads-under-10",
            label: "Ngân sách < 10 triệu",
            price: "1.000.000đ",
            quantity: "Phí quản lý / tháng",
            works: [
              "Thiết lập chiến dịch",
              "Target khách hàng mục tiêu",
              "Theo dõi & tối ưu",
              "Báo cáo kết quả",
            ],
          },
          {
            id: "fb-ads-over-10",
            label: "Ngân sách > 10 triệu",
            price: "2.000.000đ",
            quantity: "Phí quản lý / tháng",
            works: [
              "Tối ưu chiến dịch nâng cao",
              "A/B Testing",
              "Tối ưu chuyển đổi",
              "Báo cáo chuyên sâu",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "googlemaps",
    title: "GOOGLE MAPS",
    groups: [
      {
        title: "Dịch vụ Google Maps",
        items: [
          {
            id: "gm-rebuild",
            label: "Cải tạo Google Maps",
            price: "300.000đ",
            quantity: "1 doanh nghiệp",
            works: ["Tối ưu thông tin", "Sửa danh mục", "Tối ưu hình ảnh cơ bản"],
          },
          {
            id: "gm-build",
            label: "Xây dựng Google Maps",
            price: "600.000đ",
            quantity: "1 profile mới",
            works: ["Tạo Google Business Profile", "Xác minh doanh nghiệp", "Setup đầy đủ thông tin"],
          },
          {
            id: "gm-optimize",
            label: "Tối ưu Google Maps",
            price: "900.000đ",
            quantity: "1 doanh nghiệp",
            works: ["Tối ưu SEO Maps", "Viết mô tả chuẩn", "Tối ưu hiển thị tìm kiếm"],
          },
        ],
      },
      {
        title: "Quảng cáo Google Maps",
        items: [
          {
            id: "gm-ads-under-10",
            label: "Ngân sách < 10 triệu",
            price: "1.000.000đ",
            quantity: "Phí quản lý / tháng",
            works: ["Setup chiến dịch Local Ads", "Target khu vực", "Theo dõi hiệu quả", "Báo cáo"],
          },
          {
            id: "gm-ads-over-10",
            label: "Ngân sách > 10 triệu",
            price: "2.000.000đ",
            quantity: "Phí quản lý / tháng",
            works: ["Tối ưu chiến dịch lớn", "A/B test quảng cáo", "Tối ưu chi phí/chuyển đổi", "Báo cáo nâng cao"],
          },
        ],
      },
    ],
  },
];

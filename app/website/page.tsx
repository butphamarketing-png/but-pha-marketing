import { PlatformPage, PlatformConfig } from "@/components/shared/PlatformPage";
import { getDynamicMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getDynamicMetadata("/website", {
    title: "Dịch vụ Website Marketing, thiết kế web và SEO website",
    description: "Dịch vụ Website Marketing bao gồm thiết kế website, tối ưu SEO website và bảo trì kỹ thuật để tăng tốc độ tải trang, trải nghiệm người dùng và chuyển đổi kinh doanh.",
    keywords: ["dịch vụ website marketing", "thiết kế website", "seo website", "bảo trì website", "thiết kế web chuẩn seo"],
  });
}

const config: PlatformConfig = {
  name: "Website",
  color: "#7C3AED",
  auditPlatform: "website",
  vision: "Website là nền tảng trung tâm của mọi chiến lược marketing số. Chúng tôi xây dựng website chuyên nghiệp, tối ưu SEO và bảo trì để doanh nghiệp của bạn có mặt mọi lúc mọi nơi trên internet.",
  mission: "Thiết kế website đẹp, nhanh và chuyển đổi cao — từ Landing Page đơn giản đến E-commerce phức tạp, tất cả đều được tối ưu SEO từ đầu để tiết kiệm chi phí marketing về lâu dài.",
  responsibility: "Cam kết bàn giao website đúng deadline, hỗ trợ kỹ thuật và bảo trì 24/7, không phát sinh chi phí ẩn và đảm bảo website hoạt động ổn định 99.9% uptime.",
  tabs: [
    {
      label: "Thiết kế Website",
      packages: [
        { 
          name: "Giới thiệu", 
          price: "3.000.000đ", 
          features: ["Website cơ bản", "Giao diện chuẩn", "Tương thích mobile", "Chuẩn SEO cơ bản", "Hỗ trợ kỹ thuật"], 
          allFeatures: ["Website cơ bản", "Giao diện chuẩn", "Tương thích mobile", "Chuẩn SEO cơ bản", "Hỗ trợ kỹ thuật"], 
          audioText: "Gói Giới thiệu cung cấp giải pháp website cơ bản, chuẩn SEO, tương thích hoàn toàn với thiết bị di động." 
        },
        { 
          name: "Tối ưu", 
          price: "6.000.000đ", 
          features: ["Chuẩn SEO + UX", "Giao diện chuyên nghiệp", "Chuẩn SEO nâng cao", "Tối ưu tốc độ", "Tích hợp công cụ marketing"], 
          allFeatures: ["Chuẩn SEO + UX", "Giao diện chuyên nghiệp", "Chuẩn SEO nâng cao", "Tối ưu tốc độ", "Tích hợp công cụ marketing"], 
          audioText: "Gói Tối ưu tập trung vào trải nghiệm người dùng và SEO nâng cao, giúp website tải nhanh và tích hợp đầy đủ công cụ marketing." 
        },
        { 
          name: "Kinh doanh", 
          price: "9.000.000đ", 
          popular: true,
          features: ["Tối ưu chuyển đổi", "Thiết kế độc quyền", "Tối ưu chuyển đổi (CRO)", "Tích hợp CRM, Chatbot", "Báo cáo & theo dõi dữ liệu"], 
          allFeatures: ["Tối ưu chuyển đổi", "Thiết kế độc quyền", "Tối ưu chuyển đổi (CRO)", "Tích hợp CRM, Chatbot", "Báo cáo & theo dõi dữ liệu"], 
          audioText: "Gói Kinh doanh là giải pháp hoàn hảo để tăng doanh thu với thiết kế độc quyền và các tính năng tối ưu chuyển đổi mạnh mẽ." 
        },
        { 
          name: "Hệ thống", 
          price: "12.000.000đ", 
          features: ["Automation + Scale", "Hệ thống chuyên sâu", "Tự động hóa marketing", "Tích hợp API, CRM nâng cao", "Hỗ trợ ưu tiên 24/7"], 
          allFeatures: ["Automation + Scale", "Hệ thống chuyên sâu", "Tự động hóa marketing", "Tích hợp API, CRM nâng cao", "Hỗ trợ ưu tiên 24/7"], 
          audioText: "Gói Hệ thống dành cho doanh nghiệp cần tự động hóa vận hành và mở rộng quy mô với các tích hợp kỹ thuật chuyên sâu." 
        },
      ],
    },
  ],
  stats: [{ label: "Website", value: "150+" }, { label: "Hài lòng", value: "98%" }, { label: "Năm KN", value: "5+" }],
  process: [
    { step: 1, title: "Khảo sát nhu cầu", desc: "Tư vấn chi tiết về mục đích, tính năng và design style phù hợp với thương hiệu của bạn." },
    { step: 2, title: "Thiết kế UI/UX", desc: "Tạo wireframe, thiết kế giao diện đẹp và trải nghiệm người dùng tối ưu cho mọi thiết bị." },
    { step: 3, title: "Lập trình", desc: "Code website theo thiết kế đã duyệt, tích hợp các tính năng và tối ưu tốc độ tải trang." },
    { step: 4, title: "Kiểm thử & Bàn giao", desc: "Test kỹ lưỡng trên nhiều thiết bị và trình duyệt, bàn giao tài khoản và hướng dẫn sử dụng." },
  ],
  faqs: [
    { q: "Thời gian làm website mất bao lâu?", a: "Landing Page: 3-5 ngày. Website doanh nghiệp: 1-2 tuần. E-commerce: 3-4 tuần. Thời gian có thể thay đổi tùy yêu cầu." },
    { q: "Có cần cung cấp nội dung không?", a: "Tùy gói. Chúng tôi có thể viết nội dung mẫu cho bạn, nhưng thông tin về sản phẩm/dịch vụ vẫn cần bạn cung cấp." },
    { q: "Website có thể tự chỉnh sửa sau khi bàn giao không?", a: "Có. Chúng tôi bàn giao đầy đủ tài khoản admin và hướng dẫn sử dụng. Có thể tự cập nhật tin tức, sản phẩm." },
    { q: "Hosting và domain tính riêng không?", a: "Hosting và domain được tính riêng hoặc package cùng tùy gói. Chúng tôi tư vấn giải pháp phù hợp nhất." },
    { q: "SEO bao lâu thì lên trang 1 Google?", a: "Từ khóa ít cạnh tranh: 1-3 tháng. Từ khóa cạnh tranh trung bình: 3-6 tháng. Từ khóa cạnh tranh cao: 6-12 tháng." },
  ],
};

export default function WebsitePage() {
  return <PlatformPage config={config} />;
}



import { PlatformPage, PlatformConfig } from "@/components/shared/PlatformPage";

const config: PlatformConfig = {
  name: "Website",
  color: "#34A853",
  auditPlatform: "website",
  vision: "Website là nền tảng trung tâm của mọi chiến lược marketing số. Chúng tôi xây dựng website chuyên nghiệp, tối ưu SEO và bảo trì để doanh nghiệp của bạn có mặt mọi lúc mọi nơi trên internet.",
  mission: "Thiết kế website đẹp, nhanh và chuyển đổi cao — từ Landing Page đơn giản đến E-commerce phức tạp, tất cả đều được tối ưu SEO từ đầu để tiết kiệm chi phí marketing về lâu dài.",
  responsibility: "Cam kết bàn giao website đúng deadline, hỗ trợ kỹ thuật và bảo trì 24/7, không phát sinh chi phí ẩn và đảm bảo website hoạt động ổn định 99.9% uptime.",
  tabs: [
    {
      label: "Thiết Kế Web",
      packages: [
        { name: "Landing Page", price: "3.500.000đ", features: ["1 trang landing page", "Responsive mobile", "Form liên hệ", "Tốc độ tải nhanh"], allFeatures: ["1 trang landing page", "5-10 trang", "E-commerce đầy đủ", "Responsive mobile", "Form liên hệ", "Tích hợp thanh toán", "Admin panel", "SEO cơ bản"], audioText: "Landing Page chuyên nghiệp là công cụ chuyển đổi khách hàng hiệu quả nhất, được tối ưu tốc độ và responsive hoàn toàn." },
        { name: "Website Doanh Nghiệp", price: "7.000.000đ", popular: true, features: ["5-10 trang", "Responsive mobile", "Form liên hệ", "Admin panel", "SEO cơ bản"], allFeatures: ["1 trang landing page", "5-10 trang", "E-commerce đầy đủ", "Responsive mobile", "Form liên hệ", "Tích hợp thanh toán", "Admin panel", "SEO cơ bản"], audioText: "Website Doanh Nghiệp 5-10 trang với Admin Panel giúp bạn tự cập nhật nội dung và SEO cơ bản được tích hợp sẵn." },
        { name: "E-commerce", price: "15.000.000đ", features: ["E-commerce đầy đủ", "Responsive mobile", "Form liên hệ", "Tích hợp thanh toán", "Admin panel", "SEO cơ bản"], allFeatures: ["1 trang landing page", "5-10 trang", "E-commerce đầy đủ", "Responsive mobile", "Form liên hệ", "Tích hợp thanh toán", "Admin panel", "SEO cơ bản"], audioText: "Website E-commerce đầy đủ với tích hợp thanh toán đa dạng và quản lý kho hàng chuyên nghiệp." },
      ],
    },
    {
      label: "SEO Website",
      packages: [
        { name: "Gói Local SEO", price: "3.000.000đ", features: ["10 từ khóa địa phương", "On-page tối ưu", "10 backlink/tháng", "Báo cáo thứ hạng"], allFeatures: ["10 từ khóa địa phương", "30 từ khóa", "50+ từ khóa", "On-page tối ưu", "Content blog 4 bài", "Content blog 8 bài", "10 backlink/tháng", "30 backlink/tháng", "Báo cáo thứ hạng"], audioText: "Gói Local SEO với 10 từ khóa địa phương và 10 backlink mỗi tháng giúp website xuất hiện đúng lúc khách hàng cần." },
        { name: "Gói National", price: "6.000.000đ", popular: true, features: ["30 từ khóa", "On-page tối ưu", "Content blog 4 bài", "30 backlink/tháng", "Báo cáo thứ hạng"], allFeatures: ["10 từ khóa địa phương", "30 từ khóa", "50+ từ khóa", "On-page tối ưu", "Content blog 4 bài", "Content blog 8 bài", "10 backlink/tháng", "30 backlink/tháng", "Báo cáo thứ hạng"], audioText: "Gói National SEO với 30 từ khóa và content blog 4 bài mỗi tháng giúp website bứt phá trong tìm kiếm toàn quốc." },
        { name: "Gói Enterprise", price: "12.000.000đ", features: ["50+ từ khóa", "On-page tối ưu", "Content blog 8 bài", "30 backlink/tháng", "Báo cáo thứ hạng"], allFeatures: ["10 từ khóa địa phương", "30 từ khóa", "50+ từ khóa", "On-page tối ưu", "Content blog 4 bài", "Content blog 8 bài", "10 backlink/tháng", "30 backlink/tháng", "Báo cáo thứ hạng"], audioText: "Gói Enterprise SEO dành cho doanh nghiệp lớn muốn thống lĩnh tìm kiếm với 50+ từ khóa và 8 bài content chuyên sâu." },
      ],
    },
    {
      label: "Bảo Trì Web",
      packages: [
        { name: "Gói Basic", price: "500.000đ", features: ["Backup hàng tuần", "Cập nhật plugin", "Hỗ trợ qua Zalo"], allFeatures: ["Backup hàng tuần", "Backup hàng ngày", "Cập nhật plugin", "Cập nhật bảo mật", "Hỗ trợ qua Zalo", "Hỗ trợ 24/7", "Thay đổi nội dung nhỏ", "Chỉnh sửa không giới hạn"], audioText: "Gói Bảo Trì Basic đảm bảo website của bạn luôn hoạt động ổn định với backup tuần và cập nhật plugin định kỳ." },
        { name: "Gói Standard", price: "1.200.000đ", popular: true, features: ["Backup hàng ngày", "Cập nhật plugin", "Cập nhật bảo mật", "Hỗ trợ 24/7", "Thay đổi nội dung nhỏ"], allFeatures: ["Backup hàng tuần", "Backup hàng ngày", "Cập nhật plugin", "Cập nhật bảo mật", "Hỗ trợ qua Zalo", "Hỗ trợ 24/7", "Thay đổi nội dung nhỏ", "Chỉnh sửa không giới hạn"], audioText: "Gói Standard với backup hàng ngày và hỗ trợ 24/7 đảm bảo website không bao giờ downtime và dữ liệu luôn an toàn." },
        { name: "Gói Pro", price: "2.500.000đ", features: ["Backup hàng ngày", "Cập nhật plugin", "Cập nhật bảo mật", "Hỗ trợ 24/7", "Thay đổi nội dung nhỏ", "Chỉnh sửa không giới hạn"], allFeatures: ["Backup hàng tuần", "Backup hàng ngày", "Cập nhật plugin", "Cập nhật bảo mật", "Hỗ trợ qua Zalo", "Hỗ trợ 24/7", "Thay đổi nội dung nhỏ", "Chỉnh sửa không giới hạn"], audioText: "Gói Bảo Trì Pro với chỉnh sửa không giới hạn mỗi tháng — bạn chỉ cần yêu cầu, chúng tôi thực hiện ngay trong ngày." },
      ],
    },
  ],
  stats: [{ label: "Website", value: "150+" }, { label: "Dự án SEO", value: "300+" }, { label: "Hài lòng", value: "98%" }, { label: "Năm KN", value: "5+" }],
  process: [
    { step: 1, title: "Khảo sát nhu cầu", desc: "Tư vấn chi tiết về mục đích, tính năng và design style phù hợp với thương hiệu của bạn." },
    { step: 2, title: "Thiết kế UI/UX", desc: "Tạo wireframe, thiết kế giao diện đẹp và trải nghiệm người dùng tối ưu cho mọi thiết bị." },
    { step: 3, title: "Lập trình", desc: "Code website theo thiết kế đã duyệt, tích hợp các tính năng và tối ưu tốc độ tải trang." },
    { step: 4, title: "Kiểm thử & Bàn giao", desc: "Test kỹ lưỡng trên nhiều thiết bị và trình duyệt, bàn giao tài khoản và hướng dẫn sử dụng." },
    { step: 5, title: "SEO & Bảo trì", desc: "Tối ưu SEO On-page, theo dõi thứ hạng và bảo trì website định kỳ." },
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

import { PlatformPage, PlatformConfig } from "@/components/shared/PlatformPage";
import { getDynamicMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getDynamicMetadata("/instagram", {
    title: "Dịch vụ Instagram Marketing, Reels và Instagram Ads",
    description: "Dịch vụ Instagram Marketing tập trung vào hình ảnh thương hiệu, Reels, Stories và Instagram Ads để tăng tương tác, độ nhận diện và chuyển đổi bền vững.",
    keywords: ["dịch vụ instagram marketing", "reels marketing", "quản trị instagram", "instagram ads", "agency instagram marketing"],
  });
}

const config: PlatformConfig = {
  name: "Instagram",
  color: "#E1306C",
  auditPlatform: "instagram",
  vision: "Xây dựng thương hiệu thời thượng và thu hút trên Instagram — nền tảng visual marketing mạnh mẽ nhất, nơi hình ảnh đẹp kể câu chuyện thuyết phục nhất về sản phẩm và dịch vụ của bạn.",
  mission: "Chúng tôi tạo ra những nội dung visual đỉnh cao, xây dựng feed Instagram nhất quán và đẹp mắt, triển khai Reels viral và quảng cáo đúng target để tăng trưởng thương hiệu của bạn.",
  responsibility: "Cam kết thiết kế nội dung chuyên nghiệp, báo cáo số liệu rõ ràng và liên tục cập nhật xu hướng mới nhất của Instagram để thương hiệu bạn luôn đi đầu.",
  tabs: [
    {
      label: "Xây Dựng Profile",
      packages: [
        { name: "Gói Basic", price: "1.300.000đ", features: ["Bio + Highlight thiết kế", "8 post/tháng", "Caption chuẩn SEO"], allFeatures: ["Bio + Highlight thiết kế", "8 post/tháng", "15 post/tháng", "Caption chuẩn SEO", "Story hàng ngày", "Reels 4 video", "Hashtag strategy"], audioText: "Gói Basic giúp profile Instagram của bạn trở nên chuyên nghiệp với 8 bài đăng được thiết kế đẹp mỗi tháng." },
        { name: "Gói Standard", price: "2.300.000đ", popular: true, features: ["Bio + Highlight thiết kế", "15 post/tháng", "Caption chuẩn SEO", "Story hàng ngày", "Reels 4 video"], allFeatures: ["Bio + Highlight thiết kế", "8 post/tháng", "15 post/tháng", "Caption chuẩn SEO", "Story hàng ngày", "Reels 4 video", "Hashtag strategy"], audioText: "Gói Standard với 15 post, Story hàng ngày và 4 Reels mỗi tháng — combo hoàn hảo để xây dựng engagement mạnh mẽ." },
        { name: "Gói Premium", price: "3.800.000đ", features: ["Bio + Highlight thiết kế", "15 post/tháng", "Caption chuẩn SEO", "Story hàng ngày", "Reels 4 video", "Hashtag strategy"], allFeatures: ["Bio + Highlight thiết kế", "8 post/tháng", "15 post/tháng", "Caption chuẩn SEO", "Story hàng ngày", "Reels 4 video", "Hashtag strategy"], audioText: "Gói Premium bao gồm chiến lược hashtag chuyên sâu giúp tăng organic reach đáng kể và xây dựng cộng đồng bền vững." },
      ],
    },
    {
      label: "Chăm Sóc Content",
      packages: [
        { name: "Gói 12 Posts", price: "2.000.000đ", features: ["12 post/tháng", "Caption sáng tạo", "2 Reels/tháng"], allFeatures: ["12 post/tháng", "24 post/tháng", "Caption sáng tạo", "Story 5 ngày/tuần", "2 Reels/tháng", "8 Reels/tháng", "Carousel design"], audioText: "Gói 12 Posts với nội dung sáng tạo và 2 Reels giúp duy trì sự hiện diện đều đặn trên Instagram." },
        { name: "Gói 24 Posts", price: "3.500.000đ", popular: true, features: ["24 post/tháng", "Caption sáng tạo", "Story 5 ngày/tuần", "8 Reels/tháng"], allFeatures: ["12 post/tháng", "24 post/tháng", "Caption sáng tạo", "Story 5 ngày/tuần", "2 Reels/tháng", "8 Reels/tháng", "Carousel design"], audioText: "Gói 24 Posts với Story 5 ngày và 8 Reels mỗi tháng — đảm bảo thuật toán luôn đẩy nội dung của bạn đến nhiều người hơn." },
        { name: "Gói Full", price: "6.000.000đ", features: ["24 post/tháng", "Caption sáng tạo", "Story 5 ngày/tuần", "8 Reels/tháng", "Carousel design"], allFeatures: ["12 post/tháng", "24 post/tháng", "Caption sáng tạo", "Story 5 ngày/tuần", "2 Reels/tháng", "8 Reels/tháng", "Carousel design"], audioText: "Gói Full chăm sóc toàn diện với Carousel design bắt mắt và chiến lược nội dung được cá nhân hóa theo thương hiệu của bạn." },
      ],
    },
    {
      label: "Instagram Ads",
      packages: [
        { name: "Gói Basic", price: "4.500.000đ", features: ["Ngân sách Ads: 3tr", "Photo + Story Ads", "Target cơ bản"], allFeatures: ["Ngân sách Ads: 3tr", "Ngân sách Ads: 7tr", "Ngân sách Ads: 14tr", "Photo + Story Ads", "Reels Ads", "Shopping Ads", "Target cơ bản", "Lookalike Audience"], audioText: "Gói Instagram Ads Basic với 3 triệu ngân sách, chạy Photo và Story Ads để tăng brand awareness hiệu quả." },
        { name: "Gói Pro", price: "9.000.000đ", popular: true, features: ["Ngân sách Ads: 7tr", "Photo + Story Ads", "Reels Ads", "Lookalike Audience"], allFeatures: ["Ngân sách Ads: 3tr", "Ngân sách Ads: 7tr", "Ngân sách Ads: 14tr", "Photo + Story Ads", "Reels Ads", "Shopping Ads", "Target cơ bản", "Lookalike Audience"], audioText: "Gói Pro với Reels Ads và Lookalike Audience giúp tiếp cận đúng tệp khách hàng tiềm năng với chi phí tối ưu." },
        { name: "Gói VIP", price: "18.000.000đ", features: ["Ngân sách Ads: 14tr", "Photo + Story Ads", "Reels Ads", "Shopping Ads", "Lookalike Audience"], allFeatures: ["Ngân sách Ads: 3tr", "Ngân sách Ads: 7tr", "Ngân sách Ads: 14tr", "Photo + Story Ads", "Reels Ads", "Shopping Ads", "Target cơ bản", "Lookalike Audience"], audioText: "Gói VIP tích hợp Shopping Ads giúp bán hàng trực tiếp từ Instagram với ROI tối đa nhất." },
      ],
    },
  ],
  stats: [{ label: "Tài khoản", value: "250+" }, { label: "Dự án", value: "600+" }, { label: "Hài lòng", value: "97%" }, { label: "Năm KN", value: "4+" }],
  process: [
    { step: 1, title: "Nghiên cứu thương hiệu", desc: "Phân tích nhận diện thương hiệu, màu sắc và phong cách để tạo feed Instagram nhất quán." },
    { step: 2, title: "Lên kế hoạch nội dung", desc: "Lập lịch đăng bài, thiết kế grid feed thống nhất và xây dựng content calendar hàng tháng." },
    { step: 3, title: "Sản xuất nội dung", desc: "Thiết kế ảnh/video chất lượng cao, viết caption thu hút và tối ưu hashtag." },
    { step: 4, title: "Đăng & Tương tác", desc: "Đăng đúng giờ vàng, trả lời comment/DM và tương tác với cộng đồng để tăng engagement." },
    { step: 5, title: "Báo cáo & Phát triển", desc: "Phân tích Insights, đề xuất cải tiến và mở rộng chiến lược dựa trên dữ liệu thực tế." },
  ],
  faqs: [
    { q: "Feed Instagram có cần thiết kế theo theme không?", a: "Có, feed nhất quán giúp profile trông chuyên nghiệp hơn và tăng tỷ lệ Follow khi ai đó ghé thăm trang của bạn." },
    { q: "Reels hay Post hiệu quả hơn?", a: "Hiện tại Reels được thuật toán ưu tiên hơn, reach thường cao gấp 3-5 lần so với Post thông thường." },
    { q: "Có cần thiết bị chuyên nghiệp để quay không?", a: "Không nhất thiết. Điện thoại cập nhật với camera tốt là đủ. Chúng tôi sẽ hỗ trợ kỹ thuật quay và ánh sáng." },
    { q: "Influencer Marketing có phù hợp không?", a: "Rất phù hợp với Instagram. Chúng tôi có mạng lưới 200+ KOL/Influencer sẵn sàng hợp tác theo dạng review sản phẩm." },
    { q: "Bao lâu đạt 1K follower?", a: "Với chiến lược đúng và content chất lượng, thường đạt 1K follower trong 1-2 tháng đầu." },
  ],
};

export default function InstagramPage() {
  return <PlatformPage config={config} />;
}



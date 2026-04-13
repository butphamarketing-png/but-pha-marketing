"use client";
import { PlatformPage, PlatformConfig } from "@/components/shared/PlatformPage";

const config: PlatformConfig = {
  name: "TikTok",
  color: "#FF0050",
  auditPlatform: "tiktok",
  vision: "Chúng tôi tiên phong trong việc giúp doanh nghiệp Việt khai thác sức mạnh của TikTok — nền tảng có tốc độ tăng trưởng nhanh nhất, mang lại cơ hội viral và tiếp cận hàng triệu khách hàng tiềm năng.",
  mission: "Sứ mệnh của chúng tôi là sản xuất nội dung TikTok sáng tạo, triển khai chiến dịch Ads hiệu quả, và xây dựng cộng đồng người theo dõi trung thành cho thương hiệu của bạn.",
  responsibility: "Chúng tôi cam kết mang lại nội dung chất lượng cao, báo cáo số liệu minh bạch và đồng hành cùng khách hàng trong từng bước tăng trưởng trên TikTok.",
  tabs: [
    {
      label: "Xây Dựng Kênh",
      packages: [
        { name: "Gói Starter", price: "1.200.000đ", features: ["Tối ưu profile TikTok", "5 video/tháng", "Hỗ trợ kịch bản"], allFeatures: ["Tối ưu profile TikTok", "5 video/tháng", "10 video/tháng", "Hỗ trợ kịch bản", "Chỉnh sửa chuyên nghiệp", "Strategy tăng Follow", "Trending sound"], audioText: "Gói Starter giúp bạn bắt đầu hành trình TikTok với 5 video chất lượng mỗi tháng và kịch bản được hỗ trợ." },
        { name: "Gói Pro", price: "2.200.000đ", popular: true, features: ["Tối ưu profile TikTok", "10 video/tháng", "Hỗ trợ kịch bản", "Chỉnh sửa chuyên nghiệp", "Strategy tăng Follow"], allFeatures: ["Tối ưu profile TikTok", "5 video/tháng", "10 video/tháng", "Hỗ trợ kịch bản", "Chỉnh sửa chuyên nghiệp", "Strategy tăng Follow", "Trending sound"], audioText: "Gói Pro với 10 video được chỉnh sửa chuyên nghiệp và chiến lược tăng Follow có hệ thống, giúp kênh bạn bứt phá nhanh chóng." },
        { name: "Gói Elite", price: "3.800.000đ", features: ["Tối ưu profile TikTok", "10 video/tháng", "Hỗ trợ kịch bản", "Chỉnh sửa chuyên nghiệp", "Strategy tăng Follow", "Trending sound"], allFeatures: ["Tối ưu profile TikTok", "5 video/tháng", "10 video/tháng", "Hỗ trợ kịch bản", "Chỉnh sửa chuyên nghiệp", "Strategy tăng Follow", "Trending sound"], audioText: "Gói Elite là lựa chọn tối ưu nhất bao gồm tất cả dịch vụ từ trending sound đến chiến lược viral toàn diện." },
      ],
    },
    {
      label: "Sản Xuất Content",
      packages: [
        { name: "Gói 8 Video", price: "2.500.000đ", features: ["8 video/tháng", "Script cơ bản", "Edit cơ bản", "Caption + hashtag"], allFeatures: ["8 video/tháng", "16 video/tháng", "Script cơ bản", "Script chuyên sâu", "Edit cơ bản", "Edit nâng cao", "Caption + hashtag", "Thumbnail thiết kế", "Motion graphic"], audioText: "Gói 8 Video cung cấp 8 video chất lượng mỗi tháng với script và edit chuyên nghiệp, tối ưu hashtag để tăng reach tự nhiên." },
        { name: "Gói 16 Video", price: "4.500.000đ", popular: true, features: ["16 video/tháng", "Script chuyên sâu", "Edit nâng cao", "Caption + hashtag", "Thumbnail thiết kế"], allFeatures: ["8 video/tháng", "16 video/tháng", "Script cơ bản", "Script chuyên sâu", "Edit cơ bản", "Edit nâng cao", "Caption + hashtag", "Thumbnail thiết kế", "Motion graphic"], audioText: "Gói 16 Video với script chuyên sâu và edit nâng cao, thumbnail thiết kế bắt mắt giúp video của bạn nổi bật trên For You Page." },
        { name: "Gói Unlimited", price: "8.000.000đ", features: ["16 video/tháng", "Script chuyên sâu", "Edit nâng cao", "Caption + hashtag", "Thumbnail thiết kế", "Motion graphic"], allFeatures: ["8 video/tháng", "16 video/tháng", "Script cơ bản", "Script chuyên sâu", "Edit cơ bản", "Edit nâng cao", "Caption + hashtag", "Thumbnail thiết kế", "Motion graphic"], audioText: "Gói Unlimited là giải pháp sản xuất content toàn diện nhất với motion graphic và không giới hạn số lượng sửa đổi." },
      ],
    },
    {
      label: "TikTok Ads",
      packages: [
        { name: "Gói Cơ Bản", price: "4.000.000đ", features: ["Ngân sách Ads: 3tr", "2 chiến dịch", "Target cơ bản", "Báo cáo tuần"], allFeatures: ["Ngân sách Ads: 3tr", "Ngân sách Ads: 6.5tr", "Ngân sách Ads: 13tr", "2 chiến dịch", "5 chiến dịch", "Không giới hạn", "Target cơ bản", "Target nâng cao", "Retargeting", "Báo cáo tuần"], audioText: "Gói TikTok Ads Cơ Bản với 3 triệu ngân sách là lý tưởng để thử nghiệm và đo lường hiệu quả quảng cáo trên TikTok." },
        { name: "Gói Pro", price: "8.000.000đ", popular: true, features: ["Ngân sách Ads: 6.5tr", "5 chiến dịch", "Target nâng cao", "Retargeting", "Báo cáo tuần"], allFeatures: ["Ngân sách Ads: 3tr", "Ngân sách Ads: 6.5tr", "Ngân sách Ads: 13tr", "2 chiến dịch", "5 chiến dịch", "Không giới hạn", "Target cơ bản", "Target nâng cao", "Retargeting", "Báo cáo tuần"], audioText: "Gói TikTok Ads Pro với Retargeting và target nâng cao mang lại tỷ lệ chuyển đổi cao hơn 3 lần so với chạy thông thường." },
        { name: "Gói VIP", price: "15.000.000đ", features: ["Ngân sách Ads: 13tr", "Không giới hạn chiến dịch", "Target nâng cao", "Retargeting", "Báo cáo tuần"], allFeatures: ["Ngân sách Ads: 3tr", "Ngân sách Ads: 6.5tr", "Ngân sách Ads: 13tr", "2 chiến dịch", "5 chiến dịch", "Không giới hạn", "Target cơ bản", "Target nâng cao", "Retargeting", "Báo cáo tuần"], audioText: "Gói TikTok Ads VIP dành cho thương hiệu muốn thống lĩnh TikTok với 13 triệu ngân sách và không giới hạn chiến dịch." },
      ],
    },
  ],
  stats: [{ label: "Kênh TikTok", value: "300+" }, { label: "Video sản xuất", value: "800+" }, { label: "Hài lòng", value: "95%" }, { label: "Năm KN", value: "3+" }],
  process: [
    { step: 1, title: "Phân tích thị trường", desc: "Nghiên cứu đối thủ, xu hướng và target audience phù hợp với ngành hàng của bạn." },
    { step: 2, title: "Lên kế hoạch content", desc: "Xây dựng lịch đăng bài, kịch bản video và concept sáng tạo phù hợp với thuật toán TikTok." },
    { step: 3, title: "Sản xuất & Edit", desc: "Quay phim, chỉnh sửa chuyên nghiệp với hiệu ứng trending để tăng khả năng viral." },
    { step: 4, title: "Đăng & Tối ưu", desc: "Đăng đúng khung giờ vàng, tối ưu hashtag, caption và theo dõi phản ứng cộng đồng." },
    { step: 5, title: "Phân tích & Scale", desc: "Phân tích video hiệu quả, nhân rộng format thành công và liên tục cải thiện chiến lược." },
  ],
  faqs: [
    { q: "Kênh mới có thể viral không?", a: "Có! TikTok ưu tiên nội dung chất lượng hơn số lượng follower. Nhiều kênh mới của chúng tôi đã có video triệu view trong tháng đầu." },
    { q: "Cần quay video hay agency quay hộ?", a: "Tùy gói. Gói cơ bản chúng tôi hỗ trợ kịch bản để bạn tự quay. Gói cao cấp hơn chúng tôi quay và edit hoàn toàn." },
    { q: "TikTok Ads có đắt hơn Facebook không?", a: "Chi phí CPM của TikTok thường thấp hơn Facebook 40-60%, đặc biệt hiệu quả với target nhóm 18-35 tuổi." },
    { q: "Bao lâu thì kênh đạt 10K follower?", a: "Với chiến lược đúng đắn, kênh mới thường đạt 5K-10K trong 2-3 tháng. Tốc độ phụ thuộc vào ngành hàng và chất lượng content." },
    { q: "Có thể chạy cả TikTok Shop không?", a: "Có. Chúng tôi tư vấn và triển khai TikTok Shop tích hợp với kênh nội dung để tối ưu doanh thu." },
  ],
};

export default function TiktokPage() {
  return <PlatformPage config={config} />;
}



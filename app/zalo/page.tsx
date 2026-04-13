"use client";
import { PlatformPage, PlatformConfig } from "@/components/shared/PlatformPage";

const config: PlatformConfig = {
  name: "Zalo",
  color: "#0068FF",
  auditPlatform: "zalo",
  vision: "Khai thác tối đa tiềm năng của Zalo — mạng xã hội nội địa số 1 Việt Nam với 75 triệu người dùng, để kết nối doanh nghiệp với khách hàng một cách gần gũi và hiệu quả nhất.",
  mission: "Chúng tôi xây dựng Zalo Official Account chuyên nghiệp, triển khai chiến dịch Zalo Ads và tạo ra các kịch bản chăm sóc khách hàng qua Zalo để tăng tỷ lệ mua lại.",
  responsibility: "Cam kết setup hệ thống Zalo Marketing bài bản, hỗ trợ tư vấn 24/7 qua chính Zalo và mang lại ROI đo lường được từ mỗi chiến dịch.",
  tabs: [
    {
      label: "Zalo Official Account",
      packages: [
        { name: "Gói Cơ Bản", price: "1.000.000đ", features: ["Setup Zalo OA", "8 bài viết/tháng", "Hỗ trợ verify OA"], allFeatures: ["Setup Zalo OA", "8 bài viết/tháng", "15 bài viết/tháng", "Hỗ trợ verify OA", "Chatbot cơ bản", "Auto-reply nâng cao", "Kịch bản chăm sóc"], audioText: "Gói Cơ Bản giúp bạn có Zalo OA chuyên nghiệp với 8 bài viết mỗi tháng và hỗ trợ verify tài khoản." },
        { name: "Gói Nâng Cao", price: "2.000.000đ", popular: true, features: ["Setup Zalo OA", "15 bài viết/tháng", "Hỗ trợ verify OA", "Chatbot cơ bản", "Auto-reply nâng cao"], allFeatures: ["Setup Zalo OA", "8 bài viết/tháng", "15 bài viết/tháng", "Hỗ trợ verify OA", "Chatbot cơ bản", "Auto-reply nâng cao", "Kịch bản chăm sóc"], audioText: "Gói Nâng Cao với Chatbot và Auto-reply giúp tự động hóa chăm sóc khách hàng 24/7, không bỏ lỡ bất kỳ tin nhắn nào." },
        { name: "Gói VIP", price: "3.500.000đ", features: ["Setup Zalo OA", "15 bài viết/tháng", "Hỗ trợ verify OA", "Chatbot cơ bản", "Auto-reply nâng cao", "Kịch bản chăm sóc"], allFeatures: ["Setup Zalo OA", "8 bài viết/tháng", "15 bài viết/tháng", "Hỗ trợ verify OA", "Chatbot cơ bản", "Auto-reply nâng cao", "Kịch bản chăm sóc"], audioText: "Gói VIP với kịch bản chăm sóc khách hàng được thiết kế bài bản giúp tăng tỷ lệ mua lại lên 40-60%." },
      ],
    },
    {
      label: "Chăm Sóc Zalo",
      packages: [
        { name: "Gói Starter", price: "1.500.000đ", features: ["Gửi broadcast 2 lần/tháng", "Reply tin nhắn", "Báo cáo cơ bản"], allFeatures: ["Gửi broadcast 2 lần/tháng", "Broadcast không giới hạn", "Reply tin nhắn", "Reply 24/7", "Báo cáo cơ bản", "Phân loại khách hàng", "CRM tích hợp"], audioText: "Gói Starter với 2 lần broadcast mỗi tháng giúp duy trì kết nối thường xuyên với tệp khách hàng Zalo của bạn." },
        { name: "Gói Pro", price: "2.800.000đ", popular: true, features: ["Broadcast không giới hạn", "Reply 24/7", "Báo cáo cơ bản", "Phân loại khách hàng"], allFeatures: ["Gửi broadcast 2 lần/tháng", "Broadcast không giới hạn", "Reply tin nhắn", "Reply 24/7", "Báo cáo cơ bản", "Phân loại khách hàng", "CRM tích hợp"], audioText: "Gói Pro với Broadcast không giới hạn và phân loại khách hàng thông minh giúp cá nhân hóa trải nghiệm mua hàng." },
        { name: "Gói Enterprise", price: "5.000.000đ", features: ["Broadcast không giới hạn", "Reply 24/7", "Báo cáo cơ bản", "Phân loại khách hàng", "CRM tích hợp"], allFeatures: ["Gửi broadcast 2 lần/tháng", "Broadcast không giới hạn", "Reply tin nhắn", "Reply 24/7", "Báo cáo cơ bản", "Phân loại khách hàng", "CRM tích hợp"], audioText: "Gói Enterprise tích hợp CRM giúp quản lý toàn bộ hành trình khách hàng từ lần đầu liên hệ đến mua lại." },
      ],
    },
    {
      label: "Zalo Ads",
      packages: [
        { name: "Gói Basic", price: "3.500.000đ", features: ["Ngân sách Ads: 2.5tr", "1 chiến dịch", "Target cơ bản"], allFeatures: ["Ngân sách Ads: 2.5tr", "Ngân sách Ads: 5.5tr", "Ngân sách Ads: 11tr", "1 chiến dịch", "3 chiến dịch", "Không giới hạn", "Target cơ bản", "Target theo vùng", "Retargeting"], audioText: "Zalo Ads Basic với 2.5 triệu ngân sách là lựa chọn tiết kiệm để tiếp cận khách hàng trong bán kính địa lý gần cửa hàng." },
        { name: "Gói Pro", price: "7.000.000đ", popular: true, features: ["Ngân sách Ads: 5.5tr", "3 chiến dịch", "Target theo vùng", "Retargeting"], allFeatures: ["Ngân sách Ads: 2.5tr", "Ngân sách Ads: 5.5tr", "Ngân sách Ads: 11tr", "1 chiến dịch", "3 chiến dịch", "Không giới hạn", "Target cơ bản", "Target theo vùng", "Retargeting"], audioText: "Zalo Ads Pro với Retargeting và target theo vùng địa lý giúp bạn tiếp cận đúng khách hàng tiềm năng nhất." },
        { name: "Gói VIP", price: "14.000.000đ", features: ["Ngân sách Ads: 11tr", "Không giới hạn chiến dịch", "Target theo vùng", "Retargeting"], allFeatures: ["Ngân sách Ads: 2.5tr", "Ngân sách Ads: 5.5tr", "Ngân sách Ads: 11tr", "1 chiến dịch", "3 chiến dịch", "Không giới hạn", "Target cơ bản", "Target theo vùng", "Retargeting"], audioText: "Gói Zalo Ads VIP toàn diện nhất với 11 triệu ngân sách và không giới hạn chiến dịch để bứt phá doanh số." },
      ],
    },
  ],
  stats: [{ label: "Zalo OA", value: "200+" }, { label: "Dự án", value: "450+" }, { label: "Hài lòng", value: "96%" }, { label: "Năm KN", value: "3+" }],
  process: [
    { step: 1, title: "Setup Zalo OA", desc: "Tạo và tối ưu hóa Zalo Official Account, thiết kế banner, danh mục sản phẩm và kịch bản Welcome." },
    { step: 2, title: "Xây dựng content", desc: "Lên kế hoạch nội dung tin tức, bài viết và broadcast messages phù hợp với khách hàng Zalo." },
    { step: 3, title: "Triển khai Chatbot", desc: "Cài đặt auto-reply, chatbot tư vấn và phân loại khách hàng tự động." },
    { step: 4, title: "Chạy Zalo Ads", desc: "Triển khai chiến dịch quảng cáo target theo vị trí địa lý, độ tuổi và hành vi." },
    { step: 5, title: "Nurture & Convert", desc: "Gửi broadcast định kỳ, theo dõi hành trình khách hàng và tối ưu tỷ lệ chuyển đổi." },
  ],
  faqs: [
    { q: "Zalo OA khác gì Zalo cá nhân?", a: "Zalo OA (Official Account) là tài khoản doanh nghiệp chính thức với logo, danh mục dịch vụ, và khả năng broadcast đến toàn bộ người follow." },
    { q: "Có cần follow mới nhận broadcast không?", a: "Đúng. Chỉ người đã follow OA mới nhận được tin broadcast. Vì vậy tăng follow OA là ưu tiên ban đầu." },
    { q: "Zalo Ads có hiệu quả cho kinh doanh địa phương không?", a: "Rất hiệu quả! Zalo Ads có khả năng target theo bán kính địa lý rất chính xác, phù hợp cho F&B, spa, phòng khám..." },
    { q: "Chatbot Zalo phức tạp không?", a: "Không. Chúng tôi thiết lập toàn bộ chatbot, bạn chỉ cần review và approve nội dung." },
    { q: "Có thể tích hợp Zalo với CRM hiện tại không?", a: "Có. Zalo API cho phép tích hợp với nhiều CRM phổ biến. Chúng tôi sẽ tư vấn giải pháp phù hợp nhất." },
  ],
};

export default function ZaloPage() {
  return <PlatformPage config={config} />;
}



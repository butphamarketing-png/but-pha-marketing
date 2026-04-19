import { PlatformPage, PlatformConfig } from "@/components/shared/PlatformPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dịch vụ Facebook Marketing",
  description:
    "Giải pháp Facebook Marketing trọn gói: xây dựng fanpage, chăm sóc nội dung và triển khai Facebook Ads để tăng lead và doanh thu.",
  path: "/facebook",
  keywords: ["facebook marketing", "facebook ads", "quản trị fanpage", "chạy quảng cáo facebook"],
});

const config: PlatformConfig = {
  name: "Facebook",
  color: "#1877F2",
  auditPlatform: "facebook",
  vision: "Chúng tôi hướng đến trở thành đối tác chiến lược số 1 về Marketing Facebook tại Việt Nam, giúp hàng nghìn doanh nghiệp xây dựng sự hiện diện mạnh mẽ và bền vững trên nền tảng mạng xã hội lớn nhất thế giới.",
  mission: "Sứ mệnh của chúng tôi là mang lại giải pháp Facebook Marketing toàn diện, từ xây dựng Fanpage chuyên nghiệp đến triển khai chiến dịch quảng cáo hiệu quả, giúp doanh nghiệp tăng trưởng doanh thu bền vững.",
  responsibility: "Chúng tôi cam kết minh bạch trong từng đồng ngân sách, báo cáo kết quả thực tế hàng tuần, và chịu trách nhiệm hoàn toàn với hiệu quả mang lại cho khách hàng.",
  tabs: [
    {
      label: "Xây Dựng Fanpage",
      packages: [
        {
          name: "Gói Cơ Bản",
          price: "1.500.000đ",
          features: ["Thiết kế ảnh bìa + avatar", "Tối ưu thông tin trang", "10 bài đăng/tháng", "Hỗ trợ qua Zalo"],
          allFeatures: ["Thiết kế ảnh bìa + avatar", "Tối ưu thông tin trang", "10 bài đăng/tháng", "20 bài đăng/tháng", "Hỗ trợ qua Zalo", "Hỗ trợ 24/7", "Thiết kế album sản phẩm", "Chiến lược nội dung"],
          audioText: "Gói Cơ Bản dành cho doanh nghiệp mới bắt đầu. Chúng tôi sẽ thiết kế Fanpage chuyên nghiệp và đăng 10 bài mỗi tháng với chi phí tiết kiệm chỉ 1.5 triệu đồng.",
        },
        {
          name: "Gói Chuyên Nghiệp",
          price: "2.500.000đ",
          popular: true,
          features: ["Thiết kế ảnh bìa + avatar", "Tối ưu thông tin trang", "20 bài đăng/tháng", "Hỗ trợ 24/7", "Thiết kế album sản phẩm"],
          allFeatures: ["Thiết kế ảnh bìa + avatar", "Tối ưu thông tin trang", "10 bài đăng/tháng", "20 bài đăng/tháng", "Hỗ trợ qua Zalo", "Hỗ trợ 24/7", "Thiết kế album sản phẩm", "Chiến lược nội dung"],
          audioText: "Gói Chuyên Nghiệp là lựa chọn tốt nhất với 20 bài đăng chất lượng mỗi tháng, hỗ trợ 24/7 và thiết kế album sản phẩm chuyên nghiệp, giúp Fanpage của bạn nổi bật hoàn toàn.",
        },
        {
          name: "Gói VIP",
          price: "4.000.000đ",
          features: ["Thiết kế ảnh bìa + avatar", "Tối ưu thông tin trang", "20 bài đăng/tháng", "Hỗ trợ 24/7", "Thiết kế album sản phẩm", "Chiến lược nội dung"],
          allFeatures: ["Thiết kế ảnh bìa + avatar", "Tối ưu thông tin trang", "10 bài đăng/tháng", "20 bài đăng/tháng", "Hỗ trợ qua Zalo", "Hỗ trợ 24/7", "Thiết kế album sản phẩm", "Chiến lược nội dung"],
          audioText: "Gói VIP mang đến trải nghiệm toàn diện nhất với chiến lược nội dung được lên kế hoạch bài bản, thiết kế đỉnh cao và đội ngũ chuyên gia luôn đồng hành.",
        },
      ],
    },
    {
      label: "Chăm Sóc Fanpage",
      packages: [
        { name: "Gói Starter", price: "2.000.000đ", features: ["Đăng 12 bài/tháng", "Reply comment cơ bản", "Báo cáo tuần"], allFeatures: ["Đăng 12 bài/tháng", "Đăng 20 bài/tháng", "Reply comment cơ bản", "Reply 24/7", "Báo cáo tuần", "Báo cáo chi tiết", "Tăng follow organic", "Seeding bài viết"], audioText: "Gói Starter giúp Fanpage của bạn luôn hoạt động đều đặn với 12 bài chất lượng mỗi tháng và báo cáo hàng tuần." },
        { name: "Gói Growth", price: "3.500.000đ", popular: true, features: ["Đăng 20 bài/tháng", "Reply 24/7", "Báo cáo chi tiết", "Tăng follow organic"], allFeatures: ["Đăng 12 bài/tháng", "Đăng 20 bài/tháng", "Reply comment cơ bản", "Reply 24/7", "Báo cáo tuần", "Báo cáo chi tiết", "Tăng follow organic", "Seeding bài viết"], audioText: "Gói Growth tối ưu hóa sự tăng trưởng với 20 bài viết, phản hồi 24/7 và chiến lược tăng Follow organic hiệu quả." },
        { name: "Gói Premium", price: "6.000.000đ", features: ["Đăng 20 bài/tháng", "Reply 24/7", "Báo cáo chi tiết", "Tăng follow organic", "Seeding bài viết"], allFeatures: ["Đăng 12 bài/tháng", "Đăng 20 bài/tháng", "Reply comment cơ bản", "Reply 24/7", "Báo cáo tuần", "Báo cáo chi tiết", "Tăng follow organic", "Seeding bài viết"], audioText: "Gói Premium là giải pháp toàn diện nhất, bao gồm seeding bài viết và chiến lược tăng trưởng cộng đồng mạnh mẽ." },
      ],
    },
    {
      label: "Quảng Cáo Facebook Ads",
      packages: [
        { name: "Gói Ads Cơ Bản", price: "5.000.000đ", features: ["Ngân sách Ads: 3tr", "2 chiến dịch/tháng", "Tối ưu target cơ bản", "Báo cáo hàng tuần"], allFeatures: ["Ngân sách Ads: 3tr", "Ngân sách Ads: 8tr", "Ngân sách Ads: 16tr", "2 chiến dịch/tháng", "5 chiến dịch/tháng", "Không giới hạn", "Tối ưu target cơ bản", "Tối ưu target nâng cao", "Retargeting", "A/B Testing", "Báo cáo hàng tuần"], audioText: "Gói Ads Cơ Bản phù hợp cho doanh nghiệp mới chạy Ads, với 3 triệu ngân sách và 2 chiến dịch được quản lý chuyên nghiệp mỗi tháng." },
        { name: "Gói Ads Pro", price: "10.000.000đ", popular: true, features: ["Ngân sách Ads: 8tr", "5 chiến dịch/tháng", "Tối ưu target nâng cao", "Retargeting", "A/B Testing"], allFeatures: ["Ngân sách Ads: 3tr", "Ngân sách Ads: 8tr", "Ngân sách Ads: 16tr", "2 chiến dịch/tháng", "5 chiến dịch/tháng", "Không giới hạn", "Tối ưu target cơ bản", "Tối ưu target nâng cao", "Retargeting", "A/B Testing", "Báo cáo hàng tuần"], audioText: "Gói Ads Pro với 8 triệu ngân sách, Retargeting và A/B Testing giúp tối ưu chi phí và tăng tỷ lệ chuyển đổi đáng kể." },
        { name: "Gói Ads VIP", price: "20.000.000đ", features: ["Ngân sách Ads: 16tr", "Không giới hạn chiến dịch", "Tối ưu target nâng cao", "Retargeting", "A/B Testing", "Báo cáo hàng tuần"], allFeatures: ["Ngân sách Ads: 3tr", "Ngân sách Ads: 8tr", "Ngân sách Ads: 16tr", "2 chiến dịch/tháng", "5 chiến dịch/tháng", "Không giới hạn", "Tối ưu target cơ bản", "Tối ưu target nâng cao", "Retargeting", "A/B Testing", "Báo cáo hàng tuần"], audioText: "Gói Ads VIP dành cho doanh nghiệp muốn bứt phá doanh số, với 16 triệu ngân sách không giới hạn chiến dịch và chiến lược quảng cáo toàn diện nhất." },
      ],
    },
  ],
  stats: [{ label: "Khách hàng", value: "500+" }, { label: "Dự án", value: "1.200+" }, { label: "Hài lòng", value: "98%" }, { label: "Năm KN", value: "5+" }],
  process: [
    { step: 1, title: "Tư vấn & Phân tích", desc: "Chúng tôi lắng nghe nhu cầu, phân tích thị trường và đề xuất giải pháp phù hợp nhất cho doanh nghiệp của bạn." },
    { step: 2, title: "Lên kế hoạch", desc: "Xây dựng kế hoạch nội dung chi tiết, chiến lược target khách hàng và lịch triển khai cụ thể." },
    { step: 3, title: "Triển khai", desc: "Thực hiện đúng kế hoạch, đăng bài đúng giờ, quản lý quảng cáo và tương tác với cộng đồng hàng ngày." },
    { step: 4, title: "Theo dõi & Tối ưu", desc: "Theo dõi số liệu thực tế, điều chỉnh chiến lược và tối ưu liên tục để đạt kết quả tốt nhất." },
    { step: 5, title: "Báo cáo & Tăng trưởng", desc: "Báo cáo minh bạch định kỳ, đề xuất hướng phát triển và mở rộng quy mô khi đã có kết quả ổn định." },
  ],
  faqs: [
    { q: "Bao lâu thì thấy kết quả từ Facebook Ads?", a: "Thông thường sau 7-14 ngày chạy Ads, bạn sẽ thấy kết quả ban đầu. Để tối ưu hoàn toàn thường cần 1-2 tháng để thuật toán học và tối ưu." },
    { q: "Fanpage cần bao nhiêu like mới chạy Ads hiệu quả?", a: "Không cần số lượng like tối thiểu. Tuy nhiên Fanpage có từ 1.000 like trở lên thường có độ tin cậy cao hơn và hiệu quả Ads tốt hơn." },
    { q: "Chi phí quảng cáo có được hoàn lại nếu không hiệu quả?", a: "Ngân sách Ads được chi trả trực tiếp cho Facebook. Chúng tôi cam kết tối ưu liên tục và báo cáo minh bạch, nếu không đạt KPI cam kết sẽ làm thêm 1 tháng miễn phí." },
    { q: "Có thể tự chạy Ads song song với gói dịch vụ không?", a: "Được. Chúng tôi sẽ tư vấn để tránh xung đột ngân sách và target, đảm bảo hiệu quả tổng thể tốt nhất." },
    { q: "Báo cáo kết quả như thế nào?", a: "Báo cáo hàng tuần qua Zalo/Email bao gồm: số lượt tiếp cận, tương tác, chuyển đổi, chi phí/kết quả và đề xuất tuần tiếp theo." },
  ],
};

export default function FacebookPage() {
  return <PlatformPage config={config} />;
}



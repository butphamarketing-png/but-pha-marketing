"use client";
import { PlatformPage, PlatformConfig } from "@/components/shared/PlatformPage";

const config: PlatformConfig = {
  name: "Google Maps",
  color: "#EA4335",
  auditPlatform: "googlemaps",
  vision: "Giúp doanh nghiệp của bạn xuất hiện đầu tiên khi khách hàng tìm kiếm trên Google Maps và Google Search — kênh tìm kiếm có ý định mua hàng cao nhất hiện nay.",
  mission: "Tối ưu hóa Google Business Profile, xây dựng đánh giá 5 sao uy tín và triển khai chiến lược Local SEO để doanh nghiệp của bạn thống trị kết quả tìm kiếm địa phương.",
  responsibility: "Cam kết không dùng đánh giá giả mạo, chỉ áp dụng chiến lược White Hat được Google chấp nhận và đảm bảo thứ hạng bền vững lâu dài.",
  tabs: [
    {
      label: "Tạo & Tối Ưu GMB",
      packages: [
        { name: "Gói Basic", price: "800.000đ", features: ["Tạo Google Business", "Tối ưu thông tin cơ bản", "5 ảnh chuyên nghiệp"], allFeatures: ["Tạo Google Business", "Tối ưu thông tin cơ bản", "5 ảnh chuyên nghiệp", "15 ảnh + video", "Bài viết GMB hàng tuần", "Q&A tối ưu", "Category & attribute"], audioText: "Gói Basic giúp doanh nghiệp xuất hiện trên Google Maps với profile được tối ưu cơ bản và 5 ảnh chuyên nghiệp." },
        { name: "Gói Standard", price: "1.500.000đ", popular: true, features: ["Tạo Google Business", "Tối ưu thông tin cơ bản", "15 ảnh + video", "Bài viết GMB hàng tuần", "Q&A tối ưu"], allFeatures: ["Tạo Google Business", "Tối ưu thông tin cơ bản", "5 ảnh chuyên nghiệp", "15 ảnh + video", "Bài viết GMB hàng tuần", "Q&A tối ưu", "Category & attribute"], audioText: "Gói Standard với bài viết GMB hàng tuần và Q&A tối ưu giúp profile của bạn được Google đánh giá cao hơn và xếp hạng tốt hơn." },
        { name: "Gói Pro", price: "2.500.000đ", features: ["Tạo Google Business", "Tối ưu thông tin cơ bản", "15 ảnh + video", "Bài viết GMB hàng tuần", "Q&A tối ưu", "Category & attribute"], allFeatures: ["Tạo Google Business", "Tối ưu thông tin cơ bản", "5 ảnh chuyên nghiệp", "15 ảnh + video", "Bài viết GMB hàng tuần", "Q&A tối ưu", "Category & attribute"], audioText: "Gói Pro tối ưu toàn diện nhất với Category và Attribute được thiết lập chính xác giúp xuất hiện đúng từ khóa khách hàng đang tìm." },
      ],
    },
    {
      label: "SEO Local",
      packages: [
        { name: "Gói Local", price: "2.000.000đ", features: ["5 từ khóa địa phương", "On-page cơ bản", "Citation 10 website", "Báo cáo hàng tháng"], allFeatures: ["5 từ khóa địa phương", "15 từ khóa", "On-page cơ bản", "On-page toàn diện", "Citation 10 website", "Citation 30+ website", "Backlink Local", "Content SEO"], audioText: "Gói Local SEO tối ưu 5 từ khóa địa phương và xây dựng 10 citation, giúp doanh nghiệp xuất hiện trong Local Pack." },
        { name: "Gói City", price: "3.500.000đ", popular: true, features: ["15 từ khóa", "On-page toàn diện", "Citation 30+ website", "Backlink Local"], allFeatures: ["5 từ khóa địa phương", "15 từ khóa", "On-page cơ bản", "On-page toàn diện", "Citation 10 website", "Citation 30+ website", "Backlink Local", "Content SEO"], audioText: "Gói City SEO với 15 từ khóa, 30+ citation và backlink Local giúp thống lĩnh tìm kiếm trong toàn thành phố." },
        { name: "Gói Dominate", price: "6.000.000đ", features: ["15 từ khóa", "On-page toàn diện", "Citation 30+ website", "Backlink Local", "Content SEO"], allFeatures: ["5 từ khóa địa phương", "15 từ khóa", "On-page cơ bản", "On-page toàn diện", "Citation 10 website", "Citation 30+ website", "Backlink Local", "Content SEO"], audioText: "Gói Dominate với Content SEO đi kèm giúp bạn xuất hiện số 1 trong mọi tìm kiếm địa phương liên quan đến ngành hàng." },
      ],
    },
    {
      label: "Đánh Giá & Rating",
      packages: [
        { name: "Gói 20 Reviews", price: "1.500.000đ", features: ["20 đánh giá 5 sao", "Review từ tài khoản thật", "Đa dạng nội dung"], allFeatures: ["20 đánh giá 5 sao", "50 đánh giá 5 sao", "100 đánh giá 5 sao", "Review từ tài khoản thật", "Đa dạng nội dung", "Kèm ảnh minh họa", "Review video"], audioText: "Gói 20 Reviews với đánh giá từ tài khoản thật và nội dung đa dạng giúp tăng độ tin cậy ngay lập tức." },
        { name: "Gói 50 Reviews", price: "3.000.000đ", popular: true, features: ["50 đánh giá 5 sao", "Review từ tài khoản thật", "Đa dạng nội dung", "Kèm ảnh minh họa"], allFeatures: ["20 đánh giá 5 sao", "50 đánh giá 5 sao", "100 đánh giá 5 sao", "Review từ tài khoản thật", "Đa dạng nội dung", "Kèm ảnh minh họa", "Review video"], audioText: "Gói 50 Reviews với ảnh minh họa đi kèm giúp profile Google của bạn trở nên đáng tin cậy và thu hút khách hàng mới." },
        { name: "Gói 100 Reviews", price: "5.500.000đ", features: ["100 đánh giá 5 sao", "Review từ tài khoản thật", "Đa dạng nội dung", "Kèm ảnh minh họa", "Review video"], allFeatures: ["20 đánh giá 5 sao", "50 đánh giá 5 sao", "100 đánh giá 5 sao", "Review từ tài khoản thật", "Đa dạng nội dung", "Kèm ảnh minh họa", "Review video"], audioText: "Gói 100 Reviews toàn diện nhất với video review giúp doanh nghiệp đạt thứ hạng cao nhất trong Local Pack." },
      ],
    },
  ],
  stats: [{ label: "GMB tối ưu", value: "400+" }, { label: "Đánh giá", value: "900+" }, { label: "Đạt 5 sao", value: "99%" }, { label: "Năm KN", value: "4+" }],
  process: [
    { step: 1, title: "Audit hiện trạng", desc: "Kiểm tra Google Business Profile hiện tại, xác định điểm yếu và cơ hội cải thiện thứ hạng." },
    { step: 2, title: "Tối ưu Profile", desc: "Cập nhật thông tin đầy đủ, chính xác và nhất quán trên toàn bộ các directory." },
    { step: 3, title: "Xây dựng nội dung", desc: "Đăng bài viết, ảnh chuyên nghiệp và Q&A hàng tuần để tăng độ hoạt động." },
    { step: 4, title: "Thu thập đánh giá", desc: "Triển khai chiến lược thu thập review từ khách hàng thật và xây dựng phản hồi chuyên nghiệp." },
    { step: 5, title: "Theo dõi & Báo cáo", desc: "Theo dõi thứ hạng hàng tuần và báo cáo kết quả chi tiết hàng tháng." },
  ],
  faqs: [
    { q: "Bao lâu thì xuất hiện trong Local Pack 3?", a: "Tùy mức độ cạnh tranh của ngành và địa bàn. Thường từ 1-3 tháng để vào Local Pack và 3-6 tháng để đạt top 1." },
    { q: "Google có phạt nếu dùng review dịch vụ không?", a: "Chúng tôi chỉ dùng review từ tài khoản thật với nội dung tự nhiên, đảm bảo an toàn theo chính sách Google." },
    { q: "Có cần website mới làm Local SEO không?", a: "Không bắt buộc nhưng có website sẽ tăng hiệu quả SEO Local đáng kể. Chúng tôi có thể làm cả hai song song." },
    { q: "GMB có phù hợp cho kinh doanh online không?", a: "GMB chủ yếu phù hợp cho doanh nghiệp có địa điểm vật lý. Kinh doanh thuần online nên ưu tiên SEO website hoặc Ads." },
    { q: "Kết quả có bền vững không?", a: "Kết quả GMB và Local SEO thường bền vững hơn Ads vì dựa trên độ tin cậy tích lũy. Duy trì review tốt là chìa khóa." },
  ],
};

export default function GoogleMapsPage() {
  return <PlatformPage config={config} />;
}



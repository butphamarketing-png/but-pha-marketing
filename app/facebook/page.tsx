"use client";

import { useState } from "react";
import { PlatformPage, PlatformConfig, ConsultationModal } from "@/components/shared/PlatformPage";
import { Target, Rocket, Settings, UserCheck, Zap } from "lucide-react";
import { PlatformAuditSection } from "@/components/shared/PlatformAuditSection";
import { PackageCarousel } from "@/components/shared/PackageCarousel";
import { PricingTierCard } from "@/components/shared/PricingTierCard";
import { AuditModal } from "@/components/shared/AuditModal";
import { FANPAGE_BUILD_PACKAGES, FANPAGE_CARE_PACKAGES, formatPriceVnd } from "@/lib/service-pricing";

const BUILD_ICONS = [Settings, UserCheck, Rocket] as const;

const config: PlatformConfig = {
  name: "Facebook",
  color: "#1877F2",
  auditPlatform: "facebook",
  heroTitle: "Fanpage không chỉ để đăng bài",
  heroSubtitle: "Mà để tạo ra khách hàng",
  heroDescription: "Tối ưu nội dung – Tăng tương tác – Chuyển đổi tin nhắn",
  vision: "Chúng tôi hướng đến trở thành đối tác chiến lược số 1 về Marketing Facebook tại Việt Nam, giúp hàng nghìn doanh nghiệp xây dựng sự hiện diện mạnh mẽ và bền vững trên nền tảng mạng xã hội lớn nhất thế giới.",
  mission: "Sứ mệnh của chúng tôi là mang lại giải pháp Facebook Marketing toàn diện, từ xây dựng Fanpage chuyên nghiệp đến triển khai chiến dịch quảng cáo hiệu quả, giúp doanh nghiệp tăng trưởng doanh thu bền vững.",
  responsibility: "Chúng tôi cam kết minh bạch trong từng đồng ngân sách, báo cáo kết quả thực tế hàng tuần, và chịu trách nhiệm hoàn toàn với hiệu quả mang lại cho khách hàng.",
  tabs: [],
  hidePricingHeader: true,
  hideStats: true,
  hideContact: false,
  robotFilter: "hue-rotate(190deg) saturate(1.4) brightness(1.1)",
  customSections: [
    { id: "audit", label: "Chuẩn đoán Fanpage" },
    { id: "build", label: "Xây dựng Fanpage" },
    { id: "care", label: "Chăm sóc Fanpage" },
    { id: "ads", label: "Quảng cáo Fanpage" },
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
    { q: "Báo cáo kết quả như thế nào?", a: "Báo cáo hàng tuần qua Email/Messenger bao gồm: số lượt tiếp cận, tương tác, chuyển đổi, chi phí/kết quả và đề xuất tuần tiếp theo." },
  ],
};

export default function FacebookPage() {
  const [auditUrl, setAuditUrl] = useState("");
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [checkoutPkg, setCheckoutPkg] = useState<{ name: string; price: string; color: string; tabLabel: string } | null>(null);

  const handleOpenConsult = (pkgName: string, pkgPrice: string, tabLabel: string) => {
    setCheckoutPkg({
      name: pkgName,
      price: pkgPrice,
      color: config.color,
      tabLabel: tabLabel
    });
  };

  return (
    <PlatformPage config={config}>
      <div className="platform-sections mx-auto max-w-7xl px-4 pb-24 space-y-32">
        
        <PlatformAuditSection
          accentColor={config.color}
          badge="Chuẩn đoán Fanpage miễn phí"
          title={
            <>
              Phân tích <span style={{ color: config.color }}>Fanpage</span> và nhận báo cáo chi tiết
            </>
          }
          description="Nhập link Fanpage để chúng tôi phân tích tương tác, nội dung, tốc độ phản hồi và khả năng chuyển đổi."
          placeholder="Nhập link Fanpage (VD: facebook.com/yourpage)"
          buttonLabel="Phân tích ngay"
          value={auditUrl}
          onChange={setAuditUrl}
          onSubmit={() => setIsAuditOpen(true)}
          features={["Tương tác", "Nội dung", "Tốc độ phản hồi", "Chuyển đổi"]}
          zaloItems={[
            "Phân tích điểm mạnh & điểm yếu",
            "Đề xuất cải thiện cụ thể",
            "Tư vấn giải pháp phù hợp",
            "Báo giá chi tiết từng hạng mục",
          ]}
        />
        
        {/* 1. DỊCH VỤ XÂY DỰNG FANPAGE */}
        <section id="build" className="space-y-16 scroll-mt-24">
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="h-1 w-12 bg-blue-500 rounded-full" />
              <span className="text-blue-500 text-xs font-semibold tracking-wide text-slate-500">Professional Service</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 tracking-tight leading-tight">
              Dịch vụ <span className="text-blue-500">Xây dựng</span> Fanpage
            </h2>
          </div>

          <PackageCarousel accent={config.color} itemCount={FANPAGE_BUILD_PACKAGES.length} desktopCols={3}>
            {FANPAGE_BUILD_PACKAGES.map((pkg, i) => {
              const priceStr = formatPriceVnd(pkg.price);
              return (
                <PricingTierCard
                  key={pkg.id}
                  accent={config.color}
                  title={pkg.name}
                  price={priceStr}
                  features={pkg.works}
                  icon={BUILD_ICONS[i]}
                  featured={i === 2}
                  featuredLabel="Bán chạy"
                  ctaLabel="Đăng ký ngay"
                  onCta={() => handleOpenConsult(pkg.name, priceStr, "Xây dựng Fanpage")}
                  onSecondaryCta={() => handleOpenConsult(pkg.name, priceStr, "Xây dựng Fanpage")}
                />
              );
            })}
          </PackageCarousel>
        </section>

        {/* 2. CHĂM SÓC FANPAGE */}
        <section id="care" className="space-y-16 scroll-mt-24">
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="h-1 w-12 bg-blue-500 rounded-full" />
              <span className="text-blue-500 text-xs font-semibold tracking-wide text-slate-500">Premium Care</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 tracking-tight leading-tight">
              <span className="text-blue-500">Chăm sóc</span> Fanpage
            </h2>
            <p className="text-sm font-medium text-slate-500">Theo số lượng bài viết mỗi tháng</p>
          </div>

          <PackageCarousel accent={config.color} itemCount={FANPAGE_CARE_PACKAGES.length} desktopCols={3}>
            {FANPAGE_CARE_PACKAGES.map((pkg, i) => {
              const label = `${pkg.posts} bài / tháng`;
              const priceStr = formatPriceVnd(pkg.price);
              return (
                <PricingTierCard
                  key={pkg.id}
                  accent={config.color}
                  title={label}
                  price={priceStr}
                  priceNote="/ tháng"
                  features={pkg.works}
                  featured={i === 1}
                  ctaLabel="Đăng ký ngay"
                  onCta={() => handleOpenConsult(label, priceStr, "Chăm sóc Fanpage")}
                  onSecondaryCta={() => handleOpenConsult(label, priceStr, "Chăm sóc Fanpage")}
                />
              );
            })}
          </PackageCarousel>
        </section>

        {/* 3. QUẢNG CÁO FANPAGE */}
        <section id="ads" className="space-y-16 scroll-mt-24">
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="h-1 w-12 bg-blue-500 rounded-full" />
              <span className="text-blue-500 text-xs font-semibold tracking-wide text-slate-500">Advertising</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 tracking-tight leading-tight">
              <span className="text-blue-500">Quảng cáo</span> Fanpage
            </h2>
          </div>

          <PackageCarousel accent={config.color} itemCount={2} desktopCols={2}>
            {[
              {
                title: "Ngân sách dưới 10 triệu",
                icon: Target,
                features: ["Thiết lập và tối ưu chiến dịch quảng cáo", "Nghiên cứu khách hàng mục tiêu", "Lên nội dung và hình ảnh quảng cáo", "Theo dõi, tối ưu hiệu quả", "Báo cáo kết quả"],
                price: "1.000.000đ",
                note: "Chưa bao gồm VAT Facebook · / tháng",
              },
              {
                title: "Ngân sách trên 10 triệu",
                icon: Zap,
                features: ["Thiết lập và tối ưu chiến dịch quảng cáo", "Nghiên cứu khách hàng mục tiêu", "Lên nội dung và hình ảnh quảng cáo", "Theo dõi, tối ưu hiệu quả", "Báo cáo kết quả", "A/B Testing chiến dịch", "Tối ưu hóa chuyển đổi"],
                price: "2.000.000đ",
                note: "Chưa bao gồm VAT Facebook · / tháng",
              },
            ].map((ads) => (
              <PricingTierCard
                key={ads.title}
                accent={config.color}
                title={ads.title}
                price={ads.price}
                priceNote={ads.note}
                features={ads.features}
                icon={ads.icon}
                variant="ads"
                ctaLabel="Đăng ký quảng cáo"
                onCta={() => handleOpenConsult(ads.title, ads.price, "Quảng cáo Fanpage")}
                onSecondaryCta={() => handleOpenConsult(ads.title, ads.price, "Quảng cáo Fanpage")}
              />
            ))}
          </PackageCarousel>
        </section>

      </div>

      <AuditModal 
        isOpen={isAuditOpen} 
        onClose={() => setIsAuditOpen(false)} 
        initialLink={auditUrl} 
        source="Phân tích Fanpage"
        platformColor={config.color}
      />

      {checkoutPkg && (
        <ConsultationModal 
          pkg={checkoutPkg} 
          platformKey="facebook" 
          onClose={() => setCheckoutPkg(null)} 
        />
      )}
    </PlatformPage>
  );
}



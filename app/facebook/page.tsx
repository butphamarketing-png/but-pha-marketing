"use client";

import { useState, useMemo, useEffect } from "react";
import { PlatformPage, PlatformConfig, ConsultationModal } from "@/components/shared/PlatformPage";
import { Check, Send, ChevronRight, MessageSquare, Target, Rocket, Settings, Sparkles, UserCheck, ShieldCheck, Zap } from "lucide-react";
import { PlatformAuditSection } from "@/components/shared/PlatformAuditSection";
import { PackageCarousel } from "@/components/shared/PackageCarousel";
import { db } from "@/lib/useData";
import { AuditModal } from "@/components/shared/AuditModal";
import { fanpageCarePrice, snapFanpageCarePosts } from "@/lib/service-pricing";

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
  const [postsPerMonth, setPostsPerMonth] = useState(30);
  const [checkoutPkg, setCheckoutPkg] = useState<{ name: string; price: string; color: string; tabLabel: string } | null>(null);

  const carePrice = useMemo(() => fanpageCarePrice(postsPerMonth), [postsPerMonth]);

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

          <PackageCarousel accent={config.color} itemCount={3} desktopCols={3}>
            {[
              { 
                title: "CẢI TẠO FANPAGE", 
                price: "500.000đ", 
                icon: Settings,
                features: ["Thiết kế lại logo", "Thiết kế ảnh bìa", "Tối ưu thông tin Fanpage", "SEO Fanpage cơ bản"] 
              },
              { 
                title: "FANPAGE CƠ BẢN", 
                price: "1.000.000đ", 
                icon: UserCheck,
                features: ["Khởi tạo Fanpage chuyên nghiệp", "Thiết kế logo, ảnh bìa", "Tối ưu thông tin Fanpage", "SEO Fanpage cơ bản", "Hướng dẫn vận hành"] 
              },
              { 
                title: "FANPAGE NÂNG CAO", 
                price: "1.500.000đ", 
                icon: Rocket,
                bestSeller: true,
                features: ["Khởi tạo Fanpage chuyên nghiệp", "Thiết kế logo, ảnh bìa", "Tối ưu thông tin Fanpage", "SEO Fanpage chuẩn", "Chat tự động cơ bản", "Chiến lược nội dung ban đầu"] 
              }
            ].map((pkg, i) => (
              <div key={i} className={`platform-pricing-card ${pkg.bestSeller ? "platform-pricing-card--featured border-blue-300 ring-blue-200/70" : ""}`}>
                {pkg.bestSeller && (
                  <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-blue-600 px-4 py-1.5 text-[10px] font-semibold text-white shadow-lg shadow-blue-600/25">
                    <Sparkles size={12} /> Bán chạy
                  </div>
                )}
                <div className="flex flex-1 flex-col space-y-6">
                  <div className="flex justify-center">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${pkg.bestSeller ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-blue-50 text-blue-600"}`}>
                      <pkg.icon size={32} />
                    </div>
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-indigo-950">{pkg.title}</h3>
                    <p className="text-3xl font-bold text-blue-600">{pkg.price}</p>
                  </div>
                  <ul className="flex-1 space-y-4">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                        <Check size={16} className="flex-shrink-0 text-blue-600" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3 pt-8">
                    <button 
                      onClick={() => handleOpenConsult(pkg.title, pkg.price, "Xây dựng Fanpage")}
                      className="flex-1 rounded-2xl bg-blue-600 py-3.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
                    >
                      Đăng ký ngay
                    </button>
                    <button 
                      onClick={() => handleOpenConsult(pkg.title, pkg.price, "Xây dựng Fanpage")}
                      className="brand-btn-secondary flex h-12 w-12 items-center justify-center rounded-2xl p-0"
                    >
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">(Theo số lượng bài viết)</p>
          </div>

          <div className="platform-panel group">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-8">
                <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <div className="platform-stat-box platform-stat-box--accent w-full border-blue-200 sm:w-48">
                    <p className="mb-2 text-xs font-medium text-slate-500">Số bài viết / tháng</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-blue-600 sm:text-5xl">{postsPerMonth}</span>
                      <span className="text-xs font-medium text-slate-500">bài</span>
                    </div>
                  </div>
                  <div className="platform-stat-box w-full flex-1 sm:flex-1">
                    <p className="mb-2 text-xs font-medium text-slate-500">Dự toán ngân sách</p>
                    <p className="break-words text-2xl font-bold text-indigo-950 sm:text-3xl">{new Intl.NumberFormat("vi-VN").format(carePrice)}đ</p>
                  </div>
                </div>
                <p className="border-l-4 border-blue-500 pl-6 text-sm italic leading-relaxed text-slate-600">
                  "Nội dung chất lượng – Đăng bài đều đặn – Tăng tương tác – Tăng khách hàng. Phù hợp cho doanh nghiệp cần duy trì sự hiện diện chuyên nghiệp mỗi ngày."
                </p>
              </div>

              <div className="space-y-12">
                <div className="relative h-12 flex items-center px-2">
                  <div className="absolute -top-8 left-0 right-0 flex justify-between px-1 text-[9px] font-medium text-slate-500 sm:text-[10px]">
                    <span>10 bài</span>
                    <span className="absolute left-1/2 -translate-x-1/2">20 bài</span>
                    <span>30 bài</span>
                  </div>
                  <div className="absolute h-3 w-full rounded-full bg-indigo-100" />
                  <div className="absolute h-3 rounded-full bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.6)]" style={{ width: `${((postsPerMonth - 10) / 20) * 100}%` }} />
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="10"
                    value={postsPerMonth}
                    onChange={(e) => setPostsPerMonth(snapFanpageCarePosts(parseInt(e.target.value, 10)))}
                    className="absolute w-full appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-10 [&::-webkit-slider-thumb]:w-10 sm:[&::-webkit-slider-thumb]:h-12 sm:[&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[6px] [&::-webkit-slider-thumb]:border-blue-500"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleOpenConsult(`Gói chăm sóc ${postsPerMonth} bài`, `${new Intl.NumberFormat("vi-VN").format(carePrice)}đ`, "Chăm sóc Fanpage")}
                    className="flex-1 rounded-2xl bg-blue-600 py-4 text-[10px] font-semibold text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-500 sm:text-xs"
                  >
                    Đăng ký chăm sóc
                  </button>
                  <button
                    onClick={() => handleOpenConsult(`Tư vấn gói chăm sóc`, `Theo nhu cầu`, "Chăm sóc Fanpage")}
                    className="brand-btn-secondary flex-1 py-4 text-[10px] sm:text-xs"
                  >
                    Tư vấn gói phù hợp
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                title: "Ngân sách dưới 10.000.000đ",
                icon: Target,
                features: ["Thiết lập và tối ưu chiến dịch quảng cáo", "Nghiên cứu khách hàng mục tiêu", "Lên nội dung và hình ảnh quảng cáo", "Theo dõi, tối ưu hiệu quả", "Báo cáo kết quả"],
                price: "1.000.000đ",
                note: "( Chưa bao gồm VAT Facebook )"
              },
              {
                title: "Ngân sách trên 10.000.000đ",
                icon: Zap,
                features: ["Thiết lập và tối ưu chiến dịch quảng cáo", "Nghiên cứu khách hàng mục tiêu", "Lên nội dung và hình ảnh quảng cáo", "Theo dõi, tối ưu hiệu quả", "Báo cáo kết quả", "A/B Testing chiến dịch", "Tối ưu hóa chuyển đổi"],
                price: "2.000.000đ",
                note: "( Chưa bao gồm VAT Facebook )"
              }
            ].map((ads, i) => (
              <div key={i} className="platform-pricing-card p-10">
                <div className="flex flex-1 flex-col">
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                      <ads.icon size={32} />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{ads.price}</p>
                      <p className="text-[10px] font-medium text-slate-500">{ads.note}</p>
                    </div>
                  </div>
                  <h3 className="mb-6 text-2xl font-bold text-indigo-950">{ads.title}</h3>
                  <ul className="mb-10 flex-1 space-y-4">
                    {ads.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                        <Check size={16} className="text-blue-600" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => handleOpenConsult(ads.title, ads.price, "Quảng cáo Fanpage")}
                      className="flex-1 rounded-2xl bg-blue-600 py-4 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
                    >
                      Đăng ký quảng cáo
                    </button>
                    <button 
                      onClick={() => handleOpenConsult(ads.title, ads.price, "Quảng cáo Fanpage")}
                      className="brand-btn-secondary flex h-12 w-12 items-center justify-center rounded-2xl p-0"
                    >
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </div>
              </div>
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



"use client";

import { useState, useMemo } from "react";
import { PlatformPage, PlatformConfig, ConsultationModal } from "@/components/shared/PlatformPage";
import { AuditModal } from "@/components/shared/AuditModal";
import { Check, Search, MessageSquare, Target, Zap, Sparkles, Wrench, Building2, Star, Rocket, ChevronRight } from "lucide-react";
import { PlatformAuditSection } from "@/components/shared/PlatformAuditSection";
import { PackageCarousel } from "@/components/shared/PackageCarousel";

const config: PlatformConfig = {
  name: "Google Maps",
  color: "#EA580C", // Màu cam theo yêu cầu
  auditPlatform: "googlemaps",
  heroTitle: "Không lên Google Maps",
  heroSubtitle: "Bạn đang mất khách mỗi ngày",
  heroDescription: "Đưa doanh nghiệp lên Google – Tăng lượt gọi – Tăng khách đến cửa hàng",
  vision: "Giúp doanh nghiệp của bạn xuất hiện đầu tiên khi khách hàng tìm kiếm trên Google Maps và Google Search — kênh tìm kiếm có ý định mua hàng cao nhất hiện nay.",
  mission: "Tối ưu hóa Google Business Profile, xây dựng đánh giá 5 sao uy tín và triển khai chiến lược Local SEO để doanh nghiệp của bạn thống trị kết quả tìm kiếm địa phương.",
  responsibility: "Cam kết không dùng đánh giá giả mạo, chỉ áp dụng chiến lược White Hat được Google chấp nhận và đảm bảo thứ hạng bền vững lâu dài.",
  tabs: [], // Chúng ta sẽ tự xây dựng các phần pricing trong body
  hidePricingHeader: true,
  hideStats: true,
  hideContact: false,
  robotFilter: "hue-rotate(-240deg) saturate(1.5) brightness(1.1)", // Robot màu cam theo yêu cầu
  customSections: [
    { id: "audit", label: "Kiểm tra vị trí" },
    { id: "gm-pricing", label: "Gói Google Maps" },
    { id: "ads-pricing", label: "Gói Quảng cáo" },
    { id: "benefits", label: "Bạn nhận được gì" },
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
  const [checkoutPkg, setCheckoutPkg] = useState<{ name: string; price: string; color: string; tabLabel: string } | null>(null);
  const [auditUrl, setAuditUrl] = useState("");
  const [isAuditOpen, setIsAuditOpen] = useState(false);

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
          badge="Kiểm tra doanh nghiệp trên Google Maps"
          title="Nhập tên doanh nghiệp để kiểm tra vị trí, thứ hạng và nhận đề xuất cải thiện"
          placeholder="Nhập tên doanh nghiệp của bạn"
          buttonLabel="Kiểm tra ngay"
          value={auditUrl}
          onChange={setAuditUrl}
          onSubmit={() => setIsAuditOpen(true)}
          features={["Vị trí hiện tại", "Thứ hạng từ khóa", "Số lượng đánh giá", "Đề xuất cải thiện"]}
          zaloItems={[
            "Vị trí hiện tại của bạn",
            "Thứ hạng từ khóa chính",
            "Số lượng đánh giá",
            "Đề xuất cải thiện miễn phí",
          ]}
        />

        {/* 2. GÓI GOOGLE MAPS */}
        <section id="gm-pricing" className="space-y-16 scroll-mt-24">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 tracking-tight leading-tight">GÓI GOOGLE MAPS</h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Lựa chọn gói phù hợp với nhu cầu của bạn</p>
            <div className="h-1.5 w-24 bg-orange-600 mx-auto rounded-full" />
          </div>

          <PackageCarousel accent={config.color} itemCount={3} desktopCols={3}>
            {[
              { 
                title: "CẢI TẠO", 
                price: "300.000đ", 
                icon: Wrench,
                features: ["Tối ưu thông tin", "Sửa danh mục", "Tối ưu hình ảnh cơ bản"] 
              },
              { 
                title: "XÂY DỰNG", 
                price: "600.000đ", 
                icon: Building2,
                features: ["Tạo Google Maps", "Xác minh doanh nghiệp", "Setup đầy đủ thông tin"] 
              },
              { 
                title: "TỐI ƯU", 
                price: "900.000đ", 
                icon: Star,
                bestSeller: true,
                features: ["Tối ưu SEO Maps", "Viết mô tả chuẩn", "Tối ưu hiển thị tìm kiếm"] 
              }
            ].map((pkg, i) => (
              <div key={i} className={`platform-pricing-card ${pkg.bestSeller ? "platform-pricing-card--featured border-orange-300 ring-orange-200/70" : ""}`}>
                {pkg.bestSeller && (
                  <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-orange-600 px-4 py-1.5 text-[10px] font-semibold text-white shadow-lg shadow-orange-600/25">
                    <Sparkles size={12} /> Lựa chọn tốt
                  </div>
                )}
                <div className="flex flex-1 flex-col space-y-6">
                  <div className="flex justify-center">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${pkg.bestSeller ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" : "bg-orange-50 text-orange-600"}`}>
                      <pkg.icon size={32} />
                    </div>
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-indigo-950">{pkg.title}</h3>
                    <p className="text-3xl font-bold text-orange-600">{pkg.price}</p>
                  </div>
                  <ul className="flex-1 space-y-4">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                        <Check size={16} className="flex-shrink-0 text-orange-600" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3 pt-8">
                    <button 
                      onClick={() => handleOpenConsult(pkg.title, pkg.price, "Gói Google Maps")}
                      className="flex-1 rounded-2xl bg-orange-600 py-3.5 text-xs font-semibold text-white shadow-lg shadow-orange-600/20 transition-all hover:bg-orange-500"
                    >
                      Đăng ký ngay
                    </button>
                    <button 
                      onClick={() => handleOpenConsult(pkg.title, pkg.price, "Gói Google Maps")}
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

        {/* 3. GÓI QUẢNG CÁO GOOGLE MAPS */}
        <section id="ads-pricing" className="space-y-16 scroll-mt-24">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 tracking-tight leading-tight">GÓI QUẢNG CÁO GOOGLE MAPS</h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Lựa chọn gói phù hợp với ngân sách của bạn</p>
            <div className="h-1.5 w-24 bg-orange-600 mx-auto rounded-full" />
          </div>

          <PackageCarousel accent={config.color} itemCount={2} desktopCols={2}>
            {[
              {
                title: "GÓI CƠ BẢN",
                icon: Target,
                bestSeller: true,
                note: "(Ngân sách dưới 10 triệu)",
                features: [
                  "Setup chiến dịch Google Maps",
                  "Tối ưu hiển thị địa điểm trên Google",
                  "Nghiên cứu từ khóa tìm kiếm khách hàng",
                  "Target đúng khu vực (bán kính / thành phố)",
                  "Theo dõi & tối ưu quảng cáo mỗi ngày",
                  "Báo cáo hiệu quả định kỳ"
                ],
                price: "1.000.000đ",
                fee: "/ tháng (chưa bao gồm ngân sách quảng cáo)"
              },
              {
                title: "GÓI NÂNG CAO",
                icon: Zap,
                note: "(Ngân sách từ 10 triệu trở lên)",
                features: [
                  "Setup chiến dịch chuyên sâu Google Maps",
                  "Tối ưu từ khóa + vị trí hiển thị TOP",
                  "Phân tích hành vi khách hàng",
                  "Remarketing (bám đuổi khách hàng)",
                  "Tối ưu chi phí – tăng chuyển đổi",
                  "Theo dõi & tối ưu liên tục",
                  "Báo cáo chi tiết + đề xuất chiến lược"
                ],
                price: "2.000.000đ",
                fee: "/ tháng (chưa bao gồm ngân sách quảng cáo)"
              }
            ].map((ads, i) => (
              <div key={i} className={`platform-pricing-card p-10 ${ads.bestSeller ? "platform-pricing-card--featured border-orange-300 ring-orange-200/70" : ""}`}>
                {ads.bestSeller && (
                  <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-orange-600 px-4 py-1.5 text-[10px] font-semibold text-white shadow-lg shadow-orange-600/25">
                    <Sparkles size={12} /> Bán chạy
                  </div>
                )}
                <div className="flex flex-1 flex-col">
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-lg shadow-orange-600/20">
                      <ads.icon size={32} />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">{ads.price}</p>
                      <p className="text-[10px] font-medium text-slate-500">{ads.fee}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-indigo-950">{ads.title}</h3>
                    <p className="text-sm font-medium text-orange-600">{ads.note}</p>
                  </div>
                  <ul className="mb-10 flex-1 space-y-4">
                    {ads.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                        <Check size={16} className="text-orange-600" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => handleOpenConsult(ads.title, ads.price, "Quảng cáo Google Maps")}
                      className="flex-1 rounded-2xl bg-orange-600 py-4 text-xs font-semibold text-white shadow-lg shadow-orange-600/20 transition-all hover:bg-orange-500"
                    >
                      Đăng ký quảng cáo
                    </button>
                    <button 
                      onClick={() => handleOpenConsult(ads.title, ads.price, "Quảng cáo Google Maps")}
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

        {/* 4. BẠN NHẬN ĐƯỢC GÌ? */}
        <section id="benefits" className="space-y-16 scroll-mt-24">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 tracking-tight leading-tight">BẠN NHẬN ĐƯỢC GÌ?</h2>
            <div className="h-1.5 w-24 bg-orange-600 mx-auto rounded-full" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Search, title: "Xuất hiện khi khách tìm kiếm gần bạn", desc: "Tăng khả năng tiếp cận khách hàng tiềm năng" },
              { icon: Rocket, title: "Tăng lượt gọi và chỉ đường", desc: "Khách dễ dàng liên hệ và đến cửa hàng của bạn" },
              { icon: Building2, title: "Hiển thị chuyên nghiệp hơn đối thủ", desc: "Thông tin đầy đủ, hình ảnh đẹp, tạo sự tin tưởng" },
              { icon: Star, title: "Dễ dàng được khách tin tưởng", desc: "Nhiều đánh giá tốt giúp nâng cao uy tín thương hiệu" }
            ].map((item, idx) => (
              <div key={idx} className="brand-card group space-y-4 p-8 transition-all hover:-translate-y-0.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-transform group-hover:scale-110">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-bold leading-tight text-indigo-950">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="platform-panel relative space-y-8 overflow-hidden text-center">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
            <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" style={{ backgroundColor: config.color }} />
          </div>
          <h2 className="text-3xl font-bold text-indigo-950 md:text-5xl">Bạn đã xuất hiện trên Google Maps chưa?</h2>
          <p className="mx-auto max-w-2xl text-slate-600">Kiểm tra ngay vị trí của bạn và đừng để mất khách hàng tiềm năng!</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="rounded-2xl bg-orange-600 px-12 py-5 text-sm font-semibold text-white shadow-2xl shadow-orange-600/25 transition-all hover:scale-[1.02] active:scale-[0.99]"
          >
            Kiểm tra ngay
          </button>
        </section>

      </div>

      <AuditModal 
        isOpen={isAuditOpen} 
        onClose={() => setIsAuditOpen(false)} 
        initialLink={auditUrl} 
        source="Phân tích Google Maps"
        platformColor={config.color}
      />

      {checkoutPkg && (
        <ConsultationModal 
          pkg={checkoutPkg} 
          platformKey="googlemaps" 
          onClose={() => setCheckoutPkg(null)} 
        />
      )}
    </PlatformPage>
  );
}

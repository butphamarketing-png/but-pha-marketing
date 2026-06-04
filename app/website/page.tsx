"use client";

import { useState } from "react";
import { PlatformPage, PlatformConfig, ConsultationModal } from "@/components/shared/PlatformPage";
import { CustomWebsiteModal } from "@/components/shared/CustomWebsiteModal";
import { StorageSlider } from "@/components/shared/StorageSlider";
import { DomainSelectionModal } from "@/components/shared/DomainSelectionModal";
import { AuditModal } from "@/components/shared/AuditModal";
import { Settings, ChevronRight, Globe, Search, Check, FileText, Sparkles, MessageSquare } from "lucide-react";
import { formatPriceVnd, WEBSITE_BUILD_PACKAGES, WEBSITE_CARE_PACKAGES } from "@/lib/service-pricing";

const config: PlatformConfig = {
  name: "Website",
  color: "#22C55E",
  auditPlatform: "website",
  vision: "Website là nền tảng trung tâm của mọi chiến lược marketing số. Chúng tôi xây dựng website chuyên nghiệp, tối ưu SEO và bảo trì để doanh nghiệp của bạn có mặt mọi lúc mọi nơi trên internet.",
  mission: "Thiết kế website đẹp, nhanh và chuyển đổi cao — từ Landing Page đơn giản đến E-commerce phức tạp, tất cả đều được tối ưu SEO từ đầu để tiết kiệm chi phí marketing về lâu dài.",
  responsibility: "Cam kết bàn giao website đúng deadline, hỗ trợ kỹ thuật và bảo trì 24/7, không phát sinh chi phí ẩn và đảm bảo website hoạt động ổn định 99.9% uptime.",
  robotFilter: "hue-rotate(90deg) saturate(1.4) brightness(1.1)",
  hidePricingHeader: true,
  customSections: [
    { id: "audit", label: "Chuẩn đoán Website" },
    { id: "pricing", label: "Bảng giá dịch vụ" },
    { id: "care", label: "Chăm sóc Website" },
    { id: "storage", label: "Hạ tầng lưu trữ" },
    { id: "contact", label: "Liên hệ tư vấn" },
  ],
  tabs: [
    {
      label: "Thiết kế Website",
      packages: WEBSITE_BUILD_PACKAGES.map((pkg, index) => ({
        name: pkg.name,
        price: formatPriceVnd(pkg.price),
        popular: index === 2,
        features: [...pkg.works],
        allFeatures: [...pkg.works],
        audioText: `Gói ${pkg.name} — ${formatPriceVnd(pkg.price)}.`,
      })),
    },
  ],
  stats: [],
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
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [auditUrl, setAuditUrl] = useState("");
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [checkoutPkg, setCheckoutPkg] = useState<{ name: string; price: string; color: string; tabLabel: string } | null>(null);

  const handleOpenConsult = (pkgName: string, pkgPrice: string, tabLabel: string) => {
    setCheckoutPkg({
      name: pkgName,
      price: pkgPrice,
      color: config.color,
      tabLabel,
    });
  };

  return (
    <PlatformPage config={config}>
      <div className="mx-auto max-w-7xl px-4 pb-24 space-y-32">
        
        {/* 1. Audit Section - Đưa lên đầu theo yêu cầu */}
        <section id="audit" className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 md:p-14 backdrop-blur-xl relative overflow-hidden group scroll-mt-24">
          <div className="absolute top-0 right-0 -z-10 h-full w-full opacity-10 pointer-events-none">
            <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full blur-[120px]" style={{ backgroundColor: config.color }} />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Search size={16} className="text-white" style={{ color: config.color }} />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Chuẩn đoán website miễn phí</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white">Phân tích <span style={{ color: config.color }}>website</span> và nhận báo cáo chi tiết</h3>
              <p className="text-gray-400 leading-relaxed">
                Nhập URL website của bạn để chúng tôi phân tích các yếu tố: Tốc độ, SEO Onpage, UX/UI và Khả năng chuyển đổi.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <input 
                  placeholder="Nhập URL website của bạn (VD: yourdomain.com)" 
                  value={auditUrl}
                  onChange={e => setAuditUrl(e.target.value)}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-white/30"
                />
                <button 
                  onClick={() => setIsAuditOpen(true)}
                  className="rounded-2xl px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 justify-center"
                  style={{ backgroundColor: config.color }}
                >
                  Phân tích ngay <ChevronRight size={18} />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-6 pt-6 opacity-60">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} /> Tốc độ
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} /> SEO Onpage
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} /> UX / UI
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} /> Khả năng chuyển đổi
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block w-1/3">
              <div className="relative p-6 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm space-y-6">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">Nhận báo giá chi tiết qua Zalo</p>
                <ul className="space-y-4">
                  {[
                    "Phân tích điểm mạnh & điểm yếu",
                    "Đề xuất cải thiện cụ thể",
                    "Tư vấn giải pháp phù hợp",
                    "Báo giá chi tiết từng hạng mục"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check size={16} className="text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://zalo.me/0901438703" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
                >
                   Nhận báo giá qua Zalo
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-32">
          {/* Custom & Domain Section */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Custom Website Button */}
            <button
              onClick={() => setShowCustomModal(true)}
              className="group relative flex items-center justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 transition-all hover:bg-white/[0.06] md:p-10"
            >
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-500 group-hover:scale-110 transition-transform">
                  <Settings size={32} />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black text-white">Website Custom</h3>
                  <p className="mt-1 text-sm text-gray-400">Hệ thống riêng biệt</p>
                </div>
              </div>
              <ChevronRight className="hidden h-8 w-8 text-gray-600 transition-transform group-hover:translate-x-2 md:block" />
            </button>

            {/* Domain Selection Button */}
            <button
              onClick={() => setShowDomainModal(true)}
              className="group relative flex items-center justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 transition-all hover:bg-white/[0.06] md:p-10"
            >
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                  <Globe size={32} />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black text-white">Đăng ký tên miền</h3>
                  <p className="mt-1 text-sm text-gray-400">Quốc tế & Việt Nam</p>
                </div>
              </div>
              <ChevronRight className="hidden h-8 w-8 text-gray-600 transition-transform group-hover:translate-x-2 md:block" />
            </button>
          </div>

          {/* CHĂM SÓC WEBSITE */}
          <section id="care" className="space-y-16 scroll-mt-24">
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center gap-3">
                <div className="h-1 w-12 rounded-full" style={{ backgroundColor: config.color }} />
                <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: config.color }}>
                  Premium Care
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
                <span style={{ color: config.color }}>Chăm sóc</span> Website
              </h2>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Theo số lượng bài viết mỗi tháng</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {WEBSITE_CARE_PACKAGES.map((pkg, i) => (
                <div
                  key={pkg.id}
                  className={`relative group flex flex-col rounded-[2.5rem] border p-8 transition-all hover:scale-[1.02] ${
                    i === 1 ? "border-green-500/50 bg-green-500/5" : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  {i === 1 && (
                    <div
                      className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-black text-white shadow-xl"
                      style={{ backgroundColor: config.color, boxShadow: `0 10px 30px ${config.color}40` }}
                    >
                      <Sparkles size={12} /> PHỔ BIẾN
                    </div>
                  )}
                  <div className="flex flex-1 flex-col space-y-6">
                    <div className="flex justify-center">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl"
                        style={
                          i === 1
                            ? { backgroundColor: config.color, color: "#fff" }
                            : { backgroundColor: `${config.color}15`, color: config.color }
                        }
                      >
                        <FileText size={32} />
                      </div>
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-black text-white">{pkg.posts} bài viết/tháng</h3>
                      <p className="text-3xl font-black" style={{ color: config.color }}>
                        {formatPriceVnd(pkg.price)}
                      </p>
                    </div>
                    <ul className="flex-1 space-y-4">
                      {pkg.works.map((feature, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300">
                          <Check size={16} className="flex-shrink-0" style={{ color: config.color }} /> {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => handleOpenConsult(`${pkg.posts} bài viết/tháng`, formatPriceVnd(pkg.price), "Chăm sóc Website")}
                        className="flex-1 rounded-2xl py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all shadow-lg"
                        style={{ backgroundColor: config.color }}
                      >
                        Đăng ký ngay
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenConsult(`${pkg.posts} bài viết/tháng`, formatPriceVnd(pkg.price), "Chăm sóc Website")}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-gray-400 transition-all hover:bg-white/5 hover:text-white"
                      >
                        <MessageSquare size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Storage Slider Section */}
          <div id="storage" className="space-y-12 scroll-mt-24">
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center gap-3">
                <div className="h-1 w-12 rounded-full" style={{ backgroundColor: config.color }} />
                <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: config.color }}>Infrastructure</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
                Dung lượng <span style={{ color: config.color }}>lưu trữ</span>
              </h3>
              <p className="mt-2 text-gray-400 max-w-2xl mx-auto">Kéo thanh trượt để dự toán hạ tầng phù hợp với quy mô doanh nghiệp</p>
            </div>
            <StorageSlider primaryColor={config.color} />
          </div>
        </div>
      </div>

      <AuditModal 
        isOpen={isAuditOpen} 
        onClose={() => setIsAuditOpen(false)} 
        initialLink={auditUrl} 
        source="Phân tích Website"
        platformColor={config.color}
      />

      <CustomWebsiteModal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        primaryColor={config.color}
      />

      <DomainSelectionModal
        isOpen={showDomainModal}
        onClose={() => setShowDomainModal(false)}
        primaryColor={config.color}
      />

      {checkoutPkg && (
        <ConsultationModal pkg={checkoutPkg} platformKey="website" onClose={() => setCheckoutPkg(null)} />
      )}
    </PlatformPage>
  );
}



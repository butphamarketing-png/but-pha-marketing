"use client";

import { useState } from "react";
import { PlatformPage, PlatformConfig, ConsultationModal } from "@/components/shared/PlatformPage";
import { CustomWebsiteModal } from "@/components/shared/CustomWebsiteModal";
import { WebsiteOperationSection } from "@/components/shared/WebsiteOperationSection";
import { DomainSelectionModal } from "@/components/shared/DomainSelectionModal";
import { AuditModal } from "@/components/shared/AuditModal";
import { Settings, ChevronRight, Globe, Check, FileText, Sparkles, MessageSquare, LayoutTemplate, Target, Zap } from "lucide-react";
import { PlatformAuditSection } from "@/components/shared/PlatformAuditSection";
import { formatPriceVnd, WEBSITE_BUILD_PACKAGES, WEBSITE_CARE_PACKAGES } from "@/lib/service-pricing";
import { PLATFORM_COLORS } from "@/lib/brand-colors";

const config: PlatformConfig = {
  name: "Website",
  color: PLATFORM_COLORS.website,
  auditPlatform: "website",
  heroTitle: "Website chuẩn SEO",
  heroSubtitle: "Thiết kế nhanh, tối ưu chuyển đổi và bảo trì bền vững",
  vision: "Website là nền tảng trung tâm của mọi chiến lược marketing số. Chúng tôi xây dựng website chuyên nghiệp, tối ưu SEO và bảo trì để doanh nghiệp của bạn có mặt mọi lúc mọi nơi trên internet.",
  mission: "Thiết kế website đẹp, nhanh và chuyển đổi cao — từ Landing Page đơn giản đến E-commerce phức tạp, tất cả đều được tối ưu SEO từ đầu để tiết kiệm chi phí marketing về lâu dài.",
  responsibility: "Cam kết bàn giao website đúng deadline, hỗ trợ kỹ thuật và bảo trì 24/7, không phát sinh chi phí ẩn và đảm bảo website hoạt động ổn định 99.9% uptime.",
  robotFilter: "hue-rotate(90deg) saturate(1.4) brightness(1.1)",
  hidePricingHeader: true,
  hideAutoPricing: true,
  customSections: [
    { id: "audit", label: "Chuẩn đoán Website" },
    { id: "domain", label: "Tên miền" },
    { id: "pricing", label: "Thiết kế Website" },
    { id: "van-hanh", label: "Vận hành Website" },
    { id: "care", label: "Chăm sóc Website" },
    { id: "quang-cao", label: "Quảng cáo Website" },
    { id: "contact", label: "Liên hệ tư vấn" },
  ],
  tabs: [],
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
      <div className="platform-sections mx-auto max-w-7xl px-4 pb-24 space-y-32">
        
        <PlatformAuditSection
          accentColor={config.color}
          badge="Chuẩn đoán website miễn phí"
          title={
            <>
              Phân tích <span style={{ color: config.color }}>website</span> và nhận báo cáo chi tiết
            </>
          }
          description="Nhập URL website để phân tích tốc độ, SEO on-page, UX/UI và khả năng chuyển đổi."
          placeholder="Nhập URL website (VD: yourdomain.com)"
          buttonLabel="Phân tích ngay"
          value={auditUrl}
          onChange={setAuditUrl}
          onSubmit={() => setIsAuditOpen(true)}
          features={["Tốc độ", "SEO On-page", "UX / UI", "Khả năng chuyển đổi"]}
        />

        <div className="space-y-32">
          {/* Custom & Domain Section */}
          <div id="domain" className="grid gap-6 scroll-mt-24 md:grid-cols-2">
            {/* Custom Website Button */}
            <button
              onClick={() => setShowCustomModal(true)}
              className="brand-card group relative flex items-center justify-between overflow-hidden p-8 transition-all hover:-translate-y-0.5 md:p-10"
            >
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 transition-transform group-hover:scale-110">
                  <Settings size={32} />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-indigo-950">Website Custom</h3>
                  <p className="mt-1 text-sm text-slate-600">Hệ thống riêng biệt</p>
                </div>
              </div>
              <ChevronRight className="hidden h-8 w-8 text-gray-600 transition-transform group-hover:translate-x-2 md:block" />
            </button>

            {/* Domain Selection Button */}
            <button
              onClick={() => setShowDomainModal(true)}
              className="brand-card group relative flex items-center justify-between overflow-hidden p-8 transition-all hover:-translate-y-0.5 md:p-10"
            >
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 transition-transform group-hover:scale-110">
                  <Globe size={32} />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-indigo-950">Đăng ký tên miền</h3>
                  <p className="mt-1 text-sm text-slate-600">Quốc tế & Việt Nam</p>
                </div>
              </div>
              <ChevronRight className="hidden h-8 w-8 text-gray-600 transition-transform group-hover:translate-x-2 md:block" />
            </button>
          </div>

          {/* THIẾT KẾ WEBSITE */}
          <section id="pricing" className="space-y-16 scroll-mt-24">
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center gap-3">
                <div className="h-1 w-12 rounded-full" style={{ backgroundColor: config.color }} />
                <span className="text-xs font-semibold tracking-wide text-slate-500" style={{ color: config.color }}>
                  Website Design
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 tracking-tight leading-tight">
                <span style={{ color: config.color }}>Thiết kế</span> Website
              </h2>
              <p className="text-sm font-medium text-slate-500">Gói website chuẩn SEO — tư vấn miễn phí</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {WEBSITE_BUILD_PACKAGES.map((pkg, i) => (
                <div
                  key={pkg.id}
                  className={`platform-pricing-card ${i === 2 ? "platform-pricing-card--featured" : ""}`}
                  style={i === 2 ? ({ ["--tw-ring-color" as string]: `${config.color}45` } as React.CSSProperties) : undefined}
                >
                  {i === 2 && (
                    <div
                      className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-semibold text-white shadow-xl"
                      style={{ backgroundColor: config.color, boxShadow: `0 10px 30px ${config.color}40` }}
                    >
                      <Sparkles size={12} /> Phổ biến
                    </div>
                  )}
                  <div className="flex flex-1 flex-col space-y-6">
                    <div className="flex justify-center">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl"
                        style={
                          i === 2
                            ? { backgroundColor: config.color, color: "#fff" }
                            : { backgroundColor: `${config.color}15`, color: config.color }
                        }
                      >
                        <LayoutTemplate size={32} />
                      </div>
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold text-indigo-950">{pkg.name}</h3>
                      <p className="text-3xl font-bold" style={{ color: config.color }}>
                        {formatPriceVnd(pkg.price)}
                      </p>
                    </div>
                    <ul className="flex-1 space-y-4">
                      {pkg.works.map((feature, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                          <Check size={16} className="flex-shrink-0" style={{ color: config.color }} /> {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => handleOpenConsult(pkg.name, formatPriceVnd(pkg.price), "Thiết kế Website")}
                        className="flex-1 rounded-2xl py-3.5 text-xs font-semibold text-white transition-all shadow-lg hover:brightness-105"
                        style={{ background: `linear-gradient(135deg, #312E81, ${config.color})` }}
                      >
                        Tư vấn ngay
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenConsult(pkg.name, formatPriceVnd(pkg.price), "Thiết kế Website")}
                        className="brand-btn-secondary flex h-12 w-12 items-center justify-center rounded-2xl p-0"
                      >
                        <MessageSquare size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* VẬN HÀNH WEBSITE */}
          <section id="van-hanh" className="space-y-16 scroll-mt-24">
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center gap-3">
                <div className="h-1 w-12 rounded-full" style={{ backgroundColor: config.color }} />
                <span className="text-xs font-semibold tracking-wide text-slate-500" style={{ color: config.color }}>
                  Managed Operations
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 tracking-tight leading-tight">
                Gói <span style={{ color: config.color }}>vận hành</span> Website
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-slate-600">
                Hosting, bảo mật, backup và hỗ trợ kỹ thuật — chọn mức phù hợp quy mô doanh nghiệp
              </p>
            </div>
            <WebsiteOperationSection primaryColor={config.color} onConsult={handleOpenConsult} />
          </section>

          {/* CHĂM SÓC WEBSITE */}
          <section id="care" className="space-y-16 scroll-mt-24">
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center gap-3">
                <div className="h-1 w-12 rounded-full" style={{ backgroundColor: config.color }} />
                <span className="text-xs font-semibold tracking-wide text-slate-500" style={{ color: config.color }}>
                  Premium Care
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 tracking-tight leading-tight">
                <span style={{ color: config.color }}>Chăm sóc</span> Website
              </h2>
              <p className="text-sm font-medium text-slate-500">Theo số lượng bài viết mỗi tháng</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {WEBSITE_CARE_PACKAGES.map((pkg, i) => (
                <div
                  key={pkg.id}
                  className={`platform-pricing-card ${i === 1 ? "platform-pricing-card--featured" : ""}`}
                  style={i === 1 ? ({ ["--tw-ring-color" as string]: `${config.color}45` } as React.CSSProperties) : undefined}
                >
                  {i === 1 && (
                    <div
                      className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-semibold text-white shadow-xl"
                      style={{ backgroundColor: config.color, boxShadow: `0 10px 30px ${config.color}40` }}
                    >
                      <Sparkles size={12} /> Phổ biến
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
                      <h3 className="text-xl font-bold text-indigo-950">{pkg.posts} bài viết/tháng</h3>
                      <p className="text-3xl font-bold" style={{ color: config.color }}>
                        {formatPriceVnd(pkg.price)}
                      </p>
                    </div>
                    <ul className="flex-1 space-y-4">
                      {pkg.works.map((feature, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                          <Check size={16} className="flex-shrink-0" style={{ color: config.color }} /> {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => handleOpenConsult(`${pkg.posts} bài viết/tháng`, formatPriceVnd(pkg.price), "Chăm sóc Website")}
                        className="flex-1 rounded-2xl py-3.5 text-xs font-semibold text-white transition-all shadow-lg hover:brightness-105"
                        style={{ background: `linear-gradient(135deg, #312E81, ${config.color})` }}
                      >
                        Đăng ký ngay
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenConsult(`${pkg.posts} bài viết/tháng`, formatPriceVnd(pkg.price), "Chăm sóc Website")}
                        className="brand-btn-secondary flex h-12 w-12 items-center justify-center rounded-2xl p-0"
                      >
                        <MessageSquare size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* QUẢNG CÁO WEBSITE */}
          <section id="quang-cao" className="space-y-16 scroll-mt-24">
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center gap-3">
                <div className="h-1 w-12 rounded-full" style={{ backgroundColor: config.color }} />
                <span className="text-xs font-semibold tracking-wide text-slate-500" style={{ color: config.color }}>
                  Advertising
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 tracking-tight leading-tight">
                <span style={{ color: config.color }}>Quảng cáo</span> Website
              </h2>
              <p className="text-sm font-medium text-slate-500">Google Ads &amp; Meta Ads — trỏ về website, đo chuyển đổi chính xác</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  title: "Ngân sách dưới 10.000.000đ",
                  price: "1.000.000đ",
                  note: "/ tháng (chưa gồm ngân sách ads)",
                  icon: Target,
                  features: [
                    "Thiết lập chiến dịch Google / Meta",
                    "Landing page & pixel tracking",
                    "Nghiên cứu từ khóa mục tiêu",
                    "Theo dõi & tối ưu hàng tuần",
                    "Báo cáo hiệu quả",
                  ],
                },
                {
                  title: "Ngân sách trên 10.000.000đ",
                  price: "2.000.000đ",
                  note: "/ tháng (chưa gồm ngân sách ads)",
                  icon: Zap,
                  features: [
                    "Tối ưu chiến dịch chuyên sâu",
                    "A/B test landing & creative",
                    "Remarketing đa kênh",
                    "Tối ưu CPA / ROAS",
                    "Báo cáo & đề xuất chiến lược",
                  ],
                },
              ].map((ads, i) => (
                <div key={i} className="platform-pricing-card p-10">
                  <div className="flex flex-1 flex-col">
                    <div className="mb-8 flex items-start justify-between">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg"
                        style={{ backgroundColor: config.color, boxShadow: `0 10px 30px ${config.color}40` }}
                      >
                        <ads.icon size={32} />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: config.color }}>
                          {ads.price}
                        </p>
                        <p className="text-[10px] font-medium text-slate-500">{ads.note}</p>
                      </div>
                    </div>
                    <h3 className="mb-6 text-2xl font-bold text-indigo-950">{ads.title}</h3>
                    <ul className="mb-10 flex-1 space-y-4">
                      {ads.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                          <Check size={16} style={{ color: config.color }} /> {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => handleOpenConsult(ads.title, ads.price, "Quảng cáo Website")}
                        className="flex-1 rounded-2xl py-4 text-xs font-semibold text-white shadow-lg transition-all hover:brightness-105"
                        style={{ backgroundColor: config.color }}
                      >
                        Đăng ký quảng cáo
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenConsult(ads.title, ads.price, "Quảng cáo Website")}
                        className="brand-btn-secondary flex h-12 w-12 items-center justify-center rounded-2xl p-0"
                      >
                        <MessageSquare size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
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
        hidePrices
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



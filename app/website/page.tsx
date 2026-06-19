"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PlatformPage, PlatformConfig, ConsultationModal } from "@/components/shared/PlatformPage";
import { CustomWebsiteModal } from "@/components/shared/CustomWebsiteModal";
import { DomainSelectionModal } from "@/components/shared/DomainSelectionModal";
import { AuditModal } from "@/components/shared/AuditModal";
import { Settings, ChevronRight, Globe, Check, FileText, Sparkles, MessageSquare, BookOpen, Target, Zap, Server } from "lucide-react";
import { PlatformAuditSection } from "@/components/shared/PlatformAuditSection";
import { formatPriceVnd, WEBSITE_CARE_PACKAGES } from "@/lib/service-pricing";
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#pricing") {
      window.location.replace("/website/thietkewebsite");
    } else if (window.location.hash === "#van-hanh") {
      window.location.replace("/website/van-hanh-website");
    }
  }, []);

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

        <section className="brand-card flex flex-col gap-6 p-8 md:flex-row md:items-start md:p-10">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${config.color}15`, color: config.color }}
          >
            <BookOpen size={28} />
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-indigo-950">Hướng dẫn thiết kế website</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Tài liệu chuyên sâu về giá, quy trình, SEO và các loại website — giúp bạn ra quyết định trước khi đầu tư.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/blog/thiet-ke-website", label: "Thiết kế website 2026" },
                { href: "/blog/thiet-ke-website-la-gi", label: "Website là gì?" },
                { href: "/blog/bao-gia-thiet-ke-website", label: "Báo giá" },
                { href: "/blog/thiet-ke-website-chuan-seo", label: "Chuẩn SEO" },
                { href: "/blog/thiet-ke-website-ban-hang", label: "Bán hàng" },
                { href: "/blog/thiet-ke-website-thuong-mai-dien-tu", label: "TMĐT" },
                { href: "/blog/thiet-ke-website-tron-goi", label: "Trọn gói" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-800 transition-colors hover:border-indigo-400 hover:bg-indigo-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

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

          <section className="scroll-mt-24">
            <Link
              href="/website/thietkewebsite"
              className="brand-card group flex items-center justify-between gap-6 p-8 transition-all hover:-translate-y-0.5 md:p-10"
            >
              <div className="flex items-center gap-6">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${config.color}15`, color: config.color }}
                >
                  <BookOpen size={32} />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-indigo-950">Thiết kế website</h3>
                  <p className="mt-1 text-sm text-slate-600">Landing chuyên nghiệp — tư vấn miễn phí, chuẩn SEO</p>
                </div>
              </div>
              <ChevronRight className="hidden h-8 w-8 text-gray-600 transition-transform group-hover:translate-x-2 md:block" />
            </Link>
          </section>

          <section className="scroll-mt-24">
            <Link
              href="/website/van-hanh-website"
              className="brand-card group flex items-center justify-between gap-6 p-8 transition-all hover:-translate-y-0.5 md:p-10"
            >
              <div className="flex items-center gap-6">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${config.color}15`, color: config.color }}
                >
                  <Server size={32} />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-indigo-950">Vận hành website</h3>
                  <p className="mt-1 text-sm text-slate-600">Hosting, bảo mật, backup — 9 gói từ 2.500.000đ/năm</p>
                </div>
              </div>
              <ChevronRight className="hidden h-8 w-8 text-gray-600 transition-transform group-hover:translate-x-2 md:block" />
            </Link>
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



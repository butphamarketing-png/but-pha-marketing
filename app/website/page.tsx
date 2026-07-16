"use client";

import { useState } from "react";
import Link from "next/link";
import { PlatformPage, PlatformConfig } from "@/components/shared/PlatformPage";
import { CustomWebsiteModal } from "@/components/shared/CustomWebsiteModal";
import { WebsiteOperationSection } from "@/components/shared/WebsiteOperationSection";
import { PackageCarousel } from "@/components/shared/PackageCarousel";
import { PricingTierCard } from "@/components/shared/PricingTierCard";
import { DomainSelectionModal } from "@/components/shared/DomainSelectionModal";
import { AuditModal } from "@/components/shared/AuditModal";
import { Settings, ChevronRight, Globe, FileText, LayoutTemplate, Target, Zap } from "lucide-react";
import { PlatformAuditSection } from "@/components/shared/PlatformAuditSection";
import { WebsiteIndustryGrid } from "@/components/website/WebsiteIndustryGrid";
import { WebsiteProofSection } from "@/components/website/WebsiteProofSection";
import { MoneyKwSiloLinks } from "@/components/seo/MoneyKwSiloLinks";
import { WEBSITE_BUILD_PACKAGES, WEBSITE_CARE_PACKAGES } from "@/lib/service-pricing";
import { PLATFORM_COLORS } from "@/lib/brand-colors";

const config: PlatformConfig = {
  name: "Website",
  color: PLATFORM_COLORS.website,
  auditPlatform: "website",
  heroTitle: "Thiết kế website chuyên nghiệp",
  heroSubtitle: "Thiết kế website chuẩn SEO cho doanh nghiệp — UI/UX, lập trình, bàn giao admin và báo giá minh bạch",
  vision: "Thiết kế website là nền tảng marketing số của doanh nghiệp. Bứt Phá Marketing xây website chuẩn SEO, tối ưu chuyển đổi và bàn giao quy trình vận hành rõ ràng.",
  mission: "Thiết kế website đẹp, nhanh, chuẩn SEO — từ Landing Page đến website doanh nghiệp và E-commerce, tối ưu từ đầu để giảm chi phí marketing lâu dài.",
  responsibility: "Cam kết: bàn giao đúng deadline đã thống nhất, không phát sinh phí ẩn ngoài báo giá, hỗ trợ kỹ thuật sau bàn giao, website ổn định và có tài khoản admin + hướng dẫn sử dụng.",
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
    { q: "Thiết kế website mất bao lâu?", a: "Landing Page: 3–5 ngày. Website doanh nghiệp: 1–2 tuần. E-commerce: 3–4 tuần. Timeline chốt trong báo giá sau khảo sát." },
    { q: "Thiết kế website gồm những gì?", a: "Khảo sát nhu cầu, UI/UX, lập trình chuẩn SEO, tích hợp form/Zalo (theo gói), kiểm thử, bàn giao admin và hướng dẫn vận hành." },
    { q: "Có cần tự cung cấp nội dung không?", a: "Thông tin sản phẩm/dịch vụ do bạn cung cấp. Có thể hỗ trợ nội dung mẫu theo gói — chi tiết trong báo giá thiết kế website." },
    { q: "Website bàn giao xong tự sửa được không?", a: "Có. Bạn nhận tài khoản admin và hướng dẫn; tự cập nhật tin tức, sản phẩm, trang cơ bản." },
    { q: "Hosting / domain có gói kèm không?", a: "Có thể tính riêng hoặc đóng gói theo nhu cầu. Xem mức giá tham khảo tại trang báo giá thiết kế website." },
    { q: "SEO bao lâu lên trang 1?", a: "Từ khóa ít cạnh tranh: 1–3 tháng. Trung bình: 3–6 tháng. Cạnh tranh cao: 6–12 tháng. Không cam kết thứ hạng cứng — có case study số liệu GSC thật." },
  ],
};

export default function WebsitePage() {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [auditUrl, setAuditUrl] = useState("");
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  return (
    <PlatformPage config={config}>
      <div className="platform-sections mx-auto max-w-7xl px-4 pb-24 space-y-32">
        <section className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/40 p-6 md:p-10">
          <p className="brand-eyebrow mb-3">Dịch vụ #1 — Head term</p>
          <h2 className="text-3xl font-black tracking-tight text-indigo-950 md:text-4xl">
            Thiết kế website chuyên nghiệp cho doanh nghiệp
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            <strong>Thiết kế website</strong> tại Bứt Phá Marketing gồm khảo sát, UI/UX, lập trình chuẩn SEO,
            tích hợp form/Zalo và bàn giao quy trình vận hành. Đây là money page chính cho từ khóa volume cao —
            đọc hướng dẫn chi tiết tại pillar hoặc nhận báo giá ngay.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/banggia" className="brand-btn-primary">
              Báo giá thiết kế website
            </Link>
            <Link href="/du-an" className="brand-btn-secondary">
              Case study có số liệu
            </Link>
            <Link href="/blog/chu-de/website" className="brand-btn-secondary">
              Hub chủ đề Website
            </Link>
          </div>
        </section>

        <WebsiteProofSection />

        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-10">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-700">So sánh giải pháp</p>
          <h2 className="mt-2 text-2xl font-bold text-indigo-950 md:text-3xl">
            Template, WordPress hay website custom?
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ["Website template", "Ra mắt nhanh, chi phí thấp; phù hợp landing hoặc doanh nghiệp mới cần kiểm chứng thị trường."],
              ["Website WordPress", "Dễ quản trị nội dung, hệ sinh thái plugin lớn; phù hợp SME, blog SEO và WooCommerce."],
              ["Website custom", "Thiết kế và tính năng theo quy trình riêng; phù hợp hệ thống cần tích hợp, bảo mật hoặc mở rộng dài hạn."],
            ].map(([title, desc]) => (
              <article key={title} className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-5">
                <h3 className="font-bold text-indigo-950">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/banggia" className="brand-btn-primary">
              Xem báo giá thiết kế website
            </Link>
            <Link href="/blog/thiet-ke-website" className="brand-btn-secondary">
              Hướng dẫn thiết kế website A-Z
            </Link>
          </div>
        </section>

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
          <WebsiteIndustryGrid id="theo-nganh" />

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

            <PackageCarousel accent={config.color} itemCount={WEBSITE_BUILD_PACKAGES.length} desktopCols={4}>
              {WEBSITE_BUILD_PACKAGES.map((pkg, i) => (
                <PricingTierCard
                  key={pkg.id}
                  accent={config.color}
                  title={pkg.name}
                  sectionLabel="Thiết kế Website"
                  features={pkg.works}
                  icon={LayoutTemplate}
                  featured={i === 2}
                />
              ))}
            </PackageCarousel>
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
            <WebsiteOperationSection primaryColor={config.color} sectionLabel="Vận hành Website" />
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

            <PackageCarousel accent={config.color} itemCount={WEBSITE_CARE_PACKAGES.length} desktopCols={3}>
              {WEBSITE_CARE_PACKAGES.map((pkg, i) => {
                const label = `${pkg.posts} bài viết/tháng`;
                return (
                  <PricingTierCard
                    key={pkg.id}
                    accent={config.color}
                    title={label}
                    sectionLabel="Chăm sóc Website"
                    features={pkg.works}
                    icon={FileText}
                    featured={i === 1}
                  />
                );
              })}
            </PackageCarousel>
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

            <PackageCarousel accent={config.color} itemCount={2} desktopCols={2}>
              {[
                {
                  title: "Ngân sách dưới 10 triệu",
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
                  title: "Ngân sách trên 10 triệu",
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
              ].map((ads) => (
                <PricingTierCard
                  key={ads.title}
                  accent={config.color}
                  title={ads.title}
                  sectionLabel="Quảng cáo Website"
                  features={ads.features}
                  icon={ads.icon}
                  variant="ads"
                />
              ))}
            </PackageCarousel>
          </section>

          <MoneyKwSiloLinks
            excludePath="/website"
            title="Cụm money SEO — không tranh từ khóa"
            subtitle="Từ /website liên kết sang báo giá, địa phương HCM, spa và nha khoa — mỗi intent một URL đích."
          />
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
    </PlatformPage>
  );
}



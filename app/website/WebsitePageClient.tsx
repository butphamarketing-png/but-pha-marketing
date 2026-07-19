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

const config: PlatformConfig = {
  name: "Website",
  color: "#8B7CF6",
  theme: "deep",
  auditPlatform: "website",
  heroTitle: "Thiết kế website chuyên nghiệp",
  heroSubtitle: "Thiết kế website chuẩn SEO cho doanh nghiệp — UI/UX, lập trình, bàn giao admin và báo giá minh bạch",
  vision:
    "Thiết kế website là nền tảng marketing số của doanh nghiệp. Bứt Phá Marketing xây website chuẩn SEO, tối ưu chuyển đổi và bàn giao quy trình vận hành rõ ràng.",
  mission:
    "Thiết kế website đẹp, nhanh, chuẩn SEO — từ Landing Page đến website doanh nghiệp và E-commerce, tối ưu từ đầu để giảm chi phí marketing lâu dài.",
  responsibility:
    "Cam kết: bàn giao đúng deadline đã thống nhất, không phát sinh phí ẩn ngoài báo giá, hỗ trợ kỹ thuật sau bàn giao, website ổn định và có tài khoản admin + hướng dẫn sử dụng.",
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
    { step: 1, title: "Khảo sát nhu cầu", desc: "Tư vấn mục đích, tính năng và design style phù hợp thương hiệu." },
    { step: 2, title: "Thiết kế UI/UX", desc: "Wireframe và giao diện tối ưu mọi thiết bị." },
    { step: 3, title: "Lập trình", desc: "Code theo thiết kế, tích hợp tính năng, tối ưu tốc độ." },
    { step: 4, title: "Kiểm thử & Bàn giao", desc: "Test đa thiết bị, bàn giao admin và hướng dẫn sử dụng." },
  ],
  faqs: [
    {
      q: "Thiết kế website mất bao lâu?",
      a: "Landing Page: 3–5 ngày. Website doanh nghiệp: 1–2 tuần. E-commerce: 3–4 tuần. Timeline chốt trong báo giá sau khảo sát.",
    },
    {
      q: "Thiết kế website gồm những gì?",
      a: "Khảo sát, UI/UX, lập trình chuẩn SEO, form/Zalo (theo gói), kiểm thử, bàn giao admin và hướng dẫn vận hành.",
    },
    {
      q: "Có cần tự cung cấp nội dung không?",
      a: "Thông tin sản phẩm/dịch vụ do bạn cung cấp. Có thể hỗ trợ nội dung mẫu theo gói.",
    },
    {
      q: "Website bàn giao xong tự sửa được không?",
      a: "Có. Bạn nhận tài khoản admin và hướng dẫn; tự cập nhật tin tức, sản phẩm, trang cơ bản.",
    },
    {
      q: "Hosting / domain có gói kèm không?",
      a: "Có thể tính riêng hoặc đóng gói theo nhu cầu. Xem mức giá tại trang báo giá thiết kế website.",
    },
    {
      q: "SEO bao lâu lên trang 1?",
      a: "Ít cạnh tranh: 1–3 tháng. Trung bình: 3–6 tháng. Cao: 6–12 tháng. Không cam kết thứ hạng cứng — có case study GSC thật.",
    },
  ],
};

function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5 text-left sm:mb-6">
      <p className="text-[11px] font-medium text-white/40">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]">
        {highlight ? `${highlight} ${title}` : title}
      </h2>
      {subtitle ? <p className="mt-1.5 max-w-xl text-sm text-white/45">{subtitle}</p> : null}
    </div>
  );
}

export default function WebsitePage() {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [auditUrl, setAuditUrl] = useState("");
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  return (
    <PlatformPage config={config}>
      <div className="platform-sections relative mx-auto max-w-6xl space-y-12 px-4 pb-16 pt-7 sm:space-y-14 sm:px-6 sm:pt-9">
        <section className="border-b border-white/[0.08] pb-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/40">
            Dịch vụ website
          </p>
          <h2 className="mt-2 max-w-3xl text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
            Thiết kế website chuyên nghiệp cho doanh nghiệp
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">
            <strong className="font-medium text-white/70">Thiết kế website</strong> gồm khảo sát, UI/UX, lập trình chuẩn
            SEO, form/Zalo và bàn giao vận hành.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              href="/banggia"
              className="inline-flex rounded-md bg-[#6D5CE6] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5B4BD4]"
            >
              Báo giá thiết kế website
            </Link>
            <Link
              href="/du-an"
              className="inline-flex rounded-md border border-white/15 px-4 py-2.5 text-sm font-medium text-white/70 hover:border-white/25 hover:text-white"
            >
              Case study có số liệu
            </Link>
            <Link
              href="/blog/chu-de/website"
              className="inline-flex rounded-md border border-white/15 px-4 py-2.5 text-sm font-medium text-white/70 hover:border-white/25 hover:text-white"
            >
              Hub chủ đề Website
            </Link>
          </div>
        </section>

        <WebsiteProofSection variant="deep" />

        <section className="border-t border-white/[0.06] pt-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/40">So sánh giải pháp</p>
          <h2 className="mt-1.5 text-lg font-semibold text-white sm:text-xl">
            Template, WordPress hay website custom?
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ["Website template", "Ra mắt nhanh, chi phí thấp — landing hoặc kiểm chứng thị trường."],
              ["Website WordPress", "Dễ quản trị, plugin lớn — SME, blog SEO, WooCommerce."],
              ["Website custom", "Theo quy trình riêng — tích hợp, bảo mật, mở rộng dài hạn."],
            ].map(([title, desc]) => (
              <article key={title} className="border-l border-white/15 pl-3.5">
                <h3 className="text-[15px] font-medium text-white/90">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/42">{desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              href="/banggia"
              className="inline-flex rounded-md bg-[#6D5CE6] px-4 py-2 text-sm font-medium text-white hover:bg-[#5B4BD4]"
            >
              Xem báo giá thiết kế website
            </Link>
            <Link
              href="/blog/thiet-ke-website"
              className="inline-flex rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/70 hover:border-white/25"
            >
              Hướng dẫn thiết kế website A-Z
            </Link>
          </div>
        </section>

        <div id="audit" className="scroll-mt-24">
          <PlatformAuditSection
            accentColor={config.color}
            badge="Chuẩn đoán website miễn phí"
            title={
              <>
                Phân tích website và nhận báo cáo chi tiết
              </>
            }
            description="Nhập URL để phân tích tốc độ, SEO on-page, UX/UI và khả năng chuyển đổi."
            placeholder="Nhập URL website (VD: yourdomain.com)"
            buttonLabel="Phân tích ngay"
            value={auditUrl}
            onChange={setAuditUrl}
            onSubmit={() => setIsAuditOpen(true)}
            features={["Tốc độ", "SEO On-page", "UX / UI", "Khả năng chuyển đổi"]}
          />
        </div>

        <WebsiteIndustryGrid id="theo-nganh" variant="deep" />

        <div id="domain" className="grid scroll-mt-24 gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setShowCustomModal(true)}
            className="group flex items-center justify-between border border-white/[0.06] bg-white/[0.02] p-4 text-left transition sm:p-5 hover:border-violet-400/25 hover:bg-white/[0.04] md:p-8"
          >
            <div className="flex items-center gap-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-violet-300/70 transition group-hover:scale-105">
                <Settings size={22} />
              </span>
              <div>
                <h3 className="text-base font-semibold text-white/90">
                  Website Custom
                </h3>
                <p className="mt-1 text-sm text-white/40">Hệ thống riêng biệt</p>
              </div>
            </div>
            <ChevronRight className="hidden h-5 w-5 text-white/30 transition group-hover:translate-x-1 group-hover:text-violet-300/70 md:block" />
          </button>

          <button
            type="button"
            onClick={() => setShowDomainModal(true)}
            className="group flex items-center justify-between border border-white/[0.06] bg-white/[0.02] p-4 text-left transition sm:p-5 hover:border-violet-400/25 hover:bg-white/[0.04] md:p-8"
          >
            <div className="flex items-center gap-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-violet-300/70 transition group-hover:scale-105">
                <Globe size={22} />
              </span>
              <div>
                <h3 className="text-base font-semibold text-white/90">
                  Đăng ký tên miền
                </h3>
                <p className="mt-1 text-sm text-white/40">Quốc tế & Việt Nam</p>
              </div>
            </div>
            <ChevronRight className="hidden h-5 w-5 text-white/30 transition group-hover:translate-x-1 group-hover:text-violet-300/70 md:block" />
          </button>
        </div>

        <section id="pricing" className="scroll-mt-24 space-y-6 border-t border-white/[0.06] pt-8">
          <SectionHeading
            eyebrow="Website Design"
            highlight="Thiết kế"
            title="Website"
            subtitle="Gói website chuẩn SEO — tư vấn miễn phí"
          />
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

        <section id="van-hanh" className="scroll-mt-24 space-y-6 border-t border-white/[0.06] pt-8">
          <SectionHeading
            eyebrow="Managed Operations"
            title="Website"
            highlight="Gói vận hành"
            subtitle="Hosting, bảo mật, backup và hỗ trợ kỹ thuật"
          />
          <WebsiteOperationSection primaryColor={config.color} sectionLabel="Vận hành Website" />
        </section>

        <section id="care" className="scroll-mt-24 space-y-6 border-t border-white/[0.06] pt-8">
          <SectionHeading
            eyebrow="Premium Care"
            highlight="Chăm sóc"
            title="Website"
            subtitle="Theo số lượng bài viết mỗi tháng"
          />
          <PackageCarousel accent={config.color} itemCount={WEBSITE_CARE_PACKAGES.length} desktopCols={3}>
            {WEBSITE_CARE_PACKAGES.map((pkg, i) => (
              <PricingTierCard
                key={pkg.id}
                accent={config.color}
                title={`${pkg.posts} bài viết/tháng`}
                sectionLabel="Chăm sóc Website"
                features={pkg.works}
                icon={FileText}
                featured={i === 1}
              />
            ))}
          </PackageCarousel>
        </section>

        <section id="quang-cao" className="scroll-mt-24 space-y-6 border-t border-white/[0.06] pt-8">
          <SectionHeading
            eyebrow="Advertising"
            highlight="Quảng cáo"
            title="Website"
            subtitle="Google Ads & Meta Ads — đo chuyển đổi chính xác"
          />
          <PackageCarousel accent={config.color} itemCount={2} desktopCols={2}>
            {[
              {
                title: "Ngân sách dưới 10 triệu",
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

        <div className="border-t border-white/[0.06] pt-6 [&_a]:text-white/70 [&_h2]:text-white [&_li]:text-white/45 [&_p]:text-white/40">
          <MoneyKwSiloLinks
            excludePath="/website"
            title="Liên kết liên quan"
            subtitle="Báo giá, địa phương và ngành — mỗi intent một URL đích."
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

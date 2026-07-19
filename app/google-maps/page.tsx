"use client";

import { useState } from "react";
import Link from "next/link";
import { PlatformPage, PlatformConfig } from "@/components/shared/PlatformPage";
import { AuditModal } from "@/components/shared/AuditModal";
import { ServiceConversionFooter } from "@/components/shared/ServiceConversionFooter";
import { Search, Target, Zap, Wrench, Building2, Star, Rocket } from "lucide-react";
import { PlatformAuditSection } from "@/components/shared/PlatformAuditSection";
import { PackageCarousel } from "@/components/shared/PackageCarousel";
import { PricingTierCard } from "@/components/shared/PricingTierCard";
import { GOOGLE_MAPS_PACKAGES } from "@/lib/service-pricing";

const GM_ICONS = [Wrench, Building2, Star] as const;
const config: PlatformConfig = {
  name: "Google Maps",
  color: "#8B7CF6",
  theme: "deep",
  auditPlatform: "googlemaps",
  heroTitle: "Không lên Google Maps",
  heroSubtitle: "Bạn đang mất khách mỗi ngày",
  heroDescription: "Đưa doanh nghiệp lên Google – Tăng lượt gọi – Tăng khách đến cửa hàng",
  vision:
    "Giúp doanh nghiệp xuất hiện đầu tiên khi khách tìm kiếm trên Google Maps và Google Search — kênh intent mua hàng cao nhất.",
  mission:
    "Tối ưu Google Business Profile, xây dựng đánh giá 5 sao uy tín và Local SEO để thống trị kết quả tìm kiếm địa phương.",
  responsibility:
    "Cam kết không dùng đánh giá giả mạo, chỉ chiến lược White Hat được Google chấp nhận và thứ hạng bền vững.",
  tabs: [],
  hidePricingHeader: true,
  hideStats: true,
  hideContact: false,
  customSections: [
    { id: "audit", label: "Kiểm tra vị trí" },
    { id: "gm-pricing", label: "Gói Google Maps" },
    { id: "ads-pricing", label: "Gói Quảng cáo" },
    { id: "benefits", label: "Bạn nhận được gì" },
    { id: "contact", label: "Liên hệ tư vấn" },
  ],
  stats: [
    { label: "GMB tối ưu", value: "400+" },
    { label: "Đánh giá", value: "900+" },
    { label: "Đạt 5 sao", value: "99%" },
    { label: "Năm KN", value: "4+" },
  ],
  process: [
    { step: 1, title: "Audit hiện trạng", desc: "Kiểm tra GBP, điểm yếu và cơ hội cải thiện thứ hạng." },
    { step: 2, title: "Tối ưu Profile", desc: "Cập nhật thông tin đầy đủ, chính xác, nhất quán." },
    { step: 3, title: "Xây dựng nội dung", desc: "Bài viết, ảnh và Q&A hàng tuần tăng độ hoạt động." },
    { step: 4, title: "Thu thập đánh giá", desc: "Review từ khách thật và phản hồi chuyên nghiệp." },
    { step: 5, title: "Theo dõi & Báo cáo", desc: "Thứ hạng hàng tuần, báo cáo kết quả hàng tháng." },
  ],
  faqs: [
    {
      q: "Bao lâu thì xuất hiện trong Local Pack 3?",
      a: "Tùy cạnh tranh ngành và địa bàn. Thường 1–3 tháng vào Local Pack, 3–6 tháng đạt top 1.",
    },
    {
      q: "Google có phạt nếu dùng review dịch vụ không?",
      a: "Chúng tôi chỉ dùng review từ tài khoản thật với nội dung tự nhiên, an toàn theo chính sách Google.",
    },
    {
      q: "Có cần website mới làm Local SEO không?",
      a: "Không bắt buộc nhưng có website tăng hiệu quả SEO Local đáng kể. Có thể làm song song.",
    },
    {
      q: "GMB có phù hợp cho kinh doanh online không?",
      a: "GMB chủ yếu cho doanh nghiệp có địa điểm vật lý. Thuần online nên ưu tiên SEO website hoặc Ads.",
    },
    {
      q: "Kết quả có bền vững không?",
      a: "GMB và Local SEO thường bền vững hơn Ads vì dựa trên độ tin cậy tích lũy. Duy trì review tốt là chìa khóa.",
    },
  ],
};

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5 text-left sm:mb-6">
      <p className="text-[11px] font-medium text-white/40">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]">
        {title}
      </h2>
      {subtitle ? <p className="mx-auto mt-3 max-w-xl text-sm text-white/40">{subtitle}</p> : null}
    </div>
  );
}

export default function GoogleMapsPage() {
  const [auditUrl, setAuditUrl] = useState("");
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  return (
    <PlatformPage config={config}>
      <div className="platform-sections relative mx-auto max-w-6xl space-y-12 px-4 pb-16 pt-7 sm:space-y-14 sm:px-6 sm:pt-9">
        <section className="border-b border-white/[0.08] pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Google Maps Marketing
          </p>
          <h2
            className="mt-2 max-w-3xl text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl"
           
          >
            Tối ưu Google Business Profile và Local SEO
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">
            <strong className="font-medium text-white/70">Google Maps Marketing</strong> giúp doanh nghiệp xuất hiện khi
            khách tìm địa phương — intent mua hàng cao nhất. Audit GBP, tối ưu thông tin, review thật, content Maps và
            Local Ads — kết hợp website chuẩn SEO.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/blog/chu-de/google-maps"
              className="inline-flex rounded-md bg-[#6D5CE6] px-4 py-2 text-sm font-medium text-white hover:bg-[#5B4BD4]"
            >
              Hub Google Maps
            </Link>
            <Link
              href="/website"
              className="inline-flex rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/75 hover:border-white/25"
            >
              Website + Local SEO
            </Link>
            <Link
              href="/du-an/nha-khoa-dang-khoa"
              className="inline-flex rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/75 hover:border-white/25"
            >
              Case study
            </Link>
          </div>
        </section>

        <section className="border-t border-white/[0.08] pt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">NAP đồng nhất</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            Checklist Local SEO — tên · địa chỉ · SĐT
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/45">
            Google đối chiếu NAP trên website, GBP và directory. Sai một trường là mất điểm Local Pack.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/65">
            <li>
              <span className="text-white/80">NAP chuẩn BPM:</span> Bứt Phá Marketing · Tổ 8 ấp 6 Bình Mỹ, TP.HCM ·
              0937 417 982
            </li>
            <li>
              Đồng bộ footer, schema LocalBusiness, GBP và{" "}
              <Link href="/google-maps" className="text-white/70 underline-offset-2 hover:underline">
                /google-maps
              </Link>
            </li>
            <li>
              Gắn{" "}
              <Link href="/website" className="text-white/70 underline-offset-2 hover:underline">
                /website
              </Link>{" "}
              và{" "}
              <Link href="/banggia" className="text-white/70 underline-offset-2 hover:underline">
                /banggia
              </Link>{" "}
              vào mô tả GBP khi phù hợp
            </li>
            <li>
              Kiến thức:{" "}
              <Link href="/blog/chu-de/google-maps" className="text-white/70 underline-offset-2 hover:underline">
                hub Google Maps
              </Link>
            </li>
          </ul>
        </section>

        <section className="border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">Proof thực chiến</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            Local SEO gắn với website và lead
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-white/65">
            <li>
              Nha Khoa Đăng Khoa: <span className="text-white/80">15,4K impressions</span> ·{" "}
              <span className="text-white/80">471 clicks</span> GSC — GBP/Maps bổ sung gọi điện & chỉ đường
            </li>
            <li>Mô hình: GBP chuẩn → review thật → content Maps → landing message-match</li>
            <li>
              Xem{" "}
              <Link href="/du-an/nha-khoa-dang-khoa" className="text-white/70 underline-offset-2 hover:underline">
                case study nha khoa
              </Link>{" "}
              hoặc{" "}
              <Link href="/website" className="text-white/70 underline-offset-2 hover:underline">
                thiết kế website
              </Link>
            </li>
          </ul>
        </section>

        <section className="border-t border-white/[0.08] pt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">So sánh giải pháp</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            Google Maps, Local SEO hay Local Ads?
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Tối ưu Google Maps", "Hồ sơ thiếu thông tin, danh mục, hình ảnh hoặc review — nền tảng cần hoàn thiện trước."],
              ["Local SEO", "Tăng thứ hạng bền vững bằng GBP, website địa phương, citation và nội dung."],
              ["Local Ads", "Cần lượt gọi nhanh — hiệu quả nhất khi Maps và landing đã chuẩn chuyển đổi."],
            ].map(([title, desc]) => (
              <article key={title} className="border-l border-white/15 pl-4">
                <h3 className="text-lg font-medium text-white/90">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <div id="audit" className="scroll-mt-24">
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
        </div>

        <section id="gm-pricing" className="scroll-mt-24 space-y-12 border-t border-white/[0.08] pt-8">
          <SectionHeading
            eyebrow="Google Business Profile"
            title="Gói Google Maps"
            subtitle="Lựa chọn gói phù hợp với nhu cầu của bạn"
          />
          <PackageCarousel accent={config.color} itemCount={GOOGLE_MAPS_PACKAGES.length} desktopCols={3}>
            {GOOGLE_MAPS_PACKAGES.map((pkg, i) => (
              <PricingTierCard
                key={pkg.id}
                accent={config.color}
                title={pkg.name}
                sectionLabel="Gói Google Maps"
                features={pkg.works}
                icon={GM_ICONS[i]}
                featured={i === 2}
                featuredLabel="Lựa chọn tốt"
              />
            ))}
          </PackageCarousel>
        </section>

        <section id="ads-pricing" className="scroll-mt-24 space-y-12 border-t border-white/[0.08] pt-8">
          <SectionHeading
            eyebrow="Local Ads"
            title="Gói quảng cáo Google Maps"
            subtitle="Lựa chọn gói phù hợp với ngân sách của bạn"
          />
          <PackageCarousel accent={config.color} itemCount={2} desktopCols={2}>
            {[
              {
                title: "Gói cơ bản",
                icon: Target,
                featured: true,
                features: [
                  "Setup chiến dịch Google Maps",
                  "Tối ưu hiển thị địa điểm trên Google",
                  "Nghiên cứu từ khóa tìm kiếm khách hàng",
                  "Target đúng khu vực (bán kính / thành phố)",
                  "Theo dõi & tối ưu quảng cáo mỗi ngày",
                  "Báo cáo hiệu quả định kỳ",
                ],
              },
              {
                title: "Gói nâng cao",
                icon: Zap,
                features: [
                  "Setup chiến dịch chuyên sâu Google Maps",
                  "Tối ưu từ khóa + vị trí hiển thị TOP",
                  "Phân tích hành vi khách hàng",
                  "Remarketing (bám đuổi khách hàng)",
                  "Tối ưu chi phí – tăng chuyển đổi",
                  "Theo dõi & tối ưu liên tục",
                  "Báo cáo chi tiết + đề xuất chiến lược",
                ],
              },
            ].map((ads) => (
              <PricingTierCard
                key={ads.title}
                accent={config.color}
                title={ads.title}
                sectionLabel="Quảng cáo Google Maps"
                features={ads.features}
                icon={ads.icon}
                featured={ads.featured}
                featuredLabel="Bán chạy"
                variant="ads"
              />
            ))}
          </PackageCarousel>
        </section>

        <section id="benefits" className="scroll-mt-24 border-t border-white/[0.08] pt-8">
          <SectionHeading eyebrow="Lợi ích" title="Bạn nhận được gì?" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Search, title: "Xuất hiện khi khách tìm gần bạn", desc: "Tiếp cận khách hàng tiềm năng đúng lúc" },
              { icon: Rocket, title: "Tăng lượt gọi và chỉ đường", desc: "Khách dễ liên hệ và đến cửa hàng" },
              { icon: Building2, title: "Hiển thị chuyên nghiệp hơn đối thủ", desc: "Thông tin đầy đủ, hình ảnh đẹp" },
              { icon: Star, title: "Được khách tin tưởng hơn", desc: "Review tốt nâng uy tín thương hiệu" },
            ].map((item) => (
              <div key={item.title} className="border-l border-white/15 pl-4">
                <item.icon className="h-4 w-4 text-white/40" />
                <h3 className="mt-3 text-base font-medium text-white/90">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-white/10 bg-[#0e1018] px-5 py-6 text-center sm:px-6">
          <h2 className="text-xl font-semibold text-white sm:text-[1.35rem]">
            Bạn đã xuất hiện trên Google Maps chưa?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/45">
            Kiểm tra vị trí ngay — đừng để mất khách hàng tiềm năng.
          </p>
          <button
            type="button"
            onClick={() => {
              document.getElementById("audit")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="mt-5 inline-flex rounded-md bg-[#6D5CE6] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#5B4BD4]"
          >
            Kiểm tra ngay
          </button>
        </section>

        <div className="[&_*]:border-white/10 [&_a]:text-white/70 [&_h2]:text-white [&_p]:text-white/45">
          <ServiceConversionFooter title="Tư vấn Google Maps & tài liệu liên quan" />
        </div>
      </div>

      <AuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        initialLink={auditUrl}
        source="Phân tích Google Maps"
        platformColor={config.color}
      />
    </PlatformPage>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { PlatformPage, PlatformConfig } from "@/components/shared/PlatformPage";
import { AuditModal } from "@/components/shared/AuditModal";
import { ServiceConversionFooter } from "@/components/shared/ServiceConversionFooter";
import { Check, Search, Target, Zap, Wrench, Building2, Star, Rocket, ChevronRight } from "lucide-react";
import { PlatformAuditSection } from "@/components/shared/PlatformAuditSection";
import { PackageCarousel } from "@/components/shared/PackageCarousel";
import { PricingTierCard } from "@/components/shared/PricingTierCard";
import { GOOGLE_MAPS_PACKAGES } from "@/lib/service-pricing";

const GM_ICONS = [Wrench, Building2, Star] as const;

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
  const [auditUrl, setAuditUrl] = useState("");
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  return (
    <PlatformPage config={config}>
      <div className="platform-sections mx-auto max-w-7xl px-4 pb-24 space-y-32">
        <section className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-orange-50/80 via-white to-amber-50/40 p-6 md:p-10">
          <p className="brand-eyebrow mb-3">Dịch vụ Google Maps Marketing</p>
          <h2 className="text-3xl font-black tracking-tight text-indigo-950 md:text-4xl">
            Tối ưu Google Business Profile và Local SEO
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            <strong>Google Maps Marketing</strong> giúp doanh nghiệp xuất hiện khi khách tìm kiếm địa phương — intent
            mua hàng cao nhất. Bứt Phá triển khai audit GBP, tối ưu thông tin, thu review thật, content Maps và Local
            Ads — kết hợp website chuẩn SEO để tăng lượt gọi và khách đến cửa hàng.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/lien-he" className="brand-btn-primary">
              Tư vấn Google Maps
            </Link>
            <Link href="/banggia" className="brand-btn-secondary">
              Báo giá Maps &amp; Marketing
            </Link>
            <Link href="/website" className="brand-btn-secondary">
              Website + Local SEO
            </Link>
            <Link href="/google-maps/thiet-ke-google-maps" className="brand-btn-secondary">
              Thiết kế Google Maps
            </Link>
            <Link href="/blog/chu-de/google-maps" className="brand-btn-secondary">
              Kiến thức Local SEO
            </Link>
            <Link href="/seo-website/dia-phuong/ho-chi-minh" className="brand-btn-secondary">
              SEO địa phương HCM
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-orange-100 bg-orange-50/50 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-700">NAP đồng nhất</p>
          <h2 className="mt-2 text-2xl font-bold text-indigo-950">Checklist Local SEO — tên · địa chỉ · SĐT</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
            Google đối chiếu NAP trên website, Google Business Profile và directory. Sai một trường là mất điểm Local Pack.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 md:text-base">
            <li>
              <strong>NAP chuẩn BPM:</strong> Bứt Phá Marketing · Tổ 8 ấp 6 Bình Mỹ, TP.HCM · 0937 417 982
            </li>
            <li>Đồng bộ footer website, schema LocalBusiness, GBP và trang /lien-he.</li>
            <li>
              Gắn website money page (<Link href="/website" className="font-semibold text-violet-700 underline">/website</Link>) và bảng giá (
              <Link href="/banggia" className="font-semibold text-violet-700 underline">/banggia</Link>) vào mô tả GBP khi phù hợp dịch vụ.
            </li>
            <li>
              Landing local theo quận (Phase 3):{" "}
              <Link href="/seo-website/dia-phuong/quan-1" className="font-semibold text-violet-700 underline">
                Quận 1
              </Link>
              {", "}
              <Link href="/seo-website/dia-phuong/quan-7" className="font-semibold text-violet-700 underline">
                Quận 7
              </Link>
              {", "}
              <Link href="/seo-website/dia-phuong/cau-giay" className="font-semibold text-violet-700 underline">
                Cầu Giấy
              </Link>
              {", "}
              <Link href="/seo-website/dia-phuong/hai-chau" className="font-semibold text-violet-700 underline">
                Hải Châu
              </Link>
              {" · "}
              <Link href="/seo-website/dia-phuong/ho-chi-minh" className="font-semibold text-violet-700 underline">
                hub TP.HCM
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Proof thực chiến</p>
          <h2 className="mt-2 text-2xl font-bold text-emerald-900">Local SEO gắn với website và lead</h2>
          <ul className="mt-4 space-y-2 text-emerald-950">
            <li>
              Nha Khoa Đăng Khoa: <strong>15,4K impressions</strong> và <strong>471 clicks</strong> từ Google Search
              sau triển khai website + SEO — GBP và Maps bổ sung kênh gọi điện/chỉ đường.
            </li>
            <li>Mô hình: GBP chuẩn → review thật → content Maps → landing page message-match.</li>
            <li>
              Xem{" "}
              <Link href="/du-an/nha-khoa-dang-khoa" className="font-semibold underline">
                case study nha khoa
              </Link>{" "}
              hoặc hub{" "}
              <Link href="/seo-website" className="font-semibold underline">
                SEO Website
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-700">So sánh giải pháp</p>
          <h2 className="mt-2 text-2xl font-bold text-indigo-950">Google Maps, Local SEO hay Local Ads?</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ["Tối ưu Google Maps", "Dành cho hồ sơ thiếu thông tin, danh mục, hình ảnh hoặc review. Đây là nền tảng cần hoàn thiện trước."],
              ["Local SEO", "Dành cho doanh nghiệp muốn tăng thứ hạng bền vững bằng GBP, website địa phương, citation và nội dung."],
              ["Local Ads", "Dành cho chiến dịch cần lượt gọi nhanh. Hiệu quả tốt nhất khi hồ sơ Maps và landing page đã chuẩn chuyển đổi."],
            ].map(([title, desc]) => (
              <article key={title} className="rounded-2xl border border-orange-100 bg-orange-50/30 p-5">
                <h3 className="font-bold text-indigo-950">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
              </article>
            ))}
          </div>
        </section>

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

        <div className="mt-10">
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

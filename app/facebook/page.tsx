"use client";

import { useState } from "react";
import Link from "next/link";
import { PlatformPage, PlatformConfig } from "@/components/shared/PlatformPage";
import { Target, Rocket, Settings, UserCheck, Zap } from "lucide-react";
import { PlatformAuditSection } from "@/components/shared/PlatformAuditSection";
import { PackageCarousel } from "@/components/shared/PackageCarousel";
import { PricingTierCard } from "@/components/shared/PricingTierCard";
import { AuditModal } from "@/components/shared/AuditModal";
import { ServiceConversionFooter } from "@/components/shared/ServiceConversionFooter";
import { FANPAGE_BUILD_PACKAGES, FANPAGE_CARE_PACKAGES } from "@/lib/service-pricing";

const BUILD_ICONS = [Settings, UserCheck, Rocket] as const;
const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

const config: PlatformConfig = {
  name: "Facebook",
  color: "#C4955A",
  theme: "deep",
  auditPlatform: "facebook",
  heroTitle: "Facebook Marketing cho doanh nghiệp",
  heroSubtitle: "Thiết kế Fanpage · Chăm sóc content · Meta Ads — một Money Page",
  heroDescription: "Tăng tương tác và chuyển đổi tin nhắn trên Fanpage",
  vision:
    "Facebook Marketing là kênh thu hút và nuôi dưỡng khách hàng. Bứt Phá xây Fanpage chuẩn thương hiệu, content đều và Meta Ads đo được inbox/lead.",
  mission:
    "Triển khai đầy đủ funnel: thiết kế Fanpage → chăm sóc → quảng cáo, đồng bộ website khi cần — không chạy ads khi nền tảng còn yếu.",
  responsibility:
    "Cam kết: minh bạch ngân sách ads, báo cáo định kỳ, không dùng tương tác ảo; KPI và phạm vi ghi rõ trong báo giá/hợp đồng.",
  tabs: [],
  hidePricingHeader: true,
  hideStats: true,
  hideContact: false,
  customSections: [
    { id: "audit", label: "Chuẩn đoán Fanpage" },
    { id: "build", label: "Xây dựng Fanpage" },
    { id: "care", label: "Chăm sóc Fanpage" },
    { id: "ads", label: "Quảng cáo Fanpage" },
  ],
  stats: [
    { label: "Khách hàng", value: "500+" },
    { label: "Dự án", value: "1.200+" },
    { label: "Hài lòng", value: "98%" },
    { label: "Năm KN", value: "5+" },
  ],
  process: [
    {
      step: 1,
      title: "Tư vấn & Phân tích",
      desc: "Chúng tôi lắng nghe nhu cầu, phân tích thị trường và đề xuất giải pháp phù hợp nhất cho doanh nghiệp của bạn.",
    },
    {
      step: 2,
      title: "Lên kế hoạch",
      desc: "Xây dựng kế hoạch nội dung chi tiết, chiến lược target khách hàng và lịch triển khai cụ thể.",
    },
    {
      step: 3,
      title: "Triển khai",
      desc: "Thực hiện đúng kế hoạch, đăng bài đúng giờ, quản lý quảng cáo và tương tác với cộng đồng hàng ngày.",
    },
    {
      step: 4,
      title: "Theo dõi & Tối ưu",
      desc: "Theo dõi số liệu thực tế, điều chỉnh chiến lược và tối ưu liên tục để đạt kết quả tốt nhất.",
    },
    {
      step: 5,
      title: "Báo cáo & Tăng trưởng",
      desc: "Báo cáo minh bạch định kỳ, đề xuất hướng phát triển và mở rộng quy mô khi đã có kết quả ổn định.",
    },
  ],
  faqs: [
    {
      q: "Bao lâu thì thấy kết quả từ Facebook Ads?",
      a: "Thông thường sau 7-14 ngày chạy Ads, bạn sẽ thấy kết quả ban đầu. Để tối ưu hoàn toàn thường cần 1-2 tháng để thuật toán học và tối ưu.",
    },
    {
      q: "Fanpage cần bao nhiêu like mới chạy Ads hiệu quả?",
      a: "Không cần số lượng like tối thiểu. Tuy nhiên Fanpage có từ 1.000 like trở lên thường có độ tin cậy cao hơn và hiệu quả Ads tốt hơn.",
    },
    {
      q: "Chi phí quảng cáo có được hoàn lại nếu không hiệu quả?",
      a: "Ngân sách Ads được chi trả trực tiếp cho Facebook. Chúng tôi cam kết tối ưu liên tục và báo cáo minh bạch, nếu không đạt KPI cam kết sẽ làm thêm 1 tháng miễn phí.",
    },
    {
      q: "Có thể tự chạy Ads song song với gói dịch vụ không?",
      a: "Được. Chúng tôi sẽ tư vấn để tránh xung đột ngân sách và target, đảm bảo hiệu quả tổng thể tốt nhất.",
    },
    {
      q: "Báo cáo kết quả như thế nào?",
      a: "Báo cáo hàng tuần qua Email/Messenger bao gồm: số lượt tiếp cận, tương tác, chuyển đổi, chi phí/kết quả và đề xuất tuần tiếp theo.",
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
    <div className="mb-10 text-center sm:mb-12">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl" style={serif}>
        {title}
      </h2>
      {subtitle ? <p className="mx-auto mt-3 max-w-xl text-sm text-white/40">{subtitle}</p> : null}
    </div>
  );
}

export default function FacebookPage() {
  const [auditUrl, setAuditUrl] = useState("");
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  return (
    <PlatformPage config={config}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[55vh]"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(196,149,90,0.14), transparent 58%), radial-gradient(ellipse 40% 30% at 85% 20%, rgba(24,119,242,0.08), transparent)",
        }}
        aria-hidden
      />

      <div className="platform-sections relative mx-auto max-w-6xl space-y-20 px-4 pb-24 pt-10 sm:space-y-24 sm:px-6 sm:pt-14">
        <section className="border-b border-white/[0.06] pb-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-200/70">
            Dịch vụ Facebook Marketing
          </p>
          <h2
            className="mt-4 max-w-3xl text-[clamp(1.85rem,4.5vw,3.25rem)] font-semibold leading-[1.12] text-white"
            style={serif}
          >
            Thiết kế Fanpage, chăm sóc nội dung và quảng cáo Meta Ads
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/45 sm:text-[15px]">
            <strong className="font-medium text-white/70">Facebook Marketing</strong> tại Bứt Phá gồm xây dựng Fanpage
            chuẩn thương hiệu, chăm sóc content đều đặn và chạy Meta Ads tối ưu chuyển đổi tin nhắn/lead. Funnel đầy đủ:
            thiết kế → care → ads — đồng bộ với website và Google Maps để không mất lead giữa các kênh.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/du-an/sao-khue"
              className="inline-flex rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-[#0b0d12] hover:bg-amber-100"
            >
              Case study Fanpage
            </Link>
            <Link
              href="/blog/chu-de/facebook"
              className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 hover:border-white/25"
            >
              Hub Facebook
            </Link>
            <Link
              href="/website"
              className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 hover:border-white/25"
            >
              Đồng bộ thiết kế website
            </Link>
          </div>
        </section>

        <section className="border border-amber-200/15 bg-gradient-to-br from-amber-200/[0.07] to-transparent px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/60">Proof thực chiến</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl" style={serif}>
            Fanpage có số liệu, không chỉ đẹp
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-white/65">
            <li>
              Sao Khuê: Fanpage đạt <span className="text-amber-100">83.374 lượt xem</span> trong 90 ngày và{" "}
              <span className="text-amber-100">4.329 lượt xem video</span> ≥3 giây — bổ sung kênh lead song song Google.
            </li>
            <li>Thiên Hoàng Kim, Nha Khoa Đăng Khoa: Fanpage đồng bộ cover, bio và website — nuôi lead inbox.</li>
            <li>
              Xem chi tiết tại{" "}
              <Link href="/du-an/sao-khue" className="text-amber-200/80 underline-offset-2 hover:underline">
                case study Sao Khuê
              </Link>{" "}
              hoặc{" "}
              <Link href="/du-an/thien-hoang-kim" className="text-amber-200/80 underline-offset-2 hover:underline">
                Thiên Hoàng Kim
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="border-t border-white/[0.06] pt-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">So sánh giải pháp</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl" style={serif}>
            Nên xây Fanpage, chăm sóc hay chạy quảng cáo?
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              [
                "Thiết kế Fanpage",
                "Phù hợp trang mới hoặc nhận diện chưa đồng bộ. Ưu tiên avatar, cover, bio và cấu trúc dịch vụ.",
              ],
              [
                "Chăm sóc nội dung",
                "Phù hợp Fanpage đã có nền tảng nhưng đăng bài thiếu đều đặn, tương tác và thông điệp chưa nhất quán.",
              ],
              [
                "Meta Ads",
                "Phù hợp khi đã có nội dung, offer và quy trình xử lý inbox. Quảng cáo giúp mở rộng lead nhanh hơn.",
              ],
            ].map(([title, desc]) => (
              <article key={title} className="border-l border-amber-200/25 pl-4">
                <h3 className="text-lg font-medium text-white/90">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <div id="audit" className="scroll-mt-24">
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
        </div>

        <section id="build" className="scroll-mt-24 space-y-12 border-t border-white/[0.06] pt-14">
          <SectionHeading eyebrow="Professional Service" title="Dịch vụ Xây dựng Fanpage" />
          <PackageCarousel accent={config.color} itemCount={FANPAGE_BUILD_PACKAGES.length} desktopCols={3}>
            {FANPAGE_BUILD_PACKAGES.map((pkg, i) => (
              <PricingTierCard
                key={pkg.id}
                accent={config.color}
                title={pkg.name}
                sectionLabel="Xây dựng Fanpage"
                features={pkg.works}
                icon={BUILD_ICONS[i]}
                featured={i === 2}
                featuredLabel="Bán chạy"
              />
            ))}
          </PackageCarousel>
        </section>

        <section id="care" className="scroll-mt-24 space-y-12 border-t border-white/[0.06] pt-14">
          <SectionHeading
            eyebrow="Premium Care"
            title="Chăm sóc Fanpage"
            subtitle="Theo số lượng bài viết mỗi tháng"
          />
          <PackageCarousel accent={config.color} itemCount={FANPAGE_CARE_PACKAGES.length} desktopCols={3}>
            {FANPAGE_CARE_PACKAGES.map((pkg, i) => {
              const label = `${pkg.posts} bài / tháng`;
              return (
                <PricingTierCard
                  key={pkg.id}
                  accent={config.color}
                  title={label}
                  sectionLabel="Chăm sóc Fanpage"
                  features={pkg.works}
                  featured={i === 1}
                />
              );
            })}
          </PackageCarousel>
        </section>

        <section id="ads" className="scroll-mt-24 space-y-12 border-t border-white/[0.06] pt-14">
          <SectionHeading eyebrow="Advertising" title="Quảng cáo Fanpage" />
          <PackageCarousel accent={config.color} itemCount={2} desktopCols={2}>
            {[
              {
                title: "Ngân sách dưới 10 triệu",
                icon: Target,
                features: [
                  "Thiết lập và tối ưu chiến dịch quảng cáo",
                  "Nghiên cứu khách hàng mục tiêu",
                  "Lên nội dung và hình ảnh quảng cáo",
                  "Theo dõi, tối ưu hiệu quả",
                  "Báo cáo kết quả",
                ],
              },
              {
                title: "Ngân sách trên 10 triệu",
                icon: Zap,
                features: [
                  "Thiết lập và tối ưu chiến dịch quảng cáo",
                  "Nghiên cứu khách hàng mục tiêu",
                  "Lên nội dung và hình ảnh quảng cáo",
                  "Theo dõi, tối ưu hiệu quả",
                  "Báo cáo kết quả",
                  "A/B Testing chiến dịch",
                  "Tối ưu hóa chuyển đổi",
                ],
              },
            ].map((ads) => (
              <PricingTierCard
                key={ads.title}
                accent={config.color}
                title={ads.title}
                sectionLabel="Quảng cáo Fanpage"
                features={ads.features}
                icon={ads.icon}
                variant="ads"
              />
            ))}
          </PackageCarousel>
        </section>

        <div className="[&_*]:border-white/10 [&_a]:text-amber-200/80 [&_h2]:text-white [&_p]:text-white/45">
          <ServiceConversionFooter title="Tư vấn Facebook & tài liệu liên quan" />
        </div>
      </div>

      <AuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        initialLink={auditUrl}
        source="Phân tích Fanpage"
        platformColor={config.color}
      />
    </PlatformPage>
  );
}

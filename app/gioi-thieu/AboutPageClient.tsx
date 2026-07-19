"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ZaloConsultCta } from "@/components/blog/ZaloConsultCta";
import { SiteNavMenu } from "@/components/shared/SiteNavMenu";
import {
  ArrowRight,
  BriefcaseBusiness,
  Handshake,
  LayoutTemplate,
  LineChart,
  MapPinned,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { SiFacebook } from "react-icons/si";
import { useAdmin } from "@/lib/AdminContext";
import { DEFAULT_HERO_SLIDE, DEFAULT_INTRO_IMAGE } from "@/lib/media-assets";
import { db, type Service } from "@/lib/useData";
import { playClickSound } from "@/lib/utils";
import { getMailtoHref, resolveAddress, resolveEmail, resolveHotline } from "@/lib/site-contact";

/** Eyebrow · H2 · body — scale gọn, không loè */
const eye = "text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300/65";
const h2 = "mt-1.5 text-[1.4rem] font-semibold leading-snug tracking-tight text-white sm:text-[1.6rem]";
const body = "text-sm leading-relaxed text-white/48";
const section = "mt-6 border-t border-white/[0.07] pt-5 sm:mt-7 sm:pt-6";

export default function AboutPageClient() {
  const [services, setServices] = useState<Service[]>([]);
  const { settings } = useAdmin();

  useEffect(() => {
    void db.services.getAll().then((result) => setServices(result.data || []));
  }, []);

  const brandName = settings?.title || "Bứt Phá Marketing";
  const logoSrc = "/logo.png";
  const teamImage = DEFAULT_INTRO_IMAGE;
  const heroVisual = DEFAULT_HERO_SLIDE;

  const serviceHighlights = useMemo(() => {
    const websiteService = services.find((item) => item.platform === "website");
    const facebookService = services.find((item) => item.platform === "facebook");
    const googleMapsService = services.find((item) => item.platform === "googlemaps");

    return [
      {
        title: websiteService?.name || "Xây dựng nền tảng số chuyên nghiệp",
        description:
          websiteService?.features?.slice(0, 2).join(", ") ||
          "Thiết kế website chuẩn SEO, tối ưu trải nghiệm, tạo nền tảng vững chắc cho mọi hoạt động marketing.",
        icon: LayoutTemplate,
      },
      {
        title: facebookService?.name || "Phát triển thương hiệu trên mạng xã hội",
        description:
          facebookService?.features?.slice(0, 2).join(", ") ||
          "Quản trị fanpage bài bản, xây dựng nội dung chiến lược, tăng tương tác và chuyển đổi thực tế.",
        icon: SiFacebook,
      },
      {
        title: "Tối ưu tìm kiếm & tăng trưởng bền vững",
        description:
          "SEO website, SEO Google Maps — xuất hiện đúng lúc, đúng nơi, đúng khách hàng.",
        icon: Sparkles,
      },
      {
        title: googleMapsService?.name || "Gia tăng hiện diện địa phương",
        description:
          googleMapsService?.features?.slice(0, 2).join(", ") ||
          "Tối ưu Google Maps, đánh giá, hình ảnh để bạn nổi bật trong khu vực.",
        icon: MapPinned,
      },
      {
        title: "Đo lường – tối ưu – tăng trưởng",
        description: "Báo cáo minh bạch, tối ưu liên tục — hiệu quả cao với chi phí hợp lý.",
        icon: LineChart,
      },
    ];
  }, [services]);

  const workPrinciples = [
    {
      title: "Hiệu quả là thước đo",
      description: "Không hứa suông — tập trung kết quả thực tế và tăng trưởng bền vững.",
      icon: Target,
    },
    {
      title: "Đồng hành như đối tác",
      description: "Lắng nghe, thấu hiểu và cùng bạn ra quyết định.",
      icon: Handshake,
    },
    {
      title: "Minh bạch & trung thực",
      description: "Chiến lược, chi phí, kết quả đều báo cáo rõ và đo được.",
      icon: Users,
    },
    {
      title: "Không ngừng cải tiến",
      description: "Cập nhật xu hướng và công nghệ để tối ưu giải pháp.",
      icon: Rocket,
    },
  ];

  const whyChooseUs = [
    "Kinh nghiệm thực chiến",
    "Giải pháp toàn diện",
    "Cam kết hiệu quả",
    "Hỗ trợ tận tâm",
    "Tối ưu chi phí",
    "Báo cáo minh bạch",
  ];

  const scrollToConsultation = () => {
    playClickSound();
    window.location.href = "/lien-he";
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden deep-theme bg-[#08090c] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,124,246,0.1), transparent 60%), linear-gradient(180deg, #0e1018 0%, #08090c 100%)",
        }}
        aria-hidden
      />

      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0e1018]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logoSrc} alt={brandName} width={40} height={40} className="h-10 w-10 object-contain" />
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-white">{brandName}</div>
              <div className="text-[11px] text-white/40">Marketing thực chiến</div>
            </div>
          </Link>

          <div className="hidden lg:block">
            <SiteNavMenu tone="dark" layout="horizontal" activeHref="/gioi-thieu" />
          </div>

          <button
            type="button"
            onClick={scrollToConsultation}
            className="hidden items-center gap-2 rounded-md bg-[#6D5CE6] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#5B4BD4] lg:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" />
            Liên hệ tư vấn
          </button>

          <div className="lg:hidden [&_button]:text-white/80">
            <SiteNavMenu tone="dark" activeHref="/gioi-thieu" />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 sm:pt-5">
        {/* Hero */}
        <section className="relative grid items-center gap-5 border-b border-white/[0.07] pb-6 pt-1 sm:gap-6 sm:pb-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8">
          <div className="relative z-10">
            <p className={eye}>Về chúng tôi</p>
            <h1
              className="mt-1.5 max-w-xl text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-[2.05rem]"
            >
              {brandName}
            </h1>
            <p className={`mt-2 max-w-md ${body}`}>
              Đồng hành bứt phá cùng doanh nghiệp — tư vấn đúng, triển khai hiệu quả, đo lường minh bạch.
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={scrollToConsultation}
                className="inline-flex items-center gap-2 rounded-md bg-[#6D5CE6] px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-[#5B4BD4]"
              >
                Liên hệ tư vấn
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <Link
                href="/banggia"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-white/75 transition hover:border-white/25 hover:text-white"
              >
                Bảng giá dịch vụ
              </Link>
            </div>
          </div>

          <div className="relative aspect-[5/3] overflow-hidden border border-white/10 bg-white/[0.03] lg:aspect-auto lg:h-[240px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={teamImage || heroVisual}
              alt="Đội ngũ Bứt Phá Marketing"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/50 via-transparent to-transparent" />
          </div>
        </section>

        {/* 01 Who */}
        <section className="pt-5 sm:pt-6">
          <p className={eye}>01</p>
          <h2 className={h2}>
            Bứt Phá Marketing là ai?
          </h2>

          <div className={`mt-3 max-w-3xl space-y-2.5 ${body}`}>
            <p>
              Bứt Phá Marketing cung cấp giải pháp marketing toàn diện cho SME, doanh nghiệp địa phương và thương hiệu
              đang phát triển.
            </p>
            <p>
              Đội ngũ thực chiến trong website, fanpage, SEO, Google Maps và quảng cáo — hiểu mỗi doanh nghiệp cần một
              chiến lược riêng.
            </p>
            <p className="text-white/70">
              Chúng tôi đề cao thấu hiểu, tư vấn đúng và triển khai hiệu quả — lấy kết quả khách hàng làm thước đo.
            </p>
          </div>

          <div className="mt-5 grid gap-4 border-t border-white/[0.07] pt-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {[
              { value: "300+", label: "Khách hàng đồng hành", icon: Users },
              { value: "1000+", label: "Dự án đã triển khai", icon: BriefcaseBusiness },
              { value: "5+ năm", label: "Kinh nghiệm thực chiến", icon: Sparkles },
              { value: "95%", label: "Khách tiếp tục hợp tác", icon: Target },
            ].map((stat) => (
              <div key={stat.value} className="border-l border-white/10 pl-3">
                <stat.icon className="h-3.5 w-3.5 text-violet-300/70" />
                <p className="mt-1 text-xl font-semibold text-white">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 02 What we do */}
        <section className={section}>
          <p className={eye}>02</p>
          <h2 className={h2}>
            Điều chúng tôi thực sự làm
          </h2>
          <div className="mt-3 divide-y divide-white/[0.07]">
            {serviceHighlights.map((item) => (
              <div key={item.title} className="grid gap-2.5 py-3 sm:grid-cols-[36px_1fr] sm:gap-3.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-violet-200/80">
                  <item.icon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <h3 className="text-[15px] font-medium text-white/90">{item.title}</h3>
                  <p className={`mt-0.5 max-w-2xl ${body}`}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Proof */}
        <section className={`${section} border border-white/10 bg-white/[0.02] px-4 py-5 sm:px-6`}>
          <p className={eye}>Proof</p>
          <h2 className={h2}>
            Dự án có số liệu thật
          </h2>
          <p className={`mt-2 max-w-2xl ${body}`}>
            Đo bằng Google Search Console, Facebook Insights và lead thực tế — không vanity metrics.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-white/65">
            <li>
              Nha Khoa Đăng Khoa: <span className="text-violet-200/90">15,4K impressions</span> ·{" "}
              <span className="text-violet-200/90">471 clicks</span> GSC
            </li>
            <li>
              Sao Khuê: Fanpage <span className="text-violet-200/90">83.374 lượt xem</span> / 90 ngày
            </li>
            <li>Thiên Hoàng Kim: website + Fanpage đồng bộ, nuôi lead inbox</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/du-an"
              className="inline-flex rounded-md bg-[#6D5CE6] px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-[#5B4BD4]"
            >
              Xem case study
            </Link>
            <Link
              href="/du-an/nha-khoa-dang-khoa"
              className="inline-flex rounded-md border border-white/15 px-3.5 py-1.5 text-sm font-medium text-white/70 hover:border-white/25 hover:text-white"
            >
              Nha khoa Đăng Khoa
            </Link>
            <Link
              href="/du-an/sao-khue"
              className="inline-flex rounded-md border border-white/15 px-3.5 py-1.5 text-sm font-medium text-white/70 hover:border-white/25 hover:text-white"
            >
              Sao Khuê
            </Link>
          </div>
        </section>

        {/* 03 Principles */}
        <section className={section}>
          <p className={eye}>03</p>
          <h2 className={h2}>
            Triết lý làm việc
          </h2>
          <div className="mt-3.5 grid gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4">
            {workPrinciples.map((item) => (
              <div key={item.title} className="border-l border-white/12 pl-3.5">
                <item.icon className="h-3.5 w-3.5 text-violet-300/70" />
                <h3 className="mt-1.5 text-[15px] font-medium text-white/90">{item.title}</h3>
                <p className={`mt-0.5 ${body}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 04 Vision */}
        <section className={section}>
          <p className={eye}>04</p>
          <h2 className={h2}>
            Tầm nhìn · Sứ mệnh · Trách nhiệm
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {[
              {
                title: "Tầm nhìn",
                description:
                  "Trở thành đơn vị marketing hàng đầu Việt Nam — tiên phong công nghệ và sáng tạo cho giá trị bền vững.",
              },
              {
                title: "Sứ mệnh",
                description:
                  "Giúp doanh nghiệp tăng doanh thu, xây thương hiệu mạnh qua giải pháp marketing hiệu quả.",
              },
              {
                title: "Trách nhiệm",
                description:
                  "Dịch vụ chất lượng, đồng hành dài hạn — góp phần phát triển khách hàng và cộng đồng.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-base font-semibold text-white/85">
                  {item.title}
                </h3>
                <p className={`mt-1.5 ${body}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 05 Why us */}
        <section className={section}>
          <p className={eye}>05</p>
          <h2 className={h2}>
            Vì sao chọn chúng tôi?
          </h2>
          <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-2">
            {whyChooseUs.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5 text-sm text-white/50">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-violet-300/65" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className={section}>
          <p className={eye}>FAQ</p>
          <h2 className={h2}>
            Câu hỏi thường gặp
          </h2>
          <div className="mt-3 divide-y divide-white/[0.07]">
            {[
              {
                q: "Bứt Phá Marketing phù hợp doanh nghiệp nào?",
                a: "SME và doanh nghiệp địa phương cần website, SEO, Facebook, Google Maps hoặc automation — muốn đo lường được kết quả.",
              },
              {
                q: "Có cam kết top Google không?",
                a: "Không cam kết thứ hạng cứng. Cam kết quy trình minh bạch, báo cáo GSC/ads và tối ưu liên tục theo dữ liệu thật.",
              },
              {
                q: "Làm việc từ xa hay tại chỗ?",
                a: "Chủ yếu online — khảo sát, triển khai và báo cáo qua Zalo/email. Gặp trực tiếp khi cần (TP.HCM và khu vực lân cận).",
              },
              {
                q: "Xem dự án đã làm ở đâu?",
                a: "Tại Case Study (/du-an) — số liệu GSC, ảnh trước/sau và link website/Fanpage thực tế.",
              },
            ].map((item) => (
              <details key={item.q} className="group py-2.5">
                <summary className="cursor-pointer list-none text-sm font-medium text-white/85 marker:hidden">
                  {item.q}
                </summary>
                <p className={`mt-1.5 max-w-2xl ${body}`}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          id="consultation"
          className="mt-6 border border-white/10 bg-white/[0.02] px-4 py-6 text-center sm:mt-7 sm:px-8 sm:py-7"
        >
          <p className={eye}>06</p>
          <h2 className={`mx-auto max-w-xl ${h2}`}>
            Sẵn sàng bứt phá cùng doanh nghiệp của bạn?
          </h2>
          <p className={`mx-auto mt-2 max-w-md ${body}`}>
            Đừng để đối thủ đi trước — để Bứt Phá Marketing đồng hành ngay hôm nay.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={scrollToConsultation}
              className="inline-flex items-center gap-2 rounded-md bg-[#6D5CE6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5B4BD4]"
            >
              Liên hệ tư vấn ngay
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <Link
              href="/banggia"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/75 hover:border-white/25 hover:text-white"
            >
              Xem bảng giá
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/[0.06] bg-[#06070a]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src={logoSrc} alt={brandName} width={36} height={36} className="h-9 w-9 object-contain" />
              <div>
                <p className="text-sm font-medium text-white">{brandName}</p>
                <p className="text-xs text-white/40">Marketing thực chiến</p>
              </div>
            </div>
            <p className={`mt-2 max-w-sm ${body}`}>
              Đồng hành xây dựng thương hiệu, tiếp cận đúng khách hàng và tạo tăng trưởng đo được.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">Liên hệ</h3>
            <ul className="mt-2 space-y-2 text-sm text-white/45">
              <li>{resolveHotline(settings?.hotline)}</li>
              <li>
                <a href={getMailtoHref(settings?.email)} className="hover:text-white/70">
                  {resolveEmail(settings?.email)}
                </a>
              </li>
              <li>{resolveAddress(settings?.address)}</li>
            </ul>
            <div className="mt-2.5">
              <ZaloConsultCta className="border-white/10 bg-white/[0.04] text-white/80" />
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">Dịch vụ</h3>
            <ul className="mt-2 space-y-2 text-sm text-white/45">
              <li>
                <Link href="/website" className="hover:text-white/70">
                  Thiết kế website
                </Link>
              </li>
              <li>
                <Link href="/facebook" className="hover:text-white/70">
                  Quản trị Fanpage
                </Link>
              </li>
              <li>
                <Link href="/google-maps" className="hover:text-white/70">
                  Google Maps
                </Link>
              </li>
              <li>
                <Link href="/du-an" className="hover:text-white/70">
                  Case study
                </Link>
              </li>
              <li>
                <Link href="/banggia" className="hover:text-white/70">
                  Bảng giá
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">Liên kết</h3>
            <ul className="mt-2 space-y-2 text-sm text-white/45">
              <li>
                <Link href="/" className="hover:text-white/70">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:text-white/70">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white/70">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-white/70">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

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

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

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
    <div className="relative min-h-screen overflow-x-hidden bg-[#08090c] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[75vh]"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(196,149,90,0.16), transparent 58%), radial-gradient(ellipse 40% 35% at 85% 20%, rgba(99,102,241,0.1), transparent), linear-gradient(180deg, #0c0e14 0%, #08090c 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#08090c]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logoSrc} alt={brandName} width={44} height={44} className="h-11 w-11 object-contain" />
            <div className="hidden sm:block">
              <div className="text-sm font-medium tracking-wide text-white/90">{brandName}</div>
              <div className="text-[11px] text-amber-200/55">Marketing thực chiến</div>
            </div>
          </Link>

          <div className="hidden lg:block">
            <SiteNavMenu tone="dark" layout="horizontal" activeHref="/gioi-thieu" />
          </div>

          <button
            type="button"
            onClick={scrollToConsultation}
            className="hidden items-center gap-2 rounded-full bg-amber-200 px-4 py-2.5 text-xs font-semibold text-[#0b0d12] transition hover:bg-amber-100 lg:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" />
            Liên hệ tư vấn
          </button>

          <div className="lg:hidden [&_button]:text-white/80">
            <SiteNavMenu activeHref="/gioi-thieu" />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        {/* Hero — one composition */}
        <section className="relative min-h-[min(72vh,640px)]">
          {heroVisual ? (
            <div className="absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroVisual}
                alt=""
                className="h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/75 to-[#08090c]/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#08090c]/90 via-[#08090c]/45 to-transparent" />
            </div>
          ) : null}

          <div className="relative flex min-h-[min(72vh,640px)] flex-col justify-end pb-12 pt-20 sm:pb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-200/70">Về chúng tôi</p>
            <h1
              className="mt-4 max-w-3xl text-[clamp(2.1rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-white"
              style={serif}
            >
              {brandName}
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/50 sm:text-lg">
              Đồng hành bứt phá cùng doanh nghiệp — tư vấn đúng, triển khai hiệu quả, đo lường minh bạch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToConsultation}
                className="inline-flex items-center gap-2 rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-[#0b0d12] transition hover:bg-amber-100"
              >
                Liên hệ tư vấn
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/banggia"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/25"
              >
                Bảng giá dịch vụ
              </Link>
            </div>
          </div>
        </section>

        {/* 01 Who */}
        <section className="border-t border-white/[0.06] pt-14 sm:pt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">01</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl" style={serif}>
            Bứt Phá Marketing là ai?
          </h2>

          <div className={`mt-8 grid gap-10 ${teamImage ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-end" : ""}`}>
            <div className="space-y-5 text-[15px] leading-8 text-white/50">
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
            {teamImage ? (
              <div className="relative overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={teamImage}
                  alt="Linh vật Bứt Phá Marketing"
                  className="mx-auto max-h-[360px] w-full object-contain object-bottom p-6"
                />
              </div>
            ) : null}
          </div>

          <div className="mt-12 grid gap-8 border-t border-white/[0.06] pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "300+", label: "Khách hàng đồng hành", icon: Users },
              { value: "1000+", label: "Dự án đã triển khai", icon: BriefcaseBusiness },
              { value: "5+ năm", label: "Kinh nghiệm thực chiến", icon: Sparkles },
              { value: "95%", label: "Khách tiếp tục hợp tác", icon: Target },
            ].map((stat) => (
              <div key={stat.value} className="relative pl-4">
                <span className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-amber-200/45 to-transparent" aria-hidden />
                <stat.icon className="h-4 w-4 text-amber-200/60" />
                <p className="mt-3 text-3xl font-semibold text-amber-50" style={serif}>
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 02 What we do */}
        <section className="mt-16 border-t border-white/[0.06] pt-14 sm:mt-20 sm:pt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">02</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl" style={serif}>
            Điều chúng tôi thực sự làm
          </h2>
          <div className="mt-10 divide-y divide-white/[0.06]">
            {serviceHighlights.map((item) => (
              <div key={item.title} className="grid gap-4 py-6 sm:grid-cols-[48px_1fr] sm:gap-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-amber-200/70">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-white/90">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/40">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Proof */}
        <section className="mt-16 border border-amber-200/15 bg-gradient-to-br from-amber-200/[0.07] to-transparent px-6 py-10 sm:mt-20 sm:px-10 sm:py-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/60">Proof</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl" style={serif}>
            Dự án có số liệu thật
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/45">
            Đo bằng Google Search Console, Facebook Insights và lead thực tế — không vanity metrics.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/70">
            <li>
              Nha Khoa Đăng Khoa: <span className="text-amber-100">15,4K impressions</span> ·{" "}
              <span className="text-amber-100">471 clicks</span> GSC
            </li>
            <li>
              Sao Khuê: Fanpage <span className="text-amber-100">83.374 lượt xem</span> / 90 ngày
            </li>
            <li>Thiên Hoàng Kim: website + Fanpage đồng bộ, nuôi lead inbox</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/du-an"
              className="inline-flex rounded-full bg-amber-200 px-5 py-2.5 text-sm font-semibold text-[#0b0d12] hover:bg-amber-100"
            >
              Xem case study
            </Link>
            <Link
              href="/du-an/nha-khoa-dang-khoa"
              className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/70 hover:border-white/25"
            >
              Nha khoa Đăng Khoa
            </Link>
            <Link
              href="/du-an/sao-khue"
              className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/70 hover:border-white/25"
            >
              Sao Khuê
            </Link>
          </div>
        </section>

        {/* 03 Principles */}
        <section className="mt-16 border-t border-white/[0.06] pt-14 sm:mt-20 sm:pt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">03</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl" style={serif}>
            Triết lý làm việc
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {workPrinciples.map((item) => (
              <div key={item.title} className="border-l border-amber-200/25 pl-5">
                <item.icon className="h-4 w-4 text-amber-200/55" />
                <h3 className="mt-3 text-lg font-medium text-white/90">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 04 Vision */}
        <section className="mt-16 border-t border-white/[0.06] pt-14 sm:mt-20 sm:pt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">04</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl" style={serif}>
            Tầm nhìn · Sứ mệnh · Trách nhiệm
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
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
                <h3 className="text-xl font-semibold text-amber-100/90" style={serif}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/40">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 05 Why us */}
        <section className="mt-16 border-t border-white/[0.06] pt-14 sm:mt-20 sm:pt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">05</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl" style={serif}>
            Vì sao chọn chúng tôi?
          </h2>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {whyChooseUs.map((item) => (
              <li key={item} className="inline-flex items-center gap-2 text-sm text-white/65">
                <ShieldCheck className="h-4 w-4 shrink-0 text-amber-200/55" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-16 border-t border-white/[0.06] pt-14 sm:mt-20 sm:pt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl" style={serif}>
            Câu hỏi thường gặp
          </h2>
          <div className="mt-6 divide-y divide-white/[0.06]">
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
              <details key={item.q} className="group py-4">
                <summary className="cursor-pointer list-none text-sm font-medium text-white/85 marker:hidden sm:text-base">
                  {item.q}
                </summary>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/40">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="consultation" className="mt-16 border border-white/[0.08] bg-white/[0.02] px-6 py-12 text-center sm:mt-20 sm:px-12 sm:py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">06</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl" style={serif}>
            Sẵn sàng bứt phá cùng doanh nghiệp của bạn?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/45">
            Đừng để đối thủ đi trước — để Bứt Phá Marketing đồng hành ngay hôm nay.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToConsultation}
              className="inline-flex items-center gap-2 rounded-full bg-amber-200 px-6 py-3.5 text-sm font-semibold text-[#0b0d12] hover:bg-amber-100"
            >
              Liên hệ tư vấn ngay
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/banggia"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/80 hover:border-white/25"
            >
              Xem bảng giá
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/[0.06] bg-[#06070a]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src={logoSrc} alt={brandName} width={40} height={40} className="h-10 w-10 object-contain" />
              <div>
                <p className="text-sm font-medium text-white/90">{brandName}</p>
                <p className="text-xs text-white/35">Marketing thực chiến</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/35">
              Đồng hành xây dựng thương hiệu, tiếp cận đúng khách hàng và tạo tăng trưởng đo được.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Liên hệ</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/45">
              <li>{resolveHotline(settings?.hotline)}</li>
              <li>
                <a href={getMailtoHref(settings?.email)} className="hover:text-amber-100">
                  {resolveEmail(settings?.email)}
                </a>
              </li>
              <li>{resolveAddress(settings?.address)}</li>
            </ul>
            <div className="mt-4">
              <ZaloConsultCta className="border-white/10 bg-white/[0.03] text-white/80" />
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Dịch vụ</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/45">
              <li>
                <Link href="/website" className="hover:text-amber-100">
                  Thiết kế website
                </Link>
              </li>
              <li>
                <Link href="/facebook" className="hover:text-amber-100">
                  Quản trị Fanpage
                </Link>
              </li>
              <li>
                <Link href="/google-maps" className="hover:text-amber-100">
                  Google Maps
                </Link>
              </li>
              <li>
                <Link href="/du-an" className="hover:text-amber-100">
                  Case study
                </Link>
              </li>
              <li>
                <Link href="/banggia" className="hover:text-amber-100">
                  Bảng giá
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Liên kết</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/45">
              <li>
                <Link href="/" className="hover:text-amber-100">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:text-amber-100">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-100">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-amber-100">
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

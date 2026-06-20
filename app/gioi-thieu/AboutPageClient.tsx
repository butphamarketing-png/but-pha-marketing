"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SiteNavMenu } from "@/components/shared/SiteNavMenu";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronRight,
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
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("@/components/shared/ParticleBackground").then((mod) => mod.ParticleBackground),
  { ssr: false },
);
import { useAdmin } from "@/lib/AdminContext";
import { DEFAULT_HERO_SLIDE, DEFAULT_INTRO_IMAGE } from "@/lib/media-assets";
import { db, type Service } from "@/lib/useData";
import { playClickSound } from "@/lib/utils";
import { BRAND_GRADIENT } from "@/lib/brand-colors";
import { getMailtoHref, resolveAddress, resolveEmail, resolveHotline } from "@/lib/site-contact";

export default function AboutPageClient() {
  const [services, setServices] = useState<Service[]>([]);
  const { settings } = useAdmin();

  useEffect(() => {
    void db.services.getAll().then((result) => setServices(result.data || []));
  }, []);

  const brandName = settings?.title || "Bứt Phá Marketing";
  const logoSrc = "/logo.png";
  const homeMedia = settings?.media?.home;
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
          "SEO website, SEO Google Maps, giúp doanh nghiệp xuất hiện đúng lúc – đúng nơi – đúng khách hàng.",
        icon: Sparkles,
      },
      {
        title: googleMapsService?.name || "Gia tăng hiện diện địa phương",
        description:
          googleMapsService?.features?.slice(0, 2).join(", ") ||
          "Tối ưu Google Maps, đánh giá, hình ảnh, thông tin doanh nghiệp để bạn luôn nổi bật trong khu vực.",
        icon: MapPinned,
      },
      {
        title: "Đo lường – tối ưu – tăng trưởng",
        description:
          "Theo dõi, báo cáo minh bạch, liên tục tối ưu để mang lại hiệu quả cao nhất với chi phí hợp lý.",
        icon: LineChart,
      },
    ];
  }, [services]);

  const workPrinciples = [
    {
      title: "Hiệu quả là thước đo",
      description: "Không hứa suông, chúng tôi tập trung vào kết quả thực tế và sự tăng trưởng bền vững của doanh nghiệp.",
      icon: Target,
    },
    {
      title: "Đồng hành như một đối tác",
      description: "Lắng nghe, thấu hiểu và cùng bạn ra quyết định. Thành công của bạn cũng chính là thành công của chúng tôi.",
      icon: Handshake,
    },
    {
      title: "Minh bạch & trung thực",
      description: "Mọi chiến lược, chi phí, kết quả đều được báo cáo rõ ràng, minh bạch và có thể đo lường.",
      icon: Users,
    },
    {
      title: "Không ngừng cải tiến",
      description: "Luôn cập nhật xu hướng, công nghệ mới để mang đến giải pháp tối ưu nhất cho khách hàng.",
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
    <div className="min-h-screen bg-background text-slate-900">
      <ParticleBackground />
      <header className="sticky top-0 z-40 border-b border-indigo-100/80 bg-white/90 shadow-[0_8px_30px_rgba(49,46,129,0.04)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-6">
          <Link href="/" className="group flex items-center gap-3 transition-transform hover:scale-[1.02]">
            <img src={logoSrc} alt={brandName} className="h-12 w-12 rounded-full border border-indigo-100 object-cover shadow-sm" />
            <div>
              <div className="text-sm font-bold tracking-tight text-indigo-950">{brandName}</div>
              <div className="text-xs font-medium text-violet-600">Giải pháp marketing thực chiến</div>
            </div>
          </Link>

          <div className="hidden lg:block">
            <SiteNavMenu tone="light" layout="horizontal" activeHref="/gioi-thieu" />
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button type="button" onClick={scrollToConsultation} className="brand-btn-primary">
              <Phone className="h-4 w-4" />
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">

        <section className="mx-auto max-w-7xl px-4 pb-6 pt-10 lg:px-6 lg:pt-12">
          <div className="brand-page-hero grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="brand-eyebrow">Về chúng tôi</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-indigo-950 md:text-5xl">
                Đồng hành <span className="brand-gradient-text">bứt phá</span> cùng doanh nghiệp
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
                Đội ngũ marketing thực chiến — tư vấn đúng, triển khai hiệu quả, đo lường minh bạch.
              </p>
            </div>
            {heroVisual ? (
              <div className="overflow-hidden rounded-[2rem] border border-indigo-100 shadow-brand">
                <img src={heroVisual} alt={brandName} className="aspect-[4/3] w-full object-cover" />
              </div>
            ) : null}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
          <div className="brand-card p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <span className="brand-step-badge">01</span>
              <h2 className="text-3xl font-bold tracking-tight text-indigo-950">Bứt Phá Marketing là ai?</h2>
            </div>

            <div className={`mt-6 grid gap-8 ${teamImage ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-1"}`}>
              <div className="space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Bứt Phá Marketing là đơn vị cung cấp giải pháp marketing toàn diện, chuyên sâu cho doanh nghiệp vừa và nhỏ, doanh nghiệp địa phương và thương hiệu đang trên hành trình phát triển.
                </p>
                <p>
                  Chúng tôi được thành lập bởi đội ngũ chuyên gia giàu kinh nghiệm thực chiến trong lĩnh vực marketing online, thiết kế website, quản trị fanpage, SEO, Google Maps và quảng cáo. Trải qua nhiều năm đồng hành cùng hàng trăm doanh nghiệp ở đa dạng lĩnh vực, chúng tôi hiểu rõ: mỗi doanh nghiệp đều có những bài toán riêng và cần một chiến lược riêng.
                </p>
                <p>
                  Vì thế, Bứt Phá Marketing luôn đề cao sự thấu hiểu, tư vấn đúng và triển khai hiệu quả – lấy kết quả của khách hàng làm thước đo thành công.
                </p>
              </div>

              {teamImage && (
                <div className="overflow-hidden rounded-[1.8rem] border border-indigo-200 bg-indigo-50/30">
                  <img src={teamImage} alt="Đội ngũ Bứt Phá Marketing" className="h-full min-h-[320px] w-full object-cover" />
                </div>
              )}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { value: "300+", label: "Khách hàng tin tưởng đồng hành", icon: Users },
                { value: "1000+", label: "Dự án đã triển khai thành công", icon: BriefcaseBusiness },
                { value: "5+ năm", label: "Kinh nghiệm thực chiến trong marketing", icon: Sparkles },
                { value: "95%", label: "Khách hàng hài lòng và tiếp tục đồng hành", icon: Target },
              ].map((stat) => (
                <div key={stat.value} className="brand-stat-card">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-violet-600">
                      <stat.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-3xl font-bold text-violet-600">{stat.value}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-600">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-2 lg:px-6">
          <div className="brand-card p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <span className="brand-step-badge">02</span>
              <h2 className="text-3xl font-bold tracking-tight text-indigo-950">Điều chúng tôi thực sự làm</h2>
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-5">
              {serviceHighlights.map((item) => (
                <div key={item.title} className="brand-feature-card">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-violet-600">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-indigo-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="brand-card p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <span className="brand-step-badge">03</span>
              <h2 className="text-3xl font-bold tracking-tight text-indigo-950">Triết lý làm việc</h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {workPrinciples.map((item) => (
                <div key={item.title} className="brand-feature-card">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-violet-600">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-indigo-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-2 lg:px-6">
          <div className="brand-card p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <span className="brand-step-badge">04</span>
              <h2 className="text-3xl font-bold tracking-tight text-indigo-950">Tầm nhìn – Sứ mệnh – Trách nhiệm</h2>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "Tầm nhìn",
                  description:
                    "Trở thành đơn vị marketing hàng đầu Việt Nam, tiên phong ứng dụng công nghệ và sáng tạo để mang lại giá trị bền vững cho doanh nghiệp, cộng đồng và xã hội.",
                },
                {
                  title: "Sứ mệnh",
                  description:
                    "Giúp doanh nghiệp tăng trưởng doanh thu, xây dựng thương hiệu mạnh và phát triển bền vững thông qua các giải pháp marketing hiệu quả và tối ưu.",
                },
                {
                  title: "Trách nhiệm",
                  description:
                    "Chúng tôi có trách nhiệm mang đến dịch vụ chất lượng, đồng hành lâu dài và góp phần vào sự phát triển bền vững của khách hàng và cộng đồng.",
                },
              ].map((item) => (
                <div key={item.title} className="brand-feature-card px-6 py-7 text-center">
                  <h3 className="text-xl font-bold text-violet-600">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="brand-card p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <span className="brand-step-badge">05</span>
              <h2 className="text-3xl font-bold tracking-tight text-indigo-950">Vì sao khách hàng chọn chúng tôi?</h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
              {whyChooseUs.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-indigo-100 bg-white px-4 py-5 text-center text-sm font-semibold text-slate-700 shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/15 text-violet-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="consultation" className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:pb-16">
          <div
            className="overflow-hidden rounded-[2.2rem] border border-indigo-300/30 p-6 shadow-brand-lg lg:p-8"
            style={{ background: BRAND_GRADIENT }}
          >
            <div className="max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-violet-100">
                  06
                </div>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">Sẵn sàng bứt phá cùng doanh nghiệp của bạn?</h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-indigo-100 md:text-xl">
                  Đừng để đối thủ đi trước. Hãy để Bứt Phá Marketing đồng hành cùng bạn ngay hôm nay.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={scrollToConsultation}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-indigo-900 shadow-md transition hover:brightness-105 active:scale-[0.99]"
                  >
                    Liên hệ tư vấn ngay
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    href="/#services"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/35 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    Nhận báo giá miễn phí
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-indigo-100 bg-indigo-50/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr] lg:px-6">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoSrc} alt={brandName} className="h-11 w-11 rounded-full object-cover" />
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-900">{brandName}</p>
                <p className="text-xs text-slate-400">Giải pháp marketing thực chiến</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Đồng hành cùng doanh nghiệp xây dựng thương hiệu, tiếp cận đúng khách hàng và tạo ra tăng trưởng đo lường được.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-slate-900">Liên hệ</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>{resolveHotline(settings?.hotline)}</li>
              <li>
                <a href={getMailtoHref(settings?.email)} className="hover:text-white">
                  {resolveEmail(settings?.email)}
                </a>
              </li>
              <li>{resolveAddress(settings?.address)}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-slate-900">Dịch vụ</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link href="/website">Thiết kế Website</Link></li>
              <li><Link href="/facebook">Quản trị Fanpage</Link></li>
              <li><Link href="/google-maps">Google Maps Marketing</Link></li>
              <li><Link href="/blog">AI Content / SEO</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-slate-900">Liên kết nhanh</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link href="/">Trang chủ</Link></li>
              <li><Link href="/gioi-thieu">Giới thiệu</Link></li>
              <li><Link href="/blog">Tin tức</Link></li>
              <li><Link href="/lien-he">Liên hệ tư vấn</Link></li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  );
}

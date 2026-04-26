"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
import { LoginModal } from "@/components/shared/LoginModal";
import { ParticleBackground } from "@/components/shared/ParticleBackground";
import { useAdmin } from "@/lib/AdminContext";
import { getBrandingAssetUrl } from "@/lib/branding";
import { db, type Service } from "@/lib/useData";
import { playClickSound } from "@/lib/utils";

export default function AboutPageClient() {
  const [showLogin, setShowLogin] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const { settings } = useAdmin();

  useEffect(() => {
    void db.services.getAll().then((result) => setServices(result.data || []));
  }, []);

  const brandName = settings?.title || "Bứt Phá Marketing";
  const logoSrc = useMemo(
    () => getBrandingAssetUrl("logo", settings?.logo || settings?.favicon || ""),
    [settings?.favicon, settings?.logo],
  );
  const homeMedia = settings?.media?.home;
  const teamImage =
    homeMedia?.slideshow?.[0] ||
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80";
  const heroVisual =
    homeMedia?.slideshow?.[1] ||
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80";
  const mascotImage = settings?.mascotImage || "/mascot-home.png";

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

  const navigation = [
    { label: "Trang chủ", href: "/" },
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Website", href: "/website" },
    { label: "Facebook", href: "/facebook" },
    { label: "Google Maps", href: "/google-maps" },
    { label: "Tin tức", href: "/blog" },
    { label: "Liên hệ", href: "/lien-he" },
  ];

  const scrollToConsultation = () => {
    playClickSound();
    window.location.href = "/lien-he";
  };

  return (
    <div className="min-h-screen bg-[#06030d] text-white">
      <ParticleBackground />
      <header className="sticky top-0 z-40 border-b border-fuchsia-400/15 bg-[#080510]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-6">
          <Link href="/" className="flex items-center gap-3">
            <img src={logoSrc} alt={brandName} className="h-12 w-12 rounded-full object-cover" />
            <div>
              <div className="text-sm font-black uppercase tracking-[0.16em] text-white">{brandName}</div>
              <div className="text-xs text-slate-400">Giải pháp marketing thực chiến</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-bold transition ${
                  item.href === "/gioi-thieu" ? "text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setShowLogin(true);
              }}
              className="rounded-2xl border border-fuchsia-400/30 bg-white/5 px-4 py-3 text-sm font-black text-white transition hover:bg-white/10"
            >
              Lộ trình dự án
            </button>
            <button
              type="button"
              onClick={scrollToConsultation}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-3 text-sm font-black text-white shadow-[0_18px_40px_rgba(168,85,247,0.3)] transition hover:scale-[1.01]"
            >
              <Phone className="h-4 w-4" />
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <section className="border-b border-fuchsia-400/12 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.28),transparent_38%),linear-gradient(180deg,#090512,#07040d)]">
          <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-16">
            <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">
              <Link href="/" className="transition hover:text-white">
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">Giới thiệu</span>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <div className="inline-flex items-center rounded-full border border-fuchsia-400/35 bg-fuchsia-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-fuchsia-200">
                  Giới thiệu về Bứt Phá Marketing
                </div>
                <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">
                  Giải pháp marketing toàn diện đồng hành cùng doanh nghiệp tăng trưởng bền vững
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  Bứt Phá Marketing không chỉ là đơn vị cung cấp dịch vụ, chúng tôi là người đồng hành chiến lược trên hành trình tăng trưởng của doanh nghiệp.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={scrollToConsultation}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-6 py-4 text-sm font-black text-white shadow-[0_20px_45px_rgba(168,85,247,0.35)] transition hover:scale-[1.02]"
                  >
                    Liên hệ tư vấn ngay
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    href="/#services"
                    className="inline-flex items-center gap-2 rounded-2xl border border-fuchsia-400/30 bg-white/5 px-6 py-4 text-sm font-black text-white transition hover:bg-white/10"
                  >
                    Xem các dịch vụ
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_42%),rgba(255,255,255,0.03)] p-6 shadow-[0_28px_80px_rgba(5,2,12,0.44)]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_50%)]" />
                <div className="grid gap-4 md:grid-cols-[0.75fr_1fr]">
                  <div className="flex items-end">
                    <img src={mascotImage} alt="Mascot Bứt Phá Marketing" className="max-h-[320px] w-full object-contain drop-shadow-[0_24px_40px_rgba(168,85,247,0.35)]" />
                  </div>
                  <div className="space-y-4">
                    <img src={heroVisual} alt="Hệ thống tăng trưởng của Bứt Phá Marketing" className="h-[260px] w-full rounded-[1.6rem] object-cover" />
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { label: "Website", icon: LayoutTemplate },
                        { label: "Facebook", icon: SiFacebook },
                        { label: "Google Maps", icon: MapPinned },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl border border-white/10 bg-[#0d0817] px-4 py-4 text-center">
                          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-200">
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div className="text-sm font-black text-white">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="rounded-[2rem] border border-white/10 bg-[#0a0612]/90 p-6 shadow-[0_24px_70px_rgba(4,2,10,0.34)] lg:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-sm font-black text-fuchsia-200">01</span>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white">Bứt Phá Marketing là ai?</h2>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5 text-base leading-8 text-slate-300">
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

              <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03]">
                <img src={teamImage} alt="Đội ngũ Bứt Phá Marketing" className="h-full min-h-[320px] w-full object-cover" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { value: "300+", label: "Khách hàng tin tưởng đồng hành", icon: Users },
                { value: "1000+", label: "Dự án đã triển khai thành công", icon: BriefcaseBusiness },
                { value: "5+ năm", label: "Kinh nghiệm thực chiến trong marketing", icon: Sparkles },
                { value: "95%", label: "Khách hàng hài lòng và tiếp tục đồng hành", icon: Target },
              ].map((stat) => (
                <div key={stat.value} className="rounded-[1.6rem] border border-fuchsia-400/20 bg-[#10081b] p-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                      <stat.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-3xl font-black text-fuchsia-300">{stat.value}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-300">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-2 lg:px-6">
          <div className="rounded-[2rem] border border-white/10 bg-[#0a0612]/90 p-6 shadow-[0_24px_70px_rgba(4,2,10,0.34)] lg:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-sm font-black text-fuchsia-200">02</span>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white">Điều chúng tôi thực sự làm</h2>
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-5">
              {serviceHighlights.map((item) => (
                <div key={item.title} className="rounded-[1.6rem] border border-fuchsia-400/20 bg-[#10081b] p-5">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="rounded-[2rem] border border-white/10 bg-[#0a0612]/90 p-6 shadow-[0_24px_70px_rgba(4,2,10,0.34)] lg:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-sm font-black text-fuchsia-200">03</span>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white">Triết lý làm việc</h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {workPrinciples.map((item) => (
                <div key={item.title} className="rounded-[1.6rem] border border-white/10 bg-[#10081b] p-5">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-2 lg:px-6">
          <div className="rounded-[2rem] border border-white/10 bg-[#0a0612]/90 p-6 shadow-[0_24px_70px_rgba(4,2,10,0.34)] lg:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-sm font-black text-fuchsia-200">04</span>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white">Tầm nhìn – Sứ mệnh – Trách nhiệm</h2>
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
                <div key={item.title} className="rounded-[1.7rem] border border-fuchsia-400/20 bg-[#10081b] px-6 py-7 text-center">
                  <h3 className="text-2xl font-black uppercase tracking-[0.14em] text-fuchsia-300">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="rounded-[2rem] border border-white/10 bg-[#0a0612]/90 p-6 shadow-[0_24px_70px_rgba(4,2,10,0.34)] lg:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-sm font-black text-fuchsia-200">05</span>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white">Vì sao khách hàng chọn chúng tôi?</h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
              {whyChooseUs.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-[#10081b] px-4 py-5 text-center text-sm font-bold text-slate-200">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="consultation" className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:pb-16">
          <div className="overflow-hidden rounded-[2.2rem] border border-fuchsia-400/20 bg-[linear-gradient(90deg,rgba(19,10,32,0.96),rgba(61,28,110,0.88))] p-6 shadow-[0_28px_80px_rgba(5,2,12,0.42)] lg:p-8">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <div className="inline-flex items-center rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-fuchsia-200">
                  06
                </div>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white">Sẵn sàng bứt phá cùng doanh nghiệp của bạn?</h2>
                <p className="mt-5 max-w-2xl text-xl leading-9 text-violet-100/90">
                  Đừng để đối thủ đi trước. Hãy để Bứt Phá Marketing đồng hành cùng bạn ngay hôm nay.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={scrollToConsultation}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-900 transition hover:scale-[1.02]"
                  >
                    Liên hệ tư vấn ngay
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    href="/#services"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:bg-white/15"
                  >
                    Nhận báo giá miễn phí
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative flex items-end justify-center">
                <span className="absolute inset-x-12 bottom-8 h-24 rounded-full bg-fuchsia-500/25 blur-3xl" />
                <img src={mascotImage} alt="Mascot Bứt Phá Marketing" className="relative max-h-[280px] object-contain drop-shadow-[0_24px_40px_rgba(168,85,247,0.35)]" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#06030e]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr] lg:px-6">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoSrc} alt={brandName} className="h-11 w-11 rounded-full object-cover" />
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white">{brandName}</p>
                <p className="text-xs text-slate-400">Giải pháp marketing thực chiến</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Đồng hành cùng doanh nghiệp xây dựng thương hiệu, tiếp cận đúng khách hàng và tạo ra tăng trưởng đo lường được.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">Liên hệ</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>{settings?.hotline || "090.143.8703"}</li>
              <li>{settings?.email || "hello@butphamarketing.com"}</li>
              <li>{settings?.address || "123 Đường ABC, TP. HCM"}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">Dịch vụ</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link href="/website">Thiết kế Website</Link></li>
              <li><Link href="/facebook">Quản trị Fanpage</Link></li>
              <li><Link href="/google-maps">Google Maps Marketing</Link></li>
              <li><Link href="/blog">AI Content / SEO</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">Liên kết nhanh</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link href="/">Trang chủ</Link></li>
              <li><Link href="/gioi-thieu">Giới thiệu</Link></li>
              <li><Link href="/blog">Tin tức</Link></li>
              <li><Link href="/lien-he">Liên hệ tư vấn</Link></li>
            </ul>
          </div>
        </div>
      </footer>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}

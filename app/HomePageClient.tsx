"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Globe2,
  LayoutTemplate,
  MapPinned,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import { SiFacebook, SiGooglemaps, SiMessenger, SiYoutube, SiZalo } from "react-icons/si";
import { LoginModal } from "@/components/shared/LoginModal";
import { DynamicGreeting } from "@/components/shared/DynamicGreeting";
import { ParticleBackground } from "@/components/shared/ParticleBackground";
import { useAuth } from "@/lib/AuthContext";
import { useAdmin } from "@/lib/AdminContext";
import { getBrandingAssetUrl } from "@/lib/branding";
import { db, type ClientReview, type NewsItem, type Service } from "@/lib/useData";
import { playClickSound } from "@/lib/utils";

type ContactFormState = {
  name: string;
  phone: string;
  location: string;
  interest: string;
  note: string;
};

const initialContactForm: ContactFormState = {
  name: "",
  phone: "",
  location: "",
  interest: "",
  note: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function HomePageClient() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [blogs, setBlogs] = useState<NewsItem[]>([]);
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [contactForm, setContactForm] = useState<ContactFormState>(initialContactForm);
  const [submittingContact, setSubmittingContact] = useState(false);
  const [contactState, setContactState] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });
  const { user } = useAuth();
  const { settings } = useAdmin();

  const brandName = settings?.title || "Bứt Phá Marketing";
  const primaryColor = settings?.colors?.primary || "#8b5cf6";
  const logoSrc = useMemo(
    () => getBrandingAssetUrl("logo", settings?.logo || settings?.favicon || ""),
    [settings?.favicon, settings?.logo],
  );

  useEffect(() => {
    void Promise.all([db.news.getAll(), db.clientReviews.getAll(), db.services.getAll()]).then(
      ([newsResult, reviewResult, serviceResult]) => {
        const sortedNews = [...(newsResult.data || [])]
          .filter((item) => item.published !== false)
          .sort(
            (a, b) =>
              (b.publishedAt ? Date.parse(b.publishedAt) : b.timestamp) -
              (a.publishedAt ? Date.parse(a.publishedAt) : a.timestamp),
          );
        const sortedReviews = [...(reviewResult.data || [])].sort(
          (a, b) => Date.parse(b.createdAt || "") - Date.parse(a.createdAt || ""),
        );
        setBlogs(sortedNews);
        setReviews(sortedReviews);
        setServices(serviceResult.data || []);
      },
    );
  }, []);

  useEffect(() => {
    let raf = 0;
    const durationMs = 900;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(nextProgress);

      if (elapsed >= durationMs) {
        setLoading(false);
        return;
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const homeMedia = settings?.media?.home;
  const teamImage =
    homeMedia?.slideshow?.[0] ||
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80";
  const bookingVisual =
    homeMedia?.slideshow?.[1] ||
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80";
  const mascotImage = settings?.mascotImage || "/mascot-home.png";

  const navigation = [
    { label: "Trang Chủ", href: "#hero" },
    { label: "Giới Thiệu", href: "#about" },
    { label: "Website", href: "/website" },
    { label: "Facebook", href: "/facebook" },
    { label: "Google Maps", href: "/google-maps" },
    { label: "Tin Tức", href: "#news" },
    { label: "Liên Hệ Tư Vấn", href: "#consultation" },
    { label: "Lộ Trình Khách Hàng", href: "#roadmap" },
  ];

  const serviceShowcase = useMemo(() => {
    const preferredPlatforms = ["website", "facebook", "googlemaps"];
    const fallbackIcons = {
      website: LayoutTemplate,
      facebook: SiFacebook,
      googlemaps: MapPinned,
    };

    return preferredPlatforms.map((platformKey) => {
      const match = services.find((service) => service.platform === platformKey);
      const media = settings?.media?.[platformKey];
      const image =
        media?.slideshow?.[0] ||
        media?.cases?.[0]?.after ||
        media?.cases?.[0]?.before ||
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80";
      const title =
        match?.name ||
        (platformKey === "website"
          ? "Thiết kế Website"
          : platformKey === "facebook"
            ? "Quản trị Fanpage"
            : "Google Maps Marketing");
      const description =
        match?.features?.slice(0, 2).join(", ") ||
        (platformKey === "website"
          ? "Website chuẩn SEO, tối ưu chuyển đổi và dễ vận hành."
          : platformKey === "facebook"
            ? "Tăng tương tác, nội dung đều và chốt khách tốt hơn."
            : "Tối ưu hiển thị địa phương, tăng khách gọi và ghé thăm.");

      return {
        key: platformKey,
        title,
        description,
        href:
          platformKey === "website" ? "/website" : platformKey === "facebook" ? "/facebook" : "/google-maps",
        image,
        icon: fallbackIcons[platformKey as keyof typeof fallbackIcons],
        accent:
          platformKey === "website"
            ? "from-emerald-500/20 via-emerald-500/10 to-transparent"
            : platformKey === "facebook"
              ? "from-sky-500/20 via-sky-500/10 to-transparent"
              : "from-orange-500/20 via-orange-500/10 to-transparent",
      };
    });
  }, [services, settings?.media]);

  const projectShowcase = useMemo(() => {
    const projectSeeds = [
      { key: "website", subtitle: "Website chuẩn SEO" },
      { key: "facebook", subtitle: "Fanpage chuyển đổi" },
      { key: "googlemaps", subtitle: "Google Maps Marketing" },
      { key: "website", subtitle: "Website bán hàng" },
    ];

    const cases = projectSeeds
      .map((seed, index) => {
        const media = settings?.media?.[seed.key];
        const caseItem = media?.cases?.[index] || media?.cases?.[0];
        const image =
          caseItem?.after ||
          caseItem?.before ||
          media?.slideshow?.[index] ||
          media?.slideshow?.[0] ||
          bookingVisual;

        return {
          title: caseItem?.title || (seed.key === "website" ? "Thiết Kế Website Chuẩn SEO" : seed.key === "facebook" ? "Tăng Trưởng Fanpage" : "Google Maps Tăng Hiển Thị"),
          subtitle: seed.subtitle,
          result:
            seed.key === "website"
              ? "+150%"
              : seed.key === "facebook"
                ? "+120%"
                : "Top 1",
          note:
            seed.key === "googlemaps"
              ? "Google Maps"
              : seed.key === "facebook"
                ? "Tăng đơn hàng"
                : "Tăng chuyển đổi",
          image,
        };
      })
      .slice(0, 4);

    return cases;
  }, [bookingVisual, settings?.media]);

  const topBlogs = blogs.slice(0, 4);
  const topReviews = reviews.slice(0, 4);

  const platformCards = [
    { label: "Website", icon: Globe2, href: "/website" },
    { label: "Facebook", icon: SiFacebook, href: "/facebook" },
    { label: "Google Maps", icon: MapPinned, href: "/google-maps" },
  ];

  const valuePillars = [
    {
      title: "Tầm nhìn",
      description: "Trở thành đơn vị dẫn đầu trong việc xây hệ thống marketing giúp doanh nghiệp tăng trưởng bền vững.",
      icon: Target,
    },
    {
      title: "Sứ mệnh",
      description: "Mang giải pháp marketing thực chiến, đo lường được và dễ triển khai cho doanh nghiệp Việt Nam.",
      icon: Sparkles,
    },
    {
      title: "Trách nhiệm",
      description: "Cam kết đồng hành, tối ưu liên tục và minh bạch kết quả để khách hàng an tâm phát triển.",
      icon: ShieldCheck,
    },
  ];

  const advantages = [
    {
      title: "Tư duy marketing định hướng kết quả",
      description: "Không chỉ làm web hay chạy ads, chúng tôi xây hệ thống tạo khách hàng và doanh thu.",
      icon: TrendingUp,
    },
    {
      title: "Tối ưu chuyển đổi",
      description: "Thiết kế và nội dung đều đi theo mục tiêu chốt khách, không chỉ dừng ở hiển thị đẹp.",
      icon: Target,
    },
    {
      title: "Hệ thống tự động",
      description: "Ứng dụng AI và automation để giảm thời gian xử lý và tăng hiệu quả vận hành.",
      icon: Workflow,
    },
    {
      title: "Đồng hành lâu dài",
      description: "Tư vấn, tối ưu và hỗ trợ liên tục như một đội marketing nội bộ cho doanh nghiệp.",
      icon: Users,
    },
  ];

  const stats = [
    { value: "300+", label: "Dự án hoàn thành" },
    { value: "150%", label: "Tăng trưởng TB" },
    { value: "98%", label: "Khách hàng hài lòng" },
  ];

  const scrollToSection = (href: string) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingContact) return;
    setSubmittingContact(true);
    setContactState({ type: "idle", message: "" });

    const service = contactForm.interest || "Tư vấn tổng thể";
    const note = [contactForm.location, contactForm.note].filter(Boolean).join(" | ");

    const result = await db.leads.add({
      type: "contact",
      name: contactForm.name,
      phone: contactForm.phone,
      service,
      note,
    });

    if (result.error) {
      setContactState({
        type: "error",
        message: "Chưa gửi được yêu cầu tư vấn. Vui lòng thử lại sau.",
      });
    } else {
      setContactState({
        type: "success",
        message: "Đã nhận yêu cầu. Đội ngũ sẽ liên hệ với bạn sớm nhất.",
      });
      setContactForm(initialContactForm);
    }

    setSubmittingContact(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="relative mb-8 flex h-36 w-36 items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-primary/20 border-t-primary shadow-[0_0_40px_rgba(139,92,246,0.3)]"
          />
          <div className="absolute inset-[18px] rounded-full bg-[radial-gradient(circle,_rgba(139,92,246,0.25)_0%,_transparent_70%)] blur-2xl" />
          <img src={logoSrc} alt="Logo" className="relative h-20 w-20 rounded-full object-cover" />
        </div>
        <div className="w-72 text-center">
          <p className="mb-2 text-sm font-semibold tracking-[0.3em] text-purple-200">ĐANG TẢI HỆ THỐNG</p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#090511] text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.28),_transparent_35%),linear-gradient(180deg,rgba(8,5,16,0.5),rgba(8,5,16,0.95))]" />
      </div>

      <DynamicGreeting color={primaryColor} />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080510]/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
            <Link href="/" className="group flex items-center gap-3" onClick={playClickSound}>
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-fuchsia-500/25 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <img src={logoSrc} alt={brandName} className="relative h-11 w-11 rounded-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white">{brandName}</p>
                <p className="text-[11px] font-medium text-purple-200/80">Growth • AI • Conversion</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {navigation.map((item) =>
                item.href.startsWith("#") ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm font-semibold text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm font-semibold text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <button
                type="button"
                onClick={() => setShowLogin(true)}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition hover:border-white/25 hover:bg-white/10"
              >
                Lộ trình khách hàng
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("#consultation")}
                className="rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(168,85,247,0.28)] transition hover:scale-[1.02]"
              >
                Liên hệ tư vấn
              </button>
            </div>
          </div>
        </header>

        <main className="pb-16">
          <section id="hero" className="mx-auto max-w-7xl px-4 pb-8 pt-8 lg:px-6 lg:pt-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="space-y-7"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.26em] text-fuchsia-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Bứt phá doanh thu
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.94] tracking-[-0.04em] text-white sm:text-5xl xl:text-[4.8rem]">
                    Website chỉ để đẹp
                    <br />
                    không tạo ra doanh thu
                    <br />
                    <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                      thì không có ý nghĩa!
                    </span>
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                    {settings?.heroSubtitle?.trim() ||
                      `${brandName} giúp doanh nghiệp tăng trưởng bền vững bằng hệ thống marketing tự động, đo lường được và tối ưu liên tục.`}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection("#consultation")}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-6 py-4 text-sm font-black text-white shadow-[0_18px_40px_rgba(168,85,247,0.34)] transition hover:scale-[1.02]"
                  >
                    Liên hệ tư vấn ngay
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    href="/website"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-black text-white transition hover:bg-white/10"
                  >
                    Xem dịch vụ
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                    >
                      <div className="mb-1 text-2xl font-black text-white">{stat.value}</div>
                      <div className="text-sm text-slate-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.35),_transparent_52%)] blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,10,26,0.9),rgba(9,5,17,0.95))] p-5 shadow-[0_30px_80px_rgba(2,0,10,0.5)]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.12),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.16),_transparent_44%)]" />

                  <div className="relative grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4">
                      <div className="rounded-3xl border border-fuchsia-500/25 bg-fuchsia-500/10 p-5">
                        <p className="text-sm font-semibold text-fuchsia-100/80">Tăng trưởng doanh thu</p>
                        <div className="mt-2 text-4xl font-black text-white">+215%</div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                          <p className="text-sm font-semibold text-slate-300">Khách hàng mới</p>
                          <div className="mt-2 text-3xl font-black text-white">+180%</div>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                          <p className="text-sm font-semibold text-slate-300">Hiệu quả chiến dịch</p>
                          <div className="mt-2 text-3xl font-black text-white">+150%</div>
                        </div>
                      </div>
                    </div>

                    <div className="relative min-h-[360px]">
                      <div className="absolute inset-x-6 bottom-0 h-10 rounded-full bg-fuchsia-500/25 blur-2xl" />
                      <div className="absolute inset-x-0 bottom-3 h-44 rounded-[999px] border border-fuchsia-500/20 bg-[radial-gradient(circle,_rgba(168,85,247,0.22),_transparent_65%)]" />
                      <div className="absolute inset-x-12 top-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-right shadow-[0_20px_40px_rgba(12,6,20,0.3)]">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Marketing system</p>
                        <div className="mt-3 flex items-end justify-end gap-2">
                          <span className="h-10 w-3 rounded-full bg-violet-500/80" />
                          <span className="h-16 w-3 rounded-full bg-fuchsia-500/80" />
                          <span className="h-24 w-3 rounded-full bg-cyan-400/80" />
                          <span className="h-14 w-3 rounded-full bg-violet-300/80" />
                        </div>
                      </div>
                      <div className="absolute bottom-8 left-1/2 w-[74%] -translate-x-1/2">
                        <img src={mascotImage} alt="Bứt Phá Marketing AI" className="mx-auto w-full max-w-[360px] drop-shadow-[0_18px_40px_rgba(168,85,247,0.35)]" />
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
                    {platformCards.map((card) => {
                      const Icon = card.icon;
                      return (
                        <Link
                          key={card.label}
                          href={card.href}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f0a1c] px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-fuchsia-400/30"
                        >
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-200">
                            <Icon className="h-5 w-5" />
                          </span>
                          {card.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="about" className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="overflow-hidden rounded-[2rem] border border-fuchsia-500/20 bg-white/[0.03] p-3 shadow-[0_24px_70px_rgba(5,2,12,0.45)]">
                <div className="relative overflow-hidden rounded-[1.6rem]">
                  <img src={teamImage} alt={`${brandName} team`} className="h-full min-h-[360px] w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080510] via-transparent to-transparent" />
                  <button
                    type="button"
                    className="absolute bottom-5 left-5 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:scale-105"
                  >
                    <span className="ml-1 text-2xl">▶</span>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Về chúng tôi</p>
                  <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">Bứt Phá Marketing</h2>
                  <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                    Chúng tôi không chỉ làm marketing. Chúng tôi xây hệ thống giúp doanh nghiệp tăng trưởng bền
                    vững, tự động và có thể đo lường.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {valuePillars.map((pillar) => (
                    <div
                      key={pillar.title}
                      className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                        <pillar.icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 text-xl font-black text-white">{pillar.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/website"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
                  >
                    Xem dịch vụ
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => scrollToSection("#consultation")}
                    className="inline-flex items-center gap-2 rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-5 py-3 text-sm font-black text-fuchsia-100 transition hover:bg-fuchsia-500/15"
                  >
                    Nhận tư vấn ngay
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Giải pháp marketing toàn diện</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">Nền tảng chúng tôi triển khai</h2>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {serviceShowcase.map((service) => (
                <Link
                  key={service.key}
                  href={service.href}
                  className={`group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0e0918] p-5 shadow-[0_20px_60px_rgba(4,2,10,0.42)] transition hover:-translate-y-1 ${service.accent}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-70 transition duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-4 overflow-hidden rounded-[1.4rem] border border-white/10">
                      <img src={service.image} alt={service.title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                        <service.icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-2xl font-black text-white">{service.title}</h3>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">{service.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-fuchsia-200">
                      Xem chi tiết
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section id="roadmap" className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_70px_rgba(5,2,12,0.4)]">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Vì sao chọn Bứt Phá Marketing?</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">Xây đúng hệ thống, tăng đúng doanh thu</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
                >
                  Xem lộ trình khách hàng
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {advantages.map((advantage) => (
                  <div
                    key={advantage.title}
                    className="rounded-[1.6rem] border border-white/10 bg-[#0e0918] p-5"
                  >
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-200">
                      <advantage.icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-xl font-black text-white">{advantage.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{advantage.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Dự án tiêu biểu</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">Một vài thành quả nổi bật</h2>
              </div>
              <Link
                href="/website"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
              >
                Xem tất cả dự án
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 xl:grid-cols-4">
              {projectShowcase.map((project) => (
                <article
                  key={`${project.title}-${project.subtitle}`}
                  className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0e0918] shadow-[0_24px_70px_rgba(5,2,12,0.35)]"
                >
                  <img src={project.image} alt={project.title} className="h-48 w-full object-cover" />
                  <div className="space-y-3 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-fuchsia-300">{project.subtitle}</p>
                    <h3 className="text-xl font-black text-white">{project.title}</h3>
                    <div className="flex items-end justify-between gap-3">
                      <div className="text-3xl font-black text-emerald-300">{project.result}</div>
                      <div className="text-sm text-slate-300">{project.note}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Khách hàng nói gì về chúng tôi?</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">Niềm tin đến từ kết quả thật</h2>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-4">
              {topReviews.length > 0
                ? topReviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(4,2,10,0.32)]"
                    >
                      <div className="flex items-center gap-3">
                        {review.logoUrl ? (
                          <img src={review.logoUrl} alt={review.clientName} className="h-12 w-12 rounded-2xl object-cover" />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/15 font-black text-white">
                            {review.clientName?.slice(0, 1) || "K"}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-black text-white">{review.clientName}</div>
                          <div className="mt-1 flex items-center gap-1 text-yellow-300">
                            {Array.from({ length: Math.max(1, Math.min(5, review.rating || 5)) }).map((_, index) => (
                              <Star key={`${review.id}-${index}`} className="h-3.5 w-3.5 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-slate-300">{review.content}</p>
                    </div>
                  ))
                : Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/15 font-black text-white">
                          B
                        </div>
                        <div>
                          <div className="text-sm font-black text-white">Khách hàng tiêu biểu</div>
                          <div className="mt-1 text-xs text-yellow-300">★★★★★</div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-slate-300">
                        Dịch vụ bám sát mục tiêu kinh doanh và tối ưu đều tay theo từng giai đoạn phát triển.
                      </p>
                    </div>
                  ))}
            </div>
          </section>

          <section id="news" className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Tin tức & kiến thức</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">Cập nhật liên tục để làm đúng hơn</h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
              >
                Xem tất cả bài viết
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 xl:grid-cols-4">
              {topBlogs.map((blog) => {
                const href = `/blog/${blog.slug || slugify(blog.title) || blog.id}`;
                return (
                  <Link
                    key={blog.id}
                    href={href}
                    className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0e0918] shadow-[0_20px_60px_rgba(4,2,10,0.32)]"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={blog.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"}
                        alt={blog.title}
                        className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="space-y-3 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-fuchsia-300">
                        {new Date(blog.publishedAt || blog.timestamp).toLocaleDateString("vi-VN")}
                      </p>
                      <h3 className="line-clamp-2 text-xl font-black text-white">{blog.title}</h3>
                      <p className="line-clamp-3 text-sm leading-7 text-slate-300">
                        {blog.description || "Kiến thức thực chiến giúp doanh nghiệp làm marketing hiệu quả hơn."}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section id="consultation" className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="grid gap-6 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,12,32,0.95),rgba(11,7,21,0.98))] p-6 shadow-[0_30px_80px_rgba(3,1,8,0.46)] lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Đặt lịch tư vấn trực tiếp</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">
                  Nhận lộ trình marketing phù hợp cho doanh nghiệp
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                  Chúng tôi sẽ liên hệ nhanh để phân tích nhu cầu, định hướng dịch vụ phù hợp và đề xuất lộ trình rõ ràng.
                </p>

                <form className="mt-8 space-y-4" onSubmit={handleContactSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      value={contactForm.name}
                      onChange={(event) => setContactForm((prev) => ({ ...prev, name: event.target.value }))}
                      placeholder="Họ và tên"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-400/50"
                    />
                    <input
                      value={contactForm.phone}
                      onChange={(event) => setContactForm((prev) => ({ ...prev, phone: event.target.value }))}
                      placeholder="Số điện thoại"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-400/50"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      value={contactForm.location}
                      onChange={(event) => setContactForm((prev) => ({ ...prev, location: event.target.value }))}
                      placeholder="Địa điểm / ngành nghề"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-400/50"
                    />
                    <select
                      value={contactForm.interest}
                      onChange={(event) => setContactForm((prev) => ({ ...prev, interest: event.target.value }))}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition focus:border-fuchsia-400/50"
                    >
                      <option value="" className="bg-[#120b20]">Chọn nền tảng quan tâm</option>
                      <option value="Thiết kế Website" className="bg-[#120b20]">Thiết kế Website</option>
                      <option value="Quản trị Fanpage" className="bg-[#120b20]">Quản trị Fanpage</option>
                      <option value="Google Maps Marketing" className="bg-[#120b20]">Google Maps Marketing</option>
                      <option value="SEO Website" className="bg-[#120b20]">SEO Website</option>
                    </select>
                  </div>
                  <textarea
                    value={contactForm.note}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, note: event.target.value }))}
                    placeholder="Bạn đang muốn tư vấn về vấn đề gì?"
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-400/50"
                  />
                  <button
                    type="submit"
                    disabled={submittingContact}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-6 py-4 text-sm font-black text-white shadow-[0_18px_40px_rgba(168,85,247,0.32)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submittingContact ? "Đang gửi..." : "Đặt lịch tư vấn ngay"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  {contactState.type !== "idle" ? (
                    <p className={`text-sm font-semibold ${contactState.type === "success" ? "text-emerald-300" : "text-rose-300"}`}>
                      {contactState.message}
                    </p>
                  ) : null}
                </form>
              </div>

              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),_transparent_45%),rgba(255,255,255,0.03)] p-6">
                <div className="absolute right-4 top-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Phản hồi</p>
                  <div className="mt-2 text-3xl font-black text-white">15 phút</div>
                </div>
                <div className="mt-10 flex items-center justify-center">
                  <div className="relative">
                    <span className="absolute inset-0 rounded-full bg-fuchsia-500/25 blur-3xl" />
                    <img src={bookingVisual} alt="Đặt lịch tư vấn" className="relative max-h-[360px] w-full rounded-[1.6rem] object-cover opacity-90" />
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <CalendarDays className="mb-3 h-5 w-5 text-fuchsia-200" />
                    <p className="text-sm font-black text-white">Lịch làm việc rõ ràng</p>
                    <p className="mt-1 text-sm text-slate-300">Tư vấn đúng nhu cầu, đúng giai đoạn doanh nghiệp.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <Phone className="mb-3 h-5 w-5 text-fuchsia-200" />
                    <p className="text-sm font-black text-white">Liên hệ nhanh chóng</p>
                    <p className="mt-1 text-sm text-slate-300">Đội ngũ hỗ trợ giúp bạn chốt bước tiếp theo rõ ràng.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(90deg,rgba(26,14,44,0.96),rgba(63,28,112,0.9))] px-6 py-8 shadow-[0_24px_70px_rgba(6,2,14,0.42)] md:px-10">
              <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-200">Sẵn sàng bứt phá doanh thu?</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">
                    Đồng hành cùng bạn để tạo ra khách hàng và tăng trưởng thật
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-violet-100/85">
                    Chúng tôi sẵn sàng xây cho doanh nghiệp một hệ thống marketing vừa đẹp, vừa bán được hàng và tối ưu được dài hạn.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-start gap-4 md:justify-end">
                  <button
                    type="button"
                    onClick={() => scrollToSection("#consultation")}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-900 transition hover:scale-[1.02]"
                  >
                    Liên hệ tư vấn ngay
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLogin(true)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/15"
                  >
                    Xem lộ trình dự án
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-[#06030e]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_0.9fr] lg:px-6">
            <div>
              <div className="flex items-center gap-3">
                <img src={logoSrc} alt={brandName} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-white">{brandName}</p>
                  <p className="text-xs text-slate-400">Giải pháp marketing thực chiến</p>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
                Xây hệ thống marketing giúp doanh nghiệp tăng trưởng, tiếp cận đúng khách hàng và tạo ra kết quả đo lường được.
              </p>
              <div className="mt-5 flex items-center gap-3 text-white">
                <a href={settings?.fanpage || "#"} className="rounded-full border border-white/10 p-2 transition hover:border-fuchsia-400/40 hover:text-fuchsia-200">
                  <SiFacebook />
                </a>
                <a href={settings?.zalo ? `https://zalo.me/${settings.zalo}` : "#"} className="rounded-full border border-white/10 p-2 transition hover:border-fuchsia-400/40 hover:text-fuchsia-200">
                  <SiZalo />
                </a>
                <a href={settings?.fanpage || "#"} className="rounded-full border border-white/10 p-2 transition hover:border-fuchsia-400/40 hover:text-fuchsia-200">
                  <SiMessenger />
                </a>
                <a href="https://www.youtube.com" className="rounded-full border border-white/10 p-2 transition hover:border-fuchsia-400/40 hover:text-fuchsia-200">
                  <SiYoutube />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">Liên hệ</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li>{settings?.hotline || "0937 417 982"}</li>
                <li>{settings?.email || "hello@butphamarketing.com"}</li>
                <li>{settings?.address || "TP. HCM"}</li>
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
                {navigation.slice(0, 6).map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("#") ? (
                      <button type="button" onClick={() => scrollToSection(item.href)} className="text-left transition hover:text-white">
                        {item.label}
                      </button>
                    ) : (
                      <Link href={item.href}>{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">Cam kết</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-fuchsia-300" />Tối ưu theo chuyển đổi</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-fuchsia-300" />Đồng hành dài hạn</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-fuchsia-300" />Báo cáo rõ ràng</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}

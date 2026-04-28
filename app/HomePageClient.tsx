"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  LayoutTemplate,
  MapPinned,
  MessageCircleMore,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import { SiFacebook, SiMessenger, SiYoutube, SiZalo } from "react-icons/si";
import { LoginModal } from "@/components/shared/LoginModal";
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
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
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
  const logoSrc = useMemo(
    () => getBrandingAssetUrl("logo", settings?.logo || settings?.favicon || ""),
    [settings?.favicon, settings?.logo],
  );

  const homeMedia = settings?.media?.home;
  const heroVisual = homeMedia?.slideshow?.[0] || "";
  const teamImage = homeMedia?.slideshow?.[1] || "";
  const bookingVisual = homeMedia?.slideshow?.[2] || "";
  const heroSlides = useMemo(() => {
    const slides = [];
    if (homeMedia?.slideshow?.[0]) {
      slides.push({
        eyebrow: "WEBSITE CHỈ ĐỂ ĐẸP",
        middle: "KHÔNG TẠO RA DOANH THU",
        accent: "THÌ KHÔNG CÓ Ý NGHĨA!",
        description:
          "Bứt Phá Marketing giúp doanh nghiệp tăng trưởng bền vững bằng hệ thống marketing tự động, đo lường được và tối ưu liên tục.",
        visual: homeMedia.slideshow[0],
        revenue: "+215%",
        growth: "+150%",
        newClients: "+180%",
        highlight: "Hiệu quả chiến dịch",
        pills: [
          { label: "Website", icon: LayoutTemplate },
          { label: "Facebook", icon: SiFacebook },
          { label: "Google Maps", icon: MapPinned },
        ],
      });
    }
    if (homeMedia?.slideshow?.[1]) {
      slides.push({
        eyebrow: "FACEBOOK KHÔNG CHỈ ĐỂ ĐĂNG BÀI",
        middle: "PHẢI TẠO RA TƯƠNG TÁC, KHÁCH HÀNG",
        accent: "VÀ DOANH THU THẬT!",
        description:
          "Từ nội dung, quảng cáo đến chatbot và chăm sóc inbox, mọi thứ phải gắn với mục tiêu chuyển đổi đo lường được.",
        visual: homeMedia.slideshow[1],
        revenue: "+168%",
        growth: "+132%",
        newClients: "+145%",
        highlight: "Tăng trưởng Fanpage",
        pills: [
          { label: "Facebook", icon: SiFacebook },
          { label: "Messenger", icon: MessageCircleMore },
          { label: "Zalo", icon: SiZalo },
        ],
      });
    }
    if (homeMedia?.slideshow?.[2]) {
      slides.push({
        eyebrow: "GOOGLE MAPS KHÔNG CHỈ ĐỂ HIỂN THỊ",
        middle: "PHẢI KÉO ĐÚNG KHÁCH GẦN BẠN",
        accent: "VÀ TĂNG CUỘC GỌI THẬT!",
        description:
          "Đẩy hiển thị địa phương, tối ưu hồ sơ, đánh giá và nội dung để giúp doanh nghiệp chiếm vị trí nổi bật trong khu vực.",
        visual: homeMedia.slideshow[2],
        revenue: "Top 1",
        growth: "+120%",
        newClients: "+95%",
        highlight: "Hiệu quả tìm kiếm",
        pills: [
          { label: "Google Maps", icon: MapPinned },
          { label: "Website", icon: LayoutTemplate },
          { label: "Facebook", icon: SiFacebook },
        ],
      });
    }
    return slides;
  }, [homeMedia?.slideshow]);
  const currentHeroSlide = heroSlides[activeHeroSlide] || heroSlides[0];

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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const navigation = [
    { label: "Trang Chủ", href: "#hero" },
    { label: "Giới Thiệu", href: "/gioi-thieu" },
    { label: "Website", href: "/website" },
    { label: "Facebook", href: "/facebook" },
    { label: "Google Maps", href: "/google-maps" },
    { label: "Tin Tức", href: "#news" },
    { label: "Liên Hệ", href: "/lien-he" },
  ];

  const serviceCards = useMemo(() => {
    const preferredPlatforms = ["website", "facebook", "googlemaps"];

    return preferredPlatforms.map((platformKey, index) => {
      const match = services.find((item) => item.platform === platformKey);
      const media = settings?.media?.[platformKey];
      const image =
        media?.slideshow?.[0] ||
        media?.cases?.[0]?.after ||
        media?.cases?.[0]?.before ||
        heroVisual;

      return {
        key: platformKey,
        title:
          match?.name ||
          (platformKey === "website"
            ? "Thiết Kế Website"
            : platformKey === "facebook"
              ? "Quản trị Fanpage"
              : "Google Maps Marketing"),
        description:
          match?.features?.slice(0, 2).join(", ") ||
          (platformKey === "website"
            ? "Website chuẩn SEO, giao diện đẹp, tối ưu chuyển đổi."
            : platformKey === "facebook"
              ? "Tăng hiện diện, tăng tương tác, tăng chuyển đổi."
              : "Đưa doanh nghiệp vào top tìm kiếm địa phương."),
        href:
          platformKey === "website" ? "/website" : platformKey === "facebook" ? "/facebook" : "/google-maps",
        image,
        accent:
          index === 0
            ? "from-emerald-500/25 via-emerald-500/10"
            : index === 1
              ? "from-sky-500/25 via-sky-500/10"
              : "from-orange-500/25 via-orange-500/10",
      };
    });
  }, [heroVisual, services, settings?.media]);

  const projectShowcase = useMemo(() => {
    const seeds = [
      { key: "website", label: "Website bán hàng", result: "+150%", note: "Tăng doanh thu" },
      { key: "facebook", label: "Website bán hàng", result: "+120%", note: "Tăng đơn hàng" },
      { key: "googlemaps", label: "Google Maps", result: "Top 1", note: "Google Maps" },
      { key: "website", label: "Website chuẩn SEO", result: "+200%", note: "Lượt truy cập" },
    ];

    return seeds.map((seed, index) => {
      const media = settings?.media?.[seed.key];
      const caseItem = media?.cases?.[index] || media?.cases?.[0];
      return {
        title:
          caseItem?.title ||
          (seed.key === "website"
            ? index === 0
              ? "Nội Thất Xinh"
              : "Spa & Clinic"
            : seed.key === "facebook"
              ? "Thời Trang Eva"
              : "Nhà Hàng Sushi House"),
        subtitle: seed.label,
        image:
          caseItem?.after ||
          caseItem?.before ||
          media?.slideshow?.[index] ||
          media?.slideshow?.[0] ||
          heroVisual,
        result: seed.result,
        note: seed.note,
      };
    });
  }, [heroVisual, settings?.media]);

  const topBlogs = blogs.slice(0, 4);
  const topReviews = reviews.slice(0, 3);

  const heroStats = [
    { value: "300+", label: "Dự án hoàn thành" },
    { value: "150%", label: "Tăng trưởng TB" },
    { value: "98%", label: "Khách hàng hài lòng" },
  ];

  const whyChooseUs = [
    {
      title: "Tư duy marketing định hướng kết quả",
      description: "Không chỉ làm web, chúng tôi xử lý hệ thống tạo nhiều khách hàng và doanh thu.",
      icon: Target,
    },
    {
      title: "Tối ưu chuyển đổi",
      description: "Thiết kế chuẩn hành vi người dùng, tăng tỷ lệ chuyển đổi và hiệu quả kinh doanh.",
      icon: TrendingUp,
    },
    {
      title: "Hệ thống tự động",
      description: "Ứng dụng AI & automation giúp tiết kiệm thời gian, chi phí và tối ưu hiệu suất.",
      icon: Workflow,
    },
    {
      title: "Đồng hành lâu dài",
      description: "Hỗ trợ 24/7, nâng cấp và tối ưu cùng doanh nghiệp trên hành trình tăng trưởng.",
      icon: Users,
    },
  ];

  const valuePillars = [
    {
      title: "Tầm nhìn",
      description: "Trở thành đơn vị dẫn đầu trong việc tạo hệ thống marketing online tạo ra tăng trưởng bền vững.",
      icon: Target,
    },
    {
      title: "Sứ mệnh",
      description: "Mang giải pháp marketing hiệu quả – minh bạch – bền vững cho mỗi doanh nghiệp.",
      icon: Sparkles,
    },
    {
      title: "Trách nhiệm",
      description: "Luôn đồng hành, hỗ trợ và cam kết hiệu quả, lấy thành công của khách hàng làm giá trị cốt lõi.",
      icon: ShieldCheck,
    },
  ];

  const socialLinks = [
    {
      label: "Messenger",
      href: settings?.fanpage || "#",
      icon: SiMessenger,
      bg: "bg-[#0078FF]",
    },
    {
      label: "Zalo",
      href: settings?.zalo ? `https://zalo.me/${settings.zalo}` : "#",
      icon: SiZalo,
      bg: "bg-[#0068FF]",
    },
    {
      label: "Gọi ngay",
      href: settings?.hotline ? `tel:${settings.hotline}` : "#",
      icon: Phone,
      bg: "bg-[#26C16A]",
    },
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

    const result = await db.leads.add({
      type: "contact",
      name: contactForm.name,
      phone: contactForm.phone,
      service: contactForm.interest || "Tư vấn tổng thể",
      note: [contactForm.location, contactForm.note].filter(Boolean).join(" | "),
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
          <div className="absolute inset-0 rounded-full border border-primary/20 border-t-primary shadow-[0_0_40px_rgba(139,92,246,0.3)] animate-spin" />
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#07040d] text-white">
      <ParticleBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_28%),linear-gradient(180deg,rgba(9,5,17,0.82),rgba(6,3,12,0.98))]" />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 bg-[#070b1b]/96 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-3.5 lg:px-5">
            <Link href="/" className="flex items-center gap-3" onClick={playClickSound}>
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-fuchsia-500/25 blur-xl" />
                <img src={logoSrc} alt={brandName} className="relative h-11 w-11 rounded-full object-cover" />
              </div>
              <div>
                <p className="text-[13px] font-black uppercase tracking-[0.14em] text-white">{brandName}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-purple-200/75">Marketing</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-5 xl:gap-6 lg:flex">
              {navigation.map((item) =>
                item.href.startsWith("#") ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    className="text-[12px] font-semibold uppercase tracking-[0.04em] text-white/80 transition hover:text-white"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link key={item.label} href={item.href} className="text-[12px] font-semibold uppercase tracking-[0.04em] text-white/80 transition hover:text-white">
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setShowLogin(true);
                }}
                className="rounded-xl border border-fuchsia-400/25 bg-[#0b1022] px-3.5 py-2.5 text-[12px] font-bold text-white transition hover:border-fuchsia-300/40 hover:bg-white/5"
              >
                Lộ trình dự án
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/lien-he";
                }}
                className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-3.5 py-2.5 text-[12px] font-bold text-white shadow-[0_14px_30px_rgba(168,85,247,0.28)] transition hover:scale-[1.02]"
              >
                Liên hệ tư vấn
              </button>
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-fuchsia-500/70 to-transparent shadow-[0_0_22px_rgba(168,85,247,0.55)]" />
        </header>

        <main>
          {heroSlides.length > 0 && (
            <section id="hero" className="mx-auto max-w-[1180px] px-4 pb-8 pt-8 lg:px-5 lg:pt-9">
              <div className="relative overflow-hidden rounded-[32px] border border-fuchsia-400/14 bg-[#090412] shadow-[0_28px_80px_rgba(4,2,10,0.46)]">
                <img
                  key={currentHeroSlide?.visual}
                  src={currentHeroSlide?.visual}
                  alt="Slideshow marketing"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,4,18,0.08),rgba(9,4,18,0.22))]" />
                <div className="relative min-h-[540px] sm:min-h-[620px]">
                  {heroSlides.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setActiveHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                        className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur transition hover:bg-black/35"
                        aria-label="Slide trước"
                      >
                        <ChevronRight className="h-5 w-5 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length)}
                        className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur transition hover:bg-black/35"
                        aria-label="Slide tiếp theo"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {heroSlides.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                    {heroSlides.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveHeroSlide(index)}
                        className={`h-2.5 rounded-full transition-all ${index === activeHeroSlide ? "w-10 bg-fuchsia-400" : "w-2.5 bg-white/30"}`}
                        aria-label={`Chọn slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          <section className="mx-auto max-w-[1180px] px-4 py-6 lg:px-5">
            <div className="grid gap-7 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
              <div className="overflow-hidden rounded-[24px] border border-fuchsia-400/16 bg-[radial-gradient(circle_at_top,_rgba(146,64,255,0.22),_rgba(16,8,27,0.96)_64%)] shadow-[0_24px_70px_rgba(4,2,10,0.38)]">
                <div className="flex min-h-[350px] items-center justify-center px-8 py-10">
                  <img
                    src="/mascot-home.png"
                    alt="Robot But Pha Marketing"
                    className="h-auto max-h-[390px] w-full max-w-[360px] object-contain drop-shadow-[0_24px_40px_rgba(168,85,247,0.28)]"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-[12px] font-black uppercase tracking-[0.28em] text-fuchsia-300">Về chúng tôi</p>
                  <h2 className="mt-2 text-[40px] font-black tracking-[-0.045em] text-white lg:text-[44px]">Bứt Phá Marketing</h2>
                  <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-300">
                    Chúng tôi không chỉ làm marketing.
                    <br />
                    Chúng tôi xây dựng hệ thống giúp doanh nghiệp tăng trưởng bền vững, tự động và có thể đo lường.
                  </p>
                  <Link
                    href="/gioi-thieu"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-fuchsia-300/50 hover:bg-fuchsia-500/10"
                  >
                    Xem tất cả
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {valuePillars.map((pillar) => (
                    <div key={pillar.title} className="rounded-[20px] border border-fuchsia-400/18 bg-[linear-gradient(180deg,rgba(21,11,34,0.98),rgba(12,7,22,0.98))] p-5 shadow-[0_18px_46px_rgba(6,2,14,0.24)]">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/14 text-fuchsia-200">
                        <pillar.icon className="h-4.5 w-4.5" />
                      </span>
                      <h3 className="mt-4 text-[21px] font-black text-white">{pillar.title}</h3>
                      <p className="mt-2 text-[13px] leading-7 text-slate-300">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-6 text-center">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Giải pháp marketing toàn diện</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {serviceCards.map((card) => (
                <Link
                  key={card.key}
                  href={card.href}
                  className={`group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,8,27,0.96),rgba(12,6,20,0.98))] p-5 shadow-[0_24px_70px_rgba(4,2,10,0.36)]`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} to-transparent opacity-70`} />
                  <div className="relative z-10">
                    <div className="overflow-hidden rounded-[1.3rem] border border-white/10 bg-black/20">
                      <img src={card.image} alt={card.title} className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                    </div>
                    <h3 className="mt-5 text-2xl font-black text-white">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-black text-fuchsia-300">
                      Xem chi tiết
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
            <div className="mb-6 text-center">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Vì sao chọn Bứt Phá Marketing?</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {whyChooseUs.map((item) => (
                <div key={item.title} className="rounded-[1.6rem] border border-white/10 bg-[#0e0918] p-5 text-center">
                  <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-fuchsia-500/12 text-fuchsia-200 shadow-[0_0_24px_rgba(168,85,247,0.2)]">
                    <item.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Dự án tiêu biểu</p>
              </div>
              <Link href="/website" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-black text-white transition hover:bg-white/10">
                Xem tất cả dự án
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 xl:grid-cols-4">
              {projectShowcase.map((project) => (
                <article key={`${project.title}-${project.subtitle}`} className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0e0918] shadow-[0_24px_70px_rgba(4,2,10,0.36)]">
                  <img src={project.image} alt={project.title} className="h-44 w-full object-cover" />
                  <div className="space-y-3 p-5">
                    <h3 className="text-xl font-black text-white">{project.title}</h3>
                    <div className="text-sm text-slate-300">{project.subtitle}</div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-3xl font-black text-emerald-300">{project.result}</div>
                      <div className="text-sm font-semibold text-slate-300">{project.note}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
            <div className="mb-6 text-center">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Khách hàng nói gì về chúng tôi?</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {(topReviews.length ? topReviews : Array.from({ length: 3 }).map((_, index) => ({
                id: `fallback-${index}`,
                clientName: index === 0 ? "Nguyễn Văn Hùng" : index === 1 ? "Trần Thị Mai" : "Lê Minh Tuấn",
                rating: 5,
                content:
                  index === 0
                    ? "Từ ngày làm web bên em đơn nhiều hơn hẳn anh ơi. Chuẩn luôn! Doanh số tăng rõ."
                    : index === 1
                      ? "Fanpage lên đều, khách nhắn đông hơn trước rất nhiều. Dạ em cảm ơn chị, bên em sẽ hỗ trợ lâu dài."
                      : "Google Maps lên top 1 luôn. Tuyệt vời! Chúc mừng anh.",
                createdAt: "",
              } as ClientReview))).map((review) => (
                <div key={review.id} className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0e0918] shadow-[0_20px_60px_rgba(4,2,10,0.3)]">
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <div className="flex items-center gap-3">
                      {"logoUrl" in review && review.logoUrl ? (
                        <img src={review.logoUrl} alt={review.clientName} className="h-12 w-12 rounded-full object-cover" />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-500/15 font-black text-white">
                          {review.clientName.slice(0, 1)}
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-black text-white">{review.clientName}</div>
                        <div className="text-xs text-slate-400">Khách hàng Bứt Phá Marketing</div>
                      </div>
                    </div>
                    <div className="rounded-full bg-[#1677ff] px-3 py-1 text-xs font-black text-white">Zalo</div>
                  </div>
                  <div className="space-y-4 px-5 py-5">
                    <div className="rounded-2xl bg-[#e9f3ff] px-4 py-4 text-[15px] leading-7 text-slate-800">
                      {review.content}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-300">
                      {Array.from({ length: Math.max(1, Math.min(5, review.rating || 5)) }).map((_, index) => (
                        <Star key={`${review.id}-${index}`} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="consultation" className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="grid gap-6 overflow-hidden rounded-[2rem] border border-fuchsia-400/15 bg-[linear-gradient(180deg,rgba(22,11,36,0.96),rgba(11,6,20,0.98))] p-6 shadow-[0_30px_80px_rgba(3,1,8,0.46)] lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Đặt lịch tư vấn trực tiếp</p>
                <p className="mt-3 text-base leading-8 text-slate-300">
                  Chọn thời gian phù hợp, chúng tôi sẽ liên hệ xác nhận trong vòng 15 phút!
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
                      placeholder="Nhập số điện thoại"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-400/50"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      value={contactForm.location}
                      onChange={(event) => setContactForm((prev) => ({ ...prev, location: event.target.value }))}
                      placeholder="Địa điểm"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-400/50"
                    />
                    <select
                      value={contactForm.interest}
                      onChange={(event) => setContactForm((prev) => ({ ...prev, interest: event.target.value }))}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition focus:border-fuchsia-400/50"
                    >
                      <option value="" className="bg-[#120b20]">
                        Chọn nền tảng
                      </option>
                      <option value="Thiết kế Website" className="bg-[#120b20]">
                        Thiết kế Website
                      </option>
                      <option value="Quản trị Fanpage" className="bg-[#120b20]">
                        Quản trị Fanpage
                      </option>
                      <option value="Google Maps Marketing" className="bg-[#120b20]">
                        Google Maps Marketing
                      </option>
                      <option value="SEO Website" className="bg-[#120b20]">
                        SEO Website
                      </option>
                    </select>
                  </div>
                  <textarea
                    value={contactForm.note}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, note: event.target.value }))}
                    placeholder="Bạn muốn tư vấn về vấn đề gì?"
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

              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_45%),rgba(255,255,255,0.03)] p-6">
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

          <section id="news" className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Tin tức & kiến thức</p>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-black text-white transition hover:bg-white/10">
                Xem tất cả bài viết
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 xl:grid-cols-4">
              {topBlogs.map((blog) => {
                const href = `/blog/${blog.slug || slugify(blog.title) || blog.id}`;
                return (
                  <Link key={blog.id} href={href} className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0e0918] shadow-[0_20px_60px_rgba(4,2,10,0.32)]">
                    <div className="overflow-hidden">
                      <img
                        src={blog.imageUrl || heroVisual}
                        alt={blog.title}
                        className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
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

          <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
            <div className="overflow-hidden rounded-[2rem] border border-fuchsia-400/15 bg-[linear-gradient(90deg,rgba(26,14,44,0.96),rgba(63,28,112,0.9))] px-6 py-8 shadow-[0_24px_70px_rgba(6,2,14,0.42)] md:px-10">
              <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-200">Sẵn sàng bứt phá doanh thu?</p>
                  <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-white">Chúng tôi sẵn sàng đồng hành cùng bạn chinh phục những đỉnh cao mới!</h2>
                </div>
                <div className="flex flex-wrap items-center justify-start gap-4 md:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = "/lien-he";
                    }}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-900 transition hover:scale-[1.02]"
                  >
                    Liên hệ tư vấn ngay
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setShowLogin(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/15"
                  >
                    Lộ trình dự án
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
                Giúp doanh nghiệp online toàn diện, tiếp cận đúng khách hàng và bứt phá doanh thu.
              </p>
              <div className="mt-5 flex items-center gap-3 text-white">
                <a href={settings?.fanpage || "#"} className="rounded-full border border-white/10 p-2 transition hover:border-fuchsia-400/40 hover:text-fuchsia-200"><SiFacebook /></a>
                <a href={settings?.fanpage || "#"} className="rounded-full border border-white/10 p-2 transition hover:border-fuchsia-400/40 hover:text-fuchsia-200"><SiMessenger /></a>
                <a href={settings?.zalo ? `https://zalo.me/${settings.zalo}` : "#"} className="rounded-full border border-white/10 p-2 transition hover:border-fuchsia-400/40 hover:text-fuchsia-200"><SiZalo /></a>
                <a href="https://www.youtube.com" className="rounded-full border border-white/10 p-2 transition hover:border-fuchsia-400/40 hover:text-fuchsia-200"><SiYoutube /></a>
              </div>
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
                <li><Link href="/website">Thiết Kế Website</Link></li>
                <li><Link href="/facebook">Quản trị Fanpage</Link></li>
                <li><Link href="/google-maps">Google Maps Marketing</Link></li>
                <li><Link href="/blog">AI Content / SEO</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.24em] text-white">Liên kết nhanh</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link href="/">Trang Chủ</Link></li>
              <li><Link href="/gioi-thieu">Giới Thiệu</Link></li>
              <li><Link href="/blog">Tin Tức</Link></li>
              <li><Link href="/lien-he">Liên Hệ</Link></li>
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

        <div className="fixed right-4 top-40 z-30 hidden flex-col gap-3 xl:flex">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f0918]/90 px-4 py-3 text-sm font-bold text-white shadow-[0_20px_40px_rgba(4,2,10,0.34)] backdrop-blur transition hover:border-fuchsia-400/35"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${item.bg}`}>
                <item.icon className="h-5 w-5" />
              </span>
              <span className="hidden text-slate-200 2xl:block">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}


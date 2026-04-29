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
  MessageCircle,
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
  
  const heroSlides = useMemo(() => {
    const slides = [];
    const slideshowImages = homeMedia?.slideshow || [];
    
    if (slideshowImages.length > 0) {
      slideshowImages.forEach((img, index) => {
        if (index === 0) {
          slides.push({
            eyebrow: "WEBSITE CHỈ ĐỂ ĐẸP",
            middle: "KHÔNG TẠO RA DOANH THU",
            accent: "THÌ KHÔNG CÓ Ý NGHĨA!",
            description: "Bứt Phá Marketing giúp doanh nghiệp tăng trưởng bền vững bằng hệ thống marketing tự động, đo lường được và tối ưu liên tục.",
            visual: img,
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
        } else if (index === 1) {
          slides.push({
            eyebrow: "FACEBOOK KHÔNG CHỈ ĐỂ ĐĂNG BÀI",
            middle: "PHẢI TẠO RA TƯƠNG TÁC, KHÁCH HÀNG",
            accent: "VÀ DOANH THU THẬT!",
            description: "Từ nội dung, quảng cáo đến chatbot và chăm sóc inbox, mọi thứ phải gắn với mục tiêu chuyển đổi đo lường được.",
            visual: img,
            revenue: "+168%",
            growth: "+132%",
            newClients: "+145%",
            highlight: "Tăng trưởng Fanpage",
            pills: [
              { label: "Facebook", icon: SiFacebook },
              { label: "Messenger", icon: MessageCircle },
              { label: "Zalo", icon: SiZalo },
            ],
          });
        } else if (index === 2) {
          slides.push({
            eyebrow: "GOOGLE MAPS KHÔNG CHỈ ĐỂ HIỂN THỊ",
            middle: "PHẢI KÉO ĐÚNG KHÁCH GẦN BẠN",
            accent: "VÀ TĂNG CUỘC GỌI THẬT!",
            description: "Đẩy hiển thị địa phương, tối ưu hồ sơ, đánh giá và nội dung để giúp doanh nghiệp chiếm vị trí nổi bật trong khu vực.",
            visual: img,
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
        } else {
          slides.push({
            eyebrow: "GIẢI PHÁP MARKETING TOÀN DIỆN",
            middle: "TĂNG TRƯỞNG DOANH THU ĐỘT PHÁ",
            accent: "CHO DOANH NGHIỆP CỦA BẠN!",
            description: "Chúng tôi đồng hành cùng bạn xây dựng thương hiệu và tối ưu hóa quy trình bán hàng trên đa nền tảng.",
            visual: img,
            revenue: "+180%",
            growth: "+140%",
            newClients: "+120%",
            highlight: "Tăng trưởng bền vững",
            pills: [
              { label: "Marketing", icon: Target },
              { label: "Branding", icon: Sparkles },
              { label: "Automation", icon: Workflow },
            ],
          });
        }
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
    if (heroSlides.length <= 1) return;
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
      
      // Ưu tiên lấy ảnh từ slideshow của từng trang dịch vụ như yêu cầu
      const image =
        media?.slideshow?.[0] ||
        media?.cases?.[0]?.after ||
        media?.cases?.[0]?.before ||
        "/mascot-home.png";

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
  }, [services, settings?.media]);

  const topBlogs = blogs.slice(0, 4);
  const topReviews = reviews.slice(0, 3);

  const valuePillars = [
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
      description: "Ứng dụng AI & automation giúp tiết kiệm thời gian, chi phí và vận hành chuyên nghiệp.",
      icon: Workflow,
    },
  ];

  const whyChooseUs = [
    {
      title: "Chiến lược thực chiến",
      description: "Mọi giải pháp đều dựa trên dữ liệu và kinh nghiệm triển khai hàng trăm dự án thực tế.",
      icon: Target,
    },
    {
      title: "Đội ngũ chuyên gia",
      description: "Quy tụ những chuyên gia giàu kinh nghiệm trong lĩnh vực Digital Marketing và Công nghệ.",
      icon: Users,
    },
    {
      title: "Cam kết hiệu quả",
      description: "Chúng tôi đồng hành và cam kết mang lại giá trị thực sự cho sự tăng trưởng của doanh nghiệp.",
      icon: ShieldCheck,
    },
    {
      title: "Hỗ trợ 24/7",
      description: "Luôn sẵn sàng lắng nghe và giải quyết mọi vấn đề của khách hàng một cách nhanh chóng nhất.",
      icon: MessageCircle,
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07040d]">
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping rounded-full bg-fuchsia-500/20 blur-2xl" />
          <img src={logoSrc} alt="Loading..." className="relative h-24 w-24 rounded-full object-cover shadow-[0_0_40px_rgba(168,85,247,0.4)]" />
        </div>
        <div className="w-64 text-center">
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
                <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[540px] lg:min-h-[620px]">
                  <img
                    key={currentHeroSlide?.visual}
                    src={currentHeroSlide?.visual}
                    alt="Slideshow marketing"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,4,18,0.1),rgba(9,4,18,0.4))]" />
                  
                  {heroSlides.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setActiveHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur transition hover:bg-black/35"
                        aria-label="Slide trước"
                      >
                        <ChevronRight className="h-5 w-5 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length)}
                        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur transition hover:bg-black/35"
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
                        className={`h-2 rounded-full transition-all ${index === activeHeroSlide ? "w-8 bg-fuchsia-400" : "w-2 bg-white/30"}`}
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
                <div className="flex min-h-[300px] md:min-h-[350px] items-center justify-center px-8 py-10">
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
                  <h2 className="mt-2 text-[32px] font-black tracking-[-0.045em] text-white lg:text-[44px]">Bứt Phá Marketing</h2>
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
                      <h3 className="mt-4 text-[18px] md:text-[21px] font-black text-white">{pillar.title}</h3>
                      <p className="mt-2 text-[13px] leading-7 text-slate-300">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-8 text-center space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Giải pháp marketing toàn diện</p>
              {settings.marketingSolutionImage && (
                <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                  <img src={settings.marketingSolutionImage} alt="Giải pháp Marketing toàn diện" className="w-full h-auto object-cover aspect-video" />
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="relative group">
              <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 xl:grid-cols-4 md:overflow-visible scrollbar-hide snap-x snap-mandatory scroll-smooth" id="why-choose-slider">
                {whyChooseUs.map((item) => (
                  <div key={item.title} className="min-w-[85%] md:min-w-0 snap-center rounded-[1.6rem] border border-white/10 bg-[#0e0918] p-5 text-center transition-transform duration-300 hover:scale-[1.02]">
                    <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-fuchsia-500/12 text-fuchsia-200 shadow-[0_0_24px_rgba(168,85,247,0.2)]">
                      <item.icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-4 text-xl font-black text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex md:hidden items-center justify-center gap-4 mt-2">
                <button 
                  onClick={() => {
                    const el = document.getElementById('why-choose-slider');
                    if (el) el.scrollLeft -= el.offsetWidth * 0.8;
                  }}
                  className="p-3 rounded-full border border-white/10 bg-white/5 text-white active:scale-95 transition"
                >
                  <ArrowRight className="h-5 w-5 rotate-180" />
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('why-choose-slider');
                    if (el) el.scrollLeft += el.offsetWidth * 0.8;
                  }}
                  className="p-3 rounded-full border border-white/10 bg-white/5 text-white active:scale-95 transition"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>

          <section id="projects" className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Dự án tiêu biểu</p>
                <h2 className="mt-2 text-3xl font-black text-white">Thành quả từ sự tận tâm</h2>
              </div>
              <Link href="/website" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-black text-white transition hover:bg-white/10">
                Xem tất cả dự án
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative group">
              <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth" id="projects-slider">
                {(settings?.featuredProjects || []).length > 0 ? (
                  settings.featuredProjects.map((proj) => (
                    <div key={proj.id} className="min-w-[85%] md:min-w-[45%] lg:min-w-[31%] snap-center">
                      <article className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0e0918] shadow-[0_24px_70px_rgba(4,2,10,0.36)] h-full">
                        <img src={proj.thumbnail} alt={proj.title} className="h-48 w-full object-cover" />
                        <div className="space-y-3 p-5">
                          <h3 className="text-xl font-black text-white">{proj.title}</h3>
                          <div className="text-sm text-slate-400 line-clamp-2">{proj.description}</div>
                          <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/5">
                            <div className="text-2xl font-black text-emerald-300">{proj.result || "+150%"}</div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{proj.note || "Tăng trưởng"}</div>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))
                ) : (
                  <div className="w-full py-12 text-center text-slate-500 border border-dashed border-white/10 rounded-3xl">
                    Chưa có dự án tiêu biểu nào được nhập.
                  </div>
                )}
              </div>
            </div>
          </section>

          <section id="reviews" className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-8 text-center">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Khách hàng nói gì về chúng tôi?</p>
              <h2 className="mt-2 text-3xl font-black text-white">Niềm tin từ đối tác</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(settings?.customerFeedbacks || []).length > 0 ? (
                settings.customerFeedbacks.map((feedback) => (
                  <div key={feedback.id} className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0e0918] shadow-xl">
                    <img 
                      src={feedback.contentImage} 
                      alt={feedback.clientName || "Feedback khách hàng"} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-slate-500 border border-dashed border-white/10 rounded-3xl">
                  Chưa có phản hồi khách hàng nào được nhập.
                </div>
              )}
            </div>
          </section>

          <section id="news" className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Tin tức & Kiến thức</p>
                <h2 className="mt-2 text-3xl font-black text-white">Cập nhật xu hướng Marketing</h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-black text-white transition hover:bg-white/10">
                Xem tất cả bài viết
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {topBlogs.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug || post.id}`} className="group block">
                  <article className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0e0918] transition duration-300 hover:border-fuchsia-500/30 h-full">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.imageUrl || "/mascot-home.png"} 
                        alt={post.title} 
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105" 
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-fuchsia-400">
                        <CalendarDays className="h-3 w-3" />
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("vi-VN") : "Mới cập nhật"}
                      </div>
                      <h3 className="mt-3 text-lg font-black leading-tight text-white line-clamp-2 group-hover:text-fuchsia-300 transition">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm text-slate-400 line-clamp-2">
                        {post.description || "Xem chi tiết bài viết để cập nhật những kiến thức marketing mới nhất."}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          <section id="contact" className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
            <div className="relative overflow-hidden rounded-[3rem] border border-fuchsia-500/20 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_40%),linear-gradient(180deg,rgba(16,8,27,0.96),rgba(12,6,20,0.98))] p-8 md:p-12">
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-4xl font-black text-white lg:text-5xl">Sẵn sàng bứt phá doanh thu?</h2>
                  <p className="mt-6 text-lg leading-8 text-slate-300">
                    Để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ tư vấn lộ trình marketing tối ưu nhất cho doanh nghiệp của bạn.
                  </p>
                  
                  <div className="mt-10 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/10 text-fuchsia-400">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-400">Hotline tư vấn</p>
                        <p className="text-xl font-black text-white">{settings.hotline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400">
                        <SiZalo className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-400">Zalo OA</p>
                        <p className="text-xl font-black text-white">{settings.zalo || settings.hotline}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-fuchsia-500/50 transition"
                    />
                    <input
                      type="tel"
                      placeholder="Số điện thoại"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-fuchsia-500/50 transition"
                    />
                  </div>
                  <select className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-fuchsia-500/50 transition appearance-none">
                    <option value="" className="bg-[#0e0918]">Dịch vụ quan tâm</option>
                    <option value="website" className="bg-[#0e0918]">Thiết kế Website</option>
                    <option value="facebook" className="bg-[#0e0918]">Quản trị Fanpage</option>
                    <option value="googlemaps" className="bg-[#0e0918]">Google Maps Marketing</option>
                  </select>
                  <textarea
                    placeholder="Ghi chú thêm"
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-fuchsia-500/50 transition"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 py-5 text-lg font-black text-white shadow-xl transition hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Gửi yêu cầu tư vấn
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/5 bg-[#050308] py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <div className="grid gap-12 lg:grid-cols-4">
              <div className="col-span-2">
                <Link href="/" className="flex items-center gap-3">
                  <img src={logoSrc} alt={brandName} className="h-10 w-10 rounded-full object-cover" />
                  <span className="text-xl font-black uppercase tracking-wider text-white">{brandName}</span>
                </Link>
                <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
                  Bứt Phá Marketing - Agency cung cấp giải pháp Digital Marketing toàn diện, giúp doanh nghiệp tối ưu hóa hiện diện số và tăng trưởng doanh thu bền vững.
                </p>
                <div className="mt-8 flex gap-4">
                  <a href={settings.fanpage} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-fuchsia-500/20 hover:text-fuchsia-400">
                    <SiFacebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-fuchsia-500/20 hover:text-fuchsia-400">
                    <SiYoutube className="h-5 w-5" />
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-fuchsia-500/20 hover:text-fuchsia-400">
                    <SiZalo className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white">Dịch vụ</h4>
                <ul className="mt-6 space-y-4 text-sm text-slate-400">
                  <li><Link href="/website" className="hover:text-fuchsia-400 transition">Thiết kế Website</Link></li>
                  <li><Link href="/facebook" className="hover:text-fuchsia-400 transition">Quản trị Fanpage</Link></li>
                  <li><Link href="/google-maps" className="hover:text-fuchsia-400 transition">Google Maps Marketing</Link></li>
                  <li><Link href="/lien-he" className="hover:text-fuchsia-400 transition">Tư vấn chiến lược</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white">Liên hệ</h4>
                <ul className="mt-6 space-y-4 text-sm text-slate-400">
                  <li className="flex items-start gap-3">
                    <MapPinned className="h-5 w-5 shrink-0 text-fuchsia-400" />
                    <span>{settings.address || "Hồ Chí Minh, Việt Nam"}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-fuchsia-400" />
                    <span>{settings.hotline}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 shrink-0 text-fuchsia-400" />
                    <span>{settings.email || "contact@butphamarketing.com"}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-slate-500">
              <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}

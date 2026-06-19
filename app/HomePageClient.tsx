"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LayoutTemplate,
  MapPinned,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { SiteNavMenu } from "@/components/shared/SiteNavMenu";
import { SiFacebook } from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";
import { useAdmin } from "@/lib/AdminContext";
import { db, type ClientReview, type NewsItem, type Service } from "@/lib/useData";
import { playClickSound } from "@/lib/utils";
import { getMailtoHref, getTelHref, resolveAddress, resolveEmail, resolveHotline } from "@/lib/site-contact";
import { SectionWaveDivider } from "@/components/shared/SectionWaveDivider";
import { fadeUpChild, scaleIn, slideLeft, staggerIntro, VIEWPORT_ONCE } from "@/lib/motion-presets";

const ConsultModal = dynamic(() => import("@/components/shared/ConsultModal").then((mod) => mod.ConsultModal), { ssr: false });
const ParticleBackground = dynamic(() => import("@/components/shared/ParticleBackground").then((mod) => mod.ParticleBackground), { ssr: false });

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

function notifyMascot(message: string, durationMs = 6000) {
  window.dispatchEvent(new CustomEvent("mascot-alert", { detail: { message, durationMs } }));
}

function isValidVNPhone(value: string) {
  return /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/.test(value.trim());
}

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
  const [showConsult, setShowConsult] = useState(false);
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingContact) return;
    if (!contactForm.name.trim()) {
      setContactState({ type: "error", message: "Vui lòng nhập họ và tên." });
      notifyMascot("Bạn chưa nhập họ tên. Nhập giúp mình họ tên để đội ngũ tư vấn xưng hô cho đúng nhé!");
      return;
    }
    if (!isValidVNPhone(contactForm.phone)) {
      setContactState({ type: "error", message: "Số điện thoại chưa đúng định dạng Việt Nam." });
      notifyMascot("Số điện thoại chưa đúng định dạng Việt Nam. Bạn kiểm tra lại giúp mình để đội ngũ gọi hoặc nhắn Zalo tư vấn nhé!");
      return;
    }
    if (!contactForm.interest.trim()) {
      setContactState({ type: "error", message: "Vui lòng chọn dịch vụ quan tâm." });
      notifyMascot("Bạn chọn giúp mình dịch vụ đang quan tâm để đội ngũ tư vấn đúng nhu cầu nhé!");
      return;
    }
    setSubmittingContact(true);
    try {
      const result = await (db as any).leads.add({
        type: "contact",
        name: contactForm.name,
        phone: contactForm.phone,
        service: contactForm.interest || "Tư vấn tổng thể",
        note: [contactForm.location, contactForm.note].filter(Boolean).join(" | "),
        platform: "home"
      });
      if (result.success) {
        setContactState({ type: "success", message: "Gửi yêu cầu thành công!" });
        setContactForm(initialContactForm);
        notifyMascot("Hoàn tất rồi! Bạn chú ý điện thoại hoặc Zalo nhé, đội ngũ Bứt Phá Marketing sẽ liên hệ tư vấn cho bạn sớm nhất.");
      } else {
        setContactState({ type: "error", message: "Có lỗi xảy ra, vui lòng thử lại." });
        notifyMascot("Hiện chưa gửi được thông tin. Bạn thử lại giúp mình hoặc gọi trực tiếp cho đội ngũ tư vấn nhé!");
      }
    } catch (err) {
      setContactState({ type: "error", message: "Có lỗi xảy ra, vui lòng thử lại." });
      notifyMascot("Hiện chưa gửi được thông tin. Bạn thử lại giúp mình hoặc gọi trực tiếp cho đội ngũ tư vấn nhé!");
    } finally {
      setSubmittingContact(false);
    }
  };
  const { settings } = useAdmin();

  useEffect(() => {
    if (!showConsult) return;
    const timer = window.setTimeout(() => {
      notifyMascot("Bạn vui lòng nhập thông tin tư vấn. Nếu điền số điện thoại hoặc thông tin chưa đúng, mình sẽ nhắc để bạn sửa ngay nhé!");
    }, 450);
    return () => window.clearTimeout(timer);
  }, [showConsult]);

  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const projectShowcaseRef = useRef<HTMLDivElement>(null);
  const topReviewsRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (!ref.current) return;
    const scrollAmount = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const brandName = settings?.title || "Bứt Phá Marketing";
  const logoSrc = "/logo.png";

  const homeMedia = settings?.media?.home;
  
  const heroSlides = useMemo(() => {
    const slides: any[] = [];
    
    const imagesToUse = [
      "/slideshow-hero.png"
    ];

    imagesToUse.forEach((img, index) => {
      slides.push({
        visual: img,
      });
    });
    
    return slides;
  }, []);

  const currentHeroSlide = heroSlides[activeHeroSlide] || heroSlides[0] || {
    eyebrow: "Bứt Phá Marketing",
    middle: "Giải Pháp Marketing",
    accent: "Đột Phá Doanh Thu",
    description: "Chúng tôi giúp doanh nghiệp tăng trưởng vượt bậc.",
    visual: "/logo.png",
    revenue: "100%",
    growth: "100%",
    newClients: "100%",
    pills: []
  };

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
    const durationMs = 250;
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

  const headerNavTone = isScrolled ? "light" : "dark";

  const valuePillars = [
    {
      title: "Chiến Lược Tối Ưu",
      description: "Chúng tôi không chỉ làm marketing, chúng tôi xây dựng lộ trình tăng trưởng dựa trên dữ liệu thật.",
      icon: Target,
    },
    {
      title: "Đội Ngũ Chuyên Gia",
      description: "Quy tụ những chuyên gia thực chiến với nhiều năm kinh nghiệm trong lĩnh vực Digital Marketing.",
      icon: Users,
    },
    {
      title: "Cam Kết Hiệu Quả",
      description: "Mọi hoạt động đều hướng tới mục tiêu cuối cùng là chuyển đổi và doanh thu cho khách hàng.",
      icon: ShieldCheck,
    },
  ];

  const whyChooseUs = [
    {
      title: "Tư Duy Hệ Thống",
      description: "Xây dựng phễu khách hàng tự động, giúp tối ưu chi phí và tăng tỷ lệ chuyển đổi.",
      icon: Workflow,
    },
    {
      title: "Đa Nền Tảng",
      description: "Hiện diện mạnh mẽ trên Website, Facebook, Google Maps... bất cứ đâu khách hàng của bạn có mặt.",
      icon: LayoutTemplate,
    },
    {
      title: "Dữ Liệu Thực",
      description: "Báo cáo minh bạch, đo lường chính xác từng đồng chi phí quảng cáo và hiệu quả mang lại.",
      icon: TrendingUp,
    },
    {
      title: "Đồng Hành 24/7",
      description: "Chúng tôi coi thành công của khách hàng là thành công của chính mình.",
      icon: Sparkles,
    },
  ];

  const serviceCards = [
    {
      key: "website",
      title: "Website",
      description: "Thiết kế website chuẩn SEO, tối ưu chuyển đổi và trải nghiệm người dùng.",
      image: "/Website.png",
      href: "/website",
      accent: "from-emerald-500/20",
    },
    {
      key: "facebook",
      title: "Facebook",
      description: "Quản trị Fanpage, chạy quảng cáo và xây dựng cộng đồng khách hàng trung thành.",
      image: "/Facebook.png",
      href: "/facebook",
      accent: "from-blue-500/20",
    },
    {
      key: "googlemaps",
      title: "Google Maps",
      description: "Tối ưu hiển thị địa phương, tăng lượt gọi và khách hàng ghé thăm cửa hàng.",
      image: "/GoogleMaps.png",
      href: "/google-maps",
      accent: "from-violet-600/20",
    },
  ];

  const projectShowcase = useMemo(() => {
    const cases = homeMedia?.cases || [];
    return cases.map(c => ({
      title: c.title,
      subtitle: c.description || "Dự án tiêu biểu",
      image: c.after,
      result: c.content || "+150%",
      note: "Tăng trưởng",
    }));
  }, [homeMedia?.cases]);

  const topReviews = reviews.slice(0, 3);
  const topBlogs = blogs.slice(0, 4);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-ping rounded-full bg-violet-600/20" />
          <img src={logoSrc} alt="Loading" className="relative z-10 h-24 w-24 rounded-full object-cover shadow-[0_0_40px_rgba(124,58,237,0.4)]" />
        </div>
        <div className="mt-8 w-48 overflow-hidden rounded-full bg-indigo-50 p-1">
          <div className="h-1 rounded-full bg-gradient-to-r from-indigo-900 to-violet-600 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500">Đang khởi tạo hệ thống...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background font-sans selection:bg-violet-600/30">
      <ParticleBackground />
      
      <div className="relative z-10 flex flex-col">
        <header 
          className={`sticky top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-white/95 border-b border-indigo-100/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(49,46,129,0.04)]' : 'border-b border-white/10 bg-indigo-950/35 backdrop-blur-md'}`}
        >
          <div className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 transition-all duration-500 lg:px-8 ${isScrolled ? "py-2.5" : "py-4"}`}>
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Link href="/" className="group flex min-w-0 items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 sm:gap-4">
                <div className="relative shrink-0">
                  <div className="absolute -inset-2 rounded-full bg-violet-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={logoSrc}
                    alt={brandName}
                    className={`relative rounded-full border border-indigo-200 object-cover shadow-2xl transition-all duration-500 ${isScrolled ? "h-9 w-9 sm:h-10 sm:w-10" : "h-11 w-11 sm:h-12 sm:w-12"}`}
                  />
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className={`truncate text-lg font-bold tracking-tight sm:text-xl md:text-2xl leading-none ${isScrolled ? "text-indigo-950" : "text-white"}`}>{brandName}</span>
                  <span className={`text-[11px] font-medium mt-1 sm:text-xs ${isScrolled ? "text-violet-600" : "text-violet-300"}`}>Bứt Phá để dẫn đầu</span>
                </div>
              </Link>

              <button
                type="button"
                aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
                aria-expanded={mobileMenuOpen}
                onClick={() => { playClickSound(); setMobileMenuOpen((open) => !open); }}
                className={`ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition lg:hidden ${isScrolled ? "border-indigo-200 bg-white text-indigo-950 hover:bg-indigo-50" : "border-white/20 bg-white/10 text-white hover:bg-white/15"}`}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            <div className="hidden lg:block">
              <SiteNavMenu tone={headerNavTone} layout="horizontal" />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => { playClickSound(); (document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })) }}
                className={`hidden px-8 py-3.5 sm:inline-flex rounded-full font-bold transition-all ${isScrolled ? 'brand-btn-primary' : 'bg-white text-violet-700 hover:bg-violet-50 shadow-lg hover:shadow-xl'}`}
              >
                Tư vấn ngay
              </button>
              
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`overflow-hidden border-t lg:hidden ${isScrolled ? "border-indigo-100 bg-white/98" : "border-white/10 bg-indigo-950/95"}`}
              >
                <div className="mx-auto max-w-7xl px-6 py-4">
                <SiteNavMenu
                  tone={isScrolled ? "light" : "dark"}
                  layout="stack"
                  onNavigate={() => setMobileMenuOpen(false)}
                />
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      playClickSound();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white"
                  >
                    Tư vấn ngay
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="flex-1">
          <section id="hero" className="relative w-full overflow-hidden">
            <h1 className="sr-only">
              {settings?.heroTitle?.trim() ||
                `${brandName} — Giải pháp marketing thực chiến cho doanh nghiệp Việt Nam`}
            </h1>
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src="/slideshow-hero.png"
                alt={`${brandName} — Agency marketing Facebook, Website và Google Maps`}
                className="home-hero-kenburns"
              />
              <div className="home-hero-overlay-shimmer pointer-events-none absolute inset-0" />
            </div>
          </section>

          <section id="intro" className="brand-section-muted">
            <div className="brand-section-bridge--from-hero" />
            <div className="brand-section-inner px-8 pb-24 pt-4 lg:px-12">
            <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
              <motion.div
                variants={slideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="relative"
              >
                <div className="home-blob-float absolute -inset-10 rounded-full bg-violet-600/10 blur-[100px]" />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3rem] border border-indigo-200 bg-indigo-50/40 shadow-2xl">
                  <img 
                    src="/mascot-home.png" 
                    alt="Về chúng tôi" 
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </div>
              </motion.div>

              <motion.div
                variants={staggerIntro}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <motion.p variants={fadeUpChild} className="brand-eyebrow">
                    Tầm nhìn & Sứ mệnh
                  </motion.p>
                  <motion.h2 variants={fadeUpChild} className="brand-section-title">
                    Đồng hành cùng sự <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-violet-600">Bứt Phá</span> của bạn
                  </motion.h2>
                  <motion.p variants={fadeUpChild} className="text-lg font-medium leading-relaxed text-slate-600">
                    Chúng tôi không chỉ cung cấp dịch vụ marketing rời rạc. Bứt Phá Marketing xây dựng hệ thống tăng trưởng toàn diện, giúp doanh nghiệp tối ưu hóa từng điểm chạm trên hành trình khách hàng.
                  </motion.p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { title: "Chiến lược", desc: "Tư duy marketing dựa trên dữ liệu thật.", icon: Target, color: "text-violet-600" },
                    { title: "Công nghệ", desc: "Ứng dụng AI & Automation tối ưu vận hành.", icon: Workflow, color: "text-violet-600" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUpChild}
                      className="group rounded-[2rem] border border-indigo-100 bg-indigo-50/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-50/80 hover:shadow-brand"
                    >
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 ${item.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                        <item.icon size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-indigo-950">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={fadeUpChild}>
                  <Link
                    href="/gioi-thieu"
                    className="brand-btn-ghost px-10 py-5"
                  >
                    Tìm hiểu thêm về chúng tôi
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            </div>
          </section>

          <section id="services" className="brand-section-white brand-section-white--grid">
            <SectionWaveDivider from="#f4f6fc" to="#ffffff" />
            <div className="brand-section-inner px-8 py-24 lg:px-12">
            <motion.div
              variants={staggerIntro}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="brand-section-intro"
            >
              <motion.p variants={fadeUpChild} className="brand-eyebrow">
                Giải pháp cốt lõi
              </motion.p>
              <motion.h2 variants={fadeUpChild} className="brand-section-title">
                Dịch vụ <span className="brand-gradient-text">chiến lược</span>
              </motion.h2>
              <motion.p variants={fadeUpChild} className="text-base font-medium leading-relaxed text-slate-600">
                Website, Facebook và Google Maps — một hệ sinh thái tăng trưởng thống nhất cho doanh nghiệp.
              </motion.p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {serviceCards.map((card, i) => (
                <motion.div
                  key={card.key}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  custom={i * 0.06}
                >
                  <Link
                    href={card.href}
                    className="brand-service-card group"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-indigo-100">
                      <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-indigo-950 transition-colors group-hover:text-violet-600">{card.title}</h3>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-400 transition-all group-hover:bg-violet-600 group-hover:text-white group-hover:rotate-45">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                      <p className="text-[15px] leading-relaxed text-slate-600 font-medium">{card.description}</p>
                      
                      <div className="mt-8 flex items-center gap-4 border-t border-indigo-100 pt-6 opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <span className="text-xs font-semibold text-violet-600">Khám phá chi tiết</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-violet-600/50 to-transparent" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            </div>
          </section>

          <section id="why-choose" className="brand-section-white">
            <SectionWaveDivider from="#f4f6fc" to="#ffffff" />
            <div className="brand-section-inner px-8 py-24 lg:px-12">
            <motion.div
              variants={staggerIntro}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="mb-16 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between"
            >
              <div className="space-y-4">
                <motion.p variants={fadeUpChild} className="brand-eyebrow">
                  Giá trị cốt lõi
                </motion.p>
                <motion.h2 variants={fadeUpChild} className="brand-section-title text-left">
                  Tại sao chọn chúng tôi?
                </motion.h2>
              </div>
              <div className="hidden gap-4 md:flex">
                <button
                  onClick={() => { playClickSound(); scrollContainer(whyChooseUsRef, "left"); }}
                  className="brand-icon-btn h-14 w-14 hover:scale-110 active:scale-90"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => { playClickSound(); scrollContainer(whyChooseUsRef, "right"); }}
                  className="brand-icon-btn h-14 w-14 hover:scale-110 active:scale-90"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
            <div
              ref={whyChooseUsRef}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  custom={i * 0.06}
                  className="brand-card-soft p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-brand-lg"
                >
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-indigo-100 to-violet-100 text-violet-600 transition-all group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-indigo-900 group-hover:to-violet-600 group-hover:text-white group-hover:shadow-brand-accent">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-indigo-950">{item.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-slate-500 font-medium">{item.description}</p>
                </motion.div>
              ))}
            </div>
            </div>
          </section>

          <section id="news" className="brand-section-muted">
            <SectionWaveDivider from="#ffffff" to="#eef2ff" />
            <div className="brand-section-inner px-4 py-16 lg:px-6 lg:py-20">
            <motion.div
              variants={staggerIntro}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="mb-8 flex items-end justify-between gap-4"
            >
              <div>
                <motion.p variants={fadeUpChild} className="brand-eyebrow">
                  Tin tức & kiến thức
                </motion.p>
                <motion.h2 variants={fadeUpChild} className="mt-2 text-3xl font-bold text-indigo-950 md:text-4xl">
                  Cập nhật xu hướng marketing
                </motion.h2>
              </div>
              <motion.div variants={fadeUpChild}>
                <Link href="/blog" className="brand-btn-secondary px-4 py-3 text-sm font-semibold">
                  Xem tất cả bài viết
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {topBlogs.map((post, i) => (
                <motion.div
                  key={post.id}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  custom={i * 0.05}
                >
                <Link href={`/blog/${post.slug || post.id}`} className="group block h-full">
                  <article className="overflow-hidden rounded-[1.5rem] border border-indigo-100 bg-white shadow-brand transition duration-300 hover:border-violet-300 hover:shadow-brand-lg h-full">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.imageUrl || "/mascot-home.png"}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-violet-600">
                        <CalendarDays className="h-3 w-3" />
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("vi-VN") : "Mới cập nhật"}
                      </div>
                      <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-tight text-indigo-950 transition group-hover:text-violet-600">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                        {post.description || "Xem chi tiết bài viết để cập nhật những kiến thức marketing mới nhất."}
                      </p>
                    </div>
                  </article>
                </Link>
                </motion.div>
              ))}
            </div>
            </div>
          </section>

          <section id="contact" className="brand-section-contact">
            <SectionWaveDivider from="#f4f6fc" to="#f5f3ff" />
            <div className="brand-section-inner px-4 py-12 lg:px-6 lg:py-16">
            <div className="brand-card relative overflow-hidden rounded-[3rem] p-8 shadow-brand-lg md:p-12">
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="brand-section-title text-left">Sẵn sàng bứt phá doanh thu?</h2>
                  <p className="mt-6 text-lg leading-8 text-slate-600">
                    Để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ tư vấn lộ trình marketing tối ưu nhất cho doanh nghiệp của bạn.
                  </p>
                  
                  <div className="mt-10 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/10 text-violet-600">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-500">Hotline tư vấn</p>
                        <p className="text-xl font-bold text-indigo-950">{resolveHotline(settings.hotline)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form 
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (submittingContact) return;
                    setSubmittingContact(true);
                    try {
                      await db.leads.add({
                        type: "contact",
                        name: contactForm.name,
                        phone: contactForm.phone,
                        service: contactForm.interest || "Tư vấn tổng thể",
                        note: [contactForm.location, contactForm.note].filter(Boolean).join(" | "),
                        platform: "home"
                      });
                      setContactState({ type: "success", message: "Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm nhất." });
                      setContactForm(initialContactForm);
                    } catch (err) {
                      setContactState({ type: "error", message: "Có lỗi xảy ra, vui lòng thử lại." });
                    } finally {
                      setSubmittingContact(false);
                    }
                  }}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      required
                      type="text"
                      placeholder="Họ và tên"
                      value={contactForm.name}
                      onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                      className="brand-input px-6 py-4"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Số điện thoại"
                      value={contactForm.phone}
                      onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="brand-input px-6 py-4"
                    />
                  </div>
                  <select 
                    value={contactForm.interest}
                    onChange={e => setContactForm({ ...contactForm, interest: e.target.value })}
                    className="brand-input px-6 py-4 appearance-none"
                  >
                    <option value="" className="bg-white">Dịch vụ quan tâm</option>
                    <option value="website" className="bg-white">Thiết kế Website</option>
                    <option value="facebook" className="bg-white">Quản trị Fanpage</option>
                    <option value="googlemaps" className="bg-white">Google Maps Marketing</option>
                  </select>
                  <textarea
                    placeholder="Ghi chú thêm"
                    value={contactForm.note}
                    onChange={e => setContactForm({ ...contactForm, note: e.target.value })}
                    rows={4}
                    className="brand-input px-6 py-4"
                  ></textarea>
                  <button
                    disabled={submittingContact}
                    type="submit"
                    className="brand-btn-primary w-full py-5 text-lg disabled:opacity-50"
                  >
                    {submittingContact ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
                  </button>
                  {contactState.message && (
                    <p className={`text-center text-sm font-bold ${contactState.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
                      {contactState.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
            </div>
          </section>
        </main>

        <footer className="bg-gradient-to-br from-blue-950 via-purple-900 to-pink-900 text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-4 lg:gap-16">
              <div className="col-span-2 lg:col-span-1">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-violet-600/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img src={logoSrc} alt={brandName} className="relative h-12 w-12 rounded-full object-cover shadow-lg" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black tracking-tight">{brandName}</span>
                    <span className="text-violet-300 text-xs font-medium">Bứt Phá để dẫn đầu</span>
                  </div>
                </Link>
                <p className="mt-6 text-sm leading-relaxed text-violet-100 opacity-90">
                  Agency cung cấp giải pháp Digital Marketing toàn diện, giúp doanh nghiệp tối ưu hóa hiện diện số và tăng trưởng doanh thu bền vững.
                </p>
                <div className="mt-8 flex gap-3">
                  <a href={settings.fanpage} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-500/30 bg-white/5 text-violet-100 transition-all hover:border-violet-400 hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-600/30">
                    <SiFacebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-violet-300 mb-6">Dịch vụ</h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="/website" className="text-violet-100 hover:text-white transition-all hover:pl-2 flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-violet-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Thiết kế Website
                    </Link>
                  </li>
                  <li>
                    <Link href="/facebook" className="text-violet-100 hover:text-white transition-all hover:pl-2 flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-violet-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Quản trị Fanpage
                    </Link>
                  </li>
                  <li>
                    <Link href="/google-maps" className="text-violet-100 hover:text-white transition-all hover:pl-2 flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-violet-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Google Maps Marketing
                    </Link>
                  </li>
                  <li>
                    <Link href="/lien-he" className="text-violet-100 hover:text-white transition-all hover:pl-2 flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-violet-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Tư vấn chiến lược
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-violet-300 mb-6">Liên hệ</h4>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-violet-300">
                      <MapPinned className="h-4 w-4" />
                    </div>
                    <div className="text-violet-100">
                      <p className="text-sm font-medium">{resolveAddress(settings.address)}</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-violet-300">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="text-violet-100">
                      <a href={getTelHref(settings.hotline)} className="text-sm font-medium hover:text-white">
                        {resolveHotline(settings.hotline)}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-violet-300">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div className="text-violet-100">
                      <a href={getMailtoHref(settings.email)} className="text-sm font-medium hover:text-white">
                        {resolveEmail(settings.email)}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-violet-300 mb-6">Đăng ký</h4>
                <p className="text-sm text-violet-100 opacity-80 mb-4">
                  Nhận các chiến lược marketing miễn phí
                </p>
                <div className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="Email của bạn" 
                    className="w-full rounded-xl border border-violet-500/30 bg-white/5 px-4 py-3 text-sm text-white placeholder-violet-300/50 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                  />
                  <button className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-bold text-white transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-violet-600/30">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-16 border-t border-white/10 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-violet-200/60">
                  © {new Date().getFullYear()} {brandName}. All rights reserved.
                </p>
                <div className="flex gap-6 text-xs">
                  <Link href="/gioi-thieu" className="text-violet-200/60 hover:text-violet-200 transition">Về chúng tôi</Link>
                  <Link href="/lien-he" className="text-violet-200/60 hover:text-violet-200 transition">Liên hệ</Link>
                  <Link href="/blog" className="text-violet-200/60 hover:text-violet-200 transition">Blog</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <ConsultModal isOpen={showConsult} onClose={() => setShowConsult(false)} />
    </div>
  );
}

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
import { SiFacebook, SiMessenger } from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { useAdmin } from "@/lib/AdminContext";
import { db, type ClientReview, type NewsItem, type Service } from "@/lib/useData";
import { playClickSound } from "@/lib/utils";

const LoginModal = dynamic(() => import("@/components/shared/LoginModal").then((mod) => mod.LoginModal), { ssr: false });
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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingContact) return;
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
      } else {
        setContactState({ type: "error", message: "Có lỗi xảy ra, vui lòng thử lại." });
      }
    } catch (err) {
      setContactState({ type: "error", message: "Có lỗi xảy ra, vui lòng thử lại." });
    } finally {
      setSubmittingContact(false);
    }
  };
  const { user } = useAuth();
  const { settings } = useAdmin();

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
      "/slideshow.jpg",
      "/slideshow1.jpg"
    ];

    imagesToUse.forEach((img, index) => {
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

  const navigation = [
    { label: "Trang Chủ", href: "#hero" },
    { label: "Giới Thiệu", href: "/gioi-thieu" },
    { label: "Website", href: "/website" },
    { label: "Facebook", href: "/facebook" },
    { label: "Google Maps", href: "/google-maps" },
    { label: "Tin Tức", href: "/blog" },
    { label: "Liên Hệ", href: "/lien-he" },
  ];

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
      accent: "from-fuchsia-500/20",
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
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050308]">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-ping rounded-full bg-fuchsia-500/20" />
          <img src={logoSrc} alt="Loading" className="relative z-10 h-24 w-24 rounded-full object-cover shadow-[0_0_40px_rgba(168,85,247,0.4)]" />
        </div>
        <div className="mt-8 w-48 overflow-hidden rounded-full bg-white/5 p-1">
          <div className="h-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-fuchsia-300/60">Đang khởi tạo hệ thống...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050308] font-sans selection:bg-fuchsia-500/30">
      <ParticleBackground />
      
      <div className="relative z-10 flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050308]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
            <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
              <img src={logoSrc} alt={brandName} className="h-10 w-10 rounded-full object-cover shadow-[0_0_20px_rgba(168,85,247,0.3)]" />
              <span className="text-xl font-black uppercase tracking-wider text-white md:text-2xl">{brandName}</span>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {navigation.map((item) => (
                <Link key={item.label} href={item.href} className="text-sm font-black uppercase tracking-widest text-slate-300 transition hover:text-fuchsia-400">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/lo-trinh-du-an" className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-black text-white transition hover:bg-white/10 sm:flex">
                Lộ trình dự án
              </Link>
              {/* Mobile: hiện nút lộ trình, ẩn nút liên hệ tư vấn */}
              <Link href="/lo-trinh-du-an" className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-black text-white transition hover:bg-white/10 sm:hidden">
                Lộ trình dự án
              </Link>
              <button
                onClick={() => { playClickSound(); (document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })) }}
                className="hidden rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(168,85,247,0.3)] transition hover:scale-[1.03] active:scale-[0.97] sm:block"
              >
                Liên hệ tư vấn
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <section id="hero" className="relative w-full overflow-hidden" style={{ height: "min(56vw, 700px)", minHeight: "260px" }}>
            <div className="absolute inset-0 z-20 flex items-center justify-between px-2 pointer-events-none sm:px-4">
              <button
                onClick={() => { playClickSound(); setActiveHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length); }}
                className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 sm:h-12 sm:w-12"
              >
                <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={() => { playClickSound(); setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length); }}
                className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 sm:h-12 sm:w-12"
              >
                <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeroSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  src={currentHeroSlide.visual}
                  alt="Hero Slide"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#050308]" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3 sm:bottom-10">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { playClickSound(); setActiveHeroSlide(i); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeHeroSlide === i ? "w-10 bg-fuchsia-500" : "w-2.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </section>

          <section id="intro" className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02]">
                <img 
                  src="/mascot-home.png" 
                  alt="Về chúng tôi" 
                  className="h-full w-full object-cover" 
                />
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Về chúng tôi</p>
                  <h2 className="text-4xl font-black text-white md:text-5xl">Bứt Phá Marketing</h2>
                  <p className="text-lg leading-relaxed text-slate-300">
                    Chúng tôi không chỉ làm marketing. Chúng tôi xây dựng hệ thống giúp doanh nghiệp tăng trưởng bền vững, tự động và có thể đo lường.
                  </p>
                </div>

                <Link 
                  href="/gioi-thieu" 
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-black text-white transition hover:bg-white/10"
                >
                  Xem tất cả
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="grid gap-4 pt-8 border-t border-white/5 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-400">
                      <Target className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-white">Tư duy marketing định hướng kết quả</h3>
                    <p className="text-xs text-slate-400">Không chỉ làm web, chúng tôi xử lý hệ thống tạo nhiều khách hàng và doanh thu.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-white">Tối ưu chuyển đổi</h3>
                    <p className="text-xs text-slate-400">Thiết kế chuẩn hành vi người dùng, tăng tỷ lệ chuyển đổi và hiệu quả kinh doanh.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                      <Workflow className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-white">Hệ thống tự động</h3>
                    <p className="text-xs text-slate-400">Ứng dụng AI & automation giúp tiết kiệm thời gian, chi phí và vận hành chuyên nghiệp.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-8 text-center space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Giải pháp marketing toàn diện</p>
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
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        playClickSound();
                        setShowConsult(true);
                      }}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-black text-fuchsia-300 hover:text-fuchsia-100 transition-colors"
                    >
                      Tư vấn trực tiếp
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
            <div className="mb-10 flex flex-col items-start gap-6 md:flex-row md:justify-between md:text-left">
              <div className="text-left">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-300">Vì sao chọn Bứt Phá Marketing?</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { playClickSound(); scrollContainer(whyChooseUsRef, "left"); }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 hover:border-fuchsia-500/30"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => { playClickSound(); scrollContainer(whyChooseUsRef, "right"); }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 hover:border-fuchsia-500/30"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div
              ref={whyChooseUsRef}
              className="no-scrollbar flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory"
            >
              {whyChooseUs.map((item) => (
                <div key={item.title} className="snap-start min-w-[75vw] flex-shrink-0 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-center sm:min-w-[260px] md:min-w-0 md:flex-1 transition-all hover:bg-white/[0.06]">
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-500/10 text-fuchsia-400">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </div>
              ))}
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
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-fuchsia-500/50 transition"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Số điện thoại"
                      value={contactForm.phone}
                      onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-fuchsia-500/50 transition"
                    />
                  </div>
                  <select 
                    value={contactForm.interest}
                    onChange={e => setContactForm({ ...contactForm, interest: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-fuchsia-500/50 transition appearance-none"
                  >
                    <option value="" className="bg-[#0e0918]">Dịch vụ quan tâm</option>
                    <option value="website" className="bg-[#0e0918]">Thiết kế Website</option>
                    <option value="facebook" className="bg-[#0e0918]">Quản trị Fanpage</option>
                    <option value="googlemaps" className="bg-[#0e0918]">Google Maps Marketing</option>
                  </select>
                  <textarea
                    placeholder="Ghi chú thêm"
                    value={contactForm.note}
                    onChange={e => setContactForm({ ...contactForm, note: e.target.value })}
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-fuchsia-500/50 transition"
                  ></textarea>
                  <button
                    disabled={submittingContact}
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 py-5 text-lg font-black text-white shadow-xl transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {submittingContact ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
                  </button>
                  {contactState.message && (
                    <p className={`text-center text-sm font-bold ${contactState.type === "success" ? "text-green-400" : "text-red-400"}`}>
                      {contactState.message}
                    </p>
                  )}
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
      <ConsultModal isOpen={showConsult} onClose={() => setShowConsult(false)} />
    </div>
  );
}

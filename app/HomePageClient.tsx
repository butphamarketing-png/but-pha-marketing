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
import { useAdmin } from "@/lib/AdminContext";
import { db, type ClientReview, type NewsItem, type Service } from "@/lib/useData";
import { playClickSound } from "@/lib/utils";

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
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-ping rounded-full bg-violet-600/20" />
          <img src={logoSrc} alt="Loading" className="relative z-10 h-24 w-24 rounded-full object-cover shadow-[0_0_40px_rgba(124,58,237,0.4)]" />
        </div>
        <div className="mt-8 w-48 overflow-hidden rounded-full bg-indigo-50 p-1">
          <div className="h-1 rounded-full bg-gradient-to-r from-indigo-900 to-violet-600 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Đang khởi tạo hệ thống...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white font-sans selection:bg-violet-600/30">
      <ParticleBackground />
      
      <div className="relative z-10 flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b border-indigo-100 bg-white/60 backdrop-blur-2xl transition-all duration-500">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <Link href="/" className="group flex items-center gap-4 transition-transform hover:scale-[1.02] active:scale-95">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-violet-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src={logoSrc} alt={brandName} className="relative h-12 w-12 rounded-full border border-indigo-200 object-cover shadow-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black uppercase tracking-[0.15em] text-slate-900 md:text-2xl leading-none">{brandName}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-violet-600/80 mt-1">Bứt Phá Để Dẫn Đầu</span>
              </div>
            </Link>

            <nav className="hidden items-center gap-10 lg:flex">
              {navigation.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  className="relative text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all hover:text-slate-900 group"
                >
                  {item.label}
                  <span className="absolute -bottom-2 left-0 h-px w-0 bg-violet-600 transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => { playClickSound(); (document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })) }}
                className="group relative hidden overflow-hidden rounded-2xl bg-white px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-black transition-all hover:scale-105 active:scale-95 sm:block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-violet-600 opacity-0 transition-opacity group-hover:opacity-10 group-active:opacity-20" />
                Tư vấn ngay
              </button>
              
            </div>
          </div>
        </header>

        <main className="flex-1">
          <section id="hero" className="relative w-full overflow-hidden" style={{ height: "min(60vw, 800px)", minHeight: "500px" }}>
            <div className="absolute inset-0 z-30 flex items-center justify-between px-6 pointer-events-none lg:px-12">
              <button
                onClick={() => { playClickSound(); setActiveHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length); }}
                className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-indigo-200 bg-black/20 text-white backdrop-blur-xl transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-90"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={() => { playClickSound(); setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length); }}
                className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-indigo-200 bg-black/20 text-white backdrop-blur-xl transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-90"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeroSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={currentHeroSlide.visual}
                  alt="Hero Slide"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-900/20" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-12 right-12 z-30 flex gap-4 lg:bottom-16 lg:right-24">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { playClickSound(); setActiveHeroSlide(i); }}
                  className="group relative h-12 w-1 bg-transparent overflow-hidden rounded-full"
                >
                  <div className={`absolute inset-0 bg-indigo-100 transition-all duration-300 ${activeHeroSlide === i ? "bg-violet-600" : "group-hover:bg-white/30"}`} />
                  {activeHeroSlide === i && (
                    <motion.div 
                      layoutId="hero-pager"
                      className="absolute inset-0 bg-violet-600 shadow-[0_0_20px_rgba(124,58,237,0.8)]"
                    />
                  )}
                </button>
              ))}
            </div>
          </section>

          <section id="intro" className="mx-auto max-w-7xl px-8 py-24 lg:px-12">
            <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-10 bg-violet-600/10 blur-[100px] rounded-full animate-pulse" />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3rem] border border-indigo-200 bg-indigo-50/40 shadow-2xl">
                  <img 
                    src="/mascot-home.png" 
                    alt="Về chúng tôi" 
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </div>
              </motion.div>

              <div className="space-y-10">
                <div className="space-y-6">
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xs font-black uppercase tracking-[0.4em] text-violet-600"
                  >
                    Tầm nhìn & Sứ mệnh
                  </motion.p>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl font-black text-slate-900 md:text-6xl tracking-tight leading-tight"
                  >
                    Đồng hành cùng sự <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-violet-600">Bứt Phá</span> của bạn
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-lg leading-relaxed text-slate-400 font-medium"
                  >
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
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group rounded-[2rem] border border-indigo-100 bg-indigo-50/40 p-6 transition-all hover:bg-indigo-50/80"
                    >
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 ${item.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                        <item.icon size={24} />
                      </div>
                      <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href="/gioi-thieu" 
                    className="group inline-flex items-center gap-3 rounded-full border border-indigo-200 bg-indigo-50 px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-indigo-100 hover:border-indigo-300"
                  >
                    Tìm hiểu thêm về chúng tôi
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="services" className="mx-auto max-w-7xl px-8 py-24 lg:px-12">
            <div className="mb-16 text-center space-y-4">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs font-black uppercase tracking-[0.4em] text-violet-600"
              >
                Giải pháp cốt lõi
              </motion.p>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-black text-slate-900 md:text-5xl lg:text-6xl tracking-tight"
              >
                Dịch vụ <span className="text-violet-600">Chiến lược</span>
              </motion.h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {serviceCards.map((card, i) => (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={card.href}
                    className="group relative block h-full overflow-hidden rounded-[2.5rem] border border-indigo-100 bg-white p-4 transition-all hover:border-violet-600/30 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-indigo-100">
                      <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-violet-600 transition-colors">{card.title}</h3>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-white/40 transition-all group-hover:bg-violet-600 group-hover:text-white group-hover:rotate-45">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                      <p className="text-[15px] leading-relaxed text-slate-400 font-medium">{card.description}</p>
                      
                      <div className="mt-8 flex items-center gap-4 border-t border-indigo-100 pt-6 opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <span className="text-[10px] font-black uppercase tracking-widest text-violet-600">Khám phá chi tiết</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-violet-600/50 to-transparent" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-8 py-24 lg:px-12">
            <div className="mb-16 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
              <div className="space-y-4">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-xs font-black uppercase tracking-[0.4em] text-violet-600"
                >
                  Giá trị cốt lõi
                </motion.p>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl font-black text-slate-900 md:text-5xl tracking-tight"
                >
                  Tại sao chọn chúng tôi?
                </motion.h2>
              </div>
              <div className="hidden gap-4 md:flex">
                <button
                  onClick={() => { playClickSound(); scrollContainer(whyChooseUsRef, "left"); }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-white transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-90"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => { playClickSound(); scrollContainer(whyChooseUsRef, "right"); }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-white transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-90"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            <div
              ref={whyChooseUsRef}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {whyChooseUs.map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative rounded-[2.5rem] border border-indigo-100 bg-indigo-50/40 p-8 transition-all hover:bg-indigo-50/60 hover:border-indigo-200"
                >
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-violet-600/10 text-violet-600 transition-all group-hover:scale-110 group-hover:rotate-6 group-hover:bg-violet-600 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">{item.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-slate-500 font-medium">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="news" className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-600">Tin tức & Kiến thức</p>
                <h2 className="mt-2 text-3xl font-black text-slate-900">Cập nhật xu hướng Marketing</h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-black text-white transition hover:bg-indigo-100">
                Xem tất cả bài viết
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {topBlogs.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug || post.id}`} className="group block">
                  <article className="overflow-hidden rounded-[1.5rem] border border-indigo-200 bg-white transition duration-300 hover:border-violet-600/30 h-full">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.imageUrl || "/mascot-home.png"} 
                        alt={post.title} 
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105" 
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-violet-600">
                        <CalendarDays className="h-3 w-3" />
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("vi-VN") : "Mới cập nhật"}
                      </div>
                      <h3 className="mt-3 text-lg font-black leading-tight text-slate-900 line-clamp-2 group-hover:text-violet-600 transition">
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
            <div className="relative overflow-hidden rounded-[3rem] border border-violet-600/20 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.15),transparent_40%),linear-gradient(180deg,rgba(238,242,255,0.98),rgba(255,255,255,1))] p-8 md:p-12">
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">Sẵn sàng bứt phá doanh thu?</h2>
                  <p className="mt-6 text-lg leading-8 text-slate-300">
                    Để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ tư vấn lộ trình marketing tối ưu nhất cho doanh nghiệp của bạn.
                  </p>
                  
                  <div className="mt-10 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/10 text-violet-600">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-400">Hotline tư vấn</p>
                        <p className="text-xl font-black text-slate-900">{settings.hotline}</p>
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
                      className="w-full rounded-2xl border border-indigo-200 bg-indigo-50 px-6 py-4 text-white outline-none focus:border-violet-600/50 transition"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Số điện thoại"
                      value={contactForm.phone}
                      onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full rounded-2xl border border-indigo-200 bg-indigo-50 px-6 py-4 text-white outline-none focus:border-violet-600/50 transition"
                    />
                  </div>
                  <select 
                    value={contactForm.interest}
                    onChange={e => setContactForm({ ...contactForm, interest: e.target.value })}
                    className="w-full rounded-2xl border border-indigo-200 bg-indigo-50 px-6 py-4 text-white outline-none focus:border-violet-600/50 transition appearance-none"
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
                    className="w-full rounded-2xl border border-indigo-200 bg-indigo-50 px-6 py-4 text-white outline-none focus:border-violet-600/50 transition"
                  ></textarea>
                  <button
                    disabled={submittingContact}
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-r from-indigo-900 to-violet-600 py-5 text-lg font-black text-white shadow-xl transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
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

        <footer className="border-t border-indigo-100 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <div className="grid gap-12 lg:grid-cols-4">
              <div className="col-span-2">
                <Link href="/" className="flex items-center gap-3">
                  <img src={logoSrc} alt={brandName} className="h-10 w-10 rounded-full object-cover" />
                  <span className="text-xl font-black uppercase tracking-wider text-slate-900">{brandName}</span>
                </Link>
                <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
                  Bứt Phá Marketing - Agency cung cấp giải pháp Digital Marketing toàn diện, giúp doanh nghiệp tối ưu hóa hiện diện số và tăng trưởng doanh thu bền vững.
                </p>
                <div className="mt-8 flex gap-4">
                  <a href={settings.fanpage} className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-white transition hover:bg-violet-600/20 hover:text-violet-600">
                    <SiFacebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Dịch vụ</h4>
                <ul className="mt-6 space-y-4 text-sm text-slate-400">
                  <li><Link href="/website" className="hover:text-violet-600 transition">Thiết kế Website</Link></li>
                  <li><Link href="/facebook" className="hover:text-violet-600 transition">Quản trị Fanpage</Link></li>
                  <li><Link href="/google-maps" className="hover:text-violet-600 transition">Google Maps Marketing</Link></li>
                  <li><Link href="/lien-he" className="hover:text-violet-600 transition">Tư vấn chiến lược</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Liên hệ</h4>
                <ul className="mt-6 space-y-4 text-sm text-slate-400">
                  <li className="flex items-start gap-3">
                    <MapPinned className="h-5 w-5 shrink-0 text-violet-600" />
                    <span>{settings.address || "Hồ Chí Minh, Việt Nam"}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-violet-600" />
                    <span>{settings.hotline}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 shrink-0 text-violet-600" />
                    <span>{settings.email || "contact@butphamarketing.com"}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 border-t border-indigo-100 pt-8 text-center text-xs text-slate-500">
              <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <ConsultModal isOpen={showConsult} onClose={() => setShowConsult(false)} />
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, Phone, Search, X, ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { SiteNavMenu } from "@/components/shared/SiteNavMenu";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { CORP_HERO_SLIDES, sanitizeSlideshowItems } from "@/lib/media-assets";
import { useAdmin } from "@/lib/AdminContext";
import { db, type NewsItem } from "@/lib/useData";
import {
  getTelHref,
  getZaloUrl,
  resolveAddress,
  resolveEmail,
  resolveHotline,
  resolveHotlineDigits,
} from "@/lib/site-contact";
import { LoadingScreen } from "@/components/loading/LoadingScreen";

const SECTIONS = [
  { id: "but-pha", label: "BỨT PHÁ", tone: "dark" },
  { id: "gioi-thieu", label: "GIỚI THIỆU", tone: "light" },
  { id: "linh-vuc", label: "LĨNH VỰC", tone: "dark" },
  { id: "du-an", label: "DỰ ÁN", tone: "dark" },
  { id: "tu-van", label: "TƯ VẤN", tone: "dark" },
  { id: "kien-thuc", label: "KIẾN THỨC", tone: "dark" },
  { id: "tieng-noi", label: "TIẾNG NÓI", tone: "dark" },
  { id: "lien-he", label: "LIÊN HỆ", tone: "dark" },
] as const;

/** Section tiếng nói — logo wall + 1 feedback nổi */
const VOICE_ENTRIES = [
  {
    slug: "nha-khoa-dang-khoa",
    mark: "ĐK",
    quote:
      "Trước đó khách biết mình qua giới thiệu. Giờ máy đổ vì họ tìm đúng lúc cần implant — và thấy mình đứng đầu kết quả.",
  },
  {
    slug: "kien-truc-sao-khue",
    mark: "SK",
    quote:
      "Ads chạy đều nhưng lịch vẫn trống. Khi hiện diện đúng chỗ khách đang search, view mới thành cuộc gọi.",
  },
  {
    slug: "tham-my-thien-hoang-kim",
    mark: "THK",
    quote:
      "Website và fanpage là điểm chạm đầu tiên — khách tin uy tín y khoa trước khi gọi đặt lịch.",
  },
  {
    slug: "phuoc-lai-luxury",
    mark: "PL",
    quote:
      "Website trở thành showroom của Master team. Khách đặt lịch trước khi đặt chân vào spa.",
  },
  {
    slug: "halee-tram",
    mark: "HT",
    quote:
      "Một điểm chạm đủ cho khách xem portfolio nail/lash — và học viên tìm đúng khóa academy.",
  },
  {
    slug: "pccc-bao-an-fire",
    mark: "BA",
    quote:
      "PCCC không bán bằng catalog. Phải chứng minh năng lực thi công trước khi được giao dự án.",
  },
  {
    slug: "van-toc-express-logistics",
    mark: "VT",
    quote:
      "Khách B2B không tin brochure. Họ tin form báo giá nhanh — và tra được vận đơn trước khi giao.",
  },
  {
    slug: "glow-dew-cosmetics",
    mark: "GD",
    quote:
      "Khách không mua vì banner đẹp. Họ mua khi đọc được thành phần và review rõ — hết đoán mò.",
  },
  {
    slug: "an-gia-home",
    mark: "AG",
    quote:
      "Thấy phòng mẫu và báo giá nhanh trên web — không phải lang thang Facebook nửa ngày.",
  },
] as const;

const CONSULT_SLOTS = [
  { id: "sang", label: "Sáng", hint: "9:00 – 11:30" },
  { id: "chieu", label: "Chiều", hint: "13:30 – 17:00" },
  { id: "toi", label: "Tối", hint: "19:00 – 21:00" },
] as const;

const WEEKDAY_SHORT = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"] as const;

function toLocalISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getConsultDayOptions(count = 6) {
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return {
      iso: toLocalISODate(d),
      weekday: WEEKDAY_SHORT[d.getDay()],
      dayNum: d.getDate(),
      month: d.getMonth() + 1,
      isToday: i === 0,
    };
  });
}

function formatConsultDayLabel(iso: string) {
  const [y, m, day] = iso.split("-").map(Number);
  if (!y || !m || !day) return iso;
  const d = new Date(y, m - 1, day);
  return `${WEEKDAY_SHORT[d.getDay()]}, ${day}/${m}`;
}

const EMPTY_CONSULT_FORM = {
  name: "",
  phone: "",
  email: "",
  address: "",
  consultDate: "",
  consultSlot: "" as "" | (typeof CONSULT_SLOTS)[number]["id"],
  note: "",
};

const ABOUT_CITY_BG = "/about/about-city-bg.png?v=tech1";

/** Reveal: phone → laptop từ trái sang. Không dùng iPad. */
const ABOUT_DEVICES = [
  {
    id: "phone",
    src: "/about/about-device-phone-cut.png",
    alt: "Website Bứt Phá Marketing trên điện thoại",
    delayMs: 0,
    wrap:
      "absolute left-[4%] bottom-[4%] z-30 w-[34%] max-w-[120px] sm:max-w-[150px] " +
      "md:left-[10%] md:bottom-[16%] md:w-[22%] md:max-w-[180px] lg:left-[12%] lg:bottom-[18%] lg:max-w-[200px]",
    img: "h-auto w-full object-contain drop-shadow-[0_16px_36px_rgba(15,23,42,0.28)]",
  },
  {
    id: "laptop",
    src: "/about/about-device-laptop-cut.png",
    alt: "Dashboard Bứt Phá Marketing trên laptop",
    delayMs: 280,
    wrap:
      "absolute left-[26%] z-10 w-[68%] max-w-[220px] bottom-[6%] sm:max-w-[260px] " +
      "md:left-[28%] md:bottom-[12%] md:w-[70%] md:max-w-[480px] lg:max-w-[560px]",
    img: "h-auto w-full object-contain drop-shadow-[0_22px_50px_rgba(15,23,42,0.2)]",
  },
] as const;

const LINH_VUC_BG = "/about/about-city-bg.png?v=tech-lv";
const DU_AN_BG = "/about/linh-vuc-desk-bg.png?v=du-an";

const LINH_VUC = [
  {
    num: "01",
    title: "WEBSITE",
    desc: "Thiết kế website chuẩn SEO, tối ưu chuyển đổi và trải nghiệm người dùng.",
    href: "/website",
    image: "/linh-vuc-website.png",
    accent: "from-violet-600/40",
    objectPosition: "center center",
  },
  {
    num: "02",
    title: "FACEBOOK",
    desc: "Fanpage + quảng cáo Meta — nuôi lead và đo ROI rõ ràng.",
    href: "/facebook",
    image: "/linh-vuc-facebook.png",
    accent: "from-blue-600/40",
    objectPosition: "center 28%",
  },
  {
    num: "03",
    title: "MAPS",
    desc: "Google Maps & Local SEO — khách gần tìm thấy và gọi bạn.",
    href: "/google-maps",
    image: "/linh-vuc-maps.png",
    accent: "from-amber-600/35",
    objectPosition: "center 35%",
  },
] as const;

function linhVucCardOffset(index: number, active: number) {
  const n = LINH_VUC.length;
  let d = (index - active + n) % n;
  if (d === n - 1) d = -1;
  return d as -1 | 0 | 1;
}

function formatHotlineDisplay(raw: string) {
  const d = resolveHotlineDigits(raw);
  if (d.length === 10) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return resolveHotline(raw);
}

function HeroRevealText({
  text,
  as: Tag = "span",
  className,
  charClassName = "home-hero-char",
  startDelayMs = 80,
  stepMs = 32,
}: {
  text: string;
  as?: "h1" | "p" | "span";
  className?: string;
  charClassName?: string;
  startDelayMs?: number;
  stepMs?: number;
}) {
  const chars = Array.from(text);
  return (
    <Tag className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className={charClassName}
          style={{ transitionDelay: `${startDelayMs + i * stepMs}ms` }}
          aria-hidden="true"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </Tag>
  );
}

export default function HomePageClient() {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
  const [siteReady, setSiteReady] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [aboutReveal, setAboutReveal] = useState(false);
  const [linhActive, setLinhActive] = useState(0);
  const [caseActive, setCaseActive] = useState(0);
  const [caseTaglineReveal, setCaseTaglineReveal] = useState(false);
  const [voiceActive, setVoiceActive] = useState(0);
  const [voiceReveal, setVoiceReveal] = useState(false);
  const [blogs, setBlogs] = useState<NewsItem[]>([]);
  const [consultForm, setConsultForm] = useState(EMPTY_CONSULT_FORM);
  const [consultLoading, setConsultLoading] = useState(false);
  const [consultDone, setConsultDone] = useState(false);
  const [consultSummary, setConsultSummary] = useState("");
  const consultDays = useMemo(() => getConsultDayOptions(4), []);
  const snapRef = useRef<HTMLDivElement>(null);
  const projectListRef = useRef<HTMLUListElement>(null);
  const caseScrollLock = useRef(false);
  const locking = useRef(false);
  const activeSectionRef = useRef(0);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchFromHScroll = useRef(false);
  const { settings } = useAdmin();

  const brandName = settings?.title || "Bứt Phá Marketing";
  const logoSrc = "/logo.png";
  const hotline = resolveHotline(settings?.hotline);
  const hotlineDisplay = formatHotlineDisplay(hotline);
  const email = resolveEmail(settings?.email);
  const address = resolveAddress(settings?.address);
  const zaloUrl = getZaloUrl(settings?.hotline);

  const heroSlides = useMemo(() => {
    const fromCms = sanitizeSlideshowItems(settings?.media?.home?.slideshow);
    const hasCorp = fromCms.some((u) => u.includes("/hero-slideshow/"));
    if (hasCorp) return fromCms;
    if (fromCms.length === 1 && fromCms[0] === CORP_HERO_SLIDES[0]) return [...CORP_HERO_SLIDES];
    // Prefer new corp pack when CMS still on legacy single default
    if (fromCms.every((u) => !u.includes("/hero-slideshow/"))) return [...CORP_HERO_SLIDES];
    return fromCms.length ? fromCms : [...CORP_HERO_SLIDES];
  }, [settings?.media?.home?.slideshow]);

  const featuredCases = useMemo(() => getAllCaseStudies(), []);
  const voiceCases = useMemo(() => {
    return VOICE_ENTRIES.map((entry) => {
      const study = getCaseStudyBySlug(entry.slug);
      const logo =
        ([study?.thumbnail, study?.heroImage].filter(Boolean) as string[]).find(
          (src) => !src.includes("gsc-performance"),
        ) || CORP_HERO_SLIDES[0];
      return {
        ...entry,
        clientName: (study?.clientName || entry.mark).replace(/^Hệ Thống\s+/i, ""),
        industryLabel: study?.industryLabel || "",
        logo,
        href: study ? `/du-an/${study.slug}` : "/du-an",
      };
    });
  }, []);
  const activeVoice = voiceCases[voiceActive] ?? voiceCases[0];
  const knowledgePosts = useMemo(() => {
    return [...blogs]
      .filter((item) => item.published !== false)
      .sort(
        (a, b) =>
          (b.publishedAt ? Date.parse(b.publishedAt) : b.timestamp) -
          (a.publishedAt ? Date.parse(a.publishedAt) : a.timestamp),
      );
  }, [blogs]);
  const featuredKnowledge = knowledgePosts[0] ?? null;
  const sideKnowledge = knowledgePosts.slice(1, 9);
  const activeCase = featuredCases[caseActive] ?? featuredCases[0];
  const caseShowcaseSrc = (c: (typeof featuredCases)[number]) => {
    const candidates = [c.heroImage, c.thumbnail, ...(c.gallery?.map((g) => g.src) ?? [])].filter(Boolean) as string[];
    return candidates.find((src) => !src.includes("gsc-performance")) || candidates[0] || CORP_HERO_SLIDES[0];
  };
  const headerLight = SECTIONS[activeSection]?.tone === "light";
  const headerText = headerLight ? "text-slate-900" : "text-white";
  const headerMuted = headerLight ? "text-slate-700 hover:text-violet-700" : "text-white/95 hover:text-violet-200";
  const headerIconBtn = headerLight ? "hover:bg-slate-900/5" : "hover:bg-white/10";
  const dotIdle = headerLight ? "border-slate-400 bg-slate-300" : "border-white/50 bg-white/20";
  const dotLabelIdle = headerLight
    ? "text-slate-900/0 group-hover:text-slate-600"
    : "text-white/0 group-hover:text-white/70";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Ẩn widget chat bên thứ 3 (FB/AI…) trên trang chủ corp — giữ Zalo pill của site
    const style = document.createElement("style");
    style.setAttribute("data-corp-home-hide-widgets", "1");
    style.textContent = `
      .fb_dialog, .fb-customerchat, #fb-root > span,
      iframe[src*="facebook.com/v"], iframe[src*="chat"],
      [class*="chat-bubble"]:not(a), [id*="chat-widget"],
      [class*="AI-assistant"], [aria-label*="AI chat" i] {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.body.style.overflow = prev;
      style.remove();
    };
  }, []);

  useEffect(() => {
    void db.news.getAll().then((newsResult) => {
      setBlogs(newsResult.data || []);
    });
  }, []);

  useEffect(() => {
    if (heroSlides.length < 2) return;
    const t = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlides.length);
    }, 5200);
    return () => window.clearInterval(t);
  }, [heroSlides.length]);

  // Cả 3 thiết bị cùng khung — hiện lần lượt (stagger) khi vào Giới thiệu
  useEffect(() => {
    if (activeSection !== 1) {
      setAboutReveal(false);
      return;
    }
    const t = window.setTimeout(() => setAboutReveal(true), 80);
    return () => window.clearTimeout(t);
  }, [activeSection]);

  // Lĩnh vực: xoay thẻ active khi đang ở section
  useEffect(() => {
    if (activeSection !== 2) return;
    const t = window.setInterval(() => {
      setLinhActive((i) => (i + 1) % LINH_VUC.length);
    }, 3400);
    return () => window.clearInterval(t);
  }, [activeSection]);

  // Dự án: tắt auto-rotate — đổi ảnh theo cuộn/click list
  const selectCase = useCallback((index: number, scrollIntoView = false) => {
    const clamped = Math.max(0, Math.min(featuredCases.length - 1, index));
    caseScrollLock.current = true;
    setCaseActive(clamped);
    if (scrollIntoView && projectListRef.current) {
      const item = projectListRef.current.querySelector<HTMLElement>(`[data-case-index="${clamped}"]`);
      item?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
    window.setTimeout(() => {
      caseScrollLock.current = false;
    }, 380);
  }, [featuredCases.length]);

  const onProjectListScroll = useCallback(() => {
    const el = projectListRef.current;
    if (!el || caseScrollLock.current || featuredCases.length === 0) return;
    const items = el.querySelectorAll<HTMLElement>("[data-case-index]");
    if (!items.length) return;
    const anchor = el.scrollTop + 8;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    items.forEach((node) => {
      const i = Number(node.dataset.caseIndex);
      const dist = Math.abs(node.offsetTop - anchor);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setCaseActive((prev) => (prev === best ? prev : best));
  }, [featuredCases.length]);

  const goToSection = useCallback((index: number) => {
    if (locking.current) return;

    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, index));
    if (clamped === activeSectionRef.current) return;

    locking.current = true;
    activeSectionRef.current = clamped;
    setActiveSection(clamped);

    if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    // khóa tới khi animation xong — tránh wheel/trackpad nhảy 2 section
    unlockTimerRef.current = setTimeout(() => {
      locking.current = false;
      unlockTimerRef.current = null;
    }, 780);
  }, []);

  const consultSectionIndex = SECTIONS.findIndex((s) => s.id === "tu-van");

  const notifyMascot = useCallback((message: string, durationMs = 6000) => {
    window.dispatchEvent(new CustomEvent("mascot-alert", { detail: { message, durationMs } }));
  }, []);

  const handleConsultSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const isValidVNPhone = (value: string) =>
        /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/.test(value.trim());

      if (!consultForm.name.trim()) {
        notifyMascot("Bạn chưa nhập họ tên. Nhập giúp mình họ tên để đội ngũ tư vấn xưng hô cho đúng nhé!");
        return;
      }
      if (!isValidVNPhone(consultForm.phone)) {
        notifyMascot(
          "Số điện thoại chưa đúng định dạng Việt Nam. Bạn kiểm tra lại giúp mình để đội ngũ có thể gọi tư vấn nhé!",
        );
        return;
      }
      if (!consultForm.email.trim()) {
        notifyMascot("Bạn chưa nhập email. Nhập giúp mình email để nhận thông tin tư vấn chi tiết nhé!");
        return;
      }
      if (!consultForm.address.trim()) {
        notifyMascot("Bạn chưa nhập địa chỉ tư vấn. Nhập giúp mình khu vực để đội ngũ tư vấn sát hơn nhé!");
        return;
      }
      if (!consultForm.consultDate) {
        notifyMascot("Bạn chưa chọn ngày tư vấn. Chọn giúp mình một ngày thuận tiện nhé!");
        return;
      }
      const slot = CONSULT_SLOTS.find((s) => s.id === consultForm.consultSlot);
      if (!slot) {
        notifyMascot("Bạn chưa chọn khung giờ. Chọn Sáng, Chiều hoặc Tối để đội ngũ liên hệ nhé!");
        return;
      }

      const whenLabel = `${formatConsultDayLabel(consultForm.consultDate)} · ${slot.label} (${slot.hint})`;
      setConsultLoading(true);
      try {
        const combinedNote = `Email: ${consultForm.email} | Địa chỉ: ${consultForm.address} | Thời gian: ${whenLabel} | Nội dung: ${consultForm.note}`;
        await db.leads.add({
          type: "contact",
          name: consultForm.name,
          phone: consultForm.phone,
          note: combinedNote,
        });
        setConsultSummary(whenLabel);
        setConsultDone(true);
        notifyMascot(
          "Hoàn tất rồi! Bạn chú ý điện thoại hoặc Zalo nhé, đội ngũ Bứt Phá Marketing sẽ liên hệ tư vấn cho bạn sớm nhất.",
        );
      } catch {
        notifyMascot(
          "Hiện chưa gửi được thông tin. Bạn thử lại giúp mình hoặc gọi trực tiếp cho đội ngũ tư vấn nhé!",
        );
      } finally {
        setConsultLoading(false);
      }
    },
    [consultForm, notifyMascot],
  );

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    if (SECTIONS[activeSection]?.id !== "du-an") {
      setCaseTaglineReveal(false);
      return;
    }
    const t = window.setTimeout(() => setCaseTaglineReveal(true), 180);
    return () => window.clearTimeout(t);
  }, [activeSection]);

  useEffect(() => {
    if (SECTIONS[activeSection]?.id !== "tieng-noi") {
      setVoiceReveal(false);
      return;
    }
    setVoiceReveal(false);
    const revealT = window.setTimeout(() => setVoiceReveal(true), 80);
    const rotT = window.setInterval(() => {
      setVoiceActive((i) => (i + 1) % voiceCases.length);
    }, 5200);
    return () => {
      window.clearTimeout(revealT);
      window.clearInterval(rotT);
    };
  }, [activeSection, voiceCases.length]);

  useEffect(() => {
    if (SECTIONS[activeSection]?.id !== "tieng-noi") return;
    setVoiceReveal(false);
    const t = window.setTimeout(() => setVoiceReveal(true), 50);
    return () => window.clearTimeout(t);
  }, [voiceActive, activeSection]);

  useEffect(() => {
    const el = snapRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (menuOpen) return;
      const t = e.target as HTMLElement | null;
      const pane = t?.closest?.("[data-project-scroll]") as HTMLElement | null;
      if (pane) {
        const { scrollTop, scrollHeight, clientHeight } = pane;
        const canUp = scrollTop > 0;
        const canDown = scrollTop + clientHeight < scrollHeight - 1;
        if ((e.deltaY < 0 && canUp) || (e.deltaY > 0 && canDown)) {
          return; // cuộn list dự án, không đổi section
        }
      }
      e.preventDefault();
      if (locking.current) return;
      if (Math.abs(e.deltaY) < 8) return;
      goToSection(activeSectionRef.current + (e.deltaY > 0 ? 1 : -1));
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
      const t = e.target as HTMLElement | null;
      touchFromHScroll.current = Boolean(
        t?.closest?.("[data-h-scroll], [data-project-scroll]"),
      );
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchFromHScroll.current) return;
      // chặn kéo native — chỉ đổi section khi thả tay
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (menuOpen || locking.current) return;
      const start = touchStartY.current;
      const fromHScroll = touchFromHScroll.current;
      touchStartY.current = null;
      touchFromHScroll.current = false;
      if (start == null || fromHScroll) return;
      const end = e.changedTouches[0]?.clientY;
      if (end == null) return;
      const dy = start - end;
      if (Math.abs(dy) < 48) return;
      goToSection(activeSectionRef.current + (dy > 0 ? 1 : -1));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (menuOpen || locking.current) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goToSection(activeSectionRef.current + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goToSection(activeSectionRef.current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSection(SECTIONS.length - 1);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    };
  }, [goToSection, menuOpen]);

  return (
    <>
      {isClient && showLoader && (
        <LoadingScreen
          logoSrc={logoSrc}
          onComplete={() => {
            setShowLoader(false);
            setSiteReady(true);
          }}
        />
      )}

      <div
        className="corp-home fixed inset-0 z-[1] bg-slate-950 text-white transition-opacity duration-500"
        style={{ opacity: siteReady ? 1 : 0, pointerEvents: siteReady ? "auto" : "none" }}
      >
        {/* Fixed chrome */}
        <header className="pointer-events-none absolute inset-x-0 top-0 z-40">
          <div className="pointer-events-auto mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-4 sm:gap-3 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`inline-flex items-center justify-self-start gap-2 text-[11px] font-medium tracking-[0.18em] transition ${headerMuted}`}
              aria-label="Mở menu"
            >
              <Menu className="h-4 w-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">Menu</span>
            </button>

            <Link href="/" className={`flex items-center justify-self-center gap-2 ${headerText} sm:gap-2.5`}>
              <Image
                src={logoSrc}
                alt={brandName}
                width={40}
                height={40}
                className="h-8 w-8 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
              />
              <span
                className="max-w-[9.5rem] truncate text-[13px] font-medium tracking-[0.02em] sm:max-w-none sm:text-[15px] sm:tracking-[0.04em]"
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
              >
                {brandName}
              </span>
            </Link>

            <div className="flex items-center justify-self-end gap-2 sm:gap-4">
              <Link
                href="/blog"
                className={`rounded-full p-2 transition ${headerMuted} ${headerIconBtn}`}
                aria-label="Tìm bài viết"
              >
                <Search className="h-4 w-4" />
              </Link>
              <a
                href={getTelHref(hotline)}
                className={`corp-hotline ${headerLight ? "corp-hotline--light" : "corp-hotline--dark"}`}
                aria-label={`Gọi hotline ${hotlineDisplay}`}
              >
                <span className="corp-hotline-icon" aria-hidden>
                  <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <span className="corp-hotline-num">{hotlineDisplay}</span>
              </a>
            </div>
          </div>
        </header>

        {/* Dot nav */}
        <nav
          className="pointer-events-none absolute left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 lg:left-8 lg:flex xl:left-10"
          aria-label="Điều hướng section"
        >
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goToSection(i)}
              className="pointer-events-auto group flex items-center gap-3"
              aria-label={s.label}
              aria-current={activeSection === i ? "true" : undefined}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full border transition ${
                  activeSection === i
                    ? "scale-125 border-violet-500 bg-violet-600 shadow-[0_0_0_4px_rgba(139,92,246,0.25)]"
                    : `${dotIdle} group-hover:opacity-80`
                }`}
              />
              <span
                className={`hidden text-[10px] font-semibold tracking-[0.18em] transition xl:inline ${
                  activeSection === i
                    ? headerLight
                      ? "text-violet-700 opacity-100"
                      : "text-violet-200 opacity-100"
                    : `${dotLabelIdle} group-hover:opacity-100`
                }`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Full-page sections — transform, không scroll tự do */}
        <div ref={snapRef} className="corp-snap h-full overflow-hidden">
          <div
            className="corp-snap-track will-change-transform"
            style={{ transform: `translate3d(0, ${-activeSection * 100}%, 0)` }}
          >
          {/* 1 — Hero */}
          <section
            id="but-pha"
            className={`corp-snap-section relative flex flex-col items-center justify-center overflow-hidden ${siteReady ? "home-hero-ready" : ""}`}
          >
            {heroSlides.map((src, i) => (
              <div
                key={src}
                className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${i === heroIndex ? "opacity-100" : "opacity-0"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="home-hero-kenburns" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/45 to-slate-950/70" />
              </div>
            ))}

            <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-16 pt-20 text-center sm:px-8 sm:pb-20">
              <HeroRevealText
                as="h1"
                text="Bứt Phá Marketing"
                className="corp-display-hero drop-shadow-sm"
                startDelayMs={60}
                stepMs={38}
              />
              <HeroRevealText
                as="p"
                text="Kết nối thương hiệu — Tăng trưởng bền vững"
                className="mt-3 max-w-sm text-[12px] font-light leading-relaxed tracking-[0.14em] text-white/80 sm:mt-4 sm:max-w-xl sm:text-sm sm:tracking-[0.22em]"
                startDelayMs={720}
                stepMs={22}
              />
              <div className="home-hero-enter-item home-hero-enter-cta mt-7 flex w-full max-w-sm flex-col gap-2.5 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center sm:gap-3">
                <Link
                  href="/banggia"
                  className="corp-cta corp-cta-hero-primary inline-flex items-center justify-center rounded-md bg-violet-600 px-6 py-3.5 text-white shadow-lg shadow-violet-900/35 sm:px-7"
                >
                  Bảng giá dịch vụ
                </Link>
                <button
                  type="button"
                  onClick={() => goToSection(consultSectionIndex)}
                  className="corp-cta corp-cta-hero-secondary inline-flex items-center justify-center rounded-md border border-white/70 bg-transparent px-6 py-3.5 text-white sm:px-7"
                >
                  Đặt lịch tư vấn
                </button>
              </div>
              <div className="home-hero-enter-item home-hero-enter-line mt-8 flex justify-center sm:mt-10">
                <div className="home-hero-line h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              </div>
            </div>

            <div className="absolute bottom-5 left-1/2 z-20 flex w-full max-w-xs -translate-x-1/2 flex-col items-center gap-3 sm:bottom-7">
              <div className="flex gap-1.5">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setHeroIndex(i)}
                    className={`h-1 rounded-full transition-all ${i === heroIndex ? "w-6 bg-violet-400" : "w-2 bg-white/40"}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => goToSection(1)}
                className="corp-scroll-hint"
                aria-label="Lướt xuống phần tiếp theo"
              >
                <span className="corp-scroll-hint-label">Lướt xuống</span>
                <span className="corp-scroll-hint-icon" aria-hidden>
                  <ChevronDown className="h-5 w-5" strokeWidth={2} />
                </span>
              </button>
            </div>
          </section>

          {/* 2 — Giới thiệu: nền tech · 3 thiết bị trái · chữ phải */}
          <section
            id="gioi-thieu"
            className="corp-snap-section relative flex overflow-hidden bg-[#e4e8ef] text-slate-900"
          >
            {/* Nền thiên công nghệ nhẹ */}
            <div className="pointer-events-none absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ABOUT_CITY_BG}
                alt=""
                className="h-full w-full object-cover object-[center_35%] opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#eef1f7]/55 via-[#eef1f7]/30 to-[#eef1f7]/82" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#eef1f7]/60 via-transparent to-[#eef1f7]/40" />
              <div className="absolute inset-y-0 right-0 w-[42%] bg-gradient-to-l from-[#f4f6fb]/85 via-[#f4f6fb]/45 to-transparent sm:w-[48%] sm:from-[#f4f6fb]/92 sm:via-[#f4f6fb]/70" />
            </div>

            <div className="relative z-10 mx-auto grid h-full w-full max-w-[1280px] grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-2 px-4 pb-6 pt-[4.25rem] sm:gap-3 sm:px-8 sm:pb-10 sm:pt-20 md:gap-4 md:px-8 md:pb-14 md:pt-16 lg:gap-2 lg:px-10 lg:pb-16 lg:pt-20 xl:gap-4 xl:pl-16">
              {/* Devices — luôn cột trái */}
              <div className="relative order-1 flex h-[min(42vh,260px)] min-h-0 w-full flex-col sm:h-[min(52vh,380px)] md:h-[min(68vh,560px)] lg:h-[min(72vh,620px)]">
                <div
                  className="relative h-full w-full overflow-visible"
                  aria-label="Thiết bị marketing"
                >
                  {ABOUT_DEVICES.map((device) => (
                    <div
                      key={device.id}
                      className={`${device.wrap} transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                        aboutReveal
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-10 opacity-0 sm:-translate-x-20 md:-translate-x-28"
                      }`}
                      style={{ transitionDelay: aboutReveal ? `${device.delayMs}ms` : "0ms" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`${device.src}?v=bpm3`} alt={device.alt} className={device.img} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Chữ — luôn cột phải */}
              <div className="relative z-20 order-2 w-full min-w-0 self-center text-left xl:max-w-[34rem]">
                <p className="flex items-center gap-2 sm:gap-3">
                  <span
                    className="h-[1.5px] w-5 rounded-full bg-gradient-to-r from-transparent via-violet-400/90 to-violet-500 sm:w-8"
                    aria-hidden
                  />
                  <span
                    className="bg-gradient-to-r from-violet-800 via-violet-600 to-violet-800 bg-clip-text text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-transparent sm:text-[1.05rem] sm:tracking-[0.32em]"
                    style={{ fontFamily: '"Cormorant Garamond", "Be Vietnam Pro", Georgia, serif' }}
                  >
                    Về chúng tôi
                  </span>
                </p>

                <h2
                  className="mt-1.5 text-balance sm:mt-3"
                  style={{
                    fontFamily: '"Be Vietnam Pro", system-ui, sans-serif',
                    fontWeight: 600,
                    fontSize: "clamp(0.95rem, 2.2vw, 2.05rem)",
                    lineHeight: 1.32,
                    letterSpacing: "-0.02em",
                    color: "#16131f",
                  }}
                >
                  Đồng hành doanh nghiệp phát triển khách hàng trên nền tảng số
                </h2>

                <p
                  className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-violet-700/85 sm:mt-3 sm:text-[12px]"
                  style={{ fontFamily: '"Be Vietnam Pro", system-ui, sans-serif' }}
                >
                  Website · Facebook · Google Maps
                </p>

                <div
                  className="mt-2 space-y-2 text-pretty sm:mt-4 sm:space-y-3"
                  style={{
                    fontFamily: '"Be Vietnam Pro", system-ui, sans-serif',
                    fontSize: "clamp(0.72rem, 1.35vw, 1.02rem)",
                    fontWeight: 400,
                    lineHeight: 1.55,
                    color: "#1f1b2e",
                  }}
                >
                  <p>
                    Bứt Phá Marketing giúp doanh nghiệp xây dựng hình ảnh chuyên nghiệp với Website, Fanpage Facebook,
                    Google Maps và quảng cáo Facebook.
                  </p>
                  <p className="hidden sm:block">
                    Chúng tôi tư vấn chiến lược rõ ràng, theo dõi hiệu quả bằng KPI để mang lại kết quả thực tế, không
                    làm marketing theo cảm tính.
                  </p>
                </div>

                <div className="mt-3 sm:mt-5">
                  <Link
                    href="/gioi-thieu"
                    className="corp-cta inline-flex items-center justify-center rounded-md bg-[#5b21b6] px-4 py-2 text-[11px] text-white shadow-md shadow-violet-900/20 transition hover:bg-[#4c1d95] sm:px-7 sm:py-3 sm:text-sm"
                  >
                    Xem thêm
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 3 — Lĩnh vực: full-bleed desk · 3 thẻ xếp chồng · 1 active nổi */}
          <section
            id="linh-vuc"
            className="corp-snap-section relative flex flex-col overflow-hidden text-white"
          >
            <div className="pointer-events-none absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LINH_VUC_BG}
                alt=""
                className="h-full w-full scale-110 object-cover object-[center_30%] opacity-50 saturate-[0.65] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-[#070b16]/80" />
              <div
                className="absolute inset-0 opacity-[0.2]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(139,92,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.22) 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-950/45 via-transparent to-cyan-950/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070b16]/92 via-[#070b16]/40 to-[#070b16]/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b16]/88 via-transparent to-[#070b16]/55" />
            </div>

            <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-start gap-4 px-4 pb-6 pt-[4.5rem] sm:gap-6 sm:px-8 sm:pb-10 sm:pt-24 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-center lg:justify-center lg:gap-10 lg:px-14 lg:pb-0 lg:pt-0 xl:gap-14 xl:pl-28">
              <div className="relative z-30 mx-auto w-full max-w-lg shrink-0 text-center lg:mx-0 lg:max-w-none lg:pl-10 lg:text-left xl:pl-14">
                <p className="flex items-center justify-center gap-3 lg:justify-start">
                  <span className="hidden h-px w-8 bg-gradient-to-r from-transparent to-violet-300/80 sm:block" aria-hidden />
                  <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-violet-200 sm:text-xs">
                    Dịch vụ
                  </span>
                  <span className="hidden h-px w-8 bg-gradient-to-l from-transparent to-violet-300/80 lg:hidden sm:block" aria-hidden />
                </p>
                <h2
                  className="mt-1 text-balance sm:mt-3"
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 600,
                    fontSize: "clamp(1.35rem, 3.8vw, 3rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Lĩnh vực hoạt động
                </h2>
                <p className="mx-auto mt-3 hidden max-w-md text-[13px] font-light leading-relaxed text-white/70 sm:text-[15px] lg:mx-0 xl:block">
                  Ba mũi nhọn giúp doanh nghiệp hiện diện đúng nơi khách đang quyết định — Website, Facebook và Google Maps.
                </p>
                <div className="mx-auto mt-5 hidden flex-wrap items-center justify-center gap-2 lg:mx-0 lg:justify-start xl:flex">
                  {[
                    { label: "Website", href: "/website" },
                    { label: "Facebook", href: "/facebook" },
                    { label: "Google Maps", href: "/google-maps" },
                  ].map((btn) => (
                    <Link
                      key={btn.href}
                      href={btn.href}
                      className="inline-flex items-center rounded-full border border-white/25 bg-white/[0.06] px-4 py-2 text-[12px] font-medium tracking-wide text-white/90 backdrop-blur-sm transition hover:border-violet-300/50 hover:bg-violet-500/20 hover:text-white"
                    >
                      {btn.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile + Desktop: coverflow — thẻ cao max theo stage, không đè tiêu đề */}
              <div className="relative z-10 mt-1 flex w-full min-w-0 flex-1 flex-col items-center justify-center lg:mt-0 lg:h-[min(72vh,560px)] lg:flex-none lg:items-stretch">
                <div className="relative mx-auto flex h-[min(48dvh,340px)] w-full max-w-2xl items-center gap-1 sm:h-[min(52dvh,380px)] sm:gap-2 lg:h-full lg:max-w-none lg:gap-3">
                  <button
                    type="button"
                    onClick={() => setLinhActive((i) => (i - 1 + LINH_VUC.length) % LINH_VUC.length)}
                    className="z-40 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white shadow-lg backdrop-blur-md sm:h-10 sm:w-10 lg:h-11 lg:w-11"
                    aria-label="Thẻ trước"
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
                  </button>

                  <div className="relative mx-auto h-full min-w-0 flex-1 max-w-[540px] perspective-[1200px] lg:max-w-[600px]">
                    {LINH_VUC.map((item, i) => {
                      const d = linhVucCardOffset(i, linhActive);
                      const isActive = d === 0;
                      return (
                        <button
                          key={item.num}
                          type="button"
                          onClick={() => {
                            if (isActive) router.push(item.href);
                            else setLinhActive(i);
                          }}
                          className={`group absolute left-1/2 top-1/2 overflow-hidden rounded-2xl text-center shadow-2xl transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                            isActive
                              ? "z-30 h-[98%] opacity-100 brightness-100"
                              : "z-10 h-[90%] opacity-80 brightness-[0.8] saturate-[0.8]"
                          }`}
                          style={{
                            width: "auto",
                            aspectRatio: "3 / 4",
                            maxWidth: isActive ? "min(72%, 300px)" : "min(66%, 270px)",
                            transform: isActive
                              ? "translate(-50%, -50%) scale(1)"
                              : d === 1
                                ? "translate(22%, -46%) scale(0.9)"
                                : "translate(-122%, -46%) scale(0.9)",
                          }}
                          aria-pressed={isActive}
                          aria-label={item.title}
                        >
                          <div
                            className={`relative h-full w-full origin-center overflow-hidden rounded-2xl ring-1 ring-white/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isActive ? "group-hover:scale-[1.07] group-focus-visible:scale-[1.07]" : ""
                            }`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image}
                              alt=""
                              className={`h-full w-full object-cover transition duration-700 ${isActive ? "scale-[1.03]" : "scale-100"}`}
                              style={{ objectPosition: item.objectPosition }}
                            />
                            <div
                              className={`absolute inset-0 transition-colors duration-500 ${
                                isActive
                                  ? "bg-gradient-to-t from-[#070b16]/90 via-[#070b16]/35 to-transparent group-hover:from-[#070b16] group-hover:via-[#070b16]/60"
                                  : "bg-gradient-to-t from-[#070b16]/85 via-[#070b16]/50 to-[#070b16]/25"
                              }`}
                            />
                            {isActive ? (
                              <div className="absolute inset-x-0 bottom-0 px-4 pb-5 pt-10 text-center sm:px-5 sm:pb-6">
                                <h3
                                  className="inline-flex rounded-full border border-violet-300/25 bg-violet-950/55 px-3.5 py-1.5 text-[0.8rem] font-medium tracking-[0.18em] text-violet-50 backdrop-blur-md sm:px-4 sm:text-[0.85rem]"
                                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 500 }}
                                >
                                  {item.title}
                                </h3>
                                <div
                                  className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100"
                                >
                                  <div className="overflow-hidden">
                                    <p
                                      className="mx-auto mt-3 max-w-[13.5rem] text-[11.5px] font-light leading-[1.7] tracking-wide text-white/70 sm:max-w-[14.5rem] sm:text-[12.5px]"
                                      style={{ fontFamily: '"Be Vietnam Pro", system-ui, sans-serif' }}
                                    >
                                      {item.desc}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setLinhActive((i) => (i + 1) % LINH_VUC.length)}
                    className="z-40 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white shadow-lg backdrop-blur-md sm:h-10 sm:w-10 lg:h-11 lg:w-11"
                    aria-label="Thẻ sau"
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 4 — Dự án: tiêu đề giữa + list cuộn trái + ảnh phải */}
          <section
            id="du-an"
            className="corp-snap-section relative flex flex-col overflow-hidden text-white"
          >
            <div className="pointer-events-none absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={DU_AN_BG}
                alt=""
                className="h-full w-full object-cover object-[center_40%] opacity-40 saturate-[0.65]"
              />
              <div className="absolute inset-0 bg-[#070b16]/82" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070b16]/95 via-[#070b16]/70 to-[#070b16]/45" />
            </div>

            <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl -translate-y-3 flex-col justify-center px-4 pb-6 pt-[2.75rem] sm:translate-y-0 sm:justify-start sm:px-8 sm:pb-4 sm:pt-20 lg:px-12 lg:pl-20 xl:pl-28">
              <h2
                className="mx-auto -mt-1 w-full shrink-0 text-center text-white sm:mt-0"
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 600,
                  fontSize: "clamp(1.4rem, 3.6vw, 2.5rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                }}
              >
                Dự án tiêu biểu
              </h2>

              <div className="mt-4 grid min-h-0 w-full shrink-0 grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] items-start gap-2.5 sm:mt-5 sm:grid-cols-[minmax(180px,0.85fr)_minmax(0,1.35fr)] sm:gap-5 md:gap-7 lg:gap-10">
                {/* Trái — list + thanh cuộn (kéo → đổi ảnh phải) */}
                <div className="relative z-20 flex min-h-0 min-w-0 flex-col">
                  <ul
                    ref={projectListRef}
                    data-project-scroll
                    onScroll={onProjectListScroll}
                    className="corp-project-scroll corp-project-scroll--left-bar h-[min(42vh,17rem)] space-y-0 overflow-y-scroll overscroll-contain pl-2 sm:h-[min(52vh,21.5rem)] sm:space-y-0.5 sm:pl-3 md:h-[min(55vh,22.5rem)]"
                  >
                    {featuredCases.map((c, i) => {
                      const on = i === caseActive;
                      return (
                        <li key={c.slug} data-case-index={i}>
                          <button
                            type="button"
                            onClick={() => selectCase(i, true)}
                            className={`group flex w-full items-center gap-2 rounded-md px-1.5 py-1.5 text-left transition sm:gap-3.5 sm:rounded-lg sm:px-2 sm:py-2.5 ${
                              on ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
                            }`}
                            aria-current={on ? "true" : undefined}
                          >
                            <span
                              className={`h-5 w-0.5 shrink-0 rounded-full transition sm:h-8 ${
                                on ? "bg-violet-400" : "bg-white/15 group-hover:bg-white/30"
                              }`}
                              aria-hidden
                            />
                            <span className="min-w-0 flex-1">
                              <span
                                className={`block text-[11px] font-medium leading-snug tracking-wide transition sm:text-[14px] ${
                                  on ? "text-white" : "text-white/55 group-hover:text-white/80"
                                }`}
                              >
                                {c.clientName.replace(/^Hệ Thống\s+/i, "")}
                              </span>
                              <span
                                className={`mt-0.5 hidden text-[11px] tracking-wide transition sm:block ${
                                  on ? "text-violet-200/85" : "text-white/30"
                                }`}
                              >
                                {c.industryLabel}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Phải — ảnh + Xem website */}
                <div className="relative z-10 flex min-h-0 min-w-0 flex-col items-center">
                  <div className="relative h-[min(30vh,180px)] w-full overflow-hidden rounded-lg bg-[#120e18] ring-1 ring-white/12 sm:h-[min(36vh,260px)] sm:rounded-xl md:h-[min(40vh,320px)] lg:h-[min(42vh,340px)]">
                    {featuredCases.map((c, i) => {
                      const on = i === caseActive;
                      return (
                        <div
                          key={c.slug}
                          className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                            on ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={caseShowcaseSrc(c)}
                            alt={c.clientName}
                            className="h-full w-full object-cover object-top"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {activeCase ? (
                    <a
                      href={activeCase.websiteUrl || `/du-an/${activeCase.slug}`}
                      target={activeCase.websiteUrl ? "_blank" : undefined}
                      rel={activeCase.websiteUrl ? "noopener noreferrer" : undefined}
                      className="corp-cta mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-violet-600 px-4 py-2 text-[11px] font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500 sm:mt-2.5 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
                    >
                      Xem website
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </a>
                  ) : null}
                </div>
              </div>

              <HeroRevealText
                as="p"
                text="Cùng Bứt Phá Marketing kiến tạo thương hiệu, chinh phục khách hàng và tăng trưởng bền vững."
                charClassName="corp-type-char"
                startDelayMs={120}
                stepMs={28}
                className={`mx-auto mt-4 w-full max-w-2xl shrink-0 px-2 pb-2 text-center text-[12.5px] font-light leading-snug tracking-wide text-white/65 sm:mt-auto sm:pb-1 sm:pt-4 sm:text-[13px] ${
                  caseTaglineReveal ? "corp-type-ready" : ""
                }`}
              />
            </div>
          </section>

          {/* 5 — Đặt lịch tư vấn: ngày/giờ trái · form phải */}
          <section
            id="tu-van"
            className="corp-snap-section relative flex flex-col justify-center overflow-hidden bg-[#06080f] text-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CORP_HERO_SLIDES[5]}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14] saturate-50"
            />
            <div className="absolute inset-0 bg-[#06080f]/82" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_20%,rgba(109,40,217,0.16),transparent_65%)]" />

            <div
              data-project-scroll
              className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col justify-center overflow-y-auto px-3 py-12 sm:px-8 sm:py-16 lg:overflow-visible lg:px-12 lg:py-0"
            >
              <div className="mx-auto w-full shrink-0 text-center">
                <p className="text-[8px] font-medium uppercase tracking-[0.24em] text-white/35 sm:text-[10px] sm:tracking-[0.32em]">
                  Tư vấn miễn phí
                </p>
                <h2
                  className="mt-1 text-[clamp(1.25rem,4.2vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                >
                  Đặt lịch hẹn tư vấn
                </h2>
              </div>

              {consultDone ? (
                <div className="mx-auto mt-8 flex max-w-md flex-col items-center text-center">
                  <p className="text-[10px] font-medium tracking-[0.24em] text-violet-300/80">HOÀN TẤT</p>
                  <p
                    className="mt-2 text-2xl font-semibold text-white sm:text-3xl"
                    style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                  >
                    Đã nhận lịch hẹn
                  </p>
                  {consultSummary ? (
                    <p className="mt-3 text-sm font-light text-white/70">{consultSummary}</p>
                  ) : null}
                  <p className="mt-2 text-sm font-light text-white/40">
                    Đội ngũ sẽ gọi đúng khung giờ. Chú ý điện thoại hoặc Zalo.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setConsultDone(false);
                      setConsultSummary("");
                      setConsultForm(EMPTY_CONSULT_FORM);
                    }}
                    className="mt-6 text-xs tracking-wide text-white/50 underline decoration-white/20 underline-offset-4 hover:text-white"
                  >
                    Đặt lịch khác
                  </button>
                </div>
              ) : (
                <form
                  className="mt-4 grid w-full grid-cols-[minmax(0,0.85fr)_minmax(0,1.2fr)] items-start gap-2.5 border-t border-white/[0.08] pt-3.5 sm:mt-6 sm:gap-5 sm:pt-6 lg:gap-10 lg:pt-8"
                  onSubmit={handleConsultSubmit}
                >
                  {/* Trái — ngày + giờ */}
                  <div className="flex min-w-0 flex-col gap-3 text-left sm:gap-4">
                    <div>
                      <p className="mb-1.5 text-[8px] font-medium tracking-[0.16em] text-white/35 sm:text-[10px] sm:tracking-[0.22em]">
                        NGÀY
                      </p>
                      <div className="flex flex-col gap-0.5 sm:gap-1">
                        {consultDays.map((day) => {
                          const active = consultForm.consultDate === day.iso;
                          return (
                            <button
                              key={day.iso}
                              type="button"
                              onClick={() => setConsultForm((prev) => ({ ...prev, consultDate: day.iso }))}
                              className={`corp-consult-chip flex w-full flex-row items-center justify-between gap-1 px-1.5 py-1.5 sm:px-2.5 sm:py-2 ${
                                active ? "corp-consult-chip--on" : ""
                              }`}
                              aria-pressed={active}
                            >
                              <span className="text-[8px] uppercase tracking-[0.06em] sm:text-[10px]">
                                {day.isToday ? "Nay" : day.weekday}
                              </span>
                              <span className="text-[10px] tabular-nums font-medium sm:text-[12px]">
                                {day.dayNum}/{day.month}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[8px] font-medium tracking-[0.16em] text-white/35 sm:text-[10px] sm:tracking-[0.22em]">
                        GIỜ
                      </p>
                      <div className="flex flex-col gap-0.5 sm:gap-1">
                        {CONSULT_SLOTS.map((slot) => {
                          const active = consultForm.consultSlot === slot.id;
                          return (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => setConsultForm((prev) => ({ ...prev, consultSlot: slot.id }))}
                              className={`corp-consult-slot flex w-full flex-row items-center justify-between gap-1 px-1.5 py-1.5 text-left sm:px-2.5 sm:py-2 ${
                                active ? "corp-consult-slot--on" : ""
                              }`}
                              aria-pressed={active}
                            >
                              <span className="text-[10px] font-medium sm:text-[12px]">{slot.label}</span>
                              <span className="text-[8px] font-light opacity-55 sm:text-[10px]">{slot.hint}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Phải — form nhập */}
                  <div className="flex min-w-0 flex-col gap-1.5 border-l border-white/[0.08] pl-2.5 text-left sm:gap-2.5 sm:pl-5 lg:pl-10">
                    <p className="mb-0 text-[8px] font-medium tracking-[0.16em] text-white/35 sm:text-[10px] sm:tracking-[0.22em]">
                      THÔNG TIN
                    </p>
                    <input
                      required
                      type="text"
                      placeholder="Họ và tên *"
                      value={consultForm.name}
                      onChange={(e) => setConsultForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="corp-consult-input"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Số điện thoại *"
                      value={consultForm.phone}
                      onChange={(e) => setConsultForm((prev) => ({ ...prev, phone: e.target.value }))}
                      className="corp-consult-input"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email *"
                      value={consultForm.email}
                      onChange={(e) => setConsultForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="corp-consult-input"
                    />
                    <input
                      required
                      type="text"
                      placeholder="Khu vực *"
                      value={consultForm.address}
                      onChange={(e) => setConsultForm((prev) => ({ ...prev, address: e.target.value }))}
                      className="corp-consult-input"
                    />
                    <input
                      type="text"
                      placeholder="Ghi chú"
                      value={consultForm.note}
                      onChange={(e) => setConsultForm((prev) => ({ ...prev, note: e.target.value }))}
                      className="corp-consult-input"
                    />
                    <button
                      disabled={consultLoading}
                      type="submit"
                      className="mt-1 w-full rounded-md bg-violet-600 py-2.5 text-[9px] font-semibold tracking-[0.14em] text-white shadow-lg shadow-violet-950/35 transition hover:bg-violet-500 disabled:opacity-50 sm:py-3 sm:text-[11px] sm:tracking-[0.2em]"
                    >
                      {consultLoading ? "ĐANG GỬI..." : "ĐẶT LỊCH NGAY"}
                    </button>
                    <a
                      href={getTelHref(hotline)}
                      className="inline-flex items-center justify-center gap-1.5 text-[10px] font-light text-white/40 transition hover:text-white sm:text-[12px]"
                    >
                      <Phone className="h-3 w-3" />
                      {hotlineDisplay}
                    </a>
                  </div>
                </form>
              )}
            </div>
          </section>

          {/* 6 — Kiến thức: ảnh lớn trái + 4 bài nhỏ phải (scroll) */}
          <section
            id="kien-thuc"
            className="corp-snap-section relative flex flex-col overflow-hidden bg-[#06080f] text-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CORP_HERO_SLIDES[1]}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12] saturate-50"
            />
            <div className="absolute inset-0 bg-[#06080f]/88" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(109,40,217,0.14),transparent_65%)]" />

            <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-3 py-14 sm:px-8 sm:py-20 lg:px-12 lg:pl-20 xl:pl-28">
              <div className="mb-3 flex shrink-0 items-end justify-between gap-3 sm:mb-7 sm:gap-4">
                <h2
                  className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-400 bg-clip-text text-[clamp(1.65rem,5vw,3.15rem)] font-semibold tracking-[-0.02em] text-transparent"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                >
                  Kiến thức
                </h2>
                <Link
                  href="/blog"
                  className="text-[11px] font-medium tracking-wide text-violet-200/80 transition hover:text-white sm:text-[12px]"
                >
                  Xem tất cả →
                </Link>
              </div>

              <div className="grid min-h-0 grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-stretch gap-2.5 sm:gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-7">
                {/* Trái — bài lớn */}
                <Link
                  href={featuredKnowledge?.slug ? `/blog/${featuredKnowledge.slug}` : "/blog"}
                  className="group relative min-h-[min(52vh,280px)] overflow-hidden rounded-lg ring-1 ring-white/10 sm:min-h-[280px] lg:min-h-[min(52vh,440px)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredKnowledge?.imageUrl || CORP_HERO_SLIDES[2]}
                    alt={featuredKnowledge?.title || "Kiến thức marketing"}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-5 lg:p-6">
                    <p className="text-[8px] font-medium uppercase tracking-[0.16em] text-violet-200/80 sm:text-[10px] sm:tracking-[0.2em]">
                      Nổi bật
                    </p>
                    <h3
                      className="mt-1 line-clamp-3 text-[clamp(0.95rem,3.2vw,1.75rem)] font-semibold leading-snug text-white sm:mt-2"
                      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                    >
                      {featuredKnowledge?.title || "Kiến thức marketing thực chiến từ Bứt Phá"}
                    </h3>
                    <p className="mt-1.5 hidden line-clamp-2 max-w-lg text-[12px] font-light leading-relaxed text-white/55 sm:mt-2 sm:block sm:text-[13px]">
                      {featuredKnowledge?.description ||
                        featuredKnowledge?.metaDescription ||
                        "Website · Facebook · Maps — bài viết chọn lọc cho doanh nghiệp."}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide text-violet-200 transition group-hover:text-white sm:mt-3 sm:gap-1.5 sm:text-[11px]">
                      Đọc bài
                      <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </span>
                  </div>
                </Link>

                {/* Phải — bài nhỏ, thanh cuộn */}
                <div
                  data-project-scroll
                  className="corp-project-scroll max-h-[min(52vh,280px)] space-y-1.5 overflow-y-auto overscroll-contain pr-0.5 sm:max-h-[min(48vh,380px)] sm:space-y-2.5 sm:pr-1 lg:max-h-[min(52vh,440px)]"
                >
                  {(sideKnowledge.length > 0
                    ? sideKnowledge
                    : Array.from({ length: 4 }, (_, i) => ({
                        id: `placeholder-${i + 1}`,
                        title: `Kiến thức marketing thực chiến #${i + 1}`,
                        slug: "" as string | undefined,
                        imageUrl: CORP_HERO_SLIDES[i % CORP_HERO_SLIDES.length],
                        description: "Xem thư viện bài viết Website · Facebook · Maps.",
                        metaDescription: undefined as string | undefined,
                      }))
                  ).map((post) => (
                    <Link
                      key={post.id}
                      href={post.slug ? `/blog/${post.slug}` : "/blog"}
                      className="group flex gap-2 rounded-md p-1 transition hover:bg-white/[0.04] sm:gap-3.5 sm:p-1.5"
                    >
                      <div className="relative h-14 w-[4.25rem] shrink-0 overflow-hidden rounded-md bg-white/5 ring-1 ring-white/10 sm:h-[5.25rem] sm:w-[6.75rem]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.imageUrl || CORP_HERO_SLIDES[3]}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1 py-0.5">
                        <h4 className="line-clamp-2 text-[11px] font-medium leading-snug text-white/85 transition group-hover:text-white sm:text-[13px]">
                          {post.title}
                        </h4>
                        <p className="mt-1 hidden line-clamp-2 text-[11px] font-light leading-relaxed text-white/40 sm:block">
                          {post.description || post.metaDescription || "Đọc tiếp trên blog Bứt Phá Marketing."}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 7 — Tiếng nói: quote lớn + logo wall */}
          <section
            id="tieng-noi"
            className="corp-snap-section relative flex flex-col overflow-hidden bg-[#06080f] text-white"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[#06080f]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_20%,rgba(109,40,217,0.22),transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_80%_80%,rgba(76,29,149,0.14),transparent_60%)]" />
            </div>

            <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col justify-center px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
              <h2
                className="mx-auto w-full shrink-0 bg-gradient-to-r from-violet-200 via-fuchsia-300 to-violet-400 bg-clip-text text-center text-transparent"
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 600,
                  fontSize: "clamp(1.45rem, 4vw, 2.65rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                }}
              >
                Họ đã nói gì trước khi bứt phá
              </h2>

              {/* Quote nổi */}
              <div className="relative mx-auto mt-6 w-full max-w-3xl shrink-0 text-center sm:mt-9">
                <span
                  className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 select-none text-[5rem] leading-none text-violet-400/20 sm:-top-7 sm:text-[6.5rem]"
                  aria-hidden
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                >
                  “
                </span>

                {activeVoice ? (
                  <div
                    key={activeVoice.slug}
                    className={voiceReveal ? "corp-case-copy" : "opacity-0"}
                  >
                    <p
                      className="relative text-[clamp(1.15rem,2.8vw,1.75rem)] font-light leading-[1.45] tracking-wide text-white/92"
                      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                    >
                      {activeVoice.quote}
                    </p>
                    <div className="mt-5 flex flex-col items-center gap-1 sm:mt-6">
                      <p className="text-[13px] font-medium tracking-wide text-white sm:text-[14px]">
                        {activeVoice.clientName}
                      </p>
                      <p className="text-[11px] tracking-wide text-violet-200/65 sm:text-[12px]">
                        {activeVoice.industryLabel}
                      </p>
                      <Link
                        href={activeVoice.href}
                        className="mt-2 text-[11px] font-medium tracking-wide text-white/40 transition hover:text-violet-200"
                      >
                        Xem case →
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Logo wall */}
              <div className="mx-auto mt-8 w-full max-w-3xl shrink-0 border-t border-white/[0.08] pt-5 sm:mt-10 sm:pt-6">
                <p className="mb-3 text-center text-[9px] font-medium uppercase tracking-[0.28em] text-white/30 sm:mb-4 sm:text-[10px]">
                  Chọn thương hiệu
                </p>
                <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                  {voiceCases.map((v, i) => {
                    const on = i === voiceActive;
                    return (
                      <li key={v.slug}>
                        <button
                          type="button"
                          onClick={() => setVoiceActive(i)}
                          aria-pressed={on}
                          aria-label={v.clientName}
                          title={v.clientName}
                          className={`flex h-11 min-w-[3.25rem] items-center justify-center rounded-md px-2.5 transition sm:h-12 sm:min-w-[3.6rem] sm:px-3 ${
                            on
                              ? "bg-violet-600/90 text-white shadow-lg shadow-violet-950/40 ring-1 ring-violet-300/40"
                              : "bg-white/[0.04] text-white/55 ring-1 ring-white/10 hover:bg-white/[0.08] hover:text-white/85"
                          }`}
                        >
                          <span
                            className="text-[12px] font-semibold tracking-[0.12em] sm:text-[13px]"
                            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                          >
                            {v.mark}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>

          {/* 8 — Liên hệ / Footer: CTA + 3 cột + brand bar */}
          <section
            id="lien-he"
            className="corp-snap-section relative flex flex-col overflow-hidden bg-[#06080f] text-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CORP_HERO_SLIDES[5]}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12] saturate-50"
            />
            <div className="absolute inset-0 bg-[#06080f]/92" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_15%,rgba(109,40,217,0.18),transparent_65%)]" />

            <div
              data-project-scroll
              className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-3xl flex-col justify-center gap-5 overflow-y-auto px-5 py-14 sm:gap-7 sm:px-8 sm:py-16 lg:gap-8 lg:px-10"
            >
              {/* CTA */}
              <div className="w-full shrink-0 text-center">
                <h2
                  className="text-[clamp(1.35rem,5.5vw,2.35rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                >
                  Sẵn sàng bứt phá?
                </h2>
                <p className="mx-auto mt-2 max-w-md text-[12.5px] font-light leading-relaxed text-white/55 sm:mt-2.5 sm:text-[14px]">
                  Lộ trình Website · Facebook · Maps khớp ngân sách và mục tiêu của bạn.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
                  <button
                    type="button"
                    onClick={() => goToSection(consultSectionIndex)}
                    className="corp-cta inline-flex items-center justify-center rounded-md bg-violet-600 px-3 py-2.5 text-[11px] font-semibold tracking-wide text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500 sm:min-w-[10.5rem] sm:px-6 sm:py-3 sm:text-sm"
                  >
                    Đặt lịch tư vấn
                  </button>
                  <Link
                    href="/banggia"
                    className="inline-flex items-center justify-center rounded-md border border-white/25 px-3 py-2.5 text-[11px] font-semibold tracking-wide text-white/90 transition hover:border-white/50 hover:bg-white/[0.06] sm:min-w-[10.5rem] sm:px-6 sm:py-3 sm:text-sm"
                  >
                    Bảng giá
                  </Link>
                </div>
              </div>

              {/* Links */}
              <div className="w-full shrink-0 border-t border-white/[0.1] pt-5 sm:pt-6">
                {/* Mobile: hotline row */}
                <div className="mb-4 text-center md:hidden">
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[12px]">
                    <a href={getTelHref(hotline)} className="font-medium text-violet-200">
                      {hotlineDisplay}
                    </a>
                    <span className="text-white/20">·</span>
                    <a href={zaloUrl} target="_blank" rel="noopener noreferrer" className="text-white/75">
                      Zalo
                    </a>
                    <span className="text-white/20">·</span>
                    <a href={`mailto:${email}`} className="text-white/75">
                      Email
                    </a>
                  </div>
                  <p className="mt-1.5 text-[10px] font-light leading-snug text-white/40">{address}</p>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-left md:grid-cols-3 md:gap-x-10">
                  <div className="hidden md:block">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                      Kết nối
                    </p>
                    <ul className="mt-2.5 space-y-2 text-[13px]">
                      <li>
                        <a
                          href={getTelHref(hotline)}
                          className="font-medium text-violet-200 transition hover:text-white"
                        >
                          {hotlineDisplay}
                        </a>
                      </li>
                      <li>
                        <a
                          href={zaloUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 transition hover:text-violet-200"
                        >
                          Chat Zalo
                        </a>
                      </li>
                      <li>
                        <a
                          href={`mailto:${email}`}
                          className="text-white/70 transition hover:text-violet-200"
                        >
                          {email}
                        </a>
                      </li>
                      <li className="max-w-[14rem] font-light leading-snug text-white/45">{address}</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/35 sm:text-[10px] sm:tracking-[0.2em]">
                      Dịch vụ
                    </p>
                    <ul className="mt-2 space-y-1.5 text-[12.5px] sm:mt-2.5 sm:space-y-2 sm:text-[13px]">
                      <li>
                        <Link href="/website" className="text-white/70 transition hover:text-violet-200">
                          Website
                        </Link>
                      </li>
                      <li>
                        <Link href="/facebook" className="text-white/70 transition hover:text-violet-200">
                          Facebook
                        </Link>
                      </li>
                      <li>
                        <Link href="/google-maps" className="text-white/70 transition hover:text-violet-200">
                          Google Maps
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog" className="text-white/70 transition hover:text-violet-200">
                          Blog
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/35 sm:text-[10px] sm:tracking-[0.2em]">
                      Khám phá
                    </p>
                    <ul className="mt-2 space-y-1.5 text-[12.5px] sm:mt-2.5 sm:space-y-2 sm:text-[13px]">
                      <li>
                        <Link href="/du-an" className="text-white/70 transition hover:text-violet-200">
                          Dự án
                        </Link>
                      </li>
                      <li>
                        <Link href="/gioi-thieu" className="text-white/70 transition hover:text-violet-200">
                          Giới thiệu
                        </Link>
                      </li>
                      <li>
                        <Link href="/banggia" className="text-white/70 transition hover:text-violet-200">
                          Bảng giá
                        </Link>
                      </li>
                      <li>
                        <Link href="/lien-he" className="text-white/70 transition hover:text-violet-200">
                          Trang liên hệ
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Brand bar */}
              <footer className="flex w-full shrink-0 flex-col items-center gap-1.5 border-t border-white/[0.1] pt-4 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-5 sm:text-left">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoSrc} alt="" className="h-6 w-6 rounded-full object-cover sm:h-7 sm:w-7" />
                  <span
                    className="text-[12px] font-semibold tracking-wide text-white sm:text-[13px]"
                    style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                  >
                    {brandName}
                  </span>
                </div>
                <p className="hidden text-[11px] font-light tracking-wide text-white/40 sm:block">
                  Kết nối thương hiệu — Tăng trưởng bền vững
                </p>
                <p className="text-[10px] text-white/35 sm:text-[11px]">
                  © {new Date().getFullYear()} {brandName}
                </p>
              </footer>
            </div>
          </section>
          </div>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm">
            <div className="absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-white text-slate-900 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
                <span className="text-sm font-bold tracking-wide">MENU</span>
                <button type="button" onClick={() => setMenuOpen(false)} aria-label="Đóng menu" className="rounded-full p-2 hover:bg-slate-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <SiteNavMenu tone="panel" layout="stack" onNavigate={() => setMenuOpen(false)} />
                <div className="mt-6 space-y-2 border-t border-slate-100 px-2 pt-4">
                  {SECTIONS.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-indigo-950 hover:bg-indigo-50"
                      onClick={() => {
                        setMenuOpen(false);
                        goToSection(i);
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

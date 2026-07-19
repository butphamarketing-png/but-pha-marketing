"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, MotionConfig } from "framer-motion";
import { Menu, Phone, Search, X, ArrowRight, ChevronLeft, ChevronRight, ChevronDown, Volume2 } from "lucide-react";
import { SiteNavMenu } from "@/components/shared/SiteNavMenu";
import { getCaseStudyBySlug, getFeaturedShowcases } from "@/lib/case-studies";
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
import { HomeAtomField } from "@/components/shared/HomeAtomField";
import { getBlogThumbnailAlt } from "@/lib/news-images";
import { ensureTypeClickAudio, playTypeClickSound } from "@/lib/type-click-sound";
import {
  hasPlayedHeroWelcome,
  playHeroWelcomeExperience,
  stopHeroWelcomeSpeech,
  unlockHeroAudio,
} from "@/lib/hero-welcome-sound";
import { ensureUiAudio, scheduleAppearSounds } from "@/lib/ui-sounds";
import {
  armBgMusicAutoStart,
  setBgMusicSectionActive,
  startBgMusic,
} from "@/lib/ambient-bg-music";

const SECTIONS: { id: string; label: string; tone: "dark" | "light" }[] = [
  { id: "but-pha", label: "BỨT PHÁ", tone: "dark" },
  { id: "gioi-thieu", label: "GIỚI THIỆU", tone: "dark" },
  { id: "linh-vuc", label: "LĨNH VỰC", tone: "dark" },
  { id: "du-an", label: "DỰ ÁN", tone: "dark" },
  { id: "tu-van", label: "TƯ VẤN", tone: "dark" },
  { id: "kien-thuc", label: "KIẾN THỨC", tone: "dark" },
  { id: "tieng-noi", label: "TIẾNG NÓI", tone: "dark" },
  { id: "lien-he", label: "LIÊN HỆ", tone: "dark" },
];

/** Section tiếng nói — logo tròn + trước / sau đánh giá */
const VOICE_ENTRIES = [
  {
    slug: "nha-khoa-dang-khoa",
    mark: "ĐK",
    wordmark: "Đăng Khoa",
    before: "Trước đó khách chỉ biết mình qua giới thiệu — lịch phụ thuộc người quen.",
    after: "Giờ máy đổ vì họ tìm đúng lúc cần implant và thấy mình đứng đầu kết quả.",
  },
  {
    slug: "kien-truc-sao-khue",
    mark: "SK",
    wordmark: "Sao Khuê",
    before: "Ads chạy đều nhưng lịch vẫn trống — tiền đổ mà không ra khách.",
    after: "Khi hiện diện đúng chỗ khách đang search, view mới thành cuộc gọi.",
  },
  {
    slug: "phuoc-lai-luxury",
    mark: "PL",
    wordmark: "Phước Lai",
    before: "Khách thấy spa đẹp nhưng chưa tin Master đủ để book lịch.",
    after: "Họ vào web xem portfolio 3 Master rồi đặt lịch — khỏi phải hỏi lại.",
  },
  {
    slug: "tham-my-thien-hoang-kim",
    mark: "THK",
    wordmark: "Thiên Hoàng Kim",
    before: "Khách chưa tin uy tín y khoa chỉ vì nghe tên — còn ngại gọi đặt lịch.",
    after: "Website và fanpage thành điểm chạm đầu tiên trước khi họ gọi hotline.",
  },
  {
    slug: "halee-tram",
    mark: "HT",
    wordmark: "Halee Trâm",
    before: "Khách xem ảnh nail trên Facebook rồi vẫn hỏi giá inbox cả buổi.",
    after: "Họ vào web xem bảng giá, khóa học rồi đặt lịch — khỏi chờ reply.",
  },
  {
    slug: "thang-may-thien-an",
    mark: "TA",
    wordmark: "Thiên Ân",
    before: "Khách tìm thang máy chính hãng trên Facebook nhưng fanpage chưa rõ nhận diện.",
    after: "Avatar–cover–bio FUJI đồng bộ — họ tin chính hãng rồi inbox hỏi lắp đặt.",
  },
  {
    slug: "dien-may-chau-hung",
    mark: "CH",
    wordmark: "Châu Hùng",
    before: "Khách thấy giá điện máy trên Facebook nhưng chưa tin cửa hàng trả góp uy tín.",
    after: "Cover trả góp 0% và logo CH rõ — họ inbox hỏi máy lạnh, tủ lạnh ngay.",
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

const ABOUT_CITY_BG = "/about/about-city-bg-deep.png?v=deep2";

/** Reveal: phone → laptop từ trái sang. Không dùng iPad. */
const ABOUT_DEVICES = [
  {
    id: "phone",
    src: "/about/about-device-phone-cut.png",
    alt: "Website Bứt Phá Marketing trên điện thoại",
    delayMs: 0,
    wrap:
      "absolute left-[2%] bottom-[2%] z-30 w-[38%] max-w-[132px] " +
      "sm:left-[4%] sm:bottom-[4%] sm:w-[34%] sm:max-w-[150px] " +
      "md:left-[10%] md:bottom-[16%] md:w-[22%] md:max-w-[180px] lg:left-[12%] lg:bottom-[18%] lg:max-w-[200px]",
    img: "h-auto w-full object-contain drop-shadow-[0_16px_36px_rgba(15,23,42,0.28)]",
  },
  {
    id: "laptop",
    src: "/about/about-device-laptop-cut.png",
    alt: "Dashboard Bứt Phá Marketing trên laptop",
    delayMs: 280,
    wrap:
      "absolute left-[22%] bottom-[4%] z-10 w-[78%] max-w-[280px] " +
      "sm:left-[26%] sm:bottom-[6%] sm:w-[68%] sm:max-w-[260px] " +
      "md:left-[28%] md:bottom-[12%] md:w-[70%] md:max-w-[480px] lg:max-w-[560px]",
    img: "h-auto w-full object-contain drop-shadow-[0_22px_50px_rgba(15,23,42,0.2)]",
  },
] as const;

const LINH_VUC_BG = "/about/about-city-bg-deep.png?v=deep-lv2";
const DU_AN_BG = "/about/linh-vuc-desk-bg.png?v=du-an";
const VOICE_BG = "/about/about-voice-bg-deep.png?v=voice1";

const LINH_VUC = [
  {
    num: "01",
    title: "Website",
    desc: "Thiết kế website chuẩn SEO, tối ưu chuyển đổi và trải nghiệm người dùng.",
    href: "/website",
    image: "/linh-vuc-website.png",
    accent: "from-emerald-600/40",
    glow: "rgba(16, 185, 129, 0.55)",
    glowSoft: "rgba(16, 185, 129, 0.28)",
    objectPosition: "center center",
  },
  {
    num: "02",
    title: "Facebook",
    desc: "Fanpage + quảng cáo Meta — nuôi lead và đo ROI rõ ràng.",
    href: "/facebook",
    image: "/linh-vuc-facebook.png",
    accent: "from-blue-600/40",
    glow: "rgba(59, 130, 246, 0.55)",
    glowSoft: "rgba(59, 130, 246, 0.28)",
    objectPosition: "center 28%",
  },
  {
    num: "03",
    title: "Google Maps",
    desc: "Google Maps & Local SEO — khách gần tìm thấy và gọi bạn.",
    href: "/google-maps",
    image: "/linh-vuc-maps.png",
    accent: "from-orange-600/35",
    glow: "rgba(249, 115, 22, 0.55)",
    glowSoft: "rgba(249, 115, 22, 0.28)",
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
  style,
  play,
  startDelayMs = 40,
  stepMs = 28,
  sound = true,
}: {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  style?: CSSProperties;
  play: boolean;
  startDelayMs?: number;
  stepMs?: number;
  /** Tiếng gõ laptop theo từng chữ */
  sound?: boolean;
}) {
  const { settings } = useAdmin();
  // Wrap theo từ — tránh xuống dòng giữa "hình" / "Facebook"
  const tokens = text.split(/(\s+)/);
  let charIndex = 0;

  useEffect(() => {
    ensureTypeClickAudio();
  }, []);

  useEffect(() => {
    if (!play || !sound || settings.softSoundsEnabled === false) return;

    const vol = Math.min(0.14, Math.max(0.05, (settings.softSoundsVolume ?? 0.05) * 1.35));
    const timers: number[] = [];
    let typed = 0;

    for (const ch of Array.from(text)) {
      if (/\s/.test(ch)) continue;
      const delay = startDelayMs + typed * stepMs;
      timers.push(
        window.setTimeout(() => {
          playTypeClickSound(vol);
        }, delay),
      );
      typed += 1;
    }

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [play, text, startDelayMs, stepMs, sound, settings.softSoundsEnabled, settings.softSoundsVolume]);

  return (
    <Tag className={className} style={style} aria-label={text}>
      {tokens.map((token, ti) => {
        if (/^\s+$/.test(token)) {
          return <span key={`sp-${ti}`}>{" "}</span>;
        }

        const chars = Array.from(token);
        const wordStart = charIndex;
        charIndex += chars.length;

        return (
          <span key={`w-${ti}`} className="inline-block whitespace-nowrap">
            {chars.map((ch, i) => (
              <motion.span
                key={`${ch}-${wordStart + i}`}
                className="inline-block"
                aria-hidden="true"
                initial={{ opacity: 0, y: 10 }}
                animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{
                  duration: 0.32,
                  delay: play ? (startDelayMs + (wordStart + i) * stepMs) / 1000 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}

const ABOUT_COPY_P1 =
  "Bứt Phá Marketing giúp doanh nghiệp xây dựng hình ảnh chuyên nghiệp với Website, Fanpage Facebook, Google Maps và quảng cáo Facebook.";

const ABOUT_COPY_P2 =
  "Chúng tôi tư vấn chiến lược rõ ràng, theo dõi hiệu quả bằng KPI để mang lại kết quả thực tế, không làm marketing theo cảm tính.";

/** Laptop delay + slide duration — copy starts after laptop finishes. */
const ABOUT_LAPTOP_DONE_MS = 280 + 700 + 100;
const ABOUT_COPY_STEP_MS = 18;

function riseProps(step: number, extraClass = "", extraStyle?: CSSProperties) {
  return {
    className: `corp-rise${extraClass ? ` ${extraClass}` : ""}`,
    style: { ["--rise" as string]: step, ...extraStyle } as CSSProperties,
  };
}

/** Opacity-only — không dịch chuyển, giữ nguyên bố cục */
function fadeProps(step: number, extraClass = "") {
  return {
    className: `corp-fade${extraClass ? ` ${extraClass}` : ""}`,
    style: { ["--rise" as string]: step } as CSSProperties,
  };
}

function fromRightProps(step: number, extraClass = "", extraStyle?: CSSProperties) {
  return {
    className: `corp-from-right${extraClass ? ` ${extraClass}` : ""}`,
    style: { ["--rise" as string]: step, ...extraStyle } as CSSProperties,
  };
}

function fromLeftProps(step: number, extraClass = "", extraStyle?: CSSProperties) {
  return {
    className: `corp-from-left${extraClass ? ` ${extraClass}` : ""}`,
    style: { ["--rise" as string]: step, ...extraStyle } as CSSProperties,
  };
}

export default function HomePageClient() {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
  const [siteReady, setSiteReady] = useState(false);
  const [heroMotionReady, setHeroMotionReady] = useState(false);
  const [heroSoundPrompt, setHeroSoundPrompt] = useState(false);
  const [heroSoundPlayed, setHeroSoundPlayed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const heroWelcomeTried = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [aboutReveal, setAboutReveal] = useState(false);
  const [aboutCopyReady, setAboutCopyReady] = useState(false);
  const [linhActive, setLinhActive] = useState(0);
  const [linhPaused, setLinhPaused] = useState(false);
  const [linhReveal, setLinhReveal] = useState(false);
  const [caseActive, setCaseActive] = useState(0);
  const [caseReveal, setCaseReveal] = useState(false);
  const [caseTaglineReveal, setCaseTaglineReveal] = useState(false);
  const [voiceActive, setVoiceActive] = useState(0);
  const [voiceReveal, setVoiceReveal] = useState(false);
  const [blogs, setBlogs] = useState<NewsItem[]>([]);
  const [consultForm, setConsultForm] = useState(EMPTY_CONSULT_FORM);
  const [consultReveal, setConsultReveal] = useState(false);
  const [knowledgeReveal, setKnowledgeReveal] = useState(false);
  const [consultLoading, setConsultLoading] = useState(false);
  const [consultDone, setConsultDone] = useState(false);
  const [consultSummary, setConsultSummary] = useState("");
  const [nativeScroll, setNativeScroll] = useState(false);
  const consultDays = useMemo(() => getConsultDayOptions(4), []);
  const snapRef = useRef<HTMLDivElement>(null);
  const projectListRef = useRef<HTMLUListElement>(null);
  const caseScrollLock = useRef(false);
  const locking = useRef(false);
  const activeSectionRef = useRef(0);
  const nativeScrollRef = useRef(false);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchFromInnerScroll = useRef(false);
  const touchScrollPane = useRef<HTMLElement | null>(null);
  const { settings } = useAdmin();

  const sectionClass = useCallback(
    (index: number, extra = "") => {
      const isActive = activeSection === index;
      return [
        "corp-snap-section",
        extra,
        isActive ? "corp-snap-in corp-section-active" : "",
      ]
        .filter(Boolean)
        .join(" ");
    },
    [activeSection],
  );

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

  const featuredCases = useMemo(() => getFeaturedShowcases(), []);
  const voiceCases = useMemo(() => {
    return VOICE_ENTRIES.map((entry) => {
      const study = getCaseStudyBySlug(entry.slug);
      const logoCandidates = [study?.logo, study?.thumbnail, study?.heroImage].filter(Boolean) as string[];
      const logo =
        logoCandidates.find((src) => /\/logo\.(png|jpe?g|webp)/i.test(src)) ||
        logoCandidates.find((src) => !src.includes("gsc-performance")) ||
        CORP_HERO_SLIDES[0];
      const hasBrandLogo = Boolean(study?.logo) || /\/logo\.(png|jpe?g|webp)/i.test(logo);
      const logoFit = study?.logoFit ?? (hasBrandLogo ? "contain" : "cover");
      return {
        ...entry,
        clientName: (study?.clientName || entry.mark).replace(/^Hệ Thống\s+/i, ""),
        industryLabel: study?.industryLabel || "",
        logo,
        hasBrandLogo,
        logoFit,
        href: study ? `/du-an/${study.slug}` : "/du-an",
        websiteUrl: study?.websiteUrl,
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

  // Safety: nếu loading không gọi onComplete, vẫn mở site sau 8s
  useEffect(() => {
    if (!isClient) return undefined;
    const t = window.setTimeout(() => {
      setShowLoader(false);
      setSiteReady(true);
    }, 8000);
    return () => window.clearTimeout(t);
  }, [isClient]);

  // Báo chrome: loading logo xong → hiện prompt thông báo đẩy
  useEffect(() => {
    if (!siteReady) return;
    void import("@/lib/marketing-popup-gate").then((m) => m.markHomeReady());
  }, [siteReady]);

  // Hiệu ứng hero chỉ chạy sau khi loading xong + site đã hiện
  useEffect(() => {
    if (!siteReady) {
      setHeroMotionReady(false);
      return undefined;
    }
    ensureTypeClickAudio();
    // Nhạc chỉ khi đã vào site và đang ở section 1
    if (activeSection === 0) {
      setBgMusicSectionActive(true, 0.11);
      armBgMusicAutoStart(0.11);
      void startBgMusic(0.11);
    } else {
      setBgMusicSectionActive(false, 0.11);
    }
    const t = window.setTimeout(() => setHeroMotionReady(true), 100);
    return () => window.clearTimeout(t);
  }, [siteReady]);

  // Chỉ section 1 có nhạc nền spa — section khác tắt hẳn
  useEffect(() => {
    if (!siteReady) {
      setBgMusicSectionActive(false, 0.11);
      return;
    }
    const onHero = activeSection === 0;
    setBgMusicSectionActive(onHero, 0.11);
    if (onHero) {
      armBgMusicAutoStart(0.11);
      void startBgMusic(0.11);
    }
  }, [activeSection, siteReady]);

  // Section 1: jingle chào mừng (1 lần) + đảm bảo nhạc spa đang chạy
  useEffect(() => {
    if (!isClient) return;
    if (hasPlayedHeroWelcome()) {
      setHeroSoundPlayed(true);
      setHeroSoundPrompt(false);
      return;
    }
    if (!siteReady || !heroMotionReady || activeSection !== 0) return;
    if (heroWelcomeTried.current) return;

    let cancelled = false;
    const tryAuto = window.setTimeout(async () => {
      if (cancelled || heroWelcomeTried.current) return;
      setBgMusicSectionActive(true, 0.11);
      await startBgMusic(0.11);
      const unlocked = await unlockHeroAudio();
      if (unlocked) {
        heroWelcomeTried.current = true;
        const ok = await playHeroWelcomeExperience({ brandName });
        if (ok) {
          setHeroSoundPlayed(true);
          setHeroSoundPrompt(false);
          return;
        }
      }
      if (!cancelled) setHeroSoundPrompt(true);
    }, 500);

    return () => {
      cancelled = true;
      window.clearTimeout(tryAuto);
    };
  }, [isClient, siteReady, heroMotionReady, activeSection, brandName]);

  // Rời section 1 → dừng giọng chào (nhạc đã fade bởi setBgMusicSectionActive)
  useEffect(() => {
    if (activeSection !== 0) stopHeroWelcomeSpeech();
  }, [activeSection]);

  const enableHeroWelcomeSound = useCallback(async () => {
    heroWelcomeTried.current = true;
    await unlockHeroAudio();
    ensureTypeClickAudio();
    setBgMusicSectionActive(true, 0.11);
    await startBgMusic(0.11);
    const ok = await playHeroWelcomeExperience({
      skipIfPlayed: false,
      brandName,
    });
    setHeroSoundPlayed(true);
    setHeroSoundPrompt(false);
    return ok;
  }, [brandName]);

  useEffect(() => {
    // Full-section snap mọi thiết bị — kiểu Vinh Phát
    nativeScrollRef.current = false;
    setNativeScroll(false);
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("corp-home-snap-active");
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("corp-home-snap-active");
    };
  }, []);

  useEffect(() => {
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
    const html = document.documentElement;
    if (nativeScroll) html.classList.add("corp-home-smooth");
    else html.classList.remove("corp-home-smooth");
    return () => {
      style.remove();
      html.classList.remove("corp-home-smooth");
    };
  }, [nativeScroll]);

  useEffect(() => {
    void db.news.getAll().then((newsResult) => {
      setBlogs(newsResult.data || []);
    });
  }, []);

  useEffect(() => {
    if (heroSlides.length < 2) return;
    const t = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlides.length);
    }, 9000);
    return () => window.clearInterval(t);
  }, [heroSlides.length]);

  // Cả 3 thiết bị cùng khung — hiện lần lượt (stagger) khi vào Giới thiệu
  useEffect(() => {
    if (activeSection !== 1) {
      setAboutReveal(false);
      setAboutCopyReady(false);
      return;
    }
    const t = window.setTimeout(() => setAboutReveal(true), 80);
    return () => window.clearTimeout(t);
  }, [activeSection]);

  // Chữ body hiện sau khi laptop kéo xong
  useEffect(() => {
    if (!aboutReveal) {
      setAboutCopyReady(false);
      return;
    }
    const t = window.setTimeout(() => setAboutCopyReady(true), ABOUT_LAPTOP_DONE_MS);
    return () => window.clearTimeout(t);
  }, [aboutReveal]);

  // Giới thiệu: âm khi phone → laptop xuất hiện + ô chữ
  useEffect(() => {
    if (!aboutReveal || settings.softSoundsEnabled === false) return;
    ensureUiAudio();
    const scale = Math.min(1.2, Math.max(0.7, (settings.softSoundsVolume ?? 0.05) / 0.05));
    return scheduleAppearSounds(
      [
        { delayMs: 40, kind: "device" },
        { delayMs: 40 + ABOUT_DEVICES[1].delayMs, kind: "device" },
        { delayMs: ABOUT_LAPTOP_DONE_MS + 40, kind: "box" },
        { delayMs: ABOUT_LAPTOP_DONE_MS + 180, kind: "box" },
        { delayMs: ABOUT_LAPTOP_DONE_MS + 320, kind: "box" },
        { delayMs: ABOUT_LAPTOP_DONE_MS + 480, kind: "box" },
      ],
      scale,
    );
  }, [aboutReveal, settings.softSoundsEnabled, settings.softSoundsVolume]);

  // Lĩnh vực: bật reveal để 3 card nhảy lần lượt (giữa → trái → phải)
  useEffect(() => {
    if (activeSection !== 2) {
      setLinhReveal(false);
      return;
    }
    const t = window.setTimeout(() => setLinhReveal(true), 60);
    return () => window.clearTimeout(t);
  }, [activeSection]);

  // Lĩnh vực: âm 3 ô card xuất hiện
  useEffect(() => {
    if (!linhReveal || settings.softSoundsEnabled === false) return;
    ensureUiAudio();
    const scale = Math.min(1.2, Math.max(0.7, (settings.softSoundsVolume ?? 0.05) / 0.05));
    return scheduleAppearSounds(
      [
        { delayMs: 150, kind: "box" },
        { delayMs: 150 + 320, kind: "box" },
        { delayMs: 150 + 640, kind: "box" },
      ],
      scale,
    );
  }, [linhReveal, settings.softSoundsEnabled, settings.softSoundsVolume]);

  // Lĩnh vực: xoay thẻ sau khi 3 card hiện lần lượt xong (dừng khi hover)
  useEffect(() => {
    if (activeSection !== 2) {
      setLinhPaused(false);
      return;
    }
    if (linhPaused) return;
    let intervalId: number | null = null;
    const startT = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setLinhActive((i) => (i + 1) % LINH_VUC.length);
      }, 3400);
    }, 1800);
    return () => {
      window.clearTimeout(startT);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [activeSection, linhPaused]);

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
    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, index));

    if (nativeScrollRef.current) {
      const id = SECTIONS[clamped]?.id;
      const target = id ? document.getElementById(id) : null;
      activeSectionRef.current = clamped;
      setActiveSection(clamped);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (locking.current) return;
    if (clamped === activeSectionRef.current) return;

    locking.current = true;
    activeSectionRef.current = clamped;
    setActiveSection(clamped);

    if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    unlockTimerRef.current = setTimeout(() => {
      locking.current = false;
      unlockTimerRef.current = null;
    }, 720);
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
    document.documentElement.dataset.homeSection = SECTIONS[activeSection]?.id ?? "";
  }, [activeSection]);

  useEffect(() => {
    return () => {
      delete document.documentElement.dataset.homeSection;
    };
  }, []);

  useEffect(() => {
    if (SECTIONS[activeSection]?.id !== "du-an") {
      setCaseReveal(false);
      setCaseTaglineReveal(false);
      return;
    }
    setCaseActive(0);
    const revealT = window.setTimeout(() => setCaseReveal(true), 60);
    const tagT = window.setTimeout(
      () => setCaseTaglineReveal(true),
      180 + featuredCases.length * 280 + 400,
    );
    return () => {
      window.clearTimeout(revealT);
      window.clearTimeout(tagT);
    };
  }, [activeSection, featuredCases.length]);

  // Dự án: khi list hiện lần lượt — đồng bộ ảnh bên phải theo từng mục, rồi về mục đầu
  useEffect(() => {
    if (!caseReveal || SECTIONS[activeSection]?.id !== "du-an") return;
    const timers = featuredCases.map((_, i) =>
      window.setTimeout(() => setCaseActive(i), 120 + i * 280),
    );
    const backT = window.setTimeout(
      () => setCaseActive(0),
      120 + Math.max(featuredCases.length - 1, 0) * 280 + 700,
    );
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(backT);
    };
  }, [caseReveal, activeSection, featuredCases.length]);

  // Dự án: âm từng ô list + khung mockup
  useEffect(() => {
    if (!caseReveal || settings.softSoundsEnabled === false) return;
    ensureUiAudio();
    const scale = Math.min(1.2, Math.max(0.7, (settings.softSoundsVolume ?? 0.05) / 0.05));
    const n = Math.min(featuredCases.length, 8);
    const items: { delayMs: number; kind: "device" | "box" }[] = [
      { delayMs: 180, kind: "device" },
      ...Array.from({ length: n }, (_, i) => ({
        delayMs: 100 + i * 280,
        kind: "box" as const,
      })),
    ];
    return scheduleAppearSounds(items, scale);
  }, [caseReveal, featuredCases.length, settings.softSoundsEnabled, settings.softSoundsVolume]);

  useEffect(() => {
    if (SECTIONS[activeSection]?.id !== "tieng-noi") {
      setVoiceReveal(false);
      return;
    }
    setVoiceReveal(false);
    const revealT = window.setTimeout(() => setVoiceReveal(true), 80);
    return () => window.clearTimeout(revealT);
  }, [activeSection]);

  useEffect(() => {
    if (SECTIONS[activeSection]?.id !== "tieng-noi") return;
    setVoiceReveal(false);
    const t = window.setTimeout(() => setVoiceReveal(true), 40);
    return () => window.clearTimeout(t);
  }, [voiceActive, activeSection]);

  // Tiếng nói: âm ô / logo
  useEffect(() => {
    if (!voiceReveal || settings.softSoundsEnabled === false) return;
    ensureUiAudio();
    const scale = Math.min(1.2, Math.max(0.7, (settings.softSoundsVolume ?? 0.05) / 0.05));
    return scheduleAppearSounds(
      [
        { delayMs: 80, kind: "box" },
        { delayMs: 220, kind: "box" },
        { delayMs: 380, kind: "box" },
      ],
      scale,
    );
  }, [voiceReveal, settings.softSoundsEnabled, settings.softSoundsVolume]);

  useEffect(() => {
    if (SECTIONS[activeSection]?.id !== "tu-van") {
      setConsultReveal(false);
      return;
    }
    const t = window.setTimeout(() => setConsultReveal(true), 60);
    return () => window.clearTimeout(t);
  }, [activeSection]);

  // Tư vấn: âm ô ngày/giờ + input
  useEffect(() => {
    if (!consultReveal || settings.softSoundsEnabled === false) return;
    ensureUiAudio();
    const scale = Math.min(1.2, Math.max(0.7, (settings.softSoundsVolume ?? 0.05) / 0.05));
    const daySounds = Array.from({ length: 4 }, (_, i) => ({
      delayMs: 120 + i * 110,
      kind: "box" as const,
    }));
    const slotSounds = Array.from({ length: 3 }, (_, i) => ({
      delayMs: 120 + 4 * 110 + 50 + i * 110,
      kind: "box" as const,
    }));
    const fieldSounds = Array.from({ length: 5 }, (_, i) => ({
      delayMs: 140 + i * 110,
      kind: "box" as const,
    }));
    // Ô trái (ngày/giờ) rồi ô phải (input) — lệch pha để không chồng
    return scheduleAppearSounds(
      [
        ...daySounds,
        ...slotSounds,
        ...fieldSounds.map((item, i) => ({
          ...item,
          delayMs: 520 + i * 100,
        })),
        { delayMs: 1080, kind: "box" },
      ],
      scale,
    );
  }, [consultReveal, settings.softSoundsEnabled, settings.softSoundsVolume]);

  useEffect(() => {
    if (SECTIONS[activeSection]?.id !== "kien-thuc") {
      setKnowledgeReveal(false);
      return;
    }
    const t = window.setTimeout(() => setKnowledgeReveal(true), 60);
    return () => window.clearTimeout(t);
  }, [activeSection]);

  // Kiến thức: âm ô lớn + ô nhỏ
  useEffect(() => {
    if (!knowledgeReveal || settings.softSoundsEnabled === false) return;
    ensureUiAudio();
    const scale = Math.min(1.2, Math.max(0.7, (settings.softSoundsVolume ?? 0.05) / 0.05));
    return scheduleAppearSounds(
      [
        { delayMs: 180, kind: "box" },
        { delayMs: 720, kind: "box" },
        { delayMs: 720 + 160, kind: "box" },
        { delayMs: 720 + 320, kind: "box" },
      ],
      scale,
    );
  }, [knowledgeReveal, settings.softSoundsEnabled, settings.softSoundsVolume]);

  // Mobile native: theo dõi section đang xem
  useEffect(() => {
    if (!nativeScroll) return;

    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (n): n is HTMLElement => Boolean(n),
    );
    if (!nodes.length) return;

    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId: string = SECTIONS[0].id;
        let bestRatio = -1;
        for (const s of SECTIONS) {
          const r = ratios.get(s.id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = s.id;
          }
        }
        const index = SECTIONS.findIndex((s) => s.id === bestId);
        if (index < 0 || index === activeSectionRef.current) return;
        activeSectionRef.current = index;
        setActiveSection(index);
      },
      { threshold: [0.15, 0.3, 0.45, 0.6, 0.75], rootMargin: "-8% 0px -28% 0px" },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [nativeScroll]);

  // Desktop/tablet/mobile snap: wheel / touch → đổi full section
  useEffect(() => {
    if (nativeScroll) return;

    const onWheel = (e: WheelEvent) => {
      if (menuOpen) return;
      const t = e.target as HTMLElement | null;
      const pane = t?.closest?.("[data-project-scroll]") as HTMLElement | null;
      if (pane) {
        const { scrollTop, scrollHeight, clientHeight } = pane;
        const canUp = scrollTop > 4;
        const canDown = scrollTop + clientHeight < scrollHeight - 4;
        if ((e.deltaY < 0 && canUp) || (e.deltaY > 0 && canDown)) {
          return;
        }
      }
      e.preventDefault();
      if (locking.current) return;
      if (Math.abs(e.deltaY) < 10) return;
      goToSection(activeSectionRef.current + (e.deltaY > 0 ? 1 : -1));
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
      const t = e.target as HTMLElement | null;
      const pane = (t?.closest?.("[data-project-scroll]") as HTMLElement | null) ?? null;
      const hScrollOnly = Boolean(t?.closest?.("[data-h-scroll]")) && !pane;
      touchScrollPane.current = pane;
      // true = cho native scroll (pane nội bộ hoặc hàng ngang)
      touchFromInnerScroll.current = Boolean(pane || hScrollOnly);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchFromInnerScroll.current) return;
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (menuOpen || locking.current) return;
      const start = touchStartY.current;
      const fromInner = touchFromInnerScroll.current;
      const pane = touchScrollPane.current;
      touchStartY.current = null;
      touchFromInnerScroll.current = false;
      touchScrollPane.current = null;
      if (start == null) return;
      const end = e.changedTouches[0]?.clientY;
      if (end == null) return;
      const dy = start - end;
      if (Math.abs(dy) < 40) return;

      // Vuốt trong vùng cuộn nội bộ: chỉ đổi section khi đã chạm mép
      if (fromInner) {
        if (!pane) return; // data-h-scroll ngang — không đổi section
        const { scrollTop, scrollHeight, clientHeight } = pane;
        const atTop = scrollTop <= 4;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 4;
        const goingNext = dy > 0; // vuốt lên → section sau
        if ((goingNext && !atBottom) || (!goingNext && !atTop)) return;
      }

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

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    };
  }, [goToSection, menuOpen, nativeScroll]);

  useEffect(() => {
    if (!nativeScroll) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (menuOpen) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (["ArrowDown", "PageDown"].includes(e.key)) {
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
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToSection, menuOpen, nativeScroll]);

  useEffect(() => {
    const onGoSection = (e: Event) => {
      const id = (e as CustomEvent<{ id?: string }>).detail?.id;
      if (!id) return;
      const index = SECTIONS.findIndex((s) => s.id === id);
      if (index >= 0) goToSection(index);
    };
    window.addEventListener("corp-go-section", onGoSection);
    return () => window.removeEventListener("corp-go-section", onGoSection);
  }, [goToSection]);

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
        className={`corp-home z-[1] bg-slate-950 text-white transition-opacity duration-500 ${
          nativeScroll ? "corp-home--native-scroll" : "corp-home--snap fixed inset-0"
        }`}
        style={{ opacity: siteReady ? 1 : 0, pointerEvents: siteReady ? "auto" : "none" }}
      >
        {/* Fixed chrome */}
        <header
          className={`pointer-events-none inset-x-0 top-0 z-40 ${
            nativeScroll ? "fixed" : "absolute"
          }`}
        >
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
                className={`corp-hotline ${headerLight ? "corp-hotline--light" : "corp-hotline--dark"} ${
                  heroMotionReady ? "corp-hotline--blink-after" : ""
                }`}
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
                className={`h-2.5 w-2.5 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  activeSection === i
                    ? "scale-125 border-violet-500 bg-violet-600 shadow-[0_0_0_4px_rgba(139,92,246,0.25)]"
                    : `${dotIdle} group-hover:opacity-80`
                }`}
              />
              <span
                className={`hidden text-[10px] font-semibold tracking-[0.18em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:inline ${
                  activeSection === i
                    ? headerLight
                      ? "translate-x-0 text-violet-700 opacity-100"
                      : "translate-x-0 text-violet-200 opacity-100"
                    : `${dotLabelIdle} -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100`
                }`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Desktop: snap full-section. Mobile: cuộn native */}
        <div
          ref={snapRef}
          className={`corp-snap ${nativeScroll ? "corp-snap--native" : "h-full overflow-hidden"}`}
        >
          <div
            className={`corp-snap-track ${nativeScroll ? "" : "will-change-transform"}`}
            style={
              nativeScroll
                ? undefined
                : { transform: `translate3d(0, ${-activeSection * 100}%, 0)` }
            }
          >
          {/* 1 — Hero */}
          <section
            id="but-pha"
            className={sectionClass(0, "relative flex flex-col items-center justify-center overflow-hidden")}
          >
            {heroSlides.map((src, i) => {
              const active = i === heroIndex;
              return (
              <div
                key={src}
                className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${active ? "opacity-100" : "opacity-0"}`}
              >
                <MotionConfig reducedMotion="never">
                  <motion.img
                    key={active ? `hero-zoom-${heroIndex}-${src}` : `hero-idle-${src}`}
                    src={src}
                    alt=""
                    className="home-hero-kenburns"
                    initial={{ scale: 1 }}
                    animate={{ scale: active ? 1.2 : 1 }}
                    transition={
                      active
                        ? { duration: 9, ease: "linear" }
                        : { duration: 0 }
                    }
                  />
                </MotionConfig>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/45 to-slate-950/70" />
              </div>
              );
            })}
            <HomeAtomField />

            <MotionConfig reducedMotion="never">
            <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-16 pt-20 text-center sm:px-8 sm:pb-20">
              <HeroRevealText
                as="h1"
                text="Bứt Phá Marketing"
                className="corp-display-hero drop-shadow-sm"
                play={heroMotionReady}
                startDelayMs={40}
                stepMs={26}
              />
              <motion.p
                className="mt-3 max-w-sm text-[12px] font-light leading-relaxed tracking-[0.14em] text-white/80 sm:mt-4 sm:max-w-xl sm:text-sm sm:tracking-[0.22em]"
                initial={{ opacity: 0, y: 28 }}
                animate={heroMotionReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                transition={{ duration: 0.65, delay: heroMotionReady ? 0.95 : 0, ease: [0.22, 1, 0.36, 1] }}
              >
                Kết nối thương hiệu — Tăng trưởng bền vững
              </motion.p>
              <div className="mt-7 flex w-full max-w-sm flex-col gap-2.5 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center sm:gap-3">
                <motion.div
                  className="w-full sm:w-auto"
                  initial={{ opacity: 0, x: -48 }}
                  animate={heroMotionReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -48 }}
                  transition={{ duration: 0.65, delay: heroMotionReady ? 1.2 : 0, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href="/banggia"
                    className="corp-cta corp-cta-hero-primary inline-flex w-full items-center justify-center rounded-md bg-violet-600 px-6 py-3.5 text-white shadow-lg shadow-violet-900/35 sm:px-7"
                  >
                    Bảng giá dịch vụ
                  </Link>
                </motion.div>
                <motion.div
                  className="w-full sm:w-auto"
                  initial={{ opacity: 0, x: 48 }}
                  animate={heroMotionReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 48 }}
                  transition={{ duration: 0.65, delay: heroMotionReady ? 1.35 : 0, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => goToSection(consultSectionIndex)}
                    className="corp-cta corp-cta-hero-secondary inline-flex w-full items-center justify-center rounded-md border border-white/70 bg-transparent px-6 py-3.5 text-white sm:px-7"
                  >
                    Đặt lịch tư vấn
                  </button>
                </motion.div>
              </div>
              <motion.div
                className="mt-8 flex justify-center sm:mt-10"
                initial={{ opacity: 0 }}
                animate={heroMotionReady ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: heroMotionReady ? 1.55 : 0 }}
              >
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent sm:w-[5.5rem]" />
              </motion.div>
            </div>

            <div className="absolute bottom-5 left-1/2 z-20 flex w-full max-w-xs -translate-x-1/2 flex-col items-center gap-3 sm:bottom-7">
              {heroSoundPrompt && activeSection === 0 ? (
                <motion.button
                  type="button"
                  onClick={() => void enableHeroWelcomeSound()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-3.5 py-2 text-[11px] font-medium tracking-wide text-white/95 shadow-lg backdrop-blur-md transition hover:border-violet-300/50 hover:bg-violet-600/35 sm:text-[12px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 }}
                  aria-label="Bật âm thanh chào mừng"
                >
                  <Volume2 className="h-3.5 w-3.5 text-violet-200" strokeWidth={1.75} />
                  Bật âm thanh chào
                </motion.button>
              ) : null}
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
              <motion.button
                type="button"
                onClick={() => goToSection(1)}
                className={`corp-scroll-hint ${heroMotionReady ? "corp-scroll-hint--blink" : ""}`}
                aria-label="Lướt xuống phần tiếp theo"
                initial={{ opacity: 0 }}
                animate={heroMotionReady ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.45, delay: heroMotionReady ? 1.7 : 0 }}
              >
                <span className="corp-scroll-hint-label">Lướt xuống</span>
                <span className="corp-scroll-hint-icon" aria-hidden>
                  <ChevronDown className="h-5 w-5" strokeWidth={2} />
                </span>
              </motion.button>
            </div>
            </MotionConfig>
          </section>

          {/* 2 — Giới thiệu: so deep + ảnh nền · 3 thiết bị trái · chữ phải */}
          <section
            id="gioi-thieu"
            className={sectionClass(1, "relative flex overflow-hidden text-white")}
          >
            {/* Nền tím deep + skyline — giữ rõ màu, không crush đen */}
            <div className="pointer-events-none absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ABOUT_CITY_BG}
                alt=""
                className="corp-parallax-bg h-full w-full object-cover object-[center_40%] opacity-100"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 95% 60% at 48% 0%, rgba(196,149,90,0.22), transparent 55%), radial-gradient(ellipse 55% 50% at 88% 18%, rgba(155,140,255,0.28), transparent 58%), radial-gradient(ellipse 70% 55% at 50% 45%, rgba(91,77,184,0.18), transparent 65%), linear-gradient(165deg, rgba(26,20,56,0.22) 0%, rgba(18,14,40,0.28) 50%, rgba(12,10,28,0.45) 100%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1438]/45 via-transparent to-[#1a1438]/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120e28]/55 via-transparent to-[#1a1438]/30" />
              <div className="absolute inset-y-0 right-0 w-[42%] bg-gradient-to-l from-[#1a1438]/40 via-[#1a1438]/15 to-transparent sm:w-[48%]" />
            </div>

            <div className="relative z-10 mx-auto flex h-full w-full max-w-[1280px] flex-col justify-center gap-5 px-5 pb-10 pt-[4.75rem] sm:gap-6 sm:px-8 sm:pb-12 sm:pt-20 md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-4 md:px-8 md:pb-14 md:pt-16 lg:gap-2 lg:px-10 lg:pb-16 lg:pt-20 xl:gap-4 xl:pl-16">
              {/* Devices — mobile: dưới chữ · desktop: cột trái */}
              <div className="relative order-2 mx-auto flex h-[min(52vw,240px)] w-full max-w-[22rem] min-h-0 shrink-0 flex-col sm:h-[min(48vw,300px)] sm:max-w-md md:order-1 md:mx-0 md:h-[min(68vh,560px)] md:max-w-none lg:h-[min(72vh,620px)]">
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
                          : "-translate-x-8 opacity-0 sm:-translate-x-20 md:-translate-x-28"
                      }`}
                      style={{ transitionDelay: aboutReveal ? `${device.delayMs}ms` : "0ms" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`${device.src}?v=bpm3`} alt={device.alt} className={device.img} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Chữ — mobile: trên · desktop: cột phải */}
              <div className="relative z-20 order-1 w-full min-w-0 self-center text-left md:order-2 xl:max-w-[34rem]">
                <p {...riseProps(0, "flex items-center gap-2 sm:gap-3")}>
                  <span
                    className="h-[1.5px] w-5 rounded-full bg-gradient-to-r from-transparent via-amber-200/80 to-violet-400 sm:w-8"
                    aria-hidden
                  />
                  <span
                    className="bg-gradient-to-r from-amber-200 via-violet-300 to-violet-200 bg-clip-text text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-transparent sm:text-[1.05rem] sm:tracking-[0.32em]"
                    style={{ fontFamily: '"Cormorant Garamond", "Be Vietnam Pro", Georgia, serif' }}
                  >
                    Về chúng tôi
                  </span>
                </p>

                <h2
                  {...riseProps(1, "mt-2 text-balance text-white sm:mt-3", {
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 600,
                    fontSize: "clamp(1.45rem, 5.2vw, 2.35rem)",
                    lineHeight: 1.22,
                    letterSpacing: "-0.02em",
                  })}
                >
                  Đồng hành doanh nghiệp phát triển khách hàng trên nền tảng số
                </h2>

                <p
                  {...riseProps(
                    2,
                    "mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-violet-300/85 sm:mt-3 sm:text-[12px]",
                    { fontFamily: '"Be Vietnam Pro", system-ui, sans-serif' }
                  )}
                >
                  Website · Facebook · Google Maps
                </p>

                <div
                  {...riseProps(3, "mt-3 space-y-2 text-pretty text-white/70 sm:mt-4 sm:space-y-3", {
                    fontFamily: '"Be Vietnam Pro", system-ui, sans-serif',
                    fontSize: "clamp(0.9rem, 3.4vw, 1.02rem)",
                    fontWeight: 400,
                    lineHeight: 1.6,
                  })}
                >
                  <MotionConfig reducedMotion="never">
                    <HeroRevealText
                      as="p"
                      text={ABOUT_COPY_P1}
                      play={aboutCopyReady}
                      startDelayMs={0}
                      stepMs={ABOUT_COPY_STEP_MS}
                    />
                    <HeroRevealText
                      as="p"
                      text={ABOUT_COPY_P2}
                      className="hidden sm:block"
                      play={aboutCopyReady}
                      startDelayMs={ABOUT_COPY_P1.length * ABOUT_COPY_STEP_MS + 180}
                      stepMs={ABOUT_COPY_STEP_MS}
                    />
                  </MotionConfig>
                </div>

                <div {...riseProps(4, "mt-4 sm:mt-5")}>
                  <Link
                    href="/gioi-thieu"
                    className="corp-cta inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-200 to-violet-300 px-5 py-2.5 text-[12px] font-semibold text-[#0b0d12] shadow-lg shadow-violet-950/30 transition hover:brightness-105 sm:px-7 sm:py-3 sm:text-sm"
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
            className={sectionClass(2, "relative flex flex-col overflow-hidden text-white")}
          >
            <div className="pointer-events-none absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LINH_VUC_BG}
                alt=""
                className="corp-parallax-bg h-full w-full scale-110 object-cover object-[center_30%] opacity-50 saturate-[0.65] contrast-[1.08]"
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

            <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-start gap-4 px-4 pb-6 pt-[4.5rem] sm:gap-6 sm:px-8 sm:pb-10 sm:pt-24 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-center lg:justify-center lg:gap-10 lg:px-14 lg:pb-8 lg:pt-20 xl:gap-14 xl:pl-28">
              <div
                {...riseProps(
                  0,
                  "relative z-30 mx-auto w-full max-w-lg shrink-0 text-center lg:mx-0 lg:max-w-none lg:pl-10 lg:text-left xl:pl-14"
                )}
              >
                <p className="flex items-center justify-center gap-3 lg:justify-start">
                  <span className="hidden h-px w-8 bg-gradient-to-r from-transparent to-violet-300/80 sm:block" aria-hidden />
                  <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-violet-200 sm:text-xs">
                    Dịch vụ
                  </span>
                  <span className="hidden h-px w-8 bg-gradient-to-l from-transparent to-violet-300/80 lg:hidden sm:block" aria-hidden />
                </p>
                <h2
                  className="mt-1 text-balance text-white sm:mt-3"
                  style={{
                    fontFamily: '"Be Vietnam Pro", system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: "clamp(1.35rem, 3.8vw, 3rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                    textShadow: "0 1px 2px rgba(0,0,0,0.55)",
                    WebkitFontSmoothing: "antialiased",
                  }}
                >
                  Lĩnh vực hoạt động
                </h2>
                <MotionConfig reducedMotion="never">
                  <HeroRevealText
                    as="p"
                    text="Ba mũi nhọn giúp doanh nghiệp hiện diện đúng nơi khách đang quyết định"
                    play={activeSection === 2}
                    startDelayMs={280}
                    stepMs={24}
                    className="mx-auto mt-2 max-w-md text-[12px] font-light leading-relaxed text-white/70 sm:mt-3 sm:text-[14px] lg:mx-0 lg:text-[15px]"
                    style={{ fontFamily: '"Be Vietnam Pro", system-ui, sans-serif' }}
                  />
                </MotionConfig>
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

              {/* Mobile + Desktop: coverflow — thẻ nhỏ hơn trên mobile/laptop */}
              <div
                className="relative z-10 mt-1 flex w-full min-w-0 flex-1 flex-col items-center justify-center sm:mt-0 lg:mt-0 lg:h-[min(52vh,400px)] lg:flex-none lg:items-stretch xl:h-[min(56vh,460px)]"
                onMouseEnter={() => setLinhPaused(true)}
                onMouseLeave={() => setLinhPaused(false)}
              >
                <div className="relative mx-auto flex h-[min(38dvh,268px)] w-full max-w-xl items-center gap-0.5 px-1 sm:h-[min(48dvh,360px)] sm:max-w-2xl sm:gap-2 sm:px-0 lg:h-full lg:max-w-[520px] lg:gap-2 xl:max-w-[560px]">
                  <button
                    type="button"
                    onClick={() => setLinhActive((i) => (i - 1 + LINH_VUC.length) % LINH_VUC.length)}
                    className="z-40 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white shadow-lg backdrop-blur-md sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                    aria-label="Thẻ trước"
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
                  </button>

                  <div className="relative mx-auto h-full min-w-0 flex-1 max-w-[280px] perspective-[1200px] sm:max-w-[480px] lg:max-w-[440px] xl:max-w-[500px]">
                    <MotionConfig reducedMotion="never">
                      {LINH_VUC.map((item, i) => {
                        const d = linhVucCardOffset(i, linhActive);
                        const isActive = d === 0;
                        const enterOrder = d === 0 ? 0 : d === -1 ? 1 : 2;
                        return (
                          <div
                            key={item.num}
                            className={`corp-linh-card absolute left-1/2 top-1/2 transition-[transform,filter,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                              isActive
                                ? "corp-linh-card--active z-30 opacity-100 brightness-100"
                                : "corp-linh-card--side z-10 opacity-80 brightness-[0.8] saturate-[0.8]"
                            }`}
                            style={{
                              transform: isActive
                                ? "translate(-50%, -54%) scale(1)"
                                : d === 1
                                  ? "translate(18%, -50%) scale(0.86)"
                                  : "translate(-118%, -50%) scale(0.86)",
                            }}
                          >
                            <motion.div
                              className="h-full w-full"
                              initial={false}
                              animate={
                                linhReveal
                                  ? { opacity: 1, y: 0, scale: 1 }
                                  : { opacity: 0, y: 100, scale: 0.9 }
                              }
                              transition={{
                                duration: linhReveal ? 0.85 : 0.28,
                                delay: linhReveal ? 0.15 + enterOrder * 0.32 : 0,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              style={{
                                boxShadow: isActive
                                  ? `0 14px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08), 0 0 32px ${item.glow}, 0 0 64px ${item.glow}`
                                  : `0 8px 24px rgba(0,0,0,0.3), 0 0 20px ${item.glowSoft}, 0 0 40px ${item.glowSoft}`,
                                borderRadius: "inherit",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  if (isActive) router.push(item.href);
                                  else setLinhActive(i);
                                }}
                                className="group relative h-full w-full rounded-2xl text-center"
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
                                    <div className="absolute inset-x-0 bottom-0 px-3 pb-4 pt-8 text-center sm:px-5 sm:pb-6 sm:pt-10">
                                      <h3
                                        className="inline-flex rounded-full border border-white/20 bg-[#1a1030]/92 px-3 py-1 text-[0.72rem] font-bold tracking-wide text-white sm:px-4 sm:py-1.5 sm:text-[0.88rem]"
                                        style={{
                                          fontFamily: '"Be Vietnam Pro", system-ui, sans-serif',
                                          fontWeight: 700,
                                          color: "#ffffff",
                                          textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                                        }}
                                      >
                                        {item.title}
                                      </h3>
                                      <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                                        <div className="overflow-hidden">
                                          <p
                                            className="mx-auto mt-2 max-w-[12.5rem] text-[11px] font-normal leading-[1.6] tracking-wide text-white/85 sm:mt-3 sm:max-w-[15rem] sm:text-[12.5px]"
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
                            </motion.div>
                          </div>
                        );
                      })}
                    </MotionConfig>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLinhActive((i) => (i + 1) % LINH_VUC.length)}
                    className="z-40 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white shadow-lg backdrop-blur-md sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                    aria-label="Thẻ sau"
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 4 — Dự án: tiêu đề giữa + list cuộn trái + ảnh phải */}
          <section
            id="du-an"
            className={sectionClass(3, "relative flex flex-col overflow-hidden text-white")}
          >
            <div className="pointer-events-none absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={DU_AN_BG}
                alt=""
                className="corp-parallax-bg h-full w-full object-cover object-[center_40%] opacity-40 saturate-[0.65]"
              />
              <div className="absolute inset-0 bg-[#070b16]/82" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070b16]/95 via-[#070b16]/70 to-[#070b16]/45" />
            </div>

            <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl -translate-y-3 flex-col justify-center px-4 pb-6 pt-[2.75rem] sm:translate-y-0 sm:justify-start sm:px-8 sm:pb-4 sm:pt-20 lg:px-12 lg:pl-20 xl:pl-28">
              <h2
                {...riseProps(0, "mx-auto -mt-1 w-full shrink-0 text-center text-white sm:mt-0", {
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 600,
                  fontSize: "clamp(1.4rem, 3.6vw, 2.5rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                })}
              >
                Dự án tiêu biểu
              </h2>

              <div className="mt-4 grid min-h-0 w-full shrink-0 grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] items-center gap-3 sm:mt-5 sm:grid-cols-[minmax(200px,0.8fr)_minmax(0,1.45fr)] sm:gap-6 md:gap-8 lg:gap-10">
                {/* Trái — từng dự án hiện lần lượt từ trên xuống */}
                <div className="relative z-20 flex min-h-0 min-w-0 flex-col self-stretch">
                  <MotionConfig reducedMotion="never">
                    <ul
                      ref={projectListRef}
                      data-project-scroll
                      onScroll={onProjectListScroll}
                      className="corp-project-scroll corp-project-scroll--left-bar h-[min(42vh,17rem)] space-y-0 overflow-y-scroll overscroll-contain pl-2 sm:h-[min(52vh,22rem)] sm:space-y-0.5 sm:pl-3 md:h-[min(56vh,24rem)]"
                    >
                      {featuredCases.map((c, i) => {
                        const on = i === caseActive;
                        return (
                          <motion.li
                            key={c.id}
                            data-case-index={i}
                            initial={false}
                            animate={
                              caseReveal
                                ? { opacity: 1, y: 0, x: 0 }
                                : { opacity: 0, y: 28, x: -16 }
                            }
                            transition={{
                              duration: caseReveal ? 0.58 : 0.22,
                              delay: caseReveal ? 0.1 + i * 0.28 : 0,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
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
                                  {c.title}
                                </span>
                                <span
                                  className={`mt-0.5 hidden text-[11px] tracking-wide transition sm:block ${
                                    on ? "text-violet-200/85" : "text-white/30"
                                  }`}
                                >
                                  {c.kind === "fanpage" ? "Chăm sóc Fanpage" : "Thiết kế Website"}
                                </span>
                              </span>
                            </button>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </MotionConfig>
                </div>

                {/* Phải — khung mockup 3:2 khớp ảnh thiết kế */}
                <div className="relative z-10 flex min-h-0 min-w-0 flex-col items-center justify-center gap-2.5 sm:gap-3">
                  <motion.div
                    className="corp-project-frame relative w-full overflow-hidden rounded-2xl bg-[#0b0f18] ring-1 ring-white/12 sm:rounded-[1.35rem] lg:rounded-[1.5rem]"
                    initial={false}
                    animate={
                      caseReveal
                        ? { opacity: 1, x: 0, scale: 1 }
                        : { opacity: 0, x: 36, scale: 0.96 }
                    }
                    transition={{
                      duration: 0.7,
                      delay: caseReveal ? 0.18 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {featuredCases.map((c, i) => {
                      const on = i === caseActive;
                      return (
                        <div
                          key={c.id}
                          className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                            on ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={c.imageSrc}
                            alt={c.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      );
                    })}
                  </motion.div>

                  {activeCase ? (
                    <motion.a
                      initial={false}
                      animate={
                        caseReveal
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 16 }
                      }
                      transition={{
                        duration: 0.5,
                        delay: caseReveal ? 0.35 : 0,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="corp-cta mt-0 inline-flex items-center justify-center gap-1.5 rounded-md bg-violet-600 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500 sm:gap-2 sm:rounded-lg sm:px-5 sm:py-2.5 sm:text-sm sm:normal-case sm:tracking-normal"
                      href={activeCase.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {activeCase.ctaLabel}
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </motion.a>
                  ) : null}
                </div>
              </div>

              <HeroRevealText
                as="p"
                text="Cùng Bứt Phá Marketing kiến tạo thương hiệu, chinh phục khách hàng và tăng trưởng bền vững."
                play={caseTaglineReveal}
                startDelayMs={120}
                stepMs={28}
                className="mx-auto mt-4 w-full max-w-2xl shrink-0 px-2 pb-2 text-center text-[12.5px] font-light leading-snug tracking-wide text-white/65 sm:mt-auto sm:pb-1 sm:pt-4 sm:text-[13px]"
              />
            </div>
          </section>

          {/* 5 — Đặt lịch tư vấn: ngày/giờ trái · form phải */}
          <section
            id="tu-van"
            className={sectionClass(4, "relative flex flex-col justify-center overflow-hidden bg-[#06080f] text-white")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CORP_HERO_SLIDES[5]}
              alt=""
              className="corp-parallax-bg pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14] saturate-50"
            />
            <div className="absolute inset-0 bg-[#06080f]/82" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_20%,rgba(109,40,217,0.16),transparent_65%)]" />

            <div
              data-project-scroll
              className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col justify-center overflow-y-auto px-3 py-12 sm:px-8 sm:py-16 lg:overflow-visible lg:px-12 lg:py-0"
            >
              <div {...riseProps(0, "mx-auto w-full shrink-0 text-center")}>
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
                <div {...riseProps(1, "mx-auto mt-8 flex max-w-md flex-col items-center text-center")}>
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
                <MotionConfig reducedMotion="never">
                  <form
                    className="mt-4 grid w-full grid-cols-[minmax(0,0.85fr)_minmax(0,1.2fr)] items-start gap-2.5 border-t border-white/[0.08] pt-3.5 sm:mt-6 sm:gap-5 sm:pt-6 lg:gap-10 lg:pt-8"
                    onSubmit={handleConsultSubmit}
                  >
                    {/* Trái — từ trái sang, trên xuống */}
                    <div className="flex min-w-0 flex-col gap-3 text-left sm:gap-4">
                      <div>
                        <motion.p
                          initial={false}
                          animate={consultReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
                          transition={{
                            duration: 0.45,
                            delay: consultReveal ? 0.06 : 0,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="mb-1.5 text-[8px] font-medium tracking-[0.16em] text-white/35 sm:text-[10px] sm:tracking-[0.22em]"
                        >
                          NGÀY
                        </motion.p>
                        <div className="flex flex-col gap-0.5 sm:gap-1">
                          {consultDays.map((day, i) => {
                            const active = consultForm.consultDate === day.iso;
                            return (
                              <motion.button
                                key={day.iso}
                                type="button"
                                onClick={() =>
                                  setConsultForm((prev) => ({ ...prev, consultDate: day.iso }))
                                }
                                initial={false}
                                animate={consultReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -36 }}
                                transition={{
                                  duration: 0.5,
                                  delay: consultReveal ? 0.12 + i * 0.11 : 0,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className={`corp-consult-chip flex w-full flex-row items-center justify-between gap-1 px-1.5 py-1.5 sm:px-2.5 sm:py-2${
                                  active ? " corp-consult-chip--on" : ""
                                }`}
                                aria-pressed={active}
                              >
                                <span className="text-[8px] uppercase tracking-[0.06em] sm:text-[10px]">
                                  {day.isToday ? "Nay" : day.weekday}
                                </span>
                                <span className="text-[10px] tabular-nums font-medium sm:text-[12px]">
                                  {day.dayNum}/{day.month}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <motion.p
                          initial={false}
                          animate={consultReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
                          transition={{
                            duration: 0.45,
                            delay: consultReveal ? 0.12 + consultDays.length * 0.11 + 0.05 : 0,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="mb-1.5 text-[8px] font-medium tracking-[0.16em] text-white/35 sm:text-[10px] sm:tracking-[0.22em]"
                        >
                          GIỜ
                        </motion.p>
                        <div className="flex flex-col gap-0.5 sm:gap-1">
                          {CONSULT_SLOTS.map((slot, i) => {
                            const active = consultForm.consultSlot === slot.id;
                            const delayBase = 0.12 + consultDays.length * 0.11 + 0.12;
                            return (
                              <motion.button
                                key={slot.id}
                                type="button"
                                onClick={() =>
                                  setConsultForm((prev) => ({ ...prev, consultSlot: slot.id }))
                                }
                                initial={false}
                                animate={consultReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -36 }}
                                transition={{
                                  duration: 0.5,
                                  delay: consultReveal ? delayBase + i * 0.11 : 0,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className={`corp-consult-slot flex w-full flex-row items-center justify-between gap-1 px-1.5 py-1.5 text-left sm:px-2.5 sm:py-2${
                                  active ? " corp-consult-slot--on" : ""
                                }`}
                                aria-pressed={active}
                              >
                                <span className="text-[10px] font-medium sm:text-[12px]">{slot.label}</span>
                                <span className="text-[8px] font-light opacity-55 sm:text-[10px]">
                                  {slot.hint}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Phải — từ phải sang (song song cột trái); nút từ dưới lên sau cùng */}
                    <div className="flex min-w-0 flex-col gap-1.5 border-l border-white/[0.08] pl-2.5 text-left sm:gap-2.5 sm:pl-5 lg:pl-10">
                      <motion.p
                        initial={false}
                        animate={consultReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 }}
                        transition={{
                          duration: 0.45,
                          delay: consultReveal ? 0.06 : 0,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="mb-0 text-[8px] font-medium tracking-[0.16em] text-white/35 sm:text-[10px] sm:tracking-[0.22em]"
                      >
                        THÔNG TIN
                      </motion.p>
                      {(
                        [
                          { field: "name" as const, type: "text", placeholder: "Họ và tên *", required: true },
                          { field: "phone" as const, type: "tel", placeholder: "Số điện thoại *", required: true },
                          { field: "email" as const, type: "email", placeholder: "Email *", required: true },
                          { field: "address" as const, type: "text", placeholder: "Khu vực *", required: true },
                          { field: "note" as const, type: "text", placeholder: "Ghi chú", required: false },
                        ] as const
                      ).map((item, i) => (
                        <motion.input
                          key={item.field}
                          required={item.required}
                          type={item.type}
                          placeholder={item.placeholder}
                          value={consultForm[item.field]}
                          onChange={(e) =>
                            setConsultForm((prev) => ({ ...prev, [item.field]: e.target.value }))
                          }
                          initial={false}
                          animate={consultReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                          transition={{
                            duration: 0.5,
                            delay: consultReveal ? 0.12 + i * 0.11 : 0,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="corp-consult-input"
                        />
                      ))}
                      <motion.button
                        disabled={consultLoading}
                        type="submit"
                        initial={false}
                        animate={consultReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{
                          duration: 0.65,
                          delay: consultReveal
                            ? 0.12 +
                              Math.max(consultDays.length + CONSULT_SLOTS.length, 5) * 0.11 +
                              0.35
                            : 0,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="mt-1 w-full rounded-md bg-violet-600 py-2.5 text-[9px] font-semibold tracking-[0.14em] text-white shadow-lg shadow-violet-950/35 transition hover:bg-violet-500 disabled:opacity-50 sm:py-3 sm:text-[11px] sm:tracking-[0.2em]"
                      >
                        {consultLoading ? "ĐANG GỬI..." : "ĐẶT LỊCH NGAY"}
                      </motion.button>
                      <motion.a
                        initial={false}
                        animate={consultReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                        transition={{
                          duration: 0.45,
                          delay: consultReveal
                            ? 0.12 +
                              Math.max(consultDays.length + CONSULT_SLOTS.length, 5) * 0.11 +
                              0.52
                            : 0,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-flex items-center justify-center gap-1.5 text-[10px] font-light text-white/40 transition hover:text-white sm:text-[12px]"
                        href={getTelHref(hotline)}
                      >
                        <Phone className="h-3 w-3" />
                        {hotlineDisplay}
                      </motion.a>
                    </div>
                  </form>
                </MotionConfig>
              )}
            </div>
          </section>

          {/* 6 — Kiến thức: ảnh lớn trái + bài nhỏ phải */}
          <section
            id="kien-thuc"
            className={sectionClass(5, "relative flex flex-col overflow-hidden bg-[#06080f] text-white")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CORP_HERO_SLIDES[1]}
              alt=""
              className="corp-parallax-bg pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12] saturate-50"
            />
            <div className="absolute inset-0 bg-[#06080f]/88" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(109,40,217,0.14),transparent_65%)]" />

            <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-3 py-14 sm:px-8 sm:py-20 lg:px-12 lg:pl-20 xl:pl-28">
              <MotionConfig reducedMotion="never">
                <div className="mb-3 flex shrink-0 items-end justify-between gap-3 sm:mb-7 sm:gap-4">
                  <motion.h2
                    initial={false}
                    animate={knowledgeReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
                    transition={{
                      duration: 0.55,
                      delay: knowledgeReveal ? 0.05 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-400 bg-clip-text text-[clamp(1.65rem,5vw,3.15rem)] font-semibold tracking-[-0.02em] text-transparent"
                    style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                  >
                    Kiến thức
                  </motion.h2>
                  <motion.div
                    initial={false}
                    animate={knowledgeReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{
                      duration: 0.45,
                      delay: knowledgeReveal ? 0.12 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      className="text-[11px] font-medium tracking-wide text-violet-200/80 transition hover:text-white sm:text-[12px]"
                      href="/blog"
                    >
                      Xem tất cả →
                    </Link>
                  </motion.div>
                </div>

                <div className="grid min-h-0 grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-stretch gap-2.5 sm:gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-7">
                  {/* Trái — bài lớn nhảy từ trái qua trước */}
                  <motion.div
                    className="min-h-[min(52vh,280px)] sm:min-h-[280px] lg:min-h-[min(52vh,440px)]"
                    initial={false}
                    animate={knowledgeReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -56 }}
                    transition={{
                      duration: 0.75,
                      delay: knowledgeReveal ? 0.18 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      className="group relative block h-full min-h-[inherit] overflow-hidden rounded-lg ring-1 ring-white/10"
                      href={featuredKnowledge?.slug ? `/blog/${featuredKnowledge.slug}` : "/blog"}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featuredKnowledge?.imageUrl || CORP_HERO_SLIDES[2]}
                        alt={
                          featuredKnowledge
                            ? getBlogThumbnailAlt({
                                slug: featuredKnowledge.slug,
                                keywordsMain: featuredKnowledge.keywordsMain,
                                title: featuredKnowledge.title,
                              })
                            : "Kiến thức marketing"
                        }
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
                  </motion.div>

                  {/* Phải — bài nhỏ từ phải qua, lần lượt trên xuống */}
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
                          keywordsMain: undefined as string | undefined,
                        }))
                    ).map((post, i) => (
                      <motion.div
                        key={post.id}
                        initial={false}
                        animate={knowledgeReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: 48 }}
                        transition={{
                          duration: 0.58,
                          delay: knowledgeReveal ? 0.72 + i * 0.16 : 0,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          className="group flex gap-2 rounded-md p-1 transition hover:bg-white/[0.04] sm:gap-3.5 sm:p-1.5"
                          href={post.slug ? `/blog/${post.slug}` : "/blog"}
                        >
                          <div className="relative h-14 w-[4.25rem] shrink-0 overflow-hidden rounded-md bg-white/5 ring-1 ring-white/10 sm:h-[5.25rem] sm:w-[6.75rem]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={post.imageUrl || CORP_HERO_SLIDES[3]}
                              alt={getBlogThumbnailAlt({
                                slug: post.slug,
                                keywordsMain: post.keywordsMain,
                                title: post.title,
                              })}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="min-w-0 flex-1 py-0.5">
                            <h4 className="line-clamp-2 text-[11px] font-medium leading-snug text-white/85 transition group-hover:text-white sm:text-[13px]">
                              {post.title}
                            </h4>
                            <p className="mt-1 hidden line-clamp-2 text-[11px] font-light leading-relaxed text-white/40 sm:block">
                              {post.description ||
                                post.metaDescription ||
                                "Đọc tiếp trên blog Bứt Phá Marketing."}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </MotionConfig>
            </div>
          </section>

          {/* 7 — Tiếng nói: trước/sau + 3 logo + nút sát rìa */}
          <section
            id="tieng-noi"
            className={sectionClass(6, "relative flex flex-col overflow-hidden text-white")}
          >
            <div className="pointer-events-none absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={VOICE_BG}
                alt=""
                className="corp-parallax-bg h-full w-full object-cover object-[center_45%] opacity-100"
              />
              {/* Lớp tím deep — giữ chữ rõ, skyline vẫn lộ */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 50% at 50% 12%, rgba(167,139,250,0.32), transparent 58%), radial-gradient(ellipse 45% 35% at 18% 70%, rgba(109,40,217,0.18), transparent 60%), radial-gradient(ellipse 40% 30% at 88% 75%, rgba(139,124,246,0.16), transparent 55%), linear-gradient(180deg, rgba(20,12,40,0.45) 0%, rgba(14,10,28,0.55) 45%, rgba(10,8,22,0.72) 100%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a1035]/50 via-transparent to-[#0e0a1c]/75" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_55%,rgba(139,124,246,0.12),transparent_70%)]" />
            </div>

            <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col items-center justify-center overflow-y-auto px-4 py-24 sm:px-10 sm:py-28 lg:overflow-visible lg:px-14 lg:py-32">
              <h2
                {...riseProps(0, "mx-auto w-full shrink-0 bg-gradient-to-r from-violet-200 via-fuchsia-300 to-violet-400 bg-clip-text text-center text-transparent", {
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 600,
                  fontSize: "clamp(1.2rem, 3.2vw, 2.15rem)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                })}
              >
                Khách hàng đã nói gì trước khi bứt phá
              </h2>

              <div {...riseProps(1, "relative mx-auto mt-3 w-full max-w-3xl shrink-0 sm:mt-5")}>
                {activeVoice ? (
                  <MotionConfig reducedMotion="never">
                    <div key={activeVoice.slug} className="flex flex-col items-center text-center">
                      <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/35 sm:text-[10px]">
                        Trước
                      </p>
                      <HeroRevealText
                        as="p"
                        text={activeVoice.before}
                        play={voiceReveal}
                        startDelayMs={80}
                        stepMs={22}
                        className="mt-2 max-w-xl text-[clamp(0.95rem,2.2vw,1.25rem)] font-light leading-snug tracking-wide text-white/55"
                        style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                      />

                      {/* 3 logo + nút trái/phải sát rìa */}
                      <div className="relative my-5 flex w-full items-center justify-center gap-1.5 sm:my-6 sm:gap-2.5">
                        <button
                          type="button"
                          onClick={() =>
                            setVoiceActive((i) => (i - 1 + voiceCases.length) % voiceCases.length)
                          }
                          className="z-20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white shadow-lg backdrop-blur-md transition hover:border-violet-300/50 hover:bg-violet-600/30 sm:h-9 sm:w-9"
                          aria-label="Khách trước"
                        >
                          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
                        </button>

                        <div className="flex items-center justify-center gap-3 sm:gap-5">
                          {([-1, 0, 1] as const).map((slot) => {
                            const n = voiceCases.length;
                            const i = (voiceActive + slot + n) % n;
                            const v = voiceCases[i];
                            if (!v) return null;
                            const isActive = slot === 0;
                            return (
                              <button
                                key={`${v.slug}-${slot}`}
                                type="button"
                                onClick={() => setVoiceActive(i)}
                                aria-pressed={isActive}
                                aria-label={v.clientName}
                                title={v.clientName}
                                className={`relative overflow-hidden rounded-full transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                  isActive
                                    ? v.hasBrandLogo
                                      ? v.logoFit === "contain"
                                        ? "h-[4.75rem] w-[4.75rem] scale-105 bg-white shadow-[0_12px_40px_rgba(255,255,255,0.2)] ring-2 ring-white/75 sm:h-24 sm:w-24"
                                        : "h-[4.75rem] w-[4.75rem] scale-105 bg-[#1a1510] shadow-[0_12px_40px_rgba(212,175,55,0.4)] ring-2 ring-amber-300/60 sm:h-24 sm:w-24"
                                      : "h-[4.75rem] w-[4.75rem] scale-105 bg-[#12151f] shadow-[0_12px_40px_rgba(76,29,149,0.45)] ring-2 ring-violet-400/55 sm:h-24 sm:w-24"
                                    : v.hasBrandLogo
                                      ? v.logoFit === "contain"
                                        ? "h-12 w-12 bg-white/95 opacity-70 ring-1 ring-white/35 hover:opacity-95 sm:h-14 sm:w-14"
                                        : "h-12 w-12 bg-[#1a1510] opacity-70 ring-1 ring-amber-200/25 hover:opacity-95 sm:h-14 sm:w-14"
                                      : "h-12 w-12 bg-[#12151f] opacity-55 ring-1 ring-white/15 hover:opacity-85 sm:h-14 sm:w-14"
                                }`}
                              >
                                {isActive ? (
                                  <span
                                    className="pointer-events-none absolute -inset-3 rounded-full bg-amber-400/15 blur-xl"
                                    aria-hidden
                                  />
                                ) : null}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={v.logo}
                                  alt=""
                                  className={`relative z-10 h-full w-full ${
                                    v.hasBrandLogo
                                      ? v.logoFit === "contain"
                                        ? "object-contain p-1.5"
                                        : "object-cover"
                                      : "object-cover"
                                  }`}
                                />
                                {!v.hasBrandLogo ? (
                                  <>
                                    <span className="absolute inset-0 z-10 bg-[#0a0d16]/35" />
                                    <span
                                      className={`absolute inset-0 z-20 flex items-center justify-center font-semibold tracking-wider ${
                                        isActive ? "text-[15px] text-white sm:text-[17px]" : "text-[10px] text-white/85"
                                      }`}
                                      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                                    >
                                      {v.mark}
                                    </span>
                                  </>
                                ) : null}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => setVoiceActive((i) => (i + 1) % voiceCases.length)}
                          className="z-20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white shadow-lg backdrop-blur-md transition hover:border-violet-300/50 hover:bg-violet-600/30 sm:h-9 sm:w-9"
                          aria-label="Khách sau"
                        >
                          <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      </div>

                      <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-violet-300/80 sm:text-[10px]">
                        Sau
                      </p>
                      <HeroRevealText
                        as="p"
                        text={activeVoice.after}
                        play={voiceReveal}
                        startDelayMs={80 + activeVoice.before.length * 22 + 420}
                        stepMs={22}
                        className="mt-2 max-w-xl text-[clamp(1.05rem,2.5vw,1.45rem)] font-light leading-snug tracking-wide text-white/95"
                        style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                      />

                      <div className="mt-4 flex flex-col items-center gap-0.5 sm:mt-5">
                        <p className="text-[13px] font-medium tracking-wide text-white sm:text-[14px]">
                          {activeVoice.clientName}
                        </p>
                        <p className="text-[11px] tracking-wide text-violet-200/65 sm:text-[12px]">
                          {activeVoice.industryLabel}
                        </p>
                      </div>
                    </div>
                  </MotionConfig>
                ) : null}
              </div>
            </div>
          </section>

          {/* 8 — Liên hệ / Footer: CTA + 3 cột + brand bar */}
          <section
            id="lien-he"
            className={sectionClass(7, "relative flex flex-col overflow-hidden bg-[#06080f] text-white")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CORP_HERO_SLIDES[5]}
              alt=""
              className="corp-parallax-bg pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.1] saturate-50"
            />
            <div className="absolute inset-0 bg-[#06080f]/93" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_15%,rgba(109,40,217,0.16),transparent_65%)]" />

            <div
              data-project-scroll
              className="relative z-10 mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col justify-start gap-6 overflow-y-auto px-5 pb-3 pt-28 [scrollbar-width:none] sm:gap-8 sm:px-10 sm:pb-4 sm:pt-32 lg:justify-center lg:gap-9 lg:px-12 lg:pt-28"
            >
              {/* CTA — không lặp logo (đã có trên header) */}
              <div {...fadeProps(0, "corp-fade--footer w-full shrink-0 text-center")}>
                <h2
                  className="text-[clamp(1.5rem,4.5vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-white"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                >
                  Sẵn sàng bứt phá?
                </h2>
                <p className="mx-auto mt-2.5 max-w-md text-[12px] font-light leading-relaxed text-white/55 sm:mt-3 sm:text-[14px]">
                  Lộ trình Website · Facebook · Maps khớp ngân sách và mục tiêu của bạn.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:mt-6 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => goToSection(consultSectionIndex)}
                    className="corp-cta inline-flex min-w-[10rem] items-center justify-center rounded-md bg-violet-600 px-5 py-2.5 text-[11px] font-semibold tracking-wide text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500 sm:min-w-[11rem] sm:px-7 sm:py-3 sm:text-sm"
                  >
                    Đặt lịch tư vấn
                  </button>
                  <Link
                    href="/banggia"
                    className="inline-flex min-w-[10rem] items-center justify-center rounded-md border border-white/25 px-5 py-2.5 text-[11px] font-semibold tracking-wide text-white/90 transition hover:border-white/50 hover:bg-white/[0.06] sm:min-w-[11rem] sm:px-7 sm:py-3 sm:text-sm"
                  >
                    Bảng giá
                  </Link>
                </div>
              </div>

              {/* Links — 3 cột */}
              <div className="w-full shrink-0 border-t border-white/[0.1] pt-5 sm:pt-7">
                <div className="mx-auto grid max-w-3xl grid-cols-3 gap-x-4 text-left sm:gap-x-10 md:gap-x-12">
                  <div {...riseProps(2, "corp-rise--footer")}>
                    <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/35 sm:text-[10px] sm:tracking-[0.2em]">
                      Kết nối
                    </p>
                    <ul className="mt-2 space-y-1.5 text-[11px] sm:mt-2.5 sm:space-y-2 sm:text-[13px]">
                      <li>
                        <a href={getTelHref(hotline)} className="font-medium text-violet-200 transition hover:text-white">
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
                        <a href={`mailto:${email}`} className="break-all text-white/70 transition hover:text-violet-200">
                          {email}
                        </a>
                      </li>
                      <li className="line-clamp-2 font-light leading-snug text-white/45">{address}</li>
                    </ul>
                  </div>

                  <div {...riseProps(4, "corp-rise--footer")}>
                    <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/35 sm:text-[10px] sm:tracking-[0.2em]">
                      Dịch vụ
                    </p>
                    <ul className="mt-2 space-y-1.5 text-[11px] sm:mt-2.5 sm:space-y-2 sm:text-[13px]">
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

                  <div {...riseProps(6, "corp-rise--footer")}>
                    <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/35 sm:text-[10px] sm:tracking-[0.2em]">
                      Khám phá
                    </p>
                    <ul className="mt-2 space-y-1.5 text-[11px] sm:mt-2.5 sm:space-y-2 sm:text-[13px]">
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

              {/* Brand bar — gọn, không lặp logo lớn */}
              <footer
                {...fromLeftProps(
                  8,
                  "corp-from-left--footer flex w-full shrink-0 flex-col items-center gap-1 border-t border-white/[0.1] pt-4 text-center sm:flex-row sm:justify-between sm:gap-3 sm:pt-5 sm:text-left"
                )}
              >
                <p
                  className="text-[12px] font-semibold tracking-wide text-white/80 sm:text-[13px]"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                >
                  {brandName}
                </p>
                <p className="text-[10px] font-light tracking-wide text-white/40 sm:text-[11px]">
                  Kết nối thương hiệu — Tăng trưởng bền vững
                </p>
                <p className="text-[10px] text-white/35 sm:text-[11px]">
                  © {new Date().getFullYear()}
                </p>
              </footer>
            </div>

            {/* Thanh gọi hotline full màn */}
            <a
              href={getTelHref(hotline)}
              className="corp-footer-callbar relative z-20 flex w-full shrink-0 items-center justify-center gap-2.5 px-4 py-3.5 sm:gap-3 sm:py-4"
              aria-label={`Gọi ${hotlineDisplay} — tư vấn miễn phí`}
            >
              <span className="corp-footer-callbar-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-9 sm:w-9">
                <Phone className="h-4 w-4 text-white sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={2.25} />
              </span>
              <span className="text-center text-[13px] font-semibold leading-snug tracking-wide text-white sm:text-[15px]">
                Bấm vào đây để được tư vấn miễn phí
              </span>
            </a>
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

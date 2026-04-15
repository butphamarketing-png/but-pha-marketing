"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

interface PackageConfig {
  price: string;
  features: string[];
  allFeatures?: string[];
  audio: string;
  popular?: boolean;
  period?: "month" | "lifetime";
  feedbacks?: { clientName: string; content: string }[];
}

interface PlatformCMS {
  vision: string;
  mission: string;
  responsibility?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  faqs?: { q: string; a: string }[];
  process?: { step: number; title: string; desc: string }[];
  packages: Record<string, PackageConfig>; // key: package name (e.g. "Cơ bản")
}

interface SiteSettings {
  title: string;
  hotline: string;
  logo?: string;
  content?: string;
  address?: string;
  email?: string;
  zalo?: string;
  website?: string;
  fanpage?: string;
  googleAnalytics?: string;
  googleWebmaster?: string;
  headJs?: string;
  bodyJs?: string;
  pluginScripts?: string;
  heroTitle: string;
  heroSubtitle: string;
  colors: Record<string, string>;
  visibility: Record<string, boolean>;
  platformNames?: Record<string, string>;
  cms: Record<string, PlatformCMS>;
  media: Record<string, { 
    slideshow: string[]; 
    cases: { id: string; title: string; before: string; after: string }[];
    videoUrl?: string;
  }>;
  roadmap: {
    title: string;
    time: string;
    desc: string;
    status: "completed" | "in_progress" | "pending";
  }[];
  presentationMode: boolean;
  softSoundsEnabled?: boolean;
  softSoundsVolume?: number;
  mascotEnabled?: boolean;
  mascotMessages?: Record<string, string>;
  mascotAudioUrls?: Record<string, string>;
  mascotErrorMessages?: Record<string, {
    login: string;
    phone: string;
    link: string;
  }>;
  mascotSectionMessages?: Record<string, Record<string, string>>;
  mascotClickMessages?: Record<string, string[]>;
}

interface AdminContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateColor: (platform: string, color: string) => void;
  updatePlatformName: (platform: string, name: string) => void;
  toggleVisibility: (section: string, isVisible: boolean) => void;
  updateCMS: (platform: string, field: keyof PlatformCMS, value: any) => void;
  updatePackage: (platform: string, pkgName: string, field: keyof PackageConfig, value: any) => void;
  addSlideshowImage: (platform: string, url: string) => void;
  removeSlideshowImage: (platform: string, index: number) => void;
  addCase: (platform: string, c: { title: string; before: string; after: string }) => void;
  removeCase: (platform: string, id: string) => void;
  updateMediaVideo: (platform: string, url: string) => void;
  updateRoadmap: (steps: SiteSettings["roadmap"]) => void;
  togglePresentationMode: () => void;
}

const defaultSettings: SiteSettings = {
  title: "Bứt Phá Marketing",
  hotline: "0937 417 982",
  logo: "/logo.jpg",
  content: "Agency marketing toàn diện tại Việt Nam",
  address: "TP. Hồ Chí Minh",
  email: "contact@butphamarketing.vn",
  zalo: "0937417982",
  website: "https://butphamarketing.vn",
  fanpage: "https://facebook.com/butphamarketing",
  heroTitle: "BỨT PHÁ MARKETING",
  heroSubtitle: "Tăng trưởng doanh thu và thương hiệu của bạn trên mọi nền tảng mạng xã hội",
  colors: {
    facebook: "#1877F2",
    tiktok: "#FF0050",
    instagram: "#E1306C",
    zalo: "#0068FF",
    googlemaps: "#EA4335",
    website: "#34A853",
    primary: "#7C3AED",
  },
  platformNames: {
    facebook: "Facebook",
    tiktok: "TikTok",
    instagram: "Instagram",
    zalo: "Zalo",
    googlemaps: "Google Maps",
    website: "Website",
  },
  visibility: {
    "slideshow": true,
    "intro": true,
    "pricing": true,
    "audit": true,
    "stats": true,
    "facebook": true,
    "tiktok": true,
    "instagram": true,
    "zalo": true,
    "googlemaps": true,
    "website": true,
  },
  cms: {
    facebook: { vision: "", mission: "", packages: {} },
    tiktok: { vision: "", mission: "", packages: {} },
    instagram: { vision: "", mission: "", packages: {} },
    zalo: { vision: "", mission: "", packages: {} },
    googlemaps: { vision: "", mission: "", packages: {} },
    website: { vision: "", mission: "", packages: {} },
  },
  media: {
    facebook: { slideshow: [], cases: [], videoUrl: "" },
    tiktok: { slideshow: [], cases: [], videoUrl: "" },
    instagram: { slideshow: [], cases: [], videoUrl: "" },
    zalo: { slideshow: [], cases: [], videoUrl: "" },
    googlemaps: { slideshow: [], cases: [], videoUrl: "" },
    website: { slideshow: [], cases: [], videoUrl: "" },
    home: { slideshow: [], cases: [], videoUrl: "" },
  },
  roadmap: [
    { title: "Khởi tạo & Nghiên cứu", time: "Ngày 1 - 3", desc: "Phân tích đối thủ, xác định tệp khách hàng mục tiêu và lập kế hoạch nội dung chi tiết.", status: "completed" },
    { title: "Thiết lập Nền tảng", time: "Ngày 4 - 7", desc: "Tối ưu hóa Fanpage/Kênh, thiết kế bộ nhận diện thương hiệu chuẩn Agency.", status: "in_progress" },
    { title: "Sản xuất Nội dung", time: "Ngày 8 - 20", desc: "Lên bài viết, sản xuất video viral và thiết kế hình ảnh chuyên nghiệp hàng ngày.", status: "pending" },
    { title: "Quảng cáo & Tăng trưởng", time: "Ngày 15 - 30", desc: "Triển khai các chiến dịch Ads, theo dõi chỉ số và tối ưu hóa chuyển đổi.", status: "pending" },
    { title: "Báo cáo & Tổng kết", time: "Ngày 30", desc: "Gửi báo cáo hiệu quả chi tiết và đề xuất kế hoạch cho giai đoạn tiếp theo.", status: "pending" }
  ],
  presentationMode: false,
  softSoundsEnabled: true,
  softSoundsVolume: 0.05,
  mascotEnabled: true,
  mascotMessages: {
    home: "Chào bạn, hôm nay bứt phá doanh số nhé!",
    facebook: "Chào bạn, hôm nay bứt phá doanh số nhé!",
    tiktok: "Chào bạn, hôm nay bứt phá doanh số nhé!",
    instagram: "Chào bạn, hôm nay bứt phá doanh số nhé!",
    zalo: "Chào bạn, hôm nay bứt phá doanh số nhé!",
    googlemaps: "Chào bạn, hôm nay bứt phá doanh số nhé!",
    website: "Chào bạn, hôm nay bứt phá doanh số nhé!",
  },
  mascotAudioUrls: {
    home: "",
    facebook: "",
    tiktok: "",
    instagram: "",
    zalo: "",
    googlemaps: "",
    website: "",
  },
  mascotErrorMessages: {
    home: { login: "Bạn nhập sai tài khoản hoặc mật khẩu rồi nhé!", phone: "Số điện thoại chưa đúng, bạn kiểm tra lại nhé!", link: "Link chưa đúng chuẩn rồi, bạn nhập lại giúp mình nhé!" },
    facebook: { login: "Bạn nhập sai tài khoản hoặc mật khẩu rồi nhé!", phone: "Số điện thoại chưa đúng, bạn kiểm tra lại nhé!", link: "Link Facebook chưa đúng chuẩn rồi nhé!" },
    tiktok: { login: "Bạn nhập sai tài khoản hoặc mật khẩu rồi nhé!", phone: "Số điện thoại chưa đúng, bạn kiểm tra lại nhé!", link: "Link TikTok chưa đúng chuẩn rồi nhé!" },
    instagram: { login: "Bạn nhập sai tài khoản hoặc mật khẩu rồi nhé!", phone: "Số điện thoại chưa đúng, bạn kiểm tra lại nhé!", link: "Link Instagram chưa đúng chuẩn rồi nhé!" },
    zalo: { login: "Bạn nhập sai tài khoản hoặc mật khẩu rồi nhé!", phone: "Số điện thoại chưa đúng, bạn kiểm tra lại nhé!", link: "Link Zalo chưa đúng chuẩn rồi nhé!" },
    googlemaps: { login: "Bạn nhập sai tài khoản hoặc mật khẩu rồi nhé!", phone: "Số điện thoại chưa đúng, bạn kiểm tra lại nhé!", link: "Link Google Maps chưa đúng chuẩn rồi nhé!" },
    website: { login: "Bạn nhập sai tài khoản hoặc mật khẩu rồi nhé!", phone: "Số điện thoại chưa đúng, bạn kiểm tra lại nhé!", link: "Link website chưa đúng chuẩn rồi nhé!" },
  },
  mascotSectionMessages: {
    home: {},
    facebook: {
      slideshow: "Đây là menu tổng quan dịch vụ.",
      intro: "Đây là phần giới thiệu dịch vụ.",
      pricing: "Đây là các gói dịch vụ bạn có thể chọn.",
      audit: "Đây là phần chuẩn đoán sức khỏe kênh.",
      process: "Đây là quy trình triển khai cho bạn.",
      faq: "Đây là các câu hỏi thường gặp.",
      contact: "Đây là phần liên hệ để được tư vấn.",
    },
    tiktok: {},
    instagram: {},
    zalo: {},
    googlemaps: {},
    website: {},
  },
  mascotClickMessages: {
    home: [
      "Xin chào, mình là rồng trợ lý đây!",
      "Bạn cần mình giới thiệu dịch vụ nào nè?",
      "Mình tạm ẩn nhé, bấm nút bên trái để gọi lại mình nha!",
    ],
    facebook: [],
    tiktok: [],
    instagram: [],
    zalo: [],
    googlemaps: [],
    website: [],
  },
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);
const SETTINGS_KEY = "admin_settings";

function mergeWithDefaults(parsed: Partial<SiteSettings>): SiteSettings {
  return {
    ...defaultSettings,
    ...parsed,
    cms: { ...defaultSettings.cms, ...(parsed.cms || {}) },
    media: { ...defaultSettings.media, ...(parsed.media || {}) },
    colors: { ...defaultSettings.colors, ...(parsed.colors || {}) },
    presentationMode: false,
  };
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  const persistTimerRef = useRef<number | null>(null);
  const lastSavedRef = useRef("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    let mounted = true;
    const loadSettings = async () => {
      try {
        const res = await fetch(`/api/settings?key=${SETTINGS_KEY}`);
        if (res.ok) {
          const data = await res.json();
          if (mounted && data?.value) {
            const merged = mergeWithDefaults(data.value as Partial<SiteSettings>);
            setSettings(merged);
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
            setIsLoaded(true);
            return;
          }
        }
      } catch (e) {
        console.warn("Remote settings unavailable, fallback local", e);
      }

      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (mounted) setSettings(mergeWithDefaults(parsed));
        } catch (e) {
          console.error("Failed to parse admin settings", e);
        }
      }
      if (mounted) setIsLoaded(true);
    };
    loadSettings();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      const payload = JSON.stringify({ ...settings, presentationMode: false });
      if (payload === lastSavedRef.current) return;

      if (persistTimerRef.current) window.clearTimeout(persistTimerRef.current);
      persistTimerRef.current = window.setTimeout(() => {
        const persist = () => {
          localStorage.setItem(SETTINGS_KEY, payload);
          lastSavedRef.current = payload;
          fetch("/api/settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key: SETTINGS_KEY, value: JSON.parse(payload) }),
          }).catch(() => {});
        };
        if ("requestIdleCallback" in window) {
          (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
            persist,
            { timeout: 800 },
          );
        } else {
          persist();
        }
      }, 220);
    }
    return () => {
      if (persistTimerRef.current) window.clearTimeout(persistTimerRef.current);
    };
  }, [settings, isLoaded]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== SETTINGS_KEY || !event.newValue) return;
      try {
        const parsed = JSON.parse(event.newValue);
        setSettings(mergeWithDefaults(parsed));
      } catch (e) {
        console.error("Failed to sync admin settings across tabs", e);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateColor = (platform: string, color: string) => {
    setSettings(prev => ({
      ...prev,
      colors: { ...prev.colors, [platform]: color }
    }));
  };

  const updatePlatformName = (platform: string, name: string) => {
    setSettings(prev => ({
      ...prev,
      platformNames: { ...(prev.platformNames || {}), [platform]: name }
    }));
  };

  const toggleVisibility = (section: string, isVisible: boolean) => {
    setSettings(prev => ({
      ...prev,
      visibility: { ...prev.visibility, [section]: isVisible }
    }));
  };

  const updateCMS = (platform: string, field: keyof PlatformCMS, value: any) => {
    setSettings(prev => ({
      ...prev,
      cms: {
        ...prev.cms,
        [platform]: { ...prev.cms[platform], [field]: value }
      }
    }));
  };

  const updatePackage = (platform: string, pkgName: string, field: keyof PackageConfig, value: any) => {
    setSettings(prev => {
      const platformCMS = prev.cms[platform] || { vision: "", mission: "", packages: {} };
      const pkg = (platformCMS.packages && platformCMS.packages[pkgName]) || { price: "", features: [], audio: "" };
      return {
        ...prev,
        cms: {
          ...prev.cms,
          [platform]: {
            ...platformCMS,
            packages: {
              ...platformCMS.packages,
              [pkgName]: { ...pkg, [field]: value }
            }
          }
        }
      };
    });
  };

  const addSlideshowImage = (platform: string, url: string) => {
    setSettings(prev => ({
      ...prev,
      media: {
        ...prev.media,
        [platform]: {
          ...(prev.media[platform] || { slideshow: [], cases: [] }),
          slideshow: [...(prev.media[platform]?.slideshow || []), url]
        }
      }
    }));
  };

  const removeSlideshowImage = (platform: string, index: number) => {
    setSettings(prev => ({
      ...prev,
      media: {
        ...prev.media,
        [platform]: {
          ...(prev.media[platform] || { slideshow: [], cases: [] }),
          slideshow: (prev.media[platform]?.slideshow || []).filter((_, i) => i !== index)
        }
      }
    }));
  };

  const addCase = (platform: string, c: { title: string; before: string; after: string }) => {
    setSettings(prev => ({
      ...prev,
      media: {
        ...prev.media,
        [platform]: {
          ...(prev.media[platform] || { slideshow: [], cases: [], videoUrl: "" }),
          cases: [...(prev.media[platform]?.cases || []), { ...c, id: Math.random().toString(36).slice(2, 9) }]
        }
      }
    }));
  };

  const removeCase = (platform: string, id: string) => {
    setSettings(prev => ({
      ...prev,
      media: {
        ...prev.media,
        [platform]: {
          ...(prev.media[platform] || { slideshow: [], cases: [], videoUrl: "" }),
          cases: (prev.media[platform]?.cases || []).filter(c => c.id !== id)
        }
      }
    }));
  };

  const updateMediaVideo = (platform: string, url: string) => {
    setSettings(prev => ({
      ...prev,
      media: {
        ...prev.media,
        [platform]: {
          ...(prev.media[platform] || { slideshow: [], cases: [], videoUrl: "" }),
          videoUrl: url
        }
      }
    }));
  };

  const updateRoadmap = (steps: SiteSettings["roadmap"]) => {
    setSettings(prev => ({ ...prev, roadmap: steps }));
  };

  const togglePresentationMode = () => {
    setSettings(prev => ({ ...prev, presentationMode: !prev.presentationMode }));
  };

  return (
    <AdminContext.Provider value={{
      settings,
      updateSettings,
      updateColor,
      updatePlatformName,
      toggleVisibility,
      updateCMS,
      updatePackage,
      addSlideshowImage,
      removeSlideshowImage,
      addCase,
      removeCase,
      updateMediaVideo,
      updateRoadmap,
      togglePresentationMode
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}


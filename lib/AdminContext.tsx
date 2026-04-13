"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PackageConfig {
  price: string;
  features: string[];
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
  heroTitle: string;
  heroSubtitle: string;
  colors: Record<string, string>;
  visibility: Record<string, boolean>;
  cms: Record<string, PlatformCMS>;
  media: Record<string, { 
    slideshow: string[]; 
    cases: { id: string; title: string; before: string; after: string }[] 
  }>;
  roadmap: {
    title: string;
    time: string;
    desc: string;
    status: "completed" | "in_progress" | "pending";
  }[];
  presentationMode: boolean;
}

interface AdminContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateColor: (platform: string, color: string) => void;
  toggleVisibility: (section: string, isVisible: boolean) => void;
  updateCMS: (platform: string, field: keyof PlatformCMS, value: any) => void;
  updatePackage: (platform: string, pkgName: string, field: keyof PackageConfig, value: any) => void;
  addSlideshowImage: (platform: string, url: string) => void;
  removeSlideshowImage: (platform: string, index: number) => void;
  addCase: (platform: string, c: { title: string; before: string; after: string }) => void;
  removeCase: (platform: string, id: string) => void;
  updateRoadmap: (steps: SiteSettings["roadmap"]) => void;
  togglePresentationMode: () => void;
}

const defaultSettings: SiteSettings = {
  title: "Bứt Phá Marketing",
  hotline: "0937 417 982",
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
  visibility: {
    "slideshow": true,
    "intro": true,
    "pricing": true,
    "audit": true,
    "stats": true,
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
    facebook: { slideshow: [], cases: [] },
    tiktok: { slideshow: [], cases: [] },
    instagram: { slideshow: [], cases: [] },
    zalo: { slideshow: [], cases: [] },
    googlemaps: { slideshow: [], cases: [] },
    website: { slideshow: [], cases: [] },
    home: { slideshow: [], cases: [] },
  },
  roadmap: [
    { title: "Khởi tạo & Nghiên cứu", time: "Ngày 1 - 3", desc: "Phân tích đối thủ, xác định tệp khách hàng mục tiêu và lập kế hoạch nội dung chi tiết.", status: "completed" },
    { title: "Thiết lập Nền tảng", time: "Ngày 4 - 7", desc: "Tối ưu hóa Fanpage/Kênh, thiết kế bộ nhận diện thương hiệu chuẩn Agency.", status: "in_progress" },
    { title: "Sản xuất Nội dung", time: "Ngày 8 - 20", desc: "Lên bài viết, sản xuất video viral và thiết kế hình ảnh chuyên nghiệp hàng ngày.", status: "pending" },
    { title: "Quảng cáo & Tăng trưởng", time: "Ngày 15 - 30", desc: "Triển khai các chiến dịch Ads, theo dõi chỉ số và tối ưu hóa chuyển đổi.", status: "pending" },
    { title: "Báo cáo & Tổng kết", time: "Ngày 30", desc: "Gửi báo cáo hiệu quả chi tiết và đề xuất kế hoạch cho giai đoạn tiếp theo.", status: "pending" }
  ],
  presentationMode: false,
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin_settings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSettings({
            ...defaultSettings,
            ...parsed,
            cms: { ...defaultSettings.cms, ...(parsed.cms || {}) },
            media: { ...defaultSettings.media, ...(parsed.media || {}) },
            colors: { ...defaultSettings.colors, ...(parsed.colors || {}) },
            presentationMode: false,
          });
        } catch (e) {
          console.error("Failed to parse admin settings", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("admin_settings", JSON.stringify({ ...settings, presentationMode: false }));
    }
  }, [settings, isLoaded]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateColor = (platform: string, color: string) => {
    setSettings(prev => ({
      ...prev,
      colors: { ...prev.colors, [platform]: color }
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
          ...(prev.media[platform] || { slideshow: [], cases: [] }),
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
          ...(prev.media[platform] || { slideshow: [], cases: [] }),
          cases: (prev.media[platform]?.cases || []).filter(c => c.id !== id)
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
      toggleVisibility,
      updateCMS,
      updatePackage,
      addSlideshowImage,
      removeSlideshowImage,
      addCase,
      removeCase,
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


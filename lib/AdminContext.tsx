"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface CaseStudyItem {
  id: string;
  title: string;
  before: string;
  after: string;
}

export interface MediaSection {
  videoUrl: string;
  slideshow: string[];
  cases: CaseStudyItem[];
}

export interface PackageConfig {
  price: string;
  features: string[];
  allFeatures: string[];
  audio: string;
}

export interface PlatformCMS {
  packages: Record<string, PackageConfig>;
}

export interface SeoIntegrationConfig {
  enabled: boolean;
  status: "disconnected" | "configured";
  label: string;
  propertyId: string;
  apiKey: string;
  siteUrl: string;
  notes: string;
}

export interface SiteSettings {
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  logo: string;
  favicon: string;
  content: string;
  hotline: string;
  address: string;
  email: string;
  zalo: string;
  fanpage: string;
  googleAnalytics: string;
  headJs: string;
  presentationMode: boolean;
  softSoundsEnabled: boolean;
  softSoundsVolume: number;
  mascotEnabled: boolean;
  mascotImage: string;
  mascotImages: Record<string, string>;
  mascotMessages: Record<string, string>;
  mascotAudioUrls: Record<string, string>;
  mascotSectionMessages: Record<string, Record<string, string>>;
  mascotErrorMessages: Record<string, { login: string; phone: string; link: string }>;
  mascotClickMessages: Record<string, string[]>;
  googleConsole: string;
  rankMath: string;
  aiKtp: string;
  seoPages: Record<string, { title: string; desc: string; keywords: string }>;
  media: Record<string, MediaSection>;
  cms: Record<string, PlatformCMS>;
  seoIntegrations: {
    searchConsole: SeoIntegrationConfig;
    ga4: SeoIntegrationConfig;
    rankTracker: SeoIntegrationConfig;
    siteCrawler: SeoIntegrationConfig;
  };
  colors: Record<string, string>;
  visibility: Record<string, boolean>;
  platformNames: Record<string, string>;
}

export interface AdminContextType {
  settings: SiteSettings;
  saveStatus: "idle" | "saving" | "saved" | "error";
  saveError: string | null;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateColor: (key: string, value: string) => void;
  updatePlatformName: (key: string, value: string) => void;
  toggleVisibility: (key: string, visible: boolean) => void;
  updateCMS: (platform: string, packageName: string, patch: Partial<PackageConfig>) => void;
  addSlideshowImage: (platform: string, imageUrl: string) => void;
  removeSlideshowImage: (platform: string, index: number) => void;
  addCase: (platform: string, item: Omit<CaseStudyItem, "id">) => void;
  removeCase: (platform: string, id: string) => void;
  updateMediaVideo: (platform: string, videoUrl: string) => void;
}

const SETTINGS_KEY = "admin_settings";
const MEDIA_KEYS = ["home", "facebook", "tiktok", "instagram", "zalo", "googlemaps", "website"] as const;
const COLOR_DEFAULTS: Record<string, string> = {
  primary: "#7C3AED",
  facebook: "#1877F2",
  tiktok: "#FF0050",
  instagram: "#E1306C",
  zalo: "#0068FF",
  googlemaps: "#EA4335",
  website: "#34A853",
};
const VISIBILITY_DEFAULTS: Record<string, boolean> = {
  facebook: true,
  tiktok: true,
  instagram: true,
  zalo: true,
  googlemaps: true,
  website: true,
  intro: true,
  audit: true,
  pricing: true,
  stats: true,
};
const PLATFORM_NAME_DEFAULTS: Record<string, string> = {
  facebook: "Facebook",
  tiktok: "TikTok",
  instagram: "Instagram",
  zalo: "Zalo",
  googlemaps: "Google Maps",
  website: "Website",
};

function createMediaSection(): MediaSection {
  return {
    videoUrl: "",
    slideshow: [],
    cases: [],
  };
}

function createDefaultMedia(): Record<string, MediaSection> {
  return MEDIA_KEYS.reduce<Record<string, MediaSection>>((acc, key) => {
    acc[key] = createMediaSection();
    return acc;
  }, {});
}

function createSeoIntegration(label: string): SeoIntegrationConfig {
  return {
    enabled: false,
    status: "disconnected",
    label,
    propertyId: "",
    apiKey: "",
    siteUrl: "",
    notes: "",
  };
}

const defaultSettings: SiteSettings = {
  title: "Bứt Phá Marketing",
  heroTitle: "Bứt Phá Marketing",
  heroSubtitle: "",
  logo: "/logo.jpg",
  favicon: "/favicon.svg",
  content: "",
  hotline: "0937 417 982",
  address: "",
  email: "",
  zalo: "",
  fanpage: "",
  googleAnalytics: "G-D0XPZGPZNG",
  headJs: "",
  presentationMode: false,
  softSoundsEnabled: true,
  softSoundsVolume: 0.05,
  mascotEnabled: true,
  mascotImage: "/mascot-dragon.svg",
  mascotImages: {},
  mascotMessages: {},
  mascotAudioUrls: {},
  mascotSectionMessages: {},
  mascotErrorMessages: {},
  mascotClickMessages: {},
  googleConsole: "yI86M3LPIZJ0BMd_N3yQNz0QVgL0pNlfkUjqZpAxjpA",
  rankMath: "",
  aiKtp: "",
  seoPages: {},
  media: createDefaultMedia(),
  cms: {},
  seoIntegrations: {
    searchConsole: createSeoIntegration("Google Search Console"),
    ga4: createSeoIntegration("Google Analytics 4"),
    rankTracker: createSeoIntegration("Rank Tracker / SERP API"),
    siteCrawler: createSeoIntegration("Website Crawler"),
  },
  colors: COLOR_DEFAULTS,
  visibility: VISIBILITY_DEFAULTS,
  platformNames: PLATFORM_NAME_DEFAULTS,
};

function mergePackageConfig(parsed?: Partial<PackageConfig>): PackageConfig {
  return {
    price: parsed?.price ?? "",
    features: parsed?.features ?? [],
    allFeatures: parsed?.allFeatures ?? [],
    audio: parsed?.audio ?? "",
  };
}

function mergeMediaSection(parsed?: Partial<MediaSection>): MediaSection {
  return {
    videoUrl: parsed?.videoUrl ?? "",
    slideshow: parsed?.slideshow ?? [],
    cases: parsed?.cases ?? [],
  };
}

function mergeCms(parsed: Partial<SiteSettings>["cms"]): Record<string, PlatformCMS> {
  const merged: Record<string, PlatformCMS> = {};
  const source = parsed ?? {};

  for (const [platform, config] of Object.entries(source)) {
    const packages = config?.packages ?? {};
    merged[platform] = {
      packages: Object.fromEntries(
        Object.entries(packages).map(([packageName, packageConfig]) => [
          packageName,
          mergePackageConfig(packageConfig),
        ]),
      ),
    };
  }

  return merged;
}

function mergeMedia(parsed: Partial<SiteSettings>["media"]): Record<string, MediaSection> {
  const merged = createDefaultMedia();
  const source = parsed ?? {};

  for (const [key, value] of Object.entries(source)) {
    merged[key] = mergeMediaSection(value);
  }

  return merged;
}

function mergeWithDefaults(parsed: Partial<SiteSettings> | null | undefined): SiteSettings {
  if (!parsed) return defaultSettings;

  return {
    ...defaultSettings,
    ...parsed,
    media: mergeMedia(parsed.media),
    cms: mergeCms(parsed.cms),
    seoIntegrations: {
      searchConsole: {
        ...defaultSettings.seoIntegrations.searchConsole,
        ...(parsed.seoIntegrations?.searchConsole ?? {}),
      },
      ga4: {
        ...defaultSettings.seoIntegrations.ga4,
        ...(parsed.seoIntegrations?.ga4 ?? {}),
      },
      rankTracker: {
        ...defaultSettings.seoIntegrations.rankTracker,
        ...(parsed.seoIntegrations?.rankTracker ?? {}),
      },
      siteCrawler: {
        ...defaultSettings.seoIntegrations.siteCrawler,
        ...(parsed.seoIntegrations?.siteCrawler ?? {}),
      },
    },
    colors: { ...COLOR_DEFAULTS, ...(parsed.colors ?? {}) },
    visibility: { ...VISIBILITY_DEFAULTS, ...(parsed.visibility ?? {}) },
    platformNames: { ...PLATFORM_NAME_DEFAULTS, ...(parsed.platformNames ?? {}) },
    mascotImage: parsed.mascotImage ?? defaultSettings.mascotImage,
    mascotImages: { ...defaultSettings.mascotImages, ...(parsed.mascotImages ?? {}) },
    mascotMessages: { ...defaultSettings.mascotMessages, ...(parsed.mascotMessages ?? {}) },
    mascotAudioUrls: { ...defaultSettings.mascotAudioUrls, ...(parsed.mascotAudioUrls ?? {}) },
    mascotSectionMessages: {
      ...defaultSettings.mascotSectionMessages,
      ...(parsed.mascotSectionMessages ?? {}),
    },
    mascotErrorMessages: {
      ...defaultSettings.mascotErrorMessages,
      ...(parsed.mascotErrorMessages ?? {}),
    },
    mascotClickMessages: {
      ...defaultSettings.mascotClickMessages,
      ...(parsed.mascotClickMessages ?? {}),
    },
    googleConsole: parsed.googleConsole ?? "",
    rankMath: parsed.rankMath ?? "",
    aiKtp: parsed.aiKtp ?? "",
    logo: parsed.logo ?? defaultSettings.logo,
    favicon: parsed.favicon ?? defaultSettings.favicon,
    seoPages: parsed.seoPages ?? {},
    presentationMode: parsed.presentationMode ?? false,
    softSoundsEnabled: parsed.softSoundsEnabled ?? true,
    softSoundsVolume: parsed.softSoundsVolume ?? 0.05,
    mascotEnabled: parsed.mascotEnabled ?? true,
  };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return "Không thể lưu thay đổi. Vui lòng thử lại.";
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const persistTimerRef = useRef<number | null>(null);
  const saveStatusTimerRef = useRef<number | null>(null);
  const lastSavedRef = useRef("");
  const lastConfirmedSettingsRef = useRef<SiteSettings>(defaultSettings);
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const channel = new BroadcastChannel("admin_settings_channel");
    channel.onmessage = (event: MessageEvent<{ type?: string; value?: string }>) => {
      if (event.data?.type !== "settings_update" || !event.data.value) return;
      try {
        const parsed = JSON.parse(event.data.value) as Partial<SiteSettings>;
        setSettings(mergeWithDefaults(parsed));
      } catch (error) {
        console.error("[AdminContext] Failed to parse broadcast settings", error);
      }
    };
    channelRef.current = channel;

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, []);

  const broadcastSettings = (nextSettings: SiteSettings) => {
    try {
      channelRef.current?.postMessage({
        type: "settings_update",
        value: JSON.stringify(nextSettings),
      });
    } catch (error) {
      console.error("[AdminContext] Failed to broadcast settings", error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      try {
        const res = await fetch(`/api/settings?key=${SETTINGS_KEY}`, { cache: "no-store" });
        const text = await res.text();
        const parsed = text ? (JSON.parse(text) as { ok?: boolean; value?: Partial<SiteSettings> | null }) : null;

        if (mounted && res.ok && parsed?.ok) {
          const merged = mergeWithDefaults(parsed.value ?? undefined);
          lastConfirmedSettingsRef.current = merged;
          lastSavedRef.current = JSON.stringify({
            ...merged,
            presentationMode: false,
          });
          setSettings(merged);
          return;
        }
      } catch (error) {
        console.error("[AdminContext] Failed to load settings", error);
      } finally {
        if (mounted) setIsLoaded(true);
      }

      if (mounted) setSettings(defaultSettings);
    };

    void loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;

    const cleanSettings: SiteSettings = {
      ...settings,
      presentationMode: false,
    };
    const payload = JSON.stringify(cleanSettings);

    if (payload === lastSavedRef.current) return;
    if (persistTimerRef.current) window.clearTimeout(persistTimerRef.current);

    persistTimerRef.current = window.setTimeout(async () => {
      try {
        setSaveStatus("saving");
        setSaveError(null);

        let lastError = "Không thể lưu thay đổi. Vui lòng thử lại.";
        let saved = false;

        for (let attempt = 0; attempt < 3; attempt += 1) {
          const res = await fetch("/api/settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key: SETTINGS_KEY, value: cleanSettings }),
          });

          let parsed: { ok?: boolean; error?: string } | null = null;
          try {
            parsed = (await res.json()) as { ok?: boolean; error?: string };
          } catch {
            parsed = null;
          }

          if (res.ok && parsed?.ok) {
            saved = true;
            break;
          }

          lastError = parsed?.error || `Lưu thất bại (${res.status})`;
          if (attempt < 2) {
            await new Promise((resolve) => window.setTimeout(resolve, 800));
          }
        }

        if (!saved) {
          const rollback = lastConfirmedSettingsRef.current;
          setSaveStatus("error");
          setSaveError(lastError);
          setSettings(rollback);
          broadcastSettings(rollback);
          return;
        }

        lastSavedRef.current = payload;
        lastConfirmedSettingsRef.current = cleanSettings;
        setSaveStatus("saved");
        setSaveError(null);
        if (saveStatusTimerRef.current) window.clearTimeout(saveStatusTimerRef.current);
        saveStatusTimerRef.current = window.setTimeout(() => {
          setSaveStatus("idle");
        }, 1600);
      } catch (error) {
        console.error("[AdminContext] Failed to persist settings", error);
        const rollback = lastConfirmedSettingsRef.current;
        setSaveStatus("error");
        setSaveError(getErrorMessage(error));
        setSettings(rollback);
        broadcastSettings(rollback);
      }
    }, 300);

    return () => {
      if (persistTimerRef.current) window.clearTimeout(persistTimerRef.current);
    };
  }, [isLoaded, settings]);

  const setAndBroadcast = (updater: (prev: SiteSettings) => SiteSettings) => {
    setSettings((prev) => {
      const next = mergeWithDefaults(updater(prev));
      broadcastSettings(next);
      return next;
    });
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setAndBroadcast((prev) => ({
      ...prev,
      ...newSettings,
    }));
  };

  const updateColor = (key: string, value: string) => {
    setAndBroadcast((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value,
      },
    }));
  };

  const updatePlatformName = (key: string, value: string) => {
    setAndBroadcast((prev) => ({
      ...prev,
      platformNames: {
        ...prev.platformNames,
        [key]: value,
      },
    }));
  };

  const toggleVisibility = (key: string, visible: boolean) => {
    setAndBroadcast((prev) => ({
      ...prev,
      visibility: {
        ...prev.visibility,
        [key]: visible,
      },
    }));
  };

  const updateCMS = (platform: string, packageName: string, patch: Partial<PackageConfig>) => {
    setAndBroadcast((prev) => {
      const platformCms = prev.cms[platform] ?? { packages: {} };
      const existingPackage = platformCms.packages[packageName];

      return {
        ...prev,
        cms: {
          ...prev.cms,
          [platform]: {
            packages: {
              ...platformCms.packages,
              [packageName]: {
                ...mergePackageConfig(existingPackage),
                ...patch,
                features: patch.features ?? existingPackage?.features ?? [],
                allFeatures: patch.allFeatures ?? existingPackage?.allFeatures ?? [],
                audio: patch.audio ?? existingPackage?.audio ?? "",
              },
            },
          },
        },
      };
    });
  };

  const addSlideshowImage = (platform: string, imageUrl: string) => {
    setAndBroadcast((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        [platform]: {
          ...mergeMediaSection(prev.media[platform]),
          slideshow: [...mergeMediaSection(prev.media[platform]).slideshow, imageUrl],
        },
      },
    }));
  };

  const removeSlideshowImage = (platform: string, index: number) => {
    setAndBroadcast((prev) => {
      const mediaSection = mergeMediaSection(prev.media[platform]);
      return {
        ...prev,
        media: {
          ...prev.media,
          [platform]: {
            ...mediaSection,
            slideshow: mediaSection.slideshow.filter((_, currentIndex) => currentIndex !== index),
          },
        },
      };
    });
  };

  const addCase = (platform: string, item: Omit<CaseStudyItem, "id">) => {
    setAndBroadcast((prev) => {
      const mediaSection = mergeMediaSection(prev.media[platform]);
      const nextId = `${Date.now()}-${mediaSection.cases.length + 1}`;

      return {
        ...prev,
        media: {
          ...prev.media,
          [platform]: {
            ...mediaSection,
            cases: [...mediaSection.cases, { ...item, id: nextId }],
          },
        },
      };
    });
  };

  const removeCase = (platform: string, id: string) => {
    setAndBroadcast((prev) => {
      const mediaSection = mergeMediaSection(prev.media[platform]);
      return {
        ...prev,
        media: {
          ...prev.media,
          [platform]: {
            ...mediaSection,
            cases: mediaSection.cases.filter((entry) => entry.id !== id),
          },
        },
      };
    });
  };

  const updateMediaVideo = (platform: string, videoUrl: string) => {
    setAndBroadcast((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        [platform]: {
          ...mergeMediaSection(prev.media[platform]),
          videoUrl,
        },
      },
    }));
  };

  return (
    <AdminContext.Provider
      value={{
        settings,
        saveStatus,
        saveError,
        updateSettings,
        updateColor,
        updatePlatformName,
        toggleVisibility,
        updateCMS,
        addSlideshowImage,
        removeSlideshowImage,
        addCase,
        removeCase,
        updateMediaVideo,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used inside AdminProvider");
  }
  return context;
}

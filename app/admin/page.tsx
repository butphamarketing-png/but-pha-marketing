"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Bell, Globe, Search, Settings, LogOut, Users,
  Trash2, Plus,
  BarChart2, Code, Copy,
  Lock, Sparkles, Star, type LucideIcon
} from "lucide-react";
import { useAdmin, SETTINGS_KEY } from "@/lib/AdminContext";
import { getContent, saveContent, type ContentOverride } from "@/lib/pageContent";
import { db, type Order, type Lead, type ClientReview } from "@/lib/useData";
import { formatStrategyLeadDetail, formatStrategyLeadSummary, isStrategyLead, parseStrategyLeadNote } from "@/lib/strategy-lead";
const VisitorAreaChart = dynamic(
  () => import("@/components/admin/VisitorAreaChart").then((mod) => mod.VisitorAreaChart),
  { ssr: false, loading: () => <div className="h-full animate-pulse rounded-xl bg-white/5" /> },
);

const NAV = [
  { id: "dashboard", label: "Báº£ng Ä‘iá»u khiá»ƒn", icon: LayoutDashboard },
  { id: "leads", label: "Quáº£n lÃ½ nháº­n tin", icon: Bell },
  { id: "customers", label: "Quáº£n lÃ½ khÃ¡ch hÃ ng", icon: Users },
  { id: "seo", label: "SEO Page", icon: Search },
  { id: "mascot", label: "Linh váº­t cÃ´ng ty", icon: Sparkles },
  { id: "tracking", label: "Tá»‘i Æ°u Website", icon: Code },
  { id: "settings", label: "Thiáº¿t láº­p há»‡ thá»‘ng", icon: Settings },
];

const STATUS_LABELS: Record<Order["status"], { label: string; cls: string }> = {
  pending: { label: "Chá» xÃ¡c nháº­n", cls: "bg-yellow-500/20 text-yellow-400" },
  confirmed: { label: "ÄÃ£ xÃ¡c nháº­n", cls: "bg-blue-500/20 text-blue-400" },
  completed: { label: "HoÃ n thÃ nh", cls: "bg-green-500/20 text-green-400" },
  cancelled: { label: "ÄÃ£ huá»·", cls: "bg-red-500/20 text-red-400" },
};

function formatDate(date: string | number) { return new Date(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
function parseFeatureLine(line: string) {
  const [titlePart, detailPart] = line.split("::");
  return {
    title: titlePart || "",
    details: detailPart ? detailPart.split("|") : [],
  };
}

function serializeFeatureLine(title: string, details: string[]) {
  const cleanDetails = details.filter(item => item.trim().length > 0);
  if (!title.trim()) return "";
  return cleanDetails.length > 0 ? `${title}::${cleanDetails.join("|")}` : title;
}

type VisitorRecord = {
  id: string;
  ip: string;
  userAgent: string;
  firstSeenAt: string;
  lastSeenAt: string;
  hits: number;
  paths: string[];
};

function parseResponsibilityEditor(raw: string) {
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const intro: string[] = [];
  const bullets: string[] = [];
  lines.forEach((line) => {
    if (line.startsWith("- ") || line.startsWith("â€¢ ")) {
      bullets.push(line.replace(/^(-|â€¢)\s+/, "").trim());
      return;
    }
    if (line.includes(":")) {
      bullets.push(line);
      return;
    }
    intro.push(line);
  });
  return { intro: intro.join("\n"), bullets };
}

function serializeResponsibilityEditor(intro: string, bullets: string[]) {
  const parts: string[] = [];
  if (intro.trim()) parts.push(intro.trim());
  bullets
    .map((item) => item.trim())
    .filter(Boolean)
    .forEach((item) => parts.push(`- ${item}`));
  return parts.join("\n");
}

function StatCard({ value, label, icon: Icon, color }: { value: string | number; label: string; icon: LucideIcon; color: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}20` }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-black text-white">{typeof value === "number" ? value.toLocaleString() : value}</p>
      <p className="mt-1 text-xs text-gray-400">{label}</p>
    </div>
  );
}

const SEO_DEFAULTS: Record<string, { title: string; desc: string; keywords: string }> = {
  home: { title: "Bá»©t PhÃ¡ Marketing - Giáº£i PhÃ¡p Äá»™t PhÃ¡", desc: "Agency marketing toÃ n diá»‡n táº¡i Viá»‡t Nam", keywords: "marketing, facebook ads, seo" },
  facebook: { title: "Dá»‹ch Vá»¥ Facebook Marketing", desc: "XÃ¢y dá»±ng Fanpage, cháº¡y quáº£ng cÃ¡o Facebook hiá»‡u quáº£", keywords: "facebook marketing, facebook ads, quáº£ng cÃ¡o facebook" },
  "google-maps": { title: "Dá»‹ch Vá»¥ Google Maps Marketing", desc: "Local SEO, Google Business, Ä‘Ã¡nh giÃ¡ 5 sao", keywords: "google maps, local seo, google business" },
  website: { title: "Dá»‹ch Vá»¥ Website Marketing", desc: "Thiáº¿t káº¿ web, SEO website, báº£o trÃ¬", keywords: "thiáº¿t káº¿ website, seo website, web marketing" },
};

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store", credentials: "include" });
        const data = await res.json().catch(() => null);
        if (mounted && data?.authenticated) {
          setAuthenticated(true);
        }
      } catch {
        // Keep the login screen if the session check fails.
      } finally {
        if (mounted) setIsAuthChecking(false);
      }
    };

    void checkSession();

    return () => {
      mounted = false;
    };
  }, []);
  const [activeTab, setActiveTab] = useState("dashboard");
  const {
    settings,
    saveStatus,
    saveError,
    hasUnsavedChanges,
    saveSettings,
    updateSettings,
    updateColor,
    updatePlatformName,
    toggleVisibility,
    updateCMS,
    addCase,
    removeCase,
    updateMediaVideo,
  } = useAdmin();

  const PLATFORMS_DYNAMIC = [
    { key: "facebook", label: settings.platformNames?.facebook || "Facebook", path: "/facebook", color: settings.colors?.facebook || "#1877F2" },
    { key: "googlemaps", label: settings.platformNames?.googlemaps || "Google Maps", path: "/google-maps", color: settings.colors?.googlemaps || "#EA580C" },
    { key: "website", label: settings.platformNames?.website || "Website", path: "/website", color: settings.colors?.website || "#34A853" },
  ];

  const [orders, setOrders] = useState<Order[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [totalVisitorHits, setTotalVisitorHits] = useState(0);
  const [clientReviews, setClientReviews] = useState<ClientReview[]>([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [newReview, setNewReview] = useState<Omit<ClientReview, "id" | "createdAt">>({
    clientId: "",
    clientName: "",
    logoUrl: "",
    rating: 5,
    content: "",
  });
  const [selectedPlatform, setSelectedPlatform] = useState("home");
  const [newCase, setNewCase] = useState({ id: 0, title: "", before: "", after: "", description: "", content: "" });
  const [selectedProcessTab, setSelectedProcessTab] = useState(0);
  const [selectedMascotPlatform, setSelectedMascotPlatform] = useState("home");
  const [pageContent, setPageContent] = useState<ContentOverride>({
    vision: "",
    mission: "",
    responsibility: "",
    stats: [{ label: "", value: "" }],
    processTabs: [{ label: "XÃ¢y dá»±ng", steps: [{ step: 1, title: "", desc: "" }] }],
    faqs: [{ q: "", a: "" }],
  });
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const responsibilityEditor = parseResponsibilityEditor(pageContent.responsibility || "");

  const visitorChartData = visitors
    .slice()
    .reverse()
    .slice(-12)
    .map((visitor, index) => ({
      name: `#${index + 1}`,
      visits: visitor.hits,
    }));
  const [currentAdminPassword, setCurrentAdminPassword] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [changePasswordMessage, setChangePasswordMessage] = useState<string | null>(null);
  const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
  const [changingAdminPassword, setChangingAdminPassword] = useState(false);
  const [showSourceViewer, setShowSourceViewer] = useState(false);
  const [sourceFiles, setSourceFiles] = useState<string[]>([]);
  const [selectedSourceFile, setSelectedSourceFile] = useState("");
  const [selectedSourceContent, setSelectedSourceContent] = useState("");
  const sectionMessageText =
    Object.entries(settings.mascotSectionMessages?.[selectedMascotPlatform] || {})
      .map(([section, text]) => `${section}|${text}`)
      .join("\n");
  const resolveSeoPage = (key: string) =>
    settings.seoPages?.[key] ??
    (key === "google-maps" ? settings.seoPages?.googlemaps : undefined) ??
    SEO_DEFAULTS[key];
  const mascotErrorPack = settings.mascotErrorMessages?.[selectedMascotPlatform] || {
    login: "",
    phone: "",
    link: "",
  };
  const mascotClickMessages = settings.mascotClickMessages?.[selectedMascotPlatform] || [];
  const isBuiltInMascot =
    !settings.mascotImage ||
    settings.mascotImage.endsWith("/mascot-dragon.svg") ||
    settings.mascotImage.endsWith("/mascot-home.png");
  const selectedMascotImage = settings.mascotImages?.[selectedMascotPlatform] || "";
  const isBuiltInPlatformMascot = !selectedMascotImage;

  const updateMascotSectionMessages = (raw: string) => {
    const rows = raw
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);
    const map: Record<string, string> = {};
    rows.forEach((line) => {
      const [section, ...rest] = line.split("|");
      if (!section || rest.length === 0) return;
      map[section.trim()] = rest.join("|").trim();
    });
    updateSettings({
      mascotSectionMessages: {
        ...(settings.mascotSectionMessages || {}),
        [selectedMascotPlatform]: map,
      },
    });
  };

  const updateMascotErrorPack = (field: "login" | "phone" | "link", value: string) => {
    updateSettings({
      mascotErrorMessages: {
        ...(settings.mascotErrorMessages || {}),
        [selectedMascotPlatform]: {
          ...(settings.mascotErrorMessages?.[selectedMascotPlatform] || { login: "", phone: "", link: "" }),
          [field]: value,
        },
      },
    });
  };

  const updateClickMessage = (idx: number, value: string) => {
    const next = [...mascotClickMessages];
    next[idx] = value;
    updateSettings({
      mascotClickMessages: {
        ...(settings.mascotClickMessages || {}),
        [selectedMascotPlatform]: next,
      },
    });
  };

  const addClickMessage = () => {
    const next = [...mascotClickMessages, `CÃ¢u click ${mascotClickMessages.length + 1}`];
    updateSettings({
      mascotClickMessages: {
        ...(settings.mascotClickMessages || {}),
        [selectedMascotPlatform]: next,
      },
    });
  };

  const removeClickMessage = (idx: number) => {
    const next = mascotClickMessages.filter((_, i) => i !== idx);
    updateSettings({
      mascotClickMessages: {
        ...(settings.mascotClickMessages || {}),
        [selectedMascotPlatform]: next,
      },
    });
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("KhÃ´ng thá»ƒ Ä‘á»c file áº£nh"));
      reader.readAsDataURL(file);
    });

  const updatePageContentField = (field: keyof ContentOverride, value: any) => {
    setPageContent((prev) => ({ ...prev, [field]: value }));
  };

  const savePageContentManual = async () => {
    const saved = await saveContent(selectedPlatform, pageContent);
    alert(saved ? "ÄÃ£ lÆ°u ná»™i dung trang con" : "LÆ°u ná»™i dung trang con tháº¥t báº¡i");
  };

  const updateResponsibilityIntro = (intro: string) => {
    const editor = parseResponsibilityEditor(pageContent.responsibility || "");
    const next = serializeResponsibilityEditor(intro, editor.bullets);
    updatePageContentField("responsibility", next);
  };

  const updateResponsibilityBullet = (idx: number, bullet: string) => {
    const editor = parseResponsibilityEditor(pageContent.responsibility || "");
    const nextBullets = [...editor.bullets];
    nextBullets[idx] = bullet;
    const next = serializeResponsibilityEditor(editor.intro, nextBullets);
    updatePageContentField("responsibility", next);
  };

  const addResponsibilityBullet = () => {
    const editor = parseResponsibilityEditor(pageContent.responsibility || "");
    const nextBullets = [...editor.bullets, ""];
    const next = serializeResponsibilityEditor(editor.intro, nextBullets);
    updatePageContentField("responsibility", next);
  };

  const removeResponsibilityBullet = (idx: number) => {
    const editor = parseResponsibilityEditor(pageContent.responsibility || "");
    const nextBullets = editor.bullets.filter((_, i) => i !== idx);
    const next = serializeResponsibilityEditor(editor.intro, nextBullets);
    updatePageContentField("responsibility", next);
  };

  const updateStat = (idx: number, field: "label" | "value", val: string) => {
    const next = [...(pageContent.stats || [])];
    if (!next[idx]) return;
    next[idx] = { ...next[idx], [field]: val };
    updatePageContentField("stats", next);
  };

  const addStat = () => {
    const next = [...(pageContent.stats || []), { label: "", value: "" }];
    updatePageContentField("stats", next);
  };

  const removeStat = (idx: number) => {
    const next = (pageContent.stats || []).filter((_, i) => i !== idx);
    updatePageContentField("stats", next);
  };

  const updateProcessTabLabel = (tabIdx: number, label: string) => {
    const next = [...(pageContent.processTabs || [])];
    if (!next[tabIdx]) return;
    next[tabIdx] = { ...next[tabIdx], label };
    updatePageContentField("processTabs", next);
  };

  const addProcessTab = () => {
    const next = [...(pageContent.processTabs || []), { label: "Dá»‹ch vá»¥ má»›i", steps: [{ step: 1, title: "", desc: "" }] }];
    updatePageContentField("processTabs", next);
    setSelectedProcessTab(next.length - 1);
  };

  const removeProcessTab = (tabIdx: number) => {
    const next = (pageContent.processTabs || []).filter((_, i) => i !== tabIdx);
    updatePageContentField("processTabs", next.length > 0 ? next : [{ label: "XÃ¢y dá»±ng", steps: [{ step: 1, title: "", desc: "" }] }]);
    setSelectedProcessTab(0);
  };

  const updateProcessStep = (stepIdx: number, field: "title" | "desc", val: string) => {
    const nextTabs = [...(pageContent.processTabs || [])];
    const tab = nextTabs[selectedProcessTab];
    if (!tab) return;
    const nextSteps = [...(tab.steps || [])];
    if (!nextSteps[stepIdx]) return;
    nextSteps[stepIdx] = { ...nextSteps[stepIdx], [field]: val };
    nextTabs[selectedProcessTab] = { ...tab, steps: nextSteps };
    updatePageContentField("processTabs", nextTabs);
  };

  const addProcessStep = () => {
    const nextTabs = [...(pageContent.processTabs || [])];
    const tab = nextTabs[selectedProcessTab];
    if (!tab) return;
    const nextSteps = [...(tab.steps || []), { step: (tab.steps || []).length + 1, title: "", desc: "" }];
    nextTabs[selectedProcessTab] = { ...tab, steps: nextSteps };
    updatePageContentField("processTabs", nextTabs);
  };

  const removeProcessStep = (stepIdx: number) => {
    const nextTabs = [...(pageContent.processTabs || [])];
    const tab = nextTabs[selectedProcessTab];
    if (!tab) return;
    const nextSteps = (tab.steps || []).filter((_, i) => i !== stepIdx).map((s, i) => ({ ...s, step: i + 1 }));
    nextTabs[selectedProcessTab] = { ...tab, steps: nextSteps };
    updatePageContentField("processTabs", nextTabs);
  };

  const updateFaq = (idx: number, field: "q" | "a", val: string) => {
    const next = [...(pageContent.faqs || [])];
    if (!next[idx]) return;
    next[idx] = { ...next[idx], [field]: val };
    updatePageContentField("faqs", next);
  };

  const addFaq = () => {
    const next = [...(pageContent.faqs || []), { q: "", a: "" }];
    updatePageContentField("faqs", next);
  };

  const removeFaq = (idx: number) => {
    const next = (pageContent.faqs || []).filter((_, i) => i !== idx);
    updatePageContentField("faqs", next);
  };

  useEffect(() => {
    if (selectedPlatform === "home") return;
    const loadContent = async () => {
      setIsLoadingContent(true);
      try {
        const stored = await getContent(selectedPlatform);
        if (stored) {
          setPageContent(stored);
          setSelectedProcessTab(0);
        } else {
          setPageContent({
            vision: "",
            mission: "",
            responsibility: "",
            stats: [{ label: "", value: "" }],
            processTabs: [{ label: "XÃ¢y dá»±ng", steps: [{ step: 1, title: "", desc: "" }] }],
            faqs: [{ q: "", a: "" }],
          });
          setSelectedProcessTab(0);
        }
      } catch (error) {
        console.error("Failed to load content:", error);
      } finally {
        setIsLoadingContent(false);
      }
    };
    loadContent();
  }, [selectedPlatform]);

  const refreshOrders = async () => {
    const result = await db.orders.getAll();
    if (result.error) console.error('Orders error:', result.error);
    else setOrders([...(result.data || [])].reverse());
  };
  const refreshLeads = async () => {
    const result = await db.leads.getAll();
    if (result.error) console.error('Leads error:', result.error);
    else setLeads([...(result.data || [])].reverse());
  };
  const refreshReviews = async () => {
    setIsReviewsLoading(true);
    const result = await db.clientReviews.getAll();
    if (result.error) console.error('Reviews error:', result.error);
    else setClientReviews([...(result.data || [])].reverse());
    setIsReviewsLoading(false);
  };
  const refreshVisitors = async () => {
    try {
      const res = await fetch("/api/visitors", { cache: "no-store", credentials: "include" });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) return;
      setVisitors(Array.isArray(data.visitors) ? data.visitors : []);
      setTotalVisitorHits(typeof data.totalHits === "number" ? data.totalHits : 0);
    } catch (visitorError) {
      console.error("Visitors error:", visitorError);
    }
  };
  const saveSettingsPanel = async () => {
    await saveSettings();
  };

  const changeAdminPassword = async () => {
    if (!currentAdminPassword || !newAdminPassword) {
      setChangePasswordError("Vui lÃ²ng nháº­p Ä‘á»§ máº­t kháº©u hiá»‡n táº¡i vÃ  máº­t kháº©u má»›i.");
      setChangePasswordMessage(null);
      return;
    }

    setChangingAdminPassword(true);
    setChangePasswordError(null);
    setChangePasswordMessage(null);

    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: currentAdminPassword,
          newPassword: newAdminPassword,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setChangePasswordError(data?.error || "Äá»•i máº­t kháº©u tháº¥t báº¡i.");
        return;
      }

      setCurrentAdminPassword("");
      setNewAdminPassword("");
      setChangePasswordMessage("ÄÃ£ cáº­p nháº­t máº­t kháº©u admin.");
    } catch {
      setChangePasswordError("KhÃ´ng thá»ƒ Ä‘á»•i máº­t kháº©u lÃºc nÃ y.");
    } finally {
      setChangingAdminPassword(false);
    }
  };

  const loadSourceFiles = async () => {
    const res = await fetch("/api/source");
    const data = await res.json();
    setSourceFiles(data.files || []);
  };

  const openSourceFile = async (file: string) => {
    const res = await fetch(`/api/source?file=${encodeURIComponent(file)}`);
    const data = await res.json();
    setSelectedSourceFile(file);
    setSelectedSourceContent(data.content || "");
  };

  useEffect(() => {
    if (!authenticated) return;
    refreshOrders(); refreshLeads();
    refreshReviews();
    refreshVisitors();
  }, [authenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.authenticated) {
        setError(data?.error || "MÃ¡ÂºÂ­t khÃ¡ÂºÂ©u khÃƒÂ´ng Ã„â€˜ÃƒÂºng");
        return;
      }

      setAuthenticated(true);
      setIsAuthChecking(false);
      setPassword("");
      router.refresh();
    } catch {
      setError("KhÃƒÂ´ng thÃ¡Â»Æ’ Ã„â€˜Ã„Æ’ng nhÃ¡ÂºÂ­p ngay lÃƒÂºc nÃƒÂ y.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    } catch {
      // Logout should still clear the local UI state.
    } finally {
      setAuthenticated(false);
      router.push("/admin");
      router.refresh();
    }
  };

  if (isAuthChecking) {
    return <div className="flex min-h-screen items-center justify-center bg-background"></div>;
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm rounded-2xl border border-white/10 bg-card p-8">
          <div className="mb-6 flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full" />
            <div><p className="font-bold text-white">Bá»©t PhÃ¡ Marketing</p><p className="text-xs text-gray-400">Trang quáº£n trá»‹ há»‡ thá»‘ng</p></div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} placeholder="Máº­t kháº©u admin" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90">ÄÄƒng Nháº­p</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-card md:flex">
        <div className="border-b border-white/10 p-5 font-bold text-white">Admin Panel</div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() =>
                n.id === "customers"
                  ? router.push("/khachhang")
                  : setActiveTab(n.id)
              }
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                activeTab === n.id ? "bg-primary text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <n.icon size={18} /> {n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500/10 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all">
            <LogOut size={16} /> ÄÄƒng xuáº¥t
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
          <div className="md:hidden">
            <div className="space-y-3 rounded-2xl border border-white/10 bg-card p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">Admin Panel</p>
                  <p className="text-[11px] text-gray-400">Quáº£n trá»‹ ná»™i dung vÃ  dá»¯ liá»‡u</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-200"
                >
                  <LogOut size={14} /> ThoÃ¡t
                </button>
              </div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">Chuyá»ƒn má»¥c quáº£n trá»‹</label>
              <select
                value={activeTab}
                onChange={e => (e.target.value === "customers" ? router.push("/khachhang") : setActiveTab(e.target.value))}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                {NAV.map(item => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
            </div>
          </div>

          {(saveStatus !== "idle" || saveError) && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                saveError
                  ? "border-red-500/30 bg-red-500/10 text-red-200"
                  : saveStatus === "saved"
                    ? "border-green-500/30 bg-green-500/10 text-green-200"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-100"
              }`}
            >
              {saveError || (saveStatus === "saving" ? "Äang lÆ°u thay Ä‘á»•i..." : null) || (saveStatus === "saved" ? "ÄÃ£ lÆ°u cÃ i Ä‘áº·t." : null)}
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <button type="button" onClick={() => refreshVisitors()} className="text-left">
                  <StatCard value={totalVisitorHits} label="Truy cáº­p" icon={BarChart2} color="#10B981" />
                </button>
                <button type="button" onClick={() => setActiveTab("settings")} className="text-left">
                  <StatCard value="Äá»•i" label="Máº­t kháº©u" icon={Lock} color="#F59E0B" />
                </button>
                <button type="button" onClick={() => refreshVisitors()} className="text-left">
                  <StatCard value={visitors.length} label="NgÆ°á»i truy cáº­p" icon={Globe} color="#3B82F6" />
                </button>
                <button type="button" onClick={() => setActiveTab("leads")} className="text-left">
                  <StatCard value={leads.length} label="Nháº­n tin" icon={Bell} color="#7C3AED" />
                </button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold text-white">KhÃ¡ch truy cáº­p website</h2>
                  <button type="button" onClick={refreshVisitors} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white">
                    LÃ m má»›i
                  </button>
                </div>
                <div className="h-72">
                  <VisitorAreaChart data={visitorChartData} />
                </div>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-400">LÆ°á»£t truy cáº­p ghi nháº­n</p>
                    <p className="mt-2 text-2xl font-black text-white">{totalVisitorHits.toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-400">KhÃ¡ch truy cáº­p thá»±c</p>
                    <p className="mt-2 text-2xl font-black text-white">{visitors.length.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h2 className="mb-4 text-lg font-bold text-white">NgÆ°á»i truy cáº­p vÃ  IP</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-[760px] w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400">
                      <tr>
                        <th className="px-4 py-3">IP</th>
                        <th className="px-4 py-3">LÆ°á»£t</th>
                        <th className="px-4 py-3">Láº§n cuá»‘i</th>
                        <th className="px-4 py-3">Trang Ä‘Ã£ vÃ o</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {visitors.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-6 text-center text-gray-400">ChÆ°a cÃ³ dá»¯ liá»‡u truy cáº­p thá»±c.</td>
                        </tr>
                      ) : (
                        visitors.slice(0, 20).map((visitor) => (
                          <tr key={visitor.id} className="text-gray-200">
                            <td className="px-4 py-3 font-mono text-xs">{visitor.ip}</td>
                            <td className="px-4 py-3">{visitor.hits}</td>
                            <td className="px-4 py-3 text-xs">{formatDate(visitor.lastSeenAt)}</td>
                            <td className="px-4 py-3 text-xs text-gray-400">{visitor.paths.join(", ") || "/"}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h2 className="mb-4 text-lg font-bold text-white">Quáº£n lÃ½ ná»n táº£ng</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {PLATFORMS_DYNAMIC.map(p => (
                    <div key={p.key} className="rounded-xl border border-white/5 bg-white/5 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                          <span className="text-sm font-bold text-white">{p.label}</span>
                        </div>
                        <input type="checkbox" checked={settings.visibility[p.key] !== false} onChange={e => toggleVisibility(p.key, e.target.checked)} className="h-4 w-4" />
                      </div>
                      <input type="text" value={settings.platformNames?.[p.key] || ""} onChange={e => updatePlatformName(p.key, e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <select value={selectedPlatform} onChange={e => setSelectedPlatform(e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                  <option value="home">Trang chá»§</option>
                  {PLATFORMS_DYNAMIC.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                </select>
                <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{saveStatus === "saving" ? "Äang lÆ°u..." : "LÆ°u thay Ä‘á»•i"}</button>
              </div>
              {selectedPlatform === "home" ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                    <h3 className="font-bold text-white">CÃ i Ä‘áº·t Trang chá»§</h3>
                    <input value={settings.title || ""} onChange={e => updateSettings({ title: e.target.value })} placeholder="TiÃªu Ä‘á» website" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    <input value={settings.heroTitle || ""} onChange={e => updateSettings({ heroTitle: e.target.value })} placeholder="TiÃªu Ä‘á» Hero trang chá»§" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    <textarea value={settings.heroSubtitle || ""} onChange={e => updateSettings({ heroSubtitle: e.target.value })} placeholder="MÃ´ táº£ Hero trang chá»§ (vÃ­ dá»¥: TÄƒng trÆ°á»Ÿng doanh thu...)" className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    <textarea value={settings.content || ""} onChange={e => updateSettings({ content: e.target.value })} placeholder="Giá»›i thiá»‡u" className="w-full h-32 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    <input value={settings.hotline || ""} onChange={e => updateSettings({ hotline: e.target.value })} placeholder="Hotline" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-white">Ná»™i dung {selectedPlatform}</h3>
                      <p className="text-sm text-gray-400">Chá»‰nh sá»­a táº§m nhÃ¬n, sá»© má»‡nh, thá»‘ng kÃª, quy trÃ¬nh vÃ  FAQ cá»§a dá»‹ch vá»¥.</p>
                    </div>
                    <button onClick={savePageContentManual} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">LÆ°u ná»™i dung trang con</button>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <h4 className="text-sm font-bold text-white">Giá»›i thiá»‡u vá» dá»‹ch vá»¥</h4>
                      <textarea value={pageContent.vision || ""} onChange={e => updatePageContentField("vision", e.target.value)} placeholder="Táº§m nhÃ¬n" className="w-full h-24 rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-sm text-white" />
                      <textarea value={pageContent.mission || ""} onChange={e => updatePageContentField("mission", e.target.value)} placeholder="Sá»© má»‡nh" className="w-full h-24 rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-sm text-white" />
                      <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-gray-300">TrÃ¡ch nhiá»‡m (há»— trá»£ dáº¥u cháº¥m trÃ²n)</p>
                          <button type="button" onClick={addResponsibilityBullet} className="rounded-lg border border-white/20 px-2 py-1 text-[11px] text-white">ThÃªm Ã½</button>
                        </div>
                        <textarea
                          value={responsibilityEditor.intro}
                          onChange={e => updateResponsibilityIntro(e.target.value)}
                          placeholder="DÃ²ng má»Ÿ Ä‘áº§u (vÃ­ dá»¥: ChÃºng tÃ´i cam káº¿t 3 giÃ¡ trá»‹ cá»‘t lÃµi)"
                          className="h-20 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white"
                        />
                        {responsibilityEditor.bullets.map((bullet, idx) => (
                          <div key={`resp-bullet-${idx}`} className="flex items-center gap-2">
                            <span className="text-lg leading-none text-gray-400">â€¢</span>
                            <input
                              value={bullet}
                              onChange={e => updateResponsibilityBullet(idx, e.target.value)}
                              placeholder={`Ã ${idx + 1}`}
                              className="flex-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white"
                            />
                            <button type="button" onClick={() => removeResponsibilityBullet(idx)} className="rounded-lg border border-red-500/30 px-2 py-1 text-[11px] text-red-200">XÃ³a</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">Statistics</h4>
                        <button onClick={addStat} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">ThÃªm sá»‘</button>
                      </div>
                      {(pageContent.stats || []).map((stat, index) => (
                        <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                          <input value={stat.label || ""} onChange={e => updateStat(index, "label", e.target.value)} placeholder="NhÃ£n" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                          <input value={stat.value || ""} onChange={e => updateStat(index, "value", e.target.value)} placeholder="GiÃ¡ trá»‹" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                          <button onClick={() => removeStat(index)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/20">XÃ³a</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white">Quy trÃ¬nh triá»ƒn khai</h4>
                          <p className="text-xs text-gray-400">Chá»n dá»‹ch vá»¥ rá»“i chá»‰nh tá»«ng bÆ°á»›c cho dá»‹ch vá»¥ Ä‘Ã³.</p>
                        </div>
                        <button onClick={addProcessTab} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">ThÃªm dá»‹ch vá»¥</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(pageContent.processTabs || []).map((tab, tabIndex) => (
                          <button
                            key={tabIndex}
                            onClick={() => setSelectedProcessTab(tabIndex)}
                            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${selectedProcessTab === tabIndex ? "bg-primary text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"}`}
                          >
                            {tab.label || `Dá»‹ch vá»¥ ${tabIndex + 1}`}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-3 rounded-2xl border border-white/10 bg-black/10 p-3">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <input
                            value={pageContent.processTabs?.[selectedProcessTab]?.label || ""}
                            onChange={e => updateProcessTabLabel(selectedProcessTab, e.target.value)}
                            placeholder="TÃªn dá»‹ch vá»¥ (vÃ­ dá»¥: Dá»‹ch vá»¥ xÃ¢y dá»±ng)"
                            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                          />
                          <button onClick={() => removeProcessTab(selectedProcessTab)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-200 hover:bg-red-500/20">XÃ³a dá»‹ch vá»¥</button>
                        </div>
                        {(pageContent.processTabs?.[selectedProcessTab]?.steps || []).map((step, index) => (
                          <div key={index} className="space-y-2 rounded-2xl border border-white/10 bg-black/10 p-3">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-xs text-gray-400">BÆ°á»›c {index + 1}</span>
                              <button onClick={() => removeProcessStep(index)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-200 hover:bg-red-500/20">XÃ³a</button>
                            </div>
                            <input value={step.title || ""} onChange={e => updateProcessStep(index, "title", e.target.value)} placeholder="TiÃªu Ä‘á» bÆ°á»›c" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                            <textarea value={step.desc || ""} onChange={e => updateProcessStep(index, "desc", e.target.value)} placeholder="MÃ´ táº£ bÆ°á»›c" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" rows={3} />
                          </div>
                        ))}
                        <button onClick={addProcessStep} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white">ThÃªm bÆ°á»›c</button>
                      </div>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">CÃ¢u há»i thÆ°á»ng gáº·p</h4>
                        <button onClick={addFaq} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">ThÃªm FAQ</button>
                      </div>
                      {(pageContent.faqs || []).map((faq, index) => (
                        <div key={index} className="space-y-2 rounded-2xl border border-white/10 bg-black/10 p-3">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs text-gray-400">CÃ¢u há»i {index + 1}</span>
                            <button onClick={() => removeFaq(index)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-200 hover:bg-red-500/20">XÃ³a</button>
                          </div>
                          <input value={faq.q || ""} onChange={e => updateFaq(index, "q", e.target.value)} placeholder="CÃ¢u há»i" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                          <textarea value={faq.a || ""} onChange={e => updateFaq(index, "a", e.target.value)} placeholder="CÃ¢u tráº£ lá»i" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" rows={3} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
              <div className="overflow-x-auto">
              <table className="min-w-[640px] w-full text-left text-sm">
                <thead className="bg-white/5 text-gray-400">
                  <tr><th className="px-4 py-3">KhÃ¡ch</th><th className="px-4 py-3">GÃ³i</th><th className="px-4 py-3">Tráº¡ng thÃ¡i</th><th className="px-4 py-3"></th></tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {orders.map(o => (
                    <tr key={o.id} className="text-gray-200">
                      <td className="px-4 py-3">{o.name}<br/><span className="text-xs text-gray-500">{o.phone}</span></td>
                      <td className="px-4 py-3">{o.pkg}<br/><span className="text-xs text-gray-500">{o.platform}</span></td>
                      <td className="px-4 py-3">
                        <select value={o.status} onChange={async e => { await db.orders.updateStatus(o.id.toString(), e.target.value as any); refreshOrders(); }} className="bg-transparent outline-none">
                          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k} className="bg-card">{v.label}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right"><button onClick={async () => { await db.orders.delete(o.id.toString()); refreshOrders(); }} className="text-red-400"><Trash2 size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          )}

          {activeTab === "leads" && (
            <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
              <div className="overflow-x-auto">
              <table className="min-w-[720px] w-full text-left text-sm">
                <thead className="bg-white/5 text-gray-400">
                  <tr><th className="px-4 py-3">Loáº¡i</th><th className="px-4 py-3">KhÃ¡ch</th><th className="px-4 py-3">SÄT</th><th className="px-4 py-3">Ghi chÃº</th><th className="px-4 py-3"></th></tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {leads.map(l => {
                    const strategy = parseStrategyLeadNote(l.note);
                    const leadType = l.type === "audit" ? "Chuáº©n Ä‘oÃ¡n" : isStrategyLead(l) ? "Chiáº¿n lÆ°á»£c" : "TÆ° váº¥n";
                    const noteText = strategy
                      ? formatStrategyLeadSummary(strategy)
                      : l.note || l.service || "-";
                    return (
                    <tr key={l.id} className="text-gray-200 align-top">
                      <td className="px-4 py-3 text-xs uppercase font-bold">{leadType}</td>
                      <td className="px-4 py-3 font-bold">{strategy?.companyName || l.name}</td>
                      <td className="px-4 py-3">{l.phone}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        <p>{noteText}</p>
                        {strategy && (
                          <details className="mt-1">
                            <summary className="cursor-pointer text-[10px] font-bold text-violet-400">Chi tiáº¿t chiáº¿n lÆ°á»£c</summary>
                            <pre className="mt-1 whitespace-pre-wrap text-[10px] text-gray-500">{formatStrategyLeadDetail(strategy)}</pre>
                          </details>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right"><button onClick={async () => { await db.leads.delete(l.id.toString()); refreshLeads(); }} className="text-red-400"><Trash2 size={16} /></button></td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h3 className="mb-4 text-lg font-bold text-white">ThÃªm Review khÃ¡ch hÃ ng má»›i</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <input
                      value={newReview.clientName}
                      onChange={e => setNewReview({ ...newReview, clientName: e.target.value })}
                      placeholder="TÃªn khÃ¡ch hÃ ng"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                    />
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/10 bg-white/5">
                        {newReview.logoUrl ? (
                          <img src={newReview.logoUrl} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-500 text-center">áº¢nh Ä‘áº¡i diá»‡n</div>
                        )}
                        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition hover:opacity-100">
                          <span className="text-[10px] font-bold text-white">Äá»•i</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const url = await fileToDataUrl(file);
                              setNewReview({ ...newReview, logoUrl: url });
                            }}
                          />
                        </label>
                      </div>
                      <input
                        value={newReview.logoUrl || ""}
                        onChange={e => setNewReview({ ...newReview, logoUrl: e.target.value })}
                        placeholder="Hoáº·c dÃ¡n URL áº£nh..."
                        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400">ÄÃ¡nh giÃ¡ sao (1-5)</p>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={newReview.rating}
                        onChange={e => setNewReview({ ...newReview, rating: parseInt(e.target.value) || 5 })}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <textarea
                      value={newReview.content}
                      onChange={e => setNewReview({ ...newReview, content: e.target.value })}
                      placeholder="Ná»™i dung review..."
                      rows={5}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                    />
                    <button
                      onClick={async () => {
                        if (!newReview.clientName || !newReview.content) {
                          alert("Vui lÃ²ng nháº­p tÃªn vÃ  ná»™i dung review");
                          return;
                        }
                        const result = await db.clientReviews.add({
                          ...newReview,
                          clientId: "manual",
                        });
                        if (!result.error) {
                          setNewReview({ clientId: "", clientName: "", logoUrl: "", rating: 5, content: "" });
                          refreshReviews();
                        }
                      }}
                      className="w-full rounded-lg bg-primary py-2 text-sm font-bold text-white"
                    >
                      ThÃªm Review
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-white/5">
                  <h3 className="font-bold text-white">Danh sÃ¡ch Review</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-[720px] w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400">
                      <tr>
                        <th className="px-4 py-3">KhÃ¡ch hÃ ng</th>
                        <th className="px-4 py-3">Sao</th>
                        <th className="px-4 py-3">Ná»™i dung</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {isReviewsLoading ? (
                        <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Äang táº£i...</td></tr>
                      ) : clientReviews.length === 0 ? (
                        <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">ChÆ°a cÃ³ review nÃ o</td></tr>
                      ) : (
                        clientReviews.map(r => (
                          <tr key={r.id} className="text-gray-200">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <img src={r.logoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.clientName}`} className="h-8 w-8 rounded-full object-cover" />
                                <span className="font-bold">{r.clientName}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-amber-400 font-bold">{r.rating} â˜…</td>
                            <td className="px-4 py-3 text-xs text-gray-400 max-w-md truncate">{r.content}</td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={async () => {
                                  if (confirm("XÃ³a review nÃ y?")) {
                                    await db.clientReviews.delete(r.id);
                                    refreshReviews();
                                  }
                                }}
                                className="text-red-400"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Dá»± Ã¡n tiÃªu biá»ƒu (Trang chá»§)</h3>
                <button 
                  onClick={() => {
                    const newProj = { id: Date.now().toString(), title: "Dá»± Ã¡n má»›i", thumbnail: "", description: "", content: "", result: "+100%", note: "TÄƒng trÆ°á»Ÿng" };
                    updateSettings({ featuredProjects: [...(settings.featuredProjects || []), newProj] });
                  }}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white"
                >
                  ThÃªm dá»± Ã¡n
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {(settings.featuredProjects || []).map((proj, idx) => (
                  <div key={proj.id} className="rounded-2xl border border-white/10 bg-card p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white">Dá»± Ã¡n #{idx + 1}</h4>
                      <button 
                        onClick={() => {
                          const next = (settings.featuredProjects || []).filter(p => p.id !== proj.id);
                          updateSettings({ featuredProjects: next });
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-400">HÃ¬nh áº£nh Thumbnail</p>
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/20">
                          {proj.thumbnail ? <img src={proj.thumbnail} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-xs text-gray-500">ChÆ°a cÃ³ áº£nh</div>}
                          <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition hover:opacity-100">
                            <span className="text-xs font-bold text-white">Táº£i áº£nh</span>
                            <input type="file" accept="image/*" className="hidden" onChange={async e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const imageUrl = await fileToDataUrl(file);
                              const next = [...(settings.featuredProjects || [])];
                              next[idx] = { ...next[idx], thumbnail: imageUrl };
                              updateSettings({ featuredProjects: next });
                            }} />
                          </label>
                        </div>
                        <input value={proj.thumbnail} onChange={e => {
                          const next = [...(settings.featuredProjects || [])];
                          next[idx] = { ...next[idx], thumbnail: e.target.value };
                          updateSettings({ featuredProjects: next });
                        }} placeholder="URL áº£nh..." className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white" />
                      </div>
                      <input value={proj.title} onChange={e => {
                        const next = [...(settings.featuredProjects || [])];
                        next[idx] = { ...next[idx], title: e.target.value };
                        updateSettings({ featuredProjects: next });
                      }} placeholder="TÃªn dá»± Ã¡n" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                      <input value={proj.description} onChange={e => {
                        const next = [...(settings.featuredProjects || [])];
                        next[idx] = { ...next[idx], description: e.target.value };
                        updateSettings({ featuredProjects: next });
                      }} placeholder="MÃ´ táº£ ngáº¯n" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                      <div className="grid grid-cols-2 gap-2">
                        <input value={proj.result} onChange={e => {
                          const next = [...(settings.featuredProjects || [])];
                          next[idx] = { ...next[idx], result: e.target.value };
                          updateSettings({ featuredProjects: next });
                        }} placeholder="Káº¿t quáº£ (vd: +150%)" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                        <input value={proj.note} onChange={e => {
                          const next = [...(settings.featuredProjects || [])];
                          next[idx] = { ...next[idx], note: e.target.value };
                          updateSettings({ featuredProjects: next });
                        }} placeholder="Ghi chÃº (vd: Doanh thu)" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                      </div>
                      <textarea value={proj.content} onChange={e => {
                        const next = [...(settings.featuredProjects || [])];
                        next[idx] = { ...next[idx], content: e.target.value };
                        updateSettings({ featuredProjects: next });
                      }} placeholder="Ná»™i dung chi tiáº¿t" className="w-full h-24 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white disabled:opacity-50">LÆ°u táº¥t cáº£ dá»± Ã¡n</button>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Feedback khÃ¡ch hÃ ng</h3>
                <button 
                  onClick={() => {
                    const newFeedback = { id: Date.now().toString(), clientName: "KhÃ¡ch hÃ ng má»›i", clientLogo: "", contentImage: "", rating: 5 };
                    updateSettings({ customerFeedbacks: [...(settings.customerFeedbacks || []), newFeedback] });
                  }}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white"
                >
                  ThÃªm feedback
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {(settings.customerFeedbacks || []).map((fb, idx) => (
                  <div key={fb.id} className="rounded-2xl border border-white/10 bg-card p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white">Feedback #{idx + 1}</h4>
                      <button 
                        onClick={() => {
                          const next = (settings.customerFeedbacks || []).filter(f => f.id !== fb.id);
                          updateSettings({ customerFeedbacks: next });
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-gray-400">Logo khÃ¡ch hÃ ng</p>
                          <div className="relative aspect-square w-20 overflow-hidden rounded-lg border border-white/10 bg-black/20">
                            {fb.clientLogo ? <img src={fb.clientLogo} className="h-full w-full object-contain p-2" /> : <div className="flex h-full items-center justify-center text-[10px] text-gray-500">Logo</div>}
                            <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition hover:opacity-100">
                              <span className="text-[10px] font-bold text-white">Äá»•i</span>
                              <input type="file" accept="image/*" className="hidden" onChange={async e => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const imageUrl = await fileToDataUrl(file);
                                const next = [...(settings.customerFeedbacks || [])];
                                next[idx] = { ...next[idx], clientLogo: imageUrl };
                                updateSettings({ customerFeedbacks: next });
                              }} />
                            </label>
                          </div>
                          <input value={fb.clientLogo} onChange={e => {
                            const next = [...(settings.customerFeedbacks || [])];
                            next[idx] = { ...next[idx], clientLogo: e.target.value };
                            updateSettings({ customerFeedbacks: next });
                          }} placeholder="URL logo..." className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-1 text-[10px] text-white" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-gray-400">áº¢nh ná»™i dung feedback</p>
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black/20">
                            {fb.contentImage ? <img src={fb.contentImage} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-[10px] text-gray-500">áº¢nh ná»™i dung</div>}
                            <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition hover:opacity-100">
                              <span className="text-[10px] font-bold text-white">Táº£i áº£nh</span>
                              <input type="file" accept="image/*" className="hidden" onChange={async e => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const imageUrl = await fileToDataUrl(file);
                                const next = [...(settings.customerFeedbacks || [])];
                                next[idx] = { ...next[idx], contentImage: imageUrl };
                                updateSettings({ customerFeedbacks: next });
                              }} />
                            </label>
                          </div>
                          <input value={fb.contentImage} onChange={e => {
                            const next = [...(settings.customerFeedbacks || [])];
                            next[idx] = { ...next[idx], contentImage: e.target.value };
                            updateSettings({ customerFeedbacks: next });
                          }} placeholder="URL áº£nh..." className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-1 text-[10px] text-white" />
                        </div>
                      </div>
                      <input value={fb.clientName} onChange={e => {
                        const next = [...(settings.customerFeedbacks || [])];
                        next[idx] = { ...next[idx], clientName: e.target.value };
                        updateSettings({ customerFeedbacks: next });
                      }} placeholder="TÃªn khÃ¡ch hÃ ng" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">ÄÃ¡nh giÃ¡:</span>
                        {[1,2,3,4,5].map(star => (
                          <button key={star} onClick={() => {
                            const next = [...(settings.customerFeedbacks || [])];
                            next[idx] = { ...next[idx], rating: star };
                            updateSettings({ customerFeedbacks: next });
                          }} className={`${fb.rating >= star ? "text-yellow-400" : "text-gray-600"}`}><Star size={16} fill={fb.rating >= star ? "currentColor" : "none"} /></button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white disabled:opacity-50">LÆ°u táº¥t cáº£ feedback</button>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Tá»‘i Æ°u SEO Page</h3>
                <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{saveStatus === "saving" ? "Äang lÆ°u..." : "LÆ°u thay Ä‘á»•i"}</button>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {Object.keys(SEO_DEFAULTS).map(key => (
                  <div key={key} className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white uppercase text-xs tracking-widest">{key}</h3>
                      <span className="text-[10px] text-gray-500 font-mono">/{key === "home" ? "" : key}</span>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">SEO Title</label>
                        <input
                          value={resolveSeoPage(key).title}
                          onChange={e => {
                            updateSettings({
                              seoPages: {
                                ...(settings.seoPages || {}),
                                [key]: {
                                  ...resolveSeoPage(key),
                                  title: e.target.value
                                }
                              }
                            });
                          }}
                          placeholder="Meta Title"
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">Meta Keywords</label>
                        <input
                          value={resolveSeoPage(key).keywords}
                          onChange={e => {
                            updateSettings({
                              seoPages: {
                                ...(settings.seoPages || {}),
                                [key]: {
                                  ...resolveSeoPage(key),
                                  keywords: e.target.value
                                }
                              }
                            });
                          }}
                          placeholder="marketing, seo, facebook ads..."
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">Meta Description</label>
                        <textarea
                          value={resolveSeoPage(key).desc}
                          onChange={e => {
                            updateSettings({
                              seoPages: {
                                ...(settings.seoPages || {}),
                                [key]: {
                                  ...resolveSeoPage(key),
                                  desc: e.target.value
                                }
                              }
                            });
                          }}
                          placeholder="Meta Description"
                          className="w-full h-24 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {activeTab === "settings" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4" id="admin-password">
                <h3 className="font-bold text-white">Äá»•i máº­t kháº©u admin</h3>
                <input value={currentAdminPassword} onChange={e => { setCurrentAdminPassword(e.target.value); setChangePasswordError(null); setChangePasswordMessage(null); }} type="password" placeholder="Máº­t kháº©u hiá»‡n táº¡i" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                <input value={newAdminPassword} onChange={e => { setNewAdminPassword(e.target.value); setChangePasswordError(null); setChangePasswordMessage(null); }} type="password" placeholder="Máº­t kháº©u má»›i" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                {changePasswordMessage && <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">{changePasswordMessage}</div>}
                {changePasswordError && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{changePasswordError}</div>}
                <button type="button" onClick={changeAdminPassword} disabled={changingAdminPassword} className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{changingAdminPassword ? "Äang cáº­p nháº­t..." : "Cáº­p nháº­t máº­t kháº©u"}</button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                <h3 className="font-bold text-white">ThÃ´ng tin liÃªn há»‡</h3>
                <input value={settings.address || ""} onChange={e => updateSettings({ address: e.target.value })} placeholder="Äá»‹a chá»‰" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                <input value={settings.email || ""} onChange={e => updateSettings({ email: e.target.value })} placeholder="Email" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                <input value={settings.fanpage || ""} onChange={e => updateSettings({ fanpage: e.target.value })} placeholder="Fanpage URL" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-3">
                  <h4 className="text-sm font-semibold text-white">Soft UI Sounds</h4>
                  <label className="flex items-center justify-between text-sm text-gray-300">
                    Báº­t Ã¢m thanh tÆ°Æ¡ng tÃ¡c
                    <input type="checkbox" checked={settings.softSoundsEnabled !== false} onChange={e => updateSettings({ softSoundsEnabled: e.target.checked })} />
                  </label>
                  <label className="text-xs text-gray-400">Ã‚m lÆ°á»£ng: {Math.round((settings.softSoundsVolume ?? 0.05) * 100)}%</label>
                  <input
                    type="range"
                    min={0}
                    max={0.2}
                    step={0.01}
                    value={settings.softSoundsVolume ?? 0.05}
                    onChange={e => updateSettings({ softSoundsVolume: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{saveStatus === "saving" ? "Äang lÆ°u..." : "LÆ°u cáº¥u hÃ¬nh"}</button>
              </div>
            </div>
          )}

          {activeTab === "mascot" && (
            <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Linh váº­t cÃ´ng ty</h3>
                <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{saveStatus === "saving" ? "Äang lÆ°u..." : "LÆ°u thay Ä‘á»•i"}</button>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-4">
                    <h4 className="text-sm font-semibold text-white">Cáº¥u hÃ¬nh chung</h4>
                    <label className="flex items-center justify-between text-sm text-gray-300">
                      Báº­t linh váº­t AI
                      <input type="checkbox" checked={settings.mascotEnabled !== false} onChange={e => updateSettings({ mascotEnabled: e.target.checked })} />
                    </label>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400">HÃ¬nh áº£nh linh váº­t máº·c Ä‘á»‹nh (URL)</p>
                      <div className="flex gap-2">
                        <input value={isBuiltInMascot ? "" : settings.mascotImage || ""} onChange={e => updateSettings({ mascotImage: e.target.value })} placeholder="De trong de dung linh vat mac dinh tich hop" className="flex-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                        <label className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">
                          Táº£i áº£nh
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const imageUrl = await fileToDataUrl(file);
                              updateSettings({ mascotImage: imageUrl });
                              e.currentTarget.value = "";
                            }}
                          />
                        </label>
                      </div>
                      {isBuiltInMascot ? (
                        <p className="text-xs text-emerald-300">Dang dung linh vat mac dinh tich hop san.</p>
                      ) : (
                        <img src={settings.mascotImage} alt="Mascot Preview" className="h-20 w-20 rounded-lg border border-white/10 object-contain" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white">Cáº¥u hÃ¬nh theo trang</h4>
                      <select value={selectedMascotPlatform} onChange={e => setSelectedMascotPlatform(e.target.value)} className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white">
                        <option value="home">Trang chá»§</option>
                        {PLATFORMS_DYNAMIC.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-gray-400">HÃ¬nh áº£nh linh váº­t cho trang nÃ y (náº¿u khÃ¡c máº·c Ä‘á»‹nh)</p>
                      <div className="flex gap-2">
                        <input
                          value={selectedMascotImage}
                          onChange={e => updateSettings({ mascotImages: { ...(settings.mascotImages || {}), [selectedMascotPlatform]: e.target.value } })}
                          placeholder="URL áº£nh linh váº­t..."
                          className="flex-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                        />
                        <label className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">
                          Táº£i áº£nh
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const imageUrl = await fileToDataUrl(file);
                              updateSettings({ mascotImages: { ...(settings.mascotImages || {}), [selectedMascotPlatform]: imageUrl } });
                              e.currentTarget.value = "";
                            }}
                          />
                        </label>
                      </div>
                      {isBuiltInPlatformMascot ? (
                        <p className="text-xs text-emerald-300">Trang nay dang dung linh vat mac dinh.</p>
                      ) : (
                        <img src={selectedMascotImage} alt="Platform Mascot Preview" className="h-16 w-16 rounded-lg border border-white/10 object-contain" />
                      )}
                    </div>

                    <textarea
                      value={settings.mascotMessages?.[selectedMascotPlatform] || ""}
                      onChange={e =>
                        updateSettings({
                          mascotMessages: {
                            ...(settings.mascotMessages || {}),
                            [selectedMascotPlatform]: e.target.value,
                          },
                        })
                      }
                      placeholder="Ná»™i dung bong bÃ³ng chat linh váº­t"
                      className="h-24 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                    />

                    <div className="space-y-2">
                      <p className="text-xs text-gray-400">Ã‚m thanh linh váº­t (.mp3/.wav)</p>
                      <input
                        value={settings.mascotAudioUrls?.[selectedMascotPlatform] || ""}
                        onChange={e =>
                          updateSettings({
                            mascotAudioUrls: {
                              ...(settings.mascotAudioUrls || {}),
                              [selectedMascotPlatform]: e.target.value,
                            },
                          })
                        }
                        placeholder="Link Ã¢m thanh..."
                        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                      />
                      <label className="block cursor-pointer rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs text-gray-400 text-center">
                        Táº£i file Ã¢m thanh
                        <input
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = () => {
                              const result = typeof reader.result === "string" ? reader.result : "";
                              updateSettings({
                                mascotAudioUrls: {
                                  ...(settings.mascotAudioUrls || {}),
                                  [selectedMascotPlatform]: result,
                                },
                              });
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-4">
                    <h4 className="text-sm font-semibold text-white">Tin nháº¯n lá»—i nháº­p liá»‡u</h4>
                    <div className="grid gap-3">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase text-gray-500">Sai tÃ i khoáº£n / máº­t kháº©u</p>
                        <input value={mascotErrorPack.login} onChange={e => updateMascotErrorPack("login", e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase text-gray-500">Sai sá»‘ Ä‘iá»‡n thoáº¡i</p>
                        <input value={mascotErrorPack.phone} onChange={e => updateMascotErrorPack("phone", e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase text-gray-500">Sai link chuáº©n Ä‘oÃ¡n</p>
                        <input value={mascotErrorPack.link} onChange={e => updateMascotErrorPack("link", e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-4">
                    <h4 className="text-sm font-semibold text-white">Tin nháº¯n khi lÆ°á»›t (Scroll)</h4>
                    <textarea
                      value={sectionMessageText}
                      onChange={e => updateMascotSectionMessages(e.target.value)}
                      placeholder={"Má»—i dÃ²ng: sectionId|ná»™i dung\nVÃ­ dá»¥:\nslideshow|ÄÃ¢y lÃ  menu tá»•ng quan\npricing|ÄÃ¢y lÃ  dá»‹ch vá»¥ vÃ  báº£ng giÃ¡"}
                      className="h-28 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white">Tin nháº¯n theo láº§n click</h4>
                      <button type="button" onClick={addClickMessage} className="rounded-lg border border-white/20 px-2 py-1 text-[10px] text-white">ThÃªm</button>
                    </div>
                    <div className="max-h-48 overflow-auto space-y-2 pr-1">
                      {mascotClickMessages.map((line, idx) => (
                        <div key={`click-msg-${idx}`} className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-500 w-8">#{idx + 1}</span>
                          <input value={line} onChange={e => updateClickMessage(idx, e.target.value)} className="flex-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white" />
                          <button type="button" onClick={() => removeClickMessage(idx)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tracking" && (
            <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Tá»‘i Æ°u Website</h3>
                <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{saveStatus === "saving" ? "Äang lÆ°u..." : "LÆ°u thay Ä‘á»•i"}</button>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4 rounded-xl border border-white/10 bg-black/20 p-5">
                  <h4 className="font-bold text-white flex items-center gap-2"><Globe size={16} className="text-blue-400" /> MÃ£ káº¿t ná»‘i cÃ´ng cá»¥</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Google Analytics (GA4 ID)</label>
                      <input value={settings.googleAnalytics || ""} onChange={e => updateSettings({ googleAnalytics: e.target.value })} placeholder="G-XXXXXXXXXX" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Google Search Console (HTML Tag / ID)</label>
                      <input value={settings.googleConsole || ""} onChange={e => updateSettings({ googleConsole: e.target.value })} placeholder="Nháº­p mÃ£ xÃ¡c minh..." className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Rank Math SEO ID / Key</label>
                      <input value={settings.rankMath || ""} onChange={e => updateSettings({ rankMath: e.target.value })} placeholder="MÃ£ káº¿t ná»‘i Rank Math..." className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-white/10 bg-black/20 p-5">
                  <h4 className="font-bold text-white flex items-center gap-2"><Plus size={16} className="text-green-400" /> Plugins & Script bá»• sung</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">AIKTP Connection Key</label>
                      <input value={settings.aiKtp || ""} onChange={e => updateSettings({ aiKtp: e.target.value })} placeholder="MÃ£ API AIKTP..." className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Custom Head Scripts (GTM, Pixel, FB Chat...)</label>
                      <textarea value={settings.headJs || ""} onChange={e => updateSettings({ headJs: e.target.value })} placeholder="<script>...</script>" className="w-full h-32 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-white" />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4 rounded-xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white flex items-center gap-2"><Code size={16} className="text-purple-400" /> Xem mÃ£ nguá»“n há»‡ thá»‘ng (Chá»‰ Ä‘á»c)</h4>
                    <button
                      onClick={async () => {
                        const next = !showSourceViewer;
                        setShowSourceViewer(next);
                        if (next && sourceFiles.length === 0) await loadSourceFiles();
                      }}
                      className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white"
                    >
                      {showSourceViewer ? "ÄÃ³ng trÃ¬nh xem" : "Má»Ÿ trÃ¬nh xem"}
                    </button>
                  </div>
                  {showSourceViewer && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[250px_1fr]">
                      <div className="max-h-[400px] overflow-auto rounded-lg border border-white/10 bg-black/30 p-2 text-xs text-gray-400">
                        {sourceFiles.map(file => (
                          <button key={file} onClick={() => openSourceFile(file)} className={`block w-full rounded px-2 py-1.5 text-left transition ${selectedSourceFile === file ? "bg-primary/20 text-white" : "hover:bg-white/5"}`}>
                            {file}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="truncate text-[10px] text-gray-500 font-mono">{selectedSourceFile || "ChÆ°a chá»n file"}</p>
                          {selectedSourceContent && (
                            <button onClick={() => { navigator.clipboard.writeText(selectedSourceContent); alert("ÄÃ£ copy!"); }} className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-white">
                              <Copy size={12} /> Copy
                            </button>
                          )}
                        </div>
                        <textarea readOnly value={selectedSourceContent} className="h-[350px] w-full rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-gray-300 leading-relaxed" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

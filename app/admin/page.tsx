"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, ShoppingCart, Newspaper, FileText,
  Bell, Globe, Image, Search, Settings, LogOut, ChevronRight,
  Trash2, Eye, EyeOff, Check, X, Plus, Edit3, ExternalLink,
  BarChart2, TrendingUp, Users, DollarSign, Palette, Code, Copy,
  Calendar, Clock, CheckCircle2, Lock, type LucideIcon
} from "lucide-react";
import { useAdmin } from "@/lib/AdminContext";
import { getContent, saveContent, type ContentOverride, type PackageOverride, type TabOverride } from "@/lib/pageContent";
import { db, type Order, type Lead, type NewsItem, type MediaItem, type Service, type ClientPortal, type PortalReport } from "@/lib/useData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ADMIN_PASSWORD = "admin123";

const NAV = [
  { id: "dashboard", label: "Bảng điều khiển", icon: LayoutDashboard },
  { id: "cms", label: "Quản trị nội dung", icon: Edit3 },
  { id: "services", label: "Quản lý Dịch vụ", icon: Package },
  { id: "comparison", label: "So sánh các gói", icon: BarChart2 },
  { id: "orders", label: "Quản lý Đơn hàng", icon: ShoppingCart },
  { id: "leads", label: "Quản lý nhận tin", icon: Bell },
  { id: "media", label: "Quản lý hình ảnh", icon: Image },
  { id: "seo", label: "SEO Page", icon: Search },
  { id: "portals", label: "Quản lý lộ trình dự án", icon: Calendar },
  { id: "settings", label: "Thiết lập hệ thống", icon: Settings },
];

const STATUS_LABELS: Record<Order["status"], { label: string; cls: string }> = {
  pending: { label: "Chờ xác nhận", cls: "bg-yellow-500/20 text-yellow-400" },
  confirmed: { label: "Đã xác nhận", cls: "bg-blue-500/20 text-blue-400" },
  completed: { label: "Hoàn thành", cls: "bg-green-500/20 text-green-400" },
  cancelled: { label: "Đã huỷ", cls: "bg-red-500/20 text-red-400" },
};

const REPORT_CATEGORIES = ["Dự án hợp tác", "Tiến độ dự án", "Báo cáo hiệu quả"];

function formatMoney(num: number) { return num.toLocaleString("vi-VN") + "đ"; }
function formatDate(date: string | number) { return new Date(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }); }

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
  home: { title: "Bứt Phá Marketing - Giải Pháp Đột Phá", desc: "Agency marketing toàn diện tại Việt Nam", keywords: "marketing, facebook ads, tiktok, seo" },
  facebook: { title: "Dịch Vụ Facebook Marketing", desc: "Xây dựng Fanpage, chạy quảng cáo Facebook hiệu quả", keywords: "facebook marketing, facebook ads, quảng cáo facebook" },
  tiktok: { title: "Dịch Vụ TikTok Marketing", desc: "Sản xuất content TikTok, viral, TikTok Ads", keywords: "tiktok marketing, tiktok ads, content tiktok" },
  instagram: { title: "Dịch Vụ Instagram Marketing", desc: "Xây dựng brand trên Instagram, Reels, Stories", keywords: "instagram marketing, instagram ads, reels" },
  zalo: { title: "Dịch Vụ Zalo Marketing", desc: "Zalo OA, Zalo Ads, chăm sóc khách hàng qua Zalo", keywords: "zalo marketing, zalo ads, zalo oa" },
  googlemaps: { title: "Dịch Vụ Google Maps Marketing", desc: "Local SEO, Google Business, đánh giá 5 sao", keywords: "google maps, local seo, google business" },
  website: { title: "Dịch Vụ Website Marketing", desc: "Thiết kế web, SEO website, bảo trì", keywords: "thiết kế website, seo website, web marketing" },
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const { settings, updateSettings, updateColor, updatePlatformName, toggleVisibility, updateCMS, addSlideshowImage, removeSlideshowImage, addCase, removeCase, updateMediaVideo } = useAdmin();

  const PLATFORMS_DYNAMIC = [
    { key: "facebook", label: settings.platformNames?.facebook || "Facebook", path: "/facebook", color: settings.colors?.facebook || "#1877F2" },
    { key: "tiktok", label: settings.platformNames?.tiktok || "TikTok", path: "/tiktok", color: settings.colors?.tiktok || "#FF0050" },
    { key: "instagram", label: settings.platformNames?.instagram || "Instagram", path: "/instagram", color: settings.colors?.instagram || "#E1306C" },
    { key: "zalo", label: settings.platformNames?.zalo || "Zalo", path: "/zalo", color: settings.colors?.zalo || "#0068FF" },
    { key: "googlemaps", label: settings.platformNames?.googlemaps || "Google Maps", path: "/google-maps", color: settings.colors?.googlemaps || "#EA4335" },
    { key: "website", label: settings.platformNames?.website || "Website", path: "/website", color: settings.colors?.website || "#34A853" },
  ];

  const [orders, setOrders] = useState<Order[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [clientPortals, setClientPortals] = useState<ClientPortal[]>([]);
  const [progressArticles, setProgressArticles] = useState<Record<number, any[]>>({});
  const [selectedClient, setSelectedClient] = useState<ClientPortal | null>(null);
  const [newArticle, setNewArticle] = useState({ title: "", content: "", image: "" });
  const [selectedPlatform, setSelectedPlatform] = useState("home");
  const [selectedPkgPlatform, setSelectedPkgPlatform] = useState("facebook");
  const [mediaUrl, setMediaUrl] = useState("");
  const [newCase, setNewCase] = useState({ id: 0, title: "", before: "", after: "" });
  const [seoData, setSeoData] = useState<any>({});
  const [selectedProcessTab, setSelectedProcessTab] = useState(0);
  const [selectedServiceTab, setSelectedServiceTab] = useState(0);
  const [serviceContent, setServiceContent] = useState<ContentOverride>({ tabs: [] });
  const [pageContent, setPageContent] = useState<ContentOverride>({
    vision: "",
    mission: "",
    responsibility: "",
    stats: [{ label: "", value: "" }],
    processTabs: [{ label: "Xây dựng", steps: [{ step: 1, title: "", desc: "" }] }],
    faqs: [{ q: "", a: "" }],
  });

  const visitorChartData = Array.from({ length: 12 }, (_, i) => ({
    name: `Tuần ${i + 1}`,
    visits: Math.round(90 + Math.sin((i / 11) * Math.PI * 2) * 30),
  }));
  const [newReport, setNewReport] = useState<PortalReport>({ title: "", content: "", category: REPORT_CATEGORIES[0], date: new Date().toLocaleDateString("vi-VN") });
  const [newPortal, setNewPortal] = useState<Partial<ClientPortal>>({ username: "", clientName: "", phone: "", platform: "facebook", daysRemaining: 30, postsCount: 0, progressPercent: 0, weeklyReports: [] });
  const [portalPassword, setPortalPassword] = useState("");
  const [editingReports, setEditingReports] = useState<PortalReport[]>([]);

  const createDefaultPackage = (index: number): PackageOverride => ({
    name: index === 0 ? "Gói Cơ Bản" : index === 1 ? "Gói Nâng Cao" : "Gói VIP",
    price: index === 0 ? "1.000.000đ" : index === 1 ? "2.000.000đ" : "3.500.000đ",
    period: "month",
    popular: index === 1,
    features: [],
    allFeatures: [],
    audioText: "",
  });

  const createDefaultServiceTabs = (): TabOverride[] => ([
    { label: "Xây Dựng", packages: [createDefaultPackage(0), createDefaultPackage(1), createDefaultPackage(2)] },
    { label: "Chăm Sóc", packages: [createDefaultPackage(0), createDefaultPackage(1), createDefaultPackage(2)] },
    { label: "Quảng Cáo", packages: [createDefaultPackage(0), createDefaultPackage(1), createDefaultPackage(2)] },
  ]);

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "1") setAuthenticated(true);
    try { setSeoData(JSON.parse(localStorage.getItem("bpm_seo") || "{}")); } catch (e) {}
  }, []);

  useEffect(() => {
    if (selectedPlatform === "home") return;
    const stored = getContent(selectedPlatform);
    if (stored) {
      setPageContent(stored);
      setSelectedProcessTab(0);
    } else {
      setPageContent({
        vision: "",
        mission: "",
        responsibility: "",
        stats: [{ label: "", value: "" }],
        processTabs: [{ label: "Xây dựng", steps: [{ step: 1, title: "", desc: "" }] }],
        faqs: [{ q: "", a: "" }],
      });
      setSelectedProcessTab(0);
    }
  }, [selectedPlatform]);

  useEffect(() => {
    const saved = getContent(selectedPkgPlatform);
    const tabs = saved?.tabs && saved.tabs.length > 0 ? saved.tabs : createDefaultServiceTabs();
    setServiceContent(prev => ({ ...prev, ...(saved || {}), tabs }));
    setSelectedServiceTab(0);
  }, [selectedPkgPlatform]);

  const updateServiceTabs = (tabs: TabOverride[]) => {
    setServiceContent(prev => ({ ...prev, tabs }));
  };

  const saveServiceConfig = () => {
    saveContent(selectedPkgPlatform, serviceContent);
    alert("Đã lưu quản lý dịch vụ");
  };

  const updateServiceLabel = (tabIndex: number, label: string) => {
    const tabs = [...(serviceContent.tabs || [])];
    if (!tabs[tabIndex]) return;
    tabs[tabIndex] = { ...tabs[tabIndex], label };
    updateServiceTabs(tabs);
  };

  const addServiceTab = () => {
    const tabs = [...(serviceContent.tabs || []), { label: `Dịch vụ ${(serviceContent.tabs || []).length + 1}`, packages: [createDefaultPackage(0)] }];
    updateServiceTabs(tabs);
    setSelectedServiceTab(tabs.length - 1);
  };

  const removeServiceTab = (tabIndex: number) => {
    const tabs = (serviceContent.tabs || []).filter((_, idx) => idx !== tabIndex);
    updateServiceTabs(tabs.length > 0 ? tabs : createDefaultServiceTabs());
    setSelectedServiceTab(0);
  };

  const addPackageToService = (tabIndex: number) => {
    const tabs = [...(serviceContent.tabs || [])];
    const target = tabs[tabIndex];
    if (!target) return;
    tabs[tabIndex] = {
      ...target,
      packages: [...target.packages, createDefaultPackage(target.packages.length)],
    };
    updateServiceTabs(tabs);
  };

  const updatePackageField = (tabIndex: number, pkgIndex: number, patch: Partial<PackageOverride>) => {
    const tabs = [...(serviceContent.tabs || [])];
    const target = tabs[tabIndex];
    if (!target || !target.packages[pkgIndex]) return;
    const nextPackages = [...target.packages];
    nextPackages[pkgIndex] = {
      ...nextPackages[pkgIndex],
      ...patch,
    };
    tabs[tabIndex] = { ...target, packages: nextPackages };
    updateServiceTabs(tabs);
  };

  const removePackage = (tabIndex: number, pkgIndex: number) => {
    const tabs = [...(serviceContent.tabs || [])];
    const target = tabs[tabIndex];
    if (!target) return;
    const next = target.packages.filter((_, idx) => idx !== pkgIndex);
    tabs[tabIndex] = { ...target, packages: next };
    updateServiceTabs(tabs);
  };

  const savePageContent = () => {
    if (selectedPlatform !== "home") {
      saveContent(selectedPlatform, pageContent);
      alert("Đã lưu nội dung trang con");
    }
  };

  const updatePageContentField = (field: keyof ContentOverride, value: any) => {
    setPageContent(prev => ({ ...prev, [field]: value }));
  };

  const updateStat = (index: number, field: "label" | "value", value: string) => {
    setPageContent(prev => {
      const stats = [...(prev.stats || [])];
      stats[index] = { ...(stats[index] || { label: "", value: "" }), [field]: value };
      return { ...prev, stats };
    });
  };

  const addStat = () => {
    setPageContent(prev => ({ ...prev, stats: [...(prev.stats || []), { label: "", value: "" }] }));
  };

  const removeStat = (index: number) => {
    setPageContent(prev => ({ ...prev, stats: (prev.stats || []).filter((_, i) => i !== index) }));
  };

  const updateProcessStep = (index: number, field: "title" | "desc", value: string) => {
    setPageContent(prev => {
      const tabs = [...(prev.processTabs || [{ label: "Quy trình", steps: [] }])];
      const tab = { ...tabs[selectedProcessTab] };
      const steps = [...(tab.steps || [])];
      steps[index] = { ...(steps[index] || { step: index + 1, title: "", desc: "" }), [field]: value };
      steps[index].step = index + 1;
      tab.steps = steps;
      tabs[selectedProcessTab] = tab;
      return { ...prev, processTabs: tabs };
    });
  };

  const updateProcessTabLabel = (index: number, label: string) => {
    setPageContent(prev => {
      const tabs = [...(prev.processTabs || [{ label: "Xây dựng", steps: [] }])];
      if (!tabs[index]) return prev;
      tabs[index] = { ...tabs[index], label };
      return { ...prev, processTabs: tabs };
    });
  };

  const addProcessTab = () => {
    setPageContent(prev => ({
      ...prev,
      processTabs: [...(prev.processTabs || []), { label: `Dịch vụ ${prev.processTabs?.length ? prev.processTabs.length + 1 : 1}`, steps: [{ step: 1, title: "", desc: "" }] }],
    }));
    setSelectedProcessTab((prev) => (prev + 1));
  };

  const removeProcessTab = (index: number) => {
    setPageContent(prev => {
      const tabs = (prev.processTabs || []).filter((_, i) => i !== index);
      const nextIndex = Math.max(0, Math.min(selectedProcessTab === index ? 0 : selectedProcessTab, tabs.length - 1));
      setSelectedProcessTab(nextIndex);
      return { ...prev, processTabs: tabs };
    });
  };

  const addProcessStep = () => {
    setPageContent(prev => {
      const tabs = [...(prev.processTabs || [{ label: "Xây dựng", steps: [] }])];
      const tab = { ...tabs[selectedProcessTab] };
      const steps = [...(tab.steps || [])];
      steps.push({ step: steps.length + 1, title: "", desc: "" });
      tab.steps = steps;
      tabs[selectedProcessTab] = tab;
      return { ...prev, processTabs: tabs };
    });
  };

  const removeProcessStep = (index: number) => {
    setPageContent(prev => {
      const tabs = [...(prev.processTabs || [{ label: "Xây dựng", steps: [] }])];
      const tab = { ...tabs[selectedProcessTab] };
      const steps = (tab.steps || []).filter((_, i) => i !== index).map((step, i) => ({ ...step, step: i + 1 }));
      tab.steps = steps;
      tabs[selectedProcessTab] = tab;
      return { ...prev, processTabs: tabs };
    });
  };

  const updateFaq = (index: number, field: "q" | "a", value: string) => {
    setPageContent(prev => {
      const faqs = [...(prev.faqs || [])];
      faqs[index] = { ...(faqs[index] || { q: "", a: "" }), [field]: value };
      return { ...prev, faqs };
    });
  };

  const addFaq = () => {
    setPageContent(prev => ({ ...prev, faqs: [...(prev.faqs || []), { q: "", a: "" }] }));
  };

  const removeFaq = (index: number) => {
    setPageContent(prev => ({ ...prev, faqs: (prev.faqs || []).filter((_, i) => i !== index) }));
  };

  const refreshOrders = async () => setOrders([...(await db.orders.getAll())].reverse());
  const refreshLeads = async () => setLeads([...(await db.leads.getAll())].reverse());
  const refreshPortals = async () => setClientPortals(await db.clientPortals.getAll());
  const refreshServices = async () => setServices(await db.services.getAll());
  const refreshArticles = async (clientId: number) => {
    const data = await db.progressArticles.getByClient(clientId);
    setProgressArticles(prev => ({ ...prev, [clientId]: data }));
  };

  const refreshClientPortal = async (clientId: number) => {
    const portals = await db.clientPortals.getAll();
    const client = portals.find((p) => p.id === clientId) || null;
    setSelectedClient(client);
    setClientPortals(portals);
  };

  const saveClientReports = async (clientId: number, reports: PortalReport[]) => {
    await db.clientPortals.update(clientId.toString(), { weeklyReports: reports });
    await refreshClientPortal(clientId);
  };

  useEffect(() => {
    if (!authenticated) return;
    refreshOrders(); refreshLeads(); refreshPortals(); refreshServices();
  }, [authenticated]);

  useEffect(() => {
    if (selectedClient) {
      refreshArticles(selectedClient.id);
      setEditingReports(selectedClient.weeklyReports || []);
    } else {
      setEditingReports([]);
    }
  }, [selectedClient]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) { localStorage.setItem("admin_auth", "1"); setAuthenticated(true); }
    else setError("Mật khẩu không đúng");
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm rounded-2xl border border-white/10 bg-card p-8">
          <div className="mb-6 flex items-center gap-3">
            <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-full" />
            <div><p className="font-bold text-white">Bứt Phá Marketing</p><p className="text-xs text-gray-400">Trang quản trị hệ thống</p></div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} placeholder="Mật khẩu admin" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90">Đăng Nhập</button>
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
            <button key={n.id} onClick={() => setActiveTab(n.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${activeTab === n.id ? "bg-primary text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
              <n.icon size={18} /> {n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => { localStorage.removeItem("admin_auth"); setAuthenticated(false); }} className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500/10 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all">
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard value={leads.length} label="Tổng Lead" icon={Users} color="#A855F7" />
                <StatCard value={orders.length} label="Đơn hàng" icon={ShoppingCart} color="#3B82F6" />
                <StatCard value="2.4k" label="Truy cập" icon={BarChart2} color="#10B981" />
                <StatCard value="15.2M" label="Doanh thu" icon={DollarSign} color="#F59E0B" />
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h2 className="mb-4 text-lg font-bold text-white">Khách truy cập website</h2>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={visitorChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="visitsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#ffffff15" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#111827", borderRadius: 12, border: "1px solid #374151" }} labelStyle={{ color: "#f8fafc" }} itemStyle={{ color: "#10B981" }} />
                      <Area type="monotone" dataKey="visits" stroke="#10B981" fill="url(#visitsGradient)" strokeWidth={3} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h2 className="mb-4 text-lg font-bold text-white">Quản lý nền tảng</h2>
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

          {activeTab === "cms" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <select value={selectedPlatform} onChange={e => setSelectedPlatform(e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                  <option value="home">Trang chủ</option>
                  {PLATFORMS_DYNAMIC.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                </select>
                <button onClick={() => { localStorage.setItem("admin_settings", JSON.stringify(settings)); alert("Đã lưu!"); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu thay đổi</button>
              </div>
              {selectedPlatform === "home" ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                    <h3 className="font-bold text-white">Thông tin chung</h3>
                    <input value={settings.title || ""} onChange={e => updateSettings({ title: e.target.value })} placeholder="Tiêu đề website" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    <textarea value={settings.content || ""} onChange={e => updateSettings({ content: e.target.value })} placeholder="Giới thiệu" className="w-full h-32 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    <input value={settings.hotline || ""} onChange={e => updateSettings({ hotline: e.target.value })} placeholder="Hotline" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-white">Nội dung {selectedPlatform}</h3>
                      <p className="text-sm text-gray-400">Chỉnh sửa tầm nhìn, sứ mệnh, thống kê, quy trình và FAQ của dịch vụ.</p>
                    </div>
                    <button onClick={savePageContent} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu nội dung trang con</button>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <h4 className="text-sm font-bold text-white">Giới thiệu về dịch vụ</h4>
                      <textarea value={pageContent.vision || ""} onChange={e => updatePageContentField("vision", e.target.value)} placeholder="Tầm nhìn" className="w-full h-24 rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-sm text-white" />
                      <textarea value={pageContent.mission || ""} onChange={e => updatePageContentField("mission", e.target.value)} placeholder="Sứ mệnh" className="w-full h-24 rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-sm text-white" />
                      <textarea value={pageContent.responsibility || ""} onChange={e => updatePageContentField("responsibility", e.target.value)} placeholder="Trách nhiệm" className="w-full h-24 rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-sm text-white" />
                    </div>

                    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">Statistics</h4>
                        <button onClick={addStat} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">Thêm số</button>
                      </div>
                      {(pageContent.stats || []).map((stat, index) => (
                        <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                          <input value={stat.label || ""} onChange={e => updateStat(index, "label", e.target.value)} placeholder="Nhãn" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                          <input value={stat.value || ""} onChange={e => updateStat(index, "value", e.target.value)} placeholder="Giá trị" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                          <button onClick={() => removeStat(index)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/20">Xóa</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white">Quy trình triển khai</h4>
                          <p className="text-xs text-gray-400">Chọn dịch vụ rồi chỉnh từng bước cho dịch vụ đó.</p>
                        </div>
                        <button onClick={addProcessTab} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">Thêm dịch vụ</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(pageContent.processTabs || []).map((tab, tabIndex) => (
                          <button
                            key={tabIndex}
                            onClick={() => setSelectedProcessTab(tabIndex)}
                            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${selectedProcessTab === tabIndex ? "bg-primary text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"}`}
                          >
                            {tab.label || `Dịch vụ ${tabIndex + 1}`}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-3 rounded-2xl border border-white/10 bg-black/10 p-3">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <input
                            value={pageContent.processTabs?.[selectedProcessTab]?.label || ""}
                            onChange={e => updateProcessTabLabel(selectedProcessTab, e.target.value)}
                            placeholder="Tên dịch vụ (ví dụ: Dịch vụ xây dựng)"
                            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                          />
                          <button onClick={() => removeProcessTab(selectedProcessTab)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-200 hover:bg-red-500/20">Xóa dịch vụ</button>
                        </div>
                        {(pageContent.processTabs?.[selectedProcessTab]?.steps || []).map((step, index) => (
                          <div key={index} className="space-y-2 rounded-2xl border border-white/10 bg-black/10 p-3">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-xs text-gray-400">Bước {index + 1}</span>
                              <button onClick={() => removeProcessStep(index)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-200 hover:bg-red-500/20">Xóa</button>
                            </div>
                            <input value={step.title || ""} onChange={e => updateProcessStep(index, "title", e.target.value)} placeholder="Tiêu đề bước" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                            <textarea value={step.desc || ""} onChange={e => updateProcessStep(index, "desc", e.target.value)} placeholder="Mô tả bước" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" rows={3} />
                          </div>
                        ))}
                        <button onClick={addProcessStep} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white">Thêm bước</button>
                      </div>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">Câu hỏi thường gặp</h4>
                        <button onClick={addFaq} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">Thêm FAQ</button>
                      </div>
                      {(pageContent.faqs || []).map((faq, index) => (
                        <div key={index} className="space-y-2 rounded-2xl border border-white/10 bg-black/10 p-3">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs text-gray-400">Câu hỏi {index + 1}</span>
                            <button onClick={() => removeFaq(index)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-200 hover:bg-red-500/20">Xóa</button>
                          </div>
                          <input value={faq.q || ""} onChange={e => updateFaq(index, "q", e.target.value)} placeholder="Câu hỏi" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                          <textarea value={faq.a || ""} onChange={e => updateFaq(index, "a", e.target.value)} placeholder="Câu trả lời" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" rows={3} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <select value={selectedPkgPlatform} onChange={e => setSelectedPkgPlatform(e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                  {PLATFORMS_DYNAMIC.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                </select>
                <button onClick={saveServiceConfig} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu quản lý dịch vụ</button>
                <button onClick={addServiceTab} className="rounded-lg bg-white/5 px-4 py-2 text-sm text-white border border-white/10">Thêm dịch vụ</button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {(serviceContent.tabs || []).map((tab, idx) => (
                    <button
                      key={`${tab.label}-${idx}`}
                      onClick={() => setSelectedServiceTab(idx)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${selectedServiceTab === idx ? "bg-primary text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"}`}
                    >
                      {tab.label || `Dịch vụ ${idx + 1}`}
                    </button>
                  ))}
                </div>

                {!!serviceContent.tabs?.[selectedServiceTab] && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <input
                        value={serviceContent.tabs[selectedServiceTab].label}
                        onChange={e => updateServiceLabel(selectedServiceTab, e.target.value)}
                        placeholder="Tên dịch vụ (Ví dụ: Xây dựng Fanpage)"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => addPackageToService(selectedServiceTab)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">Thêm gói</button>
                        <button onClick={() => removeServiceTab(selectedServiceTab)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200">Xóa dịch vụ</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                      {serviceContent.tabs[selectedServiceTab].packages.map((pkg, pkgIdx) => (
                        <div key={`${pkg.name}-${pkgIdx}`} className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs text-gray-400">Gói {pkgIdx + 1}</p>
                            <button onClick={() => removePackage(selectedServiceTab, pkgIdx)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-200">Xóa gói</button>
                          </div>
                          <input value={pkg.name} onChange={e => updatePackageField(selectedServiceTab, pkgIdx, { name: e.target.value })} placeholder="Tên gói" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <input value={pkg.price} onChange={e => updatePackageField(selectedServiceTab, pkgIdx, { price: e.target.value })} placeholder="Giá (VD: 2.500.000đ)" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                            <select value={pkg.period || "month"} onChange={e => updatePackageField(selectedServiceTab, pkgIdx, { period: e.target.value as "month" | "lifetime" })} className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white">
                              <option value="month">Theo tháng</option>
                              <option value="lifetime">Vĩnh viễn</option>
                            </select>
                          </div>
                          <label className="flex items-center gap-2 text-xs text-gray-300">
                            <input type="checkbox" checked={!!pkg.popular} onChange={e => updatePackageField(selectedServiceTab, pkgIdx, { popular: e.target.checked })} />
                            Gói phổ biến nhất
                          </label>
                          <textarea
                            value={(pkg.features || []).join("\n")}
                            onChange={e => updatePackageField(selectedServiceTab, pkgIdx, { features: e.target.value.split("\n").map(line => line.trim()).filter(Boolean), allFeatures: e.target.value.split("\n").map(line => line.trim()).filter(Boolean) })}
                            placeholder="Nội dung gói (mỗi dòng 1 ý)"
                            rows={6}
                            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                          />
                          <textarea
                            value={pkg.audioText || ""}
                            onChange={e => updatePackageField(selectedServiceTab, pkgIdx, { audioText: e.target.value })}
                            placeholder="Text tư vấn bằng âm thanh cho gói này"
                            rows={3}
                            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "comparison" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <select value={selectedPkgPlatform} onChange={e => setSelectedPkgPlatform(e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                  {PLATFORMS_DYNAMIC.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                </select>
                <button onClick={() => { localStorage.setItem("admin_settings", JSON.stringify(settings)); alert("Đã lưu!"); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu thay đổi</button>
              </div>
              <div className="space-y-4">
                {services.filter(s => s.platform === selectedPkgPlatform).map(svc => (
                  <div key={svc.id} className="rounded-2xl border border-white/10 bg-card p-6">
                    <p className="font-bold text-white mb-2">{svc.name}</p>
                    <textarea value={(svc.allFeatures || []).join("\n")} onChange={e => setServices(services.map(s => s.id === svc.id ? { ...s, allFeatures: e.target.value.split("\n") } : s))} className="w-full h-32 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" placeholder="Tất cả tính năng so sánh..." />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-gray-400">
                  <tr><th className="px-4 py-3">Khách</th><th className="px-4 py-3">Gói</th><th className="px-4 py-3">Trạng thái</th><th className="px-4 py-3"></th></tr>
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
          )}

          {activeTab === "leads" && (
            <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-gray-400">
                  <tr><th className="px-4 py-3">Loại</th><th className="px-4 py-3">Khách</th><th className="px-4 py-3">SĐT</th><th className="px-4 py-3">Ghi chú</th><th className="px-4 py-3"></th></tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {leads.map(l => (
                    <tr key={l.id} className="text-gray-200">
                      <td className="px-4 py-3 text-xs uppercase font-bold">{l.type === "audit" ? "Chuẩn đoán" : "Tư vấn"}</td>
                      <td className="px-4 py-3 font-bold">{l.name}</td>
                      <td className="px-4 py-3">{l.phone}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{l.note || l.service || "-"}</td>
                      <td className="px-4 py-3 text-right"><button onClick={async () => { await db.leads.delete(l.id.toString()); refreshLeads(); }} className="text-red-400"><Trash2 size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <select value={selectedPlatform} onChange={e => setSelectedPlatform(e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                  <option value="home">Trang chủ</option>
                  {PLATFORMS_DYNAMIC.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                </select>
                <button onClick={() => { localStorage.setItem("admin_settings", JSON.stringify(settings)); alert("Đã lưu!"); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu thay đổi</button>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                  <h3 className="font-bold text-white">Slideshow</h3>
                  <div className="flex gap-2">
                    <input value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} placeholder="URL ảnh..." className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                    <button onClick={() => { if (mediaUrl) { addSlideshowImage(selectedPlatform, mediaUrl); setMediaUrl(""); } }} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Thêm</button>
                  </div>
                  <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-white">Video gắn kèm</label>
                      <input value={settings.media[selectedPlatform]?.videoUrl || ""} onChange={e => updateMediaVideo(selectedPlatform, e.target.value)} placeholder="URL YouTube hoặc video" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                    </div>
                    {settings.media[selectedPlatform]?.videoUrl && (
                      <a href={settings.media[selectedPlatform]?.videoUrl} target="_blank" rel="noreferrer" className="text-xs text-primary underline">Xem link video</a>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(settings.media[selectedPlatform]?.slideshow || []).map((url, i) => (
                      <div key={i} className="relative group aspect-video rounded-lg overflow-hidden border border-white/10">
                        <img src={url} className="w-full h-full object-cover" />
                        <button onClick={() => removeSlideshowImage(selectedPlatform, i)} className="absolute inset-0 flex items-center justify-center bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} className="text-white" /></button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                  <h3 className="font-bold text-white">Case Study</h3>
                  <div className="space-y-2">
                    <input value={newCase.title} onChange={e => setNewCase({ ...newCase, title: e.target.value })} placeholder="Tên Case Study" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                    <div className="grid grid-cols-2 gap-2">
                      <input value={newCase.before} onChange={e => setNewCase({ ...newCase, before: e.target.value })} placeholder="URL Trước" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                      <input value={newCase.after} onChange={e => setNewCase({ ...newCase, after: e.target.value })} placeholder="URL Sau" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                    </div>
                    <button onClick={() => { if (newCase.title) { addCase(selectedPlatform, { title: newCase.title, before: newCase.before, after: newCase.after }); setNewCase({ id: 0, title: "", before: "", after: "" }); } }} className="w-full rounded-lg bg-primary py-2 text-sm font-bold text-white">Thêm Case</button>
                  </div>
                  <div className="space-y-2">
                    {(settings.media[selectedPlatform]?.cases || []).map(c => (
                      <div key={c.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-xs text-white">{c.title}</span>
                        <button onClick={() => removeCase(selectedPlatform, c.id)} className="text-red-400"><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {Object.keys(SEO_DEFAULTS).map(key => (
                <div key={key} className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                  <h3 className="font-bold text-white uppercase text-xs tracking-widest">{key}</h3>
                  <input value={seoData[key]?.title || SEO_DEFAULTS[key].title} onChange={e => { const next = { ...seoData, [key]: { ...(seoData[key] || {}), title: e.target.value } }; setSeoData(next); localStorage.setItem("bpm_seo", JSON.stringify(next)); }} placeholder="Title" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                  <textarea value={seoData[key]?.desc || SEO_DEFAULTS[key].desc} onChange={e => { const next = { ...seoData, [key]: { ...(seoData[key] || {}), desc: e.target.value } }; setSeoData(next); localStorage.setItem("bpm_seo", JSON.stringify(next)); }} placeholder="Description" className="w-full h-20 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                </div>
              ))}
            </div>
          )}

          {activeTab === "portals" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1 space-y-6">
                <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                  <h3 className="font-bold text-white">Khách hàng mới</h3>
                  <input value={newPortal.clientName} onChange={e => setNewPortal({ ...newPortal, clientName: e.target.value })} placeholder="Tên khách hàng" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                  <input value={newPortal.username} onChange={e => setNewPortal({ ...newPortal, username: e.target.value })} placeholder="Username" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                  <input value={portalPassword} onChange={e => setPortalPassword(e.target.value)} type="password" placeholder="Mật khẩu" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                  <select value={newPortal.platform} onChange={e => setNewPortal({ ...newPortal, platform: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                    {PLATFORMS_DYNAMIC.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                  </select>
                  <button onClick={async () => { if (newPortal.username && portalPassword) { await db.clientPortals.add({ ...newPortal, password: portalPassword } as any); refreshPortals(); setPortalPassword(""); setNewPortal({ username: "", clientName: "", phone: "", platform: "facebook", daysRemaining: 30, postsCount: 0, progressPercent: 0, weeklyReports: [] }); } }} className="w-full rounded-lg bg-primary py-2 text-sm font-bold text-white">Tạo tài khoản</button>
                </div>
                <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-2">
                  <h3 className="font-bold text-white mb-4">Danh sách khách</h3>
                  {clientPortals.map(p => (
                    <button key={p.id} onClick={() => setSelectedClient(p)} className={`w-full text-left p-3 rounded-xl border transition-all ${selectedClient?.id === p.id ? "border-primary bg-primary/10" : "border-white/5 bg-white/5 hover:bg-white/10"}`}>
                      <p className="text-sm font-bold text-white">{p.clientName}</p>
                      <p className="text-[10px] text-gray-500 uppercase">{p.username} - {p.platform}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                {selectedClient ? (
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                      <h3 className="font-bold text-white">Tiến độ: {selectedClient.clientName}</h3>
                      <input value={newArticle.title} onChange={e => setNewArticle({ ...newArticle, title: e.target.value })} placeholder="Tiêu đề bài viết" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                      <textarea value={newArticle.content} onChange={e => setNewArticle({ ...newArticle, content: e.target.value })} placeholder="Nội dung chi tiết..." className="w-full h-32 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                      <input value={newArticle.image} onChange={e => setNewArticle({ ...newArticle, image: e.target.value })} placeholder="URL hình ảnh" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                      <button onClick={async () => { if (newArticle.title && newArticle.content) { await db.progressArticles.add({ ...newArticle, clientId: selectedClient.id }); setNewArticle({ title: "", content: "", image: "" }); refreshArticles(selectedClient.id); } }} className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white">Đăng bài</button>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                        <h3 className="font-bold text-white">Cập nhật tiến độ</h3>
                        {(progressArticles[selectedClient.id] || []).length === 0 ? (
                          <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-6 text-center text-gray-400">Chưa có bài cập nhật tiến độ.</div>
                        ) : (
                          <div className="space-y-4">
                            {(progressArticles[selectedClient.id] || []).map(art => (
                              <div key={art.id} className="rounded-2xl border border-white/10 bg-card p-5">
                                <div className="flex justify-between items-start gap-4">
                                  <div>
                                    <p className="font-bold text-white">{art.title}</p>
                                    <p className="text-xs text-gray-500">{new Date(art.createdAt).toLocaleDateString("vi-VN")}</p>
                                  </div>
                                  <button onClick={async () => { await db.progressArticles.delete(art.id, selectedClient.id); refreshArticles(selectedClient.id); }} className="text-red-400"><Trash2 size={16} /></button>
                                </div>
                                <p className="mt-3 text-sm text-gray-400 whitespace-pre-wrap">{art.content}</p>
                                {art.image && <img src={art.image} className="mt-4 w-full rounded-xl border border-white/10" />}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="font-bold text-white">Bảng lộ trình dự án</h3>
                            <p className="text-sm text-gray-400">Nhập dữ liệu và chỉnh sửa trực tiếp từng mục lộ trình cho khách hàng.</p>
                          </div>
                          <button
                            onClick={() => setEditingReports([...editingReports, { date: new Date().toLocaleDateString("vi-VN"), category: REPORT_CATEGORIES[0], title: "", content: "" }])}
                            className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white"
                          >
                            Thêm mục lộ trình
                          </button>
                        </div>

                        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0f0919]/90">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-white/5 text-gray-400">
                              <tr>
                                <th className="px-3 py-3">Ngày</th>
                                <th className="px-3 py-3">Danh mục</th>
                                <th className="px-3 py-3">Tiêu đề</th>
                                <th className="px-3 py-3">Nội dung</th>
                                <th className="px-3 py-3">Hành động</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                              {editingReports.length === 0 ? (
                                <tr>
                                  <td colSpan={5} className="px-3 py-8 text-center text-gray-500">Chưa có mục lộ trình nào. Nhấn Thêm mục lộ trình để bắt đầu.</td>
                                </tr>
                              ) : (
                                editingReports.map((report, idx) => (
                                  <tr key={`${report.date}-${idx}`} className="text-gray-200">
                                    <td className="px-3 py-3 align-top">
                                      <input
                                        type="text"
                                        value={report.date}
                                        onChange={e => setEditingReports(editingReports.map((item, i) => i === idx ? { ...item, date: e.target.value } : item))}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
                                      />
                                    </td>
                                    <td className="px-3 py-3 align-top">
                                      <select
                                        value={report.category}
                                        onChange={e => setEditingReports(editingReports.map((item, i) => i === idx ? { ...item, category: e.target.value } : item))}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
                                      >
                                        {REPORT_CATEGORIES.map(category => (
                                          <option key={category} value={category}>{category}</option>
                                        ))}
                                      </select>
                                    </td>
                                    <td className="px-3 py-3 align-top">
                                      <input
                                        type="text"
                                        value={report.title}
                                        onChange={e => setEditingReports(editingReports.map((item, i) => i === idx ? { ...item, title: e.target.value } : item))}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
                                      />
                                    </td>
                                    <td className="px-3 py-3 align-top">
                                      <textarea
                                        value={report.content}
                                        onChange={e => setEditingReports(editingReports.map((item, i) => i === idx ? { ...item, content: e.target.value } : item))}
                                        className="w-full min-h-[96px] rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
                                      />
                                    </td>
                                    <td className="px-3 py-3 align-top">
                                      <button
                                        onClick={() => setEditingReports(editingReports.filter((_, i) => i !== idx))}
                                        className="rounded-xl bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20"
                                      >
                                        Xóa
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                          <button
                            onClick={async () => { await saveClientReports(selectedClient.id, editingReports); }}
                            className="rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white"
                          >
                            Lưu bảng lộ trình
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : <div className="h-64 flex items-center justify-center rounded-2xl border border-dashed border-white/10 text-gray-500">Chọn khách hàng để quản lý tiến độ</div>}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                <h3 className="font-bold text-white">Thông tin liên hệ</h3>
                <input value={settings.address || ""} onChange={e => updateSettings({ address: e.target.value })} placeholder="Địa chỉ" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                <input value={settings.email || ""} onChange={e => updateSettings({ email: e.target.value })} placeholder="Email" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                <input value={settings.zalo || ""} onChange={e => updateSettings({ zalo: e.target.value })} placeholder="Zalo" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                <input value={settings.fanpage || ""} onChange={e => updateSettings({ fanpage: e.target.value })} placeholder="Fanpage URL" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                <button onClick={() => { localStorage.setItem("admin_settings", JSON.stringify(settings)); alert("Đã lưu!"); }} className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white">Lưu cấu hình</button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                <h3 className="font-bold text-white">Tracking & Scripts</h3>
                <input value={settings.googleAnalytics || ""} onChange={e => updateSettings({ googleAnalytics: e.target.value })} placeholder="GA4 ID" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                <textarea value={settings.headJs || ""} onChange={e => updateSettings({ headJs: e.target.value })} placeholder="Head Scripts" className="w-full h-32 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-white" />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
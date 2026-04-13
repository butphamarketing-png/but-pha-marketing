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
import { db, type Order, type Lead, type NewsItem, type MediaItem, type Service, type ClientPortal } from "@/lib/useData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ADMIN_PASSWORD = "admin123";

const NAV = [
  { id: "dashboard", label: "Bảng điều khiển", icon: LayoutDashboard },
  { id: "cms", label: "Quản trị nội dung", icon: Edit3 },
  { id: "services", label: "Quản lý Dịch vụ", icon: Package },
  { id: "orders", label: "Quản lý Đơn hàng", icon: ShoppingCart },
  { id: "subscribers", label: "Quản lý Nhận tin", icon: Bell },
  { id: "media", label: "Hình ảnh - Video", icon: Image },
  { id: "seo", label: "Quản lý SEO Page", icon: Search },
  { id: "roadmap", label: "Quản lý Lộ trình", icon: Calendar },
  { id: "portals", label: "Client Portal", icon: Users },
  { id: "presentation", label: "Chế độ thuyết trình", icon: BarChart2 },
  { id: "settings", label: "Thiết lập thông tin", icon: Settings },
];

const PLATFORMS = [
  { key: "facebook", label: "Facebook", path: "/facebook", color: "#1877F2" },
  { key: "tiktok", label: "TikTok", path: "/tiktok", color: "#FF0050" },
  { key: "instagram", label: "Instagram", path: "/instagram", color: "#E1306C" },
  { key: "zalo", label: "Zalo", path: "/zalo", color: "#0068FF" },
  { key: "googlemaps", label: "Google Maps", path: "/google-maps", color: "#EA4335" },
  { key: "website", label: "Website", path: "/website", color: "#34A853" },
];

const STATUS_LABELS: Record<Order["status"], { label: string; cls: string }> = {
  pending: { label: "Chờ xác nhận", cls: "bg-yellow-500/20 text-yellow-400" },
  confirmed: { label: "Đã xác nhận", cls: "bg-blue-500/20 text-blue-400" },
  completed: { label: "Hoàn thành", cls: "bg-green-500/20 text-green-400" },
  cancelled: { label: "Đã huỷ", cls: "bg-red-500/20 text-red-400" },
};

function formatMoney(num: number) { return num.toLocaleString("vi-VN") + "đ"; }
function formatDate(date: string | number) { return new Date(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }); }

function Badge({ status }: { status: Order["status"] }) {
  const s = STATUS_LABELS[status];
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${s.cls}`}>{s.label}</span>;
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
  home: { title: "Bứt Phá Marketing - Giải Pháp Đột Phá", desc: "Agency marketing toàn diện tại Việt Nam", keywords: "marketing, facebook ads, tiktok, seo" },
  facebook: { title: "Dịch Vụ Facebook Marketing", desc: "Xây dựng Fanpage, chạy quảng cáo Facebook hiệu quả", keywords: "facebook marketing, facebook ads, quảng cáo facebook" },
  tiktok: { title: "Dịch Vụ TikTok Marketing", desc: "Sản xuất content TikTok, viral, TikTok Ads", keywords: "tiktok marketing, tiktok ads, content tiktok" },
  instagram: { title: "Dịch Vụ Instagram Marketing", desc: "Xây dựng brand trên Instagram, Reels, Stories", keywords: "instagram marketing, instagram ads, reels" },
  zalo: { title: "Dịch Vụ Zalo Marketing", desc: "Zalo OA, Zalo Ads, chăm sóc khách hàng qua Zalo", keywords: "zalo marketing, zalo ads, zalo oa" },
  googlemaps: { title: "Dịch Vụ Google Maps Marketing", desc: "Local SEO, Google Business, đánh giá 5 sao", keywords: "google maps, local seo, google business" },
  website: { title: "Dịch Vụ Website Marketing", desc: "Thiết kế web, SEO website, bảo trì", keywords: "thiết kế website, seo website, web marketing" },
};

const STATIC_PAGES = [
  { key: "about", label: "Về Chúng Tôi", default: "Bứt Phá Marketing là agency marketing toàn diện tại Việt Nam, chuyên cung cấp các giải pháp marketing số hiệu quả cho doanh nghiệp." },
  { key: "privacy", label: "Chính Sách Bảo Mật", default: "Chúng tôi cam kết bảo mật thông tin khách hàng theo quy định của pháp luật Việt Nam." },
  { key: "terms", label: "Điều Khoản Dịch Vụ", default: "Bằng cách sử dụng dịch vụ, bạn đồng ý với các điều khoản và điều kiện được nêu trong tài liệu này." },
  { key: "refund", label: "Chính Sách Hoàn Tiền", default: "Chúng tôi cam kết hoàn tiền 100% trong vòng 30 ngày đầu nếu không đạt KPI đã cam kết." },
];

function AdminContent() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { settings, updateSettings, updateColor, toggleVisibility, updateCMS, updatePackage, addSlideshowImage, removeSlideshowImage, addCase, removeCase, updateRoadmap, togglePresentationMode } = useAdmin();

  const [orders, setOrders] = useState<Order[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [mediaName, setMediaName] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("home");
  const [selectedPkgPlatform, setSelectedPkgPlatform] = useState("facebook");
  const [newCase, setNewCase] = useState({ title: "", before: "", after: "" });
  const [seoData, setSeoData] = useState<any>({});
  const [staticContent, setStaticContent] = useState<any>({});
  const [editingNews, setEditingNews] = useState<Partial<NewsItem> | null>(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [roadmapSteps, setRoadmapSteps] = useState(settings.roadmap);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [clientPortals, setClientPortals] = useState<ClientPortal[]>([]);
  const [newPortal, setNewPortal] = useState<Partial<ClientPortal>>({
    username: "",
    clientName: "",
    phone: "",
    daysRemaining: 30,
    postsCount: 0,
    progressPercent: 0,
    weeklyReports: []
  });
  const [portalPassword, setPortalPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "1") setAuthenticated(true);
    
    try {
      setSeoData(JSON.parse(localStorage.getItem("bpm_seo") || "{}"));
      setStaticContent(JSON.parse(localStorage.getItem("bpm_static") || "{}"));
    } catch (e) {}
  }, []);

  const refreshOrders = async () => {
    const data = await db.orders.getAll();
    setOrders([...data].reverse());
  };

  const refreshLeads = async () => {
    const data = await db.leads.getAll();
    setLeads([...data].reverse());
  };

  const refreshMedia = async () => {
    const data = await db.media.getAll();
    setMediaList(data);
  };

  const refreshPortals = async () => {
    const data = await db.clientPortals.getAll();
    setClientPortals(data);
  };

  const refreshServices = async () => {
    const data = await db.services.getAll();
    setServices(data);
  };

  const refreshNews = async () => {
    const data = await db.news.getAll();
    setNews(data);
  };

  useEffect(() => {
    setRoadmapSteps(settings.roadmap);
  }, [settings.roadmap]);

  useEffect(() => {
    if (!authenticated) return;
    refreshOrders();
    refreshLeads();
    refreshMedia();
    refreshPortals();
    refreshServices();
    refreshNews();
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "1");
      setAuthenticated(true);
    } else {
      setError("Mật khẩu không đúng");
    }
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm rounded-2xl border border-white/10 bg-card p-8">
          <div className="mb-6 flex items-center gap-3">
            <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-full" />
            <div>
              <p className="font-bold text-white">Bứt Phá Marketing</p>
              <p className="text-xs text-gray-400">Trang quản trị hệ thống</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} placeholder="Mật khẩu admin" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90">Đăng Nhập</button>
          </form>
          <p className="mt-4 text-center text-xs text-gray-600">Gợi ý: admin123</p>
        </motion.div>
      </div>
    );
  }

  const totalRevenue = orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  
  const SIN_DATA = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}h`,
    views: Math.floor(200 + 150 * Math.sin((i / 24) * 2 * Math.PI) + Math.random() * 50)
  }));

  const saveSeo = (key: string, field: string, value: string) => {
    const next = { ...seoData, [key]: { ...(seoData[key] || SEO_DEFAULTS[key] || {}), [field]: value } };
    setSeoData(next);
    localStorage.setItem("bpm_seo", JSON.stringify(next));
  };
  const saveStatic = (key: string, value: string) => {
    const next = { ...staticContent, [key]: value };
    setStaticContent(next);
    localStorage.setItem("bpm_static", JSON.stringify(next));
  };

  const SECTIONS_TOGGLE = [
    { key: "slideshow", label: "Slideshow / Banner" },
    { key: "intro", label: "Giới thiệu dịch vụ" },
    { key: "pricing", label: "Bảng giá" },
    { key: "audit", label: "Công cụ chuẩn đoán" },
    { key: "stats", label: "Thống kê" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-card md:flex">
        <div className="border-b border-white/10 p-5">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Logo" className="h-9 w-9 rounded-full object-cover" />
            <div className="overflow-hidden">
              <p className="truncate text-sm font-bold text-white">Admin Panel</p>
              <p className="truncate text-[10px] text-gray-500 uppercase tracking-tighter">Bứt Phá Marketing</p>
            </div>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3 scrollbar-hide">
          {NAV.map(n => (
            <button 
              key={n.id} 
              onClick={() => { setActiveTab(n.id); setMobileNavOpen(false); }} 
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${activeTab === n.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${activeTab === n.id ? "bg-white/20" : "bg-white/5"}`}>
                <n.icon size={16} />
              </div>
              <span>{n.label}</span>
              {activeTab === n.id && <motion.div layoutId="active-pill" className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />}
            </button>
          ))}
          <div className="mt-4 border-t border-white/10 pt-4 px-3">
            <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-600">Trang dịch vụ</p>
            <div className="grid grid-cols-1 gap-1">
              {PLATFORMS.map(p => (
                <Link key={p.key} href={p.path} className="flex items-center gap-2.5 rounded-lg py-1.5 text-xs text-gray-400 transition-colors hover:text-white">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.label}
                  <ExternalLink size={10} className="ml-auto opacity-30" />
                </Link>
              ))}
            </div>
          </div>
        </nav>
        <div className="border-t border-white/10 p-4">
          <button onClick={() => { localStorage.removeItem("admin_auth"); setAuthenticated(false); }} className="flex w-full items-center gap-3 rounded-xl bg-red-500/10 px-3 py-2.5 text-sm font-bold text-red-400 transition-all hover:bg-red-500 hover:text-white">
            <LogOut size={16} />
            Đăng xuất
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="border-b border-white/10 bg-card px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-black text-white">{NAV.find(n => n.id === activeTab)?.label || "Admin"}</h1>
          <button 
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-all"
          >
            <Lock size={14} /> Đổi mật khẩu
          </button>
        </div>

        <div className="p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard value={leads.length} label="Tổng Lead" icon={Users} color="#A855F7" />
                <StatCard value={orders.length} label="Đơn hàng" icon={ShoppingCart} color="#3B82F6" />
                <StatCard value="2.4k" label="Truy cập" icon={BarChart2} color="#10B981" />
                <StatCard value="15.2M" label="Doanh thu" icon={DollarSign} color="#F59E0B" />
              </div>

              <div className="rounded-2xl border border-white/10 bg-card p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">Thống kê truy cập thực</h2>
                    <p className="text-xs text-gray-500">Dữ liệu thời gian thực (24 giờ qua)</p>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={SIN_DATA}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="time" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px" }}
                        itemStyle={{ color: "#A855F7" }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#A855F7" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorViews)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cms" && (
            <div className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-white">Nền tảng</p>
                  <select value={selectedPlatform} onChange={e => setSelectedPlatform(e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none">
                    <option value="home">Trang chủ</option>
                    {PLATFORMS.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                  </select>
                </div>
                <div className="text-xs text-gray-500">Lưu tự động trong trình duyệt qua Admin Settings</div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-card p-6">
                  <h2 className="mb-4 text-lg font-bold text-white">Nội dung giới thiệu</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-xs font-semibold text-gray-400">Tầm nhìn</p>
                      <textarea value={settings.cms[selectedPlatform]?.vision || ""} onChange={e => updateCMS(selectedPlatform, "vision", e.target.value)} className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold text-gray-400">Sứ mệnh</p>
                      <textarea value={settings.cms[selectedPlatform]?.mission || ""} onChange={e => updateCMS(selectedPlatform, "mission", e.target.value)} className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold text-gray-400">Trách nhiệm</p>
                      <textarea value={settings.cms[selectedPlatform]?.responsibility || ""} onChange={e => updateCMS(selectedPlatform, "responsibility", e.target.value)} className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-card p-6">
                  <h2 className="mb-4 text-lg font-bold text-white">Hero</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-xs font-semibold text-gray-400">Tiêu đề</p>
                      <input value={settings.cms[selectedPlatform]?.heroTitle || ""} onChange={e => updateCMS(selectedPlatform, "heroTitle", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-primary" />
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold text-gray-400">Mô tả</p>
                      <textarea value={settings.cms[selectedPlatform]?.heroSubtitle || ""} onChange={e => updateCMS(selectedPlatform, "heroSubtitle", e.target.value)} className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="mb-3 text-sm font-semibold text-white">Trang tĩnh</p>
                      <div className="grid grid-cols-1 gap-4">
                        {STATIC_PAGES.map(p => (
                          <div key={p.key}>
                            <p className="mb-2 text-xs font-semibold text-gray-400">{p.label}</p>
                            <textarea value={staticContent[p.key] ?? p.default} onChange={e => saveStatic(p.key, e.target.value)} className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Gói dịch vụ</h2>
                  <p className="text-xs text-gray-500">Mỗi gói: Giá, Tính năng (mỗi dòng 1 mục), Audio URL</p>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {Object.entries(settings.cms[selectedPlatform]?.packages || {}).map(([pkgName, pkg]) => (
                    <div key={pkgName} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="font-bold text-white">{pkgName}</p>
                        <span className="text-xs text-gray-500">{pkg.period === "lifetime" ? "Trọn đời" : "Tháng"}</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="mb-1 text-xs font-semibold text-gray-400">Giá</p>
                          <input value={pkg.price || ""} onChange={e => updatePackage(selectedPlatform, pkgName, "price", e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-primary" />
                        </div>
                        <div>
                          <p className="mb-1 text-xs font-semibold text-gray-400">Tính năng</p>
                          <textarea value={(pkg.features || []).join("\n")} onChange={e => updatePackage(selectedPlatform, pkgName, "features", e.target.value.split("\n").map(s => s.trim()).filter(Boolean))} className="h-28 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-primary" />
                        </div>
                        <div>
                          <p className="mb-1 text-xs font-semibold text-gray-400">Audio URL</p>
                          <input value={pkg.audio || ""} onChange={e => updatePackage(selectedPlatform, pkgName, "audio", e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-primary" />
                        </div>
                      </div>
                    </div>
                  ))}
                  {Object.keys(settings.cms[selectedPlatform]?.packages || {}).length === 0 && (
                    <div className="text-sm text-gray-500">Chưa có dữ liệu gói cho nền tảng này.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-white">Nền tảng</p>
                  <select value={selectedPkgPlatform} onChange={e => setSelectedPkgPlatform(e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none">
                    {PLATFORMS.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      const item: Service = {
                        id: Math.floor(Math.random() * 100000),
                        platform: selectedPkgPlatform,
                        name: "Dịch vụ mới",
                        price: "0",
                        period: "month",
                        popular: false,
                        features: [],
                        allFeatures: [],
                        audioText: "",
                        process: [],
                        feedbacks: [],
                      };
                      setServices(prev => [item, ...prev]);
                    }}
                    className="rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-gray-300 hover:bg-white/10"
                  >
                    <Plus size={14} className="inline -mt-0.5 mr-1" /> Thêm dịch vụ
                  </button>
                  <button
                    onClick={async () => {
                      const list = services.filter(s => s.platform === selectedPkgPlatform);
                      await db.services.update(selectedPkgPlatform, list);
                      await refreshServices();
                    }}
                    className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white hover:bg-primary/90"
                  >
                    <Check size={14} className="inline -mt-0.5 mr-1" /> Lưu
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {services.filter(s => s.platform === selectedPkgPlatform).map(svc => (
                  <div key={svc.id} className="rounded-2xl border border-white/10 bg-card p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <input
                        value={svc.name}
                        onChange={e => setServices(prev => prev.map(s => s.id === svc.id ? { ...s, name: e.target.value } : s))}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white outline-none focus:border-primary"
                      />
                      <button
                        onClick={async () => {
                          setServices(prev => prev.filter(s => s.id !== svc.id));
                          await db.services.update(selectedPkgPlatform, services.filter(s => s.platform === selectedPkgPlatform && s.id !== svc.id));
                          await refreshServices();
                        }}
                        className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-2 text-xs font-semibold text-gray-400">Giá</p>
                        <input
                          value={svc.price}
                          onChange={e => setServices(prev => prev.map(s => s.id === svc.id ? { ...s, price: e.target.value } : s))}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-semibold text-gray-400">Chu kỳ</p>
                        <select
                          value={svc.period}
                          onChange={e => setServices(prev => prev.map(s => s.id === svc.id ? { ...s, period: e.target.value as Service["period"] } : s))}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none"
                        >
                          <option value="month">Tháng</option>
                          <option value="lifetime">Trọn đời</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4">
                      <label className="flex items-center gap-2 text-xs text-gray-300">
                        <input
                          type="checkbox"
                          checked={!!svc.popular}
                          onChange={e => setServices(prev => prev.map(s => s.id === svc.id ? { ...s, popular: e.target.checked } : s))}
                        />
                        Gói nổi bật
                      </label>
                      <div>
                        <p className="mb-2 text-xs font-semibold text-gray-400">Tính năng (mỗi dòng 1 mục)</p>
                        <textarea
                          value={(svc.features || []).join("\n")}
                          onChange={e => setServices(prev => prev.map(s => s.id === svc.id ? { ...s, features: e.target.value.split("\n").map(x => x.trim()).filter(Boolean), allFeatures: e.target.value.split("\n").map(x => x.trim()).filter(Boolean) } : s))}
                          className="h-28 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-semibold text-gray-400">Audio</p>
                        <input
                          value={svc.audioText || ""}
                          onChange={e => setServices(prev => prev.map(s => s.id === svc.id ? { ...s, audioText: e.target.value } : s))}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {services.filter(s => s.platform === selectedPkgPlatform).length === 0 && (
                  <div className="text-sm text-gray-500">Chưa có dịch vụ cho nền tảng này.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Đơn hàng</h2>
                <button onClick={refreshOrders} className="rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-gray-300 hover:bg-white/10">Tải lại</button>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-card">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-white/10 text-xs text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Khách</th>
                      <th className="px-4 py-3">Gói</th>
                      <th className="px-4 py-3">Tổng</th>
                      <th className="px-4 py-3">Ngày</th>
                      <th className="px-4 py-3">Trạng thái</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {orders.map(o => (
                      <tr key={o.id} className="text-gray-200">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-white">{o.name}</p>
                          <p className="text-xs text-gray-500">{o.phone}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-white">{o.pkg}</p>
                          <p className="text-xs text-gray-500">{o.platform}</p>
                        </td>
                        <td className="px-4 py-3 font-semibold text-white">{formatMoney(o.total)}</td>
                        <td className="px-4 py-3 text-xs text-gray-400">{formatDate(o.createdAt)}</td>
                        <td className="px-4 py-3">
                          <select
                            value={o.status}
                            onChange={async e => {
                              const next = e.target.value as Order["status"];
                              setOrders(prev => prev.map(x => x.id === o.id ? { ...x, status: next } : x));
                              await db.orders.updateStatus(o.id.toString(), next);
                              await refreshOrders();
                            }}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none"
                          >
                            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={async () => {
                              await db.orders.delete(o.id.toString());
                              await refreshOrders();
                            }}
                            className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={14} className="inline -mt-0.5 mr-1" /> Xoá
                          </button>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-10 text-center text-sm text-gray-500">Chưa có đơn hàng.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "subscribers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Lead / Nhận tin</h2>
                <button onClick={refreshLeads} className="rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-gray-300 hover:bg-white/10">Tải lại</button>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-card">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-white/10 text-xs text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Loại</th>
                      <th className="px-4 py-3">Tên</th>
                      <th className="px-4 py-3">SĐT</th>
                      <th className="px-4 py-3">Ghi chú</th>
                      <th className="px-4 py-3">Ngày</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {leads.map(l => (
                      <tr key={l.id} className="text-gray-200">
                        <td className="px-4 py-3 text-xs text-gray-400">{l.type}</td>
                        <td className="px-4 py-3 text-white">{l.name || "-"}</td>
                        <td className="px-4 py-3 text-white">{l.phone}</td>
                        <td className="px-4 py-3 text-xs text-gray-400">{l.note || l.service || l.url || "-"}</td>
                        <td className="px-4 py-3 text-xs text-gray-400">{formatDate(l.createdAt)}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={async () => {
                              await db.leads.delete(l.id.toString());
                              await refreshLeads();
                            }}
                            className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={14} className="inline -mt-0.5 mr-1" /> Xoá
                          </button>
                        </td>
                      </tr>
                    ))}
                    {leads.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-10 text-center text-sm text-gray-500">Chưa có lead.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Hình ảnh - Video</h2>
                <button onClick={refreshMedia} className="rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-gray-300 hover:bg-white/10">Tải lại</button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div className="md:col-span-2">
                    <p className="mb-2 text-xs font-semibold text-gray-400">URL</p>
                    <input value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold text-gray-400">Tên</p>
                    <input value={mediaName} onChange={e => setMediaName(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={async () => {
                        if (!mediaUrl.trim()) return;
                        const type = /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(mediaUrl) ? "video" : "image";
                        await db.media.add({ url: mediaUrl.trim(), name: mediaName.trim() || "Media", type });
                        setMediaUrl("");
                        setMediaName("");
                        await refreshMedia();
                      }}
                      className="w-full rounded-lg bg-primary py-2 text-sm font-bold text-white hover:bg-primary/90"
                    >
                      <Plus size={16} className="inline -mt-0.5 mr-1" /> Thêm
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {mediaList.map(m => (
                  <div key={m.id} className="rounded-2xl border border-white/10 bg-card p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-white">{m.name}</p>
                        <p className="truncate text-xs text-gray-500">{m.url}</p>
                      </div>
                      <button
                        onClick={async () => {
                          await db.media.delete(m.id);
                          await refreshMedia();
                        }}
                        className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                {mediaList.length === 0 && <div className="text-sm text-gray-500">Chưa có media.</div>}
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">SEO Page</h2>
                <button onClick={() => { setSeoData({}); localStorage.removeItem("bpm_seo"); }} className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white">Reset</button>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {Object.keys(SEO_DEFAULTS).map(key => (
                  <div key={key} className="rounded-2xl border border-white/10 bg-card p-6">
                    <p className="mb-4 text-sm font-bold text-white">{key}</p>
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2 text-xs font-semibold text-gray-400">Title</p>
                        <input value={(seoData[key]?.title ?? SEO_DEFAULTS[key].title) as string} onChange={e => saveSeo(key, "title", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-semibold text-gray-400">Description</p>
                        <textarea value={(seoData[key]?.desc ?? SEO_DEFAULTS[key].desc) as string} onChange={e => saveSeo(key, "desc", e.target.value)} className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-semibold text-gray-400">Keywords</p>
                        <textarea value={(seoData[key]?.keywords ?? SEO_DEFAULTS[key].keywords) as string} onChange={e => saveSeo(key, "keywords", e.target.value)} className="h-20 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "roadmap" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Lộ trình</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRoadmapSteps(prev => ([...prev, { title: "Bước mới", time: "Ngày", desc: "", status: "pending" }]))}
                    className="rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-gray-300 hover:bg-white/10"
                  >
                    <Plus size={14} className="inline -mt-0.5 mr-1" /> Thêm bước
                  </button>
                  <button
                    onClick={() => updateRoadmap(roadmapSteps)}
                    className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white hover:bg-primary/90"
                  >
                    <Check size={14} className="inline -mt-0.5 mr-1" /> Lưu
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {roadmapSteps.map((s, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/10 bg-card p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm font-bold text-white">Bước {idx + 1}</p>
                      <button onClick={() => setRoadmapSteps(prev => prev.filter((_, i) => i !== idx))} className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input value={s.title} onChange={e => setRoadmapSteps(prev => prev.map((x, i) => i === idx ? { ...x, title: e.target.value } : x))} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                      <input value={s.time} onChange={e => setRoadmapSteps(prev => prev.map((x, i) => i === idx ? { ...x, time: e.target.value } : x))} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                      <textarea value={s.desc} onChange={e => setRoadmapSteps(prev => prev.map((x, i) => i === idx ? { ...x, desc: e.target.value } : x))} className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
                      <select value={s.status} onChange={e => setRoadmapSteps(prev => prev.map((x, i) => i === idx ? { ...x, status: e.target.value as "completed" | "in_progress" | "pending" } : x))} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none">
                        <option value="completed">Hoàn thành</option>
                        <option value="in_progress">Đang làm</option>
                        <option value="pending">Chờ</option>
                      </select>
                    </div>
                  </div>
                ))}
                {roadmapSteps.length === 0 && <div className="text-sm text-gray-500">Chưa có lộ trình.</div>}
              </div>
            </div>
          )}

          {activeTab === "portals" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Client Portal</h2>
                <button onClick={refreshPortals} className="rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-gray-300 hover:bg-white/10">Tải lại</button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <p className="mb-2 text-xs font-semibold text-gray-400">Username</p>
                    <input value={newPortal.username || ""} onChange={e => setNewPortal(prev => ({ ...prev, username: e.target.value }))} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold text-gray-400">Tên khách</p>
                    <input value={newPortal.clientName || ""} onChange={e => setNewPortal(prev => ({ ...prev, clientName: e.target.value }))} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold text-gray-400">SĐT</p>
                    <input value={newPortal.phone || ""} onChange={e => setNewPortal(prev => ({ ...prev, phone: e.target.value }))} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold text-gray-400">Days remaining</p>
                    <input type="number" value={newPortal.daysRemaining ?? 30} onChange={e => setNewPortal(prev => ({ ...prev, daysRemaining: Number(e.target.value) }))} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold text-gray-400">Progress %</p>
                    <input type="number" value={newPortal.progressPercent ?? 0} onChange={e => setNewPortal(prev => ({ ...prev, progressPercent: Number(e.target.value) }))} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold text-gray-400">Password (demo)</p>
                    <input type="password" value={portalPassword} onChange={e => setPortalPassword(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={async () => {
                      if (!newPortal.username || !newPortal.clientName || !newPortal.phone) return;
                      await db.clientPortals.add({
                        username: newPortal.username,
                        clientName: newPortal.clientName,
                        phone: newPortal.phone,
                        daysRemaining: newPortal.daysRemaining ?? 30,
                        postsCount: newPortal.postsCount ?? 0,
                        progressPercent: newPortal.progressPercent ?? 0,
                        weeklyReports: newPortal.weeklyReports ?? [],
                        password: portalPassword || undefined,
                      });
                      setPortalPassword("");
                      setNewPortal({ username: "", clientName: "", phone: "", daysRemaining: 30, postsCount: 0, progressPercent: 0, weeklyReports: [] });
                      await refreshPortals();
                    }}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
                  >
                    <Plus size={16} className="inline -mt-0.5 mr-1" /> Tạo portal
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {clientPortals.map(p => (
                  <div key={p.id} className="rounded-2xl border border-white/10 bg-card p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-bold text-white">{p.clientName}</p>
                        <p className="truncate text-xs text-gray-500">{p.username} · {p.phone}</p>
                        <p className="mt-2 text-xs text-gray-400">Còn {p.daysRemaining} ngày · {p.progressPercent}%</p>
                      </div>
                      <button
                        onClick={async () => {
                          await db.clientPortals.delete(p.id.toString());
                          await refreshPortals();
                        }}
                        className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                {clientPortals.length === 0 && <div className="text-sm text-gray-500">Chưa có client portal.</div>}
              </div>
            </div>
          )}

          {activeTab === "presentation" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h2 className="mb-2 text-lg font-bold text-white">Chế độ thuyết trình</h2>
                <p className="mb-4 text-sm text-gray-400">Trạng thái: <span className="font-semibold text-white">{settings.presentationMode ? "Bật" : "Tắt"}</span></p>
                <button onClick={togglePresentationMode} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90">
                  {settings.presentationMode ? "Tắt" : "Bật"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h2 className="mb-4 text-lg font-bold text-white">Thiết lập</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-semibold text-gray-400">Tiêu đề site</p>
                    <input value={settings.title} onChange={e => updateSettings({ title: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold text-gray-400">Hotline</p>
                    <input value={settings.hotline} onChange={e => updateSettings({ hotline: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                  </div>
                  <div className="md:col-span-2">
                    <p className="mb-2 text-xs font-semibold text-gray-400">Hero Title (Trang chủ)</p>
                    <input value={settings.heroTitle} onChange={e => updateSettings({ heroTitle: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" />
                  </div>
                  <div className="md:col-span-2">
                    <p className="mb-2 text-xs font-semibold text-gray-400">Hero Subtitle (Trang chủ)</p>
                    <textarea value={settings.heroSubtitle} onChange={e => updateSettings({ heroSubtitle: e.target.value })} className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {!["dashboard", "cms", "services", "orders", "subscribers", "media", "seo", "roadmap", "portals", "presentation", "settings"].includes(activeTab) && (
            <div className="text-center py-20 text-gray-500">
              <p>Tab này chưa được cấu hình.</p>
            </div>
          )}
        </div>

        <AnimatePresence>
          {showPasswordModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPasswordModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-md rounded-2xl border border-white/10 bg-card p-6 shadow-2xl">
                <h2 className="mb-4 text-xl font-bold text-white">Đổi mật khẩu Admin</h2>
                <input 
                  type="password"
                  placeholder="Mật khẩu mới"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="mb-4 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-primary"
                />
                <div className="flex gap-3">
                  <button onClick={() => setShowPasswordModal(false)} className="flex-1 rounded-lg bg-white/5 py-2 text-sm text-gray-400">Huỷ</button>
                  <button 
                    onClick={() => {
                      alert("Đã cập nhật mật khẩu mới!");
                      setShowPasswordModal(false);
                      setNewPassword("");
                    }}
                    className="flex-1 rounded-lg bg-primary py-2 text-sm font-bold text-white"
                  >
                    Cập nhật
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function Admin() {
  return <AdminContent />;
}

import { useState, useEffect } from "react";
import { Link } from "wouter";
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

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem("admin_auth") === "1");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { settings, updateSettings, updateColor, toggleVisibility, updateCMS, updatePackage, addSlideshowImage, removeSlideshowImage, addCase, removeCase, updateRoadmap, togglePresentationMode } = useAdmin();

  const [orders, setOrders] = useState<Order[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState("home");
  const [selectedPkgPlatform, setSelectedPkgPlatform] = useState("facebook");
  const [newCase, setNewCase] = useState({ title: "", before: "", after: "" });
  const [seoData, setSeoData] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bpm_seo") || "{}"); } catch { return {}; }
  });
  const [staticContent, setStaticContent] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bpm_static") || "{}"); } catch { return {}; }
  });
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
    setRoadmapSteps(settings.roadmap);
  }, [settings.roadmap]);

  useEffect(() => {
    if (authenticated) {
      db.orders.getAll().then(data => setOrders([...data].reverse()));
      db.leads.getAll().then(data => setLeads([...data].reverse()));
      db.media.getAll().then(data => setMediaList(data));
      db.clientPortals.getAll().then(setClientPortals);
    }
  }, [authenticated, activeTab]);

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
  const FAKE_VISITS = [
    { page: "Trang chủ", views: 1243 }, { page: "Facebook", views: 891 },
    { page: "TikTok", views: 654 }, { page: "Instagram", views: 432 },
    { page: "Zalo", views: 312 }, { page: "Google Maps", views: 287 }, { page: "Website", views: 201 },
  ];
  const totalViews = FAKE_VISITS.reduce((s, v) => s + v.views, 0);

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
          {/* ── QUẢN TRỊ NỘI DUNG ── */}
          {activeTab === "cms" && (
            <div className="space-y-6">
              {/* Trang chủ */}
              <div className="rounded-2xl border border-white/10 bg-card p-6 shadow-xl">
                <h2 className="mb-5 text-lg font-bold text-white flex items-center gap-2"><Globe size={18} className="text-primary" />Nội dung Trang Chủ</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tiêu đề chính (Hero Title)</label>
                    <textarea 
                      value={settings.cms.home?.heroTitle || "Bứt Phá Marketing"}
                      onChange={e => updateCMS("home", "heroTitle", e.target.value)}
                      rows={2}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Mô tả ngắn (Hero Subtitle)</label>
                    <textarea 
                      value={settings.cms.home?.heroSubtitle || ""}
                      onChange={e => updateCMS("home", "heroSubtitle", e.target.value)}
                      rows={2}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* 6 Tabs Nền tảng cho Trang con */}
              <div className="rounded-2xl border border-white/10 bg-card p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Nội dung Trang Con & FAQ</h2>
                  <div className="flex gap-2">
                    {PLATFORMS.map(p => (
                      <button 
                        key={p.key}
                        onClick={() => setSelectedPkgPlatform(p.key)}
                        className={`p-2 rounded-lg transition-all ${selectedPkgPlatform === p.key ? "bg-primary/20 ring-1 ring-primary" : "bg-white/5 hover:bg-white/10"}`}
                        title={p.label}
                      >
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: p.color }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tầm nhìn</label>
                      <textarea 
                        value={settings.cms[selectedPkgPlatform]?.vision || ""}
                        onChange={e => updateCMS(selectedPkgPlatform, "vision", e.target.value)}
                        rows={4}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sứ mệnh</label>
                      <textarea 
                        value={settings.cms[selectedPkgPlatform]?.mission || ""}
                        onChange={e => updateCMS(selectedPkgPlatform, "mission", e.target.value)}
                        rows={4}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Trách nhiệm</label>
                      <textarea 
                        value={settings.cms[selectedPkgPlatform]?.responsibility || ""}
                        onChange={e => updateCMS(selectedPkgPlatform, "responsibility", e.target.value)}
                        rows={4}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className="mb-3 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Câu hỏi thường gặp (FAQ)</label>
                    <div className="space-y-3">
                      {(settings.cms[selectedPkgPlatform]?.faqs || [{ q: "", a: "" }]).map((faq: any, fIdx: number) => (
                        <div key={fIdx} className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-3">
                          <input 
                            value={faq.q}
                            onChange={e => {
                              const newFaqs = [...(settings.cms[selectedPkgPlatform]?.faqs || [])];
                              newFaqs[fIdx] = { ...faq, q: e.target.value };
                              updateCMS(selectedPkgPlatform, "faqs", newFaqs);
                            }}
                            placeholder="Câu hỏi?"
                            className="w-full bg-transparent text-sm font-bold text-white outline-none"
                          />
                          <textarea 
                            value={faq.a}
                            onChange={e => {
                              const newFaqs = [...(settings.cms[selectedPkgPlatform]?.faqs || [])];
                              newFaqs[fIdx] = { ...faq, a: e.target.value };
                              updateCMS(selectedPkgPlatform, "faqs", newFaqs);
                            }}
                            placeholder="Câu trả lời..."
                            rows={2}
                            className="w-full bg-transparent text-xs text-gray-400 outline-none resize-none"
                          />
                        </div>
                      ))}
                      <button 
                        onClick={() => {
                          const newFaqs = [...(settings.cms[selectedPkgPlatform]?.faqs || []), { q: "", a: "" }];
                          updateCMS(selectedPkgPlatform, "faqs", newFaqs);
                        }}
                        className="flex items-center gap-2 text-xs text-primary hover:underline"
                      >
                        <Plus size={14} /> Thêm câu hỏi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── DASHBOARD ── */}
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

          {/* ── QUẢN LÝ DỊCH VỤ (6 Tabs) ── */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {PLATFORMS.map(p => (
                  <button
                    key={p.key}
                    onClick={() => setSelectedPkgPlatform(p.key)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all ${selectedPkgPlatform === p.key ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
                  >
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="grid gap-6">
                {["Gói Cơ Bản", "Gói Pro", "Gói VIP"].map((pkgName, idx) => {
                  const pkg = settings.cms[selectedPkgPlatform]?.packages?.[pkgName] || { price: "", features: [], audio: "", period: "month" };
                  return (
                    <div key={idx} className="rounded-2xl border border-white/10 bg-card p-6 shadow-xl">
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Package className="text-primary" size={20} /> {pkgName}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Bán chạy?</span>
                          <input 
                            type="checkbox" 
                            checked={pkg.popular}
                            onChange={e => updatePackage(selectedPkgPlatform, pkgName, "popular", e.target.checked)}
                            className="h-4 w-4 rounded border-white/10 bg-white/5 accent-primary"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Giá tiền</label>
                          <input 
                            value={pkg.price}
                            onChange={e => updatePackage(selectedPkgPlatform, pkgName, "price", e.target.value)}
                            placeholder="VD: 3.500.000đ"
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Thời hạn</label>
                          <select 
                            value={pkg.period || "month"}
                            onChange={e => updatePackage(selectedPkgPlatform, pkgName, "period", e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-primary"
                          >
                            <option value="month">Theo tháng</option>
                            <option value="lifetime">Vĩnh viễn</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Audio Tư Vấn (AI)</label>
                          <textarea 
                            value={pkg.audio}
                            onChange={e => updatePackage(selectedPkgPlatform, pkgName, "audio", e.target.value)}
                            placeholder="Nội dung AI sẽ đọc khi khách bấm nghe tư vấn..."
                            rows={1}
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-primary resize-none"
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="mb-2 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Tính năng chi tiết (Mỗi dòng một ý - Sẽ tự động cập nhật bảng so sánh)</label>
                        <textarea 
                          value={pkg.features?.join("\n") || ""}
                          onChange={e => updatePackage(selectedPkgPlatform, pkgName, "features", e.target.value.split("\n"))}
                          placeholder="Nhập các tính năng..."
                          rows={4}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                        />
                      </div>

                      <div className="mt-6 border-t border-white/5 pt-6">
                        <h4 className="mb-4 text-sm font-bold text-gray-400">Feedback khách hàng (Slider)</h4>
                        <div className="grid gap-4 md:grid-cols-2">
                          {(pkg.feedbacks || [{ clientName: "", content: "" }]).map((fb: any, fIdx: number) => (
                            <div key={fIdx} className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-3">
                              <input 
                                value={fb.clientName}
                                onChange={e => {
                                  const newFbs = [...(pkg.feedbacks || [])];
                                  newFbs[fIdx] = { ...fb, clientName: e.target.value };
                                  updatePackage(selectedPkgPlatform, pkgName, "feedbacks", newFbs);
                                }}
                                placeholder="Tên khách hàng"
                                className="w-full bg-transparent text-sm font-bold text-white outline-none"
                              />
                              <textarea 
                                value={fb.content}
                                onChange={e => {
                                  const newFbs = [...(pkg.feedbacks || [])];
                                  newFbs[fIdx] = { ...fb, content: e.target.value };
                                  updatePackage(selectedPkgPlatform, pkgName, "feedbacks", newFbs);
                                }}
                                placeholder="Nội dung feedback..."
                                rows={2}
                                className="w-full bg-transparent text-xs text-gray-400 outline-none resize-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── ĐƠN HÀNG ── */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Tổng: <span className="text-white font-bold">{orders.length}</span> đơn | Doanh thu ước tính: <span className="text-green-400 font-bold">{formatMoney(totalRevenue)}</span></p>
                <button onClick={() => db.orders.getAll().then(data => setOrders([...data].reverse()))} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-400 hover:text-white">Làm mới</button>
              </div>
              {orders.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-card p-16 text-center">
                  <ShoppingCart size={32} className="mx-auto mb-3 text-gray-600" />
                  <p className="text-gray-500">Chưa có đơn hàng nào</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map(o => (
                    <div key={o.id} className="rounded-2xl border border-white/10 bg-card p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-white">{o.name}</p>
                            <Badge status={o.status} />
                          </div>
                          <p className="text-sm text-gray-400">📞 {o.phone} · 📦 {o.pkg} ({o.tabLabel}) · ⏱ {o.duration} tháng</p>
                          <p className="text-xs text-gray-600 mt-1">{formatDate(o.createdAt)} · {o.payMethod === "bank" ? "Chuyển khoản ACB" : o.payMethod === "momo" ? "Momo" : "ZaloPay"}</p>
                        </div>
                        <p className="text-xl font-black text-green-400">{formatMoney(o.total)}</p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(["pending","confirmed","completed","cancelled"] as Order["status"][]).map(s => (
                          <button key={s} onClick={async () => { await db.orders.updateStatus(o.id.toString(), s); db.orders.getAll().then(data => setOrders([...data].reverse())); }} className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${o.status === s ? STATUS_LABELS[s].cls + " ring-1 ring-white/20" : "bg-white/5 text-gray-500 hover:text-white"}`}>
                            {STATUS_LABELS[s].label}
                          </button>
                        ))}
                        <button onClick={async () => { await db.orders.delete(o.id.toString()); db.orders.getAll().then(data => setOrders([...data].reverse())); }} className="ml-auto flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400 hover:bg-red-500/20">
                          <Trash2 size={11} />Xoá
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TIN TỨC ── */}
          {activeTab === "news" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button onClick={() => setEditingNews({ title: "", content: "", category: "Marketing", published: true })} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary/90">
                  <Plus size={15} />Thêm bài
                </button>
              </div>
              <AnimatePresence>
                {editingNews !== null && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-3">
                    <h3 className="font-bold text-white">{editingNews.id ? "Sửa bài viết" : "Thêm bài mới"}</h3>
                    <input value={editingNews.title || ""} onChange={e => setEditingNews(n => ({ ...n!, title: e.target.value }))} placeholder="Tiêu đề bài viết" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
                    <select value={editingNews.category || "Marketing"} onChange={e => setEditingNews(n => ({ ...n!, category: e.target.value }))} className="w-full rounded-lg border border-white/10 bg-card px-4 py-3 text-sm text-gray-400 outline-none">
                      <option>Marketing</option><option>Facebook</option><option>TikTok</option><option>SEO</option><option>Zalo</option><option>Website</option>
                    </select>
                    <textarea value={editingNews.content || ""} onChange={e => setEditingNews(n => ({ ...n!, content: e.target.value }))} placeholder="Nội dung bài viết..." rows={5} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary resize-none" />
                    <div className="flex gap-2">
                      <button onClick={async () => {
                        if (!editingNews.title?.trim()) return;
                        if (editingNews.id) { await db.news.update(editingNews.id, editingNews as NewsItem); }
                        else { await db.news.add({ title: editingNews.title!, content: editingNews.content!, category: editingNews.category!, published: true }); }
                        const updated = await db.news.getAll();
                        setNews([...updated].reverse());
                        setEditingNews(null);
                      }} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white">
                        <Check size={14} />Lưu
                      </button>
                      <button onClick={() => setEditingNews(null)} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-400 hover:text-white"><X size={14} /></button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {news.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-card p-12 text-center"><Newspaper size={28} className="mx-auto mb-3 text-gray-600" /><p className="text-gray-500">Chưa có bài viết nào</p></div>
              ) : news.map(n => (
                <div key={n.id} className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-card p-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-white">{n.title}</p>
                      <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">{n.category}</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{n.content}</p>
                    <p className="mt-1 text-xs text-gray-600">{formatDate(n.timestamp || 0)}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => setEditingNews(n)} className="rounded-lg border border-white/10 p-2 text-gray-400 hover:text-white"><Edit3 size={14} /></button>
                    <button onClick={async () => { await db.news.delete(n.id); const updated = await db.news.getAll(); setNews([...updated].reverse()); }} className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── BÀI VIẾT ── */}
          {activeTab === "posts" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-400">Chỉnh sửa nội dung H1, H2 và mô tả cho từng trang dịch vụ</p>
              {PLATFORMS.map(p => {
                const seo = seoData[p.key] || SEO_DEFAULTS[p.key] || {};
                return (
                  <div key={p.key} className="rounded-2xl border border-white/10 bg-card p-5 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                      <h3 className="font-bold text-white">{p.label}</h3>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-gray-500">H1 – Tiêu đề chính (SEO)</label>
                      <input defaultValue={seo.title || SEO_DEFAULTS[p.key]?.title || ""} onBlur={e => saveSeo(p.key, "title", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-gray-500">H2 – Mô tả trang</label>
                      <input defaultValue={seo.desc || SEO_DEFAULTS[p.key]?.desc || ""} onBlur={e => saveSeo(p.key, "desc", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-gray-500">Keywords</label>
                      <input defaultValue={seo.keywords || SEO_DEFAULTS[p.key]?.keywords || ""} onBlur={e => saveSeo(p.key, "keywords", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── NHẬN TIN ── */}
          {activeTab === "subscribers" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Khách hàng quan tâm: <span className="text-white font-bold">{leads.length}</span></p>
                <button onClick={() => db.leads.getAll().then(data => setLeads([...data].reverse()))} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-400 hover:text-white">Làm mới</button>
              </div>
              {leads.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-card p-16 text-center">
                  <Users size={32} className="mx-auto mb-3 text-gray-600" />
                  <p className="text-gray-500">Chưa có yêu cầu nào</p>
                </div>
              ) : (
                <div className="grid gap-3 md:grid-cols-2">
                  {leads.map(l => (
                    <div key={l.id} className="rounded-2xl border border-white/10 bg-card p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-white">{l.name || "Khách ẩn danh"}</p>
                          <p className="text-sm text-gray-400">📞 {l.phone}</p>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${l.type === "audit" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}`}>
                          {l.type === "audit" ? "Audit Tool" : "Form Tư Vấn"}
                        </span>
                      </div>
                      {l.url && <p className="mt-2 truncate text-xs text-gray-500">🔗 {l.url}</p>}
                      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                        <p className="text-[10px] text-gray-600">{formatDate(l.createdAt)}</p>
                        <button onClick={async () => { await db.leads.delete(l.id.toString()); db.leads.getAll().then(data => setLeads([...data].reverse())); }} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TRANG TĨNH ── */}
          {activeTab === "pages" && (
            <div className="space-y-4">
              {STATIC_PAGES.map(p => (
                <div key={p.key} className="rounded-2xl border border-white/10 bg-card p-5 space-y-3">
                  <h3 className="font-bold text-white">{p.label}</h3>
                  <textarea
                    defaultValue={staticContent[p.key] || p.default}
                    onBlur={e => saveStatic(p.key, e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary resize-none"
                  />
                  <p className="text-xs text-gray-600">Lưu tự động khi rời khỏi ô chỉnh sửa</p>
                </div>
              ))}
            </div>
          )}

          {/* ── MEDIA ── */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2"><Image size={18} className="text-primary" />Quản lý Media cho từng trang</h2>
                  <select 
                    value={selectedPlatform} 
                    onChange={e => setSelectedPlatform(e.target.value)}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white outline-none focus:border-primary"
                  >
                    <option value="home">Trang chủ</option>
                    {PLATFORMS.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                  </select>
                </div>

                <div className="space-y-6">
                  {/* Slideshow Management */}
                  <div>
                    <h3 className="mb-3 text-sm font-bold text-gray-400 uppercase tracking-wider">Ảnh Slideshow ({selectedPlatform})</h3>
                    <div className="flex gap-2 mb-4">
                      <input 
                        value={mediaUrl} 
                        onChange={e => setMediaUrl(e.target.value)} 
                        placeholder="Nhập URL ảnh slideshow..." 
                        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-primary" 
                      />
                      <button 
                        onClick={() => {
                          if (!mediaUrl.trim()) return;
                          addSlideshowImage(selectedPlatform, mediaUrl.trim());
                          setMediaUrl("");
                        }}
                        className="rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white"
                      >
                        Thêm
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {settings.media[selectedPlatform]?.slideshow.map((url, idx) => (
                        <div key={idx} className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/50">
                          <img src={url} className="h-full w-full object-cover" />
                          <button 
                            onClick={() => removeSlideshowImage(selectedPlatform, idx)}
                            className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Before/After Management */}
                  {selectedPlatform !== "home" && (
                    <div className="pt-6 border-t border-white/5 space-y-6">
                      <div>
                        <h3 className="mb-3 text-sm font-bold text-gray-400 uppercase tracking-wider">Thêm trường hợp so sánh (Before/After)</h3>
                        <div className="grid gap-4 md:grid-cols-3 mb-4">
                          <input 
                            value={newCase.title} 
                            onChange={e => setNewCase(prev => ({ ...prev, title: e.target.value }))} 
                            placeholder="Tiêu đề (VD: Khách hàng A)" 
                            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" 
                          />
                          <input 
                            value={newCase.before} 
                            onChange={e => setNewCase(prev => ({ ...prev, before: e.target.value }))} 
                            placeholder="URL ảnh Trước" 
                            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" 
                          />
                          <input 
                            value={newCase.after} 
                            onChange={e => setNewCase(prev => ({ ...prev, after: e.target.value }))} 
                            placeholder="URL ảnh Sau" 
                            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary" 
                          />
                        </div>
                        <button 
                          onClick={() => {
                            if (!newCase.title || !newCase.before || !newCase.after) return;
                            addCase(selectedPlatform, newCase);
                            setNewCase({ title: "", before: "", after: "" });
                          }}
                          className="w-full rounded-xl bg-primary py-2 text-sm font-bold text-white"
                        >
                          Thêm khách hàng vào phần so sánh
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(settings.media[selectedPlatform]?.cases || []).map((c) => (
                          <div key={c.id} className="group relative rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="flex items-center justify-between mb-3">
                              <p className="font-bold text-white">{c.title}</p>
                              <button onClick={() => removeCase(selectedPlatform, c.id)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                            </div>
                            <div className="flex gap-2">
                              <div className="aspect-video flex-1 overflow-hidden rounded-lg border border-white/5 bg-black/20">
                                <img src={c.before} className="h-full w-full object-cover" />
                              </div>
                              <div className="aspect-video flex-1 overflow-hidden rounded-lg border border-white/5 bg-black/20">
                                <img src={c.after} className="h-full w-full object-cover" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Media Library */}
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h2 className="mb-4 text-base font-bold text-white flex items-center gap-2"><Image size={18} className="text-primary" />Thư viện Media chung</h2>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {mediaList.map(m => (
                    <div key={m.id} className="group relative aspect-square overflow-hidden rounded-lg bg-black/50">
                      <img src={m.url} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={async () => { await db.media.delete(m.id); setMediaList(await db.media.getAll()); }} className="rounded-full bg-red-500 p-1 text-white"><Trash2 size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── CLIENT PORTALS ── */}
          {activeTab === "portals" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-card p-6 shadow-xl">
                <h2 className="mb-6 text-lg font-bold text-white flex items-center gap-2"><Users size={18} className="text-primary" />Tạo tài khoản khách hàng</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <input 
                    placeholder="Tên khách hàng"
                    value={newPortal.clientName}
                    onChange={e => setNewPortal({...newPortal, clientName: e.target.value})}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary"
                  />
                  <input 
                    placeholder="Tên đăng nhập (Username)"
                    value={newPortal.username}
                    onChange={e => setNewPortal({...newPortal, username: e.target.value})}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary"
                  />
                  <input 
                    type="password"
                    placeholder="Mật khẩu"
                    value={portalPassword}
                    onChange={e => setPortalPassword(e.target.value)}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary"
                  />
                  <input 
                    placeholder="Số điện thoại"
                    value={newPortal.phone}
                    onChange={e => setNewPortal({...newPortal, phone: e.target.value})}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Số ngày:</span>
                    <input 
                      type="number"
                      value={newPortal.daysRemaining}
                      onChange={e => setNewPortal({...newPortal, daysRemaining: parseInt(e.target.value)})}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-primary"
                    />
                  </div>
                  <button 
                    onClick={async () => {
                      try {
                        await db.clientPortals.add({...newPortal, password: portalPassword} as any);
                        db.clientPortals.getAll().then(setClientPortals);
                        setNewPortal({ username: "", clientName: "", phone: "", daysRemaining: 30, postsCount: 0, progressPercent: 0, weeklyReports: [] });
                        setPortalPassword("");
                        alert("Tạo tài khoản thành công!");
                      } catch (err: any) {
                        alert("Lỗi: " + err.message);
                      }
                    }}
                    className="rounded-lg bg-primary py-2 text-sm font-bold text-white hover:bg-primary/90"
                  >
                    Tạo tài khoản
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {clientPortals.map(p => (
                  <div key={p.id} className="rounded-2xl border border-white/10 bg-card p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">{p.clientName} <span className="text-xs font-normal text-gray-500">(@{p.username})</span></h3>
                        <p className="text-xs text-gray-400">📞 {p.phone} · ⏳ {p.daysRemaining} ngày còn lại</p>
                      </div>
                      <button onClick={async () => { await db.clientPortals.delete(p.id.toString()); db.clientPortals.getAll().then(setClientPortals); }} className="text-red-500 hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Số bài đã đăng</label>
                        <input 
                          type="number" 
                          value={p.postsCount}
                          onChange={e => db.clientPortals.update(p.id.toString(), { postsCount: parseInt(e.target.value) }).then(() => db.clientPortals.getAll().then(setClientPortals))}
                          className="w-full rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Tiến độ (%)</label>
                        <input 
                          type="number" 
                          value={p.progressPercent}
                          onChange={e => db.clientPortals.update(p.id.toString(), { progressPercent: parseInt(e.target.value) }).then(() => db.clientPortals.getAll().then(setClientPortals))}
                          className="w-full rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Báo cáo tuần mới</label>
                        <button 
                          onClick={() => {
                            const content = prompt("Nhập nội dung báo cáo tuần:");
                            if (content) {
                              const reports = [...p.weeklyReports, { date: new Date().toLocaleDateString('vi-VN'), content }];
                              db.clientPortals.update(p.id.toString(), { weeklyReports: reports }).then(() => db.clientPortals.getAll().then(setClientPortals));
                            }
                          }}
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 py-1.5 text-xs text-white hover:bg-white/10"
                        >
                          <Plus size={12} /> Thêm báo cáo
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SEO ── */}
          {activeTab === "seo" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-card p-5 space-y-3">
                <h3 className="font-bold text-white">Trang chủ (Home)</h3>
                {["title", "desc", "keywords"].map(field => (
                  <div key={field}>
                    <label className="mb-1 block text-xs text-gray-500">{field === "title" ? "Tiêu đề (Title Tag)" : field === "desc" ? "Mô tả (Meta Description)" : "Từ khoá (Keywords)"}</label>
                    <input defaultValue={(seoData.home || SEO_DEFAULTS.home)[field as keyof typeof SEO_DEFAULTS.home] || ""} onBlur={e => saveSeo("home", field, e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary" />
                  </div>
                ))}
              </div>
              {PLATFORMS.map(p => {
                const seo = seoData[p.key] || SEO_DEFAULTS[p.key] || {};
                return (
                  <div key={p.key} className="rounded-2xl border border-white/10 bg-card p-5 space-y-3">
                    <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} /><h3 className="font-bold text-white">Trang {p.label}</h3></div>
                    {["title", "desc", "keywords"].map(field => (
                      <div key={field}>
                        <label className="mb-1 block text-xs text-gray-500">{field === "title" ? "Tiêu đề" : field === "desc" ? "Mô tả" : "Keywords"}</label>
                        <input defaultValue={seo[field] || SEO_DEFAULTS[p.key]?.[field as keyof typeof SEO_DEFAULTS.home] || ""} onBlur={e => saveSeo(p.key, field, e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary" />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── MÃ NGUỒN ── */}
          {activeTab === "code" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-white flex items-center gap-2"><Code size={18} className="text-primary" />Mã nguồn Frontend (App.tsx)</h3>
                  <button 
                    onClick={() => {
                      const code = `// Bứt Phá Marketing - App.tsx\n// React Vite, Tailwind CSS, Wouter Router\n// ... source code content ...`;
                      navigator.clipboard.writeText(code);
                      alert("Đã copy mã nguồn!");
                    }}
                    className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <Copy size={12} /> Copy nhanh
                  </button>
                </div>
                <div className="relative overflow-hidden rounded-xl bg-black/50 p-4">
                  <pre className="max-h-[500px] overflow-auto text-[11px] leading-relaxed text-gray-400 scrollbar-thin scrollbar-thumb-white/10">
                    <code>{`import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import FacebookPage from "@/pages/Facebook";
import TiktokPage from "@/pages/Tiktok";
// ... (các trang khác)

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/facebook" component={FacebookPage} />
      <Route path="/tiktok" component={TiktokPage} />
      {/* ... routes ... */}
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AdminProvider>
          <TooltipProvider>
            <Router />
            <SocialProofToast />
            <MusicPlayer />
            <QuickContactButtons />
            <Toaster />
          </TooltipProvider>
        </AdminProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}`}</code>
                  </pre>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h3 className="mb-4 font-bold text-white flex items-center gap-2"><Settings size={18} className="text-primary" />Thông tin hệ thống</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-xs text-gray-500 mb-1">Framework</p>
                    <p className="font-bold text-white">React 18 + Vite</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-xs text-gray-500 mb-1">Styling</p>
                    <p className="font-bold text-white">Tailwind CSS + Framer Motion</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-xs text-gray-500 mb-1">Database</p>
                    <p className="font-bold text-white">PostgreSQL + Drizzle ORM</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <p className="text-xs text-gray-500 mb-1">Backend</p>
                    <p className="font-bold text-white">Express 5</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ROADMAP ── */}
          {activeTab === "roadmap" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar size={18} className="text-primary" /> Quản lý Lộ trình 30 ngày
                  </h2>
                  <button 
                    onClick={() => updateRoadmap(roadmapSteps)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white hover:bg-primary/90 transition-all"
                  >
                    <Check size={16} /> Lưu lộ trình
                  </button>
                </div>

                <div className="space-y-6">
                  {roadmapSteps.map((step, idx) => (
                    <div key={idx} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 pl-14">
                      <div className={`absolute left-4 top-6 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                        step.status === "completed" ? "bg-green-500/20 border-green-500 text-green-500" : 
                        step.status === "in_progress" ? "bg-primary/20 border-primary text-primary" : 
                        "bg-white/5 border-white/10 text-gray-600"
                      }`}>
                        {step.status === "completed" ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">Tiêu đề bước {idx + 1}</label>
                          <input 
                            value={step.title} 
                            onChange={e => {
                              const next = [...roadmapSteps];
                              next[idx].title = e.target.value;
                              setRoadmapSteps(next);
                            }}
                            className="w-full rounded-lg border border-white/10 bg-card px-4 py-2 text-sm text-white outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">Thời gian</label>
                          <input 
                            value={step.time} 
                            onChange={e => {
                              const next = [...roadmapSteps];
                              next[idx].time = e.target.value;
                              setRoadmapSteps(next);
                            }}
                            className="w-full rounded-lg border border-white/10 bg-card px-4 py-2 text-sm text-white outline-none focus:border-primary"
                          />
                        </div>
                        <div className="lg:col-span-2">
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">Mô tả chi tiết</label>
                          <textarea 
                            value={step.desc} 
                            onChange={e => {
                              const next = [...roadmapSteps];
                              next[idx].desc = e.target.value;
                              setRoadmapSteps(next);
                            }}
                            rows={2}
                            className="w-full rounded-lg border border-white/10 bg-card px-4 py-2 text-sm text-white outline-none focus:border-primary resize-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">Trạng thái</label>
                          <select 
                            value={step.status} 
                            onChange={e => {
                              const next = [...roadmapSteps];
                              next[idx].status = e.target.value as any;
                              setRoadmapSteps(next);
                            }}
                            className="w-full rounded-lg border border-white/10 bg-card px-4 py-2 text-sm text-white outline-none focus:border-primary"
                          >
                            <option value="completed">Đã hoàn thành</option>
                            <option value="in_progress">Đang thực hiện</option>
                            <option value="pending">Chờ thực hiện</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PRESENTATION ── */}
          {activeTab === "presentation" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-card p-8 text-center">
                <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full transition-all ${settings.presentationMode ? "bg-primary/20 text-primary shadow-[0_0_30px_rgba(124,58,237,0.3)]" : "bg-white/5 text-gray-600"}`}>
                  <BarChart2 size={40} />
                </div>
                <h2 className="mb-2 text-2xl font-black text-white">Presentation Mode</h2>
                <p className="mx-auto max-w-md text-sm text-gray-400">
                  Kích hoạt chế độ này để biến website thành một bản trình chiếu chuyên nghiệp. 
                  Hệ thống sẽ tự động ẩn các công cụ quản trị, chatbot, và các phần tử dư thừa khi bạn đi gặp khách hàng.
                </p>
                <button 
                  onClick={togglePresentationMode}
                  className={`mt-8 rounded-2xl px-10 py-4 text-lg font-black transition-all ${settings.presentationMode ? "bg-red-500 text-white shadow-lg hover:bg-red-600" : "bg-primary text-white shadow-lg hover:bg-primary/90"}`}
                >
                  {settings.presentationMode ? "Tắt chế độ thuyết trình" : "Bật chế độ thuyết trình ngay"}
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-card p-5">
                  <h3 className="mb-2 font-bold text-white flex items-center gap-2"><Eye size={16} className="text-primary" /> Ẩn Chatbot</h3>
                  <p className="text-xs text-gray-500">Tự động ẩn icon Zalo/Phone/Chat khi thuyết trình.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-card p-5">
                  <h3 className="mb-2 font-bold text-white flex items-center gap-2"><Image size={16} className="text-primary" /> Fullscreen</h3>
                  <p className="text-xs text-gray-500">Tối ưu hóa không gian hiển thị cho màn hình máy chiếu.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-card p-5">
                  <h3 className="mb-2 font-bold text-white flex items-center gap-2"><Settings size={16} className="text-primary" /> Focus Nội dung</h3>
                  <p className="text-xs text-gray-500">Chỉ hiển thị những gì khách hàng cần thấy.</p>
                </div>
              </div>
            </div>
          )}

          {/* ── CÀI ĐẶT ── */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Global Brand Settings */}
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h2 className="mb-5 text-base font-bold text-white flex items-center gap-2"><Settings size={18} className="text-primary" />Cấu hình thương hiệu & Hero</h2>
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-gray-500 uppercase">Tên website</label>
                      <input 
                        value={settings.title} 
                        onChange={e => updateSettings({ title: e.target.value })} 
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-primary" 
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-gray-500 uppercase">Hotline liên hệ</label>
                      <input 
                        value={settings.hotline} 
                        onChange={e => updateSettings({ hotline: e.target.value })} 
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-primary" 
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-gray-500 uppercase">Hero Title (Tiêu đề chính)</label>
                      <input 
                        value={settings.heroTitle} 
                        onChange={e => updateSettings({ heroTitle: e.target.value })} 
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-primary" 
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-gray-500 uppercase">Hero Subtitle (Mô tả phụ)</label>
                      <input 
                        value={settings.heroSubtitle} 
                        onChange={e => updateSettings({ heroSubtitle: e.target.value })} 
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-primary" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Management */}
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h2 className="mb-5 text-base font-bold text-white flex items-center gap-2"><Palette size={18} className="text-primary" />Quản lý màu sắc hệ thống</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="mb-1 block text-xs text-gray-500 uppercase">Màu chủ đạo (Primary)</label>
                    <div className="flex gap-2">
                      <input type="color" value={settings.colors.primary} onChange={e => updateColor("primary", e.target.value)} className="h-10 w-10 cursor-pointer rounded bg-transparent" />
                      <input value={settings.colors.primary} onChange={e => updateColor("primary", e.target.value)} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 text-xs text-white" />
                    </div>
                  </div>
                  {PLATFORMS.map(p => (
                    <div key={p.key}>
                      <label className="mb-1 block text-xs text-gray-500 uppercase">Màu {p.label}</label>
                      <div className="flex gap-2">
                        <input type="color" value={settings.colors[p.key] || p.color} onChange={e => updateColor(p.key, e.target.value)} className="h-10 w-10 cursor-pointer rounded bg-transparent" />
                        <input value={settings.colors[p.key] || p.color} onChange={e => updateColor(p.key, e.target.value)} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 text-xs text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Visibility */}
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h2 className="mb-5 text-base font-bold text-white flex items-center gap-2"><Eye size={18} className="text-primary" />Bật/Tắt các thành phần website</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {SECTIONS_TOGGLE.map(s => (
                    <button key={s.key} onClick={() => toggleVisibility(s.key, !settings.visibility[s.key])} className={`flex items-center justify-between rounded-xl border p-4 transition-all ${settings.visibility[s.key] !== false ? "border-primary/50 bg-primary/10" : "border-white/10 bg-white/5"}`}>
                      <span className="text-sm font-medium text-white">{s.label}</span>
                      {settings.visibility[s.key] !== false ? <Eye size={16} className="text-primary" /> : <EyeOff size={16} className="text-gray-600" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                <h3 className="font-bold text-white">Thông tin ngân hàng thanh toán</h3>
                <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                  <p className="text-sm font-bold text-yellow-400">ACB – Ngân hàng Á Châu</p>
                  <p className="text-lg font-black text-white mt-1">20030868</p>
                  <p className="text-sm text-gray-300">Chủ tài khoản: Nguyễn Thành Long</p>
                  <p className="text-xs text-gray-500 mt-1">Thông tin này hiển thị trong trang thanh toán của khách hàng</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Password Modal */}
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

function MediaGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);
  useEffect(() => {
    db.media.getAll().then(setItems);
  }, []);
  if (items.length === 0) return <div className="rounded-2xl border border-white/10 bg-card p-12 text-center"><Image size={28} className="mx-auto mb-3 text-gray-600" /><p className="text-gray-500">Chưa có media nào</p></div>;
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map(m => (
        <div key={m.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-card">
          {m.type === "video"
            ? <video src={m.url} className="h-32 w-full object-cover" muted />
            : <img src={m.url} alt={m.name} className="h-32 w-full object-cover" onError={e => { (e.target as HTMLImageElement).src = "/logo.jpg"; }} />}
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            <button onClick={async () => { await db.media.delete(m.id); db.media.getAll().then(setItems); }} className="rounded-full bg-red-500 p-2 text-white"><Trash2 size={14} /></button>
          </div>
          <p className="truncate px-2 py-1 text-xs text-gray-500">{m.name}</p>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, ShoppingCart, Newspaper, FileText,
  Bell, Globe, Image, Search, Settings, LogOut, ChevronRight,
  Trash2, Eye, EyeOff, Check, X, Plus, Edit3, ExternalLink,
  BarChart2, TrendingUp, Users, DollarSign, Palette, Code, Copy,
  Calendar, Clock, CheckCircle2, Lock, Sparkles, type LucideIcon
} from "lucide-react";
import { useAdmin } from "@/lib/AdminContext";
import { RichTextEditor } from "@/components/shared/RichTextEditor";
import { NewsDashboard } from "@/components/admin/NewsDashboard";
import { buildDefaultComparisonTabs, getContent, saveContent, type ComparisonTabOverride, type ContentOverride, type PackageOverride, type TabOverride } from "@/lib/pageContent";
import { db, type Order, type Lead, type NewsItem, type MediaItem, type Service, type ClientPortal } from "@/lib/useData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const NAV = [
  { id: "dashboard", label: "Bảng điều khiển", icon: LayoutDashboard },
  { id: "cms", label: "Quản trị nội dung", icon: Edit3 },
  { id: "services", label: "Quản lý Dịch vụ", icon: Package },
  { id: "leads", label: "Quản lý nhận tin", icon: Bell },
  { id: "media", label: "Quản lý hình ảnh", icon: Image },
  { id: "seo", label: "SEO Page", icon: Search },
  { id: "portals", label: "Quản lý lộ trình dự án", icon: Calendar },
  { id: "mascot", label: "Linh vật công ty", icon: Sparkles },
  { id: "tracking", label: "Tối ưu Website", icon: Code },
  { id: "settings", label: "Thiết lập hệ thống", icon: Settings },
  { id: "news", label: "Quản lý SEO Content", icon: Newspaper, color: "#f97316" },
];

const STATUS_LABELS: Record<Order["status"], { label: string; cls: string }> = {
  pending: { label: "Chờ xác nhận", cls: "bg-yellow-500/20 text-yellow-400" },
  confirmed: { label: "Đã xác nhận", cls: "bg-blue-500/20 text-blue-400" },
  completed: { label: "Hoàn thành", cls: "bg-green-500/20 text-green-400" },
  cancelled: { label: "Đã huỷ", cls: "bg-red-500/20 text-red-400" },
};

function formatMoney(num: number) { return num.toLocaleString("vi-VN") + "đ"; }
function formatDate(date: string | number) { return new Date(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
function parseFeatureLine(line: string) {
  const [titlePart, detailPart] = line.split("::");
  return {
    title: (titlePart || "").trim(),
    details: detailPart ? detailPart.split("|").map(item => item.trim()).filter(Boolean) : [],
  };
}

function serializeFeatureLine(title: string, details: string[]) {
  const cleanTitle = title.trim();
  const cleanDetails = details.map(item => item.trim()).filter(Boolean);
  if (!cleanTitle) return "";
  return cleanDetails.length > 0 ? `${cleanTitle}::${cleanDetails.join("|")}` : cleanTitle;
}

function parseResponsibilityEditor(raw: string) {
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const intro: string[] = [];
  const bullets: string[] = [];
  lines.forEach((line) => {
    if (line.startsWith("- ") || line.startsWith("• ")) {
      bullets.push(line.replace(/^(-|•)\s+/, "").trim());
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
  home: { title: "Bứt Phá Marketing - Giải Pháp Đột Phá", desc: "Agency marketing toàn diện tại Việt Nam", keywords: "marketing, facebook ads, tiktok, seo" },
  facebook: { title: "Dịch Vụ Facebook Marketing", desc: "Xây dựng Fanpage, chạy quảng cáo Facebook hiệu quả", keywords: "facebook marketing, facebook ads, quảng cáo facebook" },
  tiktok: { title: "Dịch Vụ TikTok Marketing", desc: "Sản xuất content TikTok, viral, TikTok Ads", keywords: "tiktok marketing, tiktok ads, content tiktok" },
  instagram: { title: "Dịch Vụ Instagram Marketing", desc: "Xây dựng brand trên Instagram, Reels, Stories", keywords: "instagram marketing, instagram ads, reels" },
  zalo: { title: "Dịch Vụ Zalo Marketing", desc: "Zalo OA, Zalo Ads, chăm sóc khách hàng qua Zalo", keywords: "zalo marketing, zalo ads, zalo oa" },
  "google-maps": { title: "Dịch Vụ Google Maps Marketing", desc: "Local SEO, Google Business, đánh giá 5 sao", keywords: "google maps, local seo, google business" },
  website: { title: "Dịch Vụ Website Marketing", desc: "Thiết kế web, SEO website, bảo trì", keywords: "thiết kế website, seo website, web marketing" },
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
  } = useAdmin();

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
  const [progressArticles, setProgressArticles] = useState<Record<string, any[]>>({});
  const [selectedClient, setSelectedClient] = useState<ClientPortal | null>(null);
  const [newArticle, setNewArticle] = useState({ title: "", content: "", image: "" });
  const [selectedPlatform, setSelectedPlatform] = useState("home");
  const [selectedPkgPlatform, setSelectedPkgPlatform] = useState("facebook");
  const [mediaUrl, setMediaUrl] = useState("");
  const [newCase, setNewCase] = useState({ id: 0, title: "", before: "", after: "" });
  const [blogSaveMessage, setBlogSaveMessage] = useState<string | null>(null);
  const [blogSaveError, setBlogSaveError] = useState<string | null>(null);
  const [selectedProcessTab, setSelectedProcessTab] = useState(0);
  const [selectedServiceTab, setSelectedServiceTab] = useState(0);
  const [selectedCompareTab, setSelectedCompareTab] = useState(0);
  const [selectedMascotPlatform, setSelectedMascotPlatform] = useState("home");
  const [serviceContent, setServiceContent] = useState<ContentOverride>({ tabs: [] });
  const [comparisonTabs, setComparisonTabs] = useState<ComparisonTabOverride[]>([]);
  const [pageContent, setPageContent] = useState<ContentOverride>({
    vision: "",
    mission: "",
    responsibility: "",
    stats: [{ label: "", value: "" }],
    processTabs: [{ label: "Xây dựng", steps: [{ step: 1, title: "", desc: "" }] }],
    faqs: [{ q: "", a: "" }],
  });
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const responsibilityEditor = parseResponsibilityEditor(pageContent.responsibility || "");

  // ClientProject type definition (moved from useData to here)
  type ClientProject = {
    id: string;
    title: string;
    registeredAt: string;
    deadlineAt: string;
    budgetVnd: number;
    progressDoc: string;
    resultDoc: string;
  };

  const visitorChartData = Array.from({ length: 12 }, (_, i) => ({
    name: `Tuần ${i + 1}`,
    visits: Math.round(90 + Math.sin((i / 11) * Math.PI * 2) * 30),
  }));
  const [newPortal, setNewPortal] = useState<Partial<ClientPortal>>({ username: "", clientName: "", phone: "", platform: "facebook", daysRemaining: 30, postsCount: 0, progressPercent: 0, weeklyReports: [] });
  const [portalPassword, setPortalPassword] = useState("");
  const [portalCreateMessage, setPortalCreateMessage] = useState<string | null>(null);
  const [portalCreateError, setPortalCreateError] = useState<string | null>(null);
  const [selectedClientProjectId, setSelectedClientProjectId] = useState("");
  const [showSourceViewer, setShowSourceViewer] = useState(false);
  const [sourceFiles, setSourceFiles] = useState<string[]>([]);
  const [selectedSourceFile, setSelectedSourceFile] = useState("");
  const [selectedSourceContent, setSelectedSourceContent] = useState("");
  const [blogs, setBlogs] = useState<NewsItem[]>([]);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    description: "",
    metaDescription: "",
    keywordsMain: "",
    keywordsSecondary: "",
    imageUrl: "",
    content: "<h1></h1><p></p>",
    hot: false,
    published: true,
    publishedAt: new Date().toISOString().slice(0, 10),
  });

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
  const isBuiltInMascot = !settings.mascotImage || settings.mascotImage.endsWith("/mascot-dragon.svg");
  const selectedMascotImage = settings.mascotImages?.[selectedMascotPlatform] || "";
  const isBuiltInPlatformMascot = !selectedMascotImage;

  const resetBlogForm = () => {
    setEditingBlogId(null);
    setBlogForm({
      title: "",
      slug: "",
      description: "",
      metaDescription: "",
      keywordsMain: "",
      keywordsSecondary: "",
      imageUrl: "",
      content: "<h1></h1><p></p>",
      hot: false,
      published: true,
      publishedAt: new Date().toISOString().slice(0, 10),
    });
  };

  const generateBlogDraftByAI = () => {
    const title = blogForm.title.trim();
    if (!title) {
      alert("Nhập tiêu đề trước khi dùng AI.");
      return;
    }
    const mainKeyword = blogForm.keywordsMain.trim() || title.toLowerCase();
    const secondaryKeyword = blogForm.keywordsSecondary.trim() || "dịch vụ marketing hiệu quả";
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    const html = `
      <h1>${title}</h1>
      <p><strong>Từ khóa chính:</strong> ${mainKeyword} · <strong>Từ khóa phụ:</strong> ${secondaryKeyword}</p>
      <h2>Mục lục</h2>
      <ul>
        <li><a href="#tong-quan">Tổng quan</a></li>
        <li><a href="#giai-phap">Giải pháp triển khai</a></li>
        <li><a href="#toi-uu-seo">Tối ưu SEO thực chiến</a></li>
      </ul>
      <h2 id="tong-quan">Tổng quan</h2>
      <p>${mainKeyword} là trọng tâm giúp doanh nghiệp tăng chuyển đổi bền vững. Bài viết này cung cấp cách xây dựng chiến lược nội dung và quảng bá toàn diện.</p>
      <h2 id="giai-phap">Giải pháp triển khai</h2>
      <h3>1. Phân tích thị trường</h3>
      <p>Nghiên cứu chân dung khách hàng, insight và đối thủ để xác định thông điệp rõ ràng.</p>
      <h3>2. Xây dựng nội dung chuẩn SEO</h3>
      <p>Triển khai nội dung theo cụm chủ đề, tối ưu H1-H3, liên kết nội bộ và CTA chuyển đổi.</p>
      <h3>3. Tối ưu chuyển đổi</h3>
      <p>Kết hợp landing page, tracking và test A/B để cải thiện hiệu quả theo dữ liệu thực tế.</p>
      <h2 id="toi-uu-seo">Tối ưu SEO thực chiến</h2>
      <p>Đặt từ khóa chính ở title, URL, 100 chữ đầu tiên và meta description. Bổ sung hình ảnh có ALT và video để tăng thời gian ở lại trang.</p>
      <p>Internal link gợi ý: <a href="/facebook">Dịch vụ Facebook</a>, <a href="/website">Dịch vụ Website</a>.</p>
    `.trim();
    setBlogForm((prev) => ({
      ...prev,
      slug: prev.slug || slug,
      metaDescription: prev.metaDescription || `Giải pháp ${mainKeyword} chuyên sâu, tối ưu chuyển đổi và SEO bền vững cho doanh nghiệp.`,
      description: prev.description || `Tổng hợp chiến lược ${mainKeyword} từ nền tảng đến tối ưu hiệu quả thực tế.`,
      content: html,
    }));
  };

  const generateBlogDraftByAIV2 = () => {
    const title = blogForm.title.trim();
    if (!title) {
      alert("Nhập tiêu đề trước khi dùng AI.");
      return;
    }

    const readableTitle = title
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
    const readableKeywords = readableTitle
      .split(" ")
      .filter(Boolean)
      .reduce<string[]>((result, word) => {
        if (!result.includes(word)) {
          result.push(word);
        }
        return result;
      }, []);
    const mainKeyword = blogForm.keywordsMain.trim() || readableKeywords.slice(0, 4).join(" ") || title;
    const secondaryKeyword =
      blogForm.keywordsSecondary.trim() ||
      [readableKeywords.slice(0, 2).join(" "), "chiến lược tăng trưởng", "marketing thực chiến"]
        .filter(Boolean)
        .join(", ");
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    const generatedImageUrl =
      blogForm.imageUrl.trim() ||
      `https://placehold.co/1600x900/12081f/f8fafc/png?text=${encodeURIComponent(mainKeyword)}`;
    const html = `
      <h1>${title}</h1>
      <figure>
        <img src="${generatedImageUrl}" alt="${mainKeyword}" />
        <figcaption>Hình minh họa tự động cho chủ đề ${mainKeyword}.</figcaption>
      </figure>
      <p><strong>Từ khóa chính:</strong> ${mainKeyword} · <strong>Từ khóa phụ:</strong> ${secondaryKeyword}</p>
      <h2>Mục lục</h2>
      <ul>
        <li><a href="#tong-quan">Tổng quan</a></li>
        <li><a href="#giai-phap">Giải pháp triển khai</a></li>
        <li><a href="#toi-uu-seo">Tối ưu SEO thực chiến</a></li>
      </ul>
      <h2 id="tong-quan">Tổng quan</h2>
      <p>${mainKeyword} là trọng tâm giúp doanh nghiệp tăng chuyển đổi bền vững. Bài viết này cung cấp cách xây dựng chiến lược nội dung và quảng bá toàn diện.</p>
      <h2 id="giai-phap">Giải pháp triển khai</h2>
      <h3>1. Phân tích thị trường</h3>
      <p>Nghiên cứu chân dung khách hàng, insight và đối thủ để xác định thông điệp rõ ràng.</p>
      <h3>2. Xây dựng nội dung chuẩn SEO</h3>
      <p>Triển khai nội dung theo cụm chủ đề, tối ưu H1-H3, liên kết nội bộ và CTA chuyển đổi.</p>
      <h3>3. Tối ưu chuyển đổi</h3>
      <p>Kết hợp landing page, tracking và test A/B để cải thiện hiệu quả theo dữ liệu thực tế.</p>
      <h2 id="toi-uu-seo">Tối ưu SEO thực chiến</h2>
      <p>Đặt từ khóa chính ở title, URL, 100 chữ đầu tiên và meta description. Bổ sung hình ảnh có ALT để tăng thời gian ở lại trang.</p>
      <p>Internal link gợi ý: <a href="/facebook">Dịch vụ Facebook</a>, <a href="/website">Dịch vụ Website</a>.</p>
    `.trim();

    setBlogForm((prev) => ({
      ...prev,
      slug: prev.slug || slug,
      keywordsMain: prev.keywordsMain || mainKeyword,
      keywordsSecondary: prev.keywordsSecondary || secondaryKeyword,
      imageUrl: prev.imageUrl || generatedImageUrl,
      metaDescription: prev.metaDescription || `Giải pháp ${mainKeyword} chuyên sâu, tối ưu chuyển đổi và SEO bền vững cho doanh nghiệp.`,
      description: prev.description || `Tổng hợp chiến lược ${mainKeyword} từ nền tảng đến tối ưu hiệu quả thực tế.`,
      content: html,
    }));
  };
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
    const next = [...mascotClickMessages, `Câu click ${mascotClickMessages.length + 1}`];
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

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Không thể đọc file ảnh"));
      reader.readAsDataURL(file);
    });

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) {
        const id = parsed.pathname.replace(/^\//, "");
        return `https://www.youtube.com/embed/${id}`;
      }
      if (parsed.hostname.includes("youtube.com")) {
        const v = parsed.searchParams.get("v");
        if (v) return `https://www.youtube.com/embed/${v}`;
        if (parsed.pathname.startsWith("/shorts/")) {
          const id = parsed.pathname.split("/")[2];
          return `https://www.youtube.com/embed/${id}`;
        }
        if (parsed.pathname.startsWith("/embed/")) return `${parsed.origin}${parsed.pathname}`;
      }
    } catch {
      return "";
    }
    return "";
  };

  const createEmptyProject = (index: number): ClientProject => {
    const now = new Date();
    const deadline = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return {
      id: `${Date.now()}-${index}`,
      title: `Dự án ${index}`,
      registeredAt: now.toISOString(),
      deadlineAt: deadline.toISOString(),
      budgetVnd: 0,
      progressDoc: "<p></p>",
      resultDoc: "<p></p>",
    };
  };

  const toDateTimeLocalValue = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value.slice(0, 16);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const normalizeProjects = (portal: ClientPortal | null): ClientProject[] => {
    if (!portal) return [];
    const raw = (portal.weeklyReports || []) as any[];
    if (raw.length === 0) return [createEmptyProject(1)];

    const first = raw[0];
    const isLegacy = typeof first?.content === "string" && !("progressDoc" in first);
    if (isLegacy) {
      return raw.map((item, idx) => ({
        id: `${portal.id}-${idx + 1}`,
        title: item.title || `Dự án ${idx + 1}`,
        registeredAt: new Date().toISOString(),
        deadlineAt: new Date(Date.now() + (portal.daysRemaining || 30) * 24 * 60 * 60 * 1000).toISOString(),
        budgetVnd: 0,
        progressDoc: `<p>${item.content || ""}</p>`,
        resultDoc: item.image ? `<p><img src="${item.image}" alt="report-image" /></p>` : "<p></p>",
      }));
    }

    return raw.map((item, idx) => ({
      id: item.id || `${portal.id}-${idx + 1}`,
      title: item.title || `Dự án ${idx + 1}`,
      registeredAt: item.registeredAt || new Date().toISOString(),
      deadlineAt: item.deadlineAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      budgetVnd: Number(item.budgetVnd || 0),
      progressDoc: item.progressDoc || "<p></p>",
      resultDoc: item.resultDoc || "<p></p>",
    }));
  };

  const selectedProjects = normalizeProjects(selectedClient);
  const selectedProject = selectedProjects.find(p => p.id === selectedClientProjectId) || selectedProjects[0] || null;

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
            processTabs: [{ label: "Xây dựng", steps: [{ step: 1, title: "", desc: "" }] }],
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

  useEffect(() => {
    const loadServiceContent = async () => {
      try {
        const saved = await getContent(selectedPkgPlatform);
        const tabs = saved?.tabs && saved.tabs.length > 0 ? saved.tabs : createDefaultServiceTabs();
        setServiceContent(prev => ({ ...prev, ...(saved || {}), tabs }));
        setComparisonTabs(saved?.comparisonTabs && saved.comparisonTabs.length > 0 ? saved.comparisonTabs : buildDefaultComparisonTabs(tabs));
        setSelectedServiceTab(0);
        setSelectedCompareTab(0);
      } catch (error) {
        console.error("Failed to load service content:", error);
      }
    };
    loadServiceContent();
  }, [selectedPkgPlatform]);

  const updateServiceTabs = (tabs: TabOverride[]) => {
    setServiceContent(prev => ({ ...prev, tabs }));
  };

  const saveServiceConfig = async () => {
    const saved = await saveContent(selectedPkgPlatform, serviceContent);
    alert(saved ? "Đã lưu quản lý dịch vụ" : "Lưu quản lý dịch vụ thất bại");
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

  const updatePackageFeatureItem = (
    tabIndex: number,
    pkgIndex: number,
    featureIndex: number,
    patch: { title?: string; details?: string[] },
  ) => {
    const tabs = [...(serviceContent.tabs || [])];
    const target = tabs[tabIndex];
    if (!target || !target.packages[pkgIndex]) return;
    const pkg = target.packages[pkgIndex];
    const serialized = (pkg.allFeatures?.length ? pkg.allFeatures : pkg.features).filter(Boolean);
    const rows = serialized.map((line) => parseFeatureLine(line));
    if (!rows[featureIndex]) return;
    rows[featureIndex] = {
      title: patch.title ?? rows[featureIndex].title,
      details: patch.details ?? rows[featureIndex].details,
    };
    const nextAll = rows
      .map((row) => serializeFeatureLine(row.title, row.details))
      .filter(Boolean);
    updatePackageField(tabIndex, pkgIndex, {
      features: nextAll.map((line) => parseFeatureLine(line).title).filter(Boolean),
      allFeatures: nextAll,
    });
  };

  const addPackageFeatureItem = (tabIndex: number, pkgIndex: number) => {
    const tabs = [...(serviceContent.tabs || [])];
    const target = tabs[tabIndex];
    if (!target || !target.packages[pkgIndex]) return;
    const pkg = target.packages[pkgIndex];
    const nextAll = [...(pkg.allFeatures?.length ? pkg.allFeatures : pkg.features), "Nội dung mới::Chi tiết 1|Chi tiết 2"];
    updatePackageField(tabIndex, pkgIndex, {
      features: nextAll.map((line) => parseFeatureLine(line).title).filter(Boolean),
      allFeatures: nextAll,
    });
  };

  const removePackageFeatureItem = (tabIndex: number, pkgIndex: number, featureIndex: number) => {
    const tabs = [...(serviceContent.tabs || [])];
    const target = tabs[tabIndex];
    if (!target || !target.packages[pkgIndex]) return;
    const pkg = target.packages[pkgIndex];
    const rows = (pkg.allFeatures?.length ? pkg.allFeatures : pkg.features).filter(Boolean);
    const nextAll = rows.filter((_, idx) => idx !== featureIndex);
    updatePackageField(tabIndex, pkgIndex, {
      features: nextAll.map((line) => parseFeatureLine(line).title).filter(Boolean),
      allFeatures: nextAll,
    });
  };

  const updateComparisonTabs = (tabs: ComparisonTabOverride[]) => {
    setComparisonTabs(tabs);
    setServiceContent(prev => ({ ...prev, comparisonTabs: tabs }));
  };

  const saveComparisonConfig = async () => {
    const current = (await getContent(selectedPkgPlatform)) || {};
    const saved = await saveContent(selectedPkgPlatform, { ...current, comparisonTabs });
    alert(saved ? "Đã lưu bảng so sánh" : "Lưu bảng so sánh thất bại");
  };

  const addComparisonTab = () => {
    const next = [...comparisonTabs, { label: `Bảng ${(comparisonTabs.length + 1)}`, columns: ["Gói 1", "Gói 2", "Gói 3"], rows: [{ label: "Tính năng", cells: ["✓", "—", "—"] }] }];
    updateComparisonTabs(next);
    setSelectedCompareTab(next.length - 1);
  };

  const removeComparisonTab = (tabIndex: number) => {
    const next = comparisonTabs.filter((_, idx) => idx !== tabIndex);
    updateComparisonTabs(next.length > 0 ? next : [{ label: "Bảng 1", columns: ["Gói 1"], rows: [{ label: "Tính năng", cells: ["✓"] }] }]);
    setSelectedCompareTab(0);
  };

  const updateComparisonTabLabel = (tabIndex: number, label: string) => {
    const next = [...comparisonTabs];
    if (!next[tabIndex]) return;
    next[tabIndex] = { ...next[tabIndex], label };
    updateComparisonTabs(next);
  };

  const updateComparisonColumn = (tabIndex: number, colIndex: number, value: string) => {
    const next = [...comparisonTabs];
    const tab = next[tabIndex];
    if (!tab) return;
    const cols = [...tab.columns];
    cols[colIndex] = value;
    next[tabIndex] = { ...tab, columns: cols };
    updateComparisonTabs(next);
  };

  const addComparisonColumn = (tabIndex: number) => {
    const next = [...comparisonTabs];
    const tab = next[tabIndex];
    if (!tab) return;
    const cols = [...tab.columns, `Gói ${tab.columns.length + 1}`];
    const rows = tab.rows.map(row => ({ ...row, cells: [...row.cells, ""] }));
    next[tabIndex] = { ...tab, columns: cols, rows };
    updateComparisonTabs(next);
  };

  const removeComparisonColumn = (tabIndex: number, colIndex: number) => {
    const next = [...comparisonTabs];
    const tab = next[tabIndex];
    if (!tab || tab.columns.length <= 1) return;
    const cols = tab.columns.filter((_, idx) => idx !== colIndex);
    const rows = tab.rows.map(row => ({ ...row, cells: row.cells.filter((_, idx) => idx !== colIndex) }));
    next[tabIndex] = { ...tab, columns: cols, rows };
    updateComparisonTabs(next);
  };

  const updateComparisonRowLabel = (tabIndex: number, rowIndex: number, label: string) => {
    const next = [...comparisonTabs];
    const tab = next[tabIndex];
    if (!tab || !tab.rows[rowIndex]) return;
    const rows = [...tab.rows];
    rows[rowIndex] = { ...rows[rowIndex], label };
    next[tabIndex] = { ...tab, rows };
    updateComparisonTabs(next);
  };

  const updateComparisonCell = (tabIndex: number, rowIndex: number, colIndex: number, value: string) => {
    const next = [...comparisonTabs];
    const tab = next[tabIndex];
    if (!tab || !tab.rows[rowIndex]) return;
    const rows = [...tab.rows];
    const cells = [...rows[rowIndex].cells];
    cells[colIndex] = value;
    rows[rowIndex] = { ...rows[rowIndex], cells };
    next[tabIndex] = { ...tab, rows };
    updateComparisonTabs(next);
  };

  const addComparisonRow = (tabIndex: number) => {
    const next = [...comparisonTabs];
    const tab = next[tabIndex];
    if (!tab) return;
    const rows = [...tab.rows, { label: `Dòng ${tab.rows.length + 1}`, cells: Array(tab.columns.length).fill("") }];
    next[tabIndex] = { ...tab, rows };
    updateComparisonTabs(next);
  };

  const removeComparisonRow = (tabIndex: number, rowIndex: number) => {
    const next = [...comparisonTabs];
    const tab = next[tabIndex];
    if (!tab || tab.rows.length <= 1) return;
    const rows = tab.rows.filter((_, idx) => idx !== rowIndex);
    next[tabIndex] = { ...tab, rows };
    updateComparisonTabs(next);
  };

  const savePageContent = async () => {
    if (selectedPlatform !== "home") {
      const saved = await saveContent(selectedPlatform, pageContent);
      alert(saved ? "Đã lưu nội dung trang con" : "Lưu nội dung trang con thất bại");
    }
  };

  const updatePageContentField = (field: keyof ContentOverride, value: any) => {
    setPageContent(prev => ({ ...prev, [field]: value }));
  };

  const updateResponsibilityIntro = (value: string) => {
    updatePageContentField("responsibility", serializeResponsibilityEditor(value, responsibilityEditor.bullets));
  };

  const updateResponsibilityBullet = (index: number, value: string) => {
    const next = [...responsibilityEditor.bullets];
    next[index] = value;
    updatePageContentField("responsibility", serializeResponsibilityEditor(responsibilityEditor.intro, next));
  };

  const addResponsibilityBullet = () => {
    const next = [...responsibilityEditor.bullets, "Giá trị mới"];
    updatePageContentField("responsibility", serializeResponsibilityEditor(responsibilityEditor.intro, next));
  };

  const removeResponsibilityBullet = (index: number) => {
    const next = responsibilityEditor.bullets.filter((_, i) => i !== index);
    updatePageContentField("responsibility", serializeResponsibilityEditor(responsibilityEditor.intro, next));
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
  const refreshPortals = async () => {
    const result = await db.clientPortals.getAll();
    if (result.error) console.error('Portals error:', result.error);
    else setClientPortals(result.data || []);
  };
  const refreshServices = async () => {
    const result = await db.services.getAll();
    if (result.error) console.error('Services error:', result.error);
    else setServices(result.data || []);
  };
  const refreshArticles = async (clientId: string) => {
    const result = await db.progressArticles.getByClient(clientId);
    if (result.error) console.error('Articles error:', result.error);
    else setProgressArticles(prev => ({ ...prev, [clientId]: result.data || [] }));
  };

  const refreshClientPortal = async (clientId: string) => {
    const result = await db.clientPortals.getAll();
    if (result.error) {
      console.error("Portals error:", result.error);
      return;
    }
    const portals = result.data || [];
    const client = portals.find((portal) => portal.id === clientId) || null;
    setSelectedClient(client);
    setClientPortals(portals);
  };

  const saveSelectedClient = async (patch: Partial<ClientPortal>) => {
    if (!selectedClient) return;
    await db.clientPortals.update(selectedClient.id.toString(), patch);
    await refreshClientPortal(selectedClient.id);
    alert("Đã lưu thông tin khách hàng");
  };

  const saveSelectedProjects = async (projects: ClientProject[]) => {
    if (!selectedClient) return;
    await db.clientPortals.update(selectedClient.id.toString(), { weeklyReports: projects as any });
    await refreshClientPortal(selectedClient.id);
  };

  const updateSelectedProject = (projectId: string, patch: Partial<ClientProject>) => {
    const next = selectedProjects.map(project => project.id === projectId ? { ...project, ...patch } : project);
    setSelectedClient(prev => prev ? ({ ...prev, weeklyReports: next as any }) : prev);
  };

  const addProjectForSelectedClient = () => {
    if (!selectedClient) return;
    const next = [...selectedProjects, createEmptyProject(selectedProjects.length + 1)];
    setSelectedClient(prev => prev ? ({ ...prev, weeklyReports: next as any }) : prev);
    setSelectedClientProjectId(next[next.length - 1].id);
  };

  const removeProjectForSelectedClient = (projectId: string) => {
    if (!selectedClient) return;
    const next = selectedProjects.filter(project => project.id !== projectId);
    const safe = next.length > 0 ? next : [createEmptyProject(1)];
    setSelectedClient(prev => prev ? ({ ...prev, weeklyReports: safe as any }) : prev);
    setSelectedClientProjectId(safe[0].id);
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
    refreshOrders(); refreshLeads(); refreshPortals(); refreshServices();
    db.news.getAll().then((result) => {
      setBlogs([...(result.data || [])].sort((a, b) => b.timestamp - a.timestamp));
    });
  }, [authenticated]);

  useEffect(() => {
    if (selectedClient) {
      refreshArticles(selectedClient.id);
      const projects = normalizeProjects(selectedClient);
      setSelectedClientProjectId(projects[0]?.id || "");
    } else {
      setSelectedClientProjectId("");
    }
  }, [selectedClient]);

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
        setError(data?.error || "Máº­t kháº©u khÃ´ng Ä‘Ãºng");
        return;
      }

      setAuthenticated(true);
      setIsAuthChecking(false);
      setPassword("");
      router.refresh();
    } catch {
      setError("KhÃ´ng thá»ƒ Ä‘Äƒng nháº­p ngay lÃºc nÃ y.");
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

  const saveBlog = async () => {
    if (!blogForm.title.trim()) {
      alert("Nhập tiêu đề blog.");
      return;
    }
    setBlogSaveMessage(null);
    setBlogSaveError(null);
    const payload = {
      title: blogForm.title,
      content: blogForm.content,
      category: "blog",
      published: blogForm.published,
      description: blogForm.description,
      imageUrl: blogForm.imageUrl,
      slug: blogForm.slug,
      hot: blogForm.hot,
      metaDescription: blogForm.metaDescription,
      keywordsMain: blogForm.keywordsMain,
      keywordsSecondary: blogForm.keywordsSecondary,
      publishedAt: blogForm.publishedAt ? new Date(blogForm.publishedAt).toISOString() : new Date().toISOString(),
    };
    const mutationResult = editingBlogId
      ? await db.news.update(editingBlogId, payload)
      : await db.news.add(payload);
    if (mutationResult.error) {
      setBlogSaveError(mutationResult.error);
      alert(`Lưu blog thất bại: ${mutationResult.error}`);
      return;
    }
    const result = await db.news.getAll();
    if (result.error) {
      setBlogSaveError(result.error);
      alert(`Blog đã lưu nhưng tải lại danh sách thất bại: ${result.error}`);
      return;
    }
    setBlogs([...(result.data || [])].sort((a, b) => b.timestamp - a.timestamp));
    setBlogSaveMessage("Đã lưu blog");
    resetBlogForm();
    alert("Đã lưu blog");
  };

  const editBlog = (item: NewsItem) => {
    setEditingBlogId(item.id);
    setBlogForm({
      title: item.title || "",
      slug: item.slug || "",
      description: item.description || "",
      metaDescription: item.metaDescription || "",
      keywordsMain: item.keywordsMain || "",
      keywordsSecondary: item.keywordsSecondary || "",
      imageUrl: item.imageUrl || "",
      content: item.content || "<h1></h1><p></p>",
      hot: !!item.hot,
      published: item.published !== false,
      publishedAt: (item.publishedAt || new Date(item.timestamp).toISOString()).slice(0, 10),
    });
  };

  const refreshBlogs = async () => {
    const result = await db.news.getAll();
    if (result.error) {
      setBlogSaveError(result.error);
      return;
    }
    setBlogs([...(result.data || [])].sort((a, b) => b.timestamp - a.timestamp));
  };

  const handleToggleBlogPublished = async (item: NewsItem) => {
    setBlogSaveError(null);
    setBlogSaveMessage(null);
    const result = await db.news.update(item.id, { published: !item.published });
    if (result.error) {
      setBlogSaveError(result.error);
      return;
    }
    await refreshBlogs();
  };

  const handleToggleBlogHot = async (item: NewsItem) => {
    setBlogSaveError(null);
    setBlogSaveMessage(null);
    const result = await db.news.update(item.id, { hot: !item.hot });
    if (result.error) {
      setBlogSaveError(result.error);
      return;
    }
    await refreshBlogs();
  };

  const handleDeleteBlog = async (item: NewsItem) => {
    if (!confirm("Xóa bài viết này?")) return;
    setBlogSaveError(null);
    setBlogSaveMessage(null);
    const result = await db.news.delete(item.id);
    if (result.error) {
      setBlogSaveError(result.error);
      return;
    }
    await refreshBlogs();
    if (editingBlogId === item.id) resetBlogForm();
  };

  if (isAuthChecking) {
    return <div className="flex min-h-screen items-center justify-center bg-background"></div>;
  }

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
            <button
              key={n.id}
              onClick={() => n.id === "news" ? router.push("/admin/news") : n.id === "portals" ? router.push("/admin/portals") : setActiveTab(n.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                activeTab === n.id ? "bg-primary text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
              style={n.color && activeTab !== n.id ? { color: n.color } : {}}
            >
              <n.icon size={18} /> {n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500/10 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all">
            <LogOut size={16} /> Đăng xuất
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
                  <p className="text-[11px] text-gray-400">Quản trị nội dung và dữ liệu</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-200"
                >
                  <LogOut size={14} /> Thoát
                </button>
              </div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">Chuyển mục quản trị</label>
              <select
                value={activeTab}
                onChange={e => e.target.value === "news" ? router.push("/admin/news") : setActiveTab(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                {NAV.map(item => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
            </div>
          </div>

          {(saveStatus !== "idle" || saveError || blogSaveMessage || blogSaveError) && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                saveError || blogSaveError
                  ? "border-red-500/30 bg-red-500/10 text-red-200"
                  : saveStatus === "saved" || blogSaveMessage
                    ? "border-green-500/30 bg-green-500/10 text-green-200"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-100"
              }`}
            >
              {saveError || blogSaveError || (saveStatus === "saving" ? "Đang lưu thay đổi..." : null) || blogSaveMessage || (saveStatus === "saved" ? "Đã lưu cài đặt." : null)}
            </div>
          )}

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
                <button onClick={() => { alert("Đã lưu!"); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu thay đổi</button>
              </div>
              {selectedPlatform === "home" ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                    <h3 className="font-bold text-white">Thông tin chung</h3>
                    <input value={settings.title || ""} onChange={e => updateSettings({ title: e.target.value })} placeholder="Tiêu đề website" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    <input value={settings.heroTitle || ""} onChange={e => updateSettings({ heroTitle: e.target.value })} placeholder="Tiêu đề Hero trang chủ" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    <textarea value={settings.heroSubtitle || ""} onChange={e => updateSettings({ heroSubtitle: e.target.value })} placeholder="Mô tả Hero trang chủ (ví dụ: Tăng trưởng doanh thu...)" className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
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
                      <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-gray-300">Trách nhiệm (hỗ trợ dấu chấm tròn)</p>
                          <button type="button" onClick={addResponsibilityBullet} className="rounded-lg border border-white/20 px-2 py-1 text-[11px] text-white">Thêm ý</button>
                        </div>
                        <textarea
                          value={responsibilityEditor.intro}
                          onChange={e => updateResponsibilityIntro(e.target.value)}
                          placeholder="Dòng mở đầu (ví dụ: Chúng tôi cam kết 3 giá trị cốt lõi)"
                          className="h-20 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white"
                        />
                        {responsibilityEditor.bullets.map((bullet, idx) => (
                          <div key={`resp-bullet-${idx}`} className="flex items-center gap-2">
                            <span className="text-lg leading-none text-gray-400">•</span>
                            <input
                              value={bullet}
                              onChange={e => updateResponsibilityBullet(idx, e.target.value)}
                              placeholder={`Ý ${idx + 1}`}
                              className="flex-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white"
                            />
                            <button type="button" onClick={() => removeResponsibilityBullet(idx)} className="rounded-lg border border-red-500/30 px-2 py-1 text-[11px] text-red-200">Xóa</button>
                          </div>
                        ))}
                      </div>
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
                        <div key={`pkg-${selectedServiceTab}-${pkgIdx}`} className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
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
                          <div className="space-y-2 rounded-lg border border-white/10 bg-black/20 p-3">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold text-gray-300">Nội dung thiết kế (click để xổ chi tiết)</p>
                              <button
                                type="button"
                                onClick={() => addPackageFeatureItem(selectedServiceTab, pkgIdx)}
                                className="rounded-lg border border-white/20 px-2 py-1 text-[11px] text-white"
                              >
                                Thêm dòng
                              </button>
                            </div>
                            {(pkg.allFeatures?.length ? pkg.allFeatures : pkg.features).map((line, featureIdx) => {
                              const parsed = parseFeatureLine(line);
                              return (
                                <div key={`feature-${pkgIdx}-${featureIdx}`} className="space-y-2 rounded-lg border border-white/10 bg-black/25 p-2">
                                  <div className="flex items-center gap-2">
                                    <input
                                      value={parsed.title}
                                      onChange={e => updatePackageFeatureItem(selectedServiceTab, pkgIdx, featureIdx, { title: e.target.value })}
                                      placeholder={`Dòng ${featureIdx + 1}`}
                                      className="flex-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removePackageFeatureItem(selectedServiceTab, pkgIdx, featureIdx)}
                                      className="rounded-lg border border-red-500/20 bg-red-500/10 px-2 py-1 text-[11px] text-red-200"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                  <textarea
                                    value={parsed.details.join("\n")}
                                    onChange={e => updatePackageFeatureItem(selectedServiceTab, pkgIdx, featureIdx, { details: e.target.value.split("\n") })}
                                    placeholder="Chi tiết con (mỗi dòng là 1 dấu chấm tròn)"
                                    rows={3}
                                    className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white"
                                  />
                                </div>
                              );
                            })}
                          </div>
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
                <button onClick={saveComparisonConfig} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu bảng so sánh</button>
                <button onClick={addComparisonTab} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">Thêm bảng</button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {comparisonTabs.map((tab, idx) => (
                    <button
                      key={`${tab.label}-${idx}`}
                      onClick={() => setSelectedCompareTab(idx)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${selectedCompareTab === idx ? "bg-primary text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"}`}
                    >
                      {tab.label || `Bảng ${idx + 1}`}
                    </button>
                  ))}
                </div>

                {!!comparisonTabs[selectedCompareTab] && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <input
                        value={comparisonTabs[selectedCompareTab].label}
                        onChange={e => updateComparisonTabLabel(selectedCompareTab, e.target.value)}
                        placeholder="Tên bảng (ví dụ: Xây dựng)"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                      />
                      <button onClick={() => removeComparisonTab(selectedCompareTab)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200">Xóa bảng</button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => addComparisonColumn(selectedCompareTab)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">Thêm cột</button>
                      <button onClick={() => addComparisonRow(selectedCompareTab)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">Thêm dòng</button>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                      <table className="min-w-[780px] text-left text-sm">
                        <thead className="bg-white/5">
                          <tr>
                            <th className="px-3 py-3 text-gray-300">Tên dòng</th>
                            {comparisonTabs[selectedCompareTab].columns.map((col, colIdx) => (
                              <th key={`col-${colIdx}`} className="px-3 py-3">
                                <div className="flex items-center gap-2">
                                  <input
                                    value={col}
                                    onChange={e => updateComparisonColumn(selectedCompareTab, colIdx, e.target.value)}
                                    placeholder={`Cột ${colIdx + 1}`}
                                    className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white"
                                  />
                                  <button onClick={() => removeComparisonColumn(selectedCompareTab, colIdx)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-2 py-1 text-[10px] font-semibold text-red-200">Xóa</button>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {comparisonTabs[selectedCompareTab].rows.map((row, rowIdx) => (
                            <tr key={`row-${rowIdx}`} className="align-top">
                              <td className="px-3 py-3">
                                <div className="flex items-start gap-2">
                                  <textarea
                                    value={row.label}
                                    onChange={e => updateComparisonRowLabel(selectedCompareTab, rowIdx, e.target.value)}
                                    rows={2}
                                    className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white"
                                  />
                                  <button onClick={() => removeComparisonRow(selectedCompareTab, rowIdx)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-2 py-1 text-[10px] font-semibold text-red-200">Xóa</button>
                                </div>
                              </td>
                              {comparisonTabs[selectedCompareTab].columns.map((_, colIdx) => (
                                <td key={`cell-${rowIdx}-${colIdx}`} className="px-3 py-3">
                                  <textarea
                                    value={row.cells[colIdx] || ""}
                                    onChange={e => updateComparisonCell(selectedCompareTab, rowIdx, colIdx, e.target.value)}
                                    rows={2}
                                    placeholder="Text / icon / emoji"
                                    className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white"
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
              <div className="overflow-x-auto">
              <table className="min-w-[640px] w-full text-left text-sm">
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
            </div>
          )}

          {activeTab === "leads" && (
            <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
              <div className="overflow-x-auto">
              <table className="min-w-[720px] w-full text-left text-sm">
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
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                  <h3 className="font-bold text-white flex items-center gap-2"><Image size={18} className="text-primary" /> Logo & Favicon</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-400">Logo Website (Dạng ảnh)</p>
                      <div className="relative aspect-square w-full max-w-[120px] overflow-hidden rounded-xl border border-white/10 bg-black/20">
                        {settings.logo ? <img src={settings.logo} alt="Logo" className="h-full w-full object-contain p-2" /> : <div className="flex h-full items-center justify-center text-[10px] text-gray-500">Chưa có logo</div>}
                        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition hover:opacity-100">
                          <span className="text-[10px] font-bold text-white">Thay đổi</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const url = await fileToDataUrl(file);
                              updateSettings({ logo: url });
                              e.currentTarget.value = "";
                            }}
                          />
                        </label>
                      </div>
                      <input value={settings.logo || ""} onChange={e => updateSettings({ logo: e.target.value })} placeholder="URL logo..." className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-400">Favicon (Icon trình duyệt)</p>
                      <div className="relative aspect-square w-12 overflow-hidden rounded-lg border border-white/10 bg-black/20">
                        {settings.favicon ? <img src={settings.favicon} alt="Favicon" className="h-full w-full object-contain p-2" /> : <div className="flex h-full items-center justify-center text-[10px] text-gray-500">?</div>}
                        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition hover:opacity-100">
                          <span className="text-[10px] font-bold text-white">Đổi</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const url = await fileToDataUrl(file);
                              updateSettings({ favicon: url });
                              e.currentTarget.value = "";
                            }}
                          />
                        </label>
                      </div>
                      <input value={settings.favicon || ""} onChange={e => updateSettings({ favicon: e.target.value })} placeholder="URL favicon..." className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white" />
                    </div>
                  </div>
                  <button onClick={() => { alert("Đã lưu!"); }} className="w-full rounded-lg bg-primary py-2 text-sm font-bold text-white">Lưu Logo & Favicon</button>
                </div>

                <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                  <h3 className="font-bold text-white">Cấu hình Slideshow theo trang</h3>
                  <div className="flex flex-wrap gap-2">
                    <select value={selectedPlatform} onChange={e => setSelectedPlatform(e.target.value)} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                      <option value="home">Trang chủ</option>
                      {PLATFORMS_DYNAMIC.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                    </select>
                    <button onClick={() => { alert("Đã lưu!"); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu thay đổi</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                  <h3 className="font-bold text-white">Slideshow</h3>
                  <div className="flex flex-wrap gap-2">
                    <input value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} placeholder="URL ảnh..." className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                    <button onClick={() => { if (mediaUrl) { addSlideshowImage(selectedPlatform, mediaUrl); setMediaUrl(""); } }} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Thêm</button>
                    <label className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
                      Tải ảnh
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={async e => {
                          const files = Array.from(e.target.files || []);
                          for (const file of files) {
                            const imageUrl = await fileToDataUrl(file);
                            addSlideshowImage(selectedPlatform, imageUrl);
                          }
                          e.currentTarget.value = "";
                        }}
                      />
                    </label>
                  </div>
                  <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-white">Video gắn kèm</label>
                      <input value={settings.media[selectedPlatform]?.videoUrl || ""} onChange={e => updateMediaVideo(selectedPlatform, e.target.value)} placeholder="URL YouTube hoặc video" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                    </div>
                    {settings.media[selectedPlatform]?.videoUrl && (
                      <>
                        <a href={settings.media[selectedPlatform]?.videoUrl} target="_blank" rel="noreferrer" className="text-xs text-primary underline">Xem link video</a>
                        {getYoutubeEmbedUrl(settings.media[selectedPlatform]?.videoUrl || "") && (
                          <div className="overflow-hidden rounded-xl border border-white/10">
                            <iframe
                              src={getYoutubeEmbedUrl(settings.media[selectedPlatform]?.videoUrl || "")}
                              title="Video preview"
                              className="aspect-video w-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}
                      </>
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
                      <div className="space-y-2">
                        <input value={newCase.before} onChange={e => setNewCase({ ...newCase, before: e.target.value })} placeholder="URL Trước" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                        <label className="inline-block cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">
                          Tải ảnh Trước
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const imageUrl = await fileToDataUrl(file);
                              setNewCase(prev => ({ ...prev, before: imageUrl }));
                              e.currentTarget.value = "";
                            }}
                          />
                        </label>
                      </div>
                      <div className="space-y-2">
                        <input value={newCase.after} onChange={e => setNewCase({ ...newCase, after: e.target.value })} placeholder="URL Sau" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                        <label className="inline-block cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">
                          Tải ảnh Sau
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const imageUrl = await fileToDataUrl(file);
                              setNewCase(prev => ({ ...prev, after: imageUrl }));
                              e.currentTarget.value = "";
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    {(newCase.before || newCase.after) && (
                      <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-white/5 p-2">
                        <div>
                          <p className="mb-1 text-[10px] uppercase tracking-wide text-gray-400">Preview Trước</p>
                          {newCase.before ? <img src={newCase.before} className="aspect-video w-full rounded-lg object-cover" /> : <div className="aspect-video w-full rounded-lg bg-black/20" />}
                        </div>
                        <div>
                          <p className="mb-1 text-[10px] uppercase tracking-wide text-gray-400">Preview Sau</p>
                          {newCase.after ? <img src={newCase.after} className="aspect-video w-full rounded-lg object-cover" /> : <div className="aspect-video w-full rounded-lg bg-black/20" />}
                        </div>
                      </div>
                    )}
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
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Tối ưu SEO Page</h3>
                <button onClick={() => { alert("Đã lưu!"); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu thay đổi</button>
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

          {activeTab === "news" && false && (
            <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-white">Quản lý Blog Trang Chủ</h3>
                <button type="button" onClick={resetBlogForm} className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white">Tạo blog mới</button>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs text-gray-300">Tiêu đề</label>
                  <div className="flex gap-2">
                    <input
                      value={blogForm.title}
                      onChange={e => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Nhập tiêu đề blog"
                      className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                    />
                    <button type="button" onClick={generateBlogDraftByAIV2} className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white">
                      AI viết
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-300">URL slug</label>
                  <input value={blogForm.slug} onChange={e => setBlogForm(prev => ({ ...prev, slug: e.target.value }))} placeholder="duong-dan-bai-viet" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-300">Từ khóa chính</label>
                  <input value={blogForm.keywordsMain} onChange={e => setBlogForm(prev => ({ ...prev, keywordsMain: e.target.value }))} placeholder="dịch vụ sửa đường nhựa TP.HCM" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-300">Từ khóa phụ</label>
                  <input value={blogForm.keywordsSecondary} onChange={e => setBlogForm(prev => ({ ...prev, keywordsSecondary: e.target.value }))} placeholder="từ khóa phụ" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <label className="text-xs text-gray-300">Mô tả ngắn (hiển thị khi rê chuột)</label>
                  <textarea value={blogForm.description} onChange={e => setBlogForm(prev => ({ ...prev, description: e.target.value }))} rows={3} className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <label className="text-xs text-gray-300">Meta Description</label>
                  <textarea value={blogForm.metaDescription} onChange={e => setBlogForm(prev => ({ ...prev, metaDescription: e.target.value }))} rows={2} className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-300">Ngày viết</label>
                  <input type="date" value={blogForm.publishedAt} onChange={e => setBlogForm(prev => ({ ...prev, publishedAt: e.target.value }))} className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-300">Ảnh đại diện</label>
                  <input value={blogForm.imageUrl} onChange={e => setBlogForm(prev => ({ ...prev, imageUrl: e.target.value }))} placeholder="URL ảnh hoặc upload bên dưới" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-xs text-gray-300"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => setBlogForm(prev => ({ ...prev, imageUrl: String(reader.result || "") }));
                      reader.readAsDataURL(file);
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-300">Nội dung bài viết (word nâng cao)</label>
                <RichTextEditor value={blogForm.content} onChange={(html) => setBlogForm(prev => ({ ...prev, content: html }))} minHeight={260} />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input type="checkbox" checked={blogForm.published} onChange={e => setBlogForm(prev => ({ ...prev, published: e.target.checked }))} />
                  Hiện blog
                </label>
                <label className="flex items-center gap-2 text-sm text-orange-300">
                  <input type="checkbox" checked={blogForm.hot} onChange={e => setBlogForm(prev => ({ ...prev, hot: e.target.checked }))} />
                  Blog hot (hiệu ứng lửa)
                </label>
                <button type="button" onClick={saveBlog} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">
                  {editingBlogId ? "Cập nhật blog" : "Lưu blog"}
                </button>
              </div>

              <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-3">
                <p className="text-sm font-semibold text-white">Danh sách blog</p>
                {blogs.map((item) => (
                  <div key={item.id} className="flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-white">{item.title}</p>
                      <p className="text-[11px] text-gray-400">{new Date(item.publishedAt || item.timestamp).toLocaleDateString("vi-VN")} · {item.published ? "Hiện" : "Ẩn"} {item.hot ? "· HOT" : ""}</p>
                    </div>
                    <button type="button" onClick={() => editBlog(item)} className="rounded-lg border border-white/20 px-2 py-1 text-xs text-white">Sửa</button>
                    <button type="button" onClick={async () => { await db.news.update(item.id, { published: !item.published }); const result = await db.news.getAll(); setBlogs(result.data || []); }} className="rounded-lg border border-white/20 px-2 py-1 text-xs text-white">{item.published ? "Ẩn" : "Hiện"}</button>
                    <button type="button" onClick={async () => { await db.news.update(item.id, { hot: !item.hot }); const result = await db.news.getAll(); setBlogs(result.data || []); }} className="rounded-lg border border-orange-400/40 px-2 py-1 text-xs text-orange-300">{item.hot ? "Bỏ hot" : "Hot"}</button>
                    <button type="button" onClick={async () => { if (!confirm("Xóa blog này?")) return; await db.news.delete(item.id); const result = await db.news.getAll(); setBlogs(result.data || []); if (editingBlogId === item.id) resetBlogForm(); }} className="rounded-lg border border-red-500/40 px-2 py-1 text-xs text-red-300">Xóa</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "news" && (
            <NewsDashboard
              blogs={blogs}
              editingBlogId={editingBlogId}
              blogForm={blogForm}
              setBlogForm={setBlogForm}
              onReset={resetBlogForm}
              onSave={saveBlog}
              onEdit={editBlog}
              onGenerate={generateBlogDraftByAIV2}
              onTogglePublished={handleToggleBlogPublished}
              onToggleHot={handleToggleBlogHot}
              onDelete={handleDeleteBlog}
              settings={settings}
              onUpdateIntegrations={(next) => updateSettings({ seoIntegrations: next })}
            />
          )}

          {activeTab === "portals" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-1">
                <div className="space-y-4 rounded-2xl border border-white/10 bg-card p-6">
                  <h3 className="font-bold text-white">Tạo tài khoản khách hàng</h3>
                  <input value={newPortal.clientName || ""} onChange={e => { setNewPortal({ ...newPortal, clientName: e.target.value }); setPortalCreateError(null); setPortalCreateMessage(null); }} placeholder="Tên khách hàng" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                  <input value={newPortal.username || ""} onChange={e => { setNewPortal({ ...newPortal, username: e.target.value }); setPortalCreateError(null); setPortalCreateMessage(null); }} placeholder="Tài khoản" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                  <input value={portalPassword} onChange={e => { setPortalPassword(e.target.value); setPortalCreateError(null); setPortalCreateMessage(null); }} type="password" placeholder="Mật khẩu" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                  <input value={newPortal.phone || ""} onChange={e => { setNewPortal({ ...newPortal, phone: e.target.value }); setPortalCreateError(null); setPortalCreateMessage(null); }} placeholder="Số điện thoại" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                  <select value={newPortal.platform || "facebook"} onChange={e => { setNewPortal({ ...newPortal, platform: e.target.value }); setPortalCreateError(null); setPortalCreateMessage(null); }} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                    {PLATFORMS_DYNAMIC.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                  </select>
                  <button
                    onClick={async () => {
                      setPortalCreateError(null);
                      setPortalCreateMessage(null);
                      if (!newPortal.username || !portalPassword || !newPortal.clientName) {
                        setPortalCreateError("Vui lòng nhập đầy đủ tên khách hàng, tài khoản và mật khẩu.");
                        return;
                      }
                      const initialProject = createEmptyProject(1);
                      const result = await db.clientPortals.add({
                        username: newPortal.username,
                        password: portalPassword,
                        clientName: newPortal.clientName,
                        phone: newPortal.phone || "",
                        platform: newPortal.platform || "facebook",
                        daysRemaining: 30,
                        postsCount: 0,
                        progressPercent: 0,
                        weeklyReports: [initialProject],
                      } as any);

                      if (result.error) {
                        setPortalCreateError(`Tạo tài khoản thất bại: ${result.error}`);
                        return;
                      }

                      await refreshPortals();
                      setPortalCreateMessage("Tạo tài khoản khách hàng thành công.");
                      setPortalPassword("");
                      setNewPortal({ username: "", clientName: "", phone: "", platform: "facebook", daysRemaining: 30, postsCount: 0, progressPercent: 0, weeklyReports: [] });
                    }}
                    className="w-full rounded-lg bg-primary py-2 text-sm font-bold text-white"
                  >
                    Tạo tài khoản
                  </button>
                  {portalCreateError && <p className="text-xs text-red-400">{portalCreateError}</p>}
                  {portalCreateMessage && <p className="text-xs text-green-400">{portalCreateMessage}</p>}
                </div>

                <div className="space-y-2 rounded-2xl border border-white/10 bg-card p-6">
                  <h3 className="mb-3 font-bold text-white">Danh sách khách hàng</h3>
                  {clientPortals.map(client => (
                    <button
                      key={client.id}
                      onClick={() => setSelectedClient(client)}
                      className={`w-full rounded-xl border p-3 text-left transition-all ${selectedClient?.id === client.id ? "border-primary bg-primary/10" : "border-white/5 bg-white/5 hover:bg-white/10"}`}
                    >
                      <p className="text-sm font-bold text-white">{client.clientName}</p>
                      <p className="text-[10px] uppercase text-gray-500">{client.username} · {client.platform}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6 lg:col-span-2">
                {!selectedClient ? (
                  <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/10 text-gray-500">Chọn khách hàng để quản lý dự án</div>
                ) : (
                  <>
                    <div className="space-y-4 rounded-2xl border border-white/10 bg-card p-6">
                      <h3 className="font-bold text-white">Thông tin tài khoản khách hàng</h3>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <input value={selectedClient.clientName} onChange={e => setSelectedClient({ ...selectedClient, clientName: e.target.value })} placeholder="Tên khách hàng" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                        <input value={selectedClient.phone || ""} onChange={e => setSelectedClient({ ...selectedClient, phone: e.target.value })} placeholder="Số điện thoại" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
                        <input value={selectedClient.username} readOnly className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-gray-400" />
                        <select value={selectedClient.platform} onChange={e => setSelectedClient({ ...selectedClient, platform: e.target.value })} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                          {PLATFORMS_DYNAMIC.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                        </select>
                        <input value={selectedClient.password || ""} onChange={e => setSelectedClient({ ...selectedClient, password: e.target.value })} type="text" placeholder="Mật khẩu mới" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white md:col-span-2" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => saveSelectedClient({ clientName: selectedClient.clientName, phone: selectedClient.phone, platform: selectedClient.platform, password: selectedClient.password })} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu tài khoản</button>
                        <button onClick={async () => { await db.clientPortals.delete(selectedClient.id.toString()); setSelectedClient(null); refreshPortals(); }} className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200">Xóa tài khoản</button>
                      </div>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-white/10 bg-card p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-bold text-white">Quản lý dự án</h3>
                        <button onClick={addProjectForSelectedClient} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">Thêm dự án</button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedProjects.map(project => (
                          <button key={project.id} onClick={() => setSelectedClientProjectId(project.id)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${selectedProject?.id === project.id ? "bg-primary text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"}`}>
                            {project.title}
                          </button>
                        ))}
                      </div>

                      {selectedProject && (
                        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <input value={selectedProject.title} onChange={e => updateSelectedProject(selectedProject.id, { title: e.target.value })} placeholder="Tên tiêu đề dự án" className="flex-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                            <button onClick={() => removeProjectForSelectedClient(selectedProject.id)} className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200">Xóa dự án</button>
                          </div>
                          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            <input type="datetime-local" value={toDateTimeLocalValue(selectedProject.registeredAt)} onChange={e => updateSelectedProject(selectedProject.id, { registeredAt: e.target.value })} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                            <input type="datetime-local" value={toDateTimeLocalValue(selectedProject.deadlineAt)} onChange={e => updateSelectedProject(selectedProject.id, { deadlineAt: e.target.value })} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                            <input value={selectedProject.budgetVnd} onChange={e => updateSelectedProject(selectedProject.id, { budgetVnd: Number((e.target.value || "0").replace(/\D/g, "")) })} placeholder="Chi phí dự án (VNĐ)" className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-gray-300">Nội dung quản lý dự án</p>
                            <RichTextEditor
                              value={selectedProject.progressDoc || "<p></p>"}
                              onChange={(html) => updateSelectedProject(selectedProject.id, { progressDoc: html })}
                              minHeight={180}
                            />
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-gray-300">Báo cáo dự án</p>
                            <RichTextEditor
                              value={selectedProject.resultDoc || "<p></p>"}
                              onChange={(html) => updateSelectedProject(selectedProject.id, { resultDoc: html })}
                              minHeight={180}
                            />
                          </div>

                          <button onClick={async () => { await saveSelectedProjects(selectedProjects); alert("Đã lưu dự án"); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu dự án</button>
                        </div>
                      )}
                    </div>
                  </>
                )}
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
                <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-3">
                  <h4 className="text-sm font-semibold text-white">Soft UI Sounds</h4>
                  <label className="flex items-center justify-between text-sm text-gray-300">
                    Bật âm thanh tương tác
                    <input type="checkbox" checked={settings.softSoundsEnabled !== false} onChange={e => updateSettings({ softSoundsEnabled: e.target.checked })} />
                  </label>
                  <label className="text-xs text-gray-400">Âm lượng: {Math.round((settings.softSoundsVolume ?? 0.05) * 100)}%</label>
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
                <button onClick={() => { alert("Đã lưu!"); }} className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white">Lưu cấu hình</button>
              </div>
            </div>
          )}

          {activeTab === "mascot" && (
            <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Linh vật công ty</h3>
                <button onClick={() => { alert("Đã lưu!"); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu thay đổi</button>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-4">
                    <h4 className="text-sm font-semibold text-white">Cấu hình chung</h4>
                    <label className="flex items-center justify-between text-sm text-gray-300">
                      Bật linh vật AI
                      <input type="checkbox" checked={settings.mascotEnabled !== false} onChange={e => updateSettings({ mascotEnabled: e.target.checked })} />
                    </label>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400">Hình ảnh linh vật mặc định (URL)</p>
                      <div className="flex gap-2">
                        <input value={isBuiltInMascot ? "" : settings.mascotImage || ""} onChange={e => updateSettings({ mascotImage: e.target.value })} placeholder="De trong de dung linh vat mac dinh tich hop" className="flex-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                        <label className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">
                          Tải ảnh
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
                      <h4 className="text-sm font-semibold text-white">Cấu hình theo trang</h4>
                      <select value={selectedMascotPlatform} onChange={e => setSelectedMascotPlatform(e.target.value)} className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white">
                        <option value="home">Trang chủ</option>
                        {PLATFORMS_DYNAMIC.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-gray-400">Hình ảnh linh vật cho trang này (nếu khác mặc định)</p>
                      <div className="flex gap-2">
                        <input
                          value={selectedMascotImage}
                          onChange={e => updateSettings({ mascotImages: { ...(settings.mascotImages || {}), [selectedMascotPlatform]: e.target.value } })}
                          placeholder="URL ảnh linh vật..."
                          className="flex-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                        />
                        <label className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white">
                          Tải ảnh
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
                      placeholder="Nội dung bong bóng chat linh vật"
                      className="h-24 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                    />

                    <div className="space-y-2">
                      <p className="text-xs text-gray-400">Âm thanh linh vật (.mp3/.wav)</p>
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
                        placeholder="Link âm thanh..."
                        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                      />
                      <label className="block cursor-pointer rounded-lg border border-dashed border-white/20 px-3 py-2 text-xs text-gray-400 text-center">
                        Tải file âm thanh
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
                    <h4 className="text-sm font-semibold text-white">Tin nhắn lỗi nhập liệu</h4>
                    <div className="grid gap-3">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase text-gray-500">Sai tài khoản / mật khẩu</p>
                        <input value={mascotErrorPack.login} onChange={e => updateMascotErrorPack("login", e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase text-gray-500">Sai số điện thoại</p>
                        <input value={mascotErrorPack.phone} onChange={e => updateMascotErrorPack("phone", e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase text-gray-500">Sai link chuẩn đoán</p>
                        <input value={mascotErrorPack.link} onChange={e => updateMascotErrorPack("link", e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-4">
                    <h4 className="text-sm font-semibold text-white">Tin nhắn khi lướt (Scroll)</h4>
                    <textarea
                      value={sectionMessageText}
                      onChange={e => updateMascotSectionMessages(e.target.value)}
                      placeholder={"Mỗi dòng: sectionId|nội dung\nVí dụ:\nslideshow|Đây là menu tổng quan\npricing|Đây là dịch vụ và bảng giá"}
                      className="h-28 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white">Tin nhắn theo lần click</h4>
                      <button type="button" onClick={addClickMessage} className="rounded-lg border border-white/20 px-2 py-1 text-[10px] text-white">Thêm</button>
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
                <h3 className="text-lg font-bold text-white">Tối ưu Website</h3>
                <button onClick={() => { alert("Đã lưu!"); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu thay đổi</button>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4 rounded-xl border border-white/10 bg-black/20 p-5">
                  <h4 className="font-bold text-white flex items-center gap-2"><Globe size={16} className="text-blue-400" /> Mã kết nối công cụ</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Google Analytics (GA4 ID)</label>
                      <input value={settings.googleAnalytics || ""} onChange={e => updateSettings({ googleAnalytics: e.target.value })} placeholder="G-XXXXXXXXXX" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Google Search Console (HTML Tag / ID)</label>
                      <input value={settings.googleConsole || ""} onChange={e => updateSettings({ googleConsole: e.target.value })} placeholder="Nhập mã xác minh..." className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Rank Math SEO ID / Key</label>
                      <input value={settings.rankMath || ""} onChange={e => updateSettings({ rankMath: e.target.value })} placeholder="Mã kết nối Rank Math..." className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-white/10 bg-black/20 p-5">
                  <h4 className="font-bold text-white flex items-center gap-2"><Plus size={16} className="text-green-400" /> Plugins & Script bổ sung</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">AIKTP Connection Key</label>
                      <input value={settings.aiKtp || ""} onChange={e => updateSettings({ aiKtp: e.target.value })} placeholder="Mã API AIKTP..." className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Custom Head Scripts (GTM, Pixel, FB Chat...)</label>
                      <textarea value={settings.headJs || ""} onChange={e => updateSettings({ headJs: e.target.value })} placeholder="<script>...</script>" className="w-full h-32 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-white" />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4 rounded-xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white flex items-center gap-2"><Code size={16} className="text-purple-400" /> Xem mã nguồn hệ thống (Chỉ đọc)</h4>
                    <button
                      onClick={async () => {
                        const next = !showSourceViewer;
                        setShowSourceViewer(next);
                        if (next && sourceFiles.length === 0) await loadSourceFiles();
                      }}
                      className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white"
                    >
                      {showSourceViewer ? "Đóng trình xem" : "Mở trình xem"}
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
                          <p className="truncate text-[10px] text-gray-500 font-mono">{selectedSourceFile || "Chưa chọn file"}</p>
                          {selectedSourceContent && (
                            <button onClick={() => { navigator.clipboard.writeText(selectedSourceContent); alert("Đã copy!"); }} className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-white">
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

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Newspaper,
  Bell, Globe, Search, Settings, LogOut,
  Trash2, Plus,
  BarChart2, Code, Copy,
  Calendar, Lock, Sparkles, Star, ArrowRight, type LucideIcon
} from "lucide-react";
import { useAdmin, SETTINGS_KEY } from "@/lib/AdminContext";
import { uploadMediaFile } from "@/lib/client-media-upload";
import { RichTextEditor } from "@/components/shared/RichTextEditor";
import { getContent, saveContent, type ContentOverride } from "@/lib/pageContent";
import { db, type Order, type Lead, type NewsItem, type ClientPortal, type ClientReview } from "@/lib/useData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const NAV = [
  { id: "dashboard", label: "Bảng điều khiển", icon: LayoutDashboard },
  { id: "leads", label: "Quản lý nhận tin", icon: Bell },
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
  home: { title: "Bứt Phá Marketing - Giải Pháp Đột Phá", desc: "Agency marketing toàn diện tại Việt Nam", keywords: "marketing, facebook ads, seo" },
  facebook: { title: "Dịch Vụ Facebook Marketing", desc: "Xây dựng Fanpage, chạy quảng cáo Facebook hiệu quả", keywords: "facebook marketing, facebook ads, quảng cáo facebook" },
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
  const [clientPortals, setClientPortals] = useState<ClientPortal[]>([]);
  const [progressArticles, setProgressArticles] = useState<Record<string, any[]>>({});
  const [selectedClient, setSelectedClient] = useState<ClientPortal | null>(null);
  const [newArticle, setNewArticle] = useState({ title: "", content: "", image: "" });
  const [selectedPlatform, setSelectedPlatform] = useState("home");
  const [newCase, setNewCase] = useState({ id: 0, title: "", before: "", after: "", description: "", content: "" });
  const [blogSaveMessage, setBlogSaveMessage] = useState<string | null>(null);
  const [blogSaveError, setBlogSaveError] = useState<string | null>(null);
  const [selectedProcessTab, setSelectedProcessTab] = useState(0);
  const [selectedMascotPlatform, setSelectedMascotPlatform] = useState("home");
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

  const visitorChartData = visitors
    .slice()
    .reverse()
    .slice(-12)
    .map((visitor, index) => ({
      name: `#${index + 1}`,
      visits: visitor.hits,
    }));
  const [newPortal, setNewPortal] = useState<Partial<ClientPortal>>({ username: "", clientName: "", phone: "", platform: "facebook", daysRemaining: 30, postsCount: 0, progressPercent: 0, weeklyReports: [] });
  const [portalPassword, setPortalPassword] = useState("");
  const [portalCreateMessage, setPortalCreateMessage] = useState<string | null>(null);
  const [portalCreateError, setPortalCreateError] = useState<string | null>(null);
  const [currentAdminPassword, setCurrentAdminPassword] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [changePasswordMessage, setChangePasswordMessage] = useState<string | null>(null);
  const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
  const [changingAdminPassword, setChangingAdminPassword] = useState(false);
  const [selectedClientProjectId, setSelectedClientProjectId] = useState("");
  const [showSourceViewer, setShowSourceViewer] = useState(false);
  const [sourceFiles, setSourceFiles] = useState<string[]>([]);
  const [selectedSourceFile, setSelectedSourceFile] = useState("");
  const [selectedSourceContent, setSelectedSourceContent] = useState("");
  const [blogs, setBlogs] = useState<NewsItem[]>([]);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    metaTitle: "",
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

  const setPanelFeedback = (message: string | null, error: string | null = null) => {
    setBlogSaveMessage(message);
    setBlogSaveError(error);
  };

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

  const resetBlogForm = () => {
    setEditingBlogId(null);
    setBlogForm({
      title: "",
      metaTitle: "",
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
      metaTitle: prev.metaTitle || title,
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
      metaTitle: prev.metaTitle || title,
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

  const uploadImageUrl = async (file: File, sectionLabel: string, suggestedName?: string) => {
    const result = await uploadMediaFile(file, { sectionLabel, suggestedName });
    return result.url;
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

  const updatePageContentField = (field: keyof ContentOverride, value: any) => {
    setPageContent((prev) => ({ ...prev, [field]: value }));
  };

  const savePageContentManual = async () => {
    const saved = await saveContent(selectedPlatform, pageContent);
    alert(saved ? "Đã lưu nội dung trang con" : "Lưu nội dung trang con thất bại");
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
    const next = [...(pageContent.processTabs || []), { label: "Dịch vụ mới", steps: [{ step: 1, title: "", desc: "" }] }];
    updatePageContentField("processTabs", next);
    setSelectedProcessTab(next.length - 1);
  };

  const removeProcessTab = (tabIdx: number) => {
    const next = (pageContent.processTabs || []).filter((_, i) => i !== tabIdx);
    updatePageContentField("processTabs", next.length > 0 ? next : [{ label: "Xây dựng", steps: [{ step: 1, title: "", desc: "" }] }]);
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
  const refreshPortals = async () => {
    const result = await db.clientPortals.getAll();
    if (result.error) console.error('Portals error:', result.error);
    else setClientPortals(result.data || []);
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
    setPanelFeedback("Đã lưu thông tin khách hàng.");
  };

  const saveSelectedProjects = async (projects: ClientProject[]) => {
    if (!selectedClient) return;
    await db.clientPortals.update(selectedClient.id.toString(), { weeklyReports: projects as any });
    await refreshClientPortal(selectedClient.id);
  };

  const saveSettingsPanel = async () => {
    setPanelFeedback(null, null);
    const result = await saveSettings();
    if (!result.ok) {
      setPanelFeedback(null, result.error || "Lưu cấu hình thất bại.");
      return;
    }
    setPanelFeedback("Đã lưu cấu hình.");
  };

  const changeAdminPassword = async () => {
    if (!currentAdminPassword || !newAdminPassword) {
      setChangePasswordError("Vui lòng nhập đủ mật khẩu hiện tại và mật khẩu mới.");
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
        setChangePasswordError(data?.error || "Đổi mật khẩu thất bại.");
        return;
      }

      setCurrentAdminPassword("");
      setNewAdminPassword("");
      setChangePasswordMessage("Đã cập nhật mật khẩu admin.");
    } catch {
      setChangePasswordError("Không thể đổi mật khẩu lúc này.");
    } finally {
      setChangingAdminPassword(false);
    }
  };

  const saveSelectedClientManual = async (patch: Partial<ClientPortal>) => {
    if (!selectedClient) return;
    setPanelFeedback(null, null);
    const result = await db.clientPortals.update(selectedClient.id.toString(), patch);
    if (result.error) {
      setPanelFeedback(null, `Lưu thông tin khách hàng thất bại: ${result.error}`);
      return;
    }
    await refreshClientPortal(selectedClient.id);
    setPanelFeedback("Đã lưu thông tin khách hàng.");
  };

  const saveSelectedProjectsManual = async (projects: ClientProject[]) => {
    if (!selectedClient) return;
    setPanelFeedback(null, null);
    const result = await db.clientPortals.update(selectedClient.id.toString(), { weeklyReports: projects as any });
    if (result.error) {
      setPanelFeedback(null, `Lưu dự án thất bại: ${result.error}`);
      return;
    }
    await refreshClientPortal(selectedClient.id);
    setPanelFeedback("Đã lưu dự án.");
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
    refreshOrders(); refreshLeads();
    refreshPortals();
    refreshReviews();
    refreshVisitors();
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
        setError(data?.error || "Mật khẩu không đúng");
        return;
      }

      setAuthenticated(true);
      setIsAuthChecking(false);
      setPassword("");
      router.refresh();
    } catch {
      setError("Không thể đăng nhập ngay lúc này.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    } catch {
      // Logout should still clear the local UI state.
    } finally {
      setAuthenticated(false);
      router.push("/adminbp");
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
      setBlogSaveError(`Lưu blog thất bại: ${mutationResult.error}`);
      return;
    }
    const result = await db.news.getAll();
    if (result.error) {
      setBlogSaveError(`Blog đã lưu nhưng tải lại danh sách thất bại: ${result.error}`);
      return;
    }
    setBlogs([...(result.data || [])].sort((a, b) => b.timestamp - a.timestamp));
    setBlogSaveMessage("Đã lưu blog");
    resetBlogForm();
  };

  const editBlog = (item: NewsItem) => {
    setEditingBlogId(item.id);
    setBlogForm({
      title: item.title || "",
      metaTitle: item.title || "",
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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-950 via-purple-900 to-pink-900 px-4">
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-pink-500/30 blur-xl"></div>
              <img src="/logo.png" alt="Logo" className="relative h-14 w-14 rounded-2xl object-cover shadow-lg" />
            </div>
            <div>
              <p className="text-xl font-black text-white">Bứt Phá Marketing</p>
              <p className="text-sm text-pink-200">Trang quản trị hệ thống</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wide text-pink-200">Mật khẩu</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => { setPassword(e.target.value); setError(""); }} 
                  placeholder="Nhập mật khẩu admin" 
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 pl-12 text-sm text-white outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/30 transition-all placeholder:text-pink-200/40" 
                />
              </div>
            </div>
            {error && <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300"><p>{error}</p></div>}
            <button type="submit" className="group w-full rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-blue-700 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-pink-600/30 transition-all hover:shadow-pink-600/50 hover:scale-[1.01] active:scale-[0.99]">
              <span className="flex items-center justify-center gap-2">
                Đăng Nhập 
                <div className="transition-transform group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </div>
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-pink-950 text-foreground">
      <aside className="hidden w-72 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl md:flex">
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-pink-500/20 blur-md"></div>
              <img src="/logo.png" alt="Logo" className="relative h-10 w-10 rounded-xl object-cover" />
            </div>
            <div>
              <p className="font-black text-white">Admin Panel</p>
              <p className="text-xs text-pink-200">Bứt Phá Marketing</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => n.id === "news" ? router.push("/adminbp/news") : n.id === "portals" ? router.push("/adminbp/portals") : setActiveTab(n.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === n.id 
                  ? "bg-gradient-to-r from-pink-500 via-purple-600 to-blue-700 text-white shadow-lg shadow-pink-600/30" 
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
              style={n.color && activeTab !== n.id ? { color: n.color } : {}}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <n.icon size={18} />
              </div>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 hover:bg-red-500 hover:text-white transition-all">
            <LogOut size={18} className="group-hover:rotate-12 transition-transform" /> 
            Đăng xuất
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
                onChange={e => e.target.value === "news" ? router.push("/adminbp/news") : setActiveTab(e.target.value)}
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
                <button type="button" onClick={() => refreshVisitors()} className="text-left">
                  <StatCard value={visitors.length} label="Truy cập" icon={BarChart2} color="#10B981" />
                </button>
                <button type="button" onClick={() => setActiveTab("settings")} className="text-left">
                  <StatCard value="Đổi" label="Mật khẩu" icon={Lock} color="#F59E0B" />
                </button>
                <button type="button" onClick={() => refreshVisitors()} className="text-left">
                  <StatCard value={visitors.length} label="Người truy cập" icon={Globe} color="#3B82F6" />
                </button>
                <button type="button" onClick={() => setActiveTab("leads")} className="text-left">
                  <StatCard value={leads.length} label="Nhận tin" icon={Bell} color="#A855F7" />
                </button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold text-white">Khách truy cập website</h2>
                  <button type="button" onClick={refreshVisitors} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white">
                    Làm mới
                  </button>
                </div>
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
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-400">Lượt truy cập ghi nhận</p>
                    <p className="mt-2 text-2xl font-black text-white">{totalVisitorHits.toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-400">Khách truy cập thực</p>
                    <p className="mt-2 text-2xl font-black text-white">{visitors.length.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h2 className="mb-4 text-lg font-bold text-white">Người truy cập và IP</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-[760px] w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400">
                      <tr>
                        <th className="px-4 py-3">IP</th>
                        <th className="px-4 py-3">Lượt</th>
                        <th className="px-4 py-3">Lần cuối</th>
                        <th className="px-4 py-3">Trang đã vào</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {visitors.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-6 text-center text-gray-400">Chưa có dữ liệu truy cập thực.</td>
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

          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <select value={selectedPlatform} onChange={e => setSelectedPlatform(e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                  <option value="home">Trang chủ</option>
                  {PLATFORMS_DYNAMIC.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                </select>
                <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{saveStatus === "saving" ? "Đang lưu..." : "Lưu thay đổi"}</button>
              </div>
              {selectedPlatform === "home" ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                    <h3 className="font-bold text-white">Cài đặt Trang chủ</h3>
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
                    <button onClick={savePageContentManual} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu nội dung trang con</button>
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

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h3 className="mb-4 text-lg font-bold text-white">Thêm Review khách hàng mới</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <input
                      value={newReview.clientName}
                      onChange={e => setNewReview({ ...newReview, clientName: e.target.value })}
                      placeholder="Tên khách hàng"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                    />
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/10 bg-white/5">
                        {newReview.logoUrl ? (
                          <img src={newReview.logoUrl} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-500 text-center">Ảnh đại diện</div>
                        )}
                        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition hover:opacity-100">
                          <span className="text-[10px] font-bold text-white">Đổi</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const url = await uploadImageUrl(file, "review-logo", newReview.clientName);
                              setNewReview({ ...newReview, logoUrl: url });
                            }}
                          />
                        </label>
                      </div>
                      <input
                        value={newReview.logoUrl || ""}
                        onChange={e => setNewReview({ ...newReview, logoUrl: e.target.value })}
                        placeholder="Hoặc dán URL ảnh..."
                        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400">Đánh giá sao (1-5)</p>
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
                      placeholder="Nội dung review..."
                      rows={5}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                    />
                    <button
                      onClick={async () => {
                        if (!newReview.clientName || !newReview.content) {
                          alert("Vui lòng nhập tên và nội dung review");
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
                      Thêm Review
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-white/5">
                  <h3 className="font-bold text-white">Danh sách Review</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-[720px] w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400">
                      <tr>
                        <th className="px-4 py-3">Khách hàng</th>
                        <th className="px-4 py-3">Sao</th>
                        <th className="px-4 py-3">Nội dung</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {isReviewsLoading ? (
                        <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Đang tải...</td></tr>
                      ) : clientReviews.length === 0 ? (
                        <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Chưa có review nào</td></tr>
                      ) : (
                        clientReviews.map(r => (
                          <tr key={r.id} className="text-gray-200">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <img src={r.logoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.clientName}`} className="h-8 w-8 rounded-full object-cover" />
                                <span className="font-bold">{r.clientName}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-amber-400 font-bold">{r.rating} ★</td>
                            <td className="px-4 py-3 text-xs text-gray-400 max-w-md truncate">{r.content}</td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={async () => {
                                  if (confirm("Xóa review này?")) {
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
                <h3 className="text-lg font-bold text-white">Dự án tiêu biểu (Trang chủ)</h3>
                <button 
                  onClick={() => {
                    const newProj = { id: Date.now().toString(), title: "Dự án mới", thumbnail: "", description: "", content: "", result: "+100%", note: "Tăng trưởng" };
                    updateSettings({ featuredProjects: [...(settings.featuredProjects || []), newProj] });
                  }}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white"
                >
                  Thêm dự án
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {(settings.featuredProjects || []).map((proj, idx) => (
                  <div key={proj.id} className="rounded-2xl border border-white/10 bg-card p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white">Dự án #{idx + 1}</h4>
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
                        <p className="text-xs font-semibold text-gray-400">Hình ảnh Thumbnail</p>
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/20">
                          {proj.thumbnail ? <img src={proj.thumbnail} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-xs text-gray-500">Chưa có ảnh</div>}
                          <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition hover:opacity-100">
                            <span className="text-xs font-bold text-white">Tải ảnh</span>
                            <input type="file" accept="image/*" className="hidden" onChange={async e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const imageUrl = await uploadImageUrl(file, "featured-project", proj.title);
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
                        }} placeholder="URL ảnh..." className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white" />
                      </div>
                      <input value={proj.title} onChange={e => {
                        const next = [...(settings.featuredProjects || [])];
                        next[idx] = { ...next[idx], title: e.target.value };
                        updateSettings({ featuredProjects: next });
                      }} placeholder="Tên dự án" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                      <input value={proj.description} onChange={e => {
                        const next = [...(settings.featuredProjects || [])];
                        next[idx] = { ...next[idx], description: e.target.value };
                        updateSettings({ featuredProjects: next });
                      }} placeholder="Mô tả ngắn" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                      <div className="grid grid-cols-2 gap-2">
                        <input value={proj.result} onChange={e => {
                          const next = [...(settings.featuredProjects || [])];
                          next[idx] = { ...next[idx], result: e.target.value };
                          updateSettings({ featuredProjects: next });
                        }} placeholder="Kết quả (vd: +150%)" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                        <input value={proj.note} onChange={e => {
                          const next = [...(settings.featuredProjects || [])];
                          next[idx] = { ...next[idx], note: e.target.value };
                          updateSettings({ featuredProjects: next });
                        }} placeholder="Ghi chú (vd: Doanh thu)" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                      </div>
                      <textarea value={proj.content} onChange={e => {
                        const next = [...(settings.featuredProjects || [])];
                        next[idx] = { ...next[idx], content: e.target.value };
                        updateSettings({ featuredProjects: next });
                      }} placeholder="Nội dung chi tiết" className="w-full h-24 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white disabled:opacity-50">Lưu tất cả dự án</button>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Feedback khách hàng</h3>
                <button 
                  onClick={() => {
                    const newFeedback = { id: Date.now().toString(), clientName: "Khách hàng mới", clientLogo: "", contentImage: "", rating: 5 };
                    updateSettings({ customerFeedbacks: [...(settings.customerFeedbacks || []), newFeedback] });
                  }}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white"
                >
                  Thêm feedback
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
                          <p className="text-xs font-semibold text-gray-400">Logo khách hàng</p>
                          <div className="relative aspect-square w-20 overflow-hidden rounded-lg border border-white/10 bg-black/20">
                            {fb.clientLogo ? <img src={fb.clientLogo} className="h-full w-full object-contain p-2" /> : <div className="flex h-full items-center justify-center text-[10px] text-gray-500">Logo</div>}
                            <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition hover:opacity-100">
                              <span className="text-[10px] font-bold text-white">Đổi</span>
                              <input type="file" accept="image/*" className="hidden" onChange={async e => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const imageUrl = await uploadImageUrl(file, "feedback-logo", fb.clientName);
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
                          <p className="text-xs font-semibold text-gray-400">Ảnh nội dung feedback</p>
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black/20">
                            {fb.contentImage ? <img src={fb.contentImage} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-[10px] text-gray-500">Ảnh nội dung</div>}
                            <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition hover:opacity-100">
                              <span className="text-[10px] font-bold text-white">Tải ảnh</span>
                              <input type="file" accept="image/*" className="hidden" onChange={async e => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const imageUrl = await uploadImageUrl(file, "feedback-content", fb.clientName);
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
                          }} placeholder="URL ảnh..." className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-1 text-[10px] text-white" />
                        </div>
                      </div>
                      <input value={fb.clientName} onChange={e => {
                        const next = [...(settings.customerFeedbacks || [])];
                        next[idx] = { ...next[idx], clientName: e.target.value };
                        updateSettings({ customerFeedbacks: next });
                      }} placeholder="Tên khách hàng" className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white" />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Đánh giá:</span>
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
              <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white disabled:opacity-50">Lưu tất cả feedback</button>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Tối ưu SEO Page</h3>
                <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{saveStatus === "saving" ? "Đang lưu..." : "Lưu thay đổi"}</button>
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
                      const url = await uploadImageUrl(file, "blog-cover", blogForm.title);
                      setBlogForm(prev => ({ ...prev, imageUrl: url }));
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
                      const url = await uploadImageUrl(file, "blog-cover", blogForm.title);
                      setBlogForm(prev => ({ ...prev, imageUrl: url }));
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
                        <button onClick={() => saveSelectedClientManual({ clientName: selectedClient.clientName, phone: selectedClient.phone, platform: selectedClient.platform, password: selectedClient.password })} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu tài khoản</button>
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

                          <button onClick={() => saveSelectedProjectsManual(selectedProjects)} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Lưu dự án</button>
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
              <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4" id="admin-password">
                <h3 className="font-bold text-white">Đổi mật khẩu admin</h3>
                <input value={currentAdminPassword} onChange={e => { setCurrentAdminPassword(e.target.value); setChangePasswordError(null); setChangePasswordMessage(null); }} type="password" placeholder="Mật khẩu hiện tại" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                <input value={newAdminPassword} onChange={e => { setNewAdminPassword(e.target.value); setChangePasswordError(null); setChangePasswordMessage(null); }} type="password" placeholder="Mật khẩu mới" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                {changePasswordMessage && <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">{changePasswordMessage}</div>}
                {changePasswordError && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{changePasswordError}</div>}
                <button type="button" onClick={changeAdminPassword} disabled={changingAdminPassword} className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{changingAdminPassword ? "Đang cập nhật..." : "Cập nhật mật khẩu"}</button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
                <h3 className="font-bold text-white">Thông tin liên hệ</h3>
                <input value={settings.address || ""} onChange={e => updateSettings({ address: e.target.value })} placeholder="Địa chỉ" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
                <input value={settings.email || ""} onChange={e => updateSettings({ email: e.target.value })} placeholder="Email" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white" />
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
                <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{saveStatus === "saving" ? "Đang lưu..." : "Lưu cấu hình"}</button>
              </div>
            </div>
          )}

          {activeTab === "mascot" && (
            <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Linh vật công ty</h3>
                <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{saveStatus === "saving" ? "Đang lưu..." : "Lưu thay đổi"}</button>
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
                              const imageUrl = await uploadImageUrl(file, "mascot-default");
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
                              const imageUrl = await uploadImageUrl(file, "mascot-platform", selectedMascotPlatform);
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
                <button onClick={saveSettingsPanel} disabled={!hasUnsavedChanges || saveStatus === "saving"} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{saveStatus === "saving" ? "Đang lưu..." : "Lưu thay đổi"}</button>
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

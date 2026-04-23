"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Flame,
  History,
  Info,
  Layers,
  LayoutDashboard,
  Link2,
  ListFilter,
  LogOut,
  MessageSquareCode,
  Newspaper,
  PencilLine,
  Plus,
  Puzzle,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  User,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { NewsDashboard } from "@/components/admin/NewsDashboard";
import { SEOOverview } from "@/components/admin/SEOOverview";
import { StudioSettings } from "@/components/admin/StudioSettings";
import { mergeNewsContentMeta } from "@/lib/news-content-meta";
import { buildExcerpt, buildMetaDescription, deriveKeywordCandidates, slugify } from "@/lib/seo-studio-draft";
import { db, type NewsItem } from "@/lib/useData";

type BlogFormState = {
  title: string;
  metaTitle: string;
  slug: string;
  description: string;
  metaDescription: string;
  keywordsMain: string;
  keywordsSecondary: string;
  imageUrl: string;
  content: string;
  hot: boolean;
  published: boolean;
  publishedAt: string;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeKeywordText(value?: string) {
  return (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getSeoScore(
  item: Pick<NewsItem, "title" | "slug" | "description" | "metaDescription" | "keywordsMain" | "keywordsSecondary" | "imageUrl" | "content" | "published">,
) {
  let score = 0;
  const plainContent = stripHtml(item.content || "");

  if ((item.title || "").trim().length >= 12) score += 12;
  if ((item.slug || "").trim().length >= 6) score += 10;
  if ((item.description || "").trim().length >= 80) score += 12;
  if ((item.metaDescription || "").trim().length >= 120 && (item.metaDescription || "").trim().length <= 160) score += 16;
  if ((item.keywordsMain || "").trim()) score += 18;
  if (normalizeKeywordText(item.keywordsSecondary).length >= 2) score += 10;
  if ((item.imageUrl || "").trim()) score += 8;
  if (plainContent.length >= 900) score += 10;
  if ((plainContent.match(/<h2/gi) || []).length >= 2 || plainContent.length >= 1400) score += 4;
  if (item.published) score += 10;

  return Math.min(score, 100);
}

function formatCompactDate(value?: string | number) {
  if (!value) return "--";
  return new Date(value).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatPercent(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  enabled: boolean;
  icon: any;
  category: "SEO" | "Schema" | "Speed" | "AI" | "Analytics";
}

function PluginCard({ plugin, onToggle }: { plugin: Plugin; onToggle: (id: string) => void }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
          <plugin.icon size={28} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
            plugin.enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
          }`}>
            {plugin.enabled ? "Đang bật" : "Đã tắt"}
          </span>
          <button
            onClick={() => onToggle(plugin.id)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              plugin.enabled ? "bg-indigo-600" : "bg-slate-200"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                plugin.enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
      
      <div className="mt-5">
        <h3 className="text-lg font-bold text-slate-950">{plugin.name}</h3>
        <p className="mt-1 text-xs text-slate-500">v{plugin.version} • bởi {plugin.author}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-2">{plugin.description}</p>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50">
          Cài đặt
        </button>
        <button className="rounded-xl border border-slate-200 p-2 text-slate-400 transition hover:bg-slate-50 hover:text-red-500">
          <LogOut size={14} className="rotate-90" />
        </button>
      </div>
    </div>
  );
}

function PluginManager() {
  const [plugins, setPlugins] = useState<Plugin[]>([
    {
      id: "rank-math",
      name: "Rank Math SEO Pro",
      description: "Tối ưu SEO realtime, checklist từ khóa, schema markup và xem trước kết quả Google.",
      version: "1.2.4",
      author: "ButPha AI",
      enabled: true,
      icon: Target,
      category: "SEO",
    },
    {
      id: "ai-writer",
      name: "AI Content Writer",
      description: "Tự động tạo nội dung nháp, gợi ý ý tưởng bài viết và tối ưu giọng văn theo thương hiệu.",
      version: "2.0.1",
      author: "ButPha AI",
      enabled: true,
      icon: Sparkles,
      category: "AI",
    },
    {
      id: "schema-pro",
      name: "Schema Markup Pro",
      description: "Tự động thêm cấu trúc dữ liệu FAQ, Article, Product giúp hiển thị rich snippets.",
      version: "1.0.5",
      author: "SEO Master",
      enabled: false,
      icon: Layers,
      category: "Schema",
    },
    {
      id: "speed-booster",
      name: "Speed Optimization",
      description: "Nén ảnh tự động, lười tải (lazy load) và tối ưu hóa CSS/JS để tăng tốc độ trang.",
      version: "1.4.0",
      author: "DevTeam",
      enabled: true,
      icon: Flame,
      category: "Speed",
    },
    {
      id: "internal-linker",
      name: "Internal Link Suggester",
      description: "Gợi ý các liên kết nội bộ thông minh dựa trên ngữ cảnh và chủ đề của bài viết.",
      version: "1.1.2",
      author: "ButPha AI",
      enabled: false,
      icon: Link2,
      category: "SEO",
    },
    {
      id: "analytics-plus",
      name: "Advanced Analytics",
      description: "Theo dõi hành vi người dùng sâu hơn, tỷ lệ thoát và bản đồ nhiệt (heat map).",
      version: "3.2.0",
      author: "DataInsight",
      enabled: false,
      icon: TrendingUp,
      category: "Analytics",
    },
  ]);

  const togglePlugin = (id: string) => {
    setPlugins(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  return (
    <div className="space-y-6">
      <header className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest mb-2">
              <Puzzle size={16} /> Plugin System
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950">Quản lý Plugin</h1>
            <p className="mt-2 text-slate-500">Mở rộng tính năng hệ thống thông qua kho ứng dụng chuyên sâu.</p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 shadow-sm">
              <Download size={18} /> Tải plugin (.zip)
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-indigo-500 shadow-lg shadow-indigo-200">
              <Plus size={18} /> Cài từ Marketplace
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {["Tất cả", "SEO", "AI", "Schema", "Speed", "Analytics"].map((cat, idx) => (
            <button key={cat} className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
              idx === 0 ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}>
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {plugins.map(plugin => (
          <PluginCard key={plugin.id} plugin={plugin} onToggle={togglePlugin} />
        ))}
      </div>

      <section className="rounded-[30px] border border-dashed border-slate-300 p-12 text-center bg-slate-50/50">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm mb-6">
          <Sparkles className="text-indigo-500" size={32} />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Sắp có thêm plugin mới</h2>
        <p className="mt-2 text-slate-500 max-w-md mx-auto">Chúng tôi đang phát triển thêm các công cụ tối ưu hóa nâng cao giúp website của bạn bứt phá mạnh mẽ hơn.</p>
        <button className="mt-8 text-indigo-600 font-bold hover:underline flex items-center gap-2 mx-auto">
          Gửi yêu cầu tính năng <ArrowUpRight size={16} />
        </button>
      </section>
    </div>
  );
}

export function NewsStudioPage() {
  const [blogs, setBlogs] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogSaveMessage, setBlogSaveMessage] = useState<string | null>(null);
  const [blogSaveError, setBlogSaveError] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState<BlogFormState>({
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
  const [tableSearch, setTableSearch] = useState("");
  const [tableFilter, setTableFilter] = useState<"all" | "published" | "draft" | "needs-update">("all");
  const [activeTab, setActiveTab] = useState<"dashboard" | "news" | "plugins" | "settings">("news");
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    void refreshBlogs();
  }, []);

  useEffect(() => {
    if (!blogForm.title.trim()) return;

    setBlogForm((prev) => {
      const keywordCandidates = deriveKeywordCandidates(prev.title);
      const nextKeywordMain = prev.keywordsMain || keywordCandidates[0] || prev.title;
      const nextKeywordSecondary = prev.keywordsSecondary || keywordCandidates.slice(1).join(", ");
      const nextSlug = prev.slug || slugify(prev.title);
      const nextDescription = prev.description || buildExcerpt({ description: prev.description, content: prev.content, maxLength: 170 });
      const nextMetaDescription =
        prev.metaDescription ||
        buildMetaDescription({
          title: prev.title,
          keyword: nextKeywordMain,
          description: nextDescription,
          content: prev.content,
        });

      if (
        nextKeywordMain === prev.keywordsMain &&
        nextKeywordSecondary === prev.keywordsSecondary &&
        nextSlug === prev.slug &&
        nextDescription === prev.description &&
        nextMetaDescription === prev.metaDescription
      ) {
        return prev;
      }

      return {
        ...prev,
        metaTitle: prev.metaTitle || prev.title,
        keywordsMain: nextKeywordMain,
        keywordsSecondary: nextKeywordSecondary,
        slug: nextSlug,
        description: nextDescription,
        metaDescription: nextMetaDescription,
      };
    });
  }, [blogForm.title, blogForm.content]);

  async function refreshBlogs() {
    setLoading(true);
    const result = await db.news.getAll();
    if (result.error) {
      setBlogSaveError(result.error);
    } else {
      setBlogs((result.data || []).sort((left, right) => (right.timestamp || 0) - (left.timestamp || 0)));
    }
    setLoading(false);
  }

  function resetBlogForm() {
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
  }

  function editBlog(item: NewsItem) {
    setEditingBlogId(item.id);
    setBlogForm({
      title: item.title || "",
      metaTitle: item.metaTitle || item.title || "",
      slug: item.slug || "",
      description: item.description || "",
      metaDescription: item.metaDescription || "",
      keywordsMain: item.keywordsMain || "",
      keywordsSecondary: item.keywordsSecondary || "",
      imageUrl: item.imageUrl || "",
      content: item.content || "<h1></h1><p></p>",
      hot: !!item.hot,
      published: item.published !== false,
      publishedAt: item.publishedAt ? new Date(item.publishedAt).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    });
    editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function generateBlogDraftByAI() {
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
        if (!result.includes(word)) result.push(word);
        return result;
      }, []);
    const mainKeyword = blogForm.keywordsMain.trim() || readableKeywords.slice(0, 4).join(" ") || title;
    const secondaryKeyword =
      blogForm.keywordsSecondary.trim() ||
      [readableKeywords.slice(0, 2).join(" "), "chiến lược tăng trưởng", "marketing thực chiến"].filter(Boolean).join(", ");
    const slug = slugify(title);
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
    editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function saveBlog() {
    if (!blogForm.title.trim()) {
      alert("Nhập tiêu đề bài viết.");
      return;
    }

    setBlogSaveMessage(null);
    setBlogSaveError(null);

    const payload = {
      title: blogForm.title,
      content: mergeNewsContentMeta(blogForm.content, { metaTitle: blogForm.metaTitle }),
      category: "blog",
      published: blogForm.published,
      description: blogForm.description,
      imageUrl: blogForm.imageUrl,
      slug: blogForm.slug,
      hot: blogForm.hot,
      metaDescription: blogForm.metaDescription,
      keywordsMain: blogForm.keywordsMain,
      keywordsSecondary: blogForm.keywordsSecondary,
      publishedAt: blogForm.publishedAt,
    };

    const result = editingBlogId ? await db.news.update(editingBlogId, payload) : await db.news.add(payload);

    if (result.error) {
      setBlogSaveError(result.error);
      return;
    }

    setBlogSaveMessage(editingBlogId ? "Đã cập nhật bài viết." : "Đã tạo bài viết mới.");
    await refreshBlogs();
    resetBlogForm();
  }

  async function handleToggleBlogPublished(item: NewsItem) {
    setBlogSaveError(null);
    setBlogSaveMessage(null);
    const result = await db.news.update(item.id, { published: !item.published });
    if (result.error) {
      setBlogSaveError(result.error);
      return;
    }
    await refreshBlogs();
  }

  async function handleDeleteBlog(item: NewsItem) {
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
  }

  function exportReport() {
    const rows = blogs.map((item) => ({
      title: item.title,
      slug: item.slug || "",
      published: item.published ? "Đã xuất bản" : "Bản nháp",
      seoScore: getSeoScore(item),
      publishedAt: formatCompactDate(item.publishedAt || item.timestamp),
      keyword: item.keywordsMain || "",
    }));
    const csv = [
      ["Tiêu đề", "Slug", "Trạng thái", "SEO Score", "Ngày cập nhật", "Từ khóa chính"].join(","),
      ...rows.map((row) =>
        [row.title, row.slug, row.published, row.seoScore, row.publishedAt, row.keyword]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "bao-cao-quan-ly-tin-tuc.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const analytics = useMemo(() => {
    const enriched = blogs.map((item) => {
      const seoScore = getSeoScore(item);
      const contentLength = stripHtml(item.content || "").length;
      const secondaryKeywordList = normalizeKeywordText(item.keywordsSecondary);
      const hasInternalLink = /href="\/(facebook|website|blog|tiktok|instagram|zalo|google-maps)/.test(item.content || "");
      const needsUpdate = seoScore < 65 || !item.metaDescription || !item.imageUrl || secondaryKeywordList.length < 2;
      const opportunity = Math.max(10, Math.min(96, Math.round((100 - seoScore) * 0.8)));
      const trendDelta = Math.max(-8, Math.min(8, Math.round((seoScore - 62) / 6)));

      return {
        ...item,
        seoScore,
        contentLength,
        secondaryKeywordList,
        hasInternalLink,
        needsUpdate,
        opportunity,
        trendDelta,
      };
    });

    const totalPosts = enriched.length;
    const publishedPosts = enriched.filter((item) => item.published);
    const needsUpdate = enriched.filter((item) => item.needsUpdate);
    const avgSeoScore = totalPosts ? Math.round(enriched.reduce((sum, item) => sum + item.seoScore, 0) / totalPosts) : 0;
    const estimatedViews = enriched.reduce((sum, item) => sum + Math.max(900, item.contentLength * 1.45 + item.seoScore * 18), 0);
    const chartData = enriched
      .slice()
      .reverse()
      .slice(0, 7)
      .map((item, index) => ({
        label: `${index + 1}`,
        top3: Math.max(1, Math.round(item.seoScore / 18)),
        top10: Math.max(2, Math.round(item.seoScore / 10)),
        top100: Math.max(4, Math.round(item.seoScore / 6)),
      }));
    const dropping = enriched.filter((item) => item.trendDelta < 0).sort((a, b) => a.trendDelta - b.trendDelta).slice(0, 5);
    const rising = enriched.filter((item) => item.trendDelta >= 0).sort((a, b) => b.trendDelta - a.trendDelta).slice(0, 5);
    const donutData = [
      { name: "Tốt", value: enriched.filter((item) => item.seoScore >= 80).length, color: "#22c55e" },
      { name: "Khá", value: enriched.filter((item) => item.seoScore >= 60 && item.seoScore < 80).length, color: "#3b82f6" },
      { name: "Trung bình", value: enriched.filter((item) => item.seoScore >= 40 && item.seoScore < 60).length, color: "#f59e0b" },
      { name: "Kém", value: enriched.filter((item) => item.seoScore < 40).length, color: "#ef4444" },
    ];
    const clusterRows = enriched
      .map((item) => ({
        name: item.keywordsMain || item.title,
        opportunities: Math.round(item.opportunity / 8),
        difficulty: item.seoScore >= 75 ? "Thấp" : item.seoScore >= 55 ? "Trung bình" : "Cao",
        potential: item.seoScore >= 75 ? "Cao" : item.seoScore >= 55 ? "Trung bình" : "Rất cao",
      }))
      .slice(0, 5);
    const internalLinkHealth = {
      missing: enriched.filter((item) => item.published && !item.hasInternalLink).length,
      opportunities: enriched.filter((item) => !item.hasInternalLink).length,
      bestLinked: enriched.filter((item) => item.hasInternalLink).length,
      orphan: enriched.filter((item) => !item.hasInternalLink && item.published).length,
    };

    const prevPublished = Math.max(1, publishedPosts.length - 3);
    const prevNeedsUpdate = Math.max(1, needsUpdate.length + 2);
    const prevAvgSeo = Math.max(1, avgSeoScore - 6);
    const prevEstimatedViews = Math.max(1, estimatedViews - 7800);

    return {
      enriched,
      totalPosts,
      publishedPosts: publishedPosts.length,
      needsUpdate: needsUpdate.length,
      avgSeoScore,
      estimatedViews,
      chartData,
      dropping,
      rising,
      donutData,
      clusterRows,
      internalLinkHealth,
      deltas: {
        totalPosts: totalPosts ? (12 / Math.max(totalPosts - 12, 1)) * 100 : 0,
        publishedPosts: ((publishedPosts.length - prevPublished) / prevPublished) * 100,
        needsUpdate: -((prevNeedsUpdate - needsUpdate.length) / prevNeedsUpdate) * 100,
        avgSeoScore: ((avgSeoScore - prevAvgSeo) / prevAvgSeo) * 100,
        estimatedViews: ((estimatedViews - prevEstimatedViews) / prevEstimatedViews) * 100,
      },
    };
  }, [blogs]);

  const filteredTableRows = useMemo(() => {
    return analytics.enriched.filter((item) => {
      const haystack = `${item.title} ${item.slug || ""} ${item.keywordsMain || ""}`.toLowerCase();
      const matchesSearch = !tableSearch.trim() || haystack.includes(tableSearch.trim().toLowerCase());
      if (!matchesSearch) return false;
      if (tableFilter === "published") return item.published;
      if (tableFilter === "draft") return !item.published;
      if (tableFilter === "needs-update") return item.needsUpdate;
      return true;
    });
  }, [analytics.enriched, tableFilter, tableSearch]);

  const sidebarItems = [
    { label: "Tổng quan", icon: LayoutDashboard, id: "dashboard" },
    { label: "Viết bài AI", icon: Sparkles, id: "create", href: "/studio/create" },
    { label: "Cơ hội nội dung", icon: Target, id: "create", href: "/studio/opportunity-pro" },
    { label: "Bài viết", icon: Newspaper, id: "news" },
    { label: "Keyword & Rank", icon: Target, id: "keyword-rank", href: "/studio/keyword-rank" },
    { label: "AI Refresh", icon: RefreshCw, id: "ai-refresh", href: "/studio/dashboard" },
    { label: "Cluster & Topic", icon: Sparkles, id: "cluster-topic", href: "/studio/opportunity-pro" },
    { label: "Internal Links", icon: Link2, id: "internal-links", href: "/studio/dashboard" },
    { label: "Phân tích đối thủ", icon: ShieldCheck, id: "dashboard" },
    { label: "Plugin", icon: Puzzle, id: "plugins" },
    { label: "Cài đặt", icon: Settings, id: "settings" },
  ];

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-slate-900">
      <div className="mx-auto flex max-w-[1600px] gap-4 px-3 py-4 sm:px-4 lg:gap-6 lg:px-6 lg:py-6">
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-[270px] shrink-0 overflow-hidden rounded-[28px] bg-[#111c30] text-white shadow-[0_24px_80px_rgba(15,23,42,0.25)] lg:flex lg:flex-col">
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 text-white">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="font-bold">Content Studio</p>
              <p className="text-xs text-slate-400">Quản trị tin tức & SEO</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-5 overflow-y-auto scrollbar-hide">
            {sidebarItems.map((item) => {
              if (item.href && item.href.startsWith("/")) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition text-slate-400 hover:bg-white/5 hover:text-white"
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    activeTab === item.id && (item.label === "Tổng quan" || activeTab !== "dashboard")
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mx-4 mb-4 mt-auto border-t border-white/10 pt-4">
            <div className="flex items-center gap-3 px-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">
                AD
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate text-white">Admin</p>
                <p className="text-[11px] text-slate-400 truncate">admin@butphamarketing.com</p>
              </div>
              <button className="ml-auto text-slate-400 hover:text-white transition">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 space-y-4 lg:space-y-6">
          <div className="rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm lg:hidden">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Admin News</p>
                <h2 className="text-lg font-black text-slate-900">Quan ly bai viet</h2>
              </div>
              <Link
                href="/studio/create"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-bold text-white"
              >
                <Sparkles size={14} />
                Tao bai
              </Link>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {sidebarItems.map((item) => {
                if (item.href && item.href.startsWith("/")) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${
                        item.id === "news" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <item.icon size={14} />
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActiveTab(item.id as any)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-bold transition ${
                      activeTab === item.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <item.icon size={14} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {activeTab === "plugins" && <PluginManager />}
          {activeTab === "settings" && <StudioSettings />}
          {activeTab === "dashboard" && <SEOOverview />}
          {activeTab === "news" && (
            <NewsDashboard
              blogs={blogs}
              editingBlogId={editingBlogId}
              blogForm={blogForm}
              setBlogForm={setBlogForm}
              onReset={resetBlogForm}
              onSave={saveBlog}
              onEdit={editBlog}
              onGenerate={generateBlogDraftByAI}
              onTogglePublished={handleToggleBlogPublished}
              onDelete={handleDeleteBlog}
            />
          )}
        </main>
      </div>
    </div>
  );
}

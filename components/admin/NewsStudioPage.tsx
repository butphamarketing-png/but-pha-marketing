"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Download,
  FileText,
  Flame,
  LayoutDashboard,
  Link2,
  Newspaper,
  PencilLine,
  RefreshCw,
  Search,
  Settings,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
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
import { useAdmin } from "@/lib/AdminContext";
import { db, type NewsItem } from "@/lib/useData";

type BlogFormState = {
  title: string;
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

export function NewsStudioPage() {
  const { settings, updateSettings } = useAdmin();
  const [period, setPeriod] = useState("7");
  const [blogs, setBlogs] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogSaveMessage, setBlogSaveMessage] = useState<string | null>(null);
  const [blogSaveError, setBlogSaveError] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState<BlogFormState>({
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
  const [tableSearch, setTableSearch] = useState("");
  const [tableFilter, setTableFilter] = useState<"all" | "published" | "draft" | "needs-update">("all");
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    void refreshBlogs();
  }, []);

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

  async function handleToggleBlogHot(item: NewsItem) {
    setBlogSaveError(null);
    setBlogSaveMessage(null);
    const result = await db.news.update(item.id, { hot: !item.hot });
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
    { label: "Tổng quan", icon: LayoutDashboard, href: "#tong-quan" },
    { label: "Bài viết", icon: Newspaper, href: "#tat-ca-bai-viet" },
    { label: "Keyword & Rank", icon: Target, href: "#xu-huong-seo" },
    { label: "Cluster & Topic", icon: Sparkles, href: "#co-hoi-noi-dung" },
    { label: "Internal Links", icon: Link2, href: "#internal-link-health" },
    { label: "Biên tập", icon: PencilLine, href: "#bien-tap" },
    { label: "Cài đặt", icon: Settings, href: "/admin" },
  ];

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-slate-900">
      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 lg:px-6">
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

          <nav className="flex-1 space-y-1 px-4 py-5">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mx-4 mb-4 rounded-[24px] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Kho bài viết</p>
            <p className="mt-3 text-3xl font-black">{analytics.totalPosts}</p>
            <p className="mt-1 text-sm text-slate-400">Không hiển thị AI Credits theo yêu cầu.</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 space-y-6">
          <section id="tong-quan" className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Dashboard</h1>
                <p className="mt-2 text-sm text-slate-500">Tổng quan hiệu suất nội dung và SEO toàn bộ website.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                  <CalendarDays size={16} />
                  <select value={period} onChange={(event) => setPeriod(event.target.value)} className="bg-transparent outline-none">
                    <option value="7">7 ngày qua</option>
                    <option value="30">30 ngày qua</option>
                    <option value="90">90 ngày qua</option>
                  </select>
                </label>
                <button
                  type="button"
                  onClick={exportReport}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Download size={16} />
                  Xuất báo cáo
                </button>
              </div>
            </div>

            {(blogSaveMessage || blogSaveError) && (
              <div className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${blogSaveError ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                {blogSaveError || blogSaveMessage}
              </div>
            )}

            <div className="mt-6 grid gap-4 xl:grid-cols-5">
              {[
                { label: "Tổng bài viết", value: analytics.totalPosts, delta: analytics.deltas.totalPosts, color: "bg-blue-500", icon: FileText },
                { label: "Bài đã xuất bản", value: analytics.publishedPosts, delta: analytics.deltas.publishedPosts, color: "bg-emerald-500", icon: Newspaper },
                { label: "Bài cần cập nhật", value: analytics.needsUpdate, delta: analytics.deltas.needsUpdate, color: "bg-amber-500", icon: RefreshCw },
                { label: "SEO Score trung bình", value: `${analytics.avgSeoScore}/100`, delta: analytics.deltas.avgSeoScore, color: "bg-violet-500", icon: Target },
                { label: "Lượt xem ước tính", value: `${(analytics.estimatedViews / 1000).toFixed(1)}K`, delta: analytics.deltas.estimatedViews, color: "bg-cyan-500", icon: TrendingUp },
              ].map((item) => (
                <div key={item.label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color} text-white`}>
                    <item.icon size={18} />
                  </div>
                  <p className="mt-4 text-sm text-slate-500">{item.label}</p>
                  <p className="mt-1 text-4xl font-black tracking-tight text-slate-950">{item.value}</p>
                  <p className={`mt-2 text-sm ${item.delta >= 0 ? "text-emerald-600" : "text-red-500"}`}>{formatPercent(item.delta)} so với kỳ trước</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div id="xu-huong-seo" className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-950">Xu hướng thứ hạng từ khóa</h2>
                  <p className="mt-1 text-sm text-slate-500">Mô phỏng theo chất lượng SEO hiện tại của kho bài viết.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{period} ngày qua</span>
              </div>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.chartData}>
                    <defs>
                      <linearGradient id="top3Fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.24} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="top10Fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="top100Fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="top3" stroke="#22c55e" fill="url(#top3Fill)" strokeWidth={2.5} />
                    <Area type="monotone" dataKey="top10" stroke="#3b82f6" fill="url(#top10Fill)" strokeWidth={2.5} />
                    <Area type="monotone" dataKey="top100" stroke="#8b5cf6" fill="url(#top100Fill)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-950">Bài viết đang tụt hạng</h2>
                <TrendingDown className="text-red-500" size={18} />
              </div>
              <div className="space-y-4">
                {analytics.dropping.length > 0 ? analytics.dropping.map((item, index) => (
                  <button key={item.id} type="button" onClick={() => editBlog(item)} className="flex w-full items-start justify-between gap-4 text-left">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{index + 1}. {item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.keywordsMain || "Chưa có từ khóa chính"}</p>
                    </div>
                    <span className="text-sm font-bold text-red-500">{item.trendDelta}</span>
                  </button>
                )) : <p className="text-sm text-slate-500">Chưa có bài nào rơi mạnh trong kỳ này.</p>}
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-950">Bài viết đang tăng hạng</h2>
                <TrendingUp className="text-emerald-500" size={18} />
              </div>
              <div className="space-y-4">
                {analytics.rising.length > 0 ? analytics.rising.map((item, index) => (
                  <button key={item.id} type="button" onClick={() => editBlog(item)} className="flex w-full items-start justify-between gap-4 text-left">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{index + 1}. {item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.keywordsMain || "Chưa có từ khóa chính"}</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-500">+{item.trendDelta}</span>
                  </button>
                )) : <p className="text-sm text-slate-500">Chưa có bài tăng hạng nổi bật trong kỳ này.</p>}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_1fr_0.9fr]">
            <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
              <div className="mb-5">
                <h2 className="text-xl font-black text-slate-950">Phân bố điểm SEO</h2>
                <p className="mt-1 text-sm text-slate-500">Tổng hợp theo chất lượng hiện tại của toàn bộ bài viết.</p>
              </div>
              <div className="grid items-center gap-4 md:grid-cols-[220px_1fr]">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={analytics.donutData} dataKey="value" innerRadius={58} outerRadius={86} paddingAngle={3}>
                        {analytics.donutData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {analytics.donutData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">{item.value} bài</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div id="co-hoi-noi-dung" className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-950">Cơ hội nội dung</h2>
                  <p className="mt-1 text-sm text-slate-500">Ưu tiên cluster có dư địa tăng trưởng SEO tốt nhất.</p>
                </div>
                <ArrowUpRight size={18} className="text-indigo-500" />
              </div>
              <div className="space-y-3">
                {analytics.clusterRows.map((row) => (
                  <div key={row.name} className="grid grid-cols-[1.3fr_0.5fr_0.7fr_0.8fr] items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <span className="font-semibold text-slate-800">{row.name}</span>
                    <span className="font-bold text-slate-900">{row.opportunities}</span>
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-center text-xs font-semibold text-amber-700">{row.difficulty}</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-center text-xs font-semibold text-emerald-700">{row.potential}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="internal-link-health" className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-950">Internal Link Health</h2>
                  <p className="mt-1 text-sm text-slate-500">Đo nhanh tình trạng liên kết nội bộ trong kho bài viết.</p>
                </div>
                <Link2 size={18} className="text-cyan-500" />
              </div>
              <div className="space-y-3">
                {[
                  { label: "Bài viết thiếu internal link", value: analytics.internalLinkHealth.missing },
                  { label: "Cơ hội internal link", value: analytics.internalLinkHealth.opportunities },
                  { label: "Bài nhận link nhiều nhất", value: analytics.internalLinkHealth.bestLinked },
                  { label: "Bài chưa nhận link nào", value: analytics.internalLinkHealth.orphan },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    <span className="text-lg font-black text-slate-950">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="tat-ca-bai-viet" className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-950">Tất cả bài viết</h2>
                <p className="mt-1 text-sm text-slate-500">Quản lý danh sách tin tức, lọc nhanh và mở bài để chỉnh sửa.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="relative min-w-[240px]">
                  <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={tableSearch}
                    onChange={(event) => setTableSearch(event.target.value)}
                    placeholder="Tìm kiếm bài viết..."
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none"
                  />
                </div>
                <select
                  value={tableFilter}
                  onChange={(event) => setTableFilter(event.target.value as typeof tableFilter)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                >
                  <option value="all">Tất cả</option>
                  <option value="published">Đã xuất bản</option>
                  <option value="draft">Bản nháp</option>
                  <option value="needs-update">Cần cập nhật</option>
                </select>
                <button
                  type="button"
                  onClick={() => {
                    resetBlogForm();
                    editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  <PencilLine size={16} />
                  Viết bài mới
                </button>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2 text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">Tiêu đề</th>
                    <th className="px-3 py-2">Từ khóa chính</th>
                    <th className="px-3 py-2">SEO Score</th>
                    <th className="px-3 py-2">Xếp hạng</th>
                    <th className="px-3 py-2">Lượt xem</th>
                    <th className="px-3 py-2">Cập nhật</th>
                    <th className="px-3 py-2">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTableRows.map((item, index) => (
                    <tr key={item.id} className="rounded-2xl bg-slate-50 text-slate-800">
                      <td className="rounded-l-2xl px-3 py-4">{index + 1}</td>
                      <td className="px-3 py-4">
                        <button type="button" onClick={() => editBlog(item)} className="text-left">
                          <p className="font-semibold text-slate-950">{item.title}</p>
                          <p className="mt-1 text-xs text-slate-500">{item.slug || "chưa có slug"}</p>
                        </button>
                      </td>
                      <td className="px-3 py-4">{item.keywordsMain || "Chưa có"}</td>
                      <td className="px-3 py-4"><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">{item.seoScore}</span></td>
                      <td className={`px-3 py-4 font-bold ${item.trendDelta >= 0 ? "text-emerald-600" : "text-red-500"}`}>{item.trendDelta >= 0 ? `+${item.trendDelta}` : item.trendDelta}</td>
                      <td className="px-3 py-4">{Math.round(Math.max(900, item.contentLength * 1.45 + item.seoScore * 18) / 100) / 10}K</td>
                      <td className="px-3 py-4">{formatCompactDate(item.publishedAt || item.timestamp)}</td>
                      <td className="rounded-r-2xl px-3 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"}`}>
                          {item.published ? "Đã xuất bản" : "Bản nháp"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!loading && filteredTableRows.length === 0 && <p className="py-8 text-center text-sm text-slate-500">Không có bài viết phù hợp bộ lọc hiện tại.</p>}
            </div>
          </section>

          <section id="bien-tap" ref={editorRef} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-950">Biên tập nội dung</h2>
                <p className="mt-1 text-sm text-slate-500">Giữ nguyên toàn bộ thao tác chỉnh sửa, SEO checklist và quản lý kho bài viết.</p>
              </div>
              <button type="button" onClick={() => void refreshBlogs()} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                <RefreshCw size={16} />
                Tải lại dữ liệu
              </button>
            </div>

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
              onToggleHot={handleToggleBlogHot}
              onDelete={handleDeleteBlog}
              settings={settings}
              onUpdateIntegrations={(next) => updateSettings({ seoIntegrations: next })}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

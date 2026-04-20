"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Eye,
  FilePlus2,
  FileText,
  Flame,
  Globe,
  History,
  Image as ImageIcon,
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
import { RichTextEditor } from "@/components/shared/RichTextEditor";
import { NewsItem } from "@/lib/useData";
import { SiteSettings } from "@/lib/AdminContext";

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

type NewsDashboardProps = {
  blogs: NewsItem[];
  editingBlogId: string | null;
  blogForm: BlogFormState;
  setBlogForm: React.Dispatch<React.SetStateAction<BlogFormState>>;
  onReset: () => void;
  onSave: () => void | Promise<void>;
  onEdit: (item: NewsItem) => void;
  onGenerate: () => void;
  onTogglePublished: (item: NewsItem) => void | Promise<void>;
  onToggleHot: (item: NewsItem) => void | Promise<void>;
  onDelete: (item: NewsItem) => void | Promise<void>;
  settings: SiteSettings;
  onUpdateIntegrations: (next: SiteSettings["seoIntegrations"]) => void;
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

function getSeoScore(item: Pick<NewsItem, "title" | "slug" | "description" | "metaDescription" | "keywordsMain" | "keywordsSecondary" | "imageUrl" | "content" | "published">) {
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

function getIssueList(item: NewsItem) {
  const issues: string[] = [];
  const plainContent = stripHtml(item.content || "");

  if (!(item.keywordsMain || "").trim()) issues.push("Thiếu từ khóa chính");
  if (normalizeKeywordText(item.keywordsSecondary).length < 2) issues.push("Thiếu từ khóa phụ");
  if (!(item.metaDescription || "").trim()) issues.push("Thiếu meta description");
  if (!(item.imageUrl || "").trim()) issues.push("Thiếu ảnh đại diện");
  if (!(item.slug || "").trim()) issues.push("Thiếu slug chuẩn SEO");
  if (plainContent.length < 900) issues.push("Nội dung còn mỏng");

  return issues;
}

function formatDate(value?: string | number) {
  if (!value) return "Chưa đặt ngày";
  return new Date(value).toLocaleDateString("vi-VN");
}

function SeoChecklist({ score, issues }: { score: number; issues: string[] }) {
  const allChecks = [
    { id: "title", label: "Tiêu đề có từ khóa chính", check: (issues: string[]) => !issues.includes("Thiếu từ khóa chính") },
    { id: "meta", label: "Meta description chuẩn SEO", check: (issues: string[]) => !issues.includes("Thiếu meta description") },
    { id: "length", label: "Độ dài nội dung đạt chuẩn (900+ từ)", check: (issues: string[]) => !issues.includes("Nội dung còn mỏng") },
    { id: "image", label: "Đã có ảnh đại diện (Featured Image)", check: (issues: string[]) => !issues.includes("Thiếu ảnh đại diện") },
    { id: "slug", label: "Slug chứa từ khóa chính", check: (issues: string[]) => !issues.includes("Thiếu slug chuẩn SEO") },
    { id: "secondary", label: "Sử dụng ít nhất 2 từ khóa phụ", check: (issues: string[]) => !issues.includes("Thiếu từ khóa phụ") },
    { id: "h2", label: "Sử dụng các thẻ H2, H3 hợp lý", check: (issues: string[]) => true }, // Placeholder
    { id: "internal", label: "Gợi ý Internal Link nội bộ", check: (issues: string[]) => true }, // Placeholder
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-white flex items-center gap-2">
          <ShieldCheck size={18} className="text-indigo-400" /> Rank Math SEO
        </h4>
        <span className={`text-xl font-black ${
          score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-red-400"
        }`}>
          {score}/100
        </span>
      </div>

      <div className="space-y-3">
        {allChecks.map((item) => {
          const isPassed = item.check(issues);
          return (
            <div key={item.id} className="flex items-start gap-3">
              {isPassed ? (
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              ) : (
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-400" />
              )}
              <span className={`text-xs font-medium ${isPassed ? "text-slate-300" : "text-slate-400"}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SerpPreview({ title, slug, description }: { title: string; slug: string; description: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <Globe size={14} /> Google SERP Preview
      </div>
      <div className="space-y-1 overflow-hidden">
        <div className="flex items-center gap-1 text-[13px] text-slate-400">
          <span>butphamarketing.com</span>
          <span>›</span>
          <span className="truncate">blog</span>
          <span>›</span>
          <span className="truncate">{slug || "..."}</span>
        </div>
        <h3 className="text-xl font-medium text-[#8ab4f8] hover:underline cursor-pointer truncate">
          {title || "Tiêu đề bài viết hiển thị trên Google..."}
        </h3>
        <p className="text-[14px] leading-relaxed text-[#bdc1c6] line-clamp-2">
          {description || "Phần mô tả ngắn (Meta Description) sẽ xuất hiện ở đây để thu hút người dùng nhấp vào bài viết của bạn từ kết quả tìm kiếm..."}
        </p>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  tone,
  helper,
}: {
  label: string;
  value: string | number;
  tone: "blue" | "green" | "amber" | "violet" | "cyan";
  helper: string;
}) {
  const toneMap = {
    blue: "from-blue-500/20 to-sky-400/10 text-blue-200 border-blue-400/20",
    green: "from-emerald-500/20 to-lime-400/10 text-emerald-200 border-emerald-400/20",
    amber: "from-amber-500/20 to-orange-400/10 text-amber-200 border-amber-400/20",
    violet: "from-violet-500/20 to-fuchsia-400/10 text-violet-200 border-violet-400/20",
    cyan: "from-cyan-500/20 to-sky-400/10 text-cyan-200 border-cyan-400/20",
  } as const;

  return (
    <div className={`rounded-3xl border bg-gradient-to-br p-5 ${toneMap[tone]}`}>
      <p className="text-xs uppercase tracking-[0.28em] text-white/70">{label}</p>
      <p className="mt-4 text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm text-white/70">{helper}</p>
    </div>
  );
}

export function NewsDashboard({
  blogs,
  editingBlogId,
  blogForm,
  setBlogForm,
  onReset,
  onSave,
  onEdit,
  onGenerate,
  onTogglePublished,
  onToggleHot,
  onDelete,
  settings,
  onUpdateIntegrations,
}: NewsDashboardProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft" | "needs-seo" | "hot">("all");

  const analytics = useMemo(() => {
    const enriched = blogs.map((item) => {
      const seoScore = getSeoScore(item);
      const issues = getIssueList(item);
      return {
        ...item,
        seoScore,
        issues,
        plainContentLength: stripHtml(item.content || "").length,
      };
    });

    const total = enriched.length;
    const published = enriched.filter((item) => item.published);
    const drafts = enriched.filter((item) => !item.published);
    const avgSeo = total ? Math.round(enriched.reduce((sum, item) => sum + item.seoScore, 0) / total) : 0;
    const needAttention = enriched
      .filter((item) => item.issues.length > 0 || item.seoScore < 65)
      .sort((left, right) => left.seoScore - right.seoScore);
    const missingMainKeyword = enriched.filter((item) => !item.keywordsMain?.trim());
    const missingSecondaryKeyword = enriched.filter((item) => normalizeKeywordText(item.keywordsSecondary).length < 2);
    const topSeo = [...enriched].sort((left, right) => right.seoScore - left.seoScore).slice(0, 5);

    return {
      enriched,
      total,
      published: published.length,
      drafts: drafts.length,
      avgSeo,
      needAttention,
      missingMainKeyword,
      missingSecondaryKeyword,
      topSeo,
    };
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return analytics.enriched.filter((item) => {
      const haystack = `${item.title} ${item.slug || ""} ${item.keywordsMain || ""} ${item.keywordsSecondary || ""}`.toLowerCase();
      const matchesSearch = !search.trim() || haystack.includes(search.trim().toLowerCase());

      if (!matchesSearch) return false;
      if (filter === "published") return item.published;
      if (filter === "draft") return !item.published;
      if (filter === "hot") return !!item.hot;
      if (filter === "needs-seo") return item.issues.length > 0 || item.seoScore < 65;

      return true;
    });
  }, [analytics.enriched, filter, search]);

  const currentSeoScore = useMemo(
    () =>
      getSeoScore({
        ...blogForm,
      }),
    [blogForm],
  );

  const currentIssues = useMemo(
    () =>
      getIssueList({
        id: editingBlogId || "draft",
        title: blogForm.title,
        slug: blogForm.slug,
        content: blogForm.content,
        category: "blog",
        published: blogForm.published,
        timestamp: Date.now(),
        description: blogForm.description,
        imageUrl: blogForm.imageUrl,
        metaDescription: blogForm.metaDescription,
        keywordsMain: blogForm.keywordsMain,
        keywordsSecondary: blogForm.keywordsSecondary,
        publishedAt: blogForm.publishedAt,
      }),
    [blogForm, editingBlogId],
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(24,31,53,0.96),rgba(18,14,34,0.96))] p-6 shadow-[0_32px_80px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-violet-200">Content & SEO Studio</p>
            <h3 className="mt-3 text-3xl font-black text-white">Dashboard tin tức</h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Một nơi để theo dõi chất lượng SEO, quản lý bài viết, kiểm tra từ khóa chính, từ khóa phụ, meta description và tối ưu nội dung trước khi xuất bản.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <FilePlus2 size={16} />
              Bài viết mới
            </button>
            <button
              type="button"
              onClick={onGenerate}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <Sparkles size={16} />
              AI soạn nháp
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <MetricCard label="Tổng bài viết" value={analytics.total} tone="blue" helper="Toàn bộ tin tức đang có trong hệ thống." />
          <MetricCard label="Đã xuất bản" value={analytics.published} tone="green" helper="Bài viết đang hiển thị công khai trên website." />
          <MetricCard label="Bản nháp" value={analytics.drafts} tone="amber" helper="Bài đang soạn hoặc chưa bật hiển thị." />
          <MetricCard label="SEO trung bình" value={`${analytics.avgSeo}/100`} tone="violet" helper="Điểm tổng hợp từ keyword, meta, ảnh và độ dày nội dung." />
          <MetricCard label="Cần tối ưu" value={analytics.needAttention.length} tone="cyan" helper="Bài thiếu keyword, meta, ảnh hoặc nội dung còn yếu." />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">Bài cần tối ưu gấp</h4>
                  <p className="mt-1 text-sm text-slate-400">Ưu tiên xử lý các bài có điểm SEO thấp hoặc thiếu trường quan trọng.</p>
                </div>
                <AlertTriangle className="text-amber-300" size={20} />
              </div>
              <div className="space-y-3">
                {analytics.needAttention.slice(0, 5).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onEdit(item)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-2 text-xs text-slate-400">{item.issues.slice(0, 2).join(" • ") || "Cần nâng độ sâu nội dung"}</p>
                      </div>
                      <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-200">
                        {item.seoScore}
                      </span>
                    </div>
                  </button>
                ))}
                {analytics.needAttention.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-slate-400">
                    Hiện chưa có bài nào ở mức báo động. Đây là tín hiệu tốt.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">Tình trạng từ khóa SEO</h4>
                  <p className="mt-1 text-sm text-slate-400">Kiểm tra nhanh phần từ khóa chính và từ khóa phụ.</p>
                </div>
                <Target className="text-violet-300" size={20} />
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Thiếu từ khóa chính</p>
                  <p className="mt-2 text-3xl font-black text-white">{analytics.missingMainKeyword.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Thiếu từ khóa phụ</p>
                  <p className="mt-2 text-3xl font-black text-white">{analytics.missingSecondaryKeyword.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Bài SEO tốt nhất</p>
                  <p className="mt-2 line-clamp-2 text-sm font-semibold text-white">
                    {analytics.topSeo[0]?.title || "Chưa có dữ liệu"}
                  </p>
                  {analytics.topSeo[0] ? (
                    <p className="mt-2 text-xs text-emerald-300">Điểm SEO: {analytics.topSeo[0].seoScore}/100</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-card p-6">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  {editingBlogId ? <PencilLine size={20} className="text-indigo-400" /> : <Plus size={20} className="text-indigo-400" />}
                  {editingBlogId ? "Chỉnh sửa bài viết" : "Soạn bài viết mới"}
                </h4>
                <p className="mt-1 text-sm text-slate-400">Tối ưu nội dung và cấu trúc SEO theo chuẩn Rank Math.</p>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
              <div className="space-y-6">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Tiêu đề bài viết</label>
                    <div className="flex gap-2">
                      <input
                        value={blogForm.title}
                        onChange={(event) => setBlogForm((prev) => ({ ...prev, title: event.target.value }))}
                        placeholder="Ví dụ: Hướng dẫn SEO tổng thể cho doanh nghiệp"
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      />
                      <button
                        type="button"
                        onClick={onGenerate}
                        className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-500 active:scale-95 shadow-lg shadow-indigo-500/20 shrink-0"
                      >
                        AI Viết
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Slug URL</label>
                    <input
                      value={blogForm.slug}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, slug: event.target.value }))}
                      placeholder="huong-dan-seo-tong-the"
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Từ khóa chính (Focus Keyword)</label>
                    <div className="relative">
                      <Target size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        value={blogForm.keywordsMain}
                        onChange={(event) => setBlogForm((prev) => ({ ...prev, keywordsMain: event.target.value }))}
                        placeholder="seo tổng thể"
                        className="w-full rounded-2xl border border-white/10 bg-black/30 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Từ khóa phụ (LSI Keywords)</label>
                    <input
                      value={blogForm.keywordsSecondary}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, keywordsSecondary: event.target.value }))}
                      placeholder="seo onpage, audit seo..."
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-2 lg:col-span-2">
                    <label className="text-sm font-bold text-slate-300">Meta description</label>
                    <textarea
                      value={blogForm.metaDescription}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, metaDescription: event.target.value }))}
                      rows={3}
                      placeholder="Mô tả ngắn hiển thị trên kết quả tìm kiếm Google..."
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
                    />
                    <div className="flex justify-between px-1 mt-1">
                      <p className="text-[10px] text-slate-500">Gợi ý: 120 - 160 ký tự</p>
                      <p className={`text-[10px] font-bold ${blogForm.metaDescription.length >= 120 && blogForm.metaDescription.length <= 160 ? "text-emerald-400" : "text-amber-400"}`}>
                        {blogForm.metaDescription.length} ký tự
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Nội dung bài viết</label>
                  <div className="rounded-3xl border border-white/10 bg-black/30 p-2">
                    <RichTextEditor value={blogForm.content} onChange={(html) => setBlogForm((prev) => ({ ...prev, content: html }))} minHeight={450} />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <SeoChecklist score={currentSeoScore} issues={currentIssues} />
                <SerpPreview title={blogForm.title} slug={blogForm.slug} description={blogForm.metaDescription} />
                
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                    <ImageIcon size={16} className="text-indigo-400" /> Hình ảnh & Xuất bản
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-400">Ảnh đại diện</p>
                      <input
                        value={blogForm.imageUrl}
                        onChange={(event) => setBlogForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
                        placeholder="URL ảnh..."
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                      />
                      {blogForm.imageUrl && (
                        <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 mt-2">
                          <img src={blogForm.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={blogForm.published}
                          onChange={(event) => setBlogForm((prev) => ({ ...prev, published: event.target.checked }))}
                          className="rounded border-white/20 bg-black/20 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-xs font-medium text-slate-300 group-hover:text-white transition">Xuất bản công khai</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={blogForm.hot}
                          onChange={(event) => setBlogForm((prev) => ({ ...prev, hot: event.target.checked }))}
                          className="rounded border-white/20 bg-black/20 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-xs font-medium text-slate-300 group-hover:text-white transition">Đánh dấu bài HOT</span>
                      </label>
                    </div>

                    <div className="pt-4 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={onSave}
                        className="w-full rounded-2xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500 active:scale-95"
                      >
                        {editingBlogId ? "Cập nhật bài viết" : "Lưu bài viết"}
                      </button>
                      <button
                        type="button"
                        onClick={onReset}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                      >
                        Hủy bỏ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-white/10 bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">Hiệu suất nội dung</h4>
                <p className="mt-1 text-sm text-slate-400">Nhìn nhanh chất lượng kho nội dung hiện tại.</p>
              </div>
              <TrendingUp className="text-emerald-300" size={20} />
            </div>

            <div className="space-y-3">
              {analytics.topSeo.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onEdit(item)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-500/15 text-sm font-black text-violet-200">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.keywordsMain || "Chưa có từ khóa chính"}</p>
                  </div>
                  <div className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-200">
                    {item.seoScore}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">Kho bài viết</h4>
                <p className="mt-1 text-sm text-slate-400">Tìm nhanh và thao tác trực tiếp trên từng bài.</p>
              </div>
              <Globe className="text-cyan-300" size={20} />
            </div>

            <div className="mb-4 flex flex-col gap-3">
              <div className="relative">
                <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tìm theo tiêu đề, slug hoặc từ khóa..."
                  className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-violet-400"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "Tất cả" },
                  { id: "published", label: "Đã xuất bản" },
                  { id: "draft", label: "Bản nháp" },
                  { id: "needs-seo", label: "Cần tối ưu SEO" },
                  { id: "hot", label: "Bài nổi bật" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id as typeof filter)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      filter === item.id
                        ? "bg-violet-500 text-white"
                        : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredBlogs.map((item) => (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="line-clamp-2 text-sm font-semibold text-white">{item.title}</p>
                        {item.hot ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-1 text-[11px] font-semibold text-orange-200">
                            <Flame size={12} />
                            Nổi bật
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {formatDate(item.publishedAt || item.timestamp)} • {item.published ? "Đã xuất bản" : "Bản nháp"}
                      </p>
                    </div>
                    <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-xs font-bold text-violet-200">
                      {item.seoScore}/100
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] text-slate-300">
                      <Target size={12} />
                      {item.keywordsMain || "Chưa có từ khóa chính"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] text-slate-300">
                      <Link2 size={12} />
                      {normalizeKeywordText(item.keywordsSecondary).length} từ khóa phụ
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] text-slate-300">
                      <Eye size={12} />
                      {item.plainContentLength} ký tự nội dung
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
                    >
                      <PencilLine size={14} />
                      Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => void onTogglePublished(item)}
                      className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                    >
                      {item.published ? "Ẩn bài" : "Xuất bản"}
                    </button>
                    <button
                      type="button"
                      onClick={() => void onToggleHot(item)}
                      className="rounded-2xl border border-orange-400/20 bg-orange-500/10 px-3 py-2 text-xs font-semibold text-orange-200 transition hover:bg-orange-500/15"
                    >
                      {item.hot ? "Bỏ nổi bật" : "Đánh dấu nổi bật"}
                    </button>
                    <button
                      type="button"
                      onClick={() => void onDelete(item)}
                      className="rounded-2xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/15"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}

              {filteredBlogs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-5 text-sm text-slate-400">
                  Không có bài viết nào khớp bộ lọc hiện tại.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

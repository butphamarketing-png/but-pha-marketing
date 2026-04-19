"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Database,
  Eye,
  FilePlus2,
  Flame,
  Globe2,
  Image as ImageIcon,
  Link2,
  PencilLine,
  Search,
  Sparkles,
  Target,
  TrendingUp,
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

  const integrationCards = [
    {
      key: "searchConsole" as const,
      title: "Google Search Console",
      helper: "Dùng cho query, impression, click, CTR và vị trí trung bình.",
      icon: BarChart3,
    },
    {
      key: "ga4" as const,
      title: "Google Analytics 4",
      helper: "Dùng cho pageview, session, hành vi người dùng và landing page.",
      icon: Eye,
    },
    {
      key: "rankTracker" as const,
      title: "Rank Tracker / SERP API",
      helper: "Dùng để kéo lịch sử thứ hạng từ khóa theo ngày.",
      icon: TrendingUp,
    },
    {
      key: "siteCrawler" as const,
      title: "Website Crawler",
      helper: "Dùng để soi internal link, orphan page và cấu trúc liên kết nội bộ.",
      icon: Database,
    },
  ];

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
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-xl font-bold text-white">{editingBlogId ? "Chỉnh sửa bài viết" : "Soạn bài viết mới"}</h4>
                <p className="mt-1 text-sm text-slate-400">Giao diện tập trung cho nội dung, từ khóa và xuất bản.</p>
              </div>
              <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.22em] text-violet-200">Điểm SEO hiện tại</p>
                <p className="mt-1 text-2xl font-black text-white">{currentSeoScore}/100</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Tiêu đề bài viết</label>
                <div className="flex gap-2">
                  <input
                    value={blogForm.title}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, title: event.target.value }))}
                    placeholder="Ví dụ: Hướng dẫn SEO tổng thể cho doanh nghiệp địa phương"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                  />
                  <button
                    type="button"
                    onClick={onGenerate}
                    className="rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    AI viết
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Slug</label>
                <input
                  value={blogForm.slug}
                  onChange={(event) => setBlogForm((prev) => ({ ...prev, slug: event.target.value }))}
                  placeholder="huong-dan-seo-tong-the"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Từ khóa chính</label>
                <input
                  value={blogForm.keywordsMain}
                  onChange={(event) => setBlogForm((prev) => ({ ...prev, keywordsMain: event.target.value }))}
                  placeholder="seo tổng thể"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Từ khóa phụ</label>
                <input
                  value={blogForm.keywordsSecondary}
                  onChange={(event) => setBlogForm((prev) => ({ ...prev, keywordsSecondary: event.target.value }))}
                  placeholder="seo onpage, tối ưu website, audit seo"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                />
              </div>

              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-medium text-slate-200">Mô tả ngắn hiển thị ngoài danh sách</label>
                <textarea
                  value={blogForm.description}
                  onChange={(event) => setBlogForm((prev) => ({ ...prev, description: event.target.value }))}
                  rows={3}
                  placeholder="Tóm tắt ngắn gọn, rõ lợi ích và đúng ý định tìm kiếm."
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                />
              </div>

              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-medium text-slate-200">Meta description</label>
                <textarea
                  value={blogForm.metaDescription}
                  onChange={(event) => setBlogForm((prev) => ({ ...prev, metaDescription: event.target.value }))}
                  rows={3}
                  placeholder="Nên trong khoảng 120-160 ký tự, có từ khóa chính và lợi ích rõ ràng."
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Ngày xuất bản</label>
                <div className="relative">
                  <CalendarDays size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    value={blogForm.publishedAt}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, publishedAt: event.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-violet-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Ảnh đại diện</label>
                <div className="relative">
                  <ImageIcon size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={blogForm.imageUrl}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
                    placeholder="Dán URL ảnh hoặc dùng upload bên dưới"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-violet-400"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-xs text-slate-400"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => setBlogForm((prev) => ({ ...prev, imageUrl: String(reader.result || "") }));
                    reader.readAsDataURL(file);
                  }}
                />
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {currentIssues.length > 0 ? (
                  currentIssues.map((issue) => (
                    <span key={issue} className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
                      {issue}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Bản nháp này đang ở trạng thái tốt
                  </span>
                )}
              </div>
              <RichTextEditor value={blogForm.content} onChange={(html) => setBlogForm((prev) => ({ ...prev, content: html }))} minHeight={320} />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={blogForm.published}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, published: event.target.checked }))}
                  />
                  Hiển thị công khai
                </label>
                <label className="flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-200">
                  <input
                    type="checkbox"
                    checked={blogForm.hot}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, hot: event.target.checked }))}
                  />
                  Đánh dấu bài nổi bật
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onReset}
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Làm mới form
                </button>
                <button
                  type="button"
                  onClick={onSave}
                  className="rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  {editingBlogId ? "Cập nhật bài viết" : "Lưu bài viết"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-white/10 bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">Khung kết nối dữ liệu giai đoạn 2</h4>
                <p className="mt-1 text-sm text-slate-400">Hiện tại đây là nơi nhập cấu hình. Sau này chỉ cần điền thông tin kết nối thật là dùng được.</p>
              </div>
              <CheckCircle2 className="text-violet-300" size={20} />
            </div>

            <div className="space-y-4">
              {integrationCards.map((item) => {
                const config = settings.seoIntegrations[item.key];
                const Icon = item.icon;

                return (
                  <div key={item.key} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-200">
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{item.title}</p>
                          <p className="mt-1 text-sm text-slate-400">{item.helper}</p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                          config.status === "configured"
                            ? "bg-emerald-500/10 text-emerald-200"
                            : "bg-slate-500/10 text-slate-300"
                        }`}
                      >
                        {config.status === "configured" ? "Đã cấu hình" : "Chưa kết nối"}
                      </span>
                    </div>

                    <div className="grid gap-3">
                      <label className="flex items-center gap-2 text-sm text-slate-300">
                        <input
                          type="checkbox"
                          checked={config.enabled}
                          onChange={(event) =>
                            onUpdateIntegrations({
                              ...settings.seoIntegrations,
                              [item.key]: {
                                ...config,
                                enabled: event.target.checked,
                                status: event.target.checked && (config.propertyId || config.apiKey || config.siteUrl) ? "configured" : "disconnected",
                              },
                            })
                          }
                        />
                        Bật sẵn khung kết nối
                      </label>

                      <input
                        value={config.siteUrl}
                        onChange={(event) =>
                          onUpdateIntegrations({
                            ...settings.seoIntegrations,
                            [item.key]: {
                              ...config,
                              siteUrl: event.target.value,
                              status: event.target.value || config.propertyId || config.apiKey ? "configured" : "disconnected",
                            },
                          })
                        }
                        placeholder="Domain / site URL / endpoint"
                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                      />

                      <div className="grid gap-3 md:grid-cols-2">
                        <input
                          value={config.propertyId}
                          onChange={(event) =>
                            onUpdateIntegrations({
                              ...settings.seoIntegrations,
                              [item.key]: {
                                ...config,
                                propertyId: event.target.value,
                                status: event.target.value || config.apiKey || config.siteUrl ? "configured" : "disconnected",
                              },
                            })
                          }
                          placeholder="Property ID / Measurement ID"
                          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                        />
                        <input
                          value={config.apiKey}
                          onChange={(event) =>
                            onUpdateIntegrations({
                              ...settings.seoIntegrations,
                              [item.key]: {
                                ...config,
                                apiKey: event.target.value,
                                status: event.target.value || config.propertyId || config.siteUrl ? "configured" : "disconnected",
                              },
                            })
                          }
                          placeholder="API key / access token"
                          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                        />
                      </div>

                      <textarea
                        value={config.notes}
                        onChange={(event) =>
                          onUpdateIntegrations({
                            ...settings.seoIntegrations,
                            [item.key]: {
                              ...config,
                              notes: event.target.value,
                            },
                          })
                        }
                        rows={2}
                        placeholder="Ghi chú cấu hình, tài khoản, phạm vi quyền truy cập..."
                        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

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
              <Globe2 className="text-cyan-300" size={20} />
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

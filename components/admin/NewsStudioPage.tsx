"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LayoutDashboard, Link2, LogOut, Newspaper, Puzzle, RefreshCw, Settings, ShieldCheck, Sparkles, Target } from "lucide-react";
import { NewsDashboard } from "@/components/admin/NewsDashboard";
import { mergeNewsContentMeta } from "@/lib/news-content-meta";
import { deriveKeywordCandidates, slugify } from "@/lib/seo-studio-draft";
import { db, type NewsItem } from "@/lib/useData";

const SEOOverview = dynamic(() => import("@/components/admin/SEOOverview").then((module) => ({ default: module.SEOOverview })), {
  loading: () => <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-sm font-medium text-slate-500 shadow-sm">Dang tai tong quan SEO...</div>,
});

const SeoAutomationPanel = dynamic(() => import("@/components/admin/SeoAutomationPanel").then((module) => ({ default: module.SeoAutomationPanel })), {
  loading: () => <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-sm font-medium text-slate-500 shadow-sm">Dang tai SEO Autopilot...</div>,
});

const StudioSettings = dynamic(() => import("@/components/admin/StudioSettings").then((module) => ({ default: module.StudioSettings })), {
  loading: () => <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-sm font-medium text-slate-500 shadow-sm">Dang tai cai dat...</div>,
});

const NewsPluginsPanel = dynamic(() => import("@/components/admin/NewsPluginsPanel").then((module) => ({ default: module.NewsPluginsPanel })), {
  loading: () => <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-sm font-medium text-slate-500 shadow-sm">Dang tai plugin...</div>,
});

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

type AdminTab = "dashboard" | "news" | "plugins" | "settings";

const EMPTY_BLOG_FORM = (): BlogFormState => ({
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

export function NewsStudioPage() {
  const [blogs, setBlogs] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogSaveMessage, setBlogSaveMessage] = useState<string | null>(null);
  const [blogSaveError, setBlogSaveError] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState<BlogFormState>(EMPTY_BLOG_FORM);
  const [activeTab, setActiveTab] = useState<AdminTab>("news");
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
    setBlogForm(EMPTY_BLOG_FORM());
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

    const mainKeyword = blogForm.keywordsMain.trim() || deriveKeywordCandidates(title)[0] || title;
    const secondaryKeyword = blogForm.keywordsSecondary.trim() || deriveKeywordCandidates(title).slice(1, 3).join(", ") || "chiến lược tăng trưởng, marketing thực chiến";
    const generatedSlug = slugify(title);
    const generatedImageUrl = blogForm.imageUrl.trim() || `https://placehold.co/1600x900/12081f/f8fafc/png?text=${encodeURIComponent(mainKeyword)}`;

    const html = [
      `<h1>${title}</h1>`,
      `<figure><img src="${generatedImageUrl}" alt="${mainKeyword}" /><figcaption>Hình minh họa cho chủ đề ${mainKeyword}.</figcaption></figure>`,
      `<p><strong>Từ khóa chính:</strong> ${mainKeyword} &middot; <strong>Từ khóa phụ:</strong> ${secondaryKeyword}</p>`,
      `<h2>Mục lục</h2>`,
      `<ul><li><a href="#tong-quan">Tổng quan</a></li><li><a href="#giai-phap">Giải pháp triển khai</a></li><li><a href="#toi-uu-seo">Tối ưu SEO thực chiến</a></li></ul>`,
      `<h2 id="tong-quan">Tổng quan về ${mainKeyword}</h2>`,
      `<p>${mainKeyword} là trọng tâm giúp doanh nghiệp tăng chuyển đổi bền vững. Bài viết này cung cấp cách xây dựng chiến lược nội dung và quảng bá toàn diện.</p>`,
      `<h2 id="giai-phap">Giải pháp triển khai ${mainKeyword}</h2>`,
      `<h3>1. Phân tích thị trường</h3>`,
      `<p>Nghiên cứu chân dung khách hàng, insight và đối thủ để xác định thông điệp rõ ràng.</p>`,
      `<h3>2. Xây dựng nội dung chuẩn SEO</h3>`,
      `<p>Triển khai nội dung theo cụm chủ đề, tối ưu H1–H3, liên kết nội bộ và CTA chuyển đổi.</p>`,
      `<h3>3. Tối ưu chuyển đổi</h3>`,
      `<p>Kết hợp landing page, tracking và test A/B để cải thiện hiệu quả theo dữ liệu thực tế.</p>`,
      `<h2 id="toi-uu-seo">Tối ưu SEO thực chiến cho ${mainKeyword}</h2>`,
      `<p>Đặt từ khóa chính ở title, URL, 100 chữ đầu tiên và meta description. Bổ sung hình ảnh có ALT để tăng thời gian ở lại trang.</p>`,
      `<p>Internal link gợi ý: <a href="/facebook">Dịch vụ Facebook</a>, <a href="/website">Dịch vụ Website</a>.</p>`,
      `<h2 id="ket-luan">Kết luận</h2>`,
      `<p>Đầu tư đúng vào ${mainKeyword} sẽ giúp doanh nghiệp tăng trưởng bền vững. Liên hệ Bứt Phá Marketing để được tư vấn miễn phí!</p>`,
    ].join("\n");

    const metaDesc = `Giải pháp ${mainKeyword} chuyên sâu, tối ưu chuyển đổi và SEO bền vững cho doanh nghiệp.`;
    const desc = `Tổng hợp chiến lược ${mainKeyword} từ nền tảng đến tối ưu hiệu quả thực tế.`;

    setBlogForm((prev) => ({
      ...prev,
      metaTitle: prev.metaTitle || title,
      slug: prev.slug || generatedSlug,
      keywordsMain: prev.keywordsMain || mainKeyword,
      keywordsSecondary: prev.keywordsSecondary || secondaryKeyword,
      imageUrl: prev.imageUrl || generatedImageUrl,
      metaDescription: prev.metaDescription || metaDesc,
      description: prev.description || desc,
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

    setBlogSaveMessage(editingBlogId ? "Da cap nhat bai viet." : "Da tao bai viet moi.");
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

  const sidebarItems = [
    { label: "Tong quan", icon: LayoutDashboard, id: "dashboard" as const },
    { label: "Viet bai AI", icon: Sparkles, id: "news" as const, href: "/studio/create" },
    { label: "Co hoi noi dung", icon: Target, id: "news" as const, href: "/studio/opportunity-pro" },
    { label: "Bai viet", icon: Newspaper, id: "news" as const },
    { label: "Keyword & Rank", icon: Target, id: "news" as const, href: "/studio/keyword-rank" },
    { label: "AI Refresh", icon: RefreshCw, id: "news" as const, href: "/studio/dashboard" },
    { label: "Cluster & Topic", icon: Sparkles, id: "news" as const, href: "/studio/opportunity-pro" },
    { label: "Internal Links", icon: Link2, id: "news" as const, href: "/studio/dashboard" },
    { label: "Phan tich doi thu", icon: ShieldCheck, id: "dashboard" as const },
    { label: "Plugin", icon: Puzzle, id: "plugins" as const },
    { label: "Cai dat", icon: Settings, id: "settings" as const },
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
              <p className="text-xs text-slate-400">Quan tri tin tuc & SEO</p>
            </div>
          </div>

          <nav className="scrollbar-hide flex-1 space-y-1 overflow-y-auto px-4 py-5">
            {sidebarItems.map((item) => {
              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    activeTab === item.id ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
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
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-bold text-white">AD</div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">Admin</p>
                <p className="truncate text-[11px] text-slate-400">admin@butphamarketing.com</p>
              </div>
              <button className="ml-auto text-slate-400 transition hover:text-white">
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
                <h2 className="text-lg font-black text-slate-900">Quản lý bài viết</h2>
              </div>
              <Link href="/studio/create" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-bold text-white">
                <Sparkles size={14} />
                Tao bai
              </Link>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {sidebarItems.map((item) => {
                if (item.href) {
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
                    onClick={() => setActiveTab(item.id)}
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

          {activeTab === "plugins" && <NewsPluginsPanel />}
          {activeTab === "settings" && <StudioSettings />}
          {activeTab === "dashboard" && <SEOOverview />}
          {activeTab === "news" && (
            <div className="space-y-5">
              <SeoAutomationPanel />
              <div ref={editorRef}>
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
              </div>
            </div>
          )}
          {loading ? <div className="text-xs font-medium text-slate-400">Dang tai du lieu bai viet...</div> : null}
          {blogSaveError ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{blogSaveError}</div> : null}
          {blogSaveMessage ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{blogSaveMessage}</div> : null}
        </main>
      </div>
    </div>
  );
}

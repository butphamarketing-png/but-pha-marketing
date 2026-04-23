"use client";

import Link from "next/link";
import React from "react";
import { useMemo, useState } from "react";
import { CheckCircle2, Eye, FilePlus2, PencilLine, Search, Sparkles, Target, Trash2 } from "lucide-react";
import { RichTextEditor } from "@/components/shared/RichTextEditor";
import { NewsItem } from "@/lib/useData";

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
  onDelete: (item: NewsItem) => void | Promise<void>;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function formatDate(value?: string | number) {
  if (!value) return "Chua dat ngay";
  return new Date(value).toLocaleDateString("vi-VN");
}

function getSimpleSeoState(item: NewsItem) {
  const contentLength = stripHtml(item.content || "").length;
  const issues = [
    !(item.slug || "").trim(),
    !(item.metaDescription || "").trim(),
    !(item.keywordsMain || "").trim(),
    !(item.imageUrl || "").trim(),
    contentLength < 900,
  ].filter(Boolean).length;

  return {
    issues,
    contentLength,
    label: issues === 0 ? "On dinh" : issues <= 2 ? "Can xem lai" : "Can toi uu",
  };
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
  onDelete,
}: NewsDashboardProps) {
  const [filter, setFilter] = useState<"draft" | "published">("published");
  const [search, setSearch] = useState("");

  const filteredBlogs = useMemo(() => {
    return blogs.filter((item) => {
      const matchesState = filter === "published" ? item.published : !item.published;
      if (!matchesState) return false;
      const haystack = `${item.title} ${item.slug || ""} ${item.keywordsMain || ""} ${item.metaDescription || ""}`.toLowerCase();
      return !search.trim() || haystack.includes(search.trim().toLowerCase());
    });
  }, [blogs, filter, search]);

  const counts = useMemo(
    () => ({
      drafts: blogs.filter((item) => !item.published).length,
      published: blogs.filter((item) => item.published).length,
    }),
    [blogs],
  );

  return (
    <div className="space-y-5">
      <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">SEO Content Admin</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">Quan ly bai viet</h2>
            <p className="mt-2 text-sm text-slate-500">
              Chi hien thi ban nhap va bai da dang. Sua noi dung, thumbnail, slug, SEO title, keyword va mo ta ngay tai day.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/studio/create"
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
            >
              <Sparkles size={16} />
              SEO Studio
            </Link>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <FilePlus2 size={16} />
              Bai moi
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setFilter("published")}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              filter === "published" ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
            }`}
          >
            <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Da dang</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{counts.published}</p>
          </button>
          <button
            type="button"
            onClick={() => setFilter("draft")}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              filter === "draft" ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
            }`}
          >
            <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Ban nhap</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{counts.drafts}</p>
          </button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search size={16} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Tim trong ${filter === "published" ? "bai da dang" : "ban nhap"}...`}
              className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
            />
          </div>

          <div className="space-y-3">
            {filteredBlogs.map((item) => {
              const seoState = getSimpleSeoState(item);
              return (
                <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-black text-slate-900">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        /blog/{item.slug || "chua-co-slug"} • {formatDate(item.publishedAt || item.timestamp)}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${
                        item.published ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.published ? "Da dang" : "Nhap"}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-600">
                      <Target size={12} className="mr-1 inline" />
                      {item.keywordsMain || "Chua co keyword"}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-600">
                      SEO: {seoState.label}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-600">
                      {seoState.contentLength} ky tu
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                    >
                      <PencilLine size={14} />
                      Sua
                    </button>
                    <Link
                      href={`/studio/create?newsId=${item.id}`}
                      className="inline-flex items-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100"
                    >
                      <Sparkles size={14} />
                      SEO
                    </Link>
                    {item.slug ? (
                      <Link
                        href={`/blog/${item.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-bold text-cyan-700 transition hover:bg-cyan-100"
                      >
                        <Eye size={14} />
                        Xem
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => void onTogglePublished(item)}
                      className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                    >
                      {item.published ? "Chuyen ve nhap" : "Dang bai"}
                    </button>
                    <button
                      type="button"
                      onClick={() => void onDelete(item)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                    >
                      <Trash2 size={14} />
                      Xoa
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredBlogs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm font-medium text-slate-500">
                Chua co bai nao trong nhom nay.
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                {editingBlogId ? "Dang sua bai viet" : "Tao hoac sua nhanh"}
              </p>
              <h3 className="mt-2 text-xl font-black text-slate-900">
                {editingBlogId ? "Cap nhat bai viet" : "Bai viet moi"}
              </h3>
            </div>
            <button
              type="button"
              onClick={onGenerate}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              <Sparkles size={16} />
              AI viet nhap
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">Tieu de bai viet</label>
              <input
                value={blogForm.title}
                onChange={(event) => setBlogForm((prev) => ({ ...prev, title: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">SEO title</label>
              <input
                value={blogForm.metaTitle}
                onChange={(event) => setBlogForm((prev) => ({ ...prev, metaTitle: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Slug / link</label>
              <input
                value={blogForm.slug}
                onChange={(event) => setBlogForm((prev) => ({ ...prev, slug: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white"
              />
              <p className="text-[11px] text-slate-400">/blog/{blogForm.slug || "tu-dong-theo-tieu-de"}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Thumbnail URL</label>
              <input
                value={blogForm.imageUrl}
                onChange={(event) => setBlogForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Keyword chinh</label>
              <input
                value={blogForm.keywordsMain}
                onChange={(event) => setBlogForm((prev) => ({ ...prev, keywordsMain: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Keyword phu</label>
              <input
                value={blogForm.keywordsSecondary}
                onChange={(event) => setBlogForm((prev) => ({ ...prev, keywordsSecondary: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">Meta description</label>
              <textarea
                rows={3}
                value={blogForm.metaDescription}
                onChange={(event) => setBlogForm((prev) => ({ ...prev, metaDescription: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">Mo ta ngan</label>
              <textarea
                rows={3}
                value={blogForm.description}
                onChange={(event) => setBlogForm((prev) => ({ ...prev, description: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">Noi dung bai viet</label>
              <div className="rounded-3xl border border-slate-200 bg-white p-2">
                <RichTextEditor value={blogForm.content} onChange={(html) => setBlogForm((prev) => ({ ...prev, content: html }))} minHeight={360} />
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
              <input
                type="checkbox"
                checked={blogForm.published}
                onChange={(event) => setBlogForm((prev) => ({ ...prev, published: event.target.checked }))}
              />
              Dang cong khai
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onSave}
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
            >
              <CheckCircle2 size={16} />
              {editingBlogId ? "Cap nhat bai viet" : "Luu bai viet"}
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Huy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

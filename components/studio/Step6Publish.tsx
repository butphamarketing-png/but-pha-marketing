"use client";

import React, { useRef, useState } from "react";
import { Rocket, ArrowLeft, CheckCircle2, Globe, ImagePlus, Newspaper, Save, Send, Loader2 } from "lucide-react";
import { uploadMediaFile } from "@/lib/client-media-upload";

export function Step6Publish({
  data,
  setData,
  onPrev,
  onPublish,
  onSaveDraft,
  publishing,
  savingDraft,
  actionError,
  actionMessage,
}: any) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const images = Array.isArray(data.images) ? data.images : [];
  const thumbnailUrl = data.featuredImageUrl || images[0]?.url || "";

  const handleUploadThumbnail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploading(true);

    try {
      const result = await uploadMediaFile(file, {
        title: data.title,
        sectionLabel: "thumbnail",
        suggestedName: file.name,
      });

      const nextImages = [
        ...images.filter((item: any) => item.url !== result.url),
        {
          id: result.item?.id,
          url: result.url,
          name: result.item?.name || file.name,
          altText: data.title || file.name,
          sectionLabel: "Thumbnail",
        },
      ];

      setData({
        ...data,
        images: nextImages,
        featuredImageUrl: result.url,
      });
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Khong the tai anh len luc nay.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900">
            <Rocket className="text-indigo-600" />
            Kiem tra lan cuoi va xuat ban
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Chot slug, meta va thumbnail truoc khi dua bai viet len website.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Quay lai
          </button>
          <button
            onClick={onSaveDraft}
            disabled={savingDraft}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            {savingDraft ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" /> : <Save size={18} />}
            Luu nhap
          </button>
          <button
            onClick={onPublish}
            disabled={publishing}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 text-sm font-black text-white shadow-xl shadow-indigo-200 transition-all hover:bg-indigo-500 disabled:opacity-60"
          >
            {publishing ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <Send size={18} />}
            Xuat ban ngay
          </button>
        </div>
      </div>

      {(actionError || actionMessage || uploadError) && (
        <div
          className={`rounded-2xl border px-5 py-4 text-sm font-semibold ${
            actionError || uploadError ? "border-rose-200 bg-rose-50 text-rose-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {actionError || uploadError || actionMessage}
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUploadThumbnail} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">Anh dai dien</h3>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
              {uploading ? "Dang tai..." : "Tai tu may"}
            </button>
          </div>

          <div className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-[32px] border-4 border-white bg-gradient-to-br from-indigo-600 to-violet-700 p-10 shadow-2xl">
            {thumbnailUrl ? (
              <>
                <img src={thumbnailUrl} alt={data.title || "Thumbnail bai viet"} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/45" />
              </>
            ) : null}

            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-xs font-black text-white backdrop-blur-md">BPM</div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">But Pha Marketing</span>
            </div>

            <h2 className="relative z-10 text-3xl font-black leading-tight text-white drop-shadow-lg">
              {data.metaTitle || data.title || "Tieu de bai viet cua ban"}
            </h2>

            <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-6">
              <div className="flex items-center gap-2 text-xs font-bold text-white/80">
                <Globe size={14} />
                www.butphamarketing.com
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-white/80">
                <Newspaper size={14} />
                Blog SEO Studio
              </div>
            </div>
          </div>

          {images.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {images.map((image: any, index: number) => (
                <button
                  key={`${image.url}-${index}`}
                  type="button"
                  onClick={() => setData({ ...data, featuredImageUrl: image.url })}
                  className={`overflow-hidden rounded-2xl border-2 transition ${
                    thumbnailUrl === image.url ? "border-emerald-500" : "border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="aspect-video bg-slate-100">
                    <img src={image.url} alt={image.altText || image.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="px-3 py-2 text-left text-[11px] font-bold text-slate-700">
                    {thumbnailUrl === image.url ? "Dang la thumbnail" : image.name}
                  </div>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-lg font-black text-slate-900">Cau hinh hien thi</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Slug URL</label>
              <input
                value={data.slug}
                onChange={(event) => setData({ ...data, slug: event.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Meta title</label>
              <input
                value={data.metaTitle}
                onChange={(event) => setData({ ...data, metaTitle: event.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white"
              />
              <p className="text-[11px] text-slate-400">{(data.metaTitle || "").length}/60 ky tu goi y</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Meta description</label>
              <textarea
                rows={4}
                value={data.metaDescription}
                onChange={(event) => setData({ ...data, metaDescription: event.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white"
              />
              <p className="text-[11px] text-slate-400">{(data.metaDescription || "").length}/160 ky tu goi y</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Mo ta ngan</label>
              <textarea
                rows={3}
                value={data.description}
                onChange={(event) => setData({ ...data, description: event.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </div>

            <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30">
              <input
                type="checkbox"
                className="h-5 w-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500"
                checked={data.published}
                onChange={(event) => setData({ ...data, published: event.target.checked })}
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Hien thi cong khai</p>
                <p className="mt-0.5 text-[11px] text-slate-400">Bai viet se hien tren website sau khi xuat ban.</p>
              </div>
              <Globe size={20} className="text-slate-300" />
            </label>

            <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition hover:border-orange-100 hover:bg-orange-50/30">
              <input
                type="checkbox"
                className="h-5 w-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500"
                checked={data.hot}
                onChange={(event) => setData({ ...data, hot: event.target.checked })}
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Danh dau bai viet hot</p>
                <p className="mt-0.5 text-[11px] text-slate-400">Ghim bai viet len khu noi bat neu can.</p>
              </div>
              <Newspaper size={20} className="text-slate-300" />
            </label>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Ngay xuat ban</label>
              <input
                type="date"
                value={data.publishedAt}
                onChange={(event) => setData({ ...data, publishedAt: event.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4">
            <CheckCircle2 size={18} className="mt-0.5 text-emerald-500" />
            <p className="text-xs font-medium leading-relaxed text-emerald-700">
              Ban co the luu nhap de quay lai sua tiep, hoac xuat ban ngay khi slug, meta, anh dai dien va noi dung da san sang.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

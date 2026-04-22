"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ImageIcon,
  Loader2,
  RefreshCw,
  Save,
  Sparkles,
} from "lucide-react";

type OutlineItem = {
  level?: number;
  text?: string;
  heading?: string;
  summary?: string;
};

type GeneratedVariant = {
  id: string;
  b64Json: string;
  dataUrl: string;
  altText: string;
  suggestedName: string;
};

type SavedImage = {
  id?: number | string;
  url: string;
  name: string;
  altText?: string;
  prompt?: string;
  sectionLabel?: string;
};

function getSectionLabel(item: OutlineItem) {
  return item.text || item.heading || "Tổng quan bài viết";
}

function getSectionSummary(item: OutlineItem) {
  return item.summary || "";
}

export function Step4Images({ data, setData, onNext, onPrev }: any) {
  const outlineSections = useMemo<OutlineItem[]>(() => {
    if (!Array.isArray(data.outline) || data.outline.length === 0) {
      return [{ heading: "Tổng quan bài viết", summary: "Ảnh hero tổng quát cho bài viết." }];
    }
    return data.outline;
  }, [data.outline]);

  const [selectedSectionLabel, setSelectedSectionLabel] = useState(getSectionLabel(outlineSections[0]));
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [variants, setVariants] = useState<GeneratedVariant[]>([]);

  useEffect(() => {
    if (!outlineSections.some((item) => getSectionLabel(item) === selectedSectionLabel)) {
      setSelectedSectionLabel(getSectionLabel(outlineSections[0]));
    }
  }, [outlineSections, selectedSectionLabel]);

  const selectedSection = useMemo(
    () => outlineSections.find((item) => getSectionLabel(item) === selectedSectionLabel) || outlineSections[0],
    [outlineSections, selectedSectionLabel],
  );

  const savedImages = Array.isArray(data.images) ? (data.images as SavedImage[]) : [];

  useEffect(() => {
    if (!brief.trim()) {
      const autoBrief = [
        `Tạo ảnh minh họa cho bài viết "${data.title || "bài viết marketing"}".`,
        `Nhấn mạnh phần "${getSectionLabel(selectedSection)}".`,
        getSectionSummary(selectedSection) ? `Ngữ cảnh nội dung: ${getSectionSummary(selectedSection)}` : "",
        "Phong cách hiện đại, chuyên nghiệp, đáng tin, phù hợp website agency marketing.",
      ]
        .filter(Boolean)
        .join(" ");
      setBrief(autoBrief);
    }
  }, [data.title, selectedSection, brief]);

  async function handleGenerate() {
    if (!data.title?.trim()) {
      setError("Cần có tiêu đề bài viết trước khi tạo ảnh.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/generate-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          keywords: data.keywords || [],
          outline: outlineSections,
          sectionLabel: getSectionLabel(selectedSection),
          brief,
          variantCount: 4,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result?.error || "Không thể tạo ảnh AI.");
      }

      setPrompt(result.prompt || "");
      setVariants(Array.isArray(result.images) ? result.images : []);
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : "Không thể tạo ảnh AI.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveVariant(variant: GeneratedVariant) {
    setSavingId(variant.id);
    setError(null);

    try {
      const res = await fetch("/api/media/generated", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: variant.dataUrl,
          title: data.title,
          sectionLabel: getSectionLabel(selectedSection),
          suggestedName: variant.suggestedName,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result?.error || "Không thể lưu ảnh vào media.");
      }

      const nextImage: SavedImage = {
        id: result?.item?.id,
        url: result.url,
        name: variant.suggestedName,
        altText: variant.altText,
        prompt,
        sectionLabel: getSectionLabel(selectedSection),
      };

      setData({
        ...data,
        images: [...savedImages.filter((item) => item.url !== nextImage.url), nextImage],
      });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Không thể lưu ảnh vào media.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900">
            <ImageIcon className="text-indigo-600" />
            Tạo ảnh AI cho bài viết
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Nhập brief, tạo nhiều phương án ảnh minh họa, rồi lưu trực tiếp vào thư viện media.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-500"
          >
            Tiếp tục
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Nguồn tạo ảnh</p>
            <h3 className="mt-2 text-xl font-black text-slate-900">Brief và prompt</h3>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Section bài viết</label>
            <select
              value={selectedSectionLabel}
              onChange={(event) => setSelectedSectionLabel(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
            >
              {outlineSections.map((item, index) => (
                <option key={`${getSectionLabel(item)}-${index}`} value={getSectionLabel(item)}>
                  {getSectionLabel(item)}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">Tóm tắt section</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {getSectionSummary(selectedSection) || "Chưa có mô tả riêng cho section này. Hệ thống sẽ dùng tiêu đề section và keyword của bài viết để tạo ảnh."}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Brief cho ảnh</label>
            <textarea
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
              rows={8}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10"
              placeholder="Ví dụ: ảnh hero cho bài dịch vụ marketing, bối cảnh doanh nghiệp hiện đại, dashboard tăng trưởng, đội ngũ đang phân tích số liệu..."
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {loading ? "Đang tạo 4 phương án..." : "Tạo ảnh AI"}
          </button>

          {prompt ? (
            <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Prompt đã dùng</p>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-white disabled:opacity-50"
                >
                  <span className="inline-flex items-center gap-1">
                    <RefreshCw size={12} />
                    Tạo lại
                  </span>
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-words text-xs leading-6 text-slate-700">{prompt}</pre>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {error}
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Kết quả</p>
                <h3 className="mt-2 text-xl font-black text-slate-900">Các phương án ảnh AI</h3>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                {variants.length} ảnh
              </span>
            </div>

            {variants.length === 0 ? (
              <div className="mt-6 rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
                <p className="text-sm font-semibold text-slate-500">Chưa có ảnh nào được tạo.</p>
                <p className="mt-2 text-xs text-slate-400">
                  Chọn section, chỉnh brief rồi bấm tạo ảnh để nhận 4 phương án landscape phù hợp bài viết.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {variants.map((variant) => {
                  const alreadySaved = savedImages.some((item) => item.url === variant.dataUrl || item.name === variant.suggestedName);

                  return (
                    <div key={variant.id} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                      <div className="aspect-[3/2] bg-slate-100">
                        <img src={variant.dataUrl} alt={variant.altText} className="h-full w-full object-cover" />
                      </div>
                      <div className="space-y-3 p-4">
                        <p className="line-clamp-2 text-sm font-bold text-slate-900">{variant.suggestedName}</p>
                        <p className="text-xs leading-relaxed text-slate-500">{variant.altText}</p>
                        <button
                          onClick={() => handleSaveVariant(variant)}
                          disabled={savingId === variant.id}
                          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {savingId === variant.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : alreadySaved ? (
                            <Check size={16} className="text-emerald-600" />
                          ) : (
                            <Save size={16} />
                          )}
                          {savingId === variant.id ? "Đang lưu vào media..." : alreadySaved ? "Đã lưu vào media" : "Lưu vào media"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Đã chọn</p>
                <h3 className="mt-2 text-xl font-black text-slate-900">Ảnh đã lưu vào media</h3>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                {savedImages.length} ảnh
              </span>
            </div>

            {savedImages.length === 0 ? (
              <div className="mt-6 rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm font-medium text-slate-500">
                Chưa có ảnh nào được lưu. Khi bạn lưu một phương án, ảnh sẽ được ghi vào media và thêm vào bài viết hiện tại.
              </div>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {savedImages.map((image, index) => (
                  <div key={`${image.url}-${index}`} className="overflow-hidden rounded-[22px] border border-slate-200 bg-white">
                    <div className="aspect-[3/2] bg-slate-100">
                      <img src={image.url} alt={image.altText || image.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-2 p-4">
                      <p className="text-sm font-bold text-slate-900">{image.name}</p>
                      <p className="text-xs text-slate-500">{image.sectionLabel || "Chưa gán section"}</p>
                      <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">{image.altText || "Chưa có ALT text"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

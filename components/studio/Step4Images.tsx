"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ImageIcon,
  ImagePlus,
  Loader2,
  RefreshCw,
  Save,
  Sparkles,
} from "lucide-react";
import { uploadMediaFile } from "@/lib/client-media-upload";
import { slugify } from "@/lib/seo-studio-draft";

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
  sectionId?: string;
};

type MediaLibraryItem = {
  id?: number | string;
  url: string;
  name: string;
};

function getSectionLabel(item: OutlineItem) {
  return item.text || item.heading || "Tổng quan bài viết";
}

function getSectionSummary(item: OutlineItem) {
  return item.summary || "";
}

function getSectionId(item: OutlineItem) {
  return slugify(getSectionLabel(item));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildFigureMarkup(image: SavedImage) {
  const alt = image.altText || image.name || image.sectionLabel || "Hình minh hoạ";
  const caption = image.sectionLabel || image.name || alt;
  return `<figure><img src="${image.url}" alt="${alt}" /><figcaption>${caption}</figcaption></figure>`;
}

function ensureSectionAnchors(content: string, sections: OutlineItem[]) {
  let nextContent = content || "";
  sections.forEach((section) => {
    const label = getSectionLabel(section);
    const sectionId = getSectionId(section);
    const escaped = escapeRegExp(label);
    const withIdRegex = new RegExp(`<h[23][^>]*id=["']${escapeRegExp(sectionId)}["'][^>]*>\\s*${escaped}\\s*<\\/h[23]>`, "i");
    if (withIdRegex.test(nextContent)) return;
    const headingRegex = new RegExp(`(<h([23])([^>]*)>\\s*${escaped}\\s*<\\/h\\2>)`, "i");
    nextContent = nextContent.replace(headingRegex, `<h$2 id="${sectionId}"$3>${label}</h$2>`);
  });
  return nextContent;
}

function insertImageBySection(content: string, image: SavedImage, sections: OutlineItem[]) {
  const anchoredContent = ensureSectionAnchors(content, sections);
  const figure = buildFigureMarkup(image);
  if (!anchoredContent?.trim()) return figure;
  if (anchoredContent.includes(`src="${image.url}"`)) return anchoredContent;

  const sectionId = (image.sectionId || "").trim();
  if (sectionId) {
    const headingRegex = new RegExp(`(<h[23][^>]*id=["']${escapeRegExp(sectionId)}["'][^>]*>.*?<\\/h[23]>)`, "i");
    if (headingRegex.test(anchoredContent)) {
      return anchoredContent.replace(headingRegex, `$1${figure}`);
    }
  }

  const firstHeadingRegex = /(<h[23][^>]*>.*?<\/h[23]>)/i;
  if (firstHeadingRegex.test(anchoredContent)) {
    return anchoredContent.replace(firstHeadingRegex, `$1${figure}`);
  }

  const firstParagraphRegex = /(<p[^>]*>.*?<\/p>)/i;
  if (firstParagraphRegex.test(anchoredContent)) {
    return anchoredContent.replace(firstParagraphRegex, `$1${figure}`);
  }

  return `${anchoredContent}${figure}`;
}

export function Step4Images({ data, setData, onNext, onPrev }: any) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
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
  const [uploading, setUploading] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState<MediaLibraryItem[]>([]);

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
        `Tạo ảnh minh hoạ cho bài viết "${data.title || "bài viết marketing"}".`,
        `Nhấn mạnh phần "${getSectionLabel(selectedSection)}".`,
        getSectionSummary(selectedSection) ? `Ngữ cảnh nội dung: ${getSectionSummary(selectedSection)}` : "",
        "Phong cách hiện đại, chuyên nghiệp, đáng tin, phù hợp website agency marketing.",
      ]
        .filter(Boolean)
        .join(" ");
      setBrief(autoBrief);
    }
  }, [data.title, selectedSection, brief]);

  useEffect(() => {
    let cancelled = false;
    const loadMedia = async () => {
      try {
        const response = await fetch("/api/media", { cache: "no-store" });
        const payload = (await response.json().catch(() => [])) as MediaLibraryItem[];
        if (!cancelled) {
          setMediaLibrary(Array.isArray(payload) ? payload : []);
        }
      } catch {
        if (!cancelled) {
          setMediaLibrary([]);
        }
      }
    };
    void loadMedia();
    return () => {
      cancelled = true;
    };
  }, [savedImages.length]);

  function applySavedImage(nextImage: SavedImage) {
    setData((prev: any) => {
      const prevImages = Array.isArray(prev.images) ? (prev.images as SavedImage[]) : [];
      return {
        ...prev,
        images: [...prevImages.filter((item) => item.url !== nextImage.url && item.name !== nextImage.name), nextImage],
        featuredImageUrl: prev.featuredImageUrl || nextImage.url,
        content: insertImageBySection(prev.content || "", nextImage, outlineSections),
      };
    });
  }

  async function saveGeneratedVariant(variant: GeneratedVariant, promptValue: string, showSaving = true) {
    if (showSaving) setSavingId(variant.id);
    const optimisticImage: SavedImage = {
      id: variant.id,
      url: variant.dataUrl,
      name: variant.suggestedName,
      altText: variant.altText,
      prompt: promptValue,
      sectionLabel: getSectionLabel(selectedSection),
      sectionId: getSectionId(selectedSection),
    };
    applySavedImage(optimisticImage);

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
        prompt: promptValue,
        sectionLabel: getSectionLabel(selectedSection),
        sectionId: getSectionId(selectedSection),
      };

      setData((prev: any) => {
        const prevImages = Array.isArray(prev.images) ? (prev.images as SavedImage[]) : [];
        const contentWithPermanentUrl = (prev.content || "").replaceAll(variant.dataUrl, nextImage.url);
        return {
          ...prev,
          images: [...prevImages.filter((item) => item.url !== variant.dataUrl && item.url !== nextImage.url && item.name !== nextImage.name), nextImage],
          featuredImageUrl: prev.featuredImageUrl === variant.dataUrl ? nextImage.url : prev.featuredImageUrl || nextImage.url,
          content: insertImageBySection(contentWithPermanentUrl, nextImage, outlineSections),
        };
      });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Không thể lưu ảnh vào media.");
    } finally {
      if (showSaving) setSavingId(null);
    }
  }

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

      const generatedImages = Array.isArray(result.images) ? result.images : [];
      const nextPrompt = result.prompt || "";
      setPrompt(result.prompt || "");
      setVariants(generatedImages);

      if (generatedImages[0]) {
        await saveGeneratedVariant(generatedImages[0], nextPrompt, true);
      }
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
      await saveGeneratedVariant(variant, prompt, false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Không thể lưu ảnh vào media.");
    } finally {
      setSavingId(null);
    }
  }

  async function handleUploadLocalImage(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const result = await uploadMediaFile(file, {
            title: data.title,
            sectionLabel: getSectionLabel(selectedSection),
            suggestedName: file.name,
          });

          return {
            id: result.item?.id,
            url: result.url,
            name: result.item?.name || file.name,
            altText: data.title || file.name,
            sectionLabel: getSectionLabel(selectedSection),
            sectionId: getSectionId(selectedSection),
          } satisfies SavedImage;
        }),
      );

      setData((prev: any) => {
        const prevImages = Array.isArray(prev.images) ? (prev.images as SavedImage[]) : [];
        return {
          ...prev,
          images: [...prevImages, ...uploaded.filter((item) => !prevImages.some((saved) => saved.url === item.url))],
          featuredImageUrl: prev.featuredImageUrl || uploaded[0]?.url || "",
          content: uploaded.reduce((currentContent, image) => insertImageBySection(currentContent, image, outlineSections), prev.content || ""),
        };
      });
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Không thể tải ảnh lên lúc này.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function setAsThumbnail(image: SavedImage) {
    setData((prev: any) => ({
      ...prev,
      featuredImageUrl: image.url,
    }));
  }

  function addFromLibrary(item: MediaLibraryItem) {
    const nextImage: SavedImage = {
      id: item.id,
      url: item.url,
      name: item.name,
      altText: data.title || item.name,
      sectionLabel: getSectionLabel(selectedSection),
      sectionId: getSectionId(selectedSection),
    };

    applySavedImage(nextImage);
  }

  function insertIntoContent(image: SavedImage) {
    setData((prev: any) => ({
      ...prev,
      content: insertImageBySection(prev.content || "", image, outlineSections),
    }));
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900">
            <ImageIcon className="text-indigo-600" />
            Tạo ảnh cho bài viết
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Bạn có thể tạo ảnh AI hoặc tải ảnh từ máy, sau đó đặt làm thumbnail hoặc chèn vào nội dung.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onPrev} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50">
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <button onClick={onNext} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-500">
            Tiếp tục
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Nguồn ảnh</p>
            <h3 className="mt-2 text-xl font-black text-slate-900">Brief và upload</h3>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Section bài viết</label>
            <select value={selectedSectionLabel} onChange={(event) => setSelectedSectionLabel(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10">
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
              {getSectionSummary(selectedSection) || "Chưa có mô tả riêng cho section này. Hệ thống sẽ dựa vào section và keyword của bài viết."}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Brief cho ảnh AI</label>
            <textarea value={brief} onChange={(event) => setBrief(event.target.value)} rows={8} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10" placeholder="Ví dụ: ảnh hero cho bài dịch vụ marketing, bối cảnh doanh nghiệp hiện đại..." />
          </div>
          <button onClick={handleGenerate} disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {loading ? "Đang tạo ảnh..." : "Tạo ảnh AI"}
          </button>
          <button onClick={() => uploadInputRef.current?.click()} disabled={uploading} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImagePlus size={18} />}
            {uploading ? "Đang tải ảnh..." : "Tải ảnh từ máy"}
          </button>
          <input ref={uploadInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUploadLocalImage} />
          {prompt ? (
            <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Prompt đã dùng</p>
                <button onClick={handleGenerate} disabled={loading} className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-white disabled:opacity-50">
                  <span className="inline-flex items-center gap-1">
                    <RefreshCw size={12} />
                    Tạo lại
                  </span>
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-words text-xs leading-6 text-slate-700">{prompt}</pre>
            </div>
          ) : null}
          {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Kết quả</p>
                <h3 className="mt-2 text-xl font-black text-slate-900">Các phương án ảnh AI</h3>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{variants.length} ảnh</span>
            </div>
            {variants.length === 0 ? (
              <div className="mt-6 rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
                <p className="text-sm font-semibold text-slate-500">Chưa có ảnh AI nào được tạo.</p>
                <p className="mt-2 text-xs text-slate-400">Bạn có thể tạo ảnh AI hoặc tải ảnh từ máy ở cột bên trái.</p>
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
                        <button onClick={() => handleSaveVariant(variant)} disabled={savingId === variant.id} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">
                          {savingId === variant.id ? <Loader2 size={16} className="animate-spin" /> : alreadySaved ? <Check size={16} className="text-emerald-600" /> : <Save size={16} />}
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
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Thư viện media</p>
                <h3 className="mt-2 text-xl font-black text-slate-900">Ảnh đã upload</h3>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{mediaLibrary.length} ảnh</span>
            </div>
            {mediaLibrary.length === 0 ? (
              <div className="mt-6 rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm font-medium text-slate-500">Chưa có ảnh nào trong media.</div>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {mediaLibrary.slice(0, 12).map((image) => (
                  <div key={`${image.id}-${image.url}`} className="overflow-hidden rounded-[22px] border border-slate-200 bg-white">
                    <div className="aspect-square bg-slate-100">
                      <img src={image.url} alt={image.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-2 p-3">
                      <p className="line-clamp-2 text-xs font-bold text-slate-900">{image.name}</p>
                      <button type="button" onClick={() => addFromLibrary(image)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50">Thêm vào bài viết</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Đã chọn</p>
                <h3 className="mt-2 text-xl font-black text-slate-900">Ảnh đã lưu vào bài viết</h3>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">{savedImages.length} ảnh</span>
            </div>
            {savedImages.length === 0 ? (
              <div className="mt-6 rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm font-medium text-slate-500">Chưa có ảnh nào được lưu. Khi bạn lưu một phương án hoặc tải ảnh từ máy, ảnh sẽ được thêm vào bài viết hiện tại.</div>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {savedImages.map((image, index) => (
                  <div key={`${image.url}-${index}`} className="overflow-hidden rounded-[22px] border border-slate-200 bg-white">
                    <div className="aspect-[3/2] bg-slate-100">
                      <img src={image.url} alt={image.altText || image.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-2 p-4">
                      <p className="text-sm font-bold text-slate-900">{image.name}</p>
                      <p className="text-xs text-slate-500">{image.sectionLabel || "Chưa gắn section"}</p>
                      <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">{image.altText || "Chưa có ALT text"}</p>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button type="button" onClick={() => setAsThumbnail(image)} className={`rounded-2xl px-3 py-2 text-xs font-bold transition ${data.featuredImageUrl === image.url ? "bg-emerald-100 text-emerald-700" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
                          {data.featuredImageUrl === image.url ? "Đang là thumbnail" : "Đặt làm thumbnail"}
                        </button>
                        <button type="button" onClick={() => insertIntoContent(image)} className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50">Chèn vào nội dung</button>
                      </div>
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

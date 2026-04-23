"use client";

import React, { useRef, useState } from "react";
import { FileText, ArrowLeft, ArrowRight, ImagePlus, Loader2, Wand2 } from "lucide-react";
import { RichTextEditor } from "@/components/shared/RichTextEditor";
import { uploadMediaFile } from "@/lib/client-media-upload";

export function Step3Article({ data, setData, onNext, onPrev }: any) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleInsertImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploading(true);

    try {
      const result = await uploadMediaFile(file, {
        title: data.title,
        sectionLabel: "noi-dung",
        suggestedName: file.name,
      });

      const imageBlock = `<figure><img src="${result.url}" alt="${data.title || file.name}" /><figcaption>${data.title || file.name}</figcaption></figure>`;
      const nextImages = [
        ...(Array.isArray(data.images) ? data.images : []),
        {
          id: result.item?.id,
          url: result.url,
          name: result.item?.name || file.name,
          altText: data.title || file.name,
          sectionLabel: "Noi dung bai viet",
        },
      ];

      setData({
        ...data,
        content: `${data.content || ""}${imageBlock}`,
        images: nextImages,
        featuredImageUrl: data.featuredImageUrl || result.url,
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
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <FileText className="text-indigo-600" />
            Nội dung bài viết chi tiết
          </h2>
          <p className="text-sm text-slate-500 mt-1">AI đã hoàn thành bản nháp dựa trên dàn ý. Bạn có thể chỉnh sửa lại giọng văn.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onPrev} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Wand2 size={18} />
            AI Rewrite
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-60"
          >
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImagePlus size={18} />}
            Chen anh tu may
          </button>
          <button 
            onClick={onNext}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all"
          >
            Tiếp tục
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleInsertImage} />

      {uploadError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-semibold text-rose-700">
          {uploadError}
        </div>
      ) : null}

      <div className="rounded-[32px] border border-slate-100 bg-slate-50/30 p-2 min-h-[500px]">
        <RichTextEditor
          value={data.content}
          onChange={(html) => setData({ ...data, content: html })}
          uploadTitle={data.title}
        />
      </div>
    </div>
  );
}

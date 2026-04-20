"use client";

import React from "react";
import { FileText, ArrowLeft, ArrowRight, Save, Wand2 } from "lucide-react";
import { RichTextEditor } from "@/components/shared/RichTextEditor";

export function Step3Article({ data, setData, onNext, onPrev }: any) {
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
            onClick={onNext}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all"
          >
            Tiếp tục
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-100 bg-slate-50/30 p-2 min-h-[500px]">
        <RichTextEditor
          content={data.content}
          onChange={(html) => setData({ ...data, content: html })}
        />
      </div>
    </div>
  );
}

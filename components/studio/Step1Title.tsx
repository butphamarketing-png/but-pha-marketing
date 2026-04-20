"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export function Step1Title({ data, setData, onNext }: any) {
  const [loading, setLoading] = useState(false);

  const handleGenerateOutline = async () => {
    if (!data.title.trim()) return;
    setLoading(true);
    
    try {
      const res = await fetch("/api/ai/outline", {
        method: "POST",
        body: JSON.stringify({ title: data.title }),
      });
      const result = await res.json();
      setData({ ...data, outline: result.structure, keywords: result.keywords });
      onNext();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-[28px] bg-indigo-50 text-indigo-600 mb-2">
          <Sparkles size={40} />
        </div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">Bắt đầu bài viết với AI</h2>
        <p className="text-slate-500">Chỉ cần nhập tiêu đề, AI sẽ phân tích keyword, search intent và đề xuất dàn ý bài viết tối ưu SEO.</p>
      </div>

      <div className="space-y-6 bg-slate-50 p-8 rounded-[32px] border border-slate-100">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Nhập tiêu đề bài viết</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="VD: Dịch vụ chạy quảng cáo Facebook giá rẻ..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-lg font-bold text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/5 shadow-sm"
          />
        </div>

        <button
          onClick={handleGenerateOutline}
          disabled={loading || !data.title.trim()}
          className="w-full flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 py-5 text-lg font-black text-white shadow-xl shadow-indigo-100 transition hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-3 border-white border-t-transparent" />
          ) : (
            <>
              Tạo dàn ý bằng AI
              <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
        
        <p className="text-center text-xs text-slate-400 font-medium italic">
          Gợi ý: Hãy nhập tiêu đề chứa từ khóa chính để AI phân tích tốt nhất.
        </p>
      </div>
    </div>
  );
}

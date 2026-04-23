"use client";

import React, { useState } from "react";
import { ListOrdered, ArrowLeft, ArrowRight, Plus, Trash2, GripVertical, Sparkles } from "lucide-react";

export function Step2Outline({ data, setData, onNext, onPrev }: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEditOutline = (index: number, text: string) => {
    const newOutline = [...data.outline];
    newOutline[index].text = text;
    setData({ ...data, outline: newOutline });
  };

  const handleAddSection = (index: number) => {
    const newOutline = [...data.outline];
    newOutline.splice(index + 1, 0, { level: 2, text: "Tiêu đề mới" });
    setData({ ...data, outline: newOutline });
  };

  const handleRemoveSection = (index: number) => {
    const newOutline = [...data.outline];
    newOutline.splice(index, 1);
    setData({ ...data, outline: newOutline });
  };

  const handleGenerateArticle = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          outline: data.outline,
          keywords: data.keywords,
        }),
      });
      if (!res.ok) {
        const result = await res.json().catch(() => null);
        throw new Error(result?.error || "Không thể viết bài bằng AI.");
      }
      const result = await res.json();
      setData({ ...data, content: result.content });
      onNext();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Không thể viết bài bằng AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <ListOrdered className="text-indigo-600" />
            Kiểm tra dàn ý bài viết
          </h2>
          <p className="text-sm text-slate-500 mt-1">Bạn có thể chỉnh sửa, thêm hoặc xóa các đề mục trước khi AI viết bài.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onPrev} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <button 
            onClick={handleGenerateArticle} 
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all"
          >
            {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <Sparkles size={18} />}
            Viết bài chi tiết
          </button>
        </div>
        {error ? <p className="text-center text-sm font-medium text-rose-600">{error}</p> : null}
      </div>

      <div className="space-y-4 max-w-3xl mx-auto py-4">
        {data.outline.map((item: any, index: number) => (
          <div key={index} className="group relative flex items-center gap-4 pl-4 transition-all">
            <div className="text-slate-300 cursor-grab active:cursor-grabbing group-hover:text-slate-400">
              <GripVertical size={20} />
            </div>
            
            <div className={`flex-1 rounded-2xl border bg-white p-4 shadow-sm transition-all group-hover:border-indigo-200 group-hover:shadow-md ${
              item.level === 3 ? "ml-8 border-slate-100" : "border-slate-200"
            }`}>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                  item.level === 2 ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500"
                }`}>
                  H{item.level}
                </span>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => handleEditOutline(index, e.target.value)}
                  className="flex-1 bg-transparent text-sm font-bold text-slate-800 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleAddSection(index)}
                className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                <Plus size={18} />
              </button>
              <button 
                onClick={() => handleRemoveSection(index)}
                className="rounded-lg p-2 text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => handleAddSection(data.outline.length - 1)}
          className="w-full mt-6 rounded-2xl border-2 border-dashed border-slate-200 py-4 text-sm font-bold text-slate-400 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Thêm đề mục mới
        </button>
      </div>
    </div>
  );
}

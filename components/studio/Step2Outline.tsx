"use client";

import React, { useState } from "react";
import { AlertCircle, ArrowLeft, Plus, Trash2, GripVertical, Sparkles } from "lucide-react";

export function Step2Outline({ data, setData, onNext, onPrev, onHistoryChange }: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detail, setDetail] = useState("");
  const [hint, setHint] = useState("");

  const handleEditOutline = (index: number, text: string) => {
    const newOutline = [...data.outline];
    newOutline[index].text = text;
    setData({ ...data, outline: newOutline, aiError: null });
  };

  const handleAddSection = (index: number) => {
    const newOutline = [...data.outline];
    newOutline.splice(index + 1, 0, { level: 2, text: "Tieu de moi" });
    setData({ ...data, outline: newOutline, aiError: null });
  };

  const handleRemoveSection = (index: number) => {
    const newOutline = [...data.outline];
    newOutline.splice(index, 1);
    setData({ ...data, outline: newOutline, aiError: null });
  };

  const handleGenerateArticle = async () => {
    setLoading(true);
    setError("");
    setDetail("");
    setHint("");
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
      const result = await res.json().catch(() => null);
      if (!res.ok) {
        throw {
          message: result?.error || "Khong the viet bai bang AI.",
          detail: result?.detail || "",
          hint: result?.hint || "",
          provider: result?.provider || "openai",
        };
      }
      setData({ ...data, content: result.content, aiError: null });
      if (onHistoryChange) {
        await onHistoryChange().catch(() => undefined);
      }
      onNext();
    } catch (err: any) {
      console.error(err);
      const nextError = err?.message || "Khong the viet bai bang AI.";
      const nextDetail = err?.detail || "";
      const nextHint = err?.hint || "";
      setError(nextError);
      setDetail(nextDetail);
      setHint(nextHint);
      setData({
        ...data,
        aiError: {
          message: nextError,
          detail: nextDetail,
          hint: nextHint,
          provider: err?.provider || "openai",
        },
      });
      if (onHistoryChange) {
        await onHistoryChange().catch(() => undefined);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-100 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900">
              <GripVertical className="text-indigo-600" />
              Kiem tra dan y bai viet
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Ban co the chinh sua, them hoac xoa cac de muc truoc khi AI viet bai.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onPrev} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50">
              <ArrowLeft size={18} />
              Quay lai
            </button>
            <button
              onClick={handleGenerateArticle}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-500 disabled:opacity-50"
            >
              {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <Sparkles size={18} />}
              Viet bai chi tiet
            </button>
          </div>
        </div>

        {(error || detail || hint) && (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4">
            <p className="flex items-center gap-2 text-sm font-black text-rose-700">
              <AlertCircle size={16} />
              {error || "Khong the viet bai bang AI."}
            </p>
            {detail ? <p className="mt-2 text-sm leading-6 text-rose-700">{detail}</p> : null}
            {hint ? <p className="mt-3 text-xs font-semibold text-rose-800">Goi y: {hint}</p> : null}
          </div>
        )}

        {data.searchIntent || data.serpInsight ? (
          <div className="mt-4 grid gap-4 rounded-[28px] border border-slate-100 bg-slate-50 p-5 lg:grid-cols-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Search Intent</p>
              <p className="mt-2 text-sm font-bold capitalize text-slate-800">{data.searchIntent || "commercial"}</p>
              {data.serpInsight ? <p className="mt-1 text-xs text-slate-500">Nguon: {data.serpInsight.source}</p> : null}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Keyword goi y</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(data.serpInsight?.relatedKeywords || data.keywords || []).slice(0, 6).map((item: string, index: number) => (
                  <span key={`${item}-${index}`} className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mx-auto max-w-3xl space-y-4 py-4">
        {data.outline.map((item: any, index: number) => (
          <div key={index} className="group relative flex items-center gap-4 pl-4 transition-all">
            <div className="cursor-grab text-slate-300 group-hover:text-slate-400 active:cursor-grabbing">
              <GripVertical size={20} />
            </div>

            <div
              className={`flex-1 rounded-2xl border bg-white p-4 shadow-sm transition-all group-hover:border-indigo-200 group-hover:shadow-md ${
                item.level === 3 ? "ml-8 border-slate-100" : "border-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                    item.level === 2 ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500"
                  }`}
                >
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

            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button onClick={() => handleAddSection(index)} className="rounded-lg p-2 text-emerald-600 transition-colors hover:bg-emerald-50">
                <Plus size={18} />
              </button>
              <button onClick={() => handleRemoveSection(index)} className="rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={() => handleAddSection(data.outline.length - 1)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 py-4 text-sm font-bold text-slate-400 transition-all hover:border-indigo-200 hover:bg-indigo-50/30 hover:text-indigo-600"
        >
          <Plus size={18} />
          Them de muc moi
        </button>
      </div>
    </div>
  );
}

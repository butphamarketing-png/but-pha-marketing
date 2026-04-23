"use client";

import React, { useState } from "react";
import { AlertCircle, ArrowRight, Sparkles } from "lucide-react";

export function Step1Title({ data, setData, onNext, onHistoryChange }: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detail, setDetail] = useState("");
  const [hint, setHint] = useState("");

  const handleGenerateOutline = async () => {
    if (!data.title.trim()) return;
    setLoading(true);
    setError("");
    setDetail("");
    setHint("");

    try {
      const res = await fetch("/api/ai/outline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: data.title }),
      });
      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw {
          message: result?.error || "Khong the tao dan y AI.",
          detail: result?.detail || "",
          hint: result?.hint || "",
          provider: result?.provider || "openai",
        };
      }

      setData({
        ...data,
        outline: result?.structure || [],
        keywords: result?.keywords || [],
        searchIntent: result?.intent || "",
        serpInsight: result?.serpInsight || null,
        aiError: null,
      });
      if (onHistoryChange) {
        await onHistoryChange().catch(() => undefined);
      }
      onNext();
    } catch (err: any) {
      console.error(err);
      const nextError = err?.message || "Khong the tao dan y AI.";
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
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-4 text-center">
        <div className="mb-2 inline-flex h-20 w-20 items-center justify-center rounded-[28px] bg-indigo-50 text-indigo-600">
          <Sparkles size={40} />
        </div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">Bat dau bai viet voi AI</h2>
        <p className="text-slate-500">Chi can nhap tieu de, AI se phan tich keyword, search intent va de xuat dan y bai viet toi uu SEO.</p>
      </div>

      {(error || detail || hint) && (
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-5 text-left">
          <p className="flex items-center gap-2 text-sm font-black text-rose-700">
            <AlertCircle size={16} />
            {error || "Khong the tao dan y AI."}
          </p>
          {detail ? <p className="mt-2 text-sm leading-6 text-rose-700">{detail}</p> : null}
          {hint ? <p className="mt-3 text-xs font-semibold text-rose-800">Goi y: {hint}</p> : null}
        </div>
      )}

      <div className="space-y-6 rounded-[32px] border border-slate-100 bg-slate-50 p-8">
        <div className="space-y-2">
          <label className="ml-1 text-sm font-bold text-slate-700">Nhap tieu de bai viet</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value, aiError: null })}
            placeholder="VD: Dich vu chay quang cao Facebook gia re..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-lg font-bold text-slate-900 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/5"
          />
        </div>

        <button
          onClick={handleGenerateOutline}
          disabled={loading || !data.title.trim()}
          className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 py-5 text-lg font-black text-white shadow-xl shadow-indigo-100 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-3 border-white border-t-transparent" />
          ) : (
            <>
              Tao dan y bang AI
              <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>

        <p className="text-center text-xs font-medium italic text-slate-400">Goi y: Hay nhap tieu de chua tu khoa chinh de AI phan tich tot nhat.</p>
      </div>
    </div>
  );
}

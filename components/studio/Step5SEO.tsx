"use client";

import React, { useState, useEffect } from "react";
import { Target, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from "lucide-react";

export function Step5SEO({ data, setData, onNext, onPrev }: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void handleAnalyze();
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/seo/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: data.content, title: data.title }),
      });
      if (!res.ok) {
        const result = await res.json().catch(() => null);
        throw new Error(result?.error || "Khong the phan tich SEO luc nay.");
      }
      const result = await res.json();
      setData({ ...data, seoScore: result.score, seoIssues: result.issues });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Khong the phan tich SEO luc nay.");
    } finally {
      setLoading(false);
    }
  };

  const relatedKeywords = (data.serpInsight?.relatedKeywords?.length ? data.serpInsight.relatedKeywords : data.keywords || []).slice(0, 6);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900">
            <Target className="text-indigo-600" />
            Toi uu hoa SEO Checklist
          </h2>
          <p className="mt-1 text-sm text-slate-500">He thong AI phan tich noi dung va dua ra cac de xuat cai thien diem SEO.</p>
          {error ? <p className="mt-2 text-sm font-medium text-rose-600">{error}</p> : null}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onPrev} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50">
            <ArrowLeft size={18} />
            Quay lai
          </button>
          <button onClick={handleAnalyze} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50">
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            Phan tich lai
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-500"
          >
            Hoan tat
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900">Checklist van de ({data.seoIssues.length})</h3>
          {data.seoIssues.map((issue: any) => (
            <div key={issue.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`rounded-xl p-2 ${issue.status === "critical" ? "bg-rose-50 text-rose-500" : "bg-orange-50 text-orange-500"}`}>
                  <AlertCircle size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{issue.label}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">Uu tien: {issue.status === "critical" ? "Cao" : "Trung binh"}</p>
                </div>
              </div>
              {issue.fixable && (
                <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800">
                  <Sparkles size={14} />
                  Sua nhanh
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-slate-50/50 p-8">
            <h3 className="mb-4 text-lg font-black text-slate-900">Goi y tu khoa lien quan</h3>
            <div className="flex flex-wrap gap-3">
              {relatedKeywords.map((kw: string) => (
                <div key={kw} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  {kw}
                </div>
              ))}
              {relatedKeywords.length === 0 ? <p className="text-xs italic text-slate-400">Chua co goi y tu khoa de hien thi.</p> : null}
            </div>
          </div>

          <div className="rounded-[32px] border border-indigo-100 bg-indigo-50/30 p-8">
            <h3 className="mb-2 text-lg font-black text-indigo-900">Tom tat SEO Score</h3>
            <p className="text-sm leading-relaxed text-indigo-700">
              Diem SEO hien tai cua ban la <strong>{data.seoScore}/100</strong>. De dat diem tot hon, hay dam bao tu khoa chinh xuat hien trong heading som,
              bai viet co noi dung day du va it nhat 2 lien ket noi bo.
            </p>
            {data.searchIntent ? <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-indigo-600">Intent uu tien: {data.searchIntent}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

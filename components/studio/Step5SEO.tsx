"use client";

import React, { useState, useEffect } from "react";
import { Target, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from "lucide-react";

export function Step5SEO({ data, setData, onNext, onPrev }: any) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleAnalyze();
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/seo/analyze", {
        method: "POST",
        body: JSON.stringify({ content: data.content, title: data.title }),
      });
      const result = await res.json();
      setData({ ...data, seoScore: result.score, seoIssues: result.issues });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Target className="text-indigo-600" />
            Tối ưu hóa SEO Checklist
          </h2>
          <p className="text-sm text-slate-500 mt-1">Hệ thống AI phân tích nội dung và đưa ra các đề xuất cải thiện điểm SEO.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onPrev} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <button onClick={handleAnalyze} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            Phân tích lại
          </button>
          <button 
            onClick={onNext}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all"
          >
            Hoàn tất
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900">Checklist vấn đề ({data.seoIssues.length})</h3>
          {data.seoIssues.map((issue: any) => (
            <div key={issue.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`rounded-xl p-2 ${issue.status === 'critical' ? 'bg-rose-50 text-rose-500' : 'bg-orange-50 text-orange-500'}`}>
                  <AlertCircle size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{issue.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Ưu tiên: {issue.status === 'critical' ? 'Cao' : 'Trung bình'}</p>
                </div>
              </div>
              {issue.fixable && (
                <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800">
                  <Sparkles size={14} />
                  Sửa nhanh
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-slate-50/50 p-8">
            <h3 className="text-lg font-black text-slate-900 mb-4">Gợi ý từ khóa liên quan</h3>
            <div className="flex flex-wrap gap-3">
              {["agency marketing", "seo thực chiến", "tối ưu chuyển đổi", "chiến lược nội dung", "facebook ads pro"].map((kw) => (
                <div key={kw} className="flex items-center gap-2 rounded-xl bg-white border border-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  {kw}
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-[32px] border border-indigo-100 bg-indigo-50/30 p-8">
            <h3 className="text-lg font-black text-indigo-900 mb-2">Tóm tắt SEO Score</h3>
            <p className="text-sm text-indigo-700 leading-relaxed">
              Điểm SEO hiện tại của bạn là **{data.seoScore}/100**. Để đạt được điểm tối đa, hãy đảm bảo rằng từ khóa chính xuất hiện trong **Heading 2** đầu tiên và bài viết có ít nhất **2 liên kết nội bộ**.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

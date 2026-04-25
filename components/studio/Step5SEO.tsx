"use client";

import React, { useEffect, useState } from "react";
import { Target, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Sparkles, RefreshCw, Link2 } from "lucide-react";

type InternalLinkItem = {
  slug: string;
  title: string;
  anchorText: string;
  reason: string;
  score: number;
};

export function Step5SEO({ data, setData, onNext, onPrev }: any) {
  const [loading, setLoading] = useState(false);
  const [autoFixing, setAutoFixing] = useState(false);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [internalLinks, setInternalLinks] = useState<InternalLinkItem[]>([]);

  useEffect(() => {
    void handleAnalyze();
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    try {
      const [analyzeRes, linksRes] = await Promise.all([
        fetch("/api/seo/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: data.content,
            title: data.title,
            metaDescription: data.metaDescription,
            slug: data.slug,
            keywords: data.keywords,
          }),
        }),
        fetch("/api/seo/internal-link-suggestions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: data.title,
            content: data.content,
            slug: data.slug,
            keywords: data.keywords,
          }),
        }),
      ]);

      if (!analyzeRes.ok) {
        const result = await analyzeRes.json().catch(() => null);
        throw new Error(result?.error || "Khong the phan tich SEO luc nay.");
      }

      const analyzeResult = await analyzeRes.json();
      setData({ ...data, seoScore: analyzeResult.score, seoIssues: analyzeResult.issues });
      setMetrics(analyzeResult.metrics || {});

      if (linksRes.ok) {
        const linksResult = await linksRes.json().catch(() => null);
        setInternalLinks(Array.isArray(linksResult?.items) ? linksResult.items : []);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Khong the phan tich SEO luc nay.");
    } finally {
      setLoading(false);
    }
  };

  const insertInternalLink = (item: InternalLinkItem) => {
    const anchor = item.anchorText || item.title;
    const linkHtml = `<a href="/blog/${item.slug}">${anchor}</a>`;
    setData({
      ...data,
      content: `${data.content || ""}<p>${linkHtml}</p>`,
    });
  };

  const relatedKeywords = (data.serpInsight?.relatedKeywords?.length ? data.serpInsight.relatedKeywords : data.keywords || []).slice(0, 8);

  const handleAutoFix = async () => {
    setAutoFixing(true);
    setError("");
    try {
      const response = await fetch("/api/seo/autofix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          description: data.description,
          slug: data.slug,
          content: data.content,
          keywords: data.keywords,
          imageUrls: Array.isArray(data.images) ? data.images.map((item: any) => item?.url).filter(Boolean) : [],
          internalLinks,
          serviceKeywords: data.serpInsight?.relatedKeywords || data.keywords || [],
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "Khong the tu sua SEO luc nay.");
      }

      const nextImages = Array.isArray(data.images)
        ? data.images.map((item: any, index: number) => ({
            ...item,
            altText: result.images?.[index]?.altText || item.altText,
          }))
        : [];

      setData({
        ...data,
        title: result.title,
        slug: result.slug,
        description: result.description,
        metaTitle: result.metaTitle,
        metaDescription: result.metaDescription,
        content: result.content,
        keywords: result.keywords,
        images: nextImages,
        seoScore: result.evaluation?.score || data.seoScore,
        seoIssues: result.evaluation?.issues || data.seoIssues,
      });
      setMetrics(result.evaluation?.metrics || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Khong the tu sua SEO luc nay.");
    } finally {
      setAutoFixing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900">
            <Target className="text-indigo-600" />
            Toi uu hoa SEO Checklist
          </h2>
          <p className="mt-1 text-sm text-slate-500">He thong phan tich title, meta, heading, anh, link va noi dung de dua ra diem SEO thuc te hon.</p>
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
          <button onClick={handleAutoFix} className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 transition-colors hover:bg-indigo-100">
            <Sparkles size={18} className={autoFixing ? "animate-pulse" : ""} />
            {autoFixing ? "Dang tu sua" : "Tu sua tat ca"}
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

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
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
                {issue.fixable ? (
                  <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">Co the sua</span>
                ) : null}
              </div>
            ))}
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Internal link suggestions</h3>
              <Link2 size={18} className="text-slate-300" />
            </div>
            {internalLinks.length === 0 ? (
              <p className="text-sm text-slate-400">Chua tim thay internal link phu hop hoac bai viet da co du link.</p>
            ) : (
              <div className="space-y-3">
                {internalLinks.map((item) => (
                  <div key={`${item.slug}-${item.anchorText}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-sm font-bold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">Anchor goi y: {item.anchorText}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.reason}</p>
                    <button
                      type="button"
                      onClick={() => insertInternalLink(item)}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                      <Sparkles size={14} />
                      Chen vao noi dung
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-slate-50/50 p-8">
            <h3 className="mb-4 text-lg font-black text-slate-900">Metrics SEO</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: "Title", value: `${metrics.titleLength || 0} ky tu` },
                { label: "Meta", value: `${metrics.metaLength || 0} ky tu` },
                { label: "So tu", value: metrics.wordCount || 0 },
                { label: "H1", value: metrics.h1Count || 0 },
                { label: "H2", value: metrics.h2Count || 0 },
                { label: "H3", value: metrics.h3Count || 0 },
                { label: "Anh", value: metrics.imageCount || 0 },
                { label: "Anh co alt", value: metrics.imagesWithAlt || 0 },
                { label: "Internal links", value: metrics.blogInternalLinks || 0 },
                { label: "Outbound links", value: metrics.outboundLinks || 0 },
                { label: "Mat do tu khoa", value: `${metrics.density || 0}%` },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-100 bg-white p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-lg font-black text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

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
              Diem SEO hien tai cua ban la <strong>{data.seoScore}/100</strong>. He thong dang uu tien title, meta, heading, do dai bai, alt anh va internal links.
            </p>
            {data.searchIntent ? <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-indigo-600">Intent uu tien: {data.searchIntent}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

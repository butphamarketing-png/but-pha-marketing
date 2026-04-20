"use client";

import React, { useState } from "react";
import {
  Search,
  Zap,
  Target,
  BarChart3,
  ArrowUpRight,
  TrendingUp,
  FileEdit,
  Sparkles,
  Globe,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Filter,
  RefreshCw,
  Info
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function OpportunityProPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [location, setLocation] = useState("Vietnam");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setData(null);
    
    try {
      const res = await fetch("/api/content-opportunity-pro/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, location }),
      });
      
      if (!res.ok) throw new Error("Phân tích thất bại");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi kết nối tới máy chủ. Vui lòng kiểm tra API Key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-slate-900 pb-20">
      <div className="mx-auto max-w-[1600px] px-8 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Cơ hội nội dung</h1>
            <p className="text-slate-500 mt-1 font-medium">Khám phá từ khóa và ý tưởng bài viết để lên top tìm kiếm và đánh bại đối thủ cạnh tranh.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">
              <Globe size={18} className="text-slate-400" />
              {location}
            </div>
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-8 py-3 text-sm font-black text-white shadow-xl shadow-indigo-100 hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
              Phân tích
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10 max-w-4xl">
          <Search size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            placeholder="Nhập chủ đề bạn muốn SEO (VD: seo nha khoa, marketing bất động sản...)"
            className="w-full rounded-[28px] border-none bg-white py-6 pl-16 pr-8 text-lg font-bold text-slate-900 shadow-2xl shadow-indigo-100 outline-none ring-2 ring-transparent transition focus:ring-indigo-500/20"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs font-bold text-slate-400">
             Mất khoảng 8 giây để phân tích <Info size={14} />
          </div>
        </div>

        {!data && !loading && (
          <div className="flex flex-col items-center justify-center py-20 opacity-40">
            <Target size={80} className="text-indigo-600 mb-6" />
            <p className="text-xl font-black">Hãy nhập một chủ đề để bắt đầu khám phá cơ hội</p>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="h-[400px] rounded-[32px] bg-white border border-slate-100 animate-pulse"></div>
            <div className="h-[400px] rounded-[32px] bg-white border border-slate-100 animate-pulse"></div>
          </div>
        )}

        {data && !loading && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Keyword Opportunities Table */}
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-slate-900">Cơ hội từ khóa</h2>
                <Link href="#" className="text-sm font-bold text-indigo-600 hover:underline">Xem tất cả</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-4">Từ khóa</th>
                      <th className="pb-4">Lượng tìm kiếm</th>
                      <th className="pb-4">Độ khó</th>
                      <th className="pb-4">Điểm Cơ hội</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.keywords.map((kw: any, i: number) => (
                      <tr key={i} className="group transition hover:bg-slate-50/50">
                        <td className="py-5 font-bold text-slate-800">{kw.keyword}</td>
                        <td className="py-5 font-medium text-slate-500">{kw.volume >= 1000 ? `${(kw.volume/1000).toFixed(1)}K` : kw.volume}</td>
                        <td className="py-5">
                          <span className={`rounded-lg px-3 py-1 text-xs font-bold ${
                            kw.difficulty < 40 ? "bg-emerald-50 text-emerald-600" :
                            kw.difficulty < 60 ? "bg-orange-50 text-orange-600" : "bg-rose-50 text-rose-600"
                          }`}>
                            {kw.difficulty}
                          </span>
                        </td>
                        <td className="py-5">
                          <div className={`flex items-center gap-2 font-black text-lg ${
                            kw.opportunityScore > 80 ? "text-emerald-500" : "text-slate-400"
                          }`}>
                            {kw.opportunityScore}
                            {kw.trend === 'up' && <TrendingUp size={16} className="text-emerald-500" />}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Content Gap & Insights */}
            <div className="space-y-8">
              <div className="rounded-[32px] border border-violet-100 bg-violet-50/30 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-xl bg-violet-600 p-2 text-white">
                    <Sparkles size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-900">Khoảng trống nội dung</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-black text-slate-800 mb-3 flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                      Thiếu sót:
                    </p>
                    <ul className="space-y-2 ml-4">
                      {data.contentGaps.missingTopics.map((topic: string, i: number) => (
                        <li key={i} className="text-sm text-slate-600 font-medium flex items-start gap-2">
                          <span className="text-violet-400 mt-1">•</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-black text-slate-800 mb-3 flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      Điểm yếu của đối thủ:
                    </p>
                    <ul className="space-y-2 ml-4">
                      {data.contentGaps.weaknesses.map((weak: string, i: number) => (
                        <li key={i} className="text-sm text-slate-600 font-medium flex items-start gap-2">
                          <span className="text-rose-400 mt-1">•</span>
                          {weak}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Article Suggestions */}
              <div className="rounded-[32px] border border-orange-100 bg-orange-50/30 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-orange-500 p-2 text-white">
                      <FileEdit size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-900">Đề xuất bài viết</h2>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </div>
                
                <div className="space-y-4">
                  {data.suggestions.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:shadow-md">
                      <div className="flex-1 min-w-0 pr-4">
                        <h3 className="text-sm font-black text-slate-900 line-clamp-1">{item.title}</h3>
                        <p className="text-[11px] text-slate-400 mt-1 font-bold uppercase tracking-wider">{item.keyword}</p>
                      </div>
                      <button 
                        onClick={() => router.push(`/studio/create?title=${encodeURIComponent(item.title)}`)}
                        className="rounded-xl bg-orange-100 px-4 py-2 text-xs font-black text-orange-600 hover:bg-orange-500 hover:text-white transition-all whitespace-nowrap"
                      >
                        Viết ngay
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

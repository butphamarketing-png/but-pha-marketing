"use client";

import React, { useEffect, useState } from "react";
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Target, 
  Eye, 
  TrendingDown, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Plus,
  RefreshCw,
  Search,
  Download,
  Calendar
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Link from "next/link";

interface DashboardData {
  totalPosts: number;
  publishedPosts: number;
  needsUpdate: number;
  avgSeoScore: number;
  traffic: string;
  changes: {
    totalPosts: number;
    publishedPosts: number;
    needsUpdate: number;
    avgSeoScore: number;
    traffic: number;
  };
  priorityPosts: Array<{
    id: number;
    title: string;
    problem: string;
    metric: string;
    status: "critical" | "warning" | "info";
  }>;
  droppingPosts: Array<{ id: number; title: string; keyword: string; oldRank: number; newRank: number }>;
  risingPosts: Array<{ id: number; title: string; keyword: string; oldRank: number; newRank: number }>;
  trend: Array<{ date: string; score: number; rank: number }>;
}

export function SEOOverview() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/overview")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  const kpiCards = [
    { label: "Tổng bài viết", value: data.totalPosts, change: data.changes.totalPosts, icon: FileText, color: "blue" },
    { label: "Bài đã xuất bản", value: data.publishedPosts, change: data.changes.publishedPosts, icon: CheckCircle2, color: "green" },
    { label: "Bài cần cập nhật", value: data.needsUpdate, change: data.changes.needsUpdate, icon: AlertTriangle, color: "orange", warning: true },
    { label: "SEO Score trung bình", value: `${data.avgSeoScore}/100`, change: data.changes.avgSeoScore, icon: Target, color: "purple" },
    { label: "Traffic ước tính", value: data.traffic, change: data.changes.traffic, icon: Eye, color: "teal" },
  ];

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Tổng quan hiệu suất nội dung & SEO toàn bộ website.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm">
            <Calendar size={18} className="text-slate-400" />
            7 ngày qua
          </div>
          <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
            <Download size={18} />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {kpiCards.map((card, i) => (
          <div key={i} className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className={`rounded-2xl p-3 ${
                card.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                card.color === 'green' ? 'bg-emerald-50 text-emerald-600' :
                card.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                card.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                'bg-teal-50 text-teal-600'
              }`}>
                <card.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${card.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {card.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(card.change)}{typeof card.change === 'number' && card.label === 'Traffic ước tính' ? '%' : ''}
              </div>
            </div>
            <p className="text-sm font-bold text-slate-500">{card.label}</p>
            <p className={`mt-1 text-2xl font-black tracking-tight ${card.warning ? 'text-orange-600' : 'text-slate-900'}`}>
              {card.value}
            </p>
            <p className="mt-1 text-[10px] text-slate-400 font-medium">so với tuần trước</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Priority Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-[32px] border border-orange-100 bg-orange-50/50 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-orange-100 p-2 text-orange-600">
                  <AlertTriangle size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-900">{data.priorityPosts.length} Bài viết cần ưu tiên xử lý!</h2>
              </div>
              <Link href="#" className="text-sm font-bold text-orange-600 hover:underline">Xem tất cả</Link>
            </div>
            
            <div className="space-y-3">
              {data.priorityPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-slate-50 p-2 text-slate-400">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{post.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          post.status === 'critical' ? 'bg-rose-50 text-rose-600' : 
                          post.status === 'warning' ? 'bg-orange-50 text-orange-600' : 
                          'bg-blue-50 text-blue-600'
                        }`}>
                          {post.problem}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">Metric: {post.metric}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800">
                    <Sparkles size={14} />
                    Fix bằng AI
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-black text-slate-900">Xu hướng SEO toàn site</h2>
                <p className="text-xs text-slate-500 mt-1">Mô phỏng theo chất lượng SEO hiện tại của kho bài viết.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SEO Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rank Score</span>
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.trend}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRank" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                  />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  <Area type="monotone" dataKey="rank" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRank)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Side Lists */}
        <div className="space-y-6">
          {/* Dropping Posts */}
          <div className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-slate-900">Bài viết đang tụt hạng</h2>
              <div className="rounded-lg bg-rose-50 p-1.5 text-rose-500">
                <TrendingDown size={18} />
              </div>
            </div>
            <div className="space-y-4">
              {data.droppingPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between group">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{post.keyword}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-xs font-bold text-slate-400">{post.oldRank}</span>
                    <ArrowRight size={12} className="text-slate-300" />
                    <span className="text-sm font-black text-rose-600">{post.newRank}</span>
                    <TrendingDown size={14} className="text-rose-500" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 rounded-2xl border border-slate-100 py-3 text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">
              Xem chi tiết báo cáo
            </button>
          </div>

          {/* Rising Posts */}
          <div className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-slate-900">Bài viết đang tăng hạng</h2>
              <div className="rounded-lg bg-emerald-50 p-1.5 text-emerald-500">
                <TrendingUp size={18} />
              </div>
            </div>
            <div className="space-y-4">
              {data.risingPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between group">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{post.keyword}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-xs font-bold text-slate-400">{post.oldRank}</span>
                    <ArrowRight size={12} className="text-slate-300" />
                    <span className="text-sm font-black text-emerald-600">{post.newRank}</span>
                    <TrendingUp size={14} className="text-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 rounded-2xl border border-slate-100 py-3 text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">
              Tối ưu thêm bài viết
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-fit px-6">
        <div className="flex items-center gap-2 rounded-[28px] border border-white/20 bg-white/80 p-2 shadow-2xl backdrop-blur-xl">
          <Link href="/studio/create" className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500">
            <Plus size={18} />
            Tạo bài mới
          </Link>
          <button className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-400">
            <Sparkles size={18} />
            Viết bài với AI
          </button>
          <button className="flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-400">
            <RefreshCw size={18} />
            Refresh bài tụt
          </button>
          <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800">
            <Search size={18} />
            Phân tích đối thủ
          </button>
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          <button className="rounded-2xl border border-slate-200 p-3 text-slate-400 hover:bg-slate-50 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

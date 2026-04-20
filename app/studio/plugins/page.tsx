"use client";

import React, { useState, useEffect } from "react";
import { 
  Puzzle, 
  Sparkles, 
  Target, 
  Link2, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck,
  Zap,
  Lock,
  Search,
  ArrowRight,
  Info
} from "lucide-react";

interface Plugin {
  key: string;
  name: string;
  description: string;
  category: "AI" | "SEO" | "SYSTEM";
  isCore: boolean;
  enabled: boolean;
  dependencies: string[];
}

export default function PluginsPage() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchPlugins();
  }, []);

  const fetchPlugins = async () => {
    try {
      // In a real app, this would be: 
      // const res = await fetch("/api/plugins/workspace");
      // const data = await res.json();
      
      // Mocking for now
      setTimeout(() => {
        const mockPlugins: Plugin[] = [
          {
            key: "ai_content",
            name: "AI Content Writer",
            description: "Tự động tạo nội dung nháp, gợi ý ý tưởng bài viết và tối ưu giọng văn theo thương hiệu.",
            category: "AI",
            isCore: true,
            enabled: true,
            dependencies: [],
          },
          {
            key: "seo_analyzer",
            name: "SEO Analyzer",
            description: "Đánh giá SEO realtime, gợi ý tối ưu hóa từ khóa, cấu trúc bài viết.",
            category: "SEO",
            isCore: false,
            enabled: true,
            dependencies: [],
          },
          {
            key: "internal_link",
            name: "Internal Linking",
            description: "Tự động gợi ý liên kết nội bộ thông minh để tăng thứ hạng.",
            category: "SEO",
            isCore: false,
            enabled: true,
            dependencies: [],
          },
          {
            key: "ai_refresh",
            name: "AI Refresh",
            description: "Phân tích SERP, làm mới bài viết tụt hạng.",
            category: "AI",
            isCore: false,
            enabled: false,
            dependencies: ["seo_analyzer"],
          },
          {
            key: "rank_tracker",
            name: "Rank Tracker",
            description: "Theo dõi thứ hạng từ khóa tự động hàng ngày.",
            category: "SEO",
            isCore: false,
            enabled: true,
            dependencies: [],
          }
        ];
        setPlugins(mockPlugins);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error(err);
    }
  };

  const togglePlugin = async (pluginKey: string, currentStatus: boolean) => {
    // Optimistic UI update
    setPlugins(prev => prev.map(p => {
      if (p.key === pluginKey) return { ...p, enabled: !currentStatus };
      return p;
    }));

    try {
      // await fetch(`/api/plugins/${currentStatus ? 'disable' : 'enable'}`, {
      //   method: "POST",
      //   body: JSON.stringify({ pluginKey }),
      // });
      // await fetchPlugins(); // Refresh to catch dependency changes
    } catch (err) {
      console.error(err);
      // Revert if failed
      fetchPlugins();
    }
  };

  const filteredPlugins = plugins.filter(p => {
    if (filter === "all") return true;
    return p.category.toLowerCase() === filter.toLowerCase();
  });

  const getIcon = (key: string) => {
    switch (key) {
      case "ai_content": return <Sparkles size={24} />;
      case "seo_analyzer": return <Target size={24} />;
      case "internal_link": return <Link2 size={24} />;
      case "ai_refresh": return <RefreshCw size={24} />;
      case "rank_tracker": return <Search size={24} />;
      default: return <Puzzle size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-slate-900 pb-20">
      <div className="mx-auto max-w-[1400px] px-8 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-xl bg-indigo-600 p-2 text-white">
                <Puzzle size={24} />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Plugin Center</h1>
            </div>
            <p className="text-slate-500">Mở rộng tính năng, điều chỉnh tiêu chuẩn AI, và quản lý SEO với hệ thống plugin thông minh.</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3 text-sm font-bold text-slate-500 shadow-sm">
            <ShieldCheck size={18} className="text-emerald-500" />
            Chỉ admin mới bật/tắt được plugin
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8">
          {["all", "AI", "SEO", "SYSTEM"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 text-sm font-bold rounded-2xl transition ${
                filter === f ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f === "all" ? "Tất cả" : f}
            </button>
          ))}
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-2xl bg-white text-indigo-600 border border-indigo-100 hover:bg-indigo-50">
            <Zap size={18} />
            Marketplace
          </button>
        </div>

        {/* Plugin Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[250px] rounded-[32px] bg-white border border-slate-100 animate-pulse"></div>
            ))
          ) : filteredPlugins.map((plugin) => (
            <div 
              key={plugin.key} 
              className={`group relative flex flex-col rounded-[32px] border bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 ${
                plugin.enabled ? "border-slate-100" : "border-slate-200 bg-slate-50/50 opacity-80"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`rounded-2xl p-4 ${
                  plugin.enabled ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-400"
                }`}>
                  {getIcon(plugin.key)}
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg mb-2 ${
                    plugin.enabled ? "bg-emerald-50 text-emerald-600" : "bg-slate-200 text-slate-500"
                  }`}>
                    {plugin.enabled ? "Đang bật" : "Đã tắt"}
                  </span>
                  {plugin.isCore && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                      <Lock size={10} /> Core Plugin
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2">{plugin.name}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed flex-1 mb-8">
                {plugin.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Danh mục</span>
                  <span className="text-sm font-bold text-slate-700">{plugin.category}</span>
                </div>
                
                {plugin.isCore ? (
                  <div className="h-7 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-400">
                    <CheckCircle2 size={16} />
                  </div>
                ) : (
                  <button
                    onClick={() => togglePlugin(plugin.key, plugin.enabled)}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      plugin.enabled ? "bg-indigo-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        plugin.enabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* Dependency Warning */}
              {!plugin.enabled && plugin.dependencies.length > 0 && (
                <div className="absolute inset-0 bg-white/95 rounded-[32px] p-8 flex flex-col items-center justify-center text-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <AlertTriangle size={48} className="text-orange-500 mb-4" />
                  <h4 className="text-lg font-black text-slate-900 mb-2">Cần phụ thuộc</h4>
                  <p className="text-sm text-slate-500 font-medium px-4 mb-6">
                    Để bật plugin này, bạn cần kích hoạt **{plugin.dependencies.join(", ")}** trước.
                  </p>
                  <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-500">
                    Kích hoạt {plugin.dependencies[0]} <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-16 rounded-[40px] bg-slate-900 p-12 text-white flex flex-col md:flex-row items-center gap-10 overflow-hidden relative">
          <div className="flex-1 space-y-4 relative z-10">
            <h2 className="text-3xl font-black tracking-tight leading-tight">Biến đổi hệ thống theo ý muốn của bạn</h2>
            <p className="text-slate-400 font-medium max-w-xl">
              Hệ thống Plugin cho phép bạn tùy chỉnh quy trình làm việc. Bạn có thể bật tính năng **Internal Linking** để tối ưu bài viết cũ, hoặc **AI Refresh** để tự động làm mới nội dung khi tụt hạng.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <button className="rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-black transition hover:bg-indigo-500">
                Xem tài liệu Plugin
              </button>
              <button className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-black transition hover:bg-white/10">
                Đề xuất tính năng mới
              </button>
            </div>
          </div>
          <div className="relative h-64 w-64 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px]"></div>
            <Puzzle size={180} className="text-indigo-500/20 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={64} className="text-indigo-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

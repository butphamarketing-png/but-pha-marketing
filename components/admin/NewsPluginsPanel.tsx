"use client";

import { useState } from "react";
import { ArrowUpRight, Download, Flame, Layers, Link2, LogOut, Plus, Puzzle, Sparkles, Target, TrendingUp } from "lucide-react";

type Plugin = {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  enabled: boolean;
  icon: any;
  category: "SEO" | "Schema" | "Speed" | "AI" | "Analytics";
};

function PluginCard({ plugin, onToggle }: { plugin: Plugin; onToggle: (id: string) => void }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
          <plugin.icon size={28} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
              plugin.enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
            }`}
          >
            {plugin.enabled ? "Dang bat" : "Da tat"}
          </span>
          <button
            onClick={() => onToggle(plugin.id)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              plugin.enabled ? "bg-indigo-600" : "bg-slate-200"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                plugin.enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-bold text-slate-950">{plugin.name}</h3>
        <p className="mt-1 text-xs text-slate-500">
          v{plugin.version} • boi {plugin.author}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">{plugin.description}</p>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50">
          Cai dat
        </button>
        <button className="rounded-xl border border-slate-200 p-2 text-slate-400 transition hover:bg-slate-50 hover:text-red-500">
          <LogOut size={14} className="rotate-90" />
        </button>
      </div>
    </div>
  );
}

export function NewsPluginsPanel() {
  const [plugins, setPlugins] = useState<Plugin[]>([
    {
      id: "rank-math",
      name: "Rank Math SEO Pro",
      description: "Toi uu SEO realtime, checklist tu khoa, schema markup va xem truoc ket qua Google.",
      version: "1.2.4",
      author: "ButPha AI",
      enabled: true,
      icon: Target,
      category: "SEO",
    },
    {
      id: "ai-writer",
      name: "AI Content Writer",
      description: "Tu dong tao noi dung nhap, goi y y tuong bai viet va toi uu giong van theo thuong hieu.",
      version: "2.0.1",
      author: "ButPha AI",
      enabled: true,
      icon: Sparkles,
      category: "AI",
    },
    {
      id: "schema-pro",
      name: "Schema Markup Pro",
      description: "Tu dong them cau truc du lieu FAQ, Article, Product giup hien thi rich snippets.",
      version: "1.0.5",
      author: "SEO Master",
      enabled: false,
      icon: Layers,
      category: "Schema",
    },
    {
      id: "speed-booster",
      name: "Speed Optimization",
      description: "Nen anh tu dong, lazy load va toi uu hoa CSS/JS de tang toc do trang.",
      version: "1.4.0",
      author: "DevTeam",
      enabled: true,
      icon: Flame,
      category: "Speed",
    },
    {
      id: "internal-linker",
      name: "Internal Link Suggester",
      description: "Goi y cac lien ket noi bo thong minh dua tren ngu canh va chu de bai viet.",
      version: "1.1.2",
      author: "ButPha AI",
      enabled: false,
      icon: Link2,
      category: "SEO",
    },
    {
      id: "analytics-plus",
      name: "Advanced Analytics",
      description: "Theo doi hanh vi nguoi dung sau hon, ty le thoat va ban do nhiet.",
      version: "3.2.0",
      author: "DataInsight",
      enabled: false,
      icon: TrendingUp,
      category: "Analytics",
    },
  ]);

  const togglePlugin = (id: string) => {
    setPlugins((prev) => prev.map((plugin) => (plugin.id === id ? { ...plugin, enabled: !plugin.enabled } : plugin)));
  };

  return (
    <div className="space-y-6">
      <header className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-indigo-600">
              <Puzzle size={16} /> Plugin System
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950">Quan ly Plugin</h1>
            <p className="mt-2 text-slate-500">Mo rong tinh nang he thong thong qua kho ung dung chuyen sau.</p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
              <Download size={18} /> Tai plugin (.zip)
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500">
              <Plus size={18} /> Cai tu Marketplace
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {["Tat ca", "SEO", "AI", "Schema", "Speed", "Analytics"].map((category, index) => (
            <button
              key={category}
              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                index === 0 ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {plugins.map((plugin) => (
          <PluginCard key={plugin.id} plugin={plugin} onToggle={togglePlugin} />
        ))}
      </div>

      <section className="rounded-[30px] border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
          <Sparkles className="text-indigo-500" size={32} />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Sap co them plugin moi</h2>
        <p className="mx-auto mt-2 max-w-md text-slate-500">
          Chung toi dang phat trien them cac cong cu toi uu hoa nang cao giup website cua ban but pha manh me hon.
        </p>
        <button className="mx-auto mt-8 flex items-center gap-2 font-bold text-indigo-600 hover:underline">
          Gui yeu cau tinh nang <ArrowUpRight size={16} />
        </button>
      </section>
    </div>
  );
}

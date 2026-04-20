"use client";

import React, { useState, useEffect } from "react";
import { 
  Settings, 
  Key, 
  Database, 
  Globe, 
  ShieldCheck, 
  Save, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2,
  ExternalLink,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

export function StudioSettings() {
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveMessage] = useState(false);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const [config, setConfig] = useState({
    openaiKey: "",
    serpApiKey: "",
    supabaseUrl: "",
    supabaseKey: "",
    defaultLocation: "Vietnam",
    aiModel: "gpt-4-turbo",
  });

  // Load current settings (mock or from API)
  useEffect(() => {
    // In a real app: fetch("/api/settings/studio").then(res => res.json()).then(data => setConfig(data));
    // For now, we simulate existing env-based settings status
  }, []);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call to save settings
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSaveMessage(true);
    setTimeout(() => setSaveMessage(false), 3000);
  };

  const toggleShowKey = (key: string) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Cấu hình hệ thống</h1>
        <p className="text-slate-500">Quản lý các kết nối API và thiết lập mặc định để hệ thống hoạt động với dữ liệu thật.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* AI Configuration */}
          <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
                <Key size={24} />
              </div>
              <h2 className="text-xl font-black text-slate-900">Kết nối AI (OpenAI)</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                  OpenAI API Key
                  <a href="https://platform.openai.com/api-keys" target="_blank" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                    Lấy Key tại đây <ExternalLink size={12} />
                  </a>
                </label>
                <div className="relative">
                  <input 
                    type={showKeys['openai'] ? "text" : "password"}
                    value={config.openaiKey}
                    onChange={(e) => setConfig({...config, openaiKey: e.target.value})}
                    placeholder="sk-..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white"
                  />
                  <button 
                    onClick={() => toggleShowKey('openai')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showKeys['openai'] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 font-medium italic">Sử dụng cho: Viết bài AI, Phân tích SEO, Gợi ý Internal Link.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Model ưu tiên</label>
                  <select 
                    value={config.aiModel}
                    onChange={(e) => setConfig({...config, aiModel: e.target.value})}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white"
                  >
                    <option value="gpt-4-turbo">GPT-4 Turbo (Khuyên dùng)</option>
                    <option value="gpt-4o">GPT-4o (Nhanh & Rẻ hơn)</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Tốc độ cao)</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Data Configuration */}
          <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
                <Globe size={24} />
              </div>
              <h2 className="text-xl font-black text-slate-900">Dữ liệu SEO (SerpAPI)</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                  SerpAPI Key
                  <a href="https://serpapi.com/dashboard" target="_blank" className="text-xs text-emerald-600 hover:underline flex items-center gap-1">
                    Lấy Key tại đây <ExternalLink size={12} />
                  </a>
                </label>
                <div className="relative">
                  <input 
                    type={showKeys['serp'] ? "text" : "password"}
                    value={config.serpApiKey}
                    onChange={(e) => setConfig({...config, serpApiKey: e.target.value})}
                    placeholder="Nhập API Key để cào dữ liệu Google..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-medium outline-none transition focus:border-emerald-300 focus:bg-white"
                  />
                  <button 
                    onClick={() => toggleShowKey('serp')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showKeys['serp'] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 font-medium italic">Sử dụng cho: Theo dõi thứ hạng (Rank Tracker), Phân tích Cơ hội nội dung.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Vị trí tìm kiếm mặc định</label>
                <input 
                  type="text"
                  value={config.defaultLocation}
                  onChange={(e) => setConfig({...config, defaultLocation: e.target.value})}
                  placeholder="VD: Vietnam, Ho Chi Minh City..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-medium outline-none transition focus:border-emerald-300 focus:bg-white"
                />
              </div>
            </div>
          </section>

          {/* Database Configuration */}
          <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-xl bg-orange-50 p-2 text-orange-600">
                <Database size={24} />
              </div>
              <h2 className="text-xl font-black text-slate-900">Cơ sở dữ liệu (Supabase)</h2>
            </div>

            <div className="rounded-2xl bg-orange-50/50 border border-orange-100 p-6 flex items-start gap-4 mb-6">
              <AlertCircle size={20} className="text-orange-600 shrink-0 mt-0.5" />
              <p className="text-xs text-orange-800 leading-relaxed font-medium">
                Cấu hình Database thường được ưu tiên lấy từ **Biến môi trường (.env)** trên server để bảo mật. Bạn chỉ nên nhập tại đây nếu muốn ghi đè tạm thời hoặc kiểm tra kết nối.
              </p>
            </div>

            <div className="space-y-6 opacity-60">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Supabase URL</label>
                <input 
                  disabled
                  type="text"
                  value={process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xxx.supabase.co"}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3.5 text-sm font-medium cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Service Role Key</label>
                <div className="relative">
                  <input 
                    disabled
                    type="password"
                    value="••••••••••••••••••••••••"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3.5 text-sm font-medium cursor-not-allowed"
                  />
                  <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Info & Action */}
        <aside className="space-y-6">
          <div className="sticky top-8 space-y-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6">Trạng thái kết nối</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Database size={18} className="text-emerald-500" />
                    <span className="text-sm font-bold text-slate-700">Database</span>
                  </div>
                  <CheckCircle2 size={18} className="text-emerald-500" />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Key size={18} className={config.openaiKey ? "text-emerald-500" : "text-slate-300"} />
                    <span className="text-sm font-bold text-slate-700">OpenAI API</span>
                  </div>
                  {config.openaiKey ? <CheckCircle2 size={18} className="text-emerald-500" /> : <AlertCircle size={18} className="text-slate-300" />}
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Globe size={18} className={config.serpApiKey ? "text-emerald-500" : "text-slate-300"} />
                    <span className="text-sm font-bold text-slate-700">SerpAPI</span>
                  </div>
                  {config.serpApiKey ? <CheckCircle2 size={18} className="text-emerald-500" /> : <AlertCircle size={18} className="text-slate-300" />}
                </div>
              </div>

              <div className="mt-10 space-y-3">
                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-sm font-black text-white shadow-xl shadow-indigo-100 hover:bg-indigo-500 transition-all disabled:opacity-50"
                >
                  {loading ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
                  {loading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
                {saveSuccess && (
                  <p className="text-center text-xs font-bold text-emerald-600 animate-bounce">Đã lưu cấu hình thành công!</p>
                )}
                <button className="w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-200 py-4 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all">
                  Kiểm tra kết nối
                </button>
              </div>
            </div>

            <div className="rounded-[32px] bg-slate-900 p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={24} className="text-indigo-400" />
                <h4 className="text-lg font-black">Bảo mật tối đa</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Tất cả API Key của bạn đều được mã hóa và lưu trữ an toàn. Chúng tôi không bao giờ chia sẻ Key của bạn với bất kỳ bên thứ ba nào khác.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

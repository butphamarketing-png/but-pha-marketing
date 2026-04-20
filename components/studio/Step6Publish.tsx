"use client";

import React, { useState } from "react";
import { Rocket, ArrowLeft, CheckCircle2, Globe, Newspaper, Send, Layout, Phone, Palette } from "lucide-react";
import { useRouter } from "next/navigation";

export function Step6Publish({ data, setData, onPrev }: any) {
  const [publishing, setPublishing] = useState(false);
  const router = useRouter();

  const handlePublish = async () => {
    setPublishing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push("/admin/news");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Rocket className="text-indigo-600" />
            Kiểm tra lần cuối & Xuất bản
          </h2>
          <p className="text-sm text-slate-500 mt-1">Cấu hình ảnh đại diện và thông tin xuất bản trước khi đưa lên website.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onPrev} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <button 
            onClick={handlePublish}
            disabled={publishing}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 text-sm font-black text-white shadow-xl shadow-indigo-200 hover:bg-indigo-500 transition-all animate-pulse"
          >
            {publishing ? <div className="h-5 w-5 animate-spin rounded-full border-3 border-white border-t-transparent" /> : <Send size={18} />}
            Xuất bản ngay
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Preview Card */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900">Ảnh đại diện (Thumbnail)</h3>
          <div className="relative aspect-video rounded-[32px] overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-10 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-black text-xs">BPM</div>
              <span className="text-xs font-bold text-white uppercase tracking-[0.3em]">Bứt Phá Marketing</span>
            </div>
            
            <h2 className="text-3xl font-black text-white leading-tight drop-shadow-lg">{data.title || "Tiêu đề bài viết của bạn"}</h2>
            
            <div className="flex items-center justify-between border-t border-white/20 pt-6">
              <div className="flex items-center gap-2 text-white/80 text-xs font-bold">
                <Globe size={14} />
                www.butphamarketing.com
              </div>
              <div className="flex items-center gap-2 text-white/80 text-xs font-bold">
                <Phone size={14} />
                09xx.xxx.xxx
              </div>
            </div>

            {/* Decoration */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl"></div>
          </div>
          
          <div className="flex items-center gap-3 mt-4">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Palette size={16} /> Đổi Template
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Layout size={16} /> Chỉnh sửa Canvas
            </button>
          </div>
        </div>

        {/* Publish Settings */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-black text-slate-900">Cấu hình hiển thị</h3>
          
          <div className="space-y-4">
            <label className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 cursor-pointer transition hover:bg-indigo-50/30 hover:border-indigo-100">
              <input type="checkbox" className="h-5 w-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Hiển thị công khai</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Bài viết sẽ xuất hiện trên trang Blog chính.</p>
              </div>
              <Globe size={20} className="text-slate-300" />
            </label>

            <label className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 cursor-pointer transition hover:bg-orange-50/30 hover:border-orange-100">
              <input type="checkbox" className="h-5 w-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Đánh dấu bài viết HOT</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Ghim bài viết lên đầu trang chủ tin tức.</p>
              </div>
              <Newspaper size={20} className="text-slate-300" />
            </label>

            <div className="pt-4 space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Lịch xuất bản</p>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                <span className="text-sm font-medium text-slate-700">Ngay bây giờ</span>
                <button className="ml-auto text-xs font-bold text-indigo-600 hover:underline">Thay đổi</button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-4 flex items-start gap-3">
            <CheckCircle2 size={18} className="text-emerald-500 mt-0.5" />
            <p className="text-xs text-emerald-700 font-medium leading-relaxed">
              Mọi thứ đã sẵn sàng! Bài viết của bạn đạt điểm SEO tối ưu và đã được cấu hình đầy đủ hình ảnh minh họa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

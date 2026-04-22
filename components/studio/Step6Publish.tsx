"use client";

import React, { useState } from "react";
import { Rocket, ArrowLeft, CheckCircle2, Globe, Newspaper, Send, Layout, Phone, Palette } from "lucide-react";
import { useRouter } from "next/navigation";

export function Step6Publish({ data, setData, onPrev }: any) {
  const [publishing, setPublishing] = useState(false);
  const router = useRouter();
  const thumbnailUrl = Array.isArray(data.images) && data.images.length > 0 ? data.images[0]?.url : "";

  const handlePublish = async () => {
    setPublishing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/admin/news");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-black text-slate-900">
            <Rocket className="text-indigo-600" />
            Kiểm tra lần cuối và xuất bản
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Kiểm tra ảnh đại diện và cấu hình hiển thị trước khi đưa bài viết lên website.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 text-sm font-black text-white shadow-xl shadow-indigo-200 transition-all hover:bg-indigo-500"
          >
            {publishing ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <Send size={18} />}
            Xuất bản ngay
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900">Ảnh đại diện (thumbnail)</h3>
          <div className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-[32px] border-4 border-white bg-gradient-to-br from-indigo-600 to-violet-700 p-10 shadow-2xl">
            {thumbnailUrl ? (
              <>
                <img src={thumbnailUrl} alt={data.title || "Thumbnail bài viết"} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/45" />
              </>
            ) : null}

            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-xs font-black text-white backdrop-blur-md">BPM</div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">Bứt Phá Marketing</span>
            </div>

            <h2 className="relative z-10 text-3xl font-black leading-tight text-white drop-shadow-lg">
              {data.title || "Tiêu đề bài viết của bạn"}
            </h2>

            <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-6">
              <div className="flex items-center gap-2 text-xs font-bold text-white/80">
                <Globe size={14} />
                www.butphamarketing.com
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-white/80">
                <Phone size={14} />
                09xx.xxx.xxx
              </div>
            </div>

            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50">
              <Palette size={16} />
              Đổi template
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50">
              <Layout size={16} />
              Chỉnh sửa canvas
            </button>
          </div>
        </div>

        <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-lg font-black text-slate-900">Cấu hình hiển thị</h3>

          <div className="space-y-4">
            <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30">
              <input type="checkbox" className="h-5 w-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Hiển thị công khai</p>
                <p className="mt-0.5 text-[11px] text-slate-400">Bài viết sẽ xuất hiện trên trang blog chính.</p>
              </div>
              <Globe size={20} className="text-slate-300" />
            </label>

            <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition hover:border-orange-100 hover:bg-orange-50/30">
              <input type="checkbox" className="h-5 w-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Đánh dấu bài viết hot</p>
                <p className="mt-0.5 text-[11px] text-slate-400">Ghim bài viết lên đầu trang tin tức nếu cần.</p>
              </div>
              <Newspaper size={20} className="text-slate-300" />
            </label>

            <div className="space-y-2 pt-4">
              <p className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">Lịch xuất bản</p>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                <span className="text-sm font-medium text-slate-700">Ngay bây giờ</span>
                <button className="ml-auto text-xs font-bold text-indigo-600 hover:underline">Thay đổi</button>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4">
            <CheckCircle2 size={18} className="mt-0.5 text-emerald-500" />
            <p className="text-xs font-medium leading-relaxed text-emerald-700">
              Mọi thứ đã sẵn sàng. Bài viết của bạn đã có ảnh minh họa AI và có thể xuất bản ngay khi bạn chốt nội dung cuối.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

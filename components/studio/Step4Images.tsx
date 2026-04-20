"use client";

import React, { useState } from "react";
import { ImageIcon, ArrowLeft, ArrowRight, Search, Plus, ExternalLink, RefreshCw } from "lucide-react";

export function Step4Images({ data, setData, onNext, onPrev }: any) {
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);

  const imageSuggestions = [
    { section: "Giới thiệu", query: "marketing agency chuyên nghiệp", suggested: ["https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"] },
    { section: "Tại sao chọn chúng tôi", query: "đội ngũ marketing thực chiến", suggested: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"] },
    { section: "Bảng giá", query: "marketing services pricing", suggested: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"] },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <ImageIcon className="text-indigo-600" />
            Gợi ý hình ảnh minh họa
          </h2>
          <p className="text-sm text-slate-500 mt-1">AI đề xuất các từ khóa tìm kiếm ảnh phù hợp với từng đoạn nội dung.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onPrev} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <button 
            onClick={onNext}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all"
          >
            Tiếp tục
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {imageSuggestions.map((item, i) => (
          <div key={i} className="group rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.section}</span>
              <button className="text-indigo-600 hover:text-indigo-500 transition-colors">
                <RefreshCw size={14} />
              </button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-4 group-hover:ring-4 ring-indigo-500/10 transition-all">
              <img src={item.suggested[0]} alt={item.query} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="rounded-xl bg-white p-2 text-slate-900 shadow-lg hover:scale-110 transition-transform">
                  <Plus size={18} />
                </button>
                <button className="rounded-xl bg-white p-2 text-slate-900 shadow-lg hover:scale-110 transition-transform">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Search size={14} className="text-slate-400" />
                {item.query}
              </div>
              <button className="w-full rounded-xl border border-slate-100 py-2.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors">
                Tìm ảnh trên Google
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="rounded-[32px] bg-indigo-50/50 border border-indigo-100 p-8 flex items-center gap-6">
        <div className="h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <ImageIcon size={32} />
        </div>
        <div>
          <h4 className="text-lg font-black text-slate-900">Mẹo SEO Hình Ảnh</h4>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">Hệ thống sẽ tự động tạo **ALT text** và đặt tên file chuẩn SEO khi bạn chọn ảnh. Hãy chọn ít nhất 3 ảnh để tăng trải nghiệm người dùng.</p>
        </div>
      </div>
    </div>
  );
}

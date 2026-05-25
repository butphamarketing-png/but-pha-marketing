"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Database, HardDrive, Zap, TrendingUp, Rocket, ShieldCheck, Cpu, Globe, Share2, Award } from "lucide-react";

const HOSTING_PACKAGES = [
  { gb: 3, price: 3348000, label: "Doanh nghiệp nhỏ, website cá nhân", icon: Database },
  { gb: 5, price: 4872000, label: "Website giới thiệu, landing page", icon: HardDrive },
  { gb: 7, price: 6000000, label: "Blog, website tin tức nhỏ", icon: TrendingUp },
  { gb: 8, price: 6504000, label: "Cửa hàng online nhỏ", icon: ShieldCheck },
  { gb: 10, price: 7200000, label: "Website doanh nghiệp vừa & nhỏ", icon: HardDrive },
  { gb: 16, price: 10080000, label: "Website doanh nghiệp chuyên nghiệp", icon: Award },
  { gb: 20, price: 12000000, label: "Website TMĐT, nhiều sản phẩm", icon: Globe },
  { gb: 30, price: 16080000, label: "Website nhiều truy cập, dữ liệu lớn", icon: Zap },
  { gb: 50, price: 24000000, label: "Website hệ thống, nhiều tính năng", icon: Rocket },
  { gb: 60, price: 28008000, label: "Website có lượng truy cập cao", icon: Zap },
  { gb: 70, price: 32040000, label: "Dự án lớn, hệ thống web phức tạp", icon: Globe },
  { gb: 80, price: 36000000, label: "Enterprise, hệ thống đa site", icon: Share2 },
  { gb: 90, price: 39960000, label: "Hệ thống lớn, lưu trữ dữ liệu nhiều", icon: Cpu },
  { gb: 100, price: 43200000, label: "Giải pháp cao cấp, hiệu suất tối đa", icon: Award },
];

export function StorageSlider({ primaryColor }: { primaryColor: string }) {
  const [index, setIndex] = useState(0);
  const currentPackage = HOSTING_PACKAGES[index];

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("vi-VN").format(p) + " đ";
  };

  return (
    <div className="w-full rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-10 md:p-14 shadow-2xl relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[120px] opacity-20 pointer-events-none transition-all duration-700 group-hover:opacity-30" style={{ backgroundColor: primaryColor }} />
      
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center relative z-10">
        {/* Info Section */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
              <currentPackage.icon size={18} className="text-white" style={{ color: primaryColor }} />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Hạ tầng hệ thống</p>
            </div>
            <h3 className="text-2xl font-black text-white md:text-3xl tracking-tight leading-tight min-h-[4rem] flex items-center">{currentPackage.label}</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-[2rem] bg-white/[0.03] p-6 border border-white/10 transition-colors hover:bg-white/[0.05] md:p-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Gói dung lượng</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white md:text-5xl" style={{ color: primaryColor }}>{currentPackage.gb}</span>
                <span className="text-base font-bold text-gray-400">GB</span>
              </div>
            </div>
            <div className="rounded-[2rem] bg-white/[0.03] p-6 border border-white/10 transition-colors hover:bg-white/[0.05] md:p-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Dự toán chi phí</p>
              <div className="text-xl font-black text-white md:text-2xl lg:text-3xl leading-tight">{formatPrice(currentPackage.price)}</div>
            </div>
          </div>

          <div className="rounded-3xl p-8 border border-white/10 bg-white/[0.02] relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1 h-full" style={{ backgroundColor: primaryColor }} />
            <p className="text-sm leading-relaxed text-gray-400 font-medium italic">
              "Tự động tối ưu hóa hiệu suất dựa trên dung lượng lưu trữ, giúp website luôn đạt tốc độ tải trang dưới 1.5s."
            </p>
          </div>
        </div>

        {/* Slider Section */}
        <div className="space-y-12">
          <div className="relative h-24 flex items-center px-2">
            {/* Custom Track */}
            <div className="absolute h-3 w-full rounded-full bg-white/5 border border-white/5" />
            <div 
              className="absolute h-3 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              style={{ 
                width: `${(index / (HOSTING_PACKAGES.length - 1)) * 100}%`,
                background: `linear-gradient(90deg, ${primaryColor}40, ${primaryColor})`,
                boxShadow: `0 0 30px ${primaryColor}60`
              }} 
            />
            
            <input
              type="range"
              min="0"
              max={HOSTING_PACKAGES.length - 1}
              value={index}
              onChange={(e) => setIndex(parseInt(e.target.value))}
              className="absolute w-full appearance-none bg-transparent cursor-pointer z-10 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-12 [&::-webkit-slider-thumb]:w-12 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[6px] 
                [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:shadow-[0_0_30px_rgba(255,255,255,0.4)] 
                [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 
                [&::-webkit-slider-thumb]:active:scale-95"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 px-4">
            {[0, Math.floor(HOSTING_PACKAGES.length / 3), Math.floor(2 * HOSTING_PACKAGES.length / 3), HOSTING_PACKAGES.length - 1].map((val) => (
              <div key={val} className="flex flex-col items-center gap-3">
                <div className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${index >= val ? 'scale-150 shadow-[0_0_10px_white]' : 'opacity-20'}`} style={{ backgroundColor: index >= val ? 'white' : 'gray' }} />
                <span className={`text-[10px] font-black transition-colors duration-500 ${index >= val ? 'text-white' : 'text-gray-600'}`}>{HOSTING_PACKAGES[val].gb}GB</span>
              </div>
            ))}
          </div>
          
          <div className="pt-6">
            <button 
              onClick={() => (document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }))}
              className="w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
              style={{ backgroundColor: primaryColor }}
            >
              Đặt lịch nâng cấp hạ tầng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

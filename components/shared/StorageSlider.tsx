"use client";

import { useState } from "react";
import { Database, HardDrive, Zap, TrendingUp, Rocket, ShieldCheck, Cpu, Globe, Award } from "lucide-react";
import { HOSTING_PACKAGES } from "@/lib/service-pricing";

const HOSTING_ICONS = [Database, HardDrive, TrendingUp, ShieldCheck, HardDrive, Award, Globe, Zap, Rocket, Zap, Globe, Cpu, Award];

const PACKAGES = HOSTING_PACKAGES.map((pkg, index) => ({
  ...pkg,
  icon: HOSTING_ICONS[index] ?? Database,
}));

export function StorageSlider({ primaryColor }: { primaryColor: string }) {
  const [index, setIndex] = useState(0);
  const currentPackage = PACKAGES[index];

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("vi-VN").format(p) + " đ";
  };

  return (
    <div className="platform-panel group relative w-full overflow-hidden p-10 md:p-14">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-[120px] transition-all duration-700 group-hover:opacity-30" style={{ backgroundColor: primaryColor }} />
      
      <div className="relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="platform-badge inline-flex">
              <currentPackage.icon size={18} style={{ color: primaryColor }} />
              <p className="text-xs font-medium text-slate-500">Hạ tầng hệ thống</p>
            </div>
            <h3 className="flex min-h-[4rem] items-center text-2xl font-bold leading-tight tracking-tight text-indigo-950 md:text-3xl">{currentPackage.label}</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="platform-stat-box platform-stat-box--accent p-6 md:p-8">
              <p className="mb-2 text-xs font-medium text-slate-500">Gói dung lượng</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold md:text-5xl" style={{ color: primaryColor }}>{currentPackage.gb}</span>
                <span className="text-base font-medium text-slate-500">GB</span>
              </div>
            </div>
            <div className="platform-stat-box p-6 md:p-8">
              <p className="mb-3 text-xs font-medium text-slate-500">Dự toán chi phí</p>
              <div className="text-xl font-bold leading-tight text-indigo-950 md:text-2xl lg:text-3xl">{formatPrice(currentPackage.price)}</div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-indigo-50/40 p-8">
            <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: primaryColor }} />
            <p className="text-sm font-medium italic leading-relaxed text-slate-600">
              "Tự động tối ưu hóa hiệu suất dựa trên dung lượng lưu trữ, giúp website luôn đạt tốc độ tải trang dưới 1.5s."
            </p>
          </div>
        </div>

        <div className="space-y-12">
          <div className="relative flex h-24 items-center px-2">
            <div className="absolute h-3 w-full rounded-full border border-indigo-100 bg-indigo-50" />
            <div 
              className="absolute h-3 rounded-full transition-all duration-300"
              style={{ 
                width: `${(index / (PACKAGES.length - 1)) * 100}%`,
                background: `linear-gradient(90deg, ${primaryColor}55, ${primaryColor})`,
                boxShadow: `0 0 20px ${primaryColor}40`
              }} 
            />
            
            <input
              type="range"
              min="0"
              max={PACKAGES.length - 1}
              value={index}
              onChange={(e) => setIndex(parseInt(e.target.value))}
              className="absolute z-10 w-full cursor-pointer appearance-none bg-transparent
                [&::-webkit-slider-thumb]:h-12 [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[6px] [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:active:scale-95"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 px-4">
            {[0, Math.floor(PACKAGES.length / 3), Math.floor(2 * PACKAGES.length / 3), PACKAGES.length - 1].map((val) => (
              <div key={val} className="flex flex-col items-center gap-3">
                <div className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${index >= val ? "scale-150" : "opacity-30"}`} style={{ backgroundColor: index >= val ? primaryColor : "#cbd5e1" }} />
                <span className={`text-[10px] font-semibold transition-colors duration-500 ${index >= val ? "text-indigo-950" : "text-slate-400"}`}>{PACKAGES[val].gb}GB</span>
              </div>
            ))}
          </div>
          
          <div className="pt-6">
            <button 
              type="button"
              onClick={() => (document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }))}
              className="w-full rounded-2xl py-5 text-xs font-semibold text-white shadow-lg transition-all hover:brightness-105 active:scale-[0.99]"
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

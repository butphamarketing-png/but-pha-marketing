"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Database, HardDrive, Zap, TrendingUp, Rocket, ShieldCheck, Cpu, Globe, Share2, Award } from "lucide-react";

const STAGES = [
  { min: 2, max: 10, label: "Giai đoạn khởi đầu", icon: Database },
  { min: 10, max: 20, label: "Phát triển nhỏ", icon: HardDrive },
  { min: 20, max: 30, label: "Phát triển vừa", icon: TrendingUp },
  { min: 30, max: 40, label: "Phát triển ổn định", icon: ShieldCheck },
  { min: 40, max: 50, label: "Phát triển mạnh", icon: Zap },
  { min: 50, max: 60, label: "Tăng trưởng nhanh", icon: Rocket },
  { min: 60, max: 70, label: "Kinh doanh chuyên nghiệp", icon: Globe },
  { min: 70, max: 80, label: "Mở rộng quy mô", icon: Share2 },
  { min: 80, max: 90, label: "Tự động hóa marketing", icon: Cpu },
  { min: 90, max: 100, label: "Doanh nghiệp dẫn đầu", icon: Award },
];

export function StorageSlider({ primaryColor }: { primaryColor: string }) {
  const [gb, setGb] = useState(2);

  const price = useMemo(() => {
    return Math.round(271429 * gb + 857142);
  }, [gb]);

  const currentStage = useMemo(() => {
    return STAGES.find((s) => gb >= s.min && gb <= s.max) || STAGES[0];
  }, [gb]);

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("vi-VN").format(p) + "đ";
  };

  return (
    <div className="w-full rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md md:p-12">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Info Section */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white" style={{ color: primaryColor }}>
                <currentStage.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Mức độ hạ tầng</p>
                <h3 className="text-2xl font-black text-white md:text-3xl">{currentStage.label}</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white/[0.03] p-6 border border-white/5">
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Dung lượng</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white" style={{ color: primaryColor }}>{gb}</span>
                <span className="text-sm font-bold text-gray-400">GB</span>
              </div>
            </div>
            <div className="rounded-3xl bg-white/[0.03] p-6 border border-white/5">
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Chi phí lưu trữ</p>
              <div className="text-2xl font-black text-white md:text-3xl">{formatPrice(price)}</div>
            </div>
          </div>

          <div className="rounded-3xl bg-primary/10 p-6 border border-primary/20" style={{ backgroundColor: `${primaryColor}10`, borderColor: `${primaryColor}20` }}>
            <p className="text-sm leading-relaxed text-gray-300 italic">
              "Lựa chọn dung lượng phù hợp giúp hệ thống vận hành trơn tru và tối ưu chi phí hạ tầng hàng năm."
            </p>
          </div>
        </div>

        {/* Slider Section */}
        <div className="relative pt-10">
          {/* Neon Glow Background */}
          <div 
            className="absolute -inset-4 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: primaryColor }}
          />
          
          <div className="relative space-y-12">
            <div className="flex justify-between px-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <span>2GB (Khởi tạo)</span>
              <span>100GB (Dẫn đầu)</span>
            </div>

            <div className="relative h-20 flex items-center">
              {/* Custom Track */}
              <div className="absolute h-4 w-full rounded-full bg-white/5 border border-white/10" />
              <div 
                className="absolute h-4 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((gb - 2) / 98) * 100}%`,
                  backgroundColor: primaryColor,
                  boxShadow: `0 0 20px ${primaryColor}80`
                }} 
              />
              
              <input
                type="range"
                min="2"
                max="100"
                value={gb}
                onChange={(e) => setGb(parseInt(e.target.value))}
                className="absolute w-full appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-10 [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(255,255,255,0.5)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                style={{ "--thumb-color": primaryColor } as any}
              />
            </div>

            <div className="grid grid-cols-5 gap-2 px-2">
              {[2, 25, 50, 75, 100].map((val) => (
                <div key={val} className="flex flex-col items-center gap-2">
                  <div className={`h-1 w-1 rounded-full ${gb >= val ? 'bg-white' : 'bg-white/20'}`} />
                  <span className={`text-[10px] font-black ${gb >= val ? 'text-white' : 'text-gray-600'}`}>{val}GB</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

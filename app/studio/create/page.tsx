"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  ListOrdered, 
  FileText, 
  Image as ImageIcon, 
  Target, 
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  RotateCcw,
  Save,
  Rocket
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Components for steps
import { Step1Title } from "@/components/studio/Step1Title";
import { Step2Outline } from "@/components/studio/Step2Outline";
import { Step3Article } from "@/components/studio/Step3Article";
import { Step4Images } from "@/components/studio/Step4Images";
import { Step5SEO } from "@/components/studio/Step5SEO";
import { Step6Publish } from "@/components/studio/Step6Publish";

const STEPS = [
  { id: 1, name: "Nhập tiêu đề", icon: FileText },
  { id: 2, name: "Xem dàn ý", icon: ListOrdered },
  { id: 3, name: "Viết bài", icon: Sparkles },
  { id: 4, name: "Chèn hình ảnh", icon: ImageIcon },
  { id: 5, name: "Tối ưu SEO", icon: Target },
  { id: 6, name: "Xuất bản", icon: Rocket },
];

export default function CreateArticlePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [articleData, setArticleData] = useState({
    title: "",
    outline: [] as any[],
    content: "",
    keywords: [] as string[],
    seoScore: 0,
    seoIssues: [] as any[],
    images: [] as any[],
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Title data={articleData} setData={setArticleData} onNext={nextStep} />;
      case 2: return <Step2Outline data={articleData} setData={setArticleData} onNext={nextStep} onPrev={prevStep} />;
      case 3: return <Step3Article data={articleData} setData={setArticleData} onNext={nextStep} onPrev={prevStep} />;
      case 4: return <Step4Images data={articleData} setData={setArticleData} onNext={nextStep} onPrev={prevStep} />;
      case 5: return <Step5SEO data={articleData} setData={setArticleData} onNext={nextStep} onPrev={prevStep} />;
      case 6: return <Step6Publish data={articleData} setData={setArticleData} onPrev={prevStep} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/news" className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg font-black tracking-tight">Tạo Bài Viết Mới</h1>
              <p className="text-xs text-slate-500">Quy trình tạo nội dung chuẩn SEO với AI</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Save size={18} />
              Lưu nháp
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all">
              Hủy bỏ
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 mt-8">
        {/* Progress Bar */}
        <div className="mb-10 flex items-center justify-between">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2 relative">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                  currentStep === step.id ? "border-indigo-600 bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-100 scale-110" :
                  currentStep > step.id ? "border-emerald-500 bg-emerald-500 text-white" :
                  "border-slate-200 bg-white text-slate-300"
                }`}>
                  {currentStep > step.id ? <CheckCircle2 size={24} /> : <step.icon size={22} />}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  currentStep === step.id ? "text-indigo-600" :
                  currentStep > step.id ? "text-emerald-600" : "text-slate-400"
                }`}>
                  {step.name}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="h-0.5 flex-1 mx-4 bg-slate-200">
                  <div className={`h-full bg-emerald-500 transition-all duration-500`} style={{ width: currentStep > step.id ? "100%" : "0%" }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Panel */}
          <main className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Sidebar Info */}
          <aside className="space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* SEO Score Card */}
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Tổng kết SEO</h3>
                <div className="flex flex-col items-center">
                  <div className="relative h-32 w-32 flex items-center justify-center">
                    <svg className="h-full w-full transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" 
                        strokeDasharray={364.4}
                        strokeDashoffset={364.4 - (364.4 * articleData.seoScore) / 100}
                        className={`transition-all duration-1000 ${
                          articleData.seoScore >= 80 ? "text-emerald-500" :
                          articleData.seoScore >= 50 ? "text-orange-500" : "text-rose-500"
                        }`}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-black">{articleData.seoScore}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">/ 100</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs font-bold text-slate-400 text-center px-4">
                    {articleData.seoScore === 0 ? "Bắt đầu tạo nội dung để xem điểm SEO" : "Tiếp tục tối ưu để đạt điểm cao nhất"}
                  </p>
                </div>
              </div>

              {/* Keyword Card */}
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Từ khóa mục tiêu</h3>
                <div className="flex flex-wrap gap-2">
                  {articleData.keywords.length > 0 ? articleData.keywords.map((kw, i) => (
                    <span key={i} className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                      {kw}
                    </span>
                  )) : (
                    <p className="text-xs text-slate-400 italic">Chưa có từ khóa nào</p>
                  )}
                </div>
              </div>

              {/* Warning Card */}
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Cảnh báo</h3>
                <div className="space-y-3">
                  {articleData.seoIssues.length > 0 ? articleData.seoIssues.map((issue) => (
                    <div key={issue.id} className="flex items-start gap-2">
                      <div className={`mt-0.5 ${issue.status === 'critical' ? 'text-rose-500' : 'text-orange-500'}`}>
                        <AlertCircle size={14} />
                      </div>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed">{issue.label}</p>
                    </div>
                  )) : (
                    <p className="text-xs text-slate-400 italic">Chưa phát hiện vấn đề nào</p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

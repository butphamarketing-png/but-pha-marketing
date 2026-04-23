"use client";

import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
  Image as ImageIcon,
  ListOrdered,
  Rocket,
  Save,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Step1Title } from "@/components/studio/Step1Title";
import { Step2Outline } from "@/components/studio/Step2Outline";
import { Step3Article } from "@/components/studio/Step3Article";
import { Step4Images } from "@/components/studio/Step4Images";
import { Step5SEO } from "@/components/studio/Step5SEO";
import { Step6Publish } from "@/components/studio/Step6Publish";

const STEPS = [
  { id: 1, name: "Nhap tieu de", icon: FileText },
  { id: 2, name: "Xem dan y", icon: ListOrdered },
  { id: 3, name: "Viet bai", icon: Sparkles },
  { id: 4, name: "Chen hinh anh", icon: ImageIcon },
  { id: 5, name: "Toi uu SEO", icon: Target },
  { id: 6, name: "Xuat ban", icon: Rocket },
];

type HistoryItem = {
  id: string;
  createdAt: string;
  type: "outline" | "article";
  status: "success" | "error";
  title: string;
  provider: "openai" | "serpapi" | "fallback" | "system";
  model?: string;
  keywords?: string[];
  intent?: string;
  source?: string;
  detail?: string;
  hint?: string;
};

const INITIAL_DATA = {
  title: "",
  outline: [] as any[],
  content: "",
  keywords: [] as string[],
  seoScore: 0,
  seoIssues: [] as any[],
  images: [] as any[],
  searchIntent: "",
  serpInsight: null as null | {
    source: string;
    intent: string;
    relatedKeywords: string[];
    headlines: string[];
    location: string;
  },
  aiError: null as null | {
    message: string;
    detail?: string;
    hint?: string;
    provider?: string;
  },
};

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

export default function CreateArticlePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [articleData, setArticleData] = useState(INITIAL_DATA);

  useEffect(() => {
    let cancelled = false;

    const loadHistory = async () => {
      try {
        setHistoryLoading(true);
        setHistoryError("");
        const response = await fetch("/api/ai/history", { cache: "no-store" });
        const payload = (await response.json().catch(() => null)) as
          | { items?: HistoryItem[]; error?: string }
          | null;

        if (!response.ok) {
          throw new Error(payload?.error || "Khong the tai lich su SEO Studio.");
        }

        if (!cancelled) {
          setHistory(Array.isArray(payload?.items) ? payload.items : []);
        }
      } catch (error) {
        if (!cancelled) {
          setHistoryError(error instanceof Error ? error.message : "Khong the tai lich su SEO Studio.");
        }
      } finally {
        if (!cancelled) {
          setHistoryLoading(false);
        }
      }
    };

    void loadHistory();

    return () => {
      cancelled = true;
    };
  }, []);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const refreshHistory = async () => {
    const response = await fetch("/api/ai/history", { cache: "no-store" });
    const payload = (await response.json().catch(() => null)) as { items?: HistoryItem[]; error?: string } | null;
    if (!response.ok) {
      throw new Error(payload?.error || "Khong the tai lich su SEO Studio.");
    }
    setHistory(Array.isArray(payload?.items) ? payload.items : []);
  };

  const renderStep = () => {
    const sharedProps = {
      data: articleData,
      setData: setArticleData,
      onHistoryChange: refreshHistory,
    };

    switch (currentStep) {
      case 1:
        return <Step1Title {...sharedProps} onNext={nextStep} />;
      case 2:
        return <Step2Outline {...sharedProps} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <Step3Article data={articleData} setData={setArticleData} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <Step4Images data={articleData} setData={setArticleData} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <Step5SEO data={articleData} setData={setArticleData} onNext={nextStep} onPrev={prevStep} />;
      case 6:
        return <Step6Publish data={articleData} setData={setArticleData} onPrev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 px-8 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/news" className="rounded-xl border border-slate-200 p-2 text-slate-400 transition-colors hover:bg-slate-50">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg font-black tracking-tight">Tao Bai Viet Moi</h1>
              <p className="text-xs text-slate-500">Quy trinh tao noi dung chuan SEO voi AI</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50">
              <Save size={18} />
              Luu nhap
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-500">
              Huy bo
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-7xl px-8">
        <div className="mb-10 flex items-center justify-between">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className="relative flex flex-col items-center gap-2">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                    currentStep === step.id
                      ? "scale-110 border-indigo-600 bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-100"
                      : currentStep > step.id
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-200 bg-white text-slate-300"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle2 size={24} /> : <step.icon size={22} />}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    currentStep === step.id
                      ? "text-indigo-600"
                      : currentStep > step.id
                        ? "text-emerald-600"
                        : "text-slate-400"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-4 h-0.5 flex-1 bg-slate-200">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: currentStep > step.id ? "100%" : "0%" }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          <main className="min-h-[600px] rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
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

          <aside className="space-y-6">
            <div className="sticky top-28 space-y-6">
              {articleData.aiError ? (
                <div className="rounded-[32px] border border-rose-200 bg-rose-50 p-6 shadow-sm">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-rose-700">
                    <AlertCircle size={16} />
                    Loi AI moi nhat
                  </h3>
                  <p className="text-sm font-bold text-rose-800">{articleData.aiError.message}</p>
                  {articleData.aiError.detail ? <p className="mt-2 text-xs leading-6 text-rose-700">{articleData.aiError.detail}</p> : null}
                  {articleData.aiError.hint ? <p className="mt-3 text-xs font-semibold text-rose-800">Goi y: {articleData.aiError.hint}</p> : null}
                </div>
              ) : null}

              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-500">Tong ket SEO</h3>
                <div className="flex flex-col items-center">
                  <div className="relative flex h-32 w-32 items-center justify-center">
                    <svg className="h-full w-full -rotate-90 transform">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={364.4}
                        strokeDashoffset={364.4 - (364.4 * articleData.seoScore) / 100}
                        className={`transition-all duration-1000 ${
                          articleData.seoScore >= 80
                            ? "text-emerald-500"
                            : articleData.seoScore >= 50
                              ? "text-orange-500"
                              : "text-rose-500"
                        }`}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-black">{articleData.seoScore}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">/ 100</span>
                    </div>
                  </div>
                  <p className="mt-4 px-4 text-center text-xs font-bold text-slate-400">
                    {articleData.seoScore === 0 ? "Bat dau tao noi dung de xem diem SEO" : "Tiep tuc toi uu de dat diem cao nhat"}
                  </p>
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500">Tu khoa muc tieu</h3>
                <div className="flex flex-wrap gap-2">
                  {articleData.keywords.length > 0 ? (
                    articleData.keywords.map((kw, i) => (
                      <span key={`${kw}-${i}`} className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                        {kw}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs italic text-slate-400">Chua co tu khoa nao</p>
                  )}
                </div>
                {articleData.searchIntent ? (
                  <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Search Intent</p>
                    <p className="mt-2 text-sm font-bold capitalize text-slate-800">{articleData.searchIntent}</p>
                    {articleData.serpInsight ? (
                      <p className="mt-1 text-xs text-slate-500">
                        Nguon: {articleData.serpInsight.source} • Khu vuc: {articleData.serpInsight.location}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500">Canh bao</h3>
                <div className="space-y-3">
                  {articleData.seoIssues.length > 0 ? (
                    articleData.seoIssues.map((issue: any) => (
                      <div key={issue.id} className="flex items-start gap-2">
                        <div className={`mt-0.5 ${issue.status === "critical" ? "text-rose-500" : "text-orange-500"}`}>
                          <AlertCircle size={14} />
                        </div>
                        <p className="text-[11px] font-medium leading-relaxed text-slate-600">{issue.label}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs italic text-slate-400">Chua phat hien van de nao</p>
                  )}
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Lich su AI</h3>
                  <Clock3 size={16} className="text-slate-300" />
                </div>
                {historyLoading ? (
                  <p className="text-xs text-slate-400">Dang tai lich su...</p>
                ) : historyError ? (
                  <p className="text-xs font-semibold text-rose-600">{historyError}</p>
                ) : history.length === 0 ? (
                  <p className="text-xs text-slate-400">Chua co lan tao dan y hoac bai viet nao.</p>
                ) : (
                  <div className="space-y-3">
                    {history.slice(0, 6).map((item) => (
                      <div key={item.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                              {item.type === "outline" ? "Dan y" : "Bai viet"} • {item.status === "success" ? "Thanh cong" : "Loi"}
                            </p>
                            <p className="mt-1 text-sm font-bold text-slate-800">{item.title}</p>
                          </div>
                          <span
                            className={`rounded-full px-2 py-1 text-[10px] font-black uppercase ${
                              item.status === "success" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                            }`}
                          >
                            {item.provider}
                          </span>
                        </div>
                        <p className="mt-2 text-[11px] leading-5 text-slate-500">{item.detail || "Khong co mo ta them."}</p>
                        {item.hint ? <p className="mt-2 text-[11px] font-semibold text-slate-700">Goi y: {item.hint}</p> : null}
                        <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{formatTime(item.createdAt)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

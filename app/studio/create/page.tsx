"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Image as ImageIcon,
  ListOrdered,
  Rocket,
  Save,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { mergeNewsContentMeta } from "@/lib/news-content-meta";
import { db } from "@/lib/useData";
import { autoFixSeoDraft } from "@/lib/seo-autofix";
import { buildExcerpt, buildMetaDescription, buildMetaTitle, buildReliableSlug, buildSeoFriendlyTitle, deriveKeywordCandidates, slugify, type SeoStudioSnapshot } from "@/lib/seo-studio-draft";
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
  snapshot?: SeoStudioSnapshot | null;
};

const INITIAL_DATA = {
  title: "",
  slug: "",
  featuredImageUrl: "",
  metaTitle: "",
  metaDescription: "",
  description: "",
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
  published: false,
  hot: false,
  publishedAt: new Date().toISOString().slice(0, 10),
  savedNewsId: "",
};

function getQualityLabel(score: number) {
  if (score >= 80) return "ready" as const;
  if (score >= 65) return "needs_optimization" as const;
  return "weak" as const;
}

function getLocalDraftKey(newsId?: string, slug?: string) {
  return `seo-studio-local-draft:${newsId || slug || "new"}`;
}

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

function CreateArticlePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newsId = searchParams.get("id") || searchParams.get("newsId") || "";
  const [currentStep, setCurrentStep] = useState(1);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyFilter, setHistoryFilter] = useState<"all" | "outline" | "article">("all");
  const [draftSaving, setDraftSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [loadingExisting, setLoadingExisting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [articleData, setArticleData] = useState(INITIAL_DATA);
  const localDraftKey = getLocalDraftKey(newsId || articleData.savedNewsId, articleData.slug);

  useEffect(() => {
    let cancelled = false;

    const loadHistory = async () => {
      try {
        setHistoryLoading(true);
        setHistoryError("");
        const response = await fetch("/api/ai/history", { cache: "no-store" });
        const payload = (await response.json().catch(() => null)) as { items?: HistoryItem[]; error?: string } | null;

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

  useEffect(() => {
    let cancelled = false;

    const loadExistingArticle = async () => {
      if (newsId) {
        try {
          setLoadingExisting(true);
          const result = await db.news.get(newsId);
          if (result.error || !result.data) {
            throw new Error(result.error || "Khong the tai bai viet de chinh sua.");
          }

          if (!cancelled) {
            const item = result.data;
            setArticleData((prev) => ({
              ...prev,
              title: item.title || "",
              slug: item.slug || "",
              featuredImageUrl: item.imageUrl || "",
              metaTitle: item.metaTitle || item.title || "",
              metaDescription: item.metaDescription || "",
              description: item.description || "",
              content: item.content || "",
              keywords: [item.keywordsMain || "", ...(item.keywordsSecondary || "").split(",").map((part) => part.trim()).filter(Boolean)].filter(Boolean),
              images: item.imageUrl
                ? [{ url: item.imageUrl, name: item.title || "Thumbnail", altText: item.title || "", sectionLabel: "Thumbnail" }]
                : [],
              published: item.published !== false,
              hot: !!item.hot,
              publishedAt: item.publishedAt ? new Date(item.publishedAt).toISOString().slice(0, 10) : prev.publishedAt,
              savedNewsId: item.id,
            }));
            setCurrentStep(3);
            setActionMessage("Da mo bai viet de chinh sua trong SEO Studio.");
          }
        } catch (error) {
          if (!cancelled) {
            setActionError(error instanceof Error ? error.message : "Khong the tai bai viet de chinh sua.");
          }
        } finally {
          if (!cancelled) setLoadingExisting(false);
        }
        return;
      }

      const savedDraft = typeof window !== "undefined" ? window.localStorage.getItem(getLocalDraftKey(newsId, "")) || window.localStorage.getItem(getLocalDraftKey("", "new")) : null;
      if (!savedDraft) return;

      try {
        const snapshot = JSON.parse(savedDraft) as typeof INITIAL_DATA;
        if (!cancelled && snapshot?.title) {
          setArticleData((prev) => ({ ...prev, ...snapshot }));
          setActionMessage("Da phuc hoi ban nhap tu dong tren may nay.");
        }
      } catch {
        // ignore bad local draft
      }
    };

    void loadExistingArticle();

    return () => {
      cancelled = true;
    };
  }, [newsId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!articleData.title && !articleData.content && !articleData.outline.length) return;

    const handle = window.setTimeout(() => {
      window.localStorage.setItem(localDraftKey, JSON.stringify(articleData));
    }, 800);

    return () => window.clearTimeout(handle);
  }, [articleData, localDraftKey]);

  useEffect(() => {
    if (!articleData.title.trim()) return;

    setArticleData((prev) => {
      const nextKeywords = prev.keywords.length > 0 ? prev.keywords : deriveKeywordCandidates(prev.title);
      const nextTitle = prev.title ? buildSeoFriendlyTitle({ title: prev.title, keyword: nextKeywords[0] }) : prev.title;
      const nextSlug = prev.slug || buildReliableSlug({ title: nextTitle, keyword: nextKeywords[0] });
      const nextMetaTitle = prev.metaTitle || buildMetaTitle({ title: nextTitle, keyword: nextKeywords[0] });
      const nextDescription = prev.description || buildExcerpt({ description: prev.description, content: prev.content, maxLength: 170 });
      const nextMetaDescription =
        prev.metaDescription || buildMetaDescription({ title: nextTitle, keyword: nextKeywords[0], description: nextDescription, content: prev.content });

      if (
        nextTitle === prev.title &&
        nextKeywords.join("|") === prev.keywords.join("|") &&
        nextSlug === prev.slug &&
        nextMetaTitle === prev.metaTitle &&
        nextDescription === prev.description &&
        nextMetaDescription === prev.metaDescription
      ) {
        return prev;
      }

      return {
        ...prev,
        title: nextTitle,
        keywords: nextKeywords,
        slug: nextSlug,
        metaTitle: nextMetaTitle,
        description: nextDescription,
        metaDescription: nextMetaDescription,
      };
    });
  }, [articleData.title, articleData.content, articleData.keywords]);

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

  const applyHistorySnapshot = (snapshot: SeoStudioSnapshot | null | undefined) => {
    if (!snapshot) return;

    const normalizedSerpInsight = snapshot.serpInsight
      ? {
          source: snapshot.serpInsight.source || "system",
          intent: snapshot.serpInsight.intent || "",
          relatedKeywords: Array.isArray(snapshot.serpInsight.relatedKeywords) ? snapshot.serpInsight.relatedKeywords : [],
          headlines: Array.isArray(snapshot.serpInsight.headlines) ? snapshot.serpInsight.headlines : [],
          location: snapshot.serpInsight.location || "",
        }
      : null;

    setActionError("");
    setActionMessage("Da mo lai ket qua tu lich su.");
    setArticleData((prev) => ({
      ...prev,
      title: buildSeoFriendlyTitle({ title: snapshot.title || prev.title, keyword: snapshot.keywords?.[0] || prev.keywords?.[0] }),
      slug: snapshot.slug || buildReliableSlug({ title: snapshot.title || prev.title, keyword: snapshot.keywords?.[0] || prev.keywords?.[0] }),
      featuredImageUrl: snapshot.featuredImageUrl || snapshot.images?.[0]?.url || prev.featuredImageUrl,
      metaTitle: snapshot.metaTitle || buildMetaTitle({ title: snapshot.title || prev.title, keyword: snapshot.keywords?.[0] }),
      metaDescription:
        snapshot.metaDescription ||
        buildMetaDescription({
          title: snapshot.title || prev.title,
          keyword: snapshot.keywords?.[0],
          description: snapshot.description,
          content: snapshot.content,
        }),
      description: snapshot.description || buildExcerpt({ content: snapshot.content || prev.content, maxLength: 170 }),
      content: snapshot.content || prev.content,
      keywords: Array.isArray(snapshot.keywords) ? snapshot.keywords : prev.keywords,
      outline: Array.isArray(snapshot.outline) ? snapshot.outline : prev.outline,
      searchIntent: snapshot.searchIntent || prev.searchIntent,
      serpInsight: normalizedSerpInsight || prev.serpInsight,
      images: Array.isArray(snapshot.images) ? snapshot.images : prev.images,
      published: typeof snapshot.published === "boolean" ? snapshot.published : prev.published,
      hot: typeof snapshot.hot === "boolean" ? snapshot.hot : prev.hot,
      publishedAt: snapshot.publishedAt || prev.publishedAt,
      savedNewsId: snapshot.savedNewsId || prev.savedNewsId,
      aiError: null,
    }));

    if (snapshot.content) setCurrentStep(3);
    else if (snapshot.outline?.length) setCurrentStep(2);
    else setCurrentStep(1);
  };

  const saveStudioArticle = async (mode: "draft" | "publish") => {
    if (!articleData.title.trim()) {
      setActionError("Nhap tieu de bai viet truoc khi luu.");
      return;
    }

    const derivedContent =
      articleData.content.trim() ||
      (Array.isArray(articleData.outline) && articleData.outline.length > 0
        ? articleData.outline
            .map((item: any) => {
              const heading = item?.text || item?.heading || "";
              if (!heading) return "";
              const tag = item?.level === 3 ? "h3" : "h2";
              return `<${tag} id="${slugify(heading)}">${heading}</${tag}><p>${item?.summary || `Noi dung nhap cho phan ${heading}.`}</p>`;
            })
            .filter(Boolean)
            .join("")
        : "");

    if (!derivedContent.trim()) {
      setActionError("Can co noi dung hoac it nhat mot dan y de luu nhap.");
      return;
    }

    setActionError("");
    setActionMessage("");
    mode === "draft" ? setDraftSaving(true) : setPublishing(true);

    const autoFixed = autoFixSeoDraft({
      title: articleData.title.trim(),
      metaTitle: articleData.metaTitle,
      metaDescription: articleData.metaDescription,
      description: articleData.description,
      slug: articleData.slug,
      content: derivedContent,
      keywords: articleData.keywords,
      imageUrls: Array.isArray(articleData.images) ? articleData.images.map((item: any) => item?.url).filter(Boolean) : [],
      serviceKeywords: articleData.serpInsight?.relatedKeywords || articleData.keywords,
    });

    const hasCriticalIssue = autoFixed.evaluation.issues.some((item) => item.status === "critical");
    const allowPublish = mode === "publish" && !hasCriticalIssue;
    const qualityLabel = getQualityLabel(autoFixed.evaluation.score);

    const payload = {
      title: autoFixed.title,
      content: mergeNewsContentMeta(autoFixed.content, {
        metaTitle: autoFixed.metaTitle,
        seoScore: autoFixed.evaluation.score,
        qualityLabel,
        indexStatus: allowPublish ? "pending_indexing" : "unknown",
        automation: {
          source: "manual",
          generatedAt: new Date().toISOString(),
          autoPublished: false,
        },
      }),
      category: "blog",
      published: allowPublish,
      description: autoFixed.description || buildExcerpt({ content: autoFixed.content, maxLength: 170 }),
      imageUrl:
        articleData.featuredImageUrl ||
        (Array.isArray(articleData.images) && articleData.images.length > 0 ? articleData.images[0]?.url || "" : ""),
      slug: autoFixed.slug || buildReliableSlug({ title: autoFixed.title, keyword: autoFixed.keywords[0] }),
      hot: articleData.hot,
      metaDescription: autoFixed.metaDescription || buildMetaDescription({
        title: autoFixed.title,
        keyword: autoFixed.keywords[0],
        description: autoFixed.description,
        content: autoFixed.content,
      }),
      keywordsMain: autoFixed.keywords[0] || "",
      keywordsSecondary: autoFixed.keywords.slice(1).join(", "),
      publishedAt: articleData.publishedAt || new Date().toISOString().slice(0, 10),
    };

    try {
      if (articleData.savedNewsId) {
        const result = await db.news.update(articleData.savedNewsId, payload);
        if (result.error) {
          throw new Error(result.error);
        }
      } else {
        const result = await db.news.add(payload);
        if (result.error || !result.data) {
          throw new Error(result.error || "Khong the luu bai viet.");
        }
        setArticleData((prev) => ({ ...prev, savedNewsId: result.data?.id || "", published: payload.published }));
      }

      setArticleData((prev) => ({
        ...prev,
        title: autoFixed.title,
        slug: payload.slug,
        featuredImageUrl: payload.imageUrl,
        metaDescription: payload.metaDescription,
        description: payload.description,
        metaTitle: autoFixed.metaTitle,
        content: autoFixed.content,
        keywords: autoFixed.keywords,
        seoScore: autoFixed.evaluation.score,
        seoIssues: autoFixed.evaluation.issues,
        published: payload.published,
      }));

      setActionMessage(
        mode === "publish"
          ? allowPublish
            ? autoFixed.evaluation.score >= 80
              ? "Da xuat ban bai viet thanh cong."
              : `Bai da dang voi ${autoFixed.evaluation.score}/100 va duoc danh dau can toi uu them.`
            : `Bai viet van con loi critical, he thong da luu nhap de ban xem lai.`
          : "Da luu nhap bai viet.",
      );
      await refreshHistory().catch(() => undefined);
      if (mode === "publish" && allowPublish) {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(localDraftKey);
        }
        router.push("/admin/news");
      }
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Khong the luu bai viet luc nay.");
    } finally {
      setDraftSaving(false);
      setPublishing(false);
    }
  };

  const handleReset = () => {
    setArticleData(INITIAL_DATA);
    setCurrentStep(1);
    setActionError("");
    setActionMessage("");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(localDraftKey);
    }
  };

  const handleDeleteHistory = async (id: string) => {
    const response = await fetch("/api/ai/history", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const payload = (await response.json().catch(() => null)) as { items?: HistoryItem[]; error?: string } | null;
    if (!response.ok) {
      throw new Error(payload?.error || "Khong the xoa lich su.");
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
        return (
          <Step6Publish
            data={articleData}
            setData={setArticleData}
            onPrev={prevStep}
            onSaveDraft={() => void saveStudioArticle("draft")}
            onPublish={() => void saveStudioArticle("publish")}
            savingDraft={draftSaving}
            publishing={publishing}
            actionError={actionError}
            actionMessage={actionMessage}
          />
        );
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
              <h1 className="text-lg font-black tracking-tight">{articleData.savedNewsId ? "Chinh Sua Bai Viet" : "Tao Bai Viet Moi"}</h1>
              <p className="text-xs text-slate-500">
                {articleData.savedNewsId ? "Dang mo bai viet de chinh sua trong SEO Studio" : "Quy trinh tao noi dung chuan SEO voi AI"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => void saveStudioArticle("draft")}
              disabled={draftSaving}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-60"
            >
              {draftSaving ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" /> : <Save size={18} />}
              Luu nhap
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-500"
            >
              Huy bo
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-7xl px-8">
        {loadingExisting ? (
          <div className="mb-6 rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-4 text-sm font-semibold text-indigo-700">
            Dang tai bai viet de chinh sua...
          </div>
        ) : null}
        {actionMessage && !actionError ? (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">{actionMessage}</div>
        ) : null}

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
                    currentStep === step.id ? "text-indigo-600" : currentStep > step.id ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-4 h-0.5 flex-1 bg-slate-200">
                  <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: currentStep > step.id ? "100%" : "0%" }} />
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
                          articleData.seoScore >= 80 ? "text-emerald-500" : articleData.seoScore >= 50 ? "text-orange-500" : "text-rose-500"
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
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500">Metadata</h3>
                <div className="space-y-3 text-sm">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Slug</p>
                    <p className="mt-2 font-bold text-slate-800">{articleData.slug || "Chua co slug"}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Meta Title</p>
                    <p className="mt-2 font-bold text-slate-800">{articleData.metaTitle || "Chua co meta title"}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Meta Description</p>
                    <p className="mt-2 text-xs leading-6 text-slate-700">{articleData.metaDescription || "Chua co meta description"}</p>
                  </div>
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
                    {articleData.serpInsight ? <p className="mt-1 text-xs text-slate-500">Nguon: {articleData.serpInsight.source} • Khu vuc: {articleData.serpInsight.location}</p> : null}
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
                <div className="mb-4 flex gap-2">
                  {[
                    { id: "all", label: "Tat ca" },
                    { id: "outline", label: "Dan y" },
                    { id: "article", label: "Bai viet" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setHistoryFilter(item.id as typeof historyFilter)}
                      className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                        historyFilter === item.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                {historyLoading ? (
                  <p className="text-xs text-slate-400">Dang tai lich su...</p>
                ) : historyError ? (
                  <p className="text-xs font-semibold text-rose-600">{historyError}</p>
                ) : history.length === 0 ? (
                  <p className="text-xs text-slate-400">Chua co lan tao dan y hoac bai viet nao.</p>
                ) : (
                  <div className="space-y-3">
                    {history
                      .filter((item) => historyFilter === "all" || item.type === historyFilter)
                      .slice(0, 8)
                      .map((item) => (
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
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{formatTime(item.createdAt)}</p>
                          <div className="flex items-center gap-2">
                            {item.snapshot ? (
                              <button
                                type="button"
                                onClick={() => applyHistorySnapshot(item.snapshot)}
                                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 transition hover:bg-slate-100"
                              >
                                <Eye size={12} />
                                Mo lai
                              </button>
                            ) : null}
                            <button
                              type="button"
                              onClick={() => void handleDeleteHistory(item.id).catch((error) => setHistoryError(error instanceof Error ? error.message : "Khong the xoa lich su."))}
                              className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-600 transition hover:bg-rose-50"
                            >
                              Xoa
                            </button>
                          </div>
                        </div>
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

export default function CreateArticlePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <CreateArticlePageContent />
    </Suspense>
  );
}

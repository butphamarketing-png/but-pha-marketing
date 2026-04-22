"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  analyzeSerpForPost,
  createCluster,
  createContentBrief,
  createPost,
  generateArticle,
  getDecayCheck,
  getInternalLinks,
  getInterlinkOpportunities,
  getLatestSerpAnalysis,
  getPost,
  getPosts,
  getRelatedPosts,
  getRankTracking,
  refreshPost,
  trackKeyword,
  updatePost,
} from "@/lib/seo-studio/api";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Copy,
  FileText,
  History,
  Link2,
  ListOrdered,
  MoreVertical,
  Plus,
  RefreshCw,
  Rocket,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Target as TargetIcon,
  TrendingDown,
  TrendingUp,
  Wand2,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ContentBrief,
  DecayCheck,
  GenerateArticleResponse,
  InternalLinkSuggestion,
  InterlinkOpportunity,
  RankTrackingResponse,
  PostDetail,
  PostListItem,
  PostStatus,
  RefreshSuggestion,
  RelatedPost,
  SerpAnalysis,
  TopicalCluster,
} from "@/lib/seo-studio/types";

type PostStudioProps = {
  postId?: string;
  seedKeyword?: string;
  initialIds?: string[];
};

type EditorState = {
  title: string;
  slug: string;
  metaDescription: string;
  keywords: string;
  content: string;
  status: PostStatus;
};

const EMPTY_EDITOR: EditorState = {
  title: "",
  slug: "",
  metaDescription: "",
  keywords: "",
  content: "",
  status: "draft",
};

export function PostStudio({ postId, seedKeyword, initialIds }: PostStudioProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [activePost, setActivePost] = useState<PostDetail | null>(null);
  const [editor, setEditor] = useState<EditorState>(EMPTY_EDITOR);
  const [generation, setGeneration] = useState<GenerateArticleResponse | null>(null);
  const [contentBrief, setContentBrief] = useState<ContentBrief | null>(null);
  const [cluster, setCluster] = useState<TopicalCluster | null>(null);
  const [serpAnalysis, setSerpAnalysis] = useState<SerpAnalysis | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [internalLinks, setInternalLinks] = useState<InternalLinkSuggestion[]>([]);
  const [interlinkOpportunities, setInterlinkOpportunities] = useState<InterlinkOpportunity[]>([]);
  const [rankTracking, setRankTracking] = useState<RankTrackingResponse | null>(null);
  const [decayCheck, setDecayCheck] = useState<DecayCheck | null>(null);
  const [trackedKeyword, setTrackedKeyword] = useState("");
  const [trackedLocation, setTrackedLocation] = useState("");
  const [refreshSuggestion, setRefreshSuggestion] = useState<RefreshSuggestion | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      void loadPosts();
    });
  }, []);

  useEffect(() => {
    if (!postId) {
      setActivePost(null);
      setEditor((current) => (current === EMPTY_EDITOR ? current : EMPTY_EDITOR));
      setGeneration(null);
      setContentBrief(null);
      setCluster(null);
      setSerpAnalysis(null);
      setRelatedPosts([]);
      setInternalLinks([]);
      setInterlinkOpportunities([]);
      setRankTracking(null);
      setDecayCheck(null);
      setTrackedKeyword("");
      setTrackedLocation("");
      setRefreshSuggestion(null);
      return;
    }

    startTransition(() => {
      void loadPost(postId);
    });
  }, [postId]);

  useEffect(() => {
    if (postId || !seedKeyword?.trim()) {
      return;
    }

    const keyword = seedKeyword.trim();

    setEditor((current) => {
      if (current.title || current.keywords || current.content) {
        return current;
      }

      return {
        ...EMPTY_EDITOR,
        title: keyword,
        slug: keyword
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-"),
        keywords: keyword,
      };
    });
  }, [postId, seedKeyword]);

  const generationHistory = useMemo(() => activePost?.generations ?? [], [activePost]);
  const visiblePosts = useMemo(() => {
    if (!initialIds?.length) {
      return posts;
    }

    const idSet = new Set(initialIds);
    return posts.filter((post) => idSet.has(post.id));
  }, [initialIds, posts]);

  async function loadPosts() {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load posts");
    }
  }

  async function loadPost(id: string) {
    try {
      const post = await getPost(id);
      setActivePost(post);
      setEditor({
        title: post.title,
        slug: post.slug,
        metaDescription: post.metaDescription,
        keywords: post.keywords.join(", "),
        content: post.content,
        status: post.status,
      });
      setGeneration(null);
      setMessage(null);
      setTrackedKeyword(post.keywords[0] ?? "");
      await loadSeoSuggestions(post.id);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load post");
    }
  }

  async function loadSeoSuggestions(id: string) {
    try {
      const [related, links, opportunities, ranks, decay, latestSerp] = await Promise.all([
        getRelatedPosts(id),
        getInternalLinks(id),
        getInterlinkOpportunities(id),
        getRankTracking(id),
        getDecayCheck(id),
        getLatestSerpAnalysis(id),
      ]);

      setRelatedPosts(related);
      setInternalLinks(links);
      setInterlinkOpportunities(opportunities);
      setRankTracking(ranks);
      setDecayCheck(decay);
      setSerpAnalysis(
        latestSerp
          ? {
              id: latestSerp.id,
              query: latestSerp.query,
              location: latestSerp.location,
              topResults: Array.isArray(latestSerp.topResults) ? latestSerp.topResults : [],
              headings: Array.isArray(latestSerp.headings) ? latestSerp.headings : [],
              avgLength: latestSerp.avgLength,
              contentGap: Array.isArray(latestSerp.contentGap) ? latestSerp.contentGap : [],
            }
          : null,
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load SEO suggestions");
    }
  }

  function updateField<K extends keyof EditorState>(key: K, value: EditorState[K]) {
    setEditor((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleGenerate() {
    if (!editor.title.trim()) {
      setMessage("Enter a title before generating.");
      return;
    }

    setMessage("Generating article...");

    try {
      const result = await generateArticle(editor.title, activePost?.id);
      setGeneration(result);
      setEditor((current) => ({
        ...current,
        title: result.title,
        slug: result.slug,
        metaDescription: result.metaDescription,
        keywords: result.keywords.join(", "),
        content: result.content,
      }));
      setRefreshSuggestion(null);
      setMessage(`Generation v${result.version} ready.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Generation failed");
    }
  }

  async function handleSave() {
    if (!editor.title.trim() || !editor.slug.trim() || !editor.content.trim()) {
      setMessage("Title, slug, and content are required.");
      return;
    }

    const payload = {
      title: editor.title.trim(),
      slug: editor.slug.trim(),
      metaDescription: editor.metaDescription.trim(),
      content: editor.content.trim(),
      keywords: editor.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
      status: editor.status,
      generationId: generation?.generationId,
    } as const;

    setMessage(activePost ? "Saving changes..." : "Creating post...");

    try {
      const saved = activePost
        ? await updatePost(activePost.id, payload)
        : await createPost(payload);

      await loadPosts();
      await loadPost(saved.id);
      if (!activePost) {
        router.push(`/studio/posts/${saved.id}`);
      }
      setRefreshSuggestion(null);
      setMessage("Post saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    }
  }

  async function handleContentBrief() {
    if (!editor.title.trim()) {
      setMessage("Enter a title before generating a content brief.");
      return;
    }

    setMessage("Generating content brief...");

    try {
      const result = await createContentBrief(editor.title, activePost?.id);
      setContentBrief({
        ...result,
        outlineSuggestion: Array.isArray(result.outlineSuggestion) ? result.outlineSuggestion : [],
        contentGaps: Array.isArray(result.contentGaps) ? result.contentGaps : [],
      });
      setMessage("Content brief ready.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Content brief failed");
    }
  }

  async function handleCluster() {
    if (!editor.title.trim()) {
      setMessage("Enter a title or topic before generating a cluster.");
      return;
    }

    setMessage("Generating topical cluster...");

    try {
      const result = await createCluster(editor.title);
      setCluster({
        ...result,
        clusterTopics: Array.isArray(result.clusterTopics) ? result.clusterTopics : [],
      });
      setMessage("Topical cluster ready.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Cluster generation failed");
    }
  }

  async function handleSerpAnalysis() {
    if (!editor.title.trim()) {
      setMessage("Enter a title before analyzing the SERP.");
      return;
    }

    setMessage("Analyzing SERP...");

    try {
      const result = await analyzeSerpForPost(editor.title, activePost?.id);
      setSerpAnalysis(result);
      setMessage("SERP analysis ready.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "SERP analysis failed");
    }
  }

  async function handleTrackKeyword() {
    if (!activePost) {
      setMessage("Save the post before tracking rankings.");
      return;
    }

    if (!trackedKeyword.trim()) {
      setMessage("Enter a keyword to track.");
      return;
    }

    setMessage("Tracking keyword ranking...");

    try {
      await trackKeyword(activePost.id, trackedKeyword.trim(), trackedLocation.trim() || undefined);
      await loadSeoSuggestions(activePost.id);
      await loadPost(activePost.id);
      setMessage("Ranking checkpoint stored.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ranking check failed");
    }
  }

  async function handleRefresh() {
    if (!activePost) {
      setMessage("Save the post before creating a refresh draft.");
      return;
    }

    setMessage("Generating refresh draft...");

    try {
      const result = await refreshPost(activePost.id);
      setRefreshSuggestion(result);
      setMessage(`Refresh draft v${result.version} ready for review.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Refresh failed");
    }
  }

  function handleApplyRefreshDraft() {
    if (!refreshSuggestion) {
      return;
    }

    setEditor((current) => ({
      ...current,
      content: refreshSuggestion.newContent,
    }));
    setGeneration({
      generationId: refreshSuggestion.generationId,
      version: refreshSuggestion.version,
      type: "refresh",
      title: editor.title,
      slug: editor.slug,
      metaDescription: editor.metaDescription,
      keywords: editor.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
      content: refreshSuggestion.newContent,
      outline: refreshSuggestion.improvements.map((item) => ({ heading: "Improvement", summary: item })),
      faq: [],
      cta: { heading: "", body: "", buttonText: "" },
      searchIntent: "",
      targetAudience: "",
      primaryKeyword: "",
      secondaryKeywords: [],
    });
    setMessage("Refresh draft applied to the editor. Review manually, then save if approved.");
  }

  function handleNewPost() {
    setActivePost(null);
    setEditor(EMPTY_EDITOR);
    setGeneration(null);
    setMessage(null);
    router.push("/studio");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(240,153,67,0.18),_transparent_40%),linear-gradient(180deg,_#f8f3eb,_#efe7db)] text-slate-900">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-[28px] border border-amber-200/70 bg-white/80 p-5 shadow-[0_20px_80px_rgba(103,63,19,0.08)] backdrop-blur">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">Phase 1</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">SEO Studio</h1>
            <p className="mt-2 text-sm text-slate-600">
              Generate, edit, save, and regenerate SEO articles with version history.
            </p>
          </div>

          <button
            type="button"
            onClick={handleNewPost}
            className="mb-5 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            New Post
          </button>

          <div className="space-y-3">
            {visiblePosts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50 px-4 py-6 text-sm text-slate-600">
                No posts saved yet.
              </div>
            ) : (
              visiblePosts.map((post) => {
                const isActive = activePost?.id === post.id || postId === post.id;

                return (
                  <Link
                    key={post.id}
                    href={`/studio/posts/${post.id}`}
                    className={`block rounded-2xl border px-4 py-4 transition ${
                      isActive
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-amber-200 bg-white hover:border-amber-300 hover:bg-amber-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="line-clamp-2 text-sm font-semibold">{post.title}</p>
                      <span className="rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.2em]">
                        v{post.currentVersion}
                      </span>
                    </div>
                    <p className={`mt-2 text-xs ${isActive ? "text-white/70" : "text-slate-500"}`}>{post.slug}</p>
                  </Link>
                );
              })
            )}
          </div>
        </aside>

        <section className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_24px_90px_rgba(32,20,6,0.08)] backdrop-blur lg:p-8">
          {activePost?.needsUpdate && (
            <div className="mb-6 flex items-center justify-between rounded-[24px] border border-orange-200 bg-orange-50 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                  <TrendingDown size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Bài viết đang tụt hạng!</h3>
                  <p className="text-sm text-slate-600 font-medium">Hệ thống phát hiện thứ hạng từ khóa chính đã giảm mạnh. Bạn nên thực hiện SEO Refresh.</p>
                </div>
              </div>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all"
              >
                <Sparkles size={18} />
                🤖 Improve with AI
              </button>
            </div>
          )}

          <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Editor</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">
                {activePost ? "Edit SEO article" : "Create SEO article"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Start with a working title, generate the article, then refine the metadata before saving.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isPending}
                className="rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                AI Generate
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isPending}
                className="rounded-2xl border border-slate-900 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Save Post
              </button>
              {activePost ? (
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isPending}
                  className="rounded-2xl border border-amber-300 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-900 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Regenerate
                </button>
              ) : null}
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isPending || !activePost}
                className="rounded-2xl border border-sky-300 bg-sky-50 px-5 py-3 text-sm font-semibold text-sky-900 transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Improve with AI
              </button>
              <button
                type="button"
                onClick={handleContentBrief}
                disabled={isPending}
                className="rounded-2xl border border-stone-300 bg-stone-50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Content Brief
              </button>
              <button
                type="button"
                onClick={handleCluster}
                disabled={isPending}
                className="rounded-2xl border border-stone-300 bg-stone-50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cluster
              </button>
              <button
                type="button"
                onClick={handleSerpAnalysis}
                disabled={isPending}
                className="rounded-2xl border border-stone-300 bg-stone-50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                SERP Analyze
              </button>
            </div>
          </div>

          {message ? (
            <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-slate-700">
              {message}
            </div>
          ) : null}

          {activePost?.needsUpdate || decayCheck?.needsUpdate ? (
            <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
              This article is losing ranking.
            </div>
          ) : null}

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Title</span>
              <input
                value={editor.title}
                onChange={(event) => updateField("title", event.target.value)}
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
                placeholder="Enter article title"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Slug</span>
              <input
                value={editor.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
                placeholder="seo-ready-slug"
              />
            </label>

            <label className="block lg:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Meta description</span>
              <textarea
                value={editor.metaDescription}
                onChange={(event) => updateField("metaDescription", event.target.value)}
                className="min-h-24 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
                placeholder="Concise summary for search results"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Keywords</span>
              <input
                value={editor.keywords}
                onChange={(event) => updateField("keywords", event.target.value)}
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
                placeholder="seo, content marketing, growth"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Status</span>
              <select
                value={editor.status}
                onChange={(event) => updateField("status", event.target.value as PostStatus)}
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Content editor</span>
            <textarea
              value={editor.content}
              onChange={(event) => updateField("content", event.target.value)}
              className="min-h-[440px] w-full rounded-[28px] border border-stone-200 bg-stone-50 px-5 py-4 font-mono text-sm leading-7 outline-none transition focus:border-amber-400 focus:bg-white"
              placeholder="Generated article content will appear here"
            />
          </label>

          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Current draft state</p>
              <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
                <div className="rounded-2xl bg-white px-4 py-3">
                  <span className="block text-xs uppercase tracking-[0.25em] text-stone-400">Version</span>
                  <span className="mt-2 block text-lg font-black text-slate-900">
                    {generation?.version ?? activePost?.currentVersion ?? 0}
                  </span>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3">
                  <span className="block text-xs uppercase tracking-[0.25em] text-stone-400">Mode</span>
                  <span className="mt-2 block text-lg font-black capitalize text-slate-900">
                    {generation?.type ?? "manual"}
                  </span>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3">
                  <span className="block text-xs uppercase tracking-[0.25em] text-stone-400">Keywords</span>
                  <span className="mt-2 block text-sm font-semibold text-slate-900">
                    {editor.keywords || "None yet"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Version history</p>
              <div className="mt-4 space-y-3">
                {generationHistory.length === 0 ? (
                  <p className="text-sm text-slate-500">Saved generations will appear here.</p>
                ) : (
                  generationHistory.map((item) => (
                    <div key={item.id} className="rounded-2xl bg-white px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-slate-900">v{item.version}</span>
                        <span className="text-[10px] uppercase tracking-[0.24em] text-stone-500">{item.type}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{item.optimizedTitle}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[28px] border border-stone-200 bg-stone-50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Keyword & Rank</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Theo dõi thứ hạng của keyword chính trên SERP.</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Keyword..."
                  value={trackedKeyword}
                  onChange={(e) => setTrackedKeyword(e.target.value)}
                  className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-indigo-300"
                />
                <button
                  onClick={handleTrackKeyword}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  <TargetIcon size={16} />
                  Track Rank
                </button>
              </div>
            </div>

            {rankTracking ? (
              <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                <div className="h-[250px] rounded-2xl bg-white p-4 shadow-sm">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rankTracking.history}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" hide />
                      <YAxis reversed hide />
                      <Tooltip />
                      <Line type="monotone" dataKey="position" stroke="#6366f1" strokeWidth={3} dot={{r: 4}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hạng hiện tại</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className={`text-4xl font-black ${
                        rankTracking.currentPosition === null ? "text-slate-400" :
                        rankTracking.currentPosition <= 3 ? "text-emerald-500" :
                        rankTracking.currentPosition <= 10 ? "text-orange-500" : "text-rose-500"
                      }`}>
                        #{rankTracking.currentPosition ?? "--"}
                      </span>
                      {rankTracking.currentPosition !== null && rankTracking.history.length > 1 && (
                        <span className={`flex items-center text-sm font-bold ${
                          rankTracking.currentPosition < rankTracking.history[rankTracking.history.length - 2].position
                            ? "text-emerald-500"
                            : "text-rose-500"
                        }`}>
                          {rankTracking.currentPosition < rankTracking.history[rankTracking.history.length - 2].position ? "+" : ""}
                          {rankTracking.history[rankTracking.history.length - 2].position - rankTracking.currentPosition}
                        </span>
                      )}
                    </div>
                  </div>
                  {decayCheck && (
                    <div className={`rounded-2xl p-5 ${
                      decayCheck.status === 'good' ? 'bg-emerald-50 text-emerald-700' :
                      decayCheck.status === 'warning' ? 'bg-orange-50 text-orange-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      <p className="text-[10px] font-black uppercase tracking-widest mb-1">Đề xuất AI</p>
                      <p className="text-xs font-bold leading-relaxed">{decayCheck.recommendation}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center text-slate-400">
                Chưa có dữ liệu thứ hạng. Hãy nhập keyword và nhấn Track Rank.
              </div>
            )}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Content brief</p>
              {contentBrief ? (
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div>
                    <span className="font-semibold text-slate-900">Keyword:</span> {contentBrief.keyword}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Search intent:</span> {contentBrief.searchIntent}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Target audience:</span> {contentBrief.targetAudience}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Outline suggestion</p>
                    <div className="mt-2 space-y-2">
                      {contentBrief.outlineSuggestion.map((item) => (
                        <div key={item} className="rounded-2xl bg-white px-4 py-3">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Content gaps</p>
                    <div className="mt-2 space-y-2">
                      {contentBrief.contentGaps.map((item) => (
                        <div key={item} className="rounded-2xl bg-white px-4 py-3">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">Generate a brief to review keyword, intent, audience, and gaps.</p>
              )}
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Topical cluster</p>
              {cluster ? (
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div>
                    <span className="font-semibold text-slate-900">Pillar topic:</span> {cluster.pillarTopic}
                  </div>
                  <div className="space-y-2">
                    {cluster.clusterTopics.map((item) => (
                      <div key={item} className="rounded-2xl bg-white px-4 py-3">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">Generate a cluster to see suggested supporting topics.</p>
              )}
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Related posts</p>
              <div className="mt-4 space-y-2">
                {relatedPosts.length === 0 ? (
                  <p className="text-sm text-slate-500">Save a post to see related content.</p>
                ) : (
                  relatedPosts.map((item) => (
                    <div key={item.postId} className="rounded-2xl bg-white px-4 py-3 text-sm">
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-slate-500">{item.slug}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-500">Score {item.score}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Internal link suggestions</p>
              <div className="mt-4 space-y-3">
                {internalLinks.length === 0 ? (
                  <p className="text-sm text-slate-500">Save a post to see suggested links. Nothing is auto-inserted.</p>
                ) : (
                  internalLinks.map((item) => (
                    <div key={item.targetPostId} className="group rounded-2xl bg-white p-4 text-sm shadow-sm transition hover:shadow-md">
                      <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition">{item.title}</p>
                      <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Gợi ý Anchor:</p>
                      <div className="mt-1 flex items-center justify-between gap-3">
                        <code className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                          {item.anchorText}
                        </code>
                        <button 
                          onClick={() => {
                            const linkHtml = `<a href="/posts/${item.slug}" class="text-indigo-600 font-bold hover:underline">${item.anchorText}</a>`;
                            setEditor(prev => ({
                              ...prev,
                              content: prev.content + "\n\n" + linkHtml
                            }));
                            setMessage(`Inserted link to "${item.title}" at the end of content.`);
                          }}
                          className="rounded-xl bg-slate-900 p-2 text-white hover:bg-slate-800 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="mt-3 text-[11px] font-medium text-slate-500 leading-relaxed italic border-l-2 border-indigo-100 pl-3">
                        {item.reason}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Interlink old posts</p>
              <div className="mt-4 space-y-2">
                {interlinkOpportunities.length === 0 ? (
                  <p className="text-sm text-slate-500">Save a post to see which older posts should link to it.</p>
                ) : (
                  interlinkOpportunities.map((item) => (
                    <div key={item.sourcePostId} className="rounded-2xl bg-white px-4 py-3 text-sm">
                      <p className="font-semibold text-slate-900">{item.sourceTitle}</p>
                      <p className="mt-1 text-slate-500">Anchor: {item.anchor}</p>
                      <p className="mt-1 text-slate-600">{item.placementSuggestion}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[28px] border border-stone-200 bg-stone-50 p-5">
            <p className="text-sm font-semibold text-slate-900">SERP analysis</p>
            {serpAnalysis ? (
              <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div>
                  <div className="space-y-2">
                    {serpAnalysis.topResults.map((item) => (
                      <div key={`${item.position}-${item.link}`} className="rounded-2xl bg-white px-4 py-3 text-sm">
                        <p className="font-semibold text-slate-900">
                          {item.position}. {item.title}
                        </p>
                        <p className="mt-1 break-all text-slate-500">{item.link}</p>
                        <p className="mt-2 text-slate-600">{item.snippet}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm">
                    <p className="font-semibold text-slate-900">Average length</p>
                    <p className="mt-2 text-2xl font-black text-slate-900">{serpAnalysis.avgLength} words</p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm">
                    <p className="font-semibold text-slate-900">Competitor headings</p>
                    <div className="mt-3 space-y-2">
                      {serpAnalysis.headings.map((item) => (
                        <div key={item} className="rounded-xl bg-stone-50 px-3 py-2">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm">
                    <p className="font-semibold text-slate-900">Content gap</p>
                    <div className="mt-3 space-y-2">
                      {serpAnalysis.contentGap.map((item) => (
                        <div key={item} className="rounded-xl bg-stone-50 px-3 py-2">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">Analyze the current title to inspect top results, headings, average length, and content gaps.</p>
            )}
          </div>

          <div className="mt-5 rounded-[28px] border border-stone-200 bg-stone-50 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-semibold text-slate-900">Refresh preview</p>
              <button
                type="button"
                onClick={handleApplyRefreshDraft}
                disabled={!refreshSuggestion}
                className="rounded-2xl border border-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Apply Draft to Editor
              </button>
            </div>
            {refreshSuggestion ? (
              <div className="mt-4 grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
                <div className="space-y-3">
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm">
                    <p className="font-semibold text-slate-900">Draft version</p>
                    <p className="mt-2 text-2xl font-black text-slate-900">v{refreshSuggestion.version}</p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm">
                    <p className="font-semibold text-slate-900">Improvements</p>
                    <div className="mt-3 space-y-2">
                      {refreshSuggestion.improvements.map((item) => (
                        <div key={item} className="rounded-xl bg-stone-50 px-3 py-2">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">Suggested content preview</p>
                  <textarea
                    readOnly
                    value={refreshSuggestion.newContent}
                    className="mt-3 min-h-[320px] w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-mono text-sm leading-7 text-slate-700 outline-none"
                  />
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                Create an AI refresh draft to review suggested improvements. Nothing is auto-applied or auto-saved.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

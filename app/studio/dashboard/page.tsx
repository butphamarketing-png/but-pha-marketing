"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Link2, Loader2, PenSquare, RefreshCw, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getInternalLinks, getPost, getPosts, getRankTracking, refreshPost } from "@/lib/seo-studio/api";
import { InternalLinkSuggestion, PostDetail, PostListItem, RankTrackingResponse } from "@/lib/seo-studio/types";

type DashboardPost = {
  summary: PostListItem;
  detail: PostDetail;
  rankTracking: RankTrackingResponse | null;
  internalLinks: InternalLinkSuggestion[];
};

type KeywordDelta = {
  postId: string;
  title: string;
  keyword: string;
  previousPosition: number;
  currentPosition: number;
  previousDate: string;
  currentDate: string;
  delta: number;
};

function dayKey(value: string) {
  return new Date(value).toISOString().slice(0, 10);
}

function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  });
}

function getKeywordDeltas(post: DashboardPost): KeywordDelta[] {
  const history = post.rankTracking?.history ?? [];
  const byKeyword = new Map<string, Map<string, { position: number; checkedAt: string }>>();

  for (const item of history) {
    const keywordMap = byKeyword.get(item.keyword) ?? new Map<string, { position: number; checkedAt: string }>();
    const key = dayKey(item.checkedAt);
    const current = keywordMap.get(key);

    if (!current || new Date(item.checkedAt) > new Date(current.checkedAt)) {
      keywordMap.set(key, { position: item.position, checkedAt: item.checkedAt });
    }

    byKeyword.set(item.keyword, keywordMap);
  }

  const deltas: KeywordDelta[] = [];

  for (const [keyword, snapshots] of byKeyword.entries()) {
    const ordered = [...snapshots.entries()]
      .map(([date, value]) => ({ date, ...value }))
      .sort((left, right) => new Date(right.checkedAt).getTime() - new Date(left.checkedAt).getTime());

    if (ordered.length < 2) {
      continue;
    }

    const [current, previous] = ordered;
    deltas.push({
      postId: post.summary.id,
      title: post.summary.title,
      keyword,
      previousPosition: previous.position,
      currentPosition: current.position,
      previousDate: previous.date,
      currentDate: current.date,
      delta: current.position - previous.position,
    });
  }

  return deltas;
}

function buildKeywordOpportunities(posts: DashboardPost[]) {
  const tracked = new Set(
    posts.flatMap((post) => post.rankTracking?.latest.map((item) => item.keyword.toLowerCase()) ?? []),
  );
  const titleCoverage = posts.map((post) => `${post.detail.title} ${post.detail.slug}`.toLowerCase());
  const suggestions = new Map<string, { keyword: string; sourcePostId: string; sourceTitle: string; count: number }>();

  for (const post of posts) {
    for (const keyword of post.detail.keywords) {
      const normalized = keyword.trim().toLowerCase();

      if (!normalized || tracked.has(normalized)) {
        continue;
      }

      if (titleCoverage.some((item) => item.includes(normalized))) {
        continue;
      }

      const current = suggestions.get(normalized);
      suggestions.set(normalized, {
        keyword,
        sourcePostId: post.detail.id,
        sourceTitle: post.detail.title,
        count: (current?.count ?? 0) + 1,
      });
    }
  }

  return [...suggestions.values()].sort((left, right) => right.count - left.count).slice(0, 8);
}

function hasInternalLink(content: string, currentSlug: string, allSlugs: string[]) {
  return allSlugs
    .filter((slug) => slug !== currentSlug)
    .some((slug) => content.includes(`/blog/${slug}`) || content.includes(`href="/blog/${slug}`) || content.includes(slug));
}

function StatCard({
  label,
  value,
  helper,
  href,
}: {
  label: string;
  value: string | number;
  helper: string;
  href: string;
}) {
  return (
    <Link href={href} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-purple-400/50 hover:bg-white/10">
      <p className="text-xs uppercase tracking-[0.28em] text-purple-200">{label}</p>
      <p className="mt-4 text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm text-gray-300">{helper}</p>
    </Link>
  );
}

export default function StudioDashboardPage() {
  const [posts, setPosts] = useState<DashboardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshingId, setRefreshingId] = useState<string | null>(null);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);

        const list = await getPosts();
        const detailed = await Promise.all(
          list.map(async (post) => {
            const [detail, rankTracking, internalLinks] = await Promise.all([
              getPost(post.id),
              getRankTracking(post.id).catch(() => null),
              getInternalLinks(post.id, 5).catch(() => []),
            ]);

            return {
              summary: post,
              detail,
              rankTracking,
              internalLinks,
            } satisfies DashboardPost;
          }),
        );

        if (isMounted) {
          setPosts(detailed);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Không thể tải SEO dashboard.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const analytics = useMemo(() => {
    const totalPosts = posts.length;
    const publishedPosts = posts.filter((post) => post.detail.status === "published");
    const allSlugs = posts.map((post) => post.detail.slug);

    const missingInternalLinkPosts = posts.filter(
      (post) =>
        post.detail.status === "published" &&
        post.internalLinks.length > 0 &&
        !hasInternalLink(post.detail.content, post.detail.slug, allSlugs),
    );

    const scoreSamples = posts.map((post) => {
      let score = 0;
      if (post.detail.metaDescription.trim()) score += 25;
      if (post.detail.keywords.length > 0) score += 25;
      if (post.detail.content.trim().length > 1200) score += 25;
      if (post.detail.status === "published") score += 25;
      return score;
    });

    const avgSeoScore = scoreSamples.length
      ? Math.round(scoreSamples.reduce((sum, item) => sum + item, 0) / scoreSamples.length)
      : null;

    const deltas = posts.flatMap(getKeywordDeltas);
    const dropping = deltas
      .filter((item) => item.delta > 0)
      .sort((left, right) => right.delta - left.delta)
      .filter((item, index, array) => index === array.findIndex((candidate) => candidate.postId === item.postId))
      .slice(0, 8);
    const gainers = deltas
      .filter((item) => item.delta < 0)
      .sort((left, right) => left.delta - right.delta)
      .filter((item, index, array) => index === array.findIndex((candidate) => candidate.postId === item.postId))
      .slice(0, 8);

    const opportunities = buildKeywordOpportunities(posts);
    const needsUpdate = posts.filter((post) => post.detail.needsUpdate || missingInternalLinkPosts.some((item) => item.detail.id === post.detail.id));

    const chartBuckets = new Map<string, { total: number; count: number }>();
    for (const post of posts) {
      for (const item of post.rankTracking?.history ?? []) {
        const key = dayKey(item.checkedAt);
        const current = chartBuckets.get(key) ?? { total: 0, count: 0 };
        chartBuckets.set(key, {
          total: current.total + item.position,
          count: current.count + 1,
        });
      }
    }

    const chartData = [...chartBuckets.entries()]
      .map(([date, value]) => ({
        date,
        label: formatShortDate(date),
        avgPosition: Number((value.total / value.count).toFixed(2)),
      }))
      .sort((left, right) => new Date(left.date).getTime() - new Date(right.date).getTime())
      .slice(-14);

    return {
      totalPosts,
      publishedPosts,
      avgSeoScore,
      needsUpdate,
      dropping,
      gainers,
      opportunities,
      missingInternalLinkPosts,
      chartData,
    };
  }, [posts]);

  async function handleRefresh(postId: string) {
    try {
      setRefreshingId(postId);
      setRefreshMessage(null);
      const result = await refreshPost(postId);
      setRefreshMessage(`Đã tạo AI refresh draft v${result.version} cho bài viết.`);
    } catch (refreshError) {
      setRefreshMessage(refreshError instanceof Error ? refreshError.message : "Không thể refresh AI.");
    } finally {
      setRefreshingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090511] text-white">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
          <Loader2 className="h-5 w-5 animate-spin text-purple-300" />
          <span>Đang tải GLOBAL SEO DASHBOARD...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090511] px-4 text-white">
        <div className="max-w-xl rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-sm text-red-100">
          {error}
        </div>
      </div>
    );
  }

  const allPostIds = posts.map((post) => post.detail.id).join(",");
  const publishedIds = analytics.publishedPosts.map((post) => post.detail.id).join(",");
  const needsUpdateIds = analytics.needsUpdate.map((post) => post.detail.id).join(",");
  const missingLinkIds = analytics.missingInternalLinkPosts.map((post) => post.detail.id).join(",");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.22),_transparent_35%),linear-gradient(180deg,_#080511,_#12081f_40%,_#0a0613)] px-4 py-8 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-purple-200">Studio Control Center</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">GLOBAL SEO DASHBOARD</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300">
              Dashboard này đang đọc dữ liệu thật từ hệ thống posts và lịch sử keyword tracking. Mỗi insight đều dẫn thẳng tới bài viết hoặc hành động sửa.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/studio/posts" className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10">
              Mở /studio/posts
            </Link>
            <Link href="/studio" className="rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
              Tạo bài mới
            </Link>
          </div>
        </div>

        {refreshMessage ? (
          <div className="mb-6 rounded-2xl border border-purple-400/30 bg-purple-500/10 px-4 py-3 text-sm text-purple-100">
            {refreshMessage}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Posts" value={analytics.totalPosts} helper="Click để mở toàn bộ bài viết." href={`/studio/posts${allPostIds ? `?ids=${allPostIds}` : ""}`} />
          <StatCard label="Published Posts" value={analytics.publishedPosts.length} helper="Chỉ các bài đã publish." href={`/studio/posts${publishedIds ? `?ids=${publishedIds}` : ""}`} />
          <StatCard label="Avg SEO Score" value={analytics.avgSeoScore ?? "N/A"} helper="Điểm lấy từ meta, keyword, content depth và publish state." href={`/studio/posts${allPostIds ? `?ids=${allPostIds}` : ""}`} />
          <StatCard label="Posts Needing Update" value={analytics.needsUpdate.length} helper="Bài tụt rank hoặc thiếu internal link." href={`/studio/posts${needsUpdateIds ? `?ids=${needsUpdateIds}` : ""}`} />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black">⚠️ Bài đang tụt rank</h2>
                <p className="mt-1 text-sm text-gray-300">So sánh 2 snapshot gần nhất theo từng keyword.</p>
              </div>
              <TrendingDown className="h-6 w-6 text-red-300" />
            </div>

            <div className="space-y-3">
              {analytics.dropping.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-4 py-5 text-sm text-gray-300">
                  Chưa có bài nào tụt rank trong dữ liệu hiện tại.
                </div>
              ) : (
                analytics.dropping.map((item) => (
                  <div key={`${item.postId}-${item.keyword}`} className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
                    <Link href={`/studio/posts/${item.postId}`} className="text-lg font-bold text-white transition hover:text-red-100">
                      {item.title}
                    </Link>
                    <p className="mt-2 text-sm text-red-100">
                      {item.keyword}: #{item.previousPosition} → #{item.currentPosition}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-red-200">
                      {formatShortDate(item.previousDate)} → {formatShortDate(item.currentDate)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link href={`/studio/posts/${item.postId}`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15">
                        <PenSquare className="h-4 w-4" />
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => void handleRefresh(item.postId)}
                        disabled={refreshingId === item.postId}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {refreshingId === item.postId ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                        🔧 Refresh AI
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black">📈 Bài đang tăng</h2>
                <p className="mt-1 text-sm text-gray-300">Keyword đang cải thiện vị trí.</p>
              </div>
              <TrendingUp className="h-6 w-6 text-emerald-300" />
            </div>

            <div className="space-y-3">
              {analytics.gainers.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-4 py-5 text-sm text-gray-300">
                  Chưa có bài tăng rank trong 2 snapshot gần nhất.
                </div>
              ) : (
                analytics.gainers.map((item) => (
                  <Link key={`${item.postId}-${item.keyword}`} href={`/studio/posts/${item.postId}`} className="block rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 transition hover:bg-emerald-500/15">
                    <p className="text-lg font-bold text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-emerald-100">
                      {item.keyword}: #{item.previousPosition} → #{item.currentPosition}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-emerald-200">
                      {formatShortDate(item.previousDate)} → {formatShortDate(item.currentDate)}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black">✨ Content Opportunities</h2>
                <p className="mt-1 text-sm text-gray-300">Từ khóa thật đang xuất hiện trong dữ liệu nhưng chưa được khai thác thành bài riêng.</p>
              </div>
              <Sparkles className="h-6 w-6 text-purple-300" />
            </div>

            <div className="space-y-3">
              {analytics.opportunities.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-4 py-5 text-sm text-gray-300">
                  Chưa có keyword opportunity mới từ dữ liệu hiện tại.
                </div>
              ) : (
                analytics.opportunities.map((item) => (
                  <div key={item.keyword} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-lg font-bold text-white">{item.keyword}</p>
                    <p className="mt-2 text-sm text-gray-300">Nguồn: {item.sourceTitle}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link href={`/studio/posts/create?keyword=${encodeURIComponent(item.keyword)}`} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
                        ✨ Generate bài mới
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link href={`/studio/posts/${item.sourcePostId}`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                        Xem bài nguồn
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black">🔗 Internal Link Health</h2>
                <p className="mt-1 text-sm text-gray-300">Đếm các bài publish có cơ hội internal link nhưng nội dung hiện chưa gắn link.</p>
              </div>
              <Link2 className="h-6 w-6 text-purple-300" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Link href={`/studio/posts${missingLinkIds ? `?ids=${missingLinkIds}` : ""}`} className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:bg-black/30">
                <p className="text-xs uppercase tracking-[0.28em] text-purple-200">Missing Links</p>
                <p className="mt-3 text-3xl font-black text-white">{analytics.missingInternalLinkPosts.length}</p>
                <p className="mt-2 text-sm text-gray-300">Click để mở danh sách bài cần thêm internal links.</p>
              </Link>
              <Link href="/studio/posts" className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:bg-black/30">
                <p className="text-xs uppercase tracking-[0.28em] text-purple-200">Suggestions Ready</p>
                <p className="mt-3 text-3xl font-black text-white">
                  {posts.reduce((sum, post) => sum + post.internalLinks.length, 0)}
                </p>
                <p className="mt-2 text-sm text-gray-300">Đi vào editor để áp dụng gợi ý internal link cho từng bài.</p>
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {analytics.missingInternalLinkPosts.slice(0, 4).map((post) => (
                <Link key={post.detail.id} href={`/studio/posts/${post.detail.id}`} className="block rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-black/30">
                  <p className="font-bold text-white">{post.detail.title}</p>
                  <p className="mt-2 text-sm text-gray-300">{post.internalLinks.length} internal link suggestions available.</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">Rank Trend Chart</h2>
              <p className="mt-1 text-sm text-gray-300">Biểu đồ vị trí trung bình theo lịch sử keyword_tracking.</p>
            </div>
          </div>

          <div className="h-[320px]">
            {analytics.chartData.length === 0 ? (
              <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/20 text-sm text-gray-300">
                Chưa có đủ dữ liệu lịch sử để vẽ trend chart.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.chartData}>
                  <defs>
                    <linearGradient id="rankArea" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="label" stroke="#c4b5fd" tickLine={false} axisLine={false} />
                  <YAxis reversed stroke="#c4b5fd" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#140d22",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 16,
                      color: "#fff",
                    }}
                  />
                  <Area type="monotone" dataKey="avgPosition" stroke="#c084fc" strokeWidth={3} fill="url(#rankArea)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

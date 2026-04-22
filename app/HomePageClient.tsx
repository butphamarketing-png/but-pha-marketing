"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SiFacebook, SiGooglemaps, SiInstagram, SiTiktok, SiWebflow, SiZalo } from "react-icons/si";
import { ChevronLeft, ChevronRight, Flame, Phone } from "lucide-react";
import { LoginModal } from "@/components/shared/LoginModal";
import { RoadmapModal } from "@/components/shared/RoadmapModal";
import { DynamicGreeting } from "@/components/shared/DynamicGreeting";
import { ParticleBackground } from "@/components/shared/ParticleBackground";
import { useAuth } from "@/lib/AuthContext";
import { useAdmin } from "@/lib/AdminContext";
import { getBrandingAssetUrl } from "@/lib/branding";
import { db, type ClientReview, type NewsItem } from "@/lib/useData";
import { playClickSound } from "@/lib/utils";

export default function HomePageClient() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [blogs, setBlogs] = useState<NewsItem[]>([]);
  const [blogPage, setBlogPage] = useState(0);
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [reviewPage, setReviewPage] = useState(0);
  const { user } = useAuth();
  const { settings } = useAdmin();
  const logoSrc = useMemo(
    () => getBrandingAssetUrl("logo", settings?.logo || settings?.favicon || ""),
    [settings?.favicon, settings?.logo],
  );

  useEffect(() => {
    db.news.getAll().then((result) => {
      const sorted = [...(result.data || [])]
        .filter((item) => item.published !== false)
        .sort(
          (a, b) =>
            (b.publishedAt ? Date.parse(b.publishedAt) : b.timestamp) -
            (a.publishedAt ? Date.parse(a.publishedAt) : a.timestamp),
        );

      setBlogs(sorted);
    });

    db.clientReviews.getAll().then((result) => {
      const sorted = [...(result.data || [])].sort(
        (a, b) => Date.parse(b.createdAt || "") - Date.parse(a.createdAt || ""),
      );
      setReviews(sorted);
    });
  }, []);

  useEffect(() => {
    let raf = 0;
    const durationMs = 900;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(nextProgress);

      if (elapsed >= durationMs) {
        setLoading(false);
        return;
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
          />
          <img src={logoSrc} alt="Logo" className="h-20 w-20 rounded-full object-cover" />
        </div>

        <div className="w-64 text-center">
          <p className="mb-2 text-sm font-medium text-purple-200">Đang tải... {progress}%</p>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-primary transition-all duration-75 ease-linear" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  const platforms = [
    { id: "facebook", name: "Facebook", icon: SiFacebook, color: settings?.colors?.facebook || "#1877F2", to: "/facebook" },
    { id: "tiktok", name: "TikTok", icon: SiTiktok, color: settings?.colors?.tiktok || "#FF0050", to: "/tiktok" },
    { id: "instagram", name: "Instagram", icon: SiInstagram, color: settings?.colors?.instagram || "#E1306C", to: "/instagram" },
    { id: "zalo", name: "Zalo", icon: SiZalo, color: settings?.colors?.zalo || "#0068FF", to: "/zalo" },
    { id: "googlemaps", name: "Google Maps", icon: SiGooglemaps, color: settings?.colors?.googlemaps || "#EA4335", to: "/google-maps" },
    { id: "website", name: "Website", icon: SiWebflow, color: settings?.colors?.website || "#34A853", to: "/website" },
  ];

  const visibleBlogs = blogs.slice(blogPage * 4, blogPage * 4 + 4);
  const blogMaxPage = Math.max(0, Math.ceil(blogs.length / 4) - 1);
  const visibleReviews = reviews.slice(reviewPage * 4, reviewPage * 4 + 4);
  const reviewMaxPage = Math.max(0, Math.ceil(reviews.length / 4) - 1);
  const blogSlug = (item: NewsItem) =>
    item.slug ||
    item.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-background to-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden">
        <ParticleBackground />
      </div>

      <DynamicGreeting color="#7C3AED" />

      <header className="relative z-[50] flex items-center justify-between px-6 pb-6 pt-16">
        <div className="flex items-center gap-3">
          <img src={logoSrc} alt={settings?.title || "Bứt Phá Marketing"} className="h-10 w-10 rounded-full object-cover shadow-lg" />
          <span className="hidden font-bold tracking-tight text-white md:inline-block">{settings?.title || "Bứt Phá Marketing"}</span>
        </div>

        {!settings.presentationMode && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium transition-colors hover:bg-white/10"
            >
              {user ? "Kiểm tra lộ trình" : "Kiểm tra lộ trình"}
            </button>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-12 md:py-24">
        <div className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl lg:text-8xl"
            style={{ backgroundImage: `linear-gradient(to right, ${settings?.colors?.primary || "#000"}, #fff)` }}
          >
            {settings?.heroTitle || ""}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl whitespace-pre-line text-lg text-purple-200 md:text-xl"
          >
            {settings?.heroSubtitle || ""}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {platforms
            .filter((platform) => settings?.visibility?.[platform.id] !== false)
            .map((platform) => (
              <Link
                key={platform.id}
                href={platform.to}
                onClick={playClickSound}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 shadow-xl transition-all hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundImage: `linear-gradient(to bottom right, transparent, ${platform.color}40)` }}
                />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full p-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${platform.color}20`, color: platform.color }}>
                    <platform.icon className="text-4xl" />
                  </div>
                  <h2 className="mb-2 text-lg font-bold text-white">{platform.name}</h2>
                  <span className="text-sm font-medium text-gray-400 transition-colors group-hover:text-white">Xem dịch vụ →</span>
                </div>
                <div className="absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 ease-in-out group-hover:animate-[shimmer_1.5s_infinite]" />
              </Link>
            ))}
        </motion.div>

        <section className="mx-auto mt-20 max-w-6xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-white md:text-4xl">Tin tức</h2>
              <p className="mt-1 text-sm text-gray-400">Kiến thức marketing cập nhật và tối ưu SEO thực chiến.</p>
            </div>

            {blogs.length > 4 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBlogPage((page) => Math.max(0, page - 1))}
                  disabled={blogPage === 0}
                  className="rounded-full border border-white/20 bg-white/5 p-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setBlogPage((page) => Math.min(blogMaxPage, page + 1))}
                  disabled={blogPage === blogMaxPage}
                  className="rounded-full border border-white/20 bg-white/5 p-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {blogs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/20 bg-card/40 p-8 text-center">
              <p className="text-sm text-gray-300">Chưa có bài viết nào. Vào Admin `Danh mục tin tức` để tạo bài đầu tiên.</p>
              <Link href="/blog" className="mt-3 inline-block text-sm font-semibold text-primary underline">
                Xem trang tin tức
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {visibleBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blogSlug(blog) || blog.id}`}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card text-left shadow-xl"
                  style={{ perspective: "1200px" }}
                >
                  <div className="relative h-[220px] w-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 [backface-visibility:hidden]">
                      <img
                        src={blog.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80"}
                        alt={blog.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-black/20 to-black/85 p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="mb-2 text-[11px] text-gray-300">
                        {new Date(blog.publishedAt || blog.timestamp).toLocaleDateString("vi-VN")}
                      </p>
                      <p className="line-clamp-4 text-xs leading-relaxed text-gray-200">{blog.description || "Bấm để xem bài viết chi tiết."}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3">
                    <p className="line-clamp-2 flex-1 text-sm font-bold text-white">{blog.title}</p>
                    {blog.hot ? <Flame size={16} className="text-orange-400" /> : null}
                  </div>
                  {blog.hot ? <div className="pointer-events-none absolute inset-0 animate-pulse rounded-2xl ring-1 ring-orange-500/70" /> : null}
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto mt-20 max-w-6xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-white md:text-4xl">Đánh giá khách hàng</h2>
              <p className="mt-1 text-sm text-gray-400">
                Review được đồng bộ từ dashboard nội bộ sau khi khách hàng gửi đánh giá.
              </p>
            </div>

            {reviews.length > 4 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReviewPage((page) => Math.max(0, page - 1))}
                  disabled={reviewPage === 0}
                  className="rounded-full border border-white/20 bg-white/5 p-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setReviewPage((page) => Math.min(reviewMaxPage, page + 1))}
                  disabled={reviewPage === reviewMaxPage}
                  className="rounded-full border border-white/20 bg-white/5 p-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {reviews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/20 bg-card/40 p-8 text-center">
              <p className="text-sm text-gray-300">Chưa có review nào được gửi từ dashboard khách hàng.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {visibleReviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-white/10 bg-card p-5 shadow-xl transition-transform hover:-translate-y-1"
                >
                  <div className="mb-4 flex items-center gap-3">
                    {review.logoUrl ? (
                      <img
                        src={review.logoUrl}
                        alt={review.clientName}
                        className="h-12 w-12 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-sm font-black text-white">
                        {review.clientName?.slice(0, 1) || "K"}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-white">{review.clientName}</p>
                      <p className="mt-1 text-xs text-yellow-300">
                        {"★".repeat(Math.max(1, Math.min(5, review.rating || 5)))}
                      </p>
                    </div>
                  </div>
                  <p className="line-clamp-6 text-sm leading-6 text-gray-300">{review.content}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-20 flex flex-col items-center gap-6">
          <a href="tel:0937417982" className="flex items-center gap-3 rounded-full border border-primary/50 bg-primary/20 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-primary/40">
            <Phone className="animate-pulse" />
            Hotline: 0937 417 982
          </a>
        </div>
      </main>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <RoadmapModal isOpen={showRoadmap} onClose={() => setShowRoadmap(false)} />

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-12deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(300%) skewX(-12deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

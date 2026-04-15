"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SiFacebook, SiTiktok, SiInstagram, SiZalo, SiGooglemaps, SiWebflow } from "react-icons/si";
import { Phone, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { LoginModal } from "@/components/shared/LoginModal";
import { RoadmapModal } from "@/components/shared/RoadmapModal";
import { DynamicGreeting } from "@/components/shared/DynamicGreeting";
import { ParticleBackground } from "@/components/shared/ParticleBackground";
import { FanpageAudit } from "@/components/shared/FanpageAudit";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { AdminProvider, useAdmin } from "@/lib/AdminContext";
import { db, type NewsItem } from "@/lib/useData";
import { playClickSound } from "@/lib/utils";

function HomeContent() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [blogs, setBlogs] = useState<NewsItem[]>([]);
  const [blogPage, setBlogPage] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState<NewsItem | null>(null);
  const [infoName, setInfoName] = useState("");
  const [infoPhone, setInfoPhone] = useState("");
  const { user } = useAuth();
  const { settings } = useAdmin();

  const [stats, setStats] = useState({ clients: 0, projects: 0, years: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        clients: prev.clients < 500 ? prev.clients + 5 : 500,
        projects: prev.projects < 1200 ? prev.projects + 12 : 1200,
        years: prev.years < 10 ? prev.years + 1 : 10
      }));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    db.news.getAll().then((items) => {
      const sorted = [...items]
        .filter((item) => item.published !== false)
        .sort((a, b) => (b.publishedAt ? Date.parse(b.publishedAt) : b.timestamp) - (a.publishedAt ? Date.parse(a.publishedAt) : a.timestamp));
      setBlogs(sorted);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);
    return () => clearInterval(timer);
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
          <img src="/logo.jpg" alt="Logo" className="h-20 w-20 rounded-full object-cover" />
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
    { id: "facebook", name: "Facebook", icon: SiFacebook, color: settings.colors.facebook, to: "/facebook" },
    { id: "tiktok", name: "TikTok", icon: SiTiktok, color: settings.colors.tiktok, to: "/tiktok" },
    { id: "instagram", name: "Instagram", icon: SiInstagram, color: settings.colors.instagram, to: "/instagram" },
    { id: "zalo", name: "Zalo", icon: SiZalo, color: settings.colors.zalo, to: "/zalo" },
    { id: "googlemaps", name: "Google Maps", icon: SiGooglemaps, color: settings.colors.googlemaps, to: "/google-maps" },
    { id: "website", name: "Website", icon: SiWebflow, color: settings.colors.website, to: "/website" },
  ];
  const visibleBlogs = blogs.slice(blogPage * 4, blogPage * 4 + 4);
  const blogMaxPage = Math.max(0, Math.ceil(blogs.length / 4) - 1);

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-background to-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden">
        <ParticleBackground />
      </div>
      <DynamicGreeting color="#7C3AED" />
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt={settings.title} className="h-10 w-10 rounded-full object-cover shadow-lg" />
          <span className="hidden font-bold tracking-tight text-white md:inline-block">{settings.title}</span>
        </div>
        {!settings.presentationMode && (
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3">
              {user ? (
                <Link href="/dashboard" className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium transition-colors hover:bg-white/10">
                  Trang thành viên
                </Link>
              ) : (
                <>
                  <button onClick={() => setShowRoadmap(true)} className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium transition-colors hover:bg-white/10">
                    Đăng nhập
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-12 md:py-24">
        <div className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 md:text-7xl lg:text-8xl"
            style={{ backgroundImage: `linear-gradient(to right, ${settings.colors.primary}, #fff)` }}
          >
            {settings.heroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl whitespace-pre-line text-lg text-purple-200 md:text-xl"
          >
            {settings.heroSubtitle}
          </motion.p>
        </div>

        <div className="mb-16">
          <FanpageAudit primaryColor={settings.colors.facebook || settings.colors.primary} platform="facebook" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {platforms.filter(platform => settings.visibility[platform.id] !== false).map((platform, index) => (
            <Link key={platform.id} href={platform.to} onClick={playClickSound} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundImage: `linear-gradient(to bottom right, transparent, ${platform.color}40)` }} />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full p-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${platform.color}20`, color: platform.color }}>
                  <platform.icon className="text-4xl" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{platform.name}</h3>
                <span className="text-sm font-medium text-gray-400 transition-colors group-hover:text-white">Xem dịch vụ →</span>
              </div>
              <div className="absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 ease-in-out group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>
          ))}
        </motion.div>

        {blogs.length > 0 && (
          <section className="mx-auto mt-20 max-w-6xl">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-white md:text-4xl">Blog</h2>
                <p className="mt-1 text-sm text-gray-400">Kiến thức marketing cập nhật và tối ưu SEO thực chiến.</p>
              </div>
              {blogs.length > 4 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setBlogPage((p) => Math.max(0, p - 1))}
                    disabled={blogPage === 0}
                    className="rounded-full border border-white/20 bg-white/5 p-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogPage((p) => Math.min(blogMaxPage, p + 1))}
                    disabled={blogPage === blogMaxPage}
                    className="rounded-full border border-white/20 bg-white/5 p-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {visibleBlogs.map((blog) => (
                <button
                  key={blog.id}
                  type="button"
                  onClick={() => setSelectedBlog(blog)}
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
                    {blog.hot && <Flame size={16} className="text-orange-400" />}
                  </div>
                  {blog.hot && <div className="pointer-events-none absolute inset-0 animate-pulse rounded-2xl ring-1 ring-orange-500/70" />}
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="mt-20 flex flex-col items-center gap-6">
          <a href="tel:0937417982" className="flex items-center gap-3 rounded-full border border-primary/50 bg-primary/20 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-primary/40">
            <Phone className="animate-pulse" />
            Hotline: 0937 417 982
          </a>
        </div>
      </main>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <RoadmapModal isOpen={showRoadmap} onClose={() => setShowRoadmap(false)} />
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="max-h-[85vh] w-full max-w-4xl overflow-auto rounded-2xl border border-white/10 bg-card p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-white">{selectedBlog.title}</h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Ngày viết: {new Date(selectedBlog.publishedAt || selectedBlog.timestamp).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBlog(null)}
                  className="rounded-lg border border-white/20 px-3 py-1 text-xs text-white"
                >
                  Đóng
                </button>
              </div>
              {selectedBlog.imageUrl && (
                <img src={selectedBlog.imageUrl} alt={selectedBlog.title} className="mb-4 h-64 w-full rounded-xl object-cover" />
              )}
              <div
                className="prose prose-invert max-w-none text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
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

export default function Home() {
  return (
    <AuthProvider>
      <AdminProvider>
        <HomeContent />
      </AdminProvider>
    </AuthProvider>
  );
}


"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SiFacebook, SiTiktok, SiInstagram, SiZalo, SiGooglemaps, SiWebflow } from "react-icons/si";
import { Phone } from "lucide-react";
import { LoginModal } from "@/components/shared/LoginModal";
import { RoadmapModal } from "@/components/shared/RoadmapModal";
import { DynamicGreeting } from "@/components/shared/DynamicGreeting";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { AdminProvider, useAdmin } from "@/lib/AdminContext";
import { db } from "@/lib/useData";
import { playClickSound } from "@/lib/utils";

function HomeContent() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
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

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-background to-background text-foreground">
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
                  <button onClick={() => setShowLogin(true)} className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium transition-colors hover:bg-white/10">
                    Đăng nhập / Đăng ký
                  </button>
                </>
              )}
            </div>
            <button 
              onClick={() => setShowRoadmap(true)} 
              className="group flex items-center gap-2 text-xs font-bold text-primary transition-all hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse group-hover:bg-white" />
              LỘ TRÌNH DỰ ÁN (CLIENT PORTAL)
            </button>
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
            className="mx-auto max-w-2xl text-lg text-purple-200 md:text-xl"
          >
            {settings.heroSubtitle}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {platforms.map((platform, index) => (
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

        <div className="mt-20 flex flex-col items-center gap-6">
          <a href="tel:0937417982" className="flex items-center gap-3 rounded-full border border-primary/50 bg-primary/20 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-primary/40">
            <Phone className="animate-pulse" />
            Hotline: 0937 417 982
          </a>
        </div>
      </main>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <RoadmapModal isOpen={showRoadmap} onClose={() => setShowRoadmap(false)} />

      <motion.button
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        onClick={() => setShowRoadmap(true)}
        className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-2 rounded-l-2xl bg-primary px-3 py-6 font-bold text-white shadow-2xl transition-all hover:bg-primary/90 hover:pr-5"
      >
        <span className="[writing-mode:vertical-rl]">LỘ TRÌNH DỰ ÁN</span>
      </motion.button>
      
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


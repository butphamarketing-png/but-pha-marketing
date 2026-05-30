"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const AnimatedMascot = dynamic(() => import("@/components/shared/AnimatedMascot").then((mod) => mod.AnimatedMascot), { ssr: false });
const SocialProofToast = dynamic(() => import("@/components/shared/SocialProofToast").then((mod) => mod.SocialProofToast), { ssr: false });
const SoftUISounds = dynamic(() => import("@/components/shared/SoftUISounds").then((mod) => mod.SoftUISounds), { ssr: false });
const ThemeToggleButton = dynamic(() => import("@/components/shared/ThemeToggleButton").then((mod) => mod.ThemeToggleButton), { ssr: false });
const QuickActionBar = dynamic(() => import("@/components/shared/QuickActionBar").then((mod) => mod.QuickActionBar), { ssr: false });
const FloatingContactButtons = dynamic(() => import("@/components/shared/FloatingContactButtons").then((mod) => mod.FloatingContactButtons), { ssr: false });
const CursorEffect = dynamic(() => import("@/components/shared/CursorEffect").then((mod) => mod.CursorEffect), { ssr: false });

export function MarketingChrome() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio") || pathname.startsWith("/admin") || pathname.startsWith("/chienluocmarketing") || pathname.startsWith("/khachhang")) {
    return null;
  }

  const mainPages = ["/", "/gioi-thieu", "/tin-tuc", "/lien-he"];
  const isMainPage = mainPages.includes(pathname) || pathname.startsWith("/news");

  return (
    <>
      <SoftUISounds />
      <AnimatedMascot />
      <SocialProofToast />
      <ThemeToggleButton />
      <QuickActionBar />
      <FloatingContactButtons />
      {isMainPage && <CursorEffect color="#A855F7" />}
    </>
  );
}

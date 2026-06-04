"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const AnimatedMascot = dynamic(() => import("@/components/shared/AnimatedMascot").then((mod) => mod.AnimatedMascot), { ssr: false });
const SoftUISounds = dynamic(() => import("@/components/shared/SoftUISounds").then((mod) => mod.SoftUISounds), { ssr: false });
const ThemeToggleButton = dynamic(() => import("@/components/shared/ThemeToggleButton").then((mod) => mod.ThemeToggleButton), { ssr: false });
const QuickActionBar = dynamic(() => import("@/components/shared/QuickActionBar").then((mod) => mod.QuickActionBar), { ssr: false });
const CursorEffect = dynamic(() => import("@/components/shared/CursorEffect").then((mod) => mod.CursorEffect), { ssr: false });

export function MarketingChrome() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/chienluocmarketing") || pathname.startsWith("/khachhang")) {
    return null;
  }

  const isHomePage = pathname === "/";

  return (
    <>
      <SoftUISounds />
      <AnimatedMascot />
      <ThemeToggleButton />
      <QuickActionBar />
      {isHomePage && <CursorEffect color="#7C3AED" />}
    </>
  );
}

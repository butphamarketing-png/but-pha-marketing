"use client";

import { usePathname } from "next/navigation";
import { AnimatedMascot } from "@/components/shared/AnimatedMascot";
import { SocialProofToast } from "@/components/shared/SocialProofToast";
import { SoftUISounds } from "@/components/shared/SoftUISounds";
import { ThemeToggleButton } from "@/components/shared/ThemeToggleButton";
import { QuickActionBar } from "@/components/shared/QuickActionBar";
import { FloatingContactButtons } from "@/components/shared/FloatingContactButtons";
import { CursorEffect } from "@/components/shared/CursorEffect";

export function MarketingChrome() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio") || pathname.startsWith("/admin")) {
    return null;
  }

  // Danh sách các trang chính cần con trỏ màu tím
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
      {isMainPage && <CursorEffect color="#A855F7" />} {/* Màu tím (Purple 500) */}
    </>
  );
}

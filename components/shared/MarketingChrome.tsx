"use client";

import { usePathname } from "next/navigation";
import { AnimatedMascot } from "@/components/shared/AnimatedMascot";
import { SocialProofToast } from "@/components/shared/SocialProofToast";
import { SoftUISounds } from "@/components/shared/SoftUISounds";
import { ThemeToggleButton } from "@/components/shared/ThemeToggleButton";
import { QuickActionBar } from "@/components/shared/QuickActionBar";
import { FloatingContactButtons } from "@/components/shared/FloatingContactButtons";

export function MarketingChrome() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <SoftUISounds />
      <AnimatedMascot />
      <SocialProofToast />
      <ThemeToggleButton />
      <QuickActionBar />
      <FloatingContactButtons />
    </>
  );
}

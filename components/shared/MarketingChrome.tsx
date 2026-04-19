"use client";

import { usePathname } from "next/navigation";
import { AnimatedMascot } from "@/components/shared/AnimatedMascot";
import { SocialProofToast } from "@/components/shared/SocialProofToast";
import { SoftUISounds } from "@/components/shared/SoftUISounds";
import { ThemeToggleButton } from "@/components/shared/ThemeToggleButton";
import { VideoIntroButton } from "@/components/shared/VideoIntroButton";

export function MarketingChrome() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <>
      <SoftUISounds />
      <AnimatedMascot />
      <SocialProofToast />
      <ThemeToggleButton />
      <VideoIntroButton />
    </>
  );
}

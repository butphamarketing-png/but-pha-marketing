"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isInternalAppPath } from "@/lib/app-paths";

const AnimatedMascot = dynamic(
  () => import("@/components/shared/AnimatedMascot").then((mod) => mod.AnimatedMascot),
  { ssr: false },
);
const SoftUISounds = dynamic(
  () => import("@/components/shared/SoftUISounds").then((mod) => mod.SoftUISounds),
  { ssr: false },
);
const ThemeToggleButton = dynamic(
  () => import("@/components/shared/ThemeToggleButton").then((mod) => mod.ThemeToggleButton),
  { ssr: false },
);
const QuickActionBar = dynamic(
  () => import("@/components/shared/QuickActionBar").then((mod) => mod.QuickActionBar),
  { ssr: false },
);
const FloatingContactButtons = dynamic(
  () => import("@/components/shared/FloatingContactButtons").then((mod) => mod.FloatingContactButtons),
  { ssr: false },
);
const PushNotificationPrompt = dynamic(
  () => import("@/components/shared/PushNotificationPrompt").then((mod) => mod.PushNotificationPrompt),
  { ssr: false },
);
const SiteConsultPopup = dynamic(
  () => import("@/components/shared/SiteConsultPopup").then((mod) => mod.SiteConsultPopup),
  { ssr: false },
);
export function MarketingChrome() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.style.removeProperty("cursor");
    document.body.style.removeProperty("cursor");
    document.querySelectorAll("style").forEach((node) => {
      if (node.textContent?.includes("cursor: none")) node.remove();
    });
  }, [pathname]);

  if (isInternalAppPath(pathname)) {
    return null;
  }

  return (
    <>
      <SoftUISounds />
      <AnimatedMascot />
      <ThemeToggleButton />
      <FloatingContactButtons />
      <PushNotificationPrompt />
      <SiteConsultPopup />
      <QuickActionBar />
    </>
  );
}

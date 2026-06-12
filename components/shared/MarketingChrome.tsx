"use client";

import dynamic from "next/dynamic";
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
const CursorEffect = dynamic(
  () => import("@/components/shared/CursorEffect").then((mod) => mod.CursorEffect),
  { ssr: false },
);

export function MarketingChrome() {
  const pathname = usePathname();

  if (isInternalAppPath(pathname)) {
    return null;
  }

  const isHomePage = pathname === "/";

  return (
    <>
      <SoftUISounds />
      <AnimatedMascot />
      <ThemeToggleButton />
      <FloatingContactButtons />
      <QuickActionBar />
      {isHomePage && <CursorEffect color="#7C3AED" />}
    </>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isInternalAppPath } from "@/lib/app-paths";
import { getZaloUrl } from "@/lib/site-contact";
import { useAdmin } from "@/lib/AdminContext";

const SoftUISounds = dynamic(
  () => import("@/components/shared/SoftUISounds").then((mod) => mod.SoftUISounds),
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

function HomeZaloPill() {
  const { settings } = useAdmin();
  const zaloUrl = getZaloUrl(settings?.hotline);

  return (
    <a
      href={zaloUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-[95] inline-flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full bg-[#0068FF] px-3.5 py-2.5 text-[12px] font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-[#0054d1] sm:bottom-5 sm:right-5 sm:gap-2.5 sm:px-4 sm:text-[13px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
        alt=""
        className="h-5 w-5 shrink-0 rounded-sm bg-white p-0.5"
      />
      <span className="truncate sm:hidden">Chat Zalo</span>
      <span className="hidden sm:inline">Chat với chúng tôi trên Zalo</span>
    </a>
  );
}

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

  if (pathname === "/") {
    return (
      <>
        <HomeZaloPill />
        <SiteConsultPopup />
      </>
    );
  }

  return (
    <>
      <SoftUISounds />
      <FloatingContactButtons />
      <PushNotificationPrompt />
      <SiteConsultPopup />
      <QuickActionBar />
    </>
  );
}

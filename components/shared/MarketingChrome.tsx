"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const AnimatedMascot = dynamic(() =&gt; import("@/components/shared/AnimatedMascot").then((mod) =&gt; mod.AnimatedMascot), { ssr: false });
const SoftUISounds = dynamic(() =&gt; import("@/components/shared/SoftUISounds").then((mod) =&gt; mod.SoftUISounds), { ssr: false });
const ThemeToggleButton = dynamic(() =&gt; import("@/components/shared/ThemeToggleButton").then((mod) =&gt; mod.ThemeToggleButton), { ssr: false });
const QuickActionBar = dynamic(() =&gt; import("@/components/shared/QuickActionBar").then((mod) =&gt; mod.QuickActionBar), { ssr: false });
const CursorEffect = dynamic(() =&gt; import("@/components/shared/CursorEffect").then((mod) =&gt; mod.CursorEffect), { ssr: false });

export function MarketingChrome() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/chienluocmarketing") || pathname.startsWith("/khachhang")) {
    return null;
  }

  const isHomePage = pathname === "/";

  return (
    &lt;&gt;
      &lt;SoftUISounds /&gt;
      &lt;AnimatedMascot /&gt;
      &lt;ThemeToggleButton /&gt;
      &lt;QuickActionBar /&gt;
      {isHomePage &amp;&amp; &lt;CursorEffect color="#7C3AED" /&gt;}
    &lt;/&gt;
  );
}

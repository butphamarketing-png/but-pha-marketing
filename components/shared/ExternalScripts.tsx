"use client";

import { useAdmin } from "@/lib/AdminContext";
import Script from "next/script";

export function ExternalScripts() {
  const { settings } = useAdmin();

  return (
    <>
      {/* Google Analytics 4 */}
      {settings.googleAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalytics}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.googleAnalytics}');
            `}
          </Script>
        </>
      )}

      {/* Custom Head Scripts (Gg Console Meta Tags, etc.) */}
      {settings.headJs && (
        <div
          dangerouslySetInnerHTML={{ __html: settings.headJs }}
          style={{ display: "none" }}
        />
      )}
    </>
  );
}

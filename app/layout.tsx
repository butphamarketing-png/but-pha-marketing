import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "@/lib/AdminContext";
import { AuthProvider } from "@/lib/AuthContext";
import { MarketingChrome } from "@/components/shared/MarketingChrome";
import { ExternalScripts } from "@/components/shared/ExternalScripts";
import { VisitorTracker } from "@/components/shared/VisitorTracker";
import NextTopLoader from "nextjs-toploader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com";
const DEFAULT_TITLE = "But Pha Marketing";
const DEFAULT_DESCRIPTION =
  "Agency marketing toan dien tai Viet Nam. Dich vu Facebook, Website, Local SEO va chien luoc tang truong doanh thu.";

export async function generateMetadata(): Promise<Metadata> {
  const siteTitle = DEFAULT_TITLE;
  const favicon = "/favicon.png";

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: siteTitle,
    title: {
      default: `${siteTitle} | Giai phap marketing thuc chien`,
      template: `%s | ${siteTitle}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: ["agency marketing", "facebook marketing", "local seo", "website marketing"],
    authors: [{ name: siteTitle }],
    creator: siteTitle,
    publisher: siteTitle,
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
    openGraph: {
      title: `${siteTitle} | Giai phap marketing thuc chien`,
      description: DEFAULT_DESCRIPTION,
      url: "/",
      siteName: siteTitle,
      locale: "vi_VN",
      type: "website",
      images: [
        {
          url: "/opengraph.jpg",
          alt: siteTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteTitle} | Giai phap marketing thuc chien`,
      description: DEFAULT_DESCRIPTION,
      images: ["/opengraph.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body>
        <NextTopLoader color="#7C3AED" showSpinner={false} shadow="0 0 10px #7C3AED,0 0 5px #7C3AED" />
        <AuthProvider>
          <AdminProvider>
            <ExternalScripts />
            <VisitorTracker />
            {children}
            <MarketingChrome />
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

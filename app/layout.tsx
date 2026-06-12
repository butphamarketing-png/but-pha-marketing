import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "@/lib/AdminContext";
import { ExternalScripts } from "@/components/shared/ExternalScripts";
import { MarketingChrome } from "@/components/shared/MarketingChrome";
import { VisitorTracker } from "@/components/shared/VisitorTracker";
import NextTopLoader from "nextjs-toploader";
import { getGoogleSiteVerification, SITE_URL } from "@/lib/seo";

const DEFAULT_TITLE = "Bứt Phá Marketing";
const DEFAULT_DESCRIPTION =
  "Agency marketing toàn diện tại Việt Nam. Dịch vụ Facebook, Website, Local SEO và chiến lược tăng trưởng doanh thu.";

export async function generateMetadata(): Promise<Metadata> {
  const siteTitle = DEFAULT_TITLE;
  const favicon = "/favicon.png";
  const googleVerification = await getGoogleSiteVerification();

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: siteTitle,
    title: {
      default: `${siteTitle} | Giải pháp marketing thực chiến`,
      template: `%s | ${siteTitle}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: ["agency marketing", "facebook marketing", "local seo", "website marketing", "seo website"],
    authors: [{ name: siteTitle }],
    creator: siteTitle,
    publisher: siteTitle,
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
    openGraph: {
      title: `${siteTitle} | Giải pháp marketing thực chiến`,
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
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
      title: `${siteTitle} | Giải pháp marketing thực chiến`,
      description: DEFAULT_DESCRIPTION,
      images: ["/opengraph.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="light">
      <body>
        <NextTopLoader color="#7C3AED" showSpinner={false} shadow="0 0 10px #312E81,0 0 5px #7C3AED" />
        <AdminProvider>
          <ExternalScripts />
          <VisitorTracker />
          <MarketingChrome />
          {children}
        </AdminProvider>
      </body>
    </html>
  );
}

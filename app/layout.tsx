import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "@/lib/AdminContext";
import { AuthProvider } from "@/lib/AuthContext";
import { VideoIntroButton } from "@/components/shared/VideoIntroButton";
import { ThemeToggleButton } from "@/components/shared/ThemeToggleButton";
import { SocialProofToast } from "@/components/shared/SocialProofToast";
import { AnimatedMascot } from "@/components/shared/AnimatedMascot";
import { SoftUISounds } from "@/components/shared/SoftUISounds";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com"),
  applicationName: "Bứt Phá Marketing",
  title: {
    default: "Bứt Phá Marketing | Giải pháp marketing thực chiến",
    template: "%s | Bứt Phá Marketing",
  },
  description: "Agency marketing toàn diện tại Việt Nam. Dịch vụ Facebook, TikTok, Instagram, Website, Local SEO và chiến lược tăng trưởng doanh thu.",
  keywords: ["agency marketing", "facebook marketing", "tiktok marketing", "instagram marketing", "local seo", "website marketing"],
  authors: [{ name: "Bứt Phá Marketing" }],
  creator: "Bứt Phá Marketing",
  publisher: "Bứt Phá Marketing",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Bứt Phá Marketing | Giải pháp marketing thực chiến",
    description: "Agency marketing toàn diện tại Việt Nam với chiến lược tăng trưởng doanh thu thực tế.",
    url: "/",
    siteName: "Bứt Phá Marketing",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/opengraph.jpg",
        alt: "Bứt Phá Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bứt Phá Marketing | Giải pháp marketing thực chiến",
    description: "Agency marketing toàn diện tại Việt Nam với chiến lược tăng trưởng doanh thu thực tế.",
    images: ["/opengraph.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body>
        <AuthProvider>
          <AdminProvider>
            {children}
            <SoftUISounds />
            <AnimatedMascot />
            <SocialProofToast />
            <ThemeToggleButton />
            <VideoIntroButton />
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

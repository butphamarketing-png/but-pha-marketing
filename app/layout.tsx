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
  title: {
    default: "Bứt Phá Marketing | Giải pháp marketing thực chiến",
    template: "%s | Bứt Phá Marketing",
  },
  description: "Agency marketing toàn diện tại Việt Nam. Dịch vụ Facebook, TikTok, Instagram, Website, Local SEO và chiến lược tăng trưởng doanh thu.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bứt Phá Marketing | Giải pháp marketing thực chiến",
    description: "Agency marketing toàn diện tại Việt Nam với chiến lược tăng trưởng doanh thu thực tế.",
    url: "/",
    siteName: "Bứt Phá Marketing",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bứt Phá Marketing | Giải pháp marketing thực chiến",
    description: "Agency marketing toàn diện tại Việt Nam với chiến lược tăng trưởng doanh thu thực tế.",
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


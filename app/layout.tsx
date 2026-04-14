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
  title: "Bứt Phá Marketing - Dashboard",
  description: "Agency marketing toàn diện tại Việt Nam",
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


import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "@/lib/AdminContext";
import { AuthProvider } from "@/lib/AuthContext";

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
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


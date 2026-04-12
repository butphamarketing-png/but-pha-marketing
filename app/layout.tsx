import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}

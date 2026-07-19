import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Admin | Bứt Phá Marketing" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function AdminBpLayout({ children }: { children: React.ReactNode }) {
  return children;
}

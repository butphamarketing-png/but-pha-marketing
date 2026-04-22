import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "AI SEO Content Platform",
  description: "Content, SEO, rank tracking, and workflow dashboard",
};

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/articles", label: "Articles" },
  { href: "/seo", label: "SEO" },
  { href: "/rank", label: "Rank" },
  { href: "/serp", label: "SERP" },
  { href: "/versions", label: "Versions" },
  { href: "/jobs", label: "Jobs" },
  { href: "/bulk", label: "Bulk" },
  { href: "/workspaces", label: "Workspaces" },
  { href: "/sites", label: "Sites" },
  { href: "/settings", label: "Settings" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <div className="appShell">
          <aside className="sidebar">
            <div>
              <p className="eyebrow">AI SEO Content Platform</p>
              <h1 className="sidebarTitle">SEO Content AI</h1>
              <p className="sidebarLead">Generate, score, track, refresh, and publish.</p>
            </div>
            <nav className="navList">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="navLink">
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
          <div className="contentShell">{children}</div>
        </div>
      </body>
    </html>
  );
}

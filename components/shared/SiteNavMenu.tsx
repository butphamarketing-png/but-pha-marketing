"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SERVICE_NAV_GROUPS, SIMPLE_NAV_LINKS, type SiteNavLink } from "@/lib/site-navigation";

type NavTone = "light" | "dark" | "panel";

type SiteNavMenuProps = {
  tone?: NavTone;
  layout?: "horizontal" | "stack";
  onNavigate?: () => void;
  activeHref?: string;
  showSimpleLinks?: boolean;
  simpleBeforeServices?: boolean;
};

function linkTone(tone: NavTone, isActive?: boolean) {
  if (tone === "dark") {
    return isActive
      ? "text-white"
      : "text-white/90 hover:text-violet-200";
  }
  if (tone === "panel") {
    return "text-indigo-950 hover:bg-indigo-50";
  }
  return isActive
    ? "text-violet-600"
    : "text-slate-600 hover:text-indigo-900";
}

function groupButtonTone(tone: NavTone) {
  if (tone === "dark") return "text-white/90 hover:text-violet-200";
  if (tone === "panel") return "text-indigo-950 hover:bg-indigo-50";
  return "text-slate-600 hover:text-indigo-900";
}

function childLinkTone(tone: NavTone) {
  if (tone === "dark") return "text-white/85 hover:bg-white/10 hover:text-white";
  return "text-slate-600 hover:bg-indigo-50 hover:text-indigo-950";
}

function NavSimpleLink({
  item,
  tone,
  onNavigate,
  activeHref,
  className = "rounded-xl px-3 py-2 text-sm font-semibold transition",
}: {
  item: SiteNavLink;
  tone: NavTone;
  onNavigate?: () => void;
  activeHref?: string;
  className?: string;
}) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`${className} ${linkTone(tone, activeHref === item.href)}`}
    >
      {item.label}
    </Link>
  );
}

function NavGroupDesktop({
  group,
  tone,
  onNavigate,
}: {
  group: (typeof SERVICE_NAV_GROUPS)[number];
  tone: NavTone;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="inline-flex items-center gap-0.5">
        <Link
          href={group.href}
          onClick={onNavigate}
          className={`inline-flex items-center text-sm font-semibold transition ${groupButtonTone(tone)}`}
        >
          {group.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-label={`Mở menu ${group.label}`}
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition ${groupButtonTone(tone)}`}
        >
          <ChevronDown size={14} className={`opacity-70 transition ${open ? "rotate-180" : "group-hover:rotate-180"}`} />
        </button>
      </div>
      <div
        className={`absolute left-0 top-full z-[60] min-w-[15rem] pt-2 transition-all ${
          open
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-white p-2 shadow-xl">
          {group.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${childLinkTone("light")}`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavGroupStack({
  group,
  tone,
  onNavigate,
  defaultOpen = false,
}: {
  group: (typeof SERVICE_NAV_GROUPS)[number];
  tone: NavTone;
  onNavigate?: () => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-xl">
      <div className="flex items-center">
        <Link
          href={group.href}
          onClick={onNavigate}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${groupButtonTone(tone)}`}
        >
          {group.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-label={`Mở menu ${group.label}`}
          onClick={() => setOpen((v) => !v)}
          className={`mr-2 flex h-9 w-9 items-center justify-center rounded-lg transition ${groupButtonTone(tone)}`}
        >
          <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-0.5 pb-2 pl-2">
          {group.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${childLinkTone(tone)}`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteNavMenu({
  tone = "light",
  layout = "horizontal",
  onNavigate,
  activeHref,
  showSimpleLinks = true,
  simpleBeforeServices = true,
}: SiteNavMenuProps) {
  const simpleLinks = showSimpleLinks ? SIMPLE_NAV_LINKS : [];
  const lead = simpleBeforeServices
    ? simpleLinks.filter((item) => item.href === "/" || item.href === "/gioi-thieu")
    : [];
  const trail = simpleBeforeServices
    ? simpleLinks.filter((item) => item.href === "/blog" || item.href === "/lien-he")
    : simpleLinks;

  if (layout === "stack") {
    return (
      <div className="flex flex-col gap-1">
        {lead.map((item) => (
          <NavSimpleLink
            key={item.href}
            item={item}
            tone={tone}
            onNavigate={onNavigate}
            activeHref={activeHref}
            className="rounded-xl px-4 py-3 text-sm font-semibold transition"
          />
        ))}
        {SERVICE_NAV_GROUPS.map((group) => (
          <NavGroupStack key={group.label} group={group} tone={tone} onNavigate={onNavigate} />
        ))}
        {trail.map((item) => (
          <NavSimpleLink
            key={item.href}
            item={item}
            tone={tone}
            onNavigate={onNavigate}
            activeHref={activeHref}
            className="rounded-xl px-4 py-3 text-sm font-semibold transition"
          />
        ))}
      </div>
    );
  }

  return (
    <nav className="flex items-center gap-8">
      {lead.map((item) => (
        <NavSimpleLink key={item.href} item={item} tone={tone} onNavigate={onNavigate} activeHref={activeHref} />
      ))}
      {SERVICE_NAV_GROUPS.map((group) => (
        <NavGroupDesktop key={group.label} group={group} tone={tone} onNavigate={onNavigate} />
      ))}
      {trail.map((item) => (
        <NavSimpleLink key={item.href} item={item} tone={tone} onNavigate={onNavigate} activeHref={activeHref} />
      ))}
    </nav>
  );
}

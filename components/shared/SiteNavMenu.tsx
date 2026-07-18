"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { SERVICE_NAV_GROUPS, SIMPLE_NAV_LINKS, WEBSITE_INDUSTRY_NAV_LINKS, type SiteNavLink } from "@/lib/site-navigation";

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
  emphasize = false,
}: {
  item: SiteNavLink;
  tone: NavTone;
  onNavigate?: () => void;
  activeHref?: string;
  className?: string;
  emphasize?: boolean;
}) {
  const isActive = activeHref === item.href;
  const emphasisClass = emphasize
    ? tone === "dark"
      ? "rounded-full bg-violet-600 px-3.5 py-1.5 text-white shadow-md shadow-violet-950/30 hover:bg-violet-500 hover:text-white"
      : tone === "panel"
        ? "rounded-xl bg-violet-600 px-4 py-3 text-white shadow-md shadow-violet-900/20 hover:bg-violet-500 hover:text-white"
        : "rounded-full bg-violet-600 px-3.5 py-1.5 text-white shadow-md shadow-violet-900/15 hover:bg-violet-500 hover:text-white"
    : linkTone(tone, isActive);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`${className} ${emphasisClass}`}
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
          className={`inline-flex items-center whitespace-nowrap px-1 py-1 text-[13px] font-semibold transition xl:text-sm ${groupButtonTone(tone)}`}
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
        className={`absolute left-0 top-full z-[60] pt-2 transition-all ${
          group.industryMegaMenu ? "min-w-[44rem] max-w-[52rem]" : "min-w-[15rem]"
        } ${
          open
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-white p-3 shadow-xl">
          {group.industryMegaMenu ? (
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="shrink-0 border-b border-indigo-50 pb-3 lg:w-44 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-3">
                <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Dịch vụ</p>
                {group.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => {
                      setOpen(false);
                      onNavigate?.();
                    }}
                    className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${childLinkTone("light")}`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-violet-600">
                  Thiết kế website theo ngành
                </p>
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                  {WEBSITE_INDUSTRY_NAV_LINKS.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => {
                        setOpen(false);
                        onNavigate?.();
                      }}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 transition sm:px-2.5 sm:py-2 ${childLinkTone("light")}`}
                    >
                      <span className="relative h-8 w-12 shrink-0 overflow-hidden rounded-md border border-indigo-100 bg-indigo-50">
                        <Image
                          src={child.imageSrc}
                          alt={child.imageAlt}
                          fill
                          sizes="48px"
                          className="object-cover object-center"
                        />
                      </span>
                      <span className="text-xs font-semibold sm:text-sm">{child.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            group.children.map((child) => (
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
            ))
          )}
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
          {group.industryMegaMenu && (
            <>
              <p className="mt-2 px-4 text-[10px] font-bold uppercase tracking-wider text-violet-600">Theo ngành</p>
              {WEBSITE_INDUSTRY_NAV_LINKS.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${childLinkTone(tone)}`}
                >
                  <span className="relative h-7 w-10 shrink-0 overflow-hidden rounded border border-indigo-100 bg-indigo-50">
                    <Image
                      src={child.imageSrc}
                      alt={child.imageAlt}
                      fill
                      sizes="40px"
                      className="object-cover object-center"
                    />
                  </span>
                  {child.label}
                </Link>
              ))}
            </>
          )}
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
    ? simpleLinks.filter(
        (item) => item.href === "/" || item.href === "/banggia" || item.href === "/gioi-thieu",
      )
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
            emphasize={item.href === "/banggia"}
            className={
              item.href === "/banggia"
                ? "mx-1 my-0.5 text-sm font-bold tracking-wide transition"
                : "rounded-xl px-4 py-3 text-sm font-semibold transition"
            }
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
    <nav className="flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 xl:gap-x-5">
      {lead.map((item) => (
        <NavSimpleLink
          key={item.href}
          item={item}
          tone={tone}
          onNavigate={onNavigate}
          activeHref={activeHref}
          emphasize={item.href === "/banggia"}
          className={
            item.href === "/banggia"
              ? "whitespace-nowrap text-[12px] font-bold tracking-wide transition xl:text-[13px]"
              : "whitespace-nowrap px-1 py-1 text-[13px] font-semibold transition xl:text-sm"
          }
        />
      ))}
      {SERVICE_NAV_GROUPS.map((group) => (
        <NavGroupDesktop key={group.label} group={group} tone={tone} onNavigate={onNavigate} />
      ))}
      {trail.map((item) => (
        <NavSimpleLink
          key={item.href}
          item={item}
          tone={tone}
          onNavigate={onNavigate}
          activeHref={activeHref}
          className="whitespace-nowrap px-1 py-1 text-[13px] font-semibold transition xl:text-sm"
        />
      ))}
    </nav>
  );
}

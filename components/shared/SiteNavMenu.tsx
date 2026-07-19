"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  SERVICE_NAV_GROUPS,
  SIMPLE_NAV_LINKS,
  WEBSITE_INDUSTRY_NAV_LINKS,
  isNavLink,
  type SiteNavLink,
} from "@/lib/site-navigation";

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
    return isActive ? "text-white" : "text-white/90 hover:text-violet-200";
  }
  if (tone === "panel") {
    return "text-violet-100/90 hover:bg-violet-500/15 hover:text-white";
  }
  return isActive ? "text-violet-600" : "text-slate-600 hover:text-indigo-900";
}

function groupButtonTone(tone: NavTone) {
  if (tone === "dark") return "text-white/90 hover:text-violet-200";
  if (tone === "panel") return "text-violet-100/90 hover:bg-violet-500/15";
  return "text-slate-600 hover:text-indigo-900";
}

function childLinkTone(tone: NavTone) {
  if (tone === "dark" || tone === "panel") {
    return "text-white/80 hover:bg-violet-500/15 hover:text-violet-100";
  }
  return "text-slate-600 hover:bg-violet-50 hover:text-indigo-950";
}

function megaPanelClass(tone: NavTone) {
  if (tone === "dark" || tone === "panel") {
    return "nav-mega-panel overflow-hidden rounded-xl border border-violet-400/20 bg-[#12101c] p-2.5 text-violet-50 shadow-[0_20px_50px_rgba(8,9,12,0.65)]";
  }
  return "nav-mega-panel overflow-hidden rounded-xl border border-violet-200/70 bg-[#f3f0fa] p-2.5 text-slate-800 shadow-xl";
}

function megaHeadingClass(tone: NavTone, withBorder = false) {
  const dark = tone === "dark" || tone === "panel";
  const base = dark
    ? "px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300/70"
    : "px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-600";
  if (!withBorder) return `${base} mb-1 mt-0.5`;
  return dark
    ? `${base} mb-1 mt-2 border-t border-white/10 pt-2`
    : `${base} mb-1 mt-2 border-t border-violet-200/60 pt-2`;
}

function megaChildClass(tone: NavTone) {
  return tone === "dark" || tone === "panel"
    ? "block rounded-md px-3 py-1.5 text-sm font-medium text-white/75 transition hover:bg-violet-500/15 hover:text-white"
    : "block rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-violet-100/80 hover:text-indigo-950";
}

function megaIndustryItemClass(tone: NavTone) {
  return tone === "dark" || tone === "panel"
    ? "flex items-center gap-2 rounded-md px-2 py-1.5 text-white/80 transition hover:bg-violet-500/15 sm:px-2"
    : "flex items-center gap-2 rounded-md px-2 py-1.5 text-slate-800 transition hover:bg-violet-100/80 sm:px-2";
}

function megaThumbClass(tone: NavTone) {
  return tone === "dark" || tone === "panel"
    ? "relative h-7 w-11 shrink-0 overflow-hidden rounded border border-white/10 bg-violet-950/40"
    : "relative h-7 w-11 shrink-0 overflow-hidden rounded border border-violet-200/80 bg-violet-50";
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
    ? tone === "dark" || tone === "panel"
      ? "rounded-md bg-[#6D5CE6] px-3.5 py-1.5 text-white hover:bg-[#5B4BD4] hover:text-white"
      : "rounded-md bg-violet-600 px-3.5 py-1.5 text-white hover:bg-violet-500 hover:text-white"
    : linkTone(tone, isActive);

  return (
    <Link href={item.href} onClick={onNavigate} className={`${className} ${emphasisClass}`}>
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
  const dark = tone === "dark" || tone === "panel";

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
          <ChevronDown
            size={14}
            className={`opacity-70 transition ${open ? "rotate-180" : "group-hover:rotate-180"}`}
          />
        </button>
      </div>
      <div
        className={`absolute left-0 top-full z-[60] pt-1.5 transition-all ${
          group.industryMegaMenu
            ? "min-w-[40rem] max-w-[48rem]"
            : group.label === "Dịch vụ"
              ? "min-w-[16rem]"
              : "min-w-[14rem]"
        } ${
          open
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
        }`}
      >
        <div className={megaPanelClass(tone)}>
          {group.industryMegaMenu ? (
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-2.5">
              <div
                className={`shrink-0 pb-2 lg:w-40 lg:pb-0 lg:pr-2.5 ${
                  dark
                    ? "border-b border-white/10 lg:border-b-0 lg:border-r"
                    : "border-b border-violet-200/50 lg:border-b-0 lg:border-r"
                }`}
              >
                <p className={megaHeadingClass(tone)}>Dịch vụ</p>
                {group.children.filter(isNavLink).map((child) => (
                  <Link
                    key={child.href + child.label}
                    href={child.href}
                    onClick={() => {
                      setOpen(false);
                      onNavigate?.();
                    }}
                    className={megaChildClass(tone)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <p className={megaHeadingClass(tone)}>Thiết kế website theo ngành</p>
                <div className="grid grid-cols-2 gap-0.5 sm:grid-cols-3">
                  {WEBSITE_INDUSTRY_NAV_LINKS.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => {
                        setOpen(false);
                        onNavigate?.();
                      }}
                      className={megaIndustryItemClass(tone)}
                    >
                      <span className={megaThumbClass(tone)}>
                        <Image
                          src={child.imageSrc}
                          alt={child.imageAlt}
                          fill
                          sizes="44px"
                          className="object-cover object-center"
                        />
                      </span>
                      <span
                        className={`text-xs font-medium sm:text-[13px] ${
                          dark ? "text-white/80" : "text-slate-800"
                        }`}
                      >
                        {child.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            group.children.map((child, index) =>
              isNavLink(child) ? (
                <Link
                  key={child.href + child.label}
                  href={child.href}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className={megaChildClass(tone)}
                >
                  {child.label}
                </Link>
              ) : (
                <p key={`h-${child.label}-${index}`} className={megaHeadingClass(tone, index > 0)}>
                  {child.label}
                </p>
              ),
            )
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
  const dark = tone === "dark" || tone === "panel";

  return (
    <div className="overflow-hidden rounded-xl">
      <div className="flex items-center">
        <Link
          href={group.href}
          onClick={onNavigate}
          className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${groupButtonTone(tone)}`}
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
          {group.children.map((child, index) =>
            isNavLink(child) ? (
              <Link
                key={child.href + child.label}
                href={child.href}
                onClick={onNavigate}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${childLinkTone(tone)}`}
              >
                {child.label}
              </Link>
            ) : (
              <p
                key={`h-${child.label}-${index}`}
                className={`px-4 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                  dark ? "text-violet-300/70" : "text-violet-600"
                } ${index === 0 ? "mt-1" : "mt-2.5"}`}
              >
                {child.label}
              </p>
            ),
          )}
          {group.industryMegaMenu && (
            <>
              <p
                className={`mt-2 px-4 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                  dark ? "text-violet-300/70" : "text-violet-600"
                }`}
              >
                Theo ngành
              </p>
              {WEBSITE_INDUSTRY_NAV_LINKS.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition ${childLinkTone(tone)}`}
                >
                  <span className={megaThumbClass(tone)}>
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
                : "rounded-xl px-4 py-2.5 text-sm font-semibold transition"
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
            className="rounded-xl px-4 py-2.5 text-sm font-semibold transition"
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

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, MessageCircle, Phone, Search } from "lucide-react";
import type { PricingBranch, PricingPlatform } from "@/lib/pricing-catalog";
import { getTelHref, getZaloUrl } from "@/lib/site-contact";
import { useAdmin } from "@/lib/AdminContext";
import { fadeUpChild, staggerIntro } from "@/lib/motion-presets";
import { PriceTable } from "./PriceTable";

type PricingDocLayoutProps = {
  platform: PricingPlatform;
  searchQuery?: string;
};

const COLLAPSIBLE_BRANCH_IDS = new Set(["web-domain"]);

function filterPlatform(platform: PricingPlatform, query: string): PricingPlatform {
  const q = query.trim().toLowerCase();
  if (!q) return platform;

  const branches = platform.branches
    .map((branch) => ({
      ...branch,
      items: branch.items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.note?.toLowerCase().includes(q) ||
          branch.label.toLowerCase().includes(q),
      ),
    }))
    .filter((branch) => branch.items.length > 0);

  return { ...platform, branches };
}

function BranchSection({
  branch,
  accent,
  index,
  searchQuery,
  isLast,
}: {
  branch: PricingBranch;
  accent: string;
  index: number;
  searchQuery: string;
  isLast: boolean;
}) {
  const collapsible = COLLAPSIBLE_BRANCH_IDS.has(branch.id) && branch.items.length > 8;
  const [open, setOpen] = useState(!collapsible);
  const animatePrices = index < 2 && !searchQuery;

  return (
    <motion.section
      id={`section-${branch.id}`}
      variants={fadeUpChild}
      className="scroll-mt-28"
      data-section-id={branch.id}
    >
      {collapsible ? (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mb-4 flex w-full items-center justify-between gap-3 rounded-xl px-1 py-1 text-left"
          aria-expanded={open}
        >
          <h3 className="text-base font-bold text-indigo-950 sm:text-lg">{branch.label}</h3>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            style={{ color: open ? accent : undefined }}
          />
        </button>
      ) : (
        <h3 className="mb-4 text-base font-bold text-indigo-950 sm:text-lg">{branch.label}</h3>
      )}

      {(!collapsible || open) && (
        <PriceTable items={branch.items} accent={accent} animatePrices={animatePrices} />
      )}

      {!isLast ? (
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      ) : null}
    </motion.section>
  );
}

export function PricingDocLayout({ platform, searchQuery = "" }: PricingDocLayoutProps) {
  const { settings } = useAdmin();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(platform.branches[0]?.id ?? "");
  const filtered = useMemo(() => filterPlatform(platform, searchQuery), [platform, searchQuery]);

  const scrollToSection = useCallback((branchId: string) => {
    const el = document.getElementById(`section-${branchId}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(branchId);
  }, []);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const sections = root.querySelectorAll<HTMLElement>("[data-section-id]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement && visible.target.dataset.sectionId) {
          setActiveSection(visible.target.dataset.sectionId);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [filtered.branches]);

  if (filtered.branches.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
        Không tìm thấy gói phù hợp. Thử từ khóa khác hoặc{" "}
        <Link href="/lien-he" className="font-semibold text-violet-600 hover:underline">
          liên hệ tư vấn
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile sticky chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filtered.branches.map((branch) => {
          const active = activeSection === branch.id;
          return (
            <button
              key={branch.id}
              type="button"
              onClick={() => scrollToSection(branch.id)}
              className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all"
              style={
                active
                  ? {
                      backgroundColor: platform.color,
                      color: "#fff",
                      boxShadow: `0 4px 14px ${platform.color}40`,
                    }
                  : { backgroundColor: "#fff", color: "#64748B", border: "1px solid #E2E8F0" }
              }
            >
              {branch.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
      {/* Desktop sidebar */}
      <nav
        aria-label={`Danh mục ${platform.label}`}
        className="hidden lg:block"
      >
        <div className="sticky top-28 space-y-1 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
          <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">Danh mục</p>
          {filtered.branches.map((branch) => {
            const active = activeSection === branch.id;
            return (
              <button
                key={branch.id}
                type="button"
                onClick={() => scrollToSection(branch.id)}
                className="relative flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors"
                style={{
                  color: active ? platform.color : "#475569",
                  backgroundColor: active ? `${platform.color}10` : undefined,
                }}
              >
                {active ? (
                  <motion.span
                    layoutId={`banggia-nav-${platform.id}`}
                    className="absolute inset-y-1.5 left-1 w-0.5 rounded-full"
                    style={{ backgroundColor: platform.color }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="pl-2">{branch.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <motion.div
        ref={contentRef}
        key={platform.id + searchQuery}
        initial="hidden"
        animate="visible"
        variants={staggerIntro}
        className="min-w-0 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:col-start-2 lg:row-start-1 lg:row-span-2"
      >
        <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: platform.color }} aria-hidden />
          <div>
            <h2 className="text-lg font-bold text-indigo-950">{platform.label}</h2>
            <p className="text-xs text-slate-500">{filtered.branches.length} nhóm dịch vụ</p>
          </div>
        </div>

        {filtered.branches.map((branch, index) => (
          <BranchSection
            key={branch.id}
            branch={branch}
            accent={platform.color}
            index={index}
            searchQuery={searchQuery}
            isLast={index === filtered.branches.length - 1}
          />
        ))}

        <div className="rounded-xl bg-slate-50 px-4 py-4 text-center sm:px-6">
          <p className="text-sm text-slate-600">Không chắc chọn gói nào?</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href={getTelHref(settings?.hotline)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              <Phone className="h-4 w-4" />
              Gọi tư vấn
            </a>
            <a
              href={getZaloUrl(settings?.hotline)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:text-violet-700"
            >
              <MessageCircle className="h-4 w-4" />
              Chat Zalo
            </a>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}

export function PricingSearchBar({
  value,
  onChange,
  accent,
}: {
  value: string;
  onChange: (value: string) => void;
  accent: string;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tìm gói dịch vụ..."
        className="brand-input w-full pl-10"
        style={{ boxShadow: value ? `0 0 0 2px ${accent}22` : undefined }}
      />
    </div>
  );
}

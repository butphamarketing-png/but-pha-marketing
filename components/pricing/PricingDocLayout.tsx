"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Search } from "lucide-react";
import type { PricingBranch, PricingPlatform } from "@/lib/pricing-catalog";
import { getTelHref, getZaloUrl } from "@/lib/site-contact";
import { useAdmin } from "@/lib/AdminContext";
import { fadeUpChild, staggerIntro } from "@/lib/motion-presets";
import { DomainPricingGrid } from "./DomainPricingGrid";
import { PlatformHero } from "./PlatformHero";
import { PriceTable } from "./PriceTable";

type PricingDocLayoutProps = {
  platform: PricingPlatform;
  searchQuery?: string;
};

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
  const animatePrices = index < 2 && !searchQuery;
  const isDomain = branch.id === "web-domain";

  return (
    <motion.section
      id={`section-${branch.id}`}
      variants={fadeUpChild}
      className="scroll-mt-32"
      data-section-id={branch.id}
    >
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <h3
            className="text-xl font-semibold tracking-tight text-white sm:text-2xl"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
          >
            {branch.label}
          </h3>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/30">
            {branch.items.length} gói
          </p>
        </div>
      </div>

      {isDomain ? (
        <DomainPricingGrid items={branch.items} accent={accent} searchQuery={searchQuery} />
      ) : (
        <PriceTable
          items={branch.items}
          accent={accent}
          animatePrices={animatePrices}
          searchQuery={searchQuery}
        />
      )}

      {!isLast ? <div className="my-2" /> : null}
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
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.2, 0.45] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [filtered.branches]);

  if (filtered.branches.length === 0) {
    return (
      <div className="border border-dashed border-white/15 py-14 text-center">
        <p className="text-base font-medium text-white/80">Không tìm thấy gói phù hợp</p>
        <p className="mt-2 text-sm text-white/40">Thử từ khóa khác hoặc liên hệ để được tư vấn trực tiếp.</p>
        <Link
          href="/lien-he"
          className="mt-5 inline-flex border border-amber-200/40 bg-amber-200 px-5 py-2.5 text-sm font-semibold text-[#0b0d12] transition hover:bg-amber-100"
        >
          Liên hệ tư vấn
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-[57px] z-30 -mx-1 bg-[#08090c]/92 px-1 py-2 backdrop-blur-md lg:hidden">
        <div className="flex gap-1 overflow-x-auto border-b border-white/[0.08] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filtered.branches.map((branch) => {
            const active = activeSection === branch.id;
            return (
              <button
                key={branch.id}
                type="button"
                onClick={() => scrollToSection(branch.id)}
                className={`relative shrink-0 px-3.5 py-2.5 text-xs font-medium transition-colors ${
                  active ? "text-amber-100" : "text-white/40"
                }`}
              >
                {branch.label}
                {active ? (
                  <span className="absolute inset-x-0 bottom-0 h-px bg-amber-200/70" aria-hidden />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
        <nav aria-label={`Danh mục ${platform.label}`} className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">Danh mục</p>
            <div className="mt-4 space-y-0.5 border-l border-white/[0.08]">
              {filtered.branches.map((branch) => {
                const active = activeSection === branch.id;
                return (
                  <button
                    key={branch.id}
                    type="button"
                    onClick={() => scrollToSection(branch.id)}
                    className={`relative block w-full py-2.5 pl-4 text-left text-sm transition-colors ${
                      active ? "text-amber-100" : "text-white/40 hover:text-white/65"
                    }`}
                  >
                    {active ? (
                      <span className="absolute inset-y-1 left-0 w-px bg-amber-200/80" aria-hidden />
                    ) : null}
                    <span className="block truncate">{branch.label}</span>
                    <span className="mt-0.5 block text-[10px] tabular-nums text-white/25">
                      {branch.items.length} gói
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        <motion.div
          ref={contentRef}
          key={platform.id + searchQuery}
          initial="hidden"
          animate="visible"
          variants={staggerIntro}
          className="min-w-0 lg:col-start-2"
        >
          <PlatformHero platform={platform} />

          <div className="mt-8 space-y-12">
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

            <div className="border-t border-white/[0.06] pt-8">
              <p className="text-sm font-medium text-white/80">Không chắc chọn gói nào?</p>
              <p className="mt-1 text-sm text-white/35">
                Đội ngũ Bứt Phá tư vấn miễn phí theo ngân sách và mục tiêu.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={getTelHref(settings?.hotline)}
                  className="inline-flex items-center gap-2 bg-amber-200 px-5 py-2.5 text-sm font-semibold text-[#0b0d12] transition hover:bg-amber-100"
                >
                  <Phone className="h-4 w-4" />
                  Gọi tư vấn
                </a>
                <a
                  href={getZaloUrl(settings?.hotline)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/15 px-5 py-2.5 text-sm font-medium text-white/75 transition hover:border-white/25 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat Zalo
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const SEARCH_PLACEHOLDER: Record<string, string> = {
  website: "Tìm: thiết kế, vận hành, tên miền…",
  facebook: "Tìm: fanpage, chăm sóc, quảng cáo…",
  googlemaps: "Tìm: maps, local ads…",
};

export function PricingSearchBar({
  value,
  onChange,
  accent,
  platformId,
}: {
  value: string;
  onChange: (value: string) => void;
  accent: string;
  platformId: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={SEARCH_PLACEHOLDER[platformId] ?? "Tìm gói dịch vụ…"}
        className="w-full border border-white/10 bg-white/[0.02] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-amber-200/35"
        style={{
          boxShadow: value || focused ? `0 0 0 1px ${accent}55` : undefined,
        }}
      />
    </div>
  );
}

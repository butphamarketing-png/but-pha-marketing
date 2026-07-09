import type { IndustryHubSlug } from "@/lib/industry-hub";

/** 6 vertical ưu tiên tạo lead — theo plan 90 ngày. */
export const PRIORITY_VERTICAL_SLUGS = [
  "nha-khoa",
  "xay-dung",
  "tham-my",
  "spa",
  "phong-kham",
  "my-pham",
  "pccc",
] as const satisfies readonly IndustryHubSlug[];

export type ProofSlot =
  | "money"
  | "checklist"
  | "template"
  | "hub"
  | "caseStudy"
  | "caseStudyBlog"
  | "pillar";

export type VerticalProofConfig = {
  moneySlug: string;
  checklistSlug?: string;
  templateSlug?: string;
  caseStudySlug?: string;
  caseStudyBlogSlug?: string;
  pillarSlug?: string;
};

export const VERTICAL_PROOF_CONFIG: Record<(typeof PRIORITY_VERTICAL_SLUGS)[number], VerticalProofConfig> = {
  "nha-khoa": {
    moneySlug: "thiet-ke-website-nha-khoa",
    checklistSlug: "checklist-website-nha-khoa-2026",
    templateSlug: "template-website-nha-khoa-2026",
    caseStudySlug: "nha-khoa-dang-khoa",
    caseStudyBlogSlug: "case-study-thiet-ke-website-nha-khoa-dang-khoa",
    pillarSlug: "thiet-ke-website",
  },
  "xay-dung": {
    moneySlug: "thiet-ke-website-xay-dung-nha-thau",
    checklistSlug: "checklist-website-xay-dung-2026",
    templateSlug: "template-website-xay-dung-2026",
    caseStudySlug: "kien-truc-sao-khue",
    caseStudyBlogSlug: "case-study-thiet-ke-website-xay-dung-sao-khue",
    pillarSlug: "thiet-ke-website",
  },
  "tham-my": {
    moneySlug: "thiet-ke-website-tham-my-vien",
    checklistSlug: "checklist-website-tham-my-vien-2026",
    templateSlug: "template-website-tham-my-vien-2026",
    caseStudySlug: "tham-my-thien-hoang-kim",
    caseStudyBlogSlug: "case-study-thiet-ke-website-tham-my-thien-hoang-kim",
    pillarSlug: "thiet-ke-website",
  },
  spa: {
    moneySlug: "thiet-ke-website-spa",
    checklistSlug: "checklist-website-spa-2026",
    templateSlug: "template-website-spa-2026",
    caseStudySlug: "phuoc-lai-luxury",
    caseStudyBlogSlug: "case-study-thiet-ke-website-spa-phuoc-lai-luxury",
    pillarSlug: "thiet-ke-website",
  },
  "phong-kham": {
    moneySlug: "thiet-ke-website-phong-kham-da-khoa",
    checklistSlug: "checklist-website-phong-kham-2026",
    templateSlug: "template-website-phong-kham-2026",
    caseStudySlug: "nha-khoa-dang-khoa",
    caseStudyBlogSlug: "case-study-thiet-ke-website-nha-khoa-dang-khoa",
    pillarSlug: "thiet-ke-website",
  },
  "my-pham": {
    moneySlug: "thiet-ke-website-my-pham-lam-dep",
    checklistSlug: "checklist-website-my-pham-2026",
    templateSlug: "template-website-my-pham-2026",
    caseStudySlug: "halee-tram",
    caseStudyBlogSlug: "case-study-thiet-ke-website-halee-tram",
    pillarSlug: "thiet-ke-website",
  },
  pccc: {
    moneySlug: "thiet-ke-website-pccc",
    checklistSlug: "checklist-website-pccc-2026",
    templateSlug: "template-website-pccc-2026",
    caseStudySlug: "pccc-bao-an-fire",
    caseStudyBlogSlug: "case-study-thiet-ke-website-pccc-bao-an",
    pillarSlug: "thiet-ke-website",
  },
};

export type ProofLink = {
  slot: ProofSlot;
  label: string;
  href: string;
  present: boolean;
};

const SLOT_LABELS: Record<ProofSlot, string> = {
  money: "Money page",
  checklist: "Checklist 2026",
  template: "Template 2026",
  hub: "Hub ngành",
  caseStudy: "Case study /du-an",
  caseStudyBlog: "Bài case study blog",
  pillar: "Pillar cluster",
};

export function getVerticalProofLinks(slug: (typeof PRIORITY_VERTICAL_SLUGS)[number]): ProofLink[] {
  const cfg = VERTICAL_PROOF_CONFIG[slug];
  const hubHref = `/blog/nganh/${slug}`;

  const entries: { slot: ProofSlot; href?: string }[] = [
    { slot: "hub", href: hubHref },
    { slot: "money", href: `/blog/${cfg.moneySlug}` },
    { slot: "checklist", href: cfg.checklistSlug ? `/blog/${cfg.checklistSlug}` : undefined },
    { slot: "template", href: cfg.templateSlug ? `/blog/${cfg.templateSlug}` : undefined },
    { slot: "caseStudy", href: cfg.caseStudySlug ? `/du-an/${cfg.caseStudySlug}` : undefined },
    { slot: "caseStudyBlog", href: cfg.caseStudyBlogSlug ? `/blog/${cfg.caseStudyBlogSlug}` : undefined },
    { slot: "pillar", href: cfg.pillarSlug ? `/blog/${cfg.pillarSlug}` : undefined },
  ];

  return entries.map(({ slot, href }) => ({
    slot,
    label: SLOT_LABELS[slot],
    href: href ?? "#",
    present: Boolean(href),
  }));
}

export function getVerticalProofScore(slug: (typeof PRIORITY_VERTICAL_SLUGS)[number]): {
  score: number;
  total: number;
  missing: ProofSlot[];
} {
  const links = getVerticalProofLinks(slug);
  const present = links.filter((l) => l.present);
  const missing = links.filter((l) => !l.present).map((l) => l.slot);
  return {
    score: present.length,
    total: links.length,
    missing,
  };
}

export function isPriorityVertical(slug: string): slug is (typeof PRIORITY_VERTICAL_SLUGS)[number] {
  return (PRIORITY_VERTICAL_SLUGS as readonly string[]).includes(slug);
}

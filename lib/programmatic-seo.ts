import {
  LOCAL_SEO_GENERATED,
  WEBSITE_INDUSTRY_GENERATED,
  type ProgrammaticGeneratedLanding,
} from "@/lib/programmatic-seo.generated";

export type ProgrammaticLanding = {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  qualityScore: number;
};

const INDEX_THRESHOLD = 70;

function castLandings(items: ProgrammaticGeneratedLanding[]): ProgrammaticLanding[] {
  return items.map((item) => ({
    slug: item.slug,
    title: item.title,
    description: item.description,
    primaryKeyword: item.primaryKeyword,
    qualityScore: item.qualityScore,
  }));
}

export const WEBSITE_INDUSTRY_LANDINGS: ProgrammaticLanding[] = castLandings(WEBSITE_INDUSTRY_GENERATED);

export const LOCAL_SEO_LANDINGS: ProgrammaticLanding[] = castLandings(LOCAL_SEO_GENERATED);

export function resolveIndexPolicy(qualityScore: number): "index" | "noindex" {
  return qualityScore >= INDEX_THRESHOLD ? "index" : "noindex";
}

export function getIndexableProgrammaticPaths() {
  const websiteIndustry = WEBSITE_INDUSTRY_LANDINGS.filter((item) => resolveIndexPolicy(item.qualityScore) === "index")
    .map((item) => `/website/nganh/${item.slug}`);
  const localSeo = LOCAL_SEO_LANDINGS.filter((item) => resolveIndexPolicy(item.qualityScore) === "index").map(
    (item) => `/seo-website/dia-phuong/${item.slug}`,
  );
  return [...websiteIndustry, ...localSeo];
}

export function getWebsiteIndustryLanding(slug: string) {
  return WEBSITE_INDUSTRY_LANDINGS.find((item) => item.slug === slug);
}

export function getLocalSeoLanding(slug: string) {
  return LOCAL_SEO_LANDINGS.find((item) => item.slug === slug);
}

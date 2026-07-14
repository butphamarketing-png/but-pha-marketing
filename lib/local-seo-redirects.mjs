/**
 * Blog slug → slug landing /seo-website/dia-phuong/{location}
 * P2 — gom intent địa phương về programmatic local SEO (tránh cannibalization).
 */

/** Money blog «thiết kế website + tỉnh/thành» */
export const LOCAL_SEO_WEBSITE_BLOG_TO_LOCATION = {
  "thiet-ke-website-tphcm": "ho-chi-minh",
  "thiet-ke-website-tp-hcm": "ho-chi-minh",
  "cong-ty-thiet-ke-website-tp-hcm": "ho-chi-minh",
  "thiet-ke-website-quan-1": "quan-1",
  "thiet-ke-website-quan-7": "quan-7",
  "lam-web-quan-1-hcm": "quan-1",
  "thiet-ke-website-cau-giay": "cau-giay",
  "thiet-ke-website-ha-noi": "ha-noi",
  "thiet-ke-website-da-nang": "da-nang",
  "thiet-ke-website-can-tho": "can-tho",
  "thiet-ke-website-binh-duong": "binh-duong",
  "thiet-ke-website-dong-nai": "dong-nai",
  "thiet-ke-website-hai-phong": "hai-phong",
  "thiet-ke-website-nha-trang": "nha-trang",
  "thiet-ke-website-hue": "hue",
  "thiet-ke-website-thanh-hoa": "thanh-hoa",
};

/** Slug blog cũ (legacy) → location */
export const LOCAL_SEO_LEGACY_BLOG_TO_LOCATION = {
  "thiet-ke-website-tphcm-uy-tin": "ho-chi-minh",
  "thiet-ke-website-ha-noi-chuyen-nghiep": "ha-noi",
  "thiet-ke-website-da-nang-du-lich": "da-nang",
};

/** Blog «seo local + tỉnh» trùng intent với landing programmatic */
export const LOCAL_SEO_SEO_BLOG_TO_LOCATION = {
  "seo-local-tphcm": "ho-chi-minh",
  "seo-local-ha-noi": "ha-noi",
  "seo-local-da-nang": "da-nang",
  "seo-local-can-tho": "can-tho",
  "seo-local-binh-duong": "binh-duong",
  "seo-local-hai-phong": "hai-phong",
  "seo-local-nha-trang": "nha-trang",
};

export const LOCAL_SEO_LOCATION_SLUGS = [
  "ho-chi-minh",
  "ha-noi",
  "da-nang",
  "can-tho",
  "binh-duong",
  "dong-nai",
  "hai-phong",
  "nha-trang",
  "hue",
  "vinh",
  "thanh-hoa",
  "binh-thuan",
  "quan-1",
  "quan-3",
  "quan-7",
  "binh-thanh",
  "thu-duc",
  "go-vap",
  "cau-giay",
  "dong-da",
  "hai-ba-trung",
  "nam-tu-liem",
  "hai-chau",
  "thanh-khe",
];

/** @returns {Record<string, string>} blogSlug → locationSlug */
export function getLocalSeoBlogRedirectMap() {
  return {
    ...LOCAL_SEO_WEBSITE_BLOG_TO_LOCATION,
    ...LOCAL_SEO_LEGACY_BLOG_TO_LOCATION,
    ...LOCAL_SEO_SEO_BLOG_TO_LOCATION,
  };
}

/** @returns {{ source: string, destination: string, permanent: boolean }[]} */
export function buildLocalSeoNextRedirects() {
  const map = getLocalSeoBlogRedirectMap();
  return Object.entries(map).map(([blogSlug, location]) => ({
    source: `/blog/${blogSlug}`,
    destination: `/seo-website/dia-phuong/${location}`,
    permanent: true,
  }));
}

export function getLocalSeoLandingPath(locationSlug) {
  return `/seo-website/dia-phuong/${locationSlug}`;
}

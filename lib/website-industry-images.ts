import { INDUSTRY_MOCKUP_ALTS } from "./industry-mockup-alts";
import { getMockupDimensions, hdMockupVariantSrc } from "./industry-mockup-dimensions.generated";
import { KHACH_SAN_IMAGE_ALTS } from "./khach-san-images";
import { MAM_NON_IMAGE_ALTS } from "./mam-non-images";
import { THIET_BI_VE_SINH_IMAGE_ALTS } from "./thiet-bi-ve-sinh-images";
import { BAT_DONG_SAN_IMAGE_ALTS } from "./bat-dong-san-images";
import { KIEN_TRUC_IMAGE_ALTS } from "./kien-truc-images";
import { NHA_HANG_IMAGE_ALTS } from "./nha-hang-images";
import { getBlogThumbnailAlt, resolveBlogImageUrl } from "./news-images";

export type WebsiteIndustryImage = {
  src: string;
  alt: string;
};

type ImagePoolDef = {
  dir: string;
  files: readonly string[];
  alts?: readonly string[];
};

const DEFAULT_POOL: ImagePoolDef = {
  dir: "/tin-tuc",
  files: [
    "thiet-ke-website.png",
    "thiet-ke-website-1.png",
    "thiet-ke-website-2.png",
    "thiet-ke-website-3.png",
    "thiet-ke-website-4.png",
    "thiet-ke-website-5.png",
  ],
};

const IMAGE_POOLS = {
  "nha-khoa": {
    dir: "/tin-tuc/nha-khoa",
    files: ["nha-khoa-1.png", "nha-khoa-2.png", "nha-khoa-3.png", "nha-khoa-4.png", "nha-khoa-5.png"],
    alts: INDUSTRY_MOCKUP_ALTS["nha-khoa"],
  },
  "tham-my": {
    dir: "/tin-tuc/tham-my",
    files: ["tham-my-1.png", "tham-my-2.png", "tham-my-3.png", "tham-my-4.png", "tham-my-5.png"],
    alts: INDUSTRY_MOCKUP_ALTS["tham-my"],
  },
  "phong-kham": {
    dir: "/tin-tuc/phong-kham",
    files: ["phong-kham-1.png", "phong-kham-2.png", "phong-kham-3.png", "phong-kham-4.png", "phong-kham-5.png"],
    alts: INDUSTRY_MOCKUP_ALTS["phong-kham"],
  },
  "kien-truc": {
    dir: "/tin-tuc/kien-truc",
    files: [
      "kien-truc-1.png",
      "kien-truc-2.png",
      "kien-truc-3.png",
      "kien-truc-4.png",
      "kien-truc-5.png",
      "kien-truc-6.png",
      "kien-truc-7.png",
    ],
    alts: KIEN_TRUC_IMAGE_ALTS,
  },
  "my-pham": {
    dir: "/tin-tuc/my-pham",
    files: ["my-pham-1.png", "my-pham-2.png", "my-pham-3.png", "my-pham-4.png", "my-pham-5.png"],
    alts: INDUSTRY_MOCKUP_ALTS["my-pham"],
  },
  pccc: {
    dir: "/tin-tuc/pccc",
    files: ["pccc-1.png", "pccc-2.png", "pccc-3.png", "pccc-4.png", "pccc-5.png"],
    alts: INDUSTRY_MOCKUP_ALTS.pccc,
  },
  logistics: {
    dir: "/tin-tuc/logistics",
    files: ["logistics-1.png", "logistics-2.png", "logistics-3.png", "logistics-4.png", "logistics-5.png"],
    alts: INDUSTRY_MOCKUP_ALTS.logistics,
  },
  "co-khi": {
    dir: "/tin-tuc/co-khi",
    files: ["co-khi-1.png", "co-khi-2.png", "co-khi-3.png", "co-khi-4.png", "co-khi-5.png"],
    alts: INDUSTRY_MOCKUP_ALTS["co-khi"],
  },
  "bao-bi": {
    dir: "/tin-tuc/bao-bi",
    files: ["bao-bi-1.png", "bao-bi-2.png", "bao-bi-3.png", "bao-bi-4.png", "bao-bi-5.png"],
    alts: INDUSTRY_MOCKUP_ALTS["bao-bi"],
  },
  luat: {
    dir: "/tin-tuc/luat",
    files: ["luat-1.png", "luat-2.png", "luat-3.png", "luat-4.png", "luat-5.png"],
    alts: INDUSTRY_MOCKUP_ALTS.luat,
  },
  "thang-may": {
    dir: "/tin-tuc/thang-may",
    files: ["thang-may-1.png", "thang-may-2.png", "thang-may-3.png", "thang-may-4.png", "thang-may-5.png"],
    alts: INDUSTRY_MOCKUP_ALTS["thang-may"],
  },
  "tu-dong-hoa": {
    dir: "/tin-tuc/tu-dong-hoa",
    files: [
      "tu-dong-hoa-1.png",
      "tu-dong-hoa-2.png",
      "tu-dong-hoa-3.png",
      "tu-dong-hoa-4.png",
      "tu-dong-hoa-5.png",
    ],
    alts: INDUSTRY_MOCKUP_ALTS["tu-dong-hoa"],
  },
  "nha-hang": {
    dir: "/tin-tuc/nha-hang",
    files: [
      "thiet-ke-website-nha-hang.png",
      "nha-hang-2.png",
      "nha-hang-3.png",
      "nha-hang-4.png",
      "nha-hang-5.png",
      "nha-hang-6.png",
    ],
    alts: NHA_HANG_IMAGE_ALTS,
  },
  "khach-san": {
    dir: "/tin-tuc/khach-san",
    files: [
      "thiet-ke-website-khach-san.png",
      "khach-san-2.png",
      "khach-san-3.png",
      "khach-san-4.png",
      "khach-san-5.png",
      "khach-san-6.png",
      "khach-san-7.png",
    ],
    alts: KHACH_SAN_IMAGE_ALTS,
  },
  "mam-non": {
    dir: "/tin-tuc/mam-non",
    files: [
      "thiet-ke-website-truong-mam-non.png",
      "mam-non-2.png",
      "mam-non-3.png",
      "mam-non-4.png",
      "mam-non-5.png",
    ],
    alts: MAM_NON_IMAGE_ALTS,
  },
  "thiet-bi-ve-sinh": {
    dir: "/tin-tuc/thiet-bi-ve-sinh",
    files: [
      "thiet-ke-website-thiet-bi-ve-sinh.png",
      "thiet-bi-ve-sinh-2.png",
      "thiet-bi-ve-sinh-3.png",
      "thiet-bi-ve-sinh-4.png",
      "thiet-bi-ve-sinh-5.png",
      "thiet-bi-ve-sinh-6.png",
      "thiet-bi-ve-sinh-7.png",
    ],
    alts: THIET_BI_VE_SINH_IMAGE_ALTS,
  },
  "bat-dong-san": {
    dir: "/tin-tuc/bat-dong-san",
    files: [
      "thiet-ke-website-bat-dong-san.png",
      "bat-dong-san-2.png",
      "bat-dong-san-3.png",
      "bat-dong-san-4.png",
      "bat-dong-san-5.png",
      "bat-dong-san-6.png",
    ],
    alts: BAT_DONG_SAN_IMAGE_ALTS,
  },
} as const satisfies Record<string, ImagePoolDef>;

type PoolKey = keyof typeof IMAGE_POOLS;

/** Catalog slug → pool ảnh mockup trong public/tin-tuc */
const CATALOG_POOL_MAP: Record<string, PoolKey | "default"> = {
  "nha-khoa": "nha-khoa",
  spa: "tham-my",
  "tham-my": "tham-my",
  "phong-kham": "phong-kham",
  "xay-dung": "kien-truc",
  "noi-that": "kien-truc",
  "my-pham": "my-pham",
  pccc: "pccc",
  logistics: "logistics",
  "co-khi": "co-khi",
  "bao-bi": "bao-bi",
  "in-an": "bao-bi",
  luat: "luat",
  "thang-may": "thang-may",
  "tu-dong-hoa": "tu-dong-hoa",
  "nha-hang": "nha-hang",
  "khach-san": "khach-san",
  "mam-non": "mam-non",
  "bat-dong-san": "bat-dong-san",
  "anh-ngu": "default",
  "o-to": "default",
  "thiet-bi-ve-sinh": "thiet-bi-ve-sinh",
  "landing-page": "default",
};

function resolvePool(catalogSlug: string): ImagePoolDef {
  const key = CATALOG_POOL_MAP[catalogSlug] ?? "default";
  if (key === "default") return DEFAULT_POOL;
  return IMAGE_POOLS[key];
}

function poolAlt(pool: ImagePoolDef, index: number, keyword: string): string {
  if (pool.alts?.[index]) return pool.alts[index];
  if (pool.alts?.[index % pool.alts.length]) return pool.alts[index % pool.alts.length]!;
  return `${keyword} — mẫu giao diện ${index + 1}`;
}

function expandWithHdVariants(images: WebsiteIndustryImage[]): WebsiteIndustryImage[] {
  const out = [...images];
  for (const img of images) {
    const hdSrc = hdMockupVariantSrc(img.src);
    if (hdSrc && getMockupDimensions(hdSrc)) {
      out.push({ src: hdSrc, alt: img.alt });
    }
  }
  return out;
}

function mockupWidth(src: string): number {
  return getMockupDimensions(src)?.width ?? 0;
}

function pickWidestImage(images: WebsiteIndustryImage[]): WebsiteIndustryImage | null {
  if (!images.length) return null;
  return [...images].sort((a, b) => mockupWidth(b.src) - mockupWidth(a.src))[0]!;
}

export function getWebsiteIndustryGallery(
  catalogSlug: string,
  primaryKeyword: string,
): WebsiteIndustryImage[] {
  const pool = resolvePool(catalogSlug);
  const images = pool.files.map((file, index) => ({
    src: `${pool.dir}/${file}`,
    alt: poolAlt(pool, index, primaryKeyword),
  }));
  /** Ưu tiên WebP 1920 trong /hd/ — tránh PNG ~480px bị mờ trên grid/landing */
  return images.map((img) => {
    const hdSrc = hdMockupVariantSrc(img.src);
    if (hdSrc && getMockupDimensions(hdSrc)) return { ...img, src: hdSrc };
    return img;
  });
}

export function getWebsiteIndustryHero(input: {
  catalogSlug: string;
  primaryKeyword: string;
  blogMoneySlug: string;
  title: string;
}): WebsiteIndustryImage {
  const gallery = expandWithHdVariants(
    getWebsiteIndustryGallery(input.catalogSlug, input.primaryKeyword),
  );
  const highResFallback = expandWithHdVariants(
    DEFAULT_POOL.files.map((file, index) => ({
      src: `${DEFAULT_POOL.dir}/${file}`,
      alt: poolAlt(DEFAULT_POOL, index, input.primaryKeyword),
    })),
  );
  const bestMockup = pickWidestImage([...gallery, ...highResFallback]);

  const fromBlog = resolveBlogImageUrl({
    slug: input.blogMoneySlug,
    keywordsMain: input.primaryKeyword,
    title: input.title,
  });
  const alt =
    getBlogThumbnailAlt({
      slug: input.blogMoneySlug,
      keywordsMain: input.primaryKeyword,
      title: input.title,
    }) || input.primaryKeyword;

  if (
    fromBlog &&
    !fromBlog.endsWith("tin-tuc-marketing.png") &&
    mockupWidth(fromBlog) > mockupWidth(bestMockup?.src ?? "")
  ) {
    return { src: fromBlog, alt };
  }

  if (bestMockup) return bestMockup;

  return { src: "/tin-tuc/thiet-ke-website.png", alt: input.primaryKeyword };
}

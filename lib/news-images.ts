import {
  KIEN_TRUC_ARTICLE_THUMBNAILS,
  getKienTrucThumbnailAlt,
  getKienTrucThumbnailPath,
  resolveKienTrucArticleSlug,
} from "./kien-truc-images";

import {
  NHA_HANG_ARTICLE_THUMBNAILS,
  getNhaHangThumbnailAlt,
  getNhaHangThumbnailPath,
  resolveNhaHangArticleSlug,
} from "./nha-hang-images";

import {
  KHACH_SAN_ARTICLE_THUMBNAILS,
  getKhachSanThumbnailAlt,
  getKhachSanThumbnailPath,
  resolveKhachSanArticleSlug,
} from "./khach-san-images";

import {
  MAM_NON_ARTICLE_THUMBNAILS,
  getMamNonThumbnailAlt,
  getMamNonThumbnailPath,
  resolveMamNonArticleSlug,
} from "./mam-non-images";

import {
  THIET_BI_VE_SINH_ARTICLE_THUMBNAILS,
  getThietBiVeSinhThumbnailAlt,
  getThietBiVeSinhThumbnailPath,
  resolveThietBiVeSinhArticleSlug,
} from "./thiet-bi-ve-sinh-images";

import {
  BAT_DONG_SAN_ARTICLE_THUMBNAILS,
  getBatDongSanThumbnailAlt,
  getBatDongSanThumbnailPath,
  resolveBatDongSanArticleSlug,
} from "./bat-dong-san-images";

import {
  getGeneratedArticleThumbnailAlt,
  getGeneratedArticleThumbnailPath,
} from "./news-article-thumbs.generated";

export type NewsImageTopic = "website" | "facebook" | "google-maps" | "marketing";

export {
  KIEN_TRUC_ARTICLE_THUMBNAILS,
  getKienTrucThumbnailPath,
  getKienTrucThumbnailAlt,
  resolveKienTrucArticleSlug,
} from "./kien-truc-images";

export {
  NHA_HANG_ARTICLE_THUMBNAILS,
  getNhaHangThumbnailPath,
  getNhaHangThumbnailAlt,
  resolveNhaHangArticleSlug,
} from "./nha-hang-images";

export {
  KHACH_SAN_ARTICLE_THUMBNAILS,
  getKhachSanThumbnailPath,
  getKhachSanThumbnailAlt,
  resolveKhachSanArticleSlug,
} from "./khach-san-images";

export {
  MAM_NON_ARTICLE_THUMBNAILS,
  getMamNonThumbnailPath,
  getMamNonThumbnailAlt,
  resolveMamNonArticleSlug,
} from "./mam-non-images";

export {
  THIET_BI_VE_SINH_ARTICLE_THUMBNAILS,
  getThietBiVeSinhThumbnailPath,
  getThietBiVeSinhThumbnailAlt,
  resolveThietBiVeSinhArticleSlug,
} from "./thiet-bi-ve-sinh-images";

export {
  BAT_DONG_SAN_ARTICLE_THUMBNAILS,
  getBatDongSanThumbnailPath,
  getBatDongSanThumbnailAlt,
  resolveBatDongSanArticleSlug,
} from "./bat-dong-san-images";

const NEWS_DIR = "/tin-tuc";
const PCCC_DIR = `${NEWS_DIR}/pccc`;
const MY_PHAM_DIR = `${NEWS_DIR}/my-pham`;
const THANG_MAY_DIR = `${NEWS_DIR}/thang-may`;
const NHA_KHOA_DIR = `${NEWS_DIR}/nha-khoa`;
const LUAT_DIR = `${NEWS_DIR}/luat`;
const THAM_MY_DIR = `${NEWS_DIR}/tham-my`;
const PHONG_KHAM_DIR = `${NEWS_DIR}/phong-kham`;
const LOGISTICS_DIR = `${NEWS_DIR}/logistics`;
const CO_KHI_DIR = `${NEWS_DIR}/co-khi`;
const BAO_BI_DIR = `${NEWS_DIR}/bao-bi`;
const TU_DONG_HOA_DIR = `${NEWS_DIR}/tu-dong-hoa`;
const CRM_DIR = `${NEWS_DIR}/crm`;
const ZALO_DIR = `${NEWS_DIR}/zalo`;
const SEO_DIR = `${NEWS_DIR}/seo`;
const AUTOMATION_DIR = `${NEWS_DIR}/automation`;

/** Bài CRM / so sánh tool — thumbnail trong public/tin-tuc/crm */
export const CRM_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "zoho-crm-hay-pipedrive": {
    file: "zoho-crm-hay-pipedrive.png",
    keywordsMain: "zoho crm hay pipedrive",
  },
  "hubspot-hay-zoho-crm": {
    file: "hubspot-hay-zoho-crm.png",
    keywordsMain: "hubspot hay zoho crm",
  },
};

export function getCrmThumbnailPath(slug?: string): string | null {
  const entry = slug ? CRM_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${CRM_DIR}/${entry.file}` : null;
}

/** Bài SEO / search — thumbnail trong public/tin-tuc/seo */
export const SEO_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "zero-click-search-la-gi": {
    file: "zero-click-search.png",
    keywordsMain: "zero click search là gì",
  },
};

export function getSeoThumbnailPath(slug?: string): string | null {
  const entry = slug ? SEO_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${SEO_DIR}/${entry.file}` : null;
}

/** Bài automation Zapier/Make — thumbnail trong public/tin-tuc/automation */
export const AUTOMATION_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "zapier-zap-la-gi": {
    file: "zapier-zap.png",
    keywordsMain: "zapier zap là gì",
  },
  "zapier-marketing-workflow": {
    file: "zapier-marketing-workflow.png",
    keywordsMain: "zapier marketing workflow",
  },
  "zapier-hay-make-automation": {
    file: "zapier-hay-make.png",
    keywordsMain: "zapier hay make automation",
  },
};

export function getAutomationThumbnailPath(slug?: string): string | null {
  const entry = slug ? AUTOMATION_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${AUTOMATION_DIR}/${entry.file}` : null;
}

/** Bài Zalo / ZNS — thumbnail trong public/tin-tuc/zalo */
export const ZALO_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "zns-la-gi": {
    file: "zns-la-gi.png",
    keywordsMain: "zns là gì",
  },
  "zalo-zns-la-gi-b17": {
    file: "zalo-zns-la-gi-b17.png",
    keywordsMain: "zalo zns là gì",
  },
  "zns-hay-sms-marketing": {
    file: "zns-hay-sms.png",
    keywordsMain: "zns hay sms marketing",
  },
  "zalo-zns-hay-sms-marketing-b17": {
    file: "zalo-zns-hay-sms-b17.png",
    keywordsMain: "zalo zns hay sms marketing",
  },
  "zns-bi-tu-choi-template": {
    file: "zns-bi-tu-choi-template.png",
    keywordsMain: "zns bị từ chối template",
  },
  "zalo-zns-template-bi-tu-choi": {
    file: "zalo-zns-template-bi-tu-choi.png",
    keywordsMain: "zalo zns template bị từ chối",
  },
  "zalo-zns-bi-tu-choi-b17": {
    file: "zalo-zns-bi-tu-choi-b17.png",
    keywordsMain: "zalo zns bị từ chối",
  },
  "zalo-zns-bi-chan": {
    file: "zalo-zns-bi-chan.png",
    keywordsMain: "zalo zns bị chặn",
  },
  "zalo-rich-menu-la-gi-b17": {
    file: "zalo-rich-menu.png",
    keywordsMain: "zalo rich menu là gì",
  },
  "zalo-pay-hay-momo-b17": {
    file: "zalopay-hay-momo.png",
    keywordsMain: "zalopay hay momo",
  },
  "zalo-official-account-la-gi": {
    file: "zalo-official-account.png",
    keywordsMain: "zalo official account là gì",
  },
  "zalo-oa-zns-template": {
    file: "zalo-oa-zns-template.png",
    keywordsMain: "zalo oa zns template",
  },
  "zalo-oa-zalo-shop": {
    file: "zalo-oa-zalo-shop.png",
    keywordsMain: "zalo oa zalo shop",
  },
  "zalo-oa-zalo-pay-tich-hop": {
    file: "zalo-oa-zalopay.png",
    keywordsMain: "zalo oa zalopay tích hợp",
  },
  "zalo-oa-zalo-nurture": {
    file: "zalo-oa-nurture.png",
    keywordsMain: "zalo oa nurture",
  },
};

export function getZaloThumbnailPath(slug?: string): string | null {
  const entry = slug ? ZALO_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${ZALO_DIR}/${entry.file}` : null;
}

/** Bài website cơ khí / gia công CNC — thumbnail trong public/tin-tuc/co-khi */
export const CO_KHI_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "thiet-ke-website-co-khi": {
    file: "co-khi-1.png",
    keywordsMain: "thiết kế website cơ khí",
  },
  "thiet-ke-website-gia-cong-cnc": {
    file: "co-khi-2.png",
    keywordsMain: "thiết kế website gia công cnc",
  },
};

export function getCoKhiThumbnailPath(slug?: string): string | null {
  const entry = slug ? CO_KHI_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${CO_KHI_DIR}/${entry.file}` : null;
}

/** Bài website in ấn / bao bì — thumbnail trong public/tin-tuc/bao-bi */
export const BAO_BI_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "thiet-ke-website-in-an-bao-bi": {
    file: "bao-bi-1.png",
    keywordsMain: "thiết kế website in ấn",
  },
  "thiet-ke-website-bao-bi": {
    file: "bao-bi-2.png",
    keywordsMain: "thiết kế website bao bì",
  },
  "thiet-ke-website-in-an-quang-cao": {
    file: "bao-bi-3.png",
    keywordsMain: "thiết kế website in ấn quảng cáo",
  },
};

export function getBaoBiThumbnailPath(slug?: string): string | null {
  const entry = slug ? BAO_BI_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${BAO_BI_DIR}/${entry.file}` : null;
}

/** Bài website tự động hóa công nghiệp — thumbnail trong public/tin-tuc/tu-dong-hoa */
export const TU_DONG_HOA_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "thiet-ke-website-tu-dong-hoa": {
    file: "tu-dong-hoa-1.png",
    keywordsMain: "thiết kế website công ty tự động hóa",
  },
  "thiet-ke-website-dien-cong-nghiep": {
    file: "tu-dong-hoa-3.png",
    keywordsMain: "thiết kế website điện công nghiệp",
  },
};

export function getTuDongHoaThumbnailPath(slug?: string): string | null {
  const entry = slug ? TU_DONG_HOA_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${TU_DONG_HOA_DIR}/${entry.file}` : null;
}

/** Bài website logistics / vận tải — thumbnail trong public/tin-tuc/logistics */
export const LOGISTICS_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "thiet-ke-website-logistics-van-tai": {
    file: "logistics-1.png",
    keywordsMain: "thiết kế website logistics",
  },
  "thiet-ke-website-van-tai": {
    file: "logistics-2.png",
    keywordsMain: "thiết kế website vận tải",
  },
};

export function getLogisticsThumbnailPath(slug?: string): string | null {
  const entry = slug ? LOGISTICS_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${LOGISTICS_DIR}/${entry.file}` : null;
}

/** Bài website spa / thẩm mỹ viện — thumbnail trong public/tin-tuc/tham-my */
export const THAM_MY_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "thiet-ke-website-tham-my-vien": {
    file: "tham-my-1.png",
    keywordsMain: "thiết kế website thẩm mỹ viện",
  },
  "thiet-ke-website-spa": {
    file: "tham-my-2.png",
    keywordsMain: "thiết kế website spa",
  },
};

export function getThamMyThumbnailPath(slug?: string): string | null {
  const entry = slug ? THAM_MY_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${THAM_MY_DIR}/${entry.file}` : null;
}

/** Bài website phòng khám đa khoa — thumbnail trong public/tin-tuc/phong-kham */
export const PHONG_KHAM_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "thiet-ke-website-phong-kham-da-khoa": {
    file: "phong-kham-1.png",
    keywordsMain: "thiết kế website phòng khám đa khoa",
  },
};

export function getPhongKhamThumbnailPath(slug?: string): string | null {
  const entry = slug ? PHONG_KHAM_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${PHONG_KHAM_DIR}/${entry.file}` : null;
}

/** Bài website luật / văn phòng luật — thumbnail trong public/tin-tuc/luat */
export const LUAT_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "thiet-ke-website-cong-ty-luat": {
    file: "luat-1.png",
    keywordsMain: "thiết kế website công ty luật",
  },
  "thiet-ke-website-phap-luat-luat-su": {
    file: "luat-2.png",
    keywordsMain: "thiết kế website pháp lý",
  },
};

export function getLuatThumbnailPath(slug?: string): string | null {
  const entry = slug ? LUAT_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${LUAT_DIR}/${entry.file}` : null;
}

/** Bài website nha khoa — thumbnail trong public/tin-tuc/nha-khoa */
export const NHA_KHOA_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "thiet-ke-website-nha-khoa": {
    file: "nha-khoa-1.png",
    keywordsMain: "thiết kế website nha khoa",
  },
  "thiet-ke-website-nha-khoa-nieng-rang": {
    file: "nha-khoa-2.png",
    keywordsMain: "thiết kế website nha khoa niềng răng",
  },
};

export function getNhaKhoaThumbnailPath(slug?: string): string | null {
  const entry = slug ? NHA_KHOA_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${NHA_KHOA_DIR}/${entry.file}` : null;
}

/** Bài website thang máy — thumbnail trong public/tin-tuc/thang-may */
export const THANG_MAY_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "thiet-ke-website-thang-may": {
    file: "thang-may-1.png",
    keywordsMain: "thiết kế website công ty thang máy",
  },
};

export function getThangMayThumbnailPath(slug?: string): string | null {
  const entry = slug ? THANG_MAY_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${THANG_MAY_DIR}/${entry.file}` : null;
}

/** Bài website mỹ phẩm / làm đẹp — thumbnail trong public/tin-tuc/my-pham */
export const MY_PHAM_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "thiet-ke-website-my-pham-lam-dep": {
    file: "my-pham-1.png",
    keywordsMain: "thiết kế website mỹ phẩm",
  },
  "thiet-ke-website-my-pham": {
    file: "my-pham-2.png",
    keywordsMain: "thiết kế website cửa hàng mỹ phẩm",
  },
};

export function getMyPhamThumbnailPath(slug?: string): string | null {
  const entry = slug ? MY_PHAM_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${MY_PHAM_DIR}/${entry.file}` : null;
}

/** Bài website phòng cháy chữa cháy — thumbnail trong public/tin-tuc/pccc */
export const PCCC_ARTICLE_THUMBNAILS: Record<string, { file: string; keywordsMain: string }> = {
  "thiet-ke-website-pccc": {
    file: "pccc-1.png",
    keywordsMain: "thiết kế website công ty PCCC",
  },
  "thiet-ke-website-thiet-bi-pccc": {
    file: "pccc-2.png",
    keywordsMain: "thiết kế website thiết bị PCCC",
  },
};

export function getPcccThumbnailPath(slug?: string): string | null {
  const entry = slug ? PCCC_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? `${PCCC_DIR}/${entry.file}` : null;
}

function nicheKeywordsMain(slug?: string): string | undefined {
  const batDongSanResolved = resolveBatDongSanArticleSlug(slug);
  if (batDongSanResolved) {
    return BAT_DONG_SAN_ARTICLE_THUMBNAILS[batDongSanResolved]?.keywordsMain;
  }

  const thietBiVeSinhResolved = resolveThietBiVeSinhArticleSlug(slug);
  if (thietBiVeSinhResolved) {
    return THIET_BI_VE_SINH_ARTICLE_THUMBNAILS[thietBiVeSinhResolved]?.keywordsMain;
  }

  const mamNonResolved = resolveMamNonArticleSlug(slug);
  if (mamNonResolved) {
    return MAM_NON_ARTICLE_THUMBNAILS[mamNonResolved]?.keywordsMain;
  }

  const khachSanResolved = resolveKhachSanArticleSlug(slug);
  if (khachSanResolved) {
    return KHACH_SAN_ARTICLE_THUMBNAILS[khachSanResolved]?.keywordsMain;
  }

  const nhaHangResolved = resolveNhaHangArticleSlug(slug);
  if (nhaHangResolved) {
    return NHA_HANG_ARTICLE_THUMBNAILS[nhaHangResolved]?.keywordsMain;
  }

  const kienTrucResolved = resolveKienTrucArticleSlug(slug);
  if (kienTrucResolved) {
    return KIEN_TRUC_ARTICLE_THUMBNAILS[kienTrucResolved]?.keywordsMain;
  }

  return (
    AUTOMATION_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    SEO_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    CRM_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    ZALO_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    TU_DONG_HOA_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    BAO_BI_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    CO_KHI_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    LOGISTICS_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    PHONG_KHAM_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    THAM_MY_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    LUAT_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    NHA_KHOA_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    THANG_MAY_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    MY_PHAM_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain ??
    PCCC_ARTICLE_THUMBNAILS[slug || ""]?.keywordsMain
  );
}

export function getBlogThumbnailAlt(input: {
  slug?: string;
  keywordsMain?: string;
  title?: string;
}): string {
  const fromBatDongSanAlt = getBatDongSanThumbnailAlt(input.slug);
  if (fromBatDongSanAlt) return fromBatDongSanAlt;

  const fromThietBiVeSinhAlt = getThietBiVeSinhThumbnailAlt(input.slug);
  if (fromThietBiVeSinhAlt) return fromThietBiVeSinhAlt;

  const fromMamNonAlt = getMamNonThumbnailAlt(input.slug);
  if (fromMamNonAlt) return fromMamNonAlt;

  const fromKhachSanAlt = getKhachSanThumbnailAlt(input.slug);
  if (fromKhachSanAlt) return fromKhachSanAlt;

  const fromNhaHangAlt = getNhaHangThumbnailAlt(input.slug);
  if (fromNhaHangAlt) return fromNhaHangAlt;

  const fromKienTrucAlt = getKienTrucThumbnailAlt(input.slug);
  if (fromKienTrucAlt) return fromKienTrucAlt;

  const fromGeneratedAlt = getGeneratedArticleThumbnailAlt(input.slug);
  if (fromGeneratedAlt) return fromGeneratedAlt;

  const fromSlug = nicheKeywordsMain(input.slug);
  const kw = (input.keywordsMain || "").trim();
  if (kw && kw.toLowerCase() !== "thiết kế website") {
    return kw.charAt(0).toUpperCase() + kw.slice(1);
  }
  if (fromSlug) return fromSlug.charAt(0).toUpperCase() + fromSlug.slice(1);
  if (kw) return kw.charAt(0).toUpperCase() + kw.slice(1);
  return (input.title || "").trim() || "Tin tức Bứt Phá Marketing";
}

const THUMBNAIL_FILES: Record<NewsImageTopic, string> = {
  website: "thiet-ke-website.png",
  facebook: "facebook-marketing.png",
  "google-maps": "google-maps-marketing.png",
  marketing: "tin-tuc-marketing.png",
};

const CONTENT_IMAGE_FILES: Record<NewsImageTopic, string[]> = {
  website: [
    "thiet-ke-website.png",
    ...Array.from({ length: 10 }, (_, i) => `thiet-ke-website-${i + 1}.png`),
  ],
  facebook: [
    "facebook-marketing.png",
    ...Array.from({ length: 8 }, (_, i) => `facebook-marketing-${i + 1}.png`),
  ],
  "google-maps": [
    "google-maps-marketing.png",
    ...Array.from({ length: 5 }, (_, i) => `google-maps-marketing-${i + 1}.png`),
  ],
  marketing: ["tin-tuc-marketing.png"],
};

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

export function detectNewsTopic(input: {
  slug?: string;
  keywordsMain?: string;
  keywordsSecondary?: string;
  title?: string;
  niche?: string;
}): NewsImageTopic {
  const slug = normalizeText(input.slug || "");
  const keywords = normalizeText(
    [input.keywordsMain, input.keywordsSecondary, input.title, input.niche].filter(Boolean).join(" "),
  );

  if (
    slug.startsWith("thiet-ke-website") ||
    slug.startsWith("website-") ||
    slug.startsWith("bao-gia-thiet-ke") ||
    slug.startsWith("quy-trinh-thiet-ke")
  ) {
    return "website";
  }

  const googleMapsSlug =
    slug.startsWith("marketing-seo-local") ||
    slug.startsWith("seo-local") ||
    slug.includes("google-maps") ||
    slug.startsWith("seo-maps") ||
    slug.startsWith("seo-dia-phuong") ||
    slug.startsWith("local-pack") ||
    slug.startsWith("nap-seo") ||
    slug.startsWith("local-citation") ||
    slug.startsWith("danh-gia-google-maps") ||
    slug.startsWith("dang-ky-google-maps") ||
    slug.startsWith("cach-dua-doanh-nghiep-len-google-maps") ||
    slug.startsWith("tang-hang-google-maps") ||
    slug.startsWith("google-maps-marketing") ||
    slug.startsWith("embed-google-maps") ||
    slug.startsWith("quang-cao-google-maps") ||
    slug.startsWith("gan-toi-google-maps") ||
    slug.startsWith("checklist-seo-local") ||
    slug.startsWith("local-seo");

  if (googleMapsSlug) return "google-maps";

  const facebookSlug =
    slug.includes("facebook") ||
    slug.includes("fanpage") ||
    slug.includes("meta-ads") ||
    slug.includes("pixel-facebook") ||
    (slug.includes("instagram") && !slug.includes("website"));

  if (facebookSlug) return "facebook";

  if (
    keywords.includes("google maps") ||
    keywords.includes("google-maps") ||
    keywords.includes("seo maps") ||
    keywords.includes("seo local") ||
    keywords.includes("local pack") ||
    keywords.includes("google business") ||
    keywords.includes("maps marketing") ||
    keywords.includes("danh gia google maps") ||
    keywords.includes("seo dia phuong")
  ) {
    const websiteMapsArticle =
      keywords.includes("thiet ke website") &&
      !keywords.includes("google maps marketing") &&
      !keywords.includes("seo local");
    if (!websiteMapsArticle) return "google-maps";
  }

  if (
    keywords.includes("facebook") ||
    keywords.includes("fanpage") ||
    keywords.includes("meta ads") ||
    keywords.includes("pixel facebook") ||
    keywords.includes("quang cao facebook") ||
    keywords.includes("marketing facebook") ||
    keywords.includes("instagram ads")
  ) {
    return "facebook";
  }

  if (
    keywords.includes("thiet ke website") ||
    keywords.includes("wordpress") ||
    keywords.includes("landing page") ||
    keywords.includes("responsive") ||
    keywords.includes("web design") ||
    keywords.includes("bao gia website")
  ) {
    return "website";
  }

  if (input.niche === "facebook-ads") return "facebook";
  if (input.niche === "social" && keywords.includes("facebook")) return "facebook";

  return "marketing";
}

export function getNewsThumbnailPath(topic: NewsImageTopic): string {
  return `${NEWS_DIR}/${THUMBNAIL_FILES[topic]}`;
}

export function getNewsContentImagePaths(topic: NewsImageTopic): string[] {
  return CONTENT_IMAGE_FILES[topic].map((file) => `${NEWS_DIR}/${file}`);
}

export function resolveBlogImageUrl(input: {
  slug?: string;
  keywordsMain?: string;
  keywordsSecondary?: string;
  title?: string;
  imageUrl?: string;
}): string {
  const generated = getGeneratedArticleThumbnailPath(input.slug);
  if (generated) return generated;

  const currentRaw = (input.imageUrl || "").trim();
  let normalizedEarly = currentRaw;
  if (currentRaw.startsWith("http")) {
    try {
      normalizedEarly = new URL(currentRaw).pathname;
    } catch {
      normalizedEarly = currentRaw;
    }
  }
  if (normalizedEarly.includes("/tin-tuc/articles/")) {
    return normalizedEarly.startsWith("/") ? normalizedEarly : `/${normalizedEarly}`;
  }

  const crm = getCrmThumbnailPath(input.slug);
  if (crm) return crm;

  const zalo = getZaloThumbnailPath(input.slug);
  if (zalo) return zalo;

  const seo = getSeoThumbnailPath(input.slug);
  if (seo) return seo;

  const automation = getAutomationThumbnailPath(input.slug);
  if (automation) return automation;

  const tuDongHoa = getTuDongHoaThumbnailPath(input.slug);
  if (tuDongHoa) return tuDongHoa;

  const baoBi = getBaoBiThumbnailPath(input.slug);
  if (baoBi) return baoBi;

  const coKhi = getCoKhiThumbnailPath(input.slug);
  if (coKhi) return coKhi;

  const logistics = getLogisticsThumbnailPath(input.slug);
  if (logistics) return logistics;

  const phongKham = getPhongKhamThumbnailPath(input.slug);
  if (phongKham) return phongKham;

  const thamMy = getThamMyThumbnailPath(input.slug);
  if (thamMy) return thamMy;

  const luat = getLuatThumbnailPath(input.slug);
  if (luat) return luat;

  const nhaKhoa = getNhaKhoaThumbnailPath(input.slug);
  if (nhaKhoa) return nhaKhoa;

  const thangMay = getThangMayThumbnailPath(input.slug);
  if (thangMay) return thangMay;

  const myPham = getMyPhamThumbnailPath(input.slug);
  if (myPham) return myPham;

  const pccc = getPcccThumbnailPath(input.slug);
  if (pccc) return pccc;

  const kienTruc = getKienTrucThumbnailPath(input.slug);
  if (kienTruc) return kienTruc;

  const nhaHang = getNhaHangThumbnailPath(input.slug);
  if (nhaHang) return nhaHang;

  const khachSan = getKhachSanThumbnailPath(input.slug);
  if (khachSan) return khachSan;

  const mamNon = getMamNonThumbnailPath(input.slug);
  if (mamNon) return mamNon;

  const thietBiVeSinh = getThietBiVeSinhThumbnailPath(input.slug);
  if (thietBiVeSinh) return thietBiVeSinh;

  const batDongSan = getBatDongSanThumbnailPath(input.slug);
  if (batDongSan) return batDongSan;

  const topic = detectNewsTopic(input);
  const expected = getNewsThumbnailPath(topic);
  const current = (input.imageUrl || "").trim();

  if (!current) return expected;

  let normalizedCurrent = current;
  if (current.startsWith("http")) {
    try {
      normalizedCurrent = new URL(current).pathname;
    } catch {
      normalizedCurrent = current;
    }
  }

  if (normalizedCurrent.endsWith("tin-tuc-marketing.png") && topic !== "marketing") {
    return expected;
  }

  return normalizedCurrent.startsWith("/") ? normalizedCurrent : expected;
}

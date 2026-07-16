import { ensureZaloConsultBlock, zaloConsultBlock } from "./blog-zalo-cta.mjs";

const SITE = "https://www.butphamarketing.com";
const FB = "https://www.facebook.com/butphamarketing";
const ZALO = "https://zalo.me/0937417982";
const NEWS_DIR = "/tin-tuc";
const KIEN_TRUC_DIR = `${NEWS_DIR}/kien-truc`;
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

/** Bài website cơ khí / gia công CNC — thumbnail trong public/tin-tuc/co-khi */
export const CO_KHI_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-co-khi": {
    file: "co-khi-1.png",
    keywordsMain: "thiết kế website cơ khí",
  },
  "thiet-ke-website-gia-cong-cnc": {
    file: "co-khi-2.png",
    keywordsMain: "thiết kế website gia công cnc",
  },
};

export function coKhiThumbnailPath(slug) {
  const entry = slug ? CO_KHI_ARTICLE_THUMBNAILS[slug] : null;
  return entry ? `${CO_KHI_DIR}/${entry.file}` : null;
}

export function coKhiThumbnailUrl(slug) {
  const path = coKhiThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function isCoKhiSlug(slug) {
  return Boolean(slug && CO_KHI_ARTICLE_THUMBNAILS[slug]);
}

/** Bài website in ấn / bao bì — thumbnail trong public/tin-tuc/bao-bi */
export const BAO_BI_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-in-an-bao-bi": {
    file: "bao-bi-1.png",
    keywordsMain: "thiết kế website in ấn",
  },
};

export function baoBiThumbnailPath(slug) {
  const entry = slug ? BAO_BI_ARTICLE_THUMBNAILS[slug] : null;
  return entry ? `${BAO_BI_DIR}/${entry.file}` : null;
}

export function baoBiThumbnailUrl(slug) {
  const path = baoBiThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function isBaoBiSlug(slug) {
  return Boolean(slug && BAO_BI_ARTICLE_THUMBNAILS[slug]);
}

/** Bài website tự động hóa công nghiệp — thumbnail trong public/tin-tuc/tu-dong-hoa */
export const TU_DONG_HOA_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-tu-dong-hoa": {
    file: "tu-dong-hoa-1.png",
    keywordsMain: "thiết kế website công ty tự động hóa",
  },
  "thiet-ke-website-dien-cong-nghiep": {
    file: "tu-dong-hoa-3.png",
    keywordsMain: "thiết kế website điện công nghiệp",
  },
};

export function tuDongHoaThumbnailPath(slug) {
  const entry = slug ? TU_DONG_HOA_ARTICLE_THUMBNAILS[slug] : null;
  return entry ? `${TU_DONG_HOA_DIR}/${entry.file}` : null;
}

export function tuDongHoaThumbnailUrl(slug) {
  const path = tuDongHoaThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function isTuDongHoaSlug(slug) {
  return Boolean(slug && TU_DONG_HOA_ARTICLE_THUMBNAILS[slug]);
}

/** Bài website logistics / vận tải — thumbnail trong public/tin-tuc/logistics */
export const LOGISTICS_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-logistics-van-tai": {
    file: "logistics-1.png",
    keywordsMain: "thiết kế website logistics",
  },
};

export function logisticsThumbnailPath(slug) {
  const entry = slug ? LOGISTICS_ARTICLE_THUMBNAILS[slug] : null;
  return entry ? `${LOGISTICS_DIR}/${entry.file}` : null;
}

export function logisticsThumbnailUrl(slug) {
  const path = logisticsThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function isLogisticsSlug(slug) {
  return Boolean(slug && LOGISTICS_ARTICLE_THUMBNAILS[slug]);
}

/** Bài website spa / thẩm mỹ viện — thumbnail trong public/tin-tuc/tham-my */
export const THAM_MY_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-tham-my-vien": {
    file: "tham-my-1.png",
    keywordsMain: "thiết kế website thẩm mỹ viện",
  },
  "thiet-ke-website-spa": {
    file: "tham-my-2.png",
    keywordsMain: "thiết kế website spa",
  },
};

export function thamMyThumbnailPath(slug) {
  const entry = slug ? THAM_MY_ARTICLE_THUMBNAILS[slug] : null;
  return entry ? `${THAM_MY_DIR}/${entry.file}` : null;
}

export function thamMyThumbnailUrl(slug) {
  const path = thamMyThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function isThamMySlug(slug) {
  return Boolean(slug && THAM_MY_ARTICLE_THUMBNAILS[slug]);
}

/** Bài website phòng khám đa khoa — thumbnail trong public/tin-tuc/phong-kham */
export const PHONG_KHAM_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-phong-kham-da-khoa": {
    file: "phong-kham-1.png",
    keywordsMain: "thiết kế website phòng khám đa khoa",
  },
};

export function phongKhamThumbnailPath(slug) {
  const entry = slug ? PHONG_KHAM_ARTICLE_THUMBNAILS[slug] : null;
  return entry ? `${PHONG_KHAM_DIR}/${entry.file}` : null;
}

export function phongKhamThumbnailUrl(slug) {
  const path = phongKhamThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function isPhongKhamSlug(slug) {
  return Boolean(slug && PHONG_KHAM_ARTICLE_THUMBNAILS[slug]);
}

/** Bài website luật / văn phòng luật — thumbnail trong public/tin-tuc/luat */
export const LUAT_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-cong-ty-luat": {
    file: "luat-1.png",
    keywordsMain: "thiết kế website công ty luật",
  },
  "thiet-ke-website-phap-luat-luat-su": {
    file: "luat-2.png",
    keywordsMain: "thiết kế website pháp lý",
  },
};

export function luatThumbnailPath(slug) {
  const entry = slug ? LUAT_ARTICLE_THUMBNAILS[slug] : null;
  return entry ? `${LUAT_DIR}/${entry.file}` : null;
}

export function luatThumbnailUrl(slug) {
  const path = luatThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function isLuatSlug(slug) {
  return Boolean(slug && LUAT_ARTICLE_THUMBNAILS[slug]);
}

/** Bài website nha khoa — thumbnail trong public/tin-tuc/nha-khoa */
export const NHA_KHOA_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-nha-khoa": {
    file: "nha-khoa-1.png",
    keywordsMain: "thiết kế website nha khoa",
  },
  "thiet-ke-website-nha-khoa-nieng-rang": {
    file: "nha-khoa-2.png",
    keywordsMain: "thiết kế website nha khoa niềng răng",
  },
};

export function nhaKhoaThumbnailPath(slug) {
  const entry = slug ? NHA_KHOA_ARTICLE_THUMBNAILS[slug] : null;
  return entry ? `${NHA_KHOA_DIR}/${entry.file}` : null;
}

export function nhaKhoaThumbnailUrl(slug) {
  const path = nhaKhoaThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function isNhaKhoaSlug(slug) {
  return Boolean(slug && NHA_KHOA_ARTICLE_THUMBNAILS[slug]);
}

/** Bài website thang máy — thumbnail trong public/tin-tuc/thang-may */
export const THANG_MAY_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-thang-may": {
    file: "thang-may-1.png",
    keywordsMain: "thiết kế website công ty thang máy",
  },
};

export function thangMayThumbnailPath(slug) {
  const entry = slug ? THANG_MAY_ARTICLE_THUMBNAILS[slug] : null;
  return entry ? `${THANG_MAY_DIR}/${entry.file}` : null;
}

export function thangMayThumbnailUrl(slug) {
  const path = thangMayThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function isThangMaySlug(slug) {
  return Boolean(slug && THANG_MAY_ARTICLE_THUMBNAILS[slug]);
}

/** Bài website mỹ phẩm / làm đẹp — thumbnail trong public/tin-tuc/my-pham */
export const MY_PHAM_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-my-pham-lam-dep": {
    file: "my-pham-1.png",
    keywordsMain: "thiết kế website mỹ phẩm",
  },
  "thiet-ke-website-my-pham": {
    file: "my-pham-2.png",
    keywordsMain: "thiết kế website cửa hàng mỹ phẩm",
  },
};

export function myPhamThumbnailPath(slug) {
  const entry = slug ? MY_PHAM_ARTICLE_THUMBNAILS[slug] : null;
  return entry ? `${MY_PHAM_DIR}/${entry.file}` : null;
}

export function myPhamThumbnailUrl(slug) {
  const path = myPhamThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function isMyPhamSlug(slug) {
  return Boolean(slug && MY_PHAM_ARTICLE_THUMBNAILS[slug]);
}

/** Bài website phòng cháy chữa cháy — thumbnail trong public/tin-tuc/pccc */
export const PCCC_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-pccc": {
    file: "pccc-1.png",
    keywordsMain: "thiết kế website công ty PCCC",
  },
  "thiet-ke-website-thiet-bi-pccc": {
    file: "pccc-2.png",
    keywordsMain: "thiết kế website thiết bị PCCC",
  },
};

export function pcccThumbnailPath(slug) {
  const entry = slug ? PCCC_ARTICLE_THUMBNAILS[slug] : null;
  return entry ? `${PCCC_DIR}/${entry.file}` : null;
}

export function pcccThumbnailUrl(slug) {
  const path = pcccThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function isPcccSlug(slug) {
  return Boolean(slug && PCCC_ARTICLE_THUMBNAILS[slug]);
}

export {
  KIEN_TRUC_ARTICLE_THUMBNAILS,
  KIEN_TRUC_IMAGE_ALTS,
  kienTrucThumbnailPath,
  getKienTrucThumbnailAlt,
  getKienTrucContentImageAlt,
  resolveKienTrucArticleSlug,
  isKienTrucSlug,
} from "./kien-truc-images.mjs";

export {
  NHA_HANG_ARTICLE_THUMBNAILS,
  NHA_HANG_IMAGE_ALTS,
  nhaHangThumbnailPath,
  getNhaHangThumbnailAlt,
  getNhaHangContentImageAlt,
  resolveNhaHangArticleSlug,
  isNhaHangSlug,
} from "./nha-hang-images.mjs";

export {
  KHACH_SAN_ARTICLE_THUMBNAILS,
  KHACH_SAN_IMAGE_ALTS,
  khachSanThumbnailPath,
  getKhachSanThumbnailAlt,
  getKhachSanContentImageAlt,
  resolveKhachSanArticleSlug,
  isKhachSanSlug,
} from "./khach-san-images.mjs";

export {
  MAM_NON_ARTICLE_THUMBNAILS,
  MAM_NON_IMAGE_ALTS,
  mamNonThumbnailPath,
  getMamNonThumbnailAlt,
  getMamNonContentImageAlt,
  resolveMamNonArticleSlug,
  isMamNonSlug,
} from "./mam-non-images.mjs";

export {
  THIET_BI_VE_SINH_ARTICLE_THUMBNAILS,
  THIET_BI_VE_SINH_IMAGE_ALTS,
  thietBiVeSinhThumbnailPath,
  getThietBiVeSinhThumbnailAlt,
  getThietBiVeSinhContentImageAlt,
  resolveThietBiVeSinhArticleSlug,
  isThietBiVeSinhSlug,
} from "./thiet-bi-ve-sinh-images.mjs";

export {
  BAT_DONG_SAN_ARTICLE_THUMBNAILS,
  BAT_DONG_SAN_IMAGE_ALTS,
  batDongSanThumbnailPath,
  getBatDongSanThumbnailAlt,
  getBatDongSanContentImageAlt,
  resolveBatDongSanArticleSlug,
  isBatDongSanSlug,
} from "./bat-dong-san-images.mjs";

import { getIndustryMockupContentAlt, nicheContentImageFiles } from "./industry-mockup-alts.mjs";
export {
  getIndustryMockupContentAlt,
  getIndustryMockupThumbnailAlt,
  INDUSTRY_MOCKUP_ALTS,
} from "./industry-mockup-alts.mjs";

import { kienTrucThumbnailPath } from "./kien-truc-images.mjs";
import { nhaHangThumbnailPath } from "./nha-hang-images.mjs";
import { khachSanThumbnailPath } from "./khach-san-images.mjs";
import { mamNonThumbnailPath } from "./mam-non-images.mjs";
import { thietBiVeSinhThumbnailPath } from "./thiet-bi-ve-sinh-images.mjs";
import { batDongSanThumbnailPath } from "./bat-dong-san-images.mjs";

function newsImageUrl(filename) {
  return `${SITE}${NEWS_DIR}/${filename}`;
}

function newsImagePath(filename) {
  return `${NEWS_DIR}/${filename}`;
}

export function khachSanThumbnailUrl(slug) {
  const path = khachSanThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function mamNonThumbnailUrl(slug) {
  const path = mamNonThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function thietBiVeSinhThumbnailUrl(slug) {
  const path = thietBiVeSinhThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function batDongSanThumbnailUrl(slug) {
  const path = batDongSanThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function nhaHangThumbnailUrl(slug) {
  const path = nhaHangThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

export function kienTrucThumbnailUrl(slug) {
  const path = kienTrucThumbnailPath(slug);
  return path ? `${SITE}${path}` : null;
}

const THUMBNAIL_FILES = {
  website: "thiet-ke-website.png",
  facebook: "facebook-marketing.png",
  "google-maps": "google-maps-marketing.png",
  marketing: "tin-tuc-marketing.png",
};

const KIEN_TRUC_CONTENT_FILES = nicheContentImageFiles("kien-truc", "kien-truc", 7);

const NHA_HANG_CONTENT_FILES = nicheContentImageFiles("nha-hang", "nha-hang", 6);

const KHACH_SAN_CONTENT_FILES = nicheContentImageFiles("khach-san", "khach-san", 7);

const MAM_NON_CONTENT_FILES = nicheContentImageFiles("mam-non", "mam-non", 5);

const THIET_BI_VE_SINH_CONTENT_FILES = nicheContentImageFiles("thiet-bi-ve-sinh", "thiet-bi-ve-sinh", 7);

const BAT_DONG_SAN_CONTENT_FILES = nicheContentImageFiles("bat-dong-san", "bat-dong-san", 6);

const PCCC_CONTENT_FILES = nicheContentImageFiles("pccc", "pccc", 5);

const MY_PHAM_CONTENT_FILES = nicheContentImageFiles("my-pham", "my-pham", 5);

const THANG_MAY_CONTENT_FILES = nicheContentImageFiles("thang-may", "thang-may", 5);

const NHA_KHOA_CONTENT_FILES = nicheContentImageFiles("nha-khoa", "nha-khoa", 5);

const LUAT_CONTENT_FILES = nicheContentImageFiles("luat", "luat", 5);

const THAM_MY_CONTENT_FILES = nicheContentImageFiles("tham-my", "tham-my", 5);

const PHONG_KHAM_CONTENT_FILES = nicheContentImageFiles("phong-kham", "phong-kham", 5);

const LOGISTICS_CONTENT_FILES = nicheContentImageFiles("logistics", "logistics", 5);

const CO_KHI_CONTENT_FILES = nicheContentImageFiles("co-khi", "co-khi", 5);

const BAO_BI_CONTENT_FILES = nicheContentImageFiles("bao-bi", "bao-bi", 5);

const TU_DONG_HOA_CONTENT_FILES = nicheContentImageFiles("tu-dong-hoa", "tu-dong-hoa", 5);

const CONTENT_IMAGE_FILES = {
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
  "kien-truc": KIEN_TRUC_CONTENT_FILES,
  "nha-hang": NHA_HANG_CONTENT_FILES,
  "khach-san": KHACH_SAN_CONTENT_FILES,
  "mam-non": MAM_NON_CONTENT_FILES,
  "thiet-bi-ve-sinh": THIET_BI_VE_SINH_CONTENT_FILES,
  "bat-dong-san": BAT_DONG_SAN_CONTENT_FILES,
  pccc: PCCC_CONTENT_FILES,
  "my-pham": MY_PHAM_CONTENT_FILES,
  "thang-may": THANG_MAY_CONTENT_FILES,
  "nha-khoa": NHA_KHOA_CONTENT_FILES,
  luat: LUAT_CONTENT_FILES,
  "tham-my": THAM_MY_CONTENT_FILES,
  "phong-kham": PHONG_KHAM_CONTENT_FILES,
  logistics: LOGISTICS_CONTENT_FILES,
  "co-khi": CO_KHI_CONTENT_FILES,
  "bao-bi": BAO_BI_CONTENT_FILES,
  "tu-dong-hoa": TU_DONG_HOA_CONTENT_FILES,
};

export const KIEN_TRUC_CONTENT_IMAGE_COUNT = KIEN_TRUC_CONTENT_FILES.length;
export const NHA_HANG_CONTENT_IMAGE_COUNT = NHA_HANG_CONTENT_FILES.length;
export const KHACH_SAN_CONTENT_IMAGE_COUNT = KHACH_SAN_CONTENT_FILES.length;
export const MAM_NON_CONTENT_IMAGE_COUNT = MAM_NON_CONTENT_FILES.length;
export const THIET_BI_VE_SINH_CONTENT_IMAGE_COUNT = THIET_BI_VE_SINH_CONTENT_FILES.length;
export const BAT_DONG_SAN_CONTENT_IMAGE_COUNT = BAT_DONG_SAN_CONTENT_FILES.length;
export const PCCC_CONTENT_IMAGE_COUNT = PCCC_CONTENT_FILES.length;
export const MY_PHAM_CONTENT_IMAGE_COUNT = MY_PHAM_CONTENT_FILES.length;
export const THANG_MAY_CONTENT_IMAGE_COUNT = THANG_MAY_CONTENT_FILES.length;
export const NHA_KHOA_CONTENT_IMAGE_COUNT = NHA_KHOA_CONTENT_FILES.length;
export const LUAT_CONTENT_IMAGE_COUNT = LUAT_CONTENT_FILES.length;
export const THAM_MY_CONTENT_IMAGE_COUNT = THAM_MY_CONTENT_FILES.length;
export const PHONG_KHAM_CONTENT_IMAGE_COUNT = PHONG_KHAM_CONTENT_FILES.length;
export const LOGISTICS_CONTENT_IMAGE_COUNT = LOGISTICS_CONTENT_FILES.length;
export const CO_KHI_CONTENT_IMAGE_COUNT = CO_KHI_CONTENT_FILES.length;
export const BAO_BI_CONTENT_IMAGE_COUNT = BAO_BI_CONTENT_FILES.length;
export const TU_DONG_HOA_CONTENT_IMAGE_COUNT = TU_DONG_HOA_CONTENT_FILES.length;

/** Thumbnail danh sách tin tức / blog card / OG — marketing tổng quát */
export const NEWS_THUMBNAIL = newsImageUrl(THUMBNAIL_FILES.marketing);

/** Đường dẫn tương đối thumbnail (dùng khi cần path ngắn) */
export const NEWS_THUMBNAIL_PATH = newsImagePath(THUMBNAIL_FILES.marketing);

/** Ảnh minh họa website trong nội dung bài viết (public/tin-tuc) */
export const NEWS_CONTENT_IMAGES = CONTENT_IMAGE_FILES.website.map(newsImagePath);

export const NEWS_CONTENT_IMAGE_COUNT = NEWS_CONTENT_IMAGES.length;

export function detectNewsTopic(input = {}) {
  const slug = normalizeKeyword(input.slug || "");
  const keywords = normalizeKeyword(
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

export function newsThumbnailPath(topic = "marketing") {
  return newsImagePath(THUMBNAIL_FILES[topic] || THUMBNAIL_FILES.marketing);
}

export function newsThumbnailUrl(topic = "marketing") {
  return newsImageUrl(THUMBNAIL_FILES[topic] || THUMBNAIL_FILES.marketing);
}

export function newsContentImagesForTopic(topic = "website") {
  const files = CONTENT_IMAGE_FILES[topic] || CONTENT_IMAGE_FILES.marketing;
  return files.map(newsImagePath);
}

export function newsThumbnailForArticle(article = {}) {
  const tuDongHoa = tuDongHoaThumbnailUrl(article.slug);
  if (tuDongHoa) return tuDongHoa;
  const baoBi = baoBiThumbnailUrl(article.slug);
  if (baoBi) return baoBi;
  const coKhi = coKhiThumbnailUrl(article.slug);
  if (coKhi) return coKhi;
  const logistics = logisticsThumbnailUrl(article.slug);
  if (logistics) return logistics;
  const phongKham = phongKhamThumbnailUrl(article.slug);
  if (phongKham) return phongKham;
  const thamMy = thamMyThumbnailUrl(article.slug);
  if (thamMy) return thamMy;
  const luat = luatThumbnailUrl(article.slug);
  if (luat) return luat;
  const nhaKhoa = nhaKhoaThumbnailUrl(article.slug);
  if (nhaKhoa) return nhaKhoa;
  const thangMay = thangMayThumbnailUrl(article.slug);
  if (thangMay) return thangMay;
  const myPham = myPhamThumbnailUrl(article.slug);
  if (myPham) return myPham;
  const pccc = pcccThumbnailUrl(article.slug);
  if (pccc) return pccc;
  const kienTruc = kienTrucThumbnailUrl(article.slug);
  if (kienTruc) return kienTruc;
  const nhaHang = nhaHangThumbnailUrl(article.slug);
  if (nhaHang) return nhaHang;
  const khachSan = khachSanThumbnailUrl(article.slug);
  if (khachSan) return khachSan;
  const mamNon = mamNonThumbnailUrl(article.slug);
  if (mamNon) return mamNon;
  const thietBiVeSinh = thietBiVeSinhThumbnailUrl(article.slug);
  if (thietBiVeSinh) return thietBiVeSinh;
  const batDongSan = batDongSanThumbnailUrl(article.slug);
  if (batDongSan) return batDongSan;
  return newsThumbnailUrl(detectNewsTopic(article));
}

export function newsContentImageCountForTopic(topic = "website") {
  return newsContentImagesForTopic(topic).length;
}

export function normalizeKeyword(keyword) {
  return String(keyword || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    // Advantage+ ↔ Advantage Plus, Meta+ ↔ Meta Plus, …
    .replace(/\+/g, " plus ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Từ khóa chính phải có trong title, meta, description, alt (so khớp không dấu, không phân biệt hoa thường). */
export function keywordInText(text, keyword) {
  const hay = normalizeKeyword(text);
  const needle = normalizeKeyword(keyword);
  if (needle && hay.includes(needle)) return true;
  // Fallback: đủ token quan trọng (≥3 ký tự) của từ khóa
  const tokens = needle.split(" ").filter((t) => t.length > 2);
  if (tokens.length >= 2) {
    const need = Math.min(3, tokens.length);
    return tokens.slice(0, need).every((t) => hay.includes(t));
  }
  return false;
}

export function altFromKeyword(keywordsMain) {
  const kw = String(keywordsMain || "").trim();
  if (!kw) return "Thiết kế website Bứt Phá Marketing";
  return toTitleCaseVi(kw);
}

/** Alt ảnh có từ khóa chính — dùng cho wpImg / validate SEO. */
export function seoImageAlt(keywordsMain, detail) {
  const base = altFromKeyword(keywordsMain);
  const text = String(detail || "").trim();
  if (!text) return base;
  if (keywordInText(text, keywordsMain)) return text;
  return `${base} — ${text}`;
}

/** Viết hoa từng từ cho title/meta SERP — giữ acronym phổ biến. */
export function toTitleCaseVi(text) {
  const acronyms = new Set([
    "seo",
    "ppc",
    "crm",
    "b2b",
    "b2c",
    "ga4",
    "gtm",
    "api",
    "ui",
    "ux",
    "cdn",
    "ssl",
    "erp",
    "plc",
    "scada",
    "hmi",
    "tmđt",
    "fdi",
    "sme",
    "kpi",
    "roi",
    "roas",
    "cpa",
    "cpc",
    "cta",
    "zalo",
    "gbp",
    "oa",
  ]);

  return String(text || "")
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return word;
      const bare = word.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
      const hasDiacritics = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(word);
      // Chỉ viết hoa acronym khi từ gốc không dấu (tránh "rơi" → "ROI")
      if (acronyms.has(bare) && !hasDiacritics && /^[a-z0-9+.\-]+$/i.test(word)) {
        return bare.toUpperCase();
      }
      if (/^[A-Z0-9]{2,}$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/** Meta title gọn cho SERP (~55 ký tự trước brand). */
export function buildSeoMetaTitle(primary, brand = "Bứt Phá") {
  const suffix = ` | ${brand}`;
  const maxPrimary = 60 - suffix.length;
  let head = toTitleCaseVi(String(primary || "").trim());
  if (head.length > maxPrimary) {
    head = head.slice(0, maxPrimary).replace(/\s+\S*$/, "").trim();
  }
  return `${head}${suffix}`;
}

function detectMetaIntent(kw, hint = "") {
  const text = `${kw} ${hint}`.toLowerCase();
  if (/là gì/.test(text)) return "lagi";
  if (/\bhay\b/.test(text) || /\bvs\b/.test(text) || /khác gì|so sánh/.test(text)) return "compare";
  if (/(cao|thấp|sai|không|lỗi|bị|quá|loãng|hết nhanh|ít lead|từ chối|hạn chế|fatigue)/.test(text)) {
    return "problem";
  }
  return "guide";
}

function cleanMetaHint(hint, kw) {
  let extra = String(hint || "")
    .trim()
    .replace(/^[^:]+:\s*/, "")
    .replace(/\s*Hướng dẫn triển khai và đo lường hiệu quả\.?/gi, "")
    .replace(/\.{2,}/g, ".")
    .trim();
  if (!extra) return "";
  // Bỏ hint chỉ tiếng Anh / angle stub
  if (!/[àáạảãâăèéêìíòóôơùúýđ]/i.test(extra) && /^[A-Za-z0-9 +/,&\-().]{0,80}$/.test(extra)) {
    return "";
  }
  // Bỏ hint quá ngắn kiểu "Google Maps." không đủ nghĩa tiếng Việt
  if (!/[àáạảãâăèéêìíòóôơùúýđ]/i.test(extra) && extra.split(/\s+/).length <= 4) {
    return "";
  }
  // Tránh lặp lại đúng cụm từ khóa trong hint
  const kwRe = new RegExp(String(kw || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  extra = extra.replace(kwRe, "").replace(/\s+/g, " ").replace(/^[\s—–:,.-]+|[\s—–:,.-]+$/g, "").trim();
  if (extra.length < 8) return "";
  return extra.slice(0, 85);
}

/** Meta description ≤160 ký tự, luôn chứa từ khóa chính, bám intent tiêu đề. */
export function buildSeoMetaDescription(keywordsMain, hint = "", intent = "") {
  const kw = String(keywordsMain || "").trim();
  const kwCap = kw ? toTitleCaseVi(kw) : "";
  const kind = intent || detectMetaIntent(kw, hint);
  let extra = cleanMetaHint(hint, kw);
  // Bỏ cụm filler không mang thông tin
  if (/giải pháp thực chiến|hướng dẫn và giải pháp từ|bứt phá marketing/i.test(extra)) {
    extra = "";
  }

  const tails = {
    lagi: "định nghĩa rõ, cách hoạt động và checklist cho SME",
    compare: "chọn theo KPI, ngân sách và ngữ cảnh thực tế",
    problem: "nguyên nhân thường gặp và cách khắc phục từng bước",
    guide: "hướng dẫn triển khai, checklist KPI và FAQ",
  };
  const tail = tails[kind] || tails.guide;

  const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const extraLooksLikeTail =
    extra &&
    /(định nghĩa|checklist|nguyên nhân|khắc phục|tiêu chí chọn|hướng dẫn triển khai|kpi)/i.test(extra);

  let core;
  if (extra && extraLooksLikeTail) {
    // Hint đã đủ ý — không nối thêm tail trùng
    core = kind === "lagi" ? `${kwCap}? ${cap(extra)}` : `${kwCap}: ${cap(extra)}`;
  } else if (extra) {
    core =
      kind === "lagi"
        ? `${kwCap}? ${cap(extra)}. ${cap(tail)}`
        : `${kwCap}: ${cap(extra)}. ${cap(tail)}`;
  } else {
    core = kind === "lagi" ? `${kwCap}? ${cap(tail)}` : `${kwCap}: ${cap(tail)}`;
  }

  let desc = `${core}.`.replace(/\.\s*\./g, ".").replace(/\s+/g, " ").trim();
  if (!keywordInText(desc, kw) && kwCap) desc = `${kwCap}. ${desc}`;

  const cta = " Tư vấn Bứt Phá Marketing.";
  if (desc.length + cta.length <= 158) desc += cta;
  else if (desc.length > 158) desc = `${desc.slice(0, 155).replace(/\s+\S*$/, "").trim()}…`;
  else desc = `${desc.slice(0, Math.max(0, 158 - cta.length)).replace(/\s+\S*$/, "").trim()}.${cta}`;

  if (desc.length > 158) desc = `${desc.slice(0, 155).replace(/\s+\S*$/, "").trim()}…`;
  return desc.slice(0, 158);
}

export function ensureTitleHasKeyword(title, keywordsMain) {
  const t = String(title || "").trim();
  const kw = String(keywordsMain || "").trim();
  if (!kw || keywordInText(t, kw)) {
    if (t && t[0] === t[0].toLowerCase() && t[0] !== t[0].toUpperCase()) {
      return toTitleCaseVi(t);
    }
    return t;
  }
  const kwCap = toTitleCaseVi(kw);
  return `${kwCap} — ${t}`;
}

const META_PREFIX = /^<!-- BUTPHA_META ([\s\S]+?) -->\s*/;

export function patchNewsContentMetaTitle(content, metaTitle) {
  const prefix = `<!-- BUTPHA_META ${JSON.stringify({ metaTitle })} -->\n`;
  const match = String(content || "").match(META_PREFIX);
  if (match) return String(content).replace(META_PREFIX, prefix);
  return prefix + String(content || "");
}

/** Chuẩn hóa alt ảnh trong HTML để chứa keywordsMain (audit SEO on-page). */
export function patchImageAltsInHtml(html, keywordsMain) {
  const kw = String(keywordsMain || "").trim();
  if (!kw) return html;

  const safeAlt = toTitleCaseVi(kw);
  const fallbackAlt = `${safeAlt} — Bứt Phá Marketing`.replace(/"/g, "&quot;");

  return String(html || "").replace(/alt="([^"]*)"/g, (match, alt) => {
    if (keywordInText(alt, kw)) return match;
    return `alt="${fallbackAlt}"`;
  });
}

export function validateSeoKeywordPlacement({
  keywordsMain,
  title,
  metaTitle,
  metaDescription,
  description,
  imageAlts = [],
  html = "",
}) {
  const missing = [];
  if (!keywordInText(title, keywordsMain)) missing.push("title/H1");
  if (!keywordInText(metaTitle || title, keywordsMain)) missing.push("metaTitle");
  const desc = metaDescription || description || "";
  if (!keywordInText(desc, keywordsMain)) missing.push("description");
  const alts =
    imageAlts.length > 0
      ? imageAlts
      : [...String(html).matchAll(/alt="([^"]+)"/g)].map((m) => m[1]);
  if (alts.length === 0 || !alts.every((alt) => keywordInText(alt, keywordsMain))) {
    missing.push("alt ảnh");
  }
  if (metaTitle && metaTitle.length > 65) missing.push("metaTitle dài (>65)");
  if (metaDescription && metaDescription.length > 160) missing.push("metaDescription dài (>160)");
  return { ok: missing.length === 0, missing };
}

export function wrapArticle({ metaTitle, html }) {
  const body = ensureZaloConsultBlock(html);
  return `<!-- BUTPHA_META ${JSON.stringify({ metaTitle })} -->\n${body}`;
}

export function img(index, alt, topic = "website") {
  const pool = newsContentImagesForTopic(topic);
  const src = pool[index % pool.length];
  const safeAlt = alt || "Thiết kế website Bứt Phá Marketing";
  return `<figure class="my-6"><img src="${src}" alt="${safeAlt}" loading="lazy" width="1200" height="675" class="w-full rounded-2xl border border-indigo-100" /><figcaption class="mt-2 text-center text-sm text-slate-500">${safeAlt}</figcaption></figure>`;
}

export function toc(items) {
  const lis = items
    .map((item) => `<li><a href="#${item.id}">${item.label}</a></li>`)
    .join("\n");
  return `<nav aria-label="Mục lục" class="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5"><h2 id="muc-luc" class="text-lg font-bold text-indigo-950">Mục lục</h2><ol class="mt-3 list-decimal space-y-1 pl-5 text-indigo-900">${lis}</ol></nav>`;
}

export function internalLinks(opts = {}) {
  const { cluster, caseStudyPath } = opts;
  const parts = [
    `<a href="${SITE}/website">gói thiết kế website</a>`,
    `<a href="${SITE}/seo-website">dịch vụ SEO Website</a>`,
    `<a href="${SITE}/blog/chu-de/website">hub chủ đề website</a>`,
    `<a href="${SITE}/du-an">case study</a>`,
    `<a href="${SITE}/lien-he">liên hệ tư vấn</a>`,
  ];
  if (cluster) parts.push(`<a href="${SITE}/blog/nganh/${cluster}">hub ngành ${cluster}</a>`);
  if (caseStudyPath) parts.push(`<a href="${SITE}${caseStudyPath}">case study ngành</a>`);
  return `<p>Bạn có thể tìm hiểu thêm: ${parts.join(" · ")}.</p>`;
}

export function externalLinks() {
  return `${zaloConsultBlock()}<p>Theo dõi cập nhật tại <a href="${FB}" rel="noopener">Fanpage Bứt Phá Marketing</a> để nhận case study và ưu đãi mới.</p>`;
}

export { SITE, FB, ZALO };

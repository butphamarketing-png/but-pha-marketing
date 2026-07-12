/**
 * Resolve silo config từ slug/keywords — dùng cho P4 batch inject.
 */
const SITE = "https://www.butphamarketing.com";

/** @typedef {{ id: string, match: string[], hub: string, money: string, landing: string, caseStudy?: string | null, proof: string }} IndustryEntry */

/** @type {IndustryEntry[]} */
export const INDUSTRY_SILO_REGISTRY = [
  { id: "nha-khoa", match: ["nha-khoa", "nhakhoa", "nieng-rang", "implant", "nha khoa"], hub: "/blog/nganh/nha-khoa", money: "/blog/thiet-ke-website-nha-khoa", landing: "/website/nganh/nha-khoa", caseStudy: "/du-an/nha-khoa-dang-khoa", proof: "gsc" },
  { id: "phong-kham", match: ["phong-kham", "phong kham", "da-khoa", "phong kham da khoa"], hub: "/blog/nganh/phong-kham", money: "/blog/thiet-ke-website-phong-kham-da-khoa", landing: "/website/nganh/phong-kham", caseStudy: "/du-an/nha-khoa-dang-khoa", proof: "gsc" },
  { id: "tham-my", match: ["tham-my", "tham my", "tham my vien", "aesthetic"], hub: "/blog/nganh/tham-my", money: "/blog/thiet-ke-website-tham-my-vien", landing: "/website/nganh/tham-my", caseStudy: "/du-an/tham-my-thien-hoang-kim", proof: "spa" },
  { id: "spa", match: ["-spa", " spa", "spa-", "phun-xam", "nail"], hub: "/blog/nganh/spa", money: "/blog/thiet-ke-website-spa", landing: "/website/nganh/spa", caseStudy: "/du-an/phuoc-lai-luxury", proof: "spa" },
  { id: "logistics", match: ["logistics", "van-tai", "van tai", "van-toc", "freight", "kho-bai"], hub: "/blog/nganh/logistics", money: "/blog/thiet-ke-website-logistics-van-tai", landing: "/website/nganh/logistics", caseStudy: "/du-an/van-toc-express-logistics", proof: "logistics" },
  { id: "my-pham", match: ["my-pham", "my pham", "skincare", "cosmetic", "lam-dep", "mỹ phẩm"], hub: "/blog/nganh/my-pham", money: "/blog/thiet-ke-website-my-pham-lam-dep", landing: "/website/nganh/my-pham", caseStudy: "/du-an/glow-dew-cosmetics", proof: "mypham" },
  { id: "xay-dung", match: ["xay-dung", "xay dung", "nha-thau", "nha thau", "kien-truc", "kien truc", "ho-so-nang-luc"], hub: "/blog/nganh/xay-dung", money: "/blog/thiet-ke-website-xay-dung-nha-thau", landing: "/website/nganh/xay-dung", caseStudy: "/du-an/kien-truc-sao-khue", proof: "fanpage" },
  { id: "noi-that", match: ["noi-that", "noi that", "go-noi-that", "noi that van phong"], hub: "/blog/nganh/noi-that", money: "/blog/thiet-ke-website-noi-that", landing: "/website/nganh/noi-that", caseStudy: "/du-an/kien-truc-sao-khue", proof: "fanpage" },
  { id: "pccc", match: ["pccc", "pcch", "phong-chay", "chua-chay", "fire"], hub: "/blog/nganh/pccc", money: "/blog/thiet-ke-website-pccc", landing: "/website/nganh/pccc", caseStudy: "/du-an/pccc-bao-an-fire", proof: "gsc" },
  { id: "co-khi", match: ["co-khi", "co khi", "che-tao", "gia-cong co khi"], hub: "/blog/nganh/co-khi", money: "/blog/thiet-ke-website-co-khi", landing: "/website/nganh/co-khi", caseStudy: "/du-an/kien-truc-sao-khue", proof: "fanpage" },
  { id: "luat", match: ["-luat", " luat", "luat-", "cong ty luat", "law firm"], hub: "/blog/nganh/luat", money: "/blog/thiet-ke-website-cong-ty-luat", landing: "/website/nganh/luat", caseStudy: null, proof: "gsc" },
  { id: "bat-dong-san", match: ["bat-dong-san", "bat dong san", "bds", "real-estate"], hub: "/blog/nganh/bat-dong-san", money: "/blog/thiet-ke-website-bat-dong-san", landing: "/website/nganh/bat-dong-san", caseStudy: "/du-an/kien-truc-sao-khue", proof: "gsc" },
  { id: "khach-san", match: ["khach-san", "khach san", "hotel", "resort"], hub: "/blog/nganh/khach-san", money: "/blog/thiet-ke-website-khach-san", landing: "/website/nganh/khach-san", caseStudy: null, proof: "gsc" },
  { id: "nha-hang", match: ["nha-hang", "nha hang", "restaurant", "f&b"], hub: "/blog/nganh/nha-hang", money: "/blog/thiet-ke-website-nha-hang", landing: "/website/nganh/nha-hang", caseStudy: null, proof: "gsc" },
  { id: "mam-non", match: ["mam-non", "mam non", "truong-mam", "mầm non"], hub: "/blog/nganh/mam-non", money: "/blog/thiet-ke-website-truong-mam-non", landing: "/website/nganh/mam-non", caseStudy: null, proof: "gsc" },
  { id: "o-to", match: ["o-to", "o to", "oto", "xe hoi", "garage"], hub: "/blog/nganh/o-to", money: "/blog/thiet-ke-website-o-to", landing: "/website/nganh/o-to", caseStudy: null, proof: "gsc" },
  { id: "in-an", match: ["in-an", "in an", "printing", "print shop"], hub: "/blog/nganh/in-an", money: "/blog/thiet-ke-website-in-an", landing: "/website/nganh/in-an", caseStudy: null, proof: "gsc" },
  { id: "bao-bi", match: ["bao-bi", "bao bi", "packaging"], hub: "/blog/nganh/bao-bi", money: "/blog/thiet-ke-website-bao-bi", landing: "/website/nganh/bao-bi", caseStudy: null, proof: "gsc" },
  { id: "thang-may", match: ["thang-may", "thang may", "elevator"], hub: "/blog/nganh/thang-may", money: "/blog/thiet-ke-website-thang-may", landing: "/website/nganh/thang-may", caseStudy: null, proof: "gsc" },
  { id: "tu-dong-hoa", match: ["tu-dong-hoa", "tu dong hoa", "automation cong nghiep"], hub: "/blog/nganh/tu-dong-hoa", money: "/blog/thiet-ke-website-tu-dong-hoa", landing: "/website/nganh/tu-dong-hoa", caseStudy: null, proof: "gsc" },
  { id: "anh-ngu", match: ["anh-ngu", "anh ngu", "trung-tam-anh-ngu", "language center"], hub: "/blog/nganh/anh-ngu", money: "/blog/thiet-ke-website-trung-tam-anh-ngu", landing: "/website/nganh/anh-ngu", caseStudy: null, proof: "gsc" },
  { id: "thiet-bi-ve-sinh", match: ["thiet-bi-ve-sinh", "ve sinh", "sanitary"], hub: "/blog/nganh/thiet-bi-ve-sinh", money: "/blog/thiet-ke-website-thiet-bi-ve-sinh", landing: "/website/nganh/thiet-bi-ve-sinh", caseStudy: null, proof: "gsc" },
];

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

/** @param {{ slug?: string, keywordsMain?: string }} input */
export function resolveIndustrySilo(input) {
  const text = normalize(`${input.slug || ""} ${input.keywordsMain || ""}`);
  let best = null;
  let bestLen = 0;
  for (const entry of INDUSTRY_SILO_REGISTRY) {
    for (const token of entry.match) {
      const n = normalize(token);
      if (text.includes(n) && n.length > bestLen) {
        best = entry;
        bestLen = n.length;
      }
    }
  }
  if (!best) return null;
  return {
    slug: input.slug,
    hub: best.hub,
    money: best.money,
    landing: best.landing,
    caseStudy: best.caseStudy,
    kind: "auto",
    industryId: best.id,
    proof: best.proof,
  };
}

export function isWebsiteTopic(input) {
  const text = normalize(`${input.slug || ""} ${input.keywordsMain || ""}`);
  if (text.includes("thiet ke website") || text.includes("lam website") || text.includes("bao gia website")) {
    return true;
  }
  if (resolveIndustrySilo(input)) return true;
  if (text.includes("website") && !text.includes("facebook") && !text.includes("fanpage")) return true;
  return false;
}

export { SITE };

/**
 * 500 từ khóa long-tail batch 10 — Local SEO, Zalo OA, UX/UI, duyên hải/Đông Bắc.
 * Export: KEYWORDS_500_BATCH10
 */

function cap(kw) {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

function webIndustryCity(indSlug, citySlug, industry, city, angle) {
  return {
    slug: `thiet-ke-website-${indSlug}-${citySlug}`,
    keywordsMain: `thiết kế website ${industry} ${city}`,
    h1: `Thiết Kế Website ${cap(industry)} ${city} Chuẩn SEO`,
    angle,
    niche: "strategy",
  };
}

function webIndustry(slug, kw, angle) {
  return {
    slug: `thiet-ke-website-${slug}`,
    keywordsMain: `thiết kế website ${kw}`,
    h1: `Thiết Kế Website ${cap(kw)} Chuyên Nghiệp Chuẩn SEO`,
    angle,
    niche: "strategy",
  };
}

function webPricing(indSlug, industry, angle) {
  return {
    slug: `bao-gia-thiet-ke-website-${indSlug}`,
    keywordsMain: `báo giá thiết kế website ${industry}`,
    h1: `Báo Giá Thiết Kế Website ${cap(industry)} 2026`,
    angle,
    niche: "strategy",
  };
}

function mapsIndCity(indSlug, citySlug, industry, city, angle) {
  return {
    slug: `seo-google-maps-${indSlug}-${citySlug}`,
    keywordsMain: `seo google maps ${industry} ${city}`,
    h1: `SEO Google Maps ${cap(industry)} ${city}`,
    angle,
    niche: "seo",
  };
}

function marketingInd(slug, kw, angle) {
  return {
    slug: `marketing-${slug}`,
    keywordsMain: `marketing ${kw}`,
    h1: `Marketing ${cap(kw)} — Chiến Lược Tăng Trưởng`,
    angle,
    niche: "strategy",
  };
}

function compare(slug, kw, h1, angle, niche = "strategy") {
  return { slug, keywordsMain: kw, h1, angle, niche };
}

function pain(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "strategy" };
}

function laGi(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "seo" };
}

function localSeo(slug, kw, angle) {
  return {
    slug: `local-seo-${slug}`,
    keywordsMain: `local seo ${kw}`,
    h1: `Local SEO ${cap(kw)} — Tăng Hiển Thị Địa Phương`,
    angle,
    niche: "seo",
  };
}

function zaloOa(slug, kw, angle) {
  return {
    slug: `zalo-oa-${slug}`,
    keywordsMain: `zalo official account ${kw}`,
    h1: `Zalo OA ${cap(kw)} — Vận Hành Chuẩn`,
    angle,
    niche: "strategy",
  };
}

function uxUi(slug, kw, angle) {
  return {
    slug: `thiet-ke-ux-ui-${slug}`,
    keywordsMain: `thiết kế UX UI ${kw}`,
    h1: `Thiết Kế UX UI ${cap(kw)} — Trải Nghiệm Người Dùng`,
    angle,
    niche: "strategy",
  };
}

/** A — 200 */
const A_WEB_CITY = [
  {
    "slug": "thiet-ke-website-xuong-che-bien-ca-kho-vung-tau",
    "keywordsMain": "thiết kế website xưởng chế biến cá khô Vũng Tàu",
    "h1": "Thiết Kế Website Xưởng chế biến cá khô Vũng Tàu Chuẩn SEO",
    "angle": "website nhà máy cá khô xuất khẩu tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-che-bien-ca-kho-phan-rang",
    "keywordsMain": "thiết kế website xưởng chế biến cá khô Phan Rang",
    "h1": "Thiết Kế Website Xưởng chế biến cá khô Phan Rang Chuẩn SEO",
    "angle": "website nhà máy cá khô xuất khẩu tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-che-bien-ca-kho-nha-trang",
    "keywordsMain": "thiết kế website xưởng chế biến cá khô Nha Trang",
    "h1": "Thiết Kế Website Xưởng chế biến cá khô Nha Trang Chuẩn SEO",
    "angle": "website nhà máy cá khô xuất khẩu tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-che-bien-ca-kho-da-lat",
    "keywordsMain": "thiết kế website xưởng chế biến cá khô Đà Lạt",
    "h1": "Thiết Kế Website Xưởng chế biến cá khô Đà Lạt Chuẩn SEO",
    "angle": "website nhà máy cá khô xuất khẩu tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-che-bien-ca-kho-cam-ranh",
    "keywordsMain": "thiết kế website xưởng chế biến cá khô Cam Ranh",
    "h1": "Thiết Kế Website Xưởng chế biến cá khô Cam Ranh Chuẩn SEO",
    "angle": "website nhà máy cá khô xuất khẩu tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-che-bien-ca-kho-uong-bi",
    "keywordsMain": "thiết kế website xưởng chế biến cá khô Uông Bí",
    "h1": "Thiết Kế Website Xưởng chế biến cá khô Uông Bí Chuẩn SEO",
    "angle": "website nhà máy cá khô xuất khẩu tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-che-bien-ca-kho-son-tay",
    "keywordsMain": "thiết kế website xưởng chế biến cá khô Sơn Tây",
    "h1": "Thiết Kế Website Xưởng chế biến cá khô Sơn Tây Chuẩn SEO",
    "angle": "website nhà máy cá khô xuất khẩu tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-che-bien-ca-kho-hoai-duc",
    "keywordsMain": "thiết kế website xưởng chế biến cá khô Hoài Đức",
    "h1": "Thiết Kế Website Xưởng chế biến cá khô Hoài Đức Chuẩn SEO",
    "angle": "website nhà máy cá khô xuất khẩu tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-che-bien-ca-kho-cam-pha",
    "keywordsMain": "thiết kế website xưởng chế biến cá khô Cẩm Phả",
    "h1": "Thiết Kế Website Xưởng chế biến cá khô Cẩm Phả Chuẩn SEO",
    "angle": "website nhà máy cá khô xuất khẩu tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-che-bien-ca-kho-ha-tien",
    "keywordsMain": "thiết kế website xưởng chế biến cá khô Hà Tiên",
    "h1": "Thiết Kế Website Xưởng chế biến cá khô Hà Tiên Chuẩn SEO",
    "angle": "website nhà máy cá khô xuất khẩu tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-khong-gian-event-vung-tau",
    "keywordsMain": "thiết kế website cho thuê không gian event Vũng Tàu",
    "h1": "Thiết Kế Website Cho thuê không gian event Vũng Tàu Chuẩn SEO",
    "angle": "website cho thuê sảnh sự kiện tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-khong-gian-event-phan-rang",
    "keywordsMain": "thiết kế website cho thuê không gian event Phan Rang",
    "h1": "Thiết Kế Website Cho thuê không gian event Phan Rang Chuẩn SEO",
    "angle": "website cho thuê sảnh sự kiện tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-khong-gian-event-nha-trang",
    "keywordsMain": "thiết kế website cho thuê không gian event Nha Trang",
    "h1": "Thiết Kế Website Cho thuê không gian event Nha Trang Chuẩn SEO",
    "angle": "website cho thuê sảnh sự kiện tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-khong-gian-event-da-lat",
    "keywordsMain": "thiết kế website cho thuê không gian event Đà Lạt",
    "h1": "Thiết Kế Website Cho thuê không gian event Đà Lạt Chuẩn SEO",
    "angle": "website cho thuê sảnh sự kiện tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-khong-gian-event-cam-ranh",
    "keywordsMain": "thiết kế website cho thuê không gian event Cam Ranh",
    "h1": "Thiết Kế Website Cho thuê không gian event Cam Ranh Chuẩn SEO",
    "angle": "website cho thuê sảnh sự kiện tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-khong-gian-event-uong-bi",
    "keywordsMain": "thiết kế website cho thuê không gian event Uông Bí",
    "h1": "Thiết Kế Website Cho thuê không gian event Uông Bí Chuẩn SEO",
    "angle": "website cho thuê sảnh sự kiện tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-khong-gian-event-son-tay",
    "keywordsMain": "thiết kế website cho thuê không gian event Sơn Tây",
    "h1": "Thiết Kế Website Cho thuê không gian event Sơn Tây Chuẩn SEO",
    "angle": "website cho thuê sảnh sự kiện tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-khong-gian-event-hoai-duc",
    "keywordsMain": "thiết kế website cho thuê không gian event Hoài Đức",
    "h1": "Thiết Kế Website Cho thuê không gian event Hoài Đức Chuẩn SEO",
    "angle": "website cho thuê sảnh sự kiện tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-khong-gian-event-cam-pha",
    "keywordsMain": "thiết kế website cho thuê không gian event Cẩm Phả",
    "h1": "Thiết Kế Website Cho thuê không gian event Cẩm Phả Chuẩn SEO",
    "angle": "website cho thuê sảnh sự kiện tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-khong-gian-event-ha-tien",
    "keywordsMain": "thiết kế website cho thuê không gian event Hà Tiên",
    "h1": "Thiết Kế Website Cho thuê không gian event Hà Tiên Chuẩn SEO",
    "angle": "website cho thuê sảnh sự kiện tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tra-sua-vung-tau",
    "keywordsMain": "thiết kế website dạy làm trà sữa Vũng Tàu",
    "h1": "Thiết Kế Website Dạy làm trà sữa Vũng Tàu Chuẩn SEO",
    "angle": "website học pha chế trà sữa tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tra-sua-phan-rang",
    "keywordsMain": "thiết kế website dạy làm trà sữa Phan Rang",
    "h1": "Thiết Kế Website Dạy làm trà sữa Phan Rang Chuẩn SEO",
    "angle": "website học pha chế trà sữa tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tra-sua-nha-trang",
    "keywordsMain": "thiết kế website dạy làm trà sữa Nha Trang",
    "h1": "Thiết Kế Website Dạy làm trà sữa Nha Trang Chuẩn SEO",
    "angle": "website học pha chế trà sữa tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tra-sua-da-lat",
    "keywordsMain": "thiết kế website dạy làm trà sữa Đà Lạt",
    "h1": "Thiết Kế Website Dạy làm trà sữa Đà Lạt Chuẩn SEO",
    "angle": "website học pha chế trà sữa tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tra-sua-cam-ranh",
    "keywordsMain": "thiết kế website dạy làm trà sữa Cam Ranh",
    "h1": "Thiết Kế Website Dạy làm trà sữa Cam Ranh Chuẩn SEO",
    "angle": "website học pha chế trà sữa tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tra-sua-uong-bi",
    "keywordsMain": "thiết kế website dạy làm trà sữa Uông Bí",
    "h1": "Thiết Kế Website Dạy làm trà sữa Uông Bí Chuẩn SEO",
    "angle": "website học pha chế trà sữa tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tra-sua-son-tay",
    "keywordsMain": "thiết kế website dạy làm trà sữa Sơn Tây",
    "h1": "Thiết Kế Website Dạy làm trà sữa Sơn Tây Chuẩn SEO",
    "angle": "website học pha chế trà sữa tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tra-sua-hoai-duc",
    "keywordsMain": "thiết kế website dạy làm trà sữa Hoài Đức",
    "h1": "Thiết Kế Website Dạy làm trà sữa Hoài Đức Chuẩn SEO",
    "angle": "website học pha chế trà sữa tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tra-sua-cam-pha",
    "keywordsMain": "thiết kế website dạy làm trà sữa Cẩm Phả",
    "h1": "Thiết Kế Website Dạy làm trà sữa Cẩm Phả Chuẩn SEO",
    "angle": "website học pha chế trà sữa tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tra-sua-ha-tien",
    "keywordsMain": "thiết kế website dạy làm trà sữa Hà Tiên",
    "h1": "Thiết Kế Website Dạy làm trà sữa Hà Tiên Chuẩn SEO",
    "angle": "website học pha chế trà sữa tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-dau-lung-vung-tau",
    "keywordsMain": "thiết kế website trị đau lưng Vũng Tàu",
    "h1": "Thiết Kế Website Trị đau lưng Vũng Tàu Chuẩn SEO",
    "angle": "website phòng khám cột sống tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-dau-lung-phan-rang",
    "keywordsMain": "thiết kế website trị đau lưng Phan Rang",
    "h1": "Thiết Kế Website Trị đau lưng Phan Rang Chuẩn SEO",
    "angle": "website phòng khám cột sống tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-dau-lung-nha-trang",
    "keywordsMain": "thiết kế website trị đau lưng Nha Trang",
    "h1": "Thiết Kế Website Trị đau lưng Nha Trang Chuẩn SEO",
    "angle": "website phòng khám cột sống tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-dau-lung-da-lat",
    "keywordsMain": "thiết kế website trị đau lưng Đà Lạt",
    "h1": "Thiết Kế Website Trị đau lưng Đà Lạt Chuẩn SEO",
    "angle": "website phòng khám cột sống tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-dau-lung-cam-ranh",
    "keywordsMain": "thiết kế website trị đau lưng Cam Ranh",
    "h1": "Thiết Kế Website Trị đau lưng Cam Ranh Chuẩn SEO",
    "angle": "website phòng khám cột sống tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-dau-lung-uong-bi",
    "keywordsMain": "thiết kế website trị đau lưng Uông Bí",
    "h1": "Thiết Kế Website Trị đau lưng Uông Bí Chuẩn SEO",
    "angle": "website phòng khám cột sống tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-dau-lung-son-tay",
    "keywordsMain": "thiết kế website trị đau lưng Sơn Tây",
    "h1": "Thiết Kế Website Trị đau lưng Sơn Tây Chuẩn SEO",
    "angle": "website phòng khám cột sống tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-dau-lung-hoai-duc",
    "keywordsMain": "thiết kế website trị đau lưng Hoài Đức",
    "h1": "Thiết Kế Website Trị đau lưng Hoài Đức Chuẩn SEO",
    "angle": "website phòng khám cột sống tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-dau-lung-cam-pha",
    "keywordsMain": "thiết kế website trị đau lưng Cẩm Phả",
    "h1": "Thiết Kế Website Trị đau lưng Cẩm Phả Chuẩn SEO",
    "angle": "website phòng khám cột sống tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-dau-lung-ha-tien",
    "keywordsMain": "thiết kế website trị đau lưng Hà Tiên",
    "h1": "Thiết Kế Website Trị đau lưng Hà Tiên Chuẩn SEO",
    "angle": "website phòng khám cột sống tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-nha-khoa-vung-tau",
    "keywordsMain": "thiết kế website thiết bị nha khoa Vũng Tàu",
    "h1": "Thiết Kế Website Thiết bị nha khoa Vũng Tàu Chuẩn SEO",
    "angle": "website thiết bị nha khoa B2B tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-nha-khoa-phan-rang",
    "keywordsMain": "thiết kế website thiết bị nha khoa Phan Rang",
    "h1": "Thiết Kế Website Thiết bị nha khoa Phan Rang Chuẩn SEO",
    "angle": "website thiết bị nha khoa B2B tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-nha-khoa-nha-trang",
    "keywordsMain": "thiết kế website thiết bị nha khoa Nha Trang",
    "h1": "Thiết Kế Website Thiết bị nha khoa Nha Trang Chuẩn SEO",
    "angle": "website thiết bị nha khoa B2B tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-nha-khoa-da-lat",
    "keywordsMain": "thiết kế website thiết bị nha khoa Đà Lạt",
    "h1": "Thiết Kế Website Thiết bị nha khoa Đà Lạt Chuẩn SEO",
    "angle": "website thiết bị nha khoa B2B tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-nha-khoa-cam-ranh",
    "keywordsMain": "thiết kế website thiết bị nha khoa Cam Ranh",
    "h1": "Thiết Kế Website Thiết bị nha khoa Cam Ranh Chuẩn SEO",
    "angle": "website thiết bị nha khoa B2B tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-nha-khoa-uong-bi",
    "keywordsMain": "thiết kế website thiết bị nha khoa Uông Bí",
    "h1": "Thiết Kế Website Thiết bị nha khoa Uông Bí Chuẩn SEO",
    "angle": "website thiết bị nha khoa B2B tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-nha-khoa-son-tay",
    "keywordsMain": "thiết kế website thiết bị nha khoa Sơn Tây",
    "h1": "Thiết Kế Website Thiết bị nha khoa Sơn Tây Chuẩn SEO",
    "angle": "website thiết bị nha khoa B2B tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-nha-khoa-hoai-duc",
    "keywordsMain": "thiết kế website thiết bị nha khoa Hoài Đức",
    "h1": "Thiết Kế Website Thiết bị nha khoa Hoài Đức Chuẩn SEO",
    "angle": "website thiết bị nha khoa B2B tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-nha-khoa-cam-pha",
    "keywordsMain": "thiết kế website thiết bị nha khoa Cẩm Phả",
    "h1": "Thiết Kế Website Thiết bị nha khoa Cẩm Phả Chuẩn SEO",
    "angle": "website thiết bị nha khoa B2B tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-nha-khoa-ha-tien",
    "keywordsMain": "thiết kế website thiết bị nha khoa Hà Tiên",
    "h1": "Thiết Kế Website Thiết bị nha khoa Hà Tiên Chuẩn SEO",
    "angle": "website thiết bị nha khoa B2B tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-shop-thoi-trang-vung-tau",
    "keywordsMain": "thiết kế website thiết kế shop thời trang Vũng Tàu",
    "h1": "Thiết Kế Website Thiết kế shop thời trang Vũng Tàu Chuẩn SEO",
    "angle": "website thiết kế cửa hàng fashion tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-shop-thoi-trang-phan-rang",
    "keywordsMain": "thiết kế website thiết kế shop thời trang Phan Rang",
    "h1": "Thiết Kế Website Thiết kế shop thời trang Phan Rang Chuẩn SEO",
    "angle": "website thiết kế cửa hàng fashion tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-shop-thoi-trang-nha-trang",
    "keywordsMain": "thiết kế website thiết kế shop thời trang Nha Trang",
    "h1": "Thiết Kế Website Thiết kế shop thời trang Nha Trang Chuẩn SEO",
    "angle": "website thiết kế cửa hàng fashion tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-shop-thoi-trang-da-lat",
    "keywordsMain": "thiết kế website thiết kế shop thời trang Đà Lạt",
    "h1": "Thiết Kế Website Thiết kế shop thời trang Đà Lạt Chuẩn SEO",
    "angle": "website thiết kế cửa hàng fashion tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-shop-thoi-trang-cam-ranh",
    "keywordsMain": "thiết kế website thiết kế shop thời trang Cam Ranh",
    "h1": "Thiết Kế Website Thiết kế shop thời trang Cam Ranh Chuẩn SEO",
    "angle": "website thiết kế cửa hàng fashion tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-shop-thoi-trang-uong-bi",
    "keywordsMain": "thiết kế website thiết kế shop thời trang Uông Bí",
    "h1": "Thiết Kế Website Thiết kế shop thời trang Uông Bí Chuẩn SEO",
    "angle": "website thiết kế cửa hàng fashion tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-shop-thoi-trang-son-tay",
    "keywordsMain": "thiết kế website thiết kế shop thời trang Sơn Tây",
    "h1": "Thiết Kế Website Thiết kế shop thời trang Sơn Tây Chuẩn SEO",
    "angle": "website thiết kế cửa hàng fashion tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-shop-thoi-trang-hoai-duc",
    "keywordsMain": "thiết kế website thiết kế shop thời trang Hoài Đức",
    "h1": "Thiết Kế Website Thiết kế shop thời trang Hoài Đức Chuẩn SEO",
    "angle": "website thiết kế cửa hàng fashion tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-shop-thoi-trang-cam-pha",
    "keywordsMain": "thiết kế website thiết kế shop thời trang Cẩm Phả",
    "h1": "Thiết Kế Website Thiết kế shop thời trang Cẩm Phả Chuẩn SEO",
    "angle": "website thiết kế cửa hàng fashion tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-shop-thoi-trang-ha-tien",
    "keywordsMain": "thiết kế website thiết kế shop thời trang Hà Tiên",
    "h1": "Thiết Kế Website Thiết kế shop thời trang Hà Tiên Chuẩn SEO",
    "angle": "website thiết kế cửa hàng fashion tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-dau-an-vung-tau",
    "keywordsMain": "thiết kế website phân phối dầu ăn Vũng Tàu",
    "h1": "Thiết Kế Website Phân phối dầu ăn Vũng Tàu Chuẩn SEO",
    "angle": "website phân phối dầu ăn cooking oil tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-dau-an-phan-rang",
    "keywordsMain": "thiết kế website phân phối dầu ăn Phan Rang",
    "h1": "Thiết Kế Website Phân phối dầu ăn Phan Rang Chuẩn SEO",
    "angle": "website phân phối dầu ăn cooking oil tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-dau-an-nha-trang",
    "keywordsMain": "thiết kế website phân phối dầu ăn Nha Trang",
    "h1": "Thiết Kế Website Phân phối dầu ăn Nha Trang Chuẩn SEO",
    "angle": "website phân phối dầu ăn cooking oil tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-dau-an-da-lat",
    "keywordsMain": "thiết kế website phân phối dầu ăn Đà Lạt",
    "h1": "Thiết Kế Website Phân phối dầu ăn Đà Lạt Chuẩn SEO",
    "angle": "website phân phối dầu ăn cooking oil tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-dau-an-cam-ranh",
    "keywordsMain": "thiết kế website phân phối dầu ăn Cam Ranh",
    "h1": "Thiết Kế Website Phân phối dầu ăn Cam Ranh Chuẩn SEO",
    "angle": "website phân phối dầu ăn cooking oil tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-dau-an-uong-bi",
    "keywordsMain": "thiết kế website phân phối dầu ăn Uông Bí",
    "h1": "Thiết Kế Website Phân phối dầu ăn Uông Bí Chuẩn SEO",
    "angle": "website phân phối dầu ăn cooking oil tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-dau-an-son-tay",
    "keywordsMain": "thiết kế website phân phối dầu ăn Sơn Tây",
    "h1": "Thiết Kế Website Phân phối dầu ăn Sơn Tây Chuẩn SEO",
    "angle": "website phân phối dầu ăn cooking oil tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-dau-an-hoai-duc",
    "keywordsMain": "thiết kế website phân phối dầu ăn Hoài Đức",
    "h1": "Thiết Kế Website Phân phối dầu ăn Hoài Đức Chuẩn SEO",
    "angle": "website phân phối dầu ăn cooking oil tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-dau-an-cam-pha",
    "keywordsMain": "thiết kế website phân phối dầu ăn Cẩm Phả",
    "h1": "Thiết Kế Website Phân phối dầu ăn Cẩm Phả Chuẩn SEO",
    "angle": "website phân phối dầu ăn cooking oil tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-dau-an-ha-tien",
    "keywordsMain": "thiết kế website phân phối dầu ăn Hà Tiên",
    "h1": "Thiết Kế Website Phân phối dầu ăn Hà Tiên Chuẩn SEO",
    "angle": "website phân phối dầu ăn cooking oil tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-bao-bi-flexo-vung-tau",
    "keywordsMain": "thiết kế website xưởng in bao bì flexo Vũng Tàu",
    "h1": "Thiết Kế Website Xưởng in bao bì flexo Vũng Tàu Chuẩn SEO",
    "angle": "website in bao bì flexo tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-bao-bi-flexo-phan-rang",
    "keywordsMain": "thiết kế website xưởng in bao bì flexo Phan Rang",
    "h1": "Thiết Kế Website Xưởng in bao bì flexo Phan Rang Chuẩn SEO",
    "angle": "website in bao bì flexo tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-bao-bi-flexo-nha-trang",
    "keywordsMain": "thiết kế website xưởng in bao bì flexo Nha Trang",
    "h1": "Thiết Kế Website Xưởng in bao bì flexo Nha Trang Chuẩn SEO",
    "angle": "website in bao bì flexo tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-bao-bi-flexo-da-lat",
    "keywordsMain": "thiết kế website xưởng in bao bì flexo Đà Lạt",
    "h1": "Thiết Kế Website Xưởng in bao bì flexo Đà Lạt Chuẩn SEO",
    "angle": "website in bao bì flexo tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-bao-bi-flexo-cam-ranh",
    "keywordsMain": "thiết kế website xưởng in bao bì flexo Cam Ranh",
    "h1": "Thiết Kế Website Xưởng in bao bì flexo Cam Ranh Chuẩn SEO",
    "angle": "website in bao bì flexo tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-bao-bi-flexo-uong-bi",
    "keywordsMain": "thiết kế website xưởng in bao bì flexo Uông Bí",
    "h1": "Thiết Kế Website Xưởng in bao bì flexo Uông Bí Chuẩn SEO",
    "angle": "website in bao bì flexo tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-bao-bi-flexo-son-tay",
    "keywordsMain": "thiết kế website xưởng in bao bì flexo Sơn Tây",
    "h1": "Thiết Kế Website Xưởng in bao bì flexo Sơn Tây Chuẩn SEO",
    "angle": "website in bao bì flexo tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-bao-bi-flexo-hoai-duc",
    "keywordsMain": "thiết kế website xưởng in bao bì flexo Hoài Đức",
    "h1": "Thiết Kế Website Xưởng in bao bì flexo Hoài Đức Chuẩn SEO",
    "angle": "website in bao bì flexo tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-bao-bi-flexo-cam-pha",
    "keywordsMain": "thiết kế website xưởng in bao bì flexo Cẩm Phả",
    "h1": "Thiết Kế Website Xưởng in bao bì flexo Cẩm Phả Chuẩn SEO",
    "angle": "website in bao bì flexo tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-bao-bi-flexo-ha-tien",
    "keywordsMain": "thiết kế website xưởng in bao bì flexo Hà Tiên",
    "h1": "Thiết Kế Website Xưởng in bao bì flexo Hà Tiên Chuẩn SEO",
    "angle": "website in bao bì flexo tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-eyelash-vung-tau",
    "keywordsMain": "thiết kế website dạy làm eyelash Vũng Tàu",
    "h1": "Thiết Kế Website Dạy làm eyelash Vũng Tàu Chuẩn SEO",
    "angle": "website học nối mi classic volume tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-eyelash-phan-rang",
    "keywordsMain": "thiết kế website dạy làm eyelash Phan Rang",
    "h1": "Thiết Kế Website Dạy làm eyelash Phan Rang Chuẩn SEO",
    "angle": "website học nối mi classic volume tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-eyelash-nha-trang",
    "keywordsMain": "thiết kế website dạy làm eyelash Nha Trang",
    "h1": "Thiết Kế Website Dạy làm eyelash Nha Trang Chuẩn SEO",
    "angle": "website học nối mi classic volume tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-eyelash-da-lat",
    "keywordsMain": "thiết kế website dạy làm eyelash Đà Lạt",
    "h1": "Thiết Kế Website Dạy làm eyelash Đà Lạt Chuẩn SEO",
    "angle": "website học nối mi classic volume tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-eyelash-cam-ranh",
    "keywordsMain": "thiết kế website dạy làm eyelash Cam Ranh",
    "h1": "Thiết Kế Website Dạy làm eyelash Cam Ranh Chuẩn SEO",
    "angle": "website học nối mi classic volume tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-eyelash-uong-bi",
    "keywordsMain": "thiết kế website dạy làm eyelash Uông Bí",
    "h1": "Thiết Kế Website Dạy làm eyelash Uông Bí Chuẩn SEO",
    "angle": "website học nối mi classic volume tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-eyelash-son-tay",
    "keywordsMain": "thiết kế website dạy làm eyelash Sơn Tây",
    "h1": "Thiết Kế Website Dạy làm eyelash Sơn Tây Chuẩn SEO",
    "angle": "website học nối mi classic volume tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-eyelash-hoai-duc",
    "keywordsMain": "thiết kế website dạy làm eyelash Hoài Đức",
    "h1": "Thiết Kế Website Dạy làm eyelash Hoài Đức Chuẩn SEO",
    "angle": "website học nối mi classic volume tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-eyelash-cam-pha",
    "keywordsMain": "thiết kế website dạy làm eyelash Cẩm Phả",
    "h1": "Thiết Kế Website Dạy làm eyelash Cẩm Phả Chuẩn SEO",
    "angle": "website học nối mi classic volume tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-eyelash-ha-tien",
    "keywordsMain": "thiết kế website dạy làm eyelash Hà Tiên",
    "h1": "Thiết Kế Website Dạy làm eyelash Hà Tiên Chuẩn SEO",
    "angle": "website học nối mi classic volume tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-gan-nhiem-mo-vung-tau",
    "keywordsMain": "thiết kế website trị gan nhiễm mỡ Vũng Tàu",
    "h1": "Thiết Kế Website Trị gan nhiễm mỡ Vũng Tàu Chuẩn SEO",
    "angle": "website phòng khám gan mật tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-gan-nhiem-mo-phan-rang",
    "keywordsMain": "thiết kế website trị gan nhiễm mỡ Phan Rang",
    "h1": "Thiết Kế Website Trị gan nhiễm mỡ Phan Rang Chuẩn SEO",
    "angle": "website phòng khám gan mật tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-gan-nhiem-mo-nha-trang",
    "keywordsMain": "thiết kế website trị gan nhiễm mỡ Nha Trang",
    "h1": "Thiết Kế Website Trị gan nhiễm mỡ Nha Trang Chuẩn SEO",
    "angle": "website phòng khám gan mật tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-gan-nhiem-mo-da-lat",
    "keywordsMain": "thiết kế website trị gan nhiễm mỡ Đà Lạt",
    "h1": "Thiết Kế Website Trị gan nhiễm mỡ Đà Lạt Chuẩn SEO",
    "angle": "website phòng khám gan mật tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-gan-nhiem-mo-cam-ranh",
    "keywordsMain": "thiết kế website trị gan nhiễm mỡ Cam Ranh",
    "h1": "Thiết Kế Website Trị gan nhiễm mỡ Cam Ranh Chuẩn SEO",
    "angle": "website phòng khám gan mật tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-gan-nhiem-mo-uong-bi",
    "keywordsMain": "thiết kế website trị gan nhiễm mỡ Uông Bí",
    "h1": "Thiết Kế Website Trị gan nhiễm mỡ Uông Bí Chuẩn SEO",
    "angle": "website phòng khám gan mật tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-gan-nhiem-mo-son-tay",
    "keywordsMain": "thiết kế website trị gan nhiễm mỡ Sơn Tây",
    "h1": "Thiết Kế Website Trị gan nhiễm mỡ Sơn Tây Chuẩn SEO",
    "angle": "website phòng khám gan mật tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-gan-nhiem-mo-hoai-duc",
    "keywordsMain": "thiết kế website trị gan nhiễm mỡ Hoài Đức",
    "h1": "Thiết Kế Website Trị gan nhiễm mỡ Hoài Đức Chuẩn SEO",
    "angle": "website phòng khám gan mật tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-gan-nhiem-mo-cam-pha",
    "keywordsMain": "thiết kế website trị gan nhiễm mỡ Cẩm Phả",
    "h1": "Thiết Kế Website Trị gan nhiễm mỡ Cẩm Phả Chuẩn SEO",
    "angle": "website phòng khám gan mật tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-gan-nhiem-mo-ha-tien",
    "keywordsMain": "thiết kế website trị gan nhiễm mỡ Hà Tiên",
    "h1": "Thiết Kế Website Trị gan nhiễm mỡ Hà Tiên Chuẩn SEO",
    "angle": "website phòng khám gan mật tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-he-thong-bao-chay-vung-tau",
    "keywordsMain": "thiết kế website lắp hệ thống báo cháy Vũng Tàu",
    "h1": "Thiết Kế Website Lắp hệ thống báo cháy Vũng Tàu Chuẩn SEO",
    "angle": "website PCCC báo cháy tự động tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-he-thong-bao-chay-phan-rang",
    "keywordsMain": "thiết kế website lắp hệ thống báo cháy Phan Rang",
    "h1": "Thiết Kế Website Lắp hệ thống báo cháy Phan Rang Chuẩn SEO",
    "angle": "website PCCC báo cháy tự động tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-he-thong-bao-chay-nha-trang",
    "keywordsMain": "thiết kế website lắp hệ thống báo cháy Nha Trang",
    "h1": "Thiết Kế Website Lắp hệ thống báo cháy Nha Trang Chuẩn SEO",
    "angle": "website PCCC báo cháy tự động tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-he-thong-bao-chay-da-lat",
    "keywordsMain": "thiết kế website lắp hệ thống báo cháy Đà Lạt",
    "h1": "Thiết Kế Website Lắp hệ thống báo cháy Đà Lạt Chuẩn SEO",
    "angle": "website PCCC báo cháy tự động tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-he-thong-bao-chay-cam-ranh",
    "keywordsMain": "thiết kế website lắp hệ thống báo cháy Cam Ranh",
    "h1": "Thiết Kế Website Lắp hệ thống báo cháy Cam Ranh Chuẩn SEO",
    "angle": "website PCCC báo cháy tự động tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-he-thong-bao-chay-uong-bi",
    "keywordsMain": "thiết kế website lắp hệ thống báo cháy Uông Bí",
    "h1": "Thiết Kế Website Lắp hệ thống báo cháy Uông Bí Chuẩn SEO",
    "angle": "website PCCC báo cháy tự động tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-he-thong-bao-chay-son-tay",
    "keywordsMain": "thiết kế website lắp hệ thống báo cháy Sơn Tây",
    "h1": "Thiết Kế Website Lắp hệ thống báo cháy Sơn Tây Chuẩn SEO",
    "angle": "website PCCC báo cháy tự động tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-he-thong-bao-chay-hoai-duc",
    "keywordsMain": "thiết kế website lắp hệ thống báo cháy Hoài Đức",
    "h1": "Thiết Kế Website Lắp hệ thống báo cháy Hoài Đức Chuẩn SEO",
    "angle": "website PCCC báo cháy tự động tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-he-thong-bao-chay-cam-pha",
    "keywordsMain": "thiết kế website lắp hệ thống báo cháy Cẩm Phả",
    "h1": "Thiết Kế Website Lắp hệ thống báo cháy Cẩm Phả Chuẩn SEO",
    "angle": "website PCCC báo cháy tự động tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-he-thong-bao-chay-ha-tien",
    "keywordsMain": "thiết kế website lắp hệ thống báo cháy Hà Tiên",
    "h1": "Thiết Kế Website Lắp hệ thống báo cháy Hà Tiên Chuẩn SEO",
    "angle": "website PCCC báo cháy tự động tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-golf-vung-tau",
    "keywordsMain": "thiết kế website thiết bị golf Vũng Tàu",
    "h1": "Thiết Kế Website Thiết bị golf Vũng Tàu Chuẩn SEO",
    "angle": "website cửa hàng đồ golf tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-golf-phan-rang",
    "keywordsMain": "thiết kế website thiết bị golf Phan Rang",
    "h1": "Thiết Kế Website Thiết bị golf Phan Rang Chuẩn SEO",
    "angle": "website cửa hàng đồ golf tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-golf-nha-trang",
    "keywordsMain": "thiết kế website thiết bị golf Nha Trang",
    "h1": "Thiết Kế Website Thiết bị golf Nha Trang Chuẩn SEO",
    "angle": "website cửa hàng đồ golf tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-golf-da-lat",
    "keywordsMain": "thiết kế website thiết bị golf Đà Lạt",
    "h1": "Thiết Kế Website Thiết bị golf Đà Lạt Chuẩn SEO",
    "angle": "website cửa hàng đồ golf tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-golf-cam-ranh",
    "keywordsMain": "thiết kế website thiết bị golf Cam Ranh",
    "h1": "Thiết Kế Website Thiết bị golf Cam Ranh Chuẩn SEO",
    "angle": "website cửa hàng đồ golf tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-golf-uong-bi",
    "keywordsMain": "thiết kế website thiết bị golf Uông Bí",
    "h1": "Thiết Kế Website Thiết bị golf Uông Bí Chuẩn SEO",
    "angle": "website cửa hàng đồ golf tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-golf-son-tay",
    "keywordsMain": "thiết kế website thiết bị golf Sơn Tây",
    "h1": "Thiết Kế Website Thiết bị golf Sơn Tây Chuẩn SEO",
    "angle": "website cửa hàng đồ golf tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-golf-hoai-duc",
    "keywordsMain": "thiết kế website thiết bị golf Hoài Đức",
    "h1": "Thiết Kế Website Thiết bị golf Hoài Đức Chuẩn SEO",
    "angle": "website cửa hàng đồ golf tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-golf-cam-pha",
    "keywordsMain": "thiết kế website thiết bị golf Cẩm Phả",
    "h1": "Thiết Kế Website Thiết bị golf Cẩm Phả Chuẩn SEO",
    "angle": "website cửa hàng đồ golf tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-golf-ha-tien",
    "keywordsMain": "thiết kế website thiết bị golf Hà Tiên",
    "h1": "Thiết Kế Website Thiết bị golf Hà Tiên Chuẩn SEO",
    "angle": "website cửa hàng đồ golf tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-thu-tuc-hai-quan-vung-tau",
    "keywordsMain": "thiết kế website tư vấn thủ tục hải quan Vũng Tàu",
    "h1": "Thiết Kế Website Tư vấn thủ tục hải quan Vũng Tàu Chuẩn SEO",
    "angle": "website dịch vụ hải quan XNK tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-thu-tuc-hai-quan-phan-rang",
    "keywordsMain": "thiết kế website tư vấn thủ tục hải quan Phan Rang",
    "h1": "Thiết Kế Website Tư vấn thủ tục hải quan Phan Rang Chuẩn SEO",
    "angle": "website dịch vụ hải quan XNK tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-thu-tuc-hai-quan-nha-trang",
    "keywordsMain": "thiết kế website tư vấn thủ tục hải quan Nha Trang",
    "h1": "Thiết Kế Website Tư vấn thủ tục hải quan Nha Trang Chuẩn SEO",
    "angle": "website dịch vụ hải quan XNK tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-thu-tuc-hai-quan-da-lat",
    "keywordsMain": "thiết kế website tư vấn thủ tục hải quan Đà Lạt",
    "h1": "Thiết Kế Website Tư vấn thủ tục hải quan Đà Lạt Chuẩn SEO",
    "angle": "website dịch vụ hải quan XNK tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-thu-tuc-hai-quan-cam-ranh",
    "keywordsMain": "thiết kế website tư vấn thủ tục hải quan Cam Ranh",
    "h1": "Thiết Kế Website Tư vấn thủ tục hải quan Cam Ranh Chuẩn SEO",
    "angle": "website dịch vụ hải quan XNK tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-thu-tuc-hai-quan-uong-bi",
    "keywordsMain": "thiết kế website tư vấn thủ tục hải quan Uông Bí",
    "h1": "Thiết Kế Website Tư vấn thủ tục hải quan Uông Bí Chuẩn SEO",
    "angle": "website dịch vụ hải quan XNK tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-thu-tuc-hai-quan-son-tay",
    "keywordsMain": "thiết kế website tư vấn thủ tục hải quan Sơn Tây",
    "h1": "Thiết Kế Website Tư vấn thủ tục hải quan Sơn Tây Chuẩn SEO",
    "angle": "website dịch vụ hải quan XNK tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-thu-tuc-hai-quan-hoai-duc",
    "keywordsMain": "thiết kế website tư vấn thủ tục hải quan Hoài Đức",
    "h1": "Thiết Kế Website Tư vấn thủ tục hải quan Hoài Đức Chuẩn SEO",
    "angle": "website dịch vụ hải quan XNK tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-thu-tuc-hai-quan-cam-pha",
    "keywordsMain": "thiết kế website tư vấn thủ tục hải quan Cẩm Phả",
    "h1": "Thiết Kế Website Tư vấn thủ tục hải quan Cẩm Phả Chuẩn SEO",
    "angle": "website dịch vụ hải quan XNK tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-thu-tuc-hai-quan-ha-tien",
    "keywordsMain": "thiết kế website tư vấn thủ tục hải quan Hà Tiên",
    "h1": "Thiết Kế Website Tư vấn thủ tục hải quan Hà Tiên Chuẩn SEO",
    "angle": "website dịch vụ hải quan XNK tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tu-bep-vung-tau",
    "keywordsMain": "thiết kế website dạy làm tủ bếp Vũng Tàu",
    "h1": "Thiết Kế Website Dạy làm tủ bếp Vũng Tàu Chuẩn SEO",
    "angle": "website học làm tủ bếp gỗ tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tu-bep-phan-rang",
    "keywordsMain": "thiết kế website dạy làm tủ bếp Phan Rang",
    "h1": "Thiết Kế Website Dạy làm tủ bếp Phan Rang Chuẩn SEO",
    "angle": "website học làm tủ bếp gỗ tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tu-bep-nha-trang",
    "keywordsMain": "thiết kế website dạy làm tủ bếp Nha Trang",
    "h1": "Thiết Kế Website Dạy làm tủ bếp Nha Trang Chuẩn SEO",
    "angle": "website học làm tủ bếp gỗ tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tu-bep-da-lat",
    "keywordsMain": "thiết kế website dạy làm tủ bếp Đà Lạt",
    "h1": "Thiết Kế Website Dạy làm tủ bếp Đà Lạt Chuẩn SEO",
    "angle": "website học làm tủ bếp gỗ tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tu-bep-cam-ranh",
    "keywordsMain": "thiết kế website dạy làm tủ bếp Cam Ranh",
    "h1": "Thiết Kế Website Dạy làm tủ bếp Cam Ranh Chuẩn SEO",
    "angle": "website học làm tủ bếp gỗ tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tu-bep-uong-bi",
    "keywordsMain": "thiết kế website dạy làm tủ bếp Uông Bí",
    "h1": "Thiết Kế Website Dạy làm tủ bếp Uông Bí Chuẩn SEO",
    "angle": "website học làm tủ bếp gỗ tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tu-bep-son-tay",
    "keywordsMain": "thiết kế website dạy làm tủ bếp Sơn Tây",
    "h1": "Thiết Kế Website Dạy làm tủ bếp Sơn Tây Chuẩn SEO",
    "angle": "website học làm tủ bếp gỗ tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tu-bep-hoai-duc",
    "keywordsMain": "thiết kế website dạy làm tủ bếp Hoài Đức",
    "h1": "Thiết Kế Website Dạy làm tủ bếp Hoài Đức Chuẩn SEO",
    "angle": "website học làm tủ bếp gỗ tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tu-bep-cam-pha",
    "keywordsMain": "thiết kế website dạy làm tủ bếp Cẩm Phả",
    "h1": "Thiết Kế Website Dạy làm tủ bếp Cẩm Phả Chuẩn SEO",
    "angle": "website học làm tủ bếp gỗ tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tu-bep-ha-tien",
    "keywordsMain": "thiết kế website dạy làm tủ bếp Hà Tiên",
    "h1": "Thiết Kế Website Dạy làm tủ bếp Hà Tiên Chuẩn SEO",
    "angle": "website học làm tủ bếp gỗ tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-di-ung-da-vung-tau",
    "keywordsMain": "thiết kế website trị dị ứng da Vũng Tàu",
    "h1": "Thiết Kế Website Trị dị ứng da Vũng Tàu Chuẩn SEO",
    "angle": "website phòng khám dị ứng da liễu tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-di-ung-da-phan-rang",
    "keywordsMain": "thiết kế website trị dị ứng da Phan Rang",
    "h1": "Thiết Kế Website Trị dị ứng da Phan Rang Chuẩn SEO",
    "angle": "website phòng khám dị ứng da liễu tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-di-ung-da-nha-trang",
    "keywordsMain": "thiết kế website trị dị ứng da Nha Trang",
    "h1": "Thiết Kế Website Trị dị ứng da Nha Trang Chuẩn SEO",
    "angle": "website phòng khám dị ứng da liễu tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-di-ung-da-da-lat",
    "keywordsMain": "thiết kế website trị dị ứng da Đà Lạt",
    "h1": "Thiết Kế Website Trị dị ứng da Đà Lạt Chuẩn SEO",
    "angle": "website phòng khám dị ứng da liễu tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-di-ung-da-cam-ranh",
    "keywordsMain": "thiết kế website trị dị ứng da Cam Ranh",
    "h1": "Thiết Kế Website Trị dị ứng da Cam Ranh Chuẩn SEO",
    "angle": "website phòng khám dị ứng da liễu tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-di-ung-da-uong-bi",
    "keywordsMain": "thiết kế website trị dị ứng da Uông Bí",
    "h1": "Thiết Kế Website Trị dị ứng da Uông Bí Chuẩn SEO",
    "angle": "website phòng khám dị ứng da liễu tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-di-ung-da-son-tay",
    "keywordsMain": "thiết kế website trị dị ứng da Sơn Tây",
    "h1": "Thiết Kế Website Trị dị ứng da Sơn Tây Chuẩn SEO",
    "angle": "website phòng khám dị ứng da liễu tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-di-ung-da-hoai-duc",
    "keywordsMain": "thiết kế website trị dị ứng da Hoài Đức",
    "h1": "Thiết Kế Website Trị dị ứng da Hoài Đức Chuẩn SEO",
    "angle": "website phòng khám dị ứng da liễu tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-di-ung-da-cam-pha",
    "keywordsMain": "thiết kế website trị dị ứng da Cẩm Phả",
    "h1": "Thiết Kế Website Trị dị ứng da Cẩm Phả Chuẩn SEO",
    "angle": "website phòng khám dị ứng da liễu tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-di-ung-da-ha-tien",
    "keywordsMain": "thiết kế website trị dị ứng da Hà Tiên",
    "h1": "Thiết Kế Website Trị dị ứng da Hà Tiên Chuẩn SEO",
    "angle": "website phòng khám dị ứng da liễu tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-may-in-vung-tau",
    "keywordsMain": "thiết kế website cho thuê máy in Vũng Tàu",
    "h1": "Thiết Kế Website Cho thuê máy in Vũng Tàu Chuẩn SEO",
    "angle": "website cho thuê máy in văn phòng tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-may-in-phan-rang",
    "keywordsMain": "thiết kế website cho thuê máy in Phan Rang",
    "h1": "Thiết Kế Website Cho thuê máy in Phan Rang Chuẩn SEO",
    "angle": "website cho thuê máy in văn phòng tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-may-in-nha-trang",
    "keywordsMain": "thiết kế website cho thuê máy in Nha Trang",
    "h1": "Thiết Kế Website Cho thuê máy in Nha Trang Chuẩn SEO",
    "angle": "website cho thuê máy in văn phòng tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-may-in-da-lat",
    "keywordsMain": "thiết kế website cho thuê máy in Đà Lạt",
    "h1": "Thiết Kế Website Cho thuê máy in Đà Lạt Chuẩn SEO",
    "angle": "website cho thuê máy in văn phòng tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-may-in-cam-ranh",
    "keywordsMain": "thiết kế website cho thuê máy in Cam Ranh",
    "h1": "Thiết Kế Website Cho thuê máy in Cam Ranh Chuẩn SEO",
    "angle": "website cho thuê máy in văn phòng tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-may-in-uong-bi",
    "keywordsMain": "thiết kế website cho thuê máy in Uông Bí",
    "h1": "Thiết Kế Website Cho thuê máy in Uông Bí Chuẩn SEO",
    "angle": "website cho thuê máy in văn phòng tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-may-in-son-tay",
    "keywordsMain": "thiết kế website cho thuê máy in Sơn Tây",
    "h1": "Thiết Kế Website Cho thuê máy in Sơn Tây Chuẩn SEO",
    "angle": "website cho thuê máy in văn phòng tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-may-in-hoai-duc",
    "keywordsMain": "thiết kế website cho thuê máy in Hoài Đức",
    "h1": "Thiết Kế Website Cho thuê máy in Hoài Đức Chuẩn SEO",
    "angle": "website cho thuê máy in văn phòng tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-may-in-cam-pha",
    "keywordsMain": "thiết kế website cho thuê máy in Cẩm Phả",
    "h1": "Thiết Kế Website Cho thuê máy in Cẩm Phả Chuẩn SEO",
    "angle": "website cho thuê máy in văn phòng tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-may-in-ha-tien",
    "keywordsMain": "thiết kế website cho thuê máy in Hà Tiên",
    "h1": "Thiết Kế Website Cho thuê máy in Hà Tiên Chuẩn SEO",
    "angle": "website cho thuê máy in văn phòng tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-brochure-doanh-nghiep-vung-tau",
    "keywordsMain": "thiết kế website thiết kế brochure doanh nghiệp Vũng Tàu",
    "h1": "Thiết Kế Website Thiết kế brochure doanh nghiệp Vũng Tàu Chuẩn SEO",
    "angle": "website thiết kế brochure in ấn tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-brochure-doanh-nghiep-phan-rang",
    "keywordsMain": "thiết kế website thiết kế brochure doanh nghiệp Phan Rang",
    "h1": "Thiết Kế Website Thiết kế brochure doanh nghiệp Phan Rang Chuẩn SEO",
    "angle": "website thiết kế brochure in ấn tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-brochure-doanh-nghiep-nha-trang",
    "keywordsMain": "thiết kế website thiết kế brochure doanh nghiệp Nha Trang",
    "h1": "Thiết Kế Website Thiết kế brochure doanh nghiệp Nha Trang Chuẩn SEO",
    "angle": "website thiết kế brochure in ấn tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-brochure-doanh-nghiep-da-lat",
    "keywordsMain": "thiết kế website thiết kế brochure doanh nghiệp Đà Lạt",
    "h1": "Thiết Kế Website Thiết kế brochure doanh nghiệp Đà Lạt Chuẩn SEO",
    "angle": "website thiết kế brochure in ấn tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-brochure-doanh-nghiep-cam-ranh",
    "keywordsMain": "thiết kế website thiết kế brochure doanh nghiệp Cam Ranh",
    "h1": "Thiết Kế Website Thiết kế brochure doanh nghiệp Cam Ranh Chuẩn SEO",
    "angle": "website thiết kế brochure in ấn tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-brochure-doanh-nghiep-uong-bi",
    "keywordsMain": "thiết kế website thiết kế brochure doanh nghiệp Uông Bí",
    "h1": "Thiết Kế Website Thiết kế brochure doanh nghiệp Uông Bí Chuẩn SEO",
    "angle": "website thiết kế brochure in ấn tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-brochure-doanh-nghiep-son-tay",
    "keywordsMain": "thiết kế website thiết kế brochure doanh nghiệp Sơn Tây",
    "h1": "Thiết Kế Website Thiết kế brochure doanh nghiệp Sơn Tây Chuẩn SEO",
    "angle": "website thiết kế brochure in ấn tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-brochure-doanh-nghiep-hoai-duc",
    "keywordsMain": "thiết kế website thiết kế brochure doanh nghiệp Hoài Đức",
    "h1": "Thiết Kế Website Thiết kế brochure doanh nghiệp Hoài Đức Chuẩn SEO",
    "angle": "website thiết kế brochure in ấn tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-brochure-doanh-nghiep-cam-pha",
    "keywordsMain": "thiết kế website thiết kế brochure doanh nghiệp Cẩm Phả",
    "h1": "Thiết Kế Website Thiết kế brochure doanh nghiệp Cẩm Phả Chuẩn SEO",
    "angle": "website thiết kế brochure in ấn tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-brochure-doanh-nghiep-ha-tien",
    "keywordsMain": "thiết kế website thiết kế brochure doanh nghiệp Hà Tiên",
    "h1": "Thiết Kế Website Thiết kế brochure doanh nghiệp Hà Tiên Chuẩn SEO",
    "angle": "website thiết kế brochure in ấn tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bot-loc-vung-tau",
    "keywordsMain": "thiết kế website phân phối bột lọc Vũng Tàu",
    "h1": "Thiết Kế Website Phân phối bột lọc Vũng Tàu Chuẩn SEO",
    "angle": "website phân phối nguyên liệu thực phẩm tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bot-loc-phan-rang",
    "keywordsMain": "thiết kế website phân phối bột lọc Phan Rang",
    "h1": "Thiết Kế Website Phân phối bột lọc Phan Rang Chuẩn SEO",
    "angle": "website phân phối nguyên liệu thực phẩm tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bot-loc-nha-trang",
    "keywordsMain": "thiết kế website phân phối bột lọc Nha Trang",
    "h1": "Thiết Kế Website Phân phối bột lọc Nha Trang Chuẩn SEO",
    "angle": "website phân phối nguyên liệu thực phẩm tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bot-loc-da-lat",
    "keywordsMain": "thiết kế website phân phối bột lọc Đà Lạt",
    "h1": "Thiết Kế Website Phân phối bột lọc Đà Lạt Chuẩn SEO",
    "angle": "website phân phối nguyên liệu thực phẩm tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bot-loc-cam-ranh",
    "keywordsMain": "thiết kế website phân phối bột lọc Cam Ranh",
    "h1": "Thiết Kế Website Phân phối bột lọc Cam Ranh Chuẩn SEO",
    "angle": "website phân phối nguyên liệu thực phẩm tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bot-loc-uong-bi",
    "keywordsMain": "thiết kế website phân phối bột lọc Uông Bí",
    "h1": "Thiết Kế Website Phân phối bột lọc Uông Bí Chuẩn SEO",
    "angle": "website phân phối nguyên liệu thực phẩm tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bot-loc-son-tay",
    "keywordsMain": "thiết kế website phân phối bột lọc Sơn Tây",
    "h1": "Thiết Kế Website Phân phối bột lọc Sơn Tây Chuẩn SEO",
    "angle": "website phân phối nguyên liệu thực phẩm tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bot-loc-hoai-duc",
    "keywordsMain": "thiết kế website phân phối bột lọc Hoài Đức",
    "h1": "Thiết Kế Website Phân phối bột lọc Hoài Đức Chuẩn SEO",
    "angle": "website phân phối nguyên liệu thực phẩm tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bot-loc-cam-pha",
    "keywordsMain": "thiết kế website phân phối bột lọc Cẩm Phả",
    "h1": "Thiết Kế Website Phân phối bột lọc Cẩm Phả Chuẩn SEO",
    "angle": "website phân phối nguyên liệu thực phẩm tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bot-loc-ha-tien",
    "keywordsMain": "thiết kế website phân phối bột lọc Hà Tiên",
    "h1": "Thiết Kế Website Phân phối bột lọc Hà Tiên Chuẩn SEO",
    "angle": "website phân phối nguyên liệu thực phẩm tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-thep-vung-tau",
    "keywordsMain": "thiết kế website xưởng sản xuất thép Vũng Tàu",
    "h1": "Thiết Kế Website Xưởng sản xuất thép Vũng Tàu Chuẩn SEO",
    "angle": "website xưởng thép xây dựng tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-thep-phan-rang",
    "keywordsMain": "thiết kế website xưởng sản xuất thép Phan Rang",
    "h1": "Thiết Kế Website Xưởng sản xuất thép Phan Rang Chuẩn SEO",
    "angle": "website xưởng thép xây dựng tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-thep-nha-trang",
    "keywordsMain": "thiết kế website xưởng sản xuất thép Nha Trang",
    "h1": "Thiết Kế Website Xưởng sản xuất thép Nha Trang Chuẩn SEO",
    "angle": "website xưởng thép xây dựng tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-thep-da-lat",
    "keywordsMain": "thiết kế website xưởng sản xuất thép Đà Lạt",
    "h1": "Thiết Kế Website Xưởng sản xuất thép Đà Lạt Chuẩn SEO",
    "angle": "website xưởng thép xây dựng tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-thep-cam-ranh",
    "keywordsMain": "thiết kế website xưởng sản xuất thép Cam Ranh",
    "h1": "Thiết Kế Website Xưởng sản xuất thép Cam Ranh Chuẩn SEO",
    "angle": "website xưởng thép xây dựng tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-thep-uong-bi",
    "keywordsMain": "thiết kế website xưởng sản xuất thép Uông Bí",
    "h1": "Thiết Kế Website Xưởng sản xuất thép Uông Bí Chuẩn SEO",
    "angle": "website xưởng thép xây dựng tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-thep-son-tay",
    "keywordsMain": "thiết kế website xưởng sản xuất thép Sơn Tây",
    "h1": "Thiết Kế Website Xưởng sản xuất thép Sơn Tây Chuẩn SEO",
    "angle": "website xưởng thép xây dựng tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-thep-hoai-duc",
    "keywordsMain": "thiết kế website xưởng sản xuất thép Hoài Đức",
    "h1": "Thiết Kế Website Xưởng sản xuất thép Hoài Đức Chuẩn SEO",
    "angle": "website xưởng thép xây dựng tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-thep-cam-pha",
    "keywordsMain": "thiết kế website xưởng sản xuất thép Cẩm Phả",
    "h1": "Thiết Kế Website Xưởng sản xuất thép Cẩm Phả Chuẩn SEO",
    "angle": "website xưởng thép xây dựng tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-thep-ha-tien",
    "keywordsMain": "thiết kế website xưởng sản xuất thép Hà Tiên",
    "h1": "Thiết Kế Website Xưởng sản xuất thép Hà Tiên Chuẩn SEO",
    "angle": "website xưởng thép xây dựng tại Hà Tiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-hoa-cam-tay-vung-tau",
    "keywordsMain": "thiết kế website dạy làm hoa cắm tay Vũng Tàu",
    "h1": "Thiết Kế Website Dạy làm hoa cắm tay Vũng Tàu Chuẩn SEO",
    "angle": "website học cắm hoa nghệ thuật tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-hoa-cam-tay-phan-rang",
    "keywordsMain": "thiết kế website dạy làm hoa cắm tay Phan Rang",
    "h1": "Thiết Kế Website Dạy làm hoa cắm tay Phan Rang Chuẩn SEO",
    "angle": "website học cắm hoa nghệ thuật tại Phan Rang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-hoa-cam-tay-nha-trang",
    "keywordsMain": "thiết kế website dạy làm hoa cắm tay Nha Trang",
    "h1": "Thiết Kế Website Dạy làm hoa cắm tay Nha Trang Chuẩn SEO",
    "angle": "website học cắm hoa nghệ thuật tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-hoa-cam-tay-da-lat",
    "keywordsMain": "thiết kế website dạy làm hoa cắm tay Đà Lạt",
    "h1": "Thiết Kế Website Dạy làm hoa cắm tay Đà Lạt Chuẩn SEO",
    "angle": "website học cắm hoa nghệ thuật tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-hoa-cam-tay-cam-ranh",
    "keywordsMain": "thiết kế website dạy làm hoa cắm tay Cam Ranh",
    "h1": "Thiết Kế Website Dạy làm hoa cắm tay Cam Ranh Chuẩn SEO",
    "angle": "website học cắm hoa nghệ thuật tại Cam Ranh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-hoa-cam-tay-uong-bi",
    "keywordsMain": "thiết kế website dạy làm hoa cắm tay Uông Bí",
    "h1": "Thiết Kế Website Dạy làm hoa cắm tay Uông Bí Chuẩn SEO",
    "angle": "website học cắm hoa nghệ thuật tại Uông Bí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-hoa-cam-tay-son-tay",
    "keywordsMain": "thiết kế website dạy làm hoa cắm tay Sơn Tây",
    "h1": "Thiết Kế Website Dạy làm hoa cắm tay Sơn Tây Chuẩn SEO",
    "angle": "website học cắm hoa nghệ thuật tại Sơn Tây",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-hoa-cam-tay-hoai-duc",
    "keywordsMain": "thiết kế website dạy làm hoa cắm tay Hoài Đức",
    "h1": "Thiết Kế Website Dạy làm hoa cắm tay Hoài Đức Chuẩn SEO",
    "angle": "website học cắm hoa nghệ thuật tại Hoài Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-hoa-cam-tay-cam-pha",
    "keywordsMain": "thiết kế website dạy làm hoa cắm tay Cẩm Phả",
    "h1": "Thiết Kế Website Dạy làm hoa cắm tay Cẩm Phả Chuẩn SEO",
    "angle": "website học cắm hoa nghệ thuật tại Cẩm Phả",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-hoa-cam-tay-ha-tien",
    "keywordsMain": "thiết kế website dạy làm hoa cắm tay Hà Tiên",
    "h1": "Thiết Kế Website Dạy làm hoa cắm tay Hà Tiên Chuẩn SEO",
    "angle": "website học cắm hoa nghệ thuật tại Hà Tiên",
    "niche": "strategy"
  }
];

/** B — 40 */
const B_EXTRA_WEB = [
  {
    "slug": "thiet-ke-website-xuong-ca-kho",
    "keywordsMain": "thiết kế website xưởng cá khô",
    "h1": "Thiết Kế Website Xưởng cá khô Chuyên Nghiệp Chuẩn SEO",
    "angle": "website nhà máy hải sản khô",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-sanh-tiec",
    "keywordsMain": "thiết kế website cho thuê sảnh tiệc",
    "h1": "Thiết Kế Website Cho thuê sảnh tiệc Chuyên Nghiệp Chuẩn SEO",
    "angle": "website cho thuê hội trường tiệc cưới",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-pha-che-tra-sua",
    "keywordsMain": "thiết kế website dạy pha chế trà sữa",
    "h1": "Thiết Kế Website Dạy pha chế trà sữa Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học trà sữa franchise",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-dau-lung",
    "keywordsMain": "thiết kế website phòng khám đau lưng",
    "h1": "Thiết Kế Website Phòng khám đau lưng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website điều trị thoát vị đĩa đệm",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cua-hang-thiet-bi-nha-khoa-b2b",
    "keywordsMain": "thiết kế website cửa hàng thiết bị nha khoa",
    "h1": "Thiết Kế Website Cửa hàng thiết bị nha khoa Chuyên Nghiệp Chuẩn SEO",
    "angle": "website máy nha khoa B2B",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-studio-thiet-ke-shop",
    "keywordsMain": "thiết kế website studio thiết kế shop",
    "h1": "Thiết Kế Website Studio thiết kế shop Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thiết kế cửa hàng retail",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-dau-nhat",
    "keywordsMain": "thiết kế website phân phối dầu nhật",
    "h1": "Thiết Kế Website Phân phối dầu nhật Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phân phối dầu ăn cao cấp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-flexo-bao-bi",
    "keywordsMain": "thiết kế website xưởng in flexo",
    "h1": "Thiết Kế Website Xưởng in flexo Chuyên Nghiệp Chuẩn SEO",
    "angle": "website in bao bì flexo",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-trung-tam-eyelash",
    "keywordsMain": "thiết kế website trung tâm eyelash",
    "h1": "Thiết Kế Website Trung tâm eyelash Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học nối mi chuyên nghiệp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-gan",
    "keywordsMain": "thiết kế website phòng khám gan",
    "h1": "Thiết Kế Website Phòng khám gan Chuyên Nghiệp Chuẩn SEO",
    "angle": "website điều trị gan nhiễm mỡ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-bao-chay",
    "keywordsMain": "thiết kế website lắp báo cháy",
    "h1": "Thiết Kế Website Lắp báo cháy Chuyên Nghiệp Chuẩn SEO",
    "angle": "website hệ thống PCCC",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cua-hang-golf",
    "keywordsMain": "thiết kế website cửa hàng golf",
    "h1": "Thiết Kế Website Cửa hàng golf Chuyên Nghiệp Chuẩn SEO",
    "angle": "website đồ chơi golf cao cấp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-dich-vu-hai-quan",
    "keywordsMain": "thiết kế website dịch vụ hải quan",
    "h1": "Thiết Kế Website Dịch vụ hải quan Chuyên Nghiệp Chuẩn SEO",
    "angle": "website khai báo hải quan XNK",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-tu-bep-acrylic",
    "keywordsMain": "thiết kế website dạy làm tủ bếp acrylic",
    "h1": "Thiết Kế Website Dạy làm tủ bếp acrylic Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học tủ bếp acrylic",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-di-ung",
    "keywordsMain": "thiết kế website phòng khám dị ứng",
    "h1": "Thiết Kế Website Phòng khám dị ứng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website da liễu dị ứng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-may-photocopy",
    "keywordsMain": "thiết kế website cho thuê máy photocopy",
    "h1": "Thiết Kế Website Cho thuê máy photocopy Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thuê máy in văn phòng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-brochure",
    "keywordsMain": "thiết kế website thiết kế brochure",
    "h1": "Thiết Kế Website Thiết kế brochure Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thiết kế brochure catalogue",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bot-loc-nuoc",
    "keywordsMain": "thiết kế website phân phối bột lọc nước",
    "h1": "Thiết Kế Website Phân phối bột lọc nước Chuyên Nghiệp Chuẩn SEO",
    "angle": "website nguyên liệu lọc nước",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-thep-xay-dung",
    "keywordsMain": "thiết kế website xưởng thép xây dựng",
    "h1": "Thiết Kế Website Xưởng thép xây dựng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thép hình xây dựng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-cam-hoa",
    "keywordsMain": "thiết kế website dạy cắm hoa",
    "h1": "Thiết Kế Website Dạy cắm hoa Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học florist",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-mut",
    "keywordsMain": "thiết kế website xưởng sản xuất mút",
    "h1": "Thiết Kế Website Xưởng sản xuất mút Chuyên Nghiệp Chuẩn SEO",
    "angle": "website xưởng mút đệm",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-phong-hop-coworking",
    "keywordsMain": "thiết kế website cho thuê phòng họp",
    "h1": "Thiết Kế Website Cho thuê phòng họp Chuyên Nghiệp Chuẩn SEO",
    "angle": "website coworking meeting room",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-cafe",
    "keywordsMain": "thiết kế website dạy làm cafe",
    "h1": "Thiết Kế Website Dạy làm cafe Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học barista",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-dau-co-vai",
    "keywordsMain": "thiết kế website trị đau cổ vai",
    "h1": "Thiết Kế Website Trị đau cổ vai Chuyên Nghiệp Chuẩn SEO",
    "angle": "website PHCN cổ vai gáy",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-lab-nha-khoa",
    "keywordsMain": "thiết kế website thiết bị lab nha khoa",
    "h1": "Thiết Kế Website Thiết bị lab nha khoa Chuyên Nghiệp Chuẩn SEO",
    "angle": "website lab nha khoa",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-showroom-oto",
    "keywordsMain": "thiết kế website thiết kế showroom ô tô",
    "h1": "Thiết Kế Website Thiết kế showroom ô tô Chuyên Nghiệp Chuẩn SEO",
    "angle": "website showroom xe hơi",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-mam-tom",
    "keywordsMain": "thiết kế website phân phối mắm tôm",
    "h1": "Thiết Kế Website Phân phối mắm tôm Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phân phối mắm tôm Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-lua",
    "keywordsMain": "thiết kế website xưởng in lụa",
    "h1": "Thiết Kế Website Xưởng in lụa Chuyên Nghiệp Chuẩn SEO",
    "angle": "website in lụa áo thun",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-phun-xam",
    "keywordsMain": "thiết kế website dạy làm phun xăm",
    "h1": "Thiết Kế Website Dạy làm phun xăm Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học phun xăm thẩm mỹ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-gout",
    "keywordsMain": "thiết kế website trị gout",
    "h1": "Thiết Kế Website Trị gout Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phòng khám khớp gout",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-camera-an-ninh",
    "keywordsMain": "thiết kế website lắp camera an ninh",
    "h1": "Thiết Kế Website Lắp camera an ninh Chuyên Nghiệp Chuẩn SEO",
    "angle": "website camera giám sát",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cua-hang-tennis",
    "keywordsMain": "thiết kế website cửa hàng tennis",
    "h1": "Thiết Kế Website Cửa hàng tennis Chuyên Nghiệp Chuẩn SEO",
    "angle": "website vợt tennis cao cấp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-xuat-khau",
    "keywordsMain": "thiết kế website tư vấn xuất khẩu",
    "h1": "Thiết Kế Website Tư vấn xuất khẩu Chuyên Nghiệp Chuẩn SEO",
    "angle": "website tư vấn XNK",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-rem-van-phong",
    "keywordsMain": "thiết kế website dạy làm rèm văn phòng",
    "h1": "Thiết Kế Website Dạy làm rèm văn phòng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học rèm cửa VP",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-viem-khop",
    "keywordsMain": "thiết kế website trị viêm khớp",
    "h1": "Thiết Kế Website Trị viêm khớp Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phòng khám khớp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-am-thanh-su-kien",
    "keywordsMain": "thiết kế website cho thuê âm thanh",
    "h1": "Thiết Kế Website Cho thuê âm thanh Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thuê loa sự kiện",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-menu-nha-hang",
    "keywordsMain": "thiết kế website thiết kế menu nhà hàng",
    "h1": "Thiết Kế Website Thiết kế menu nhà hàng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thiết kế menu F&B",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bot-ngot",
    "keywordsMain": "thiết kế website phân phối bột ngọt",
    "h1": "Thiết Kế Website Phân phối bột ngọt Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phân phối gia vị",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-co-khi",
    "keywordsMain": "thiết kế website xưởng cơ khí",
    "h1": "Thiết Kế Website Xưởng cơ khí Chuyên Nghiệp Chuẩn SEO",
    "angle": "website gia công cơ khí chính xác",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-soap-handmade",
    "keywordsMain": "thiết kế website dạy làm soap handmade",
    "h1": "Thiết Kế Website Dạy làm soap handmade Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học làm xà phòng",
    "niche": "strategy"
  }
];

/** C — 40 */
const C_PRICING = [
  {
    "slug": "bao-gia-thiet-ke-website-ca-kho",
    "keywordsMain": "báo giá thiết kế website cá khô",
    "h1": "Báo Giá Thiết Kế Website Cá khô 2026",
    "angle": "giá website xưởng cá khô",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-cho-thue-sanh",
    "keywordsMain": "báo giá thiết kế website cho thuê sảnh",
    "h1": "Báo Giá Thiết Kế Website Cho thuê sảnh 2026",
    "angle": "giá website cho thuê sảnh",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-day-tra-sua",
    "keywordsMain": "báo giá thiết kế website dạy trà sữa",
    "h1": "Báo Giá Thiết Kế Website Dạy trà sữa 2026",
    "angle": "giá website học trà sữa",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-dau-lung",
    "keywordsMain": "báo giá thiết kế website đau lưng",
    "h1": "Báo Giá Thiết Kế Website Đau lưng 2026",
    "angle": "giá website phòng đau lưng",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-thiet-bi-nha-khoa-b2b",
    "keywordsMain": "báo giá thiết kế website thiết bị nha khoa",
    "h1": "Báo Giá Thiết Kế Website Thiết bị nha khoa 2026",
    "angle": "giá website thiết bị nha khoa",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-thiet-ke-shop",
    "keywordsMain": "báo giá thiết kế website thiết kế shop",
    "h1": "Báo Giá Thiết Kế Website Thiết kế shop 2026",
    "angle": "giá website thiết kế shop",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-phan-phoi-dau-an",
    "keywordsMain": "báo giá thiết kế website phân phối dầu ăn",
    "h1": "Báo Giá Thiết Kế Website Phân phối dầu ăn 2026",
    "angle": "giá website phân phối dầu ăn",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-in-flexo-bao-bi",
    "keywordsMain": "báo giá thiết kế website in flexo",
    "h1": "Báo Giá Thiết Kế Website In flexo 2026",
    "angle": "giá website in flexo",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-eyelash",
    "keywordsMain": "báo giá thiết kế website eyelash",
    "h1": "Báo Giá Thiết Kế Website Eyelash 2026",
    "angle": "giá website học nối mi",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-gan-nhiem-mo",
    "keywordsMain": "báo giá thiết kế website gan nhiễm mỡ",
    "h1": "Báo Giá Thiết Kế Website Gan nhiễm mỡ 2026",
    "angle": "giá website phòng gan",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-bao-chay",
    "keywordsMain": "báo giá thiết kế website báo cháy",
    "h1": "Báo Giá Thiết Kế Website Báo cháy 2026",
    "angle": "giá website lắp báo cháy",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-golf",
    "keywordsMain": "báo giá thiết kế website golf",
    "h1": "Báo Giá Thiết Kế Website Golf 2026",
    "angle": "giá website cửa hàng golf",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-hai-quan",
    "keywordsMain": "báo giá thiết kế website hải quan",
    "h1": "Báo Giá Thiết Kế Website Hải quan 2026",
    "angle": "giá website dịch vụ hải quan",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-tu-bep",
    "keywordsMain": "báo giá thiết kế website tủ bếp",
    "h1": "Báo Giá Thiết Kế Website Tủ bếp 2026",
    "angle": "giá website học tủ bếp",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-di-ung-da",
    "keywordsMain": "báo giá thiết kế website dị ứng da",
    "h1": "Báo Giá Thiết Kế Website Dị ứng da 2026",
    "angle": "giá website trị dị ứng da",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-thue-may-in-van-phong",
    "keywordsMain": "báo giá thiết kế website thuê máy in",
    "h1": "Báo Giá Thiết Kế Website Thuê máy in 2026",
    "angle": "giá website thuê máy in",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-brochure",
    "keywordsMain": "báo giá thiết kế website brochure",
    "h1": "Báo Giá Thiết Kế Website Brochure 2026",
    "angle": "giá website thiết kế brochure",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-bot-loc",
    "keywordsMain": "báo giá thiết kế website bột lọc",
    "h1": "Báo Giá Thiết Kế Website Bột lọc 2026",
    "angle": "giá website phân phối bột lọc",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-xuong-thep",
    "keywordsMain": "báo giá thiết kế website xưởng thép",
    "h1": "Báo Giá Thiết Kế Website Xưởng thép 2026",
    "angle": "giá website xưởng thép",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-cam-hoa",
    "keywordsMain": "báo giá thiết kế website cắm hoa",
    "h1": "Báo Giá Thiết Kế Website Cắm hoa 2026",
    "angle": "giá website học cắm hoa",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-xuong-mut",
    "keywordsMain": "báo giá thiết kế website xưởng mút",
    "h1": "Báo Giá Thiết Kế Website Xưởng mút 2026",
    "angle": "giá website xưởng mút",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-phong-hop",
    "keywordsMain": "báo giá thiết kế website phòng họp",
    "h1": "Báo Giá Thiết Kế Website Phòng họp 2026",
    "angle": "giá website cho thuê phòng họp",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-barista",
    "keywordsMain": "báo giá thiết kế website barista",
    "h1": "Báo Giá Thiết Kế Website Barista 2026",
    "angle": "giá website học barista",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-co-vai",
    "keywordsMain": "báo giá thiết kế website cổ vai",
    "h1": "Báo Giá Thiết Kế Website Cổ vai 2026",
    "angle": "giá website trị cổ vai",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-lab-nha-khoa",
    "keywordsMain": "báo giá thiết kế website lab nha khoa",
    "h1": "Báo Giá Thiết Kế Website Lab nha khoa 2026",
    "angle": "giá website lab nha khoa",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-showroom-oto-xe-hoi",
    "keywordsMain": "báo giá thiết kế website showroom ô tô",
    "h1": "Báo Giá Thiết Kế Website Showroom ô tô 2026",
    "angle": "giá website showroom ô tô",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-mam-tom",
    "keywordsMain": "báo giá thiết kế website mắm tôm",
    "h1": "Báo Giá Thiết Kế Website Mắm tôm 2026",
    "angle": "giá website phân phối mắm tôm",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-in-lua",
    "keywordsMain": "báo giá thiết kế website in lụa",
    "h1": "Báo Giá Thiết Kế Website In lụa 2026",
    "angle": "giá website in lụa",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-phun-xam",
    "keywordsMain": "báo giá thiết kế website phun xăm",
    "h1": "Báo Giá Thiết Kế Website Phun xăm 2026",
    "angle": "giá website học phun xăm",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-gout",
    "keywordsMain": "báo giá thiết kế website gout",
    "h1": "Báo Giá Thiết Kế Website Gout 2026",
    "angle": "giá website trị gout",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-camera-an-ninh",
    "keywordsMain": "báo giá thiết kế website camera an ninh",
    "h1": "Báo Giá Thiết Kế Website Camera an ninh 2026",
    "angle": "giá website lắp camera",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-tennis",
    "keywordsMain": "báo giá thiết kế website tennis",
    "h1": "Báo Giá Thiết Kế Website Tennis 2026",
    "angle": "giá website cửa hàng tennis",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-xuat-khau",
    "keywordsMain": "báo giá thiết kế website xuất khẩu",
    "h1": "Báo Giá Thiết Kế Website Xuất khẩu 2026",
    "angle": "giá website tư vấn XNK",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-rem-van-phong",
    "keywordsMain": "báo giá thiết kế website rèm văn phòng",
    "h1": "Báo Giá Thiết Kế Website Rèm văn phòng 2026",
    "angle": "giá website rèm văn phòng",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-viem-khop",
    "keywordsMain": "báo giá thiết kế website viêm khớp",
    "h1": "Báo Giá Thiết Kế Website Viêm khớp 2026",
    "angle": "giá website trị viêm khớp",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-thue-am-thanh",
    "keywordsMain": "báo giá thiết kế website thuê âm thanh",
    "h1": "Báo Giá Thiết Kế Website Thuê âm thanh 2026",
    "angle": "giá website thuê âm thanh",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-menu-nha-hang",
    "keywordsMain": "báo giá thiết kế website menu nhà hàng",
    "h1": "Báo Giá Thiết Kế Website Menu nhà hàng 2026",
    "angle": "giá website thiết kế menu",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-bot-ngot",
    "keywordsMain": "báo giá thiết kế website bột ngọt",
    "h1": "Báo Giá Thiết Kế Website Bột ngọt 2026",
    "angle": "giá website phân phối bột ngọt",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-co-khi-chinh-xac",
    "keywordsMain": "báo giá thiết kế website cơ khí",
    "h1": "Báo Giá Thiết Kế Website Cơ khí 2026",
    "angle": "giá website xưởng cơ khí",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-soap-handmade",
    "keywordsMain": "báo giá thiết kế website soap handmade",
    "h1": "Báo Giá Thiết Kế Website Soap handmade 2026",
    "angle": "giá website học làm xà phòng",
    "niche": "strategy"
  }
];

/** D — 35 */
const D_LOCAL_SEO = [
  {
    "slug": "local-seo-google-business-profile",
    "keywordsMain": "local seo Google Business Profile",
    "h1": "Local SEO Google Business Profile — Tăng Hiển Thị Địa Phương",
    "angle": "tối ưu GBP local pack",
    "niche": "seo"
  },
  {
    "slug": "local-seo-nap-consistency",
    "keywordsMain": "local seo NAP consistency",
    "h1": "Local SEO NAP consistency — Tăng Hiển Thị Địa Phương",
    "angle": "chuẩn hóa tên địa chỉ SĐT",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-citation",
    "keywordsMain": "local seo local citation",
    "h1": "Local SEO Local citation — Tăng Hiển Thị Địa Phương",
    "angle": "danh bạ địa phương citation",
    "niche": "seo"
  },
  {
    "slug": "local-seo-maps-ranking-factor",
    "keywordsMain": "local seo Maps ranking factor",
    "h1": "Local SEO Maps ranking factor — Tăng Hiển Thị Địa Phương",
    "angle": "yếu tố xếp hạng Google Maps",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-keyword-research",
    "keywordsMain": "local seo local keyword research",
    "h1": "Local SEO Local keyword research — Tăng Hiển Thị Địa Phương",
    "angle": "tìm từ khóa địa phương",
    "niche": "seo"
  },
  {
    "slug": "local-seo-geo-modifier-content",
    "keywordsMain": "local seo geo modifier content",
    "h1": "Local SEO Geo modifier content — Tăng Hiển Thị Địa Phương",
    "angle": "nội dung gắn địa danh",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-landing-page",
    "keywordsMain": "local seo local landing page",
    "h1": "Local SEO Local landing page — Tăng Hiển Thị Địa Phương",
    "angle": "trang đích SEO địa phương",
    "niche": "seo"
  },
  {
    "slug": "local-seo-service-area-page",
    "keywordsMain": "local seo service area page",
    "h1": "Local SEO Service area page — Tăng Hiển Thị Địa Phương",
    "angle": "trang khu vực phục vụ",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-schema-markup",
    "keywordsMain": "local seo local schema markup",
    "h1": "Local SEO Local schema markup — Tăng Hiển Thị Địa Phương",
    "angle": "schema LocalBusiness JSON-LD",
    "niche": "seo"
  },
  {
    "slug": "local-seo-review-generation",
    "keywordsMain": "local seo review generation",
    "h1": "Local SEO Review generation — Tăng Hiển Thị Địa Phương",
    "angle": "chiến lược thu review local",
    "niche": "seo"
  },
  {
    "slug": "local-seo-maps-photo-optimize",
    "keywordsMain": "local seo Maps photo optimize",
    "h1": "Local SEO Maps photo optimize — Tăng Hiển Thị Địa Phương",
    "angle": "tối ưu ảnh Google Maps",
    "niche": "seo"
  },
  {
    "slug": "local-seo-gbp-post-schedule",
    "keywordsMain": "local seo GBP post schedule",
    "h1": "Local SEO GBP post schedule — Tăng Hiển Thị Địa Phương",
    "angle": "đăng bài Google Business Profile",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-backlink",
    "keywordsMain": "local seo local backlink",
    "h1": "Local SEO Local backlink — Tăng Hiển Thị Địa Phương",
    "angle": "backlink từ báo địa phương",
    "niche": "seo"
  },
  {
    "slug": "local-seo-chamber-commerce-listing",
    "keywordsMain": "local seo chamber commerce listing",
    "h1": "Local SEO Chamber commerce listing — Tăng Hiển Thị Địa Phương",
    "angle": "danh bạ hiệp hội doanh nghiệp",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-pr-campaign",
    "keywordsMain": "local seo local PR campaign",
    "h1": "Local SEO Local PR campaign — Tăng Hiển Thị Địa Phương",
    "angle": "PR địa phương tăng uy tín",
    "niche": "seo"
  },
  {
    "slug": "local-seo-multi-location-seo",
    "keywordsMain": "local seo multi location SEO",
    "h1": "Local SEO Multi location SEO — Tăng Hiển Thị Địa Phương",
    "angle": "SEO nhiều chi nhánh",
    "niche": "seo"
  },
  {
    "slug": "local-seo-franchise-local-seo",
    "keywordsMain": "local seo franchise local SEO",
    "h1": "Local SEO Franchise local SEO — Tăng Hiển Thị Địa Phương",
    "angle": "SEO franchise đa điểm",
    "niche": "seo"
  },
  {
    "slug": "local-seo-near-me-optimization",
    "keywordsMain": "local seo near me optimization",
    "h1": "Local SEO Near me optimization — Tăng Hiển Thị Địa Phương",
    "angle": "tối ưu từ khóa gần tôi",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-competitor-audit",
    "keywordsMain": "local seo local competitor audit",
    "h1": "Local SEO Local competitor audit — Tăng Hiển Thị Địa Phương",
    "angle": "audit đối thủ Maps local",
    "niche": "seo"
  },
  {
    "slug": "local-seo-maps-category-optimize",
    "keywordsMain": "local seo Maps category optimize",
    "h1": "Local SEO Maps category optimize — Tăng Hiển Thị Địa Phương",
    "angle": "chọn category GBP đúng",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-content-calendar",
    "keywordsMain": "local seo local content calendar",
    "h1": "Local SEO Local content calendar — Tăng Hiển Thị Địa Phương",
    "angle": "lịch nội dung địa phương",
    "niche": "seo"
  },
  {
    "slug": "local-seo-voice-search-local",
    "keywordsMain": "local seo voice search local",
    "h1": "Local SEO Voice search local — Tăng Hiển Thị Địa Phương",
    "angle": "tối ưu tìm kiếm giọng nói local",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-link-building",
    "keywordsMain": "local seo local link building",
    "h1": "Local SEO Local link building — Tăng Hiển Thị Địa Phương",
    "angle": "xây link địa phương",
    "niche": "seo"
  },
  {
    "slug": "local-seo-gbp-qa-optimize",
    "keywordsMain": "local seo GBP Q&A optimize",
    "h1": "Local SEO GBP Q&A optimize — Tăng Hiển Thị Địa Phương",
    "angle": "tối ưu mục hỏi đáp Maps",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-pack-ranking",
    "keywordsMain": "local seo local pack ranking",
    "h1": "Local SEO Local pack ranking — Tăng Hiển Thị Địa Phương",
    "angle": "lên local pack top 3",
    "niche": "seo"
  },
  {
    "slug": "local-seo-city-page-seo",
    "keywordsMain": "local seo city page SEO",
    "h1": "Local SEO City page SEO — Tăng Hiển Thị Địa Phương",
    "angle": "trang thành phố programmatic",
    "niche": "seo"
  },
  {
    "slug": "local-seo-district-page-seo",
    "keywordsMain": "local seo district page SEO",
    "h1": "Local SEO District page SEO — Tăng Hiển Thị Địa Phương",
    "angle": "trang quận huyện SEO",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-sitemap",
    "keywordsMain": "local seo local sitemap",
    "h1": "Local SEO Local sitemap — Tăng Hiển Thị Địa Phương",
    "angle": "sitemap trang địa phương",
    "niche": "seo"
  },
  {
    "slug": "local-seo-maps-utm-tracking",
    "keywordsMain": "local seo Maps UTM tracking",
    "h1": "Local SEO Maps UTM tracking — Tăng Hiển Thị Địa Phương",
    "angle": "đo traffic từ Google Maps",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-seo-audit",
    "keywordsMain": "local seo local SEO audit",
    "h1": "Local SEO Local SEO audit — Tăng Hiển Thị Địa Phương",
    "angle": "audit local SEO toàn diện",
    "niche": "seo"
  },
  {
    "slug": "local-seo-neighborhood-keyword",
    "keywordsMain": "local seo neighborhood keyword",
    "h1": "Local SEO Neighborhood keyword — Tăng Hiển Thị Địa Phương",
    "angle": "từ khóa khu phố",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-service-ads",
    "keywordsMain": "local seo local service ads",
    "h1": "Local SEO Local service ads — Tăng Hiển Thị Địa Phương",
    "angle": "Google Local Services Ads",
    "niche": "seo"
  },
  {
    "slug": "local-seo-maps-description-optimize",
    "keywordsMain": "local seo Maps description optimize",
    "h1": "Local SEO Maps description optimize — Tăng Hiển Thị Địa Phương",
    "angle": "mô tả GBP chuẩn SEO",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-review-response",
    "keywordsMain": "local seo local review response",
    "h1": "Local SEO Local review response — Tăng Hiển Thị Địa Phương",
    "angle": "phản hồi review Maps",
    "niche": "seo"
  },
  {
    "slug": "local-seo-local-seo-reporting",
    "keywordsMain": "local seo local SEO reporting",
    "h1": "Local SEO Local SEO reporting — Tăng Hiển Thị Địa Phương",
    "angle": "báo cáo KPI local SEO",
    "niche": "seo"
  }
];

/** E — 30 */
const E_ZALO_OA = [
  {
    "slug": "zalo-oa-spa",
    "keywordsMain": "zalo official account spa",
    "h1": "Zalo OA Spa — Vận Hành Chuẩn",
    "angle": "Zalo OA spa đặt lịch ZNS",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-nha-hang",
    "keywordsMain": "zalo official account nhà hàng",
    "h1": "Zalo OA Nhà hàng — Vận Hành Chuẩn",
    "angle": "Zalo OA nhà hàng đặt bàn",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-bat-dong-san",
    "keywordsMain": "zalo official account bất động sản",
    "h1": "Zalo OA Bất động sản — Vận Hành Chuẩn",
    "angle": "Zalo OA BĐS lead form",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-phong-kham",
    "keywordsMain": "zalo official account phòng khám",
    "h1": "Zalo OA Phòng khám — Vận Hành Chuẩn",
    "angle": "Zalo OA phòng khám nhắc lịch",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-gym",
    "keywordsMain": "zalo official account gym",
    "h1": "Zalo OA Gym — Vận Hành Chuẩn",
    "angle": "Zalo OA gym membership",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-nha-khoa",
    "keywordsMain": "zalo official account nha khoa",
    "h1": "Zalo OA Nha khoa — Vận Hành Chuẩn",
    "angle": "Zalo OA nha khoa tái khám",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-my-pham",
    "keywordsMain": "zalo official account mỹ phẩm",
    "h1": "Zalo OA Mỹ phẩm — Vận Hành Chuẩn",
    "angle": "Zalo OA shop mỹ phẩm",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-giao-duc",
    "keywordsMain": "zalo official account giáo dục",
    "h1": "Zalo OA Giáo dục — Vận Hành Chuẩn",
    "angle": "Zalo OA trung tâm học",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-xay-dung",
    "keywordsMain": "zalo official account xây dựng",
    "h1": "Zalo OA Xây dựng — Vận Hành Chuẩn",
    "angle": "Zalo OA nhà thầu báo giá",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-noi-that",
    "keywordsMain": "zalo official account nội thất",
    "h1": "Zalo OA Nội thất — Vận Hành Chuẩn",
    "angle": "Zalo OA nội thất catalog",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-dien-may",
    "keywordsMain": "zalo official account điện máy",
    "h1": "Zalo OA Điện máy — Vận Hành Chuẩn",
    "angle": "Zalo OA điện máy khuyến mãi",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-o-to",
    "keywordsMain": "zalo official account ô tô",
    "h1": "Zalo OA Ô tô — Vận Hành Chuẩn",
    "angle": "Zalo OA đại lý xe",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-bao-hiem",
    "keywordsMain": "zalo official account bảo hiểm",
    "h1": "Zalo OA Bảo hiểm — Vận Hành Chuẩn",
    "angle": "Zalo OA bảo hiểm tư vấn",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-luat-su",
    "keywordsMain": "zalo official account luật sư",
    "h1": "Zalo OA Luật sư — Vận Hành Chuẩn",
    "angle": "Zalo OA văn phòng luật",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-ke-toan",
    "keywordsMain": "zalo official account kế toán",
    "h1": "Zalo OA Kế toán — Vận Hành Chuẩn",
    "angle": "Zalo OA dịch vụ kế toán",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-logistics",
    "keywordsMain": "zalo official account logistics",
    "h1": "Zalo OA Logistics — Vận Hành Chuẩn",
    "angle": "Zalo OA logistics B2B",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-du-lich",
    "keywordsMain": "zalo official account du lịch",
    "h1": "Zalo OA Du lịch — Vận Hành Chuẩn",
    "angle": "Zalo OA tour du lịch",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-fnb-chain",
    "keywordsMain": "zalo official account F&B chain",
    "h1": "Zalo OA F&B chain — Vận Hành Chuẩn",
    "angle": "Zalo OA chuỗi F&B",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-tham-my",
    "keywordsMain": "zalo official account thẩm mỹ",
    "h1": "Zalo OA Thẩm mỹ — Vận Hành Chuẩn",
    "angle": "Zalo OA thẩm mỹ viện",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-ecommerce",
    "keywordsMain": "zalo official account ecommerce",
    "h1": "Zalo OA Ecommerce — Vận Hành Chuẩn",
    "angle": "Zalo OA shop online",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-khoa-hoc",
    "keywordsMain": "zalo official account khóa học",
    "h1": "Zalo OA Khóa học — Vận Hành Chuẩn",
    "angle": "Zalo OA khóa học online",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-coworking",
    "keywordsMain": "zalo official account coworking",
    "h1": "Zalo OA Coworking — Vận Hành Chuẩn",
    "angle": "Zalo OA coworking space",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-franchise",
    "keywordsMain": "zalo official account franchise",
    "h1": "Zalo OA Franchise — Vận Hành Chuẩn",
    "angle": "Zalo OA nhượng quyền",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-y-te",
    "keywordsMain": "zalo official account y tế",
    "h1": "Zalo OA Y tế — Vận Hành Chuẩn",
    "angle": "Zalo OA phòng khám đa khoa",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-bat-dong-san-cho-thue",
    "keywordsMain": "zalo official account bất động sản cho thuê",
    "h1": "Zalo OA Bất động sản cho thuê — Vận Hành Chuẩn",
    "angle": "Zalo OA cho thuê căn hộ",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-dich-vu-sua-chua",
    "keywordsMain": "zalo official account dịch vụ sửa chữa",
    "h1": "Zalo OA Dịch vụ sửa chữa — Vận Hành Chuẩn",
    "angle": "Zalo OA sửa chữa tại nhà",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-phan-mem-saas",
    "keywordsMain": "zalo official account phần mềm SaaS",
    "h1": "Zalo OA Phần mềm SaaS — Vận Hành Chuẩn",
    "angle": "Zalo OA SaaS demo",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-event",
    "keywordsMain": "zalo official account sự kiện",
    "h1": "Zalo OA Sự kiện — Vận Hành Chuẩn",
    "angle": "Zalo OA tổ chức sự kiện",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-mam-non",
    "keywordsMain": "zalo official account mầm non",
    "h1": "Zalo OA Mầm non — Vận Hành Chuẩn",
    "angle": "Zalo OA trường mầm non",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-anh-ngu",
    "keywordsMain": "zalo official account anh ngữ",
    "h1": "Zalo OA Anh ngữ — Vận Hành Chuẩn",
    "angle": "Zalo OA trung tâm anh ngữ",
    "niche": "strategy"
  }
];

/** F — 25 */
const F_UX_UI = [
  {
    "slug": "thiet-ke-ux-ui-landing-page",
    "keywordsMain": "thiết kế UX UI landing page",
    "h1": "Thiết Kế UX UI Landing page — Trải Nghiệm Người Dùng",
    "angle": "UX landing page chuyển đổi",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-trang-chu",
    "keywordsMain": "thiết kế UX UI trang chủ",
    "h1": "Thiết Kế UX UI Trang chủ — Trải Nghiệm Người Dùng",
    "angle": "UX homepage doanh nghiệp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-ecommerce",
    "keywordsMain": "thiết kế UX UI ecommerce",
    "h1": "Thiết Kế UX UI Ecommerce — Trải Nghiệm Người Dùng",
    "angle": "UX shop online conversion",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-mobile-app-web",
    "keywordsMain": "thiết kế UX UI mobile app web",
    "h1": "Thiết Kế UX UI Mobile app web — Trải Nghiệm Người Dùng",
    "angle": "UX responsive mobile first",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-dashboard-admin",
    "keywordsMain": "thiết kế UX UI dashboard admin",
    "h1": "Thiết Kế UX UI Dashboard admin — Trải Nghiệm Người Dùng",
    "angle": "UX dashboard quản trị",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-form-dang-ky",
    "keywordsMain": "thiết kế UX UI form đăng ký",
    "h1": "Thiết Kế UX UI Form đăng ký — Trải Nghiệm Người Dùng",
    "angle": "UX form thu lead",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-checkout",
    "keywordsMain": "thiết kế UX UI checkout",
    "h1": "Thiết Kế UX UI Checkout — Trải Nghiệm Người Dùng",
    "angle": "UX checkout giảm bỏ giỏ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-navigation-menu",
    "keywordsMain": "thiết kế UX UI navigation menu",
    "h1": "Thiết Kế UX UI Navigation menu — Trải Nghiệm Người Dùng",
    "angle": "UX menu điều hướng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-product-page",
    "keywordsMain": "thiết kế UX UI product page",
    "h1": "Thiết Kế UX UI Product page — Trải Nghiệm Người Dùng",
    "angle": "UX trang sản phẩm",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-blog-reading",
    "keywordsMain": "thiết kế UX UI blog reading",
    "h1": "Thiết Kế UX UI Blog reading — Trải Nghiệm Người Dùng",
    "angle": "UX đọc blog dài",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-pricing-page",
    "keywordsMain": "thiết kế UX UI pricing page",
    "h1": "Thiết Kế UX UI Pricing page — Trải Nghiệm Người Dùng",
    "angle": "UX trang bảng giá SaaS",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-onboarding-saas",
    "keywordsMain": "thiết kế UX UI onboarding SaaS",
    "h1": "Thiết Kế UX UI Onboarding SaaS — Trải Nghiệm Người Dùng",
    "angle": "UX onboarding người dùng mới",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-search-website",
    "keywordsMain": "thiết kế UX UI search website",
    "h1": "Thiết Kế UX UI Search website — Trải Nghiệm Người Dùng",
    "angle": "UX tìm kiếm nội bộ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-filter-ecommerce",
    "keywordsMain": "thiết kế UX UI filter ecommerce",
    "h1": "Thiết Kế UX UI Filter ecommerce — Trải Nghiệm Người Dùng",
    "angle": "UX bộ lọc sản phẩm",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-micro-interaction",
    "keywordsMain": "thiết kế UX UI micro interaction",
    "h1": "Thiết Kế UX UI Micro interaction — Trải Nghiệm Người Dùng",
    "angle": "UX micro animation",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-dark-mode",
    "keywordsMain": "thiết kế UX UI dark mode",
    "h1": "Thiết Kế UX UI Dark mode — Trải Nghiệm Người Dùng",
    "angle": "UX dark mode website",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-accessibility-wcag",
    "keywordsMain": "thiết kế UX UI accessibility WCAG",
    "h1": "Thiết Kế UX UI Accessibility WCAG — Trải Nghiệm Người Dùng",
    "angle": "UX accessibility chuẩn",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-loading-skeleton",
    "keywordsMain": "thiết kế UX UI loading skeleton",
    "h1": "Thiết Kế UX UI Loading skeleton — Trải Nghiệm Người Dùng",
    "angle": "UX skeleton loading state",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-error-page-404",
    "keywordsMain": "thiết kế UX UI error page 404",
    "h1": "Thiết Kế UX UI Error page 404 — Trải Nghiệm Người Dùng",
    "angle": "UX trang lỗi 404 thân thiện",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-trust-signal",
    "keywordsMain": "thiết kế UX UI trust signal",
    "h1": "Thiết Kế UX UI Trust signal — Trải Nghiệm Người Dùng",
    "angle": "UX badge uy tín",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-hero-section",
    "keywordsMain": "thiết kế UX UI hero section",
    "h1": "Thiết Kế UX UI Hero section — Trải Nghiệm Người Dùng",
    "angle": "UX hero banner above fold",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-footer-website",
    "keywordsMain": "thiết kế UX UI footer website",
    "h1": "Thiết Kế UX UI Footer website — Trải Nghiệm Người Dùng",
    "angle": "UX footer navigation",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-mega-menu",
    "keywordsMain": "thiết kế UX UI mega menu",
    "h1": "Thiết Kế UX UI Mega menu — Trải Nghiệm Người Dùng",
    "angle": "UX mega menu ecommerce",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-sticky-header",
    "keywordsMain": "thiết kế UX UI sticky header",
    "h1": "Thiết Kế UX UI Sticky header — Trải Nghiệm Người Dùng",
    "angle": "UX header cố định scroll",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-ux-ui-cta-placement",
    "keywordsMain": "thiết kế UX UI CTA placement",
    "h1": "Thiết Kế UX UI CTA placement — Trải Nghiệm Người Dùng",
    "angle": "UX vị trí nút CTA",
    "niche": "strategy"
  }
];

/** G — 30 */
const G_MAPS = [
  {
    "slug": "seo-google-maps-spa-bien-vung-tau",
    "keywordsMain": "seo google maps spa Vũng Tàu",
    "h1": "SEO Google Maps Spa Vũng Tàu",
    "angle": "Maps spa Vũng Tàu biển",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-hang-phan-rang",
    "keywordsMain": "seo google maps nhà hàng Phan Rang",
    "h1": "SEO Google Maps Nhà hàng Phan Rang",
    "angle": "Maps nhà hàng Phan Rang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-khach-san-nha-trang",
    "keywordsMain": "seo google maps khách sạn Nha Trang",
    "h1": "SEO Google Maps Khách sạn Nha Trang",
    "angle": "Maps khách sạn Nha Trang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-implant-da-lat",
    "keywordsMain": "seo google maps nha khoa Đà Lạt",
    "h1": "SEO Google Maps Nha khoa Đà Lạt",
    "angle": "Maps nha khoa Đà Lạt",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-gym-cam-ranh",
    "keywordsMain": "seo google maps gym Cam Ranh",
    "h1": "SEO Google Maps Gym Cam Ranh",
    "angle": "Maps gym Cam Ranh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-uong-bi",
    "keywordsMain": "seo google maps thẩm mỹ Uông Bí",
    "h1": "SEO Google Maps Thẩm mỹ Uông Bí",
    "angle": "Maps thẩm mỹ Uông Bí",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-bat-dong-san-son-tay",
    "keywordsMain": "seo google maps bất động sản Sơn Tây",
    "h1": "SEO Google Maps Bất động sản Sơn Tây",
    "angle": "Maps BĐS Sơn Tây",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-noi-that-hoai-duc",
    "keywordsMain": "seo google maps nội thất Hoài Đức",
    "h1": "SEO Google Maps Nội thất Hoài Đức",
    "angle": "Maps nội thất Hoài Đức",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-cam-pha",
    "keywordsMain": "seo google maps xây dựng Cẩm Phả",
    "h1": "SEO Google Maps Xây dựng Cẩm Phả",
    "angle": "Maps nhà thầu Cẩm Phả",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-ha-tien",
    "keywordsMain": "seo google maps phòng khám Hà Tiên",
    "h1": "SEO Google Maps Phòng khám Hà Tiên",
    "angle": "Maps phòng khám Hà Tiên",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-du-lich-vung-tau",
    "keywordsMain": "seo google maps du lịch Vũng Tàu",
    "h1": "SEO Google Maps Du lịch Vũng Tàu",
    "angle": "Maps tour Vũng Tàu",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-phan-rang",
    "keywordsMain": "seo google maps mỹ phẩm Phan Rang",
    "h1": "SEO Google Maps Mỹ phẩm Phan Rang",
    "angle": "Maps mỹ phẩm Phan Rang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-dien-may-nha-trang",
    "keywordsMain": "seo google maps điện máy Nha Trang",
    "h1": "SEO Google Maps Điện máy Nha Trang",
    "angle": "Maps điện máy Nha Trang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-o-to-da-lat",
    "keywordsMain": "seo google maps ô tô Đà Lạt",
    "h1": "SEO Google Maps Ô tô Đà Lạt",
    "angle": "Maps đại lý xe Đà Lạt",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-luat-su-cam-ranh",
    "keywordsMain": "seo google maps luật sư Cam Ranh",
    "h1": "SEO Google Maps Luật sư Cam Ranh",
    "angle": "Maps văn phòng luật Cam Ranh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-ke-toan-uong-bi",
    "keywordsMain": "seo google maps kế toán Uông Bí",
    "h1": "SEO Google Maps Kế toán Uông Bí",
    "angle": "Maps kế toán Uông Bí",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-logistics-son-tay",
    "keywordsMain": "seo google maps logistics Sơn Tây",
    "h1": "SEO Google Maps Logistics Sơn Tây",
    "angle": "Maps logistics Sơn Tây",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-anh-ngu-hoai-duc",
    "keywordsMain": "seo google maps anh ngữ Hoài Đức",
    "h1": "SEO Google Maps Anh ngữ Hoài Đức",
    "angle": "Maps anh ngữ Hoài Đức",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-mam-non-cam-pha",
    "keywordsMain": "seo google maps mầm non Cẩm Phả",
    "h1": "SEO Google Maps Mầm non Cẩm Phả",
    "angle": "Maps mầm non Cẩm Phả",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-quan-cafe-ha-tien",
    "keywordsMain": "seo google maps quán cafe Hà Tiên",
    "h1": "SEO Google Maps Quán cafe Hà Tiên",
    "angle": "Maps cafe Hà Tiên",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-day-tra-sua-da-lat",
    "keywordsMain": "seo google maps dạy trà sữa Đà Lạt",
    "h1": "SEO Google Maps Dạy trà sữa Đà Lạt",
    "angle": "Maps học trà sữa Đà Lạt",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-golf-vung-tau",
    "keywordsMain": "seo google maps golf Vũng Tàu",
    "h1": "SEO Google Maps Golf Vũng Tàu",
    "angle": "Maps sân golf Vũng Tàu",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-ca-kho-phan-rang",
    "keywordsMain": "seo google maps cá khô Phan Rang",
    "h1": "SEO Google Maps Cá khô Phan Rang",
    "angle": "Maps xưởng cá khô Phan Rang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-barista-nha-trang",
    "keywordsMain": "seo google maps barista Nha Trang",
    "h1": "SEO Google Maps Barista Nha Trang",
    "angle": "Maps học barista Nha Trang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phun-xam-cam-ranh",
    "keywordsMain": "seo google maps phun xăm Cam Ranh",
    "h1": "SEO Google Maps Phun xăm Cam Ranh",
    "angle": "Maps phun xăm Cam Ranh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xuong-thep-uong-bi",
    "keywordsMain": "seo google maps xưởng thép Uông Bí",
    "h1": "SEO Google Maps Xưởng thép Uông Bí",
    "angle": "Maps xưởng thép Uông Bí",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-cho-thue-sanh-son-tay",
    "keywordsMain": "seo google maps cho thuê sảnh Sơn Tây",
    "h1": "SEO Google Maps Cho thuê sảnh Sơn Tây",
    "angle": "Maps cho thuê sảnh Sơn Tây",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-hai-quan-ha-tien",
    "keywordsMain": "seo google maps hải quan Hà Tiên",
    "h1": "SEO Google Maps Hải quan Hà Tiên",
    "angle": "Maps dịch vụ hải quan Hà Tiên",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tu-bep-hoai-duc",
    "keywordsMain": "seo google maps tủ bếp Hoài Đức",
    "h1": "SEO Google Maps Tủ bếp Hoài Đức",
    "angle": "Maps học tủ bếp Hoài Đức",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-cam-hoa-cam-pha",
    "keywordsMain": "seo google maps cắm hoa Cẩm Phả",
    "h1": "SEO Google Maps Cắm hoa Cẩm Phả",
    "angle": "Maps học cắm hoa Cẩm Phả",
    "niche": "seo"
  }
];

/** H — 30 */
const H_MKT = [
  {
    "slug": "marketing-ca-kho",
    "keywordsMain": "marketing cá khô",
    "h1": "Marketing Cá khô — Chiến Lược Tăng Trưởng",
    "angle": "marketing xưởng hải sản khô",
    "niche": "strategy"
  },
  {
    "slug": "marketing-cho-thue-sanh",
    "keywordsMain": "marketing cho thuê sảnh",
    "h1": "Marketing Cho thuê sảnh — Chiến Lược Tăng Trưởng",
    "angle": "marketing sảnh tiệc sự kiện",
    "niche": "strategy"
  },
  {
    "slug": "marketing-day-tra-sua",
    "keywordsMain": "marketing dạy trà sữa",
    "h1": "Marketing Dạy trà sữa — Chiến Lược Tăng Trưởng",
    "angle": "marketing học pha chế",
    "niche": "strategy"
  },
  {
    "slug": "marketing-dau-lung",
    "keywordsMain": "marketing đau lưng",
    "h1": "Marketing Đau lưng — Chiến Lược Tăng Trưởng",
    "angle": "marketing phòng khám cột sống",
    "niche": "strategy"
  },
  {
    "slug": "marketing-thiet-bi-nha-khoa",
    "keywordsMain": "marketing thiết bị nha khoa",
    "h1": "Marketing Thiết bị nha khoa — Chiến Lược Tăng Trưởng",
    "angle": "marketing thiết bị nha khoa B2B",
    "niche": "strategy"
  },
  {
    "slug": "marketing-local-seo-sme",
    "keywordsMain": "marketing local SEO SME",
    "h1": "Marketing Local SEO SME — Chiến Lược Tăng Trưởng",
    "angle": "marketing SEO địa phương SME",
    "niche": "strategy"
  },
  {
    "slug": "marketing-zalo-oa-marketing",
    "keywordsMain": "marketing Zalo OA marketing",
    "h1": "Marketing Zalo OA marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing vận hành Zalo OA",
    "niche": "strategy"
  },
  {
    "slug": "marketing-zns-campaign",
    "keywordsMain": "marketing ZNS campaign",
    "h1": "Marketing ZNS campaign — Chiến Lược Tăng Trưởng",
    "angle": "marketing chiến dịch ZNS",
    "niche": "strategy"
  },
  {
    "slug": "marketing-ux-ui-website",
    "keywordsMain": "marketing UX UI website",
    "h1": "Marketing UX UI website — Chiến Lược Tăng Trưởng",
    "angle": "marketing thiết kế trải nghiệm web",
    "niche": "strategy"
  },
  {
    "slug": "marketing-conversion-ux",
    "keywordsMain": "marketing conversion UX",
    "h1": "Marketing Conversion UX — Chiến Lược Tăng Trưởng",
    "angle": "marketing UX tăng chuyển đổi",
    "niche": "strategy"
  },
  {
    "slug": "marketing-mobile-first-design",
    "keywordsMain": "marketing mobile first design",
    "h1": "Marketing Mobile first design — Chiến Lược Tăng Trưởng",
    "angle": "marketing web mobile first",
    "niche": "strategy"
  },
  {
    "slug": "marketing-local-pack-mkt",
    "keywordsMain": "marketing local pack marketing",
    "h1": "Marketing Local pack marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing lên local pack",
    "niche": "strategy"
  },
  {
    "slug": "marketing-gbp-marketing",
    "keywordsMain": "marketing GBP marketing",
    "h1": "Marketing GBP marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing Google Business Profile",
    "niche": "strategy"
  },
  {
    "slug": "marketing-near-me-mkt",
    "keywordsMain": "marketing near me marketing",
    "h1": "Marketing Near me marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing từ khóa gần tôi",
    "niche": "strategy"
  },
  {
    "slug": "marketing-multi-location-mkt",
    "keywordsMain": "marketing multi location marketing",
    "h1": "Marketing Multi location marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing đa chi nhánh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-city-page-mkt",
    "keywordsMain": "marketing city page marketing",
    "h1": "Marketing City page marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing trang thành phố",
    "niche": "strategy"
  },
  {
    "slug": "marketing-zalo-mini-app",
    "keywordsMain": "marketing Zalo mini app",
    "h1": "Marketing Zalo mini app — Chiến Lược Tăng Trưởng",
    "angle": "marketing Zalo mini app shop",
    "niche": "strategy"
  },
  {
    "slug": "marketing-zalo-oa-chatbot",
    "keywordsMain": "marketing Zalo OA chatbot",
    "h1": "Marketing Zalo OA chatbot — Chiến Lược Tăng Trưởng",
    "angle": "marketing chatbot Zalo OA",
    "niche": "strategy"
  },
  {
    "slug": "marketing-ux-audit-website",
    "keywordsMain": "marketing UX audit website",
    "h1": "Marketing UX audit website — Chiến Lược Tăng Trưởng",
    "angle": "marketing audit trải nghiệm web",
    "niche": "strategy"
  },
  {
    "slug": "marketing-accessibility-mkt",
    "keywordsMain": "marketing accessibility marketing",
    "h1": "Marketing Accessibility marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing web accessibility",
    "niche": "strategy"
  },
  {
    "slug": "marketing-local-citation-mkt",
    "keywordsMain": "marketing local citation marketing",
    "h1": "Marketing Local citation marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing citation địa phương",
    "niche": "strategy"
  },
  {
    "slug": "marketing-review-local-mkt",
    "keywordsMain": "marketing review local marketing",
    "h1": "Marketing Review local marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing thu review địa phương",
    "niche": "strategy"
  },
  {
    "slug": "marketing-voice-search-mkt",
    "keywordsMain": "marketing voice search marketing",
    "h1": "Marketing Voice search marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing tối ưu voice search",
    "niche": "strategy"
  },
  {
    "slug": "marketing-franchise-local-mkt",
    "keywordsMain": "marketing franchise local marketing",
    "h1": "Marketing Franchise local marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing franchise SEO",
    "niche": "strategy"
  },
  {
    "slug": "marketing-district-seo-mkt",
    "keywordsMain": "marketing district SEO marketing",
    "h1": "Marketing District SEO marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing SEO quận huyện",
    "niche": "strategy"
  },
  {
    "slug": "marketing-zalo-oa-broadcast",
    "keywordsMain": "marketing Zalo OA broadcast",
    "h1": "Marketing Zalo OA broadcast — Chiến Lược Tăng Trưởng",
    "angle": "marketing broadcast Zalo OA",
    "niche": "strategy"
  },
  {
    "slug": "marketing-ux-form-mkt",
    "keywordsMain": "marketing UX form marketing",
    "h1": "Marketing UX form marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing form thu lead UX",
    "niche": "strategy"
  },
  {
    "slug": "marketing-checkout-ux-mkt",
    "keywordsMain": "marketing checkout UX marketing",
    "h1": "Marketing Checkout UX marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing UX checkout shop",
    "niche": "strategy"
  },
  {
    "slug": "marketing-local-pr-mkt",
    "keywordsMain": "marketing local PR marketing",
    "h1": "Marketing Local PR marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing PR địa phương",
    "niche": "strategy"
  },
  {
    "slug": "marketing-maps-ads-mkt",
    "keywordsMain": "marketing Maps ads marketing",
    "h1": "Marketing Maps ads marketing — Chiến Lược Tăng Trưởng",
    "angle": "marketing quảng cáo Maps local",
    "niche": "strategy"
  }
];

/** I — 25 */
const I_COMPARE = [
  {
    "slug": "local-seo-hay-google-ads-local",
    "keywordsMain": "local SEO hay Google Ads local",
    "h1": "Local SEO Hay Google Ads Local?",
    "angle": "kênh khách địa phương",
    "niche": "seo"
  },
  {
    "slug": "gbp-hay-facebook-page-local",
    "keywordsMain": "GBP hay Facebook page local",
    "h1": "GBP Hay Facebook Page Local?",
    "angle": "presence địa phương",
    "niche": "seo"
  },
  {
    "slug": "citation-hay-backlink-local",
    "keywordsMain": "citation hay backlink local",
    "h1": "Citation Hay Backlink Local?",
    "angle": "local link building",
    "niche": "seo"
  },
  {
    "slug": "city-page-hay-blog-local",
    "keywordsMain": "city page hay blog local",
    "h1": "City Page Hay Blog Local?",
    "angle": "nội dung SEO địa phương",
    "niche": "seo"
  },
  {
    "slug": "near-me-hay-ten-thanh-pho",
    "keywordsMain": "near me hay tên thành phố",
    "h1": "Near Me Hay Tên Thành Phố?",
    "angle": "geo keyword strategy",
    "niche": "seo"
  },
  {
    "slug": "zalo-oa-hay-zalo-mini-app",
    "keywordsMain": "Zalo OA hay Zalo mini app",
    "h1": "Zalo OA Hay Zalo Mini App?",
    "angle": "nền tảng Zalo business",
    "niche": "strategy"
  },
  {
    "slug": "zns-hay-sms-marketing",
    "keywordsMain": "ZNS hay SMS marketing",
    "h1": "ZNS Hay SMS Marketing?",
    "angle": "nhắn tin marketing VN",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-hay-facebook-messenger",
    "keywordsMain": "Zalo OA hay Facebook Messenger",
    "h1": "Zalo OA Hay Facebook Messenger?",
    "angle": "chat marketing VN",
    "niche": "strategy"
  },
  {
    "slug": "ux-ui-hay-chi-beautiful-design",
    "keywordsMain": "UX UI hay chỉ beautiful design",
    "h1": "UX UI Hay Chỉ Beautiful Design?",
    "angle": "thiết kế vs trải nghiệm",
    "niche": "strategy"
  },
  {
    "slug": "mobile-first-hay-desktop-first",
    "keywordsMain": "mobile first hay desktop first",
    "h1": "Mobile First Hay Desktop First?",
    "angle": "responsive design strategy",
    "niche": "strategy"
  },
  {
    "slug": "wireframe-hay-thiet-ke-luon",
    "keywordsMain": "wireframe hay thiết kế luôn",
    "h1": "Wireframe Hay Thiết Kế Luôn?",
    "angle": "quy trình UX design",
    "niche": "strategy"
  },
  {
    "slug": "figma-hay-adobe-xd",
    "keywordsMain": "figma hay adobe xd",
    "h1": "Figma Hay Adobe XD?",
    "angle": "công cụ thiết kế UI",
    "niche": "strategy"
  },
  {
    "slug": "user-testing-hay-giu-y-kien",
    "keywordsMain": "user testing hay ý kiến",
    "h1": "User Testing Hay Ý Kiến Chủ Quan?",
    "angle": "UX research method",
    "niche": "strategy"
  },
  {
    "slug": "accessibility-hay-bo-qua",
    "keywordsMain": "accessibility hay bỏ qua",
    "h1": "Accessibility Hay Bỏ Qua?",
    "angle": "WCAG web accessibility",
    "niche": "strategy"
  },
  {
    "slug": "local-pack-hay-organic-local",
    "keywordsMain": "local pack hay organic local",
    "h1": "Local Pack Hay Organic Local?",
    "angle": "hiển thị SERP địa phương",
    "niche": "seo"
  },
  {
    "slug": "review-automation-hay-thu-cong",
    "keywordsMain": "review automation hay thủ công",
    "h1": "Review Automation Hay Thủ Công?",
    "angle": "thu review Maps",
    "niche": "strategy"
  },
  {
    "slug": "multi-location-hay-single-page",
    "keywordsMain": "multi location hay single page",
    "h1": "Multi Location Hay Single Page?",
    "angle": "SEO nhiều chi nhánh",
    "niche": "seo"
  },
  {
    "slug": "zalo-broadcast-hay-zns",
    "keywordsMain": "Zalo broadcast hay ZNS",
    "h1": "Zalo Broadcast Hay ZNS?",
    "angle": "chiến lược nhắn Zalo",
    "niche": "strategy"
  },
  {
    "slug": "ux-audit-hay-cro-audit",
    "keywordsMain": "UX audit hay CRO audit",
    "h1": "UX Audit Hay CRO Audit?",
    "angle": "audit website conversion",
    "niche": "strategy"
  },
  {
    "slug": "sticky-nav-hay-hamburger",
    "keywordsMain": "sticky nav hay hamburger",
    "h1": "Sticky Nav Hay Hamburger Menu?",
    "angle": "mobile navigation UX",
    "niche": "strategy"
  },
  {
    "slug": "hero-video-hay-hero-image",
    "keywordsMain": "hero video hay hero image",
    "h1": "Hero Video Hay Hero Image?",
    "angle": "above fold UX",
    "niche": "strategy"
  },
  {
    "slug": "in-house-ux-hay-agency",
    "keywordsMain": "in-house UX hay agency",
    "h1": "In-House UX Hay Agency?",
    "angle": "team thiết kế UX",
    "niche": "strategy"
  },
  {
    "slug": "local-seo-hay-maps-ads",
    "keywordsMain": "local SEO hay Maps ads",
    "h1": "Local SEO Hay Maps Ads?",
    "angle": "tăng khách địa phương",
    "niche": "seo"
  },
  {
    "slug": "zalo-oa-shop-hay-website",
    "keywordsMain": "Zalo OA shop hay website",
    "h1": "Zalo OA Shop Hay Website?",
    "angle": "bán hàng online VN",
    "niche": "strategy"
  },
  {
    "slug": "design-system-hay-one-off",
    "keywordsMain": "design system hay one off",
    "h1": "Design System Hay One-Off?",
    "angle": "UI consistency scale",
    "niche": "strategy"
  }
];

/** J — 25 */
const J_PAIN = [
  {
    "slug": "local-pack-khong-len",
    "keywordsMain": "local pack không lên",
    "h1": "Local Pack Không Lên — Audit GBP",
    "angle": "local pack ranking stuck",
    "niche": "strategy"
  },
  {
    "slug": "gbp-bi-khoa",
    "keywordsMain": "GBP bị khóa",
    "h1": "GBP Bị Khóa — Kháng Cáo Google",
    "angle": "suspended Google Business Profile",
    "niche": "strategy"
  },
  {
    "slug": "nap-khong-nhat-quan",
    "keywordsMain": "NAP không nhất quán",
    "h1": "NAP Không Nhất Quán — Chuẩn Hóa",
    "angle": "NAP inconsistency fix",
    "niche": "strategy"
  },
  {
    "slug": "maps-rating-khong-tang",
    "keywordsMain": "Maps rating không tăng",
    "h1": "Maps Rating Không Tăng — Chiến Lược Review",
    "angle": "stuck Maps rating",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-khong-co-follower",
    "keywordsMain": "Zalo OA không có follower",
    "h1": "Zalo OA Không Có Follower — Tăng Trưởng",
    "angle": "low Zalo OA followers",
    "niche": "strategy"
  },
  {
    "slug": "zns-bi-tu-choi-template",
    "keywordsMain": "ZNS bị từ chối template",
    "h1": "ZNS Bị Từ Chối Template — Sửa Nội Dung",
    "angle": "ZNS template rejected",
    "niche": "strategy"
  },
  {
    "slug": "zalo-oa-chat-khong-ai-tra-loi",
    "keywordsMain": "Zalo OA chat không ai trả lời",
    "h1": "Zalo OA Chat Không Ai Trả Lời — SLA",
    "angle": "Zalo OA slow response",
    "niche": "strategy"
  },
  {
    "slug": "website-mobile-kho-dung-ux",
    "keywordsMain": "website mobile khó dùng",
    "h1": "Website Mobile Khó Dùng — UX Audit",
    "angle": "poor mobile UX",
    "niche": "strategy"
  },
  {
    "slug": "form-kho-dien-mobile",
    "keywordsMain": "form khó điền mobile",
    "h1": "Form Khó Điền Mobile — Rút Gọn UX",
    "angle": "mobile form friction",
    "niche": "strategy"
  },
  {
    "slug": "navigation-roi-website",
    "keywordsMain": "navigation rối website",
    "h1": "Navigation Rối Website — Sắp Xếp Lại",
    "angle": "confusing site navigation",
    "niche": "strategy"
  },
  {
    "slug": "checkout-qua-nhieu-buoc",
    "keywordsMain": "checkout quá nhiều bước",
    "h1": "Checkout Quá Nhiều Bước — Giảm Step",
    "angle": "long checkout UX",
    "niche": "strategy"
  },
  {
    "slug": "website-cham-mobile",
    "keywordsMain": "website chậm mobile",
    "h1": "Website Chậm Mobile — Tối Ưu LCP",
    "angle": "slow mobile performance UX",
    "niche": "strategy"
  },
  {
    "slug": "cta-kho-thay-mobile",
    "keywordsMain": "CTA khó thấy mobile",
    "h1": "CTA Khó Thấy Mobile — Thiết Kế Lại",
    "angle": "hidden mobile CTA",
    "niche": "strategy"
  },
  {
    "slug": "local-keyword-khong-co-volume",
    "keywordsMain": "local keyword không có volume",
    "h1": "Local Keyword Không Có Volume — Mở Rộng",
    "angle": "low local search volume",
    "niche": "strategy"
  },
  {
    "slug": "city-page-trung-lap",
    "keywordsMain": "city page trùng lặp",
    "h1": "City Page Trùng Lặp — Canonical",
    "angle": "duplicate city pages",
    "niche": "strategy"
  },
  {
    "slug": "citation-sai-thong-tin",
    "keywordsMain": "citation sai thông tin",
    "h1": "Citation Sai Thông Tin — Sửa NAP",
    "angle": "wrong local citations",
    "niche": "strategy"
  },
  {
    "slug": "zalo-mini-app-khong-ai-dung",
    "keywordsMain": "Zalo mini app không ai dùng",
    "h1": "Zalo Mini App Không Ai Dùng — Adoption",
    "angle": "low mini app usage",
    "niche": "strategy"
  },
  {
    "slug": "ux-beautiful-khong-convert",
    "keywordsMain": "UX đẹp không convert",
    "h1": "UX Đẹp Không Convert — CRO + UX",
    "angle": "pretty but no conversion",
    "niche": "strategy"
  },
  {
    "slug": "accessibility-bi-phat",
    "keywordsMain": "accessibility bị phạt",
    "h1": "Accessibility Bị Phạt — WCAG Fix",
    "angle": "accessibility compliance issue",
    "niche": "strategy"
  },
  {
    "slug": "hero-khong-ro-gia-tri",
    "keywordsMain": "hero không rõ giá trị",
    "h1": "Hero Không Rõ Giá Trị — Viết Lại",
    "angle": "unclear hero value prop",
    "niche": "strategy"
  },
  {
    "slug": "footer-thieu-link-quan-trong",
    "keywordsMain": "footer thiếu link quan trọng",
    "h1": "Footer Thiếu Link Quan Trọng — Bổ Sung",
    "angle": "incomplete footer UX",
    "niche": "strategy"
  },
  {
    "slug": "search-noi-bo-khong-hoat-dong",
    "keywordsMain": "search nội bộ không hoạt động",
    "h1": "Search Nội Bộ Không Hoạt Động — Sửa",
    "angle": "broken site search",
    "niche": "strategy"
  },
  {
    "slug": "filter-san-pham-loi",
    "keywordsMain": "filter sản phẩm lỗi",
    "h1": "Filter Sản Phẩm Lỗi — Sửa UX",
    "angle": "broken ecommerce filter",
    "niche": "strategy"
  },
  {
    "slug": "zalo-broadcast-bi-block",
    "keywordsMain": "Zalo broadcast bị block",
    "h1": "Zalo Broadcast Bị Block — Giảm Tần Suất",
    "angle": "Zalo broadcast blocked",
    "niche": "strategy"
  },
  {
    "slug": "local-seo-khong-co-lead",
    "keywordsMain": "local SEO không có lead",
    "h1": "Local SEO Không Có Lead — Audit Funnel",
    "angle": "local SEO no leads",
    "niche": "strategy"
  }
];

/** K — 20 */
const K_LAGI = [
  {
    "slug": "local-seo-la-gi",
    "keywordsMain": "local SEO là gì",
    "h1": "Local SEO Là Gì? SEO Địa Phương",
    "angle": "local SEO definition",
    "niche": "seo"
  },
  {
    "slug": "google-business-profile-la-gi-gbp",
    "keywordsMain": "Google Business Profile là gì",
    "h1": "Google Business Profile Là Gì?",
    "angle": "GBP explained",
    "niche": "seo"
  },
  {
    "slug": "local-pack-la-gi-google",
    "keywordsMain": "local pack là gì",
    "h1": "Local Pack Là Gì? Map Pack Google",
    "angle": "local pack SERP",
    "niche": "seo"
  },
  {
    "slug": "nap-seo-la-gi-local",
    "keywordsMain": "NAP SEO là gì",
    "h1": "NAP SEO Là Gì? Name Address Phone",
    "angle": "NAP consistency SEO",
    "niche": "seo"
  },
  {
    "slug": "local-citation-la-gi-seo",
    "keywordsMain": "local citation là gì",
    "h1": "Local Citation Là Gì?",
    "angle": "local citation directory",
    "niche": "seo"
  },
  {
    "slug": "near-me-keyword-la-gi",
    "keywordsMain": "near me keyword là gì",
    "h1": "Near Me Keyword Là Gì?",
    "angle": "near me search SEO",
    "niche": "seo"
  },
  {
    "slug": "zalo-official-account-la-gi",
    "keywordsMain": "Zalo Official Account là gì",
    "h1": "Zalo Official Account Là Gì?",
    "angle": "Zalo OA explained",
    "niche": "seo"
  },
  {
    "slug": "zns-la-gi",
    "keywordsMain": "ZNS là gì",
    "h1": "ZNS Là Gì? Zalo Notification Service",
    "angle": "ZNS marketing",
    "niche": "seo"
  },
  {
    "slug": "zalo-mini-app-la-gi",
    "keywordsMain": "Zalo mini app là gì",
    "h1": "Zalo Mini App Là Gì?",
    "angle": "Zalo mini app shop",
    "niche": "seo"
  },
  {
    "slug": "zalo-broadcast-la-gi",
    "keywordsMain": "Zalo broadcast là gì",
    "h1": "Zalo Broadcast Là Gì?",
    "angle": "Zalo OA broadcast message",
    "niche": "seo"
  },
  {
    "slug": "ux-la-gi",
    "keywordsMain": "UX là gì",
    "h1": "UX Là Gì? User Experience",
    "angle": "UX design definition",
    "niche": "seo"
  },
  {
    "slug": "ui-la-gi",
    "keywordsMain": "UI là gì",
    "h1": "UI Là Gì? User Interface",
    "angle": "UI design definition",
    "niche": "seo"
  },
  {
    "slug": "wireframe-la-gi",
    "keywordsMain": "wireframe là gì",
    "h1": "Wireframe Là Gì? Thiết Kế UX",
    "angle": "wireframe prototyping",
    "niche": "seo"
  },
  {
    "slug": "user-journey-la-gi",
    "keywordsMain": "user journey là gì",
    "h1": "User Journey Là Gì?",
    "angle": "user journey map UX",
    "niche": "seo"
  },
  {
    "slug": "accessibility-wcag-la-gi",
    "keywordsMain": "accessibility WCAG là gì",
    "h1": "Accessibility WCAG Là Gì?",
    "angle": "web accessibility standard",
    "niche": "seo"
  },
  {
    "slug": "mobile-first-la-gi",
    "keywordsMain": "mobile first là gì",
    "h1": "Mobile First Là Gì? Thiết Kế Web",
    "angle": "mobile first design",
    "niche": "seo"
  },
  {
    "slug": "design-system-la-gi",
    "keywordsMain": "design system là gì",
    "h1": "Design System Là Gì?",
    "angle": "UI design system",
    "niche": "seo"
  },
  {
    "slug": "micro-interaction-la-gi",
    "keywordsMain": "micro interaction là gì",
    "h1": "Micro Interaction Là Gì? UX",
    "angle": "micro interaction UI",
    "niche": "seo"
  },
  {
    "slug": "local-service-ads-la-gi-google",
    "keywordsMain": "local service ads là gì",
    "h1": "Local Service Ads Là Gì?",
    "angle": "Google LSA explained",
    "niche": "seo"
  },
  {
    "slug": "geo-modifier-la-gi",
    "keywordsMain": "geo modifier là gì",
    "h1": "Geo Modifier Là Gì? SEO Địa Phương",
    "angle": "geo keyword modifier",
    "niche": "seo"
  }
];

export const KEYWORDS_500_BATCH10 = [
  ...A_WEB_CITY,
  ...B_EXTRA_WEB,
  ...C_PRICING,
  ...D_LOCAL_SEO,
  ...E_ZALO_OA,
  ...F_UX_UI,
  ...G_MAPS,
  ...H_MKT,
  ...I_COMPARE,
  ...J_PAIN,
  ...K_LAGI,
];

export const KEYWORDS_500_BATCH10_MARKETING_ONLY = new Set([
  ...I_COMPARE.map((e) => e.slug),
  ...J_PAIN.map((e) => e.slug),
  ...K_LAGI.map((e) => e.slug),
]);

const EXPECTED = 500;
if (KEYWORDS_500_BATCH10.length !== EXPECTED) {
  throw new Error(`KEYWORDS_500_BATCH10 expected ${EXPECTED} entries, got ${KEYWORDS_500_BATCH10.length}`);
}

const slugSet = new Set(KEYWORDS_500_BATCH10.map((e) => e.slug));
if (slugSet.size !== KEYWORDS_500_BATCH10.length) {
  const dupes = KEYWORDS_500_BATCH10.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH10 duplicate slugs: ${[...new Set(dupes)].join(", ")}`);
}

const kwSet = new Set(KEYWORDS_500_BATCH10.map((e) => e.keywordsMain.toLowerCase()));
if (kwSet.size !== KEYWORDS_500_BATCH10.length) {
  const dupes = KEYWORDS_500_BATCH10.map((e) => e.keywordsMain.toLowerCase()).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH10 duplicate keywords: ${[...new Set(dupes)].join(", ")}`);
}

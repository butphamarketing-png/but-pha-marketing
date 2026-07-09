/**
 * 500 từ khóa long-tail batch 9 — SEO on-page, TikTok Shop, ORM, Miền Trung/Bắc.
 * Export: KEYWORDS_500_BATCH9
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

/** A — 200 */
const A_WEB_CITY = [
  {
    "slug": "thiet-ke-website-xuong-go-ep-hue",
    "keywordsMain": "thiết kế website xưởng gỗ ép Huế",
    "h1": "Thiết Kế Website Xưởng gỗ ép Huế Chuẩn SEO",
    "angle": "website xưởng gỗ công nghiệp MDF tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-go-ep-dong-ha",
    "keywordsMain": "thiết kế website xưởng gỗ ép Đông Hà",
    "h1": "Thiết Kế Website Xưởng gỗ ép Đông Hà Chuẩn SEO",
    "angle": "website xưởng gỗ công nghiệp MDF tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-go-ep-tam-ky",
    "keywordsMain": "thiết kế website xưởng gỗ ép Tam Kỳ",
    "h1": "Thiết Kế Website Xưởng gỗ ép Tam Kỳ Chuẩn SEO",
    "angle": "website xưởng gỗ công nghiệp MDF tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-go-ep-pleiku",
    "keywordsMain": "thiết kế website xưởng gỗ ép Pleiku",
    "h1": "Thiết Kế Website Xưởng gỗ ép Pleiku Chuẩn SEO",
    "angle": "website xưởng gỗ công nghiệp MDF tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-go-ep-bac-giang",
    "keywordsMain": "thiết kế website xưởng gỗ ép Bắc Giang",
    "h1": "Thiết Kế Website Xưởng gỗ ép Bắc Giang Chuẩn SEO",
    "angle": "website xưởng gỗ công nghiệp MDF tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-go-ep-bac-ninh",
    "keywordsMain": "thiết kế website xưởng gỗ ép Bắc Ninh",
    "h1": "Thiết Kế Website Xưởng gỗ ép Bắc Ninh Chuẩn SEO",
    "angle": "website xưởng gỗ công nghiệp MDF tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-go-ep-thai-binh",
    "keywordsMain": "thiết kế website xưởng gỗ ép Thái Bình",
    "h1": "Thiết Kế Website Xưởng gỗ ép Thái Bình Chuẩn SEO",
    "angle": "website xưởng gỗ công nghiệp MDF tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-go-ep-ha-tinh",
    "keywordsMain": "thiết kế website xưởng gỗ ép Hà Tĩnh",
    "h1": "Thiết Kế Website Xưởng gỗ ép Hà Tĩnh Chuẩn SEO",
    "angle": "website xưởng gỗ công nghiệp MDF tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-go-ep-ha-dong",
    "keywordsMain": "thiết kế website xưởng gỗ ép Hà Đông",
    "h1": "Thiết Kế Website Xưởng gỗ ép Hà Đông Chuẩn SEO",
    "angle": "website xưởng gỗ công nghiệp MDF tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-go-ep-thu-duc",
    "keywordsMain": "thiết kế website xưởng gỗ ép Thủ Đức",
    "h1": "Thiết Kế Website Xưởng gỗ ép Thủ Đức Chuẩn SEO",
    "angle": "website xưởng gỗ công nghiệp MDF tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-xe-7-cho-hue",
    "keywordsMain": "thiết kế website cho thuê xe 7 chỗ Huế",
    "h1": "Thiết Kế Website Cho thuê xe 7 chỗ Huế Chuẩn SEO",
    "angle": "website dịch vụ thuê xe du lịch tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-xe-7-cho-dong-ha",
    "keywordsMain": "thiết kế website cho thuê xe 7 chỗ Đông Hà",
    "h1": "Thiết Kế Website Cho thuê xe 7 chỗ Đông Hà Chuẩn SEO",
    "angle": "website dịch vụ thuê xe du lịch tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-xe-7-cho-tam-ky",
    "keywordsMain": "thiết kế website cho thuê xe 7 chỗ Tam Kỳ",
    "h1": "Thiết Kế Website Cho thuê xe 7 chỗ Tam Kỳ Chuẩn SEO",
    "angle": "website dịch vụ thuê xe du lịch tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-xe-7-cho-pleiku",
    "keywordsMain": "thiết kế website cho thuê xe 7 chỗ Pleiku",
    "h1": "Thiết Kế Website Cho thuê xe 7 chỗ Pleiku Chuẩn SEO",
    "angle": "website dịch vụ thuê xe du lịch tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-xe-7-cho-bac-giang",
    "keywordsMain": "thiết kế website cho thuê xe 7 chỗ Bắc Giang",
    "h1": "Thiết Kế Website Cho thuê xe 7 chỗ Bắc Giang Chuẩn SEO",
    "angle": "website dịch vụ thuê xe du lịch tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-xe-7-cho-bac-ninh",
    "keywordsMain": "thiết kế website cho thuê xe 7 chỗ Bắc Ninh",
    "h1": "Thiết Kế Website Cho thuê xe 7 chỗ Bắc Ninh Chuẩn SEO",
    "angle": "website dịch vụ thuê xe du lịch tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-xe-7-cho-thai-binh",
    "keywordsMain": "thiết kế website cho thuê xe 7 chỗ Thái Bình",
    "h1": "Thiết Kế Website Cho thuê xe 7 chỗ Thái Bình Chuẩn SEO",
    "angle": "website dịch vụ thuê xe du lịch tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-xe-7-cho-ha-tinh",
    "keywordsMain": "thiết kế website cho thuê xe 7 chỗ Hà Tĩnh",
    "h1": "Thiết Kế Website Cho thuê xe 7 chỗ Hà Tĩnh Chuẩn SEO",
    "angle": "website dịch vụ thuê xe du lịch tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-xe-7-cho-ha-dong",
    "keywordsMain": "thiết kế website cho thuê xe 7 chỗ Hà Đông",
    "h1": "Thiết Kế Website Cho thuê xe 7 chỗ Hà Đông Chuẩn SEO",
    "angle": "website dịch vụ thuê xe du lịch tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-xe-7-cho-thu-duc",
    "keywordsMain": "thiết kế website cho thuê xe 7 chỗ Thủ Đức",
    "h1": "Thiết Kế Website Cho thuê xe 7 chỗ Thủ Đức Chuẩn SEO",
    "angle": "website dịch vụ thuê xe du lịch tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-banh-hue",
    "keywordsMain": "thiết kế website dạy làm bánh Huế",
    "h1": "Thiết Kế Website Dạy làm bánh Huế Chuẩn SEO",
    "angle": "website học làm bánh pastry tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-banh-dong-ha",
    "keywordsMain": "thiết kế website dạy làm bánh Đông Hà",
    "h1": "Thiết Kế Website Dạy làm bánh Đông Hà Chuẩn SEO",
    "angle": "website học làm bánh pastry tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-banh-tam-ky",
    "keywordsMain": "thiết kế website dạy làm bánh Tam Kỳ",
    "h1": "Thiết Kế Website Dạy làm bánh Tam Kỳ Chuẩn SEO",
    "angle": "website học làm bánh pastry tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-banh-pleiku",
    "keywordsMain": "thiết kế website dạy làm bánh Pleiku",
    "h1": "Thiết Kế Website Dạy làm bánh Pleiku Chuẩn SEO",
    "angle": "website học làm bánh pastry tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-banh-bac-giang",
    "keywordsMain": "thiết kế website dạy làm bánh Bắc Giang",
    "h1": "Thiết Kế Website Dạy làm bánh Bắc Giang Chuẩn SEO",
    "angle": "website học làm bánh pastry tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-banh-bac-ninh",
    "keywordsMain": "thiết kế website dạy làm bánh Bắc Ninh",
    "h1": "Thiết Kế Website Dạy làm bánh Bắc Ninh Chuẩn SEO",
    "angle": "website học làm bánh pastry tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-banh-thai-binh",
    "keywordsMain": "thiết kế website dạy làm bánh Thái Bình",
    "h1": "Thiết Kế Website Dạy làm bánh Thái Bình Chuẩn SEO",
    "angle": "website học làm bánh pastry tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-banh-ha-tinh",
    "keywordsMain": "thiết kế website dạy làm bánh Hà Tĩnh",
    "h1": "Thiết Kế Website Dạy làm bánh Hà Tĩnh Chuẩn SEO",
    "angle": "website học làm bánh pastry tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-banh-ha-dong",
    "keywordsMain": "thiết kế website dạy làm bánh Hà Đông",
    "h1": "Thiết Kế Website Dạy làm bánh Hà Đông Chuẩn SEO",
    "angle": "website học làm bánh pastry tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-banh-thu-duc",
    "keywordsMain": "thiết kế website dạy làm bánh Thủ Đức",
    "h1": "Thiết Kế Website Dạy làm bánh Thủ Đức Chuẩn SEO",
    "angle": "website học làm bánh pastry tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-hoi-mieng-hue",
    "keywordsMain": "thiết kế website trị hôi miệng Huế",
    "h1": "Thiết Kế Website Trị hôi miệng Huế Chuẩn SEO",
    "angle": "website phòng khám nha khoa hôi miệng tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-hoi-mieng-dong-ha",
    "keywordsMain": "thiết kế website trị hôi miệng Đông Hà",
    "h1": "Thiết Kế Website Trị hôi miệng Đông Hà Chuẩn SEO",
    "angle": "website phòng khám nha khoa hôi miệng tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-hoi-mieng-tam-ky",
    "keywordsMain": "thiết kế website trị hôi miệng Tam Kỳ",
    "h1": "Thiết Kế Website Trị hôi miệng Tam Kỳ Chuẩn SEO",
    "angle": "website phòng khám nha khoa hôi miệng tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-hoi-mieng-pleiku",
    "keywordsMain": "thiết kế website trị hôi miệng Pleiku",
    "h1": "Thiết Kế Website Trị hôi miệng Pleiku Chuẩn SEO",
    "angle": "website phòng khám nha khoa hôi miệng tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-hoi-mieng-bac-giang",
    "keywordsMain": "thiết kế website trị hôi miệng Bắc Giang",
    "h1": "Thiết Kế Website Trị hôi miệng Bắc Giang Chuẩn SEO",
    "angle": "website phòng khám nha khoa hôi miệng tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-hoi-mieng-bac-ninh",
    "keywordsMain": "thiết kế website trị hôi miệng Bắc Ninh",
    "h1": "Thiết Kế Website Trị hôi miệng Bắc Ninh Chuẩn SEO",
    "angle": "website phòng khám nha khoa hôi miệng tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-hoi-mieng-thai-binh",
    "keywordsMain": "thiết kế website trị hôi miệng Thái Bình",
    "h1": "Thiết Kế Website Trị hôi miệng Thái Bình Chuẩn SEO",
    "angle": "website phòng khám nha khoa hôi miệng tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-hoi-mieng-ha-tinh",
    "keywordsMain": "thiết kế website trị hôi miệng Hà Tĩnh",
    "h1": "Thiết Kế Website Trị hôi miệng Hà Tĩnh Chuẩn SEO",
    "angle": "website phòng khám nha khoa hôi miệng tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-hoi-mieng-ha-dong",
    "keywordsMain": "thiết kế website trị hôi miệng Hà Đông",
    "h1": "Thiết Kế Website Trị hôi miệng Hà Đông Chuẩn SEO",
    "angle": "website phòng khám nha khoa hôi miệng tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-hoi-mieng-thu-duc",
    "keywordsMain": "thiết kế website trị hôi miệng Thủ Đức",
    "h1": "Thiết Kế Website Trị hôi miệng Thủ Đức Chuẩn SEO",
    "angle": "website phòng khám nha khoa hôi miệng tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-thuy-san-hue",
    "keywordsMain": "thiết kế website thiết bị thủy sản Huế",
    "h1": "Thiết Kế Website Thiết bị thủy sản Huế Chuẩn SEO",
    "angle": "website thiết bị nuôi trồng thủy sản tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-thuy-san-dong-ha",
    "keywordsMain": "thiết kế website thiết bị thủy sản Đông Hà",
    "h1": "Thiết Kế Website Thiết bị thủy sản Đông Hà Chuẩn SEO",
    "angle": "website thiết bị nuôi trồng thủy sản tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-thuy-san-tam-ky",
    "keywordsMain": "thiết kế website thiết bị thủy sản Tam Kỳ",
    "h1": "Thiết Kế Website Thiết bị thủy sản Tam Kỳ Chuẩn SEO",
    "angle": "website thiết bị nuôi trồng thủy sản tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-thuy-san-pleiku",
    "keywordsMain": "thiết kế website thiết bị thủy sản Pleiku",
    "h1": "Thiết Kế Website Thiết bị thủy sản Pleiku Chuẩn SEO",
    "angle": "website thiết bị nuôi trồng thủy sản tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-thuy-san-bac-giang",
    "keywordsMain": "thiết kế website thiết bị thủy sản Bắc Giang",
    "h1": "Thiết Kế Website Thiết bị thủy sản Bắc Giang Chuẩn SEO",
    "angle": "website thiết bị nuôi trồng thủy sản tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-thuy-san-bac-ninh",
    "keywordsMain": "thiết kế website thiết bị thủy sản Bắc Ninh",
    "h1": "Thiết Kế Website Thiết bị thủy sản Bắc Ninh Chuẩn SEO",
    "angle": "website thiết bị nuôi trồng thủy sản tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-thuy-san-thai-binh",
    "keywordsMain": "thiết kế website thiết bị thủy sản Thái Bình",
    "h1": "Thiết Kế Website Thiết bị thủy sản Thái Bình Chuẩn SEO",
    "angle": "website thiết bị nuôi trồng thủy sản tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-thuy-san-ha-tinh",
    "keywordsMain": "thiết kế website thiết bị thủy sản Hà Tĩnh",
    "h1": "Thiết Kế Website Thiết bị thủy sản Hà Tĩnh Chuẩn SEO",
    "angle": "website thiết bị nuôi trồng thủy sản tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-thuy-san-ha-dong",
    "keywordsMain": "thiết kế website thiết bị thủy sản Hà Đông",
    "h1": "Thiết Kế Website Thiết bị thủy sản Hà Đông Chuẩn SEO",
    "angle": "website thiết bị nuôi trồng thủy sản tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-thuy-san-thu-duc",
    "keywordsMain": "thiết kế website thiết bị thủy sản Thủ Đức",
    "h1": "Thiết Kế Website Thiết bị thủy sản Thủ Đức Chuẩn SEO",
    "angle": "website thiết bị nuôi trồng thủy sản tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-noi-that-chung-cu-hue",
    "keywordsMain": "thiết kế website thiết kế nội thất chung cư Huế",
    "h1": "Thiết Kế Website Thiết kế nội thất chung cư Huế Chuẩn SEO",
    "angle": "website thiết kế căn hộ chung cư tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-noi-that-chung-cu-dong-ha",
    "keywordsMain": "thiết kế website thiết kế nội thất chung cư Đông Hà",
    "h1": "Thiết Kế Website Thiết kế nội thất chung cư Đông Hà Chuẩn SEO",
    "angle": "website thiết kế căn hộ chung cư tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-noi-that-chung-cu-tam-ky",
    "keywordsMain": "thiết kế website thiết kế nội thất chung cư Tam Kỳ",
    "h1": "Thiết Kế Website Thiết kế nội thất chung cư Tam Kỳ Chuẩn SEO",
    "angle": "website thiết kế căn hộ chung cư tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-noi-that-chung-cu-pleiku",
    "keywordsMain": "thiết kế website thiết kế nội thất chung cư Pleiku",
    "h1": "Thiết Kế Website Thiết kế nội thất chung cư Pleiku Chuẩn SEO",
    "angle": "website thiết kế căn hộ chung cư tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-noi-that-chung-cu-bac-giang",
    "keywordsMain": "thiết kế website thiết kế nội thất chung cư Bắc Giang",
    "h1": "Thiết Kế Website Thiết kế nội thất chung cư Bắc Giang Chuẩn SEO",
    "angle": "website thiết kế căn hộ chung cư tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-noi-that-chung-cu-bac-ninh",
    "keywordsMain": "thiết kế website thiết kế nội thất chung cư Bắc Ninh",
    "h1": "Thiết Kế Website Thiết kế nội thất chung cư Bắc Ninh Chuẩn SEO",
    "angle": "website thiết kế căn hộ chung cư tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-noi-that-chung-cu-thai-binh",
    "keywordsMain": "thiết kế website thiết kế nội thất chung cư Thái Bình",
    "h1": "Thiết Kế Website Thiết kế nội thất chung cư Thái Bình Chuẩn SEO",
    "angle": "website thiết kế căn hộ chung cư tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-noi-that-chung-cu-ha-tinh",
    "keywordsMain": "thiết kế website thiết kế nội thất chung cư Hà Tĩnh",
    "h1": "Thiết Kế Website Thiết kế nội thất chung cư Hà Tĩnh Chuẩn SEO",
    "angle": "website thiết kế căn hộ chung cư tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-noi-that-chung-cu-ha-dong",
    "keywordsMain": "thiết kế website thiết kế nội thất chung cư Hà Đông",
    "h1": "Thiết Kế Website Thiết kế nội thất chung cư Hà Đông Chuẩn SEO",
    "angle": "website thiết kế căn hộ chung cư tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-noi-that-chung-cu-thu-duc",
    "keywordsMain": "thiết kế website thiết kế nội thất chung cư Thủ Đức",
    "h1": "Thiết Kế Website Thiết kế nội thất chung cư Thủ Đức Chuẩn SEO",
    "angle": "website thiết kế căn hộ chung cư tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bia-hue",
    "keywordsMain": "thiết kế website phân phối bia Huế",
    "h1": "Thiết Kế Website Phân phối bia Huế Chuẩn SEO",
    "angle": "website phân phối bia nước giải khát tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bia-dong-ha",
    "keywordsMain": "thiết kế website phân phối bia Đông Hà",
    "h1": "Thiết Kế Website Phân phối bia Đông Hà Chuẩn SEO",
    "angle": "website phân phối bia nước giải khát tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bia-tam-ky",
    "keywordsMain": "thiết kế website phân phối bia Tam Kỳ",
    "h1": "Thiết Kế Website Phân phối bia Tam Kỳ Chuẩn SEO",
    "angle": "website phân phối bia nước giải khát tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bia-pleiku",
    "keywordsMain": "thiết kế website phân phối bia Pleiku",
    "h1": "Thiết Kế Website Phân phối bia Pleiku Chuẩn SEO",
    "angle": "website phân phối bia nước giải khát tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bia-bac-giang",
    "keywordsMain": "thiết kế website phân phối bia Bắc Giang",
    "h1": "Thiết Kế Website Phân phối bia Bắc Giang Chuẩn SEO",
    "angle": "website phân phối bia nước giải khát tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bia-bac-ninh",
    "keywordsMain": "thiết kế website phân phối bia Bắc Ninh",
    "h1": "Thiết Kế Website Phân phối bia Bắc Ninh Chuẩn SEO",
    "angle": "website phân phối bia nước giải khát tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bia-thai-binh",
    "keywordsMain": "thiết kế website phân phối bia Thái Bình",
    "h1": "Thiết Kế Website Phân phối bia Thái Bình Chuẩn SEO",
    "angle": "website phân phối bia nước giải khát tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bia-ha-tinh",
    "keywordsMain": "thiết kế website phân phối bia Hà Tĩnh",
    "h1": "Thiết Kế Website Phân phối bia Hà Tĩnh Chuẩn SEO",
    "angle": "website phân phối bia nước giải khát tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bia-ha-dong",
    "keywordsMain": "thiết kế website phân phối bia Hà Đông",
    "h1": "Thiết Kế Website Phân phối bia Hà Đông Chuẩn SEO",
    "angle": "website phân phối bia nước giải khát tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bia-thu-duc",
    "keywordsMain": "thiết kế website phân phối bia Thủ Đức",
    "h1": "Thiết Kế Website Phân phối bia Thủ Đức Chuẩn SEO",
    "angle": "website phân phối bia nước giải khát tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-decal-hue",
    "keywordsMain": "thiết kế website xưởng in decal Huế",
    "h1": "Thiết Kế Website Xưởng in decal Huế Chuẩn SEO",
    "angle": "website xưởng in decal sticker tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-decal-dong-ha",
    "keywordsMain": "thiết kế website xưởng in decal Đông Hà",
    "h1": "Thiết Kế Website Xưởng in decal Đông Hà Chuẩn SEO",
    "angle": "website xưởng in decal sticker tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-decal-tam-ky",
    "keywordsMain": "thiết kế website xưởng in decal Tam Kỳ",
    "h1": "Thiết Kế Website Xưởng in decal Tam Kỳ Chuẩn SEO",
    "angle": "website xưởng in decal sticker tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-decal-pleiku",
    "keywordsMain": "thiết kế website xưởng in decal Pleiku",
    "h1": "Thiết Kế Website Xưởng in decal Pleiku Chuẩn SEO",
    "angle": "website xưởng in decal sticker tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-decal-bac-giang",
    "keywordsMain": "thiết kế website xưởng in decal Bắc Giang",
    "h1": "Thiết Kế Website Xưởng in decal Bắc Giang Chuẩn SEO",
    "angle": "website xưởng in decal sticker tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-decal-bac-ninh",
    "keywordsMain": "thiết kế website xưởng in decal Bắc Ninh",
    "h1": "Thiết Kế Website Xưởng in decal Bắc Ninh Chuẩn SEO",
    "angle": "website xưởng in decal sticker tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-decal-thai-binh",
    "keywordsMain": "thiết kế website xưởng in decal Thái Bình",
    "h1": "Thiết Kế Website Xưởng in decal Thái Bình Chuẩn SEO",
    "angle": "website xưởng in decal sticker tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-decal-ha-tinh",
    "keywordsMain": "thiết kế website xưởng in decal Hà Tĩnh",
    "h1": "Thiết Kế Website Xưởng in decal Hà Tĩnh Chuẩn SEO",
    "angle": "website xưởng in decal sticker tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-decal-ha-dong",
    "keywordsMain": "thiết kế website xưởng in decal Hà Đông",
    "h1": "Thiết Kế Website Xưởng in decal Hà Đông Chuẩn SEO",
    "angle": "website xưởng in decal sticker tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-decal-thu-duc",
    "keywordsMain": "thiết kế website xưởng in decal Thủ Đức",
    "h1": "Thiết Kế Website Xưởng in decal Thủ Đức Chuẩn SEO",
    "angle": "website xưởng in decal sticker tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-nail-hue",
    "keywordsMain": "thiết kế website dạy làm nail Huế",
    "h1": "Thiết Kế Website Dạy làm nail Huế Chuẩn SEO",
    "angle": "website học nail art chuyên nghiệp tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-nail-dong-ha",
    "keywordsMain": "thiết kế website dạy làm nail Đông Hà",
    "h1": "Thiết Kế Website Dạy làm nail Đông Hà Chuẩn SEO",
    "angle": "website học nail art chuyên nghiệp tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-nail-tam-ky",
    "keywordsMain": "thiết kế website dạy làm nail Tam Kỳ",
    "h1": "Thiết Kế Website Dạy làm nail Tam Kỳ Chuẩn SEO",
    "angle": "website học nail art chuyên nghiệp tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-nail-pleiku",
    "keywordsMain": "thiết kế website dạy làm nail Pleiku",
    "h1": "Thiết Kế Website Dạy làm nail Pleiku Chuẩn SEO",
    "angle": "website học nail art chuyên nghiệp tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-nail-bac-giang",
    "keywordsMain": "thiết kế website dạy làm nail Bắc Giang",
    "h1": "Thiết Kế Website Dạy làm nail Bắc Giang Chuẩn SEO",
    "angle": "website học nail art chuyên nghiệp tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-nail-bac-ninh",
    "keywordsMain": "thiết kế website dạy làm nail Bắc Ninh",
    "h1": "Thiết Kế Website Dạy làm nail Bắc Ninh Chuẩn SEO",
    "angle": "website học nail art chuyên nghiệp tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-nail-thai-binh",
    "keywordsMain": "thiết kế website dạy làm nail Thái Bình",
    "h1": "Thiết Kế Website Dạy làm nail Thái Bình Chuẩn SEO",
    "angle": "website học nail art chuyên nghiệp tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-nail-ha-tinh",
    "keywordsMain": "thiết kế website dạy làm nail Hà Tĩnh",
    "h1": "Thiết Kế Website Dạy làm nail Hà Tĩnh Chuẩn SEO",
    "angle": "website học nail art chuyên nghiệp tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-nail-ha-dong",
    "keywordsMain": "thiết kế website dạy làm nail Hà Đông",
    "h1": "Thiết Kế Website Dạy làm nail Hà Đông Chuẩn SEO",
    "angle": "website học nail art chuyên nghiệp tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-nail-thu-duc",
    "keywordsMain": "thiết kế website dạy làm nail Thủ Đức",
    "h1": "Thiết Kế Website Dạy làm nail Thủ Đức Chuẩn SEO",
    "angle": "website học nail art chuyên nghiệp tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-toc-rung-hue",
    "keywordsMain": "thiết kế website trị tóc rụng Huế",
    "h1": "Thiết Kế Website Trị tóc rụng Huế Chuẩn SEO",
    "angle": "website phòng khám trị rụng tóc tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-toc-rung-dong-ha",
    "keywordsMain": "thiết kế website trị tóc rụng Đông Hà",
    "h1": "Thiết Kế Website Trị tóc rụng Đông Hà Chuẩn SEO",
    "angle": "website phòng khám trị rụng tóc tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-toc-rung-tam-ky",
    "keywordsMain": "thiết kế website trị tóc rụng Tam Kỳ",
    "h1": "Thiết Kế Website Trị tóc rụng Tam Kỳ Chuẩn SEO",
    "angle": "website phòng khám trị rụng tóc tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-toc-rung-pleiku",
    "keywordsMain": "thiết kế website trị tóc rụng Pleiku",
    "h1": "Thiết Kế Website Trị tóc rụng Pleiku Chuẩn SEO",
    "angle": "website phòng khám trị rụng tóc tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-toc-rung-bac-giang",
    "keywordsMain": "thiết kế website trị tóc rụng Bắc Giang",
    "h1": "Thiết Kế Website Trị tóc rụng Bắc Giang Chuẩn SEO",
    "angle": "website phòng khám trị rụng tóc tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-toc-rung-bac-ninh",
    "keywordsMain": "thiết kế website trị tóc rụng Bắc Ninh",
    "h1": "Thiết Kế Website Trị tóc rụng Bắc Ninh Chuẩn SEO",
    "angle": "website phòng khám trị rụng tóc tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-toc-rung-thai-binh",
    "keywordsMain": "thiết kế website trị tóc rụng Thái Bình",
    "h1": "Thiết Kế Website Trị tóc rụng Thái Bình Chuẩn SEO",
    "angle": "website phòng khám trị rụng tóc tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-toc-rung-ha-tinh",
    "keywordsMain": "thiết kế website trị tóc rụng Hà Tĩnh",
    "h1": "Thiết Kế Website Trị tóc rụng Hà Tĩnh Chuẩn SEO",
    "angle": "website phòng khám trị rụng tóc tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-toc-rung-ha-dong",
    "keywordsMain": "thiết kế website trị tóc rụng Hà Đông",
    "h1": "Thiết Kế Website Trị tóc rụng Hà Đông Chuẩn SEO",
    "angle": "website phòng khám trị rụng tóc tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-toc-rung-thu-duc",
    "keywordsMain": "thiết kế website trị tóc rụng Thủ Đức",
    "h1": "Thiết Kế Website Trị tóc rụng Thủ Đức Chuẩn SEO",
    "angle": "website phòng khám trị rụng tóc tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-camera-ai-hue",
    "keywordsMain": "thiết kế website lắp camera AI Huế",
    "h1": "Thiết Kế Website Lắp camera AI Huế Chuẩn SEO",
    "angle": "website lắp camera AI nhận diện tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-camera-ai-dong-ha",
    "keywordsMain": "thiết kế website lắp camera AI Đông Hà",
    "h1": "Thiết Kế Website Lắp camera AI Đông Hà Chuẩn SEO",
    "angle": "website lắp camera AI nhận diện tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-camera-ai-tam-ky",
    "keywordsMain": "thiết kế website lắp camera AI Tam Kỳ",
    "h1": "Thiết Kế Website Lắp camera AI Tam Kỳ Chuẩn SEO",
    "angle": "website lắp camera AI nhận diện tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-camera-ai-pleiku",
    "keywordsMain": "thiết kế website lắp camera AI Pleiku",
    "h1": "Thiết Kế Website Lắp camera AI Pleiku Chuẩn SEO",
    "angle": "website lắp camera AI nhận diện tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-camera-ai-bac-giang",
    "keywordsMain": "thiết kế website lắp camera AI Bắc Giang",
    "h1": "Thiết Kế Website Lắp camera AI Bắc Giang Chuẩn SEO",
    "angle": "website lắp camera AI nhận diện tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-camera-ai-bac-ninh",
    "keywordsMain": "thiết kế website lắp camera AI Bắc Ninh",
    "h1": "Thiết Kế Website Lắp camera AI Bắc Ninh Chuẩn SEO",
    "angle": "website lắp camera AI nhận diện tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-camera-ai-thai-binh",
    "keywordsMain": "thiết kế website lắp camera AI Thái Bình",
    "h1": "Thiết Kế Website Lắp camera AI Thái Bình Chuẩn SEO",
    "angle": "website lắp camera AI nhận diện tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-camera-ai-ha-tinh",
    "keywordsMain": "thiết kế website lắp camera AI Hà Tĩnh",
    "h1": "Thiết Kế Website Lắp camera AI Hà Tĩnh Chuẩn SEO",
    "angle": "website lắp camera AI nhận diện tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-camera-ai-ha-dong",
    "keywordsMain": "thiết kế website lắp camera AI Hà Đông",
    "h1": "Thiết Kế Website Lắp camera AI Hà Đông Chuẩn SEO",
    "angle": "website lắp camera AI nhận diện tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-camera-ai-thu-duc",
    "keywordsMain": "thiết kế website lắp camera AI Thủ Đức",
    "h1": "Thiết Kế Website Lắp camera AI Thủ Đức Chuẩn SEO",
    "angle": "website lắp camera AI nhận diện tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-pickleball-hue",
    "keywordsMain": "thiết kế website thiết bị pickleball Huế",
    "h1": "Thiết Kế Website Thiết bị pickleball Huế Chuẩn SEO",
    "angle": "website bán vợt pickleball tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-pickleball-dong-ha",
    "keywordsMain": "thiết kế website thiết bị pickleball Đông Hà",
    "h1": "Thiết Kế Website Thiết bị pickleball Đông Hà Chuẩn SEO",
    "angle": "website bán vợt pickleball tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-pickleball-tam-ky",
    "keywordsMain": "thiết kế website thiết bị pickleball Tam Kỳ",
    "h1": "Thiết Kế Website Thiết bị pickleball Tam Kỳ Chuẩn SEO",
    "angle": "website bán vợt pickleball tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-pickleball-pleiku",
    "keywordsMain": "thiết kế website thiết bị pickleball Pleiku",
    "h1": "Thiết Kế Website Thiết bị pickleball Pleiku Chuẩn SEO",
    "angle": "website bán vợt pickleball tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-pickleball-bac-giang",
    "keywordsMain": "thiết kế website thiết bị pickleball Bắc Giang",
    "h1": "Thiết Kế Website Thiết bị pickleball Bắc Giang Chuẩn SEO",
    "angle": "website bán vợt pickleball tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-pickleball-bac-ninh",
    "keywordsMain": "thiết kế website thiết bị pickleball Bắc Ninh",
    "h1": "Thiết Kế Website Thiết bị pickleball Bắc Ninh Chuẩn SEO",
    "angle": "website bán vợt pickleball tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-pickleball-thai-binh",
    "keywordsMain": "thiết kế website thiết bị pickleball Thái Bình",
    "h1": "Thiết Kế Website Thiết bị pickleball Thái Bình Chuẩn SEO",
    "angle": "website bán vợt pickleball tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-pickleball-ha-tinh",
    "keywordsMain": "thiết kế website thiết bị pickleball Hà Tĩnh",
    "h1": "Thiết Kế Website Thiết bị pickleball Hà Tĩnh Chuẩn SEO",
    "angle": "website bán vợt pickleball tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-pickleball-ha-dong",
    "keywordsMain": "thiết kế website thiết bị pickleball Hà Đông",
    "h1": "Thiết Kế Website Thiết bị pickleball Hà Đông Chuẩn SEO",
    "angle": "website bán vợt pickleball tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-pickleball-thu-duc",
    "keywordsMain": "thiết kế website thiết bị pickleball Thủ Đức",
    "h1": "Thiết Kế Website Thiết bị pickleball Thủ Đức Chuẩn SEO",
    "angle": "website bán vợt pickleball tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-hop-dong-hue",
    "keywordsMain": "thiết kế website tư vấn hợp đồng Huế",
    "h1": "Thiết Kế Website Tư vấn hợp đồng Huế Chuẩn SEO",
    "angle": "website luật sư tư vấn hợp đồng tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-hop-dong-dong-ha",
    "keywordsMain": "thiết kế website tư vấn hợp đồng Đông Hà",
    "h1": "Thiết Kế Website Tư vấn hợp đồng Đông Hà Chuẩn SEO",
    "angle": "website luật sư tư vấn hợp đồng tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-hop-dong-tam-ky",
    "keywordsMain": "thiết kế website tư vấn hợp đồng Tam Kỳ",
    "h1": "Thiết Kế Website Tư vấn hợp đồng Tam Kỳ Chuẩn SEO",
    "angle": "website luật sư tư vấn hợp đồng tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-hop-dong-pleiku",
    "keywordsMain": "thiết kế website tư vấn hợp đồng Pleiku",
    "h1": "Thiết Kế Website Tư vấn hợp đồng Pleiku Chuẩn SEO",
    "angle": "website luật sư tư vấn hợp đồng tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-hop-dong-bac-giang",
    "keywordsMain": "thiết kế website tư vấn hợp đồng Bắc Giang",
    "h1": "Thiết Kế Website Tư vấn hợp đồng Bắc Giang Chuẩn SEO",
    "angle": "website luật sư tư vấn hợp đồng tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-hop-dong-bac-ninh",
    "keywordsMain": "thiết kế website tư vấn hợp đồng Bắc Ninh",
    "h1": "Thiết Kế Website Tư vấn hợp đồng Bắc Ninh Chuẩn SEO",
    "angle": "website luật sư tư vấn hợp đồng tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-hop-dong-thai-binh",
    "keywordsMain": "thiết kế website tư vấn hợp đồng Thái Bình",
    "h1": "Thiết Kế Website Tư vấn hợp đồng Thái Bình Chuẩn SEO",
    "angle": "website luật sư tư vấn hợp đồng tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-hop-dong-ha-tinh",
    "keywordsMain": "thiết kế website tư vấn hợp đồng Hà Tĩnh",
    "h1": "Thiết Kế Website Tư vấn hợp đồng Hà Tĩnh Chuẩn SEO",
    "angle": "website luật sư tư vấn hợp đồng tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-hop-dong-ha-dong",
    "keywordsMain": "thiết kế website tư vấn hợp đồng Hà Đông",
    "h1": "Thiết Kế Website Tư vấn hợp đồng Hà Đông Chuẩn SEO",
    "angle": "website luật sư tư vấn hợp đồng tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-hop-dong-thu-duc",
    "keywordsMain": "thiết kế website tư vấn hợp đồng Thủ Đức",
    "h1": "Thiết Kế Website Tư vấn hợp đồng Thủ Đức Chuẩn SEO",
    "angle": "website luật sư tư vấn hợp đồng tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-sofa-hue",
    "keywordsMain": "thiết kế website dạy làm sofa Huế",
    "h1": "Thiết Kế Website Dạy làm sofa Huế Chuẩn SEO",
    "angle": "website học nghề bọc ghế sofa tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-sofa-dong-ha",
    "keywordsMain": "thiết kế website dạy làm sofa Đông Hà",
    "h1": "Thiết Kế Website Dạy làm sofa Đông Hà Chuẩn SEO",
    "angle": "website học nghề bọc ghế sofa tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-sofa-tam-ky",
    "keywordsMain": "thiết kế website dạy làm sofa Tam Kỳ",
    "h1": "Thiết Kế Website Dạy làm sofa Tam Kỳ Chuẩn SEO",
    "angle": "website học nghề bọc ghế sofa tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-sofa-pleiku",
    "keywordsMain": "thiết kế website dạy làm sofa Pleiku",
    "h1": "Thiết Kế Website Dạy làm sofa Pleiku Chuẩn SEO",
    "angle": "website học nghề bọc ghế sofa tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-sofa-bac-giang",
    "keywordsMain": "thiết kế website dạy làm sofa Bắc Giang",
    "h1": "Thiết Kế Website Dạy làm sofa Bắc Giang Chuẩn SEO",
    "angle": "website học nghề bọc ghế sofa tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-sofa-bac-ninh",
    "keywordsMain": "thiết kế website dạy làm sofa Bắc Ninh",
    "h1": "Thiết Kế Website Dạy làm sofa Bắc Ninh Chuẩn SEO",
    "angle": "website học nghề bọc ghế sofa tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-sofa-thai-binh",
    "keywordsMain": "thiết kế website dạy làm sofa Thái Bình",
    "h1": "Thiết Kế Website Dạy làm sofa Thái Bình Chuẩn SEO",
    "angle": "website học nghề bọc ghế sofa tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-sofa-ha-tinh",
    "keywordsMain": "thiết kế website dạy làm sofa Hà Tĩnh",
    "h1": "Thiết Kế Website Dạy làm sofa Hà Tĩnh Chuẩn SEO",
    "angle": "website học nghề bọc ghế sofa tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-sofa-ha-dong",
    "keywordsMain": "thiết kế website dạy làm sofa Hà Đông",
    "h1": "Thiết Kế Website Dạy làm sofa Hà Đông Chuẩn SEO",
    "angle": "website học nghề bọc ghế sofa tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-sofa-thu-duc",
    "keywordsMain": "thiết kế website dạy làm sofa Thủ Đức",
    "h1": "Thiết Kế Website Dạy làm sofa Thủ Đức Chuẩn SEO",
    "angle": "website học nghề bọc ghế sofa tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-viem-da-hue",
    "keywordsMain": "thiết kế website trị viêm da Huế",
    "h1": "Thiết Kế Website Trị viêm da Huế Chuẩn SEO",
    "angle": "website phòng khám da liễu viêm da tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-viem-da-dong-ha",
    "keywordsMain": "thiết kế website trị viêm da Đông Hà",
    "h1": "Thiết Kế Website Trị viêm da Đông Hà Chuẩn SEO",
    "angle": "website phòng khám da liễu viêm da tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-viem-da-tam-ky",
    "keywordsMain": "thiết kế website trị viêm da Tam Kỳ",
    "h1": "Thiết Kế Website Trị viêm da Tam Kỳ Chuẩn SEO",
    "angle": "website phòng khám da liễu viêm da tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-viem-da-pleiku",
    "keywordsMain": "thiết kế website trị viêm da Pleiku",
    "h1": "Thiết Kế Website Trị viêm da Pleiku Chuẩn SEO",
    "angle": "website phòng khám da liễu viêm da tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-viem-da-bac-giang",
    "keywordsMain": "thiết kế website trị viêm da Bắc Giang",
    "h1": "Thiết Kế Website Trị viêm da Bắc Giang Chuẩn SEO",
    "angle": "website phòng khám da liễu viêm da tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-viem-da-bac-ninh",
    "keywordsMain": "thiết kế website trị viêm da Bắc Ninh",
    "h1": "Thiết Kế Website Trị viêm da Bắc Ninh Chuẩn SEO",
    "angle": "website phòng khám da liễu viêm da tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-viem-da-thai-binh",
    "keywordsMain": "thiết kế website trị viêm da Thái Bình",
    "h1": "Thiết Kế Website Trị viêm da Thái Bình Chuẩn SEO",
    "angle": "website phòng khám da liễu viêm da tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-viem-da-ha-tinh",
    "keywordsMain": "thiết kế website trị viêm da Hà Tĩnh",
    "h1": "Thiết Kế Website Trị viêm da Hà Tĩnh Chuẩn SEO",
    "angle": "website phòng khám da liễu viêm da tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-viem-da-ha-dong",
    "keywordsMain": "thiết kế website trị viêm da Hà Đông",
    "h1": "Thiết Kế Website Trị viêm da Hà Đông Chuẩn SEO",
    "angle": "website phòng khám da liễu viêm da tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-viem-da-thu-duc",
    "keywordsMain": "thiết kế website trị viêm da Thủ Đức",
    "h1": "Thiết Kế Website Trị viêm da Thủ Đức Chuẩn SEO",
    "angle": "website phòng khám da liễu viêm da tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-phong-hoc-hue",
    "keywordsMain": "thiết kế website cho thuê phòng học Huế",
    "h1": "Thiết Kế Website Cho thuê phòng học Huế Chuẩn SEO",
    "angle": "website cho thuê phòng học theo giờ tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-phong-hoc-dong-ha",
    "keywordsMain": "thiết kế website cho thuê phòng học Đông Hà",
    "h1": "Thiết Kế Website Cho thuê phòng học Đông Hà Chuẩn SEO",
    "angle": "website cho thuê phòng học theo giờ tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-phong-hoc-tam-ky",
    "keywordsMain": "thiết kế website cho thuê phòng học Tam Kỳ",
    "h1": "Thiết Kế Website Cho thuê phòng học Tam Kỳ Chuẩn SEO",
    "angle": "website cho thuê phòng học theo giờ tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-phong-hoc-pleiku",
    "keywordsMain": "thiết kế website cho thuê phòng học Pleiku",
    "h1": "Thiết Kế Website Cho thuê phòng học Pleiku Chuẩn SEO",
    "angle": "website cho thuê phòng học theo giờ tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-phong-hoc-bac-giang",
    "keywordsMain": "thiết kế website cho thuê phòng học Bắc Giang",
    "h1": "Thiết Kế Website Cho thuê phòng học Bắc Giang Chuẩn SEO",
    "angle": "website cho thuê phòng học theo giờ tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-phong-hoc-bac-ninh",
    "keywordsMain": "thiết kế website cho thuê phòng học Bắc Ninh",
    "h1": "Thiết Kế Website Cho thuê phòng học Bắc Ninh Chuẩn SEO",
    "angle": "website cho thuê phòng học theo giờ tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-phong-hoc-thai-binh",
    "keywordsMain": "thiết kế website cho thuê phòng học Thái Bình",
    "h1": "Thiết Kế Website Cho thuê phòng học Thái Bình Chuẩn SEO",
    "angle": "website cho thuê phòng học theo giờ tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-phong-hoc-ha-tinh",
    "keywordsMain": "thiết kế website cho thuê phòng học Hà Tĩnh",
    "h1": "Thiết Kế Website Cho thuê phòng học Hà Tĩnh Chuẩn SEO",
    "angle": "website cho thuê phòng học theo giờ tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-phong-hoc-ha-dong",
    "keywordsMain": "thiết kế website cho thuê phòng học Hà Đông",
    "h1": "Thiết Kế Website Cho thuê phòng học Hà Đông Chuẩn SEO",
    "angle": "website cho thuê phòng học theo giờ tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-phong-hoc-thu-duc",
    "keywordsMain": "thiết kế website cho thuê phòng học Thủ Đức",
    "h1": "Thiết Kế Website Cho thuê phòng học Thủ Đức Chuẩn SEO",
    "angle": "website cho thuê phòng học theo giờ tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-profile-cong-ty-hue",
    "keywordsMain": "thiết kế website thiết kế profile công ty Huế",
    "h1": "Thiết Kế Website Thiết kế profile công ty Huế Chuẩn SEO",
    "angle": "website thiết kế company profile PDF tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-profile-cong-ty-dong-ha",
    "keywordsMain": "thiết kế website thiết kế profile công ty Đông Hà",
    "h1": "Thiết Kế Website Thiết kế profile công ty Đông Hà Chuẩn SEO",
    "angle": "website thiết kế company profile PDF tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-profile-cong-ty-tam-ky",
    "keywordsMain": "thiết kế website thiết kế profile công ty Tam Kỳ",
    "h1": "Thiết Kế Website Thiết kế profile công ty Tam Kỳ Chuẩn SEO",
    "angle": "website thiết kế company profile PDF tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-profile-cong-ty-pleiku",
    "keywordsMain": "thiết kế website thiết kế profile công ty Pleiku",
    "h1": "Thiết Kế Website Thiết kế profile công ty Pleiku Chuẩn SEO",
    "angle": "website thiết kế company profile PDF tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-profile-cong-ty-bac-giang",
    "keywordsMain": "thiết kế website thiết kế profile công ty Bắc Giang",
    "h1": "Thiết Kế Website Thiết kế profile công ty Bắc Giang Chuẩn SEO",
    "angle": "website thiết kế company profile PDF tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-profile-cong-ty-bac-ninh",
    "keywordsMain": "thiết kế website thiết kế profile công ty Bắc Ninh",
    "h1": "Thiết Kế Website Thiết kế profile công ty Bắc Ninh Chuẩn SEO",
    "angle": "website thiết kế company profile PDF tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-profile-cong-ty-thai-binh",
    "keywordsMain": "thiết kế website thiết kế profile công ty Thái Bình",
    "h1": "Thiết Kế Website Thiết kế profile công ty Thái Bình Chuẩn SEO",
    "angle": "website thiết kế company profile PDF tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-profile-cong-ty-ha-tinh",
    "keywordsMain": "thiết kế website thiết kế profile công ty Hà Tĩnh",
    "h1": "Thiết Kế Website Thiết kế profile công ty Hà Tĩnh Chuẩn SEO",
    "angle": "website thiết kế company profile PDF tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-profile-cong-ty-ha-dong",
    "keywordsMain": "thiết kế website thiết kế profile công ty Hà Đông",
    "h1": "Thiết Kế Website Thiết kế profile công ty Hà Đông Chuẩn SEO",
    "angle": "website thiết kế company profile PDF tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-profile-cong-ty-thu-duc",
    "keywordsMain": "thiết kế website thiết kế profile công ty Thủ Đức",
    "h1": "Thiết Kế Website Thiết kế profile công ty Thủ Đức Chuẩn SEO",
    "angle": "website thiết kế company profile PDF tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-sua-bot-hue",
    "keywordsMain": "thiết kế website phân phối sữa bột Huế",
    "h1": "Thiết Kế Website Phân phối sữa bột Huế Chuẩn SEO",
    "angle": "website phân phối sữa bột trẻ em tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-sua-bot-dong-ha",
    "keywordsMain": "thiết kế website phân phối sữa bột Đông Hà",
    "h1": "Thiết Kế Website Phân phối sữa bột Đông Hà Chuẩn SEO",
    "angle": "website phân phối sữa bột trẻ em tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-sua-bot-tam-ky",
    "keywordsMain": "thiết kế website phân phối sữa bột Tam Kỳ",
    "h1": "Thiết Kế Website Phân phối sữa bột Tam Kỳ Chuẩn SEO",
    "angle": "website phân phối sữa bột trẻ em tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-sua-bot-pleiku",
    "keywordsMain": "thiết kế website phân phối sữa bột Pleiku",
    "h1": "Thiết Kế Website Phân phối sữa bột Pleiku Chuẩn SEO",
    "angle": "website phân phối sữa bột trẻ em tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-sua-bot-bac-giang",
    "keywordsMain": "thiết kế website phân phối sữa bột Bắc Giang",
    "h1": "Thiết Kế Website Phân phối sữa bột Bắc Giang Chuẩn SEO",
    "angle": "website phân phối sữa bột trẻ em tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-sua-bot-bac-ninh",
    "keywordsMain": "thiết kế website phân phối sữa bột Bắc Ninh",
    "h1": "Thiết Kế Website Phân phối sữa bột Bắc Ninh Chuẩn SEO",
    "angle": "website phân phối sữa bột trẻ em tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-sua-bot-thai-binh",
    "keywordsMain": "thiết kế website phân phối sữa bột Thái Bình",
    "h1": "Thiết Kế Website Phân phối sữa bột Thái Bình Chuẩn SEO",
    "angle": "website phân phối sữa bột trẻ em tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-sua-bot-ha-tinh",
    "keywordsMain": "thiết kế website phân phối sữa bột Hà Tĩnh",
    "h1": "Thiết Kế Website Phân phối sữa bột Hà Tĩnh Chuẩn SEO",
    "angle": "website phân phối sữa bột trẻ em tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-sua-bot-ha-dong",
    "keywordsMain": "thiết kế website phân phối sữa bột Hà Đông",
    "h1": "Thiết Kế Website Phân phối sữa bột Hà Đông Chuẩn SEO",
    "angle": "website phân phối sữa bột trẻ em tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-sua-bot-thu-duc",
    "keywordsMain": "thiết kế website phân phối sữa bột Thủ Đức",
    "h1": "Thiết Kế Website Phân phối sữa bột Thủ Đức Chuẩn SEO",
    "angle": "website phân phối sữa bột trẻ em tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-gach-hue",
    "keywordsMain": "thiết kế website xưởng sản xuất gạch Huế",
    "h1": "Thiết Kế Website Xưởng sản xuất gạch Huế Chuẩn SEO",
    "angle": "website nhà máy gạch xây dựng tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-gach-dong-ha",
    "keywordsMain": "thiết kế website xưởng sản xuất gạch Đông Hà",
    "h1": "Thiết Kế Website Xưởng sản xuất gạch Đông Hà Chuẩn SEO",
    "angle": "website nhà máy gạch xây dựng tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-gach-tam-ky",
    "keywordsMain": "thiết kế website xưởng sản xuất gạch Tam Kỳ",
    "h1": "Thiết Kế Website Xưởng sản xuất gạch Tam Kỳ Chuẩn SEO",
    "angle": "website nhà máy gạch xây dựng tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-gach-pleiku",
    "keywordsMain": "thiết kế website xưởng sản xuất gạch Pleiku",
    "h1": "Thiết Kế Website Xưởng sản xuất gạch Pleiku Chuẩn SEO",
    "angle": "website nhà máy gạch xây dựng tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-gach-bac-giang",
    "keywordsMain": "thiết kế website xưởng sản xuất gạch Bắc Giang",
    "h1": "Thiết Kế Website Xưởng sản xuất gạch Bắc Giang Chuẩn SEO",
    "angle": "website nhà máy gạch xây dựng tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-gach-bac-ninh",
    "keywordsMain": "thiết kế website xưởng sản xuất gạch Bắc Ninh",
    "h1": "Thiết Kế Website Xưởng sản xuất gạch Bắc Ninh Chuẩn SEO",
    "angle": "website nhà máy gạch xây dựng tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-gach-thai-binh",
    "keywordsMain": "thiết kế website xưởng sản xuất gạch Thái Bình",
    "h1": "Thiết Kế Website Xưởng sản xuất gạch Thái Bình Chuẩn SEO",
    "angle": "website nhà máy gạch xây dựng tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-gach-ha-tinh",
    "keywordsMain": "thiết kế website xưởng sản xuất gạch Hà Tĩnh",
    "h1": "Thiết Kế Website Xưởng sản xuất gạch Hà Tĩnh Chuẩn SEO",
    "angle": "website nhà máy gạch xây dựng tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-gach-ha-dong",
    "keywordsMain": "thiết kế website xưởng sản xuất gạch Hà Đông",
    "h1": "Thiết Kế Website Xưởng sản xuất gạch Hà Đông Chuẩn SEO",
    "angle": "website nhà máy gạch xây dựng tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-gach-thu-duc",
    "keywordsMain": "thiết kế website xưởng sản xuất gạch Thủ Đức",
    "h1": "Thiết Kế Website Xưởng sản xuất gạch Thủ Đức Chuẩn SEO",
    "angle": "website nhà máy gạch xây dựng tại Thủ Đức",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-bonsai-hue",
    "keywordsMain": "thiết kế website dạy làm bonsai Huế",
    "h1": "Thiết Kế Website Dạy làm bonsai Huế Chuẩn SEO",
    "angle": "website học nghệ thuật bonsai tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-bonsai-dong-ha",
    "keywordsMain": "thiết kế website dạy làm bonsai Đông Hà",
    "h1": "Thiết Kế Website Dạy làm bonsai Đông Hà Chuẩn SEO",
    "angle": "website học nghệ thuật bonsai tại Đông Hà",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-bonsai-tam-ky",
    "keywordsMain": "thiết kế website dạy làm bonsai Tam Kỳ",
    "h1": "Thiết Kế Website Dạy làm bonsai Tam Kỳ Chuẩn SEO",
    "angle": "website học nghệ thuật bonsai tại Tam Kỳ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-bonsai-pleiku",
    "keywordsMain": "thiết kế website dạy làm bonsai Pleiku",
    "h1": "Thiết Kế Website Dạy làm bonsai Pleiku Chuẩn SEO",
    "angle": "website học nghệ thuật bonsai tại Pleiku",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-bonsai-bac-giang",
    "keywordsMain": "thiết kế website dạy làm bonsai Bắc Giang",
    "h1": "Thiết Kế Website Dạy làm bonsai Bắc Giang Chuẩn SEO",
    "angle": "website học nghệ thuật bonsai tại Bắc Giang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-bonsai-bac-ninh",
    "keywordsMain": "thiết kế website dạy làm bonsai Bắc Ninh",
    "h1": "Thiết Kế Website Dạy làm bonsai Bắc Ninh Chuẩn SEO",
    "angle": "website học nghệ thuật bonsai tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-bonsai-thai-binh",
    "keywordsMain": "thiết kế website dạy làm bonsai Thái Bình",
    "h1": "Thiết Kế Website Dạy làm bonsai Thái Bình Chuẩn SEO",
    "angle": "website học nghệ thuật bonsai tại Thái Bình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-bonsai-ha-tinh",
    "keywordsMain": "thiết kế website dạy làm bonsai Hà Tĩnh",
    "h1": "Thiết Kế Website Dạy làm bonsai Hà Tĩnh Chuẩn SEO",
    "angle": "website học nghệ thuật bonsai tại Hà Tĩnh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-bonsai-ha-dong",
    "keywordsMain": "thiết kế website dạy làm bonsai Hà Đông",
    "h1": "Thiết Kế Website Dạy làm bonsai Hà Đông Chuẩn SEO",
    "angle": "website học nghệ thuật bonsai tại Hà Đông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-bonsai-thu-duc",
    "keywordsMain": "thiết kế website dạy làm bonsai Thủ Đức",
    "h1": "Thiết Kế Website Dạy làm bonsai Thủ Đức Chuẩn SEO",
    "angle": "website học nghệ thuật bonsai tại Thủ Đức",
    "niche": "strategy"
  }
];

/** B — 50 */
const B_EXTRA_WEB = [
  {
    "slug": "thiet-ke-website-xuong-go-ep-mdf",
    "keywordsMain": "thiết kế website xưởng gỗ ép MDF",
    "h1": "Thiết Kế Website Xưởng gỗ ép MDF Chuyên Nghiệp Chuẩn SEO",
    "angle": "website xưởng gỗ công nghiệp MDF",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-dich-vu-thue-xe-du-lich",
    "keywordsMain": "thiết kế website dịch vụ thuê xe du lịch",
    "h1": "Thiết Kế Website Dịch vụ thuê xe du lịch Chuyên Nghiệp Chuẩn SEO",
    "angle": "website cho thuê xe 7-16 chỗ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-trung-tam-day-lam-banh",
    "keywordsMain": "thiết kế website trung tâm dạy làm bánh",
    "h1": "Thiết Kế Website Trung tâm dạy làm bánh Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học pastry bánh ngọt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-tri-hoi-mieng",
    "keywordsMain": "thiết kế website phòng khám trị hôi miệng",
    "h1": "Thiết Kế Website Phòng khám trị hôi miệng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website nha khoa hôi miệng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cua-hang-thiet-bi-thuy-san",
    "keywordsMain": "thiết kế website cửa hàng thiết bị thủy sản",
    "h1": "Thiết Kế Website Cửa hàng thiết bị thủy sản Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thiết bị nuôi tôm cá",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-studio-noi-that-chung-cu",
    "keywordsMain": "thiết kế website studio nội thất chung cư",
    "h1": "Thiết Kế Website Studio nội thất chung cư Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thiết kế căn hộ cao cấp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cong-ty-phan-phoi-bia-craft",
    "keywordsMain": "thiết kế website công ty phân phối bia",
    "h1": "Thiết Kế Website Công ty phân phối bia Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phân phối bia craft",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-decal-uv",
    "keywordsMain": "thiết kế website xưởng in decal UV",
    "h1": "Thiết Kế Website Xưởng in decal UV Chuyên Nghiệp Chuẩn SEO",
    "angle": "website in decal công nghiệp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-trung-tam-day-nail-art",
    "keywordsMain": "thiết kế website trung tâm dạy nail art",
    "h1": "Thiết Kế Website Trung tâm dạy nail art Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học nail chuyên nghiệp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-tri-toc-rung",
    "keywordsMain": "thiết kế website phòng khám trị tóc rụng",
    "h1": "Thiết Kế Website Phòng khám trị tóc rụng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website điều trị rụng tóc",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-dich-vu-lap-camera-ai",
    "keywordsMain": "thiết kế website dịch vụ lắp camera AI",
    "h1": "Thiết Kế Website Dịch vụ lắp camera AI Chuyên Nghiệp Chuẩn SEO",
    "angle": "website camera AI nhận diện khuôn mặt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cua-hang-pickleball",
    "keywordsMain": "thiết kế website cửa hàng pickleball",
    "h1": "Thiết Kế Website Cửa hàng pickleball Chuyên Nghiệp Chuẩn SEO",
    "angle": "website bán dụng cụ pickleball",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-van-phong-tu-van-hop-dong",
    "keywordsMain": "thiết kế website văn phòng tư vấn hợp đồng",
    "h1": "Thiết Kế Website Văn phòng tư vấn hợp đồng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website luật sư hợp đồng thương mại",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-trung-tam-day-boc-ghe",
    "keywordsMain": "thiết kế website trung tâm dạy bọc ghế",
    "h1": "Thiết Kế Website Trung tâm dạy bọc ghế Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học bọc sofa nội thất",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-viem-da",
    "keywordsMain": "thiết kế website phòng khám viêm da",
    "h1": "Thiết Kế Website Phòng khám viêm da Chuyên Nghiệp Chuẩn SEO",
    "angle": "website da liễu viêm da cơ địa",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-phong-hoc-theo-gio",
    "keywordsMain": "thiết kế website cho thuê phòng học theo giờ",
    "h1": "Thiết Kế Website Cho thuê phòng học theo giờ Chuyên Nghiệp Chuẩn SEO",
    "angle": "website coworking phòng họp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-agency-thiet-ke-profile",
    "keywordsMain": "thiết kế website agency thiết kế profile",
    "h1": "Thiết Kế Website Agency thiết kế profile Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thiết kế profile doanh nghiệp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cong-ty-phan-phoi-sua-bot",
    "keywordsMain": "thiết kế website công ty phân phối sữa bột",
    "h1": "Thiết Kế Website Công ty phân phối sữa bột Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phân phối sữa trẻ em",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-may-gach-xay-dung",
    "keywordsMain": "thiết kế website nhà máy gạch xây dựng",
    "h1": "Thiết Kế Website Nhà máy gạch xây dựng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website xưởng gạch block",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-trung-tam-day-bonsai",
    "keywordsMain": "thiết kế website trung tâm dạy bonsai",
    "h1": "Thiết Kế Website Trung tâm dạy bonsai Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học bonsai nghệ thuật",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-cua-go-cong-nghiep",
    "keywordsMain": "thiết kế website xưởng sản xuất cửa gỗ",
    "h1": "Thiết Kế Website Xưởng sản xuất cửa gỗ Chuyên Nghiệp Chuẩn SEO",
    "angle": "website cửa gỗ công nghiệp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-dich-vu-thue-xe-limousine",
    "keywordsMain": "thiết kế website dịch vụ thuê xe limousine",
    "h1": "Thiết Kế Website Dịch vụ thuê xe limousine Chuyên Nghiệp Chuẩn SEO",
    "angle": "website xe limousine sân bay",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-banh-kem",
    "keywordsMain": "thiết kế website dạy làm bánh kem",
    "h1": "Thiết Kế Website Dạy làm bánh kem Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học bánh kem sinh nhật",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-rang-ven",
    "keywordsMain": "thiết kế website trị răng vẩn",
    "h1": "Thiết Kế Website Trị răng vẩn Chuyên Nghiệp Chuẩn SEO",
    "angle": "website nha khoa thẩm mỹ răng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-may-bom-thuy-san",
    "keywordsMain": "thiết kế website thiết bị máy bơm thủy sản",
    "h1": "Thiết Kế Website Thiết bị máy bơm thủy sản Chuyên Nghiệp Chuẩn SEO",
    "angle": "website máy bơm ao hồ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-noi-that-biet-thu",
    "keywordsMain": "thiết kế website thiết kế nội thất biệt thự",
    "h1": "Thiết Kế Website Thiết kế nội thất biệt thự Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thiết kế villa cao cấp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-nuoc-ngot",
    "keywordsMain": "thiết kế website phân phối nước ngọt",
    "h1": "Thiết Kế Website Phân phối nước ngọt Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phân phối nước giải khát",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-tem-nhan-san-pham",
    "keywordsMain": "thiết kế website xưởng in tem nhãn",
    "h1": "Thiết Kế Website Xưởng in tem nhãn Chuyên Nghiệp Chuẩn SEO",
    "angle": "website in tem nhãn sản phẩm",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-mi",
    "keywordsMain": "thiết kế website dạy làm mi",
    "h1": "Thiết Kế Website Dạy làm mi Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học nối mi volume",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-nam-melasma",
    "keywordsMain": "thiết kế website trị nám melasma",
    "h1": "Thiết Kế Website Trị nám melasma Chuyên Nghiệp Chuẩn SEO",
    "angle": "website laser trị nám",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-lap-he-thong-camera-wifi",
    "keywordsMain": "thiết kế website lắp hệ thống camera wifi",
    "h1": "Thiết Kế Website Lắp hệ thống camera wifi Chuyên Nghiệp Chuẩn SEO",
    "angle": "website camera wifi gia đình",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cua-hang-vot-cau-long",
    "keywordsMain": "thiết kế website cửa hàng vợt cầu lông",
    "h1": "Thiết Kế Website Cửa hàng vợt cầu lông Chuyên Nghiệp Chuẩn SEO",
    "angle": "website dụng cụ cầu lông",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tu-van-hop-dong-lao-dong",
    "keywordsMain": "thiết kế website tư vấn hợp đồng lao động",
    "h1": "Thiết Kế Website Tư vấn hợp đồng lao động Chuyên Nghiệp Chuẩn SEO",
    "angle": "website luật lao động doanh nghiệp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-rem-cua",
    "keywordsMain": "thiết kế website dạy làm rèm cửa",
    "h1": "Thiết Kế Website Dạy làm rèm cửa Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học may rèm cửa",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-mun-viem",
    "keywordsMain": "thiết kế website trị mụn viêm",
    "h1": "Thiết Kế Website Trị mụn viêm Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phòng khám trị mụn",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-cho-thue-studio-quay-phim",
    "keywordsMain": "thiết kế website cho thuê studio quay phim",
    "h1": "Thiết Kế Website Cho thuê studio quay phim Chuyên Nghiệp Chuẩn SEO",
    "angle": "website studio quay video",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-catalog-doanh-nghiep",
    "keywordsMain": "thiết kế website thiết kế catalog doanh nghiệp",
    "h1": "Thiết Kế Website Thiết kế catalog doanh nghiệp Chuyên Nghiệp Chuẩn SEO",
    "angle": "website catalog B2B in ấn",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-bot-giat",
    "keywordsMain": "thiết kế website phân phối bột giặt",
    "h1": "Thiết Kế Website Phân phối bột giặt Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phân phối hóa mỹ phẩm",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-gach-op-tuong",
    "keywordsMain": "thiết kế website xưởng gạch ốp tường",
    "h1": "Thiết Kế Website Xưởng gạch ốp tường Chuyên Nghiệp Chuẩn SEO",
    "angle": "website gạch ốp lát cao cấp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-trong-cay-canh",
    "keywordsMain": "thiết kế website dạy trồng cây cảnh",
    "h1": "Thiết Kế Website Dạy trồng cây cảnh Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học cây cảnh mini",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-san-xuat-pallet",
    "keywordsMain": "thiết kế website xưởng sản xuất pallet",
    "h1": "Thiết Kế Website Xưởng sản xuất pallet Chuyên Nghiệp Chuẩn SEO",
    "angle": "website pallet gỗ nhựa B2B",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-dich-vu-thue-xe-tu-lai",
    "keywordsMain": "thiết kế website dịch vụ thuê xe tự lái",
    "h1": "Thiết Kế Website Dịch vụ thuê xe tự lái Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thuê xe ô tô tự lái",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-banh-mi",
    "keywordsMain": "thiết kế website dạy làm bánh mì",
    "h1": "Thiết Kế Website Dạy làm bánh mì Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học bánh mì artisan",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-suot-mieng",
    "keywordsMain": "thiết kế website trị suốt miệng",
    "h1": "Thiết Kế Website Trị suốt miệng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website nha khoa suốt miệng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-bi-ao-nuoi-tom",
    "keywordsMain": "thiết kế website thiết bị ao nuôi tôm",
    "h1": "Thiết Kế Website Thiết bị ao nuôi tôm Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thiết bị nuôi tôm công nghệ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-thiet-ke-showroom-noi-that",
    "keywordsMain": "thiết kế website thiết kế showroom nội thất",
    "h1": "Thiết Kế Website Thiết kế showroom nội thất Chuyên Nghiệp Chuẩn SEO",
    "angle": "website showroom nội thất",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phan-phoi-tra-dong-goi",
    "keywordsMain": "thiết kế website phân phối trà đóng gói",
    "h1": "Thiết Kế Website Phân phối trà đóng gói Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phân phối trà OEM",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xuong-in-billboard",
    "keywordsMain": "thiết kế website xưởng in billboard",
    "h1": "Thiết Kế Website Xưởng in billboard Chuyên Nghiệp Chuẩn SEO",
    "angle": "website quảng cáo ngoài trời",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-day-lam-spa-tai-nha",
    "keywordsMain": "thiết kế website dạy làm spa tại nhà",
    "h1": "Thiết Kế Website Dạy làm spa tại nhà Chuyên Nghiệp Chuẩn SEO",
    "angle": "website học spa homecare",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tri-toc-bac-som",
    "keywordsMain": "thiết kế website trị tóc bạc sớm",
    "h1": "Thiết Kế Website Trị tóc bạc sớm Chuyên Nghiệp Chuẩn SEO",
    "angle": "website điều trị tóc bạc",
    "niche": "strategy"
  }
];

/** C — 40 */
const C_PRICING = [
  {
    "slug": "bao-gia-thiet-ke-website-xuong-go-ep",
    "keywordsMain": "báo giá thiết kế website xưởng gỗ ép",
    "h1": "Báo Giá Thiết Kế Website Xưởng gỗ ép 2026",
    "angle": "giá website xưởng gỗ ép",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-cho-thue-xe-7-cho",
    "keywordsMain": "báo giá thiết kế website cho thuê xe 7 chỗ",
    "h1": "Báo Giá Thiết Kế Website Cho thuê xe 7 chỗ 2026",
    "angle": "giá website thuê xe du lịch",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-day-lam-banh",
    "keywordsMain": "báo giá thiết kế website dạy làm bánh",
    "h1": "Báo Giá Thiết Kế Website Dạy làm bánh 2026",
    "angle": "giá website học làm bánh",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-tri-hoi-mieng",
    "keywordsMain": "báo giá thiết kế website trị hôi miệng",
    "h1": "Báo Giá Thiết Kế Website Trị hôi miệng 2026",
    "angle": "giá website trị hôi miệng",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-thiet-bi-thuy-san",
    "keywordsMain": "báo giá thiết kế website thiết bị thủy sản",
    "h1": "Báo Giá Thiết Kế Website Thiết bị thủy sản 2026",
    "angle": "giá website thiết bị thủy sản",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-noi-that-chung-cu",
    "keywordsMain": "báo giá thiết kế website nội thất chung cư",
    "h1": "Báo Giá Thiết Kế Website Nội thất chung cư 2026",
    "angle": "giá website thiết kế chung cư",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-phan-phoi-bia-craft",
    "keywordsMain": "báo giá thiết kế website phân phối bia",
    "h1": "Báo Giá Thiết Kế Website Phân phối bia 2026",
    "angle": "giá website phân phối bia",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-in-decal-uv",
    "keywordsMain": "báo giá thiết kế website in decal",
    "h1": "Báo Giá Thiết Kế Website In decal 2026",
    "angle": "giá website xưởng in decal",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-day-nail",
    "keywordsMain": "báo giá thiết kế website dạy nail",
    "h1": "Báo Giá Thiết Kế Website Dạy nail 2026",
    "angle": "giá website học nail",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-tri-toc-rung",
    "keywordsMain": "báo giá thiết kế website trị tóc rụng",
    "h1": "Báo Giá Thiết Kế Website Trị tóc rụng 2026",
    "angle": "giá website trị rụng tóc",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-lap-camera-ai",
    "keywordsMain": "báo giá thiết kế website lắp camera AI",
    "h1": "Báo Giá Thiết Kế Website Lắp camera AI 2026",
    "angle": "giá website lắp camera AI",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-pickleball",
    "keywordsMain": "báo giá thiết kế website pickleball",
    "h1": "Báo Giá Thiết Kế Website Pickleball 2026",
    "angle": "giá website cửa hàng pickleball",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-tu-van-hop-dong",
    "keywordsMain": "báo giá thiết kế website tư vấn hợp đồng",
    "h1": "Báo Giá Thiết Kế Website Tư vấn hợp đồng 2026",
    "angle": "giá website tư vấn hợp đồng",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-day-boc-sofa",
    "keywordsMain": "báo giá thiết kế website dạy bọc sofa",
    "h1": "Báo Giá Thiết Kế Website Dạy bọc sofa 2026",
    "angle": "giá website học bọc ghế",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-tri-viem-da",
    "keywordsMain": "báo giá thiết kế website trị viêm da",
    "h1": "Báo Giá Thiết Kế Website Trị viêm da 2026",
    "angle": "giá website trị viêm da",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-cho-thue-phong-hoc",
    "keywordsMain": "báo giá thiết kế website cho thuê phòng học",
    "h1": "Báo Giá Thiết Kế Website Cho thuê phòng học 2026",
    "angle": "giá website cho thuê phòng học",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-profile-cong-ty",
    "keywordsMain": "báo giá thiết kế website profile công ty",
    "h1": "Báo Giá Thiết Kế Website Profile công ty 2026",
    "angle": "giá website thiết kế profile",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-phan-phoi-sua-bot",
    "keywordsMain": "báo giá thiết kế website phân phối sữa bột",
    "h1": "Báo Giá Thiết Kế Website Phân phối sữa bột 2026",
    "angle": "giá website phân phối sữa",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-xuong-gach",
    "keywordsMain": "báo giá thiết kế website xưởng gạch",
    "h1": "Báo Giá Thiết Kế Website Xưởng gạch 2026",
    "angle": "giá website xưởng gạch",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-day-bonsai",
    "keywordsMain": "báo giá thiết kế website dạy bonsai",
    "h1": "Báo Giá Thiết Kế Website Dạy bonsai 2026",
    "angle": "giá website học bonsai",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-cua-go-cong-nghiep",
    "keywordsMain": "báo giá thiết kế website cửa gỗ công nghiệp",
    "h1": "Báo Giá Thiết Kế Website Cửa gỗ công nghiệp 2026",
    "angle": "giá website cửa gỗ",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-xe-limousine",
    "keywordsMain": "báo giá thiết kế website xe limousine",
    "h1": "Báo Giá Thiết Kế Website Xe limousine 2026",
    "angle": "giá website thuê limousine",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-banh-kem",
    "keywordsMain": "báo giá thiết kế website bánh kem",
    "h1": "Báo Giá Thiết Kế Website Bánh kem 2026",
    "angle": "giá website học bánh kem",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-rang-ven",
    "keywordsMain": "báo giá thiết kế website răng vẩn",
    "h1": "Báo Giá Thiết Kế Website Răng vẩn 2026",
    "angle": "giá website nha khoa răng",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-may-bom-thuy-san",
    "keywordsMain": "báo giá thiết kế website máy bơm thủy sản",
    "h1": "Báo Giá Thiết Kế Website Máy bơm thủy sản 2026",
    "angle": "giá website máy bơm ao",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-noi-that-biet-thu",
    "keywordsMain": "báo giá thiết kế website nội thất biệt thự",
    "h1": "Báo Giá Thiết Kế Website Nội thất biệt thự 2026",
    "angle": "giá website thiết kế biệt thự",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-nuoc-ngot",
    "keywordsMain": "báo giá thiết kế website nước ngọt",
    "h1": "Báo Giá Thiết Kế Website Nước ngọt 2026",
    "angle": "giá website phân phối nước ngọt",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-in-tem-nhan",
    "keywordsMain": "báo giá thiết kế website in tem nhãn",
    "h1": "Báo Giá Thiết Kế Website In tem nhãn 2026",
    "angle": "giá website in tem nhãn",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-noi-mi",
    "keywordsMain": "báo giá thiết kế website nối mi",
    "h1": "Báo Giá Thiết Kế Website Nối mi 2026",
    "angle": "giá website học nối mi",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-tri-nam",
    "keywordsMain": "báo giá thiết kế website trị nám",
    "h1": "Báo Giá Thiết Kế Website Trị nám 2026",
    "angle": "giá website trị nám",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-camera-wifi",
    "keywordsMain": "báo giá thiết kế website camera wifi",
    "h1": "Báo Giá Thiết Kế Website Camera wifi 2026",
    "angle": "giá website lắp camera wifi",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-vot-cau-long",
    "keywordsMain": "báo giá thiết kế website vợt cầu lông",
    "h1": "Báo Giá Thiết Kế Website Vợt cầu lông 2026",
    "angle": "giá website cửa hàng cầu lông",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-hop-dong-lao-dong",
    "keywordsMain": "báo giá thiết kế website hợp đồng lao động",
    "h1": "Báo Giá Thiết Kế Website Hợp đồng lao động 2026",
    "angle": "giá website tư vấn lao động",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-rem-cua",
    "keywordsMain": "báo giá thiết kế website rèm cửa",
    "h1": "Báo Giá Thiết Kế Website Rèm cửa 2026",
    "angle": "giá website học may rèm",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-tri-mun-da-lieu",
    "keywordsMain": "báo giá thiết kế website trị mụn",
    "h1": "Báo Giá Thiết Kế Website Trị mụn 2026",
    "angle": "giá website trị mụn",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-studio-quay-phim",
    "keywordsMain": "báo giá thiết kế website studio quay phim",
    "h1": "Báo Giá Thiết Kế Website Studio quay phim 2026",
    "angle": "giá website studio quay phim",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-catalog-b2b",
    "keywordsMain": "báo giá thiết kế website catalog B2B",
    "h1": "Báo Giá Thiết Kế Website Catalog B2B 2026",
    "angle": "giá website catalog doanh nghiệp",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-bot-giat",
    "keywordsMain": "báo giá thiết kế website bột giặt",
    "h1": "Báo Giá Thiết Kế Website Bột giặt 2026",
    "angle": "giá website phân phối bột giặt",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-gach-op-tuong",
    "keywordsMain": "báo giá thiết kế website gạch ốp tường",
    "h1": "Báo Giá Thiết Kế Website Gạch ốp tường 2026",
    "angle": "giá website gạch ốp",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-cay-canh",
    "keywordsMain": "báo giá thiết kế website cây cảnh",
    "h1": "Báo Giá Thiết Kế Website Cây cảnh 2026",
    "angle": "giá website học cây cảnh",
    "niche": "strategy"
  }
];

/** D — 35 */
const D_ONPAGE = [
  {
    "slug": "seo-on-page-title-tag-website",
    "keywordsMain": "seo on page title tag website",
    "h1": "SEO On-Page Title tag website — Tối Ưu Trang",
    "angle": "viết title tag chuẩn SEO",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-meta-description-trang",
    "keywordsMain": "seo on page meta description trang",
    "h1": "SEO On-Page Meta description trang — Tối Ưu Trang",
    "angle": "meta description tăng CTR",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-heading-h1-h2",
    "keywordsMain": "seo on page heading H1 H2",
    "h1": "SEO On-Page Heading H1 H2 — Tối Ưu Trang",
    "angle": "cấu trúc heading on-page",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-noi-dung-pillar",
    "keywordsMain": "seo on page nội dung pillar",
    "h1": "SEO On-Page Nội dung pillar — Tối Ưu Trang",
    "angle": "bài pillar cluster SEO",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-internal-link-onpage",
    "keywordsMain": "seo on page internal link on-page",
    "h1": "SEO On-Page Internal link on-page — Tối Ưu Trang",
    "angle": "liên kết nội bộ trong bài",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-anchor-text-seo",
    "keywordsMain": "seo on page anchor text SEO",
    "h1": "SEO On-Page Anchor text SEO — Tối Ưu Trang",
    "angle": "anchor text tự nhiên",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-url-slug-chuan",
    "keywordsMain": "seo on page URL slug chuẩn",
    "h1": "SEO On-Page URL slug chuẩn — Tối Ưu Trang",
    "angle": "slug URL thân thiện SEO",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-canonical-tag",
    "keywordsMain": "seo on page canonical tag",
    "h1": "SEO On-Page Canonical tag — Tối Ưu Trang",
    "angle": "thẻ canonical tránh trùng",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-meta-robots-noindex",
    "keywordsMain": "seo on page meta robots noindex",
    "h1": "SEO On-Page Meta robots noindex — Tối Ưu Trang",
    "angle": "noindex trang mỏng",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-open-graph-tag",
    "keywordsMain": "seo on page open graph tag",
    "h1": "SEO On-Page Open graph tag — Tối Ưu Trang",
    "angle": "OG tag chia sẻ social",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-twitter-card",
    "keywordsMain": "seo on page twitter card",
    "h1": "SEO On-Page Twitter card — Tối Ưu Trang",
    "angle": "Twitter card preview",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-alt-text-hinh-anh",
    "keywordsMain": "seo on page alt text hình ảnh",
    "h1": "SEO On-Page Alt text hình ảnh — Tối Ưu Trang",
    "angle": "alt image SEO accessibility",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-noi-dung-e-e-a-t",
    "keywordsMain": "seo on page nội dung E-E-A-T",
    "h1": "SEO On-Page Nội dung E-E-A-T — Tối Ưu Trang",
    "angle": "nội dung thể hiện chuyên gia",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-keyword-density",
    "keywordsMain": "seo on page keyword density",
    "h1": "SEO On-Page Keyword density — Tối Ưu Trang",
    "angle": "mật độ từ khóa tự nhiên",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-lsi-keyword",
    "keywordsMain": "seo on page LSI keyword",
    "h1": "SEO On-Page LSI keyword — Tối Ưu Trang",
    "angle": "từ khóa ngữ nghĩa liên quan",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-featured-snippet",
    "keywordsMain": "seo on page featured snippet",
    "h1": "SEO On-Page Featured snippet — Tối Ưu Trang",
    "angle": "tối ưu snippet vị trí 0",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-faq-on-page",
    "keywordsMain": "seo on page FAQ on-page",
    "h1": "SEO On-Page FAQ on-page — Tối Ưu Trang",
    "angle": "FAQ schema trong trang",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-table-of-contents",
    "keywordsMain": "seo on page table of contents",
    "h1": "SEO On-Page Table of contents — Tối Ưu Trang",
    "angle": "mục lục bài viết dài",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-content-length-seo",
    "keywordsMain": "seo on page content length SEO",
    "h1": "SEO On-Page Content length SEO — Tối Ưu Trang",
    "angle": "độ dài nội dung tối ưu",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-thin-content-fix",
    "keywordsMain": "seo on page thin content fix",
    "h1": "SEO On-Page Thin content fix — Tối Ưu Trang",
    "angle": "sửa nội dung mỏng",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-duplicate-content-onpage",
    "keywordsMain": "seo on page duplicate content on-page",
    "h1": "SEO On-Page Duplicate content on-page — Tối Ưu Trang",
    "angle": "nội dung trùng lặp on-page",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-keyword-cannibalization",
    "keywordsMain": "seo on page keyword cannibalization",
    "h1": "SEO On-Page Keyword cannibalization — Tối Ưu Trang",
    "angle": "cạnh tranh từ khóa nội bộ",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-pillar-page-structure",
    "keywordsMain": "seo on page pillar page structure",
    "h1": "SEO On-Page Pillar page structure — Tối Ưu Trang",
    "angle": "cấu trúc trang trụ cột",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-cluster-content-link",
    "keywordsMain": "seo on page cluster content link",
    "h1": "SEO On-Page Cluster content link — Tối Ưu Trang",
    "angle": "liên kết cluster về pillar",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-on-page-audit-checklist",
    "keywordsMain": "seo on page on-page audit checklist",
    "h1": "SEO On-Page On-page audit checklist — Tối Ưu Trang",
    "angle": "checklist audit on-page",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-serp-title-ctr",
    "keywordsMain": "seo on page SERP title CTR",
    "h1": "SEO On-Page SERP title CTR — Tối Ưu Trang",
    "angle": "title tăng CTR SERP",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-meta-description-ctr",
    "keywordsMain": "seo on page meta description CTR",
    "h1": "SEO On-Page Meta description CTR — Tối Ưu Trang",
    "angle": "mô tả tăng click SERP",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-content-update-seo",
    "keywordsMain": "seo on page content update SEO",
    "h1": "SEO On-Page Content update SEO — Tối Ưu Trang",
    "angle": "cập nhật nội dung refresh SEO",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-author-bio-page",
    "keywordsMain": "seo on page author bio page",
    "h1": "SEO On-Page Author bio page — Tối Ưu Trang",
    "angle": "trang tác giả E-E-A-T",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-about-page-seo",
    "keywordsMain": "seo on page about page SEO",
    "h1": "SEO On-Page About page SEO — Tối Ưu Trang",
    "angle": "trang giới thiệu chuẩn SEO",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-contact-page-seo",
    "keywordsMain": "seo on page contact page SEO",
    "h1": "SEO On-Page Contact page SEO — Tối Ưu Trang",
    "angle": "trang liên hệ local SEO",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-service-page-seo",
    "keywordsMain": "seo on page service page SEO",
    "h1": "SEO On-Page Service page SEO — Tối Ưu Trang",
    "angle": "trang dịch vụ on-page",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-landing-page-onpage",
    "keywordsMain": "seo on page landing page on-page",
    "h1": "SEO On-Page Landing page on-page — Tối Ưu Trang",
    "angle": "landing page SEO ads",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-blog-post-onpage",
    "keywordsMain": "seo on page blog post on-page",
    "h1": "SEO On-Page Blog post on-page — Tối Ưu Trang",
    "angle": "bài blog on-page chuẩn",
    "niche": "seo"
  },
  {
    "slug": "seo-on-page-category-page-seo",
    "keywordsMain": "seo on page category page SEO",
    "h1": "SEO On-Page Category page SEO — Tối Ưu Trang",
    "angle": "trang danh mục ecommerce",
    "niche": "seo"
  }
];

/** E — 30 */
const E_TIKTOK_SHOP = [
  {
    "slug": "tiktok-shop-my-pham",
    "keywordsMain": "tiktok shop mỹ phẩm",
    "h1": "TikTok Shop Mỹ phẩm — Bán Hàng Social",
    "angle": "TikTok Shop skincare livestream",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-thoi-trang-nu",
    "keywordsMain": "tiktok shop thời trang nữ",
    "h1": "TikTok Shop Thời trang nữ — Bán Hàng Social",
    "angle": "TikTok Shop fashion nữ",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-thoi-trang-nam",
    "keywordsMain": "tiktok shop thời trang nam",
    "h1": "TikTok Shop Thời trang nam — Bán Hàng Social",
    "angle": "TikTok Shop fashion nam",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-do-gia-dung",
    "keywordsMain": "tiktok shop đồ gia dụng",
    "h1": "TikTok Shop Đồ gia dụng — Bán Hàng Social",
    "angle": "TikTok Shop gia dụng viral",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-thuc-pham",
    "keywordsMain": "tiktok shop thực phẩm",
    "h1": "TikTok Shop Thực phẩm — Bán Hàng Social",
    "angle": "TikTok Shop thực phẩm sạch",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-do-choi-tre-em",
    "keywordsMain": "tiktok shop đồ chơi trẻ em",
    "h1": "TikTok Shop Đồ chơi trẻ em — Bán Hàng Social",
    "angle": "TikTok Shop đồ chơi trẻ",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-giay-dep",
    "keywordsMain": "tiktok shop giày dép",
    "h1": "TikTok Shop Giày dép — Bán Hàng Social",
    "angle": "TikTok Shop giày dép trend",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-phu-kien-thoi-trang",
    "keywordsMain": "tiktok shop phụ kiện thời trang",
    "h1": "TikTok Shop Phụ kiện thời trang — Bán Hàng Social",
    "angle": "TikTok Shop phụ kiện",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-my-pham-han-quoc",
    "keywordsMain": "tiktok shop mỹ phẩm Hàn Quốc",
    "h1": "TikTok Shop Mỹ phẩm Hàn Quốc — Bán Hàng Social",
    "angle": "TikTok Shop mỹ phẩm Hàn",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-do-cong-nghe",
    "keywordsMain": "tiktok shop đồ công nghệ",
    "h1": "TikTok Shop Đồ công nghệ — Bán Hàng Social",
    "angle": "TikTok Shop gadget tech",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-noi-that-mini",
    "keywordsMain": "tiktok shop nội thất mini",
    "h1": "TikTok Shop Nội thất mini — Bán Hàng Social",
    "angle": "TikTok Shop decor nhà cửa",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-do-handmade",
    "keywordsMain": "tiktok shop đồ handmade",
    "h1": "TikTok Shop Đồ handmade — Bán Hàng Social",
    "angle": "TikTok Shop thủ công handmade",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-sach-va-khoa-hoc",
    "keywordsMain": "tiktok shop sách và khóa học",
    "h1": "TikTok Shop Sách và khóa học — Bán Hàng Social",
    "angle": "TikTok Shop sách ebook",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-do-the-thao",
    "keywordsMain": "tiktok shop đồ thể thao",
    "h1": "TikTok Shop Đồ thể thao — Bán Hàng Social",
    "angle": "TikTok Shop thể thao fitness",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-me-va-be",
    "keywordsMain": "tiktok shop mẹ và bé",
    "h1": "TikTok Shop Mẹ và bé — Bán Hàng Social",
    "angle": "TikTok Shop mẹ bé",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-do-an-vat",
    "keywordsMain": "tiktok shop đồ ăn vặt",
    "h1": "TikTok Shop Đồ ăn vặt — Bán Hàng Social",
    "angle": "TikTok Shop snack FMCG",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-tra-sua-nguyen-lieu",
    "keywordsMain": "tiktok shop trà sữa nguyên liệu",
    "h1": "TikTok Shop Trà sữa nguyên liệu — Bán Hàng Social",
    "angle": "TikTok Shop nguyên liệu F&B",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-my-pham-organic",
    "keywordsMain": "tiktok shop mỹ phẩm organic",
    "h1": "TikTok Shop Mỹ phẩm organic — Bán Hàng Social",
    "angle": "TikTok Shop mỹ phẩm thiên nhiên",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-thiet-bi-nha-bep",
    "keywordsMain": "tiktok shop thiết bị nhà bếp",
    "h1": "TikTok Shop Thiết bị nhà bếp — Bán Hàng Social",
    "angle": "TikTok Shop đồ bếp",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-phu-kien-dien-thoai",
    "keywordsMain": "tiktok shop phụ kiện điện thoại",
    "h1": "TikTok Shop Phụ kiện điện thoại — Bán Hàng Social",
    "angle": "TikTok Shop phụ kiện phone",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-do-camping",
    "keywordsMain": "tiktok shop đồ camping",
    "h1": "TikTok Shop Đồ camping — Bán Hàng Social",
    "angle": "TikTok Shop outdoor camping",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-my-pham-nam",
    "keywordsMain": "tiktok shop mỹ phẩm nam",
    "h1": "TikTok Shop Mỹ phẩm nam — Bán Hàng Social",
    "angle": "TikTok Shop grooming nam",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-thuc-pham-chuc-nang",
    "keywordsMain": "tiktok shop thực phẩm chức năng",
    "h1": "TikTok Shop Thực phẩm chức năng — Bán Hàng Social",
    "angle": "TikTok Shop TPCN",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-noi-that-van-phong",
    "keywordsMain": "tiktok shop nội thất văn phòng",
    "h1": "TikTok Shop Nội thất văn phòng — Bán Hàng Social",
    "angle": "TikTok Shop nội thất VP",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-do-decor",
    "keywordsMain": "tiktok shop đồ decor",
    "h1": "TikTok Shop Đồ decor — Bán Hàng Social",
    "angle": "TikTok Shop decor aesthetic",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-thoi-trang-big-size",
    "keywordsMain": "tiktok shop thời trang big size",
    "h1": "TikTok Shop Thời trang big size — Bán Hàng Social",
    "angle": "TikTok Shop plus size",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-giay-sneaker",
    "keywordsMain": "tiktok shop giày sneaker",
    "h1": "TikTok Shop Giày sneaker — Bán Hàng Social",
    "angle": "TikTok Shop sneaker authentic",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-my-pham-local",
    "keywordsMain": "tiktok shop mỹ phẩm local brand",
    "h1": "TikTok Shop Mỹ phẩm local brand — Bán Hàng Social",
    "angle": "TikTok Shop brand Việt",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-do-nha-cua",
    "keywordsMain": "tiktok shop đồ nhà cửa",
    "h1": "TikTok Shop Đồ nhà cửa — Bán Hàng Social",
    "angle": "TikTok Shop tiện ích nhà",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-phu-kien-laptop",
    "keywordsMain": "tiktok shop phụ kiện laptop",
    "h1": "TikTok Shop Phụ kiện laptop — Bán Hàng Social",
    "angle": "TikTok Shop phụ kiện laptop",
    "niche": "strategy"
  }
];

/** F — 25 */
const F_ORM = [
  {
    "slug": "quan-tri-danh-tieng-google-review",
    "keywordsMain": "quản trị danh tiếng Google review",
    "h1": "Quản Trị Danh Tiếng Google review Online",
    "angle": "thu thập review Google Maps",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-phan-hoi-review-xau",
    "keywordsMain": "quản trị danh tiếng phản hồi review xấu",
    "h1": "Quản Trị Danh Tiếng Phản hồi review xấu Online",
    "angle": "xử lý review 1 sao",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-danh-gia-facebook",
    "keywordsMain": "quản trị danh tiếng đánh giá Facebook",
    "h1": "Quản Trị Danh Tiếng Đánh giá Facebook Online",
    "angle": "quản lý rating fanpage",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-crisis-communication",
    "keywordsMain": "quản trị danh tiếng crisis communication",
    "h1": "Quản Trị Danh Tiếng Crisis communication Online",
    "angle": "xử lý khủng hoảng truyền thông",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-brand-monitoring",
    "keywordsMain": "quản trị danh tiếng brand monitoring",
    "h1": "Quản Trị Danh Tiếng Brand monitoring Online",
    "angle": "theo dõi nhắc tên thương hiệu",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-social-listening",
    "keywordsMain": "quản trị danh tiếng social listening",
    "h1": "Quản Trị Danh Tiếng Social listening Online",
    "angle": "lắng nghe mạng xã hội",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-online-reputation-score",
    "keywordsMain": "quản trị danh tiếng online reputation score",
    "h1": "Quản Trị Danh Tiếng Online reputation score Online",
    "angle": "điểm uy tín online",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-fake-review-report",
    "keywordsMain": "quản trị danh tiếng fake review report",
    "h1": "Quản Trị Danh Tiếng Fake review report Online",
    "angle": "báo cáo review giả",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-testimonial-website",
    "keywordsMain": "quản trị danh tiếng testimonial website",
    "h1": "Quản Trị Danh Tiếng Testimonial website Online",
    "angle": "đưa testimonial lên web",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-case-study-proof",
    "keywordsMain": "quản trị danh tiếng case study proof",
    "h1": "Quản Trị Danh Tiếng Case study proof Online",
    "angle": "case study làm social proof",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-pr-bao-chi",
    "keywordsMain": "quản trị danh tiếng PR báo chí",
    "h1": "Quản Trị Danh Tiếng PR báo chí Online",
    "angle": "đặt tin báo chí uy tín",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-influencer-reputation",
    "keywordsMain": "quản trị danh tiếng influencer reputation",
    "h1": "Quản Trị Danh Tiếng Influencer reputation Online",
    "angle": "KOL bảo vệ thương hiệu",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-employee-review",
    "keywordsMain": "quản trị danh tiếng employee review",
    "h1": "Quản Trị Danh Tiếng Employee review Online",
    "angle": "quản lý đánh giá nhân viên",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-glassdoor-reputation",
    "keywordsMain": "quản trị danh tiếng Glassdoor reputation",
    "h1": "Quản Trị Danh Tiếng Glassdoor reputation Online",
    "angle": "uy tín tuyển dụng employer",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-maps-rating-tang",
    "keywordsMain": "quản trị danh tiếng Maps rating tăng",
    "h1": "Quản Trị Danh Tiếng Maps rating tăng Online",
    "angle": "tăng sao Google Maps",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-review-automation",
    "keywordsMain": "quản trị danh tiếng review automation",
    "h1": "Quản Trị Danh Tiếng Review automation Online",
    "angle": "tự động xin review sau dịch vụ",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-sentiment-analysis",
    "keywordsMain": "quản trị danh tiếng sentiment analysis",
    "h1": "Quản Trị Danh Tiếng Sentiment analysis Online",
    "angle": "phân tích cảm xúc review",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-competitor-reputation",
    "keywordsMain": "quản trị danh tiếng competitor reputation",
    "h1": "Quản Trị Danh Tiếng Competitor reputation Online",
    "angle": "so sánh uy tín đối thủ",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-brand-mention-alert",
    "keywordsMain": "quản trị danh tiếng brand mention alert",
    "h1": "Quản Trị Danh Tiếng Brand mention alert Online",
    "angle": "cảnh báo nhắc brand online",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-reputation-audit",
    "keywordsMain": "quản trị danh tiếng reputation audit",
    "h1": "Quản Trị Danh Tiếng Reputation audit Online",
    "angle": "audit danh tiếng online",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-review-widget-website",
    "keywordsMain": "quản trị danh tiếng review widget website",
    "h1": "Quản Trị Danh Tiếng Review widget website Online",
    "angle": "widget review trên web",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-trustpilot-viet-nam",
    "keywordsMain": "quản trị danh tiếng Trustpilot Việt Nam",
    "h1": "Quản Trị Danh Tiếng Trustpilot Việt Nam Online",
    "angle": "quản lý Trustpilot VN",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-shopee-rating-shop",
    "keywordsMain": "quản trị danh tiếng Shopee rating shop",
    "h1": "Quản Trị Danh Tiếng Shopee rating shop Online",
    "angle": "tăng đánh giá Shopee",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-tiktok-comment-manage",
    "keywordsMain": "quản trị danh tiếng TikTok comment manage",
    "h1": "Quản Trị Danh Tiếng TikTok comment manage Online",
    "angle": "quản lý bình luận TikTok",
    "niche": "strategy"
  },
  {
    "slug": "quan-tri-danh-tieng-zalo-review-manage",
    "keywordsMain": "quản trị danh tiếng Zalo review manage",
    "h1": "Quản Trị Danh Tiếng Zalo review manage Online",
    "angle": "quản lý phản hồi Zalo OA",
    "niche": "strategy"
  }
];

/** G — 30 */
const G_MAPS = [
  {
    "slug": "seo-google-maps-wellness-spa-hue",
    "keywordsMain": "seo google maps spa Huế",
    "h1": "SEO Google Maps Spa Huế",
    "angle": "Maps spa Huế cố đô",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-hang-dong-ha",
    "keywordsMain": "seo google maps nhà hàng Đông Hà",
    "h1": "SEO Google Maps Nhà hàng Đông Hà",
    "angle": "Maps nhà hàng Đông Hà",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-khach-san-tam-ky",
    "keywordsMain": "seo google maps khách sạn Tam Kỳ",
    "h1": "SEO Google Maps Khách sạn Tam Kỳ",
    "angle": "Maps khách sạn Tam Kỳ",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-pleiku",
    "keywordsMain": "seo google maps nha khoa Pleiku",
    "h1": "SEO Google Maps Nha khoa Pleiku",
    "angle": "Maps nha khoa Pleiku",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-gym-bac-giang",
    "keywordsMain": "seo google maps gym Bắc Giang",
    "h1": "SEO Google Maps Gym Bắc Giang",
    "angle": "Maps gym Bắc Giang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-vien-bac-ninh",
    "keywordsMain": "seo google maps thẩm mỹ Bắc Ninh",
    "h1": "SEO Google Maps Thẩm mỹ Bắc Ninh",
    "angle": "Maps thẩm mỹ Bắc Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-bat-dong-san-thai-binh",
    "keywordsMain": "seo google maps bất động sản Thái Bình",
    "h1": "SEO Google Maps Bất động sản Thái Bình",
    "angle": "Maps BĐS Thái Bình",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-noi-that-ha-tinh",
    "keywordsMain": "seo google maps nội thất Hà Tĩnh",
    "h1": "SEO Google Maps Nội thất Hà Tĩnh",
    "angle": "Maps nội thất Hà Tĩnh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-ha-dong",
    "keywordsMain": "seo google maps xây dựng Hà Đông",
    "h1": "SEO Google Maps Xây dựng Hà Đông",
    "angle": "Maps nhà thầu Hà Đông",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-thu-duc",
    "keywordsMain": "seo google maps phòng khám Thủ Đức",
    "h1": "SEO Google Maps Phòng khám Thủ Đức",
    "angle": "Maps phòng khám Thủ Đức",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-du-lich-hue",
    "keywordsMain": "seo google maps du lịch Huế",
    "h1": "SEO Google Maps Du lịch Huế",
    "angle": "Maps tour Huế",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-dong-ha",
    "keywordsMain": "seo google maps mỹ phẩm Đông Hà",
    "h1": "SEO Google Maps Mỹ phẩm Đông Hà",
    "angle": "Maps shop mỹ phẩm Đông Hà",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-dien-may-tam-ky",
    "keywordsMain": "seo google maps điện máy Tam Kỳ",
    "h1": "SEO Google Maps Điện máy Tam Kỳ",
    "angle": "Maps điện máy Tam Kỳ",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-o-to-pleiku",
    "keywordsMain": "seo google maps ô tô Pleiku",
    "h1": "SEO Google Maps Ô tô Pleiku",
    "angle": "Maps đại lý xe Pleiku",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-luat-su-bac-giang",
    "keywordsMain": "seo google maps luật sư Bắc Giang",
    "h1": "SEO Google Maps Luật sư Bắc Giang",
    "angle": "Maps văn phòng luật Bắc Giang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-ke-toan-bac-ninh",
    "keywordsMain": "seo google maps kế toán Bắc Ninh",
    "h1": "SEO Google Maps Kế toán Bắc Ninh",
    "angle": "Maps kế toán Bắc Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-logistics-thai-binh",
    "keywordsMain": "seo google maps logistics Thái Bình",
    "h1": "SEO Google Maps Logistics Thái Bình",
    "angle": "Maps logistics Thái Bình",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-anh-ngu-ha-tinh",
    "keywordsMain": "seo google maps anh ngữ Hà Tĩnh",
    "h1": "SEO Google Maps Anh ngữ Hà Tĩnh",
    "angle": "Maps anh ngữ Hà Tĩnh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-mam-non-ha-dong",
    "keywordsMain": "seo google maps mầm non Hà Đông",
    "h1": "SEO Google Maps Mầm non Hà Đông",
    "angle": "Maps mầm non Hà Đông",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-quan-cafe-thu-duc",
    "keywordsMain": "seo google maps quán cafe Thủ Đức",
    "h1": "SEO Google Maps Quán cafe Thủ Đức",
    "angle": "Maps cafe Thủ Đức",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-day-lam-banh-hue",
    "keywordsMain": "seo google maps dạy làm bánh Huế",
    "h1": "SEO Google Maps Dạy làm bánh Huế",
    "angle": "Maps học làm bánh Huế",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pickleball-bac-ninh",
    "keywordsMain": "seo google maps pickleball Bắc Ninh",
    "h1": "SEO Google Maps Pickleball Bắc Ninh",
    "angle": "Maps sân pickleball Bắc Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-cho-thue-xe-pleiku",
    "keywordsMain": "seo google maps cho thuê xe Pleiku",
    "h1": "SEO Google Maps Cho thuê xe Pleiku",
    "angle": "Maps thuê xe Pleiku",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tri-toc-rung-thu-duc",
    "keywordsMain": "seo google maps trị tóc rụng Thủ Đức",
    "h1": "SEO Google Maps Trị tóc rụng Thủ Đức",
    "angle": "Maps trị rụng tóc Thủ Đức",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-lap-camera-bac-giang",
    "keywordsMain": "seo google maps lắp camera Bắc Giang",
    "h1": "SEO Google Maps Lắp camera Bắc Giang",
    "angle": "Maps lắp camera Bắc Giang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-day-nail-tam-ky",
    "keywordsMain": "seo google maps dạy nail Tam Kỳ",
    "h1": "SEO Google Maps Dạy nail Tam Kỳ",
    "angle": "Maps học nail Tam Kỳ",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xuong-go-dong-ha",
    "keywordsMain": "seo google maps xưởng gỗ Đông Hà",
    "h1": "SEO Google Maps Xưởng gỗ Đông Hà",
    "angle": "Maps xưởng gỗ Đông Hà",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-thiet-bi-thuy-san-ha-tinh",
    "keywordsMain": "seo google maps thiết bị thủy sản Hà Tĩnh",
    "h1": "SEO Google Maps Thiết bị thủy sản Hà Tĩnh",
    "angle": "Maps thiết bị thủy sản Hà Tĩnh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-noi-that-chung-cu-thai-binh",
    "keywordsMain": "seo google maps nội thất chung cư Thái Bình",
    "h1": "SEO Google Maps Nội thất chung cư Thái Bình",
    "angle": "Maps nội thất Thái Bình",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-day-bonsai-ha-dong",
    "keywordsMain": "seo google maps dạy bonsai Hà Đông",
    "h1": "SEO Google Maps Dạy bonsai Hà Đông",
    "angle": "Maps học bonsai Hà Đông",
    "niche": "seo"
  }
];

/** H — 18 */
const H_MKT = [
  {
    "slug": "marketing-xuong-go-ep",
    "keywordsMain": "marketing xưởng gỗ ép",
    "h1": "Marketing Xưởng gỗ ép — Chiến Lược Tăng Trưởng",
    "angle": "marketing xưởng gỗ B2B",
    "niche": "strategy"
  },
  {
    "slug": "marketing-cho-thue-xe",
    "keywordsMain": "marketing cho thuê xe",
    "h1": "Marketing Cho thuê xe — Chiến Lược Tăng Trưởng",
    "angle": "marketing dịch vụ thuê xe",
    "niche": "strategy"
  },
  {
    "slug": "marketing-day-lam-banh",
    "keywordsMain": "marketing dạy làm bánh",
    "h1": "Marketing Dạy làm bánh — Chiến Lược Tăng Trưởng",
    "angle": "marketing trung tâm pastry",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tri-hoi-mieng",
    "keywordsMain": "marketing trị hôi miệng",
    "h1": "Marketing Trị hôi miệng — Chiến Lược Tăng Trưởng",
    "angle": "marketing nha khoa hôi miệng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-thiet-bi-thuy-san",
    "keywordsMain": "marketing thiết bị thủy sản",
    "h1": "Marketing Thiết bị thủy sản — Chiến Lược Tăng Trưởng",
    "angle": "marketing thiết bị nuôi trồng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-noi-that-chung-cu",
    "keywordsMain": "marketing nội thất chung cư",
    "h1": "Marketing Nội thất chung cư — Chiến Lược Tăng Trưởng",
    "angle": "marketing thiết kế căn hộ",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phan-phoi-bia",
    "keywordsMain": "marketing phân phối bia",
    "h1": "Marketing Phân phối bia — Chiến Lược Tăng Trưởng",
    "angle": "marketing phân phối đồ uống",
    "niche": "strategy"
  },
  {
    "slug": "marketing-in-decal",
    "keywordsMain": "marketing in decal",
    "h1": "Marketing In decal — Chiến Lược Tăng Trưởng",
    "angle": "marketing xưởng in decal",
    "niche": "strategy"
  },
  {
    "slug": "marketing-day-nail",
    "keywordsMain": "marketing dạy nail",
    "h1": "Marketing Dạy nail — Chiến Lược Tăng Trưởng",
    "angle": "marketing học nail art",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tri-toc-rung",
    "keywordsMain": "marketing trị tóc rụng",
    "h1": "Marketing Trị tóc rụng — Chiến Lược Tăng Trưởng",
    "angle": "marketing phòng khám tóc",
    "niche": "strategy"
  },
  {
    "slug": "marketing-camera-ai",
    "keywordsMain": "marketing camera AI",
    "h1": "Marketing Camera AI — Chiến Lược Tăng Trưởng",
    "angle": "marketing lắp camera thông minh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pickleball",
    "keywordsMain": "marketing pickleball",
    "h1": "Marketing Pickleball — Chiến Lược Tăng Trưởng",
    "angle": "marketing cửa hàng pickleball",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tu-van-hop-dong",
    "keywordsMain": "marketing tư vấn hợp đồng",
    "h1": "Marketing Tư vấn hợp đồng — Chiến Lược Tăng Trưởng",
    "angle": "marketing văn phòng luật",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tiktok-shop-live",
    "keywordsMain": "marketing TikTok Shop live",
    "h1": "Marketing TikTok Shop live — Chiến Lược Tăng Trưởng",
    "angle": "marketing livestream TikTok Shop",
    "niche": "strategy"
  },
  {
    "slug": "marketing-seo-on-page-sme",
    "keywordsMain": "marketing SEO on-page SME",
    "h1": "Marketing SEO on-page SME — Chiến Lược Tăng Trưởng",
    "angle": "marketing tối ưu on-page",
    "niche": "strategy"
  },
  {
    "slug": "marketing-orm-google-review",
    "keywordsMain": "marketing ORM Google review",
    "h1": "Marketing ORM Google review — Chiến Lược Tăng Trưởng",
    "angle": "marketing quản trị review",
    "niche": "strategy"
  },
  {
    "slug": "marketing-reputation-management",
    "keywordsMain": "marketing reputation management",
    "h1": "Marketing Reputation management — Chiến Lược Tăng Trưởng",
    "angle": "marketing bảo vệ thương hiệu",
    "niche": "strategy"
  },
  {
    "slug": "marketing-brand-monitoring-sme",
    "keywordsMain": "marketing brand monitoring SME",
    "h1": "Marketing Brand monitoring SME — Chiến Lược Tăng Trưởng",
    "angle": "marketing theo dõi thương hiệu",
    "niche": "strategy"
  },
  {
    "slug": "marketing-social-listening-vn",
    "keywordsMain": "marketing social listening VN",
    "h1": "Marketing Social listening VN — Chiến Lược Tăng Trưởng",
    "angle": "marketing lắng nghe MXH",
    "niche": "strategy"
  },
  {
    "slug": "marketing-crisis-pr-online",
    "keywordsMain": "marketing crisis PR online",
    "h1": "Marketing Crisis PR online — Chiến Lược Tăng Trưởng",
    "angle": "marketing xử lý khủng hoảng",
    "niche": "strategy"
  }
];

/** I — 25 */
const I_COMPARE = [
  {
    "slug": "seo-on-page-hay-technical-seo",
    "keywordsMain": "SEO on-page hay technical SEO",
    "h1": "SEO On-Page Hay Technical SEO?",
    "angle": "ưu tiên tối ưu SEO",
    "niche": "seo"
  },
  {
    "slug": "title-tag-hay-h1-keyword",
    "keywordsMain": "title tag hay H1 keyword",
    "h1": "Title Tag Hay H1 Keyword?",
    "angle": "đặt từ khóa on-page",
    "niche": "seo"
  },
  {
    "slug": "pillar-page-hay-blog-dai",
    "keywordsMain": "pillar page hay blog dài",
    "h1": "Pillar Page Hay Blog Dài?",
    "angle": "cấu trúc nội dung SEO",
    "niche": "content"
  },
  {
    "slug": "internal-link-hay-backlink",
    "keywordsMain": "internal link hay backlink",
    "h1": "Internal Link Hay Backlink?",
    "angle": "liên kết SEO ưu tiên",
    "niche": "seo"
  },
  {
    "slug": "featured-snippet-hay-rank-top3",
    "keywordsMain": "featured snippet hay rank top 3",
    "h1": "Featured Snippet Hay Rank Top 3?",
    "angle": "chiến lược SERP",
    "niche": "seo"
  },
  {
    "slug": "content-dai-hay-content-ngan",
    "keywordsMain": "content dài hay content ngắn",
    "h1": "Content Dài Hay Content Ngắn?",
    "angle": "độ dài bài viết SEO",
    "niche": "content"
  },
  {
    "slug": "faq-schema-hay-faq-text",
    "keywordsMain": "FAQ schema hay FAQ text",
    "h1": "FAQ Schema Hay FAQ Text?",
    "angle": "FAQ on-page SEO",
    "niche": "seo"
  },
  {
    "slug": "tiktok-shop-hay-shopee-ban-hang",
    "keywordsMain": "TikTok Shop hay Shopee",
    "h1": "TikTok Shop Hay Shopee?",
    "angle": "kênh bán hàng online",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-live-hay-facebook-live",
    "keywordsMain": "TikTok live hay Facebook live",
    "h1": "TikTok Live Hay Facebook Live?",
    "angle": "livestream bán hàng",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-affiliate-hay-kol",
    "keywordsMain": "TikTok affiliate hay KOL",
    "h1": "TikTok Affiliate Hay KOL?",
    "angle": "chiến lược TikTok Shop",
    "niche": "strategy"
  },
  {
    "slug": "review-google-hay-facebook-uy-tin",
    "keywordsMain": "review Google hay Facebook",
    "h1": "Review Google Hay Facebook?",
    "angle": "kênh đánh giá uy tín",
    "niche": "strategy"
  },
  {
    "slug": "orm-tu-lam-hay-agency",
    "keywordsMain": "ORM tự làm hay agency",
    "h1": "ORM Tự Làm Hay Agency?",
    "angle": "quản trị danh tiếng",
    "niche": "strategy"
  },
  {
    "slug": "phan-hoi-review-xau-hay-bo-qua",
    "keywordsMain": "phản hồi review xấu hay bỏ qua",
    "h1": "Phản Hồi Review Xấu Hay Bỏ Qua?",
    "angle": "xử lý review tiêu cực",
    "niche": "strategy"
  },
  {
    "slug": "brand-monitoring-hay-manual-check",
    "keywordsMain": "brand monitoring hay manual check",
    "h1": "Brand Monitoring Hay Manual Check?",
    "angle": "theo dõi thương hiệu",
    "niche": "strategy"
  },
  {
    "slug": "testimonial-hay-case-study",
    "keywordsMain": "testimonial hay case study",
    "h1": "Testimonial Hay Case Study?",
    "angle": "social proof B2B",
    "niche": "content"
  },
  {
    "slug": "e-e-a-t-hay-keyword-stuffing",
    "keywordsMain": "E-E-A-T hay keyword stuffing",
    "h1": "E-E-A-T Hay Keyword Stuffing?",
    "angle": "chất lượng nội dung SEO",
    "niche": "seo"
  },
  {
    "slug": "canonical-hay-301-redirect",
    "keywordsMain": "canonical hay 301 redirect",
    "h1": "Canonical Hay 301 Redirect?",
    "angle": "xử lý trùng lặp URL",
    "niche": "seo"
  },
  {
    "slug": "noindex-hay-xoa-trang",
    "keywordsMain": "noindex hay xóa trang",
    "h1": "Noindex Hay Xóa Trang?",
    "angle": "trang mỏng thin content",
    "niche": "seo"
  },
  {
    "slug": "author-page-hay-about-page",
    "keywordsMain": "author page hay about page",
    "h1": "Author Page Hay About Page?",
    "angle": "E-E-A-T trust signal",
    "niche": "seo"
  },
  {
    "slug": "on-page-audit-hay-full-audit",
    "keywordsMain": "on-page audit hay full audit",
    "h1": "On-Page Audit Hay Full Audit?",
    "angle": "audit SEO ưu tiên",
    "niche": "seo"
  },
  {
    "slug": "tiktok-shop-ads-hay-organic",
    "keywordsMain": "TikTok Shop ads hay organic",
    "h1": "TikTok Shop Ads Hay Organic?",
    "angle": "TikTok Shop growth",
    "niche": "strategy"
  },
  {
    "slug": "review-widget-hay-manual-quote",
    "keywordsMain": "review widget hay manual quote",
    "h1": "Review Widget Hay Manual Quote?",
    "angle": "hiển thị đánh giá web",
    "niche": "strategy"
  },
  {
    "slug": "crisis-pr-hay-im-lang",
    "keywordsMain": "crisis PR hay im lặng",
    "h1": "Crisis PR Hay Im Lặng?",
    "angle": "xử lý khủng hoảng online",
    "niche": "strategy"
  },
  {
    "slug": "sentiment-tool-hay-doc-review",
    "keywordsMain": "sentiment tool hay đọc review",
    "h1": "Sentiment Tool Hay Đọc Review?",
    "angle": "phân tích cảm xúc",
    "niche": "analytics"
  },
  {
    "slug": "maps-review-hay-facebook-review",
    "keywordsMain": "Maps review hay Facebook review",
    "h1": "Maps Review Hay Facebook Review?",
    "angle": "local reputation",
    "niche": "seo"
  }
];

/** J — 25 */
const J_PAIN = [
  {
    "slug": "on-page-khong-len-top",
    "keywordsMain": "on-page không lên top",
    "h1": "On-Page Không Lên Top — Audit Lại",
    "angle": "on-page ranking stuck",
    "niche": "strategy"
  },
  {
    "slug": "title-tag-khong-co-ctr",
    "keywordsMain": "title tag không có CTR",
    "h1": "Title Tag Không Có CTR — Viết Lại",
    "angle": "low CTR title tag",
    "niche": "strategy"
  },
  {
    "slug": "meta-description-bi-cat",
    "keywordsMain": "meta description bị cắt",
    "h1": "Meta Description Bị Cắt — Rút Gọn",
    "angle": "truncated meta description",
    "niche": "strategy"
  },
  {
    "slug": "h1-trung-title",
    "keywordsMain": "H1 trùng title",
    "h1": "H1 Trùng Title — Phân Biệt Lại",
    "angle": "duplicate H1 title",
    "niche": "strategy"
  },
  {
    "slug": "noi-dung-mong-khong-index",
    "keywordsMain": "nội dung mỏng không index",
    "h1": "Nội Dung Mỏng Không Index — Mở Rộng",
    "angle": "thin content noindex",
    "niche": "strategy"
  },
  {
    "slug": "keyword-cannibalization-noi-bo",
    "keywordsMain": "keyword cannibalization nội bộ",
    "h1": "Keyword Cannibalization Nội Bộ — Gộp Bài",
    "angle": "internal keyword competition",
    "niche": "strategy"
  },
  {
    "slug": "internal-link-thieu",
    "keywordsMain": "internal link thiếu",
    "h1": "Internal Link Thiếu — Bổ Sung Hub",
    "angle": "missing internal links",
    "niche": "strategy"
  },
  {
    "slug": "featured-snippet-khong-dat",
    "keywordsMain": "featured snippet không đạt",
    "h1": "Featured Snippet Không Đạt — Tối Ưu FAQ",
    "angle": "snippet optimization fail",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-khong-co-don",
    "keywordsMain": "TikTok Shop không có đơn",
    "h1": "TikTok Shop Không Có Đơn — Tối Ưu Shop",
    "angle": "TikTok Shop no sales",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-live-khong-ai-xem",
    "keywordsMain": "TikTok live không ai xem",
    "h1": "TikTok Live Không Ai Xem — Hook Lại",
    "angle": "low TikTok live viewers",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-bi-phat",
    "keywordsMain": "TikTok Shop bị phạt",
    "h1": "TikTok Shop Bị Phạt — Kháng Cáo",
    "angle": "TikTok Shop violation",
    "niche": "strategy"
  },
  {
    "slug": "review-google-bi-xoa",
    "keywordsMain": "review Google bị xóa",
    "h1": "Review Google Bị Xóa — Tuân Thủ Policy",
    "angle": "removed Google reviews",
    "niche": "strategy"
  },
  {
    "slug": "review-1-sao-tang-dot-bien",
    "keywordsMain": "review 1 sao tăng đột biến",
    "h1": "Review 1 Sao Tăng Đột Biến — Xử Lý",
    "angle": "negative review spike",
    "niche": "strategy"
  },
  {
    "slug": "fanpage-rating-giam",
    "keywordsMain": "fanpage rating giảm",
    "h1": "Fanpage Rating Giảm — Khôi Phục",
    "angle": "Facebook rating drop",
    "niche": "strategy"
  },
  {
    "slug": "brand-bi-noi-xau-viral",
    "keywordsMain": "brand bị nói xấu viral",
    "h1": "Brand Bị Nói Xấu Viral — Crisis PR",
    "angle": "viral negative brand",
    "niche": "strategy"
  },
  {
    "slug": "khong-ai-de-lai-review",
    "keywordsMain": "không ai để lại review",
    "h1": "Không Ai Để Lại Review — Kích Hoạt",
    "angle": "no customer reviews",
    "niche": "strategy"
  },
  {
    "slug": "review-gia-bi-phat-hien",
    "keywordsMain": "review giả bị phát hiện",
    "h1": "Review Giả Bị Phát Hiện — Dừng Ngay",
    "angle": "fake review caught",
    "niche": "strategy"
  },
  {
    "slug": "orm-khong-theo-doi-duoc",
    "keywordsMain": "ORM không theo dõi được",
    "h1": "ORM Không Theo Dõi Được — Setup Tool",
    "angle": "ORM tracking missing",
    "niche": "strategy"
  },
  {
    "slug": "testimonial-khong-tin-cay",
    "keywordsMain": "testimonial không tin cậy",
    "h1": "Testimonial Không Tin Cậy — Bổ Sung Proof",
    "angle": "weak testimonials",
    "niche": "strategy"
  },
  {
    "slug": "competitor-review-cao-hon",
    "keywordsMain": "competitor review cao hơn",
    "h1": "Competitor Review Cao Hơn — Vượt Mặt",
    "angle": "competitor higher rating",
    "niche": "strategy"
  },
  {
    "slug": "on-page-duplicate-content",
    "keywordsMain": "on-page duplicate content",
    "h1": "On-Page Duplicate Content — Canonical",
    "angle": "duplicate on-page content",
    "niche": "strategy"
  },
  {
    "slug": "alt-text-thieu-anh",
    "keywordsMain": "alt text thiếu ảnh",
    "h1": "Alt Text Thiếu Ảnh — Bổ Sung SEO",
    "angle": "missing image alt text",
    "niche": "strategy"
  },
  {
    "slug": "url-slug-dai-kho-doc",
    "keywordsMain": "URL slug dài khó đọc",
    "h1": "URL Slug Dài Khó Đọc — Rút Gọn",
    "angle": "long URL slug",
    "niche": "strategy"
  },
  {
    "slug": "content-khong-match-intent",
    "keywordsMain": "content không match intent",
    "h1": "Content Không Match Intent — Viết Lại",
    "angle": "search intent mismatch",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-shop-hang-ton",
    "keywordsMain": "TikTok Shop hàng tồn",
    "h1": "TikTok Shop Hàng Tồn — Xả Kho Live",
    "angle": "TikTok Shop inventory stuck",
    "niche": "strategy"
  }
];

/** K — 20 */
const K_LAGI = [
  {
    "slug": "seo-on-page-la-gi-huong-dan",
    "keywordsMain": "SEO on-page là gì",
    "h1": "SEO On-Page Là Gì? Tối Ưu Trong Trang",
    "angle": "on-page SEO definition",
    "niche": "seo"
  },
  {
    "slug": "title-tag-la-gi",
    "keywordsMain": "title tag là gì",
    "h1": "Title Tag Là Gì? Thẻ Tiêu Đề SEO",
    "angle": "title tag explained",
    "niche": "seo"
  },
  {
    "slug": "meta-description-la-gi",
    "keywordsMain": "meta description là gì",
    "h1": "Meta Description Là Gì?",
    "angle": "meta description SEO",
    "niche": "seo"
  },
  {
    "slug": "heading-tag-la-gi",
    "keywordsMain": "heading tag là gì",
    "h1": "Heading Tag Là Gì? H1 H2 H3",
    "angle": "heading structure SEO",
    "niche": "seo"
  },
  {
    "slug": "canonical-tag-la-gi",
    "keywordsMain": "canonical tag là gì",
    "h1": "Canonical Tag Là Gì?",
    "angle": "canonical URL explained",
    "niche": "seo"
  },
  {
    "slug": "featured-snippet-la-gi-serp",
    "keywordsMain": "featured snippet là gì",
    "h1": "Featured Snippet Là Gì? Vị Trí 0",
    "angle": "featured snippet SERP",
    "niche": "seo"
  },
  {
    "slug": "e-e-a-t-la-gi",
    "keywordsMain": "E-E-A-T là gì",
    "h1": "E-E-A-T Là Gì? Google Quality",
    "angle": "E-E-A-T SEO explained",
    "niche": "seo"
  },
  {
    "slug": "keyword-cannibalization-la-gi",
    "keywordsMain": "keyword cannibalization là gì",
    "h1": "Keyword Cannibalization Là Gì?",
    "angle": "SEO cannibalization",
    "niche": "seo"
  },
  {
    "slug": "pillar-cluster-la-gi",
    "keywordsMain": "pillar cluster là gì",
    "h1": "Pillar Cluster Là Gì? Mô Hình SEO",
    "angle": "pillar cluster model",
    "niche": "seo"
  },
  {
    "slug": "tiktok-shop-la-gi",
    "keywordsMain": "TikTok Shop là gì",
    "h1": "TikTok Shop Là Gì? Bán Hàng Social",
    "angle": "TikTok Shop explained",
    "niche": "seo"
  },
  {
    "slug": "tiktok-affiliate-la-gi",
    "keywordsMain": "TikTok affiliate là gì",
    "h1": "TikTok Affiliate Là Gì?",
    "angle": "TikTok affiliate marketing",
    "niche": "seo"
  },
  {
    "slug": "tiktok-live-commerce-la-gi",
    "keywordsMain": "TikTok live commerce là gì",
    "h1": "TikTok Live Commerce Là Gì?",
    "angle": "live selling TikTok",
    "niche": "seo"
  },
  {
    "slug": "orm-la-gi",
    "keywordsMain": "ORM là gì",
    "h1": "ORM Là Gì? Quản Trị Danh Tiếng",
    "angle": "online reputation management",
    "niche": "seo"
  },
  {
    "slug": "brand-monitoring-la-gi",
    "keywordsMain": "brand monitoring là gì",
    "h1": "Brand Monitoring Là Gì?",
    "angle": "brand monitoring tool",
    "niche": "seo"
  },
  {
    "slug": "social-listening-la-gi",
    "keywordsMain": "social listening là gì",
    "h1": "Social Listening Là Gì?",
    "angle": "social listening marketing",
    "niche": "seo"
  },
  {
    "slug": "google-review-policy-la-gi",
    "keywordsMain": "Google review policy là gì",
    "h1": "Google Review Policy Là Gì?",
    "angle": "Google review guidelines",
    "niche": "seo"
  },
  {
    "slug": "sentiment-analysis-la-gi",
    "keywordsMain": "sentiment analysis là gì",
    "h1": "Sentiment Analysis Là Gì?",
    "angle": "sentiment analysis ORM",
    "niche": "seo"
  },
  {
    "slug": "crisis-communication-la-gi",
    "keywordsMain": "crisis communication là gì",
    "h1": "Crisis Communication Là Gì?",
    "angle": "crisis PR explained",
    "niche": "seo"
  },
  {
    "slug": "testimonial-la-gi-marketing",
    "keywordsMain": "testimonial là gì marketing",
    "h1": "Testimonial Là Gì Trong Marketing?",
    "angle": "testimonial social proof",
    "niche": "seo"
  },
  {
    "slug": "review-widget-la-gi",
    "keywordsMain": "review widget là gì",
    "h1": "Review Widget Là Gì? Website",
    "angle": "review widget explained",
    "niche": "seo"
  }
];

export const KEYWORDS_500_BATCH9 = [
  ...A_WEB_CITY,
  ...B_EXTRA_WEB,
  ...C_PRICING,
  ...D_ONPAGE,
  ...E_TIKTOK_SHOP,
  ...F_ORM,
  ...G_MAPS,
  ...H_MKT,
  ...I_COMPARE,
  ...J_PAIN,
  ...K_LAGI,
];

export const KEYWORDS_500_BATCH9_MARKETING_ONLY = new Set([
  ...I_COMPARE.map((e) => e.slug),
  ...J_PAIN.map((e) => e.slug),
  ...K_LAGI.map((e) => e.slug),
]);

const EXPECTED = 500;
if (KEYWORDS_500_BATCH9.length !== EXPECTED) {
  throw new Error(`KEYWORDS_500_BATCH9 expected ${EXPECTED} entries, got ${KEYWORDS_500_BATCH9.length}`);
}

const slugSet = new Set(KEYWORDS_500_BATCH9.map((e) => e.slug));
if (slugSet.size !== KEYWORDS_500_BATCH9.length) {
  const dupes = KEYWORDS_500_BATCH9.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH9 duplicate slugs: ${[...new Set(dupes)].join(", ")}`);
}

const kwSet = new Set(KEYWORDS_500_BATCH9.map((e) => e.keywordsMain.toLowerCase()));
if (kwSet.size !== KEYWORDS_500_BATCH9.length) {
  const dupes = KEYWORDS_500_BATCH9.map((e) => e.keywordsMain.toLowerCase()).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH9 duplicate keywords: ${[...new Set(dupes)].join(", ")}`);
}

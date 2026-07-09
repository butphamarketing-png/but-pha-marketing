/**
 * 500 từ khóa batch 11 — Vertical Proof: website + Maps + marketing × 7 ngành × 18 thành phố.
 * Export: KEYWORDS_500_BATCH11
 * Vertical proof engine — plan seo-vertical-proof-90d
 */

function cap(kw) {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

/** A — 126 web×city */
const A_WEB_CITY = [
  {
    "slug": "thiet-ke-website-nha-khoa-tphcm",
    "keywordsMain": "thiết kế website nha khoa TPHCM",
    "h1": "Thiết Kế Website Nha khoa TPHCM Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-ha-noi",
    "keywordsMain": "thiết kế website nha khoa Hà Nội",
    "h1": "Thiết Kế Website Nha khoa Hà Nội Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-da-nang",
    "keywordsMain": "thiết kế website nha khoa Đà Nẵng",
    "h1": "Thiết Kế Website Nha khoa Đà Nẵng Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-can-tho",
    "keywordsMain": "thiết kế website nha khoa Cần Thơ",
    "h1": "Thiết Kế Website Nha khoa Cần Thơ Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-binh-duong",
    "keywordsMain": "thiết kế website nha khoa Bình Dương",
    "h1": "Thiết Kế Website Nha khoa Bình Dương Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-dong-nai",
    "keywordsMain": "thiết kế website nha khoa Đồng Nai",
    "h1": "Thiết Kế Website Nha khoa Đồng Nai Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-hai-phong",
    "keywordsMain": "thiết kế website nha khoa Hải Phòng",
    "h1": "Thiết Kế Website Nha khoa Hải Phòng Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-nha-trang",
    "keywordsMain": "thiết kế website nha khoa Nha Trang",
    "h1": "Thiết Kế Website Nha khoa Nha Trang Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-hue",
    "keywordsMain": "thiết kế website nha khoa Huế",
    "h1": "Thiết Kế Website Nha khoa Huế Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-vung-tau",
    "keywordsMain": "thiết kế website nha khoa Vũng Tàu",
    "h1": "Thiết Kế Website Nha khoa Vũng Tàu Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-bac-ninh",
    "keywordsMain": "thiết kế website nha khoa Bắc Ninh",
    "h1": "Thiết Kế Website Nha khoa Bắc Ninh Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-long-an",
    "keywordsMain": "thiết kế website nha khoa Long An",
    "h1": "Thiết Kế Website Nha khoa Long An Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-lam-dong",
    "keywordsMain": "thiết kế website nha khoa Lâm Đồng",
    "h1": "Thiết Kế Website Nha khoa Lâm Đồng Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-quang-ninh",
    "keywordsMain": "thiết kế website nha khoa Quảng Ninh",
    "h1": "Thiết Kế Website Nha khoa Quảng Ninh Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-thanh-hoa",
    "keywordsMain": "thiết kế website nha khoa Thanh Hóa",
    "h1": "Thiết Kế Website Nha khoa Thanh Hóa Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-nghe-an",
    "keywordsMain": "thiết kế website nha khoa Nghệ An",
    "h1": "Thiết Kế Website Nha khoa Nghệ An Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-da-lat",
    "keywordsMain": "thiết kế website nha khoa Đà Lạt",
    "h1": "Thiết Kế Website Nha khoa Đà Lạt Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-quy-nhon",
    "keywordsMain": "thiết kế website nha khoa Quy Nhon",
    "h1": "Thiết Kế Website Nha khoa Quy Nhon Chuẩn SEO",
    "angle": "website nha khoa đặt lịch implant niềng răng tại Quy Nhon",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-tphcm",
    "keywordsMain": "thiết kế website xây dựng TPHCM",
    "h1": "Thiết Kế Website Xây dựng TPHCM Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-ha-noi",
    "keywordsMain": "thiết kế website xây dựng Hà Nội",
    "h1": "Thiết Kế Website Xây dựng Hà Nội Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-da-nang",
    "keywordsMain": "thiết kế website xây dựng Đà Nẵng",
    "h1": "Thiết Kế Website Xây dựng Đà Nẵng Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-can-tho",
    "keywordsMain": "thiết kế website xây dựng Cần Thơ",
    "h1": "Thiết Kế Website Xây dựng Cần Thơ Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-binh-duong",
    "keywordsMain": "thiết kế website xây dựng Bình Dương",
    "h1": "Thiết Kế Website Xây dựng Bình Dương Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-dong-nai",
    "keywordsMain": "thiết kế website xây dựng Đồng Nai",
    "h1": "Thiết Kế Website Xây dựng Đồng Nai Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-hai-phong",
    "keywordsMain": "thiết kế website xây dựng Hải Phòng",
    "h1": "Thiết Kế Website Xây dựng Hải Phòng Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-nha-trang",
    "keywordsMain": "thiết kế website xây dựng Nha Trang",
    "h1": "Thiết Kế Website Xây dựng Nha Trang Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-hue",
    "keywordsMain": "thiết kế website xây dựng Huế",
    "h1": "Thiết Kế Website Xây dựng Huế Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-vung-tau",
    "keywordsMain": "thiết kế website xây dựng Vũng Tàu",
    "h1": "Thiết Kế Website Xây dựng Vũng Tàu Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-bac-ninh",
    "keywordsMain": "thiết kế website xây dựng Bắc Ninh",
    "h1": "Thiết Kế Website Xây dựng Bắc Ninh Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-long-an",
    "keywordsMain": "thiết kế website xây dựng Long An",
    "h1": "Thiết Kế Website Xây dựng Long An Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-lam-dong",
    "keywordsMain": "thiết kế website xây dựng Lâm Đồng",
    "h1": "Thiết Kế Website Xây dựng Lâm Đồng Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-quang-ninh",
    "keywordsMain": "thiết kế website xây dựng Quảng Ninh",
    "h1": "Thiết Kế Website Xây dựng Quảng Ninh Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-thanh-hoa",
    "keywordsMain": "thiết kế website xây dựng Thanh Hóa",
    "h1": "Thiết Kế Website Xây dựng Thanh Hóa Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-nghe-an",
    "keywordsMain": "thiết kế website xây dựng Nghệ An",
    "h1": "Thiết Kế Website Xây dựng Nghệ An Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-da-lat",
    "keywordsMain": "thiết kế website xây dựng Đà Lạt",
    "h1": "Thiết Kế Website Xây dựng Đà Lạt Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-quy-nhon",
    "keywordsMain": "thiết kế website xây dựng Quy Nhon",
    "h1": "Thiết Kế Website Xây dựng Quy Nhon Chuẩn SEO",
    "angle": "website nhà thầu gallery công trình báo giá tại Quy Nhon",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-tphcm",
    "keywordsMain": "thiết kế website thẩm mỹ viện TPHCM",
    "h1": "Thiết Kế Website Thẩm mỹ viện TPHCM Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-ha-noi",
    "keywordsMain": "thiết kế website thẩm mỹ viện Hà Nội",
    "h1": "Thiết Kế Website Thẩm mỹ viện Hà Nội Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-da-nang",
    "keywordsMain": "thiết kế website thẩm mỹ viện Đà Nẵng",
    "h1": "Thiết Kế Website Thẩm mỹ viện Đà Nẵng Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-can-tho",
    "keywordsMain": "thiết kế website thẩm mỹ viện Cần Thơ",
    "h1": "Thiết Kế Website Thẩm mỹ viện Cần Thơ Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-binh-duong",
    "keywordsMain": "thiết kế website thẩm mỹ viện Bình Dương",
    "h1": "Thiết Kế Website Thẩm mỹ viện Bình Dương Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-dong-nai",
    "keywordsMain": "thiết kế website thẩm mỹ viện Đồng Nai",
    "h1": "Thiết Kế Website Thẩm mỹ viện Đồng Nai Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-hai-phong",
    "keywordsMain": "thiết kế website thẩm mỹ viện Hải Phòng",
    "h1": "Thiết Kế Website Thẩm mỹ viện Hải Phòng Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-nha-trang",
    "keywordsMain": "thiết kế website thẩm mỹ viện Nha Trang",
    "h1": "Thiết Kế Website Thẩm mỹ viện Nha Trang Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-hue",
    "keywordsMain": "thiết kế website thẩm mỹ viện Huế",
    "h1": "Thiết Kế Website Thẩm mỹ viện Huế Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-vung-tau",
    "keywordsMain": "thiết kế website thẩm mỹ viện Vũng Tàu",
    "h1": "Thiết Kế Website Thẩm mỹ viện Vũng Tàu Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-bac-ninh",
    "keywordsMain": "thiết kế website thẩm mỹ viện Bắc Ninh",
    "h1": "Thiết Kế Website Thẩm mỹ viện Bắc Ninh Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-long-an",
    "keywordsMain": "thiết kế website thẩm mỹ viện Long An",
    "h1": "Thiết Kế Website Thẩm mỹ viện Long An Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-lam-dong",
    "keywordsMain": "thiết kế website thẩm mỹ viện Lâm Đồng",
    "h1": "Thiết Kế Website Thẩm mỹ viện Lâm Đồng Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-quang-ninh",
    "keywordsMain": "thiết kế website thẩm mỹ viện Quảng Ninh",
    "h1": "Thiết Kế Website Thẩm mỹ viện Quảng Ninh Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-thanh-hoa",
    "keywordsMain": "thiết kế website thẩm mỹ viện Thanh Hóa",
    "h1": "Thiết Kế Website Thẩm mỹ viện Thanh Hóa Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-nghe-an",
    "keywordsMain": "thiết kế website thẩm mỹ viện Nghệ An",
    "h1": "Thiết Kế Website Thẩm mỹ viện Nghệ An Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-da-lat",
    "keywordsMain": "thiết kế website thẩm mỹ viện Đà Lạt",
    "h1": "Thiết Kế Website Thẩm mỹ viện Đà Lạt Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-quy-nhon",
    "keywordsMain": "thiết kế website thẩm mỹ viện Quy Nhon",
    "h1": "Thiết Kế Website Thẩm mỹ viện Quy Nhon Chuẩn SEO",
    "angle": "website thẩm mỹ booking và SEO local tại Quy Nhon",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-tphcm",
    "keywordsMain": "thiết kế website spa TPHCM",
    "h1": "Thiết Kế Website Spa TPHCM Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-ha-noi",
    "keywordsMain": "thiết kế website spa Hà Nội",
    "h1": "Thiết Kế Website Spa Hà Nội Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-da-nang",
    "keywordsMain": "thiết kế website spa Đà Nẵng",
    "h1": "Thiết Kế Website Spa Đà Nẵng Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-can-tho",
    "keywordsMain": "thiết kế website spa Cần Thơ",
    "h1": "Thiết Kế Website Spa Cần Thơ Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-binh-duong",
    "keywordsMain": "thiết kế website spa Bình Dương",
    "h1": "Thiết Kế Website Spa Bình Dương Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-dong-nai",
    "keywordsMain": "thiết kế website spa Đồng Nai",
    "h1": "Thiết Kế Website Spa Đồng Nai Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-hai-phong",
    "keywordsMain": "thiết kế website spa Hải Phòng",
    "h1": "Thiết Kế Website Spa Hải Phòng Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-nha-trang",
    "keywordsMain": "thiết kế website spa Nha Trang",
    "h1": "Thiết Kế Website Spa Nha Trang Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-hue",
    "keywordsMain": "thiết kế website spa Huế",
    "h1": "Thiết Kế Website Spa Huế Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-vung-tau",
    "keywordsMain": "thiết kế website spa Vũng Tàu",
    "h1": "Thiết Kế Website Spa Vũng Tàu Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-bac-ninh",
    "keywordsMain": "thiết kế website spa Bắc Ninh",
    "h1": "Thiết Kế Website Spa Bắc Ninh Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-long-an",
    "keywordsMain": "thiết kế website spa Long An",
    "h1": "Thiết Kế Website Spa Long An Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-lam-dong",
    "keywordsMain": "thiết kế website spa Lâm Đồng",
    "h1": "Thiết Kế Website Spa Lâm Đồng Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-quang-ninh",
    "keywordsMain": "thiết kế website spa Quảng Ninh",
    "h1": "Thiết Kế Website Spa Quảng Ninh Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-thanh-hoa",
    "keywordsMain": "thiết kế website spa Thanh Hóa",
    "h1": "Thiết Kế Website Spa Thanh Hóa Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-nghe-an",
    "keywordsMain": "thiết kế website spa Nghệ An",
    "h1": "Thiết Kế Website Spa Nghệ An Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-da-lat",
    "keywordsMain": "thiết kế website spa Đà Lạt",
    "h1": "Thiết Kế Website Spa Đà Lạt Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-quy-nhon",
    "keywordsMain": "thiết kế website spa Quy Nhon",
    "h1": "Thiết Kế Website Spa Quy Nhon Chuẩn SEO",
    "angle": "website spa đặt lịch combo dịch vụ làm đẹp tại Quy Nhon",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-tphcm",
    "keywordsMain": "thiết kế website phòng khám TPHCM",
    "h1": "Thiết Kế Website Phòng khám TPHCM Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-ha-noi",
    "keywordsMain": "thiết kế website phòng khám Hà Nội",
    "h1": "Thiết Kế Website Phòng khám Hà Nội Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-da-nang",
    "keywordsMain": "thiết kế website phòng khám Đà Nẵng",
    "h1": "Thiết Kế Website Phòng khám Đà Nẵng Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-can-tho",
    "keywordsMain": "thiết kế website phòng khám Cần Thơ",
    "h1": "Thiết Kế Website Phòng khám Cần Thơ Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-binh-duong",
    "keywordsMain": "thiết kế website phòng khám Bình Dương",
    "h1": "Thiết Kế Website Phòng khám Bình Dương Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-dong-nai",
    "keywordsMain": "thiết kế website phòng khám Đồng Nai",
    "h1": "Thiết Kế Website Phòng khám Đồng Nai Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-hai-phong",
    "keywordsMain": "thiết kế website phòng khám Hải Phòng",
    "h1": "Thiết Kế Website Phòng khám Hải Phòng Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-nha-trang",
    "keywordsMain": "thiết kế website phòng khám Nha Trang",
    "h1": "Thiết Kế Website Phòng khám Nha Trang Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-hue",
    "keywordsMain": "thiết kế website phòng khám Huế",
    "h1": "Thiết Kế Website Phòng khám Huế Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-vung-tau",
    "keywordsMain": "thiết kế website phòng khám Vũng Tàu",
    "h1": "Thiết Kế Website Phòng khám Vũng Tàu Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-bac-ninh",
    "keywordsMain": "thiết kế website phòng khám Bắc Ninh",
    "h1": "Thiết Kế Website Phòng khám Bắc Ninh Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-long-an",
    "keywordsMain": "thiết kế website phòng khám Long An",
    "h1": "Thiết Kế Website Phòng khám Long An Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-lam-dong",
    "keywordsMain": "thiết kế website phòng khám Lâm Đồng",
    "h1": "Thiết Kế Website Phòng khám Lâm Đồng Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-quang-ninh",
    "keywordsMain": "thiết kế website phòng khám Quảng Ninh",
    "h1": "Thiết Kế Website Phòng khám Quảng Ninh Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-thanh-hoa",
    "keywordsMain": "thiết kế website phòng khám Thanh Hóa",
    "h1": "Thiết Kế Website Phòng khám Thanh Hóa Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-nghe-an",
    "keywordsMain": "thiết kế website phòng khám Nghệ An",
    "h1": "Thiết Kế Website Phòng khám Nghệ An Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-da-lat",
    "keywordsMain": "thiết kế website phòng khám Đà Lạt",
    "h1": "Thiết Kế Website Phòng khám Đà Lạt Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-quy-nhon",
    "keywordsMain": "thiết kế website phòng khám Quy Nhon",
    "h1": "Thiết Kế Website Phòng khám Quy Nhon Chuẩn SEO",
    "angle": "website phòng khám đa khoa đặt lịch online tại Quy Nhon",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-tphcm",
    "keywordsMain": "thiết kế website mỹ phẩm TPHCM",
    "h1": "Thiết Kế Website Mỹ phẩm TPHCM Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-ha-noi",
    "keywordsMain": "thiết kế website mỹ phẩm Hà Nội",
    "h1": "Thiết Kế Website Mỹ phẩm Hà Nội Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-da-nang",
    "keywordsMain": "thiết kế website mỹ phẩm Đà Nẵng",
    "h1": "Thiết Kế Website Mỹ phẩm Đà Nẵng Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-can-tho",
    "keywordsMain": "thiết kế website mỹ phẩm Cần Thơ",
    "h1": "Thiết Kế Website Mỹ phẩm Cần Thơ Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-binh-duong",
    "keywordsMain": "thiết kế website mỹ phẩm Bình Dương",
    "h1": "Thiết Kế Website Mỹ phẩm Bình Dương Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-dong-nai",
    "keywordsMain": "thiết kế website mỹ phẩm Đồng Nai",
    "h1": "Thiết Kế Website Mỹ phẩm Đồng Nai Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-hai-phong",
    "keywordsMain": "thiết kế website mỹ phẩm Hải Phòng",
    "h1": "Thiết Kế Website Mỹ phẩm Hải Phòng Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-nha-trang",
    "keywordsMain": "thiết kế website mỹ phẩm Nha Trang",
    "h1": "Thiết Kế Website Mỹ phẩm Nha Trang Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-hue",
    "keywordsMain": "thiết kế website mỹ phẩm Huế",
    "h1": "Thiết Kế Website Mỹ phẩm Huế Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-vung-tau",
    "keywordsMain": "thiết kế website mỹ phẩm Vũng Tàu",
    "h1": "Thiết Kế Website Mỹ phẩm Vũng Tàu Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-bac-ninh",
    "keywordsMain": "thiết kế website mỹ phẩm Bắc Ninh",
    "h1": "Thiết Kế Website Mỹ phẩm Bắc Ninh Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-long-an",
    "keywordsMain": "thiết kế website mỹ phẩm Long An",
    "h1": "Thiết Kế Website Mỹ phẩm Long An Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-lam-dong",
    "keywordsMain": "thiết kế website mỹ phẩm Lâm Đồng",
    "h1": "Thiết Kế Website Mỹ phẩm Lâm Đồng Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-quang-ninh",
    "keywordsMain": "thiết kế website mỹ phẩm Quảng Ninh",
    "h1": "Thiết Kế Website Mỹ phẩm Quảng Ninh Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-thanh-hoa",
    "keywordsMain": "thiết kế website mỹ phẩm Thanh Hóa",
    "h1": "Thiết Kế Website Mỹ phẩm Thanh Hóa Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-nghe-an",
    "keywordsMain": "thiết kế website mỹ phẩm Nghệ An",
    "h1": "Thiết Kế Website Mỹ phẩm Nghệ An Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-da-lat",
    "keywordsMain": "thiết kế website mỹ phẩm Đà Lạt",
    "h1": "Thiết Kế Website Mỹ phẩm Đà Lạt Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-quy-nhon",
    "keywordsMain": "thiết kế website mỹ phẩm Quy Nhon",
    "h1": "Thiết Kế Website Mỹ phẩm Quy Nhon Chuẩn SEO",
    "angle": "website cửa hàng mỹ phẩm đa thương hiệu tại Quy Nhon",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-tphcm",
    "keywordsMain": "thiết kế website PCCC TPHCM",
    "h1": "Thiết Kế Website PCCC TPHCM Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-ha-noi",
    "keywordsMain": "thiết kế website PCCC Hà Nội",
    "h1": "Thiết Kế Website PCCC Hà Nội Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-da-nang",
    "keywordsMain": "thiết kế website PCCC Đà Nẵng",
    "h1": "Thiết Kế Website PCCC Đà Nẵng Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-can-tho",
    "keywordsMain": "thiết kế website PCCC Cần Thơ",
    "h1": "Thiết Kế Website PCCC Cần Thơ Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-binh-duong",
    "keywordsMain": "thiết kế website PCCC Bình Dương",
    "h1": "Thiết Kế Website PCCC Bình Dương Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-dong-nai",
    "keywordsMain": "thiết kế website PCCC Đồng Nai",
    "h1": "Thiết Kế Website PCCC Đồng Nai Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-hai-phong",
    "keywordsMain": "thiết kế website PCCC Hải Phòng",
    "h1": "Thiết Kế Website PCCC Hải Phòng Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-nha-trang",
    "keywordsMain": "thiết kế website PCCC Nha Trang",
    "h1": "Thiết Kế Website PCCC Nha Trang Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-hue",
    "keywordsMain": "thiết kế website PCCC Huế",
    "h1": "Thiết Kế Website PCCC Huế Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-vung-tau",
    "keywordsMain": "thiết kế website PCCC Vũng Tàu",
    "h1": "Thiết Kế Website PCCC Vũng Tàu Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-bac-ninh",
    "keywordsMain": "thiết kế website PCCC Bắc Ninh",
    "h1": "Thiết Kế Website PCCC Bắc Ninh Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-long-an",
    "keywordsMain": "thiết kế website PCCC Long An",
    "h1": "Thiết Kế Website PCCC Long An Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-lam-dong",
    "keywordsMain": "thiết kế website PCCC Lâm Đồng",
    "h1": "Thiết Kế Website PCCC Lâm Đồng Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-quang-ninh",
    "keywordsMain": "thiết kế website PCCC Quảng Ninh",
    "h1": "Thiết Kế Website PCCC Quảng Ninh Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-thanh-hoa",
    "keywordsMain": "thiết kế website PCCC Thanh Hóa",
    "h1": "Thiết Kế Website PCCC Thanh Hóa Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-nghe-an",
    "keywordsMain": "thiết kế website PCCC Nghệ An",
    "h1": "Thiết Kế Website PCCC Nghệ An Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-da-lat",
    "keywordsMain": "thiết kế website PCCC Đà Lạt",
    "h1": "Thiết Kế Website PCCC Đà Lạt Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-quy-nhon",
    "keywordsMain": "thiết kế website PCCC Quy Nhon",
    "h1": "Thiết Kế Website PCCC Quy Nhon Chuẩn SEO",
    "angle": "website công ty PCCC thiết bị chữa cháy tại Quy Nhon",
    "niche": "strategy"
  }
];

/** B — 126 maps×city */
const B_MAPS_CITY = [
  {
    "slug": "seo-google-maps-nha-khoa-tphcm",
    "keywordsMain": "seo google maps nha khoa TPHCM",
    "h1": "SEO Google Maps Nha khoa TPHCM",
    "angle": "tối ưu Maps nha khoa thu khách local tại TPHCM",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-ha-noi",
    "keywordsMain": "seo google maps nha khoa Hà Nội",
    "h1": "SEO Google Maps Nha khoa Hà Nội",
    "angle": "tối ưu Maps nha khoa thu khách local tại Hà Nội",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-da-nang",
    "keywordsMain": "seo google maps nha khoa Đà Nẵng",
    "h1": "SEO Google Maps Nha khoa Đà Nẵng",
    "angle": "tối ưu Maps nha khoa thu khách local tại Đà Nẵng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-can-tho",
    "keywordsMain": "seo google maps nha khoa Cần Thơ",
    "h1": "SEO Google Maps Nha khoa Cần Thơ",
    "angle": "tối ưu Maps nha khoa thu khách local tại Cần Thơ",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-binh-duong",
    "keywordsMain": "seo google maps nha khoa Bình Dương",
    "h1": "SEO Google Maps Nha khoa Bình Dương",
    "angle": "tối ưu Maps nha khoa thu khách local tại Bình Dương",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-dong-nai",
    "keywordsMain": "seo google maps nha khoa Đồng Nai",
    "h1": "SEO Google Maps Nha khoa Đồng Nai",
    "angle": "tối ưu Maps nha khoa thu khách local tại Đồng Nai",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-hai-phong",
    "keywordsMain": "seo google maps nha khoa Hải Phòng",
    "h1": "SEO Google Maps Nha khoa Hải Phòng",
    "angle": "tối ưu Maps nha khoa thu khách local tại Hải Phòng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-nha-trang",
    "keywordsMain": "seo google maps nha khoa Nha Trang",
    "h1": "SEO Google Maps Nha khoa Nha Trang",
    "angle": "tối ưu Maps nha khoa thu khách local tại Nha Trang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-hue",
    "keywordsMain": "seo google maps nha khoa Huế",
    "h1": "SEO Google Maps Nha khoa Huế",
    "angle": "tối ưu Maps nha khoa thu khách local tại Huế",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-vung-tau",
    "keywordsMain": "seo google maps nha khoa Vũng Tàu",
    "h1": "SEO Google Maps Nha khoa Vũng Tàu",
    "angle": "tối ưu Maps nha khoa thu khách local tại Vũng Tàu",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-bac-ninh",
    "keywordsMain": "seo google maps nha khoa Bắc Ninh",
    "h1": "SEO Google Maps Nha khoa Bắc Ninh",
    "angle": "tối ưu Maps nha khoa thu khách local tại Bắc Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-long-an",
    "keywordsMain": "seo google maps nha khoa Long An",
    "h1": "SEO Google Maps Nha khoa Long An",
    "angle": "tối ưu Maps nha khoa thu khách local tại Long An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-lam-dong",
    "keywordsMain": "seo google maps nha khoa Lâm Đồng",
    "h1": "SEO Google Maps Nha khoa Lâm Đồng",
    "angle": "tối ưu Maps nha khoa thu khách local tại Lâm Đồng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-quang-ninh",
    "keywordsMain": "seo google maps nha khoa Quảng Ninh",
    "h1": "SEO Google Maps Nha khoa Quảng Ninh",
    "angle": "tối ưu Maps nha khoa thu khách local tại Quảng Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-thanh-hoa",
    "keywordsMain": "seo google maps nha khoa Thanh Hóa",
    "h1": "SEO Google Maps Nha khoa Thanh Hóa",
    "angle": "tối ưu Maps nha khoa thu khách local tại Thanh Hóa",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-nghe-an",
    "keywordsMain": "seo google maps nha khoa Nghệ An",
    "h1": "SEO Google Maps Nha khoa Nghệ An",
    "angle": "tối ưu Maps nha khoa thu khách local tại Nghệ An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-da-lat",
    "keywordsMain": "seo google maps nha khoa Đà Lạt",
    "h1": "SEO Google Maps Nha khoa Đà Lạt",
    "angle": "tối ưu Maps nha khoa thu khách local tại Đà Lạt",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-nha-khoa-quy-nhon",
    "keywordsMain": "seo google maps nha khoa Quy Nhon",
    "h1": "SEO Google Maps Nha khoa Quy Nhon",
    "angle": "tối ưu Maps nha khoa thu khách local tại Quy Nhon",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-tphcm",
    "keywordsMain": "seo google maps xây dựng TPHCM",
    "h1": "SEO Google Maps Xây dựng TPHCM",
    "angle": "tối ưu Maps xây dựng thu khách local tại TPHCM",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-ha-noi",
    "keywordsMain": "seo google maps xây dựng Hà Nội",
    "h1": "SEO Google Maps Xây dựng Hà Nội",
    "angle": "tối ưu Maps xây dựng thu khách local tại Hà Nội",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-da-nang",
    "keywordsMain": "seo google maps xây dựng Đà Nẵng",
    "h1": "SEO Google Maps Xây dựng Đà Nẵng",
    "angle": "tối ưu Maps xây dựng thu khách local tại Đà Nẵng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-can-tho",
    "keywordsMain": "seo google maps xây dựng Cần Thơ",
    "h1": "SEO Google Maps Xây dựng Cần Thơ",
    "angle": "tối ưu Maps xây dựng thu khách local tại Cần Thơ",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-binh-duong",
    "keywordsMain": "seo google maps xây dựng Bình Dương",
    "h1": "SEO Google Maps Xây dựng Bình Dương",
    "angle": "tối ưu Maps xây dựng thu khách local tại Bình Dương",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-dong-nai",
    "keywordsMain": "seo google maps xây dựng Đồng Nai",
    "h1": "SEO Google Maps Xây dựng Đồng Nai",
    "angle": "tối ưu Maps xây dựng thu khách local tại Đồng Nai",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-hai-phong",
    "keywordsMain": "seo google maps xây dựng Hải Phòng",
    "h1": "SEO Google Maps Xây dựng Hải Phòng",
    "angle": "tối ưu Maps xây dựng thu khách local tại Hải Phòng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-nha-trang",
    "keywordsMain": "seo google maps xây dựng Nha Trang",
    "h1": "SEO Google Maps Xây dựng Nha Trang",
    "angle": "tối ưu Maps xây dựng thu khách local tại Nha Trang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-hue",
    "keywordsMain": "seo google maps xây dựng Huế",
    "h1": "SEO Google Maps Xây dựng Huế",
    "angle": "tối ưu Maps xây dựng thu khách local tại Huế",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-vung-tau",
    "keywordsMain": "seo google maps xây dựng Vũng Tàu",
    "h1": "SEO Google Maps Xây dựng Vũng Tàu",
    "angle": "tối ưu Maps xây dựng thu khách local tại Vũng Tàu",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-bac-ninh",
    "keywordsMain": "seo google maps xây dựng Bắc Ninh",
    "h1": "SEO Google Maps Xây dựng Bắc Ninh",
    "angle": "tối ưu Maps xây dựng thu khách local tại Bắc Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-long-an",
    "keywordsMain": "seo google maps xây dựng Long An",
    "h1": "SEO Google Maps Xây dựng Long An",
    "angle": "tối ưu Maps xây dựng thu khách local tại Long An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-lam-dong",
    "keywordsMain": "seo google maps xây dựng Lâm Đồng",
    "h1": "SEO Google Maps Xây dựng Lâm Đồng",
    "angle": "tối ưu Maps xây dựng thu khách local tại Lâm Đồng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-quang-ninh",
    "keywordsMain": "seo google maps xây dựng Quảng Ninh",
    "h1": "SEO Google Maps Xây dựng Quảng Ninh",
    "angle": "tối ưu Maps xây dựng thu khách local tại Quảng Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-thanh-hoa",
    "keywordsMain": "seo google maps xây dựng Thanh Hóa",
    "h1": "SEO Google Maps Xây dựng Thanh Hóa",
    "angle": "tối ưu Maps xây dựng thu khách local tại Thanh Hóa",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-nghe-an",
    "keywordsMain": "seo google maps xây dựng Nghệ An",
    "h1": "SEO Google Maps Xây dựng Nghệ An",
    "angle": "tối ưu Maps xây dựng thu khách local tại Nghệ An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-da-lat",
    "keywordsMain": "seo google maps xây dựng Đà Lạt",
    "h1": "SEO Google Maps Xây dựng Đà Lạt",
    "angle": "tối ưu Maps xây dựng thu khách local tại Đà Lạt",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-xay-dung-quy-nhon",
    "keywordsMain": "seo google maps xây dựng Quy Nhon",
    "h1": "SEO Google Maps Xây dựng Quy Nhon",
    "angle": "tối ưu Maps xây dựng thu khách local tại Quy Nhon",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-tphcm",
    "keywordsMain": "seo google maps thẩm mỹ viện TPHCM",
    "h1": "SEO Google Maps Thẩm mỹ viện TPHCM",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại TPHCM",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-ha-noi",
    "keywordsMain": "seo google maps thẩm mỹ viện Hà Nội",
    "h1": "SEO Google Maps Thẩm mỹ viện Hà Nội",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Hà Nội",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-da-nang",
    "keywordsMain": "seo google maps thẩm mỹ viện Đà Nẵng",
    "h1": "SEO Google Maps Thẩm mỹ viện Đà Nẵng",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Đà Nẵng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-can-tho",
    "keywordsMain": "seo google maps thẩm mỹ viện Cần Thơ",
    "h1": "SEO Google Maps Thẩm mỹ viện Cần Thơ",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Cần Thơ",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-binh-duong",
    "keywordsMain": "seo google maps thẩm mỹ viện Bình Dương",
    "h1": "SEO Google Maps Thẩm mỹ viện Bình Dương",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Bình Dương",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-dong-nai",
    "keywordsMain": "seo google maps thẩm mỹ viện Đồng Nai",
    "h1": "SEO Google Maps Thẩm mỹ viện Đồng Nai",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Đồng Nai",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-hai-phong",
    "keywordsMain": "seo google maps thẩm mỹ viện Hải Phòng",
    "h1": "SEO Google Maps Thẩm mỹ viện Hải Phòng",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Hải Phòng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-nha-trang",
    "keywordsMain": "seo google maps thẩm mỹ viện Nha Trang",
    "h1": "SEO Google Maps Thẩm mỹ viện Nha Trang",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Nha Trang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-hue",
    "keywordsMain": "seo google maps thẩm mỹ viện Huế",
    "h1": "SEO Google Maps Thẩm mỹ viện Huế",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Huế",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-vung-tau",
    "keywordsMain": "seo google maps thẩm mỹ viện Vũng Tàu",
    "h1": "SEO Google Maps Thẩm mỹ viện Vũng Tàu",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Vũng Tàu",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-bac-ninh",
    "keywordsMain": "seo google maps thẩm mỹ viện Bắc Ninh",
    "h1": "SEO Google Maps Thẩm mỹ viện Bắc Ninh",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Bắc Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-long-an",
    "keywordsMain": "seo google maps thẩm mỹ viện Long An",
    "h1": "SEO Google Maps Thẩm mỹ viện Long An",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Long An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-lam-dong",
    "keywordsMain": "seo google maps thẩm mỹ viện Lâm Đồng",
    "h1": "SEO Google Maps Thẩm mỹ viện Lâm Đồng",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Lâm Đồng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-quang-ninh",
    "keywordsMain": "seo google maps thẩm mỹ viện Quảng Ninh",
    "h1": "SEO Google Maps Thẩm mỹ viện Quảng Ninh",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Quảng Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-thanh-hoa",
    "keywordsMain": "seo google maps thẩm mỹ viện Thanh Hóa",
    "h1": "SEO Google Maps Thẩm mỹ viện Thanh Hóa",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Thanh Hóa",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-nghe-an",
    "keywordsMain": "seo google maps thẩm mỹ viện Nghệ An",
    "h1": "SEO Google Maps Thẩm mỹ viện Nghệ An",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Nghệ An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-da-lat",
    "keywordsMain": "seo google maps thẩm mỹ viện Đà Lạt",
    "h1": "SEO Google Maps Thẩm mỹ viện Đà Lạt",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Đà Lạt",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-tham-my-quy-nhon",
    "keywordsMain": "seo google maps thẩm mỹ viện Quy Nhon",
    "h1": "SEO Google Maps Thẩm mỹ viện Quy Nhon",
    "angle": "tối ưu Maps thẩm mỹ viện thu khách local tại Quy Nhon",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-tphcm",
    "keywordsMain": "seo google maps spa TPHCM",
    "h1": "SEO Google Maps Spa TPHCM",
    "angle": "tối ưu Maps spa thu khách local tại TPHCM",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-ha-noi",
    "keywordsMain": "seo google maps spa Hà Nội",
    "h1": "SEO Google Maps Spa Hà Nội",
    "angle": "tối ưu Maps spa thu khách local tại Hà Nội",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-da-nang",
    "keywordsMain": "seo google maps spa Đà Nẵng",
    "h1": "SEO Google Maps Spa Đà Nẵng",
    "angle": "tối ưu Maps spa thu khách local tại Đà Nẵng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-can-tho",
    "keywordsMain": "seo google maps spa Cần Thơ",
    "h1": "SEO Google Maps Spa Cần Thơ",
    "angle": "tối ưu Maps spa thu khách local tại Cần Thơ",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-binh-duong",
    "keywordsMain": "seo google maps spa Bình Dương",
    "h1": "SEO Google Maps Spa Bình Dương",
    "angle": "tối ưu Maps spa thu khách local tại Bình Dương",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-dong-nai",
    "keywordsMain": "seo google maps spa Đồng Nai",
    "h1": "SEO Google Maps Spa Đồng Nai",
    "angle": "tối ưu Maps spa thu khách local tại Đồng Nai",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-hai-phong",
    "keywordsMain": "seo google maps spa Hải Phòng",
    "h1": "SEO Google Maps Spa Hải Phòng",
    "angle": "tối ưu Maps spa thu khách local tại Hải Phòng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-nha-trang",
    "keywordsMain": "seo google maps spa Nha Trang",
    "h1": "SEO Google Maps Spa Nha Trang",
    "angle": "tối ưu Maps spa thu khách local tại Nha Trang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-hue",
    "keywordsMain": "seo google maps spa Huế",
    "h1": "SEO Google Maps Spa Huế",
    "angle": "tối ưu Maps spa thu khách local tại Huế",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-vung-tau",
    "keywordsMain": "seo google maps spa Vũng Tàu",
    "h1": "SEO Google Maps Spa Vũng Tàu",
    "angle": "tối ưu Maps spa thu khách local tại Vũng Tàu",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-bac-ninh",
    "keywordsMain": "seo google maps spa Bắc Ninh",
    "h1": "SEO Google Maps Spa Bắc Ninh",
    "angle": "tối ưu Maps spa thu khách local tại Bắc Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-long-an",
    "keywordsMain": "seo google maps spa Long An",
    "h1": "SEO Google Maps Spa Long An",
    "angle": "tối ưu Maps spa thu khách local tại Long An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-lam-dong",
    "keywordsMain": "seo google maps spa Lâm Đồng",
    "h1": "SEO Google Maps Spa Lâm Đồng",
    "angle": "tối ưu Maps spa thu khách local tại Lâm Đồng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-quang-ninh",
    "keywordsMain": "seo google maps spa Quảng Ninh",
    "h1": "SEO Google Maps Spa Quảng Ninh",
    "angle": "tối ưu Maps spa thu khách local tại Quảng Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-thanh-hoa",
    "keywordsMain": "seo google maps spa Thanh Hóa",
    "h1": "SEO Google Maps Spa Thanh Hóa",
    "angle": "tối ưu Maps spa thu khách local tại Thanh Hóa",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-nghe-an",
    "keywordsMain": "seo google maps spa Nghệ An",
    "h1": "SEO Google Maps Spa Nghệ An",
    "angle": "tối ưu Maps spa thu khách local tại Nghệ An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-da-lat",
    "keywordsMain": "seo google maps spa Đà Lạt",
    "h1": "SEO Google Maps Spa Đà Lạt",
    "angle": "tối ưu Maps spa thu khách local tại Đà Lạt",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-spa-quy-nhon",
    "keywordsMain": "seo google maps spa Quy Nhon",
    "h1": "SEO Google Maps Spa Quy Nhon",
    "angle": "tối ưu Maps spa thu khách local tại Quy Nhon",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-tphcm",
    "keywordsMain": "seo google maps phòng khám TPHCM",
    "h1": "SEO Google Maps Phòng khám TPHCM",
    "angle": "tối ưu Maps phòng khám thu khách local tại TPHCM",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-ha-noi",
    "keywordsMain": "seo google maps phòng khám Hà Nội",
    "h1": "SEO Google Maps Phòng khám Hà Nội",
    "angle": "tối ưu Maps phòng khám thu khách local tại Hà Nội",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-da-nang",
    "keywordsMain": "seo google maps phòng khám Đà Nẵng",
    "h1": "SEO Google Maps Phòng khám Đà Nẵng",
    "angle": "tối ưu Maps phòng khám thu khách local tại Đà Nẵng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-can-tho",
    "keywordsMain": "seo google maps phòng khám Cần Thơ",
    "h1": "SEO Google Maps Phòng khám Cần Thơ",
    "angle": "tối ưu Maps phòng khám thu khách local tại Cần Thơ",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-binh-duong",
    "keywordsMain": "seo google maps phòng khám Bình Dương",
    "h1": "SEO Google Maps Phòng khám Bình Dương",
    "angle": "tối ưu Maps phòng khám thu khách local tại Bình Dương",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-dong-nai",
    "keywordsMain": "seo google maps phòng khám Đồng Nai",
    "h1": "SEO Google Maps Phòng khám Đồng Nai",
    "angle": "tối ưu Maps phòng khám thu khách local tại Đồng Nai",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-hai-phong",
    "keywordsMain": "seo google maps phòng khám Hải Phòng",
    "h1": "SEO Google Maps Phòng khám Hải Phòng",
    "angle": "tối ưu Maps phòng khám thu khách local tại Hải Phòng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-nha-trang",
    "keywordsMain": "seo google maps phòng khám Nha Trang",
    "h1": "SEO Google Maps Phòng khám Nha Trang",
    "angle": "tối ưu Maps phòng khám thu khách local tại Nha Trang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-hue",
    "keywordsMain": "seo google maps phòng khám Huế",
    "h1": "SEO Google Maps Phòng khám Huế",
    "angle": "tối ưu Maps phòng khám thu khách local tại Huế",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-vung-tau",
    "keywordsMain": "seo google maps phòng khám Vũng Tàu",
    "h1": "SEO Google Maps Phòng khám Vũng Tàu",
    "angle": "tối ưu Maps phòng khám thu khách local tại Vũng Tàu",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-bac-ninh",
    "keywordsMain": "seo google maps phòng khám Bắc Ninh",
    "h1": "SEO Google Maps Phòng khám Bắc Ninh",
    "angle": "tối ưu Maps phòng khám thu khách local tại Bắc Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-long-an",
    "keywordsMain": "seo google maps phòng khám Long An",
    "h1": "SEO Google Maps Phòng khám Long An",
    "angle": "tối ưu Maps phòng khám thu khách local tại Long An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-lam-dong",
    "keywordsMain": "seo google maps phòng khám Lâm Đồng",
    "h1": "SEO Google Maps Phòng khám Lâm Đồng",
    "angle": "tối ưu Maps phòng khám thu khách local tại Lâm Đồng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-quang-ninh",
    "keywordsMain": "seo google maps phòng khám Quảng Ninh",
    "h1": "SEO Google Maps Phòng khám Quảng Ninh",
    "angle": "tối ưu Maps phòng khám thu khách local tại Quảng Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-thanh-hoa",
    "keywordsMain": "seo google maps phòng khám Thanh Hóa",
    "h1": "SEO Google Maps Phòng khám Thanh Hóa",
    "angle": "tối ưu Maps phòng khám thu khách local tại Thanh Hóa",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-nghe-an",
    "keywordsMain": "seo google maps phòng khám Nghệ An",
    "h1": "SEO Google Maps Phòng khám Nghệ An",
    "angle": "tối ưu Maps phòng khám thu khách local tại Nghệ An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-da-lat",
    "keywordsMain": "seo google maps phòng khám Đà Lạt",
    "h1": "SEO Google Maps Phòng khám Đà Lạt",
    "angle": "tối ưu Maps phòng khám thu khách local tại Đà Lạt",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-phong-kham-quy-nhon",
    "keywordsMain": "seo google maps phòng khám Quy Nhon",
    "h1": "SEO Google Maps Phòng khám Quy Nhon",
    "angle": "tối ưu Maps phòng khám thu khách local tại Quy Nhon",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-tphcm",
    "keywordsMain": "seo google maps mỹ phẩm TPHCM",
    "h1": "SEO Google Maps Mỹ phẩm TPHCM",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại TPHCM",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-ha-noi",
    "keywordsMain": "seo google maps mỹ phẩm Hà Nội",
    "h1": "SEO Google Maps Mỹ phẩm Hà Nội",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Hà Nội",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-da-nang",
    "keywordsMain": "seo google maps mỹ phẩm Đà Nẵng",
    "h1": "SEO Google Maps Mỹ phẩm Đà Nẵng",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Đà Nẵng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-can-tho",
    "keywordsMain": "seo google maps mỹ phẩm Cần Thơ",
    "h1": "SEO Google Maps Mỹ phẩm Cần Thơ",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Cần Thơ",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-binh-duong",
    "keywordsMain": "seo google maps mỹ phẩm Bình Dương",
    "h1": "SEO Google Maps Mỹ phẩm Bình Dương",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Bình Dương",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-dong-nai",
    "keywordsMain": "seo google maps mỹ phẩm Đồng Nai",
    "h1": "SEO Google Maps Mỹ phẩm Đồng Nai",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Đồng Nai",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-hai-phong",
    "keywordsMain": "seo google maps mỹ phẩm Hải Phòng",
    "h1": "SEO Google Maps Mỹ phẩm Hải Phòng",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Hải Phòng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-nha-trang",
    "keywordsMain": "seo google maps mỹ phẩm Nha Trang",
    "h1": "SEO Google Maps Mỹ phẩm Nha Trang",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Nha Trang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-hue",
    "keywordsMain": "seo google maps mỹ phẩm Huế",
    "h1": "SEO Google Maps Mỹ phẩm Huế",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Huế",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-vung-tau",
    "keywordsMain": "seo google maps mỹ phẩm Vũng Tàu",
    "h1": "SEO Google Maps Mỹ phẩm Vũng Tàu",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Vũng Tàu",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-bac-ninh",
    "keywordsMain": "seo google maps mỹ phẩm Bắc Ninh",
    "h1": "SEO Google Maps Mỹ phẩm Bắc Ninh",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Bắc Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-long-an",
    "keywordsMain": "seo google maps mỹ phẩm Long An",
    "h1": "SEO Google Maps Mỹ phẩm Long An",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Long An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-lam-dong",
    "keywordsMain": "seo google maps mỹ phẩm Lâm Đồng",
    "h1": "SEO Google Maps Mỹ phẩm Lâm Đồng",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Lâm Đồng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-quang-ninh",
    "keywordsMain": "seo google maps mỹ phẩm Quảng Ninh",
    "h1": "SEO Google Maps Mỹ phẩm Quảng Ninh",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Quảng Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-thanh-hoa",
    "keywordsMain": "seo google maps mỹ phẩm Thanh Hóa",
    "h1": "SEO Google Maps Mỹ phẩm Thanh Hóa",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Thanh Hóa",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-nghe-an",
    "keywordsMain": "seo google maps mỹ phẩm Nghệ An",
    "h1": "SEO Google Maps Mỹ phẩm Nghệ An",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Nghệ An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-da-lat",
    "keywordsMain": "seo google maps mỹ phẩm Đà Lạt",
    "h1": "SEO Google Maps Mỹ phẩm Đà Lạt",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Đà Lạt",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-my-pham-quy-nhon",
    "keywordsMain": "seo google maps mỹ phẩm Quy Nhon",
    "h1": "SEO Google Maps Mỹ phẩm Quy Nhon",
    "angle": "tối ưu Maps mỹ phẩm thu khách local tại Quy Nhon",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-tphcm",
    "keywordsMain": "seo google maps PCCC TPHCM",
    "h1": "SEO Google Maps PCCC TPHCM",
    "angle": "tối ưu Maps PCCC thu khách local tại TPHCM",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-ha-noi",
    "keywordsMain": "seo google maps PCCC Hà Nội",
    "h1": "SEO Google Maps PCCC Hà Nội",
    "angle": "tối ưu Maps PCCC thu khách local tại Hà Nội",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-da-nang",
    "keywordsMain": "seo google maps PCCC Đà Nẵng",
    "h1": "SEO Google Maps PCCC Đà Nẵng",
    "angle": "tối ưu Maps PCCC thu khách local tại Đà Nẵng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-can-tho",
    "keywordsMain": "seo google maps PCCC Cần Thơ",
    "h1": "SEO Google Maps PCCC Cần Thơ",
    "angle": "tối ưu Maps PCCC thu khách local tại Cần Thơ",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-binh-duong",
    "keywordsMain": "seo google maps PCCC Bình Dương",
    "h1": "SEO Google Maps PCCC Bình Dương",
    "angle": "tối ưu Maps PCCC thu khách local tại Bình Dương",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-dong-nai",
    "keywordsMain": "seo google maps PCCC Đồng Nai",
    "h1": "SEO Google Maps PCCC Đồng Nai",
    "angle": "tối ưu Maps PCCC thu khách local tại Đồng Nai",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-hai-phong",
    "keywordsMain": "seo google maps PCCC Hải Phòng",
    "h1": "SEO Google Maps PCCC Hải Phòng",
    "angle": "tối ưu Maps PCCC thu khách local tại Hải Phòng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-nha-trang",
    "keywordsMain": "seo google maps PCCC Nha Trang",
    "h1": "SEO Google Maps PCCC Nha Trang",
    "angle": "tối ưu Maps PCCC thu khách local tại Nha Trang",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-hue",
    "keywordsMain": "seo google maps PCCC Huế",
    "h1": "SEO Google Maps PCCC Huế",
    "angle": "tối ưu Maps PCCC thu khách local tại Huế",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-vung-tau",
    "keywordsMain": "seo google maps PCCC Vũng Tàu",
    "h1": "SEO Google Maps PCCC Vũng Tàu",
    "angle": "tối ưu Maps PCCC thu khách local tại Vũng Tàu",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-bac-ninh",
    "keywordsMain": "seo google maps PCCC Bắc Ninh",
    "h1": "SEO Google Maps PCCC Bắc Ninh",
    "angle": "tối ưu Maps PCCC thu khách local tại Bắc Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-long-an",
    "keywordsMain": "seo google maps PCCC Long An",
    "h1": "SEO Google Maps PCCC Long An",
    "angle": "tối ưu Maps PCCC thu khách local tại Long An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-lam-dong",
    "keywordsMain": "seo google maps PCCC Lâm Đồng",
    "h1": "SEO Google Maps PCCC Lâm Đồng",
    "angle": "tối ưu Maps PCCC thu khách local tại Lâm Đồng",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-quang-ninh",
    "keywordsMain": "seo google maps PCCC Quảng Ninh",
    "h1": "SEO Google Maps PCCC Quảng Ninh",
    "angle": "tối ưu Maps PCCC thu khách local tại Quảng Ninh",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-thanh-hoa",
    "keywordsMain": "seo google maps PCCC Thanh Hóa",
    "h1": "SEO Google Maps PCCC Thanh Hóa",
    "angle": "tối ưu Maps PCCC thu khách local tại Thanh Hóa",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-nghe-an",
    "keywordsMain": "seo google maps PCCC Nghệ An",
    "h1": "SEO Google Maps PCCC Nghệ An",
    "angle": "tối ưu Maps PCCC thu khách local tại Nghệ An",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-da-lat",
    "keywordsMain": "seo google maps PCCC Đà Lạt",
    "h1": "SEO Google Maps PCCC Đà Lạt",
    "angle": "tối ưu Maps PCCC thu khách local tại Đà Lạt",
    "niche": "seo"
  },
  {
    "slug": "seo-google-maps-pccc-quy-nhon",
    "keywordsMain": "seo google maps PCCC Quy Nhon",
    "h1": "SEO Google Maps PCCC Quy Nhon",
    "angle": "tối ưu Maps PCCC thu khách local tại Quy Nhon",
    "niche": "seo"
  }
];

/** C — 126 marketing×city */
const C_MKT_CITY = [
  {
    "slug": "marketing-nha-khoa-tphcm",
    "keywordsMain": "marketing nha khoa TPHCM",
    "h1": "Marketing Nha khoa TPHCM — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-ha-noi",
    "keywordsMain": "marketing nha khoa Hà Nội",
    "h1": "Marketing Nha khoa Hà Nội — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-da-nang",
    "keywordsMain": "marketing nha khoa Đà Nẵng",
    "h1": "Marketing Nha khoa Đà Nẵng — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-can-tho",
    "keywordsMain": "marketing nha khoa Cần Thơ",
    "h1": "Marketing Nha khoa Cần Thơ — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-binh-duong",
    "keywordsMain": "marketing nha khoa Bình Dương",
    "h1": "Marketing Nha khoa Bình Dương — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-dong-nai",
    "keywordsMain": "marketing nha khoa Đồng Nai",
    "h1": "Marketing Nha khoa Đồng Nai — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-hai-phong",
    "keywordsMain": "marketing nha khoa Hải Phòng",
    "h1": "Marketing Nha khoa Hải Phòng — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-nha-trang",
    "keywordsMain": "marketing nha khoa Nha Trang",
    "h1": "Marketing Nha khoa Nha Trang — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-hue",
    "keywordsMain": "marketing nha khoa Huế",
    "h1": "Marketing Nha khoa Huế — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-vung-tau",
    "keywordsMain": "marketing nha khoa Vũng Tàu",
    "h1": "Marketing Nha khoa Vũng Tàu — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-bac-ninh",
    "keywordsMain": "marketing nha khoa Bắc Ninh",
    "h1": "Marketing Nha khoa Bắc Ninh — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-long-an",
    "keywordsMain": "marketing nha khoa Long An",
    "h1": "Marketing Nha khoa Long An — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-lam-dong",
    "keywordsMain": "marketing nha khoa Lâm Đồng",
    "h1": "Marketing Nha khoa Lâm Đồng — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-quang-ninh",
    "keywordsMain": "marketing nha khoa Quảng Ninh",
    "h1": "Marketing Nha khoa Quảng Ninh — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-thanh-hoa",
    "keywordsMain": "marketing nha khoa Thanh Hóa",
    "h1": "Marketing Nha khoa Thanh Hóa — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-nghe-an",
    "keywordsMain": "marketing nha khoa Nghệ An",
    "h1": "Marketing Nha khoa Nghệ An — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-da-lat",
    "keywordsMain": "marketing nha khoa Đà Lạt",
    "h1": "Marketing Nha khoa Đà Lạt — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "marketing-nha-khoa-quy-nhon",
    "keywordsMain": "marketing nha khoa Quy Nhon",
    "h1": "Marketing Nha khoa Quy Nhon — Đa Kênh Có Proof",
    "angle": "marketing nha khoa website + Maps + ads tại Quy Nhon",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-tphcm",
    "keywordsMain": "marketing xây dựng TPHCM",
    "h1": "Marketing Xây dựng TPHCM — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-ha-noi",
    "keywordsMain": "marketing xây dựng Hà Nội",
    "h1": "Marketing Xây dựng Hà Nội — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-da-nang",
    "keywordsMain": "marketing xây dựng Đà Nẵng",
    "h1": "Marketing Xây dựng Đà Nẵng — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-can-tho",
    "keywordsMain": "marketing xây dựng Cần Thơ",
    "h1": "Marketing Xây dựng Cần Thơ — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-binh-duong",
    "keywordsMain": "marketing xây dựng Bình Dương",
    "h1": "Marketing Xây dựng Bình Dương — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-dong-nai",
    "keywordsMain": "marketing xây dựng Đồng Nai",
    "h1": "Marketing Xây dựng Đồng Nai — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-hai-phong",
    "keywordsMain": "marketing xây dựng Hải Phòng",
    "h1": "Marketing Xây dựng Hải Phòng — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-nha-trang",
    "keywordsMain": "marketing xây dựng Nha Trang",
    "h1": "Marketing Xây dựng Nha Trang — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-hue",
    "keywordsMain": "marketing xây dựng Huế",
    "h1": "Marketing Xây dựng Huế — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-vung-tau",
    "keywordsMain": "marketing xây dựng Vũng Tàu",
    "h1": "Marketing Xây dựng Vũng Tàu — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-bac-ninh",
    "keywordsMain": "marketing xây dựng Bắc Ninh",
    "h1": "Marketing Xây dựng Bắc Ninh — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-long-an",
    "keywordsMain": "marketing xây dựng Long An",
    "h1": "Marketing Xây dựng Long An — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-lam-dong",
    "keywordsMain": "marketing xây dựng Lâm Đồng",
    "h1": "Marketing Xây dựng Lâm Đồng — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-quang-ninh",
    "keywordsMain": "marketing xây dựng Quảng Ninh",
    "h1": "Marketing Xây dựng Quảng Ninh — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-thanh-hoa",
    "keywordsMain": "marketing xây dựng Thanh Hóa",
    "h1": "Marketing Xây dựng Thanh Hóa — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-nghe-an",
    "keywordsMain": "marketing xây dựng Nghệ An",
    "h1": "Marketing Xây dựng Nghệ An — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-da-lat",
    "keywordsMain": "marketing xây dựng Đà Lạt",
    "h1": "Marketing Xây dựng Đà Lạt — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "marketing-xay-dung-quy-nhon",
    "keywordsMain": "marketing xây dựng Quy Nhon",
    "h1": "Marketing Xây dựng Quy Nhon — Đa Kênh Có Proof",
    "angle": "marketing xây dựng website + Maps + ads tại Quy Nhon",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-tphcm",
    "keywordsMain": "marketing thẩm mỹ viện TPHCM",
    "h1": "Marketing Thẩm mỹ viện TPHCM — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-ha-noi",
    "keywordsMain": "marketing thẩm mỹ viện Hà Nội",
    "h1": "Marketing Thẩm mỹ viện Hà Nội — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-da-nang",
    "keywordsMain": "marketing thẩm mỹ viện Đà Nẵng",
    "h1": "Marketing Thẩm mỹ viện Đà Nẵng — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-can-tho",
    "keywordsMain": "marketing thẩm mỹ viện Cần Thơ",
    "h1": "Marketing Thẩm mỹ viện Cần Thơ — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-binh-duong",
    "keywordsMain": "marketing thẩm mỹ viện Bình Dương",
    "h1": "Marketing Thẩm mỹ viện Bình Dương — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-dong-nai",
    "keywordsMain": "marketing thẩm mỹ viện Đồng Nai",
    "h1": "Marketing Thẩm mỹ viện Đồng Nai — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-hai-phong",
    "keywordsMain": "marketing thẩm mỹ viện Hải Phòng",
    "h1": "Marketing Thẩm mỹ viện Hải Phòng — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-nha-trang",
    "keywordsMain": "marketing thẩm mỹ viện Nha Trang",
    "h1": "Marketing Thẩm mỹ viện Nha Trang — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-hue",
    "keywordsMain": "marketing thẩm mỹ viện Huế",
    "h1": "Marketing Thẩm mỹ viện Huế — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-vung-tau",
    "keywordsMain": "marketing thẩm mỹ viện Vũng Tàu",
    "h1": "Marketing Thẩm mỹ viện Vũng Tàu — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-bac-ninh",
    "keywordsMain": "marketing thẩm mỹ viện Bắc Ninh",
    "h1": "Marketing Thẩm mỹ viện Bắc Ninh — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-long-an",
    "keywordsMain": "marketing thẩm mỹ viện Long An",
    "h1": "Marketing Thẩm mỹ viện Long An — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-lam-dong",
    "keywordsMain": "marketing thẩm mỹ viện Lâm Đồng",
    "h1": "Marketing Thẩm mỹ viện Lâm Đồng — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-quang-ninh",
    "keywordsMain": "marketing thẩm mỹ viện Quảng Ninh",
    "h1": "Marketing Thẩm mỹ viện Quảng Ninh — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-thanh-hoa",
    "keywordsMain": "marketing thẩm mỹ viện Thanh Hóa",
    "h1": "Marketing Thẩm mỹ viện Thanh Hóa — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-nghe-an",
    "keywordsMain": "marketing thẩm mỹ viện Nghệ An",
    "h1": "Marketing Thẩm mỹ viện Nghệ An — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-da-lat",
    "keywordsMain": "marketing thẩm mỹ viện Đà Lạt",
    "h1": "Marketing Thẩm mỹ viện Đà Lạt — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "marketing-tham-my-quy-nhon",
    "keywordsMain": "marketing thẩm mỹ viện Quy Nhon",
    "h1": "Marketing Thẩm mỹ viện Quy Nhon — Đa Kênh Có Proof",
    "angle": "marketing thẩm mỹ viện website + Maps + ads tại Quy Nhon",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-tphcm",
    "keywordsMain": "marketing spa TPHCM",
    "h1": "Marketing Spa TPHCM — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-ha-noi",
    "keywordsMain": "marketing spa Hà Nội",
    "h1": "Marketing Spa Hà Nội — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-da-nang",
    "keywordsMain": "marketing spa Đà Nẵng",
    "h1": "Marketing Spa Đà Nẵng — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-can-tho",
    "keywordsMain": "marketing spa Cần Thơ",
    "h1": "Marketing Spa Cần Thơ — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-binh-duong",
    "keywordsMain": "marketing spa Bình Dương",
    "h1": "Marketing Spa Bình Dương — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-dong-nai",
    "keywordsMain": "marketing spa Đồng Nai",
    "h1": "Marketing Spa Đồng Nai — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-hai-phong",
    "keywordsMain": "marketing spa Hải Phòng",
    "h1": "Marketing Spa Hải Phòng — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-nha-trang",
    "keywordsMain": "marketing spa Nha Trang",
    "h1": "Marketing Spa Nha Trang — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-hue",
    "keywordsMain": "marketing spa Huế",
    "h1": "Marketing Spa Huế — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-vung-tau",
    "keywordsMain": "marketing spa Vũng Tàu",
    "h1": "Marketing Spa Vũng Tàu — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-bac-ninh",
    "keywordsMain": "marketing spa Bắc Ninh",
    "h1": "Marketing Spa Bắc Ninh — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-long-an",
    "keywordsMain": "marketing spa Long An",
    "h1": "Marketing Spa Long An — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-lam-dong",
    "keywordsMain": "marketing spa Lâm Đồng",
    "h1": "Marketing Spa Lâm Đồng — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-quang-ninh",
    "keywordsMain": "marketing spa Quảng Ninh",
    "h1": "Marketing Spa Quảng Ninh — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-thanh-hoa",
    "keywordsMain": "marketing spa Thanh Hóa",
    "h1": "Marketing Spa Thanh Hóa — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-nghe-an",
    "keywordsMain": "marketing spa Nghệ An",
    "h1": "Marketing Spa Nghệ An — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-da-lat",
    "keywordsMain": "marketing spa Đà Lạt",
    "h1": "Marketing Spa Đà Lạt — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "marketing-spa-quy-nhon",
    "keywordsMain": "marketing spa Quy Nhon",
    "h1": "Marketing Spa Quy Nhon — Đa Kênh Có Proof",
    "angle": "marketing spa website + Maps + ads tại Quy Nhon",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-tphcm",
    "keywordsMain": "marketing phòng khám TPHCM",
    "h1": "Marketing Phòng khám TPHCM — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-ha-noi",
    "keywordsMain": "marketing phòng khám Hà Nội",
    "h1": "Marketing Phòng khám Hà Nội — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-da-nang",
    "keywordsMain": "marketing phòng khám Đà Nẵng",
    "h1": "Marketing Phòng khám Đà Nẵng — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-can-tho",
    "keywordsMain": "marketing phòng khám Cần Thơ",
    "h1": "Marketing Phòng khám Cần Thơ — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-binh-duong",
    "keywordsMain": "marketing phòng khám Bình Dương",
    "h1": "Marketing Phòng khám Bình Dương — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-dong-nai",
    "keywordsMain": "marketing phòng khám Đồng Nai",
    "h1": "Marketing Phòng khám Đồng Nai — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-hai-phong",
    "keywordsMain": "marketing phòng khám Hải Phòng",
    "h1": "Marketing Phòng khám Hải Phòng — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-nha-trang",
    "keywordsMain": "marketing phòng khám Nha Trang",
    "h1": "Marketing Phòng khám Nha Trang — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-hue",
    "keywordsMain": "marketing phòng khám Huế",
    "h1": "Marketing Phòng khám Huế — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-vung-tau",
    "keywordsMain": "marketing phòng khám Vũng Tàu",
    "h1": "Marketing Phòng khám Vũng Tàu — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-bac-ninh",
    "keywordsMain": "marketing phòng khám Bắc Ninh",
    "h1": "Marketing Phòng khám Bắc Ninh — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-long-an",
    "keywordsMain": "marketing phòng khám Long An",
    "h1": "Marketing Phòng khám Long An — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-lam-dong",
    "keywordsMain": "marketing phòng khám Lâm Đồng",
    "h1": "Marketing Phòng khám Lâm Đồng — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-quang-ninh",
    "keywordsMain": "marketing phòng khám Quảng Ninh",
    "h1": "Marketing Phòng khám Quảng Ninh — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-thanh-hoa",
    "keywordsMain": "marketing phòng khám Thanh Hóa",
    "h1": "Marketing Phòng khám Thanh Hóa — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-nghe-an",
    "keywordsMain": "marketing phòng khám Nghệ An",
    "h1": "Marketing Phòng khám Nghệ An — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-da-lat",
    "keywordsMain": "marketing phòng khám Đà Lạt",
    "h1": "Marketing Phòng khám Đà Lạt — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "marketing-phong-kham-quy-nhon",
    "keywordsMain": "marketing phòng khám Quy Nhon",
    "h1": "Marketing Phòng khám Quy Nhon — Đa Kênh Có Proof",
    "angle": "marketing phòng khám website + Maps + ads tại Quy Nhon",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-tphcm",
    "keywordsMain": "marketing mỹ phẩm TPHCM",
    "h1": "Marketing Mỹ phẩm TPHCM — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-ha-noi",
    "keywordsMain": "marketing mỹ phẩm Hà Nội",
    "h1": "Marketing Mỹ phẩm Hà Nội — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-da-nang",
    "keywordsMain": "marketing mỹ phẩm Đà Nẵng",
    "h1": "Marketing Mỹ phẩm Đà Nẵng — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-can-tho",
    "keywordsMain": "marketing mỹ phẩm Cần Thơ",
    "h1": "Marketing Mỹ phẩm Cần Thơ — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-binh-duong",
    "keywordsMain": "marketing mỹ phẩm Bình Dương",
    "h1": "Marketing Mỹ phẩm Bình Dương — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-dong-nai",
    "keywordsMain": "marketing mỹ phẩm Đồng Nai",
    "h1": "Marketing Mỹ phẩm Đồng Nai — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-hai-phong",
    "keywordsMain": "marketing mỹ phẩm Hải Phòng",
    "h1": "Marketing Mỹ phẩm Hải Phòng — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-nha-trang",
    "keywordsMain": "marketing mỹ phẩm Nha Trang",
    "h1": "Marketing Mỹ phẩm Nha Trang — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-hue",
    "keywordsMain": "marketing mỹ phẩm Huế",
    "h1": "Marketing Mỹ phẩm Huế — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-vung-tau",
    "keywordsMain": "marketing mỹ phẩm Vũng Tàu",
    "h1": "Marketing Mỹ phẩm Vũng Tàu — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-bac-ninh",
    "keywordsMain": "marketing mỹ phẩm Bắc Ninh",
    "h1": "Marketing Mỹ phẩm Bắc Ninh — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-long-an",
    "keywordsMain": "marketing mỹ phẩm Long An",
    "h1": "Marketing Mỹ phẩm Long An — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-lam-dong",
    "keywordsMain": "marketing mỹ phẩm Lâm Đồng",
    "h1": "Marketing Mỹ phẩm Lâm Đồng — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-quang-ninh",
    "keywordsMain": "marketing mỹ phẩm Quảng Ninh",
    "h1": "Marketing Mỹ phẩm Quảng Ninh — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-thanh-hoa",
    "keywordsMain": "marketing mỹ phẩm Thanh Hóa",
    "h1": "Marketing Mỹ phẩm Thanh Hóa — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-nghe-an",
    "keywordsMain": "marketing mỹ phẩm Nghệ An",
    "h1": "Marketing Mỹ phẩm Nghệ An — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-da-lat",
    "keywordsMain": "marketing mỹ phẩm Đà Lạt",
    "h1": "Marketing Mỹ phẩm Đà Lạt — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "marketing-my-pham-quy-nhon",
    "keywordsMain": "marketing mỹ phẩm Quy Nhon",
    "h1": "Marketing Mỹ phẩm Quy Nhon — Đa Kênh Có Proof",
    "angle": "marketing mỹ phẩm website + Maps + ads tại Quy Nhon",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-tphcm",
    "keywordsMain": "marketing PCCC TPHCM",
    "h1": "Marketing PCCC TPHCM — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại TPHCM",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-ha-noi",
    "keywordsMain": "marketing PCCC Hà Nội",
    "h1": "Marketing PCCC Hà Nội — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Hà Nội",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-da-nang",
    "keywordsMain": "marketing PCCC Đà Nẵng",
    "h1": "Marketing PCCC Đà Nẵng — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Đà Nẵng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-can-tho",
    "keywordsMain": "marketing PCCC Cần Thơ",
    "h1": "Marketing PCCC Cần Thơ — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Cần Thơ",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-binh-duong",
    "keywordsMain": "marketing PCCC Bình Dương",
    "h1": "Marketing PCCC Bình Dương — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Bình Dương",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-dong-nai",
    "keywordsMain": "marketing PCCC Đồng Nai",
    "h1": "Marketing PCCC Đồng Nai — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Đồng Nai",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-hai-phong",
    "keywordsMain": "marketing PCCC Hải Phòng",
    "h1": "Marketing PCCC Hải Phòng — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Hải Phòng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-nha-trang",
    "keywordsMain": "marketing PCCC Nha Trang",
    "h1": "Marketing PCCC Nha Trang — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Nha Trang",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-hue",
    "keywordsMain": "marketing PCCC Huế",
    "h1": "Marketing PCCC Huế — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Huế",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-vung-tau",
    "keywordsMain": "marketing PCCC Vũng Tàu",
    "h1": "Marketing PCCC Vũng Tàu — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Vũng Tàu",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-bac-ninh",
    "keywordsMain": "marketing PCCC Bắc Ninh",
    "h1": "Marketing PCCC Bắc Ninh — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Bắc Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-long-an",
    "keywordsMain": "marketing PCCC Long An",
    "h1": "Marketing PCCC Long An — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Long An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-lam-dong",
    "keywordsMain": "marketing PCCC Lâm Đồng",
    "h1": "Marketing PCCC Lâm Đồng — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Lâm Đồng",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-quang-ninh",
    "keywordsMain": "marketing PCCC Quảng Ninh",
    "h1": "Marketing PCCC Quảng Ninh — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Quảng Ninh",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-thanh-hoa",
    "keywordsMain": "marketing PCCC Thanh Hóa",
    "h1": "Marketing PCCC Thanh Hóa — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Thanh Hóa",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-nghe-an",
    "keywordsMain": "marketing PCCC Nghệ An",
    "h1": "Marketing PCCC Nghệ An — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Nghệ An",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-da-lat",
    "keywordsMain": "marketing PCCC Đà Lạt",
    "h1": "Marketing PCCC Đà Lạt — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Đà Lạt",
    "niche": "strategy"
  },
  {
    "slug": "marketing-pccc-quy-nhon",
    "keywordsMain": "marketing PCCC Quy Nhon",
    "h1": "Marketing PCCC Quy Nhon — Đa Kênh Có Proof",
    "angle": "marketing PCCC website + Maps + ads tại Quy Nhon",
    "niche": "strategy"
  }
];

/** D — 35 sub-niche web */
const D_SUB_WEB = [
  {
    "slug": "thiet-ke-website-nha-khoa-implant",
    "keywordsMain": "thiết kế website implant",
    "h1": "Thiết Kế Website Implant Chuyên Nghiệp Chuẩn SEO",
    "angle": "website nha khoa implant trồng răng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-nieng-rang",
    "keywordsMain": "thiết kế website niềng răng",
    "h1": "Thiết Kế Website Niềng răng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website nha khoa chỉnh nha Invisalign",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-rang-su",
    "keywordsMain": "thiết kế website răng sứ",
    "h1": "Thiết Kế Website Răng sứ Chuyên Nghiệp Chuẩn SEO",
    "angle": "website nha khoa thẩm mỹ răng sứ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-tre-em",
    "keywordsMain": "thiết kế website trẻ em",
    "h1": "Thiết Kế Website Trẻ em Chuyên Nghiệp Chuẩn SEO",
    "angle": "website nha khoa trẻ em thân thiện",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-nha-khoa-tay-trang",
    "keywordsMain": "thiết kế website tẩy trắng răng",
    "h1": "Thiết Kế Website Tẩy trắng răng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website nha khoa tẩy trắng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-nha-thau",
    "keywordsMain": "thiết kế website nhà thầu",
    "h1": "Thiết Kế Website Nhà thầu Chuyên Nghiệp Chuẩn SEO",
    "angle": "website nhà thầu hồ sơ năng lực",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-kien-truc",
    "keywordsMain": "thiết kế website kiến trúc",
    "h1": "Thiết Kế Website Kiến trúc Chuyên Nghiệp Chuẩn SEO",
    "angle": "website công ty kiến trúc portfolio",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-noi-that",
    "keywordsMain": "thiết kế website nội thất",
    "h1": "Thiết Kế Website Nội thất Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thiết kế nội thất showroom",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-dan-dung",
    "keywordsMain": "thiết kế website xây dựng dân dụng",
    "h1": "Thiết Kế Website Xây dựng dân dụng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website xây dựng nhà ở dân dụng",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-xay-dung-cong-nghiep",
    "keywordsMain": "thiết kế website xây dựng công nghiệp",
    "h1": "Thiết Kế Website Xây dựng công nghiệp Chuyên Nghiệp Chuẩn SEO",
    "angle": "website nhà thầu công nghiệp",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-phau-thuat",
    "keywordsMain": "thiết kế website phẫu thuật thẩm mỹ",
    "h1": "Thiết Kế Website Phẫu thuật thẩm mỹ Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thẩm mỹ phẫu thuật",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-tiem-filler",
    "keywordsMain": "thiết kế website tiêm filler botox",
    "h1": "Thiết Kế Website Tiêm filler botox Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thẩm mỹ tiêm filler",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-nang-nguc",
    "keywordsMain": "thiết kế website nâng ngực",
    "h1": "Thiết Kế Website Nâng ngực Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thẩm mỹ nâng ngực",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-cat-mi",
    "keywordsMain": "thiết kế website cắt mí",
    "h1": "Thiết Kế Website Cắt mí Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thẩm mỹ cắt mí",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-tham-my-tri-mun",
    "keywordsMain": "thiết kế website thẩm mỹ trị mụn",
    "h1": "Thiết Kế Website Thẩm mỹ trị mụn Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thẩm mỹ trị mụn laser",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-massage",
    "keywordsMain": "thiết kế website massage body",
    "h1": "Thiết Kế Website Massage body Chuyên Nghiệp Chuẩn SEO",
    "angle": "website spa massage thư giãn",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-tri-lieu",
    "keywordsMain": "thiết kế website trị liệu da",
    "h1": "Thiết Kế Website Trị liệu da Chuyên Nghiệp Chuẩn SEO",
    "angle": "website spa facial trị liệu",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-goi-combo",
    "keywordsMain": "thiết kế website combo spa",
    "h1": "Thiết Kế Website Combo spa Chuyên Nghiệp Chuẩn SEO",
    "angle": "website spa bán combo dịch vụ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-luxury",
    "keywordsMain": "thiết kế website spa luxury",
    "h1": "Thiết Kế Website Spa luxury Chuyên Nghiệp Chuẩn SEO",
    "angle": "website spa cao cấp 5 sao",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-spa-nam",
    "keywordsMain": "thiết kế website spa nam",
    "h1": "Thiết Kế Website Spa nam Chuyên Nghiệp Chuẩn SEO",
    "angle": "website spa chăm sóc nam giới",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-da-khoa",
    "keywordsMain": "thiết kế website đa khoa",
    "h1": "Thiết Kế Website Đa khoa Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phòng khám đa khoa",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-nhi",
    "keywordsMain": "thiết kế website nhi khoa",
    "h1": "Thiết Kế Website Nhi khoa Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phòng khám nhi đặt lịch",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-san",
    "keywordsMain": "thiết kế website sản phụ khoa",
    "h1": "Thiết Kế Website Sản phụ khoa Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phòng khám sản",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-tai-mui-hong",
    "keywordsMain": "thiết kế website tai mũi họng",
    "h1": "Thiết Kế Website Tai mũi họng Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phòng khám TMH",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-phong-kham-noi-soi",
    "keywordsMain": "thiết kế website nội soi",
    "h1": "Thiết Kế Website Nội soi Chuyên Nghiệp Chuẩn SEO",
    "angle": "website phòng khám nội soi",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-skincare",
    "keywordsMain": "thiết kế website skincare",
    "h1": "Thiết Kế Website Skincare Chuyên Nghiệp Chuẩn SEO",
    "angle": "website shop skincare Hàn Quốc",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-organic",
    "keywordsMain": "thiết kế website mỹ phẩm organic",
    "h1": "Thiết Kế Website Mỹ phẩm organic Chuyên Nghiệp Chuẩn SEO",
    "angle": "website mỹ phẩm thiên nhiên",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-da-mun",
    "keywordsMain": "thiết kế website shop mỹ phẩm trị mụn",
    "h1": "Thiết Kế Website Shop mỹ phẩm trị mụn Chuyên Nghiệp Chuẩn SEO",
    "angle": "website mỹ phẩm trị mụn skincare",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-cao-cap",
    "keywordsMain": "thiết kế website mỹ phẩm cao cấp",
    "h1": "Thiết Kế Website Mỹ phẩm cao cấp Chuyên Nghiệp Chuẩn SEO",
    "angle": "website mỹ phẩm luxury",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-my-pham-ban-le-si",
    "keywordsMain": "thiết kế website bán lẻ sỉ",
    "h1": "Thiết Kế Website Bán lẻ sỉ Chuyên Nghiệp Chuẩn SEO",
    "angle": "website mỹ phẩm bán sỉ",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-chua-chay",
    "keywordsMain": "thiết kế website chữa cháy",
    "h1": "Thiết Kế Website Chữa cháy Chuyên Nghiệp Chuẩn SEO",
    "angle": "website công ty PCCC chữa cháy",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-bao-chay",
    "keywordsMain": "thiết kế website báo cháy",
    "h1": "Thiết Kế Website Báo cháy Chuyên Nghiệp Chuẩn SEO",
    "angle": "website thiết bị báo cháy",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-thiet-bi",
    "keywordsMain": "thiết kế website thiết bị PCCC",
    "h1": "Thiết Kế Website Thiết bị PCCC Chuyên Nghiệp Chuẩn SEO",
    "angle": "website catalog thiết bị PCCC",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-tu-van",
    "keywordsMain": "thiết kế website tư vấn PCCC",
    "h1": "Thiết Kế Website Tư vấn PCCC Chuyên Nghiệp Chuẩn SEO",
    "angle": "website tư vấn thiết kế PCCC",
    "niche": "strategy"
  },
  {
    "slug": "thiet-ke-website-pccc-bao-tri",
    "keywordsMain": "thiết kế website bảo trì PCCC",
    "h1": "Thiết Kế Website Bảo trì PCCC Chuyên Nghiệp Chuẩn SEO",
    "angle": "website bảo trì hệ thống PCCC",
    "niche": "strategy"
  }
];

/** E — 35 báo giá sub */
const E_SUB_PRICE = [
  {
    "slug": "bao-gia-thiet-ke-website-nha-khoa-implant",
    "keywordsMain": "báo giá thiết kế website implant",
    "h1": "Báo Giá Thiết Kế Website Implant 2026",
    "angle": "báo giá minh bạch — website nha khoa implant trồng răng",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-nha-khoa-nieng-rang",
    "keywordsMain": "báo giá thiết kế website niềng răng",
    "h1": "Báo Giá Thiết Kế Website Niềng răng 2026",
    "angle": "báo giá minh bạch — website nha khoa chỉnh nha Invisalign",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-nha-khoa-rang-su",
    "keywordsMain": "báo giá thiết kế website răng sứ",
    "h1": "Báo Giá Thiết Kế Website Răng sứ 2026",
    "angle": "báo giá minh bạch — website nha khoa thẩm mỹ răng sứ",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-nha-khoa-tre-em",
    "keywordsMain": "báo giá thiết kế website trẻ em",
    "h1": "Báo Giá Thiết Kế Website Trẻ em 2026",
    "angle": "báo giá minh bạch — website nha khoa trẻ em thân thiện",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-nha-khoa-tay-trang",
    "keywordsMain": "báo giá thiết kế website tẩy trắng răng",
    "h1": "Báo Giá Thiết Kế Website Tẩy trắng răng 2026",
    "angle": "báo giá minh bạch — website nha khoa tẩy trắng",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-xay-dung-nha-thau",
    "keywordsMain": "báo giá thiết kế website nhà thầu",
    "h1": "Báo Giá Thiết Kế Website Nhà thầu 2026",
    "angle": "báo giá minh bạch — website nhà thầu hồ sơ năng lực",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-xay-dung-kien-truc",
    "keywordsMain": "báo giá thiết kế website kiến trúc",
    "h1": "Báo Giá Thiết Kế Website Kiến trúc 2026",
    "angle": "báo giá minh bạch — website công ty kiến trúc portfolio",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-xay-dung-noi-that",
    "keywordsMain": "báo giá thiết kế website nội thất",
    "h1": "Báo Giá Thiết Kế Website Nội thất 2026",
    "angle": "báo giá minh bạch — website thiết kế nội thất showroom",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-xay-dung-dan-dung",
    "keywordsMain": "báo giá thiết kế website xây dựng dân dụng",
    "h1": "Báo Giá Thiết Kế Website Xây dựng dân dụng 2026",
    "angle": "báo giá minh bạch — website xây dựng nhà ở dân dụng",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-xay-dung-cong-nghiep",
    "keywordsMain": "báo giá thiết kế website xây dựng công nghiệp",
    "h1": "Báo Giá Thiết Kế Website Xây dựng công nghiệp 2026",
    "angle": "báo giá minh bạch — website nhà thầu công nghiệp",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-tham-my-phau-thuat",
    "keywordsMain": "báo giá thiết kế website phẫu thuật thẩm mỹ",
    "h1": "Báo Giá Thiết Kế Website Phẫu thuật thẩm mỹ 2026",
    "angle": "báo giá minh bạch — website thẩm mỹ phẫu thuật",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-tham-my-tiem-filler",
    "keywordsMain": "báo giá thiết kế website tiêm filler botox",
    "h1": "Báo Giá Thiết Kế Website Tiêm filler botox 2026",
    "angle": "báo giá minh bạch — website thẩm mỹ tiêm filler",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-tham-my-nang-nguc",
    "keywordsMain": "báo giá thiết kế website nâng ngực",
    "h1": "Báo Giá Thiết Kế Website Nâng ngực 2026",
    "angle": "báo giá minh bạch — website thẩm mỹ nâng ngực",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-tham-my-cat-mi",
    "keywordsMain": "báo giá thiết kế website cắt mí",
    "h1": "Báo Giá Thiết Kế Website Cắt mí 2026",
    "angle": "báo giá minh bạch — website thẩm mỹ cắt mí",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-tham-my-tri-mun",
    "keywordsMain": "báo giá thiết kế website thẩm mỹ trị mụn",
    "h1": "Báo Giá Thiết Kế Website Thẩm mỹ trị mụn 2026",
    "angle": "báo giá minh bạch — website thẩm mỹ trị mụn laser",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-spa-massage",
    "keywordsMain": "báo giá thiết kế website massage body",
    "h1": "Báo Giá Thiết Kế Website Massage body 2026",
    "angle": "báo giá minh bạch — website spa massage thư giãn",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-spa-tri-lieu",
    "keywordsMain": "báo giá thiết kế website trị liệu da",
    "h1": "Báo Giá Thiết Kế Website Trị liệu da 2026",
    "angle": "báo giá minh bạch — website spa facial trị liệu",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-spa-goi-combo",
    "keywordsMain": "báo giá thiết kế website combo spa",
    "h1": "Báo Giá Thiết Kế Website Combo spa 2026",
    "angle": "báo giá minh bạch — website spa bán combo dịch vụ",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-spa-luxury",
    "keywordsMain": "báo giá thiết kế website spa luxury",
    "h1": "Báo Giá Thiết Kế Website Spa luxury 2026",
    "angle": "báo giá minh bạch — website spa cao cấp 5 sao",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-spa-nam",
    "keywordsMain": "báo giá thiết kế website spa nam",
    "h1": "Báo Giá Thiết Kế Website Spa nam 2026",
    "angle": "báo giá minh bạch — website spa chăm sóc nam giới",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-phong-kham-da-khoa",
    "keywordsMain": "báo giá thiết kế website đa khoa",
    "h1": "Báo Giá Thiết Kế Website Đa khoa 2026",
    "angle": "báo giá minh bạch — website phòng khám đa khoa",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-phong-kham-nhi",
    "keywordsMain": "báo giá thiết kế website nhi khoa",
    "h1": "Báo Giá Thiết Kế Website Nhi khoa 2026",
    "angle": "báo giá minh bạch — website phòng khám nhi đặt lịch",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-phong-kham-san",
    "keywordsMain": "báo giá thiết kế website sản phụ khoa",
    "h1": "Báo Giá Thiết Kế Website Sản phụ khoa 2026",
    "angle": "báo giá minh bạch — website phòng khám sản",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-phong-kham-tai-mui-hong",
    "keywordsMain": "báo giá thiết kế website tai mũi họng",
    "h1": "Báo Giá Thiết Kế Website Tai mũi họng 2026",
    "angle": "báo giá minh bạch — website phòng khám TMH",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-phong-kham-noi-soi",
    "keywordsMain": "báo giá thiết kế website nội soi",
    "h1": "Báo Giá Thiết Kế Website Nội soi 2026",
    "angle": "báo giá minh bạch — website phòng khám nội soi",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-my-pham-skincare",
    "keywordsMain": "báo giá thiết kế website skincare",
    "h1": "Báo Giá Thiết Kế Website Skincare 2026",
    "angle": "báo giá minh bạch — website shop skincare Hàn Quốc",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-my-pham-organic",
    "keywordsMain": "báo giá thiết kế website mỹ phẩm organic",
    "h1": "Báo Giá Thiết Kế Website Mỹ phẩm organic 2026",
    "angle": "báo giá minh bạch — website mỹ phẩm thiên nhiên",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-my-pham-da-mun",
    "keywordsMain": "báo giá thiết kế website shop mỹ phẩm trị mụn",
    "h1": "Báo Giá Thiết Kế Website Shop mỹ phẩm trị mụn 2026",
    "angle": "báo giá minh bạch — website mỹ phẩm trị mụn skincare",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-my-pham-cao-cap",
    "keywordsMain": "báo giá thiết kế website mỹ phẩm cao cấp",
    "h1": "Báo Giá Thiết Kế Website Mỹ phẩm cao cấp 2026",
    "angle": "báo giá minh bạch — website mỹ phẩm luxury",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-my-pham-ban-le-si",
    "keywordsMain": "báo giá thiết kế website bán lẻ sỉ",
    "h1": "Báo Giá Thiết Kế Website Bán lẻ sỉ 2026",
    "angle": "báo giá minh bạch — website mỹ phẩm bán sỉ",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-pccc-chua-chay",
    "keywordsMain": "báo giá thiết kế website chữa cháy",
    "h1": "Báo Giá Thiết Kế Website Chữa cháy 2026",
    "angle": "báo giá minh bạch — website công ty PCCC chữa cháy",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-pccc-bao-chay",
    "keywordsMain": "báo giá thiết kế website báo cháy",
    "h1": "Báo Giá Thiết Kế Website Báo cháy 2026",
    "angle": "báo giá minh bạch — website thiết bị báo cháy",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-pccc-thiet-bi",
    "keywordsMain": "báo giá thiết kế website thiết bị PCCC",
    "h1": "Báo Giá Thiết Kế Website Thiết bị PCCC 2026",
    "angle": "báo giá minh bạch — website catalog thiết bị PCCC",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-pccc-tu-van",
    "keywordsMain": "báo giá thiết kế website tư vấn PCCC",
    "h1": "Báo Giá Thiết Kế Website Tư vấn PCCC 2026",
    "angle": "báo giá minh bạch — website tư vấn thiết kế PCCC",
    "niche": "strategy"
  },
  {
    "slug": "bao-gia-thiet-ke-website-pccc-bao-tri",
    "keywordsMain": "báo giá thiết kế website bảo trì PCCC",
    "h1": "Báo Giá Thiết Kế Website Bảo trì PCCC 2026",
    "angle": "báo giá minh bạch — website bảo trì hệ thống PCCC",
    "niche": "strategy"
  }
];

/** F — 25 pain vertical */
const F_PAIN = [
  {
    "slug": "website-nha-khoa-khong-co-khach",
    "keywordsMain": "website nha khoa không có khách",
    "h1": "Website Nha Khoa Không Có Khách — Nguyên Nhân",
    "angle": "chẩn đoán website nha khoa không lead",
    "niche": "strategy"
  },
  {
    "slug": "maps-nha-khoa-khong-hien-thi",
    "keywordsMain": "google maps nha khoa không hiển thị",
    "h1": "Google Maps Nha Khoa Không Hiển Thị — Cách Sửa",
    "angle": "xử lý Maps nha khoa mất vị trí",
    "niche": "strategy"
  },
  {
    "slug": "ads-nha-khoa-ton-tien",
    "keywordsMain": "ads nha khoa tốn tiền",
    "h1": "Ads Nha Khoa Tốn Tiền Không Ra Bệnh Nhân",
    "angle": "audit ads nha khoa CPA cao",
    "niche": "strategy"
  },
  {
    "slug": "website-xay-dung-khong-co-lead",
    "keywordsMain": "website xây dựng không có lead",
    "h1": "Website Xây Dựng Không Có Lead — Khắc Phục",
    "angle": "website nhà thầu không thu form báo giá",
    "niche": "strategy"
  },
  {
    "slug": "maps-nha-thau-khong-len",
    "keywordsMain": "google maps nhà thầu không lên",
    "h1": "Maps Nhà Thầu Không Lên Top — Checklist",
    "angle": "SEO Maps ngành xây dựng",
    "niche": "strategy"
  },
  {
    "slug": "fanpage-xay-dung-khong-inbox",
    "keywordsMain": "fanpage xây dựng không inbox",
    "h1": "Fanpage Xây Dựng Không Inbox — Cách Sửa",
    "angle": "tăng inbox fanpage nhà thầu",
    "niche": "strategy"
  },
  {
    "slug": "website-tham-my-khong-dat-lich",
    "keywordsMain": "website thẩm mỹ không đặt lịch",
    "h1": "Website Thẩm Mỹ Không Đặt Lịch — UX Fix",
    "angle": "tối ưu booking thẩm mỹ",
    "niche": "strategy"
  },
  {
    "slug": "ads-tham-my-bi-tu-choi",
    "keywordsMain": "ads thẩm mỹ bị từ chối",
    "h1": "Ads Thẩm Mỹ Bị Từ Chối — Policy Meta",
    "angle": "xử lý policy ads thẩm mỹ",
    "niche": "strategy"
  },
  {
    "slug": "maps-spa-khong-co-review",
    "keywordsMain": "google maps spa không có review",
    "h1": "Maps Spa Không Có Review — Tăng Uy Tín",
    "angle": "chiến lược review spa Maps",
    "niche": "strategy"
  },
  {
    "slug": "website-spa-cham",
    "keywordsMain": "website spa chậm",
    "h1": "Website Spa Chậm — Mất Khách Mobile",
    "angle": "tốc độ website spa Core Web Vitals",
    "niche": "strategy"
  },
  {
    "slug": "phong-kham-khong-len-google",
    "keywordsMain": "phòng khám không lên google",
    "h1": "Phòng Khám Không Lên Google — SEO Local",
    "angle": "đưa phòng khám lên top Google",
    "niche": "strategy"
  },
  {
    "slug": "website-phong-kham-khong-dat-lich",
    "keywordsMain": "website phòng khám không đặt lịch",
    "h1": "Website Phòng Khám Không Đặt Lịch",
    "angle": "form đặt lịch phòng khám UX",
    "niche": "strategy"
  },
  {
    "slug": "my-pham-khong-ban-online",
    "keywordsMain": "mỹ phẩm không bán online",
    "h1": "Shop Mỹ Phẩm Không Bán Online — Funnel",
    "angle": "website mỹ phẩm conversion thấp",
    "niche": "strategy"
  },
  {
    "slug": "ads-my-pham-ao",
    "keywordsMain": "ads mỹ phẩm traffic ảo",
    "h1": "Ads Mỹ Phẩm Traffic Ảo — Lọc Audience",
    "angle": "lọc traffic ảo ads skincare",
    "niche": "strategy"
  },
  {
    "slug": "pccc-khong-co-khach-b2b",
    "keywordsMain": "công ty PCCC không có khách B2B",
    "h1": "Công Ty PCCC Không Có Khách B2B",
    "angle": "website PCCC thu lead nhà máy",
    "niche": "strategy"
  },
  {
    "slug": "maps-pccc-khong-duyet",
    "keywordsMain": "google maps PCCC không duyệt",
    "h1": "Maps PCCC Không Duyệt — Xác Minh GBP",
    "angle": "xác minh Google Business PCCC",
    "niche": "strategy"
  },
  {
    "slug": "website-pccc-khong-co-catalog",
    "keywordsMain": "website PCCC không có catalog",
    "h1": "Website PCCC Thiếu Catalog — B2B Fix",
    "angle": "catalog thiết bị PCCC online",
    "niche": "strategy"
  },
  {
    "slug": "seo-nganh-y-te-canibal",
    "keywordsMain": "seo ngành y tế cannibalization",
    "h1": "SEO Ngành Y Tế Cannibalization — Gộp Bài",
    "angle": "tránh cạnh tranh từ khóa nội bộ y tế",
    "niche": "strategy"
  },
  {
    "slug": "proof-case-study-thieu",
    "keywordsMain": "case study thiếu số liệu",
    "h1": "Case Study Thiếu Số Liệu — Proof Block",
    "angle": "bổ sung proof GSC cho blog ngành",
    "niche": "strategy"
  },
  {
    "slug": "landing-page-khong-proof",
    "keywordsMain": "landing page không proof",
    "h1": "Landing Page Không Proof — Giảm Trust",
    "angle": "thêm social proof landing dịch vụ",
    "niche": "strategy"
  },
  {
    "slug": "maps-bi-hack",
    "keywordsMain": "google maps bị hack",
    "h1": "Google Maps Bị Hack — Khôi Phục GBP",
    "angle": "khôi phục tài khoản Maps bị chiếm",
    "niche": "strategy"
  },
  {
    "slug": "website-khong-schema-y-te",
    "keywordsMain": "website không schema y tế",
    "h1": "Website Không Schema Y Tế — Medical SEO",
    "angle": "schema MedicalBusiness phòng khám",
    "niche": "strategy"
  },
  {
    "slug": "fanpage-spa-reach-thap",
    "keywordsMain": "fanpage spa reach thấp",
    "h1": "Fanpage Spa Reach Thấp — Organic + Ads",
    "angle": "tăng reach fanpage spa",
    "niche": "strategy"
  },
  {
    "slug": "zalo-khong-follow-up-lead",
    "keywordsMain": "zalo không follow up lead",
    "h1": "Zalo Không Follow Up Lead — CRM",
    "angle": "quy trình chăm sóc lead Zalo spa",
    "niche": "strategy"
  },
  {
    "slug": "blog-nganh-thin-content",
    "keywordsMain": "blog ngành thin content",
    "h1": "Blog Ngành Thin Content — Vertical Proof",
    "angle": "nâng độ sâu content silo ngành",
    "niche": "strategy"
  }
];

/** G — 27 compare vertical */
const G_COMPARE = [
  {
    "slug": "website-hay-fanpage-nha-khoa",
    "keywordsMain": "website hay fanpage nha khoa",
    "h1": "Website Hay Fanpage Cho Nha Khoa?",
    "angle": "so sánh kênh thu bệnh nhân nha khoa",
    "niche": "strategy"
  },
  {
    "slug": "seo-hay-ads-nha-khoa",
    "keywordsMain": "seo hay ads nha khoa",
    "h1": "SEO Hay Ads Cho Nha Khoa Trước?",
    "angle": "ưu tiên SEO vs Facebook Ads nha khoa",
    "niche": "strategy"
  },
  {
    "slug": "wordpress-hay-custom-nha-khoa",
    "keywordsMain": "wordpress hay custom website nha khoa",
    "h1": "WordPress Hay Custom Web Nha Khoa?",
    "angle": "chọn nền tảng web nha khoa",
    "niche": "strategy"
  },
  {
    "slug": "maps-hay-website-nha-khoa",
    "keywordsMain": "google maps hay website nha khoa",
    "h1": "Maps Hay Website Cho Nha Khoa?",
    "angle": "Local Pack vs website nha khoa",
    "niche": "strategy"
  },
  {
    "slug": "website-hay-ho-so-pdf-xay-dung",
    "keywordsMain": "website hay hồ sơ PDF xây dựng",
    "h1": "Website Hay Hồ Sơ PDF Nhà Thầu?",
    "angle": "digital vs PDF xây dựng",
    "niche": "strategy"
  },
  {
    "slug": "seo-hay-ads-xay-dung",
    "keywordsMain": "seo hay ads xây dựng",
    "h1": "SEO Hay Ads Cho Nhà Thầu?",
    "angle": "organic vs paid xây dựng",
    "niche": "strategy"
  },
  {
    "slug": "fanpage-hay-website-tham-my",
    "keywordsMain": "fanpage hay website thẩm mỹ",
    "h1": "Fanpage Hay Website Thẩm Mỹ?",
    "angle": "kênh chuyển đổi thẩm mỹ",
    "niche": "strategy"
  },
  {
    "slug": "tiktok-hay-facebook-spa",
    "keywordsMain": "tiktok hay facebook spa",
    "h1": "TikTok Hay Facebook Cho Spa?",
    "angle": "so sánh ads spa Gen Z",
    "niche": "strategy"
  },
  {
    "slug": "booking-app-hay-website-spa",
    "keywordsMain": "booking app hay website spa",
    "h1": "Booking App Hay Website Spa?",
    "angle": "đặt lịch spa online",
    "niche": "strategy"
  },
  {
    "slug": "website-hay-shopee-my-pham",
    "keywordsMain": "website hay shopee mỹ phẩm",
    "h1": "Website Hay Shopee Cho Mỹ Phẩm?",
    "angle": "sở hữu data vs sàn",
    "niche": "strategy"
  },
  {
    "slug": "seo-hay-influencer-my-pham",
    "keywordsMain": "seo hay influencer mỹ phẩm",
    "h1": "SEO Hay Influencer Mỹ Phẩm?",
    "angle": "organic vs KOL skincare",
    "niche": "strategy"
  },
  {
    "slug": "zalo-hay-facebook-my-pham",
    "keywordsMain": "zalo hay facebook mỹ phẩm",
    "h1": "Zalo Hay Facebook Bán Mỹ Phẩm?",
    "angle": "chốt đơn mỹ phẩm social",
    "niche": "strategy"
  },
  {
    "slug": "website-hay-catalog-pdf-pccc",
    "keywordsMain": "website hay catalog PDF PCCC",
    "h1": "Website Hay Catalog PDF PCCC?",
    "angle": "B2B PCCC digital catalog",
    "niche": "strategy"
  },
  {
    "slug": "seo-hay-trade-show-pccc",
    "keywordsMain": "seo hay hội chợ PCCC",
    "h1": "SEO Hay Hội Chợ Cho PCCC?",
    "angle": "lead gen PCCC dài hạn",
    "niche": "strategy"
  },
  {
    "slug": "maps-hay-website-phong-kham",
    "keywordsMain": "maps hay website phòng khám",
    "h1": "Maps Hay Website Phòng Khám?",
    "angle": "local vs owned media y tế",
    "niche": "strategy"
  },
  {
    "slug": "seo-hay-ads-phong-kham",
    "keywordsMain": "seo hay ads phòng khám",
    "h1": "SEO Hay Ads Phòng Khám?",
    "angle": "chiến lược thu bệnh nhân",
    "niche": "strategy"
  },
  {
    "slug": "in-house-hay-agency-marketing-y-te",
    "keywordsMain": "in-house hay agency marketing y tế",
    "h1": "In-House Hay Agency Marketing Y Tế?",
    "angle": "mô hình team marketing y tế",
    "niche": "strategy"
  },
  {
    "slug": "blog-hay-video-nganh-spa",
    "keywordsMain": "blog hay video ngành spa",
    "h1": "Blog Hay Video Cho Spa?",
    "angle": "content format spa",
    "niche": "strategy"
  },
  {
    "slug": "landing-page-hay-website-tong-spa",
    "keywordsMain": "landing page hay website tổng spa",
    "h1": "Landing Hay Website Tổng Spa?",
    "angle": "ads landing vs web spa",
    "niche": "strategy"
  },
  {
    "slug": "proof-gsc-hay-fanpage-proof",
    "keywordsMain": "proof GSC hay fanpage proof",
    "h1": "Proof GSC Hay Fanpage Proof?",
    "angle": "chọn minh chứng case study",
    "niche": "strategy"
  },
  {
    "slug": "pillar-hay-blog-leaf-seo",
    "keywordsMain": "pillar hay blog leaf SEO",
    "h1": "Pillar Hay Blog Leaf SEO?",
    "angle": "cấu trúc silo vertical",
    "niche": "strategy"
  },
  {
    "slug": "checklist-hay-template-website",
    "keywordsMain": "checklist hay template website",
    "h1": "Checklist Hay Template Website?",
    "angle": "intent content ngành",
    "niche": "strategy"
  },
  {
    "slug": "case-study-hay-blog-huong-dan",
    "keywordsMain": "case study hay blog hướng dẫn",
    "h1": "Case Study Hay Blog Hướng Dẫn?",
    "angle": "proof vs educational content",
    "niche": "strategy"
  },
  {
    "slug": "agency-hay-freelancer-nganh-y-te",
    "keywordsMain": "agency hay freelancer ngành y tế",
    "h1": "Agency Hay Freelancer Marketing Y Tế?",
    "angle": "chọn đối tác triển khai vertical",
    "niche": "strategy"
  },
  {
    "slug": "website-hay-landing-ads-nganh",
    "keywordsMain": "website hay landing ads ngành",
    "h1": "Website Hay Landing Ads Theo Ngành?",
    "angle": "owned media vs landing campaign",
    "niche": "strategy"
  },
  {
    "slug": "seo-local-hay-quang-cao-maps",
    "keywordsMain": "seo local hay quảng cáo maps",
    "h1": "SEO Local Hay Quảng Cáo Maps?",
    "angle": "organic Maps vs paid local",
    "niche": "strategy"
  },
  {
    "slug": "blog-nganh-hay-video-youtube",
    "keywordsMain": "blog ngành hay video youtube",
    "h1": "Blog Ngành Hay Video YouTube?",
    "angle": "format content vertical proof",
    "niche": "strategy"
  }
];

export const KEYWORDS_500_BATCH11 = [
  ...A_WEB_CITY,
  ...B_MAPS_CITY,
  ...C_MKT_CITY,
  ...D_SUB_WEB,
  ...E_SUB_PRICE,
  ...F_PAIN,
  ...G_COMPARE,
];

export const KEYWORDS_500_BATCH11_MARKETING_ONLY = new Set([
  ...F_PAIN.map((e) => e.slug),
  ...G_COMPARE.map((e) => e.slug),
]);

const EXPECTED = 500;
if (KEYWORDS_500_BATCH11.length !== EXPECTED) {
  throw new Error(`KEYWORDS_500_BATCH11 expected ${EXPECTED} entries, got ${KEYWORDS_500_BATCH11.length}`);
}

const slugSet = new Set(KEYWORDS_500_BATCH11.map((e) => e.slug));
if (slugSet.size !== KEYWORDS_500_BATCH11.length) {
  const dupes = KEYWORDS_500_BATCH11.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH11 duplicate slugs: ${[...new Set(dupes)].join(", ")}`);
}

const kwSet = new Set(KEYWORDS_500_BATCH11.map((e) => e.keywordsMain.toLowerCase()));
if (kwSet.size !== KEYWORDS_500_BATCH11.length) {
  const dupes = KEYWORDS_500_BATCH11
    .map((e) => e.keywordsMain.toLowerCase())
    .filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH11 duplicate keywords: ${[...new Set(dupes)].join(", ")}`);
}

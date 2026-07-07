/** Blog slug → case study slug (proof layer cho silo ngành). */
export const BLOG_SLUG_TO_CASE_STUDY: Record<string, string> = {
  "thiet-ke-website-xay-dung-nha-thau": "kien-truc-sao-khue",
  "thiet-ke-website-cong-ty-xay-dung": "kien-truc-sao-khue",
  "thiet-ke-website-kien-truc-noi-that": "kien-truc-sao-khue",
  "thiet-ke-website-xay-dung": "kien-truc-sao-khue",
  "case-study-thiet-ke-website-xay-dung-sao-khue": "kien-truc-sao-khue",
  "thiet-ke-website-tham-my-vien": "tham-my-thien-hoang-kim",
  "case-study-thiet-ke-website-tham-my-thien-hoang-kim": "tham-my-thien-hoang-kim",
  "thiet-ke-website-my-pham-lam-dep": "halee-tram",
  "case-study-thiet-ke-website-halee-tram": "halee-tram",
  "thiet-ke-website-spa": "phuoc-lai-luxury",
  "case-study-thiet-ke-website-spa-phuoc-lai-luxury": "phuoc-lai-luxury",
  "thiet-ke-website-nha-khoa": "nha-khoa-dang-khoa",
  "thiet-ke-website-nha-khoa-nieng-rang": "nha-khoa-dang-khoa",
  "thiet-ke-website-phong-kham-da-khoa": "nha-khoa-dang-khoa",
  "case-study-thiet-ke-website-nha-khoa-dang-khoa": "nha-khoa-dang-khoa",
  "checklist-website-nha-khoa-2026": "nha-khoa-dang-khoa",
  "template-website-nha-khoa-2026": "nha-khoa-dang-khoa",
  "checklist-website-xay-dung-2026": "kien-truc-sao-khue",
  "template-website-xay-dung-2026": "kien-truc-sao-khue",
  "checklist-website-tham-my-vien-2026": "tham-my-thien-hoang-kim",
  "template-website-tham-my-vien-2026": "tham-my-thien-hoang-kim",
  "checklist-website-spa-2026": "phuoc-lai-luxury",
  "template-website-spa-2026": "phuoc-lai-luxury",
  "checklist-website-my-pham-2026": "halee-tram",
  "template-website-my-pham-2026": "halee-tram",
  "checklist-website-phong-kham-2026": "nha-khoa-dang-khoa",
  "template-website-phong-kham-2026": "nha-khoa-dang-khoa",
};

/** Case study → blog cluster (internal link hub). */
export const CASE_STUDY_RELATED_BLOGS: Record<string, { slug: string; label: string; keyword: string }[]> = {
  "kien-truc-sao-khue": [
    {
      slug: "thiet-ke-website-xay-dung-nha-thau",
      label: "Thiết kế website xây dựng nhà thầu",
      keyword: "thiết kế website xây dựng",
    },
    {
      slug: "checklist-website-xay-dung-2026",
      label: "Checklist website xây dựng 2026",
      keyword: "checklist website xây dựng",
    },
    {
      slug: "template-website-xay-dung-2026",
      label: "Template website xây dựng 2026",
      keyword: "template website xây dựng",
    },
    {
      slug: "thiet-ke-website-cong-ty-xay-dung",
      label: "Thiết kế website công ty xây dựng",
      keyword: "thiết kế website công ty xây dựng",
    },
    {
      slug: "thiet-ke-website-kien-truc-noi-that",
      label: "Thiết kế website kiến trúc nội thất",
      keyword: "thiết kế website kiến trúc",
    },
    {
      slug: "thiet-ke-website-ho-so-nang-luc",
      label: "Website hồ sơ năng lực",
      keyword: "thiết kế website hồ sơ năng lực",
    },
    {
      slug: "thiet-ke-website",
      label: "Thiết kế website — pillar",
      keyword: "thiết kế website",
    },
  ],
  "tham-my-thien-hoang-kim": [
    {
      slug: "thiet-ke-website-tham-my-vien",
      label: "Thiết kế website thẩm mỹ viện",
      keyword: "thiết kế website thẩm mỹ viện",
    },
    {
      slug: "case-study-thiet-ke-website-tham-my-thien-hoang-kim",
      label: "Case study Thiên Hoàng Kim",
      keyword: "case study thiết kế website thẩm mỹ viện",
    },
    {
      slug: "checklist-website-tham-my-vien-2026",
      label: "Checklist thẩm mỹ viện 2026",
      keyword: "checklist website thẩm mỹ viện",
    },
    {
      slug: "template-website-tham-my-vien-2026",
      label: "Template thẩm mỹ viện 2026",
      keyword: "template website thẩm mỹ viện",
    },
    {
      slug: "thiet-ke-website-phong-kham-da-khoa",
      label: "Website phòng khám",
      keyword: "thiết kế website phòng khám",
    },
    {
      slug: "thiet-ke-website-phong-kham-da-khoa",
      label: "Website phòng khám",
      keyword: "thiết kế website phòng khám",
    },
    {
      slug: "thiet-ke-website",
      label: "Thiết kế website — pillar",
      keyword: "thiết kế website",
    },
  ],
  "phuoc-lai-luxury": [
    {
      slug: "thiet-ke-website-spa",
      label: "Thiết kế website spa",
      keyword: "thiết kế website spa",
    },
    {
      slug: "case-study-thiet-ke-website-spa-phuoc-lai-luxury",
      label: "Case study Phước Lai Luxury",
      keyword: "case study thiết kế website spa",
    },
    {
      slug: "checklist-website-spa-2026",
      label: "Checklist website spa 2026",
      keyword: "checklist website spa",
    },
    {
      slug: "template-website-spa-2026",
      label: "Template website spa 2026",
      keyword: "template website spa",
    },
    {
      slug: "thiet-ke-website-tham-my-vien",
      label: "Website thẩm mỹ viện",
      keyword: "thiết kế website thẩm mỹ viện",
    },
    {
      slug: "thiet-ke-website-my-pham-lam-dep",
      label: "Website mỹ phẩm làm đẹp",
      keyword: "thiết kế website mỹ phẩm",
    },
    {
      slug: "thiet-ke-website",
      label: "Thiết kế website — pillar",
      keyword: "thiết kế website",
    },
  ],
  "nha-khoa-dang-khoa": [
    {
      slug: "thiet-ke-website-nha-khoa",
      label: "Thiết kế website nha khoa",
      keyword: "thiết kế website nha khoa",
    },
    {
      slug: "checklist-website-nha-khoa-2026",
      label: "Checklist website nha khoa 2026",
      keyword: "checklist website nha khoa",
    },
    {
      slug: "template-website-nha-khoa-2026",
      label: "Template website nha khoa 2026",
      keyword: "template website nha khoa",
    },
    {
      slug: "thiet-ke-website-nha-khoa-nieng-rang",
      label: "Website niềng răng",
      keyword: "thiết kế website niềng răng",
    },
    {
      slug: "thiet-ke-website-phong-kham-da-khoa",
      label: "Website phòng khám",
      keyword: "thiết kế website phòng khám",
    },
    {
      slug: "checklist-website-phong-kham-2026",
      label: "Checklist website phòng khám 2026",
      keyword: "checklist website phòng khám",
    },
    {
      slug: "template-website-phong-kham-2026",
      label: "Template website phòng khám 2026",
      keyword: "template website phòng khám",
    },
    {
      slug: "case-study-thiet-ke-website-nha-khoa-dang-khoa",
      label: "Case study Nha Khoa Đăng Khoa",
      keyword: "case study thiết kế website nha khoa",
    },
    {
      slug: "thiet-ke-website",
      label: "Thiết kế website — pillar",
      keyword: "thiết kế website",
    },
  ],
  "halee-tram": [
    {
      slug: "thiet-ke-website-my-pham-lam-dep",
      label: "Thiết kế website mỹ phẩm làm đẹp",
      keyword: "thiết kế website mỹ phẩm",
    },
    {
      slug: "thiet-ke-website-spa",
      label: "Thiết kế website spa",
      keyword: "thiết kế website spa",
    },
    {
      slug: "case-study-thiet-ke-website-halee-tram",
      label: "Case study Halee Trâm",
      keyword: "case study thiết kế website nail nối mi",
    },
    {
      slug: "checklist-website-my-pham-2026",
      label: "Checklist website mỹ phẩm 2026",
      keyword: "checklist website mỹ phẩm",
    },
    {
      slug: "template-website-my-pham-2026",
      label: "Template website mỹ phẩm 2026",
      keyword: "template website mỹ phẩm",
    },
    {
      slug: "thiet-ke-website-tham-my-vien",
      label: "Website thẩm mỹ viện",
      keyword: "thiết kế website thẩm mỹ viện",
    },
    {
      slug: "thiet-ke-website",
      label: "Thiết kế website — pillar",
      keyword: "thiết kế website",
    },
  ],
};

export function getCaseStudySlugForBlog(blogSlug: string): string | undefined {
  return BLOG_SLUG_TO_CASE_STUDY[blogSlug];
}

export function getRelatedBlogsForCaseStudy(caseStudySlug: string) {
  return CASE_STUDY_RELATED_BLOGS[caseStudySlug] ?? [];
}

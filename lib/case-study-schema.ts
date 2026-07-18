import type { CaseStudyItem } from "@/lib/case-studies";

type BuildCaseStudyJsonLdInput = {
  study: CaseStudyItem;
  canonical: string;
  baseUrl: string;
};

export function buildCaseStudyJsonLd({ study, canonical, baseUrl }: BuildCaseStudyJsonLdInput) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: study.metaTitle || study.headline,
      name: study.metaTitle || study.headline,
      description: study.metaDescription || study.summary,
      datePublished: study.publishedAt,
      dateModified: study.updatedAt || study.publishedAt,
      inLanguage: "vi-VN",
      url: canonical,
      image: [`${baseUrl}${study.thumbnail}`],
      keywords: [study.keywordsMain, ...(study.keywordsSecondary || [])].filter(Boolean).join(", "),
      author: { "@type": "Organization", name: "Bứt Phá Marketing", url: baseUrl },
      publisher: {
        "@type": "Organization",
        name: "Bứt Phá Marketing",
        url: baseUrl,
        logo: { "@type": "ImageObject", url: `${baseUrl}/logo.jpg` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      about: {
        "@type": "Organization",
        name: study.clientName,
        ...(study.websiteUrl || study.fanpageUrl
          ? { url: study.websiteUrl || study.fanpageUrl }
          : {}),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang chủ", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Dự án", item: `${baseUrl}/du-an` },
        { "@type": "ListItem", position: 3, name: study.clientName, item: canonical },
      ],
    },
  ];

  if (study.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: study.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

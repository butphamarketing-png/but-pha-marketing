import ContactPageClient from "./ContactPageClient";
import { getDynamicMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return getDynamicMetadata("/lien-he", {
    title: "Liên hệ | Bứt Phá Marketing",
    description:
      "Liên hệ Bứt Phá Marketing để được tư vấn giải pháp Facebook, Website, Google Maps và chiến lược marketing tăng trưởng doanh thu.",
    keywords: [
      "liên hệ bứt phá marketing",
      "tư vấn marketing",
      "agency marketing việt nam",
      "báo giá dịch vụ marketing",
    ],
  });
}

export default function ContactPage() {
  return <ContactPageClient />;
}

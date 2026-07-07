import { createServiceLandingPage, generateLandingMetadata } from "@/lib/service-landing-page";

const PATH = "website/thietkewebsite";

export async function generateMetadata() {
  return generateLandingMetadata(PATH, { canonicalPath: "/website" });
}

export default function Page() {
  return createServiceLandingPage(PATH);
}

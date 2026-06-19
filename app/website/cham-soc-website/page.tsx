import { createServiceLandingPage, generateLandingMetadata } from "@/lib/service-landing-page";

const PATH = "website/cham-soc-website";

export async function generateMetadata() {
  return generateLandingMetadata(PATH);
}

export default function Page() {
  return createServiceLandingPage(PATH);
}

import { createServiceLandingPage, generateLandingMetadata } from "@/lib/service-landing-page";

const PATH = "website/ten-mien-website";

export async function generateMetadata() {
  return generateLandingMetadata(PATH);
}

export default function Page() {
  return createServiceLandingPage(PATH);
}

import { createServiceLandingPage, generateLandingMetadata } from "@/lib/service-landing-page";

const PATH = "facebook/cham-soc-fanpage";

export async function generateMetadata() {
  return generateLandingMetadata(PATH);
}

export default function Page() {
  return createServiceLandingPage(PATH);
}

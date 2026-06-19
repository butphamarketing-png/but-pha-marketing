import { createServiceLandingPage, generateLandingMetadata } from "@/lib/service-landing-page";

const PATH = "facebook/thiet-ke-fanpage";

export async function generateMetadata() {
  return generateLandingMetadata(PATH);
}

export default function Page() {
  return createServiceLandingPage(PATH);
}

import { createServiceLandingPage, generateLandingMetadata } from "@/lib/service-landing-page";

const PATH = "google-maps/thiet-ke-google-maps";

export async function generateMetadata() {
  return generateLandingMetadata(PATH);
}

export default function Page() {
  return createServiceLandingPage(PATH);
}

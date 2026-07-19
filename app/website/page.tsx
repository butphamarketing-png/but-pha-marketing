import { WebsiteSchema } from "./WebsiteSchema";
import WebsitePageClient from "./WebsitePageClient";

/** Hub /website — schema chỉ mount ở đây, không leak sang /website/* */
export default function WebsitePage() {
  return (
    <>
      <WebsiteSchema />
      <WebsitePageClient />
    </>
  );
}

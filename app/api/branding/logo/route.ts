export const dynamic = "force-dynamic";

import { createServerClient } from "@/lib/supabase";

const DEFAULT_LOGO_PATH = "/logo.jpg";

function guessContentTypeFromDataUrl(value: string): string {
  const match = value.match(/^data:([^;]+);base64,/i);
  return match?.[1] || "image/png";
}

function guessContentTypeFromUrl(url: string): string {
  const normalized = url.toLowerCase();
  if (normalized.endsWith(".svg")) return "image/svg+xml";
  if (normalized.endsWith(".ico")) return "image/x-icon";
  if (normalized.endsWith(".jpg") || normalized.endsWith(".jpeg")) return "image/jpeg";
  if (normalized.endsWith(".webp")) return "image/webp";
  if (normalized.endsWith(".gif")) return "image/gif";
  return "image/png";
}

async function loadBranding() {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "admin_settings")
      .maybeSingle();

    const logo = typeof data?.value?.logo === "string" ? data.value.logo.trim() : "";
    const favicon = typeof data?.value?.favicon === "string" ? data.value.favicon.trim() : "";
    return logo || favicon || DEFAULT_LOGO_PATH;
  } catch (error) {
    console.error("[branding/logo] Failed to load branding", error);
    return DEFAULT_LOGO_PATH;
  }
}

export async function GET(request: Request) {
  const source = await loadBranding();
  const url = new URL(request.url);
  const version = url.searchParams.get("v") || "0";

  if (source.startsWith("data:")) {
    const base64 = source.split(",")[1] || "";
    const buffer = Buffer.from(base64, "base64");

    return new Response(buffer, {
      headers: {
        "Content-Type": guessContentTypeFromDataUrl(source),
        "Cache-Control": "public, max-age=0, must-revalidate",
        ETag: `"logo-${version}"`,
      },
    });
  }

  if (source.startsWith("http://") || source.startsWith("https://")) {
    try {
      const upstream = await fetch(source, { cache: "no-store" });
      if (upstream.ok) {
        return new Response(upstream.body, {
          headers: {
            "Content-Type": upstream.headers.get("content-type") || guessContentTypeFromUrl(source),
            "Cache-Control": "public, max-age=0, must-revalidate",
            ETag: `"logo-${version}"`,
          },
        });
      }
    } catch (error) {
      console.error("[branding/logo] Failed to fetch remote logo", error);
    }
  }

  const fallbackUrl = new URL(source, url.origin);
  const fallback = await fetch(fallbackUrl, { cache: "no-store" });

  return new Response(fallback.body, {
    headers: {
      "Content-Type": fallback.headers.get("content-type") || guessContentTypeFromUrl(source),
      "Cache-Control": "public, max-age=0, must-revalidate",
      ETag: `"logo-${version}"`,
    },
  });
}

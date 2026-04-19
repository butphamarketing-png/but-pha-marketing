import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getEnv(name: string): string {
  const value =
    name === "NEXT_PUBLIC_SUPABASE_URL"
      ? NEXT_PUBLIC_SUPABASE_URL
      : name === "NEXT_PUBLIC_SUPABASE_ANON_KEY"
        ? NEXT_PUBLIC_SUPABASE_ANON_KEY
        : name === "SUPABASE_SERVICE_ROLE_KEY"
          ? SUPABASE_SERVICE_ROLE_KEY
          : process.env[name];

  if (!value || !value.trim()) {
    if (name === "SUPABASE_SERVICE_ROLE_KEY") {
      console.warn(`[Supabase] Missing SUPABASE_SERVICE_ROLE_KEY env var. API requests will fail gracefully with JSON error.`);
      return "";
    }
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getSupabaseUrl(): string {
  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  try {
    new URL(url);
    return url;
  } catch {
    throw new Error("Invalid NEXT_PUBLIC_SUPABASE_URL. Expected a valid URL.");
  }
}

function createSupabaseClient(key: string, isBrowser: boolean): SupabaseClient {
  return createClient(getSupabaseUrl(), key, {
    auth: {
      persistSession: isBrowser,
      autoRefreshToken: isBrowser,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
    global: {
      headers: {
        "X-Client-Info": "but-pha-marketing-nextjs",
      },
    },
  });
}

let browserClient: SupabaseClient | undefined;

export function getSupabaseBrowserClient(): SupabaseClient {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseBrowserClient() can only be used in the browser.");
  }
  if (!browserClient) {
    browserClient = createSupabaseClient(getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"), true);
  }
  return browserClient;
}

export function createBrowserClient(): SupabaseClient {
  return getSupabaseBrowserClient();
}

export function createServerClient(): SupabaseClient {
  const key = getEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY required but missing - check Vercel dashboard.");
  }
  return createSupabaseClient(key, false);
}

export const supabase: SupabaseClient | null =
  typeof window !== "undefined" ? getSupabaseBrowserClient() : null;

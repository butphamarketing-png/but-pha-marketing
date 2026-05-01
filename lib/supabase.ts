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
    console.warn(`[Supabase] Environment variable ${name} is missing.`);
    return "";
  }
  return value;
}

function getSupabaseUrl(): string {
  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  if (!url) return "";
  try {
    new URL(url);
    return url;
  } catch {
    console.warn("[Supabase] Invalid NEXT_PUBLIC_SUPABASE_URL.");
    return "";
  }
}

function createSupabaseClient(key: string, isBrowser: boolean): SupabaseClient | null {
  const url = getSupabaseUrl();
  if (!url || !key) return null;
  
  return createClient(url, key, {
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

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (typeof window === "undefined") return null;
  if (!browserClient) {
    browserClient = createSupabaseClient(getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"), true);
  }
  return browserClient;
}

export function createBrowserClient(): SupabaseClient | null {
  return getSupabaseBrowserClient();
}

export function createServerClient(): SupabaseClient | null {
  const key = getEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createSupabaseClient(key, false);
}

export const supabase: SupabaseClient | null =
  typeof window !== "undefined" ? getSupabaseBrowserClient() : null;

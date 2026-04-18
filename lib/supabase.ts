import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value || !value.trim()) {
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
  return createSupabaseClient(getEnv("SUPABASE_SERVICE_ROLE_KEY"), false);
}

export const supabase: SupabaseClient | null =
  typeof window !== "undefined" ? getSupabaseBrowserClient() : null;
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

function createSupabaseClient(key: string, isBrowser: boolean): SupabaseClient {
  const url = getSupabaseUrl();
  if (!url || !key) {
    // Return a proxy that handles common Supabase calls gracefully during build
    // This prevents "supabase.from is not a function" errors
    const mockClient = {
      from: () => ({
        select: () => ({ eq: () => ({ maybeSingle: () => Promise.resolve({ data: null, error: null }), single: () => Promise.resolve({ data: null, error: null }), order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }) }) }),
        upsert: () => Promise.resolve({ error: null }),
        insert: () => Promise.resolve({ error: null }),
        update: () => Promise.resolve({ error: null }),
        delete: () => Promise.resolve({ error: null }),
      }),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    };
    return mockClient as unknown as SupabaseClient;
  }
  
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

let browserClient: SupabaseClient | undefined;

export function getSupabaseBrowserClient(): SupabaseClient {
  if (typeof window === "undefined") {
    return {} as SupabaseClient;
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
  return createSupabaseClient(key, false);
}

export const supabase: SupabaseClient =
  (typeof window !== "undefined" ? getSupabaseBrowserClient() : {}) as SupabaseClient;

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Use the existing PostgreSQL database (Neon) instead of Supabase
// This is a Supabase-compatible client that connects to our existing database
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Since we already have a PostgreSQL database (Neon), we'll use direct API calls
// to that database instead of setting up a separate Supabase instance.
// This keeps things simple and uses the existing infrastructure.

export async function fetchFromDB<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Database error: ${error}`);
  }
  
  return res.json();
}

export async function postToDB<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchFromDB<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function patchToDB<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchFromDB<T>(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteFromDB<T>(endpoint: string): Promise<T> {
  return fetchFromDB<T>(endpoint, {
    method: 'DELETE',
  });
}
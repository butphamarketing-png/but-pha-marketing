import { NextResponse } from "next/server";

export type ApiErrorLike = {
  code?: string;
  message?: string;
  details?: string | null;
  hint?: string | null;
};

export function parseInteger(value: string, field = "id") {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid ${field}`);
  }
  return parsed;
}

export function normalizeNewsPayload(input: Record<string, unknown>) {
  const normalized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input)) {
    if (key === "imageUrl") normalized.image_url = value;
    else if (key === "metaDescription") normalized.meta_description = value;
    else if (key === "keywordsMain") normalized.keywords_main = value;
    else if (key === "keywordsSecondary") normalized.keywords_secondary = value;
    else if (key === "publishedAt") {
      normalized.published_at = value ? new Date(String(value)).toISOString() : null;
    } else if (key === "timestamp") {
      normalized.timestamp = typeof value === "string" ? Number.parseInt(value, 10) : value;
    } else {
      normalized[key] = value;
    }
  }

  normalized.updated_at = new Date().toISOString();
  return normalized;
}

export function handleRouteError(error: unknown, context: string) {
  console.error(`${context} error`, error);

  const apiError = error as ApiErrorLike | undefined;
  if (apiError?.code === "PGRST205") {
    return NextResponse.json(
      {
        error: "Database table is missing in Supabase public schema",
        code: apiError.code,
        details: apiError.message,
      },
      { status: 500 }
    );
  }

  if (apiError?.code === "23505") {
    return NextResponse.json(
      {
        error: "Duplicate record",
        code: apiError.code,
        details: apiError.message,
      },
      { status: 409 }
    );
  }

  if (apiError?.code?.startsWith("22")) {
    return NextResponse.json(
      {
        error: "Invalid data for database operation",
        code: apiError.code,
        details: apiError.message,
      },
      { status: 400 }
    );
  }

  if (error instanceof Error && error.message.startsWith("Invalid ")) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(
    {
      error: "Internal Server Error",
      details: apiError?.message ?? (error instanceof Error ? error.message : undefined),
    },
    { status: 500 }
  );
}
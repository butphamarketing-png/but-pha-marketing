import { createServerClient } from "@/lib/supabase";

const TABLE_NAME = "site_settings";
const SETTINGS_KEY = "studio_settings";

export type StudioSettingsValue = {
  openaiKey?: string;
  serpApiKey?: string;
  defaultLocation?: string;
  aiModel?: string;
};

const SUPPORTED_RESPONSE_MODELS = new Set(["gpt-5.4", "gpt-4o"]);

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function sanitizeStudioSettings(value: unknown): StudioSettingsValue {
  const source = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return {
    openaiKey: normalizeString(source.openaiKey),
    serpApiKey: normalizeString(source.serpApiKey),
    defaultLocation: normalizeString(source.defaultLocation) || "Vietnam",
    aiModel: normalizeString(source.aiModel) || "gpt-4-turbo",
  };
}

function normalizeOpenAiModel(value: string) {
  const model = normalizeString(value);
  if (SUPPORTED_RESPONSE_MODELS.has(model)) {
    return model;
  }
  return "gpt-4o";
}

export async function getStudioSettings(): Promise<StudioSettingsValue> {
  const supabase = createServerClient();
  const { data, error } = await supabase.from(TABLE_NAME).select("value").eq("key", SETTINGS_KEY).maybeSingle();

  if (error) {
    throw new Error(error.message || "Khong the tai cau hinh studio.");
  }

  return sanitizeStudioSettings(data?.value);
}

export async function getOpenAiRuntimeConfig() {
  const settings = await getStudioSettings().catch(() => sanitizeStudioSettings(null));
  const apiKey = settings.openaiKey || (process.env.OPENAI_API_KEY || "").trim();
  const model = normalizeOpenAiModel(settings.aiModel || (process.env.OPENAI_MODEL || "").trim());

  return {
    apiKey,
    model,
    settings,
  };
}

export async function getSerpApiRuntimeConfig() {
  const settings = await getStudioSettings().catch(() => sanitizeStudioSettings(null));
  const apiKey = settings.serpApiKey || (process.env.SERPAPI_KEY || "").trim();
  const location = settings.defaultLocation || "Vietnam";

  return {
    apiKey,
    location,
    settings,
  };
}

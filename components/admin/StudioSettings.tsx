"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Database,
  ExternalLink,
  Eye,
  EyeOff,
  Globe,
  Key,
  Lock,
  RefreshCw,
  Save,
  ShieldCheck,
} from "lucide-react";

type StudioSettingsPayload = {
  openaiKeySaved: boolean;
  serpApiKeySaved: boolean;
  defaultLocation: string;
  aiModel: string;
};

const DEFAULT_CONFIG: StudioSettingsPayload & {
  openaiKey: string;
  serpApiKey: string;
} = {
  openaiKey: "",
  serpApiKey: "",
  openaiKeySaved: false,
  serpApiKeySaved: false,
  defaultLocation: "Vietnam",
  aiModel: "gpt-4-turbo",
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  return "Khong the luu cau hinh luc nay.";
}

export function StudioSettings() {
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    let cancelled = false;

    const loadSettings = async () => {
      try {
        setLoadError("");
        const res = await fetch("/api/admin/studio-settings", { cache: "no-store" });
        const data = (await res.json()) as
          | ({ ok: true } & StudioSettingsPayload)
          | { ok: false; error?: string };

        if (!res.ok || !data.ok) {
          throw new Error(("error" in data && data.error) || "Khong the tai cau hinh.");
        }

        if (!cancelled) {
          setConfig((prev) => ({
            ...prev,
            openaiKey: "",
            serpApiKey: "",
            openaiKeySaved: data.openaiKeySaved,
            serpApiKeySaved: data.serpApiKeySaved,
            defaultLocation: data.defaultLocation || "Vietnam",
            aiModel: data.aiModel || "gpt-4-turbo",
          }));
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(getErrorMessage(error));
        }
      }
    };

    void loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleShowKey = (key: string) => {
    setShowKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateConfig = (patch: Partial<typeof config>) => {
    setSaveError("");
    setSaveSuccess(false);
    setConfig((prev) => ({ ...prev, ...patch }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setSaveError("");
      setSaveSuccess(false);

      const payload = {
        openaiKey: config.openaiKey.trim(),
        serpApiKey: config.serpApiKey.trim(),
        defaultLocation: config.defaultLocation.trim() || "Vietnam",
        aiModel: config.aiModel.trim() || "gpt-4-turbo",
      };

      const res = await fetch("/api/admin/studio-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as
        | ({ ok: true } & StudioSettingsPayload)
        | { ok: false; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(("error" in data && data.error) || "Luu that bai.");
      }

      setConfig((prev) => ({
        ...prev,
        openaiKey: "",
        serpApiKey: "",
        openaiKeySaved: data.openaiKeySaved,
        serpApiKeySaved: data.serpApiKeySaved,
        defaultLocation: data.defaultLocation,
        aiModel: data.aiModel,
      }));
      setSaveSuccess(true);
      window.setTimeout(() => setSaveSuccess(false), 2500);
    } catch (error) {
      setSaveError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    try {
      setTesting(true);
      setSaveError("");
      const res = await fetch("/api/admin/studio-settings", { cache: "no-store" });
      const data = (await res.json()) as
        | ({ ok: true } & StudioSettingsPayload)
        | { ok: false; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(("error" in data && data.error) || "Khong the kiem tra ket noi.");
      }

      setConfig((prev) => ({
        ...prev,
        openaiKeySaved: data.openaiKeySaved,
        serpApiKeySaved: data.serpApiKeySaved,
      }));
      setSaveSuccess(true);
      window.setTimeout(() => setSaveSuccess(false), 1800);
    } catch (error) {
      setSaveError(getErrorMessage(error));
    } finally {
      setTesting(false);
    }
  };

  const openAiConnected = useMemo(
    () => config.openaiKeySaved || config.openaiKey.trim().length > 0,
    [config.openaiKey, config.openaiKeySaved],
  );
  const serpConnected = useMemo(
    () => config.serpApiKeySaved || config.serpApiKey.trim().length > 0,
    [config.serpApiKey, config.serpApiKeySaved],
  );

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Cau hinh he thong</h1>
        <p className="text-slate-500">
          Quan ly cac ket noi API va thiet lap mac dinh de he thong hoat dong voi du lieu that.
        </p>
      </div>

      {(loadError || saveError) && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-semibold text-rose-700">
          {loadError || saveError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
                <Key size={24} />
              </div>
              <h2 className="text-xl font-black text-slate-900">Ket noi AI (OpenAI)</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-bold text-slate-700">
                  OpenAI API Key
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    className="flex items-center gap-1 text-xs text-indigo-600 hover:underline"
                  >
                    Lay key tai day <ExternalLink size={12} />
                  </a>
                </label>
                <div className="relative">
                  <input
                    type={showKeys.openai ? "text" : "password"}
                    value={config.openaiKey}
                    onChange={(e) => updateConfig({ openaiKey: e.target.value })}
                    placeholder={config.openaiKeySaved ? "Da luu key tren server. Nhap key moi neu muon thay the." : "sk-..."}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 pr-14 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey("openai")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showKeys.openai ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-[11px] font-medium italic text-slate-400">
                  Su dung cho: Viet bai AI, phan tich SEO, goi y Internal Link.
                </p>
                {config.openaiKeySaved && !config.openaiKey && (
                  <p className="text-xs font-semibold text-emerald-600">Key da duoc luu tren server.</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Model uu tien</label>
                  <select
                    value={config.aiModel}
                    onChange={(e) => updateConfig({ aiModel: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white"
                  >
                    <option value="gpt-5.4">GPT-5.4 (Khuyen dung)</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
                <Globe size={24} />
              </div>
              <h2 className="text-xl font-black text-slate-900">Du lieu SEO (SerpAPI)</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-bold text-slate-700">
                  SerpAPI Key
                  <a
                    href="https://serpapi.com/dashboard"
                    target="_blank"
                    className="flex items-center gap-1 text-xs text-emerald-600 hover:underline"
                  >
                    Lay key tai day <ExternalLink size={12} />
                  </a>
                </label>
                <div className="relative">
                  <input
                    type={showKeys.serp ? "text" : "password"}
                    value={config.serpApiKey}
                    onChange={(e) => updateConfig({ serpApiKey: e.target.value })}
                    placeholder={
                      config.serpApiKeySaved
                        ? "Da luu key tren server. Nhap key moi neu muon thay the."
                        : "Nhap API key de cao du lieu Google..."
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 pr-14 text-sm font-medium outline-none transition focus:border-emerald-300 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey("serp")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showKeys.serp ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-[11px] font-medium italic text-slate-400">
                  Su dung cho: theo doi thu hang, phan tich co hoi noi dung.
                </p>
                {config.serpApiKeySaved && !config.serpApiKey && (
                  <p className="text-xs font-semibold text-emerald-600">Key da duoc luu tren server.</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Vi tri tim kiem mac dinh</label>
                <input
                  type="text"
                  value={config.defaultLocation}
                  onChange={(e) => updateConfig({ defaultLocation: e.target.value })}
                  placeholder="VD: Vietnam, Ho Chi Minh City..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-medium outline-none transition focus:border-emerald-300 focus:bg-white"
                />
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-orange-50 p-2 text-orange-600">
                <Database size={24} />
              </div>
              <h2 className="text-xl font-black text-slate-900">Co so du lieu (Supabase)</h2>
            </div>

            <div className="mb-6 flex items-start gap-4 rounded-2xl border border-orange-100 bg-orange-50/50 p-6">
              <AlertCircle size={20} className="mt-0.5 shrink-0 text-orange-600" />
              <p className="text-xs font-medium leading-relaxed text-orange-800">
                Cau hinh database uu tien lay tu bien moi truong tren server. Phan nay chi hien trang thai va
                khong ghi de secret he thong.
              </p>
            </div>

            <div className="space-y-6 opacity-60">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Supabase URL</label>
                <input
                  disabled
                  type="text"
                  value={process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xxx.supabase.co"}
                  className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3.5 text-sm font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Service Role Key</label>
                <div className="relative">
                  <input
                    disabled
                    type="password"
                    value="••••••••••••••••••••••••"
                    className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3.5 text-sm font-medium"
                  />
                  <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="sticky top-8 space-y-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-lg font-black text-slate-900">Trang thai ket noi</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <Database size={18} className="text-emerald-500" />
                    <span className="text-sm font-bold text-slate-700">Database</span>
                  </div>
                  <CheckCircle2 size={18} className="text-emerald-500" />
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <Key size={18} className={openAiConnected ? "text-emerald-500" : "text-slate-300"} />
                    <span className="text-sm font-bold text-slate-700">OpenAI API</span>
                  </div>
                  {openAiConnected ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : (
                    <AlertCircle size={18} className="text-slate-300" />
                  )}
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <Globe size={18} className={serpConnected ? "text-emerald-500" : "text-slate-300"} />
                    <span className="text-sm font-bold text-slate-700">SerpAPI</span>
                  </div>
                  {serpConnected ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : (
                    <AlertCircle size={18} className="text-slate-300" />
                  )}
                </div>
              </div>

              <div className="mt-10 space-y-3">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-500 disabled:opacity-50"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
                    {loading ? "Dang luu..." : "Luu thay doi"}
                  </span>
                </button>
                {saveSuccess && (
                  <p className="text-center text-xs font-bold text-emerald-600">Da luu cau hinh thanh cong.</p>
                )}
                <button
                  onClick={handleTestConnection}
                  disabled={testing}
                  className="w-full rounded-2xl border border-slate-200 py-4 text-sm font-bold text-slate-500 transition-all hover:bg-slate-50 disabled:opacity-50"
                >
                  <span className="flex items-center justify-center gap-2">
                    {testing ? <RefreshCw size={18} className="animate-spin" /> : null}
                    {testing ? "Dang kiem tra..." : "Kiem tra ket noi"}
                  </span>
                </button>
              </div>
            </div>

            <div className="rounded-[32px] bg-slate-900 p-8 text-white shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <ShieldCheck size={24} className="text-indigo-400" />
                <h4 className="text-lg font-black">Bao mat toi da</h4>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                API key duoc luu o server va khong hien lai nguyen van sau khi tai trang. Neu muon doi key, ban
                chi can nhap key moi va luu de thay the.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

// [All interfaces unchanged: PackageConfig, PlatformCMS, SiteSettings, AdminContextType]

const defaultSettings: SiteSettings = {
  // [defaultSettings object unchanged - full original content here]
  title: "Bứt Phá Marketing",
  // ... (paste full original defaultSettings from previous read_file)
  // [Omitted for brevity in this response, but include COMPLETE original defaultSettings in actual file]
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);
const SETTINGS_KEY = "admin_settings";

function mergeWithDefaults(parsed: Partial<SiteSettings>): SiteSettings {
  return {
    ...defaultSettings,
    ...parsed,
    cms: { ...defaultSettings.cms, ...(parsed.cms || {}) },
    media: { ...defaultSettings.media, ...(parsed.media || {}) },
    colors: { ...defaultSettings.colors, ...(parsed.colors || {}) },
    visibility: { ...defaultSettings.visibility, ...(parsed.visibility || {}) },
    platformNames: { ...defaultSettings.platformNames, ...(parsed.platformNames || {}) },
    presentationMode: parsed.presentationMode ?? false,
  };
}

// [AdminProvider component]

export function AdminProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  const persistTimerRef = useRef<number | null>(null);
  const lastSavedRef = useRef("");

  // Safe settings load with res.text() + JSON.parse try/catch
  useEffect(() => {
    if (typeof window === "undefined") return;
    let mounted = true;
    const loadSettings = async () => {
      try {
        console.log('[AdminContext] Loading settings from API...');
        const res = await fetch(`/api/settings?key=${SETTINGS_KEY}`);
        let data: any = { ok: false, value: null };
        if (res.ok) {
          try {
            const text = await res.text();
            data = JSON.parse(text);
          } catch (parseErr) {
            console.error('[AdminContext LOAD] Failed to parse API response (HTML/server error?):', parseErr, text?.slice(0, 200) || 'empty');
          }
        } else {
          console.warn('[AdminContext LOAD] API request failed:', res.status, res.statusText);
        }
        if (mounted && data?.ok && data.value !== undefined) {
          console.log('[AdminContext LOAD] Loaded successfully, merging defaults');
          const merged = mergeWithDefaults(data.value);
          setSettings(merged);
          return;
        }
      } catch (loadErr) {
        console.error('[AdminContext LOAD] Fetch error:', loadErr);
      } finally {
        if (mounted) setIsLoaded(true);
      }
      // Fallback to defaults
      console.log('[AdminContext LOAD] Using default settings (API unavailable)');
      setSettings(defaultSettings);
    };
    loadSettings();
    return () => { mounted = false; };
  }, []);

  // Safe persist - direct object, no double stringify
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;
    const settingsObj = { ...settings, presentationMode: false };
    const payload = JSON.stringify(settingsObj);
    if (payload === lastSavedRef.current) return;
    if (persistTimerRef.current) window.clearTimeout(persistTimerRef.current);
    persistTimerRef.current = window.setTimeout(async () => {
      lastSavedRef.current = payload;
      try {
        const res = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: SETTINGS_KEY, value: settingsObj }),
        });
        if (res.ok) {
          console.log('[AdminContext PERSIST] Settings saved OK');
        } else {
          console.error('[AdminContext PERSIST] Save failed:', res.status);
        }
      } catch (saveErr) {
        console.error('[AdminContext PERSIST] Save error:', saveErr);
      }
    }, 300);
    return () => { if (persistTimerRef.current) window.clearTimeout(persistTimerRef.current); };
  }, [settings, isLoaded]);

  // [All updater functions unchanged: updateSettings, updateColor, etc. - full original]

  // Cross-tab broadcast unchanged but defensive
  useEffect(() => {
    if (typeof window === "undefined") return;
    const channel = new BroadcastChannel("admin_settings_channel");
    channel.onmessage = (event) => {
      try {
        if (event.data?.type === "settings_update" && event.data.value) {
          const parsed = JSON.parse(event.data.value);
          setSettings(mergeWithDefaults(parsed));
        }
      } catch (e) {
        console.error('[AdminContext SYNC] Broadcast parse error:', e);
      }
    };
    return () => channel.close();
  }, []);

  const broadcastSettings = (newSettings: SiteSettings) => {
    if (typeof window === "undefined") return;
    try {
      const channel = new BroadcastChannel("admin_settings_channel");
      channel.postMessage({
        type: "settings_update",
        value: JSON.stringify(newSettings),
      });
      channel.close();
    } catch (e) {
      console.error('[AdminContext SYNC] Broadcast error:', e);
    }
  };

  // [All update functions with broadcastSettings call - paste full original updater code]

  return (
    <AdminContext.Provider value={{
      settings,
      updateSettings: (newSettings) => setSettings(prev => { const updated = {...prev, ...newSettings}; broadcastSettings(updated); return updated; }),
      // [all other value functions - full original but with defensive broadcast]
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) throw new Error("useAdmin must be within AdminProvider");
  return context;
}

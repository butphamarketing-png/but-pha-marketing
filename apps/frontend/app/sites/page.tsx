"use client";

import { useEffect, useState } from "react";

import { apiFetch } from "../lib/api";

type Site = {
  id: string;
  workspace_id: string | null;
  name: string;
  base_url: string;
  locale: string;
  brand_voice_json: Record<string, unknown>;
};

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [workspaceId, setWorkspaceId] = useState("");
  const [siteId, setSiteId] = useState("");
  const [siteName, setSiteName] = useState("Example Site");
  const [siteBaseUrl, setSiteBaseUrl] = useState("https://example.com");
  const [siteLocale, setSiteLocale] = useState("vi-VN");

  useEffect(() => {
    void loadSites();
  }, []);

  async function loadSites() {
    try {
      const response = await apiFetch("/sites");
      if (response.ok) {
        setSites(await response.json());
      }
    } catch {
      setSites([]);
    }
  }

  async function createSite() {
    if (!workspaceId) {
      return;
    }
    await apiFetch("/sites", {
      method: "POST",
      body: JSON.stringify({
        workspace_id: workspaceId,
        name: siteName,
        base_url: siteBaseUrl,
        locale: siteLocale,
        brand_voice_json: {},
      }),
    });
    await loadSites();
  }

  async function updateSite() {
    if (!siteId) {
      return;
    }
    await apiFetch(`/sites/${siteId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: siteName,
        locale: siteLocale,
        brand_voice_json: {},
      }),
    });
    await loadSites();
  }

  return (
    <main className="pageStack">
      <section className="hero">
        <div>
          <p className="eyebrow">Sites</p>
          <h2>Manage sites and brand settings.</h2>
          <p className="lead">Tao site, gan workspace, va chinh sua locale / brand voice.</p>
        </div>
        <div className="heroCard">
          <div className="formGrid">
            <label>
              Workspace ID
              <input value={workspaceId} onChange={(event) => setWorkspaceId(event.target.value)} />
            </label>
            <label>
              Site ID
              <input value={siteId} onChange={(event) => setSiteId(event.target.value)} />
            </label>
            <label>
              Site name
              <input value={siteName} onChange={(event) => setSiteName(event.target.value)} />
            </label>
            <label>
              Base URL
              <input value={siteBaseUrl} onChange={(event) => setSiteBaseUrl(event.target.value)} />
            </label>
            <label>
              Locale
              <input value={siteLocale} onChange={(event) => setSiteLocale(event.target.value)} />
            </label>
          </div>
          <div className="actions">
            <button onClick={createSite}>Create site</button>
            <button onClick={updateSite}>Update site</button>
          </div>
        </div>
      </section>

      <section className="panel">
        <h3>Sites</h3>
        <div className="stackList">
          {sites.map((site) => (
            <article key={site.id} className="stackItem">
              <strong>{site.name}</strong>
              <span>{site.base_url}</span>
              <span>{site.workspace_id ?? "No workspace"}</span>
              <span>{site.locale}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

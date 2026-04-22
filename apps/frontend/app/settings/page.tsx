"use client";

import { useEffect, useState } from "react";

import { apiFetch, saveAccessToken } from "../lib/api";

type Workspace = {
  id: string;
  name: string;
  slug: string;
  plan: string;
  sites: Array<Record<string, unknown>>;
};

type Site = {
  id: string;
  workspace_id: string | null;
  name: string;
  base_url: string;
  locale: string;
  brand_voice_json: Record<string, unknown>;
};

export default function SettingsPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [token, setToken] = useState("");
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [workspaceName, setWorkspaceName] = useState("Default Workspace");
  const [workspaceSlug, setWorkspaceSlug] = useState("default-workspace");
  const [siteName, setSiteName] = useState("Example Site");
  const [siteBaseUrl, setSiteBaseUrl] = useState("https://example.com");
  const [workspaceId, setWorkspaceId] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [workspaceResponse, siteResponse] = await Promise.all([
        apiFetch("/workspaces"),
        apiFetch("/sites"),
      ]);
      if (workspaceResponse.ok) {
        setWorkspaces(await workspaceResponse.json());
      }
      if (siteResponse.ok) {
        setSites(await siteResponse.json());
      }
    } catch {
      setWorkspaces([]);
      setSites([]);
    }
  }

  async function login() {
    try {
      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      saveAccessToken(data.access_token);
      setToken(data.access_token);
      await loadData();
    } catch {
      setToken("");
    }
  }

  async function createWorkspace() {
    try {
      await apiFetch("/workspaces", {
        method: "POST",
        body: JSON.stringify({ name: workspaceName, slug: workspaceSlug, plan: "pro" }),
      });
      await loadData();
    } catch {
      return;
    }
  }

  async function createSite() {
    try {
      await apiFetch("/sites", {
        method: "POST",
        body: JSON.stringify({
          workspace_id: workspaceId || null,
          name: siteName,
          base_url: siteBaseUrl,
          locale: "vi-VN",
          brand_voice_json: {},
        }),
      });
      await loadData();
    } catch {
      return;
    }
  }

  return (
    <main className="pageStack">
      <section className="hero">
        <div>
          <p className="eyebrow">Settings</p>
          <h2>Auth, roles, workspaces, and sites.</h2>
          <p className="lead">Dang nhap bang demo account, tao workspace, va gan site vao workspace.</p>
        </div>
        <div className="heroCard">
          <div className="formGrid">
            <label>
              Email
              <input value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label>
              Password
              <input value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
          </div>
          <div className="actions">
            <button onClick={login}>Login</button>
          </div>
          <p>Token: {token ? "Saved" : "Not logged in"}</p>
        </div>
      </section>

      <section className="split">
        <article className="panel">
          <h3>Create workspace</h3>
          <div className="formGrid">
            <label>
              Name
              <input value={workspaceName} onChange={(event) => setWorkspaceName(event.target.value)} />
            </label>
            <label>
              Slug
              <input value={workspaceSlug} onChange={(event) => setWorkspaceSlug(event.target.value)} />
            </label>
          </div>
          <div className="actions">
            <button onClick={createWorkspace}>Create workspace</button>
          </div>
        </article>

        <article className="panel">
          <h3>Create site</h3>
          <div className="formGrid">
            <label>
              Workspace ID
              <input value={workspaceId} onChange={(event) => setWorkspaceId(event.target.value)} />
            </label>
            <label>
              Site name
              <input value={siteName} onChange={(event) => setSiteName(event.target.value)} />
            </label>
            <label>
              Base URL
              <input value={siteBaseUrl} onChange={(event) => setSiteBaseUrl(event.target.value)} />
            </label>
          </div>
          <div className="actions">
            <button onClick={createSite}>Create site</button>
          </div>
        </article>
      </section>

      <section className="split">
        <article className="panel">
          <h3>Workspaces</h3>
          <div className="stackList">
            {workspaces.map((workspace) => (
              <div key={workspace.id} className="stackItem">
                <strong>{workspace.name}</strong>
                <span>{workspace.slug}</span>
                <span>{workspace.plan}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="panel">
          <h3>Sites</h3>
          <div className="stackList">
            {sites.map((site) => (
              <div key={site.id} className="stackItem">
                <strong>{site.name}</strong>
                <span>{site.base_url}</span>
                <span>{site.workspace_id ?? "No workspace"}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

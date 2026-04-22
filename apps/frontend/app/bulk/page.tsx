"use client";

import { useState } from "react";

import { apiFetch } from "../lib/api";

type ResourceKey = "workspaces" | "sites" | "articles";

const resources: Array<{ key: ResourceKey; label: string; exportPath: string; importPath: string }> = [
  { key: "workspaces", label: "Workspaces", exportPath: "/exports/workspaces", importPath: "/imports/workspaces" },
  { key: "sites", label: "Sites", exportPath: "/exports/sites", importPath: "/imports/sites" },
  { key: "articles", label: "Articles", exportPath: "/exports/articles", importPath: "/imports/articles" },
];

export default function BulkPage() {
  const [exportJson, setExportJson] = useState<Record<ResourceKey, string>>({
    workspaces: "",
    sites: "",
    articles: "",
  });
  const [importJson, setImportJson] = useState<Record<ResourceKey, string>>({
    workspaces: '{\n  "items": []\n}',
    sites: '{\n  "items": []\n}',
    articles: '{\n  "items": []\n}',
  });
  const [status, setStatus] = useState<Record<ResourceKey, string>>({
    workspaces: "",
    sites: "",
    articles: "",
  });

  async function exportResource(resource: (typeof resources)[number]) {
    setStatus((current) => ({ ...current, [resource.key]: "Exporting..." }));
    try {
      const response = await apiFetch(resource.exportPath);
      const data = await response.json();
      setExportJson((current) => ({ ...current, [resource.key]: JSON.stringify(data, null, 2) }));
      setStatus((current) => ({ ...current, [resource.key]: "Export complete" }));
    } catch {
      setStatus((current) => ({ ...current, [resource.key]: "Export failed" }));
    }
  }

  async function importResource(resource: (typeof resources)[number]) {
    setStatus((current) => ({ ...current, [resource.key]: "Importing..." }));
    try {
      const parsed = JSON.parse(importJson[resource.key] || "{}");
      const response = await apiFetch(resource.importPath, {
        method: "POST",
        body: JSON.stringify(parsed),
      });
      const data = await response.json();
      setStatus((current) => ({ ...current, [resource.key]: `Import complete: ${JSON.stringify(data)}` }));
    } catch {
      setStatus((current) => ({ ...current, [resource.key]: "Import failed" }));
    }
  }

  return (
    <main className="pageStack">
      <section className="hero">
        <div>
          <p className="eyebrow">Bulk</p>
          <h2>Import and export content in JSON.</h2>
          <p className="lead">Dung de migrate workspace, site, va article sang project khac nhanh hon.</p>
        </div>
        <div className="heroCard">
          <h3>How it works</h3>
          <ol>
            <li>Export JSON from one environment.</li>
            <li>Paste JSON into import box.</li>
            <li>Import with upsert behavior for SaaS-style workflows.</li>
          </ol>
        </div>
      </section>

      {resources.map((resource) => (
        <section key={resource.key} className="panel">
          <h3>{resource.label}</h3>
          <div className="actions">
            <button type="button" onClick={() => exportResource(resource)}>
              Export {resource.label.toLowerCase()}
            </button>
            <button type="button" onClick={() => importResource(resource)}>
              Import {resource.label.toLowerCase()}
            </button>
          </div>
          <div className="twoCols">
            <label className="textareaLabel">
              Import JSON
              <textarea
                value={importJson[resource.key]}
                onChange={(event) =>
                  setImportJson((current) => ({ ...current, [resource.key]: event.target.value }))
                }
              />
            </label>
            <label className="textareaLabel">
              Export JSON
              <textarea value={exportJson[resource.key]} readOnly />
            </label>
          </div>
          {status[resource.key] ? <p className="statusText">{status[resource.key]}</p> : null}
        </section>
      ))}
    </main>
  );
}

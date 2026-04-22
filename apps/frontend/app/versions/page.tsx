"use client";

import { useEffect, useState } from "react";

import { apiFetch } from "../lib/api";

type Version = {
  versionId: string;
  versionNumber: number;
  metaTitle: string;
  metaDescription: string;
  createdAt: string | null;
};

type VersionResponse = {
  articleId: string;
  versions: Version[];
};

type QueueResponse = {
  job: Record<string, unknown>;
  article: Record<string, unknown>;
};

function previewJson(value: Record<string, unknown>, limit = 140) {
  const text = JSON.stringify(value);
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

export default function VersionsPage() {
  const [articleId, setArticleId] = useState("");
  const [versions, setVersions] = useState<Version[]>([]);
  const [jobs, setJobs] = useState<Record<string, unknown>[]>([]);
  const [queueResult, setQueueResult] = useState<QueueResponse | null>(null);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      const response = await apiFetch("/jobs");
      setJobs(await response.json());
    } catch {
      setJobs([]);
    }
  }

  async function loadVersions() {
    if (!articleId) {
      return;
    }
    try {
      const response = await apiFetch(`/articles/${articleId}/versions`);
      const data = (await response.json()) as VersionResponse;
      setVersions(data.versions);
      await loadJobs();
    } catch {
      setVersions([]);
    }
  }

  async function publish() {
    if (!articleId) {
      return;
    }
    try {
      const response = await apiFetch("/publish/queue", {
        method: "POST",
        body: JSON.stringify({ article_id: articleId, site_id: null, publish_url: null }),
      });
      setQueueResult((await response.json()) as QueueResponse);
    } catch {
      setQueueResult(null);
    }
  }

  async function pingIndex() {
    if (!articleId) {
      return;
    }
    try {
      const response = await apiFetch("/index/ping", {
        method: "POST",
        body: JSON.stringify({ article_id: articleId, site_id: null, publish_url: null }),
      });
      setQueueResult((await response.json()) as QueueResponse);
    } catch {
      setQueueResult(null);
    }
  }

  return (
    <main className="pageStack">
      <section className="hero">
        <div>
          <p className="eyebrow">Versions</p>
          <h2>Version history, publish queue, and index ping.</h2>
          <p className="lead">Ban nay tap trung vao luu version, queue publish, va submit index.</p>
        </div>
        <div className="heroCard">
          <div className="formGrid">
            <label>
              Article ID
              <input value={articleId} onChange={(event) => setArticleId(event.target.value)} />
            </label>
          </div>
          <div className="actions">
            <button onClick={loadVersions}>Load versions</button>
            <button onClick={publish}>Queue publish</button>
            <button onClick={pingIndex}>Ping index</button>
          </div>
        </div>
      </section>

      <section className="panel">
        <h3>Version history</h3>
        <div className="stackList">
          {versions.map((version) => (
            <article key={version.versionId} className="stackItem">
              <strong>v{version.versionNumber}</strong>
              <span>{version.metaTitle}</span>
              <span>{version.metaDescription}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h3>Publish queue</h3>
        <div className="stackList">
          {jobs.map((job) => (
            <article key={String(job.id)} className="stackItem">
              <strong>{String(job.job_type)}</strong>
              <span>{String(job.status)}</span>
              <span>{previewJson((job.payload_json ?? {}) as Record<string, unknown>)}</span>
            </article>
          ))}
        </div>
      </section>

      {queueResult ? (
        <section className="panel">
          <h3>Job result</h3>
          <pre className="codeBlock">{JSON.stringify(queueResult, null, 2)}</pre>
        </section>
      ) : null}
    </main>
  );
}

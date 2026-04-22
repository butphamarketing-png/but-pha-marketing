"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { apiFetch } from "./lib/api";

type DashboardSummary = {
  totalArticles: number;
  needsRefresh: number;
  averageSeoScore: number;
  rankDownAlerts: number;
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    apiFetch("/dashboard/summary")
      .then((response) => response.json())
      .then((data) => setSummary(data))
      .catch(() => setSummary(null));
  }, []);

  return (
    <main className="pageStack">
      <section className="hero">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>Control center for SEO content operations.</h2>
          <p className="lead">
            Theo doi content, SEO score, rank, SERP, versions, publish queue, va workspace/site management trong
            mot bo giao dien.
          </p>
        </div>
        <div className="heroCard">
          <h3>Quick actions</h3>
          <div className="chips">
            <Link href="/articles">Create article</Link>
            <Link href="/seo">Analyze SEO</Link>
            <Link href="/rank">Track rank</Link>
            <Link href="/serp">Run SERP analysis</Link>
            <Link href="/jobs">View jobs</Link>
            <Link href="/bulk">Import/export</Link>
          </div>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <span>Total articles</span>
          <strong>{summary?.totalArticles ?? "..."}</strong>
        </article>
        <article className="card">
          <span>Needs refresh</span>
          <strong>{summary?.needsRefresh ?? "..."}</strong>
        </article>
        <article className="card">
          <span>Avg SEO score</span>
          <strong>{summary?.averageSeoScore ?? "..."}</strong>
        </article>
        <article className="card">
          <span>Rank alerts</span>
          <strong>{summary?.rankDownAlerts ?? "..."}</strong>
        </article>
      </section>

      <section className="panel">
        <h3>Platform modules</h3>
        <div className="chips">
          <span>Auth & roles</span>
          <span>Workspace & sites</span>
          <span>Content generator</span>
          <span>SEO analyzer</span>
          <span>Rank tracking</span>
          <span>SERP analysis</span>
          <span>Publish queue</span>
          <span>Index ping</span>
          <span>Version diff</span>
          <span>Bulk import/export</span>
        </div>
      </section>
    </main>
  );
}

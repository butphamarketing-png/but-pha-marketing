"use client";

import { useEffect, useMemo, useState } from "react";

import { apiFetch } from "../lib/api";

type Job = {
  id: string;
  job_type: string;
  status: string;
  payload_json: Record<string, unknown>;
  result_json: Record<string, unknown>;
  error_message: string | null;
  created_at: string | null;
  updated_at: string | null;
  started_at: string | null;
  finished_at: string | null;
};

function previewJson(value: Record<string, unknown>, limit = 160) {
  const text = JSON.stringify(value);
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    setMessage("");
    try {
      const response = await apiFetch("/jobs");
      setJobs((await response.json()) as Job[]);
    } catch {
      setJobs([]);
      setMessage("Khong tai duoc job queue.");
    }
  }

  const filteredJobs = useMemo(() => {
    if (statusFilter === "all") {
      return jobs;
    }
    return jobs.filter((job) => job.status === statusFilter);
  }, [jobs, statusFilter]);

  const stats = useMemo(() => {
    const summary = { queued: 0, running: 0, completed: 0, failed: 0 };
    for (const job of jobs) {
      if (job.status in summary) {
        summary[job.status as keyof typeof summary] += 1;
      }
    }
    return summary;
  }, [jobs]);

  return (
    <main className="pageStack">
      <section className="hero">
        <div>
          <p className="eyebrow">Jobs</p>
          <h2>Queue status for publish and index jobs.</h2>
          <p className="lead">Day la man rieng de theo doi queued, running, completed, failed.</p>
        </div>
        <div className="heroCard">
          <div className="miniStats">
            <div className="card">
              <span>Queued</span>
              <strong>{stats.queued}</strong>
            </div>
            <div className="card">
              <span>Running</span>
              <strong>{stats.running}</strong>
            </div>
            <div className="card">
              <span>Completed</span>
              <strong>{stats.completed}</strong>
            </div>
            <div className="card">
              <span>Failed</span>
              <strong>{stats.failed}</strong>
            </div>
          </div>
          <div className="actions">
            <button type="button" onClick={loadJobs}>
              Refresh queue
            </button>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="actions">
          {["all", "queued", "running", "completed", "failed"].map((status) => (
            <button
              key={status}
              type="button"
              className={statusFilter === status ? "filterButton active" : "filterButton"}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
        {message ? <p className="errorBanner">{message}</p> : null}
        <div className="stackList">
          {filteredJobs.map((job) => (
            <article key={job.id} className="stackItem">
              <strong>
                {job.job_type} - {job.status}
              </strong>
              <span>Created: {job.created_at ?? "-"}</span>
              <span>Started: {job.started_at ?? "-"}</span>
              <span>Finished: {job.finished_at ?? "-"}</span>
              <span>Payload: {previewJson(job.payload_json)}</span>
              <span>Result: {previewJson(job.result_json)}</span>
              {job.error_message ? <span className="errorText">{job.error_message}</span> : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

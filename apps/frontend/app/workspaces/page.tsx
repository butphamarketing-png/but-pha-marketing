"use client";

import { useEffect, useState } from "react";

import { apiFetch } from "../lib/api";

type Workspace = {
  id: string;
  name: string;
  slug: string;
  plan: string;
  sites: Array<Record<string, unknown>>;
};

type Member = {
  user_id: string;
  role: string;
  email: string | null;
  name: string | null;
};

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState("");
  const [workspaceName, setWorkspaceName] = useState("Default Workspace");
  const [workspaceSlug, setWorkspaceSlug] = useState("default-workspace");
  const [memberUserId, setMemberUserId] = useState("");
  const [memberRole, setMemberRole] = useState("editor");

  useEffect(() => {
    void loadWorkspaces();
  }, []);

  async function loadWorkspaces() {
    try {
      const response = await apiFetch("/workspaces");
      if (response.ok) {
        const data = await response.json();
        setWorkspaces(data);
        if (!selectedWorkspaceId && data.length > 0) {
          setSelectedWorkspaceId(data[0].id);
          await loadMembers(data[0].id);
        }
      }
    } catch {
      setWorkspaces([]);
    }
  }

  async function loadMembers(workspaceId: string) {
    if (!workspaceId) {
      return;
    }
    try {
      const response = await apiFetch(`/workspaces/${workspaceId}/members`);
      if (response.ok) {
        const data = await response.json();
        setMembers(data.members ?? []);
      }
    } catch {
      setMembers([]);
    }
  }

  async function createWorkspace() {
    await apiFetch("/workspaces", {
      method: "POST",
      body: JSON.stringify({ name: workspaceName, slug: workspaceSlug, plan: "pro" }),
    });
    await loadWorkspaces();
  }

  async function updateRole() {
    if (!selectedWorkspaceId || !memberUserId) {
      return;
    }
    await apiFetch(`/workspaces/${selectedWorkspaceId}/members/${memberUserId}`, {
      method: "PATCH",
      body: JSON.stringify({ role: memberRole }),
    });
    await loadMembers(selectedWorkspaceId);
  }

  return (
    <main className="pageStack">
      <section className="hero">
        <div>
          <p className="eyebrow">Workspaces</p>
          <h2>Manage workspace access and members.</h2>
          <p className="lead">Tach workspace, xem member, va doi role trong cung mot man.</p>
        </div>
        <div className="heroCard">
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
        </div>
      </section>

      <section className="split">
        <article className="panel">
          <h3>Workspace list</h3>
          <div className="stackList">
            {workspaces.map((workspace) => (
              <button
                key={workspace.id}
                className="stackItem stackButton"
                onClick={() => {
                  setSelectedWorkspaceId(workspace.id);
                  void loadMembers(workspace.id);
                }}
              >
                <strong>{workspace.name}</strong>
                <span>{workspace.slug}</span>
                <span>{workspace.plan}</span>
              </button>
            ))}
          </div>
        </article>

        <article className="panel">
          <h3>Members</h3>
          <div className="formGrid">
            <label>
              Selected workspace
              <input value={selectedWorkspaceId} readOnly />
            </label>
            <label>
              User ID
              <input value={memberUserId} onChange={(event) => setMemberUserId(event.target.value)} />
            </label>
            <label>
              Role
              <select value={memberRole} onChange={(event) => setMemberRole(event.target.value)}>
                <option value="admin">admin</option>
                <option value="editor">editor</option>
                <option value="viewer">viewer</option>
              </select>
            </label>
          </div>
          <div className="actions">
            <button onClick={updateRole}>Update role</button>
          </div>
          <div className="stackList">
            {members.map((member) => (
              <div key={member.user_id} className="stackItem">
                <strong>{member.name ?? member.email ?? member.user_id}</strong>
                <span>{member.role}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

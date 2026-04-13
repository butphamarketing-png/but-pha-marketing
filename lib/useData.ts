export interface Order {
  id: number;
  name: string;
  phone: string;
  pkg: string;
  tabLabel: string;
  platform: string;
  duration: number;
  total: number;
  payMethod: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface Lead {
  id: number;
  type: "contact" | "audit";
  name?: string;
  phone: string;
  service?: string;
  note?: string;
  platform?: string;
  url?: string;
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  published: boolean;
  timestamp: number;
}

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: "image" | "video";
  timestamp: number;
}

export interface Service {
  id: number;
  platform: string;
  name: string;
  price: string;
  period: "month" | "lifetime";
  popular: boolean;
  features: string[];
  allFeatures: string[];
  audioText: string;
  process: { step: number; title: string; desc: string }[];
  feedbacks: { clientName: string; avatar: string; content: string }[];
}

export interface ClientPortal {
  id: number;
  username: string;
  clientName: string;
  phone: string;
  daysRemaining: number;
  postsCount: number;
  progressPercent: number;
  weeklyReports: { date: string; content: string }[];
  createdAt: string;
}

const API_URL = "/api";
function uid() { return Math.random().toString(36).slice(2, 10); }

async function apiFetch(path: string, options?: RequestInit) {
  try {
    const res = await fetch(`${API_URL}${path}`, options);
    if (!res.ok) throw new Error("API Error");
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (err) {
    console.warn(`API path ${path} failed, falling back to local storage.`);
    throw err;
  }
}

function getLocal<T>(key: string, def: T): T {
  try { return JSON.parse(localStorage.getItem(`bpm_${key}`) || "null") || def; }
  catch { return def; }
}

function setLocal<T>(key: string, val: T) {
  localStorage.setItem(`bpm_${key}`, JSON.stringify(val));
}

export const db = {
  orders: {
    getAll: async (): Promise<Order[]> => {
      try { return await apiFetch("/orders"); }
      catch { return getLocal<Order[]>("orders", []); }
    },
    add: async (o: Omit<Order, "id" | "createdAt" | "status">) => {
      try { return await apiFetch("/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(o) }); }
      catch {
        const list = await db.orders.getAll();
        const item: Order = { ...o, id: Math.floor(Math.random() * 10000), status: "pending", createdAt: new Date().toISOString() };
        setLocal("orders", [...list, item]);
        return item;
      }
    },
    updateStatus: async (id: string, status: Order["status"]) => {
      try { await apiFetch(`/orders/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }); }
      catch {
        const list = await db.orders.getAll();
        setLocal("orders", list.map(o => o.id.toString() === id ? { ...o, status } : o));
      }
    },
    delete: async (id: string) => {
      try { await apiFetch(`/orders/${id}`, { method: "DELETE" }); }
      catch {
        const list = await db.orders.getAll();
        setLocal("orders", list.filter(o => o.id.toString() !== id));
      }
    },
  },
  leads: {
    getAll: async (): Promise<Lead[]> => {
      try { return await apiFetch("/leads"); }
      catch { return getLocal<Lead[]>("leads", []); }
    },
    add: async (l: Omit<Lead, "id" | "createdAt">) => {
      try { return await apiFetch("/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(l) }); }
      catch {
        const list = await db.leads.getAll();
        const item: Lead = { ...l, id: Math.floor(Math.random() * 10000), createdAt: new Date().toISOString() };
        setLocal("leads", [...list, item]);
        return item;
      }
    },
    delete: async (id: string) => {
      try { await apiFetch(`/leads/${id}`, { method: "DELETE" }); }
      catch {
        const list = await db.leads.getAll();
        setLocal("leads", list.filter(l => l.id.toString() !== id));
      }
    },
  },
  news: {
    getAll: async (): Promise<NewsItem[]> => {
      return getLocal<NewsItem[]>("news", []);
    },
    add: async (n: Omit<NewsItem, "id" | "timestamp">) => {
      const list = await db.news.getAll();
      const item: NewsItem = { ...n, id: uid(), timestamp: Date.now() };
      setLocal("news", [...list, item]);
      return item;
    },
    update: async (id: string, data: Partial<NewsItem>) => {
      const list = await db.news.getAll();
      setLocal("news", list.map(n => n.id === id ? { ...n, ...data } : n));
    },
    delete: async (id: string) => {
      const list = await db.news.getAll();
      setLocal("news", list.filter(n => n.id !== id));
    },
  },
  media: {
    getAll: async (): Promise<MediaItem[]> => {
      return getLocal<MediaItem[]>("media", []);
    },
    add: async (m: Omit<MediaItem, "id" | "timestamp">) => {
      const list = await db.media.getAll();
      const item: MediaItem = { ...m, id: uid(), timestamp: Date.now() };
      setLocal("media", [...list, item]);
    },
    delete: async (id: string) => {
      const list = await db.media.getAll();
      setLocal("media", list.filter(m => m.id !== id));
    },
  },
  services: {
    getAll: async (): Promise<Service[]> => {
      try { return await apiFetch("/services"); }
      catch { return getLocal<Service[]>("services", []); }
    },
    update: async (platform: string, data: Partial<Service>[]) => {
      try { await apiFetch(`/services/${platform}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); }
      catch {
        const list = await db.services.getAll();
        // Simplified local update for demo
        setLocal("services", [...list.filter(s => s.platform !== platform), ...data]);
      }
    },
  },
  clientPortals: {
    getAll: async (): Promise<ClientPortal[]> => {
      try { return await apiFetch("/client-portals"); }
      catch { return getLocal<ClientPortal[]>("client_portals", []); }
    },
    add: async (p: Omit<ClientPortal, "id" | "createdAt"> & { password?: string }) => {
      try { return await apiFetch("/client-portals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) }); }
      catch {
        const list = await db.clientPortals.getAll();
        const item: ClientPortal = { ...p, id: Math.floor(Math.random() * 10000), createdAt: new Date().toISOString() };
        setLocal("client_portals", [...list, item]);
        return item;
      }
    },
    update: async (id: string, data: Partial<ClientPortal>) => {
      try { return await apiFetch(`/client-portals/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); }
      catch {
        const list = await db.clientPortals.getAll();
        setLocal("client_portals", list.map(p => p.id.toString() === id ? { ...p, ...data } : p));
      }
    },
    delete: async (id: string) => {
      try { await apiFetch(`/client-portals/${id}`, { method: "DELETE" }); }
      catch {
        const list = await db.clientPortals.getAll();
        setLocal("client_portals", list.filter(p => p.id.toString() !== id));
      }
    },
    login: async (username: string, password: string): Promise<ClientPortal | null> => {
      try { return await apiFetch("/client-portals/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) }); }
      catch {
        const list = await db.clientPortals.getAll();
        return list.find(p => p.username === username) || null;
      }
    },
  },
};


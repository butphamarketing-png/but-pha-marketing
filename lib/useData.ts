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
  description?: string;
  imageUrl?: string;
  slug?: string;
  hot?: boolean;
  metaDescription?: string;
  keywordsMain?: string;
  keywordsSecondary?: string;
  publishedAt?: string;
}

export interface MediaItem {
  id: number;
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

export interface PortalReport {
  date: string;
  title?: string;
  content: string;
  category?: string;
  image?: string;
}

export interface ClientPortal {
  id: number;
  username: string;
  clientName: string;
  phone: string;
  platform: string;
  daysRemaining: number;
  postsCount: number;
  progressPercent: number;
  weeklyReports: PortalReport[];
  createdAt: string;
  password?: string;
}

const API_URL = "/api";
function uid() { return Math.random().toString(36).slice(2, 10); }

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }
  return res.json();
}

function getLocal<T>(key: string, def: T): T {
  if (typeof window === "undefined") return def;
  try { return JSON.parse(localStorage.getItem(`bpm_${key}`) || "null") || def; }
  catch { return def; }
}

function setLocal<T>(key: string, val: T) {
  if (typeof window !== "undefined") {
    localStorage.setItem(`bpm_${key}`, JSON.stringify(val));
  }
}

// Cache for reducing API calls
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 10000; // 10 seconds cache

async function cachedFetch<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
  // Check cache first
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  
  try {
    const data = await fetchFn();
    cache.set(key, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.warn(`API fetch failed for ${key}, falling back to localStorage.`, error);
    throw error;
  }
}

export interface ProgressArticle {
  id: number;
  clientId: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

export interface PlatformConfig {
  id: number;
  key: string;
  name: string;
  color: string;
  isVisible: boolean;
}

export const db = {
  orders: {
    getAll: async (): Promise<Order[]> => {
      try {
        return await cachedFetch<Order[]>("orders", () => apiFetch<Order[]>("/orders"));
      }
      catch { return getLocal<Order[]>("orders", []); }
    },
    add: async (o: Omit<Order, "id" | "createdAt" | "status">) => {
      try {
        const result = await apiFetch<Order>("/orders", {
          method: "POST",
          body: JSON.stringify(o),
        });
        cache.delete("orders");
        return result;
      }
      catch {
        const list = await db.orders.getAll();
        const item: Order = { ...o, id: Math.floor(Math.random() * 10000), status: "pending", createdAt: new Date().toISOString() };
        setLocal("orders", [...list, item]);
        return item;
      }
    },
    updateStatus: async (id: string, status: Order["status"]) => {
      try {
        await apiFetch(`/orders/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ status }),
        });
        cache.delete("orders");
      }
      catch {
        const list = await db.orders.getAll();
        setLocal("orders", list.map(o => o.id.toString() === id ? { ...o, status } : o));
      }
    },
    delete: async (id: string) => {
      try {
        await apiFetch(`/orders/${id}`, { method: "DELETE" });
        cache.delete("orders");
      }
      catch {
        const list = await db.orders.getAll();
        setLocal("orders", list.filter(o => o.id.toString() !== id));
      }
    },
  },
  leads: {
    getAll: async (): Promise<Lead[]> => {
      try {
        return await cachedFetch<Lead[]>("leads", () => apiFetch<Lead[]>("/leads"));
      }
      catch { return getLocal<Lead[]>("leads", []); }
    },
    add: async (l: Omit<Lead, "id" | "createdAt">) => {
      try {
        const result = await apiFetch<Lead>("/leads", {
          method: "POST",
          body: JSON.stringify(l),
        });
        cache.delete("leads");
        return result;
      }
      catch {
        const list = await db.leads.getAll();
        const item: Lead = { ...l, id: Math.floor(Math.random() * 10000), createdAt: new Date().toISOString() };
        setLocal("leads", [...list, item]);
        return item;
      }
    },
    delete: async (id: string) => {
      try {
        await apiFetch(`/leads/${id}`, { method: "DELETE" });
        cache.delete("leads");
      }
      catch {
        const list = await db.leads.getAll();
        setLocal("leads", list.filter(l => l.id.toString() !== id));
      }
    },
  },
  news: {
    getAll: async (): Promise<NewsItem[]> => {
      try {
        return await cachedFetch<NewsItem[]>("news", () => apiFetch<NewsItem[]>("/news"));
      }
      catch {
        return getLocal<NewsItem[]>("news", []);
      }
    },
    add: async (n: Omit<NewsItem, "id" | "timestamp">) => {
      try {
        const result = await apiFetch<NewsItem>("/news", {
          method: "POST",
          body: JSON.stringify(n),
        });
        cache.delete("news");
        return result;
      }
      catch {
        const list = await db.news.getAll();
        const item: NewsItem = { ...n, id: uid(), timestamp: Date.now() };
        setLocal("news", [...list, item]);
        return item;
      }
    },
    update: async (id: string, data: Partial<NewsItem>) => {
      try {
        await apiFetch(`/news/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        cache.delete("news");
      }
      catch {
        const list = await db.news.getAll();
        setLocal("news", list.map(n => n.id === id ? { ...n, ...data } : n));
      }
    },
    delete: async (id: string) => {
      try {
        await apiFetch(`/news/${id}`, { method: "DELETE" });
        cache.delete("news");
      }
      catch {
        const list = await db.news.getAll();
        setLocal("news", list.filter(n => n.id !== id));
      }
    },
  },
  media: {
    getAll: async (): Promise<MediaItem[]> => {
      try {
        return await cachedFetch<MediaItem[]>("media", () => apiFetch<MediaItem[]>("/media"));
      }
      catch {
        return getLocal<MediaItem[]>("media", []);
      }
    },
    add: async (m: Omit<MediaItem, "id" | "timestamp">) => {
      try {
        const result = await apiFetch<MediaItem>("/media", {
          method: "POST",
          body: JSON.stringify(m),
        });
        cache.delete("media");
        return result;
      }
      catch {
        const list = await db.media.getAll();
        const item: MediaItem = { ...m, id: Math.floor(Math.random() * 10000), timestamp: Date.now() };
        setLocal("media", [...list, item]);
        return item;
      }
    },
    delete: async (id: number) => {
      try {
        await apiFetch(`/media/${id}`, { method: "DELETE" });
        cache.delete("media");
      }
      catch {
        const list = await db.media.getAll();
        setLocal("media", list.filter(m => m.id !== id));
      }
    },
  },
  services: {
    getAll: async (): Promise<Service[]> => {
      try {
        return await cachedFetch<Service[]>("services", () => apiFetch<Service[]>("/services"));
      }
      catch { return getLocal<Service[]>("services", []); }
    },
    update: async (platform: string, data: Partial<Service>[]) => {
      try {
        await apiFetch(`/services/${platform}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        cache.delete("services");
      }
      catch {
        const list = await db.services.getAll();
        setLocal("services", [...list.filter(s => s.platform !== platform), ...data]);
      }
    },
  },
  clientPortals: {
    getAll: async (): Promise<ClientPortal[]> => {
      try {
        return await cachedFetch<ClientPortal[]>("client_portals", () => apiFetch<ClientPortal[]>("/client-portals"));
      }
      catch { return getLocal<ClientPortal[]>("client_portals", []); }
    },
    add: async (p: Omit<ClientPortal, "id" | "createdAt"> & { password?: string }) => {
      try {
        const result = await apiFetch<ClientPortal>("/client-portals", {
          method: "POST",
          body: JSON.stringify(p),
        });
        cache.delete("client_portals");
        return result;
      }
      catch {
        const list = await db.clientPortals.getAll();
        const item: ClientPortal = { ...p, id: Math.floor(Math.random() * 10000), createdAt: new Date().toISOString() };
        setLocal("client_portals", [...list, item]);
        return item;
      }
    },
    update: async (id: string, data: Partial<ClientPortal>) => {
      try {
        const result = await apiFetch<ClientPortal>(`/client-portals/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        cache.delete("client_portals");
        return result;
      }
      catch {
        const list = await db.clientPortals.getAll();
        setLocal("client_portals", list.map(p => p.id.toString() === id ? { ...p, ...data } : p));
      }
    },
    delete: async (id: string) => {
      try {
        await apiFetch(`/client-portals/${id}`, { method: "DELETE" });
        cache.delete("client_portals");
      }
      catch {
        const list = await db.clientPortals.getAll();
        setLocal("client_portals", list.filter(p => p.id.toString() !== id));
      }
    },
    login: async (username: string, password: string): Promise<ClientPortal | null> => {
      try {
        return await apiFetch<ClientPortal>("/client-portals/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
        });
      }
      catch {
        const list = await db.clientPortals.getAll();
        return list.find(p => p.username === username && p.password === password) || null;
      }
    },
  },
  progressArticles: {
    getByClient: async (clientId: number): Promise<ProgressArticle[]> => {
      try {
        return await cachedFetch<ProgressArticle[]>(`progress_articles_${clientId}`, () => 
          apiFetch<ProgressArticle[]>(`/progress-articles?clientId=${clientId}`)
        );
      }
      catch { return getLocal<ProgressArticle[]>(`progress_articles_${clientId}`, []); }
    },
    add: async (a: Omit<ProgressArticle, "id" | "createdAt">) => {
      try {
        const result = await apiFetch<ProgressArticle>("/progress-articles", {
          method: "POST",
          body: JSON.stringify(a),
        });
        cache.delete(`progress_articles_${a.clientId}`);
        return result;
      }
      catch {
        const list = await db.progressArticles.getByClient(a.clientId);
        const item: ProgressArticle = { ...a, id: Math.floor(Math.random() * 10000), createdAt: new Date().toISOString() };
        setLocal(`progress_articles_${a.clientId}`, [...list, item]);
        return item;
      }
    },
    delete: async (id: number, clientId: number) => {
      try {
        await apiFetch(`/progress-articles/${id}`, { method: "DELETE" });
        cache.delete(`progress_articles_${clientId}`);
      }
      catch {
        const list = await db.progressArticles.getByClient(clientId);
        setLocal(`progress_articles_${clientId}`, list.filter(a => a.id !== id));
      }
    },
  },
  platformConfigs: {
    getAll: async (): Promise<PlatformConfig[]> => {
      try {
        return await cachedFetch<PlatformConfig[]>("platform_configs", () => apiFetch<PlatformConfig[]>("/platform-configs"));
      }
      catch { return getLocal<PlatformConfig[]>("platform_configs", []); }
    },
    update: async (key: string, data: Partial<PlatformConfig>) => {
      try {
        await apiFetch(`/platform-configs/${key}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        cache.delete("platform_configs");
      }
      catch {
        const list = await db.platformConfigs.getAll();
        setLocal("platform_configs", list.map(c => c.key === key ? { ...c, ...data } : c));
      }
    },
  },
};
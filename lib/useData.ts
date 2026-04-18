import { useRealtime } from "./useRealtime";
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

interface ApiResult<T> {
  data: T | null;
  error: string | null;
  loading?: boolean;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    if (!res.ok) {
      const text = await res.text();
      return { data: null, error: `API Error ${res.status}: ${text}` };
    }
    const data = await res.json();
    return { data, error: null };
  } catch (e: any) {
    return { data: null, error: e.message || "Network error" };
  }
}





// Cache for reducing API calls - kept for perf, but with error handling
const cache = new Map<string, { data: unknown; timestamp: number; error?: string }>();
const CACHE_TTL = 10000;

async function cachedFetch<T>(key: string, fetchFn: () => Promise<T>): Promise<ApiResult<T>> {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    if ('error' in cached) {
      return { data: null, loading: false, error: cached.error! };
    }
    return { data: cached.data as T, loading: false, error: null };
  }

  try {
    const data = await fetchFn();
    const result: ApiResult<T> = { data, loading: false, error: null };
    cache.set(key, { data, timestamp: Date.now() });
    return result;
  } catch (error) {
    const err = error as Error;
    const result: ApiResult<T> = { data: null, loading: false, error: err.message };
    cache.set(key, { error: err.message, timestamp: Date.now(), data: null });
    return result;
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
    getAll: async (): Promise<ApiResult<Order[]>> => cachedFetch<Order[]>("orders", () => apiFetch<Order[]>("/orders")),
    add: async (o: Omit<Order, "id" | "createdAt" | "status">): Promise<ApiResult<Order>> => {
      try {
        const result = await apiFetch<Order>("/orders", {
          method: "POST",
          body: JSON.stringify(o),
        });
        cache.delete("orders");
        return { data: result, loading: false, error: null };
      } catch (error) {
        return makeErrorResult(error as Error);
      }
    },
    updateStatus: async (id: string, status: Order["status"]): Promise<ApiResult<void>> => {
      try {
        await apiFetch(`/orders/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ status }),
        });
        cache.delete("orders");
        return { data: null, loading: false, error: null };
      } catch (error) {
        return makeErrorResult(error as Error);
      }
    },
    delete: async (id: string): Promise<ApiResult<void>> => {
      try {
        await apiFetch(`/orders/${id}`, { method: "DELETE" });
        cache.delete("orders");
        return { data: null, loading: false, error: null };
      } catch (error) {
        return makeErrorResult(error as Error);
      }
    },
  },
  leads: {
    getAll: async (): Promise<ApiResult<Lead[]>> => cachedFetch<Lead[]>("leads", () => apiFetch<Lead[]>("/leads")),
    add: async (l: Omit<Lead, "id" | "createdAt">): Promise<ApiResult<Lead>> => {
      try {
        const result = await apiFetch<Lead>("/leads", {
          method: "POST",
          body: JSON.stringify(l),
        });
        cache.delete("leads");
        return { data: result, loading: false, error: null };
      } catch (error) {
        return makeErrorResult(error as Error);
      }
    },
    delete: async (id: string): Promise<ApiResult<void>> => {
      try {
        await apiFetch(`/leads/${id}`, { method: "DELETE" });
        cache.delete("leads");
        return { data: null, loading: false, error: null };
      } catch (error) {
        return makeErrorResult(error as Error);
      }
    },
  },
  news: {
    getAll: async (): Promise<ApiResult<NewsItem[]>> => cachedFetch<NewsItem[]>("news", () => apiFetch<NewsItem[]>("/news")),
    add: async (n: Omit<NewsItem, "id" | "timestamp">): Promise<ApiResult<NewsItem>> => {
      const result = await apiFetch<NewsItem>("/news", {
        method: "POST",
        body: JSON.stringify(n),
      });
      if (!result.error) cache.delete("news");
      return result;
    },
    update: async (id: string, data: Partial<NewsItem>): Promise<ApiResult<void>> => {
      const result = await apiFetch(`/news/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!result.error) cache.delete("news");
      return result;
    },
    delete: async (id: string): Promise<ApiResult<void>> => {
      const result = await apiFetch(`/news/${id}`, { method: "DELETE" });
      if (!result.error) cache.delete("news");
      return result;
    },
  },
  media: {
    getAll: async (): Promise<ApiResult<MediaItem[]>> => cachedFetch<MediaItem[]>("media", () => apiFetch<MediaItem[]>("/media")),
    add: async (m: Omit<MediaItem, "id" | "timestamp">): Promise<ApiResult<MediaItem>> => {
      try {
        const result = await apiFetch<MediaItem>("/media", {
          method: "POST",
          body: JSON.stringify(m),
        });
        cache.delete("media");
        return { data: result, loading: false, error: null };
      } catch (error) {
        return resultFrom(error as Error);
      }
    },
    delete: async (id: number): Promise<ApiResult<void>> => {
      try {
        await apiFetch(`/media/${id}`, { method: "DELETE" });
        cache.delete("media");
        return { data: null, loading: false, error: null };
      } catch (error) {
        return resultFrom(error as Error);
      }
    },
  },
  services: {
    getAll: async (): Promise<ApiResult<Service[]>> => cachedFetch<Service[]>("services", () => apiFetch<Service[]>("/services")),
    update: async (platform: string, data: Partial<Service>[]): Promise<ApiResult<void>> => {
      try {
        await apiFetch(`/services/${platform}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        cache.delete("services");
        return { data: null, loading: false, error: null };
      } catch (error) {
        return resultFrom(error as Error);
      }
    },
  },
  clientPortals: {
    getAll: async (): Promise<ApiResult<ClientPortal[]>> => cachedFetch<ClientPortal[]>("client_portals", () => apiFetch<ClientPortal[]>("/client-portals")),
    add: async (p: Omit<ClientPortal, "id" | "createdAt"> & { password?: string }): Promise<ApiResult<ClientPortal>> => {
      try {
        const result = await apiFetch<ClientPortal>("/client-portals", {
          method: "POST",
          body: JSON.stringify(p),
        });
        cache.delete("client_portals");
        return { data: result, loading: false, error: null };
      } catch (error) {
        return resultFrom(error as Error);
      }
    },
    update: async (id: string, data: Partial<ClientPortal>): Promise<ApiResult<ClientPortal>> => {
      try {
        const result = await apiFetch<ClientPortal>(`/client-portals/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        cache.delete("client_portals");
        return { data: result, loading: false, error: null };
      } catch (error) {
        return resultFrom(error as Error);
      }
    },
    delete: async (id: string): Promise<ApiResult<void>> => {
      try {
        await apiFetch(`/client-portals/${id}`, { method: "DELETE" });
        cache.delete("client_portals");
        return { data: null, loading: false, error: null };
      } catch (error) {
        return resultFrom(error as Error);
      }
    },
    login: async (username: string, password: string): Promise<ApiResult<ClientPortal | null>> => {
      try {
        const result = await apiFetch<ClientPortal>("/client-portals/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
        });
        return { data: result, loading: false, error: null };
      } catch (error) {
        return { data: null, loading: false, error: (error as Error).message };
      }
    },
  },
  progressArticles: {
    getByClient: async (clientId: number): Promise<ApiResult<ProgressArticle[]>> => cachedFetch<ProgressArticle[]>(`progress_articles_${clientId}`, () => apiFetch<ProgressArticle[]>(`/progress-articles?clientId=${clientId}`)),
    add: async (a: Omit<ProgressArticle, "id" | "createdAt">): Promise<ApiResult<ProgressArticle>> => {
      try {
        const result = await apiFetch<ProgressArticle>("/progress-articles", {
          method: "POST",
          body: JSON.stringify(a),
        });
        cache.delete(`progress_articles_${a.clientId}`);
        return { data: result, loading: false, error: null };
      } catch (error) {
        return makeErrorResult(error as Error);
      }
    },
    delete: async (id: number, clientId: number): Promise<ApiResult<void>> => {
      try {
        await apiFetch(`/progress-articles/${id}`, { method: "DELETE" });
        cache.delete(`progress_articles_${clientId}`);
        return { data: null, loading: false, error: null };
      } catch (error) {
        return makeErrorResult(error as Error);
      }
    },
  },
  platformConfigs: {
    getAll: async (): Promise<ApiResult<PlatformConfig[]>> => cachedFetch<PlatformConfig[]>("platform_configs", () => apiFetch<PlatformConfig[]>("/platform-configs")),
    update: async (key: string, data: Partial<PlatformConfig>): Promise<ApiResult<void>> => {
      try {
        await apiFetch(`/platform-configs/${key}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        cache.delete("platform_configs");
        return { data: null, loading: false, error: null };
      } catch (error) {
        return makeErrorResult(error as Error);
      }
    },
  },
};


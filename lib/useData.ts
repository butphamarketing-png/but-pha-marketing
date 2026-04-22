import { useRealtime } from "./useRealtime";

export interface ApiResult<T> {
  data: T | null;
  error: string | null;
}

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

export interface ServiceProcessStep {
  step: number;
  title: string;
  desc: string;
}

export interface ServiceFeedback {
  clientName: string;
  avatar: string;
  content: string;
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
  process: ServiceProcessStep[];
  feedbacks: ServiceFeedback[];
}

export interface PortalReport {
  id?: number;
  date?: string;
  title?: string;
  content: string;
  category?: string;
  image?: string;
}

export interface ProgressArticle {
  id: number;
  clientId: number;
  title: string;
  content: string;
  status: string;
  image?: string;
  createdAt: string;
}

// Extended project data stored in weeklyReports
export interface ClientProject {
  id: string;
  title: string;
  registeredAt: string;
  deadlineAt: string;
  budgetVnd: number;
  // Thông tin dự án (rich text)
  infoDoc: string;
  // Tiến độ dự án (rich text)
  progressDoc: string;
  // Báo cáo dự án (rich text)
  resultDoc: string;
}

export interface ClientReview {
  id: string;
  clientId: number;
  clientName: string;
  logoUrl?: string;
  rating: number; // 1-5
  content: string;
  createdAt: string;
}

export interface ClientPortal {
  id: number;
  username: string;
  clientName: string;
  phone: string;
  platform: string;
  daysRemaining?: number;
  postsCount?: number;
  progressPercent?: number;
  weeklyReports?: PortalReport[];
  createdAt: string;
  password?: string;
  // Extended fields
  email?: string;
  address?: string;
  businessName?: string;
  platformLink?: string;
  tickerText?: string; // chữ chạy ngang thông báo
}

const API_URL = "/api";
const CACHE_TTL = 10_000;
const cache = new Map<string, { data: unknown; error: string | null; timestamp: number }>();

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown error";
}

function toNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" ? value : fallback;
}

function toStringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toOptionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function mapOrder(value: unknown): Order {
  const item = isRecord(value) ? value : {};
  return {
    id: toNumber(item.id),
    name: toStringValue(item.name),
    phone: toStringValue(item.phone),
    pkg: toStringValue(item.pkg),
    tabLabel: toStringValue(item.tabLabel ?? item.tab_label),
    platform: toStringValue(item.platform),
    duration: toNumber(item.duration),
    total: toNumber(item.total),
    payMethod: toStringValue(item.payMethod ?? item.pay_method),
    status: (toStringValue(item.status, "pending") as Order["status"]),
    createdAt: toStringValue(item.createdAt ?? item.created_at),
  };
}

function mapLead(value: unknown): Lead {
  const item = isRecord(value) ? value : {};
  return {
    id: toNumber(item.id),
    type: toStringValue(item.type, "contact") as Lead["type"],
    name: typeof item.name === "string" ? item.name : undefined,
    phone: toStringValue(item.phone),
    service: typeof item.service === "string" ? item.service : undefined,
    note: typeof item.note === "string" ? item.note : undefined,
    platform: typeof item.platform === "string" ? item.platform : undefined,
    url: typeof item.url === "string" ? item.url : undefined,
    createdAt: toStringValue(item.createdAt ?? item.created_at),
  };
}

function mapNewsItem(value: unknown): NewsItem {
  const item = isRecord(value) ? value : {};
  return {
    id: toStringValue(item.id),
    title: toStringValue(item.title),
    content: toStringValue(item.content),
    category: toStringValue(item.category, "blog"),
    published: typeof item.published === "boolean" ? item.published : true,
    timestamp: toNumber(item.timestamp),
    description: toOptionalString(item.description),
    imageUrl: toOptionalString(item.imageUrl) ?? toOptionalString(item.image_url),
    slug: toOptionalString(item.slug),
    hot: typeof item.hot === "boolean" ? item.hot : undefined,
    metaDescription:
      toOptionalString(item.metaDescription) ?? toOptionalString(item.meta_description),
    keywordsMain:
      toOptionalString(item.keywordsMain) ?? toOptionalString(item.keywords_main),
    keywordsSecondary:
      toOptionalString(item.keywordsSecondary) ?? toOptionalString(item.keywords_secondary),
    publishedAt:
      toOptionalString(item.publishedAt) ?? toOptionalString(item.published_at),
  };
}

function mapMediaItem(value: unknown): MediaItem {
  const item = isRecord(value) ? value : {};
  return {
    id: toNumber(item.id),
    url: toStringValue(item.url),
    name: toStringValue(item.name),
    type: toStringValue(item.type, "image") as MediaItem["type"],
    timestamp: toNumber(item.timestamp),
  };
}

function mapServiceProcess(value: unknown): ServiceProcessStep {
  const item = isRecord(value) ? value : {};
  return {
    step: toNumber(item.step),
    title: toStringValue(item.title),
    desc: toStringValue(item.desc),
  };
}

function mapServiceFeedback(value: unknown): ServiceFeedback {
  const item = isRecord(value) ? value : {};
  return {
    clientName: toStringValue(item.clientName),
    avatar: toStringValue(item.avatar),
    content: toStringValue(item.content),
  };
}

function mapService(value: unknown): Service {
  const item = isRecord(value) ? value : {};
  return {
    id: toNumber(item.id),
    platform: toStringValue(item.platform),
    name: toStringValue(item.name),
    price: toStringValue(item.price),
    period: toStringValue(item.period, "month") as Service["period"],
    popular: typeof item.popular === "boolean" ? item.popular : false,
    features: toStringArray(item.features),
    allFeatures: toStringArray(item.allFeatures ?? item.all_features),
    audioText: toStringValue(item.audioText ?? item.audio_text),
    process: Array.isArray(item.process) ? item.process.map(mapServiceProcess) : [],
    feedbacks: Array.isArray(item.feedbacks) ? item.feedbacks.map(mapServiceFeedback) : [],
  };
}

function mapPortalReport(value: unknown): PortalReport {
  const item = isRecord(value) ? value : {};
  return {
    id: typeof item.id === "number" ? item.id : undefined,
    date: typeof item.date === "string" ? item.date : undefined,
    title: typeof item.title === "string" ? item.title : undefined,
    content: toStringValue(item.content),
    category: typeof item.category === "string" ? item.category : undefined,
    image: typeof item.image === "string" ? item.image : undefined,
  };
}

function mapClientPortal(value: unknown): ClientPortal {
  const item = isRecord(value) ? value : {};
  return {
    id: toNumber(item.id),
    username: toStringValue(item.username),
    clientName: toStringValue(item.clientName ?? item.client_name),
    phone: toStringValue(item.phone),
    platform: toStringValue(item.platform),
    daysRemaining:
      typeof item.daysRemaining === "number"
        ? item.daysRemaining
        : typeof item.days_remaining === "number"
          ? item.days_remaining
          : undefined,
    postsCount:
      typeof item.postsCount === "number"
        ? item.postsCount
        : typeof item.posts_count === "number"
          ? item.posts_count
          : undefined,
    progressPercent:
      typeof item.progressPercent === "number"
        ? item.progressPercent
        : typeof item.progress_percent === "number"
          ? item.progress_percent
          : undefined,
    weeklyReports: Array.isArray(item.weeklyReports ?? item.weekly_reports)
      ? ((item.weeklyReports ?? item.weekly_reports) as unknown[]).map(mapPortalReport)
      : undefined,
    createdAt: toStringValue(item.createdAt ?? item.created_at),
    password: typeof item.password === "string" ? item.password : undefined,
    email: typeof item.email === "string" ? item.email : undefined,
    address: typeof item.address === "string" ? item.address : undefined,
    businessName:
      typeof item.businessName === "string"
        ? item.businessName
        : typeof item.business_name === "string"
          ? item.business_name
          : undefined,
    platformLink:
      typeof item.platformLink === "string"
        ? item.platformLink
        : typeof item.platform_link === "string"
          ? item.platform_link
          : undefined,
    tickerText:
      typeof item.tickerText === "string"
        ? item.tickerText
        : typeof item.ticker_text === "string"
          ? item.ticker_text
          : undefined,
  };
}

function mapProgressArticle(value: unknown): ProgressArticle {
  const item = isRecord(value) ? value : {};
  return {
    id: toNumber(item.id),
    clientId: toNumber(item.clientId ?? item.client_id),
    title: toStringValue(item.title),
    content: toStringValue(item.content),
    status: toStringValue(item.status, ""),
    image: typeof item.image === "string" ? item.image : undefined,
    createdAt: toStringValue(item.createdAt ?? item.created_at),
  };
}

function mapClientReview(value: unknown): ClientReview {
  const item = isRecord(value) ? value : {};
  const rawNote = toStringValue(item.note);
  let parsedNote: Record<string, unknown> = {};
  try {
    const maybe = rawNote ? JSON.parse(rawNote) : null;
    if (isRecord(maybe)) parsedNote = maybe;
  } catch {
    parsedNote = {};
  }

  return {
    id: toStringValue(item.id),
    clientId: toNumber(item.clientId ?? item.client_id ?? parsedNote.clientId),
    clientName: toStringValue(item.clientName ?? item.client_name ?? parsedNote.clientName ?? item.name),
    logoUrl: typeof (item.logoUrl ?? parsedNote.logoUrl) === "string" ? (item.logoUrl ?? parsedNote.logoUrl) as string : undefined,
    rating: toNumber(item.rating ?? parsedNote.rating, 5),
    content: toStringValue(item.content ?? parsedNote.content ?? item.note),
    createdAt: toStringValue(item.createdAt ?? item.created_at),
  };
}

function normalizeArray<T>(value: unknown, mapper: (item: unknown) => T): T[] {
  return Array.isArray(value) ? value.map(mapper) : [];
}

async function apiFetch<T>(path: string, options?: RequestInit, mapper?: (value: unknown) => T): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    });
    const text = await res.text();

    let parsed: unknown = null;
    try {
      parsed = text ? (JSON.parse(text) as JsonValue) : null;
    } catch {
      return {
        data: null,
        error: `Invalid JSON response (${res.status})`,
      };
    }

    if (!res.ok) {
      const errorMessage =
        isRecord(parsed) && typeof parsed.error === "string"
          ? parsed.error
          : isRecord(parsed) && typeof parsed.message === "string"
            ? parsed.message
            : `API Error ${res.status}`;
      return { data: null, error: errorMessage };
    }

    const data = mapper ? mapper(parsed) : (parsed as T);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}

async function cachedFetch<T>(key: string, fetchFn: () => Promise<ApiResult<T>>): Promise<ApiResult<T>> {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return {
      data: (cached.data as T) ?? null,
      error: cached.error,
    };
  }

  const result = await fetchFn();
  cache.set(key, {
    data: result.data,
    error: result.error,
    timestamp: Date.now(),
  });
  return result;
}

function invalidateCache(...keys: string[]) {
  keys.forEach((key) => cache.delete(key));
}

export const db = {
  orders: {
    getAll: (): Promise<ApiResult<Order[]>> =>
      cachedFetch("orders", () => apiFetch<Order[]>("/orders", undefined, (value) => normalizeArray(value, mapOrder))),
    add: async (order: Omit<Order, "id" | "createdAt" | "status">): Promise<ApiResult<Order>> => {
      const result = await apiFetch<Order>("/orders", {
        method: "POST",
        body: JSON.stringify(order),
      }, mapOrder);
      if (!result.error) invalidateCache("orders");
      return result;
    },
    updateStatus: async (id: string, status: Order["status"]): Promise<ApiResult<void>> => {
      const result = await apiFetch<JsonObject>(`/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (!result.error) invalidateCache("orders");
      return { data: null, error: result.error };
    },
    delete: async (id: string): Promise<ApiResult<void>> => {
      const result = await apiFetch<JsonObject>(`/orders/${id}`, { method: "DELETE" });
      if (!result.error) invalidateCache("orders");
      return { data: null, error: result.error };
    },
  },
  leads: {
    getAll: (): Promise<ApiResult<Lead[]>> =>
      cachedFetch("leads", () => apiFetch<Lead[]>("/leads", undefined, (value) => normalizeArray(value, mapLead))),
    add: async (lead: Omit<Lead, "id" | "createdAt">): Promise<ApiResult<Lead>> => {
      const result = await apiFetch<Lead>("/leads", {
        method: "POST",
        body: JSON.stringify(lead),
      }, mapLead);
      if (!result.error) invalidateCache("leads");
      return result;
    },
    delete: async (id: string): Promise<ApiResult<void>> => {
      const result = await apiFetch<JsonObject>(`/leads/${id}`, { method: "DELETE" });
      if (!result.error) invalidateCache("leads");
      return { data: null, error: result.error };
    },
  },
  news: {
    getAll: (): Promise<ApiResult<NewsItem[]>> =>
      cachedFetch("news", () => apiFetch<NewsItem[]>("/news", undefined, (value) => normalizeArray(value, mapNewsItem))),
    add: async (item: Omit<NewsItem, "id" | "timestamp">): Promise<ApiResult<NewsItem>> => {
      const result = await apiFetch<NewsItem>("/news", {
        method: "POST",
        body: JSON.stringify(item),
      }, mapNewsItem);
      if (!result.error) invalidateCache("news");
      return result;
    },
    update: async (id: string, data: Partial<NewsItem>): Promise<ApiResult<void>> => {
      const result = await apiFetch<JsonObject>(`/news/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!result.error) invalidateCache("news");
      return { data: null, error: result.error };
    },
    delete: async (id: string): Promise<ApiResult<void>> => {
      const result = await apiFetch<JsonObject>(`/news/${id}`, { method: "DELETE" });
      if (!result.error) invalidateCache("news");
      return { data: null, error: result.error };
    },
  },
  media: {
    getAll: (): Promise<ApiResult<MediaItem[]>> =>
      cachedFetch("media", () => apiFetch<MediaItem[]>("/media", undefined, (value) => normalizeArray(value, mapMediaItem))),
  },
  services: {
    getAll: (): Promise<ApiResult<Service[]>> =>
      cachedFetch("services", () => apiFetch<Service[]>("/services", undefined, (value) => normalizeArray(value, mapService))),
  },
  clientPortals: {
    getAll: (): Promise<ApiResult<ClientPortal[]>> =>
      cachedFetch("client_portals", () =>
        apiFetch<ClientPortal[]>("/client-portals", undefined, (value) => normalizeArray(value, mapClientPortal)),
      ),
    get: (id: number): Promise<ApiResult<ClientPortal>> =>
      apiFetch<ClientPortal>(`/client-portals/${id}`, undefined, mapClientPortal),
    add: async (
      portal: Omit<ClientPortal, "id" | "createdAt"> & { password?: string },
    ): Promise<ApiResult<ClientPortal>> => {
      const result = await apiFetch<ClientPortal>("/client-portals", {
        method: "POST",
        body: JSON.stringify(portal),
      }, mapClientPortal);
      if (!result.error) invalidateCache("client_portals");
      return result;
    },
    update: async (id: string, data: Partial<ClientPortal>): Promise<ApiResult<ClientPortal>> => {
      const result = await apiFetch<ClientPortal>(`/client-portals/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }, mapClientPortal);
      if (!result.error) invalidateCache("client_portals");
      return result;
    },
    delete: async (id: string): Promise<ApiResult<void>> => {
      const result = await apiFetch<JsonObject>(`/client-portals/${id}`, { method: "DELETE" });
      if (!result.error) invalidateCache("client_portals");
      return { data: null, error: result.error };
    },
    login: (username: string, password: string, platform: string): Promise<ApiResult<ClientPortal>> =>
      apiFetch<ClientPortal>("/client-portals/login", {
        method: "POST",
        body: JSON.stringify({ username, password, platform }),
      }, mapClientPortal),
  },
  progressArticles: {
    getByClient: (clientId: number): Promise<ApiResult<ProgressArticle[]>> =>
      cachedFetch(`progress_articles_${clientId}`, () =>
        apiFetch<ProgressArticle[]>(
          `/progress-articles?clientId=${clientId}`,
          undefined,
          (value) => normalizeArray(value, mapProgressArticle),
        ),
      ),
    add: async (
      article: Omit<ProgressArticle, "id" | "createdAt">,
    ): Promise<ApiResult<ProgressArticle>> => {
      const result = await apiFetch<ProgressArticle>("/progress-articles", {
        method: "POST",
        body: JSON.stringify(article),
      }, mapProgressArticle);
      if (!result.error) invalidateCache(`progress_articles_${article.clientId}`);
      return result;
    },
    delete: async (id: number, clientId: number): Promise<ApiResult<void>> => {
      const result = await apiFetch<JsonObject>(`/progress-articles/${id}`, { method: "DELETE" });
      if (!result.error) invalidateCache(`progress_articles_${clientId}`);
      return { data: null, error: result.error };
    },
  },
  // Client reviews stored in leads table with type="review"
  clientReviews: {
    getAll: (): Promise<ApiResult<ClientReview[]>> =>
      cachedFetch("client_reviews", () =>
        apiFetch<ClientReview[]>("/leads?type=review", undefined, (value) => normalizeArray(value, mapClientReview)),
      ),
    add: async (review: Omit<ClientReview, "id" | "createdAt">): Promise<ApiResult<Lead>> => {
      const result = await apiFetch<Lead>("/leads", {
        method: "POST",
        body: JSON.stringify({
          type: "review",
          name: review.clientName,
          phone: "",
          note: review.content,
          clientId: review.clientId,
          clientName: review.clientName,
          logoUrl: review.logoUrl,
          rating: review.rating,
          content: review.content,
        }),
      }, mapLead);
      if (!result.error) invalidateCache("client_reviews");
      return result;
    },
    delete: async (id: string): Promise<ApiResult<void>> => {
      const result = await apiFetch<JsonObject>(`/leads/${id}`, { method: "DELETE" });
      if (!result.error) invalidateCache("client_reviews");
      return { data: null, error: result.error };
    },
  },
};

export { useRealtime };

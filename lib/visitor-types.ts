export type VisitorRiskLevel = "normal" | "watch" | "alert";

export type VisitorSession = {
  id: string;
  ip: string;
  userAgent: string;
  firstSeenAt: string;
  lastSeenAt: string;
  hits: number;
  paths: string[];
  city: string | null;
  region: string | null;
  country: string | null;
  countryCode: string | null;
  riskScore: number;
  riskLevel: VisitorRiskLevel;
  riskFlags: string[];
  linkedLeadPhone: string | null;
  linkedLeadName: string | null;
  lastAlertedAt: string | null;
};

export type VisitorGeo = {
  city: string | null;
  region: string | null;
  country: string | null;
  countryCode: string | null;
};

export type VisitorRiskResult = {
  score: number;
  level: VisitorRiskLevel;
  flags: string[];
};

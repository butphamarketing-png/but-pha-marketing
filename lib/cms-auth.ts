import {
  createAdminSessionToken,
  getAdminAuthConfig,
  validateAdminLogin,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

export type CmsUser = {
  id: number;
  email: string;
  fullName: string;
  role: string;
  status: string;
};

export async function authenticateCmsLogin(email: string, password: string): Promise<CmsUser | null> {
  if (!(await validateAdminLogin(email, password))) {
    return null;
  }
  const config = await getAdminAuthConfig();
  return {
    id: 1,
    email: config.email,
    fullName: "Administrator",
    role: "Admin",
    status: "active",
  };
}

export function createCmsSessionToken(): string {
  return createAdminSessionToken();
}

export async function getCmsUserFromToken(token: string | null | undefined): Promise<CmsUser | null> {
  if (!verifyAdminSessionToken(token)) {
    return null;
  }
  const config = await getAdminAuthConfig();
  return {
    id: 1,
    email: config.email,
    fullName: "Administrator",
    role: "Admin",
    status: "active",
  };
}

import {
  db,
  servicesTable,
} from "@/lib/cms-internal/db";
import { eq, and } from "drizzle-orm";
import {
  PLATFORM_SERVICES,
  type CustomerPlatform,
} from "@/lib/customer-records";

const PLATFORM_TYPE: Record<CustomerPlatform, string> = {
  website: "Website",
  facebook: "Facebook",
  googlemaps: "Maps",
};

export function serviceTypeForPlatform(platform: string): string {
  if (platform === "website" || platform === "facebook" || platform === "googlemaps") {
    return PLATFORM_TYPE[platform];
  }
  return "Khác";
}

export function serviceNameFor(platform: string, serviceKey: string): string {
  const group = PLATFORM_SERVICES[platform as CustomerPlatform];
  const match = group?.find((item) => item.key === serviceKey);
  return match?.label ?? serviceKey;
}

export async function resolveServiceId(
  platform: string,
  serviceKey: string,
): Promise<number | null> {
  if (!platform || !serviceKey) return null;

  const type = serviceTypeForPlatform(platform);
  const name = serviceNameFor(platform, serviceKey);
  const serviceKeyRef = `${platform}:${serviceKey}`;

  const [existing] = await db
    .select()
    .from(servicesTable)
    .where(and(eq(servicesTable.type, type), eq(servicesTable.name, name)))
    .limit(1);

  if (existing) return existing.id;

  const [created] = await db
    .insert(servicesTable)
    .values({
      name,
      type,
      description: `marketing:${serviceKeyRef}`,
    })
    .returning();

  return created.id;
}

export async function seedErpServicesFromMarketing(): Promise<{ created: number; total: number }> {
  let created = 0;
  let total = 0;

  for (const [platform, services] of Object.entries(PLATFORM_SERVICES)) {
    for (const svc of services) {
      total += 1;
      const before = await db.select().from(servicesTable).where(
        and(
          eq(servicesTable.type, serviceTypeForPlatform(platform)),
          eq(servicesTable.name, svc.label),
        ),
      ).limit(1);

      if (before.length === 0) {
        await db.insert(servicesTable).values({
          name: svc.label,
          type: serviceTypeForPlatform(platform),
          description: `marketing:${platform}:${svc.key}`,
        });
        created += 1;
      }
    }
  }

  return { created, total };
}

import { pgTable, text, serial, timestamp, integer, numeric } from "drizzle-orm/pg-core";
import { erpSchema } from "./erp-schema";
import { customersTable } from "./customers";

export const googleProfilesTable = erpSchema.table("google_profiles", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull().references(() => customersTable.id, { onDelete: "cascade" }),
  businessName: text("business_name").notNull(),
  mapLink: text("map_link"),
  placeId: text("place_id"),
  category: text("category"),
  reviewCount: integer("review_count"),
  rating: numeric("rating", { precision: 3, scale: 1 }),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type GoogleProfile = typeof googleProfilesTable.$inferSelect;

import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const donors = pgTable("donors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  bloodGroup: text("blood_group").notNull(),
  phone: text("phone").notNull(),
  addedAt: timestamp("added_at").notNull().defaultNow(),
});

export const insertDonorSchema = createInsertSchema(donors).omit({
  id: true,
  addedAt: true,
}).extend({
  name: z.string().min(1, "Name is required"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export type InsertDonor = z.infer<typeof insertDonorSchema>;
export type Donor = typeof donors.$inferSelect;

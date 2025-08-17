import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const clinicalTrials = pgTable("clinical_trials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  diseaseArea: text("disease_area").notNull(),
  phase: text("phase").notNull(),
  recruitmentStatus: text("recruitment_status").notNull(),
  primarySite: text("primary_site").notNull(),
  description: text("description"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertClinicalTrialSchema = createInsertSchema(clinicalTrials).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertClinicalTrial = z.infer<typeof insertClinicalTrialSchema>;
export type ClinicalTrial = typeof clinicalTrials.$inferSelect;

import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users.model.js";

export const urlTable = pgTable("urls", {
  id: uuid().primaryKey().defaultRandom(),

  shortCode: varchar("code", { length: 155 }).notNull(),
  targetUrl: text("target_url").notNull(),

  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .default()
    .$onUpdate(() => new Date()),
});

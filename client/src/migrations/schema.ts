import { pgTable, varchar } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const locations = pgTable("locations", {
	locationId: varchar("location_id", { length: 6 }).primaryKey().notNull(),
	prefecture: varchar("prefecture", { length: 4 }).notNull(),
	city: varchar("city", { length: 12 }).notNull(),
});
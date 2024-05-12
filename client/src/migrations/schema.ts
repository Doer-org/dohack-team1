import { pgTable, varchar, uuid, text, foreignKey, integer } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const locations = pgTable("locations", {
	locationId: varchar("location_id", { length: 6 }).primaryKey().notNull(),
	prefecture: varchar("prefecture", { length: 4 }).notNull(),
	city: varchar("city", { length: 12 }).notNull(),
});

export const posts = pgTable("posts", {
	postId: uuid("post_id").primaryKey().notNull(),
	contents: text("contents").notNull(),
});

export const reactions = pgTable("reactions", {
	reactionId: uuid("reaction_id").primaryKey().notNull(),
	postId: uuid("post_id").notNull().references(() => posts.postId),
	kind: varchar("kind", { length: 10 }).notNull(),
	x: integer("x").notNull(),
	y: integer("y").notNull(),
	theta: integer("theta").notNull(),
	scale: integer("scale").notNull(),
});
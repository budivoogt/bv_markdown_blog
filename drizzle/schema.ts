import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const posts = sqliteTable("posts", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	description: text("title").notNull(),
	body: text("body").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s','now'))`),
	authorId: integer("author_id").references(() => users.id)
})

export const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	firstName: text("first_name"),
	lastName: text("last_name)"),
	email: text("email"),
	emailVerified: integer("email_verified", { mode: "boolean" }).default(false)
})

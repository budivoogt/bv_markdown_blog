import { relations, sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	firstName: text("first_name"),
	lastName: text("last_name)"),
	email: text("email"),
	emailVerified: integer("email_verified", { mode: "boolean" }).default(false)
})

// One user can write many posts
export const userRelations = relations(users, ({ many }) => ({
	posts: many(posts)
}))

export const posts = sqliteTable("posts", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	description: text("description").notNull(),
	body: text("body").notNull(),
	slug: text("slug").unique().notNull(),
	tags: text("tags"),
	createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s','now'))`),
	updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s','now'))`),
	authorId: integer("author_id").references(() => users.id) // authorId is linked to userId and this database constraint is checked on every insert/update/delete action
})

// A post only has one author
export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id]
	})
}))

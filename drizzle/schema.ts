import { relations } from "drizzle-orm"
import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	firstName: text("first_name"),
	lastName: text("last_name)"),
	email: text("email"),
	emailVerified: boolean("email_verified").default(false)
})

// One user can write many posts
export const userRelations = relations(users, ({ many }) => ({
	posts: many(posts)
}))

export const posts = pgTable("posts", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	body: text("body").notNull(),
	slug: text("slug").unique().notNull(),
	tags: text("tags"),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
	authorId: integer("author_id").references(() => users.id) // authorId is linked to userId and this database constraint is checked on every insert/update/delete action
})

// A post only has one author
export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id]
	})
}))

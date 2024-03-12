import { relations } from "drizzle-orm"
import { boolean, integer, pgTable, primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core"

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
	status: text("status").default("draft"),
	slug: text("slug").unique().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow(),
	authorId: integer("author_id").references(() => users.id) // authorId is linked to userId and this database constraint is checked on every insert/update/delete action
})

export const postsRelations = relations(posts, ({ one, many }) => ({
	// A has one author
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id]
	}),
	// A post can have many tags
	tags: many(tags)
}))

export const tags = pgTable("tags", {
	id: serial("id").primaryKey(),
	name: text("name").unique().notNull()
})

// A tag can be associated with many posts
export const tagRelations = relations(tags, ({ many }) => ({
	tagsToPosts: many(tagsToPosts)
}))

export const tagsToPosts = pgTable(
	"tags_to_posts",
	{
		tagId: integer("tag_id")
			.notNull()
			.references(() => tags.id),
		postId: integer("post_id")
			.notNull()
			.references(() => posts.id)
	},
	(t) => ({
		pk: primaryKey({ columns: [t.tagId, t.postId] })
	})
)

// Join tags and posts for a many-to-many relationship.
export const tagsToPostsRelations = relations(tagsToPosts, ({ one }) => ({
	post: one(posts, {
		fields: [tagsToPosts.postId],
		references: [posts.id]
	}),
	tag: one(tags, {
		fields: [tagsToPosts.tagId],
		references: [tags.id]
	})
}))

export type Post = typeof posts.$inferSelect
export type Tag = typeof tags.$inferSelect

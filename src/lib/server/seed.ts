// seed.ts
import { posts, users } from "../../../drizzle/schema"
import db from "./database"

const userSeeds = {
	user1: {
		id: 1,
		firstName: "John",
		lastName: "Doe",
		email: "john@example.com",
		emailVerified: true
	},
	user2: {
		id: 2,
		firstName: "Jane",
		lastName: "Doe",
		email: "jane@example.com",
		emailVerified: true
	},
	user3: {
		id: 3,
		firstName: "Alice",
		lastName: "Smith",
		email: "alice@example.com",
		emailVerified: true
	},
	user4: {
		id: 4,
		firstName: "Bob",
		lastName: "Johnson",
		email: "bob@example.com",
		emailVerified: true
	},
	user5: {
		id: 5,
		firstName: "Emily",
		lastName: "Davis",
		email: "emily@example.com",
		emailVerified: true
	},
	user6: {
		id: 6,
		firstName: "Michael",
		lastName: "Wilson",
		email: "michael@example.com",
		emailVerified: true
	}
}

const postSeeds = {
	post1: {
		id: 10,
		title: "First post",
		description: "This is the first post",
		body: "Lorem ipsum...",
		slug: "first-post",
		tags: "tag1,tag2",
		authorId: userSeeds.user1.id
	},
	post2: {
		id: 11,
		title: "Second post",
		description: "This is the second post",
		body: "Lorem ipsum...",
		slug: "second-post",
		tags: "tag1,tag2",
		authorId: userSeeds.user2.id
	},
	post3: {
		id: 12,
		title: "Third post",
		description: "This is the third post",
		body: "Lorem ipsum...",
		slug: "third-post",
		tags: "tag1,tag2",
		authorId: userSeeds.user3.id
	},
	post4: {
		id: 13,
		title: "Fourth post",
		description: "This is the fourth post",
		body: "Lorem ipsum...",
		slug: "fourth-post",
		tags: "tag1,tag2",
		authorId: userSeeds.user4.id
	},
	post5: {
		id: 14,
		title: "Fifth post",
		description: "This is the fifth post",
		body: "Lorem ipsum...",
		slug: "fifth-post",
		tags: "tag1,tag2",
		authorId: userSeeds.user5.id
	},
	post6: {
		id: 15,
		title: "Sixth post",
		description: "This is the sixth post",
		body: "Lorem ipsum...",
		slug: "sixth-post",
		tags: "tag1,tag2",
		authorId: userSeeds.user6.id
	}
}

async function seed() {
	const database = db()

	await database.transaction(async (tx) => {
		await tx.insert(users).values(
			Object.values(userSeeds).map((user) => ({
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				emailVerified: user.emailVerified
			}))
		)

		await tx.insert(posts).values(
			Object.values(postSeeds).map((post) => ({
				id: post.id,
				title: post.title,
				description: post.description,
				body: post.body,
				slug: post.slug,
				tags: post.tags,
				authorId: post.authorId
			}))
		)
	})

	console.log("Database seeded!")
}

seed().catch(console.error)

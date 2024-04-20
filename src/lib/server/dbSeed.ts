import { posts, users } from "../schemas/drizzleSchema"
import db from "./db"
import { postSeeds, userSeeds } from "./dbSeedData"

// Writing another senseless commentzzz

async function seedDatabase() {
	const database = db()

	try {
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
	} catch (error) {
		console.error("Error occurred seeding", error)
		throw new Error()
	}
}

seedDatabase().catch(() => {
	process.exit(1)
})

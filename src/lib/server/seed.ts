import { posts, users } from "../../../drizzle/schema"
import db from "./database"
import { postSeeds, userSeeds } from "./seedData"

// Writing another senseless comment

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
		throw console.error("Erro occurred seeding", error)
	}
}

seedDatabase()

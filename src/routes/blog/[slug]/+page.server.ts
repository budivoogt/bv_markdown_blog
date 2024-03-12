import db from "$lib/server/database"
import { eq } from "drizzle-orm"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import * as schema from "../../../../drizzle/schema"
import { posts } from "../../../../drizzle/schema"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params

	const database: PostgresJsDatabase<typeof schema> = db()

	const post = await database.query.posts.findFirst({
		where: eq(posts.slug, slug)
	})

	return { post }
}

import { localClient } from "$lib/server/databases"
import { eq } from "drizzle-orm"
import { posts } from "../../../../drizzle/schema"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params

	const db = localClient()

	const post = await db.query.posts.findFirst({
		where: eq(posts.slug, slug)
	})

	return { post }
}

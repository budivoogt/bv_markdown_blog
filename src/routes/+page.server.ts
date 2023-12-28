import { tursoClient } from "$lib/server/turso"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
	const db = tursoClient()

	const posts = await db.query.posts.findMany()

	if (posts) {
		return { posts }
	} else {
		return { posts: [] }
	}
}

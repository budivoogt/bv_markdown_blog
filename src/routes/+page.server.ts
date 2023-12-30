import { localClient } from "$lib/server/databases"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
	const db = localClient()

	const posts = await db.query.posts.findMany()

	if (posts) {
		return { posts }
	} else {
		return { posts: [] }
	}
}
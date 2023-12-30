import { localClient } from "$lib/server/databases"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async () => {
	const db = localClient()

	const posts = await db.query.posts.findMany()

	if (posts) {
		return { rootLayoutServerLoad: "FYI", posts }
	} else {
		return { posts: [] }
	}
}

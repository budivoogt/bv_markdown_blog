import db from "$lib/server/database"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async () => {
	const database = db()

	const posts = await database.query.posts.findMany()

	if (posts) {
		return { rootLayoutServerLoad: "FYI", posts }
	} else {
		return { posts: [] }
	}
}

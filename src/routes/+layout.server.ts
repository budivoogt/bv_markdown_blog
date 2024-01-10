import db from "$lib/server/database"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	const database = db()

	const posts = await database.query.posts.findMany()

	// getSession is provided via locals through hooks.server.ts
	const session = await getSession()

	if (posts) {
		return { message: "FYI", posts, session }
	} else {
		return { posts: [] }
	}
}


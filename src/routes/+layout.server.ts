import { sortPostsDesc } from "$lib/helper"
import db from "$lib/server/database"
import type { Post, Tag } from "../../drizzle/schema"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	console.log("src/routes/+layout.server.ts load run")

	const database = db()
	const posts: Post[] = await database.query.posts.findMany()
	const tags: Tag[] = await database.query.tags.findMany()
	const postsSortedDesc = sortPostsDesc(posts)

	// getSession is provided via locals through hooks.server.ts
	const session = await getSession()

	if (posts) {
		return { message: "FYI", posts: postsSortedDesc, tags, session }
	} else {
		return { posts: [] }
	}
}

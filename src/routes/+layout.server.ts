import { sortPostsDesc } from "$lib/helper"
import db from "$lib/server/database"
import { eq } from "drizzle-orm"
import { posts, tagsToPosts, type Post, type Tag } from "../../drizzle/schema"
import type { LayoutServerLoad } from "./$types"
import type { PostTag } from "$lib/types/types"

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	console.log("src/routes/+layout.server.ts load run")

	const database = db()
	const postRows: Post[] = await database.query.posts.findMany()
	const tags: Tag[] = await database.query.tags.findMany()
	const postTags: PostTag[] = await database
		.select()
		.from(posts)
		.innerJoin(tagsToPosts, eq(posts.id, tagsToPosts.postId))
	console.log("postTags: ", postTags)

	const postsSortedDesc = sortPostsDesc(postRows)

	// getSession is provided via locals through hooks.server.ts
	const session = await getSession()

	if (postRows && postTags) {
		return { posts: postsSortedDesc, tags, session, postTags }
	} else {
		return { posts: [] }
	}
}

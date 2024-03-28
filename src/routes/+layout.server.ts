import { sortPostsDesc, tagsPerPost } from "$lib/client/postHelpers"
import db from "$lib/server/database"
import { eq, isNotNull } from "drizzle-orm"
import { posts, tags, tagsToPosts, type Post, type Tag } from "../../drizzle/schema"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals: { getSession, isBudiAuthenticated } }) => {
	const database = db()
	const postRows: Post[] = await database.query.posts.findMany()
	const tagRows: Tag[] = await database.query.tags.findMany()
	const postTags = await database
		.select({
			postId: tagsToPosts.postId,
			tagName: tags.name
		})
		.from(posts)
		.leftJoin(tagsToPosts, eq(tagsToPosts.postId, posts.id))
		.leftJoin(tags, eq(tags.id, tagsToPosts.tagId))
		.where(isNotNull(tags.name))
	const postTagRows = await tagsPerPost(postTags)

	const postsSortedDesc = sortPostsDesc(postRows)

	const session = await getSession()

	if (postRows) {
		return {
			posts: postsSortedDesc,
			tags: tagRows,
			postTags: postTagRows,
			session,
			isBudiAuthenticated
		}
	} else {
		return { posts: [] }
	}
}

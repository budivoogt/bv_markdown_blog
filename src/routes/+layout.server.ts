import { sortPostsDesc, tagsPerPost } from "$lib/helper"
import db from "$lib/server/database"
import type { User } from "@supabase/supabase-js"
import { redirect } from "@sveltejs/kit"
import { eq, isNotNull } from "drizzle-orm"
import { posts, tags, tagsToPosts, type Post, type Tag } from "../../drizzle/schema"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals: { getSession }, url }) => {
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
	let user: User | null

	if (session) {
		user = session.user
		if (
			(url.pathname.startsWith("/admin/") || url.pathname.startsWith("/api")) &&
			user.id !== "8d531343-a486-4070-a505-2d16c512ccf5" &&
			user.aud !== "authenticated"
		) {
			console.error("Path unauthorized")
			redirect(307, "/admin")
		}
	} else if (url.pathname.startsWith("/admin/") || url.pathname.startsWith("/api")) {
		console.error("Path unauthorized")
		redirect(307, "/admin")
	}

	if (postRows) {
		return { posts: postsSortedDesc, tags: tagRows, postTags: postTagRows, session }
	} else {
		return { posts: [] }
	}
}

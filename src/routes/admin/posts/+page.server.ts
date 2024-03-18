import db from "$lib/server/database"
import { error } from "@sveltejs/kit"
import { eq } from "drizzle-orm"
import { posts, tagsToPosts } from "../../../../drizzle/schema"
import type { Actions } from "./$types"

export const actions: Actions = {
	deletePost: async ({ locals: { getSession }, request }) => {
		const session = await getSession()
		if (!session) {
			throw error(403, "Not authorized")
		}

		const form = await request.formData()
		const postId = form.get("id")

		const database = db()

		const deletedTagsToPosts = await database
			.delete(tagsToPosts)
			.where(eq(tagsToPosts.postId, postId))
			.returning()

		const deletedPost = await database.delete(posts).where(eq(posts.id, postId)).returning()
		if (deletedPost || deletedTagsToPosts)
			console.log(
				"Deleted post IDs #",
				deletedPost[0].id,
				" deleted tag IDs #",
				deletedTagsToPosts.map((item) => item.tagId)
			)

		return { success: true, deletedPost: deletedPost[0] }
	}
}

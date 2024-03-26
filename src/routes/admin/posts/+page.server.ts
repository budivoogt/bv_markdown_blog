import db from "$lib/server/database"
import { deletePost } from "$lib/stores/serverPostStores"
import { error, fail, redirect } from "@sveltejs/kit"
import { eq } from "drizzle-orm"
import type { Post, TagToPost } from "../../../../drizzle/schema"
import { tagsToPosts } from "../../../../drizzle/schema"
import type { Actions } from "./$types"

export const actions: Actions = {
	deletePost: async ({ locals: { getSession }, request, url }) => {
		const session = await getSession()
		if (!session) {
			throw error(403, "Not authorized")
		}

		const form = await request.formData()
		const postId = Number(form.get("id"))
		const database = db()
		let deletedPost: Post[] | null = null
		let deletedTagsToPosts: TagToPost[] | null = null

		if (postId) {
			deletedTagsToPosts = await database
				.delete(tagsToPosts)
				.where(eq(tagsToPosts.postId, postId))
				.returning()

			deletedPost = await deletePost(postId)
		}

		if (deletedPost) {
			redirect(302, url ?? "/")
		}

		fail(400)
	}
}

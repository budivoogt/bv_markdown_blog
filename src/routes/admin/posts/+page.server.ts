import { deleteAllTagsOfPost, deletePost } from "$lib/server/postStores"
import { error, fail, redirect } from "@sveltejs/kit"
import type { Post } from "../../../lib/schemas/drizzleSchema"
import type { Actions } from "./$types"

export const actions: Actions = {
	deletePost: async ({ locals: { isBudiAuthenticated }, request, url }) => {
		if (!isBudiAuthenticated) {
			error(403, "Not authorized")
		}

		const form = await request.formData()
		const postId = Number(form.get("id"))
		let deletedPost: Post[] | null = null

		if (postId) {
			const deletedTagsToPosts = await deleteAllTagsOfPost(postId)
			deletedPost = await deletePost(postId)
			if (deletedPost) {
				redirect(302, url ?? "/")
			}
		}

		fail(400, { message: "Post not deleted" })
	}
}

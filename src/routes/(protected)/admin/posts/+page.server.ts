import type { Post } from "$lib/schemas/drizzleSchema"
import { deleteAllTagsOfPost, deletePost } from "$lib/server/dbPostStores"
import { error, fail, redirect } from "@sveltejs/kit"

export async function actions() {
	deletePost: async ({ locals: { isBudiAuthenticated }, request, url }) => {
		if (!isBudiAuthenticated) {
			error(403, "Not authorized")
		}

		const form = await request.formData()
		const postId = Number(form.get("id"))
		let deletedPost: Post[] | null = null

		if (postId) {
			await deleteAllTagsOfPost(postId)
			deletedPost = await deletePost(postId)
			if (deletedPost) {
				redirect(302, url ?? "/")
			}
		}

		fail(400, { message: "Post not deleted" })
	}
}

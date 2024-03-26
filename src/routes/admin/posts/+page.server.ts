import db from "$lib/server/database"
import { deletePost } from "$lib/stores/serverPostStores"
import { error, redirect } from "@sveltejs/kit"
import { eq } from "drizzle-orm"
import type { Post, TagToPost } from "../../../../drizzle/schema"
import { tagsToPosts } from "../../../../drizzle/schema"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url }) => {
	const deletedPostId: string | null = url.searchParams.get("deletedPostId")
	if (deletedPostId) {
		return { props: { deletedPostId } }
	}
	return { props: {} }
}

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
			const id = deletedPost[0].id
			const redirectUrl = new URL(url)
			redirectUrl.searchParams.append("deletedPostId", id.toString())
			redirect(302, redirectUrl ?? "/")
		}
	}
}

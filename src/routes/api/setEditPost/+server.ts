import type { Post } from "$lib/schemas/drizzleSchema"
import { editPostStore } from "$lib/server/postStores"
import { error, json } from "@sveltejs/kit"
import { get } from "svelte/store"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ request }) => {
	const post: Post = await request.json()
	const currentEditPostStore = get(editPostStore)

	if (post) {
		if (currentEditPostStore !== post) {
			editPostStore.set(post)
			const location = "/admin/posts/editor"
			return json(location)
		} else {
			const location = "/admin/posts/editor"
			return json(location)
		}
	}
	error(400, "editPostStore not updated")
}

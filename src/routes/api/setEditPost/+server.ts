import { editPostStore } from "$lib/stores/serverPostStores"
import { error, json } from "@sveltejs/kit"
import { get } from "svelte/store"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ request }) => {
	const post = await request.json()
	const currentEditPostStore = get(editPostStore)

	if (post && currentEditPostStore?.id !== post.id) {
		editPostStore.set(post)
		console.log("editPostStore updated")
		const location = "/admin/posts/editor"
		return json(location)
	} else {
		error(400, "editPostStore not updated")
	}
}

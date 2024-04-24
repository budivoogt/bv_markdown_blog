import type { Post } from "$lib/schemas/drizzleSchema"
import { getPostTagsStrings } from "$lib/server/dbPostHelpers"
import { editPostStore, editPostTagPairStore } from "$lib/server/dbPostStores"
import { error, json } from "@sveltejs/kit"
import { get } from "svelte/store"

export async function POST({ request }) {
	const post: Post = await request.json()
	const currentEditPostStore = get(editPostStore)
	const currentPostTags = await getPostTagsStrings(post.id)
	const currentPostTagStore = get(editPostTagPairStore)

	if (post) {
		if (currentPostTagStore !== currentPostTags) editPostTagPairStore.set(currentPostTags)
		if (currentEditPostStore !== post) editPostStore.set(post)
		const location = "/admin/posts/editor"
		return json(location)
	}
	error(400, "editPostStore not updated")
}

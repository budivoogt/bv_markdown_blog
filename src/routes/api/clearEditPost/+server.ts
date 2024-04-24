import { editPostStore, editPostTagPairStore } from "$lib/server/dbPostStores"
import { error, json } from "@sveltejs/kit"
import { get } from "svelte/store"

export function GET() {
	const postInEdit = get(editPostStore)
	const PostInEditTags = get(editPostTagPairStore)
	if (postInEdit) {
		if (PostInEditTags) editPostTagPairStore.set(null)
		editPostStore.set(null)
		return json({ success: true, message: "cleared post in edit" })
	}
	error(400, "no post in edit")
}

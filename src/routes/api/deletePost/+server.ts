import { deleteAllTagsOfPost, deletePost } from "$lib/server/dbPostStores"
import { error, json, type RequestHandler } from "@sveltejs/kit"
import { type Post } from "../../../lib/schemas/drizzleSchema"

export const POST: RequestHandler = async ({ request }) => {
	const postId = await request.json()

	let deletedPost: Post[] | null = null

	if (postId) {
		const deletedTagsToPosts = await deleteAllTagsOfPost(postId)
		deletedPost = await deletePost(postId)
		if (deletedPost) return json(deletedPost)
	}
	error(400, { message: "No post deleted" })
}

import db from "$lib/server/database"
import { eq } from "drizzle-orm"
import { writable } from "svelte/store"
import { posts, tagsToPosts, type Post, type TagToPost } from "../schemas/drizzleSchema"

export async function deletePost(id: number) {
	const database = db()
	const deletedPost: Post[] | undefined = await database
		.delete(posts)
		.where(eq(posts.id, id))
		.returning()
	return deletedPost
}

export async function deleteTagsToPosts(id: number) {
	const database = db()
	const deletedTagsToPosts: TagToPost[] | undefined = await database
		.delete(tagsToPosts)
		.where(eq(tagsToPosts.postId, id))
		.returning()
	return deletedTagsToPosts
}

export const editPostStore = writable<Post | null>(null)

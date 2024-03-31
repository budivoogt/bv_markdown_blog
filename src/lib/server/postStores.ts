import db from "$lib/server/database"
import { eq } from "drizzle-orm"
import { writable } from "svelte/store"
import { posts, tagsToPosts, type Post, type TagToPost } from "../schemas/drizzleSchema"

export async function deletePost(postId: number) {
	const database = db()
	const deletedPost: Post[] | undefined = await database
		.delete(posts)
		.where(eq(posts.id, postId))
		.returning()
	return deletedPost
}

export async function deleteAllTagsOfPost(postId: number) {
	const database = db()
	const deletedTagsToPosts: TagToPost[] | undefined = await database
		.delete(tagsToPosts)
		.where(eq(tagsToPosts.postId, postId))
		.returning()
	return deletedTagsToPosts
}

export const editPostStore = writable<Post | null>(null)
export const editPostTagPairStore = writable<string[] | null>(null)

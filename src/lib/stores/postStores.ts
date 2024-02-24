import db from "$lib/server/database"
import { eq } from "drizzle-orm"
import type { Post } from "../../../drizzle/schema"

export async function deletePost(id: number) {
	const database = db()
	const deletedPost: Post = await database.delete(posts).where(eq(posts.id === id))
	return console.log("Deleted post: ", deletedPost)
}

import db from "$lib/server/database"
import { eq } from "drizzle-orm"
import { posts, type Post } from "../../../drizzle/schema"

export async function deletePost(id: number) {
	const database = db()
	const deletedPost: Post = await database.delete(posts).where(eq(posts.id === id))
	return console.log("Deleted post: ", deletedPost)
}

async function loadTags() {
	const database = db()
	const tags = await database.select({ tags }).from(posts)
	console.log("Tags are: ", tags)
}

import db from "$lib/server/db"
import { json } from "@sveltejs/kit"
import { eq } from "drizzle-orm"
import { posts, type Post } from "../../../lib/schemas/drizzleSchema"

export async function POST({ request }) {
	const postId = await request.json()

	const database = db()

	let post: Post | undefined

	if (postId) {
		post = await database.query.posts.findFirst({ where: eq(posts.id, postId) })
	}

	return json(post)
}

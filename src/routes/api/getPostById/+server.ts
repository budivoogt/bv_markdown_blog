import db from "$lib/server/database"
import { json } from "@sveltejs/kit"
import { eq } from "drizzle-orm"
import { posts, type Post } from "../../../lib/schemas/drizzleSchema"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ request }) => {
	const postId = await request.json()

	const database = db()

	let post: Post | undefined

	if (postId) {
		post = await database.query.posts.findFirst({ where: eq(posts.id, postId) })
	}

	return json(post)
}

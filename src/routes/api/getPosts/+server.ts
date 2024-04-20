import db from "$lib/server/db"
import { json, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async () => {
	const database = db()

	const posts = await database.query.posts.findMany()

	return json(posts)
}

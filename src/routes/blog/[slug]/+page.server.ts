import db from "$lib/server/database"
import { error, type Actions } from "@sveltejs/kit"
import { eq } from "drizzle-orm"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import type { Post } from "../../../../drizzle/schema"
import * as schema from "../../../../drizzle/schema"
import { posts } from "../../../../drizzle/schema"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params

	const database: PostgresJsDatabase<typeof schema> = db()

	const post: Post | undefined = await database.query.posts.findFirst({
		where: eq(posts.slug, slug)
	})

	return { post }
}

export const actions: Actions = {
	changeStatus: async ({ locals: { getSession }, request }) => {
		// Check if user's authorized to change status
		const session = await getSession()
		if (!session) {
			throw error(403, "Not authorized")
		}

		const formData = await request.formData()
		const postId: number | null = formData.get("id")
		const status: string | null = formData.get("status")
		const oppositeStatus = status === "published" ? "draft" : "published"

		const database: PostgresJsDatabase<typeof schema> = db()

		const updatedRow = await database
			.update(posts)
			.set({ status: oppositeStatus })
			.where(eq(posts.id, postId))
			.returning()

		return { success: true, status: oppositeStatus }
	}
}

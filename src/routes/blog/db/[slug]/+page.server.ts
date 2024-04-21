import type { Post } from "$lib/schemas/drizzleSchema"
import * as schema from "$lib/schemas/drizzleSchema"
import { posts } from "$lib/schemas/drizzleSchema"
import db from "$lib/server/db"
import { getPostById, getPostTagsStrings, updatePostStatus } from "$lib/server/dbPostHelpers"
import { editPostStore, editPostTagPairStore } from "$lib/server/dbPostStores"
import { error, redirect, type Actions } from "@sveltejs/kit"
import { eq } from "drizzle-orm"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import type { PageServerLoad } from "./$types"

export const prerender = false

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params

	const database: PostgresJsDatabase<typeof schema> = db()

	const post: Post | undefined = await database.query.posts.findFirst({
		where: eq(posts.slug, slug)
	})

	return { post }
}

export const actions: Actions = {
	changeStatus: async ({ locals: { isBudiAuthenticated }, request }) => {
		if (!isBudiAuthenticated) {
			throw error(403, "Not authorized")
		}

		const formData = await request.formData()
		const postId: number | null = Number(formData.get("id"))
		const status: string | null = String(formData.get("status"))
		const oppositeStatus = status === "published" ? "draft" : "published"

		if (postId) await updatePostStatus(postId, oppositeStatus)

		return { success: true, status: oppositeStatus }
	},
	editPost: async ({ locals: { isBudiAuthenticated }, request }) => {
		if (!isBudiAuthenticated) {
			throw error(403, "Not authorized")
		}

		const formData = await request.formData()
		const postId: number | null = Number(formData.get("id"))

		const postToEdit = await getPostById(postId)
		if (postToEdit) editPostStore.set(postToEdit)
		const postTags = await getPostTagsStrings(postId)
		if (postTags) editPostTagPairStore.set(postTags)

		redirect(302, `/admin/posts/editor?edit=${postToEdit?.slug || ""}`)
	}
}

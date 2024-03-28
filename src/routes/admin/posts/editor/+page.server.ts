import { formSchema } from "$lib/components/posteditor/schema"
import db from "$lib/server/database"
import {
	findTagByName,
	insertPost,
	insertTag,
	insertTagToPost
} from "$lib/server/postDatabaseHelpers"
import { editPostStore } from "$lib/server/postStores"
import type { User } from "@supabase/supabase-js"
import { error, fail, redirect } from "@sveltejs/kit"
import { eq } from "drizzle-orm"
import { get } from "svelte/store"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import type { Post, SchemaUser } from "../../../../lib/schemas/drizzleSchema"
import { users } from "../../../../lib/schemas/drizzleSchema"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ depends }) => {
	depends("editingPost")

	let postToEdit: Post | null = null
	let form

	postToEdit = get(editPostStore)

	if (postToEdit) {
		form = await superValidate(postToEdit, zod(formSchema))
	} else {
		form = await superValidate(zod(formSchema))
	}

	return {
		form
	}
}

export const actions: Actions = {
	formSubmit: async (event) => {
		const form = await superValidate(event, zod(formSchema))
		const { data } = form

		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		const database = db()

		// Match Supabase authed user to db user
		const { user }: { user: User | null } = (await event.locals.getSession()) || { user: null }
		let matchedUser: SchemaUser | undefined
		if (user) {
			matchedUser = await database.query.users.findFirst({
				where: eq(users.uuid, user?.id)
			})
			if (!matchedUser) {
				const newUser = await database
					.insert(users)
					.values({
						uuid: user.id,
						fullName: user.user_metadata.full_name,
						email: user.email,
						emailVerified: user.user_metadata.email_verified
					})
					.returning()
				if (newUser) {
					matchedUser = newUser[0]
				}
			}
		}

		// Insert post into db
		let post
		try {
			post = await insertPost(data, matchedUser)
			if (post) {
				if (data.tags) {
					for (const tagName of data.tags) {
						let tagId: number

						const existingTag = await findTagByName(tagName)
						if (existingTag) {
							tagId = existingTag.id
						} else {
							const tag = await insertTag(tagName)
							tagId = tag.id
						}
						if (tagId) {
							await insertTagToPost(post.id, tagId)
						}
					}
				}
			}
		} catch (err) {
			error(400, "failed to insert post")
		}

		if (post) redirect(303, `/blog/${post.slug}`)

		return { form }
	}
}

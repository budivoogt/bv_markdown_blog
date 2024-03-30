import { formSchema } from "$lib/components/posteditor/schema"
import {
	createNewUser,
	findTagByName,
	findUserById,
	insertPost,
	insertTag,
	insertTagToPost
} from "$lib/server/postDatabaseHelpers"
import { editPostStore } from "$lib/server/postStores"
import type { User } from "@supabase/supabase-js"
import { error, fail, redirect } from "@sveltejs/kit"
import { get } from "svelte/store"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import type { Post, SchemaUser } from "../../../../lib/schemas/drizzleSchema"
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

		let matchedUser: SchemaUser | undefined
		try {
			const { user }: { user: User | null } = (await event.locals.getSession()) || {
				user: null
			}
			if (user) {
				matchedUser = await findUserById(user.id)
				if (!matchedUser) {
					const newUser = await createNewUser(user)
					if (newUser) {
						matchedUser = newUser
					}
				}
			}
			if (!matchedUser) console.error()
		} catch (err) {
			error(400, "Couldn't add user")
		}

		let post: Post | undefined
		try {
			if (matchedUser) post = await insertPost(data, matchedUser)
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
				redirect(303, `/blog/${post.slug}`)
			}
		} catch (err) {
			error(400, "failed to insert post")
		}

		return { form }
	}
}

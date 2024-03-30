import { formSchema } from "$lib/components/posteditor/schema"
import {
	createNewUser,
	deleteTagToPostPair,
	findTagById,
	findTagByName,
	findUserById,
	getPostTags,
	insertPost,
	insertTag,
	insertTagToPostPair,
	updatePost
} from "$lib/server/postDatabaseHelpers"
import { editPostStore } from "$lib/server/postStores"
import type { User } from "@supabase/supabase-js"
import { error, fail, redirect } from "@sveltejs/kit"
import { get } from "svelte/store"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import { type Post, type SchemaUser, type Tag } from "../../../../lib/schemas/drizzleSchema"
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
	createPost: async (event) => {
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
						await insertTagToPostPair(post.id, tagId)
					}
				}
			}
			redirect(303, `/blog/${post.slug}`)
		}

		return { form }
	},
	editPost: async (event) => {
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

		const postInEdit = get(editPostStore)
		let post: Post | undefined

		if (postInEdit && data && matchedUser) {
			post = await updatePost(data, matchedUser)
			if (post) {
				if (data.tags) {
					const currentPostTagPairs = await getPostTags(post.id)
					for (const { tagId } of currentPostTagPairs) {
						const existingTag: Tag | undefined = await findTagById(tagId)
						if (existingTag) {
							const tagIsSelected: boolean = data.tags.includes(existingTag.name)
							// If existing tag is selected, continue to next existing tag
							if (tagIsSelected) continue
							// Else if not selected, remove it
							const deletedPair = await deleteTagToPostPair(post.id, existingTag.id)
						}
						for (const tagName of data.tags) {
							const selectedTag = await findTagByName(tagName)
							// I left off here
							if (selectedTag) {
								const currentPostTagPair = currentPostTagPairs.map(
									(pair: typeof selectedTag) => pair.id
								)
							}
						}
					}
					for (const tagName of data.tags) {
						let tagId: number

						// Find existing or add new tag
						const existingTag = await findTagByName(tagName)
						if (existingTag) {
							tagId = existingTag.id
						} else {
							const tag = await insertTag(tagName)
							tagId = tag.id
						}
						if (tagId) {
							await insertTagToPostPair(post.id, tagId)
						}
					}
				}
				redirect(303, `/blog/${post.slug}`)
			}
		}

		return { form }
	}
}

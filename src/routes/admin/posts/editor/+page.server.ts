import { formSchema } from "$lib/components/posteditor/schema"
import {
	createNewUser,
	deleteTagToPostPair,
	findTagById,
	findTagByName,
	findUserById,
	getPostTagsObjects,
	insertPost,
	insertTag,
	insertTagToPostPair,
	updatePost
} from "$lib/server/postDatabaseHelpers"
import { editPostStore, editPostTagPairStore } from "$lib/server/postStores"
import type { User } from "@supabase/supabase-js"
import { error, fail, redirect } from "@sveltejs/kit"
import { get } from "svelte/store"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import {
	type Post,
	type SchemaUser,
	type Tag,
	type TagToPost
} from "../../../../lib/schemas/drizzleSchema"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ depends }) => {
	depends("editingPost")

	let postToEdit: (Post & { tags?: string[] }) | null = null
	let postToEditTags: string[] | null = null
	let form

	postToEdit = get(editPostStore)
	postToEditTags = get(editPostTagPairStore)
	if (postToEdit) {
		if (postToEditTags) postToEdit.tags = postToEditTags
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
		let currentPostTagPairs: TagToPost[] | undefined
		let post: Post | undefined

		if (postInEdit && data && matchedUser) {
			post = await updatePost(data, postInEdit, matchedUser)
			if (post) {
				currentPostTagPairs = await getPostTagsObjects(post.id)
				if (data.tags) {
					for (const { tagId } of currentPostTagPairs) {
						const currentTag: Tag | undefined = await findTagById(tagId)
						if (currentTag) {
							const tagIsSelected: boolean = data.tags.includes(currentTag.name)
							// If existing tag is selected, continue to next existing tag
							if (tagIsSelected) continue
							// Else if not selected, remove pair
							await deleteTagToPostPair(post.id, currentTag.id)
						}
					}
					for (const tagName of data.tags) {
						// check if the tag exists
						let selectedTag = await findTagByName(tagName)
						if (!selectedTag) {
							// if it does not, add it
							selectedTag = await insertTag(tagName)
						}
						// If pair isn't selected, add it
						const currentTagPairByTagId = currentPostTagPairs.map((pair) => pair.tagId)
						const tagIsSelected: boolean = currentTagPairByTagId.includes(
							selectedTag.id
						)
						if (!tagIsSelected) {
							await insertTagToPostPair(post.id, selectedTag.id)
						}
					}
					// if no tags are selected, but some exist
				} else if (!data.tags && currentPostTagPairs) {
					await deleteTagToPostPair(post.id)
				}
				redirect(303, `/blog/${post.slug}`)
			}
		}

		return { form }
	}
}

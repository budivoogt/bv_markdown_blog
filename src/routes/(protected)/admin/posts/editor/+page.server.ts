import { formSchema } from "$lib/components/posteditor/schema"
import { type Post, type SchemaUser } from "$lib/schemas/drizzleSchema"
import {
	createNewUser,
	deleteTagToPostPair,
	findTagByName,
	findUserById,
	getPostTagObjects,
	insertPost,
	insertTag,
	insertTagToPostPair,
	updatePost
} from "$lib/server/dbPostHelpers"
import { editPostStore, editPostTagPairStore } from "$lib/server/dbPostStores"
import type { User } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"
import { get } from "svelte/store"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export async function load({ depends }) {
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

export async function actions () {
	createPost: async (event) => {
		const form = await superValidate(event, zod(formSchema))
		const { data } = form

		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		let matchedUser: SchemaUser | null = null
		try {
			const { user }: { user: User | null } = (await event.locals.getSession()) || {
				user: null
			}
			if (!user) return fail(400, { message: "no user" })
			matchedUser = (await findUserById(user.id)) || (await createNewUser(user)) || null
			if (!matchedUser) return fail(400, { message: "Couldn't find nor create user" })
		} catch (err) {
			console.error(err)
			return fail(400, { message: "no user matched" })
		}

		const post: Post | undefined = await insertPost(data, matchedUser)
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

		let matchedUser: SchemaUser | null = null
		try {
			const { user }: { user: User | null } = (await event.locals.getSession()) || {
				user: null
			}
			if (!user) return fail(400, { message: "no user" })
			matchedUser = (await findUserById(user.id)) || (await createNewUser(user)) || null
			if (!matchedUser) return fail(400, { message: "Couldn't find nor create user" })
		} catch (err) {
			console.error(err)
			return fail(400, { message: "no user matched" })
		}

		const postInEdit = get(editPostStore)
		// const currentPostTagStrings = get(editPostTagPairStore)
		if (postInEdit && data && matchedUser) {
			const post: Post | undefined = await updatePost(data, postInEdit, matchedUser)
			if (!post) return
			const existingTagObjects = await getPostTagObjects(post.id)
			const existingTagNames: Set<string> = new Set(
				existingTagObjects.map(({ name }: { name: string }) => name)
			)

			const incomingTagNames: Set<string> = data.tags ? new Set(data.tags) : new Set()

			// Find unselected tags
			const unselectedTags = existingTagObjects.filter(
				({ name }: { name: string }) => !incomingTagNames.has(name)
			)
			// Delete them
			await Promise.all(unselectedTags.map(({ id }) => deleteTagToPostPair(post.id, id)))

			// Find incoming tags that are not paired to the post yet
			const tagsToAdd = Array.from(incomingTagNames).filter(
				(tagName) => !existingTagNames.has(tagName)
			)
			for (const tagName of tagsToAdd) {
				// Find or insert tags
				const tag = (await findTagByName(tagName)) || (await insertTag(tagName))
				// If not paired yet, insert pair
				if (!existingTagNames.has(tag.name)) {
					await insertTagToPostPair(post.id, tag.id)
				}
			}
			redirect(303, `/blog/${post.slug}`)
		}

		return { form }
	}
}

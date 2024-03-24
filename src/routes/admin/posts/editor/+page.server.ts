import { formSchema } from "$lib/components/posteditor/schema"
import db from "$lib/server/database"
import type { User } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"
import { eq } from "drizzle-orm"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import type { SchemaUser } from "../../../../../drizzle/schema"
import { posts, tags, tagsToPosts, users } from "../../../../../drizzle/schema"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(formSchema))

	return {
		form
	}
}

export const actions: Actions = {
	formSubmit: async (event) => {
		const form = await superValidate(event, zod(formSchema))

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
			// console.log("matchedUser: ", matchedUser)
		}

		// Insert post into db
		let postRow
		try {
			postRow = await database
				.insert(posts)
				.values({
					title: form.data.title,
					description: form.data.description,
					body: form.data.body,
					slug: form.data.slug,
					authorId: matchedUser?.id
				})
				.returning()
			if (form.data.tags) {
				for (const tagName of form.data.tags) {
					let tagId: number

					const existingTag = await database.query.tags.findFirst({
						where: eq(tags.name, tagName)
					})
					if (existingTag) {
						tagId = existingTag.id
					} else {
						const insertedTag = await database
							.insert(tags)
							.values({
								name: tagName
							})
							.returning()
						if (insertedTag.length === 0) {
							console.error("Failed to insert tag ", tagName)
							continue
						}
						tagId = insertedTag[0].id
					}
					if (tagId) {
						await database.insert(tagsToPosts).values({
							postId: postRow[0].id,
							tagId: tagId
						})
					}
				}
			}
		} catch (error) {
			console.error("Error inserting: ", error)
		}

		if (postRow) redirect(303, `/blog/${postRow[0].slug}`)

		return { form }
	}
}

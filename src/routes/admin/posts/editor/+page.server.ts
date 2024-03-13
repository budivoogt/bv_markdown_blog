import { formSchema } from "$lib/components/posteditor/schema"
import db from "$lib/server/database"
import { fail } from "@sveltejs/kit"
import { eq } from "drizzle-orm"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import { posts, tags, tagsToPosts } from "../../../../../drizzle/schema"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	}
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema))
		console.log("Form submitted. Form: ", form)
		if (!form.valid) {
			return fail(400, {
				form
			})
		}
		const database = db()
		const postRow = await database
			.insert(posts)
			.values({
				title: form.data.title,
				description: form.data.description,
				body: form.data.body,
				tags: form.data.tags,
				slug: form.data.slug
			})
			.returning()

		if (form.data.tags) {
			for (const tag of form.data.tags) {
				const matchTag = await database.select().from(tags).where(eq(tags.name, tag))
				const TagAndPostRow = await database
					.insert(tagsToPosts)
					.values({ tagId: matchTag[0].id, postId: postRow[0].id })
					.returning()
			}
		}

		// Need to assign an author too. How can I automatically pull this from the authenticated user?

		return { form }
	}
}

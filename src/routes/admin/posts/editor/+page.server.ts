import { formSchema } from "$lib/components/posteditor/schema"
import { fail } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
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
		return { form }
	}
}

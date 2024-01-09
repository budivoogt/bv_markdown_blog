import type { Provider } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession()

	if (session) {
		console.log("Session already exists")
		throw redirect(303, "/")
	}
}

export const actions = {
	signin: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData()
		const provider = formData.get("provider") as Provider

		if (provider) {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider,
				// Not sure if this is a viable redirect URL
				options: { redirectTo: `${url.origin}/auth/callback?next=/admin` }
			})
			console.log("OAuth response data is: ", data)

			if (error) console.log("OAuth signin failed: ", error)

			if (data.url) throw redirect(303, data.url)
		} else {
			return fail(400, { error: "No provider selected" })
		}
	},
	signout: async ({ locals: { supabase } }) => {
		try {
			await supabase.auth.signOut()
			throw redirect(303, "/")
		} catch (error) {
			console.error("Signout failed: ", error)
		}
	}
} satisfies Actions

import type { Provider } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"

export const prerender = false

export async function load({ locals: { getSession } }) {
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
				options: { redirectTo: `${url.origin}/auth/callback?next=/admin/profile` }
			})

			if (error) {
				return fail(400, { error, message: "OAuth signin failed." })
			}

			if (data.url) {
				console.log("Login successful: ", data)
				redirect(303, data.url)
			}
		} else {
			return fail(400, { error: "No provider selected" })
		}
	},
	signout: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut()
		if (!error) {
			console.log("Logout succesful")
			redirect(303, "/")
		} else {
			return fail(400, { error, message: "Signout failed" })
		}
	}
}

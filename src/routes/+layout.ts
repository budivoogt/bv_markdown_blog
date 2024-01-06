import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public"
import type { Database } from "$lib/types/supabase"
import { createBrowserClient, isBrowser, parse } from "@supabase/ssr"
import type { LayoutLoad } from "./$types"

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends("supabase:auth")

	const supabase = createBrowserClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch
		},
		cookies: {
			get(key) {
				if (!isBrowser()) {
					return JSON.stringify(data.session)
				}

				const cookie = parse(document.cookie)
				return cookie[key]
			}
		}
	})

	console.log("This session is passed via src/routes/+layout.server.ts: ", data.session)

	// Isn't this redundant since the session is already provided by the server?
	const {
		data: { session }
	} = await supabase.auth.getSession()

	console.log(
		"This session is passed via src/routes/+layout.ts after calling getSession() again. Is there a difference between the server and client gotten session?",
		session
	)

	return { supabase, session }
}

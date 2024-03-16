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

	// // Isn't this redundant since the session is already provided by the server? Not making this call saves me a db interaction.
	const {
		data: { session }
	} = await supabase.auth.getSession()

	// The last load function has priority over all others, so I need to pass the server load data through the layout load data for the page to access it.
	return { supabase, session, posts: data.posts, tags: data.tags, message: data.message, postTags: data.postTags }
}

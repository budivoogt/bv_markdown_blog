import { SUPABASE_ANON_KEY, SUPABASE_URL } from "$lib/client/dbHelpers"
import { getSlugs, getTags } from "$lib/client/mdPostHelpers"
import { mdPostSlugs, mdPostTags, mdPosts } from "$lib/client/mdPostStores"
import type { Database } from "$lib/types/supabase"
import { createBrowserClient, isBrowser, parse } from "@supabase/ssr"
import type { AuthError, Session } from "@supabase/supabase-js"

export const prerender = true

export async function load({ fetch, data, depends }) {
	depends("supabase:auth")

	const supabase = createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
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
	} = (await supabase.auth.getSession()) as {
		data: { session: Session | null }
		error: null | AuthError
	}

	let mdTags: Set<string> | undefined, mdSlugs: Set<string> | undefined
	if (data.mdPosts) {
		mdPosts.set(data.mdPosts)
		mdTags = getTags(data.mdPosts)
		if (mdTags) mdPostTags.set(mdTags)
		mdSlugs = getSlugs(data.mdPosts)
		if (mdSlugs) mdPostSlugs.set(mdSlugs)
	}

	// The last load function has priority over all others, so I need to pass the server load data through the layout load data for the page to access it.
	return {
		supabase,
		session,
		posts: data.posts,
		tags: data.tags,
		markdownPosts: data.mdPosts,
		markdownTags: mdTags,
		postTags: data.postTags,
		post: data.post,
		props: data.props,
		isBudiAuthenticated: data.isBudiAuthenticated
	}
}

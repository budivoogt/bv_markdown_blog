import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public"
import type { Database } from "$lib/types/supabase"
import { createServerClient } from "@supabase/ssr"
import { redirect, type Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, event: { locals, cookies, url }, resolve }) => {
	locals.supabase = createServerClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => cookies.get(key),
			set: (key, value, options) => {
				cookies.set(key, value, { ...options, path: "/" })
			},
			remove: (key, options) => {
				cookies.delete(key, { ...options, path: "/" })
			}
		}
	})

	locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession()
		return session
	}

	const session = await locals.getSession()
	if (session) {
		const user = session.user
		if (user.id === "8d531343-a486-4070-a505-2d16c512ccf5" && user.aud === "authenticated") {
			locals.isBudiAuthenticated = true
		} else {
			locals.isBudiAuthenticated = false
		}
	}

	if (
		(url.pathname.startsWith("/admin/") || url.pathname.startsWith("/api")) &&
		!locals.isBudiAuthenticated
	) {
		console.error("Path unauthorized")
		redirect(307, "/admin")
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === "content-range"
		}
	})
}

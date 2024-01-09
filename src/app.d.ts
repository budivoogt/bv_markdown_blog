// See https://kit.svelte.dev/docs/types#app

import type { Database } from "$lib/types/supabase"
import type { Session, SupabaseClient, User } from "@supabase/supabase-js"
import type { Post } from "../drizzle/schema"

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
		}
		interface PageData {
			session: {
				user: User
			}
			posts?: Post[]
			message?: string
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}

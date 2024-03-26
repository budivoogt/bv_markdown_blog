// See https://kit.svelte.dev/docs/types#app

import type { FormType } from "$lib/components/posteditor/editor-form.svelte"
import type { Database } from "$lib/types/supabase"
import type { Session, SupabaseClient, User } from "@supabase/supabase-js"
import type { Post, Tag, TagToPost } from "../drizzle/schema"

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
			post?: Post
			posts?: Post[]
			tags?: Tag[]
			message?: string
			form?: FormType
			postTags?: TagToPost[]
			props?: {
				deletedPostId?: string | null
			}
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}

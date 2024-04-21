import { dev } from "$app/environment"
import { LOCAL_SUPABASE_DB_URL, SUPABASE_POOLED_DB_URL } from "$env/static/private"

import { error } from "@sveltejs/kit"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "../schemas/drizzleSchema"



export default function db() {
	const connectionString = dev ? LOCAL_SUPABASE_DB_URL : SUPABASE_POOLED_DB_URL

	if (!connectionString) {
		error(404, "DATABASE_URL is undefined")
	}

	const client = postgres(connectionString, { prepare: false })

	return drizzle(client, { schema })
}

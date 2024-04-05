import { DATABASE_URL } from "$env/static/private"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "../schemas/drizzleSchema"
import { error } from "@sveltejs/kit"

export default function db() {
	const connectionString = DATABASE_URL

	if (!connectionString) {
		error(404, "DATABASE_URL is undefined")
	}

	const client = postgres(connectionString)

	return drizzle(client, { schema })
}

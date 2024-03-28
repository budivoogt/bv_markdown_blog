import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "../schemas/drizzleSchema"

export default function db() {
	const connectionString = process.env.DATABASE_URL

	if (!connectionString) {
		throw new Error("LOCAL_DATABASE_URL is undefined")
	}

	const client = postgres(connectionString)

	return drizzle(client, { schema })
}

import { createClient } from "@libsql/client/http"
import * as dotenv from "dotenv"
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql"
import * as schema from "../../../drizzle/schema"
dotenv.config()

export function tursoClient(): LibSQLDatabase<typeof schema> {
	// const url = import.meta.env.VITE_TURSO_DB_URL?.trim() // this is the remote database
	const url = process.env.LOCAL_DATABASE_URL?.trim() // this is the local database
	if (!url) {
		throw new Error("VITE_TURSO_DB_URL is undefined")
	}

	const authToken = import.meta.env.VITE_TURSO_DB_AUTH_TOKEN?.trim()
	if (!authToken) {
		if (!url.includes("file:")) {
			throw new Error("VITE_TURSO_DB_AUTH_TOKEN is undefined")
		}
	}

	return drizzle(
		createClient({
			url,
			authToken
		}),
		{ schema }
	)
}

// export function localClient(): LibSQLDatabase<typeof schema> {
// 	const url = import.meta.env.LOCAL_DATABASE_URL?.trim()
// 	if (!url) {
// 		throw new Error("LOCAL_DATABASE_URL is undefined")
// 	}

// 	return drizzle(
// 		createClient({
// 			url
// 		}),
// 		{ schema }
// 	)
// }

import {
	LOCAL_DATABASE_URL,
	VITE_TURSO_DB_AUTH_TOKEN,
	VITE_TURSO_DB_URL
} from "$env/static/private"
import { createClient } from "@libsql/client/http"
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql"
import * as schema from "../../../drizzle/schema"

export function remoteClient(): LibSQLDatabase<typeof schema> {
	const url = VITE_TURSO_DB_URL?.trim()
	// const url = import.meta.env.VITE_TURSO_DB_URL?.trim()
	if (!url) {
		throw new Error("VITE_TURSO_DB_URL is undefined")
	}

	const authToken = VITE_TURSO_DB_AUTH_TOKEN?.trim()
	// const authToken = import.meta.env.VITE_TURSO_DB_AUTH_TOKEN?.trim()
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

export function localClient(): LibSQLDatabase<typeof schema> {
	const url = LOCAL_DATABASE_URL?.trim()
	// const url = process.env.LOCAL_DATABASE_URL?.trim()
	if (!url) {
		throw new Error("LOCAL_DATABASE_URL is undefined")
	}

	return drizzle(
		createClient({
			url
		}),
		{ schema }
	)
}

import { createClient } from "@libsql/client"
import "dotenv/config"
import { drizzle } from "drizzle-orm/libsql/driver"
import { migrate } from "drizzle-orm/libsql/migrator"

export const client = createClient({
	url: process.env.VITE_TURSO_DB_URL as string,
	authToken: process.env.VITE_TURSO_DB_AUTH_TOKEN as string
})

export const db = drizzle(client)

async function main() {
	try {
		await migrate(db, {
			migrationsFolder: "drizzle/migrations"
		})
		console.log("Tables migrated")
		process.exit(0)
	} catch (error) {
		console.error("Error performing migration: ", error)
		process.exit(1)
	}
}

main()

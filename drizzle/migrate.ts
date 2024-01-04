import { migrate } from "drizzle-orm/postgres-js/migrator"
import db from "../src/lib/server/database"

async function main() {
	try {
		await migrate(db(), {
			migrationsFolder: "supabase/migrations"
		})
		console.log("Tables migrated")
		process.exit(0)
	} catch (error) {
		console.error("Error performing migration: ", error)
		process.exit(1)
	}
}

main()

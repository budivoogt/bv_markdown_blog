// Can't use $env, SvelteKit's way of accessing env vars. Instead need to use dotenv.
import "dotenv/config"
import type { Config } from "drizzle-kit"

if (!process.env.LOCAL_SUPABASE_DB_URL) {
	console.error("Can't find db url")
}

export default {
	schema: "src/lib/schemas/drizzleSchema.ts",
	out: "./supabase/migrations",
	driver: "pg",
	dbCredentials: {
		// Local Supabase database for dev
		connectionString: process.env.LOCAL_SUPABASE_DB_URL || ("" as string)
	},
	// Print all statements
	verbose: true,
	// Always ask for confirmation, even they aren't breaking
	strict: true,
	// Execute every migration statement individually
	breakpoints: true
} satisfies Config

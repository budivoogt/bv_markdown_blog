// Can't use $env, SvelteKit's way of accessing env vars. Instead need to use dotenv.
import "dotenv/config"
import type { Config } from "drizzle-kit"

if (!process.env.DATABASE_URL) {
	console.error("Can't find db url")
}

export default {
	schema: "./drizzle/schema.ts",
	out: "./supabase/migrations",
	driver: "pg",
	dbCredentials: {
		// Local Supabase database for dev
		connectionString: process.env.DATABASE_URL || ("" as string)
	},
	// Print all statements
	verbose: true,
	// Always ask for confirmation, even they aren't breaking
	strict: true,
	// Execute every migration statement individually
	breakpoints: true
} satisfies Config

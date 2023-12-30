import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"
// There doesn't seem to be a way to use SvelteKit's $env variables to access the .env vars. Using dotenv instead.
dotenv.config()

export default {
	schema: "./drizzle/schema.ts",
	out: "./drizzle/migrations",
	driver: "turso",
	dbCredentials: {
		url: process.env.LOCAL_DATABASE_URL as string,
		authToken: process.env.LOCAL_DATABASE_AUTH_TOKEN as string
		// url: process.env.VITE_TURSO_DB_URL as string,
		// authToken: process.env.VITE_TURSO_DB_AUTH_TOKEN as string
	},
	// Print all statements
	verbose: true,
	// Always ask for confirmation, even they aren't breaking
	strict: true,
	// Execute every migration statement individually
	breakpoints: true
} satisfies Config

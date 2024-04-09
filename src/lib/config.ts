import { dev } from "$app/environment"
import { PUBLIC_CANONICAL_ORIGIN } from "$env/static/public"

export const title = "Budi Voogt"
export const url = dev ? "http://localhost:5173" : PUBLIC_CANONICAL_ORIGIN

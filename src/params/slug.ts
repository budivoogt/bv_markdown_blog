import { mdPostSlugs } from "$lib/client/mdPostStores"
import { get } from "svelte/store"

export function match(value) {
	return get(mdPostSlugs)?.has(value) || false
}

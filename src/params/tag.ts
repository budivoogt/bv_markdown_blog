import { mdPostTags } from "$lib/client/mdPostStores"
import { get } from "svelte/store"

export function match(value) {
	return get(mdPostTags)?.has(value) || false
}

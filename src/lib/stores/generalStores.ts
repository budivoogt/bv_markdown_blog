import { writable } from "svelte/store"

export const postTags = writable<string[]>([])

import { writable } from "svelte/store"

export const delPostToastStore = writable<{ deleted: boolean; id: number } | null>(null)

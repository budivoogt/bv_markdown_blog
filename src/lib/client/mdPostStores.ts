import type { MarkdownPost } from "$lib/types/types"
import { writable } from "svelte/store"

export const mdPosts = writable<MarkdownPost[] | null>(null)
export const mdPostSlugs = writable<Set<string> | null>(null)
export const mdPostTags = writable<Set<string> | null>(null)

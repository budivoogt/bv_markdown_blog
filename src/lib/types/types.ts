import type { Post, TagToPost } from "../schemas/drizzleSchema"

export type PostTag = { posts: Post | null; tags_to_posts: TagToPost }

export type TagsPerPost = Record<string, string[]>

export type Tag = "sveltekit" | "svelte" | "markdown"

export type MarkdownPost = {
	title: string
	slug: string
	description: string
	date: string
	lastmod?: string
	tags: Tag[]
	published: boolean
}

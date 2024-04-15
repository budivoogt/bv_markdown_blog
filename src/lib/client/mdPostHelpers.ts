import type { MarkdownPost } from "$lib/types/types"

export function getLastPosts(
	markdownPosts: MarkdownPost[],
	limitNumber: number = 5,
	postTitle?: string
) {
	return markdownPosts
		.filter((post) => !postTitle || post.title !== postTitle)
		.slice(0, limitNumber)
}

export function sortPosts(posts: MarkdownPost[]) {
	return posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	)
}

export function getCategories(posts: MarkdownPost[]) {
	const uniqueTags: Set<string> | null = new Set(null)
	for (const post of posts) {
		for (const tag of post.tags) {
			uniqueTags.add(tag)
		}
	}
	if (uniqueTags.size > 0) {
		const sortedTags = Array.from(uniqueTags).sort()
		return new Set(sortedTags)
	} else {
		console.error("Couldn't find any tags")
	}
}

export function standardizeCategories (categories) {
	

	return 
}
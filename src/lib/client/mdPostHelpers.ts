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

export function sortMarkdownPosts(markdownPosts: MarkdownPost[]) {
	return markdownPosts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	)
}

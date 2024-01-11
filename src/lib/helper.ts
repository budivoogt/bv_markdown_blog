import type { Post } from "../../drizzle/schema"

export function capitalizer(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export function sortPostsDesc(posts: Post[]) {
	return posts.sort((a, b) => b.id - a.id)
}

export function filterPostsPublished(posts: Post[]) {
	return posts.filter((post) => post.status === "published")
}

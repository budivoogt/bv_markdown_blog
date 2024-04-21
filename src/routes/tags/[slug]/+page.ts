import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params: { slug }, parent }) => {
	const { markdownPosts } = await parent()

	const postsWithTag = markdownPosts.filter((post) => post.tags.some((tag) => tag === slug))

	if (postsWithTag.length > 0) {
		return { postsWithTag }
	}
}

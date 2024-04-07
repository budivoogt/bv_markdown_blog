import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params: { slug } }) => {
	try {
		const post = await import(`../../../../lib/posts/${slug}.md`)
		return { content: post.default, meta: post.metadata }
	} catch (err) {
		console.error(err)
	}
}

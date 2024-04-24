export async function load({ params: { slug }, parent, setHeaders }) {
	setHeaders({
		"Cache-Control": `max-age=0, s-maxage=${60}`
	})

	const { markdownPosts } = await parent()

	const postsWithTag = markdownPosts.filter((post) => post.tags.some((tag) => tag === slug))

	if (postsWithTag.length > 0) {
		return { postsWithTag }
	}
}

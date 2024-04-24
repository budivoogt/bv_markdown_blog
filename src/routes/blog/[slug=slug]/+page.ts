export async function load({ params: { slug }, setHeaders }) {
	setHeaders({
		"Cache-Control": `max-age=0, s-maxage=${60}`
	})

	try {
		const post = await import(`../../../lib/posts/${slug}.md`)
		return { content: post.default, meta: post.metadata }
	} catch (err) {
		console.error(err)
	}
}

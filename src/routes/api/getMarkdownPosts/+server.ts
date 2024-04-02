import type { MarkdownPost } from "$lib/types/types"
import { error, json, type RequestHandler } from "@sveltejs/kit"

async function getPosts() {
	let posts: MarkdownPost[] = []

	// importing all matching files eagerly (statically)
	const paths = import.meta.glob("/src/lib/posts/*.md", { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split("/").at(-1)?.replace(".md", "")

		if (file && typeof file === "object" && "metadata" in file && slug) {
			const metadata = file.metadata as Omit<MarkdownPost, "slug">
			const post = { ...metadata, slug } satisfies MarkdownPost

			post.published && posts.push(post)
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	)

	return posts
}

export const GET: RequestHandler = async () => {
	try {
		const posts = await getPosts()
		return json(posts)
	} catch (err) {
		console.error(`couldn't get markdown posts. Error: ${err}`)
		error(400, "couldn't return markdown posts")
	}
}

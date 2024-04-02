import type { MarkdownPost } from "$lib/types/types"
import { json, type RequestHandler } from "@sveltejs/kit"

async function getPosts() {
	let posts: MarkdownPost[] = []

	// importing all matching files eagerly (statically)
	const paths = import.meta.glob("/src/lib/posts/*.md", { eager: true })

	// Looping keys instead of values by using 'in' instead of 'of'. This is because the keys are the paths, the values are import statements per the Vite docs.
	for (const path in paths) {
		// Grabs the import statement for the file
		const file = paths[path]
		// Splits the path into an array of words, grabs the last one and removes .md extension
		const slug = path.split("/").at(-1)?.replace(".md", "")

		if (file && typeof file === "object" && "metadata" in file && slug) {
			// Omit creates a new type that matches argument 1, but excludes argument 2. The slug is being removed from the type.
			const metadata = file.metadata as Omit<MarkdownPost, "slug">
			const post = { ...metadata, slug } satisfies MarkdownPost
			// short way of typing if (post.published)...
			post.published && posts.push(post)
		}
	}

	// Sort in descending order. If the callback value is negative, first is indexed lower (or higher up in the array). In this instance, the callback will be negative for newer posts, resulting in the second post being indexed lower.
	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	)

	return posts
}

export const GET: RequestHandler = async () => {
	const posts = await getPosts()
	return json(posts)
}

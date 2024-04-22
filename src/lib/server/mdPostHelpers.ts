import type { MarkdownPost } from "$lib/types/types"
import { sortPosts } from "$lib/client/mdPostHelpers"

export async function getMDPosts() {
	let posts: MarkdownPost[] = []

	const paths = import.meta.glob("/src/lib/posts/*.md", { eager: true })

    if (!paths) console.error("");
    

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split("/").at(-1)?.replace(".md", "")

		if (file && typeof file === "object" && "metadata" in file && slug) {
			const metadata = file.metadata as Omit<MarkdownPost, "slug">
			const post = { ...metadata, slug } satisfies MarkdownPost

			post.published && posts.push(post)
		}
	}

	posts = sortPosts(posts)

	return posts
}

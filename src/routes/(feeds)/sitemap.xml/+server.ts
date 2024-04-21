import type { MarkdownPost } from "$lib/types/types"
import { createSitemapEntry, getRootURL } from "$lib/utils"
import type { RequestHandler } from "@sveltejs/kit"
import { error } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ fetch, setHeaders }) => {
	setHeaders({
		"Content-Type": "application/xml"
	})

	// Update this with the public pages in the /src/routes folder
	const pages = ["blog", "about"]

	const url = getRootURL()

	const response = await fetch("/api/getMarkdownPosts")

	if (!response.ok) {
		error(500, "failed to fetch posts")
	}

	const posts: MarkdownPost[] = await response.json()

	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      <url>
        <loc>${url}</loc>
      </url>
      ${pages.map((page) => createSitemapEntry({ page, url })).join("")}
      ${posts.map((post) => (post.published ? createSitemapEntry({ post, url }) : null)).join("")}
    </urlset>`

	return new Response(sitemap)
}

import { url } from "$lib/config"
import type { MarkdownPost } from "$lib/types/types"
import type { RequestHandler } from "@sveltejs/kit"
import { error } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ fetch, setHeaders }) => {
	setHeaders({
		"Content-Type": "application/xml"
	})

	// Update this with the public pages in the /src/routes folder
	const pages = ["blog", "about"]

	const response = await fetch("api/getMarkdownPosts")

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
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
    ${posts
		.map((post) =>
			post.published
				? `
                <url>
                    <loc>${url}/blog/${post.slug}</loc>
                    <changefreq>monthly</changefreq>
                    <priority>0.7</priority>
                </url>
                `
				: null
		)
		.join("")}
    ${pages
		.map(
			(page) =>
				`
                <url>
                    <loc>${url}/${page}</loc>
                    <changefreq>monthly</changefreq>
                    <priority>0.7</priority>
                </url>
                `
		)
		.join("")}
    </urlset>`

	return new Response(sitemap)
}

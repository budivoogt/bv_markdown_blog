import type { MarkdownPost } from "$lib/types/types"
import { createRSSEntry, getRootURL, getURLhref } from "$lib/utils"
import * as config from "$lib/utils/config"
import type { RequestHandler } from "@sveltejs/kit"

export const prerender = true

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch("/api/getMarkdownPosts")
	const posts: MarkdownPost[] = await response.json()

	const headers = { "Content-Type": "application/xml" }

	const url = getRootURL()

	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${config.siteTitle}</title>
				<description>${config.siteDescription}</description>
				<link>${url}</link>
				<atom:link href="${getURLhref("rss.xml", url)}" rel="self" type="application/rss+xml"/>
				${posts.map((post) => createRSSEntry(post)).join("")}
			</channel>
		</rss>
	`.trim()

	return new Response(xml, { headers })
}

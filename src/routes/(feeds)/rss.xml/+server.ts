import { getMDPosts } from "$lib/server/mdPostHelpers"
import { createRSSEntry, getRootURL, getURLhref } from "$lib/utils"
import * as config from "$lib/utils/config"
import type { RequestHandler } from "@sveltejs/kit"
import { error } from "@sveltejs/kit"

export const prerender = true

export const GET: RequestHandler = async ({ setHeaders }) => {
	setHeaders({
		"Content-Type": "application/xml",
		"Cache-Control": `max-age=0, s-maxage=${60 * 60}`
	})

	const posts = await getMDPosts()
	if (!posts) {
		error(500, "failed to fetch posts")
	}

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

	return new Response(xml)
}

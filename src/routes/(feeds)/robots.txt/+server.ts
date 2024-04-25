import { getURLhref } from "$lib/utils"

export function GET() {
	const body = `
# Block LLM scraping bots

User-agent: GPTBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

# Default rule for other bots
User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /auth/
Allow: /

Sitemap: ${getURLhref("sitemap.xml")}`

	return new Response(body, {
		headers: {
			"Content-Type": "text/plain"
		}
	})
}

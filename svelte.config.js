import { createHighlighter } from "@bitmachina/highlighter"
import adapter from "@sveltejs/adapter-auto"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import { mdsvex } from "mdsvex"
import readingtime from "mdsvex-reading-time"
import { resolve } from "path"
import remarkGithub from "remark-github"
import { fileURLToPath } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: [".md"],
	smartypants: { quotes: true, dashes: "oldschool" },
	remarkPlugins: [
		[remarkGithub, { repository: "https://github.com/budivoogt/bv_markdown_blog" }],
		[readingtime]
	],
	highlight: {
		highlighter: await createHighlighter({
			themes: ["dark-plus"],
			lang: ["js", "ts", "css", "svelte"]
		})
	},
	layout: { _: resolve(__dirname, "./src/lib/components/markdownLayouts/Post.svelte") }
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: [".svelte", ".md", ".svx"],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			handleHttpError: "warn"
		}
	}
}

export default config

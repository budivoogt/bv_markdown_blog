<script lang="ts">
	import PostList from "$lib/components/PostList.svelte"
	import SeoHeader from "$lib/components/MarkdownSEOHeader.svelte"
	import * as Button from "$lib/components/ui/button"
	import type { MarkdownPost } from "$lib/types/types"
	import { SvelteComponent, type ComponentType } from "svelte"
	import type { PageData } from "./$types"

	export let data: PageData

	let meta: MarkdownPost
	let markdownPosts: MarkdownPost[]
	let content: ComponentType<SvelteComponent>
	$: ({ content, meta, markdownPosts } = data)
</script>

<SeoHeader {meta} />

<svelte:component this={content} />

<PostList posts={markdownPosts} header="Read more" class="my-6 border-t border-neutral-100 " />
<a href="/blog" class="">
	<Button.Root variant="outline" class="border-2 border-black">← Back</Button.Root>
</a>

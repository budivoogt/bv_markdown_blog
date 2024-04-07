<script lang="ts">
	import PostLayout from "$lib/components/PostLayout.svelte"
	import PostList from "$lib/components/PostList.svelte"
	import SeoHeader from "$lib/components/SEOHeader.svelte"
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

<PostLayout {meta}>
	<svelte:component this={content} />
</PostLayout>

<PostList posts={markdownPosts} header="Read more" class="mt-8" />

<a href="/blog" class="mt-8">
	<Button.Root variant="outline" class="border-2 border-black">← Back</Button.Root>
</a>

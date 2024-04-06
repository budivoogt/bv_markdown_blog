<script lang="ts">
	import PostList from "$lib/components/PostList.svelte"
	import SeoHeader from "$lib/components/SEOHeader.svelte"
	import * as Button from "$lib/components/ui/button"
	import type { MarkdownPost } from "$lib/types/types"
	import { capitalizer, formatDate } from "$lib/utils"
	import { Toaster } from "svelte-sonner"
	import type { PageData } from "./$types"

	export let data: PageData

	let meta: MarkdownPost
	let markdownPosts: MarkdownPost[]
	$: ({ content, meta, markdownPosts } = data)
</script>

<Toaster />
<SeoHeader {meta} />

<article>
	<hgroup class="space-y-3">
		<h1 class="mb-1 text-3xl">{capitalizer(meta.title ?? "")}</h1>
		<p class="text-sm font-light">{formatDate(meta.date)}</p>
	</hgroup>
	<div class="mt-1 flex gap-x-2 border-b-2 border-neutral-400/10">
		{#each meta.categories as category}
			<span class="rounded-sm">{category}</span>
		{/each}
	</div>
	<div class=" mt-8">
		<svelte:component this={content} />
	</div>
</article>

<PostList posts={markdownPosts} header="Read more" class="mt-8" />

<a href="/blog" class="mt-8">
	<Button.Root>Back to posts</Button.Root>
</a>

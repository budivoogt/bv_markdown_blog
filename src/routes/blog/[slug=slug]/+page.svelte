<script lang="ts">
	import { getLastPosts } from "$lib/client/mdPostHelpers"
	import ButtonOutline from "$lib/components/ButtonOutline.svelte"
	import SeoHeader from "$lib/components/MarkdownSEOHeader.svelte"
	import PostList from "$lib/components/PostList.svelte"
	import type { MarkdownPost } from "$lib/types/types"
	import { SvelteComponent, type ComponentType } from "svelte"
	import type { PageData } from "./$types"

	export let data: PageData

	let meta: MarkdownPost
	let markdownPosts: MarkdownPost[]
	let content: ComponentType<SvelteComponent>
	$: ({ content, meta, markdownPosts } = data)
	$: ({ title } = meta)
</script>

<SeoHeader {meta} />

<svelte:component this={content} />

<PostList posts={getLastPosts(markdownPosts, 5, title)} header="Read more" class="mb-6 mt-12" />
<ButtonOutline></ButtonOutline>

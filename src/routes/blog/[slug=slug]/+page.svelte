<script lang="ts">
	import { getLastPosts } from "$lib/client/mdPostHelpers"
	import ButtonOutline from "$lib/components/ButtonOutline.svelte"
	import PostList from "$lib/components/PostList.svelte"
	import SeoComponent from "$lib/components/SEOComponent.svelte"
	import type { MarkdownPost } from "$lib/types/types"
	import { SvelteComponent, type ComponentType } from "svelte"

	export let data

	let meta: MarkdownPost
	let markdownPosts: MarkdownPost[]
	let content: ComponentType<SvelteComponent>
	$: ({ content, meta, markdownPosts } = data)
	$: ({ title, description, tags } = meta)
</script>

<SeoComponent data={{ title, description, tags }}></SeoComponent>

<svelte:component this={content} />

<PostList posts={getLastPosts(markdownPosts, 5, title)} header="Read more" class="mb-6 mt-12" />
<ButtonOutline></ButtonOutline>

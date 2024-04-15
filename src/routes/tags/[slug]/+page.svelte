<script lang="ts">
	import { page } from "$app/stores"
	import PageHeader from "$lib/components/PageHeader.svelte"
	import PostList from "$lib/components/PostList.svelte"
	import SeoComponent from "$lib/components/SEOComponent.svelte"
	import * as Button from "$lib/components/ui/button"
	import { capitalizer } from "$lib/utils"

	export let data

	$: ({ postsWithTag } = data)
	$: ({
		params: { slug }
	} = $page)

	let styledSlug = capitalizer(slug)
	const title = `${styledSlug} posts`
	const description = `All posts about ${styledSlug}.`
</script>

<SeoComponent data={{ title, description, tags: [slug] }}></SeoComponent>

<PageHeader text={`${styledSlug} posts`}></PageHeader>
{#if postsWithTag}
	<PostList posts={postsWithTag} class="mt-8"></PostList>
{:else}
	<p class="mt-8">No posts with that tag found</p>
{/if}
<Button.Root variant="outline" class="mt-6 border-2 border-black" href="/blog"
	>← Back to blog</Button.Root
>

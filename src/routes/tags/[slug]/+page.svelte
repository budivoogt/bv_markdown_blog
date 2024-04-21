<script lang="ts">
	import { page } from "$app/stores"
	import ButtonOutline from "$lib/components/ButtonOutline.svelte"
	import PageHeader from "$lib/components/PageHeader.svelte"
	import PostList from "$lib/components/PostList.svelte"
	import SeoComponent from "$lib/components/SEOComponent.svelte"
	import { capitalizer } from "$lib/utils"

	export let data

	$: ({ postsWithTag } = data)
	$: ({
		params: { slug }
	} = $page)

	let styledSlug: string, title: string, description: string
	$: if (slug) {
		styledSlug = capitalizer(slug)
		title = `${styledSlug} posts`
		description = `All posts about ${styledSlug}.`
	}
</script>

<SeoComponent data={{ title, description, tags: [slug] }}></SeoComponent>

<PageHeader text={`${styledSlug} posts`}></PageHeader>
{#if postsWithTag}
	<PostList posts={postsWithTag} class="mt-8"></PostList>
{:else}
	<p class="mt-8">No posts with that tag found</p>
{/if}
<ButtonOutline></ButtonOutline>

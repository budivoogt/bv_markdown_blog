<script lang="ts">
	import { page } from "$app/stores"
	import PageHeader from "$lib/components/PageHeader.svelte"
	import PostList from "$lib/components/PostList.svelte"
	import { capitalizer } from "$lib/utils"
	export let data

	$: ({ postsWithTag } = data)
	$: ({
		params: { slug }
	} = $page)
</script>

<PageHeader text={`${capitalizer(slug)} posts`}></PageHeader>
{#if postsWithTag}
	<PostList posts={postsWithTag} class="mt-8"></PostList>
{:else}
	<p class="mt-8">No posts with that tag found</p>
{/if}

<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte"
	import { filterPostsPublished } from "$lib/helper"
	export let data

	$: ({ posts } = data)
	$: publishedPosts = filterPostsPublished(posts)
</script>

<PageHeader text="Home" />

<h2 class="my-4 text-2xl">Recent blog posts</h2>
<ul>
	{#each publishedPosts as { title, description, slug, id }, index (id)}
		<a href={`blog/${slug}`}>
			<li class="my-2">
				<h1 class="font-bold">{title}</h1>
				<p class="italic">{description}</p>
				<p class="italic"></p>
			</li>
		</a>
	{/each}
</ul>

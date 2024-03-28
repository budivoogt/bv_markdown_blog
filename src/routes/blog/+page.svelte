<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte"
	import { filterPostsPublished } from "$lib/client/postHelpers.js"

	export let data

	$: ({ posts } = data)
	$: publishedPosts = filterPostsPublished(posts)
</script>

<PageHeader text="Blog" />

<h2 class="text-2xl">Recent blog posts</h2>

<ul class="my-4 flex flex-col gap-1">
	{#each publishedPosts as { title, description, slug }}
		<a href={`/blog/${slug}`}>
			<li>
				<h3 class="font-bold">
					{title}
				</h3>
				<span class="italic">
					{description}
				</span>
			</li>
		</a>
	{/each}
</ul>

<script lang="ts">
	import { filterPostsPublished } from "$lib/client/postHelpers.js"
	import PageHeader from "$lib/components/PageHeader.svelte"
	import type { Post } from "$lib/schemas/drizzleSchema.js"
	import type { MarkdownPost } from "$lib/types/types.js"
	import { formatDate } from "$lib/utils.js"

	export let data
	let posts: Post[]
	let markdownPosts: MarkdownPost[] | null = null

	$: ({ posts, markdownPosts } = data)
	$: publishedPosts = filterPostsPublished(posts)
</script>

<PageHeader text="Blog" />

{#if markdownPosts}
	<h2 class="text-2xl">Recent Markdown blog posts</h2>
	<ul class="my-4 flex flex-col gap-y-2 divide-y">
		{#each markdownPosts as { title, description, slug, date }}
			<a href={`/blog/${slug}`}>
				<li>
					<h3>
						{title}
					</h3>
					<p class="text-sm font-light">
						{formatDate(date)}
					</p>
					<p>
						{description}
					</p>
				</li>
			</a>
		{/each}
	</ul>
{/if}

<h2 class="text-2xl">Recent database blog posts</h2>

<ul class="my-4 flex flex-col gap-y-4">
	{#each publishedPosts as { title, description, slug, createdAt }}
		<a href={`/blog/${slug}`}>
			<li>
				<h3>
					{title}
				</h3>
				<p class="text-sm font-light">
					{formatDate(createdAt)}
				</p>
				<p>
					{description}
				</p>
			</li>
		</a>
	{/each}
</ul>

<style>
	h3 {
		@apply text-lg font-semibold hover:underline hover:decoration-lime-500 hover:decoration-4 hover:underline-offset-2;
	}
</style>

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
	<h2 class="text-2xl">Markdown posts</h2>
	<ul class="my-4 flex flex-col gap-y-3">
		{#each markdownPosts as { title, description, slug, date }}
			<a href={`/blog/${slug}`}>
				<li>
					<h3 class="post-titles">
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

<h2 class="text-2xl">Database posts</h2>

<ul class="my-4 flex flex-col gap-y-3">
	{#each publishedPosts as { title, description, slug, createdAt }}
		<a href={`/blog/${slug}`}>
			<li>
				<h3 class="post-titles">
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

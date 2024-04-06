<script lang="ts">
	import { filterPostsPublished } from "$lib/client/postHelpers.js"
	import PageHeader from "$lib/components/PageHeader.svelte"
	import PostList from "$lib/components/PostList.svelte"
	import type { Post } from "$lib/schemas/drizzleSchema.js"
	import type { MarkdownPost } from "$lib/types/types.js"

	export let data
	let posts: Post[]
	let markdownPosts: MarkdownPost[] | null = null

	$: ({ posts, markdownPosts } = data)
	$: publishedPosts = filterPostsPublished(posts)
</script>

<PageHeader text="Blog" />

<PostList posts={markdownPosts} header="Markdown posts" />
<div class="mt-8">
	<PostList posts={publishedPosts} header="Database posts" hrefPath="/blog" />
</div>

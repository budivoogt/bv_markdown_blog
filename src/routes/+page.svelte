<script lang="ts">
	import { filterPostsPublished } from "$lib/client/postHelpers.js"
	import PageHeader from "$lib/components/PageHeader.svelte"
	import PostList from "$lib/components/PostList.svelte"
	import * as Button from "$lib/components/ui/button"

	export let data
	let introStory: string = `Welcome! I'm an indie developer from The Netherlands. I have a decade of experience in the music industry, and am now looking to bootstrap a tech business. I share my learnings on this blog.
		`

	$: ({ posts, markdownPosts } = data)
	$: publishedPosts = filterPostsPublished(posts)
</script>

<PageHeader text="Budi Voogt" />

<p class="my-4 whitespace-pre-line">{introStory}</p>

<PostList posts={markdownPosts} />

<h2 class="mt-4 text-lg">Newsletter</h2>
<div class="mt-4 flex flex-row items-baseline justify-start space-x-2 space-y-2">
	<input type="text" placeholder="Subscribe" class="rounded border-2 border-neutral-300 px-2" />
	<Button.Root class="border-2 border-neutral-300" variant="outline">Submit</Button.Root>
</div>

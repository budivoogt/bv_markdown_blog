<script lang="ts">
	import { getLastPosts } from "$lib/client/mdPostHelpers"
	import PageHeader from "$lib/components/PageHeader.svelte"
	import PostList from "$lib/components/PostList.svelte"
	import * as Button from "$lib/components/ui/button"

	export let data
	$: ({ markdownPosts } = data)
	$: posts = getLastPosts(markdownPosts, 5)
</script>

<div class="space-y-6">
	<PageHeader text="Budi Voogt" />
	<p class="prose">
		Welcome! I'm an indie developer and founder from The Netherlands. I spent a decade running
		businesses in the music industry. Now I aspire to bootstrap a modest tech business. Read my
		<a href="/about">story here.</a>
	</p>
	<PostList header="Latest posts" {posts} readMore />
	<h2 class="text-lg">Newsletter</h2>
	<div class="flex flex-row items-baseline justify-start space-x-2">
		<input
			type="text"
			placeholder="Subscribe"
			class="rounded border-2 border-neutral-300 px-2"
		/>
		<Button.Root class="border-2 border-neutral-300" variant="outline">Submit</Button.Root>
	</div>
</div>

<b></b>

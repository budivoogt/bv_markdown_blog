<script lang="ts">
	import { getLastPosts } from "$lib/client/mdPostHelpers"
	import PageHeader from "$lib/components/PageHeader.svelte"
	import PostList from "$lib/components/PostList.svelte"
	import SeoComponent from "$lib/components/SEOComponent.svelte"
	import * as Button from "$lib/components/ui/button"
	import { Github, Linkedin, Twitter } from "lucide-svelte"

	export let data
	$: ({ markdownPosts } = data)
	$: posts = getLastPosts(markdownPosts, 5)

	const title = "Budi Voogt"
	const description =
		"From music industry founder to indie web developer. Follow my journey on this personal blog."
</script>

<SeoComponent data={{ title, description }} />

<div class="space-y-4">
	<PageHeader text="Budi Voogt" />
	<enhanced:img
		src="$lib/images/budi@2x.jpg"
		alt="A headshot photo of Budi Voogt"
		sizes="(min-width:3840px) 6014px"
		class="my-4 h-auto w-3/5 rounded border border-black lg:w-1/2"
	/>
	<p class="prose">
		Welcome! I'm a founder and web developer from The Netherlands. I spent a decade running
		businesses in the music industry. I plan to bootstrap a tech business next. I love exercise,
		art, reading and am a recent father of one.
		<a href="/about">Read more about me here. </a>
	</p>
	<div class="flex flex-row gap-x-3">
		<a href="https://x.com/0x_brucey" target="_blank">
			<Twitter strokeWidth="1.5" class="h-5" /></a
		>
		<a href="https://github.com/brucey0x" target="_blank"
			><Github strokeWidth="1.5" class="h-5" /></a
		>
		<a href="https://www.linkedin.com/in/budivoogt/" target="_blank"
			><Linkedin strokeWidth="1.5" class="h-5" /></a
		>
	</div>
</div>
<div class="mt-8 space-y-6">
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

<script lang="ts">
	import { getLastPosts } from "$lib/client/mdPostHelpers"
	import Alert from "$lib/components/Alert.svelte"
	import PageHeader from "$lib/components/PageHeader.svelte"
	import PostList from "$lib/components/PostList.svelte"
	import * as Button from "$lib/components/ui/button"
	import { Input } from "$lib/components/ui/input"
	import { Github, Linkedin, Twitter } from "lucide-svelte"
	import { CldImage } from "svelte-cloudinary"

	export let data
	$: ({ markdownPosts } = data)
	$: posts = getLastPosts(markdownPosts, 5)

	let email: string = ""
	let showDialog: boolean = false
	async function handleSubmit() {
		showDialog = true
		const encodedEmail = `email=${encodeURIComponent(email)}`
		email = ""

		try {
			const response = await fetch(
				"https://buttondown.email/api/emails/embed-subscribe/budi",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: encodedEmail
				}
			)

			if (!response.ok) {
				console.error("Subscription failed")
			}
		} catch (error) {
			console.error("Error:", error)
		}
	}
</script>

<div class="space-y-4">
	<PageHeader text="Budi Voogt" />
	<div class="my-4 w-1/2 lg:w-1/3">
		<CldImage
			src="bv-blog/bsrwfkvu9jxm2t4eumef"
			alt="A headshot photo of Budi Voogt"
			width={2004}
			height={2672}
			layout="constrained"
			loading="eager"
			decoding="async"
			fetchpriority="high"
			sizes="(max-width: 1024px) 50vw, 33.33vw"
			class="rounded-sm"
		/>
	</div>
	<p class="prose">
		Welcome! I'm an entrepreneur from The Netherlands. I spent a decade running businesses in
		the music industry. Now I code and want to build a tech business. I love exercise, art,
		reading and am a recent father of one.
		<a href="/about" class="hover:decoration-orange-500">This is my work.</a>
	</p>
	<div class="flex flex-row gap-x-3">
		<a href="https://x.com/0x_brucey" aria-label="Visit my X profile" target="_blank">
			<Twitter strokeWidth="1.5" class="h-5" /></a
		>
		<a href="https://github.com/budivoogt" aria-label="Visit my Github profile" target="_blank"
			><Github strokeWidth="1.5" class="h-5" /></a
		>
		<a
			href="https://www.linkedin.com/in/budivoogt/"
			aria-label="Visit my LinkedIn profile"
			target="_blank"><Linkedin strokeWidth="1.5" class="h-5" /></a
		>
	</div>
</div>
<PostList header="Latest posts" {posts} readMore class="mt-10" />
<div class="mt-8">
	<h2 class="text-lg">Newsletter</h2>
	<form
		on:submit|preventDefault={handleSubmit}
		class="embeddable-buttondown-form my-4 flex w-full max-w-sm items-center space-x-2"
	>
		<Input type="email" placeholder="Email" name="email" id="bd-email" bind:value={email} />
		<Button.Root
			class="border-2 border-neutral-400 hover:border-transparent hover:bg-orange-500 hover:text-white"
			variant="outline"
			type="submit">Subscribe</Button.Root
		>
	</form>
</div>

<Alert
	{showDialog}
	showCancel={false}
	proceedAction={() => (showDialog = false)}
	title="Confirm your address"
	description="Click the link in the email you were just sent. Then you're in!"
	proceed="I confirmed 👌"
></Alert>

<style>
	.image-card {
		@apply my-4 w-1/2 rounded-sm lg:w-1/3;
	}
</style>

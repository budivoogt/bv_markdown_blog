<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte"
	import * as Card from "$lib/components/projectcard/"
</script>

<svelte:head>
	<title>Coding projects</title>
	<meta name="description" content="Overview of my coding and entrepreneurial projects." />
</svelte:head>

<PageHeader text="Coding" />

<div>
	<h2 class="my-4 text-2xl">My journey</h2>
	<p>
		After more than 10 years of non-technical entrepreneurship, I'm eager to run a tech
		business. That's why I'm learning to code. <br /><br />
		I began in 2023 with Python, progressed to Javascript, Typescript and now primarily work in SvelteKit.
		<br /><br />
		As a solo dev I need to keep things simple, so I'm excited to master a few tools. I'm now learning
		this stack:
	</p>
	<ul class="my-2 ml-4 list-inside list-disc">
		<li>SvelteKit</li>
		<li>Typescript</li>
		<li>Supabase</li>
		<li>Tailwind CSS</li>
		<li>Vercel</li>
	</ul>
	<p>
		I'm eager to connect with other builders. Find me on <a
			href="https://x.com/0x_brucey"
			target="_blank">X</a
		>
		or <a href="https://github.com/brucey0x" target="_blank">GitHub</a>.
	</p>
</div>

<h2 class="my-4 text-2xl">Portfolio projects</h2>

<div class="grid grid-cols-3 border-2 border-black">
	<div class="col-start-1">Banana</div>
	<div class="col-start-2">Banana</div>
	<div class="col-start-3">Banana</div>
	<div class="col-start-1">Banana</div>
	<div class="col-start-2">Banana</div>
	<div class="col-start-3">Banana</div>
</div>
<div class="my-4">
	<Card.Root>
		<Card.Header slot="header" title="Recipe tracker" />
		<Card.Body slot="body"><p>Wouter is een baas</p></Card.Body>
		<Card.Footer slot="footer"><div>Wouter is kort</div></Card.Footer>
	</Card.Root>
</div>

<style>
	p {
		@apply my-2;
	}
</style>

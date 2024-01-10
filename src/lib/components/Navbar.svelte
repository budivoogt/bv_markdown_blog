<script lang="ts">
	import { page } from "$app/stores"
	import { Github, Linkedin, Twitter } from "lucide-svelte"
</script>

<div class="flex flex-row justify-between border-b-2 border-black pb-2">
	<div class="flex flex-row gap-x-2">
		<a href="/">Home</a>
		<a href="/blog">Blog</a>
		<a href="/coding">Coding</a>
		<a href="/about">About</a>
	</div>
	<div class="flex flex-row gap-x-2">
		<a href="/admin">Admin</a>
		{#if $page.data.session}
			<a href="/admin/profile">Profile</a>
			<a href="/admin/posts">Posts</a>
			<a href="/admin/projects">Projects</a>
		{/if}
	</div>
	<div class="flex flex-row gap-x-3">
		<a href="https://twitter.com/0x_brucey" target="_blank"> <Twitter strokeWidth="1.5" /></a>
		<a href="https://github.com/brucey0x" target="_blank"><Github strokeWidth="1.5" /></a>
		<a href="https://www.linkedin.com/in/budivoogt/" target="_blank"
			><Linkedin strokeWidth="1.5" /></a
		>
	</div>
</div>

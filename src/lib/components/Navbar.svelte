<script lang="ts">
	import { page } from "$app/stores"
	import { Github, Linkedin, Twitter } from "lucide-svelte"
</script>

<div class="flex flex-wrap justify-between border-b border-neutral-300 pb-2">
	<div class="flex gap-x-3">
		<a href="/">Home</a>
		<a href="/blog">Blog</a>
		<a href="/about">About</a>
	</div>
	<div class="flex gap-x-3">
		<a href="/admin">Admin</a>
		{#if $page.data.session}
			<a href="/admin/profile">Profile</a>
			<a href="/admin/posts">Posts</a>
			<a href="/admin/projects">Projects</a>
		{/if}
	</div>
	<div class="flex gap-x-3">
		<a href="https://x.com/0x_brucey" target="_blank"> <Twitter strokeWidth="1.5" /></a>
		<a href="https://github.com/brucey0x" target="_blank"><Github strokeWidth="1.5" /></a>
		<a href="https://www.linkedin.com/in/budivoogt/" target="_blank"
			><Linkedin strokeWidth="1.5" /></a
		>
	</div>
</div>

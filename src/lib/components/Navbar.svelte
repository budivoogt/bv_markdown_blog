<script lang="ts">
	import { page } from "$app/stores"

	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/blog", label: "Blog" },
		{ href: "/about", label: "About" }
	]

	const adminLinks = [
		{ href: "/admin/profile", label: "Profile" },
		{ href: "/admin/posts", label: "Posts" },
		{ href: "/admin/projects", label: "Projects" }
	]

	$: ({
		url: { pathname }
	} = $page)
</script>

<div class="flex flex-wrap justify-between border-b border-neutral-300 pb-2">
	<div class="flex gap-x-3">
		{#each navLinks as link}
			<a href={link.href} class:nav-active={pathname === link.href} class="nav-inactive"
				>{link.label}</a
			>
		{/each}
	</div>
	<div class="flex gap-x-3">
		<a href="/admin" class="nav-inactive">Admin</a>
		{#if $page.data.session}
			{#each adminLinks as link}
				<a href={link.href} class:nav-active={pathname === link.href} class="nav-inactive"
					>{link.label}</a
				>
			{/each}
		{/if}
	</div>
</div>

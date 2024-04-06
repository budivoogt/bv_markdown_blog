<script lang="ts">
	import { formatDate } from "$lib/utils"
	import { cn } from "$lib/utils";

	export let posts
	export let header = "Posts"
	export let hrefPath = "/blog/md"
	let className: string | undefined= undefined
	export {className as class}
</script>

<div class={cn("mt-4 space-y-3", className)}>
	{#if posts}
		<h2 class="text-lg">{header}</h2>
		<ul class="flex flex-col divide-y divide-neutral-100 border-y border-neutral-100">
			{#each posts as { title, slug, date }}
				<ul class="group">
					<a href={`${hrefPath}/${slug}`} class="flex items-center space-x-4 py-2.5">
						<p class="text-sm font-light">
							{formatDate(date)}
						</p>
						<p class="post-titles">
							{title}
						</p>
					</a>
				</ul>
			{/each}
		</ul>
	{/if}
</div>

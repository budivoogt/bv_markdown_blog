<script lang="ts">
	import type { MarkdownPost } from "$lib/types/types"
	import { cn, formatDate } from "$lib/utils"

	export let posts: MarkdownPost[]
	export let header = "Posts"
	export let hrefPath = "/blog"
	export let readMore: boolean = false
	export let DateTimeFormatOptions: Intl.DateTimeFormatOptions | undefined = { month: "long", year: "numeric" }
	let className: string | undefined = undefined
	export { className as class }
</script>

<div class={cn("mt-4 space-y-3", className)}>
	{#if posts}
		<h2 class="text-lg">{header}</h2>
		<ul class="flex flex-col divide-y divide-neutral-100 border-y border-neutral-100">
			{#each posts as { title, slug, date }}
				<ul class="group">
					<a href={`${hrefPath}/${slug}`} class="flex items-center space-x-4 py-2.5">
						<p class="text-sm text-neutral-500">
							{formatDate(date, DateTimeFormatOptions)}
						</p>
						<p class="post-titles">
							{title}
						</p>
					</a>
				</ul>
			{/each}
		</ul>
	{/if}
	{#if readMore}
		<a href="/blog">
			<h3 class="mt-4 text-sm hover:underline">Read more...</h3>
		</a>
	{/if}
</div>

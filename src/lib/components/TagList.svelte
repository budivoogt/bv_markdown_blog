<script lang="ts">
	import { Badge } from "$lib/components/ui/badge"
	import { cn } from "$lib/utils"

	export let tags: Set<string> = new Set([
		"svelte",
		"sveltekit",
		"coding",
		"philosophy",
		"health"
	])

	let className: string | undefined = undefined
	export { className as class }
</script>

<div class={cn("my-4 space-y-3", className)}>
	<h2 class="text-lg">Tags</h2>
	<ul class="flex gap-x-1 gap-y-2">
		{#each tags as tag}
			<li class="">
				<a href={`/tags/${tag}`}>
					<Badge variant="postTags">
						{tag}
					</Badge>
				</a>
			</li>
		{/each}
	</ul>
</div>

<script lang="ts">
	import { cn } from "$lib/utils"

	export let tags: string[] = ["svelte", "sveltekit", "coding", "philosophy", "health"]
	let sortedTags: string[] = tags.toSorted()

	let className: string | undefined = undefined
	export { className as class }
</script>

<div class={cn("my-4 space-y-3", className)}>
	<h2 class="text-lg">Tags</h2>
	<ul class="flex gap-x-1 gap-y-2">
		{#each sortedTags as tag}
			<li class="">
				<a href={`/tags/${tag}`} class="">
					<p
						class="rounded-lg bg-neutral-500/80 px-1.5 text-center text-neutral-50 hover:bg-orange-400 active:bg-yellow-300"
					>
						{tag}
					</p>
				</a>
			</li>
		{/each}
	</ul>
	<ul class="grid auto-cols-min gap-y-2">
		{#each sortedTags as tag}
			<li class="">
				<a href={`/tags/${tag}`} class="">
					<p
						class="rounded-lg bg-neutral-500/80 px-1.5 text-center text-neutral-50 hover:bg-orange-400 active:bg-yellow-300"
					>
						{tag}
					</p>
				</a>
			</li>
		{/each}
	</ul>
	<ul class="grid auto-cols-max gap-y-2">
		{#each sortedTags as tag}
			<li class="">
				<a href={`/tags/${tag}`} class="">
					<p
						class="rounded-lg bg-neutral-500/80 px-1.5 text-neutral-50 hover:bg-orange-400 active:bg-yellow-300"
					>
						{tag}
					</p>
				</a>
			</li>
		{/each}
	</ul>
</div>

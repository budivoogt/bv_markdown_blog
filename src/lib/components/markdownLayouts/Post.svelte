<script lang="ts">
	import { Badge } from "$lib/components/ui/badge"
	import { capitalizer, formatDate } from "$lib/utils"
	import { Timer } from "lucide-svelte"

	export let title, date, categories, readingTime
	// Need to remove this function after I standardize tags
	let sortedCategories = categories.toSorted().map((cat) => cat.toLowerCase())
</script>

<article>
	<hgroup class="space-y-2">
		<h1 class="text-3xl">{capitalizer(title ?? "")}</h1>
		<div class="flex gap-x-4 align-top text-neutral-500">
			{#if date}
				<p>{formatDate(date, { dateStyle: "long" })}</p>
			{/if}
			{#if readingTime}
				<div class="flex gap-x-2">
					<Timer class="h-5 w-5" />
					<p>{readingTime.text}</p>
				</div>
			{/if}
		</div>
		<div class="flex gap-x-1">
			{#if sortedCategories}
				{#each sortedCategories as category}
					<a href={`/tags/${category}`}>
						<Badge variant="postTags">
							{category}
						</Badge>
					</a>
				{/each}
			{/if}
		</div>
	</hgroup>
	<div class="prose prose-neutral mt-8">
		<slot />
	</div>
</article>

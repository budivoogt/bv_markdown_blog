<script lang="ts">
	import { capitalizer, formatDate } from "$lib/utils"
	import { Timer } from "lucide-svelte"

	export let title, date, categories, readingTime
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
		<div class="flex gap-x-2">
			{#if categories}
				{#each categories as category}
					<span class="rounded-lg bg-neutral-500/80 px-1.5 text-neutral-50"
						>{category}</span
					>
				{/each}
			{/if}
		</div>
	</hgroup>
	<div class="prose prose-neutral mt-8">
		<slot />
	</div>
</article>

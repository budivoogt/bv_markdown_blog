<script lang="ts">
	import { capitalizer, formatDate } from "$lib/utils"

	export let title, date, categories
</script>

<article>
	<hgroup class="space-y-3">
		<h1 class="mb-1 text-3xl">{capitalizer(title ?? "")}</h1>
		{#if date}
			<p class="text-sm font-light">{formatDate(date)}</p>
		{/if}
	</hgroup>
	<div class="mt-1 flex gap-x-2 border-b-2 border-neutral-400/10">
		{#if categories}
			{#each categories as category}
				<span class="rounded-sm">{category}</span>
			{/each}
		{/if}
	</div>
	<div class="prose prose-neutral mt-8">
		<slot />
	</div>
</article>

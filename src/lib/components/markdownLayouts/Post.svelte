<script lang="ts">
	import { capitalizer, formatDate } from "$lib/utils"

	export let title, date, categories
</script>

<article>
	<hgroup class="space-y-2">
		<h1 class="text-3xl">{capitalizer(title ?? "")}</h1>
		{#if date}
			<p class="">{formatDate(date, { dateStyle: "long" })}</p>
		{/if}
		<div class="flex gap-x-2">
			{#if categories}
				{#each categories as category}
					<span class="rounded-lg bg-neutral-500 px-1.5 py-1 text-neutral-50"
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

<script lang="ts">
	import { standardizeTags } from "$lib/client/mdPostHelpers"
	import { Badge } from "$lib/components/ui/badge"
	import { capitalizer, formatDate } from "$lib/utils"
	import { Timer } from "lucide-svelte"

	export let title, date, tags, readingTime
	$: tags = standardizeTags(tags)
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
			{#if tags}
				{#each tags as tag}
					<a href={`/tags/${tag}`}>
						<Badge variant="postTags">
							{tag}
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

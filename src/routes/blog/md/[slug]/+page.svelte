<script lang="ts">
	import type { MarkdownPost } from "$lib/types/types"
	import { capitalizer, formatDate } from "$lib/utils"
	import { Toaster } from "svelte-sonner"
	import type { PageData } from "./$types"

	export let data: PageData

	let meta: MarkdownPost
	$: ({ content, meta } = data)

	// export let form: ActionData
	// $: if (form?.status) {
	// 	toast.success(`Post status changed to ${form?.status}`)
	// }
</script>

<svelte:head>
	{#if meta}
		<title>{meta.title}</title>
		<meta name="og:description" content={meta.description} />
		<meta name="og:type" content="article" />
		<meta property="og:title" content={meta.title} />
	{/if}
</svelte:head>

<Toaster />
<article class="mx-auto w-4/5">
	<hgroup class="">
		<h1 class="mb-1 text-3xl">{capitalizer(meta.title ?? "")}</h1>
		<p class="border-b-2 border-neutral-400/50 pb-1">{formatDate(meta.date)}</p>
	</hgroup>
	<div class="mt-1 flex gap-x-2">
		{#each meta.categories as category}
			<span class="">{category}</span>
		{/each}
	</div>
	<div class=" mt-8">
		<svelte:component this={content} />
	</div>
</article>

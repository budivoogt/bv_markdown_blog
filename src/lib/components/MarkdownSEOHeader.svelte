<script lang="ts">
	export let meta

	$: ({ title, description } = meta)
</script>

<svelte:head>
	{#if meta}
		<title>{title}</title>
		<meta name="og:description" content={description} />
		<meta name="og:type" content="article" />
		<meta property="og:title" content={title} />
	{/if}
</svelte:head>

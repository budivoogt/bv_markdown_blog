<script lang="ts">
	export let meta

	$: ({ title, description, tags } = meta)
</script>

<svelte:head>
	{#if meta}
		<title>{title}</title>
		<meta name="og:description" content={description} />
		<meta name="og:type" content="article" />
		<meta property="og:title" content={title} />
		{#if tags && tags.length > 0}
			<meta name="keywords" content={tags.join(", ")} />
		{/if}
	{/if}
</svelte:head>

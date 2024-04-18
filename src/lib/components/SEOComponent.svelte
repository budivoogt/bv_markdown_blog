<script lang="ts">
	import { page } from "$app/stores"
	import { PUBLIC_CANONICAL_ORIGIN } from "$env/static/public"
	import { decorate } from "$lib/utils"

	type SeoData = {
		title: string
		description: string
		canonical_origin?: string
		tags?: string[]
		ogType?: "website" | "article"
		index?: boolean
		follow?: boolean
		author?: string
		openGraphImage?: string
		twitterImage?: string
	}

	export let data: SeoData = {
		title: "Budi Voogt",
		description:
			"From music industry founder to angel investor and indie web developer. Looking to bootstrap my next business. Follow my journey on this blog.",
		ogType: "website",
		index: true,
		follow: true,
		author: "Budi Voogt"
	}

	$: ({
		title,
		description,
		canonical_origin,
		tags,
		ogType,
		index,
		follow,
		author,
		openGraphImage,
		twitterImage
	} = data)
</script>

<svelte:head>
	{#if title}
		<title>{$page.url.pathname !== "/" ? decorate(title) : title}</title>
		<meta property="og:title" content={title} />
		<meta name="twitter:title" content={title} />
	{/if}

	{#if description}
		<meta name="description" content={description} />
		<meta name="og:description" content={description} />
		<meta name="twitter:description" content={description} />
	{/if}

	<meta name="og:type" content={ogType} />

	{#if tags && tags.length > 0}
		<meta name="keywords" content={tags.join(", ")} />
	{/if}

	{#if openGraphImage}
		<meta property="og:image" content={openGraphImage} />
	{/if}

	{#if twitterImage}
		<meta name="twitter:image" content={twitterImage} />
	{/if}

	{#if $page.url}
		<meta property="og:url" content={`${$page.url}`} />
		<meta property="twitter:domain" content={`${$page.url.host}`} />
		<meta property="twitter:url" content={`${$page.url}`} />
	{/if}

	<link
		rel="canonical"
		href={canonical_origin ?? `${PUBLIC_CANONICAL_ORIGIN}${$page.url.pathname}`}
	/>

	<meta name="author" content={author} />

	<meta
		name="robots"
		content={`${index ? "index" : "noindex"}, ${follow ? "follow" : "nofollow"}, max-snippet: -1, max-image-preview:large, max-video-preview:-1`}
	/>

	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
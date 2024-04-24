<script lang="ts">
	import { page } from "$app/stores"
	import { PUBLIC_CANONICAL_ORIGIN } from "$env/static/public"
	import { decorate } from "$lib/utils"
	import { openGraphImage, siteDescription, siteTitle } from "$lib/utils/config"
	import { getCldOgImageUrl } from "svelte-cloudinary"

	type SeoData = {
		title: string
		description: string
		canonical_origin?: string
		tags?: string[]
		ogType?: "website" | "article"
		index?: boolean
		follow?: boolean
		author?: string
		OgImage?: { src: string; alt: string }
		xImage?: string
	}

	const defaultData: SeoData = {
		title: siteTitle,
		description: siteDescription,
		ogType: "website",
		OgImage: openGraphImage,
		index: true,
		follow: true,
		author: "Budi Voogt"
	}

	export let data: SeoData = defaultData

	$: data = { ...defaultData, ...data }

	$: if (data.OgImage) {
		const url = getCldOgImageUrl({ src: data.OgImage.src })
		const OgImgObject = { ...data.OgImage, src: url }
		data.OgImage = OgImgObject
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
		OgImage,
		xImage
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

	{#if OgImage}
		<meta property="og:image" content={OgImage.src} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="627" />
		<meta property="og:image:alt" content={OgImage.alt} />
	{/if}

	{#if xImage}
		<meta name="twitter:image" content={xImage} />
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

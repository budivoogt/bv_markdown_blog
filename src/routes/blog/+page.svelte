<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte"
	import PostList from "$lib/components/PostList.svelte"
	import SeoComponent from "$lib/components/SEOComponent.svelte"
	import TagList from "$lib/components/TagList.svelte"

	export let data
	$: ({ markdownPosts, markdownTags } = data)

	const title = "Blog posts"
	const description =
		"All my writing about topics like entrepreneurship, philosophy, exercise and coding."
</script>

<SeoComponent data={{ title, description }}></SeoComponent>

<PageHeader text="Blog" />

<PostList
	posts={markdownPosts}
	header="All posts"
	DateTimeFormatOptions={{ month: "long", year: "numeric" }}
	class="mt-8"
/>

<TagList tags={markdownTags} class="mt-8" />

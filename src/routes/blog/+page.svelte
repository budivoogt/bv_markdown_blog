<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte"
	import PostList from "$lib/components/PostList.svelte"
	import TagList from "$lib/components/TagList.svelte"

	export let data
	$: ({ markdownPosts } = data)
</script>

<PageHeader text="Blog" />

<PostList
	posts={markdownPosts}
	header="All posts"
	DateTimeFormatOptions={{ month: "long", year: "numeric" }}
	class="mt-8"
/>

<TagList class="mt-8" />

<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte"
	import PostList from "$lib/components/PostList.svelte"

	export let data
	$: ({ markdownPosts } = data)
</script>

<div class="space-y-6">
	<PageHeader text="Blog" />

	<PostList posts={markdownPosts} header="Posts" />
</div>

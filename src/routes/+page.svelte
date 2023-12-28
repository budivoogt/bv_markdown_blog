<script lang="ts">
	export let data

	const { posts } = data
</script>

<h1 class="my-4 text-3xl">Posts:</h1>
<ul>
	{#each posts as post}
		<li class="my-2">
			<h1 class="font-bold">{post.title}</h1>
			<p class="italic">{post.description}</p>
		</li>
	{/each}
</ul>

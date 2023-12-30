<script lang="ts">
	export let data
	import { page } from "$app/stores"

	const { posts } = data
</script>

<h1 class="my-4 text-3xl">Home</h1>

<h2 class="my-4 text-2xl">data:</h2>
<pre>
	{JSON.stringify(data, null, 2)}
</pre>

<h2 class="my-4 text-2xl">$page.data:</h2>
<pre>
	{JSON.stringify($page.data, null, 2)}
</pre>

<h1 class="my-4 text-3xl">Posts:</h1>
<ul>
	{#each posts as post}
		<li class="my-2">
			<h1 class="font-bold">{post.title}</h1>
			<p class="italic">{post.description}</p>
		</li>
	{/each}
</ul>

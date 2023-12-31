<script lang="ts">
	import { page } from "$app/stores"

	export let data
</script>

<h1 class="my-4 text-3xl">Blog</h1>

<h2 class="text-2xl">Data:</h2>
<pre>
    {JSON.stringify(data, null, 2)}
</pre>

<h2 class="text-2xl">$page.data:</h2>
<pre>
    {JSON.stringify($page.data, null, 2)}
</pre>

<h2 class="text-2xl">All posts (by recency):</h2>

<ul class="my-4 flex flex-col gap-1">
	{#each data.posts as post}
		<a
			href={`/blog/${post.title
				.trim()
				.toLowerCase()
				.replace(/['"]+/g, "")
				.replace(/[^a-zA-Z0-9]+/g, "-")}`}
		>
			<li>
				<h3 class="font-bold">
					{post.title}
				</h3>
				<span class="italic">
					{post.description}
				</span>
			</li>
		</a>
	{/each}
</ul>

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

<p>All posts, listed by recency.</p>

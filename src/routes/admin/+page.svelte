<script lang="ts">
	import { enhance } from "$app/forms"
	import { page } from "$app/stores"
	import type { PageData } from "./$types"

	export let data: PageData
	export let form

	// MAKE SURE THIS ROUTE AND CHILDREN ARE PROTECTED!
</script>

<h1 class="my-4 text-3xl">Admin</h1>

<h2 class="text-2xl">data:</h2>
<pre>
    {JSON.stringify(data, null, 2)}
</pre>

<h2 class="text-2xl">$page.data:</h2>
<pre>
    {JSON.stringify($page.data, null, 2)}
</pre>

<h1 class="my-8 text-2xl">Welcome, {$page.data}</h1>

<form method="POST" action="../auth?/signin" class="flex flex-col items-start gap-1" use:enhance>
	<button name="provider" value="github">Login with Github</button>
</form>

{#if form?.message}
	<p>{form.message}</p>
{/if}

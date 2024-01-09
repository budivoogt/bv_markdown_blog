<script lang="ts">
	import { enhance } from "$app/forms"
	import PageHeader from "$lib/components/PageHeader.svelte"
	import type { PageData } from "./$types"

	export let data: PageData
	export let form

	let title = "pancake"
	// MAKE SURE THIS ROUTE AND CHILDREN ARE PROTECTED!
</script>

<PageHeader text="Admin" />

<!-- <h2 class="text-2xl">data:</h2>
<pre>
    {JSON.stringify(data, null, 2)}
</pre> -->

<!-- <h2 class="text-2xl">$page.data:</h2>
<pre>
    {JSON.stringify($page.data, null, 2)}
</pre> -->

{#if data?.session?.user}
	<h1 class="my-8 text-2xl">
		Welcome{`${data.session ? " ," + data.session.user.email : ""}`}
	</h1>
{:else}
	<h1 class="my-8 text-2xl">Login or create account</h1>
{/if}

<form method="POST" action="../auth?/signin" class="flex flex-col items-start gap-1" use:enhance>
	<button name="provider" value="github" class="rounded border-2 border-black px-2 shadow"
		>Login with Github</button
	>
</form>

{#if form?.message}
	<p>{form.message}</p>
{/if}

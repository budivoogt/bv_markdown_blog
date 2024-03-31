<script lang="ts">
	import { page } from "$app/stores"

	$: ({ status } = $page)
</script>

{#if status === 404}
	<h1 class="text-2xl">You must be lost</h1>
	<a href="/" class="my-2">Go home</a>
{:else if status === 500}
	<h1 class="text-2xl">Unexpected internal error</h1>
	<p class="my-2">We'll work on fixing the issue.</p>
{:else if $page.error}
	<h1 class="text-2xl">Something went wrong</h1>
	<p class="my-2">Details on what happened: <br />{$page.error.message}</p>
{/if}

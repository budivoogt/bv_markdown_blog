<script lang="ts">
	import { enhance } from "$app/forms"
	import PageHeader from "$lib/components/PageHeader.svelte"
	import type { ActionData } from "../auth/$types"

	export let data

	const { session } = data
	export let form: ActionData

	// MAKE SURE THIS ROUTE AND CHILDREN ARE PROTECTED!
</script>

<PageHeader text="Admin" />

{#if session}
	<h1 class="my-8 text-2xl">
		Welcome{` ${session.user.email}`}
	</h1>
	<form method="POST" action="../auth?/signout" use:enhance>
		<button name="provider" value="github" class="rounded border-2 border-black px-2 shadow"
			>Logout</button
		>
	</form>
{:else}
	<h1 class="my-8 text-2xl">Login or create account</h1>

	<form method="POST" action="../auth?/signin" use:enhance>
		<button name="provider" value="github" class="rounded border-2 border-black px-2 shadow"
			>Login with Github (or create account)</button
		>
	</form>
{/if}

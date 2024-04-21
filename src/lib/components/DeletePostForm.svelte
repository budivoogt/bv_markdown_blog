<script lang="ts">
	import { applyAction, enhance } from "$app/forms"
	import { delPostToastStore } from "$lib/client/dbPostStores"
	import * as Button from "$lib/components/ui/button"
	import Alert from "./Alert.svelte"

	let deleteButtonElement: HTMLButtonElement | null = null
	export let id: number | null = null
	export let formAction: string | null = "?/deletePost"
</script>

<form
	action={formAction}
	method="post"
	use:enhance={() => {
		return async ({ result }) => {
			if (id) $delPostToastStore = { deleted: true, id }
			await applyAction(result)
		}
	}}
>
	<input type="hidden" name="id" value={id} />
	<button hidden bind:this={deleteButtonElement} />
	<Alert
		proceedAction={() => {
			if (deleteButtonElement) deleteButtonElement.click()
		}}
	>
		<slot slot="trigger">
			<Button.Root type="button" variant="destructive">Delete post</Button.Root>
		</slot>
	</Alert>
</form>

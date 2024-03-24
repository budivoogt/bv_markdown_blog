<script lang="ts">
	import { applyAction, enhance } from "$app/forms"
	import { goto } from "$app/navigation"
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
		return async ({ result, update }) => {
			console.log("Form submitted, result: ", result)

			if (result.type === "redirect") {
				goto(result.location)
				update()
			} else {
				console.log("Applying action")
				await applyAction(result)
				update()
			}
		}
	}}
>
	<input type="hidden" name="id" value={id} />
	<button hidden bind:this={deleteButtonElement}></button>
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

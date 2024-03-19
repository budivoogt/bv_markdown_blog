<script lang="ts">
	import * as AlertDialog from "$lib/components/ui/alert-dialog"

	export let description: string =
		"This action cannot be undone. This will permanently delete your data."
	export let title: string = "Are you sure?"
	export let cancel: string = "Cancel"
	export let cancelAction: (() => void) | null = null
	export let proceed: string = "Continue"
	export let proceedAction: (() => void) | null = null
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<slot name="trigger">Open dialog</slot>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{title}</AlertDialog.Title>
			<AlertDialog.Description>
				{description}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={cancelAction}>{cancel}</AlertDialog.Cancel>
			<AlertDialog.Action on:click={proceedAction}>{proceed}</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

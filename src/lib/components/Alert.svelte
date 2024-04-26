<script lang="ts">
	import * as AlertDialog from "$lib/components/ui/alert-dialog"

	export let description: string =
		"This action cannot be undone. This will permanently delete your data."
	export let title: string = "Are you sure?"
	export let cancel: string = "Cancel"
	export let showCancel: boolean = true
	export let cancelAction: (() => void) | null = null
	export let showProceed: boolean = true
	export let proceed: string = "Continue"
	export let proceedAction: (() => void) | null = null
	export let showDialog: boolean | null = null
</script>

{#if showDialog !== null}
	<AlertDialog.Root bind:open={showDialog}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{title}</AlertDialog.Title>
				<AlertDialog.Description>
					{description}
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				{#if showCancel}
					<AlertDialog.Cancel on:click={cancelAction}>{cancel}</AlertDialog.Cancel>
				{/if}
				{#if showProceed}
					<AlertDialog.Action on:click={proceedAction}>{proceed}</AlertDialog.Action>
				{/if}
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{:else}
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
				{#if showCancel}
					<AlertDialog.Cancel on:click={cancelAction}>{cancel}</AlertDialog.Cancel>
				{/if}
				{#if showProceed}
					<AlertDialog.Action on:click={proceedAction}>{proceed}</AlertDialog.Action>
				{/if}
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}

<script lang="ts">
	import { browser } from "$app/environment"
	import { page } from "$app/stores"
	import { formSchema } from "$lib/components/posteditor/schema"
	import * as Form from "$lib/components/ui/form"
	import { Input } from "$lib/components/ui/input"
	import * as Select from "$lib/components/ui/select"
	import { toast } from "svelte-sonner"
	import SuperDebug, { superForm } from "sveltekit-superforms"
	import { zodClient } from "sveltekit-superforms/adapters"
	import { Toaster } from "../ui/sonner"
	import { Textarea } from "../ui/textarea"

	$: ({ tags } = $page.data)

	const form = superForm($page.data.form, {
		validators: zodClient(formSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success("You submitted: " + JSON.stringify(f.data, null, 2))
			} else {
				toast.error(
					"Please fix the errors in your form: " + JSON.stringify(f.errors, null, 2)
				)
			}
		}
	})

	export const FormType = typeof form

	export const { form: formData, enhance } = form

	$: selectedTag = $formData.tag
		? {
				label: $formData.tag,
				value: $formData.tag
			}
		: undefined
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.title}
				class="border-neutral-300"
				placeholder="SEO friendly title, max 60 chars."
			/>
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea
				{...attrs}
				bind:value={$formData.description}
				class="border-neutral-300"
				placeholder="SEO friendly description, max 160 chars."
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="body">
		<Form.Control let:attrs>
			<Form.Label>Body</Form.Label>
			<Textarea {...attrs} class="border-neutral-300" bind:value={$formData.body} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="tag">
		<Form.Control let:attrs>
			<Form.Label>Tags</Form.Label>
			<Select.Root
				selected={selectedTag}
				onSelectedChange={(s) => {
					s && ($formData.tag = s.value)
				}}
			>
				<input hidden bind:value={$formData.tag} name={attrs.name} />
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a tag" />
				</Select.Trigger>
				<Select.Content>
					{#if tags}
						{#each tags as tag}
							<Select.Item value={tag.name} label={tag.name} />
						{/each}
					{/if}
				</Select.Content>
			</Select.Root>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<div class="mt-4 flex justify-center gap-4">
		<Form.Button type="submit">Save draft</Form.Button>
		<Form.Button variant="destructive" type="reset">Discard</Form.Button>
	</div>
	{#if browser}
		<div class="my-10">
			<SuperDebug data={$formData} />
		</div>
	{/if}
	<Toaster />
</form>

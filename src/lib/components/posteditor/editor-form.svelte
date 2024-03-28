<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import { discardPostHandler, recentPostSlug } from "$lib/client/postHelpers"
	import Alert from "$lib/components/Alert.svelte"
	import { formSchema } from "$lib/components/posteditor/schema"
	import * as Form from "$lib/components/ui/form"
	import { Input } from "$lib/components/ui/input"
	import * as Select from "$lib/components/ui/select"
	import { toast } from "svelte-sonner"
	import { superForm } from "sveltekit-superforms"
	import { zodClient } from "sveltekit-superforms/adapters"
	import { Toaster } from "../ui/sonner"
	import { Textarea } from "../ui/textarea"

	$: ({
		data: { tags, posts }
	} = $page)

	let lastSlug: string | null = null

	const form = superForm($page.data.form, {
		validators: zodClient(formSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success("Post saved", {
					action: {
						label: "View draft 👀",
						onClick: () => goto(`/blog/${f.data.slug}`)
					}
				})
			} else {
				toast.error(
					"Please fix the errors in your form: " + JSON.stringify(f.errors, null, 2)
				)
			}
		}
	})

	export const FormType = typeof form

	export const { form: formData, enhance, errors, constraints } = form

	$: if (posts && posts.length > 0) {
		lastSlug = recentPostSlug(posts)
	}

	$: selectedTags = $formData.tags?.map((tag: string) => ({ label: tag, value: tag })) || []
</script>

<Toaster />
<form method="POST" action="?/formSubmit" use:enhance>
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.title}
				class="border-neutral-300"
				placeholder="Max 60 chars"
				{...$constraints.title}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="slug">
		<Form.Control let:attrs>
			<Form.Label>URL slug</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.slug}
				class="border-neutral-300"
				placeholder="Max 50 chars, no spaces"
				{...$constraints.slug}
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
				placeholder="SEO friendly description, max 160 chars"
				{...$constraints.description}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="body">
		<Form.Control let:attrs>
			<Form.Label>Body</Form.Label>
			<Textarea
				{...attrs}
				class="border-neutral-300"
				bind:value={$formData.body}
				placeholder="Write in Markdown"
				{...$constraints.body}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="tags">
		<Form.Control let:attrs>
			<Form.Label>Tags</Form.Label>
			<Select.Root
				multiple
				selected={selectedTags}
				onSelectedChange={(s) => {
					if (s) {
						$formData.tags = s.map((t) => t.value)
					} else {
						$formData.tags = []
					}
				}}
			>
				{#if $formData.tags}
					{#each $formData.tags as tag}
						<input hidden bind:value={tag} name={attrs.name} />
					{/each}
				{/if}
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select tags" />
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
		<Form.Button type="submit" formaction="?/formSubmit">Save draft</Form.Button>
		<Alert
			description="Proceeding will clear the form."
			title="Are you sure?"
			proceedAction={() => {
				if (form) discardPostHandler(form)
			}}
		>
			<Form.Button variant="destructive" slot="trigger" type="button">Discard</Form.Button>
		</Alert>
		{#if lastSlug}
			<Form.Button variant="secondary" href={`/blog/${lastSlug}`}>View last draft</Form.Button
			>
		{/if}
	</div>
</form>

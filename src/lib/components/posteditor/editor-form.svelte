<script lang="ts">
	import { formSchema, type FormSchema } from "$lib/components/posteditor/schema"
	import * as Form from "$lib/components/ui/form"
	import { Input } from "$lib/components/ui/input"
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms"
	import { zodClient } from "sveltekit-superforms/adapters"

	export let data: SuperValidated<Infer<FormSchema>>

	const form = superForm(data, {
		validators: zodClient(formSchema)
	})

	export const FormType = typeof form

	const { form: formData, enhance } = form
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input {...attrs} bind:value={$formData.title} />
		</Form.Control>
		<Form.Description>Write an SEO friendly title</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Input {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.Description>Write an SEO friendly description.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="body">
		<Form.Control let:attrs>
			<Form.Label>Body</Form.Label>
			<Input {...attrs} bind:value={$formData.body} />
		</Form.Control>
		<Form.Description>Write your post</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>

<script lang="ts">
	import type { Tag } from "../../../../drizzle/schema"
	import Button from "../ui/button/button.svelte"
	import Input from "./Input.svelte"
	import Label from "./Label.svelte"

	let selectedTags: Tag[]

	export let tags: Tag[]
</script>

<!-- My custom practice form -->
<div class="mx-auto mt-4 w-2/4 p-4">
	<form action="" class="flex flex-col border-2 border-slate-300 p-4">
		<h1 class="flex justify-center text-xl">Edit post</h1>
		<Label forId="title">Title</Label>
		<Input type="text" name="title" id="title" />
		<Label forId="description">Description</Label>
		<Input type="text" name="description" id="description" />
		<Label forId="body">Body</Label>
		<Input type="text" name="body" id="body" />
		<Label forId="tags">Tags</Label>
		<select name="tags" id="tags" class="input-field" bind:value={selectedTags} multiple>
			{#if tags}
				{#each tags as tag}
					<option value={tag.name}>{tag.name}</option>
				{/each}
			{/if}
			<option>Create New Tag</option>
		</select>
		<div class="mt-2 flex flex-row justify-center gap-x-2">
			<Button type="submit">Save Draft</Button>
			<Button variant="destructive">Discard</Button>
		</div>
	</form>
</div>


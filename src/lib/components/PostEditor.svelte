<script lang="ts">
	import db from "$lib/server/database"
	import { postTags } from "$lib/stores/generalStores"
	const database = db()

	let selectedTag: string

	$: if ($postTags.length === 0) {
		selectedTag = "__new__"
	}
	$: console.log("selectedTag is: ", selectedTag)
</script>

<div class="mx-auto mt-4 w-2/4 p-4">
	<form action="" class="form-1">
		<h1 class="flex justify-center text-xl">Edit post</h1>
		<label for="title" class="label-input">Title</label>
		<input type="text" name="title" id="title" class="input-field" />
		<label for="description" class="label-input">Description</label>
		<input type="text" name="description" id="description" class="input-field" />
		<label for="body" class="label-input">Body</label>
		<input type="text" name="body" id="body" class="input-field" />
		<label for="tags" class="label-input">Tags</label>
		<select name="tags" id="tags" class="input-field" bind:value={selectedTag}>
			{#each $postTags as tag}
				<option value={tag}>{tag}</option>
			{/each}
			<option value="__new__">Create New Tag</option>
		</select>
		{#if selectedTag === "__new__"}
			<input type="text" class="input-field" name="newTag" placeholder="Enter new tag" />
		{/if}
		<div class="mt-2 flex flex-row justify-center">
			<button class="form-1-button">Save Draft</button>
			<button class="form-1-button">Discard</button>
		</div>
	</form>
</div>

<style>
	.form-1 {
		@apply flex flex-col border-2 border-slate-300 p-4;
	}
	.label-input {
		@apply my-2 border-2 border-slate-300 p-2 font-bold;
	}
	.input-field {
		@apply my-2 border-2 border-slate-300 p-2;
	}
	.form-1-button {
		@apply mx-2 w-1/6 border-2 border-slate-300;
	}
</style>

<script lang="ts">
	let tags = ["tag1", "tag2", "tag3"] // Existing tags

	let selectedTag = ""

	function handleTagChange(event: Event) {
		selectedTag = (event.target as HTMLSelectElement).value
	}
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
		<select name="tags" id="tags" on:change={handleTagChange} class="input-field">
			{#each tags as tag}
				<option value={tag}>{tag}</option>
			{/each}
			<option value="__new__">Create New Tag</option>
		</select>
		{#if selectedTag === "__new__"}
			<input
				type="text"
				name="newTag"
				id="newTag"
				placeholder="Enter new tag"
				class="input-field"
			/>
		{/if}
		<div class="mt-2 flex flex-row justify-center">
			<button class="form-1-button">Save Draft</button>
			<button class="form-1-button">Discard</button>
		</div>
	</form>
</div>

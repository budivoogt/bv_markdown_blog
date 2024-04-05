<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte"
	import EditorForm from "$lib/components/posteditor/editor-form.svelte"
</script>

<PageHeader text="Post editor" />
<p class="my-4">Ability to create new and update existing blog posts.</p>

<div class="mx-auto my-8 w-1/2 rounded-md border-2 border-black p-4">
	<EditorForm />
</div>

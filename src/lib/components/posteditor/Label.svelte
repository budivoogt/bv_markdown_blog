<script lang="ts">
	// Associate label with a HTML element's id. Couldn't use "for" since that's a JS standard prop.
	export let forId: string
</script>

<label {forId} class="my-2 border-2 border-slate-300 p-2 font-bold">
	<slot>Default label</slot>
</label>

<script lang="ts">
	export let text: string | null = null
</script>

{#if text}
	<h1 class="my-4 text-3xl">{text}</h1>
{/if}

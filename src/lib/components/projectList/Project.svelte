<script lang="ts">
	export let name: string
	export let description: string
	export let link: string | null = null
	export let acquired: string | null = null
</script>

<div class="col-start-1 grid-rows-2">
	<div class="flex">
		{#if link}
			<a href={link} target="_blank">
				<p class="project-header font-semibold">{name}</p>
			</a>
		{:else}
			<p class="project-header font-semibold">{name}</p>
		{/if}
		{#if acquired}
			<span class="pl-2 font-light italic">{acquired}</span>
		{/if}
	</div>
	<p class="font-light">{description}</p>
</div>

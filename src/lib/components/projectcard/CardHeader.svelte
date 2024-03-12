<script lang="ts">
	export let title = "CardHeader: Default title"
</script>

<header class="bg-blue-400 p-4 text-white">
	<h2 class="text-2xl font-bold">{title}</h2>
	<slot name="actions" />
</header>

<script lang="ts">
	import CardBody from "./CardBody.svelte"
	import CardFooter from "./CardFooter.svelte"
	import CardHeader from "./CardHeader.svelte"
</script>

<div class="w-full overflow-hidden rounded border shadow-lg md:w-1/2 lg:w-1/3">
	<slot name="header">
		<CardHeader />
	</slot>
	<slot name="body">
		<CardBody />
	</slot>
	<slot name="footer">
		<CardFooter />
	</slot>
</div>

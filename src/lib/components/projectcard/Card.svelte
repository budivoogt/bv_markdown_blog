<script lang="ts">
	import CardBody from "./CardBody.svelte"
	import CardFooter from "./CardFooter.svelte"
	import CardHeader from "./CardHeader.svelte"

	export let testMessage: string = "This is a test message from the Card component"
</script>

<div class="w-full overflow-hidden rounded border shadow-lg md:w-1/2 lg:w-1/3">
	<slot name="header">
		<CardHeader />
	</slot>
	<slot name="body">
		<!-- How do I pass these up another level? I'd prefer to avoid prop dilling -->
		<CardBody let:childMessage let:userName let:userCity />
	</slot>
	<slot name="footer">
		<CardFooter />
	</slot>
	<slot name="test" {testMessage}>Default test slot</slot>
</div>

<script lang="ts">
	export let childMessage: string = "Hi parent component"
	export let user: { name: string; city: string } = {
		name: "Peter",
		city: "The Hague"
	}
</script>

<div class="p-4">
	<slot {childMessage} userName={user.name} userCity={user.city}>CardBody fallback.</slot>
</div>

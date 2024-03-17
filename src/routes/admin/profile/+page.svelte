<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte"

	export let data
</script>

<PageHeader text="Profile" />

<div class="w-1/5 border border-slate-600">
	<div class="border-b border-inherit">Email: {data.session?.user.email}</div>
	<div class="">Authentication methods: {data.session?.user.app_metadata.providers}</div>
</div>

<div class="my-8">
	<h2 class="text-xl">About Page</h2>
	<h3 class="my-4 text-lg">Description</h3>
	<p class="text-red-500">
		Put an input field here with the database data of the about section so that I can edit it
		here
	</p>
</div>

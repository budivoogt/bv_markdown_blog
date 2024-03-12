<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte"

	export let data
</script>

<PageHeader text="Profile" />

<div class="w-1/5 border border-slate-600">
	<div class="border-b border-inherit">Email: {data.session?.user.email}</div>
	<div class="">Authentication methods: {data.session?.user.app_metadata.providers}</div>
</div>

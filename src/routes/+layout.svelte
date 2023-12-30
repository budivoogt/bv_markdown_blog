<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte"
	import "../app.css"
</script>

<div class="m-4">
	<Navbar />
	<slot />
</div>

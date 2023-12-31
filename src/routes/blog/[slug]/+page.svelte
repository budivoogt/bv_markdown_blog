<script lang="ts">
	import { capitalizer } from "$lib/helper.js"

	export let data
</script>

<h1 class="text-3xl">{capitalizer(data.post?.title ?? "")}</h1>

<p class="my-4">{capitalizer(data.post?.body ?? "")}</p>

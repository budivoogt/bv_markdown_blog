<script lang="ts">
	import { invalidate } from "$app/navigation"
	import Navbar from "$lib/components/Navbar.svelte"
	import { onMount } from "svelte"
	import "../app.css"

	export let data
	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event, _session) => {
			console.log("Event: ", event, "_session: ", _session)

			if (_session?.expires_at !== session?.expires_at || event === "SIGNED_OUT") {
				// Invalidate the browser client.
				invalidate("supabase:auth")
			}
		})

		// Return an anonymous function that unsubscribes (so that you don't call this automatically)
		return () => subscription.unsubscribe()
	})
</script>

<div class="m-4">
	<Navbar />
	<div class="mt-8">
		<slot />
	</div>
</div>

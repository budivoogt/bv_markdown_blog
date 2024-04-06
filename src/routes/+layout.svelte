<script lang="ts">
	import { invalidate } from "$app/navigation"
	import Navbar from "$lib/components/Navbar.svelte"
	import { onMount } from "svelte"
	import { derived, writable } from "svelte/store"
	import "../app.css"

	export let data
	$: ({ supabase, session } = data)

	let supabaseStore = writable<typeof supabase>()

	// Subscribe to the store and set its value reactively.
	$: supabaseStore.set(supabase)

	onMount(() => {
		const supabaseAuthStateSubscriptionStore = derived(supabaseStore, ($supabaseStore, set) => {
			const {
				data: { subscription }
			} = $supabaseStore.auth.onAuthStateChange((event, _session) => {
				if (_session?.expires_at !== session?.expires_at || event === "SIGNED_OUT") {
					// Invalidate the browser client.
					invalidate("supabase:auth")
				}
			})
			set(subscription)
			// cleanup function, triggered on component destruction.
			return () => {
				subscription.unsubscribe()
			}
		})
		// Returning an empty component which onMount calls when the component is destroyed. This'll trigger the cleanup returned function inside supabaseAuthStateSubscriptionStore.
		return supabaseAuthStateSubscriptionStore.subscribe(() => {})
	})
</script>

<div class="m-4">
	<Navbar />
	<div class=" mx-auto mb-16 mt-8 flex h-full max-w-3xl flex-col">
		<slot />
	</div>
</div>

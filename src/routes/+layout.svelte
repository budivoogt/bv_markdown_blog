<script lang="ts">
	import { invalidate } from "$app/navigation"
	import { page } from "$app/stores"
	import Navbar from "$lib/components/Navbar.svelte"
	import SeoComponent from "$lib/components/SEOComponent.svelte"
	import SimpleAnalytics from "$lib/components/SimpleAnalytics.svelte"
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

<SeoComponent data={{ title: $page.data.title, description: $page.data.description }} />

<div class="mx-auto my-4 flex h-full max-w-3xl flex-col px-4">
	<Navbar />
	<div class="mt-6">
		<slot />
	</div>
</div>

<SimpleAnalytics></SimpleAnalytics>

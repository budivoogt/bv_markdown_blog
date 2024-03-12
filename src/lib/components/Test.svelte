<script lang="ts">
	import { cn } from "$lib/utils"
	import type { HTMLAttributes } from "svelte/elements"
	type $$Props = HTMLAttributes<HTMLTableSectionElement>

        let active = false


	let className: $$Props["class"] = undefined
	export { className as class }
</script>

<div class={cn(
    "font-bold", className,
    active ?? 'text-blue-400'
)}>
	<slot>Test slot fallback</slot>
</div>

<script lang="ts">
	import * as Button from "$lib/components/ui/button"
	import { cn } from "$lib/utils"

	export let variant: Button.Variant = "outline"
	export let href = "/blog"
	export let text = "← Back to blog"
	let className: string | undefined = undefined
	export { className as class }
</script>

<Button.Root {variant} class={cn("my-6 border-2 border-black", className)} {href}
	><slot>{text}</slot></Button.Root
>

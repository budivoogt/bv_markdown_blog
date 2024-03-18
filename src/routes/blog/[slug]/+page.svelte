<script lang="ts">
	import { enhance } from "$app/forms"
	import * as Button from "$lib/components/ui/button"
	import { capitalizer } from "$lib/helper.js"
	import { Toaster, toast } from "svelte-sonner"
	import type { PageData } from "../$types"
	import type { ActionData } from "./$types"

	export let data: PageData

	export let form: ActionData

	$: ({ post, session } = data)

	$: if (form?.success) {
		toast.success(`Post status changed to ${form?.status}`)
	}
</script>

<Toaster />
<h1 class="text-3xl">{capitalizer(post?.title ?? "")}</h1>
{#if session}
	<div class="my-4 w-min rounded border-2 border-slate-400 p-2">
		<form method="POST" action="?/changeStatus" use:enhance>
			<input type="hidden" name="id" value={post?.id} />
			<input type="hidden" name="status" value={post?.status} />
			<Button.Root type="submit"
				>{post?.status === "draft" ? "Make public" : "Set draft"}</Button.Root
			>
		</form>
	</div>
{/if}

<p class="my-4">{capitalizer(post?.body ?? "")}</p>

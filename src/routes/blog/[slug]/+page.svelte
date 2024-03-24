<script lang="ts">
	import { enhance } from "$app/forms"
	import DeletePostForm from "$lib/components/DeletePostForm.svelte"
	import * as Button from "$lib/components/ui/button"
	import { capitalizer } from "$lib/helper.js"
	import type { Session } from "@supabase/supabase-js"
	import { Toaster, toast } from "svelte-sonner"
	import type { PageData } from "../$types"
	import type { Post } from "../../../../drizzle/schema"
	import type { ActionData } from "./$types"

	export let data: PageData
	let post: Post
	let session: Session | null
	$: ({
		post,
		session,
		post: { id }
	} = data)

	export let form: ActionData
	$: if (form?.success) {
		toast.success(`Post status changed to ${form?.status}`)
	}
	$: if (form?.deletedPost) {
		toast.success("Post deleted")
	}
</script>

<svelte:head>
	{#if post}
		<title>{post.title}</title>
		<meta name="description" content={post.description} />
	{/if}
</svelte:head>

<Toaster />
<div class="mx-auto w-4/5">
	<h1 class="text-3xl">{capitalizer(post?.title ?? "")}</h1>
	{#if session}
		<div class="my-4 flex w-min flex-row gap-2 rounded border-2 border-neutral-500 p-2">
			<Button.Root variant="outline" class="border-2 border-black" href="/admin/posts/editor"
				>Create new post</Button.Root
			>
			<Button.Root>Edit post</Button.Root>
			<form method="POST" action="?/changeStatus" use:enhance>
				<input type="hidden" name="id" value={post?.id} />
				<input type="hidden" name="status" value={post?.status} />
				<Button.Root type="submit"
					>{post?.status === "draft" ? "Make public" : "Set draft"}</Button.Root
				>
			</form>
			<DeletePostForm id={post?.id} formAction="../../admin/posts?/deletePost"
			></DeletePostForm>
		</div>
	{/if}

	<p class="my-8">{capitalizer(post?.body ?? "")}</p>
</div>

<script lang="ts">
	import { enhance } from "$app/forms"
	import { editPostHandler, newPostHandler } from "$lib/client/dbPostHelpers"
	import DeletePostForm from "$lib/components/DeletePostForm.svelte"
	import * as Button from "$lib/components/ui/button"
	import type { Post } from "$lib/schemas/drizzleSchema"
	import { capitalizer } from "$lib/utils"
	import { Toaster, toast } from "svelte-sonner"
	import type { ActionData, PageData } from "./$types"

	export let data: PageData
	let post: Post | undefined
	let id: Post["id"]
	let isBudiAuthenticated: boolean | null
	$: ({ post, isBudiAuthenticated } = data)
	$: if (post) {
		;({ id } = post)
	}

	export let form: ActionData
	$: if (form?.status) {
		toast.success(`Post status changed to ${form?.status}`)
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
	{#if isBudiAuthenticated}
		<div class="my-4 flex w-min flex-row gap-2 rounded border-2 border-neutral-500 p-2">
			<Button.Root variant="outline" class="border-2 border-black" on:click={newPostHandler}
				>Create new post</Button.Root
			>
			<Button.Root type="submit" on:click={() => editPostHandler(id)}>Edit post</Button.Root>
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

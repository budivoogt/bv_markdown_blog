<script lang="ts">
	import { enhance } from "$app/forms"
	import Alert from "$lib/components/Alert.svelte"
	import PageHeader from "$lib/components/PageHeader.svelte"
	import { Button } from "$lib/components/ui/button"
	import * as Table from "$lib/components/ui/table"
	import { capitalizer, findTagForPost } from "$lib/helper"
	import { Eye, Pencil, Trash2 } from "lucide-svelte"
	import { Toaster, toast } from "svelte-sonner"
	import type { PageData } from "../../$types"
	import type { ActionData } from "./$types"

	export let data: PageData
	export let form: ActionData

	$: ({ posts, postTags } = data)
	$: if (form?.success && form?.deletedPost) {
		toast.success(`Post deleted, id: ${form.deletedPost.id}`)
	}

	let deleteButtonElement: HTMLButtonElement | null = null
</script>

<Toaster />
<PageHeader text="Blog posts" />

<h2 class="mt-8 text-2xl">Manage your posts here</h2>
<p class="my-4">View all posts below, or create new ones.</p>

<div class="my-4 flex w-min flex-row gap-2 rounded border-2 border-neutral-500 p-2">
	<Button href="/admin/posts/editor">Create new post</Button>
</div>

<Table.Root>
	<Table.Caption>A list of all your blog posts. Click to edit.</Table.Caption>
	<Table.Header class="bg-neutral-200">
		<Table.Row>
			<Table.Head class="w-[100px]">ID #</Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head>Description</Table.Head>
			<Table.Head>Tags</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head>Created (MM/DD/YY)</Table.Head>
			<Table.Head class="w-[50px] text-right">View</Table.Head>
			<Table.Head class="w-[50px] text-right">Edit</Table.Head>
			<Table.Head class="w-[50px] text-right">Delete</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each posts as { id, title, description, status, createdAt, slug }}
			<Table.Row>
				<Table.Cell>{id}</Table.Cell>
				<Table.Cell>{title}</Table.Cell>
				<Table.Cell>{description}</Table.Cell>
				<Table.Cell>
					{#if postTags}
						{#each findTagForPost(id, postTags) as tag}
							{tag}
							<br />
						{/each}
					{/if}
				</Table.Cell>
				<Table.Cell>{status ? capitalizer(status) : null}</Table.Cell>
				<Table.Cell
					>{new Date(createdAt).toLocaleDateString("en-US", {
						year: "numeric",
						month: "short",
						day: "numeric"
					})}</Table.Cell
				>
				<Table.Cell class="flex-initial justify-center">
					<a href={`/blog/${slug}`}>
						<Eye strokeWidth="1" />
					</a>
				</Table.Cell>
				<Table.Cell class="flex-initial justify-center">
					<a href={`/blog/${slug}`}>
						<Pencil strokeWidth="1" />
					</a>
				</Table.Cell>
				<Table.Cell class="flex-initial justify-end">
					<form action="?/deletePost" method="post" use:enhance>
						<input type="hidden" name="id" value={id} />
						<button hidden bind:this={deleteButtonElement}></button>
						<Alert
							proceedAction={() => {
								if (deleteButtonElement) deleteButtonElement.click()
							}}
						>
							<button type="button" slot="trigger">
								<Trash2 strokeWidth="1" />
							</button>
						</Alert>
					</form>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>

<script lang="ts">
	import {
		
		editPostHandler,
		findTagForPost,
		newPostHandler
	} from "$lib/client/postHelpers"
	import { capitalizer } from "$lib/utils"
	import { delPostToastStore } from "$lib/client/postStores"
	import DeletePostForm from "$lib/components/DeletePostForm.svelte"
	import PageHeader from "$lib/components/PageHeader.svelte"
	import { Button } from "$lib/components/ui/button"
	import * as Table from "$lib/components/ui/table"
	import { Eye, Pencil, Trash2 } from "lucide-svelte"
	import { Toaster, toast } from "svelte-sonner"
	import type { PageData } from "../../$types"

	export let data: PageData
	$: ({ posts, postTags } = data)

	$: if ($delPostToastStore) {
		setTimeout(() => {
			if ($delPostToastStore) {
				const { deleted, id } = $delPostToastStore
				if (deleted) {
					toast.success(`Post deleted, id: ${id.toString()}`)
					$delPostToastStore = null
				}
			}
		}, 100) // 0.1-second delay
	}
</script>

<Toaster />
<PageHeader text="Blog posts" />

<h2 class="mt-8 text-2xl">Manage your posts here</h2>
<p class="my-4">View all posts below, or create new ones.</p>

<div class="my-4 flex w-min flex-row gap-2 rounded border-2 border-neutral-500 p-2">
	<Button on:click={newPostHandler}>Create new post</Button>
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
					<button type="button" on:click={() => editPostHandler(id)}>
						<Pencil strokeWidth="1" />
					</button>
				</Table.Cell>
				<Table.Cell class="flex-initial justify-end">
					<DeletePostForm {id} formAction="?/deletePost">
						<button type="button">
							<Trash2 strokeWidth="1" />
						</button>
					</DeletePostForm>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>

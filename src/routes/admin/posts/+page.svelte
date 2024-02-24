<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte"
	import { Button } from "$lib/components/ui/button"
	import * as Table from "$lib/components/ui/table"
	import { Eye, Pencil, Trash2 } from "lucide-svelte"
	import type { PageData } from "../../$types"

	export let data: PageData

	$: ({ posts } = data)
</script>

<PageHeader text="Blog posts" />

<h2 class="mt-8 text-2xl">Manage your posts here</h2>
<p class="my-4">View all posts below, or create new ones.</p>

<div class="my-4">
	<a href="/admin/posts/editor">
		<Button variant="secondary">Create new post</Button>
	</a>
</div>

<Table.Root>
	<Table.Caption>A list of all your blog posts. Click to edit.</Table.Caption>
	<Table.Header class="bg-slate-200">
		<Table.Row>
			<Table.Head class="w-[100px]">ID #</Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head>Description</Table.Head>
			<Table.Head>Tags</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head>Created At (MM/DD/YY)</Table.Head>
			<Table.Head class="w-[150px] text-right">View public</Table.Head>
			<Table.Head class="w-[50px] text-right">Edit</Table.Head>
			<Table.Head class="w-[50px] text-right">Delete</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each posts as { id, title, description, tags, status, createdAt, slug }}
			<Table.Row>
				<Table.Cell class="font-medium">{id}</Table.Cell>
				<Table.Cell>{title}</Table.Cell>
				<Table.Cell>{description}</Table.Cell>
				<Table.Cell>{tags}</Table.Cell>
				<Table.Cell>{status}</Table.Cell>
				<Table.Cell
					>{new Date(createdAt).toLocaleDateString("en-US", {
						year: "2-digit",
						month: "2-digit",
						day: "2-digit"
					})}</Table.Cell
				>
				<Table.Cell class="flex justify-end pr-5">
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
					<Trash2 strokeWidth="1" />
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>

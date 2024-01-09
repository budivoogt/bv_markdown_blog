<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte"
	import * as Table from "$lib/components/ui/table"
</script>

<PageHeader text="Blog posts" />

<p></p>

<Table.Root class="my-8">
	<Table.Caption>A list of all your blog posts.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">Invoice</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head>Method</Table.Head>
			<Table.Head class="text-right">Amount</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row>
			<Table.Cell class="font-medium">INV001</Table.Cell>
			<Table.Cell>Paid</Table.Cell>
			<Table.Cell>Credit Card</Table.Cell>
			<Table.Cell class="text-right">$250.00</Table.Cell>
		</Table.Row>
	</Table.Body>
</Table.Root>

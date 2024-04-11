<script lang="ts">
	import type { ExistingDocument, ProductList } from '$lib/db';
	import { Card, Heading } from 'flowbite-svelte';

	export let productlist: ExistingDocument<ProductList>;

	import { db as DB } from '$lib/db';
	import { get } from 'svelte/store';

	async function deleteList(id: string) {
		const db = get(DB);
		const list = await db.get(id);
		await db.remove(list);
	}
</script>

<head>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
		rel="stylesheet"
	/>
</head>

<Card href={`/items/${productlist._id}`} {...$$restProps}>
	<div class="flex items-center justify-between">
		<Heading tag="h4">{productlist.name}</Heading>
		<button
			class="inline-flex items-center justify-center rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
			on:click|stopPropagation|preventDefault={() => {
				if (confirm('Möchten Sie diese Liste wirklich löschen?')) {
					deleteList(productlist._id);
				}
			}}
		>
			<i class="fas fa-trash-alt"></i>
		</button>
	</div>
</Card>

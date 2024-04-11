<script lang="ts">
	import Product from '$lib/components/Product.svelte';
	import { Heading, ListPlaceholder, Alert, P } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { db, type ExistingDocument, type Product as PT } from '$lib/db';
	import { browser } from '$app/environment';
	console.log($db);

	export let data: PageData;

	export let products: ExistingDocument<PT>[] = [];

	data.products.then((result) => {
		products = result.docs as ExistingDocument<PT>[];
		if (browser) {
			$db
				.changes({
					since: 'now',
					live: true,
					include_docs: true,
					filter: (doc) => {
						return doc.type === 'product' || doc._deleted;
					}
				})
				.on('change', (change) => {
					if (change.deleted) {
						products = products.filter((list) => list._id !== change.id);
					} else {
						const index = products.findIndex((list) => list._id === change.id);
						if (change.doc && change.doc.type === 'product') {
							if (index === -1) {
								products = [...products, change.doc];
							} else {
								products[index] = change.doc;
							}
						} else {
							console.error('Unreachable. Change event without doc.');
						}
					}
				}).cancel;
		}
		return result;
	});

	import { db as DB } from '$lib/db';
	import { get } from 'svelte/store';
	import { Button, Card, Input } from 'flowbite-svelte';

	let showPopup = false;
	let productName = '';
	let productCount = 1;

	async function createProduct() {
		if (productName.trim() !== '') {
			console.log(`Produkt erstellt: ${productName}`);
			const db = get(DB);
			await db.put({
				_id: `${data.id}:${productName}`,
				type: 'product',
				list: data.id,
				name: productName,
				count: productCount
			});
			productName = '';
			productCount = 1;
			showPopup = false;
		}
	}
</script>

<svelte:head>
	<title>G'schäft'lhaberer</title>
</svelte:head>

<Heading class="my-5 text-center">G'schäft'l<wbr />Haberer</Heading>

<div class="mb-5 mt-12 flex flex-col items-center">
	{#await data.products}
		<ListPlaceholder class="w-full max-w-sm" />
	{:then}
		{#each products as product}
			<Product {product} class="my-2" />
		{:else}
			<P>Keine Produkte vorhanden</P>
		{/each}
	{:catch error}
		<Alert color="red">Ein Fehler ist aufgetreten: {error.message}</Alert>
	{/await}
</div>

<div class="flex items-center justify-center">
	<Button on:click={() => (showPopup = true)}>Produkt erstellen</Button>
</div>

{#if showPopup}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<Card class="rounded bg-white p-6 shadow-lg">
			<h2 class="mb-4 text-center text-xl font-bold">Produkt erstellen</h2>
			<Input bind:value={productName} placeholder="Produktname" class="mb-4" />
			<Input type="number" bind:value={productCount} placeholder="Anzahl" class="mb-4" />
			<div class="flex justify-end space-x-2">
				<Button on:click={createProduct} class="bg-blue-500 text-white hover:bg-blue-700"
					>Erstellen</Button
				>
				<Button
					variant="secondary"
					on:click={() => (showPopup = false)}
					class="bg-gray-500 text-white hover:bg-gray-700">Schließen</Button
				>
			</div>
		</Card>
	</div>
{/if}

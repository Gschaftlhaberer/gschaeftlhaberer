<script lang="ts">
	import Product from '$lib/components/Product.svelte';
	import { Heading, ListPlaceholder, Alert, P, Modal, Label } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { db, type ExistingDocument, type Product as PT } from '$lib/db';
	import { browser } from '$app/environment';
	import PlusOutline from '~icons/flowbite/plus-outline';
	import { get } from 'svelte/store';
	import { Button, Input } from 'flowbite-svelte';

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

	let showPopup = false;
	let productName = '';
	let productCount = 1;

	async function createProduct() {
		if (productName.trim() !== '') {
			console.log(`Produkt erstellt: ${productName}`);
			await get(db).put({
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
	<Button
		size="xl"
		on:click={() => (showPopup = true)}
		class="mt-5 flex flex-row items-center justify-center gap-2"
	>
		<PlusOutline />
		Produkt erstellen</Button
	>
</div>

<Modal bind:open={showPopup} outsideclose>
	<Heading tag="h2">Produkt erstellen</Heading>
	<form on:submit|preventDefault={createProduct}>
		<Label for="product-name"
			><span>Produktname</span>
			<Input bind:value={productName} id="product-name" class="mb-4" required /></Label
		>
		<Label for="product-count"
			><span>Anzahl</span>
			<Input
				type="number"
				bind:value={productCount}
				id="product-count"
				class="mb-4"
				required
			/></Label
		>
		<div class="flex justify-end space-x-2">
			<Button type="submit">Erstellen</Button>
			<Button type="reset" color="alternative" on:click={() => (showPopup = false)}
				>Schließen</Button
			>
		</div>
	</form>
</Modal>

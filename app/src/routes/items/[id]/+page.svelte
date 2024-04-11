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

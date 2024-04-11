<script lang="ts">
	import { Heading, ListPlaceholder, Alert, P } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { db, type ExistingDocument, type ProductList as PL } from '$lib/db';
	import ProductList from '$lib/components/ProductList.svelte';
	import { browser } from '$app/environment';

	export let data: PageData;

	export let lists: ExistingDocument<PL>[] = [];
	let cancel_changes: (() => void)[] = [];

	onMount(() => {
		return () => {
			cancel_changes.forEach((cancel) => {
				if (cancel) {
					cancel();
				}
			});
		};
	});

	data.lists.then((result) => {
		lists = result.docs as never[] | ExistingDocument<PL>[];
		if (browser) {
			$db
				.changes({
					since: 'now',
					live: true,
					include_docs: true,
					filter: (doc) => {
						return doc.type === 'list' || doc._deleted;
					}
				})
				.on('change', (change) => {
					if (change.deleted) {
						lists = lists.filter((list) => list._id !== change.id);
					} else {
						const index = lists.findIndex((list) => list._id === change.id);
						if (change.doc && change.doc.type === 'list') {
							if (index === -1) {
								lists = [...lists, change.doc];
							} else {
								lists[index] = change.doc;
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
	{#await data.lists}
		<ListPlaceholder class="w-full max-w-sm" />
	{:then}
		{#each lists as list}
			<ProductList productlist={list} class="my-2" />
		{:else}
			<P>Keine Listen vorhanden</P>
		{/each}
	{:catch error}
		<Alert color="red">Ein Fehler ist aufgetreten: {error.message}</Alert>
	{/await}

	<!-- Button zum Erstellen einer neuen Liste -->
	<a
		href="/createlist"
		class="mt-5 inline-flex items-center justify-center rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
	>
		<i class="fas fa-plus mr-2"></i>
		<span>Neue Liste erstellen</span>
	</a>
</div>

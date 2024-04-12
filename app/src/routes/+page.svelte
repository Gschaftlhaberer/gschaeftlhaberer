<script lang="ts">
	import { Heading, ListPlaceholder, Alert, P, Modal, Button, Label, Input } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { db, type ExistingDocument, type ProductList as PL } from '$lib/db';
	import ProductList from '$lib/components/ProductList.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import PlusOutline from '~icons/flowbite/plus-outline';
	import { getSlug } from '$lib';

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

	let name = '';
	let createModal = false;

	async function addList() {
		if (name.trim() !== '') {
			await get(db).put({
				_id: getSlug(name),
				type: 'list',
				name: name,
				version: ''
			});
			name = '';
			createModal = false;
		}
	}
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
	<Button
		size="xl"
		on:click={() => (createModal = true)}
		class="mt-5 flex flex-row items-center justify-center gap-2"
	>
		<PlusOutline />
		<span>Neue Liste erstellen</span>
	</Button>
</div>

<Modal bind:open={createModal} outsideclose>
	<form class="flex flex-col space-y-6" on:submit|preventDefault={addList}>
		<Heading tag="h4">Neue Einkaufsliste erstellen</Heading>
		<Label for="list-name" class="space-y-2"
			><span>Name der Einkaufsliste</span>
			<Input
				id="list-name"
				bind:value={name}
				placeholder="List name"
				required
				class="w-full"
			/></Label
		>

		<Button type="submit" variant="primary" class="w-full">Liste hinzufügen</Button>
	</form>
</Modal>

<script lang="ts">
	import { Heading, ListPlaceholder, Alert, P } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { type ExistingDocument, type ProductList as PL } from '$lib/db';
	import ProductList from '$lib/components/ProductList.svelte';

	export let data: PageData;

	export let lists: ExistingDocument<PL>[] = [];

	data.lists.then((result) => {
		lists = result.docs;
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
</div>

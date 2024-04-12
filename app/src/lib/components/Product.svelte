<script lang="ts">
	import type { ExistingDocument, Product } from '$lib/db';
	import { db as DB } from '$lib/db';
	import { get } from 'svelte/store';
	import { Card, Heading, Button } from 'flowbite-svelte';

	export let product: ExistingDocument<Product>;

	async function deleteProduct() {
		const db = get(DB);
		await db.remove(product);
	}
</script>

<Card {...$$restProps} class="flex flex-row items-center justify-between">
	<div class="flex-grow">
		<Heading class="inline-block flex-shrink" tag="h4">{product.name}</Heading>
	</div>
	<div class="flex flex-col items-center text-neutral-500 dark:text-neutral-300">
		<span class="text-xl">{product.count}</span>
		<span class="text-sm">Stück</span>
	</div>
	<Button on:click={deleteProduct} class="ml-4">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			class="h-6 w-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
			></path>
		</svg>
	</Button>
</Card>

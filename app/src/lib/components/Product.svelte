<script lang="ts">
	import type { ExistingDocument, Product, ProductList } from '$lib/db';
	import { Card, Heading, Span } from 'flowbite-svelte';

	export let product: ExistingDocument<Product>;
</script>

<Card {...$$restProps} class="flex flex-row items-center justify-between">
	<Heading class="inline-block flex-shrink" tag="h4">{product.name}</Heading>
	<Span class="flex flex-col items-center text-neutral-500 dark:text-neutral-300"
		><span class="text-xl">{product.count}</span><span class="text-sm">Stück</span></Span
	>
</Card>

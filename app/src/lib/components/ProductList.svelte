<script lang="ts">
	import type { ExistingDocument, ProductList } from '$lib/db';
	import { Card, Heading } from 'flowbite-svelte';

	export let productlist: ExistingDocument<ProductList>;
</script>

<Card href={`/items/${productlist._id}`} {...$$restProps}>
	<Heading tag="h4">{productlist.name}</Heading>
</Card>

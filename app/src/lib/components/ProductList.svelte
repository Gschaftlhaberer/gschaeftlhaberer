<script lang="ts">
	import type { ExistingDocument, ProductList } from '$lib/db';
	import { Button, Card, Heading, Modal } from 'flowbite-svelte';
	import TrashBinSolid from '~icons/flowbite/trash-bin-solid';
	import ExclamationCircleSolid from '~icons/flowbite/exclamation-circle-solid';

	export let productlist: ExistingDocument<ProductList>;

	import { db as DB } from '$lib/db';
	import { get } from 'svelte/store';

	async function deleteList() {
		const db = get(DB);
		const list = await db.get(deleteModalId);
		await db.remove(list);
	}

	let deleteModal = false;
	let deleteModalId = '';
</script>

<Card href={`/items/${productlist._id}`} {...$$restProps}>
	<div class="flex items-center justify-between">
		<Heading tag="h4">{productlist.name}</Heading>
		<Button
			color="red"
			on:click={(e) => {
				e.preventDefault();
				deleteModal = true;
				deleteModalId = productlist._id;
			}}
			aria-label="Löschen"
		>
			<TrashBinSolid />
		</Button>
	</div>
</Card>

<Modal bind:open={deleteModal} size="xs" autoclose outsideclose>
	<div class="text-center">
		<ExclamationCircleSolid class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Sicher, dass sie dieses Produkt löschen möchten?
		</h3>
		<Button color="red" class="me-2" on:click={deleteList}>Ja, ich bin sicher</Button>
		<Button color="alternative">Nein, abbrechen</Button>
	</div>
</Modal>

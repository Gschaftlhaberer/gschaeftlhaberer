<script>
	import { db as DB } from '$lib/db';
	import { get } from 'svelte/store';
	import { Button, Input, Label } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	let name = '';

	async function addList() {
		if (name.trim() !== '') {
			const db = get(DB);
			await db.post({
				type: 'list',
				name: name,
				version: ''
			});
			name = '';
			goto('/');
		}
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<h1 class="mb-8 text-3xl font-bold text-gray-700">Neue Einkaufsliste erstellen</h1>

	<form
		class="w-full max-w-md rounded bg-white px-8 py-6 shadow-md"
		on:submit|preventDefault={addList}
	>
		<div class="mb-4">
			<Label for="list-name" class="mb-2">Name der Einkaufsliste:</Label>
			<Input id="list-name" bind:value={name} placeholder="List name" required class="w-full" />
		</div>

		<Button type="submit" variant="primary" class="w-full">Liste hinzufügen</Button>
	</form>
</div>

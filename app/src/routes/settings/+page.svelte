<script lang="ts">
	import { browser } from '$app/environment';
	import { db } from '$lib/db';
	import { Input, Button, Heading, Label } from 'flowbite-svelte';
	let link: string = '';
	let storedLink = browser ? localStorage.getItem('syncLink') : '';

	function validateLink(value: string): boolean {
		value = value.trim();
		const pattern: RegExp = /^https?:\/\/.+/;
		return pattern.test(value);
	}
	$: isValidLink = link !== '' && validateLink(link);

	// Handler für Sync-Ereignisse
	function onSyncChange(change: unknown) {
		console.log('Sync change:', change);
	}

	function onSyncPaused(error: unknown) {
		if (error) {
			console.log('Sync paused due to replication error', error);
		} else {
			console.log('Sync paused/resumed');
		}
	}

	function onSyncError(error: unknown) {
		console.error('Sync error:', error);
	}

	async function handleReplication() {
		if (isValidLink) {
			const opts = { live: true, retry: true };
			$db.replicate
				.from(link)
				.on('complete', function () {
					$db
						.sync(link, opts)
						.on('change', onSyncChange)
						.on('paused', onSyncPaused)
						.on('error', onSyncError);
				})
				.on('error', onSyncError);

			localStorage.setItem('syncLink', link);
			storedLink = link;
		}
	}

	function clearLink() {
		localStorage.removeItem('syncLink');
		storedLink = null;
	}
</script>

<svelte:head>
	<title>Settings - G'schäft'lhaberer</title>
</svelte:head>

<form on:submit|preventDefault={handleReplication}>
	<Heading class="my-5">Settings</Heading>
	<div class="mt-6 flex flex-col gap-4">
		<Label>Link für die Synchronisation</Label>
		<Input bind:value={link} placeholder="https://example.com" />
		<Button type="submit" class="mt-4">Synchronisieren</Button>
		{#if storedLink}
			<div class="mt-4">
				<p>Gespeicherter Link: {storedLink}</p>
				<Button on:click={clearLink} class="mt-2">Link löschen</Button>
			</div>
		{/if}
	</div>
</form>

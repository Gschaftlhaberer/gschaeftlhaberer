<script>
	import { db } from '$lib/db';
	import { goto } from '$app/navigation';
	export let aktuelleListe = null;

	let titel = aktuelleListe ? aktuelleListe.titel : '';
	let artikel = aktuelleListe ? aktuelleListe.artikel : [];

	let artikelName = '';
	let menge = 1;
	let geschäft = '';

	async function speichereListe() {
		const liste = {
			_id: aktuelleListe ? aktuelleListe._id : new Date().toISOString(),
			titel,
			artikel,
			type: 'shoppingList'
		};

		await db.put(liste);
		goto('/listen');
	}

	function artikelHinzufügen() {
		artikel.push({ name: artikelName, menge, geschäft });
		artikelName = '';
		menge = 1;
		geschäft = '';
	}
</script>

<form on:submit|preventDefault={speichereListe}>
	<input bind:value={titel} placeholder="Listentitel" required />
	<input bind:value={artikelName} placeholder="Artikelname" />
	<input type="number" bind:value={menge} min="1" />
	<input bind:value={geschäft} placeholder="Geschäft" />
	<button type="button" on:click={artikelHinzufügen}>Artikel hinzufügen</button>

	{#if artikel.length > 0}
		<ul>
			{#each artikel as item}
				<li>{item.name} - {item.menge} - {item.geschäft}</li>
			{/each}
		</ul>
	{/if}

	<button type="submit">Liste speichern</button>
</form>

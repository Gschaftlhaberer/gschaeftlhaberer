<script>
	import GlobalNav from '$lib/components/GlobalNav.svelte';
	import { setContext } from 'svelte';
	import '../app.pcss';

	import PouchDB from 'pouchdb';

	setContext('db', new PouchDB('shopping'));
</script>

<slot />

<GlobalNav />

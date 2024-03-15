import { getContext } from 'svelte';

export function getDb() {
	return getContext<PouchDB.Database<object>>('db');
}

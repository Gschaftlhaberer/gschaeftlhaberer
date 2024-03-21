import { browser } from '$app/environment';
import { db as DB } from '$lib/db';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	if (!browser) {
		return {
			lists: Promise.resolve({ docs: [] })
		};
	}

	const db = get(DB);
	const lists = db
		.createIndex({
			index: { fields: ['type'] }
		})
		.then(() => {
			const query = {
				selector: {
					type: { $eq: 'list' }
				}
			};
			return db.find(query);
		});
	return {
		lists
	};
};

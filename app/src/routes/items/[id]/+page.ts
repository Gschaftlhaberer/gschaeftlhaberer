import { browser } from '$app/environment';
import { db as DB } from '$lib/db';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params: { id } }) => {
	if (!browser) {
		return {
			products: Promise.resolve({ docs: [] })
		};
	}

	const db = get(DB);
	const products = db
		.createIndex({
			index: { fields: ['type', 'list'] }
		})
		.then(async () => {
			const query = {
				selector: {
					type: 'product',
					list: id
				}
			};
			return await db.find(query);
		});
	return {
		products
	};
};

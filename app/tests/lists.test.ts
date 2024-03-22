import { expect, test } from '@playwright/test';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);

// async function clearDatabase() {
// 	const docs = await DB.allDocs();
// 	docs.rows.forEach((row) => DB.remove(row.id, row.value.rev));
// }

test('no shopping lists entries', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('Keine Listen vorhanden')).toBeVisible();
});

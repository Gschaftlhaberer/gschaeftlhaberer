import { expect, test } from '@playwright/test';

test.describe('product lists', () => {
	test('index page has expected h1', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { name: "G'schäft'lhaberer" })).toBeVisible();
	});
});

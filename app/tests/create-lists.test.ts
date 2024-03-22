import { expect, test } from '@playwright/test';

test('createlist page has expected h1', async ({ page }) => {
	await page.goto('/createlist');
	await expect(page.getByRole('heading', { name: 'Neue Liste erstellen' })).toBeVisible();
});

test('createlist page has expected input', async ({ page }) => {
	await page.goto('/createlist');
	await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
});

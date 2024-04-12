import { expect, test } from '@playwright/test';

test('no shopping lists entries', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('Keine Listen vorhanden')).toBeVisible();
});

test('create a list', async ({ page }) => {
	const listName = 'Test';

	await page.goto('/');
	const newButton = page.getByRole('button', { name: 'Neue Liste erstellen' });
	await expect(newButton).toBeVisible();
	await newButton.click();
	const nameInput = page.getByRole('textbox', { name: 'Name' });
	await expect(nameInput).toBeVisible();
	await nameInput.fill('Test');
	const confirmButton = page.getByRole('button', { name: 'Liste hinzufügen' });
	await expect(confirmButton).toBeVisible();
	await confirmButton.click();
	const listLink = page.getByRole('link', { name: listName });
	await expect(listLink).toBeVisible();
	await expect(listLink).toHaveAttribute('href', '/items/test');
});

test('delete a list', async ({ page }) => {
	const listName = 'Test';

	await page.goto('/');
	const newButton = page.getByRole('button', { name: 'Neue Liste erstellen' });
	await newButton.click();
	const nameInput = page.getByRole('textbox', { name: 'Name' });
	await nameInput.fill('Test');
	const confirmCreationButton = page.getByRole('button', { name: 'Liste hinzufügen' });
	await confirmCreationButton.click();

	const listLink = page.getByRole('link', { name: listName });
	expect(listLink).toBeVisible();
	const deleteButton = listLink.getByRole('button');
	await deleteButton.waitFor();
	await expect(deleteButton).toBeVisible();
	await deleteButton.click();
	const confirmDeletionButton = page.getByRole('button', { name: 'Ja, ich bin sicher' });
	await expect(confirmDeletionButton).toBeVisible();
	await confirmDeletionButton.click();
	await expect(page.getByText('Keine Listen vorhanden')).toBeVisible();
});
